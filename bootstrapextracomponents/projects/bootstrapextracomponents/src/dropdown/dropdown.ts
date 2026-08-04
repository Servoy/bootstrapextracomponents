import { Component, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy, input } from '@angular/core';
import { BaseCustomObject, ServoyBaseComponent, ServoyPublicService } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-dropdown',
    templateUrl: './dropdown.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapExtraDropdown extends ServoyBaseComponent<HTMLDivElement> {

    readonly styleClass = input<string | undefined>(undefined);
    readonly buttonStyleClass = input<string | undefined>(undefined);
    readonly imageStyleClass = input<string | undefined>(undefined);
    readonly isButton = input<boolean | undefined>(undefined);
    readonly isSplitButton = input<string | undefined>(undefined);
    readonly visible = input<boolean | undefined>(undefined);
    readonly text = input<string | undefined>(undefined);
    readonly enabled = input<boolean | undefined>(undefined);
    readonly toolTipText = input<string | undefined>(undefined);

    readonly menuItems = input<Array<MenuItem> | undefined>(undefined);

    readonly onMenuItemSelected = input<((e: Event, menuItem: BaseMenuItem) => void) | undefined>(undefined);
    readonly onAction = input<((e: Event) => void) | undefined>(undefined);


    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, private servoyService: ServoyPublicService) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
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
            const jsEvent = this.servoyService.createJSEvent(e as any, 'action');
            menuItem.onAction(jsEvent, this.createItemArg(menuItem));
        } else if (onMenuItemSelected) {
             onMenuItemSelected(e, this.createItemArg(menuItem));
        }
    }

    createItemArg(menuItem: MenuItem): BaseMenuItem {
        return {itemId : menuItem.itemId , text: menuItem.text, userData : menuItem.userData} as BaseMenuItem;
    }
}
class BaseMenuItem extends BaseCustomObject {
    public text!: string;
    public itemId!: string;
    public userData!: any;
}

export class MenuItem extends BaseMenuItem {
    public isDivider!: boolean;
    public enabled!: boolean;
    public iconName!: string;
    public onAction!: (...args: unknown[]) => void;
}

