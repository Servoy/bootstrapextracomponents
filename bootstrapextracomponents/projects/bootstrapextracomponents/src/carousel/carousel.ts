import { Component, ChangeDetectorRef, SimpleChanges, Renderer2, ChangeDetectionStrategy, input, viewChild, signal } from '@angular/core';
import { BaseCustomObject, IFoundset, ServoyBaseComponent } from '@servoy/public';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

@Component( {
    selector: 'bootstrapextracomponents-carousel',
    templateUrl: './carousel.html',
    providers: [NgbCarouselConfig],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
} )
export class ServoyBootstrapExtraCarousel extends ServoyBaseComponent<HTMLDivElement> {

    readonly ngCarousel = viewChild<NgbCarousel>('ngCarousel');

    readonly onSlideClicked = input<(e: Event, slide: Slide) => void>(undefined);
    readonly cycleInterval = input<number>(undefined);
    readonly noPause = input<boolean>(undefined);
    readonly noTransition = input<boolean>(undefined);
    readonly slides = input<Array<Slide>>(undefined);
    readonly slidesFoundset = input<IFoundset>(undefined);
    readonly lazyLoading = input<boolean>(undefined);
    readonly imageOptions = input<string>(undefined);
    readonly visible = input<boolean>(undefined);
    readonly styleClass = input<string>(undefined);
    readonly imageCssInternal = input<any>(undefined);
    readonly imageCss = input<Array<CssProperty>>(undefined);
    readonly responsiveHeight = input<number>(undefined);
    readonly updateRecordSelection = input<boolean>(undefined);
    
    _imageCssInternal = signal<any>(undefined)

    innerSlides: Array<Slide>;
    foundsetID: number;

    loadingImage = 'bootstrapextracomponents/carousel/resources/loading.gif';
    missingImage = 'bootstrapextracomponents/carousel/resources/missing.png';
    
    private size: { width: string|number; height: string|number} = { width: '100%', height: '100%' };

    constructor( renderer: Renderer2, cdRef: ChangeDetectorRef, _config: NgbCarouselConfig ) {
        super( renderer, cdRef );
    }

    svyOnInit() {
        super.svyOnInit();
        this._imageCssInternal.set(this.imageCssInternal());
        if (this.elementRef?.nativeElement?.getBoundingClientRect().width) {
			this.size.width = this.elementRef.nativeElement.getBoundingClientRect().width;
		}
		if (this.elementRef?.nativeElement?.getBoundingClientRect().height) {
			this.size.height = this.elementRef.nativeElement.getBoundingClientRect().height;
		}
    }

    svyOnChanges( changes: SimpleChanges ) {
        if ( changes ) {
            const slidesFoundset = this.slidesFoundset();
            if ( changes.slidesFoundset && changes.slidesFoundset.currentValue ) {
				if (!this.innerSlides || (this.innerSlides.length !=  slidesFoundset.serverSize) || (this.foundsetID != slidesFoundset.foundsetId) || this.imagesOrOrderChanged()) {
					this.createSlides();
				} else {
					const index = changes.slidesFoundset.currentValue.selectedRowIndexes[0];
					this.setSelectedIndex(index);
				}
            }
            if (changes.slides && !slidesFoundset) {
                this.createSlides(); 
            }
            const imageCssValue = this.imageCss();
            if ( changes.imageOptions ) {
                const currentValue = changes.imageOptions.currentValue;
                const imageCss = this.imageCss();
                if ( currentValue === 'Reduce' && !imageCss ) {
                    this._imageCssInternal.set({
                        'max-width': '100%',
                        'max-height': '100%',
                        width: this.size ? this.size.width + 'px' : null,
                        height: this.size ? this.size.height + 'px' : null,
                        'object-fit': 'contain'
                    });
                }
                if ( currentValue === 'Reduce/Enlarge' && !imageCssValue ) {
                    this._imageCssInternal.set({
                        width: this.size ? this.size.width + 'px' : null,
                        height: this.size ? this.size.height + 'px' : null
                    });
                }
                if ( currentValue === 'Crop' && !imageCssValue ) {
                    this._imageCssInternal.set({
                        width: 'auto',
                        height: 'auto'
                    });
                }
                if ( currentValue === 'Scale to fit' && !imageCssValue ) {
                    this._imageCssInternal.set({
                        'max-width': '100%',
                        'max-height': '100%',
                        width: this.size ? this.size.width + 'px' : ( !this.servoyApi.isInAbsoluteLayout() ? '100%' : null ),
                        height: this.size ? this.size.height + 'px' : ( !this.servoyApi.isInAbsoluteLayout() ? this.responsiveHeight() + 'px': null),
                        'object-fit': 'contain'
                    });
                }

            }
            if ( changes.imageCss ) {
                if ( changes.imageCss.currentValue !== undefined ) {
                    for ( const cssEntry of imageCssValue) {
                        this._imageCssInternal()[cssEntry.propertyName] = cssEntry.propertyValue;
                    }
                }
            }
        }
        super.svyOnChanges( changes );
    }

