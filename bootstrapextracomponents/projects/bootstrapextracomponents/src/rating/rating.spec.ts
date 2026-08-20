import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { ServoyBootstrapExtraRating } from './rating';

describe('ServoyBootstrapExtraRating', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraRating>;
    let component: ServoyBootstrapExtraRating;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyBootstrapExtraRating, ServoyPublicTestingModule, NgbRating],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraRating);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('max', 5);
        fixture.componentRef.setInput('dataProviderID', 1);
        fixture.componentRef.setInput('enabled', true);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render the rating component', async () => {
        const el = fixture.nativeElement.querySelector('.bts-extra-rating');
        expect(el).not.toBeNull();
    });

    it('should apply readonly when disabled', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const rating = fixture.nativeElement.querySelector('ngb-rating');
        expect(rating.getAttribute('aria-readonly')).not.toBeNull();
    });

    it('should emit dataProviderIDChange on rating click', async () => {
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);
        const stars = fixture.nativeElement.querySelectorAll('ngb-rating i');
        stars[stars.length - 1].click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(changeSpy).toHaveBeenCalled();
    });

    it('should not emit dataProviderIDChange on server-side dataProviderID change', async () => {
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);
        fixture.componentRef.setInput('dataProviderID', 2);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should render the correct number of stars based on max', async () => {
        fixture.componentRef.setInput('max', 7);
        fixture.detectChanges();
        await fixture.whenStable();
        const stars = fixture.nativeElement.querySelectorAll('ngb-rating i');
        expect(stars.length).toBe(7);
    });

    it('should apply stateOn and stateOff classes', async () => {
        fixture.componentRef.setInput('dataProviderID', 3);
        fixture.componentRef.setInput('stateOn', 'fa-solid fa-heart');
        fixture.componentRef.setInput('stateOff', 'fa-regular fa-heart');
        fixture.detectChanges();
        await fixture.whenStable();
        const stars = fixture.nativeElement.querySelectorAll('ngb-rating i');
        expect(stars[0].classList.contains('fa-solid')).toBe(true);
        expect(stars[0].classList.contains('fa-heart')).toBe(true);
        expect(stars[4].classList.contains('fa-regular')).toBe(true);
        expect(stars[4].classList.contains('fa-heart')).toBe(true);
    });

    it('should show percentage on hover', async () => {
        fixture.componentRef.setInput('showPercentageOnHover', true);
        fixture.detectChanges();
        await fixture.whenStable();

        component.onHoverEvent(3);
        fixture.detectChanges();
        await fixture.whenStable();

        const percentEl = fixture.nativeElement.querySelector('.label');
        expect(percentEl).not.toBeNull();
        expect(percentEl.textContent).toContain('60%');
    });

    it('should hide percentage after leave', async () => {
        fixture.componentRef.setInput('showPercentageOnHover', true);
        fixture.detectChanges();

        component.onHoverEvent(4);
        fixture.detectChanges();

        component.onLeaveEvent();
        fixture.detectChanges();
        await fixture.whenStable();

        const percentEl = fixture.nativeElement.querySelector('.label');
        expect(percentEl).toBeNull();
    });
});
