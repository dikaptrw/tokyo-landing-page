
// burger navigation mobile
const leftSection = $('.all-wr .left-section');

function toggleSidebar() {
    $('#burger path:first-child, #burger path:nth-child(2)').toggleClass('block').toggleClass('hidden');

    if ($('#burger path:first-child').hasClass('hidden')) {
        leftSection.addClass('opened');
    } else {
        leftSection.removeClass('opened');
    }
}
$(document).on('click', '#burger', toggleSidebar);


// navigation menu onclick
const linkArr = ['home', 'about', 'portfolio', 'news', 'contact'];
linkArr.forEach(function(link) {
    $(document).on('click', `a[href='#${link}'].nav__link`, function(e) {
        // check sidebar is opened
        if(leftSection.hasClass('opened')) {
            toggleSidebar()
        }

        // reset link active and set current 
        $('.nav__link').removeClass('active');
        $(`a[href='#${link}'].nav__link`).addClass('active');

        // reset section active and set current 
        $('.content__section').removeClass('active');
        $(`#${link}.content__section`).addClass('active');

        // scroll to top
        if ($(`#${link}.content__section`).scrollTop() != 0) {
            setTimeout(() => {
                $(`#${link}.content__section`).animate({ scrollTop: 0 }, "slow");
            }, 200);
        }
    });
});


// route trigger change
function contentChange() {
    const link = location.hash;
    const linkNotHash = location.hash.replace('#', '');
    
    if ($.inArray(linkNotHash, linkArr) !== -1) {
            // check sidebar is opened
            if(leftSection.hasClass('opened')) {
                toggleSidebar()
            }
        
            // reset link active and set current 
            $('.nav__link').removeClass('active');
            $(`a[href='${link}'].nav__link`).addClass('active');
        
            // reset section active and set current 
            $('.content__section').removeClass('active');
            $(`${link}.content__section`).addClass('active');
    }
}
$(window).on('hashchange', contentChange);
$(window).on('load', contentChange);


// about modal open and close
$(document).on('click', '#about .description .learn-more', function() {
    $('.modal__box.about').addClass('opened');
    setTimeout(() => {
        $('.modal__box.about .modal__box__inner .modal__content').animate({ scrollTop: 0 }, "slow");
    }, 100);
});
$(document).on('click', '.modal__box.about .modal__box__inner .modal__close__btn', function() {
    $('.modal__box.about').removeClass('opened');
});


// about swiper partnerts
new Swiper('.swiper-container', {
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 3,
        },
        1280: {
            slidesPerView: 3,
        }
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});


// news modal open and close
function modalNewsOpen(innerListEl) {
    // open modal
    $('.modal__box.news').addClass('opened');

    // get the contents
    const content = $(innerListEl).html();

    // replace to modal
    $('.modal__box.news .modal__box__inner .modal__content').html(content);
}
// open
$(document).on('click', '#news .list-inner .image-link', function() {
    modalNewsOpen($(this).parent());
});
$(document).on('click', '#news .list-inner .detail .read-more-btn a, #news .list-inner .detail .title a', function() {
    modalNewsOpen($(this).parent().parent().parent());
});
// close
$(document).on('click', '.modal__box.news .modal__box__inner .modal__close__btn', function() {
    $('.modal__box.news').removeClass('opened');
    setTimeout(() => {
        $('.modal__box.news .modal__box__inner .modal__content').html('');
    }, 500);
});



// filter isotop
$(document).on('click', '#portfolio .menu li > a[data-filter]', function(e) {
    e.preventDefault();

    let filter = $(this).data('filter');

    $('#portfolio .list-wr.portfolio ul').isotope({
        itemSelector: '.list-wr.portfolio ul li',
        layoutMode: 'fitRows',
    });

    $('#portfolio .menu li > a').removeClass('active');
    $(this).addClass('active');

    $('#portfolio .list-wr.portfolio ul').isotope({
        filter: `${filter}`
    });
});

// portfolio onhover show title
$(".list-wr.portfolio ul > li .list-inner .image-wr").on({
    mouseenter: function () {
        let title = $(this).data('title');
        let category = $(this).data('category');

        let html = `${title}<span>${category}</span>`

        $('.portfolio-title').html(html);
        $('.portfolio-title').addClass('visible');
    },
    mouseleave: function () {
        $('.portfolio-title').removeClass('visible');
    },
    mousemove: function (e) { 
        $('.portfolio-title').css({
            left: e.pageX,
            top: e.pageY + 30
        });
    }
});


// onclick portfolio list
function getYtId(url) {
    var regExp = /^(?:https?:\/\/)?(?:i\.|www\.|img\.)?(?:youtu\.be\/|youtube\.com\/|ytimg\.com\/)(?:embed\/|v\/|vi\/|vi_webp\/|watch\?v=|watch\?.+&v=)((\w|-){11})(?:\S+)?$/;
    var match = url.match(regExp);

    if (match && match.length == 3) {
        return match[1];
    } else {
        return 'error';
    }
}
function getVimeoId(url) {
    let regEx = /https?:\/\/(?:vimeo\.com\/|player\.vimeo\.com\/)(?:video\/|(?:channels\/staffpicks\/|channels\/)|)((\w|-){7,9})/;

    let match = url.match(regEx);

    if (match && match.length == 3) {
        return match[1];
    }
    else {
        return 'error';
    }
}
function getSoundCloudId(url) {
    let regEx = /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{8})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

    let match = url.match(regEx);

    if (match && match.length == 5) {
        return match[1];
    }
    else {
        return 'error';
    }
}
// event
$(document).on('click', '.list-wr.portfolio ul > li', function(e) {
    e.preventDefault();
    let link = $(this).find('.list-inner .image-wr > a').attr('href');
    
    if ($(this).hasClass('youtube')) {
        setContentYt(link);
    } else if ($(this).hasClass('vimeo')) {
        setContentVimeo(link);
    } else if ($(this).hasClass('soundcloud')) {
        setContentSoundCloud(link);
    } else if ($(this).hasClass('image')) {

    }

    // open modal content
    function openModalContent(content) {
        $('.modal__box__content .modal__box__inner .modal__content .iframe-scaler').html(content);
        $('.modal__box__content').addClass('opened');
        
        return false;
    }

    // youtube
    function setContentYt(link) {
        const id = getYtId(link);
        
        let content = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        openModalContent(content);
    }
    
    // vimeo
    function setContentVimeo(link) {
        const id = getVimeoId(link);
        
        let content = `<iframe src="https://player.vimeo.com/video/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>`;

        openModalContent(content);
    }

    // vimeo
    function setContentSoundCloud(link) {
        const id = getSoundCloudId(link);
        
        let content = `<iframe scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`;

        openModalContent(content);
    }
});

