/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ (() => {

// burger navigation mobile
var leftSection = $(".all-wr .left-section");
function toggleSidebar() {
  // $("#burger path:first-child, #burger path:nth-child(2)")
  //   .toggleClass("block")
  //   .toggleClass("hidden");

  if (!leftSection.hasClass("opened")) {
    leftSection.addClass("opened");
  } else {
    leftSection.removeClass("opened");
  }
}
$(document).on("click", "#burger, #closeSidebarBtn", toggleSidebar);

// navigation menu onclick
var linkArr = ["home", "about", "portfolio", "news", "contact"];
linkArr.forEach(function (link) {
  $(document).on("click", "a[href='#".concat(link, "'].nav__link"), function (e) {
    // check sidebar is opened
    if (leftSection.hasClass("opened")) {
      toggleSidebar();
    }

    // reset link active and set current
    $(".nav__link").removeClass("active");
    $("a[href='#".concat(link, "'].nav__link")).addClass("active");

    // reset section active and set current
    $(".content__section").removeClass("active");
    $("#".concat(link, ".content__section")).addClass("active");

    // scroll to top
    if ($("#".concat(link, ".content__section")).scrollTop() != 0) {
      setTimeout(function () {
        $("#".concat(link, ".content__section")).animate({
          scrollTop: 0
        }, "slow");
      }, 200);
    }
  });
});

// route trigger change
function contentChange() {
  var link = location.hash;
  var linkNotHash = location.hash.replace("#", "");
  if ($.inArray(linkNotHash, linkArr) !== -1) {
    // check sidebar is opened
    if (leftSection.hasClass("opened")) {
      toggleSidebar();
    }

    // reset link active and set current
    $(".nav__link").removeClass("active");
    $("a[href='".concat(link, "'].nav__link")).addClass("active");

    // reset section active and set current
    $(".content__section").removeClass("active");
    $("".concat(link, ".content__section")).addClass("active");
  }
}
$(window).on("hashchange", contentChange);
$(window).on("load", contentChange);

// about modal open and close
$(document).on("click", "#about .description .learn-more", function () {
  $(".modal__box.about").addClass("opened");
  setTimeout(function () {
    $(".modal__box.about .modal__box__inner .modal__content").animate({
      scrollTop: 0
    }, "slow");
  }, 100);
});
$(document).on("click", ".modal__box.about .modal__box__inner .modal__close__btn", function () {
  $(".modal__box.about").removeClass("opened");
});

// about swiper partners
new Swiper(".swiper-container", {
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 3
    }
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  }
});

// news modal open and close
function modalNewsOpen(innerListEl) {
  // open modal
  $(".modal__box.news").addClass("opened");

  // get the contents
  var content = $(innerListEl).html();

  // replace to modal
  $(".modal__box.news .modal__box__inner .modal__content").html(content);
}
// open
$(document).on("click", "#news .list-inner .image-link", function () {
  modalNewsOpen($(this).parent());
});
$(document).on("click", "#news .list-inner .detail .read-more-btn a, #news .list-inner .detail .title a", function () {
  modalNewsOpen($(this).parent().parent().parent());
});
// close
$(document).on("click", ".modal__box.news .modal__box__inner .modal__close__btn", function () {
  $(".modal__box.news").removeClass("opened");
  setTimeout(function () {
    $(".modal__box.news .modal__box__inner .modal__content").html("");
  }, 500);
});

// filter isotop
$(document).on("click", "#portfolio .menu li > a[data-filter]", function (e) {
  e.preventDefault();
  var filter = $(this).data("filter");
  $("#portfolio .list-wr.portfolio ul").isotope({
    itemSelector: ".list-wr.portfolio ul li",
    layoutMode: "fitRows"
  });
  $("#portfolio .menu li > a").removeClass("active");
  $(this).addClass("active");
  $("#portfolio .list-wr.portfolio ul").isotope({
    filter: "".concat(filter)
  });
});

