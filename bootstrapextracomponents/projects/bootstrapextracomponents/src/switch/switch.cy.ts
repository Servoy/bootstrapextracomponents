import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraSwitch } from './switch';
import { Component, ViewChild, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from '@servoy/jw-bootstrap-switch-ng2';

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
        imports: [ServoyPublicTestingModule, JwBootstrapSwitchNg2Module, FormsModule]
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

    /**
     * initial value is to make component know the DP is a string, number etc.
     * then 4 values are what the expected DP is after each of 4 clicks
     * then 4 values are what the DP is set to from server side that 1 - keeps the same checked state, 2, and 4 toggle the checked state
     */
    const checkDataProviderBothWaysWithValues = function(initialDPValueForType, click1ExpectedDPValue,
            click2ExpectedDPValue, click3ExpectedDPValue, click4ExpectedDPValue,
            serverSet1DPValue, serverSet2DPValue, serverSet3DPValue, serverSet4DPValue)  {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(wrapper.component.dataProviderID).invoke("set", initialDPValueForType);

            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('input').should('not.be.checked').then(() => {
                // simulate a few clicks to change the value from client
                cy.get('.bootstrap-switch-label').click();
                cy.wrap(dataProviderIDChange).should('have.been.calledOnceWithExactly', click1ExpectedDPValue).invoke('resetHistory');
                cy.get('input').should('be.checked');
                cy.get('.bootstrap-switch-label').click();
                cy.wrap(dataProviderIDChange).should('have.been.calledOnceWithExactly', click2ExpectedDPValue).invoke('resetHistory');
                cy.get('input').should('not.be.checked');
                cy.get('.bootstrap-switch-label').click();
                cy.wrap(dataProviderIDChange).should('have.been.calledOnceWithExactly', click3ExpectedDPValue).invoke('resetHistory');
                cy.get('input').should('be.checked');
                cy.get('.bootstrap-switch-label').click();
                cy.wrap(dataProviderIDChange).should('have.been.calledOnceWithExactly', click4ExpectedDPValue);
                cy.get('input').should('not.be.checked');
                    
                // now simulate a server side change of the dataprovider
                cy.wrap(wrapper.component.dataProviderID).invoke("set", serverSet1DPValue); // nothing should happen
                cy.get('input').should('not.be.checked');
                cy.wrap(wrapper.component.dataProviderID).invoke("set", serverSet2DPValue);
                cy.get('input').should('be.checked');
                cy.wrap(wrapper.component.dataProviderID).invoke("set", serverSet3DPValue);
                cy.get('input').should('not.be.checked');
                cy.wrap(wrapper.component.dataProviderID).invoke("set", serverSet4DPValue);
                cy.get('input').should('be.checked');
            });
        });
    }
    it('(based on int DP) should emit dataProviderIDChange event on button change, with the correct value, should update when server side dp changes', () => {
        checkDataProviderBothWaysWithValues(0, 1, 0, 1, 0, 0, 1, -5, 4);
    });
    it('(based on string DP) should emit dataProviderIDChange event on button change, with the correct value, should update when server side dp changes', () => {
        checkDataProviderBothWaysWithValues("0", "1", "0", "1", "0", "0", "1", "somethingWeirdThatWillBeSeenAsFalse", "1");
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

    it('should handle onaction event', () => {
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