import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraNavbar, SvyAttributes } from './navbar';
import { Component, ViewChild } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-navbar
            [servoyApi]="servoyApi"
            (click)="onMenuItemClicked($event)"
            (brandClicked)="onBrandClicked($event)"
            [styleClass]="styleClass"
            [brandLogo]="brandLogo"
            [brandLogoStyleClass]="brandLogoStyleClass"
            [brandLogoTabindex]="brandLogoTabindex"
            [brandText]="brandText"
            [brandTextTabindex]="brandTextTabindex"
            [collapseOnClick]="collapseOnClick"
            [collapsing]="collapsing"
            [fixed]="fixed"
            [inverse]="inverse"
            [markClickedItemActive]="markClickedItemActive"
            [menuItems]="menuItems"
            [servoyMenu]="servoyMenu"
            #element>
        </bootstrapextracomponents-navbar>
    `,
    standalone: false
})
class WrapperComponent {
    servoyApi: ServoyApi;
    
    onBrandClicked: (e: Event) => void;
    onMenuItemClicked: (e: Event) => void;

    brandLogo: any;
    brandLogoStyleClass: string;
    brandLogoTabindex: string;
    brandText: string;
    brandTextTabindex: string;
    collapseOnClick: boolean;
    collapsing: boolean;
    fixed: string;
    inverse: boolean;
    markClickedItemActive: boolean;
    menuItems: Array<any>;
    servoyMenu: any;
    styleClass: string;

    @ViewChild('element') element: ServoyBootstrapExtraNavbar;
}

describe('ServoyBootstrapExtraNavbar Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

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
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            menuItems: menuItems,
        }
    });

    it('when breadcrumbs is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('a span').first().should('have.text', 'Home');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-navbar').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-navbar').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-navbar').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-navbar').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });
    
    it('show a brandLogoStyleClass ', () => {
        configWrapper.componentProperties.brandLogo = 'test.png';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.navbar-brand img').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.brandLogoStyleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.navbar-brand img').should('have.class', 'mystyleclass')
            });
        });
    });
    
    it('should test collapsing', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('not.exist').then(_ => {
                wrapper.component.collapsing = true;
                wrapper.fixture.detectChanges();
                cy.get('button').should('exist');
            });
        });
    });

    it('should handle onMenuItemClicked  event', () => {
        const onMenuItemClicked = cy.stub();
        configWrapper.componentProperties.onMenuItemClicked = onMenuItemClicked;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onMenuItemClicked).should('be.not.called');
            cy.get('li').first().click().then(() => {
                cy.wrap(onMenuItemClicked).should('be.called');
            });
        });
    });
    
    it('should handle onBrandClicked  event', () => {
        const onBrandClicked = cy.stub();
        configWrapper.componentProperties.onMenuItemClicked = onBrandClicked;
        configWrapper.componentProperties.brandLogo = 'test.png';
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onBrandClicked).should('be.not.called');
            cy.get('.navbar-brand').click().then(() => {
                cy.wrap(onBrandClicked).should('be.called');
            });
        });
    });
})