import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraSwitch } from './switch';
import { Component, ViewChild } from '@angular/core';
import { JwBootstrapSwitchNg2Module, JwBootstrapSwitchNg2Component } from '@servoy/jw-bootstrap-switch-ng2';

@Component({
    template: `
        <bootstrapextracomponents-switch
            [servoyApi]="servoyApi"
            [enabled]="enabled"
            (click)="onActionMethodID($event)"
            [styleClass]="styleClass"
            [dataProviderID]="dataProviderID"
            (dataProviderIDChange)="dataProviderIDChange($event)"
            [animate]="animate"
            [componentSize]="componentSize"
            [handleWidth]="handleWidth"
            [label]="label"
            [labelWidth]="labelWidth"
            [offColor]="offColor"
            [offText]="offText"
            [onColor]="onColor"
            [onText]="onText"
            [tabSeq]="tabSeq"
            #element>
        </bootstrapextracomponents-switch>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    onActionMethodID: (e: Event, data?: any) => void;
    
    animate: boolean;
    componentSize: string;
    enabled: boolean;
    handleWidth: string;
    label: string;
    labelWidth: string;
    offColor: string;
    offText: string;
    onColor: string;
    onText: string;
    styleClass: string;
    tabSeq: number;
    
    dataProviderID: unknown;
    dataProviderIDChange: (data?: any) => void;

    @ViewChild('element') element: ServoyBootstrapExtraSwitch;
}

describe('Switch Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraSwitch],
        imports: [ServoyPublicTestingModule, JwBootstrapSwitchNg2Module]
    }

    beforeEach(() => {
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            dataProviderID: 0
        }
    });

    it('when component is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('bswitch').should('exist');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('.bootstrap-switch-disabled').should('not.exist').then(_ => {
                wrapper.component.enabled = false;
                wrapper.fixture.detectChanges();
                cy.get('.bootstrap-switch-disabled').should('exist');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-switch').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-switch').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-switch').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-switch').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });
    
    it('show label, offText and onText', () => {
        configWrapper.componentProperties.label = 'label';
        configWrapper.componentProperties.offText = 'offText';
        configWrapper.componentProperties.onText = 'onText';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bootstrap-switch-label').invoke('text').invoke('trim').should('eq', 'label');
            cy.get('.bootstrap-switch-handle-off').should('have.text', 'offText');
            cy.get('.bootstrap-switch-handle-on').should('have.text', 'onText');
        });
    });

    it('should emit dataProviderIDChange event on button change', () => {
        const onActionMethodID = cy.stub();
        configWrapper.componentProperties.onActionMethodID = onActionMethodID;
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper);
        cy.get('input').should('not.be.checked').then(() => {
            cy.get('.bootstrap-switch-label').click().then(() => {
                cy.wrap(dataProviderIDChange).should('have.been.called');
            });

        });
    });

    it('should not emit dataProviderIDChange event dataprovider change', () => {
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('input').should('not.be.checked').then(() => {
                wrapper.component.dataProviderID = 1;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        configWrapper.componentProperties.onActionMethodID = onActionMethodID;
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('.bootstrap-switch-label').click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
})