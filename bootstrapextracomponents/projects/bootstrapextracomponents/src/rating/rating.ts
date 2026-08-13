import { Component, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, input, output, linkedSignal , inject } from '@angular/core';
import { ServoyBaseComponent, JSEvent, EventLike, ServoyPublicService } from '@servoy/public';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'bootstrapextracomponents-rating',
    templateUrl: './rating.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgbRating]
})
export class ServoyBootstrapExtraRating extends ServoyBaseComponent<HTMLDivElement> {
    readonly onLeave = input<((e: JSEvent, data?: any) => void) | undefined>(undefined);
    readonly onHover = input<((e: JSEvent, data?: any) => void) | undefined>(undefined);
    readonly onDataChangeMethodID = input<((oldValue: any, newValue: any, e: Event) => boolean) | undefined>(undefined);

    readonly enabled = input<boolean | undefined>(undefined);
	readonly readOnly = input<boolean | undefined>(undefined);
    readonly dataProviderID = input<number | undefined>(undefined);
    readonly dataProviderIDChange = output<number>();
    readonly max = input<number | undefined>(undefined);
    readonly showPercentageOnHover = input<boolean | undefined>(undefined);
    readonly stateOn = input<string | undefined>(undefined);
    readonly stateOff = input<string | undefined>(undefined);
    
    _dataProviderID = linkedSignal<number>(() => this.dataProviderID() ?? 0);

    overStar = false;
    percent!: number;

    private readonly servoyService = inject(ServoyPublicService);


    svyOnInit() {
        super.svyOnInit();
        this.percent = this._dataProviderID() * 100 / this.max()! ;
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
            this.percent = value / this.max()! * 100;
            this.overStar = true;
            const onHover = this.onHover();
            if (onHover) {
                const jsEvent = this.servoyService.createJSEvent( {target : this.getNativeElement()}  as EventLike, 'onHover' );

                onHover(jsEvent, this._dataProviderID());
            }

        }
    }

    onChange(value: number){
        this._dataProviderID.set(value);
        this.dataProviderIDChange.emit(value);
    }
}
