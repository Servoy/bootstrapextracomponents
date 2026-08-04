import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { JwBootstrapSwitchNg2Component } from '@servoy/jw-bootstrap-switch-ng2';
import { ServoyBootstrapExtraSwitch } from './switch';

describe('ServoyBootstrapExtraSwitch', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraSwitch>;
    let component: ServoyBootstrapExtraSwitch;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapExtraSwitch],
            imports: [ServoyPublicTestingModule, JwBootstrapSwitchNg2Component, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraSwitch);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('dataProviderID', 0);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render the switch component', async () => {
        const el = fixture.nativeElement.querySelector('bswitch');
        expect(el).not.toBeNull();
    });

    it('should show disabled state when enabled is false', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const disabled = fixture.nativeElement.querySelector('.bootstrap-switch-disabled');
        expect(disabled).not.toBeNull();
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-switch');
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-switch');
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should show label, offText and onText', async () => {
        fixture.componentRef.setInput('label', 'label');
        fixture.componentRef.setInput('offText', 'offText');
        fixture.componentRef.setInput('onText', 'onText');
        fixture.detectChanges();
        await fixture.whenStable();
        const label = fixture.nativeElement.querySelector('.bootstrap-switch-label');
        expect(label.textContent.trim()).toBe('label');
        const off = fixture.nativeElement.querySelector('.bootstrap-switch-handle-off');
        expect(off.textContent).toBe('offText');
        const on = fixture.nativeElement.querySelector('.bootstrap-switch-handle-on');
        expect(on.textContent).toBe('onText');
    });

    it('should emit dataProviderIDChange on click', async () => {
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);
        const label = fixture.nativeElement.querySelector('.bootstrap-switch-label');
        label.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(changeSpy).toHaveBeenCalled();
    });

    it('should not emit dataProviderIDChange on server-side change', async () => {
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);
        fixture.componentRef.setInput('dataProviderID', 1);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(changeSpy).not.toHaveBeenCalled();
    });
});
