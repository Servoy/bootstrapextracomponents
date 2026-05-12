import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, input, linkedSignal } from '@angular/core';
import { ServoyBaseComponent } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-progressbar',
    templateUrl: './progressbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapExtraProgressBar extends ServoyBaseComponent<HTMLDivElement> {
    readonly styleClass = input<string>(undefined);
    readonly value = input<number>(undefined);
    readonly type = input<string>(undefined);
    readonly animate = input<boolean>(undefined);
    readonly showValue = input<boolean>(undefined);
    readonly showValueAsPercentage = input<boolean>(undefined);
    readonly valueText = input<string>(undefined);
    readonly max = input<number>(undefined);
    readonly tabSeq = input<number>(undefined);
    readonly dataProviderID = input<any>(undefined);
    
    _value = linkedSignal<number>(() => this.value());
    _valueText = linkedSignal<string>(() => this.valueText());

     constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
            super(renderer, cdRef);
    }

    getNativeElement() {
        if (this.elementRef) {
            return this.elementRef.nativeElement.firstChild as HTMLDivElement;
        }
        return null;
    }

    updateProgressBar(value: number, text: string) {
        this._value.set(value);
        if (text !== undefined) {
            this._valueText.set(text);
        }
        this.cdRef.detectChanges();
    }
}

