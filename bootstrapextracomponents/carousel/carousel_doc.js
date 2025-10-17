/*
 * A component that displays a slideshow of images with optional captions.
 */

/**
 * Interval (in milliseconds) at which the carousel automatically cycles through slides.
 */
var cycleInterval;

/**
 * When true, the carousel does not pause cycling on user interaction.
 */
var noPause;

/**
 * When true, transition effects between slides are disabled.
 */
var noTransition;

/**
 * An array of slide objects to be displayed in the carousel.
 */
var slides;

/**
 * A foundset that provides slide data.
 */
var slidesFoundset;

/**
 * When true, slides are loaded lazily as needed.
 */
var lazyLoading;

/**
 * Options for displaying images within the carousel (e.g., "Reduce", "Crop", etc.).
 */
var imageOptions;

/**
 * Flag indicating whether the carousel is visible.
 */
var visible;

/**
 * Dimensions of the carousel component.
 */
var size;

/**
 * The position of the carousel component on the form.
 */
var location;

/**
 * CSS style classes applied to the carousel component.
 */
var styleClass;

/**
 * An array of CSS property objects to be applied to images within the carousel.
 */
var imageCss;

/**
 * Height used for responsive layouts.
 */
var responsiveHeight;

/**
 * When <code>true</code> the foundset's selection is updated with any slide selection
 */
var updateRecordSelection;


var handlers = {
    /**
     * Fired when a slide is clicked.
     *
     * @param {JSEvent} event the event object containing details about the click event e.g. target element, mouse coordinates
     * @param {CustomType<bootstrapextracomponents-carousel.slide>} slide the slide object that was clicked
     */
    onSlideClicked: function() {}
};

/**
 * Adds the given slide
 * 
 * @param {CustomType<bootstrapextracomponents-carousel.slide>} slideToAdd The slide object to be added to the collection.
 */
function addSlide(slideToAdd) {
}

/**
 * Sets the given slides
 * 
 * @param {Array<CustomType<bootstrapextracomponents-carousel.slide>>} slides An array of slide objects to set as the current collection of slides.
 */
function setSlides(slides) {
}

/**
 * Removes the slide at the given index (0 based)
 * 
 * @param {Number} index The 0-based index of the slide to be removed or set as selected.
 */
function removeSlide(index) {
}

/**
 * Returns the index of the currently selected slide (0 based)
 * 
 * @return {Number} index The 0-based index of the currently selected slide.
 */
function getSelectedIndex() {
}

/**
 * Sets the selected slide to the given index (0 based)
 * 
 * @param {Number} index The 0-based index of the slide to be removed or set as selected.
 */
function setSelectedIndex(index) {
}

/**
 * Type definitions for bootstrapextracomponents-carousel types.
 */
var svy_types = {

    /**
     * Represents a slide in the carousel.
     */
    slide: {

        /**
         * The URL of the image for this slide.
         */
        imageUrl: null,

        /**
         * The caption text displayed with this slide.
         */
        caption: null
    },

    /**
     * Represents a CSS property used to style carousel images.
     */
    cssProperty: {

        /**
         * The name of the CSS property.
         */
        propertyName: null,

        /**
         * The value assigned to the CSS property.
         */
        propertyValue: null
    }
};
