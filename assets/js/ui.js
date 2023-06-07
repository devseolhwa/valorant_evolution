$(document).ready(function(){

    setTimeout(function(){
        textEffect();
    }, 800);

    // leftmenu
    $("#btnMenuOpen").click(function(){     
        $("#btnMenuOpen").addClass("open");
        $("#leftmenu").fadeIn("400").addClass("active");
        $("body").addClass("menuOpened");
        return false;
    });
    $("#btnMenuclose").click(function(){  
        $("#btnMenuOpen").removeClass("open");
        $("#leftmenu").removeClass("active");
        $("body").removeClass("menuOpened");
        return false;
    });

    // target
    $("#btnReservation").click(function(e){            
        e.preventDefault();
        $("html, body").animate({scrollTop:$(this.hash).offset().top}, 500);
    });

    function textEffect(){
        $(".textEffect").each(function(){
            let $this = $(this);
            let start_pos = "top bottom";
            let end_pos = "bottom top";

            ScrollTrigger.create({
                trigger: $this,
                start: start_pos,
                end: end_pos,
                onEnter: function(){
                    $this.addClass("active");
                },onLeave: function(){
                    $this.removeClass("active");
                },onEnterBack: function(){
                    $this.addClass("active");
                },onLeaveBack: function(){
                    $this.removeClass("active");
                }
            });
        });
    }

    gsap.registerPlugin(ScrambleTextPlugin);
    var $textElement = $(".scrambleText"),
        $textEpisode = $("#textEpisode");
        $textDday = $("#textDday");

    let textTimeL01 = gsap.timeline({ 
        defaults: {duration: 2, ease: "power1.inOut", yoyo: false,}
    });
    let textTimeL02 = gsap.timeline({ 
        defaults: {duration: 2, ease: "power1.inOut", yoyo: false,}
    });

    textTimeL01.to($textEpisode, {scrambleText:{text:"EPISODE_07", chars:"EPISODE_07"}});
    textTimeL02.to($textDday, {scrambleText:{text:"2023. 06. 28", chars:"123456789"}});

    ScrollTrigger.create({
        trigger: $textElement,
        start: "top bottom",
        onEnter: function(){
            textTimeL01.play();
            textTimeL02.play();
        },onLeave: function(){
            textTimeL01.pause();
            textTimeL02.pause();
        },onEnterBack: function(){
            textTimeL01.play();
            textTimeL02.play();
        },onLeaveBack: function(){
            textTimeL01.pause();
            textTimeL02.pause();
        }
    });

    // text scroll
    document.querySelectorAll(".scrollLeft").forEach(function(item){
        let $scrollLeftItem = item;

        gsap.to($scrollLeftItem, {
            scrollTrigger: {
                trigger: $scrollLeftItem,
                end: "bottom top",
                scrub: 0.6
            },
            xPercent: -30,
            duration: 5,
            ease: "linear"
        });
    });
    document.querySelectorAll(".scrolltop").forEach(function(item){
        let $scrolltopItem = item;

        gsap.to($scrolltopItem, {
            scrollTrigger: {
                trigger: $scrolltopItem,
                end: "bottom top",
                scrub: 0.6
            },
            yPercent: -50,
            duration: 5,
            ease: "linear"
        });
    });

    // checkboxList
    $("#reservationCheckAll").click(function() {
        allTerms();
    });
    $("#reservationService, #reservationPrivacy, #reservationNews").click(function() {
        checkTerms();
    });
    function allTerms() {
        if ($("#reservationCheckAll").is(":checked")) {
            $("#reservationService, #reservationPrivacy, #reservationNews").prop("checked",true);
        } else {
            $("#reservationService, #reservationPrivacy, #reservationNews").prop("checked",false);
        }
        return true;
    }
    function checkTerms() {
        if(!$("#reservationService").is(":checked") || !$("#reservationPrivacy").is(":checked") || !$("#reservationNews").is(":checked")) {
            $("#reservationCheckAll").prop("checked",false);
        }
        if($("#reservationService").is(":checked") && $("#reservationPrivacy").is(":checked") && $("#reservationNews").is(":checked")) {
            $("#reservationCheckAll").prop("checked",true);
        }
        return true;
    }

    // 모바일 상품카드
    let productSlideCheck = $(".productSlide");
    if (productSlideCheck.length) {
        $(".productSlideM").slick({
            slidesToShow : 3,
            slidesToScroll: 1,
            //autoplay: false,
            autoplaySpeed: 1300,
            speed: 700,
            centerMode: true,
            centerPadding : "0", 
            variableWidth: true,
            infinite: true,
            pauseOnHover: false,
            swipeToSlide: 1,
            draggable: true,
            arrows: false,
            dots: true,
        }).on("afterChange", function (event, slick, currentSlide) {
            let total = slick.slideCount;
            $(".productSlideMControl .number span").text(total < 10 ? "0" + total : total);
        }).on("beforeChange", function(event, slick, currentSlide, nextSlide){
            let i = (nextSlide ? nextSlide : 0) + 1;
            $(".productSlideMControl .number p").text(i < 10 ? "0" + i : i);  
        });

        $(this).off("click", "#btnRemove").on("click", "#btnRemove", function(e) {
            e.preventDefault();
            $(".productSlideM").slick("slickRemove", 0);
            $(".productSlideM").slick("slickPlay");
        });
    }

    // updateSection bg changes
    function bgChange() {
        $(".updateThumbSlide").each(function () {
            let current = $(this).find(".slick-current"),
                img = current.find("img"),
                video = current.find("video"),
                imgSrc = img.attr("src"),
                videoSrc = video.attr("src");

            $(".BgSlideImg").children("p").empty();

            if($(current).find(".Thumb").children().is("img")){
                // 슬라이드가 이미지일때
                $(".BgSlideImg").children("p").append("<img src='"+ imgSrc +"' alt=''>");
            } else if($(current).find(".Thumb").children().is("video")){
                // 슬라이드가 영상일때
                $(".BgSlideImg").children("p").append("<video preload='true' muted='' loop='' playsinline='' autoplay src='"+ videoSrc +"'></video>");
                video[0].load();
                video[0].play();
            }
        });
    }

    // updateSection slide
    let updateSectionCheck = $(".updateSection");
    if (updateSectionCheck.length) {
        $(".updateThumbSlide").on("init", function (event, slick) {
            bgChange();
            $(".updateArrow .prev").addClass("slick-disabled");
        });
        $(".updateThumbSlide").slick({
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            speed: 700,
            dots: false,
            infinite: true,
            pauseOnHover: false,
            draggable: true,
            arrows: true,
            prevArrow: $(".updateArrow .prev"),
            nextArrow: $(".updateArrow .next"),
            asNavFor: ".updateTextSlide",
        }).on("afterChange", function (event, slick, currentSlide) {
            bgChange();
            if (currentSlide === 0) {
                $(".updateArrow .prev").addClass("slick-disabled");
                $(".updateArrow .next").removeClass("slick-disabled");
            } else {
                $(".updateArrow .prev").removeClass("slick-disabled");
            }
            if (slick.slideCount === currentSlide + 1) {
                $(".updateArrow .next").addClass("slick-disabled");
            } else {
                $(".updateArrow .next").removeClass("slick-disabled");
            }
        });
        $(".updateTextSlide").slick({
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            asNavFor: ".updateThumbSlide",
            adaptiveHeight: true,
            dots: false,
            infinite: true,
            pauseOnHover: false,
            arrows: false
        });
    }

    // 진입시 .start 추가
    var isVisible = false;

    $(window).on("scroll",function() {
        if (checkVisible($(".updateThumbSlide"))&&!isVisible){
            $(".updateSection").addClass("start");
            $(".updateThumbSlide, .updateTextSlide").slick("slickPlay");
            isVisible = true;
            return true;
        }
    });
    function checkVisible( elm, eval ) {
        eval = eval || "object visible";
        var viewportHeight = $(window).height(),
            wscrolltop = $(window).scrollTop(),
            y = $(elm).offset().top,
            elementHeight = $(elm).height();   
        
        if (eval == "object visible") return ((y < (viewportHeight + wscrolltop)) && (y > (wscrolltop - elementHeight)));
        if (eval == "above") return ((y < (viewportHeight + wscrolltop)));
    }

    var isVisible2 = false;

    $(window).on("scroll",function() {
        if (checkVisible2($(".productSlide"))&&!isVisible2){
            $(".productSection").addClass("start");
            cardSlide.start(); // pc용 카드슬라이드 시작
            setTimeout(function(){
                $("#btnRemove").trigger("click");
            }, 1300);
            isVisible2 = true;
            return true;
        }
    });
    function checkVisible2( elm_, eval_ ) {
        eval_ = eval_ || "object visible";
        var viewportHeight_ = $(window).height(),
            wscrolltop_ = $(window).scrollTop(),
            y_ = $(elm_).offset().top,
            elementHeight_ = $(elm_).height();   
        
        if (eval_ == "object visible") return ((y_ < (viewportHeight_ + wscrolltop_)) && (y_ > (wscrolltop_ - elementHeight_)));
        if (eval_ == "above") return ((y_ < (viewportHeight_ + wscrolltop_)));
    }
});
function urlCopy() {
    // url 복사
    const inputUrl = document.getElementById("inputUrl");
    inputUrl.select();
    document.execCommand("copy");

    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
function codeCopy() {
    // 친구 초대 코드 복사
    const inputCode = document.getElementById("inputCode");
    inputCode.select();
    document.execCommand("copy");

    alert("초대코드가 복사 되었습니다.");
}

// ios 사파리 height
const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
};
window.addEventListener('resize', setVh);
setVh();

