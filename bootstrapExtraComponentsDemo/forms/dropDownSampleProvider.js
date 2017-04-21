/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"F0C70BBD-A630-4FEE-B609-9017A3093E14"}
 */
function getName() {
	return 'Drop-Down';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"8AB65261-DF99-4823-A3EE-3B01551DFB7A"}
*/
function getDescription() {
	return 'Bootstrap Extra Drop-Down Buttons/Menus';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"C29C9BD1-3C21-4389-8337-6845B3354983"}
*/
function getParent() {
	return forms.bootstrapExtraSampleProvider;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"AAA2E0B2-1EC8-477B-B217-EFB80076571D"}
*/
function getIconStyleClass() {
	return 'fa-caret-square-o-down';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"A417C717-681A-46A1-90BF-29F17C0740B4"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"87E3ADB7-A17E-4DEB-ABB9-1B7A43384415"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"C842964C-5E4C-440B-B9E8-3C700282A632"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"6BA10752-AE3C-470E-A825-F0CD42B34E70"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki/Drop-Down';
}
