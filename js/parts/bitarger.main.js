/**
 * Created by yaroslav on 24.12.14.
 */

var BITARGET = BITARGET || {};

// Tabs

BITARGET.tabs = function () {
	var $nav = $(".js-line-business-nav"),
		$info = $(".js-line-business-info");


	$(".b-line-business__info__item:not(:first)", $info).hide();

	$("li", $nav).on("click", function (e) {
		$(".b-line-business__info__item", $info).hide();
		$("li", $nav).removeClass("current");
		$(this).addClass("current");

		var clicked = $(this).find("a").attr("href");
		$(clicked, $info).fadeIn("fast");

		e.preventDefault();

	}).eq(0).addClass("current");
};


// FitText

(function ($) {

	$.fn.fitText = function (kompressor, options) {

		// Setup options
		var compressor = kompressor || 1,
			settings = $.extend({
				'minFontSize': Number.NEGATIVE_INFINITY,
				'maxFontSize': Number.POSITIVE_INFINITY
			}, options);

		return this.each(function () {

			// Store the object
			var $this = $(this);

			// Resizer() resizes items based on the object width divided by the compressor * 10
			var resizer = function () {
				$this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)),
					parseFloat(settings.minFontSize)));
			};

			// Call once to set.
			resizer();

			// Call on resize. Opera debounces their resize by default.
			$(window).on('resize.fittext orientationchange.fittext', resizer);

		});
	};

})(jQuery);

/**
 * Checkboxes
 */
BITARGET.check = function () {
	$('.checkbox input').on('change', function () {
		$(this).parent().toggleClass('active');
	});
};


// делим ширину контейнера на размер шрифта, умножаем на  .10 и получаем нужный kompressor
BITARGET.fitText = function () {
//    $(".js-fittext-h1").fitText(1.2, { minFontSize: '36px', maxFontSize: '80px' });
//	$(".js-fittext-item-text").fitText(1, { minFontSize: '14px', maxFontSize: '28px' });
//    $(".js-fittext-h3").fitText(2.777778, { minFontSize: '22px', maxFontSize: '36px' });
};

$(function () {
	BITARGET.tabs();
	BITARGET.fitText();
	BITARGET.check();
});
