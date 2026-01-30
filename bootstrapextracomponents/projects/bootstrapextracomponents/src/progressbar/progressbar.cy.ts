import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraProgressBar } from './progressbar';
import { Component, ViewChild, signal, output } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapextracomponents-progressbar
            [servoyApi]="servoyApi"
            [type]="type()"
            [styleClass]="styleClass()"
            [dataProviderID]="dataProviderID()"
            (dataProviderIDChange)="dataProviderIDChange.emit($event)"
            [animate]="animate()"
            [max]="max()"
            [showValue]="showValue()"
            [showValueAsPercentage]="showValueAsPercentage()"
            [tabSeq]="tabSeq()"
            [valueText]="valueText()"
            [value]="value()"
            #element>
        </bootstrapextracomponents-progressbar>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    animate = signal<boolean>(undefined);
    max = signal<number>(undefined);
    showValue = signal<boolean>(undefined);
    showValueAsPercentage = signal<boolean>(undefined);
    tabSeq = signal<number>(undefined);
    valueText = signal<string>(undefined);
    value = signal<number>(undefined);
    type = signal<string>(undefined);
    styleClass = signal<string>(undefined);
    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyBootstrapExtraProgressBar;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    type: 'info',
    showValue: true,
    showValueAsPercentage: true,
    animate: true,
    max: 100,
    dataProviderID: 1,
    styleClass: undefined,
    tabSeq: undefined,
    valueText: undefined,
    value: undefined
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

describe('ServoyBootstrapExtraProgressBar Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraProgressBar],
        imports: [ServoyPublicTestingModule, NgbProgressbar]
    }

    it('when component is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-progressbar').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-progressbar').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-extra-progressbar').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-progressbar').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-extra-progressbar').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovider change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('.progress-bar b').should('have.text', '1%').then(() => {
                wrapper.component.dataProviderID.set(2);
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('.progress-bar b').should('have.text', '2%');
            });
        });
    });
})