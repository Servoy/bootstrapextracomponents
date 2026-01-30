import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraSwitch } from './switch';
import { Component, ViewChild, signal, output } from '@angular/core';
import { JwBootstrapSwitchNg2Module, JwBootstrapSwitchNg2Component } from '@servoy/jw-bootstrap-switch-ng2';

@Component({
    template: `
        <bootstrapextracomponents-switch
            [servoyApi]="servoyApi"
            [enabled]="enabled()"
            (click)="onActionMethodID($event)"
            [styleClass]="styleClass()"
            [dataProviderID]="dataProviderID()"
            (dataProviderIDChange)="dataProviderIDChange.emit($event)"
            [animate]="animate()"
            [componentSize]="componentSize()"
            [handleWidth]="handleWidth()"
            [label]="label()"
            [labelWidth]="labelWidth()"
            [offColor]="offColor()"
            [offText]="offText()"
            [onColor]="onColor()"
            [onText]="onText()"
            [tabSeq]="tabSeq()"
            #element>
        </bootstrapextracomponents-switch>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    onActionMethodID: (e: Event, data?: any) => void;

    animate = signal<boolean>(undefined);
    componentSize = signal<string>(undefined);
    enabled = signal<boolean>(undefined);
    handleWidth = signal<string>(undefined);
    label = signal<string>(undefined);
    labelWidth = signal<string>(undefined);
    offColor = signal<string>(undefined);
    offText = signal<string>(undefined);
    onColor = signal<string>(undefined);
    onText = signal<string>(undefined);
    styleClass = signal<string>(undefined);
    tabSeq = signal<number>(undefined);

    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyBootstrapExtraSwitch;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    dataProviderID: 0,
    animate: undefined,
    componentSize: undefined,
    handleWidth: undefined,
    label: undefined,
    labelWidth: undefined,
    offColor: undefined,
    offText: undefined,
    onColor: undefined,
    onText: undefined,
    styleClass: undefined,
    tabSeq: undefined,
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

describe('ServoyBootstrapExtraSwitch Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraSwitch],
        imports: [ServoyPublicTestingModule, JwBootstrapSwitchNg2Module]
    }

    it('when component is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('bswitch').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.bootstrap-switch-disabled').should('not.exist').then(() => {
                wrapper.component.enabled.set(false);
                cy.get('.bootstrap-switch-disabled').should('exist');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-switch').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-extra-switch').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-switch').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-extra-switch').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show label, offText and onText', () => {
        defaultValues.label = 'label';
        defaultValues.offText = 'offText';
        defaultValues.onText = 'onText';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bootstrap-switch-label').invoke('text').invoke('trim').should('eq', 'label');
            cy.get('.bootstrap-switch-handle-off').should('have.text', 'offText');
            cy.get('.bootstrap-switch-handle-on').should('have.text', 'onText');
        });
    });

    it('should emit dataProviderIDChange event on button change', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').should('not.be.checked').then(() => {
                cy.get('.bootstrap-switch-label').click().then(() => {
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
            cy.get('input').should('not.be.checked').then(() => {
                wrapper.component.dataProviderID.set(1);
                expect(dataProviderIDChange).not.to.have.been.called;
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('.bootstrap-switch-label').click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
})