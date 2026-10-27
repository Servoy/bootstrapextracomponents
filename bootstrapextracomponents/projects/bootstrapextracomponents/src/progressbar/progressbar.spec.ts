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

    it('should apply no tone class and keep the type class when tone is not set', async () => {
        expect(component.toneClass()).toBe('');
        expect(component.effectiveType()).toBe('info');
        const bar = fixture.nativeElement.querySelector('.progress-bar');
        expect(bar.classList.contains('text-bg-info')).toBe(true);
    });

    it('should apply the tone class on the track', async () => {
        fixture.componentRef.setInput('tone', 'success');
        fixture.detectChanges();
        await fixture.whenStable();
        const track = fixture.nativeElement.querySelector('.bts-extra-progressbar');
        expect(track.classList.contains('bts-extra-progressbar--tone-success')).toBe(true);
    });

    it('should suppress the text-bg-* class when a tone is set', async () => {
        fixture.componentRef.setInput('tone', 'success');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.effectiveType()).toBe('');
        const bar = fixture.nativeElement.querySelector('.progress-bar');
        expect(bar.className).not.toContain('text-bg-');
    });

    it('should let the tone take precedence over type', async () => {
        fixture.componentRef.setInput('type', 'danger');
        fixture.componentRef.setInput('tone', 'info');
        fixture.detectChanges();
        await fixture.whenStable();
        const track = fixture.nativeElement.querySelector('.bts-extra-progressbar');
        const bar = fixture.nativeElement.querySelector('.progress-bar');
        expect(track.classList.contains('bts-extra-progressbar--tone-info')).toBe(true);
        expect(bar.className).not.toContain('text-bg-danger');
    });

    it('should keep the style class alongside a tone', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.componentRef.setInput('tone', 'neutral');
        fixture.detectChanges();
        await fixture.whenStable();
        const track = fixture.nativeElement.querySelector('.bts-extra-progressbar');
        expect(track.classList.contains('mystyleclass')).toBe(true);
        expect(track.classList.contains('bts-extra-progressbar--tone-neutral')).toBe(true);
    });

    it('should still show the value text with a tone set', async () => {
        fixture.componentRef.setInput('tone', 'warning');
        fixture.componentRef.setInput('dataProviderID', 40);
        fixture.detectChanges();
        await fixture.whenStable();
        const bar = fixture.nativeElement.querySelector('.progress-bar b');
        expect(bar.textContent).toBe('40%');
    });
});
