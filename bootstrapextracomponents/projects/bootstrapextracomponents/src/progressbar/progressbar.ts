import { Component, Input, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ServoyBaseComponent } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-progressbar',
    templateUrl: './progressbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapExtraProgressBar extends ServoyBaseComponent<HTMLDivElement> {
    @Input() styleClass: string;
    @Input() value: number;
    @Input() type: string;
    @Input() animate: boolean;
    @Input() showValue: boolean;
    @Input() showValueAsPercentage: boolean;
    @Input() valueText: string;
    @Input() max: number;
    @Input() tabSeq: number;
    @Input() dataProviderID: any;

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
        this.value = value;
        if (text !== undefined) {
            this.valueText = text;
        }
        this.cdRef.detectChanges();
    }
}

