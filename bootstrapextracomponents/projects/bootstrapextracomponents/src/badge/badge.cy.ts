import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraBadge } from './badge';
import { Component, ViewChild, signal } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-badge
            [servoyApi]="servoyApi"
            [enabled]="enabled()"
            [text]="text()"
            [badgeText]="badgeText()"
            [displayType]="displayType()"
            (click)="onActionMethodID($event)"
            (dblclick)="onDoubleClickMethodID($event)"
            (contextmenu)="onRightClickMethodID($event)"
            [imageStyleClass]="imageStyleClass()"
            [styleClass]="styleClass()"
            [toolTipText]="toolTipText()"
            #element>
        </bootstrapextracomponents-badge>
    `,
    standalone: false
})
class WrapperComponent {
    enabled = signal<boolean>(undefined);
    text = signal<string | undefined>(undefined);
    onActionMethodID: (e: Event, data?: any) => void;
    onDoubleClickMethodID: (e: Event, data?: any) => void;
    onRightClickMethodID: (e: Event, data?: any) => void;
    imageStyleClass = signal<string | undefined>(undefined);
    badgeText = signal<string | undefined>(undefined);
    servoyApi: ServoyApi;
    displayType = signal<string | undefined>(undefined);
    styleClass = signal<string | undefined>(undefined);
    toolTipText = signal<string | undefined>(undefined);

    @ViewChild('element') element: ServoyBootstrapExtraBadge;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    enabled: true,
    text: 'text',
    onActionMethodID: undefined,
    onDoubleClickMethodID: undefined,
    onRightClickMethodID: undefined,
    imageStyleClass: undefined,
    badgeText: 'badgeText',
    displayType: 'BUTTON',
    styleClass: undefined,
    toolTipText: undefined
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

describe('ServoyBootstrapExtraBadge Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraBadge],
        imports: [ServoyPublicTestingModule]
    }

    it('when badge is mounted and registered and badgeText is changed through wrapper', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('button span').last().should('have.text', ' badgeText ').then(() => {
                wrapper.component.badgeText.set('MyButton2');
                cy.get('button span').last().should('have.text', ' MyButton2 ');
            });
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when badge enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('be.enabled').then(() => {
                wrapper.component.enabled.set(false);
                cy.get('button').should('be.disabled');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('button').should('have.class', 'mystyleclass');
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('button').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show a image style class', () => {
        defaultValues.imageStyleClass = 'imageStyleClass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('button span').first().find('i').should('have.class', 'imageStyleClass');
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            wrapper.component.toolTipText.set('Updated tooltip');
            cy.get('button').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });

    it('should handle onActionMethodID event', () => {
        const onActionMethodID = cy.stub();
        defaultValues.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('button').click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle onDoubleClickMethodID event', () => {
        const onDoubleClickMethodID = cy.stub();
        defaultValues.onDoubleClickMethodID = onDoubleClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onDoubleClickMethodID).should('be.not.called');
            cy.get('button').dblclick().then(() => {
                cy.wrap(onDoubleClickMethodID).should('be.called');
            });
        });
    });

    it('should handle onRightClickMethodID event', () => {
        const onRightClickMethodID = cy.stub();
        defaultValues.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onRightClickMethodID).should('be.not.called');
            cy.get('button').trigger('contextmenu').then(() => {
                cy.wrap(onRightClickMethodID).should('be.called');
            });
        });
    });
});