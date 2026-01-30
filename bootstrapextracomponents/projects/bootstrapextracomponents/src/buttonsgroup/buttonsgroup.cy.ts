import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraButtonsGroup } from './buttonsgroup';
import { Component, ViewChild, signal, output } from '@angular/core';
import { of } from 'rxjs';

@Component({
    template: `
        <bootstrapextracomponents-buttons-group
            [servoyApi]="servoyApi"
            [enabled]="enabled()"
            [showAs]="showAs()"
            [inputType]="inputType()"
            (click)="onActionMethodID($event)"
            [styleClass]="styleClass()"
            [toolTipText]="toolTipText()"
            [valuelistID]="valuelistID()"
            [dataProviderID]="dataProviderID()"
            (dataProviderIDChange)="dataProviderIDChange.emit($event)"
            [format]="format()"
            #element>
        </bootstrapextracomponents-buttons-group>
    `,
    standalone: false
})
class WrapperComponent {
    enabled = signal<boolean>(undefined);
    onActionMethodID: (e: Event, data?: any) => void;
    showAs = signal<string | undefined>(undefined);
    servoyApi: ServoyApi;
    inputType = signal<string | undefined>(undefined);
    styleClass = signal<string | undefined>(undefined);
    toolTipText = signal<string | undefined>(undefined);
    valuelistID = signal<IValuelist>(undefined);
    format = signal<Format>(undefined);
    dataProviderID = signal<unknown>(undefined);
    dataProviderIDChange = output<unknown>();

    @ViewChild('element') element: ServoyBootstrapExtraButtonsGroup;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    onActionMethodID: undefined,
    showAs: 'text',
    inputType: 'RADIO',
    styleClass: undefined,
    toolTipText: undefined,
    valuelistID: undefined as IValuelist,
    format: undefined,
    dataProviderID: 1
};

function createMockValuelist(): IValuelist {
    const mockData = [{
        "displayValue": "one",
        "realValue": 1
    },
    {
        "displayValue": "two",
        "realValue": 2
    },
    {
        "displayValue": "three",
        "realValue": 3
    },
    {
        "displayValue": "four",
        "realValue": 4
    }] as IValuelist;
    mockData.hasRealValues = () => { return true; };
    mockData.isRealValueDate = () => { return false; };
    mockData.getDisplayValue = (value) => {
        const item = mockData.filter(item => item.realValue === value)[0];
        return of(item?.displayValue);
    };
    return mockData;
}

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

describe('ServoyBootstrapExtraButtonsGroup Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraButtonsGroup],
        imports: [ServoyPublicTestingModule]
    }

    beforeEach(() => {
        defaultValues.valuelistID = createMockValuelist();
    });

    it('when component is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').eq(0).should('have.class', 'active');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.btn-group').should('not.have.attr', 'disabled').then(() => {
                wrapper.component.enabled.set(false);
                cy.get('.btn-group').should('have.attr', 'disabled');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').eq(0).should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('button').eq(0).should('have.class', 'mystyleclass');
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').eq(0).should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('button').eq(0).should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should emit dataProviderIDChange event on button change', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('button span').eq(0).should('have.text', 'one').then(() => {
                cy.get('button').last().click().then(() => {
                    cy.wrap(dataProviderIDChange).should('have.been.called');
                });
            });
        });
    });

    it('should not emit dataProviderIDChange event on property change', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            const dataProviderIDChange = cy.spy();
            wrapper.component.dataProviderIDChange.subscribe(dataProviderIDChange);
            cy.get('button span').eq(0).should('have.text', 'one').then(() => {
                wrapper.component.dataProviderID.set(2);
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('button').eq(1).should('have.class', 'active');
            });
        });
    });

    it('should update tooltip', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.toolTipText.set('Updated tooltip');
            cy.get('.btn-group').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });

    it('should handle onaction event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('button').last().click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
});