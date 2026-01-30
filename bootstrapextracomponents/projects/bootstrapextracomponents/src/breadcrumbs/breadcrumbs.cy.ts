import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraBreadcrumbs } from './breadcrumbs';
import { Component, ViewChild, signal } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-breadcrumbs
            [servoyApi]="servoyApi"
            [breadcrumbs]="breadcrumbs()"
            [lastCrumbStyleClass]="lastCrumbStyleClass()"
            (click)="onCrumbClickedMethodID($event, crumb, index)"
            [crumbStyleClass]="crumbStyleClass()"
            [styleClass]="styleClass()"
            [autoRemoveWhenClicked]="autoRemoveWhenClicked()"
            #element>
        </bootstrapextracomponents-breadcrumbs>
    `,
    standalone: false
})
class WrapperComponent {
    onCrumbClickedMethodID: (e: Event, crumb?: any, index?: number) => void;
    lastCrumbStyleClass = signal<string | undefined>(undefined);
    servoyApi: ServoyApi;
    crumbStyleClass = signal<string | undefined>(undefined);
    styleClass = signal<string | undefined>(undefined);
    autoRemoveWhenClicked = signal<boolean>(undefined);
    breadcrumbs = signal<Array<{ crumbId: string, displayName: string }>>(undefined);

    @ViewChild('element') element: ServoyBootstrapExtraBreadcrumbs;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    breadcrumbs: [{ crumbId: 'Home', displayName: 'Home' }, { crumbId: 'Library', displayName: 'Library' }, { crumbId: 'Data', displayName: 'Data' }],
    lastCrumbStyleClass: undefined,
    onCrumbClickedMethodID: undefined,
    crumbStyleClass: undefined,
    styleClass: undefined,
    autoRemoveWhenClicked: undefined
};

function applyDefaultProps(wrapper) {
    for (const key in defaultValues) {
        if (wrapper.component.hasOwnProperty(key) && typeof wrapper.component[key] === 'function') {
            wrapper.component[key].set(defaultValues[key]);
        } else {
            wrapper.component[key] = defaultValues[key];
        }
    }
}

describe('ServoyBootstrapExtraBreadcrumbs Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraBreadcrumbs],
        imports: [ServoyPublicTestingModule]
    }

    it('when breadcrumbs is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('li').last().should('have.text', 'Data');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('ol').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('ol').should('have.class', 'mystyleclass');
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('ol').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('ol').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show a crumbStyleClass and lastCrumbStyleClass', () => {
        defaultValues.crumbStyleClass = 'crumbStyleClass';
        defaultValues.lastCrumbStyleClass = 'lastCrumbStyleClass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('li').eq(0).should('have.class', 'crumbStyleClass');
            cy.get('li').eq(1).should('have.class', 'crumbStyleClass');
            cy.get('li').eq(2).should('have.class', 'lastCrumbStyleClass').then(_ => {
                wrapper.component.lastCrumbStyleClass.set('lastCrumbStyleClass2');
                cy.get('li').eq(2).should('have.class', 'lastCrumbStyleClass2');
            });
        });
    });

    it('should handle crumbClicked  event', () => {
        expect(defaultValues.onCrumbClickedMethodID).to.be.undefined;
        defaultValues.onCrumbClickedMethodID = cy.spy().as('onCrumbClickedMethodID');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(defaultValues.onCrumbClickedMethodID).should('not.be.called');
            cy.get('li').first().click().then(() => {
                cy.wrap(defaultValues.onCrumbClickedMethodID).should('be.called');
            });
        });
    });
})