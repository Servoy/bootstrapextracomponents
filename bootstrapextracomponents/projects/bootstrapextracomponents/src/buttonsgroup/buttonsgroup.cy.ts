import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraButtonsGroup } from './buttonsgroup';
import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';

@Component({
    template: `
        <bootstrapextracomponents-buttons-group
            [servoyApi]="servoyApi"
            [enabled]="enabled"
            [showAs]="showAs"
            [inputType]="inputType"
            (click)="onActionMethodID($event)"
            [styleClass]="styleClass"
            [toolTipText]="toolTipText"
            [valuelistID]="valuelistID"
            [dataProviderID]="dataProviderID"
            (dataProviderIDChange)="dataProviderIDChange($event)"
            [format]="format"
            #element>
        </bootstrapextracomponents-buttons-group>
    `,
    standalone: false
})
class WrapperComponent {
    enabled: boolean;
    onActionMethodID: (e: Event, data?: any) => void;
    showAs: string;
    servoyApi: ServoyApi;
    inputType: string;
    styleClass: string;
    toolTipText: string;
    valuelistID: IValuelist;
    format: Format;
    dataProviderID: unknown;
    dataProviderIDChange: (data?: any) => void;

    @ViewChild('element') element: ServoyBootstrapExtraButtonsGroup;
}

describe('ButtonsGroup Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraButtonsGroup],
        imports: [ServoyPublicTestingModule]
    }

    beforeEach(() => {
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
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            inputType: 'RADIO',
            showAs: 'text',
            enabled: true,
            valuelistID: mockData,
            dataProviderID: 1
        }
    });

    it('when component is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('button').eq(0).should('have.class', 'active');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('.btn-group').should('not.have.attr', 'disabled').then(_ => {
                wrapper.component.enabled = false
                wrapper.fixture.detectChanges();
                cy.get('.btn-group').should('have.attr', 'disabled')
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').eq(0).should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('button').eq(0).should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').eq(0).should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('button').eq(0).should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should emit dataProviderIDChange event on button change', () => {
        const onActionMethodID = cy.stub();
        configWrapper.componentProperties.onActionMethodID = onActionMethodID;
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper);
        cy.get('button span').eq(0).should('have.text', 'one').then(() => {

            cy.get('button').last().click().then(() => {
                cy.wrap(dataProviderIDChange).should('have.been.called');
            });

        });
    });

    it('should not emit dataProviderIDChange event dataprovider change', () => {
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button span').eq(0).should('have.text', 'one').then(() => {
                wrapper.component.dataProviderID = 2;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('button').eq(1).should('have.class', 'active');
            });
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            wrapper.component.toolTipText = 'Updated tooltip';
            wrapper.fixture.detectChanges();
            cy.get('.btn-group').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
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
            cy.get('button').last().click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });
})