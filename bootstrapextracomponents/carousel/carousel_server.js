/**
 * Adds the given slide
 * 
 * @param {slide} slideToAdd
 */
$scope.api.addSlide = function(slideToAdd) {
	if (!$scope.model.slides) {
		$scope.model.slides = [];
	}
	$scope.model.slides.push(slideToAdd);
}

/**
 * Removes the slide at the given index (0 based)
 * 
 * @param {Number} index
 */
$scope.api.removeSlide = function(index) {
	$scope.model.slides.splice(index, 1);
}