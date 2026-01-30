import { Component, SimpleChanges, Renderer2, ChangeDetectorRef, input } from '@angular/core';
import { BaseCustomObject, ServoyBaseComponent, ServoyPublicService } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-dropdown',
    templateUrl: './dropdown.html',
    standalone: false
})
export class ServoyBootstrapExtraDropdown extends ServoyBaseComponent<HTMLDivElement> {

    readonly styleClass = input<string>(undefined);
    readonly buttonStyleClass = input<string>(undefined);
    readonly imageStyleClass = input<string>(undefined);
    readonly isButton = input<boolean>(undefined);
    readonly isSplitButton = input<string>(undefined);
    readonly visible = input<boolean>(undefined);
    readonly text = input<string>(undefined);
    readonly enabled = input<boolean>(undefined);
    readonly toolTipText = input<string>(undefined);

    readonly menuItems = input<Array<MenuItem>>(undefined);

    readonly onMenuItemSelected = input<(e: Event, menuItem: BaseMenuItem) => void>(undefined);
    readonly onAction = input<(e: Event) => void>(undefined);


    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, private servoyService: ServoyPublicService) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
    }

    buttonClicked(e: Event) {
        const onAction = this.onAction();
        if (onAction) {
            onAction(e);
        }
    }

    menuClicked(e: Event, menuItem: MenuItem) {
        const onMenuItemSelected = this.onMenuItemSelected();
        if (menuItem.onAction) {
            const jsEvent = this.servoyService.createJSEvent(e, 'action');
            menuItem.onAction(jsEvent, this.createItemArg(menuItem));
        } else if (onMenuItemSelected) {
             onMenuItemSelected(event, this.createItemArg(menuItem));
        }
    }

    createItemArg(menuItem: MenuItem): BaseMenuItem {
        return {itemId : menuItem.itemId , text: menuItem.text, userData : menuItem.userData} as BaseMenuItem;
    }
}
class BaseMenuItem extends BaseCustomObject {
    public text: string;
    public itemId: string;
    public userData: any;
}

export class MenuItem extends BaseMenuItem {
    public isDivider: boolean;
    public enabled: boolean;
    public iconName: string;
    public onAction: (...args: unknown[]) => void;
}

