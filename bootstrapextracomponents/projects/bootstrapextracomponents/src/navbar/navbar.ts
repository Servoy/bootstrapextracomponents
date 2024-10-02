import { Component, SimpleChanges, Input, Renderer2, ChangeDetectorRef, Directive, ElementRef, OnInit, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ServoyBaseComponent, FormattingService, ServoyPublicService, BaseCustomObject, IValuelist } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-navbar',
    templateUrl: './navbar.html'
})
export class ServoyBootstrapExtraNavbar extends ServoyBaseComponent<HTMLDivElement> {

    @Input() brandText: string;
    @Input() styleClass: string;
    @Input() brandTextTabindex: string;
    @Input() brandLogo: string;
    @Input() brandLogoStyleClass: string;
    @Input() brandLogoTabindex: string;
    @Input() visible: boolean;
    @Input() inverse: boolean;
    @Input() fixed: string;
    @Input() markClickedItemActive: boolean;
    @Input() iconCollapseStyleClass: string;
    @Input() collapsing: boolean;
    @Input() collapseOnClick: boolean;

    @Input() menuItems: Array<MenuItem>;
    @Input() servoyMenu: any;

    @Input() onMenuItemClicked: (e: Event, menuItem: BaseMenuItem) => void;
    @Input() onBrandClicked: (e: Event) => void;

