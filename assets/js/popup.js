// modarPopup
$(function () {
	$(".modarPopup.show").each(function () {
		modarOpen($(this));
	});
});

var modarOpener = null;
$(document).on("click", ".jsModarClose , .btnCloseModar, .CloseModar", function(e) {
    var target = $(this).closest(".modarPopup").attr("id");
    modarClose("#" + target, modarOpener);
    $("body").removeClass("popupOpened");
});

function modarOpen(_target) {
    $(_target).fadeIn("fast").addClass("show");
    $(_target).attr("tabindex", "0").focus();
    bodyScroll(true, $("body").width());
    $("body").addClass("popupOpened");
}

function modarClose(_target, _opener) {
    bodyScroll(false);
    var tg = null;

    if (_opener) {
        tg = $(_target);
        modarOpener = $(_opener);
    } else {
        //tg = $(".modarPopup.show");
        tg = $(_target);
        modarOpener = null;
    }

    $(tg).fadeOut("fast").removeClass("show");
    if (modarOpener !== null) {
        modarOpener.focus();
        modarOpener = null;
    }
}

function bodyScroll(_status, _orgWidth) {
    var $fixedObj = $("body");
    if (_status) {
        $("body").addClass("modarOpened");
        if ($("html").get(0).scrollWidth > $("html").width() === false) {
            $fixedObj.css("margin-right", $("body").width() - _orgWidth);
        }
    } else {
        $fixedObj.css("margin-right", "");
        $("body").removeClass("modarOpened");
    }
}