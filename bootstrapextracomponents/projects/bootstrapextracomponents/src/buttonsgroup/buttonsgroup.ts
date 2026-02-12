import { Component, ChangeDetectorRef, Renderer2, SimpleChanges, input, output, signal } from '@angular/core';
import { IValuelist, ServoyBaseComponent } from '@servoy/public';
import { Format } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-buttons-group',
    templateUrl: './buttonsgroup.html',
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
    
    _dataProviderID = signal<any>(undefined);

    selectedValues = {};
    oldValue: any;
    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnChanges(changes: SimpleChanges) {
        for (const property of Object.keys(changes)) {
            const change = changes[property];
            switch (property) {
                case 'dataProviderID':
                    this._dataProviderID.set(this.dataProviderID());
                    this.updateSelectedValues(this.dataProviderID());
                    break;
                case 'valuelistID':
                    this.updateSelectedValues(this.dataProviderID());
                    break;

            }
        }
        super.svyOnChanges(changes);
    }

    updateSelectedValues(value: any) {
        var selectedValues = {};
        if (value || value == 0) {
            // store clientside selected values
            if (this.hasMultiSelection()) {
                let values = value.toString().split("\n");
                for (let i = 0; i < values.length; i++) {
                    selectedValues[values[i]] = true;
                }
            } else {    // store the selectedValue
                selectedValues[value] = true;
            }
        }
        this.selectedValues = selectedValues;
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
                    this.selectedValues = {};
                } else {    // cannot deselect last value
                    // Do nothing
                    newValue = this.oldValue;
                    return;
                }
            } else {    // select/deselect a value
                if (this.hasMultiSelection() && this.isTypeString()) {
                    if (this.selectedValues[selectedValue]) { // value is already selected;
                        // TODO remove it
                        delete this.selectedValues[selectedValue];
                        let values = this.dataProviderID().toString().split("\n");    // dataProviderID should be filled since there is a selectedValue
                        newValue = values.filter(function(value) {
                            return value != selectedValue
                        }).join("\n");
                    } else { // value was not selected;
                        this.selectedValues[selectedValue] = true;
                        if (this.oldValue !== null && this.oldValue !== undefined && this.oldValue !== "") {
                            newValue = this.oldValue + '\n' + selectedValue;
                        } else {
                            newValue = selectedValue;
                        }
                    }
                } else {
                    // update selection
                    newValue = selectedValue;
                    delete this.selectedValues[this.oldValue];
                    this.selectedValues[selectedValue] = true;
                }
            }

            this._dataProviderID.set(newValue);
            this.dataProviderIDChange.emit(this._dataProviderID());
        }
    }

    onDataChangeCallback(event, returnval) {

        if (returnval == false) { // restore the oldValue
            this.updateSelectedValues(this.oldValue);
            this._dataProviderID.set(this.oldValue);
            this.dataProviderIDChange.emit(this._dataProviderID());
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
