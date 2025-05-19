import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraBadge } from './badge';
import { Component, ViewChild } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-badge
            [servoyApi]="servoyApi"
            [enabled]="enabled"
            [text]="text"
            [badgeText]="badgeText"
            [displayType]="displayType"
            (click)="onActionMethodID($event)"
            (dblclick)="onDoubleClickMethodID($event)"
            (contextmenu)="onRightClickMethodID($event)"
            [imageStyleClass]="imageStyleClass"
            [styleClass]="styleClass"
            [toolTipText]="toolTipText"
            #element>
        </bootstrapextracomponents-badge>
    `,
    standalone: false
})
class WrapperComponent {
    enabled: boolean;
    text: string;
    onActionMethodID: (e: Event, data?: any) => void;
    onDoubleClickMethodID: (e: Event, data?: any) => void;
    onRightClickMethodID: (e: Event, data?: any) => void;
    imageStyleClass: string;
    badgeText: string;
    servoyApi: ServoyApi;
    displayType: string;
    styleClass: string;
    toolTipText: string;

    @ViewChild('element') element: ServoyBootstrapExtraBadge;
}

describe('Badge Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraBadge],
        imports: [ServoyPublicTestingModule]
    }

    beforeEach(() => {
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            displayType: 'BUTTON',
            badgeText: 'badgeText',
            text: 'text',
            enabled: true
        }
    });

    it('when badge is mounted and registered and badgeText is changed  through wrapper', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('button span').last().should('have.text', ' badgeText ').then(_ => {
                wrapper.component.badgeText = 'MyButton2';
                wrapper.fixture.detectChanges();
                cy.get('button span').last().should('have.text', ' MyButton2 ');
            });
            cy.wrap(registerComponent).should('be.called');
        });
    });

    it('when badge enabled state is changed through wrapper', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.get('button').should('be.enabled').then(_ => {
                wrapper.component.enabled = false
                wrapper.fixture.detectChanges();
                cy.get('button').should('be.disabled')
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('button').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('show a image style class', () => {
        configWrapper.componentProperties.imageStyleClass = 'imageStyleClass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('button span').first().get('i').should('have.class', 'imageStyleClass');
        });
    });

    it('should update the tooltip dynamically', () => {
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            wrapper.component.toolTipText = 'Updated tooltip';
            wrapper.fixture.detectChanges();
            cy.get('button').trigger('pointerenter').then(() => {
                cy.get('div[id="mktipmsg"]').should('have.text', 'Updated tooltip');
            });
        });
    });

    it('should handle onaction  event', () => {
        const onActionMethodID = cy.stub();
        configWrapper.componentProperties.onActionMethodID = onActionMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onActionMethodID).should('be.not.called');
            cy.get('button').click().then(() => {
                cy.wrap(onActionMethodID).should('be.called');
            });
        });
    });

    it('should handle double clicked event', () => {
        const onActionMethodID = cy.stub();
        const onDoubleClickMethodID = cy.stub();
        configWrapper.componentProperties.onActionMethodID = onActionMethodID;
        configWrapper.componentProperties.onDoubleClickMethodID = onDoubleClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onDoubleClickMethodID).should('be.not.called');
            cy.get('button').dblclick().then(() => {
                cy.wrap(onDoubleClickMethodID).should('be.called');
            });
        });
    });

    it('should handle right clicked event', () => {
        const onRightClickMethodID = cy.stub();
        configWrapper.componentProperties.onRightClickMethodID = onRightClickMethodID;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            cy.wrap(onRightClickMethodID).should('be.not.called');
            cy.get('button').trigger('contextmenu').then(() => {
                cy.wrap(onRightClickMethodID).should('be.called');
            });
        });
    });
})