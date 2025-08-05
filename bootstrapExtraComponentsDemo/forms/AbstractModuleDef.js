/**
 * @deprecated Override getVersion instead. Will be removed in version 6
 * @type {String}
 * @protected
 * 
 * @properties={typeid:35,uuid:"FB54F971-CF23-454B-B36F-D47D0B3EFC5E"}
 */
var version = '';

/**
 * Returns the module version. User semantic versions {@link http://semver.org/}
 * @abstract
 * @return {String} version
 * @properties={typeid:24,uuid:"6AA22785-0484-43F2-80EC-F0F5E31427D4"}
 */
function getVersion() {
	throw new scopes.svyExceptions.AbstractMethodInvocationException('Abstract method getVersion() must be implemented on instances of AbstractModuleDef');
}

/**
 * @deprecated Override getId instead. Will be removed in version 6
 * @type {String}
 * @protected
 * 
 * @properties={typeid:35,uuid:"20F944AD-9E09-459C-9F15-AAFB6098B208"}
 */
var id = '';

/**
 * Returns the module identifier
 * @abstract
 * @return {String} id
 * @properties={typeid:24,uuid:"2476AB5B-0D9F-4FE5-AD03-449B7C95ABDF"}
 */
function getId() {
	throw new scopes.svyExceptions.AbstractMethodInvocationException('Abstract method getId() must be implemented on instances of AbstractModuleDef');
}

/**
 * Override to invoke module initialization code
 * 
 * @param {Object.<String,String>} [startupArguments] all startup arguments with which the solution is opened
 * 
 * @properties={typeid:24,uuid:"D3C7D5D1-4501-4729-8DF4-8CF63EBD7F55"}
 */
function moduleInit(startupArguments) {}

/**
 * If the module depends on other modules being initialized first, return the ID's of those modules as an Array of Strings
 * @return {Array<{id: String}>}
 *
 * @properties={typeid:24,uuid:"587257E1-A89F-453D-BDC6-8AB9F5777CD6"}
 */
function getDependencies() {
	return null
}
