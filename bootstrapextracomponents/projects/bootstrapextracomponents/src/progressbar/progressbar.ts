import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, input, linkedSignal } from '@angular/core';
import { ServoyBaseComponent, ServoyPublicModule } from '@servoy/public';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bootstrapextracomponents-progressbar',
    templateUrl: './progressbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, NgbProgressbar]
})
export class ServoyBootstrapExtraProgressBar extends ServoyBaseComponent<HTMLDivElement> {
    readonly styleClass = input<string | undefined>(undefined);
    readonly value = input<number | undefined>(undefined);
    readonly type = input<string | undefined>(undefined);
    readonly animate = input<boolean | undefined>(undefined);
    readonly showValue = input<boolean | undefined>(undefined);
    readonly showValueAsPercentage = input<boolean | undefined>(undefined);
    readonly valueText = input<string | undefined>(undefined);
    readonly max = input<number | undefined>(undefined);
    readonly tabSeq = input<number | undefined>(undefined);
    readonly dataProviderID = input<any>(undefined);
    
    _value = linkedSignal<number>(() => this.value() ?? 0);
    _valueText = linkedSignal<string>(() => this.valueText() ?? '');

    getNativeElement(): HTMLDivElement {
        return this.elementRef()?.nativeElement?.firstChild as HTMLDivElement;
    }

    updateProgressBar(value: number, text: string) {
        this._value.set(value);
        if (text !== undefined) {
            this._valueText.set(text);
        }
    }
}