    focusSubjects = new Array<Subject<string>>();
    typeaheadInit = false;
    indexToFocus = 0;
    firstShow = true;
    private shouldCopyServoyMenu = false;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, public formattingService: FormattingService,
        @Inject(DOCUMENT) private document: Document, private servoyService: ServoyPublicService) {
        super(renderer, cdRef);
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.navigateSubMenu(event.target as Element, event.key);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.navigateSubMenu(event.target as Element, event.key);
        } else if (event.key === 'Escape') {
            this.closeSubMenu(event.target as Element)
        } else if (event.key === 'Enter') {
            this.closeOtherSubMenu(event.target as Element);
        }
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.servoyMenu && (!this.menuItems || this.menuItems.length == 0)) {
            this.shouldCopyServoyMenu = true;
            this.copyServoyMenu();
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.menuItems) {
            this.initTypeaheads(changes.menuItems.currentValue);
        }
        if (changes.servoyMenu) {
            if (!changes.servoyMenu.firstChange) {
                this.copyServoyMenu();
            } else if (this.servoyMenu && (!this.menuItems || this.menuItems.length == 0)) {
                this.shouldCopyServoyMenu = true;
                this.copyServoyMenu();
            }
        }
    }

    isTrustedHTML(): boolean {
        if (this.servoyApi.trustAsHtml()) {
            return true;
        }
        return false;
    }

    applyBlurOnEnter(e: KeyboardEvent) {
        if (this.formattingService.testKeyPressed(e, 13)) {
            this.doBlur(e);
        }
    }

    applyClickOnEnter(e: KeyboardEvent, menuItem: MenuItem, index: number) {
        if (this.formattingService.testKeyPressed(e, 13)) {
            this.onInputChange(menuItem, index);
            this.navBarClicked(e);
        }
    }

    doBlur(e: Event) {
        (e.target as HTMLElement).blur();
    }

    onInputChange(menuItem: MenuItem, index: number) {
        if (this.shouldCopyServoyMenu) {
            this.servoyApi.apply('servoyMenu.items[' + index + '].extraProperties.Navbar.dataProvider', menuItem.dataProvider);
        }  else {
            this.servoyApi.apply('menuItems[' + index + '].dataProvider', menuItem.dataProvider);
        }
    }

    resultFormatter = (result: { displayValue: string; realValue: any }) => {
        if (result.displayValue === null) return '';
        if (result.displayValue === '') return '\u00A0';
        //return this.formattingService.format(result.displayValue, null, false);
        return result.displayValue;
    };

    inputFormatterWrap(menuItem: MenuItem): (item: any) => string {
        return (result: any) => {
            if (result === null) return '';
            if (result.displayValue !== undefined) result = result.displayValue;
            else if (menuItem.valuelist?.hasRealValues()) {
                // on purpose test with == so that "2" equals to 2
                const value = menuItem.valuelist.find((item) => {
                    // eslint-disable-next-line eqeqeq
                    if (item.realValue == result) {
                        return true;
                    }
                    if (item.realValue instanceof Date && result instanceof Date) {
                        return item.realValue.getTime() === result.getTime();
                    }
                    return false;
                });
                if (value) {
                    result = value.displayValue;
                }
            }
            // return this.formattingService.format(result, null, false);
            return result;
        }
    }

    doSvyApply(event: Event, index: number) {
        const menuItem = this.menuItems[index];
        if (!menuItem) {
            return;
        }
        if (menuItem.valuelist && menuItem.valuelist.length > 0 && menuItem.valuelist[0].displayValue) {
            let hasMatchingDisplayValue = false;
            for (const vlValue of menuItem.valuelist) {
                if ((event.target as HTMLInputElement).value === vlValue.displayValue) {
                    menuItem.dataProvider = vlValue.realValue;
                    hasMatchingDisplayValue = true;
                    break;
                }
            }
            if (!hasMatchingDisplayValue) {
                menuItem.dataProvider = null;
                (event.target as HTMLInputElement).value = null;
            }
        }
        else if (menuItem.valuelist && !menuItem.valuelist.hasRealValues()) {
            menuItem.dataProvider = (event.target as HTMLInputElement).value;
        }
        this.onInputChange(menuItem, index);
        this.navBarClicked(event);
    }

    valueChanged(value: { displayValue: string; realValue: any }, index: number) {
        const menuItem = this.menuItems[index];
        if (!menuItem) {
            return;
        }
        if (value && value.realValue !== undefined) menuItem.dataProvider = value.realValue;
        else if (value) menuItem.dataProvider = value;
        else menuItem.dataProvider = null;
        this.onInputChange(menuItem, index);
    }

    navBarClicked(event: Event) {
        event.preventDefault();
        let $target = event.target as Element;
        if ($target.getAttribute('id') === 'navbar-collapse') {
            //click on navbar (background)
            return;
        }
        const li = $target.closest('li');
        if (li && li.classList.contains('disabled')) {
            //disabled entry
            return;
        }
        if (event.type === 'click' && $target.tagName === 'INPUT') {
            //skip simple click in Input
            return;
        }

        /** adjust fixed position of navbar dropdown when right aligned */

        // if the user clicked on the icon contained in the navbar-dropdown 'anchor' set target to the parent (which contains svy-navar-dropdown)
        if ($target.parentElement.classList.contains('svy-navbar-dropdown')) {
            $target = $target.parentElement;
        }

        this.positionMenu($target);

        const itemClicked = this.getItem(event);
        this.makeItemActive(itemClicked);
        if (itemClicked && itemClicked.onAction) {
            const jsEvent = this.servoyService.createJSEvent(event, 'action');
            itemClicked.onAction(jsEvent, this.createItemArg(itemClicked));
        } else if (itemClicked && this.onMenuItemClicked) {
            this.onMenuItemClicked(event, this.createItemArg(itemClicked));
        }
    }

    positionMenu($target: Element) {
        // if clicked on a dropdown menu
        if ($target.classList.contains('svy-navbar-dropdown')) { // if is a dropdown menu
            this.indexToFocus = 0;
            this.firstShow = true;

            const parent = $target.parentElement;
            const nav = $target.closest('.navbar-nav'); // closest navbar anchestor
            const div = parent.querySelector('div'); // first child of type div

            // only if is right aligned
            if (nav && div && (nav.classList.contains('ms-auto') || nav.classList.contains('me-auto'))) {

                const ITEM_POSITION = {
                    LEFT: 'left',
                    RIGHT: 'right'
                };

                let alignPosition: string;
                if (nav.classList.contains('ms-auto')) {
                    alignPosition = ITEM_POSITION.RIGHT;
                } else if (nav.classList.contains('me-auto')) {
                    alignPosition = ITEM_POSITION.LEFT;
                }

                const dialog = $target.closest('.svy-dialog');

                // make sure the menu is not collapsed because min-width < 768
                const viewPortWidth = this.document.defaultView.innerWidth;
                //if (viewPortWidth >= 768) {
                if (!this.isCollapseIn()) {
                    const position = dialog ? dialog.getBoundingClientRect() : null;
                    // location relative to viewport
                    const boundingRect = $target.getBoundingClientRect();
                    // calculate fixed top/right position from either viewport or dialog
                    let alignLocation = 0;
                    if (alignPosition === ITEM_POSITION.RIGHT) {  // anchor the sub-menu to the right
                        let right: number;
                        if (dialog) {
                            right = position.left + position.width - (boundingRect.left + boundingRect.width);
                        } else {
                            right = viewPortWidth - (boundingRect.left + boundingRect.width);
                        }
                        alignLocation = right;
                    } else { // anchor the sub-menu to the left
                        let left: number;
                        if (dialog) {
                            left = boundingRect.left - position.left;
                        } else {
                            left = boundingRect.left;
                        }
                        alignLocation = left;
                    }

                    // TODO shall i manage if item if navbar is anchored to the bottom !?
                    let top: number;
                    if (dialog) {
                        top = boundingRect.top + boundingRect.height - position.top;
                    } else {
                        top = boundingRect.top + boundingRect.height;
                    }

                    this.renderer.setStyle(div, 'position', 'fixed');
                    this.renderer.setStyle(div, alignPosition, alignLocation + 'px');
                    this.renderer.setStyle(div, 'top', top + 'px');
                } else {        // restore default style for the list dropdown
                    this.renderer.setStyle(div, 'position', 'static');
                    this.renderer.setStyle(div, 'right', 'auto');
                    this.renderer.setStyle(div, 'top', '100%');
                }
            }
        }
    }

    isCollapseIn(): boolean {
        const el = this.getNativeElement().querySelector('.navbar-collapse.collapse.in');
        if (el) {
            return true;
        } else {
            return false;
        }
    }

    createItemArg(item: BaseMenuItem): BaseMenuItem {
        let itemText = item.text;
        if (item instanceof MenuItem) {
            if (item.displayValue) {
                itemText = item.displayValue;
            }
            if (item.displayType === 'INPUT' || item.displayType === 'INPUT_GROUP') {
                itemText = item.dataProvider != null ? item.dataProvider + '' : null;
            }
        }
        return { itemId: item.itemId ? item.itemId : null, text: itemText ? itemText : null, userData: item.userData ? item.userData : null } as MenuItem;
    }

    getItem(event: Event) {
        const $target = event.target as Element;
        //collapse menu if in mobile view
        //if ($(window).width() < 768) {
        if (this.isCollapseIn()) {
            //if collapseOnClick is set don't collapse menu if we are selecting a drop-down
            if (this.collapseOnClick) {
                if (!$target.classList.contains('dropdown')) {

                    // check if is a SPAN direct child of dropdown
                    if ($target && $target.nodeName === 'SPAN') {
                        const parentNode = $target.parentElement;
                        if (!parentNode || !parentNode.classList.contains('dropdown')) {
                            this.document.getElementById('#' + this.servoyApi.getMarkupId() + '-toggle-button').click();
                        }
                    } else {
                        this.document.getElementById('#' + this.servoyApi.getMarkupId() + '-toggle-button').click();
                    }
                }
            }
        }
        try {
            const dataMenuItemElement = $target.closest('[data-menu-item-id]');
            if (!dataMenuItemElement) {
                return null;
            }
            const itemId = dataMenuItemElement.getAttribute('data-menu-item-id');
            let itemClicked: BaseMenuItem;
            if (!itemId) {
                return null;
            } else {
                for (const i of Object.keys(this.menuItems)) {
                    const menuItem = this.menuItems[i];
                    if (menuItem.itemId === itemId) {
                        itemClicked = menuItem;
                        break;
                    }
                    if (menuItem.subMenuItems) {
                        //dropdown
                        for (const s of Object.keys(menuItem.subMenuItems)) {
                            if (menuItem.subMenuItems[s].itemId === itemId) {
                                itemClicked = menuItem.subMenuItems[s];
                                break;
                            }
                        }
                        if (itemClicked) {
                            break;
                        }
                    }
                }
                if (itemClicked instanceof MenuItem) {
                    if (itemClicked && (itemClicked.displayType === 'INPUT' || itemClicked.displayType === 'INPUT_GROUP')) {
                        itemClicked.displayValue = (event.target as HTMLInputElement).value;
                    }
                }
                return itemClicked;
            }
        } catch (e) {
            console.log('Error when trying to figure out navbar itemId: ' + e.message);
        }
        return null;
    }

    makeItemActive(item: BaseMenuItem) {
        if (!item || !this.markClickedItemActive) {
            return;
        }
        for (const i of Object.keys(this.menuItems)) {
            const menuItem = this.menuItems[i];
            if (menuItem.itemId === item.itemId) {
                menuItem.isActive = true;
            } else if (menuItem.isActive === true) {
                menuItem.isActive = false;
            }
        }
    }

    requestFocus(itemId: string) {
        const inputEl = this.getNativeElement().querySelector('[data-menu-item-id=' + itemId + ']');
        if (inputEl instanceof HTMLInputElement) inputEl.focus();
    }

    getLocation(itemId: string) {
        if (itemId) {
            const el = this.getNativeElement().querySelector('[data-menu-item-id=' + itemId + ']');
            if (el) {
                const position = el.getBoundingClientRect();
                return { x: position.left, y: position.top };
            }

        }
        return null;
    }

    getSize(itemId: string) {
        if (itemId) {
            const el = this.getNativeElement().querySelector('[data-menu-item-id=' + itemId + ']');
            if (el) {
                const position = el.getBoundingClientRect();
                return { width: position.width, height: position.height };
            }
        }
        return null;
    }

    getFilterValues(index: number) {
        this.initTypeaheads(this.menuItems);
        const item = this.menuItems[index];
        const focus$ = this.focusSubjects[index];
        return (text$: Observable<string>) => {
            const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            const inputFocus$ = focus$;

            return merge(debouncedText$, inputFocus$).pipe(switchMap(term => (term === '' ? of(item.valuelist)
                : item.valuelist.filterList(term))));
        };

    }

    initTypeaheads(items: Array<MenuItem>) {
        if (!this.typeaheadInit && items) {
            this.typeaheadInit = true;
            for (let i = 0; i < items.length; i++) {
                const menuItem = items[i];
                if (menuItem.valuelist && (menuItem.displayType === 'INPUT' || menuItem.displayType === 'INPUT_GROUP')) {
                    this.focusSubjects[i] = new Subject<string>();
                } else {
                    this.focusSubjects[i] = null;
                }
            }
        }
    }

    onFocus(index: number) {
        this.focusSubjects[index].next('');
    }

    clickBrand(event: Event) {
        event.preventDefault();
        if (this.onBrandClicked) {
            this.onBrandClicked(event);
        }
    }

    toggleCollapse() {
        const el = this.getNativeElement().querySelector('.navbar-collapse');
        if (el) {
            if (el.classList.contains('show')) {
                this.renderer.removeClass(el, 'show');
            } else {
                this.renderer.addClass(el, 'show');
            }
        }
    }

    openMenu(event: MouseEvent) {
        this.showSubMenu(event.target as Element);
    }

    openSubMenu(itemId: string) {
        this.showSubMenu(this.getNativeElement().querySelector("[data-menu-item-id='" + itemId + "']"));

    }

    showSubMenu(element: Element) {
        if (element) {
            this.positionMenu(element);
            element = element.closest('.dropdown');
            if (element) {
                element = element.querySelector('.dropdown-menu');
            }
            if (element) {
                this.renderer.addClass(element, 'show');
                const closeOnClick = () => {
                    this.renderer.removeClass(element, 'show');
                    this.document.removeEventListener('mousedown', closeOnClick);
                };
                this.document.addEventListener('mousedown', closeOnClick);
            }
        }
    }

    closeSubMenu(element: Element) {
        if (element) {
            element = element.closest('.dropdown');
            if (element) {
                element = element.querySelector('.dropdown-menu');
                if (element) {
                    this.renderer.removeClass(element, 'show');
                }
            }
        }
    }

    closeOtherSubMenu(element: Element) {
        if (element) {
            element = element.closest('.dropdown');
            if (element) {
                element = element.querySelector('.dropdown-menu');
                if (element) {
                    const allSubMenus = element.closest('bootstrapextracomponents-navbar').querySelectorAll('.dropdown-menu');
                    allSubMenus.forEach((item) => item !== element && this.closeSubMenu(item));
                }
            }
        }
    }

    navigateSubMenu(element: Element, direction: String) {
        if (element) {
            element = element.closest('.dropdown');
            if (element) {
                element = element.querySelector('.dropdown-menu');
                if (element.classList.contains('show')) {
                    const elements = element.querySelectorAll('a');
                    if (!this.firstShow) {
                        if (direction === 'ArrowDown' && this.indexToFocus < (elements.length - 1)) {
                            this.indexToFocus++;
                        } else if (direction === 'ArrowUp' && this.indexToFocus > 0) {
                            this.indexToFocus--;
                        }
                    }
                    elements[this.indexToFocus].focus();
                    this.firstShow = false;
                } else {
                    this.indexToFocus = 0;
                    this.firstShow = true;
                    this.closeOtherSubMenu(element);
                    this.showSubMenu(element);
                }
            }
        }
    }

    private copyServoyMenu() {
        if (this.shouldCopyServoyMenu) {
            if (this.servoyMenu) {
                const oldMenu = new Array();
                for (let i = 0; i < this.servoyMenu.items.length; i++) {
                    const source = this.servoyMenu.items[i];
                    const menuItem = {} as MenuItem;
                    menuItem.text = source.menuText;
                    menuItem.itemId = source.itemID;
                    menuItem.styleClass = source.styleClass;
                    menuItem.enabled = source.enabled;
                    menuItem.iconName = source.iconStyleClass;
                    menuItem.tabindex = source.extraProperties?.Navbar?.tabindex;
                    menuItem.userData = source.extraProperties?.Navbar?.userData;
                    menuItem.attributes = source.extraProperties?.Navbar?.attributes;
                    menuItem.position = source.extraProperties?.Navbar?.position;
                    menuItem.displayType = source.extraProperties?.Navbar?.displayType;
                    menuItem.dataProvider = source.extraProperties?.Navbar?.dataProvider;
                    menuItem.valuelist = source.extraProperties?.Navbar?.valuelist;
                    menuItem.tooltip = source.tooltipText;
                    menuItem.inputButtonText = source.extraProperties?.Navbar?.inputButtonText;
                    menuItem.inputButtonStyleClass = source.extraProperties?.Navbar?.inputButtonStyleClass;
                    menuItem.isActive = source.isSelected;
                    if (source.items && source.items.length > 0) {
                        menuItem.subMenuItems = new Array();
                        for (let i = 0; i < source.items.length; i++) {
                            const subMenuItem = {} as SubMenuItem;
                            const childSource = source.items[i];
                            subMenuItem.text = childSource.menuText;
                            subMenuItem.itemId = childSource.itemID;
                            subMenuItem.styleClass = childSource.styleClass;
                            subMenuItem.enabled = childSource.enabled;
                            subMenuItem.iconName = childSource.iconStyleClass;
                            subMenuItem.tabindex = childSource.extraProperties?.Navbar?.tabindex;
                            subMenuItem.userData = childSource.extraProperties?.Navbar?.userData;
                            subMenuItem.isDivider = childSource.extraProperties?.Navbar?.isDivider;
                            menuItem.subMenuItems.push(subMenuItem);
                        }
                    }
                    oldMenu.push(menuItem);
                }
                this.menuItems = oldMenu;
            }
        }
    }
}
class BaseMenuItem extends BaseCustomObject {
    public text: string;
    public itemId: string;
    public tabindex: string;
    public enabled: boolean;
    public styleClass: string;
    public userData: any;
    public iconName: string;
    public onAction: (...args: unknown[]) => void;
}

export class MenuItem extends BaseMenuItem {
    public attributes: Array<{ key: string; value: string }>;
    public subMenuItems: Array<SubMenuItem>;
    public position: string;
    public displayType: string;
    public dataProvider: any;
    public displayValue: string;
    public inputButtonText: string;
    public inputButtonStyleClass: string;
    public isActive: boolean;
    public tooltip: string;
    public valuelist: IValuelist;

    getWatchedProperties() {
        return [];
    }
}

class SubMenuItem extends BaseMenuItem {
    public isDivider: boolean;
}

@Directive({
    selector: '[svyAttributes]'
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class SvyAttributes implements OnInit {
    @Input('svyAttributes') attributes: Array<{ key: string; value: string }>;

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit(): void {
        if (this.attributes) {
            this.attributes.forEach(attribute => this.renderer.setAttribute(this.el.nativeElement, attribute.key, attribute.value));
        }
    }
}
