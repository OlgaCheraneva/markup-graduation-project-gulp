$(function() {
    // Header
    const header = document.querySelector('.header');
    const headerClass = 'header_translucent-bg';

    document.addEventListener('scroll', function() {
        window.scrollY > header.offsetHeight
            ? header.classList.add(headerClass)
            : header.classList.remove(headerClass);
    });

    // Menu
    const menuButton = $('.menu-button');
    const menu = $('.nav');

    menuButton.on('click', handleMenuDisplay);

    function handleMenuDisplay() {
        $(this).toggleClass('open');
        menu.css('display') === 'none'
            ? menu.slideDown(500)
            : menu.slideUp(500);
    }

    const activeClassesBreakpoint = 1024.98;
    const activeClasses = ['nav__link_active', 'bold-on-hover_underlined'];
    handleBoldOnHover();
    $(window).resize(handleBoldOnHover);
    function handleBoldOnHover() {
        if (window.innerWidth < activeClassesBreakpoint) {
            removeActiveClasses();
            $('.nav__link').removeClass('bold-on-hover');
        } else {
            $('.nav__link').addClass('bold-on-hover');
        }
    }

    $('.nav__link').on('click', handleMenuClick);
    $('.footer__nav-link').on('click', handleMenuClick);

    function handleMenuClick(e) {
        e.preventDefault();

        const targetElement = $(this).attr('href');
        const animationSpeed = 500;
        const headerHeight = $('.header').outerHeight();
        const destination = $(targetElement).offset().top - headerHeight;

        reassignActiveClasses(`.nav__link[href="${targetElement}"]`);
        $('html').animate({scrollTop: destination}, animationSpeed);

        return false;
    }

    function reassignActiveClasses(newActiveLink) {
        removeActiveClasses();
        $(newActiveLink).addClass(activeClasses.join(' '));
    }

    function removeActiveClasses() {
        $('.nav__link').removeClass(activeClasses.join(' '));
    }

    // Dialogs
    handleDialog(
        '.call-request-dialog',
        '.open-call-request-dialog',
        '.close-call-request-dialog'
    );
    handleDialog(
        '.contact-form-dialog',
        '.open-contact-form-dialog',
        '.close-contact-form-dialog'
    );
    function handleDialog(dialog, openBtn, closeBtn) {
        $(openBtn).on('click', () => {
            $(dialog).addClass('dialog_open');
            bodyScrollLock.disableBodyScroll(document.querySelector(dialog));
        });
        $(closeBtn).on('click', () => {
            $(dialog).removeClass('dialog_open');
            bodyScrollLock.enableBodyScroll(document.querySelector(dialog));
        });
    }

    // Input mask
    new Inputmask('+7 999-999-99-99').mask($('.phone-number-input'));

    // Carousel
    new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 1,
        navigation: {
            nextEl: '[data-action="slideRight"]',
            prevEl: '[data-action="slideLeft"]'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            520: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Prices section animation
    const section = document.querySelector('.prices');
    const sectionElements = document.querySelector('.prices__elements');
    const animationClassName = 'prices__elements_animated';

    function isSectionEntirelyVisible(section) {
        const {height, y} = section.getBoundingClientRect();
        return y > 0 && y + height < window.innerHeight;
    }

    function isSectionEntirelyInvisible(section) {
        const {bottom, top} = section.getBoundingClientRect();
        return bottom < 0 || top > window.innerHeight;
    }

    document.addEventListener('scroll', function() {
        if (isSectionEntirelyVisible(section))
            sectionElements.classList.add(animationClassName);
        if (isSectionEntirelyInvisible(section))
            sectionElements.classList.remove(animationClassName);
    });
});
