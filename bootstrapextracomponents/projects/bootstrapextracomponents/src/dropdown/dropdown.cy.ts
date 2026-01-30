import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule, IValuelist, Format } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraDropdown } from './dropdown';
import { Component, ViewChild, signal } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-dropdown
            [servoyApi]="servoyApi"
            [enabled]="enabled()"
            (click)="onAction($event)"
            (click)="onMenuItemSelected($event)"
            [styleClass]="styleClass()"
            [toolTipText]="toolTipText()"
            [buttonStyleClass]="buttonStyleClass()"
            [imageStyleClass]="imageStyleClass()"
            [isButton]="isButton()"
            [isSplitButton]="isSplitButton()"
            [menuItems]="menuItems()"
            [text]="text()"
            #element>
        </bootstrapextracomponents-dropdown>
    `,
    standalone: false
})
class WrapperComponent {
    enabled = signal<boolean>(undefined);
    onAction: (e: Event, data?: any) => void;
    onMenuItemSelected: (e: Event, data?: any) => void;
    servoyApi: ServoyApi;
    styleClass = signal<string | undefined>(undefined);
    toolTipText = signal<string | undefined>(undefined);
    buttonStyleClass = signal<string | undefined>(undefined);
    imageStyleClass = signal<string | undefined>(undefined);
    isButton = signal<boolean>(undefined);
    isSplitButton = signal<boolean>(undefined);
    menuItems = signal<Array<any>>(undefined);
    text = signal<string | undefined>(undefined);

    @ViewChild('element') element: ServoyBootstrapExtraDropdown;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    onAction: undefined,
    onMenuItemSelected: undefined,
    styleClass: undefined,
    toolTipText: undefined,
    buttonStyleClass: undefined,
    imageStyleClass: undefined,
    isButton: true,
    isSplitButton: undefined,
    menuItems: [{
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
    }],
    text: undefined
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

describe('ServoyBootstrapExtraDropdown Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraDropdown],
        imports: [ServoyPublicTestingModule]
    }

    it('when component is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').should('exist');
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button').should('not.have.attr', 'disabled').then(_ => {
                wrapper.component.enabled.set(false);
                cy.get('button').should('have.attr', 'disabled');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-drop-down').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('.bts-extra-drop-down').should('have.class', 'mystyleclass');
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('.bts-extra-drop-down').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('.bts-extra-drop-down').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should test buttonStyleClass', () => {
        defaultValues.buttonStyleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.buttonStyleClass.set('classA classB');
                cy.get('button').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should test imageStyleClass', () => {
        defaultValues.imageStyleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button span').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.imageStyleClass.set('classA classB');
                cy.get('button span').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.toolTipText.set('Updated tooltip');
            cy.get('button').eq(0).trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });

    it('should check if is a button or link', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('not.have.class', 'btn-link').then(_ => {
                wrapper.component.isButton.set(false);
                cy.get('button').should('have.class', 'btn-link');
            });
        });
    });

    it('should handle onaction  event', () => {
        expect(defaultValues.onAction).to.be.undefined;
        defaultValues.onAction = cy.spy().as('onAction');
        expect(defaultValues.onMenuItemSelected).to.be.undefined;
        defaultValues.onMenuItemSelected = cy.spy().as('onMenuItemSelected');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(defaultValues.onAction).should('not.be.called');
            cy.get('button').first().click().then(() => {
                cy.wrap(defaultValues.onAction).should('be.called');
            });
        });
    });

    it('should handle onMenuItemSelected  event', () => {
        defaultValues.onAction = cy.spy().as('onAction');
        defaultValues.onMenuItemSelected = cy.spy().as('onMenuItemSelected');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(defaultValues.onMenuItemSelected).should('not.be.called');
            cy.get('button').last().click().then(() => {
                cy.wrap(defaultValues.onMenuItemSelected).should('be.called');
            });
        });
    });
})