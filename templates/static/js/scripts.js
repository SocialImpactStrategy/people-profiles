$(document).ready(function() {
    var maxH = 0;

    // This MUST BE DONE before initialize foundation and isotope.
    $('.b-card').each(function() {
        maxH = $(this).height() > maxH ? $(this).height() : maxH;
    }).height(maxH);

    $(document).foundation();

    $('.b-cards-wrapper').isotope({
        itemSelector: '.b-card',
        layoutMode: 'fitRows'
    });

    $('.b-offcanvas .b-item-wrapper').slideUp();

    $('.b-offcanvas .m-filter-name').click(function() {
        if ($(this).children().hasClass('fa-plus')) {
            $(this).children().removeClass('fa-plus');
            $(this).children().addClass('fa-minus');

            $(this).next().slideDown();

        } else {
            $(this).children().removeClass('fa-minus');
            $(this).children().addClass('fa-plus');

            $(this).next().slideUp();
        }
    });

    $(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function() {
        $('.left-off-canvas-toggle').addClass('m-active');
        $('.inner-wrap').height($('.b-offcanvas')[0].scrollHeight);
    });

    $(document).on('close.fndtn.offcanvas', '[data-offcanvas]', function() {
        $('.left-off-canvas-toggle').removeClass('m-active');
        $('.inner-wrap').height('auto');
    });


    $('.e-filter-tag').click(function() {
        var filterValue = '';

        $(this).toggleClass('m-active');

        $('.e-filter-tag.m-active').each(function() {
            filterValue += $(this).attr('data-filter');
        });

        $('.b-cards-wrapper').isotope({ filter: filterValue || '*'});

        return false;
    });

    $('.b-profile.reveal-modal').click(function(e) {
        if (!$.contains($(this).find('.b-main')[0], e.target)) {
            if (!$.contains($(this).find('.b-side-bar')[0], e.target)) {
                $(this).foundation('reveal', 'close');
            }
        }
    });

    $(document).on('open.fndtn.reveal', '[data-reveal]', function () {
        var $copy = $(this).clone().css('display', 'block').appendTo('body'),
            h01 = $copy.find('.b-main').height(),
            h02 = $copy.find('.b-side-bar').outerHeight(true);

        if (window.innerWidth > 641) { // Medium screens and up.
            if (h01 < h02) {
                $(this).find('.b-main').height(h02);
            }

        } else {
            $(this).find('.b-main').css('height', 'auto');
        }

        $copy.remove();
    });
 });

