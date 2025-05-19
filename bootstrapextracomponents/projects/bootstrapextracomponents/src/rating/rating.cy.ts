import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraRating } from './rating';
import { Component, ViewChild } from '@angular/core';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <bootstrapextracomponents-rating
            [servoyApi]="servoyApi"
            [dataProviderID]="dataProviderID"
            (dataProviderIDChange)="dataProviderIDChange($event)"
            [max]="max"
            [showPercentageOnHover]="showPercentageOnHover"
            [enabled]="enabled"
            [stateOn]="stateOn"
            [stateOff]="stateOff"
            (click)="dataProviderIDChange($event)"
            #element>
        </bootstrapextracomponents-rating>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    enabled: boolean;
    max: number;
    stateOn: string;
    stateOff: string;
    showPercentageOnHover: boolean;
    dataProviderID: unknown;
    dataProviderIDChange: (data?: any) => void;

    @ViewChild('element') element: ServoyBootstrapExtraRating;
}

describe('Rating Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraRating],
        imports: [ServoyPublicTestingModule, NgbRating]
    }

    beforeEach(() => {
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            max: 5,
            dataProviderID: 1,
            enabled: true
        }
    });

    it('when component is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('.bts-extra-rating').should('exist');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when badge enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('ngb-rating').should('not.have.attr', 'aria-readonly').then(_ => {
                wrapper.component.enabled = false
                wrapper.fixture.detectChanges();
                cy.get('ngb-rating').should('have.attr', 'aria-readonly');
            });
        });
    });

    it('should emit dataProviderIDChange event on rating change', () => {
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper);
        cy.get('.visually-hidden').eq(0).should('have.text', '(*)').then(() => {
            cy.get('.visually-hidden').last().click().then(() => {
                cy.wrap(dataProviderIDChange).should('have.been.called');
            });

        });
    });

    it('should not emit dataProviderIDChange event dataprovider change', () => {
        const dataProviderIDChange = cy.stub();
        configWrapper.componentProperties.dataProviderIDChange = dataProviderIDChange;
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.visually-hidden').eq(0).should('have.text', '(*)').then(() => {
                wrapper.component.dataProviderID = 2;
                wrapper.fixture.detectChanges();
                expect(dataProviderIDChange).not.to.have.been.called;
                cy.get('.visually-hidden').eq(1).should('have.text', '(*)');
            });
        });
    });
})