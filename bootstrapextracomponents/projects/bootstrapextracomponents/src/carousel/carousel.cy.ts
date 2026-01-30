/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServoyApi, ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraCarousel, Slide } from './carousel';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, signal } from '@angular/core';

@Component({
    template: `
        <bootstrapextracomponents-carousel
            [servoyApi]="servoyApi"
            (click)="onSlideClicked($event)"
            [styleClass]="styleClass()"
            [cycleInterval]="cycleInterval()"
            [imageCss]="imageCss()"
            [imageOptions]="imageOptions()"
            [lazyLoading]="lazyLoading()"
            [noPause]="noPause()"
            [noTransition]="noTransition()"
            [responsiveHeight]="responsiveHeight()"
            [slides]="slides()"
            [slidesFoundset]="slidesFoundset()"
            [updateRecordSelection]="updateRecordSelection()"
            #element>
        </bootstrapextracomponents-carousel>
    `,
    standalone: false
})
class WrapperComponent {
    onSlideClicked: (e: Event, data?: any) => void;
    servoyApi: ServoyApi;
    styleClass = signal<string | undefined>(undefined);
    cycleInterval = signal<number | undefined>(undefined);
    imageCss = signal<Array<any>>(undefined);
    imageOptions = signal<string | undefined>(undefined);
    lazyLoading = signal<boolean>(undefined);
    noPause = signal<boolean>(undefined);
    noTransition = signal<boolean>(undefined);
    responsiveHeight = signal<number | undefined>(undefined);
    slides = signal<Array<Slide>>(undefined);
    slidesFoundset = signal<any>(undefined);
    updateRecordSelection = signal<boolean>(undefined);

    @ViewChild('element') element: ServoyBootstrapExtraCarousel;
    @ViewChild('ngCarousel', { static: true }) ngCarousel: NgbCarousel;
}

const defaultValues = {
    servoyApi: new ServoyApiTesting(),
    onSlideClicked: undefined,
    styleClass: undefined,
    cycleInterval: 5000,
    imageCss: undefined,
    imageOptions: undefined,
    lazyLoading: true,
    noPause: undefined,
    noTransition: undefined,
    responsiveHeight: undefined,
    slides: [] as Array<Slide>,
    slidesFoundset: undefined,
    updateRecordSelection: undefined
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

describe('ServoyBootstrapExtraCarousel Component', () => {
    const configWrapper: MountConfig<WrapperComponent> = {
        declarations: [ServoyBootstrapExtraCarousel],
        imports: [ServoyPublicTestingModule, NgbCarousel, NgbSlide]
    }

    beforeEach(() => {
        const slides: Array<Slide> = [];
        for (let i = 1; i <= 10; i++) {
            slides.push({
                imageUrl: 'https://picsum.photos/id/' + i + '/200/300',
                caption: 'caption' + i
            } as Slide);
        }
        defaultValues.slides = slides;
    });

    it('when component is mounted and registered', () => {
        const servoyApiSpy = defaultValues.servoyApi;
        const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.get('.carousel-inner').should('exist').then(() => {
                cy.wrap(registerComponent).should('be.called');
            });
        });
    });

    it('show a style class', () => {
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('ngb-carousel').should('not.have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('mystyleclass');
                cy.get('ngb-carousel').should('have.class', 'mystyleclass')
            });
        });
    });

    it('show more then 1 style class', () => {
        defaultValues.styleClass = 'mystyleclass';
        cy.mount(WrapperComponent, configWrapper).then(wrapper => {
            applyDefaultProps(wrapper);
            cy.get('ngb-carousel').should('have.class', 'mystyleclass').then(() => {
                wrapper.component.styleClass.set('classA classB');
                cy.get('ngb-carousel').should('have.class', 'classA').should('have.class', 'classB');
            });
        });
    });

    it('should handle onSlideClicked event', () => {
        const onSlideClicked = cy.stub();
        defaultValues.onSlideClicked = onSlideClicked;
        cy.mount(WrapperComponent, configWrapper).then((wrapper) => {
            applyDefaultProps(wrapper);
            cy.wrap(onSlideClicked).should('be.not.called');
            cy.get('.carousel-item.active').click().then(() => {
                cy.wrap(onSlideClicked).should('be.called');
            });
        });
    });
});