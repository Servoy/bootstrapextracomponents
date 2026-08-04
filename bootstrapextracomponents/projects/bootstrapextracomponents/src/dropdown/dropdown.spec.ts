import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapExtraDropdown } from './dropdown';

describe('ServoyBootstrapExtraDropdown', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraDropdown>;
    let component: ServoyBootstrapExtraDropdown;

    const defaultMenuItems = [{
        enabled: true,
        iconName: '',
        isDivider: false,
        text: 'one',
        itemId: '1',
        userData: { id: 1 },
        onAction: null
    }, {
        enabled: true,
        iconName: '',
        isDivider: false,
        text: 'two',
        itemId: '2',
        userData: { id: 2 },
        onAction: null
    }];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapExtraDropdown],
            imports: [ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraDropdown);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('isButton', true);
        fixture.componentRef.setInput('menuItems', defaultMenuItems);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render a button', async () => {
        const button = fixture.nativeElement.querySelector('button');
        expect(button).not.toBeNull();
    });

    it('should disable button when enabled is false', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-drop-down');
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-drop-down');
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should apply buttonStyleClass', async () => {
        fixture.componentRef.setInput('buttonStyleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply imageStyleClass', async () => {
        fixture.componentRef.setInput('imageStyleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const span = fixture.nativeElement.querySelector('button span');
        expect(span.classList.contains('mystyleclass')).toBe(true);
    });

    it('should show btn-link when isButton is false', async () => {
        fixture.componentRef.setInput('isButton', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList.contains('btn-link')).toBe(true);
    });

    it('should render text in the button', async () => {
        fixture.componentRef.setInput('text', 'My Button');
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.textContent).toContain('My Button');
    });

    it('should set tooltip text', async () => {
        fixture.componentRef.setInput('toolTipText', 'Updated tooltip');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.toolTipText()).toBe('Updated tooltip');
    });

    it('should render a divider when menuItem isDivider is true', async () => {
        fixture.componentRef.setInput('menuItems', [{
            enabled: true, iconName: '', isDivider: false, text: 'one', itemId: '1', userData: null, onAction: null
        }, {
            enabled: true, iconName: '', isDivider: true, text: '', itemId: 'div', userData: null, onAction: null
        }, {
            enabled: true, iconName: '', isDivider: false, text: 'two', itemId: '2', userData: null, onAction: null
        }]);
        fixture.detectChanges();
        await fixture.whenStable();
        const divider = fixture.nativeElement.querySelector('.dropdown-divider');
        expect(divider).not.toBeNull();
    });

    it('should render iconName as a span', async () => {
        fixture.componentRef.setInput('menuItems', [{
            enabled: true, iconName: 'fa fa-star', isDivider: false, text: 'Star item', itemId: '1', userData: null, onAction: null
        }]);
        fixture.detectChanges();
        await fixture.whenStable();
        const icon = fixture.nativeElement.querySelector('.bts-extra-drop-down span.fa-star');
        expect(icon).not.toBeNull();
    });
});
