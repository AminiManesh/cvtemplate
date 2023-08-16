$(document).on("load", function () {
    $(window).bind("resize", SetupCarousel);
    ResizeImageModal();
});

$(document).ready(async function () {
    ResizeImageModal();
    var speechs =
        [
            "من برنامه نویس سی‌شارپ هستم.",
            "من Fullstack Developer هستم.",
            "من سایتی که می‌خوای رو به بهترین شکل پیاده سازی می‌کنم."
        ];

    typer(speechs);
    $('*').persiaNumber();
    $('#copyright').text(new Date().getFullYear());

    $('#open-menu').click(function (e) {
        ToggleMainMenu();
    });

    $('.open-sidebar').click(function (e) {
        $('.sidebar').toggleClass('opened');
    });

    $('.dark-overlay').click(function (e) {
        if ($('.main-menu').hasClass('opened')) {
            CloseMainMenu();
        }
    });

    if (window.matchMedia("(hover: none)")) {
        $('.work-body').css("bottom", function (param) {
            return -$(this).outerHeight() + "px";
        });
    }

    $('.skill-bar div').css("width", function () {
        return $(this).parent().attr("aria-valuenow") + "%";
    });

    $('#navigation a').click(function (e) {
        CloseMainMenu();
    });

    $('.open-image').click(function (e) {
        var imgSource = $(this).children('img').attr('src');
        var imgAlt = $(this).children('img').attr('alt');
        $('.image-modal-container').find('img').attr("src", imgSource);
        $('.image-modal-container').find('img').attr("alt", imgAlt);
        $('.image-modal-container').toggleClass("opened");
        ResizeImageModal();
    });

    $('.image-modal-background').click(function (e) {
        $('.image-modal-container').removeClass("opened");
    });

    $('.image-modal-close').click(function (e) {
        $('.image-modal-container').removeClass("opened");
    });

    $('.send-message .input-box .inputter').on(
        {
            focus: function () {
                $(this).prev()
                    .css({
                        "background": "#ffc107",
                        "color": "#000000"
                    })
            },
            focusout: function () {
                $(this).prev()
                    .css({
                        "background": "#20202a",
                        "color": "#8c8c8e"
                    })
            }
        }
    );

    $('.owl-carousel').owlCarousel({
        items: 2,
        margin: 30,
        center: false,
        slideTransition: "ease",
        nav: true,
        dots: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });
    SetupCarousel();

    $(window).resize(function (event) {
        event.preventDefault();
        SetupCarousel();
    });

    // Functions

    function ResizeImageModal(params) {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var imgWidth = $('.image-modal-box').width();
        var imgHeight = $('.image-modal-box').height();

        var newImgWidth = (imgWidth * windowHeight) / imgHeight;

        if (newImgWidth > (windowWidth * 6) / 10) {
            $('.image-modal-box').width(newImgWidth - (windowWidth / 3));
        }
        if (newImgWidth < (windowWidth * 6) / 10) {
            $('.image-modal-box').width(newImgWidth - 50);
        }
    }

    function SetupCarousel() {
        $('.owl-dot').html("");

        var rightIcon = document.createElement("i");
        $(rightIcon).addClass("bi bi-chevron-right");
        $('.owl-nav > .owl-next').html(rightIcon);

        var leftIcon = document.createElement("i");
        $(leftIcon).addClass("bi bi-chevron-left");
        $('.owl-nav > .owl-prev').html(leftIcon);
    }

    function ToggleMainMenu() {
        $('.main-menu').toggleClass('opened');
        if ($('.main-menu').hasClass('opened')) {
            $('.dark-overlay').fadeIn(300);
        }
        else {
            $('.dark-overlay').fadeOut(300);
        }
    }

    function CloseMainMenu() {
        $('.main-menu').removeClass('opened');
        $('.dark-overlay').fadeOut(300);
    }

    async function typer(speechs) {
        for (let i = 0; i < speechs.length; i++) {
            await writeCode(speechs[i]);
            await delay(1500);
            await clearCode(speechs[i]);
        }
        typer(speechs);
    }

    async function writeCode(text) {
        var now = "";
        for (let j = 0; j < text.length; j++) {
            await delay(100);
            now += text[j];
            $('.code>.speech').text(now);
        }
    }

    async function clearCode(text) {
        var now = text;
        for (let i = text.length; i > -1; i--) {
            await delay(40);
            now = text.substring(0, i);
            $('.code>.speech').text(now);
            if (i == 0) {
                await delay(750);
            }
        }
    }

    function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
});