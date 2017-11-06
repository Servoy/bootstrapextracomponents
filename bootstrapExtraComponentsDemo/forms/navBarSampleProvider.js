/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"F74D162E-7B01-4C1A-A19D-DF082FFFB265"}
 */
function getName() {
	return 'Navbar';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"9DA96C7C-B318-4310-8042-AA31FEEAA52B"}
*/
function getDescription() {
	return 'Bootstrap Extra Navbar Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"070FB767-B2ED-4B88-A290-E76F25C70E94"}
*/
function getParent() {
	return forms.commonComponentSamples;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"546DA244-9C67-4F54-946E-4D13D13C0412"}
*/
function getIconStyleClass() {
	return 'fa fa-bars';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"5DFC0225-CFEA-44B8-845A-DC709C9C6B5E"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"0261B8B4-3D65-4607-B40A-180BC8CE86E8"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"214F54C0-8609-41DF-A0F9-67C6A28BF16E"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"08605E19-D6E4-497A-9365-E45D1F375FBB"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
