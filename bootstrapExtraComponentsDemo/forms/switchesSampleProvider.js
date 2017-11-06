/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"BFAB23E9-4ECE-4891-8510-57D9BE6911AC"}
 */
function getName() {
	return 'Switches';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"0DE39675-3869-422E-B4DC-AC51C00E9A4B"}
*/
function getDescription() {
	return 'Bootstrap Extra Switches Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"4484BEC0-4292-45C3-A704-FC50EF4ECE98"}
*/
function getParent() {
	return forms.commonComponentSamples;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"409241FC-B623-4476-B041-2EBD3C0A1F01"}
*/
function getIconStyleClass() {
	return 'fa fa-toggle-on';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"C3258F74-57AD-4114-BFD1-C06F8EF1CB37"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"EA7AF18E-32B3-4785-8965-22D8384167E1"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"ADBCA828-FA3F-4250-8530-22CAF34DD5C4"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"DA6708F3-E9A1-4CCF-B964-E2508A7C512C"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