// portfolio on hover show title
$(".list-wr.portfolio ul > li .list-inner .image-wr").on({
  mouseenter: function mouseenter() {
    var title = $(this).data("title");
    var category = $(this).data("category");
    var html = "".concat(title, "<span>").concat(category, "</span>");
    $(".portfolio-title").html(html);
    $(".portfolio-title").addClass("visible");
  },
  mouseleave: function mouseleave() {
    $(".portfolio-title").removeClass("visible");
  },
  mousemove: function mousemove(e) {
    $(".portfolio-title").css({
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
    return "error";
  }
}
function getVimeoId(url) {
  var regEx = /https?:\/\/(?:vimeo\.com\/|player\.vimeo\.com\/)(?:video\/|(?:channels\/staffpicks\/|channels\/)|)((\w|-){7,9})/;
  var match = url.match(regEx);
  if (match && match.length == 3) {
    return match[1];
  } else {
    return "error";
  }
}
function getSoundCloudId(url) {
  var regEx = /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{8})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;
  var match = url.match(regEx);
  if (match && match.length == 5) {
    return match[1];
  } else {
    return "error";
  }
}
// event
$(document).on("click", ".list-wr.portfolio ul > li", function (e) {
  e.preventDefault();
  var link = $(this).find(".list-inner .image-wr > a").attr("href");
  if ($(this).hasClass("youtube")) {
    setContentYt(link);
  } else if ($(this).hasClass("vimeo")) {
    setContentVimeo(link);
  } else if ($(this).hasClass("soundcloud")) {
    setContentSoundCloud(link);
  } else if ($(this).hasClass("image")) {}

  // open modal content
  function openModalContent(content) {
    $(".modal__box__content .modal__box__inner .modal__content .iframe-scaler").html(content);
    $(".modal__box__content").addClass("opened");
    return false;
  }

  // youtube
  function setContentYt(link) {
    var id = getYtId(link);
    var content = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/".concat(id, "?autoplay=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
    openModalContent(content);
  }

  // vimeo
  function setContentVimeo(link) {
    var id = getVimeoId(link);
    var content = "<iframe src=\"https://player.vimeo.com/video/".concat(id, "\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe>");
    openModalContent(content);
  }

  // vimeo
  function setContentSoundCloud(link) {
    var id = getSoundCloudId(link);
    var content = "<iframe scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/".concat(id, "&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true\"></iframe>");
    openModalContent(content);
  }
});

// global window on click
$(window).on("click", function (e) {
  if (!window.getSelection().toString()) {
    // close modal content when fade clicked
    if (e.target == $(".modal__box__content.opened .modal__box__inner")[0]) {
      $(".modal__box__content.opened").removeClass("opened");
      setTimeout(function () {
        $(".modal__box__content .modal__box__inner .modal__content .iframe-scaler").html("");
      }, 500);
    }
  }
});
$(document).on("click", ".modal__box__content .modal__box__inner .modal__content .modal__close__btn", function () {
  $(".modal__box__content.opened").removeClass("opened");
  setTimeout(function () {
    $(".modal__box__content .modal__box__inner .modal__content .iframe-scaler").html("");
  }, 500);
});

// Open Lightbox
$(document).on("click", ".open-lightbox", function (e) {
  e.preventDefault();
  var image = $(this).attr("href");
  var desc = "";
  if ($(this).data("description")) {
    desc = $(this).data("description");
  }
  $("html").addClass("no-scroll");
  $("body .all-wr").prepend("<div class=\"lightbox-wrapper\">\n        <div class=\"lightbox-content\">\n            <img src=\"".concat(image, "\">\n        </div>\n        <button class=\"lightbox-close-btn focus:outline-none\" title=\"Close\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n                <path fill-rule=\"evenodd\" d=\"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z\" clip-rule=\"evenodd\" />\n            </svg>\n        </button>\n        <div class=\"lightbox-description\">\n            <span>").concat(desc, "</span>\n        </div>\n    </div>"));
  setTimeout(function () {
    $(".lightbox-wrapper").addClass("opened");
  }, 0);
});

// Close Lightbox
$(window).on("click", function (e) {
  if (!window.getSelection().toString()) {
    if (e.target == $(".lightbox-wrapper")[0] || e.target == $(".lightbox-content")[0] || e.target == $(".lightbox-description")[0]) {
      $(".lightbox-wrapper.opened").removeClass("opened");
      setTimeout(function () {
        $(".lightbox-wrapper").remove();
      }, 500);
    }
  }
});
$(document).on("click", ".lightbox-close-btn", function () {
  $(".lightbox-wrapper").removeClass("opened");
  setTimeout(function () {
    $(".lightbox-wrapper").remove();
  }, 500);
});

// mouse cursor
$(document).on({
  mousemove: function mousemove(e) {
    $(".mouse-cursor").css({
      left: e.pageX,
      top: e.pageY
    });
  }
});
$(document).on({
  mouseenter: function mouseenter() {
    $(".mouse-cursor").addClass("mouse-hover");
  },
  mouseleave: function mouseleave() {
    $(".mouse-cursor").removeClass("mouse-hover");
  }
}, "body a, body button");
$(document).on({
  click: function click() {
    $(".mouse-cursor").removeClass("mouse-hover");
  }
}, ".lightbox-wrapper .lightbox-close-btn");

// CLOSE ALL MODAL ON ESC
// close comment unapp using escape
$(document).keyup(function (e) {
  if (e.key === "Escape" || e.keyCode == 27) {
    // escape key maps to keycode `27`
    if ($(".modal__box.opened").length > 0) {
      $(".modal__box.about.opened").removeClass("opened");
      $(".modal__box.news.opened").removeClass("opened");
      setTimeout(function () {
        $(".modal__box.news .modal__box__inner .modal__content").html("");
      }, 500);
    }
    if ($(".modal__box__content").length > 0) {
      $(".modal__box__content.opened").removeClass("opened");
      setTimeout(function () {
        $(".modal__box__content .modal__box__inner .modal__content .iframe-scaler").html("");
      }, 500);
    }
    if ($(".lightbox-wrapper.opened").length > 0) {
      $(".lightbox-wrapper.opened").removeClass("opened");
      setTimeout(function () {
        $(".lightbox-wrapper").remove();
      }, 500);
    }
  }
});

// settings toggle show
$(document).on("click", ".settings-wr .icon .settings-btn", function (e) {
  e.preventDefault();
  $(".settings-wr").toggleClass("opened");
});

// settings color
$(document).on("click", ".settings-wr .settings-content .colors li a", function (e) {
  e.preventDefault();
  $(".all-wr").data("color", this.className);
  $(".all-wr").attr("data-color", this.className);
});

// settings cursor
$(document).on("click", ".settings-wr .settings-content .cursor li a", function (e) {
  e.preventDefault();
  $(".settings-content .cursor li a.magic-cursor-btn, .settings-content .cursor li a.def-cursor-btn").toggleClass("active");
  var toggleCursor = $(".all-wr").data("magic-cursor") == "hide" ? "show" : "hide";
  $(".all-wr").data("magic-cursor", toggleCursor);
  $(".all-wr").attr("data-magic-cursor", toggleCursor);
});

/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/js/app": 0,
/******/ 			"public/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklanding_page_1"] = self["webpackChunklanding_page_1"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/app"], () => (__webpack_require__("./resources/css/app.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;