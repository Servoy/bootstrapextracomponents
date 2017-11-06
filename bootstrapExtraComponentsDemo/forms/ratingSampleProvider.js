/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"9C65D635-980A-4844-BA3A-CEC55F4AD7CF"}
 */
function getName() {
	return 'Rating';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"17A7232E-686C-4796-8AA7-464C1D0DD084"}
*/
function getDescription() {
	return 'Bootstrap Extra Rating Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"3B0A2F64-1E28-4F5D-B90D-1B1F8AF6AF35"}
*/
function getParent() {
	return forms.commonComponentSamples;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"5227D1F6-70A9-4237-BECF-2FCA16BC26FC"}
*/
function getIconStyleClass() {
	return 'fa fa-star-o';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"72951D9B-5DD8-4EFC-8244-08F1D94B5749"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"C6B99227-6F1D-4692-BC94-35127F022E1C"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"4CD34E0F-4B29-4691-8F55-47AA64264786"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"ADA6DB9B-B9F6-417E-8E7A-AF96EBD656C6"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
