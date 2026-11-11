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
            imports: [ServoyBootstrapExtraNavbar, SvyAttributes, ServoyPublicTestingModule],
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

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
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

    describe('SVY-21423: subMenuItems null vs empty array', () => {
        const buildMenuItem = (itemId: string, subMenuItems: unknown) => ({
            attributes: null, itemId, tabindex: '0', text: 'Item-' + itemId, enabled: true,
            userData: null, iconName: null, position: 'LEFT', subMenuItems,
            onAction: null, displayType: 'MENU_ITEM', dataProvider: null,
            inputButtonText: '', inputButtonStyleClass: '', isActive: false,
            styleClass: '', tooltip: '', valuelist: null
        });

        it('should render a plain link (no caret, no dropdown) when subMenuItems is null', async () => {
            fixture.componentRef.setInput('menuItems', [buildMenuItem('null-item', null)]);
            fixture.detectChanges();
            await fixture.whenStable();

            const li = fixture.nativeElement.querySelector('[data-menu-item-id="null-item"]')!.closest('li');
            expect(li.querySelector('.dropdown-toggle')).toBeNull();
            expect(li.querySelector('.caret')).toBeNull();
            expect(li.querySelector('.dropdown-menu')).toBeNull();
        });

        it('should render a plain link (no caret, no dropdown) when subMenuItems is an empty array', async () => {
            // Regression guard for SVY-21423: an unset subMenuItems property must not be
            // treated as "has a dropdown" just because it happens to arrive as [] instead of null.
            fixture.componentRef.setInput('menuItems', [buildMenuItem('empty-item', [])]);
            fixture.detectChanges();
            await fixture.whenStable();

            const li = fixture.nativeElement.querySelector('[data-menu-item-id="empty-item"]')!.closest('li');
            expect(li.querySelector('.dropdown-toggle')).toBeNull();
            expect(li.querySelector('.caret')).toBeNull();
            expect(li.querySelector('.dropdown-menu')).toBeNull();
        });

        it('should render the dropdown-toggle, caret and populated dropdown-menu when subMenuItems has items', async () => {
            const subMenuItems = [
                { text: 'Sub A', itemId: 'sub-a', tabindex: '0', enabled: true, styleClass: '', userData: null, iconName: null, onAction: null, isDivider: false },
                { text: 'Sub B', itemId: 'sub-b', tabindex: '0', enabled: true, styleClass: '', userData: null, iconName: null, onAction: null, isDivider: false }
            ];
            fixture.componentRef.setInput('menuItems', [buildMenuItem('parent-item', subMenuItems)]);
            fixture.detectChanges();
            await fixture.whenStable();

            const li = fixture.nativeElement.querySelector('[data-menu-item-id="parent-item"]')!.closest('li');
            expect(li.querySelector('.dropdown-toggle')).not.toBeNull();
            expect(li.querySelector('.caret')).not.toBeNull();
            const dropdownMenu = li.querySelector('.dropdown-menu');
            expect(dropdownMenu).not.toBeNull();
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
            expect(dropdownItems.length).toBe(2);
            expect(dropdownItems[0].textContent).toContain('Sub A');
            expect(dropdownItems[1].textContent).toContain('Sub B');
        });
    });

    describe('public methods and branches', () => {
        it('toggleCollapse adds then removes show on .navbar-collapse', async () => {
            fixture.componentRef.setInput('collapsing', true);
            fixture.detectChanges();
            await fixture.whenStable();
            component.toggleCollapse();
            const collapse = fixture.nativeElement.querySelector('.navbar-collapse');
            expect(collapse.classList.contains('show')).toBe(true);
            component.toggleCollapse();
            expect(collapse.classList.contains('show')).toBe(false);
        });

        it('isCollapseIn returns false when no .collapse.in present', () => {
            expect(component.isCollapseIn()).toBe(false);
        });

        it('createItemArg maps basic fields', () => {
            const arg = component.createItemArg({ itemId: 'x', text: 'T', userData: { a: 1 } } as any);
            expect(arg.itemId).toBe('x');
            expect(arg.text).toBe('T');
            expect(arg.userData).toEqual({ a: 1 });
        });

        it('createItemArg uses dataProvider for INPUT displayType', () => {
            const arg = component.createItemArg({ itemId: 'i', text: 'label', displayType: 'INPUT', dataProvider: 42 } as any);
            expect(arg.text).toBe('42');
        });

        it('makeItemActive sets isActive and calls server api when markClickedItemActive', () => {
            fixture.componentRef.setInput('markClickedItemActive', true);
            const spy = vi.spyOn(component.servoyApi(), 'callServerSideApi');
            const items = component._menuItems();
            component.makeItemActive(items[0] as any);
            expect(items[0].isActive).toBe(true);
            expect(items[1].isActive).toBe(false);
            expect(spy).toHaveBeenCalledWith('setMenuSelectedInternal', ['1']);
        });

        it('makeItemActive is a no-op when markClickedItemActive is not set', () => {
            fixture.componentRef.setInput('markClickedItemActive', false);
            const spy = vi.spyOn(component.servoyApi(), 'callServerSideApi');
            component.makeItemActive(component._menuItems()[0] as any);
            expect(spy).not.toHaveBeenCalled();
        });

        it('getLocation / getSize return null for unknown item', () => {
            expect(component.getLocation('nope')).toBeNull();
            expect(component.getSize('nope')).toBeNull();
        });

        it('getLocation / getSize return rects for known item', () => {
            expect(component.getLocation('1')).not.toBeNull();
            expect(component.getSize('1')).not.toBeNull();
        });

        it('onInputChange applies via servoyApi when no servoyMenu', () => {
            const spy = vi.spyOn(component.servoyApi(), 'apply');
            const item: any = { dataProvider: 'v' };
            component.onInputChange(item, 0);
            expect(spy).toHaveBeenCalledWith('menuItems[0].dataProvider', 'v');
        });

        it('valueChanged sets dataProvider from realValue', () => {
            fixture.componentRef.setInput('menuItems', [{
                attributes: null, itemId: 'vc', tabindex: '0', text: 'x', enabled: true,
                userData: null, iconName: null, position: 'LEFT', subMenuItems: null,
                onAction: null, displayType: 'INPUT', dataProvider: null,
                inputButtonText: '', inputButtonStyleClass: '', isActive: false,
                styleClass: '', tooltip: '', valuelist: null
            }]);
            fixture.detectChanges();
            component.valueChanged({ displayValue: 'd', realValue: 7 } as any, 0);
            expect(component._menuItems()[0].dataProvider).toBe(7);
            component.valueChanged(null as any, 0);
            expect(component._menuItems()[0].dataProvider).toBeNull();
        });

        it('onKeyDown Escape/Enter do not throw', () => {
            const target = fixture.nativeElement.querySelector('a.svy-navbar-item');
            expect(() => component.onKeyDown({ key: 'Escape', target, preventDefault: () => {} } as any)).not.toThrow();
            expect(() => component.onKeyDown({ key: 'Enter', target, preventDefault: () => {} } as any)).not.toThrow();
        });

        it('resultFormatter handles null/empty/value', () => {
            expect(component.resultFormatter({ displayValue: null, realValue: 1 } as any)).toBe('');
            expect(component.resultFormatter({ displayValue: '', realValue: 1 } as any)).toBe('\u00A0');
            expect(component.resultFormatter({ displayValue: 'hi', realValue: 1 } as any)).toBe('hi');
        });

        it('isTrustedHTML reflects servoyApi.trustAsHtml', () => {
            expect(component.isTrustedHTML()).toBe(false);
        });

        it('copyServoyMenu populates _menuItems from servoyMenu input', async () => {
            const servoyMenu: any = {
                name: 'm', styleClass: '',
                pushDataProviderValue: vi.fn(), setSelectedItem: vi.fn(),
                items: [{
                    itemID: 'a', menuText: 'A', styleClass: 'sc', enabled: true,
                    iconStyleClass: 'ic', tooltipText: 'tt', isSelected: false,
                    extraProperties: { Navbar: { tabindex: '0', position: 'LEFT', displayType: 'MENU_ITEM' }, Sidenav: null },
                    items: [{
                        itemID: 'a1', menuText: 'A1', styleClass: '', enabled: true,
                        iconStyleClass: '', tooltipText: '', isSelected: false,
                        extraProperties: { Navbar: { isDivider: false }, Sidenav: null }, items: []
                    }]
                }]
            };
            fixture.componentRef.setInput('servoyMenu', servoyMenu);
            fixture.detectChanges();
            await fixture.whenStable();
            const items = component._menuItems();
            expect(items.length).toBe(1);
            expect(items[0].text).toBe('A');
            expect(items[0].subMenuItems.length).toBe(1);
            expect(items[0].subMenuItems[0].text).toBe('A1');
        });

        it('renders BUTTON displayType item', async () => {
            fixture.componentRef.setInput('menuItems', [{
                attributes: null, itemId: 'b', tabindex: '0', text: 'Btn', enabled: true,
                userData: null, iconName: 'fa fa-star', position: 'LEFT', subMenuItems: null,
                onAction: null, displayType: 'BUTTON', dataProvider: null,
                inputButtonText: '', inputButtonStyleClass: '', isActive: false,
                styleClass: 'mybtn', tooltip: '', valuelist: null
            }]);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.svy-navbar-button .navbar-btn')).not.toBeNull();
        });

        it('renders TEXT displayType item', async () => {
            fixture.componentRef.setInput('menuItems', [{
                attributes: null, itemId: 't', tabindex: '0', text: 'SomeText', enabled: true,
                userData: null, iconName: null, position: 'LEFT', subMenuItems: null,
                onAction: null, displayType: 'TEXT', dataProvider: null,
                inputButtonText: '', inputButtonStyleClass: '', isActive: false,
                styleClass: '', tooltip: '', valuelist: null
            }]);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.svy-navbar-text').textContent).toContain('SomeText');
        });

        it('renders INPUT displayType item (no valuelist)', async () => {
            fixture.componentRef.setInput('menuItems', [{
                attributes: null, itemId: 'in', tabindex: '0', text: 'ph', enabled: true,
                userData: null, iconName: 'fa fa-search', position: 'LEFT', subMenuItems: null,
                onAction: null, displayType: 'INPUT', dataProvider: '', inputButtonText: 'Go',
                inputButtonStyleClass: '', isActive: false, styleClass: '', tooltip: '', valuelist: null
            }]);
            fixture.detectChanges();
            await fixture.whenStable();
            expect(fixture.nativeElement.querySelector('.svy-navbar-input input')).not.toBeNull();
        });

        it('fires item.onAction when present on click', async () => {
            const onAction = vi.fn();
            fixture.componentRef.setInput('menuItems', [{
                attributes: null, itemId: 'act', tabindex: '0', text: 'Act', enabled: true,
                userData: null, iconName: null, position: 'LEFT', subMenuItems: null,
                onAction, displayType: 'MENU_ITEM', dataProvider: null,
                inputButtonText: '', inputButtonStyleClass: '', isActive: false,
                styleClass: '', tooltip: '', valuelist: null
            }]);
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.nativeElement.querySelector('a.svy-navbar-item').click();
            fixture.detectChanges();
            expect(onAction).toHaveBeenCalled();
        });

        it('openSubMenu / closeSubMenu toggle show on dropdown-menu', async () => {
            const subMenuItems = [{ text: 'S', itemId: 's1', tabindex: '0', enabled: true, styleClass: '', userData: null, iconName: null, onAction: null, isDivider: false }];
            fixture.componentRef.setInput('menuItems', [{
                attributes: null, itemId: 'dd', tabindex: '0', text: 'DD', enabled: true,
                userData: null, iconName: null, position: 'LEFT', subMenuItems,
                onAction: null, displayType: 'MENU_ITEM', dataProvider: null,
                inputButtonText: '', inputButtonStyleClass: '', isActive: false,
                styleClass: '', tooltip: '', valuelist: null
            }]);
            fixture.detectChanges();
            await fixture.whenStable();
            component.openSubMenu('dd');
            const menu = fixture.nativeElement.querySelector('.dropdown-menu');
            expect(menu.classList.contains('show')).toBe(true);
            component.closeSubMenu(fixture.nativeElement.querySelector("[data-menu-item-id='dd']"));
            expect(menu.classList.contains('show')).toBe(false);
        });
    });
});