$(document).ready(function() {

    cardSlide.init('.flip-card-container');

    $(this).off('click', '#btnPrev').on('click', '#btnPrev', function(e) {
        e.preventDefault();

        cardSlide.prevClick();
    });

    $(this).off('click', '#btnNext').on('click', '#btnNext', function(e) {
        e.preventDefault();

        cardSlide.nextClick();
    });

    //cardSlide.start();
});

let cardSlide = {
    _is_start : false,
    _container : "",
    _items : "",
    _current_index : 0,
    _limit_index : 0,
    _interval_id : null,
    init : function(container) {
        this._container = $(container);
        this._items = this._container.find('li');
        this._current_index = 1;
        this._limit_index = this._items.length - 1;
        this._items.each(function(index, item) {
            switch (index) {
                case 0 : $(item).css({'transform':'translate3d(0%, 0px, 0px)', 'z-index':(index * -1), 'opacity':'1'}); break;
                case 1 : $(item).css({'transform':'translate3d(18%, 0px, 0px)', 'z-index':(index * -1), 'opacity':'1'}); break;
                case 2 : $(item).css({'transform':'translate3d(29%, 0px, 0px)', 'z-index':(index * -1), 'opacity':'1'}); break;
                case 3 : $(item).css({'transform':'translate3d(37%, 0px, 0px)', 'z-index':(index * -1), 'opacity':'1'}); break;
                case 4 : $(item).css({'transform':'translate3d(43%, 0px, 0px)', 'z-index':(index * -1), 'opacity':'1'}); break;
                default : $(item).css({'transform':'translate3d(50%, 0px, 0px)', 'z-index':(index * -1), 'opacity':'0'}); break;
            }
        });

        this.showCount();
    },
    showCount : function() {
        var _cur_idx = ( this._current_index < 10 ) ? "0" + this._current_index : this._current_index;
        var _limit_idx = ( this._limit_index < 10 ) ? "0" + this._limit_index : this._limit_index;

        $('#currntCardNumber').html(_cur_idx);
        $('#maxCardNumber').html(_limit_idx);
    },
    next : function() {
        var tmp = this._items.length - 1;

        if ( this._is_start ) {
            var _current_li = $(this._container).find('li:first-child');
            _current_li.next('li').css({'transform':'translate3d(0%, 0px, 0px)', 'z-index':'0', 'opacity':'1'}).addClass('on');
            _current_li.next('li').next('li').css({'transform':'translate3d(18%, 0px, 0px)', 'z-index':'-1', 'opacity':'1'});
            _current_li.next('li').next('li').next('li').css({'transform':'translate3d(29%, 0px, 0px)', 'z-index':'-2', 'opacity':'1'});
            _current_li.next('li').next('li').next('li').next('li').css({'transform':'translate3d(37%, 0px, 0px)', 'z-index':'-3', 'opacity':'1'});
            _current_li.next('li').next('li').next('li').next('li').next('li').css({'transform':'translate3d(43%, 0px, 0px)', 'z-index':'-4', 'opacity':'1'});
            var _tmp_li = _current_li.css({'transform':'translate3d(50%, 0px, 0px)', 'z-index':(tmp * -1), 'opacity':'0'}).removeClass('on');
            _current_li.remove();
            _tmp_li.appendTo(this._container);

            if ( this._current_index == this._limit_index ) {
                this._current_index = 1;
            } else {
                this._current_index++;
            }

            this.showCount();
        } else {
            var _current_li = $(this._container).find('li:first-child');
            _current_li.next('li').css({'transform':'translate3d(0%, 0px, 0px)', 'z-index':'0', 'opacity':'1'}).addClass('on');
            _current_li.next('li').next('li').css({'transform':'translate3d(18%, 0px, 0px)', 'z-index':'-1', 'opacity':'1'});
            _current_li.next('li').next('li').next('li').css({'transform':'translate3d(29%, 0px, 0px)', 'z-index':'-2', 'opacity':'1'});
            _current_li.next('li').next('li').next('li').next('li').css({'transform':'translate3d(37%, 0px, 0px)', 'z-index':'-3', 'opacity':'1'});
            _current_li.next('li').next('li').next('li').next('li').next('li').css({'transform':'translate3d(43%, 0px, 0px)', 'z-index':'-4', 'opacity':'1'});
            _current_li.css({'transform':'translate3d(50%, 0px, 0px)', 'z-index':(tmp * -1), 'opacity':'0'}).remove();

            this._items = this._container.find('li');
            this._is_start = true;
        }
    },
    nextClick : function() {
        clearInterval(this._interval_id);
        this.next();
        this.play();
    },
    prev : function() {
        var tmp = this._items.length - 1;

        if ( this._is_start ) {
            var _last_li = $(this._container).find('li:last-child');
            var _tmp_li = _last_li.css({'transform':'translate3d(0%, 0px, 0px)', 'z-index':'0', 'opacity':'1'}).addClass('on');
            _tmp_li.remove();
            _tmp_li.prependTo(this._container);

            _tmp_li.next('li').css({'transform':'translate3d(18%, 0px, 0px)', 'z-index':'-1', 'opacity':'1'}).removeClass('on');
            _tmp_li.next('li').next('li').css({'transform':'translate3d(29%, 0px, 0px)', 'z-index':'-2', 'opacity':'1'});
            _tmp_li.next('li').next('li').next('li').css({'transform':'translate3d(37%, 0px, 0px)', 'z-index':'-3', 'opacity':'1'});
            _tmp_li.next('li').next('li').next('li').next('li').css({'transform':'translate3d(43%, 0px, 0px)', 'z-index':'-4', 'opacity':'1'});
            _tmp_li.next('li').next('li').next('li').next('li').next('li').css({'transform':'translate3d(50%, 0px, 0px)', 'z-index':'-5', 'opacity':'0'});
        } else {

            var _current_li = $(this._container).find('li:first-child');
            _current_li.css({'transform':'translate3d(50%, 0px, 0px)', 'z-index':(tmp * -1), 'opacity':'0'}).remove();

            var _last_li = $(this._container).find('li:last-child');
            var _tmp_li = _last_li.css({'transform':'translate3d(0%, 0px, 0px)', 'z-index':'0', 'opacity':'1'}).addClass('on');
            _tmp_li.remove();
            _tmp_li.prependTo(this._container);

            _tmp_li.next('li').css({'transform':'translate3d(18%, 0px, 0px)', 'z-index':'-1', 'opacity':'1'}).removeClass('on');
            _tmp_li.next('li').next('li').css({'transform':'translate3d(29%, 0px, 0px)', 'z-index':'-2', 'opacity':'1'});
            _tmp_li.next('li').next('li').next('li').css({'transform':'translate3d(37%, 0px, 0px)', 'z-index':'-3', 'opacity':'1'});
            _tmp_li.next('li').next('li').next('li').next('li').css({'transform':'translate3d(43%, 0px, 0px)', 'z-index':'-4', 'opacity':'1'});
            _tmp_li.next('li').next('li').next('li').next('li').next('li').css({'transform':'translate3d(50%, 0px, 0px)', 'z-index':'-5', 'opacity':'0'});

            this._items = this._container.find('li');
            this._is_start = true;
        }

        if ( this._current_index == 1 ) {
            this._current_index = this._limit_index;
        } else {
            this._current_index--;
        }
        this.showCount();
    },
    prevClick : function() {
        clearInterval(this._interval_id);
        this.prev();
        this.play();
    },
    start : function() {
        setTimeout(function() {
            cardSlide.play();
        }, 1300);
    },
    play : function() {
        clearInterval(this._interval_id);

        this._interval_id = setInterval(function() {
            cardSlide.next();
        }, 1300);
    }
};