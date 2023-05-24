$(document).ready(function(){

    setTimeout(function(){
        textEffect();
    }, 800);

    // leftmenu
    $(document).on("click", "#btnMenuOpen", function () {
        $("#btnMenuOpen").addClass("open");
        $("#leftmenu").fadeIn("400").addClass("active");
        return false;
    }).on("click", "#btnMenuclose", function () {
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
    $("#reservationService").click(function() {
        checkTerms();
    });
    $("#reservationPrivacy").click(function() {
        checkTerms();
    });
    $("#reservationNews").click(function() {
        checkTerms();
    });
    function allTerms() {
        if ($("#reservationCheckAll").is(":checked")) {
            $("#reservationService").prop("checked",true);
            $("#reservationPrivacy").prop("checked",true);
            $("#reservationNews").prop("checked",true);
        } else {
            $("#reservationService").prop("checked",false);
            $("#reservationPrivacy").prop("checked",false);
            $("#reservationNews").prop("checked",false);
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

    function bgChange() {
        $(".updateThumbSlide").each(function () {
            let current = $(this).find(".slick-current"),
                img = current.find("img"),
                video = current.find("video"),
                imgSrc = img.attr("src"),
                videoSrc = video.attr("src");

            $(".BgSlideImg").children("p").empty();

            if($(current).find(".Thumb").children().is("img")){
                $(".BgSlideImg").children("p").append("<img src='"+ imgSrc +"' alt=''>");
            } else if($(current).find(".Thumb").children().is("video")){
                $(".BgSlideImg").children("p").append("<video preload='true' muted='' loop='' playsinline='' autoplay src='"+ videoSrc +"'></video>");
                video[0].load();
                video[0].play();
            }
        });
    }

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
        arrows: false,
        //focusOnSelect: true
    });
    
});