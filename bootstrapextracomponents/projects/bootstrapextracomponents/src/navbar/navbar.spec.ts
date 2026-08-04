import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapExtraNavbar, SvyAttributes } from './navbar';

describe('ServoyBootstrapExtraNavbar', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraNavbar>;
    let component: ServoyBootstrapExtraNavbar;

    const defaultMenuItems = [
        {
            attributes: null, itemId: '1', tabindex: '0', text: 'Home', enabled: true,
            userData: null, iconName: null, position: 'LEFT', subMenuItems: null,
            onAction: null, displayType: 'MENU_ITEM', dataProvider: null,
            inputButtonText: '', inputButtonStyleClass: '', isActive: true,
            styleClass: 'test', tooltip: 'test', valuelist: null
        },
        {
            attributes: null, itemId: '2', tabindex: '1', text: 'Home1', enabled: true,
            userData: null, iconName: null, position: 'LEFT', subMenuItems: null,
            onAction: null, displayType: 'MENU_ITEM', dataProvider: null,
            inputButtonText: '', inputButtonStyleClass: '', isActive: true,
            styleClass: 'test1', tooltip: 'test1', valuelist: null
        }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapExtraNavbar, SvyAttributes],
            imports: [ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraNavbar);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('menuItems', defaultMenuItems);
        fixture.componentRef.setInput('collapsing', false);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render menu items', async () => {
        const items = fixture.nativeElement.querySelectorAll('a.svy-navbar-item');
        expect(items.length).toBeGreaterThan(0);
        expect(items[0].textContent).toContain('Home');
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-navbar');
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('.bts-extra-navbar');
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should show toggler button when collapsing is true', async () => {
        fixture.componentRef.setInput('collapsing', true);
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button.navbar-toggler');
        expect(button).not.toBeNull();
    });

    it('should not show toggler button when collapsing is false', async () => {
        const button = fixture.nativeElement.querySelector('button.navbar-toggler');
        expect(button).toBeNull();
    });

    it('should handle onMenuItemClicked event', async () => {
        const onMenuItemClicked = vi.fn();
        fixture.componentRef.setInput('onMenuItemClicked', onMenuItemClicked);
        fixture.detectChanges();
        await fixture.whenStable();
        const item = fixture.nativeElement.querySelector('a.svy-navbar-item');
        item.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onMenuItemClicked).toHaveBeenCalled();
    });

    it('should handle onBrandClicked event', async () => {
        const onBrandClicked = vi.fn();
        fixture.componentRef.setInput('onBrandClicked', onBrandClicked);
        fixture.componentRef.setInput('brandLogo', 'test.png');
        fixture.detectChanges();
        await fixture.whenStable();
        const brand = fixture.nativeElement.querySelector('.navbar-brand');
        brand.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onBrandClicked).toHaveBeenCalled();
    });

    it('should render brandText', async () => {
        fixture.componentRef.setInput('brandText', 'My App');
        fixture.detectChanges();
        await fixture.whenStable();
        const brand = fixture.nativeElement.querySelector('.navbar-brand');
        expect(brand.textContent).toContain('My App');
    });

    it('should apply brandLogoStyleClass', async () => {
        fixture.componentRef.setInput('brandLogo', 'test.png');
        fixture.componentRef.setInput('brandLogoStyleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const img = fixture.nativeElement.querySelector('.navbar-brand img');
        expect(img.classList.contains('mystyleclass')).toBe(true);
    });

    it('should not fire onMenuItemClicked when item is disabled', async () => {
        const onMenuItemClicked = vi.fn();
        fixture.componentRef.setInput('onMenuItemClicked', onMenuItemClicked);
        const items = [...defaultMenuItems];
        items[0] = { ...items[0], enabled: false };
        fixture.componentRef.setInput('menuItems', items);
        fixture.detectChanges();
        await fixture.whenStable();
        const item = fixture.nativeElement.querySelector('a.svy-navbar-item');
        item.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onMenuItemClicked).not.toHaveBeenCalled();
    });
});
