/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup } from './inputgroup';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapextracomponents-input-group
                [servoyApi]="servoyApi"
                [enabled]="enabled"
                [editable]="editable"
                (click)="onActionMethodID($event)"
                (focus)="onFocusGainedMethodID($event)"
                (blur)="onFocusLostMethodID($event)" 
                (contextmenu)="onRightClickMethodID($event)"
                [format]="format"
                [placeholderText]="placeholderText"
                [inputType]="inputType"
                (inputTypeChange)="inputTypeChange($event)" 
                [dataProvider]="dataProvider"
                (dataProviderChange)="dataProviderChange($event)"
                [styleClass]="styleClass"
                [toolTipText]="toolTipText"
                [tabSeq]="tabSeq"
                [addOns]="addOns"
                [addOnButtons]="addOnButtons"
                #element>
                </bootstrapextracomponents-input-group>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    enabled: boolean;
    styleClass: string;
    tabSeq: number;
    toolTipText: string;
    
    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    format: Format = {type: 'TEXT'} as Format
    editable: boolean;
    placeholderText: string;
    
    inputType: string;
    inputTypeChange: (newData: unknown) => {};

    dataProvider: unknown;
    dataProviderChange: (newData: unknown) => {};
    
    addOns: Array<unknown>;
    addOnButtons: Array<unknown>;

    @ViewChild('element') element: ServoyBootstrapExtraInputGroup;
}

describe('ServoyBootstrapExtraInputGroup Component', () => {
    const servoyApiSpy = new ServoyApiTesting(); 

    const config: MountConfig<WrapperComponent>= {
        declarations: [ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup],
        imports: [ ServoyPublicTestingModule, FormsModule]
    }

    beforeEach(() => {
        config.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            format: {type: 'TEXT'} as Format,
            editable: true,
            placeholderText: 'Enter text',
            inputType: 'text',
            dataProvider: 'initialValue'
        }
    });

    it('should mount and register the component', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the dataprovider value', () => {
        config.componentProperties.dataProvider = 'myvalue';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'myvalue');
        });
    });

    it('should set the placeholder text', () => {
        config.componentProperties.placeholderText = 'Enter your name';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.attr', 'placeholder', 'Enter your name');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-extra-input-group').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-input-group').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        config.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-extra-input-group').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-input-group').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be editable', () => {
        config.componentProperties.editable = true;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('not.have.attr', 'readonly');
        });
    });

    it('should have the correct input type', () => {
        config.componentProperties.inputType = 'password';
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.attr', 'type', 'password');
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', 'initialValue').click().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        config.componentProperties.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'initialValue').trigger('focus').then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        config.componentProperties.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').should('have.value', 'initialValue').focus().trigger('blur').then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should handle right click event', () => {
        const onRightClickMethodID = cy.stub();
        config.componentProperties.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, config).then(() => {
            cy.get('input').trigger('contextmenu').then(() => {
                expect(onRightClickMethodID).to.have.been.called;
            });
        });
    });

    it('should emit dataProviderChange event on input change', () => {
        const dataProviderChange = cy.stub();
        config.componentProperties.dataProviderChange = dataProviderChange;
        const onActionMethodID = cy.stub();
        config.componentProperties.onActionMethodID = onActionMethodID;
        config.componentProperties.dataProvider = '';
        cy.mount(WrapperComponent, config);
        cy.get('input').type('New Value').focus().blur();
        cy.wrap(dataProviderChange).should('have.been.calledWith', 'New Value');
    });

    it('should not emit dataProviderChange event dataprovider change', () => {
        const dataProviderChange = cy.stub();
        config.componentProperties.dataProviderChange = dataProviderChange;
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('input').should('have.value', 'initialValue').then(() => {
                wrapper.component.dataProvider = 'new value';
                wrapper.fixture.detectChanges();
                expect(dataProviderChange).not.to.have.been.called;
                cy.get('input').should('have.value', 'new value')
            });
        });
    });
    
    it('should test addOns', () => {
        cy.mount(WrapperComponent, config).then(wrapper => {
            cy.get('.bts-extra-input-group span').should('not.exist').then(() => {
                wrapper.component.addOns = [{
                    attributes: '',
                    position: 'LEFT',
                    text: 'AddOn1',
                }];
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-input-group span').should('exist');
            });
        });
    });
    
    it('should test addOnButtons', () => {
            cy.mount(WrapperComponent, config).then(wrapper => {
                cy.get('.input-group-btn').should('not.exist').then(() => {
                    wrapper.component.addOnButtons = [{
                        attributes: '',
                        imageStyleClass: 'imageStyleClass',
                        name: 'btn1',
                        position: 'RIGHT',
                        styleClass: 'btnStyleClass',
                        text: 'AddOn1',
                    }];
                    wrapper.fixture.detectChanges();
                    cy.get('.input-group-btn').should('exist');
                });
            });
        });
});