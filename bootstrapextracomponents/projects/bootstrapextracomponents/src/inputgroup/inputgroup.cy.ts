/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ViewChild, signal, output } from '@angular/core';
import { Format, ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup } from './inputgroup';
import { MountConfig } from 'cypress/angular';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<bootstrapextracomponents-input-group
                [servoyApi]="servoyApi"
                [enabled]="enabled()"
                [editable]="editable()"
                (click)="onActionMethodID($event)"
                (focus)="onFocusGainedMethodID($event)"
                (blur)="onFocusLostMethodID($event)" 
                (contextmenu)="onRightClickMethodID($event)"
                [format]="format()"
                [placeholderText]="placeholderText()"
                [inputType]="inputType()"
                (inputTypeChange)="inputTypeChange($event)" 
                [dataProvider]="dataProvider()"
                (dataProviderChange)="dataProviderChange($event)"
                [styleClass]="styleClass()"
                [toolTipText]="toolTipText()"
                [tabSeq]="tabSeq()"
                [addOns]="addOns()"
                [addOnButtons]="addOnButtons()"
                #element>
                </bootstrapextracomponents-input-group>`,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled = signal<boolean>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);
    toolTipText = signal<string>(undefined);

    onActionMethodID: (e: Event, data?: unknown) => void;
    onFocusGainedMethodID: (e: Event, data?: unknown) => void;
    onFocusLostMethodID: (e: Event, data?: unknown) => void;
    onRightClickMethodID: (e: Event, data?: unknown) => void;

    format = signal<Format>(undefined);
    editable = signal<boolean>(undefined);
    placeholderText = signal<string>(undefined);

    inputType = signal<string>(undefined);
    inputTypeChange: (newData: unknown) => {};

    dataProvider = signal<unknown>(undefined);
    dataProviderChange = output<unknown>();

    addOns = signal<Array<unknown>>(undefined);
    addOnButtons = signal<Array<unknown>>(undefined);

    @ViewChild('element') element: ServoyBootstrapExtraInputGroup;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    format: { type: 'TEXT' } as Format,
    editable: true,
    placeholderText: 'Enter text',
    inputType: 'text',
    dataProvider: 'initialValue',
    styleClass: undefined,
    tabSeq: undefined,
    toolTipText: undefined,
    addOns: undefined,
    addOnButtons: undefined,
    onActionMethodID: undefined,
    onFocusGainedMethodID: undefined,
    onFocusLostMethodID: undefined,
    onRightClickMethodID: undefined,
    inputTypeChange: undefined,
    dataProviderChange: undefined
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

describe('ServoyBootstrapExtraInputGroup Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraInputGroup, SvyAttributesInputGroup],
        imports: [ServoyPublicTestingModule, FormsModule]
    };

    it('should mount and register the component', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('should show the dataprovider value', () => {
        defaultValues.dataProvider = 'myvalue';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'myvalue');
        });
    });

    it('should set the placeholder text', () => {
        defaultValues.placeholderText = 'Enter your name';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'placeholder', 'Enter your name');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-input-group').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-extra-input-group').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-input-group').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-extra-input-group').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should be editable', () => {
        defaultValues.editable = true;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('not.have.attr', 'readonly');
        });
    });

    it('should have the correct input type', () => {
        defaultValues.inputType = 'password';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.attr', 'type', 'password');
        });
    });

    it('should handle onaction event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.dataProvider = 'initialValue';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('input').should('have.value', 'initialValue').click().type('{enter}').then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle focus gained event', () => {
        const onFocusGainedMethodID = cy.stub();
        defaultValues.onFocusGainedMethodID = onFocusGainedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'initialValue').trigger('focus').then(() => {
                cy.wrap(onFocusGainedMethodID).should('be.called');
            });
        });
    });

    it('should handle focus lost event', () => {
        const onFocusLostMethodID = cy.stub();
        defaultValues.onFocusLostMethodID = onFocusLostMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'initialValue').focus().trigger('blur').then(() => {
                cy.wrap(onFocusLostMethodID).should('be.called');
            });
        });
    });

    it('should handle right click event', () => {
        const onRightClickMethodID = cy.stub();
        defaultValues.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').trigger('contextmenu').then(() => {
                expect(onRightClickMethodID).to.have.been.called;
            });
        });
    });

    it('should emit dataProviderChange event on input change', () => {
        const dataProviderChange = cy.stub();
        defaultValues.dataProviderChange = dataProviderChange;
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        defaultValues.dataProvider = '';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('input').type('New Value').focus().blur();
            cy.wrap(dataProviderChange).should('have.been.calledWith', 'New Value');
        });
    });

    it('should not emit dataProviderChange event dataprovider change', () => {
        const dataProviderChange = cy.stub();
        defaultValues.dataProviderChange = dataProviderChange;
        defaultValues.dataProvider = 'initialValue';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('input').should('have.value', 'initialValue').then(() => {
                wrapper.component.dataProvider.set('new value');
                expect(dataProviderChange).not.to.have.been.called;
                cy.get('input').should('have.value', 'new value')
            });
        });
    });

    it('should test addOns', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-input-group span').should('not.exist').then(() => {
                wrapper.component.addOns.set([{
                    attributes: '',
                    position: 'LEFT',
                    text: 'AddOn1',
                }]);
                cy.get('.bts-extra-input-group span').should('exist');
            });
        });
    });

    it('should test addOnButtons', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.input-group-btn').should('not.exist').then(() => {
                wrapper.component.addOnButtons.set([{
                    attributes: '',
                    imageStyleClass: 'imageStyleClass',
                    name: 'btn1',
                    position: 'RIGHT',
                    styleClass: 'btnStyleClass',
                    text: 'AddOn1',
                }]);
                cy.get('.input-group-btn').should('exist');
            });
        });
    });
});