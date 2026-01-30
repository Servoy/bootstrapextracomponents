import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ServoyBaseComponent } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-badge',
    templateUrl: './badge.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapExtraBadge extends ServoyBaseComponent<HTMLDivElement> {
    readonly onAction = input<(e: Event, data?: any) => void>(undefined);
    readonly onRightClick = input<(e: Event, data?: any) => void>(undefined);
    readonly onDoubleClick = input<(e: Event, data?: any) => void>(undefined);

    readonly enabled = input<boolean>(undefined);
    readonly displayType = input<string>(undefined);
    readonly text = input<string>(undefined);
    readonly badgeText = input<string>(undefined);
    readonly imageStyleClass = input<string>(undefined);
    readonly styleClass = input<string>(undefined);
    readonly visible = input<boolean>(undefined);
    readonly toolTipText = input<string>(undefined);

    timeoutID: number;

    isTrustedHTML(): boolean {
        if (this.servoyApi.trustAsHtml()) {
            return true;
        }
        return false;
    }

    public getFocusElement(): HTMLElement {
        return this.getNativeElement();
    }

    svyOnInit() {
        super.svyOnInit();
        const onDoubleClick = this.onDoubleClick();
        if (this.onAction()) {
            if (onDoubleClick) {
                this.renderer.listen(this.getFocusElement(), 'click', e => {
                    if (this.timeoutID) {
                        window.clearTimeout(this.timeoutID);
                        this.timeoutID = null;
                        // double click, do nothing will be done in sub classes
                    } else {
                        this.timeoutID = window.setTimeout(() => {
                            this.timeoutID = null;
                            this.onAction()(e);
                        }, 250);
                    }
                });
            } else {
                this.renderer.listen(this.getFocusElement(), 'click', e => this.onAction()(e));
            }
        }
        if (this.onRightClick()) {
            this.renderer.listen(this.getFocusElement(), 'contextmenu', e => {
                this.onRightClick()(e); return false;
            });
        }
        if (onDoubleClick) {
            this.renderer.listen(this.elementRef.nativeElement, 'dblclick', (e) => {
                this.onDoubleClick()(e);
            });
        }
    }

}