// global window on click
$(window).on('click', function(e) {
    if (!window.getSelection().toString()) {
        // close modal content when fade clicked
        if(e.target == $('.modal__box__content.opened .modal__box__inner')[0]) {
            $('.modal__box__content.opened').removeClass('opened');
            setTimeout(() => {
                $('.modal__box__content .modal__box__inner .modal__content .iframe-scaler').html('');
            }, 500);
        }
    }
});
$(document).on('click', '.modal__box__content .modal__box__inner .modal__content .modal__close__btn', function() {
    $('.modal__box__content.opened').removeClass('opened');
    setTimeout(() => {
        $('.modal__box__content .modal__box__inner .modal__content .iframe-scaler').html('');
    }, 500);
});



// Open Lightbox
$(document).on('click', '.open-lightbox', function(e) {
    e.preventDefault();
    
    let image = $(this).attr('href');
    let desc = '';

    if ($(this).data('description')) {
        desc = $(this).data('description')
    }

    $('html').addClass('no-scroll');
    $('body .all-wr').prepend(`<div class="lightbox-wrapper">
        <div class="lightbox-content">
            <img src="${image}">
        </div>
        <button class="lightbox-close-btn focus:outline-none" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        <div class="lightbox-description">
            <span>${desc}</span>
        </div>
    </div>`);
    setTimeout(() => {
        $('.lightbox-wrapper').addClass('opened');
    }, 0);
});

// Close Lightbox
$(window).on('click', function(e) {
    if (!window.getSelection().toString()) {
        if (e.target == $('.lightbox-wrapper')[0] || e.target == $('.lightbox-content')[0] || e.target == $('.lightbox-description')[0]) {
            $('.lightbox-wrapper.opened').removeClass('opened');
            
            setTimeout(() => {
                $('.lightbox-wrapper').remove();
            }, 500);
        }
    }
})
$(document).on('click', '.lightbox-close-btn', function() {
    $('.lightbox-wrapper').removeClass('opened');
    
    setTimeout(() => {
        $('.lightbox-wrapper').remove();
    }, 500);
});


// mouse cursor
$(document).on({
    mousemove: function (e) {
        $('.mouse-cursor').css({
            left: e.pageX,
            top: e.pageY
        });
    }
});
$(document).on({
    mouseenter: function () {
        $('.mouse-cursor').addClass('mouse-hover');
    },
    mouseleave: function () {
        $('.mouse-cursor').removeClass('mouse-hover');
    }
}, "body a, body button");
$(document).on({
    click: function () {
        $('.mouse-cursor').removeClass('mouse-hover');
    }
}, ".lightbox-wrapper .lightbox-close-btn");




// CLOSE ALL MODAL ON ESC
// close comment unapp using escape
$(document).keyup(function(e) {
    if (e.key === "Escape" || e.keyCode == 27) { // escape key maps to keycode `27`
        if ($('.modal__box.opened').length > 0) {
            $('.modal__box.about.opened').removeClass('opened');
            $('.modal__box.news.opened').removeClass('opened');
            setTimeout(() => {
                $('.modal__box.news .modal__box__inner .modal__content').html('');
            }, 500);
        }
        if ($('.modal__box__content').length > 0) {
            $('.modal__box__content.opened').removeClass('opened');
            setTimeout(() => {
                $('.modal__box__content .modal__box__inner .modal__content .iframe-scaler').html('');
            }, 500);
        }
        if ($('.lightbox-wrapper.opened').length > 0) {
            $('.lightbox-wrapper.opened').removeClass('opened');
            
            setTimeout(() => {
                $('.lightbox-wrapper').remove();
            }, 500);
        }
    }
});


// settings toggle show
$(document).on('click', '.settings-wr .icon .settings-btn', function(e) {
    e.preventDefault();
    $('.settings-wr').toggleClass('opened');
});

// settings color
$(document).on('click', '.settings-wr .settings-content .colors li a', function(e) {
    e.preventDefault();

    $('.all-wr').data('color', this.className);
    $('.all-wr').attr('data-color', this.className);
});

// settings cursor
$(document).on('click', '.settings-wr .settings-content .cursor li a', function(e) {
    e.preventDefault();

    $('.settings-content .cursor li a.magic-cursor-btn, .settings-content .cursor li a.def-cursor-btn').toggleClass('active');

    let toggleCursor = $('.all-wr').data('magic-cursor') == 'hide' ? 'show' : 'hide';
    $('.all-wr').data('magic-cursor', toggleCursor);
    $('.all-wr').attr('data-magic-cursor', toggleCursor);
});


