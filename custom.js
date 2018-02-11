function getElementsByClassName(className, tag) {
	var ret = [];
	if (document.getElementsByClassName) {
		var els = document.getElementsByClassName(className);
		var nodere = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null;
		for(var i=0; i < els.length; i++) {
			if(nodere.test(els[i].nodeName)) {
				ret[ret.length] = els[i];
			}
		}
	} else {

		var els = document.getElementsByTagName(tag);
		for(var i=0; i < els.length; i++) {
			if(els[i].className == className)
				ret[ret.length] = els[i];
		}
	}
	return ret;
}
function showNav() {
	var els = getElementsByClassName("topnav", "a");
	for(var i=0; i < els.length; i++) {
		els[i].style.display = "block";
	}
}
function hideNav() {
	var els = getElementsByClassName("topnav", "a");
	for(var i=0; i < els.length; i++) {
		els[i].style.display = "none";
	}
}
function loaded() {
	if(window.location.hash.length > 0 && window.location.hash != "#top" && window.location.hash != "top")
		showNav();
	else
		hideNav();
}

$(document).ready(function(){

	//Accessibility helper
    $('.noscript').removeClass('noscript');

    //Show menu when focused
    $('.accessible li a').focus(function() {$('.accessible').addClass('noscript');});
    $('.accessible li a').blur(function() {$('.accessible').removeClass('noscript');});

    //To Top
    $('a#totop').hide();
    $(window).scroll(function() {
        if($(this).scrollTop() > 150) {
            $('a#totop').fadeIn();
        } else {
            $('a#totop').fadeOut();
        }
    });

	//data-toggle support - use to toggle elements with button/a tag
	$("[data-toggle]").click(function() {
		var target = $(this).attr("data-toggle");
		$(target).slideToggle("fast");
        flipAria(this,target);
	});

    var querywidth = 999 - (window.innerWidth - $('body').width());
	var querywidth2 = 699 - (window.innerWidth - $('body').width());
    function checkWidth(){
        if ($(window).width() <= querywidth) {
            $("#navigation").hide();
        } else {
            $("#navigation").show();
        }
		if ($(window).width() <= querywidth2) {
			$('#sidebar').hide();
            bubblewidth = '100%';
        } else {
            $('#sidebar').show();
            bubblewidth = '450';
        }
    }

	//Sidebar header navigation toggle
    $("a#sidebar-nav-mobile").click(function() {
    	if($(window).width() <= querywidth) {
    		$("#sidebar").toggleClass("open").slideToggle("fast");
    	}
    });

    //Execute on load
    checkWidth();

    //Bind
    var width = $(window).width();
    $(window).resize(function() {
        if($(window).width() != width) {
            checkWidth();
        }
    });

    window.addEventListener("orientationchange", function() {
        checkWidth();
    }, false);


	//dropdown navigation
	if ($(window).width() > querywidth) {
		$("#navigation li.isparent > a").mouseenter(
			function() {
				setHdrToggle(this);
			}
		);
		$("#navigation li.isparent > a").mouseleave(
			function(e) {
				if(!$(e.toElement).hasClass('sub')) {
					unsetHdrToggle(this);
				}
			}
		);
		$("#navigation ul.sub").mouseleave(
			function(e) {
				if(!$(e.toElement).hasClass('current')) {
					unsetHdrToggle($("a.current"));
				}
			}
		);
	}

	$("a.submenu-trigger").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("clicked");
		var elem = $(this).prev();
		if($(this).hasClass("clicked")) {
			setHdrToggle(elem);
		} else {
			unsetHdrToggle(elem);
		}
	});
	$("#navigation ul.sub li:last-child > a").focusout(function() {
		unsetHdrToggle($("a.current"));
	})


});

function flipAria(elem,target,state) {
    if(state === undefined) {
        var state = $(elem).attr('aria-expanded') === 'false' ? true : false;
    }
    $(elem).attr('aria-expanded', state);
    $(target).attr('aria-hidden', !state);
}

function setHdrToggle(e) {
	$("#header,#navigation").addClass("navopen");
	$(e).addClass("current");
}
function unsetHdrToggle(e) {
	$("#header,#navigation").removeClass("navopen");
	$(e).removeClass("current");
}

function toggleSearch() {
	$("#header").toggleClass("search-open");
	if($("#header").hasClass("search-open")) {
		$("#search input[type=text]").focus();
		$("#mobile-btns button#search-btn i").removeClass("fa-search").addClass("fa-times");
	} else {
		$("#mobile-btns button#search-btn i").removeClass("fa-times").addClass("fa-search");
	}

}

function toggleNav() {
	$("#navigation").toggleClass("open").slideToggle();

	if($("#navigation").hasClass("open")) {
		$("#mobile-btns button#hamburger i").removeClass("fa-bars").addClass("fa-times");
	} else {
		$("#mobile-btns button#hamburger i").removeClass("fa-times").addClass("fa-bars");
	}
}