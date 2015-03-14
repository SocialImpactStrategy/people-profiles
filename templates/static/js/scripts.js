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
 });
