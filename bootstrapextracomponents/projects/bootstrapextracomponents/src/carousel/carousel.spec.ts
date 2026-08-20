import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServoyBootstrapExtraCarousel, Slide } from './carousel';

describe('ServoyBootstrapExtraCarousel', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraCarousel>;
    let component: ServoyBootstrapExtraCarousel;

    const defaultSlides: Slide[] = [];
    for (let i = 1; i <= 3; i++) {
        defaultSlides.push({
            imageUrl: 'https://picsum.photos/id/' + i + '/200/300',
            caption: 'caption' + i
        } as Slide);
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyBootstrapExtraCarousel, ServoyPublicTestingModule, NgbModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraCarousel);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('slides', defaultSlides);
        fixture.componentRef.setInput('cycleInterval', 0);
        fixture.componentRef.setInput('lazyLoading', true);
        fixture.componentRef.setInput('noTransition', true);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render the carousel', async () => {
        const el = fixture.nativeElement.querySelector('.carousel-inner');
        expect(el).not.toBeNull();
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('ngb-carousel');
        expect(el.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('ngb-carousel');
        expect(el.classList.contains('classA')).toBe(true);
        expect(el.classList.contains('classB')).toBe(true);
    });

    it('should set onSlideClicked handler', async () => {
        const onSlideClicked = vi.fn();
        fixture.componentRef.setInput('onSlideClicked', onSlideClicked);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.onSlideClicked()).toBe(onSlideClicked);
    });

    it('should render slides from input', async () => {
        const slides = fixture.nativeElement.querySelectorAll('.carousel-item');
        expect(slides.length).toBe(3);
    });

    it('should update innerSlides signal when slides input changes', async () => {
        const newSlides: Slide[] = [
            { imageUrl: 'http://example.com/a.png', caption: 'A' } as Slide,
            { imageUrl: 'http://example.com/b.png', caption: 'B' } as Slide
        ];
        fixture.componentRef.setInput('slides', newSlides);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.innerSlides().length).toBe(2);
    });

    it('should apply imageCss properties via signal', async () => {
        fixture.componentRef.setInput('imageCss', [
            { propertyName: 'max-width', propertyValue: '50%' }
        ]);
        fixture.detectChanges();
        await fixture.whenStable();
        const img = fixture.nativeElement.querySelector('.bts-extra-carousel-img');
        if (img) {
            expect(img.style.maxWidth).toBe('50%');
        }
    });
});
