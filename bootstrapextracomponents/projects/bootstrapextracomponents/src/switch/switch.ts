
import { ChangeDetectorRef, Component, Inject, Renderer2, SimpleChanges, DOCUMENT, input, output, linkedSignal, computed, effect } from '@angular/core';
import { ServoyBaseComponent } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-switch',
    templateUrl: './switch.html',
    standalone: false
})
/**
 * Bootstrap switch component based on https://github.com/JulioWar/jw-bootstrap-switch-ng2
 */
export class ServoyBootstrapExtraSwitch extends ServoyBaseComponent<HTMLDivElement> {

    readonly styleClass = input<string>(undefined);
    readonly tabSeq = input<number>(undefined);
    readonly enabled = input<boolean>(undefined);
	readonly readOnly = input<boolean>(undefined);
    readonly componentSize = input<string>(undefined);
    readonly animate = input<boolean>(undefined);
    readonly label = input<string>(undefined);
    readonly onText = input<string>(undefined);
    readonly offText = input<string>(undefined);
    readonly onColor = input<string>(undefined);
    readonly offColor = input<string>(undefined);
    readonly labelWidth = input<any>(undefined);
    readonly handleWidth = input<any>(undefined);
    readonly dataProviderIDChange = output<any>();
    readonly dataProviderID = input<any>(undefined);

    readonly onActionMethodID = input<(e: Event) => void>(undefined);
    readonly onDataChangeMethodID = input<(oldValue: any, newValue: any, e: Event) => boolean>(undefined);
    
    // as the input is read-only, this is basically the DP that can change client side
    _dataProviderID = linkedSignal<any>(() => this.dataProviderID());
    
    // this is the boolean state representation of the data-provider that is needed by the switch component
    // it is a read-only computed signal that automatically changes when _dataProviderID signal changes
    _state = computed<boolean>(() => this.getSelectionFromDataprovider(this._dataProviderID()));

    inputEl: HTMLInputElement;
    runtimeTabIndex: number = -1;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) private doc: Document) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        this.inputEl = this.getNativeElement().querySelector('input');
        this.inputEl.tabIndex = this.runtimeTabIndex;
        this.renderer.listen(this.getNativeElement(), 'focus', (e) => {
            this.requestFocus();
        });
        super.svyOnInit();
    }

    setTabIndex(tabIndex: number) {
        this.runtimeTabIndex = tabIndex;
        if (this.inputEl){
             this.inputEl.tabIndex = tabIndex;
        }
    }
    
    onChange(e: Event) {
        const dataProviderID = this._dataProviderID();
        if (typeof dataProviderID === 'string') {
            this._dataProviderID.set(dataProviderID === '1' ? '0' : '1');
        } else {
            this._dataProviderID.set(dataProviderID > 0 ? 0 : 1);
        }
        this.dataProviderIDChange.emit(this._dataProviderID());
        // need to create a js event as the argument of onChange is not a DOM event
        const onActionMethodID = this.onActionMethodID();
        if (onActionMethodID) onActionMethodID(this.createJSEvent());
    }

    getSelectionFromDataprovider(dataProviderID: any): boolean {
        if (!dataProviderID) {
            return false;
        } else if (typeof dataProviderID === 'string') {
            return dataProviderID === '1';
        } else {
            return dataProviderID > 0;
        }
    }

    createJSEvent() {
        const element = this.getNativeElement();
        const x = element.offsetLeft;
        const y = element.offsetTop;

        const event = this.doc.createEvent('MouseEvents');
        event.initMouseEvent('click', false, true, window, 1, x, y, x, y, false, false, false, false, 0, null);
        return event;
    }

    requestFocus() {
        this.inputEl.focus();
    }
}
