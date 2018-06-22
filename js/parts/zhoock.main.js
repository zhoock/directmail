var zhoock = zhoock || {};


// раскрытие панели с дополнительной информацией

zhoock.extraInfo = function () {
    $("body").on("click", ".js-add-content", function (e) {
        $(this)
            .next()
            .stop(true, true)
            .slideToggle('slow');

        e.preventDefault();
    });
};


// карусель портфолио

zhoock.owlPortfolio = function () {

    $(".js-owl-portfolio").owlCarousel({
        items: 2,
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        navigationText: ["<span class='icon-prev'></span>", "<span class='icon-next'></span>"],
        pagination: true,
        transitionStyle: "fade"
    });
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

// делим ширину контейнера на размер шрифта, умножаем на  .10 и получаем нужный kompressor
zhoock.fitText = function () {
    $(".js-fittext-h1").fitText(1.2, { minFontSize: '36px', maxFontSize: '80px' });
    $(".js-fittext-h2").fitText(3.846153, { minFontSize: '14px', maxFontSize: '26px' });
    $(".js-fittext-h3").fitText(2.777778, { minFontSize: '22px', maxFontSize: '36px' });
};


// валидация, сериализация и отправка формы

zhoock.validateForm = function () {

    $('.js-data-user').validate({
        submitHandler: function (form) {

            var options = {
                dataType: 'json',
                clearForm: true,
                semantic: true,
                success: showResponse
            };
            // jQuery Form
            $(form).ajaxSubmit(options);

            function showResponse(data) {
                if (data.error_id == 0) {
                    alert(data.text);

                } else if (data.error_id == 1) {
                    alert(data.text);
                }
            }
        },

        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                digits: true
            },
            comments: "required"

        },
        messages: {
            name: {
                required: 'Введите своё имя'
            },
            tel: {
                required: 'Укажите Ваш телефон',
                digits: 'Поле должно содержать только числовые символы'
            },
            email: {
                required: 'Введите Ваш e-mail',
                email: 'Почта должна быть в формате name@domain.com'
            },
            comments: {
                required: 'Введите сообщение'
            }

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });
};

zhoock.smoothScrolling = function () {
    $('a[href^="#"]').on("click", function () {

        var target = $(this).attr('href');

        window.parent.$('html, body').animate({scrollTop: $(target).offset().top + 3}, 1000);
        return false;
    });


    $('.js-section')
        .waypoint(function (direction) {

            var $links = $(' .zhoock__nav a[href="#' + this.id + '"]');
            $links.toggleClass('selected', direction === 'down');


//            $(this).find(".zhoock__nav").toggleClass("stuck");

        }, {})
        .waypoint(function (direction) {

            var $links = $('.zhoock__nav a[href="#' + this.id + '"]');
            $links.toggleClass('selected', direction === 'up');

//            $(this).find(".zhoock__nav").toggleClass("stuck");

        }, {

            offset: function () {
                return -$(this).height();
            }
        });
};


$(function () {

    zhoock.extraInfo();
    zhoock.owlPortfolio();
    zhoock.fitText();
    zhoock.validateForm();
    zhoock.smoothScrolling();

});

