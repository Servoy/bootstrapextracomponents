import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraProgressBar } from './progressbar';
import { Component, ViewChild } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapextracomponents-progressbar
            [servoyApi]="servoyApi"
            [type]="type"
            [styleClass]="styleClass"
            [dataProviderID]="dataProviderID"
            (dataProviderIDChange)="dataProviderIDChange($event)"
            [animate]="animate"
            [max]="max"
            [showValue]="showValue"
            [showValueAsPercentage]="showValueAsPercentage"
            [tabSeq]="tabSeq"
            [valueText]="valueText"
            [value]="value"
            #element>
        </bootstrapextracomponents-progressbar>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    animate: boolean;
    max: number;
    showValue: boolean;
    showValueAsPercentage: boolean;
    tabSeq: number;
    valueText: string;
    value: number;
    type: string;
    styleClass: string;
    dataProviderID: unknown;
    dataProviderIDChange: (data?: any) => void;

    @ViewChild('element') element: ServoyBootstrapExtraProgressBar;
}

describe('ProgressBar Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraProgressBar],
        imports: [ServoyPublicTestingModule, NgbProgressbar]
    }

    beforeEach(() => {
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            type: 'info',
            showValue: true,
            showValueAsPercentage: true,
            animate: true,
            max: 100,
            dataProviderID: 1
        }
    });

    it('when component is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('.bts-extra-progressbar').should('exist');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-progressbar').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-progressbar').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-progressbar').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-progressbar').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should not emit dataProviderIDChange event dataprovider change', () => {
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.progress-bar b').should('have.text', '1%').then(() => {
                wrapper.component.dataProviderID = 2;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('.progress-bar b').should('have.text', '2%');
            });
        });
    });
})