    getSelectedIndex() {
        const activeId = this.ngCarousel().activeId;
        return parseInt( activeId.substr( activeId.lastIndexOf('-') + 1 ), 10 );
    }

    setSelectedIndex( index: number ) {
		this.ngCarousel().pause();
        this.ngCarousel().select( this.servoyApi.getMarkupId() + '-' + index );
        this.ngCarousel().cycle();
    }

    getStyle(): any {
        const layoutStyle: any = {};
        if ( !this.servoyApi.isInAbsoluteLayout() ) {
            layoutStyle.height = this.responsiveHeight() + 'px';
        }
        return layoutStyle;
    }

    onSlid(event: NgbSlideEvent) {
        const slidesFoundset = this.slidesFoundset();
        if (this.updateRecordSelection() && slidesFoundset) {
            const currentIndex = this.getSelectedIndex();
            if (currentIndex !== slidesFoundset.selectedRowIndexes[0]) {
                //update selected record when the slide index has changed and is not the selected record on the foundset
                slidesFoundset.requestSelectionUpdate([currentIndex]).then((serverRows) => {
                }, (serverRows) => {
                    //selection failed, what now
                });
            }
        }
    }
	
	imagesOrOrderChanged(): boolean {
		const newSlides = [];
		const slidesFoundset = this.slidesFoundset();
        if (slidesFoundset !== null && slidesFoundset !== undefined) {
			for ( const row of slidesFoundset.viewPort.rows ) {
				const slide = new Slide();
				slide.imageUrl = row.image && row.image.url ? row.image.url : null;
				slide.caption = row.caption ? row.caption : null;
				newSlides.push( slide );
			}
			
			if (JSON.stringify(this.innerSlides) !== JSON.stringify(newSlides)) {
				return true;
			}
		}
		return false;
	}
    
    slideClicked( e: Event, slide: Slide):void {
        const onSlideClicked = this.onSlideClicked();
        if (onSlideClicked) {
            onSlideClicked(e, slide);
        }
    }

    private createSlides = () => {
        this.innerSlides = [];
        const slidesFoundset = this.slidesFoundset();
        if ( slidesFoundset !== null && slidesFoundset !== undefined ) {
            for ( const row of slidesFoundset.viewPort.rows ) {
                const slide = new Slide();
                slide.imageUrl = row.image && row.image.url ? row.image.url : null;
                slide.caption = row.caption ? row.caption : null;
                this.innerSlides.push( slide );
            }
            this.foundsetID = slidesFoundset.foundsetId
        } else {
            const slides = this.slides();
            if ( slides !== null && slides !== undefined ) {
                this.innerSlides = slides;
            }
        }
        if (this.servoyApi.isInDesigner()) {
			const slide = new Slide();
			slide.imageUrl = this.missingImage;
			this.innerSlides = [slide];
		}
		if (this.innerSlides.length === 0) {
			this.elementRef.nativeElement.classList.add('bts-extra-carousel-hidden');
		} else {
			this.elementRef.nativeElement.classList.remove('bts-extra-carousel-hidden');
		}
    };
}

export class Slide extends BaseCustomObject {
    public imageUrl: string;
    public caption: string;
}

class CssProperty extends BaseCustomObject {
    public propertyName: string;
    public propertyValue: string;
}
