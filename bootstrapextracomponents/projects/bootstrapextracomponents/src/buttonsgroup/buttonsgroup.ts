import { Component, ChangeDetectorRef, Renderer2, ChangeDetectionStrategy, input, output, linkedSignal, computed } from '@angular/core';
import { IValuelist, ServoyBaseComponent } from '@servoy/public';
import { Format } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-buttons-group',
    templateUrl: './buttonsgroup.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapExtraButtonsGroup extends ServoyBaseComponent<HTMLElement> {

    readonly styleClass = input<string>(undefined);
    readonly valuelistID = input<IValuelist>(undefined);
    readonly showAs = input<string>(undefined);
    readonly enabled = input<boolean>(undefined);
	readonly readOnly = input<boolean>(undefined);
    readonly tabSeq = input<number>(undefined);
    readonly inputType = input<string>(undefined);
    readonly toolTipText = input<string>(undefined);
    readonly format = input<Format>(undefined);
    readonly onDataChangeMethodID = input<(e: Event) => void>(undefined);
    
    readonly dataProviderIDChange = output();
    readonly dataProviderID = input<any>(undefined);
    
    _dataProviderID = linkedSignal<any>(() => this.dataProviderID());

    readonly selectedValues = computed(() => {
        const value = this._dataProviderID();
        const result: Record<string, boolean> = {};
        if (value || value == 0) {
            if (this.hasMultiSelection()) {
                value.toString().split('\n').forEach(v => result[v] = true);
            } else {
                result[value] = true;
            }
        }
        return result;
    });

    oldValue: any;
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    updateSelectedValues(value: any) {
        this._dataProviderID.set(value);
    }

    onClick(item) {
        // prevent click if is disabled
        if (this.enabled()) {
            // keep the old value. Old value will be restored if onDataChange returns false.
            this.oldValue = this.dataProviderID();

            // allow deselection
            let newValue;
            let selectedValue = item.realValue;

            if (this.oldValue == selectedValue) {    // deselect last value
                if (this.allowEmptyValuelistItem(item) && this.oldValue == selectedValue) {   // deselect last option
                    newValue = null;
                } else {    // cannot deselect last value
                    // Do nothing
                    newValue = this.oldValue;
                    return;
                }
            } else {    // select/deselect a value
                if (this.hasMultiSelection() && this.isTypeString()) {
                    if (this.selectedValues()[selectedValue]) { // value is already selected;
                        // TODO remove it
                        let values = this.dataProviderID().toString().split("\n");    // dataProviderID should be filled since there is a selectedValue
                        newValue = values.filter(function(value) {
                            return value != selectedValue
                        }).join("\n");
                    } else { // value was not selected;
                        if (this.oldValue !== null && this.oldValue !== undefined && this.oldValue !== "") {
                            newValue = this.oldValue + '\n' + selectedValue;
                        } else {
                            newValue = selectedValue;
                        }
                    }
                } else {
                    // update selection
                    newValue = selectedValue;
                }
            }

            this._dataProviderID.set(newValue);
            this.dataProviderIDChange.emit(newValue);
        }
    }

    onDataChangeCallback(event, returnval) {

        if (returnval == false) { // restore the oldValue
            this._dataProviderID.set(this.oldValue);
            this.dataProviderIDChange.emit(this.oldValue);
        } else {
            this.oldValue = null;
        }
    }

    hasMultiSelection() {
        return this.inputType() === 'checkbox';
    }

    allowEmptyValuelistItem(item) {
        const valuelistID = this.valuelistID();
        if (valuelistID.length) {
            let item = valuelistID[0];
            return (item.realValue == null || item.realValue == '') && item.displayValue == '';
        }
        return false;
    }

    isTypeString() {
        const dataProviderID = this.dataProviderID();
        const format = this.format();
        return (!format && (dataProviderID === null || dataProviderID === undefined)) || (format && format.type === 'TEXT')
    }
}
