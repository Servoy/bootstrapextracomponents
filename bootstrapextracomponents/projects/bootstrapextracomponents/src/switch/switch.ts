
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, Renderer2, SimpleChanges, DOCUMENT } from '@angular/core';
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

    @Input() styleClass: string;
    @Input() tabSeq: number;
    @Input() enabled: boolean;
    @Input() componentSize: string;
    @Input() animate: boolean;
    @Input() label: string;
    @Input() onText: string;
    @Input() offText: string;
    @Input() onColor: string;
    @Input() offColor: string;
    @Input() labelWidth: any;
    @Input() handleWidth: any;
    @Output() dataProviderIDChange = new EventEmitter();
    @Input() dataProviderID: any;
    @Input() state: boolean;

    @Input() onActionMethodID: (e: Event) => void;
    @Input() onDataChangeMethodID: (oldValue: any, newValue: any, e: Event) => boolean;

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

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                switch (property) {
                    case 'dataProviderID':
                        this.setSelectionFromDataprovider();
                        break;
                }
            }
        }
    }

    setTabIndex(tabIndex: number) {
        this.runtimeTabIndex = tabIndex;
        if (this.inputEl){
             this.inputEl.tabIndex = tabIndex;
        }
    }
    
    onChange(e: Event) {
        if (typeof this.dataProviderID === 'string') {
            this.dataProviderID = this.dataProviderID === '1' ? '0' : '1';
        } else {
            this.dataProviderID = this.dataProviderID > 0 ? 0 : 1;
        }
        this.dataProviderIDChange.emit(this.dataProviderID);
        // need to create a js event as the argument of onChange is not a DOM event
        if (this.onActionMethodID) this.onActionMethodID(this.createJSEvent());
    }

    setSelectionFromDataprovider() {
        this.state = this.getSelectionFromDataprovider();
    }

    getSelectionFromDataprovider(): boolean {
        if (!this.dataProviderID) {
            return false;
        } else if (typeof this.dataProviderID === 'string') {
            return this.dataProviderID === '1';
        } else {
            return this.dataProviderID > 0;
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
