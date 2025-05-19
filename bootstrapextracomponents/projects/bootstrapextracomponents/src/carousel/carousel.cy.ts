import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraCarousel, Slide } from './carousel';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-carousel
            [servoyApi]="servoyApi"
            (click)="onSlideClicked($event)"
            [styleClass]="styleClass"
            [cycleInterval]="cycleInterval"
            [imageCss]="imageCss"
            [imageOptions]="imageOptions"
            [lazyLoading]="lazyLoading"
            [noPause]="noPause"
            [noTransition]="noTransition"
            [responsiveHeight]="responsiveHeight"
            [slides]="slides"
            [slidesFoundset]="slidesFoundset"
            [updateRecordSelection]="updateRecordSelection"
            #element>
        </bootstrapextracomponents-carousel>
    `,
    standalone: false
})
class WrapperComponent {
    onSlideClicked: (e: Event, data?: any) => void;
    servoyApi: ServoyApi;
    styleClass: string;
    cycleInterval: number;
    imageCss: Array<any>;
    imageOptions: string;
    lazyLoading: boolean;
    noPause: boolean;
    noTransition: boolean;
    responsiveHeight: number;
    slides: Array<Slide>;
    slidesFoundset: any;
    updateRecordSelection: boolean;
       
    @ViewChild('element') element: ServoyBootstrapExtraCarousel;
    @ViewChild('ngCarousel', { static: true } ) ngCarousel: NgbCarousel;
}

describe('Badge Component', () => {
    const servoyApiSpy = new ServoyApiTesting();

    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraCarousel],
        imports: [ServoyPublicTestingModule, NgbCarousel, NgbSlide]
    }

    beforeEach(() => {
        const slides = [];
        for (let i = 1; i <= 10; i++) {
            slides.push({
                imageUrl: 'https://picsum.photos/id/' + i + '/200/300',
                caption: 'caption' + i
            });
        }
        configWrapper.componentProperties = {
            servoyApi: servoyApiSpy,
            slides: slides,
            cycleInterval: 5000,
            lazyLoading: true
        }
    });

    it('when component is mounted and registered', () => {
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.get('.carousel-inner').should('exist').then(_ => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('ngb-carousel').should('not.have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'mystyleclass';
                wrapper.fixture.detectChanges();
                cy.get('ngb-carousel').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        configWrapper.componentProperties.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            cy.get('ngb-carousel').should('have.class', 'mystyleclass').then(_ => {
                wrapper.component.styleClass = 'classA classB';
                wrapper.fixture.detectChanges();
                cy.get('ngb-carousel').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should handle onSlideClicked  event', () => {
        const onSlideClicked = cy.stub();
        configWrapper.componentProperties.onSlideClicked = onSlideClicked;
        cy.mount(WrapperComponent, configWrapper).then(() => {
            cy.wrap(onSlideClicked).should('be.not.called');
            cy.get('.carousel-item.active').click().then(() => {
                cy.wrap(onSlideClicked).should('be.called');
            });
        });
    });
})