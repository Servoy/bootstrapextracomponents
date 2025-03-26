/**
 * Displays a progress bar with dynamic progress value and text.
 */

/**
 * Bound data provider identifier for the progress bar's value.
 */
var dataProviderID;

/**
 * CSS style classes applied to the progress bar component.
 */
var styleClass;

/**
 * The current progress value.
 */
var value;

/**
 * The visual type of the progress bar (e.g. info, success, warning, danger).
 */
var type;

/**
 * Flag indicating whether progress transitions are animated.
 */
var animate;

/**
 * Flag indicating whether the progress value is displayed on the progress bar.
 */
var showValue;

/**
 * Flag indicating whether the progress value is shown as a percentage.
 */
var showValueAsPercentage;

/**
 * Optional text to display on the progress bar instead of the numeric value.
 */
var valueText;

/**
 * The maximum value of the progress bar.
 */
var max;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Flag indicating whether the progress bar is visible.
 */
var visible;

/**
 * Dimensions (width and height) of the progress bar component.
 */
var size;

/**
 * Sets the progress, optionally setting the text of the bar
 *
 * @param {Number} value The progress value to set.
 * @param {String} [valueText] The text to display on the progress bar.
 */
function setProgress(value, text) {
}

/**
 * Do not call this method; this will be removed with Servoy 8.2
 * @param {Number} value The progress value to set.
 * @param {String} [valueText] The text to display on the progress bar.
 */
function updateProgressBar(value, text) {
}