/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraNavbar, SvyAttributes } from './navbar';
import { Component, ViewChild, signal } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-navbar
            [servoyApi]="servoyApi"
            [onMenuItemClicked]="onMenuItemClicked()"
            [onBrandClicked]="onBrandClicked()"
            [styleClass]="styleClass()"
            [brandLogo]="brandLogo()"
            [brandLogoStyleClass]="brandLogoStyleClass()"
            [brandLogoTabindex]="brandLogoTabindex()"
            [brandText]="brandText()"
            [brandTextTabindex]="brandTextTabindex()"
            [collapseOnClick]="collapseOnClick()"
            [collapsing]="collapsing()"
            [fixed]="fixed()"
            [inverse]="inverse()"
            [markClickedItemActive]="markClickedItemActive()"
            [menuItems]="menuItems()"
            [servoyMenu]="servoyMenu()"
            #element>
        </bootstrapextracomponents-navbar>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;

    onBrandClicked = signal<(e: Event) => void>(undefined);
    onMenuItemClicked = signal<(e: Event, menuItem?: any) => void>(undefined);

    brandLogo = signal<any>(undefined);
    brandLogoStyleClass = signal<string>(undefined);
    brandLogoTabindex = signal<string>(undefined);
    brandText = signal<string>(undefined);
    brandTextTabindex = signal<string>(undefined);
    collapseOnClick = signal<boolean>(undefined);
    collapsing = signal<boolean>(undefined);
    fixed = signal<string>(undefined);
    inverse = signal<boolean>(undefined);
    markClickedItemActive = signal<boolean>(undefined);
    menuItems = signal<Array<any>>(undefined);
    servoyMenu = signal<any>(undefined);
    styleClass = signal<string>(undefined);

    @ViewChild('element') element: ServoyBootstrapExtraNavbar;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    brandLogo: undefined,
    brandLogoStyleClass: undefined,
    brandLogoTabindex: undefined,
    brandText: undefined,
    brandTextTabindex: undefined,
    collapseOnClick: undefined,
    collapsing: false,
    fixed: undefined,
    inverse: undefined,
    markClickedItemActive: undefined,
    menuItems: [],
    servoyMenu: undefined,
    styleClass: undefined,
    onBrandClicked: undefined,
    onMenuItemClicked: undefined
};

function applyDefaultProps(wrapper: any) {
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

describe('ServoyBootstrapExtraNavbar Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraNavbar, SvyAttributes],
        imports: [ServoyPublicTestingModule]
    }

    beforeEach(() => {
        const menuItems = [
            {
                attributes: null,
                itemId: '1',
                tabindex: '0',
                text: 'Home',
                enabled: true,
                userData: null,
                iconName: null,
                position: 'LEFT',
                subMenuItems: null,
                onAction: null,
                displayType: 'MENU_ITEM',
                dataProvider: null,
                inputButtonText: '',
                inputButtonStyleClass: '',
                isActive: true,
                styleClass: 'test',
                tooltip: 'test',
                valuelist: null,
            },
            {
                attributes: null,
                itemId: '2',
                tabindex: '1',
                text: 'Home1',
                enabled: true,
                userData: null,
                iconName: null,
                position: 'LEFT',
                subMenuItems: null,
                onAction: null,
                displayType: 'MENU_ITEM',
                dataProvider: null,
                inputButtonText: '',
                inputButtonStyleClass: '',
                isActive: true,
                styleClass: 'test1',
                tooltip: 'test1',
                valuelist: null,
            }
        ];
        defaultValues.menuItems = menuItems;
    });

    it('when breadcrumbs is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('a span').first().should('have.text', 'Home');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-navbar').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-extra-navbar').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-navbar').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-extra-navbar').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show a brandLogoStyleClass', () => {
        defaultValues.brandLogo = 'test.png';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.navbar-brand img').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.brandLogoStyleClass.set('mystyleclass');
                cy.get('.navbar-brand img').should('have.class', 'mystyleclass')
            });
        });
    });

    it('should test collapsing', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('not.exist').then(() => {
                wrapper.component.collapsing.set(true);
                cy.get('button').should('exist');
            });
        });
    });

    it('should handle onMenuItemClicked event', () => {
        defaultValues.onMenuItemClicked = cy.spy().as('onMenuItemClicked');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(defaultValues.onMenuItemClicked).should('be.not.called');
            cy.get('a.svy-navbar-item').first().click().then(() => {
                cy.wrap(defaultValues.onMenuItemClicked).should('be.called');
            });
        });
    });

    it('should handle onBrandClicked event', () => {
        defaultValues.onBrandClicked = cy.spy().as('onBrandClicked');
        defaultValues.brandLogo = 'test.png';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(defaultValues.onBrandClicked).should('be.not.called');
            cy.get('.navbar-brand').click().then(() => {
                cy.wrap(defaultValues.onBrandClicked).should('be.called');
            });
        });
    });
});