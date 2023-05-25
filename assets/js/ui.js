$(document).ready(function(){

    setTimeout(function(){
        textEffect();
    }, 800);
    // leftmenu
    $("#btnMenuOpen").click(function(){     
        $("#btnMenuOpen").addClass("open");
        $("#leftmenu").fadeIn("400").addClass("active");
        return false;
    });
    $("#btnMenuclose").click(function(){  
        $("#btnMenuOpen").removeClass("open");
        $("#leftmenu").removeClass("active");
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
            infinite: false,
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
            infinite: false,
            pauseOnHover: false,
            arrows: false
        });
    }

    // 업데이트 내용 진입시 .start 추가
    var isVisible = false;

    $(window).on("scroll",function() {
        if (checkVisible($(".updateSection"))&&!isVisible) {
            $(".updateSection").addClass("start");
            $(".updateThumbSlide, .updateTextSlide").slick("slickPlay");
            isVisible = true;
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