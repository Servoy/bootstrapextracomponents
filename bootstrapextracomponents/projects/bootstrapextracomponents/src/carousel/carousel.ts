import { Component, ChangeDetectorRef, ViewChild, SimpleChanges, Renderer2, Input, ChangeDetectionStrategy } from '@angular/core';
import { BaseCustomObject, IFoundset, ServoyBaseComponent } from '@servoy/public';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

@Component( {
    selector: 'bootstrapextracomponents-carousel',
    templateUrl: './carousel.html',
    styleUrls: ['./bts-extra-carousel.css'],
    providers: [NgbCarouselConfig],
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ServoyBootstrapExtraCarousel extends ServoyBaseComponent<HTMLDivElement> {

    @ViewChild( 'ngCarousel', { static: true } ) ngCarousel: NgbCarousel;

    @Input() onSlideClicked: ( e: Event, slide: Slide ) => void;
    @Input() cycleInterval: number;
    @Input() noPause: boolean;
    @Input() noTransition: boolean;
    @Input() slides: Array<Slide>;
    @Input() slidesFoundset: IFoundset;
    @Input() lazyLoading: boolean;
    @Input() imageOptions: string;
    @Input() visible: boolean;
    @Input() size: { width: number; height: number };
    @Input() location: any;
    @Input() styleClass: string;
    @Input() imageCssInternal: any;
    @Input() imageCss: Array<CssProperty>;
    @Input() responsiveHeight: number;
    @Input() updateRecordSelection: boolean;

    innerSlides: Array<Slide>;
    foundsetID: number;

    loadingImage = 'bootstrapextracomponents/carousel/resources/loading.gif';
    missingImage = 'bootstrapextracomponents/carousel/resources/missing.png';

    constructor( renderer: Renderer2, cdRef: ChangeDetectorRef, _config: NgbCarouselConfig ) {
        super( renderer, cdRef );
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.elementRef?.nativeElement?.getBoundingClientRect().width) {
			this.size.width = this.elementRef.nativeElement.getBoundingClientRect().width;
		}
		if (this.elementRef?.nativeElement?.getBoundingClientRect().height) {
			this.size.height = this.elementRef.nativeElement.getBoundingClientRect().height;
		}
    }

    svyOnChanges( changes: SimpleChanges ) {
        if ( changes ) {
            if ( changes.slidesFoundset ) {
				if (!this.innerSlides || (this.innerSlides.length !=  this.slidesFoundset.serverSize) || (this.foundsetID != this.slidesFoundset.foundsetId) || this.imagesOrOrderChanged()) {
					this.createSlides();
				} else {
					const index = changes.slidesFoundset.currentValue.selectedRowIndexes[0];
					this.setSelectedIndex(index);
				}
            }
            if ( changes.imageOptions ) {
                const currentValue = changes.imageOptions.currentValue;
                if ( currentValue === 'Reduce' && !this.imageCss ) {
                    this.imageCssInternal = {
                        'max-width': '100%',
                        'max-height': '100%',
                        width: this.size ? this.size.width + 'px' : null,
                        height: this.size ? this.size.height + 'px' : null,
                        'object-fit': 'contain'
                    };
                }
                if ( currentValue === 'Reduce/Enlarge' && !this.imageCss ) {
                    this.imageCssInternal = {
                        width: this.size ? this.size.width + 'px' : null,
                        height: this.size ? this.size.height + 'px' : null
                    };
                }
                if ( currentValue === 'Crop' && !this.imageCss ) {
                    this.imageCssInternal = {
                        width: 'auto',
                        height: 'auto'
                    };
                }
                if ( currentValue === 'Scale to fit' && !this.imageCss ) {
                    this.imageCssInternal = {
                        'max-width': '100%',
                        'max-height': '100%',
                        width: this.size ? this.size.width + 'px' : null || ( this.servoyApi.isInAbsoluteLayout() ? this.size.width + 'px' : '100%' ),
                        height: this.size ? this.size.height + 'px' : null || ( this.servoyApi.isInAbsoluteLayout() ? this.size.height + 'px' : this.responsiveHeight + 'px' ),
                        'object-fit': 'contain'
                    };
                }

            }
            if ( changes.imageCss ) {
                if ( changes.imageCss.currentValue !== undefined ) {
                    for ( const cssEntry of this.imageCss) {
                        this.imageCssInternal[cssEntry.propertyName] = cssEntry.propertyValue;
                    }
                }
            }
        }
        super.svyOnChanges( changes );
    }

    getSelectedIndex() {
        const activeId = this.ngCarousel.activeId;
        return parseInt( activeId.substr( activeId.lastIndexOf('-') + 1 ), 10 );
    }

    setSelectedIndex( index: number ) {
		this.ngCarousel.pause();
        this.ngCarousel.select( this.servoyApi.getMarkupId() + '-' + index );
        this.ngCarousel.cycle();
    }

    getStyle(): any {
        const layoutStyle: any = {};
        if ( !this.servoyApi.isInAbsoluteLayout() ) {
            layoutStyle.height = this.responsiveHeight;
        }
        return layoutStyle;
    }

    onSlid(event: NgbSlideEvent) {
        if (this.updateRecordSelection && this.slidesFoundset) {
            const currentIndex = this.getSelectedIndex();
            if (currentIndex !== this.slidesFoundset.selectedRowIndexes[0]) {
                //update selected record when the slide index has changed and is not the selected record on the foundset
                this.slidesFoundset.requestSelectionUpdate([currentIndex]).then((serverRows) => {
                }, (serverRows) => {
                    //selection failed, what now
                });
            }
        }
    }
	
	imagesOrOrderChanged(): boolean {
		const newSlides = [];
		if ( this.slidesFoundset !== null && this.slidesFoundset !== undefined ) {
			for ( const row of this.slidesFoundset.viewPort.rows ) {
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

    private createSlides = () => {
        this.innerSlides = [];
        if ( this.slidesFoundset !== null && this.slidesFoundset !== undefined ) {
            for ( const row of this.slidesFoundset.viewPort.rows ) {
                const slide = new Slide();
                slide.imageUrl = row.image && row.image.url ? row.image.url : null;
                slide.caption = row.caption ? row.caption : null;
                this.innerSlides.push( slide );
            }
            this.foundsetID = this.slidesFoundset.foundsetId
        } else {
            if ( this.slides !== null && this.slides !== undefined ) {
                this.innerSlides = this.slides;
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
