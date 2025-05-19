import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraBreadcrumbs } from './breadcrumbs';
import { Component, ViewChild } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-breadcrumbs
            [servoyApi]="servoyApi"
            [breadcrumbs]="breadcrumbs"
            [lastCrumbStyleClass]="lastCrumbStyleClass"
            (click)="onCrumbClickedMethodID($event, crumb, index)"
            [crumbStyleClass]="crumbStyleClass"
            [styleClass]="styleClass"
            [autoRemoveWhenClicked]="autoRemoveWhenClicked"
            #element>
        </bootstrapextracomponents-breadcrumbs>
    `,
    standalone: false
})
class WrapperComponent {
    onCrumbClickedMethodID: (e: Event, crumb?: any, index?: number) => void;
    lastCrumbStyleClass: string;
    servoyApi: ServoyApi;
    crumbStyleClass: string;
    styleClass: string;
    autoRemoveWhenClicked: boolean;
    breadcrumbs: Array<{ crumbId: string, displayName: string }>;

    @ViewChild('element') element: ServoyBootstrapExtraBreadcrumbs;
}

describe('Breadcrumbs Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraBreadcrumbs],
        imports: [ServoyPublicTestingModule]
    }

    beforeEach(() => {
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            breadcrumbs: [{ crumbId: 'Home', displayName: 'Home' }, { crumbId: 'Library', displayName: 'Library' }, { crumbId: 'Data', displayName: 'Data' }]
        }
    });

    it('when breadcrumbs is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('li').last().should('have.text', 'Data');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('ol').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('ol').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('ol').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('ol').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show a crumbStyleClass and lastCrumbStyleClass', () => {
        configWrapper.componentProperties.crumbStyleClass = 'crumbStyleClass';
        configWrapper.componentProperties.lastCrumbStyleClass = 'lastCrumbStyleClass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('li').eq(0).should('have.class', 'crumbStyleClass');
            cy.get('li').eq(1).should('have.class', 'crumbStyleClass');
            cy.get('li').eq(2).should('have.class', 'lastCrumbStyleClass').then(_ => {
                wrapper.component.lastCrumbStyleClass = 'lastCrumbStyleClass2';
                wrapper.fixture.detectChanges();
                cy.get('li').eq(2).should('have.class', 'lastCrumbStyleClass2');
            });

        });
    });

    it('should handle crumbClicked  event', () => {
        const onCrumbClickedMethodID = cy.stub();
        configWrapper.componentProperties.onCrumbClickedMethodID = onCrumbClickedMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onCrumbClickedMethodID).should('be.not.called');
            cy.get('li').first().click().then(() => {
                cy.wrap(onCrumbClickedMethodID).should('be.called');
            });
        });
    });
})