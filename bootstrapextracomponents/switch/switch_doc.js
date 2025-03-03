var dataProviderID;

var enabled;

var styleClass;

var animate;

var onText;

var offText;

var onColor;

var offColor;

var label;

var labelWidth;

var handleWidth;

var componentSize;

var tabSeq;

var size;

var visible;


var handlers = {
    /**
     * @param {JSEvent} event
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
     *
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
     *
     * @returns {Boolean}
     */
    onDataChangeMethodID: function() {}
};

/**
 * Request the focus to this switch.
 *
 * @example %%prefix%%%%elementName%%.requestFocus();
 */
function requestFocus() {
}