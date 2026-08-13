import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, Format } from '@servoy/public';
import { ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup } from './inputgroup';

describe('ServoyBootstrapExtraInputGroup', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraInputGroup>;
    let component: ServoyBootstrapExtraInputGroup;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup, ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraInputGroup);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('editable', true);
        fixture.componentRef.setInput('format', { type: 'TEXT' } as Format);
        fixture.componentRef.setInput('placeholderText', 'Enter text');
        fixture.componentRef.setInput('inputType', 'text');
        fixture.componentRef.setInput('dataProvider', 'initialValue');

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render an input element', async () => {
        const input = fixture.nativeElement.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('should show the dataprovider value', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('initialValue');
    });

    it('should set the placeholder text', async () => {
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.getAttribute('placeholder')).toBe('Enter text');
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-input-group');
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-input-group');
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should be read-only when editable is false', async () => {
        fixture.componentRef.setInput('editable', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.hasAttribute('readonly')).toBe(true);
    });

    it('should have the correct input type', async () => {
        fixture.componentRef.setInput('inputType', 'password');
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.getAttribute('type')).toBe('password');
    });

    it('should render addOns', async () => {
        fixture.componentRef.setInput('addOns', [{
            attributes: '',
            position: 'LEFT',
            text: 'AddOn1',
        }]);
        fixture.detectChanges();
        await fixture.whenStable();
        const span = fixture.nativeElement.querySelector('.bts-extra-input-group span');
        expect(span).not.toBeNull();
    });

    it('should render addOnButtons', async () => {
        fixture.componentRef.setInput('addOnButtons', [{
            attributes: '',
            imageStyleClass: 'imageStyleClass',
            name: 'btn1',
            position: 'RIGHT',
            styleClass: 'btnStyleClass',
            text: 'AddOn1',
        }]);
        fixture.detectChanges();
        await fixture.whenStable();
        const btn = fixture.nativeElement.querySelector('.input-group-btn');
        expect(btn).not.toBeNull();
    });

    it('should update value when dataProvider changes from server', async () => {
        fixture.componentRef.setInput('dataProvider', 'new value');
        fixture.detectChanges();
        await fixture.whenStable();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe('new value');
    });
});
