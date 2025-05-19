import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraDropdown } from './dropdown';
import { Component, ViewChild } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-dropdown
            [servoyApi]="servoyApi"
            [enabled]="enabled"
            (click)="onAction($event)"
            (click)="onMenuItemSelected($event)"
            [styleClass]="styleClass"
            [toolTipText]="toolTipText"
            [buttonStyleClass]="buttonStyleClass"
            [imageStyleClass]="imageStyleClass"
            [isButton]="isButton"
            [isSplitButton]="isSplitButton"
            [menuItems]="menuItems"
            [text]="text"
            #element>
        </bootstrapextracomponents-dropdown>
    `,
    standalone: false
})
class WrapperComponent {
    enabled: boolean;
    onAction: (e: Event, data?: any) => void;
    onMenuItemSelected: (e: Event, data?: any) => void;
    servoyApi: ServoyApi;
    styleClass: string;
    toolTipText: string;
    buttonStyleClass: string;
    imageStyleClass: string;
    isButton: boolean;
    isSplitButton: boolean;
    menuItems: Array<any>;
    text: string;

    @ViewChild('element') element: ServoyBootstrapExtraDropdown;
}

describe('Dropdown Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraDropdown],
        imports: [ServoyPublicTestingModule]
    }

    beforeEach(() => {
        const menuItems = [{
            enabled: true,
            iconName: '',
            isDivider: false,
            text: 'one',
            itemId: '1',
            userData: { id: 1 },
            onAction: null
        }, {
            enabled: true,
            iconName: '',
            isDivider: false,
            text: 'two',
            itemId: '2',
            userData: { id: 2 },
            onAction: null
        }];
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            enabled: true,
            menuItems: menuItems,
            isButton: true,
        }
    });

    it('when component is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('button').should('exist');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('button').should('not.have.attr', 'disabled').then(_ => {
                wrapper.component.enabled = false
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.attr', 'disabled')
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-drop-down').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-drop-down').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('.bts-extra-drop-down').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('.bts-extra-drop-down').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should test buttonStyleClass', () => {
        configWrapper.componentProperties.buttonStyleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.buttonStyleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should test imageStyleClass', () => {
        configWrapper.componentProperties.imageStyleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button span').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.imageStyleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('button span').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            wrapper.component.toolTipText = 'Updated tooltip';
            wrapper.fixture.detectChanges();
            cy.get('button').eq(0).trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });

    it('should check if is a button or link', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('not.have.class', 'btn-link').then(_ => {
                wrapper.component.isButton = false;
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'btn-link');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onAction = cy.stub();
        configWrapper.componentProperties.onAction = onAction;
        const onMenuItemSelected = cy.stub();
        configWrapper.componentProperties.onMenuItemSelected = onMenuItemSelected;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onAction).should('be.not.called');
            cy.get('button').first().click().then(() => {
                cy.wrap(onAction).should('be.called');
            });
        });
    });

    it('should handle onMenuItemSelected  event', () => {
        const onAction = cy.stub();
        configWrapper.componentProperties.onAction = onAction;
        const onMenuItemSelected = cy.stub();
        configWrapper.componentProperties.onMenuItemSelected = onMenuItemSelected;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onMenuItemSelected).should('be.not.called');
            cy.get('button').last().click().then(() => {
                cy.wrap(onMenuItemSelected).should('be.called');
            });
        });
    });
})