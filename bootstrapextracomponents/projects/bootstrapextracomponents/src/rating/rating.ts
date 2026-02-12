import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, input, output, signal } from '@angular/core';
import { ServoyBaseComponent, JSEvent, EventLike, ServoyPublicService } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-rating',
    templateUrl: './rating.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapExtraRating extends ServoyBaseComponent<HTMLDivElement> {
    readonly onLeave = input<(e: JSEvent, data?: any) => void>(undefined);
    readonly onHover = input<(e: JSEvent, data?: any) => void>(undefined);
    readonly onDataChangeMethodID = input<(oldValue: any, newValue: any, e: Event) => boolean>(undefined);

    readonly enabled = input<boolean>(undefined);
	readonly readOnly = input<boolean>(undefined);
    readonly dataProviderID = input<number>(undefined);
    readonly dataProviderIDChange = output<number>();
    readonly max = input<number>(undefined);
    readonly showPercentageOnHover = input<boolean>(undefined);
    readonly stateOn = input<string>(undefined);
    readonly stateOff = input<string>(undefined);
    
    _dataProviderID = signal<number>(undefined);

    overStar = false;
    percent: number;

    constructor( renderer: Renderer2, cdRef: ChangeDetectorRef, private servoyService: ServoyPublicService ) {
        super( renderer, cdRef );
    }


    svyOnInit() {
        super.svyOnInit();
        this._dataProviderID.set(this.dataProviderID());
        this.percent = this._dataProviderID() * 100 / this.max() ;
    }

    onLeaveEvent() {
        this.overStar = false;
        const onLeave = this.onLeave();
        if (onLeave) {
            const jsEvent = this.servoyService.createJSEvent( {target : this.getNativeElement()} as EventLike, 'onLeave' );

            onLeave(jsEvent, this._dataProviderID());
        }
    }

    onHoverEvent(value: number) {
        if (this.enabled() !== false) {
            this.percent = value / this.max() * 100;
            this.overStar = true;
            const onHover = this.onHover();
            if (onHover) {
                const jsEvent = this.servoyService.createJSEvent( {target : this.getNativeElement()}  as EventLike, 'onHover' );

                onHover(jsEvent, this._dataProviderID());
            }

        }
    }

    onChange(){
        this.dataProviderIDChange.emit(this._dataProviderID());
    }
}
