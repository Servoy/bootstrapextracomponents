/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"D114E28E-664A-4925-89D8-CA87B3EF6324"}
 */
function getName() {
	return 'Input Group';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"BA703221-F94E-497D-805A-318804D9B16B"}
*/
function getDescription() {
	return 'Bootstrap Extra Input Group Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"71C3F9C0-77AA-48F9-BC71-A856E137F6C0"}
*/
function getParent() {
	return forms.commonComponentFieldSamples;
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"AB9242FF-6F4E-46A1-B23D-87E159002739"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"524996BA-48B8-4146-A8FC-00F86228C49F"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"B95AE52B-EAEE-4A8B-916B-08DD97706F84"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
