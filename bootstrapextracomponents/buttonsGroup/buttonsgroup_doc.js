/* bootstrapextracomponents-buttons-group */

var dataProviderID;

var styleClass;

var valuelistID;

var inputType;

var enabled;

var toolTipText;

var visible;

var location;

var size;

var tabSeq;

var showAs;


var handlers = {
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
