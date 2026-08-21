import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ServoyBootstrapExtraProgressBar } from './progressbar';

describe('ServoyBootstrapExtraProgressBar', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraProgressBar>;
    let component: ServoyBootstrapExtraProgressBar;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyBootstrapExtraProgressBar, ServoyPublicTestingModule, NgbProgressbar],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraProgressBar);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('type', 'info');
        fixture.componentRef.setInput('showValue', true);
        fixture.componentRef.setInput('showValueAsPercentage', true);
        fixture.componentRef.setInput('animate', true);
        fixture.componentRef.setInput('max', 100);
        fixture.componentRef.setInput('dataProviderID', 1);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should render the progressbar', async () => {
        const el = fixture.nativeElement.querySelector('.bts-extra-progressbar');
        expect(el).not.toBeNull();
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-progressbar');
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-progressbar');
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should show percentage value', async () => {
        const bar = fixture.nativeElement.querySelector('.progress-bar b');
        expect(bar.textContent).toBe('1%');
    });

    it('should update when dataProviderID changes', async () => {
        fixture.componentRef.setInput('dataProviderID', 2);
        fixture.detectChanges();
        await fixture.whenStable();
        const bar = fixture.nativeElement.querySelector('.progress-bar b');
        expect(bar.textContent).toBe('2%');
    });

    it('should show absolute value when showValueAsPercentage is false', async () => {
        fixture.componentRef.setInput('showValueAsPercentage', false);
        fixture.componentRef.setInput('dataProviderID', 25);
        fixture.detectChanges();
        await fixture.whenStable();
        const bar = fixture.nativeElement.querySelector('.progress-bar b');
        expect(bar.textContent).toBe('25 / 100');
    });

    it('should show custom valueText when set', async () => {
        fixture.componentRef.setInput('valueText', 'Loading...');
        fixture.detectChanges();
        await fixture.whenStable();
        const bar = fixture.nativeElement.querySelector('.progress-bar b');
        expect(bar.textContent).toBe('Loading...');
    });

    it('should add animated class when animate is true', async () => {
        const bar = fixture.nativeElement.querySelector('.progress-bar');
        expect(bar.classList.contains('progress-bar-animated')).toBe(true);
    });

    it('should apply servoyAttributes on the native element', async () => {
        // Create a fresh component with servoyAttributes set before first detectChanges
        const localFixture = TestBed.createComponent(ServoyBootstrapExtraProgressBar);
        const localComponent = localFixture.componentInstance;

        localFixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        localFixture.componentRef.setInput('type', 'info');
        localFixture.componentRef.setInput('max', 100);
        localFixture.componentRef.setInput('dataProviderID', 50);
        localFixture.componentRef.setInput('servoyAttributes', {
            'data-testid': 'my-progressbar',
            'aria-label': 'Upload progress'
        });

        localFixture.detectChanges();
        await localFixture.whenStable();

        const nativeEl = localComponent.getNativeElement();
        expect(nativeEl).not.toBeNull();
        expect(nativeEl.getAttribute('data-testid')).toBe('my-progressbar');
        expect(nativeEl.getAttribute('aria-label')).toBe('Upload progress');
    });
});
