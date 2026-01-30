import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraRating } from './rating';
import { Component, ViewChild, signal, output } from '@angular/core';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapextracomponents-rating
            [servoyApi]="servoyApi"
            [dataProviderID]="dataProviderID()"
            (dataProviderIDChange)="dataProviderIDChange.emit($event)"
            [max]="max()"
            [showPercentageOnHover]="showPercentageOnHover()"
            [enabled]="enabled()"
            [stateOn]="stateOn()"
            [stateOff]="stateOff()"
            (click)="onActionMethodID($event)"
            #element>
        </bootstrapextracomponents-rating>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    max = signal<number>(undefined);
    stateOn = signal<string>(undefined);
    stateOff = signal<string>(undefined);
    showPercentageOnHover = signal<boolean>(undefined);
    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();
    onActionMethodID: (e: Event, data?: any) => void;

    @ViewChild('element') element: ServoyBootstrapExtraRating;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    max: 5,
    dataProviderID: 1,
    enabled: true,
    stateOn: undefined,
    stateOff: undefined,
    showPercentageOnHover: undefined,
    onActionMethodID: undefined
};

function applyDefaultProps(wrapper) {
    for (const key in defaultValues) {
        if (wrapper.component.hasOwnProperty(key) && typeof wrapper.component[key] === 'function') {
            // If the property is a signal, update it using .set()
            wrapper.component[key].set(defaultValues[key]);
        }
        else {
            // Otherwise assign it as a normal property
            wrapper.component[key] = defaultValues[key];
        }
    }
}

describe('ServoyBootstrapExtraRating Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraRating],
        imports: [ServoyPublicTestingModule, NgbRating]
    }

    it('when component is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-rating').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('ngb-rating').should('not.have.attr', 'aria-readonly').then(() => {
                wrapper.component.enabled.set(false);
                cy.get('ngb-rating').should('have.attr', 'aria-readonly');
            });
        });
    });

    it('should emit dataProviderIDChange event on rating change', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('ngb-rating').should('exist').then(() => {
                cy.get('.visually-hidden').last().click().then(() => {
                    cy.wrap(dataProviderIDChange).should('have.been.called');
                });
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovider change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('ngb-rating').should('exist').then(() => {
                wrapper.component.dataProviderID.set(2);
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
            });
        });
    });
})