import { Component, ChangeDetectorRef, Renderer2, ChangeDetectionStrategy, input, output, linkedSignal } from '@angular/core';
import { ServoyBaseComponent } from '@servoy/public';

@Component({
    selector: 'bootstrapextracomponents-breadcrumbs',
    templateUrl: './breadcrumbs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapExtraBreadcrumbs extends ServoyBaseComponent<HTMLElement> {

    readonly styleClass = input<string>(undefined);
    readonly crumbStyleClass = input<string>(undefined);
    readonly lastCrumbStyleClass = input<string>(undefined);
    readonly breadcrumbs = input<Array<Crumb>>(undefined);
    readonly breadcrumbsChange = output<Array<Crumb>>();
    readonly autoRemoveWhenClicked = input<boolean>(undefined);

    readonly onCrumbClicked = input<(event: MouseEvent, crumb: Crumb, index: number) => Promise<boolean>>(undefined);

    _breadcrumbs = linkedSignal<Array<Crumb>>(() => this.breadcrumbs());

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.servoyApi.isInDesigner() && !this.breadcrumbs()) {
            this._breadcrumbs.set(new Array({ crumbId: 'Home', displayName: 'Home' }, { crumbId: 'Library', displayName: 'Library' }, { crumbId: 'Data', displayName: 'Data' }));
        }
    }

    crumbClicked(event, crumb, index) {
        if (this.autoRemoveWhenClicked() == true) {
            const breadcrumbs = this._breadcrumbs();
            if (breadcrumbs) {
                breadcrumbs.splice(index + 1, breadcrumbs.length - index - 1);
                this.breadcrumbsChange.emit(breadcrumbs);
            }
        }
        const onCrumbClicked = this.onCrumbClicked();
        if (onCrumbClicked) {
            onCrumbClicked(event, crumb, index);
        }
    }

}

class Crumb {
    public crumbId: string;
    public displayName: string;
}
