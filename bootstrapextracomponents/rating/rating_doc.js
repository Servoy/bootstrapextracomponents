/* bootstrapextracomponents-rating */

var dataProviderID;



var handlers = {
    /**
     * @param {JSEvent} event
     * @param {Number} value
     */
    onLeave: function() {},

    /**
     * @param {JSEvent} event
     * @param {Number} value
     */
    onHover: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     * 
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
     * @returns {Boolean}
     */
    onDataChangeMethodID: function() {}
};
