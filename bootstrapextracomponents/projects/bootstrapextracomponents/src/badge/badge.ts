import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { ServoyBaseComponent, ServoyPublicModule } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-badge',
    templateUrl: './badge.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule]
})
export class ServoyBootstrapExtraBadge extends ServoyBaseComponent<HTMLDivElement> {
    readonly onAction = input<((e: Event, data?: any) => void) | undefined>(undefined);
    readonly onRightClick = input<((e: Event, data?: any) => void) | undefined>(undefined);
    readonly onDoubleClick = input<((e: Event, data?: any) => void) | undefined>(undefined);

    readonly enabled = input<boolean | undefined>(undefined);
    readonly displayType = input<string | undefined>(undefined);
    readonly text = input<string | undefined>(undefined);
    readonly badgeText = input<string | undefined>(undefined);
    readonly tone = input<string | undefined>(undefined);
    readonly toneStyle = input('soft', { transform: (v: string | undefined) => v ?? 'soft' });
    readonly imageStyleClass = input<string | undefined>(undefined);
    readonly styleClass = input<string | undefined>(undefined);
    readonly visible = input<boolean | undefined>(undefined);
    readonly toolTipText = input<string | undefined>(undefined);

    /**
     * The secondary bubble is only rendered for a badgeText that carries a value. A blank
     * string must not render it, but a numeric 0 is a legitimate count and must.
     */
    readonly showBadgeText = computed(() => {
        const text = this.badgeText();
        return text !== null && text !== undefined && String(text).trim() !== '';
    });

    readonly toneClass = computed(() => {
        const tone = this.tone();
        return tone ? `bts-extra-badge--tone-${tone} bts-extra-badge--${this.toneStyle()}` : '';
    });

    timeoutID!: number;

    isTrustedHTML(): boolean {
        if (this.servoyApi().trustAsHtml()) {
            return true;
        }
        return false;
    }

    public getFocusElement(): HTMLElement {
        return this.getNativeElement();
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.onAction()) {
            if (this.onDoubleClick()) {
                this.renderer.listen(this.getFocusElement(), 'click', e => {
                    if (this.timeoutID) {
                        window.clearTimeout(this.timeoutID);
                        this.timeoutID = null as any;
                         // double click, do nothing will be done in sub classes
                    } else {
                        this.timeoutID = window.setTimeout(() => {
                        this.timeoutID = null as any;
                            this.onAction()!(e);
                        }, 250);
                    }
                });
            } else {
                this.renderer.listen(this.getFocusElement(), 'click', e => this.onAction()!(e));
            }
        }
        if (this.onRightClick()) {
            this.renderer.listen(this.getFocusElement(), 'contextmenu', e => {
                this.onRightClick()!(e); return false;
            });
        }
        if (this.onDoubleClick()) {
            this.renderer.listen(this.elementRef()!.nativeElement, 'dblclick', (e) => {
                this.onDoubleClick()!(e);
            });
        }
    }

}
