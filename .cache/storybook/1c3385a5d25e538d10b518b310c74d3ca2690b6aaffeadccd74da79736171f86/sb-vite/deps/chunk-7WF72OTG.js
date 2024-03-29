import {
  getControlId,
  getControlSetterButtonId
} from "./chunk-YEWUECUE.js";
import {
  AddIcon,
  Button,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronSmallDownIcon,
  ChevronSmallUpIcon,
  Code,
  DocumentIcon,
  EmptyTabContent,
  ErrorFormatter,
  EyeCloseIcon,
  EyeIcon,
  FlexBar,
  Form,
  H2,
  H3,
  IconButton,
  Link2,
  LinkIcon,
  Loader,
  ResetWrapper,
  SubtractIcon,
  SyntaxHighlighter2,
  TabsState,
  UndoIcon,
  VideoIcon,
  WithTooltipPure,
  Zoom,
  ZoomIcon,
  ZoomOutIcon,
  ZoomResetIcon,
  codeCommon,
  components2,
  getStoryHref,
  nameSpaceClassNames,
  withReset
} from "./chunk-HC3OPKJN.js";
import {
  ActionBar
} from "./chunk-CHYWCC3G.js";
import {
  ThemeProvider,
  convert,
  ensure,
  ignoreSsrWarning,
  newStyled,
  themes,
  useTheme
} from "./chunk-JFVABNW3.js";
import {
  index_modern_default
} from "./chunk-CCYINSEQ.js";
import {
  SNIPPET_RENDERED,
  SourceType
} from "./chunk-S2OIGVBF.js";
import {
  O
} from "./chunk-GYN73ZSA.js";
import {
  require_core_events
} from "./chunk-M24HVCOE.js";
import {
  require_client_logger
} from "./chunk-KA3SVUA7.js";
import {
  esm_default
} from "./chunk-YUD6PS7S.js";
import {
  stringify
} from "./chunk-M2YA76ME.js";
import {
  curriedDarken$1,
  curriedLighten$1,
  curriedOpacify$1,
  curriedTransparentize$1,
  rgba
} from "./chunk-FM2H65RN.js";
import {
  require_memoizerific
} from "./chunk-QIUXZDQ3.js";
import {
  require_pickBy
} from "./chunk-LJF3QAU3.js";
import {
  require_uniq
} from "./chunk-RYMVWKPZ.js";
import {
  require_cloneDeep
} from "./chunk-MZTF3JMC.js";
import {
  require_preview_api
} from "./chunk-ZHJQLDCC.js";
import {
  require_global
} from "./chunk-R36FFXMJ.js";
import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __commonJS,
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/tocbot/src/js/default-options.js
var require_default_options = __commonJS({
  "node_modules/tocbot/src/js/default-options.js"(exports, module) {
    module.exports = {
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // Headings that match the ignoreSelector will be skipped.
      ignoreSelector: ".js-toc-ignore",
      // For headings inside relative or absolute positioned containers within content
      hasInnerContainers: false,
      // Main class to add to links.
      linkClass: "toc-link",
      // Extra classes to add to links.
      extraLinkClasses: "",
      // Class to add to active links,
      // the link corresponding to the top most heading on the page.
      activeLinkClass: "is-active-link",
      // Main class to add to lists.
      listClass: "toc-list",
      // Extra classes to add to lists.
      extraListClasses: "",
      // Class that gets added when a list should be collapsed.
      isCollapsedClass: "is-collapsed",
      // Class that gets added when a list should be able
      // to be collapsed but isn't necessarily collapsed.
      collapsibleClass: "is-collapsible",
      // Class to add to list items.
      listItemClass: "toc-list-item",
      // Class to add to active list items.
      activeListItemClass: "is-active-li",
      // How many heading levels should not be collapsed.
      // For example, number 6 will show everything since
      // there are only 6 heading levels and number 0 will collapse them all.
      // The sections that are hidden will open
      // and close as you scroll to headings within them.
      collapseDepth: 0,
      // Smooth scrolling enabled.
      scrollSmooth: true,
      // Smooth scroll duration.
      scrollSmoothDuration: 420,
      // Smooth scroll offset.
      scrollSmoothOffset: 0,
      // Callback for scroll end.
      scrollEndCallback: function(e) {
      },
      // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
      headingsOffset: 1,
      // Timeout between events firing to make sure it's
      // not too rapid (for performance reasons).
      throttleTimeout: 50,
      // Element to add the positionFixedClass to.
      positionFixedSelector: null,
      // Fixed position class to add to make sidebar fixed after scrolling
      // down past the fixedSidebarOffset.
      positionFixedClass: "is-position-fixed",
      // fixedSidebarOffset can be any number but by default is set
      // to auto which sets the fixedSidebarOffset to the sidebar
      // element's offsetTop from the top of the document on init.
      fixedSidebarOffset: "auto",
      // includeHtml can be set to true to include the HTML markup from the
      // heading node instead of just including the innerText.
      includeHtml: false,
      // includeTitleTags automatically sets the html title tag of the link
      // to match the title. This can be useful for SEO purposes or
      // when truncating titles.
      includeTitleTags: false,
      // onclick function to apply to all links in toc. will be called with
      // the event as the first parameter, and this can be used to stop,
      // propagation, prevent default or perform action
      onClick: function(e) {
      },
      // orderedList can be set to false to generate unordered lists (ul)
      // instead of ordered lists (ol)
      orderedList: true,
      // If there is a fixed article scroll container, set to calculate titles' offset
      scrollContainer: null,
      // prevent ToC DOM rendering if it's already rendered by an external system
      skipRendering: false,
      // Optional callback to change heading labels.
      // For example it can be used to cut down and put ellipses on multiline headings you deem too long.
      // Called each time a heading is parsed. Expects a string and returns the modified label to display.
      // Additionally, the attribute `data-heading-label` may be used on a heading to specify
      // a shorter string to be used in the TOC.
      // function (string) => string
      headingLabelCallback: false,
      // ignore headings that are hidden in DOM
      ignoreHiddenElements: false,
      // Optional callback to modify properties of parsed headings.
      // The heading element is passed in node parameter and information parsed by default parser is provided in obj parameter.
      // Function has to return the same or modified obj.
      // The heading will be excluded from TOC if nothing is returned.
      // function (object, HTMLElement) => object | void
      headingObjectCallback: null,
      // Set the base path, useful if you use a `base` tag in `head`.
      basePath: "",
      // Only takes affect when `tocSelector` is scrolling,
      // keep the toc scroll position in sync with the content.
      disableTocScrollSync: false,
      // Offset for the toc scroll (top) position when scrolling the page.
      // Only effective if `disableTocScrollSync` is false.
      tocScrollOffset: 0
    };
  }
});

// node_modules/tocbot/src/js/build-html.js
var require_build_html = __commonJS({
  "node_modules/tocbot/src/js/build-html.js"(exports, module) {
    module.exports = function(options) {
      var forEach = [].forEach;
      var some = [].some;
      var body = document.body;
      var tocElement;
      var currentlyHighlighting = true;
      var SPACE_CHAR = " ";
      function createEl(d, container) {
        var link = container.appendChild(createLink(d));
        if (d.children.length) {
          var list = createList(d.isCollapsed);
          d.children.forEach(function(child) {
            createEl(child, list);
          });
          link.appendChild(list);
        }
      }
      function render(parent, data) {
        var collapsed = false;
        var container = createList(collapsed);
        data.forEach(function(d) {
          createEl(d, container);
        });
        tocElement = parent || tocElement;
        if (tocElement === null) {
          return;
        }
        if (tocElement.firstChild) {
          tocElement.removeChild(tocElement.firstChild);
        }
        if (data.length === 0) {
          return tocElement;
        }
        return tocElement.appendChild(container);
      }
      function createLink(data) {
        var item = document.createElement("li");
        var a = document.createElement("a");
        if (options.listItemClass) {
          item.setAttribute("class", options.listItemClass);
        }
        if (options.onClick) {
          a.onclick = options.onClick;
        }
        if (options.includeTitleTags) {
          a.setAttribute("title", data.textContent);
        }
        if (options.includeHtml && data.childNodes.length) {
          forEach.call(data.childNodes, function(node) {
            a.appendChild(node.cloneNode(true));
          });
        } else {
          a.textContent = data.textContent;
        }
        a.setAttribute("href", options.basePath + "#" + data.id);
        a.setAttribute("class", options.linkClass + SPACE_CHAR + "node-name--" + data.nodeName + SPACE_CHAR + options.extraLinkClasses);
        item.appendChild(a);
        return item;
      }
      function createList(isCollapsed) {
        var listElement = options.orderedList ? "ol" : "ul";
        var list = document.createElement(listElement);
        var classes = options.listClass + SPACE_CHAR + options.extraListClasses;
        if (isCollapsed) {
          classes = classes + SPACE_CHAR + options.collapsibleClass;
          classes = classes + SPACE_CHAR + options.isCollapsedClass;
        }
        list.setAttribute("class", classes);
        return list;
      }
      function updateFixedSidebarClass() {
        if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
          var top;
          top = document.querySelector(options.scrollContainer).scrollTop;
        } else {
          top = document.documentElement.scrollTop || body.scrollTop;
        }
        var posFixedEl = document.querySelector(options.positionFixedSelector);
        if (options.fixedSidebarOffset === "auto") {
          options.fixedSidebarOffset = tocElement.offsetTop;
        }
        if (top > options.fixedSidebarOffset) {
          if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {
            posFixedEl.className += SPACE_CHAR + options.positionFixedClass;
          }
        } else {
          posFixedEl.className = posFixedEl.className.replace(SPACE_CHAR + options.positionFixedClass, "");
        }
      }
      function getHeadingTopPos(obj) {
        var position = 0;
        if (obj !== null) {
          position = obj.offsetTop;
          if (options.hasInnerContainers) {
            position += getHeadingTopPos(obj.offsetParent);
          }
        }
        return position;
      }
      function updateClassname(obj, className) {
        if (obj && obj.className !== className) {
          obj.className = className;
        }
        return obj;
      }
      function updateToc(headingsArray) {
        if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
          var top;
          top = document.querySelector(options.scrollContainer).scrollTop;
        } else {
          top = document.documentElement.scrollTop || body.scrollTop;
        }
        if (options.positionFixedSelector) {
          updateFixedSidebarClass();
        }
        var headings = headingsArray;
        var topHeader;
        if (currentlyHighlighting && tocElement !== null && headings.length > 0) {
          some.call(headings, function(heading, i) {
            if (getHeadingTopPos(heading) > top + options.headingsOffset + 10) {
              var index = i === 0 ? i : i - 1;
              topHeader = headings[index];
              return true;
            } else if (i === headings.length - 1) {
              topHeader = headings[headings.length - 1];
              return true;
            }
          });
          var oldActiveTocLink = tocElement.querySelector("." + options.activeLinkClass);
          var activeTocLink = tocElement.querySelector("." + options.linkClass + ".node-name--" + topHeader.nodeName + '[href="' + options.basePath + "#" + topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1") + '"]');
          if (oldActiveTocLink === activeTocLink) {
            return;
          }
          var tocLinks = tocElement.querySelectorAll("." + options.linkClass);
          forEach.call(tocLinks, function(tocLink) {
            updateClassname(tocLink, tocLink.className.replace(SPACE_CHAR + options.activeLinkClass, ""));
          });
          var tocLis = tocElement.querySelectorAll("." + options.listItemClass);
          forEach.call(tocLis, function(tocLi) {
            updateClassname(tocLi, tocLi.className.replace(SPACE_CHAR + options.activeListItemClass, ""));
          });
          if (activeTocLink && activeTocLink.className.indexOf(options.activeLinkClass) === -1) {
            activeTocLink.className += SPACE_CHAR + options.activeLinkClass;
          }
          var li = activeTocLink && activeTocLink.parentNode;
          if (li && li.className.indexOf(options.activeListItemClass) === -1) {
            li.className += SPACE_CHAR + options.activeListItemClass;
          }
          var tocLists = tocElement.querySelectorAll("." + options.listClass + "." + options.collapsibleClass);
          forEach.call(tocLists, function(list) {
            if (list.className.indexOf(options.isCollapsedClass) === -1) {
              list.className += SPACE_CHAR + options.isCollapsedClass;
            }
          });
          if (activeTocLink && activeTocLink.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1) {
            updateClassname(activeTocLink.nextSibling, activeTocLink.nextSibling.className.replace(SPACE_CHAR + options.isCollapsedClass, ""));
          }
          removeCollapsedFromParents(activeTocLink && activeTocLink.parentNode.parentNode);
        }
      }
      function removeCollapsedFromParents(element) {
        if (element && element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1) {
          updateClassname(element, element.className.replace(SPACE_CHAR + options.isCollapsedClass, ""));
          return removeCollapsedFromParents(element.parentNode.parentNode);
        }
        return element;
      }
      function disableTocAnimation(event) {
        var target = event.target || event.srcElement;
        if (typeof target.className !== "string" || target.className.indexOf(options.linkClass) === -1) {
          return;
        }
        currentlyHighlighting = false;
      }
      function enableTocAnimation() {
        currentlyHighlighting = true;
      }
      return {
        enableTocAnimation,
        disableTocAnimation,
        render,
        updateToc
      };
    };
  }
});

// node_modules/tocbot/src/js/parse-content.js
var require_parse_content = __commonJS({
  "node_modules/tocbot/src/js/parse-content.js"(exports, module) {
    module.exports = function parseContent(options) {
      var reduce = [].reduce;
      function getLastItem(array2) {
        return array2[array2.length - 1];
      }
      function getHeadingLevel(heading) {
        return +heading.nodeName.toUpperCase().replace("H", "");
      }
      function isHTMLElement(maybeElement) {
        try {
          return maybeElement instanceof window.HTMLElement || maybeElement instanceof window.parent.HTMLElement;
        } catch (e) {
          return maybeElement instanceof window.HTMLElement;
        }
      }
      function getHeadingObject(heading) {
        if (!isHTMLElement(heading))
          return heading;
        if (options.ignoreHiddenElements && (!heading.offsetHeight || !heading.offsetParent)) {
          return null;
        }
        const headingLabel = heading.getAttribute("data-heading-label") || (options.headingLabelCallback ? String(options.headingLabelCallback(heading.innerText)) : (heading.innerText || heading.textContent).trim());
        var obj = {
          id: heading.id,
          children: [],
          nodeName: heading.nodeName,
          headingLevel: getHeadingLevel(heading),
          textContent: headingLabel
        };
        if (options.includeHtml) {
          obj.childNodes = heading.childNodes;
        }
        if (options.headingObjectCallback) {
          return options.headingObjectCallback(obj, heading);
        }
        return obj;
      }
      function addNode(node, nest) {
        var obj = getHeadingObject(node);
        var level = obj.headingLevel;
        var array2 = nest;
        var lastItem = getLastItem(array2);
        var lastItemLevel = lastItem ? lastItem.headingLevel : 0;
        var counter = level - lastItemLevel;
        while (counter > 0) {
          lastItem = getLastItem(array2);
          if (lastItem && level === lastItem.headingLevel) {
            break;
          } else if (lastItem && lastItem.children !== void 0) {
            array2 = lastItem.children;
          }
          counter--;
        }
        if (level >= options.collapseDepth) {
          obj.isCollapsed = true;
        }
        array2.push(obj);
        return array2;
      }
      function selectHeadings(contentElement, headingSelector) {
        var selectors = headingSelector;
        if (options.ignoreSelector) {
          selectors = headingSelector.split(",").map(function mapSelectors(selector) {
            return selector.trim() + ":not(" + options.ignoreSelector + ")";
          });
        }
        try {
          return contentElement.querySelectorAll(selectors);
        } catch (e) {
          console.warn("Headers not found with selector: " + selectors);
          return null;
        }
      }
      function nestHeadingsArray(headingsArray) {
        return reduce.call(headingsArray, function reducer(prev, curr) {
          var currentHeading = getHeadingObject(curr);
          if (currentHeading) {
            addNode(currentHeading, prev.nest);
          }
          return prev;
        }, {
          nest: []
        });
      }
      return {
        nestHeadingsArray,
        selectHeadings
      };
    };
  }
});

// node_modules/tocbot/src/js/update-toc-scroll.js
var require_update_toc_scroll = __commonJS({
  "node_modules/tocbot/src/js/update-toc-scroll.js"(exports, module) {
    var SCROLL_LEEWAY = 30;
    module.exports = function updateTocScroll(options) {
      var toc = options.tocElement || document.querySelector(options.tocSelector);
      if (toc && toc.scrollHeight > toc.clientHeight) {
        var activeItem = toc.querySelector("." + options.activeListItemClass);
        if (activeItem) {
          var cTop = toc.scrollTop;
          var cBottom = cTop + toc.clientHeight;
          var eTop = activeItem.offsetTop;
          var eBottom = eTop + activeItem.clientHeight;
          if (eTop < cTop + options.tocScrollOffset) {
            toc.scrollTop -= cTop - eTop + options.tocScrollOffset;
          } else if (eBottom > cBottom - options.tocScrollOffset - SCROLL_LEEWAY) {
            toc.scrollTop += eBottom - cBottom + options.tocScrollOffset + 2 * SCROLL_LEEWAY;
          }
        }
      }
    };
  }
});

// node_modules/tocbot/src/js/scroll-smooth/index.js
var require_scroll_smooth = __commonJS({
  "node_modules/tocbot/src/js/scroll-smooth/index.js"(exports) {
    exports.initSmoothScrolling = initSmoothScrolling;
    function initSmoothScrolling(options) {
      var duration = options.duration;
      var offset = options.offset;
      var pageUrl = location.hash ? stripHash(location.href) : location.href;
      delegatedLinkHijacking();
      function delegatedLinkHijacking() {
        document.body.addEventListener("click", onClick, false);
        function onClick(e) {
          if (!isInPageLink(e.target) || e.target.className.indexOf("no-smooth-scroll") > -1 || e.target.href.charAt(e.target.href.length - 2) === "#" && e.target.href.charAt(e.target.href.length - 1) === "!" || e.target.className.indexOf(options.linkClass) === -1) {
            return;
          }
          jump(e.target.hash, {
            duration,
            offset,
            callback: function() {
              setFocus(e.target.hash);
            }
          });
        }
      }
      function isInPageLink(n) {
        return n.tagName.toLowerCase() === "a" && (n.hash.length > 0 || n.href.charAt(n.href.length - 1) === "#") && (stripHash(n.href) === pageUrl || stripHash(n.href) + "#" === pageUrl);
      }
      function stripHash(url) {
        return url.slice(0, url.lastIndexOf("#"));
      }
      function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));
        if (element) {
          if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
            element.tabIndex = -1;
          }
          element.focus();
        }
      }
    }
    function jump(target, options) {
      var start = window.pageYOffset;
      var opt = {
        duration: options.duration,
        offset: options.offset || 0,
        callback: options.callback,
        easing: options.easing || easeInOutQuad
      };
      var tgt = document.querySelector('[id="' + decodeURI(target).split("#").join("") + '"]') || document.querySelector('[id="' + target.split("#").join("") + '"]');
      var distance = typeof target === "string" ? opt.offset + (target ? tgt && tgt.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : target;
      var duration = typeof opt.duration === "function" ? opt.duration(distance) : opt.duration;
      var timeStart;
      var timeElapsed;
      requestAnimationFrame(function(time) {
        timeStart = time;
        loop(time);
      });
      function loop(time) {
        timeElapsed = time - timeStart;
        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
        if (timeElapsed < duration) {
          requestAnimationFrame(loop);
        } else {
          end();
        }
      }
      function end() {
        window.scrollTo(0, start + distance);
        if (typeof opt.callback === "function") {
          opt.callback();
        }
      }
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1)
          return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
    }
  }
});

// node_modules/tocbot/src/js/index.js
var require_js = __commonJS({
  "node_modules/tocbot/src/js/index.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory(root));
      } else if (typeof exports === "object") {
        module.exports = factory(root);
      } else {
        root.tocbot = factory(root);
      }
    })(typeof global !== "undefined" ? global : window || global, function(root) {
      "use strict";
      var defaultOptions = require_default_options();
      var options = {};
      var tocbot2 = {};
      var BuildHtml = require_build_html();
      var ParseContent = require_parse_content();
      var updateTocScroll = require_update_toc_scroll();
      var buildHtml;
      var parseContent;
      var supports = !!root && !!root.document && !!root.document.querySelector && !!root.addEventListener;
      if (typeof window === "undefined" && !supports) {
        return;
      }
      var headingsArray;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function extend() {
        var target = {};
        for (var i = 0; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      }
      function throttle(fn, threshold, scope) {
        threshold || (threshold = 250);
        var last;
        var deferTimer;
        return function() {
          var context = scope || this;
          var now = +/* @__PURE__ */ new Date();
          var args = arguments;
          if (last && now < last + threshold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
              last = now;
              fn.apply(context, args);
            }, threshold);
          } else {
            last = now;
            fn.apply(context, args);
          }
        };
      }
      function getContentElement(options2) {
        try {
          return options2.contentElement || document.querySelector(options2.contentSelector);
        } catch (e) {
          console.warn("Contents element not found: " + options2.contentSelector);
          return null;
        }
      }
      function getTocElement(options2) {
        try {
          return options2.tocElement || document.querySelector(options2.tocSelector);
        } catch (e) {
          console.warn("TOC element not found: " + options2.tocSelector);
          return null;
        }
      }
      tocbot2.destroy = function() {
        var tocElement = getTocElement(options);
        if (tocElement === null) {
          return;
        }
        if (!options.skipRendering) {
          if (tocElement) {
            tocElement.innerHTML = "";
          }
        }
        if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
          document.querySelector(options.scrollContainer).removeEventListener("scroll", this._scrollListener, false);
          document.querySelector(options.scrollContainer).removeEventListener("resize", this._scrollListener, false);
          if (buildHtml) {
            document.querySelector(options.scrollContainer).removeEventListener("click", this._clickListener, false);
          }
        } else {
          document.removeEventListener("scroll", this._scrollListener, false);
          document.removeEventListener("resize", this._scrollListener, false);
          if (buildHtml) {
            document.removeEventListener("click", this._clickListener, false);
          }
        }
      };
      tocbot2.init = function(customOptions) {
        if (!supports) {
          return;
        }
        options = extend(defaultOptions, customOptions || {});
        this.options = options;
        this.state = {};
        if (options.scrollSmooth) {
          options.duration = options.scrollSmoothDuration;
          options.offset = options.scrollSmoothOffset;
          tocbot2.scrollSmooth = require_scroll_smooth().initSmoothScrolling(options);
        }
        buildHtml = BuildHtml(options);
        parseContent = ParseContent(options);
        this._buildHtml = buildHtml;
        this._parseContent = parseContent;
        this._headingsArray = headingsArray;
        tocbot2.destroy();
        var contentElement = getContentElement(options);
        if (contentElement === null) {
          return;
        }
        var tocElement = getTocElement(options);
        if (tocElement === null) {
          return;
        }
        headingsArray = parseContent.selectHeadings(contentElement, options.headingSelector);
        if (headingsArray === null) {
          return;
        }
        var nestedHeadingsObj = parseContent.nestHeadingsArray(headingsArray);
        var nestedHeadings = nestedHeadingsObj.nest;
        if (!options.skipRendering) {
          buildHtml.render(tocElement, nestedHeadings);
        } else {
          return this;
        }
        this._scrollListener = throttle(function(e) {
          buildHtml.updateToc(headingsArray);
          !options.disableTocScrollSync && updateTocScroll(options);
          var isTop = e && e.target && e.target.scrollingElement && e.target.scrollingElement.scrollTop === 0;
          if (e && (e.eventPhase === 0 || e.currentTarget === null) || isTop) {
            buildHtml.updateToc(headingsArray);
            if (options.scrollEndCallback) {
              options.scrollEndCallback(e);
            }
          }
        }, options.throttleTimeout);
        this._scrollListener();
        if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
          document.querySelector(options.scrollContainer).addEventListener("scroll", this._scrollListener, false);
          document.querySelector(options.scrollContainer).addEventListener("resize", this._scrollListener, false);
        } else {
          document.addEventListener("scroll", this._scrollListener, false);
          document.addEventListener("resize", this._scrollListener, false);
        }
        var timeout = null;
        this._clickListener = throttle(function(event) {
          if (options.scrollSmooth) {
            buildHtml.disableTocAnimation(event);
          }
          buildHtml.updateToc(headingsArray);
          timeout && clearTimeout(timeout);
          timeout = setTimeout(function() {
            buildHtml.enableTocAnimation();
          }, options.scrollSmoothDuration);
        }, options.throttleTimeout);
        if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
          document.querySelector(options.scrollContainer).addEventListener("click", this._clickListener, false);
        } else {
          document.addEventListener("click", this._clickListener, false);
        }
        return this;
      };
      tocbot2.refresh = function(customOptions) {
        tocbot2.destroy();
        tocbot2.init(customOptions || this.options);
      };
      root.tocbot = tocbot2;
      return tocbot2;
    });
  }
});

// .cache/sb-vite-plugin-externals/@storybook/channels.js
var require_channels = __commonJS({
  ".cache/sb-vite-plugin-externals/@storybook/channels.js"(exports, module) {
    module.exports = __STORYBOOK_MODULE_CHANNELS__;
  }
});

// node_modules/@storybook/blocks/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var import_global = __toESM(require_global(), 1);
var import_pickBy = __toESM(require_pickBy(), 1);
var import_client_logger = __toESM(require_client_logger(), 1);
var import_memoizerific = __toESM(require_memoizerific(), 1);
var import_uniq = __toESM(require_uniq(), 1);
var import_cloneDeep = __toESM(require_cloneDeep(), 1);
var import_preview_api = __toESM(require_preview_api(), 1);
var import_core_events = __toESM(require_core_events(), 1);
var tocbot = __toESM(require_js(), 1);
var import_channels = __toESM(require_channels(), 1);
var Wrapper = newStyled.div(withReset, ({ theme }) => ({ backgroundColor: theme.base === "light" ? "rgba(0,0,0,.01)" : "rgba(255,255,255,.01)", borderRadius: theme.appBorderRadius, border: `1px dashed ${theme.appBorderColor}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, margin: "25px 0 40px", color: curriedTransparentize$1(0.3, theme.color.defaultText), fontSize: theme.typography.size.s2 }));
var EmptyBlock = (props) => import_react.default.createElement(Wrapper, { ...props, className: "docblock-emptyblock sb-unstyled" });
var StyledSyntaxHighlighter = newStyled(SyntaxHighlighter2)(({ theme }) => ({ fontSize: `${theme.typography.size.s2 - 1}px`, lineHeight: "19px", margin: "25px 0 40px", borderRadius: theme.appBorderRadius, boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0", "pre.prismjs": { padding: 20, background: "inherit" } }));
var SourceSkeletonWrapper = newStyled.div(({ theme }) => ({ background: theme.background.content, borderRadius: theme.appBorderRadius, border: `1px solid ${theme.appBorderColor}`, boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0", margin: "25px 0 40px", padding: "20px 20px 20px 22px" }));
var SourceSkeletonPlaceholder = newStyled.div(({ theme }) => ({ animation: `${theme.animation.glow} 1.5s ease-in-out infinite`, background: theme.appBorderColor, height: 17, marginTop: 1, width: "60%", [`&:first-child${ignoreSsrWarning}`]: { margin: 0 } }));
var SourceSkeleton = () => import_react.default.createElement(SourceSkeletonWrapper, null, import_react.default.createElement(SourceSkeletonPlaceholder, null), import_react.default.createElement(SourceSkeletonPlaceholder, { style: { width: "80%" } }), import_react.default.createElement(SourceSkeletonPlaceholder, { style: { width: "30%" } }), import_react.default.createElement(SourceSkeletonPlaceholder, { style: { width: "80%" } }));
var Source = ({ isLoading, error, language, code, dark, format: format2, ...rest }) => {
  let { typography } = useTheme();
  if (isLoading)
    return import_react.default.createElement(SourceSkeleton, null);
  if (error)
    return import_react.default.createElement(EmptyBlock, null, error);
  let syntaxHighlighter = import_react.default.createElement(StyledSyntaxHighlighter, { bordered: true, copyable: true, format: format2, language, className: "docblock-source sb-unstyled", ...rest }, code);
  if (typeof dark > "u")
    return syntaxHighlighter;
  let overrideTheme = dark ? themes.dark : themes.light;
  return import_react.default.createElement(ThemeProvider, { theme: convert({ ...overrideTheme, fontCode: typography.fonts.mono, fontBase: typography.fonts.base }) }, syntaxHighlighter);
};
Source.defaultProps = { format: false };
var toGlobalSelector = (element) => `& :where(${element}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${element}))`;
var breakpoint = 600;
var Title = newStyled.h1(withReset, ({ theme }) => ({ color: theme.color.defaultText, fontSize: theme.typography.size.m3, fontWeight: theme.typography.weight.bold, lineHeight: "32px", [`@media (min-width: ${breakpoint}px)`]: { fontSize: theme.typography.size.l1, lineHeight: "36px", marginBottom: "16px" } }));
var Subtitle = newStyled.h2(withReset, ({ theme }) => ({ fontWeight: theme.typography.weight.regular, fontSize: theme.typography.size.s3, lineHeight: "20px", borderBottom: "none", marginBottom: 15, [`@media (min-width: ${breakpoint}px)`]: { fontSize: theme.typography.size.m1, lineHeight: "28px", marginBottom: 24 }, color: curriedTransparentize$1(0.25, theme.color.defaultText) }));
var DocsContent = newStyled.div(({ theme }) => {
  let reset = { fontFamily: theme.typography.fonts.base, fontSize: theme.typography.size.s3, margin: 0, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", WebkitTapHighlightColor: "rgba(0, 0, 0, 0)", WebkitOverflowScrolling: "touch" }, headers = { margin: "20px 0 8px", padding: 0, cursor: "text", position: "relative", color: theme.color.defaultText, "&:first-of-type": { marginTop: 0, paddingTop: 0 }, "&:hover a.anchor": { textDecoration: "none" }, "& code": { fontSize: "inherit" } }, code = { lineHeight: 1, margin: "0 2px", padding: "3px 5px", whiteSpace: "nowrap", borderRadius: 3, fontSize: theme.typography.size.s2 - 1, border: theme.base === "light" ? `1px solid ${theme.color.mediumlight}` : `1px solid ${theme.color.darker}`, color: theme.base === "light" ? curriedTransparentize$1(0.1, theme.color.defaultText) : curriedTransparentize$1(0.3, theme.color.defaultText), backgroundColor: theme.base === "light" ? theme.color.lighter : theme.color.border };
  return { maxWidth: 1e3, width: "100%", [toGlobalSelector("a")]: { ...reset, fontSize: "inherit", lineHeight: "24px", color: theme.color.secondary, textDecoration: "none", "&.absent": { color: "#cc0000" }, "&.anchor": { display: "block", paddingLeft: 30, marginLeft: -30, cursor: "pointer", position: "absolute", top: 0, left: 0, bottom: 0 } }, [toGlobalSelector("blockquote")]: { ...reset, margin: "16px 0", borderLeft: `4px solid ${theme.color.medium}`, padding: "0 15px", color: theme.color.dark, "& > :first-of-type": { marginTop: 0 }, "& > :last-child": { marginBottom: 0 } }, [toGlobalSelector("div")]: reset, [toGlobalSelector("dl")]: { ...reset, margin: "16px 0", padding: 0, "& dt": { fontSize: "14px", fontWeight: "bold", fontStyle: "italic", padding: 0, margin: "16px 0 4px" }, "& dt:first-of-type": { padding: 0 }, "& dt > :first-of-type": { marginTop: 0 }, "& dt > :last-child": { marginBottom: 0 }, "& dd": { margin: "0 0 16px", padding: "0 15px" }, "& dd > :first-of-type": { marginTop: 0 }, "& dd > :last-child": { marginBottom: 0 } }, [toGlobalSelector("h1")]: { ...reset, ...headers, fontSize: `${theme.typography.size.l1}px`, fontWeight: theme.typography.weight.bold }, [toGlobalSelector("h2")]: { ...reset, ...headers, fontSize: `${theme.typography.size.m2}px`, paddingBottom: 4, borderBottom: `1px solid ${theme.appBorderColor}` }, [toGlobalSelector("h3")]: { ...reset, ...headers, fontSize: `${theme.typography.size.m1}px`, fontWeight: theme.typography.weight.bold }, [toGlobalSelector("h4")]: { ...reset, ...headers, fontSize: `${theme.typography.size.s3}px` }, [toGlobalSelector("h5")]: { ...reset, ...headers, fontSize: `${theme.typography.size.s2}px` }, [toGlobalSelector("h6")]: { ...reset, ...headers, fontSize: `${theme.typography.size.s2}px`, color: theme.color.dark }, [toGlobalSelector("hr")]: { border: "0 none", borderTop: `1px solid ${theme.appBorderColor}`, height: 4, padding: 0 }, [toGlobalSelector("img")]: { maxWidth: "100%" }, [toGlobalSelector("li")]: { ...reset, fontSize: theme.typography.size.s2, color: theme.color.defaultText, lineHeight: "24px", "& + li": { marginTop: ".25em" }, "& ul, & ol": { marginTop: ".25em", marginBottom: 0 }, "& code": code }, [toGlobalSelector("ol")]: { ...reset, margin: "16px 0", paddingLeft: 30, "& :first-of-type": { marginTop: 0 }, "& :last-child": { marginBottom: 0 } }, [toGlobalSelector("p")]: { ...reset, margin: "16px 0", fontSize: theme.typography.size.s2, lineHeight: "24px", color: theme.color.defaultText, "& code": code }, [toGlobalSelector("pre")]: { ...reset, fontFamily: theme.typography.fonts.mono, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", lineHeight: "18px", padding: "11px 1rem", whiteSpace: "pre-wrap", color: "inherit", borderRadius: 3, margin: "1rem 0", "&:not(.prismjs)": { background: "transparent", border: "none", borderRadius: 0, padding: 0, margin: 0 }, "& pre, &.prismjs": { padding: 15, margin: 0, whiteSpace: "pre-wrap", color: "inherit", fontSize: "13px", lineHeight: "19px", code: { color: "inherit", fontSize: "inherit" } }, "& code": { whiteSpace: "pre" }, "& code, & tt": { border: "none" } }, [toGlobalSelector("span")]: { ...reset, "&.frame": { display: "block", overflow: "hidden", "& > span": { border: `1px solid ${theme.color.medium}`, display: "block", float: "left", overflow: "hidden", margin: "13px 0 0", padding: 7, width: "auto" }, "& span img": { display: "block", float: "left" }, "& span span": { clear: "both", color: theme.color.darkest, display: "block", padding: "5px 0 0" } }, "&.align-center": { display: "block", overflow: "hidden", clear: "both", "& > span": { display: "block", overflow: "hidden", margin: "13px auto 0", textAlign: "center" }, "& span img": { margin: "0 auto", textAlign: "center" } }, "&.align-right": { display: "block", overflow: "hidden", clear: "both", "& > span": { display: "block", overflow: "hidden", margin: "13px 0 0", textAlign: "right" }, "& span img": { margin: 0, textAlign: "right" } }, "&.float-left": { display: "block", marginRight: 13, overflow: "hidden", float: "left", "& span": { margin: "13px 0 0" } }, "&.float-right": { display: "block", marginLeft: 13, overflow: "hidden", float: "right", "& > span": { display: "block", overflow: "hidden", margin: "13px auto 0", textAlign: "right" } } }, [toGlobalSelector("table")]: { ...reset, margin: "16px 0", fontSize: theme.typography.size.s2, lineHeight: "24px", padding: 0, borderCollapse: "collapse", "& tr": { borderTop: `1px solid ${theme.appBorderColor}`, backgroundColor: theme.appContentBg, margin: 0, padding: 0 }, "& tr:nth-of-type(2n)": { backgroundColor: theme.base === "dark" ? theme.color.darker : theme.color.lighter }, "& tr th": { fontWeight: "bold", color: theme.color.defaultText, border: `1px solid ${theme.appBorderColor}`, margin: 0, padding: "6px 13px" }, "& tr td": { border: `1px solid ${theme.appBorderColor}`, color: theme.color.defaultText, margin: 0, padding: "6px 13px" }, "& tr th :first-of-type, & tr td :first-of-type": { marginTop: 0 }, "& tr th :last-child, & tr td :last-child": { marginBottom: 0 } }, [toGlobalSelector("ul")]: { ...reset, margin: "16px 0", paddingLeft: 30, "& :first-of-type": { marginTop: 0 }, "& :last-child": { marginBottom: 0 }, listStyle: "disc" } };
});
var DocsWrapper = newStyled.div(({ theme }) => ({ background: theme.background.content, display: "flex", justifyContent: "center", padding: "4rem 20px", minHeight: "100vh", boxSizing: "border-box", gap: "3rem", [`@media (min-width: ${breakpoint}px)`]: {} }));
var DocsPageWrapper = ({ children, toc }) => import_react.default.createElement(DocsWrapper, { className: "sbdocs sbdocs-wrapper" }, import_react.default.createElement(DocsContent, { className: "sbdocs sbdocs-content" }, children), toc);
var getBlockBackgroundStyle = (theme) => ({ borderRadius: theme.appBorderRadius, background: theme.background.content, boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0", border: `1px solid ${theme.appBorderColor}` });
var Bar = newStyled(FlexBar)({ position: "absolute", left: 0, right: 0, top: 0, transition: "transform .2s linear" });
var Wrapper2 = newStyled.div({ display: "flex", alignItems: "center", gap: 4 });
var IconPlaceholder = newStyled.div(({ theme }) => ({ width: 14, height: 14, borderRadius: 2, margin: "0 7px", backgroundColor: theme.appBorderColor, animation: `${theme.animation.glow} 1.5s ease-in-out infinite` }));
var Toolbar = ({ isLoading, storyId, baseUrl, zoom, resetZoom, ...rest }) => import_react.default.createElement(Bar, { ...rest }, import_react.default.createElement(Wrapper2, { key: "left" }, isLoading ? [1, 2, 3].map((key) => import_react.default.createElement(IconPlaceholder, { key })) : import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(IconButton, { key: "zoomin", onClick: (e) => {
  e.preventDefault(), zoom(0.8);
}, title: "Zoom in" }, import_react.default.createElement(ZoomIcon, null)), import_react.default.createElement(IconButton, { key: "zoomout", onClick: (e) => {
  e.preventDefault(), zoom(1.25);
}, title: "Zoom out" }, import_react.default.createElement(ZoomOutIcon, null)), import_react.default.createElement(IconButton, { key: "zoomreset", onClick: (e) => {
  e.preventDefault(), resetZoom();
}, title: "Reset zoom" }, import_react.default.createElement(ZoomResetIcon, null)))));
var ZoomContext = (0, import_react.createContext)({ scale: 1 });
var { window: globalWindow } = import_global.global;
var IFrame = class extends import_react.Component {
  constructor() {
    super(...arguments);
    this.iframe = null;
  }
  componentDidMount() {
    let { id } = this.props;
    this.iframe = globalWindow.document.getElementById(id);
  }
  shouldComponentUpdate(nextProps) {
    let { scale } = nextProps;
    return scale !== this.props.scale && this.setIframeBodyStyle({ width: `${scale * 100}%`, height: `${scale * 100}%`, transform: `scale(${1 / scale})`, transformOrigin: "top left" }), false;
  }
  setIframeBodyStyle(style) {
    return Object.assign(this.iframe.contentDocument.body.style, style);
  }
  render() {
    let { id, title, src, allowFullScreen, scale, ...rest } = this.props;
    return import_react.default.createElement("iframe", { id, title, src, ...allowFullScreen ? { allow: "fullscreen" } : {}, loading: "lazy", ...rest });
  }
};
var { PREVIEW_URL } = import_global.global;
var BASE_URL = PREVIEW_URL || "iframe.html";
var storyBlockIdFromId = ({ story, primary }) => `story--${story.id}${primary ? "--primary" : ""}`;
var InlineStory = (props) => {
  let storyRef = (0, import_react.useRef)(), [showLoader, setShowLoader] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)(), { story, height, autoplay, forceInitialArgs, renderStoryToElement } = props;
  return (0, import_react.useEffect)(() => {
    if (!(story && storyRef.current))
      return () => {
      };
    let element = storyRef.current, cleanup = renderStoryToElement(story, element, { showMain: () => {
    }, showError: ({ title, description }) => setError(new Error(`${title} - ${description}`)), showException: (err) => setError(err) }, { autoplay, forceInitialArgs });
    return setShowLoader(false), () => {
      Promise.resolve().then(() => cleanup());
    };
  }, [autoplay, renderStoryToElement, story]), error ? import_react.default.createElement("pre", null, import_react.default.createElement(ErrorFormatter, { error })) : import_react.default.createElement(import_react.default.Fragment, null, height ? import_react.default.createElement("style", null, `#${storyBlockIdFromId(props)} { min-height: ${height}; transform: translateZ(0); overflow: auto }`) : null, showLoader && import_react.default.createElement(StorySkeleton, null), import_react.default.createElement("div", { ref: storyRef, id: `${storyBlockIdFromId(props)}-inner`, "data-name": story.name }));
};
var IFrameStory = ({ story, height = "500px" }) => import_react.default.createElement("div", { style: { width: "100%", height } }, import_react.default.createElement(ZoomContext.Consumer, null, ({ scale }) => import_react.default.createElement(IFrame, { key: "iframe", id: `iframe--${story.id}`, title: story.name, src: getStoryHref(BASE_URL, story.id, { viewMode: "story" }), allowFullScreen: true, scale, style: { width: "100%", height: "100%", border: "0 none" } })));
var Story = (props) => {
  let { inline } = props;
  return import_react.default.createElement("div", { id: storyBlockIdFromId(props), className: "sb-story sb-unstyled", "data-story-block": "true" }, inline ? import_react.default.createElement(InlineStory, { ...props }) : import_react.default.createElement(IFrameStory, { ...props }));
};
var StorySkeleton = () => import_react.default.createElement(Loader, null);
var ChildrenContainer = newStyled.div(({ isColumn, columns, layout }) => ({ display: isColumn || !columns ? "block" : "flex", position: "relative", flexWrap: "wrap", overflow: "auto", flexDirection: isColumn ? "column" : "row", "& .innerZoomElementWrapper > *": isColumn ? { width: layout !== "fullscreen" ? "calc(100% - 20px)" : "100%", display: "block" } : { maxWidth: layout !== "fullscreen" ? "calc(100% - 20px)" : "100%", display: "inline-block" } }), ({ layout = "padded" }) => layout === "centered" || layout === "padded" ? { padding: "30px 20px", "& .innerZoomElementWrapper > *": { width: "auto", border: "10px solid transparent!important" } } : {}, ({ layout = "padded" }) => layout === "centered" ? { display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" } : {}, ({ columns }) => columns && columns > 1 ? { ".innerZoomElementWrapper > *": { minWidth: `calc(100% / ${columns} - 20px)` } } : {});
var StyledSource = newStyled(Source)(({ theme }) => ({ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: theme.appBorderRadius, borderBottomRightRadius: theme.appBorderRadius, border: "none", background: theme.base === "light" ? "rgba(0, 0, 0, 0.85)" : curriedDarken$1(0.05, theme.background.content), color: theme.color.lightest, button: { background: theme.base === "light" ? "rgba(0, 0, 0, 0.85)" : curriedDarken$1(0.05, theme.background.content) } }));
var PreviewContainer = newStyled.div(({ theme, withSource, isExpanded }) => ({ position: "relative", overflow: "hidden", margin: "25px 0 40px", ...getBlockBackgroundStyle(theme), borderBottomLeftRadius: withSource && isExpanded && 0, borderBottomRightRadius: withSource && isExpanded && 0, borderBottomWidth: isExpanded && 0, "h3 + &": { marginTop: "16px" } }), ({ withToolbar }) => withToolbar && { paddingTop: 40 });
var getSource = (withSource, expanded, setExpanded) => {
  switch (true) {
    case !!(withSource && withSource.error):
      return { source: null, actionItem: { title: "No code available", className: "docblock-code-toggle docblock-code-toggle--disabled", disabled: true, onClick: () => setExpanded(false) } };
    case expanded:
      return { source: import_react.default.createElement(StyledSource, { ...withSource, dark: true }), actionItem: { title: "Hide code", className: "docblock-code-toggle docblock-code-toggle--expanded", onClick: () => setExpanded(false) } };
    default:
      return { source: import_react.default.createElement(StyledSource, { ...withSource, dark: true }), actionItem: { title: "Show code", className: "docblock-code-toggle", onClick: () => setExpanded(true) } };
  }
};
function getStoryId(children) {
  if (import_react.Children.count(children) === 1) {
    let elt = children;
    if (elt.props)
      return elt.props.id;
  }
  return null;
}
var PositionedToolbar = newStyled(Toolbar)({ position: "absolute", top: 0, left: 0, right: 0, height: 40 });
var Relative = newStyled.div({ overflow: "hidden", position: "relative" });
var Preview = ({ isLoading, isColumn, columns, children, withSource, withToolbar = false, isExpanded = false, additionalActions, className, layout = "padded", ...props }) => {
  let [expanded, setExpanded] = (0, import_react.useState)(isExpanded), { source, actionItem } = getSource(withSource, expanded, setExpanded), [scale, setScale] = (0, import_react.useState)(1), previewClasses = [className].concat(["sbdocs", "sbdocs-preview", "sb-unstyled"]), defaultActionItems = withSource ? [actionItem] : [], [additionalActionItems, setAdditionalActionItems] = (0, import_react.useState)(additionalActions ? [...additionalActions] : []), actionItems = [...defaultActionItems, ...additionalActionItems], { window: globalWindow4 } = import_global.global, copyToClipboard = (0, import_react.useCallback)(async (text) => {
    let { createCopyToClipboardFunction } = await import("./dist-56GWQAPK.js");
    createCopyToClipboardFunction();
  }, []), onCopyCapture = (e) => {
    let selection = globalWindow4.getSelection();
    selection && selection.type === "Range" || (e.preventDefault(), additionalActionItems.filter((item) => item.title === "Copied").length === 0 && copyToClipboard(source.props.code).then(() => {
      setAdditionalActionItems([...additionalActionItems, { title: "Copied", onClick: () => {
      } }]), globalWindow4.setTimeout(() => setAdditionalActionItems(additionalActionItems.filter((item) => item.title !== "Copied")), 1500);
    }));
  };
  return import_react.default.createElement(PreviewContainer, { withSource, withToolbar, ...props, className: previewClasses.join(" ") }, withToolbar && import_react.default.createElement(PositionedToolbar, { isLoading, border: true, zoom: (z) => setScale(scale * z), resetZoom: () => setScale(1), storyId: getStoryId(children), baseUrl: "./iframe.html" }), import_react.default.createElement(ZoomContext.Provider, { value: { scale } }, import_react.default.createElement(Relative, { className: "docs-story", onCopyCapture: withSource && onCopyCapture }, import_react.default.createElement(ChildrenContainer, { isColumn: isColumn || !Array.isArray(children), columns, layout }, import_react.default.createElement(Zoom.Element, { scale }, Array.isArray(children) ? children.map((child, i) => import_react.default.createElement("div", { key: i }, child)) : import_react.default.createElement("div", null, children))), import_react.default.createElement(ActionBar, { actionItems }))), withSource && expanded && source);
};
newStyled(Preview)(() => ({ ".docs-story": { paddingTop: 32, paddingBottom: 40 } }));
var Table = newStyled.table(({ theme }) => ({ "&&": { borderCollapse: "collapse", borderSpacing: 0, border: "none", tr: { border: "none !important", background: "none" }, "td, th": { padding: 0, border: "none", width: "auto!important" }, marginTop: 0, marginBottom: 0, "th:first-of-type, td:first-of-type": { paddingLeft: 0 }, "th:last-of-type, td:last-of-type": { paddingRight: 0 }, td: { paddingTop: 0, paddingBottom: 4, "&:not(:first-of-type)": { paddingLeft: 10, paddingRight: 0 } }, tbody: { boxShadow: "none", border: "none" }, code: codeCommon({ theme }), div: { span: { fontWeight: "bold" } }, "& code": { margin: 0, display: "inline-block", fontSize: theme.typography.size.s1 } } }));
var ArgJsDoc = ({ tags }) => {
  let params = (tags.params || []).filter((x) => x.description), hasDisplayableParams = params.length !== 0, hasDisplayableDeprecated = tags.deprecated != null, hasDisplayableReturns = tags.returns != null && tags.returns.description != null;
  return !hasDisplayableParams && !hasDisplayableReturns && !hasDisplayableDeprecated ? null : import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(Table, null, import_react.default.createElement("tbody", null, hasDisplayableDeprecated && import_react.default.createElement("tr", { key: "deprecated" }, import_react.default.createElement("td", { colSpan: 2 }, import_react.default.createElement("strong", null, "Deprecated"), ": ", tags.deprecated.toString())), hasDisplayableParams && params.map((x) => import_react.default.createElement("tr", { key: x.name }, import_react.default.createElement("td", null, import_react.default.createElement("code", null, x.name)), import_react.default.createElement("td", null, x.description))), hasDisplayableReturns && import_react.default.createElement("tr", { key: "returns" }, import_react.default.createElement("td", null, import_react.default.createElement("code", null, "Returns")), import_react.default.createElement("td", null, tags.returns.description)))));
};
var ITEMS_BEFORE_EXPANSION = 8;
var Summary = newStyled.div(({ isExpanded }) => ({ display: "flex", flexDirection: isExpanded ? "column" : "row", flexWrap: "wrap", alignItems: "flex-start", marginBottom: "-4px", minWidth: 100 }));
var Text = newStyled.span(codeCommon, ({ theme, simple = false }) => ({ flex: "0 0 auto", fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.size.s1, wordBreak: "break-word", whiteSpace: "normal", maxWidth: "100%", margin: 0, marginRight: "4px", marginBottom: "4px", paddingTop: "2px", paddingBottom: "2px", lineHeight: "13px", ...simple && { background: "transparent", border: "0 none", paddingLeft: 0 } }));
var ExpandButton = newStyled.button(({ theme }) => ({ fontFamily: theme.typography.fonts.mono, color: theme.color.secondary, marginBottom: "4px", background: "none", border: "none" }));
var Expandable = newStyled.div(codeCommon, ({ theme }) => ({ fontFamily: theme.typography.fonts.mono, color: theme.color.secondary, fontSize: theme.typography.size.s1, margin: 0, whiteSpace: "nowrap", display: "flex", alignItems: "center" }));
var Detail = newStyled.div(({ theme, width }) => ({ width, minWidth: 200, maxWidth: 800, padding: 15, fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.size.s1, boxSizing: "content-box", "& code": { padding: "0 !important" } }));
var ChevronUpIcon = newStyled(ChevronSmallUpIcon)({ marginLeft: 4 });
var ChevronDownIcon2 = newStyled(ChevronSmallDownIcon)({ marginLeft: 4 });
var EmptyArg = () => import_react.default.createElement("span", null, "-");
var ArgText = ({ text, simple }) => import_react.default.createElement(Text, { simple }, text);
var calculateDetailWidth = (0, import_memoizerific.default)(1e3)((detail) => {
  let lines = detail.split(/\r?\n/);
  return `${Math.max(...lines.map((x) => x.length))}ch`;
});
var getSummaryItems = (summary) => {
  if (!summary)
    return [summary];
  let summaryItems = summary.split("|").map((value2) => value2.trim());
  return (0, import_uniq.default)(summaryItems);
};
var renderSummaryItems = (summaryItems, isExpanded = true) => {
  let items = summaryItems;
  return isExpanded || (items = summaryItems.slice(0, ITEMS_BEFORE_EXPANSION)), items.map((item) => import_react.default.createElement(ArgText, { key: item, text: item === "" ? '""' : item }));
};
var ArgSummary = ({ value: value2, initialExpandedArgs }) => {
  let { summary, detail } = value2, [isOpen, setIsOpen] = (0, import_react.useState)(false), [isExpanded, setIsExpanded] = (0, import_react.useState)(initialExpandedArgs || false);
  if (summary == null)
    return null;
  let summaryAsString = typeof summary.toString == "function" ? summary.toString() : summary;
  if (detail == null) {
    if (/[(){}[\]<>]/.test(summaryAsString))
      return import_react.default.createElement(ArgText, { text: summaryAsString });
    let summaryItems = getSummaryItems(summaryAsString), itemsCount = summaryItems.length;
    return itemsCount > ITEMS_BEFORE_EXPANSION ? import_react.default.createElement(Summary, { isExpanded }, renderSummaryItems(summaryItems, isExpanded), import_react.default.createElement(ExpandButton, { onClick: () => setIsExpanded(!isExpanded) }, isExpanded ? "Show less..." : `Show ${itemsCount - ITEMS_BEFORE_EXPANSION} more...`)) : import_react.default.createElement(Summary, null, renderSummaryItems(summaryItems));
  }
  return import_react.default.createElement(WithTooltipPure, { closeOnOutsideClick: true, placement: "bottom", visible: isOpen, onVisibleChange: (isVisible) => {
    setIsOpen(isVisible);
  }, tooltip: import_react.default.createElement(Detail, { width: calculateDetailWidth(detail) }, import_react.default.createElement(SyntaxHighlighter2, { language: "jsx", format: false }, detail)) }, import_react.default.createElement(Expandable, { className: "sbdocs-expandable" }, import_react.default.createElement("span", null, summaryAsString), isOpen ? import_react.default.createElement(ChevronUpIcon, null) : import_react.default.createElement(ChevronDownIcon2, null)));
};
var ArgValue = ({ value: value2, initialExpandedArgs }) => value2 == null ? import_react.default.createElement(EmptyArg, null) : import_react.default.createElement(ArgSummary, { value: value2, initialExpandedArgs });
var Label = newStyled.label(({ theme }) => ({ lineHeight: "18px", alignItems: "center", marginBottom: 8, display: "inline-block", position: "relative", whiteSpace: "nowrap", background: theme.boolean.background, borderRadius: "3em", padding: 1, input: { appearance: "none", width: "100%", height: "100%", position: "absolute", left: 0, top: 0, margin: 0, padding: 0, border: "none", background: "transparent", cursor: "pointer", borderRadius: "3em", "&:focus": { outline: "none", boxShadow: `${theme.color.secondary} 0 0 0 1px inset !important` } }, span: { textAlign: "center", fontSize: theme.typography.size.s1, fontWeight: theme.typography.weight.bold, lineHeight: "1", cursor: "pointer", display: "inline-block", padding: "7px 15px", transition: "all 100ms ease-out", userSelect: "none", borderRadius: "3em", color: curriedTransparentize$1(0.5, theme.color.defaultText), background: "transparent", "&:hover": { boxShadow: `${curriedOpacify$1(0.3, theme.appBorderColor)} 0 0 0 1px inset` }, "&:active": { boxShadow: `${curriedOpacify$1(0.05, theme.appBorderColor)} 0 0 0 2px inset`, color: curriedOpacify$1(1, theme.appBorderColor) }, "&:first-of-type": { paddingRight: 8 }, "&:last-of-type": { paddingLeft: 8 } }, "input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type": { background: theme.boolean.selectedBackground, boxShadow: theme.base === "light" ? `${curriedOpacify$1(0.1, theme.appBorderColor)} 0 0 2px` : `${theme.appBorderColor} 0 0 0 1px`, color: theme.color.defaultText, padding: "7px 15px" } }));
var parse = (value2) => value2 === "true";
var BooleanControl = ({ name, value: value2, onChange, onBlur, onFocus }) => {
  let onSetFalse = (0, import_react.useCallback)(() => onChange(false), [onChange]);
  if (value2 === void 0)
    return import_react.default.createElement(Button, { variant: "outline", size: "medium", id: getControlSetterButtonId(name), onClick: onSetFalse }, "Set boolean");
  let controlId = getControlId(name), parsedValue = typeof value2 == "string" ? parse(value2) : value2;
  return import_react.default.createElement(Label, { htmlFor: controlId, "aria-label": name }, import_react.default.createElement("input", { id: controlId, type: "checkbox", onChange: (e) => onChange(e.target.checked), checked: parsedValue, role: "switch", name, onBlur, onFocus }), import_react.default.createElement("span", { "aria-hidden": "true" }, "False"), import_react.default.createElement("span", { "aria-hidden": "true" }, "True"));
};
var parseDate = (value2) => {
  let [year, month, day] = value2.split("-"), result = /* @__PURE__ */ new Date();
  return result.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)), result;
};
var parseTime = (value2) => {
  let [hours, minutes] = value2.split(":"), result = /* @__PURE__ */ new Date();
  return result.setHours(parseInt(hours, 10)), result.setMinutes(parseInt(minutes, 10)), result;
};
var formatDate = (value2) => {
  let date = new Date(value2), year = `000${date.getFullYear()}`.slice(-4), month = `0${date.getMonth() + 1}`.slice(-2), day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};
var formatTime = (value2) => {
  let date = new Date(value2), hours = `0${date.getHours()}`.slice(-2), minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
};
var FlexSpaced = newStyled.div(({ theme }) => ({ flex: 1, display: "flex", input: { marginLeft: 10, flex: 1, height: 32, "&::-webkit-calendar-picker-indicator": { opacity: 0.5, height: 12, filter: theme.base === "light" ? void 0 : "invert(1)" } }, "input:first-of-type": { marginLeft: 0, flexGrow: 4 }, "input:last-of-type": { flexGrow: 3 } }));
var DateControl = ({ name, value: value2, onChange, onFocus, onBlur }) => {
  let [valid, setValid] = (0, import_react.useState)(true), dateRef = (0, import_react.useRef)(), timeRef = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    valid !== false && (dateRef && dateRef.current && (dateRef.current.value = formatDate(value2)), timeRef && timeRef.current && (timeRef.current.value = formatTime(value2)));
  }, [value2]);
  let onDateChange = (e) => {
    let parsed = parseDate(e.target.value), result = new Date(value2);
    result.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    let time = result.getTime();
    time && onChange(time), setValid(!!time);
  }, onTimeChange = (e) => {
    let parsed = parseTime(e.target.value), result = new Date(value2);
    result.setHours(parsed.getHours()), result.setMinutes(parsed.getMinutes());
    let time = result.getTime();
    time && onChange(time), setValid(!!time);
  }, controlId = getControlId(name);
  return import_react.default.createElement(FlexSpaced, null, import_react.default.createElement(Form.Input, { type: "date", max: "9999-12-31", ref: dateRef, id: `${controlId}-date`, name: `${controlId}-date`, onChange: onDateChange, onFocus, onBlur }), import_react.default.createElement(Form.Input, { type: "time", id: `${controlId}-time`, name: `${controlId}-time`, ref: timeRef, onChange: onTimeChange, onFocus, onBlur }), valid ? null : import_react.default.createElement("div", null, "invalid"));
};
var Wrapper3 = newStyled.label({ display: "flex" });
var parse2 = (value2) => {
  let result = parseFloat(value2);
  return Number.isNaN(result) ? void 0 : result;
};
var format = (value2) => value2 != null ? String(value2) : "";
var NumberControl = ({ name, value: value2, onChange, min, max, step, onBlur, onFocus }) => {
  let [inputValue, setInputValue] = (0, import_react.useState)(typeof value2 == "number" ? value2 : ""), [forceVisible, setForceVisible] = (0, import_react.useState)(false), [parseError, setParseError] = (0, import_react.useState)(null), handleChange = (0, import_react.useCallback)((event) => {
    setInputValue(event.target.value);
    let result = parseFloat(event.target.value);
    Number.isNaN(result) ? setParseError(new Error(`'${event.target.value}' is not a number`)) : (onChange(result), setParseError(null));
  }, [onChange, setParseError]), onForceVisible = (0, import_react.useCallback)(() => {
    setInputValue("0"), onChange(0), setForceVisible(true);
  }, [setForceVisible]), htmlElRef = (0, import_react.useRef)(null);
  return (0, import_react.useEffect)(() => {
    forceVisible && htmlElRef.current && htmlElRef.current.select();
  }, [forceVisible]), (0, import_react.useEffect)(() => {
    inputValue !== (typeof value2 == "number" ? value2 : "") && setInputValue(value2);
  }, [value2]), !forceVisible && value2 === void 0 ? import_react.default.createElement(Button, { variant: "outline", size: "medium", id: getControlSetterButtonId(name), onClick: onForceVisible }, "Set number") : import_react.default.createElement(Wrapper3, null, import_react.default.createElement(Form.Input, { ref: htmlElRef, id: getControlId(name), type: "number", onChange: handleChange, size: "flex", placeholder: "Edit number...", value: inputValue, valid: parseError ? "error" : null, autoFocus: forceVisible, name, min, max, step, onFocus, onBlur }));
};
var selectedKey = (value2, options) => {
  let entry = options && Object.entries(options).find(([_key, val]) => val === value2);
  return entry ? entry[0] : void 0;
};
var selectedKeys = (value2, options) => value2 && options ? Object.entries(options).filter((entry) => value2.includes(entry[1])).map((entry) => entry[0]) : [];
var selectedValues = (keys, options) => keys && options && keys.map((key) => options[key]);
var Wrapper4 = newStyled.div(({ isInline }) => isInline ? { display: "flex", flexWrap: "wrap", alignItems: "flex-start", label: { display: "inline-flex", marginRight: 15 } } : { label: { display: "flex" } });
var Text2 = newStyled.span({});
var Label2 = newStyled.label({ lineHeight: "20px", alignItems: "center", marginBottom: 8, "&:last-child": { marginBottom: 0 }, input: { margin: 0, marginRight: 6 } });
var CheckboxControl = ({ name, options, value: value2, onChange, isInline }) => {
  if (!options)
    return import_client_logger.logger.warn(`Checkbox with no options: ${name}`), import_react.default.createElement(import_react.default.Fragment, null, "-");
  let initial = selectedKeys(value2, options), [selected, setSelected] = (0, import_react.useState)(initial), handleChange = (e) => {
    let option = e.target.value, updated = [...selected];
    updated.includes(option) ? updated.splice(updated.indexOf(option), 1) : updated.push(option), onChange(selectedValues(updated, options)), setSelected(updated);
  };
  (0, import_react.useEffect)(() => {
    setSelected(selectedKeys(value2, options));
  }, [value2]);
  let controlId = getControlId(name);
  return import_react.default.createElement(Wrapper4, { isInline }, Object.keys(options).map((key, index) => {
    let id = `${controlId}-${index}`;
    return import_react.default.createElement(Label2, { key: id, htmlFor: id }, import_react.default.createElement("input", { type: "checkbox", id, name: id, value: key, onChange: handleChange, checked: selected == null ? void 0 : selected.includes(key) }), import_react.default.createElement(Text2, null, key));
  }));
};
var Wrapper5 = newStyled.div(({ isInline }) => isInline ? { display: "flex", flexWrap: "wrap", alignItems: "flex-start", label: { display: "inline-flex", marginRight: 15 } } : { label: { display: "flex" } });
var Text3 = newStyled.span({});
var Label3 = newStyled.label({ lineHeight: "20px", alignItems: "center", marginBottom: 8, "&:last-child": { marginBottom: 0 }, input: { margin: 0, marginRight: 6 } });
var RadioControl = ({ name, options, value: value2, onChange, isInline }) => {
  if (!options)
    return import_client_logger.logger.warn(`Radio with no options: ${name}`), import_react.default.createElement(import_react.default.Fragment, null, "-");
  let selection = selectedKey(value2, options), controlId = getControlId(name);
  return import_react.default.createElement(Wrapper5, { isInline }, Object.keys(options).map((key, index) => {
    let id = `${controlId}-${index}`;
    return import_react.default.createElement(Label3, { key: id, htmlFor: id }, import_react.default.createElement("input", { type: "radio", id, name: id, value: key, onChange: (e) => onChange(options[e.currentTarget.value]), checked: key === selection }), import_react.default.createElement(Text3, null, key));
  }));
};
var styleResets = { appearance: "none", border: "0 none", boxSizing: "inherit", display: " block", margin: " 0", background: "transparent", padding: 0, fontSize: "inherit", position: "relative" };
var OptionsSelect = newStyled.select(styleResets, ({ theme }) => ({ boxSizing: "border-box", position: "relative", padding: "6px 10px", width: "100%", color: theme.input.color || "inherit", background: theme.input.background, borderRadius: theme.input.borderRadius, boxShadow: `${theme.input.border} 0 0 0 1px inset`, fontSize: theme.typography.size.s2 - 1, lineHeight: "20px", "&:focus": { boxShadow: `${theme.color.secondary} 0 0 0 1px inset`, outline: "none" }, "&[disabled]": { cursor: "not-allowed", opacity: 0.5 }, "::placeholder": { color: theme.textMutedColor }, "&[multiple]": { overflow: "auto", padding: 0, option: { display: "block", padding: "6px 10px", marginLeft: 1, marginRight: 1 } } }));
var SelectWrapper = newStyled.span(({ theme }) => ({ display: "inline-block", lineHeight: "normal", overflow: "hidden", position: "relative", verticalAlign: "top", width: "100%", svg: { position: "absolute", zIndex: 1, pointerEvents: "none", height: "12px", marginTop: "-6px", right: "12px", top: "50%", fill: theme.textMutedColor, path: { fill: theme.textMutedColor } } }));
var NO_SELECTION = "Choose option...";
var SingleSelect = ({ name, value: value2, options, onChange }) => {
  let handleChange = (e) => {
    onChange(options[e.currentTarget.value]);
  }, selection = selectedKey(value2, options) || NO_SELECTION, controlId = getControlId(name);
  return import_react.default.createElement(SelectWrapper, null, import_react.default.createElement(ChevronSmallDownIcon, null), import_react.default.createElement(OptionsSelect, { id: controlId, value: selection, onChange: handleChange }, import_react.default.createElement("option", { key: "no-selection", disabled: true }, NO_SELECTION), Object.keys(options).map((key) => import_react.default.createElement("option", { key, value: key }, key))));
};
var MultiSelect = ({ name, value: value2, options, onChange }) => {
  let handleChange = (e) => {
    let selection2 = Array.from(e.currentTarget.options).filter((option) => option.selected).map((option) => option.value);
    onChange(selectedValues(selection2, options));
  }, selection = selectedKeys(value2, options), controlId = getControlId(name);
  return import_react.default.createElement(SelectWrapper, null, import_react.default.createElement(OptionsSelect, { id: controlId, multiple: true, value: selection, onChange: handleChange }, Object.keys(options).map((key) => import_react.default.createElement("option", { key, value: key }, key))));
};
var SelectControl = (props) => {
  let { name, options } = props;
  return options ? props.isMulti ? import_react.default.createElement(MultiSelect, { ...props }) : import_react.default.createElement(SingleSelect, { ...props }) : (import_client_logger.logger.warn(`Select with no options: ${name}`), import_react.default.createElement(import_react.default.Fragment, null, "-"));
};
var normalizeOptions = (options, labels) => Array.isArray(options) ? options.reduce((acc, item) => (acc[(labels == null ? void 0 : labels[item]) || String(item)] = item, acc), {}) : options;
var Controls = { check: CheckboxControl, "inline-check": CheckboxControl, radio: RadioControl, "inline-radio": RadioControl, select: SelectControl, "multi-select": SelectControl };
var OptionsControl = (props) => {
  let { type = "select", labels, argType } = props, normalized = { ...props, options: argType ? normalizeOptions(argType.options, labels) : {}, isInline: type.includes("inline"), isMulti: type.includes("multi") }, Control = Controls[type];
  if (Control)
    return import_react.default.createElement(Control, { ...normalized });
  throw new Error(`Unknown options type: ${type}`);
};
var VALUE = "value";
var KEY = "key";
var ERROR = "Error";
var OBJECT = "Object";
var ARRAY = "Array";
var STRING = "String";
var NUMBER = "Number";
var BOOLEAN = "Boolean";
var DATE = "Date";
var NULL = "Null";
var UNDEFINED = "Undefined";
var FUNCTION = "Function";
var SYMBOL = "Symbol";
var ADD_DELTA_TYPE = "ADD_DELTA_TYPE";
var REMOVE_DELTA_TYPE = "REMOVE_DELTA_TYPE";
var UPDATE_DELTA_TYPE = "UPDATE_DELTA_TYPE";
function getObjectType(obj) {
  return obj !== null && typeof obj == "object" && !Array.isArray(obj) && typeof obj[Symbol.iterator] == "function" ? "Iterable" : Object.prototype.toString.call(obj).slice(8, -1);
}
function isComponentWillChange(oldValue, newValue) {
  let oldType = getObjectType(oldValue), newType = getObjectType(newValue);
  return (oldType === "Function" || newType === "Function") && newType !== oldType;
}
var JsonAddValue = class extends import_react.Component {
  constructor(props) {
    super(props), this.state = { inputRefKey: null, inputRefValue: null }, this.refInputValue = this.refInputValue.bind(this), this.refInputKey = this.refInputKey.bind(this), this.onKeydown = this.onKeydown.bind(this), this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    let { inputRefKey, inputRefValue } = this.state, { onlyValue } = this.props;
    inputRefKey && typeof inputRefKey.focus == "function" && inputRefKey.focus(), onlyValue && inputRefValue && typeof inputRefValue.focus == "function" && inputRefValue.focus(), document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(event) {
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.onSubmit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.props.handleCancel()));
  }
  onSubmit() {
    let { handleAdd, onlyValue, onSubmitValueParser, keyPath, deep } = this.props, { inputRefKey, inputRefValue } = this.state, result = {};
    if (!onlyValue) {
      if (!inputRefKey.value)
        return;
      result.key = inputRefKey.value;
    }
    result.newValue = onSubmitValueParser(false, keyPath, deep, result.key, inputRefValue.value), handleAdd(result);
  }
  refInputKey(node) {
    this.state.inputRefKey = node;
  }
  refInputValue(node) {
    this.state.inputRefValue = node;
  }
  render() {
    let { handleCancel, onlyValue, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep } = this.props, addButtonElementLayout = (0, import_react.cloneElement)(addButtonElement, { onClick: this.onSubmit }), cancelButtonElementLayout = (0, import_react.cloneElement)(cancelButtonElement, { onClick: handleCancel }), inputElementValue = inputElementGenerator(VALUE, keyPath, deep), inputElementValueLayout = (0, import_react.cloneElement)(inputElementValue, { placeholder: "Value", ref: this.refInputValue }), inputElementKeyLayout = null;
    if (!onlyValue) {
      let inputElementKey = inputElementGenerator(KEY, keyPath, deep);
      inputElementKeyLayout = (0, import_react.cloneElement)(inputElementKey, { placeholder: "Key", ref: this.refInputKey });
    }
    return import_react.default.createElement("span", { className: "rejt-add-value-node" }, inputElementKeyLayout, inputElementValueLayout, cancelButtonElementLayout, addButtonElementLayout);
  }
};
JsonAddValue.defaultProps = { onlyValue: false, addButtonElement: import_react.default.createElement("button", null, "+"), cancelButtonElement: import_react.default.createElement("button", null, "c") };
var JsonArray = class extends import_react.Component {
  constructor(props) {
    super(props);
    let keyPath = [...props.keyPath, props.name];
    this.state = { data: props.data, name: props.name, keyPath, deep: props.deep, nextDeep: props.deep + 1, collapsed: props.isCollapsed(keyPath, props.deep, props.data), addFormVisible: false }, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveItem = this.handleRemoveItem.bind(this), this.handleAddMode = this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed = this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? { data: props.data } : null;
  }
  onChildUpdate(childKey, childData) {
    let { data, keyPath } = this.state;
    data[childKey] = childData, this.setState({ data });
    let { onUpdate } = this.props, size = keyPath.length;
    onUpdate(keyPath[size - 1], data);
  }
  handleAddMode() {
    this.setState({ addFormVisible: true });
  }
  handleCollapseMode() {
    this.setState((state) => ({ collapsed: !state.collapsed }));
  }
  handleRemoveItem(index) {
    return () => {
      let { beforeRemoveAction, logger: logger4 } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[index];
      beforeRemoveAction(index, keyPath, deep, oldValue).then(() => {
        let deltaUpdateResult = { keyPath, deep, key: index, oldValue, type: REMOVE_DELTA_TYPE };
        data.splice(index, 1), this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate(deltaUpdateResult);
      }).catch(logger4.error);
    };
  }
  handleAddValueAdd({ newValue }) {
    let { data, keyPath, nextDeep: deep } = this.state, { beforeAddAction, logger: logger4 } = this.props;
    beforeAddAction(data.length, keyPath, deep, newValue).then(() => {
      let newData = [...data, newValue];
      this.setState({ data: newData }), this.handleAddValueCancel();
      let { onUpdate, onDeltaUpdate } = this.props;
      onUpdate(keyPath[keyPath.length - 1], newData), onDeltaUpdate({ type: ADD_DELTA_TYPE, keyPath, deep, key: newData.length - 1, newValue });
    }).catch(logger4.error);
  }
  handleAddValueCancel() {
    this.setState({ addFormVisible: false });
  }
  handleEditValue({ key, value: value2 }) {
    return new Promise((resolve, reject) => {
      let { beforeUpdateAction } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[key];
      beforeUpdateAction(key, keyPath, deep, oldValue, value2).then(() => {
        data[key] = value2, this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: UPDATE_DELTA_TYPE, keyPath, deep, key, newValue: value2, oldValue }), resolve(void 0);
      }).catch(reject);
    });
  }
  renderCollapsed() {
    let { name, data, keyPath, deep } = this.state, { handleRemove, readOnly, getStyle, dataType, minusMenuElement } = this.props, { minus, collapsed } = getStyle(name, data, keyPath, deep, dataType), isReadOnly = readOnly(name, data, keyPath, deep, dataType), removeItemButton = (0, import_react.cloneElement)(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus });
    return import_react.default.createElement("span", { className: "rejt-collapsed" }, import_react.default.createElement("span", { className: "rejt-collapsed-text", style: collapsed, onClick: this.handleCollapseMode }, "[...] ", data.length, " ", data.length === 1 ? "item" : "items"), !isReadOnly && removeItemButton);
  }
  renderNotCollapsed() {
    let { name, data, keyPath, deep, addFormVisible, nextDeep } = this.state, { isCollapsed, handleRemove, onDeltaUpdate, readOnly, getStyle, dataType, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser } = this.props, { minus, plus, delimiter, ul, addForm } = getStyle(name, data, keyPath, deep, dataType), isReadOnly = readOnly(name, data, keyPath, deep, dataType), addItemButton = (0, import_react.cloneElement)(plusMenuElement, { onClick: this.handleAddMode, className: "rejt-plus-menu", style: plus }), removeItemButton = (0, import_react.cloneElement)(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus });
    return import_react.default.createElement("span", { className: "rejt-not-collapsed" }, import_react.default.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "["), !addFormVisible && addItemButton, import_react.default.createElement("ul", { className: "rejt-not-collapsed-list", style: ul }, data.map((item, index) => import_react.default.createElement(JsonNode, { key: index, name: index.toString(), data: item, keyPath, deep: nextDeep, isCollapsed, handleRemove: this.handleRemoveItem(index), handleUpdateValue: this.handleEditValue, onUpdate: this.onChildUpdate, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser }))), !isReadOnly && addFormVisible && import_react.default.createElement("div", { className: "rejt-add-form", style: addForm }, import_react.default.createElement(JsonAddValue, { handleAdd: this.handleAddValueAdd, handleCancel: this.handleAddValueCancel, onlyValue: true, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep, onSubmitValueParser })), import_react.default.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "]"), !isReadOnly && removeItemButton);
  }
  render() {
    let { name, collapsed, data, keyPath, deep } = this.state, { dataType, getStyle } = this.props, value2 = collapsed ? this.renderCollapsed() : this.renderNotCollapsed(), style = getStyle(name, data, keyPath, deep, dataType);
    return import_react.default.createElement("div", { className: "rejt-array-node" }, import_react.default.createElement("span", { onClick: this.handleCollapseMode }, import_react.default.createElement("span", { className: "rejt-name", style: style.name }, name, " :", " ")), value2);
  }
};
JsonArray.defaultProps = { keyPath: [], deep: 0, minusMenuElement: import_react.default.createElement("span", null, " - "), plusMenuElement: import_react.default.createElement("span", null, " + ") };
var JsonFunctionValue = class extends import_react.Component {
  constructor(props) {
    super(props);
    let keyPath = [...props.keyPath, props.name];
    this.state = { value: props.value, name: props.name, keyPath, deep: props.deep, editEnabled: false, inputRef: null }, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.value !== state.value ? { value: props.value } : null;
  }
  componentDidUpdate() {
    let { editEnabled, inputRef, name, value: value2, keyPath, deep } = this.state, { readOnly, dataType } = this.props, readOnlyResult = readOnly(name, value2, keyPath, deep, dataType);
    editEnabled && !readOnlyResult && typeof inputRef.focus == "function" && inputRef.focus();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(event) {
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.handleEdit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let { handleUpdateValue, originalValue, logger: logger4, onSubmitValueParser, keyPath } = this.props, { inputRef, name, deep } = this.state;
    if (!inputRef)
      return;
    let newValue = onSubmitValueParser(true, keyPath, deep, name, inputRef.value);
    handleUpdateValue({ value: newValue, key: name }).then(() => {
      isComponentWillChange(originalValue, newValue) || this.handleCancelEdit();
    }).catch(logger4.error);
  }
  handleEditMode() {
    this.setState({ editEnabled: true });
  }
  refInput(node) {
    this.state.inputRef = node;
  }
  handleCancelEdit() {
    this.setState({ editEnabled: false });
  }
  render() {
    let { name, value: value2, editEnabled, keyPath, deep } = this.state, { handleRemove, originalValue, readOnly, dataType, getStyle, editButtonElement, cancelButtonElement, textareaElementGenerator, minusMenuElement, keyPath: comeFromKeyPath } = this.props, style = getStyle(name, originalValue, keyPath, deep, dataType), result = null, minusElement = null, resultOnlyResult = readOnly(name, originalValue, keyPath, deep, dataType);
    if (editEnabled && !resultOnlyResult) {
      let textareaElement = textareaElementGenerator(VALUE, comeFromKeyPath, deep, name, originalValue, dataType), editButtonElementLayout = (0, import_react.cloneElement)(editButtonElement, { onClick: this.handleEdit }), cancelButtonElementLayout = (0, import_react.cloneElement)(cancelButtonElement, { onClick: this.handleCancelEdit }), textareaElementLayout = (0, import_react.cloneElement)(textareaElement, { ref: this.refInput, defaultValue: originalValue });
      result = import_react.default.createElement("span", { className: "rejt-edit-form", style: style.editForm }, textareaElementLayout, " ", cancelButtonElementLayout, editButtonElementLayout), minusElement = null;
    } else {
      result = import_react.default.createElement("span", { className: "rejt-value", style: style.value, onClick: resultOnlyResult ? null : this.handleEditMode }, value2);
      let minusMenuLayout = (0, import_react.cloneElement)(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: style.minus });
      minusElement = resultOnlyResult ? null : minusMenuLayout;
    }
    return import_react.default.createElement("li", { className: "rejt-function-value-node", style: style.li }, import_react.default.createElement("span", { className: "rejt-name", style: style.name }, name, " :", " "), result, minusElement);
  }
};
JsonFunctionValue.defaultProps = { keyPath: [], deep: 0, handleUpdateValue: () => {
}, editButtonElement: import_react.default.createElement("button", null, "e"), cancelButtonElement: import_react.default.createElement("button", null, "c"), minusMenuElement: import_react.default.createElement("span", null, " - ") };
var JsonNode = class extends import_react.Component {
  constructor(props) {
    super(props), this.state = { data: props.data, name: props.name, keyPath: props.keyPath, deep: props.deep };
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? { data: props.data } : null;
  }
  render() {
    let { data, name, keyPath, deep } = this.state, { isCollapsed, handleRemove, handleUpdateValue, onUpdate, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser } = this.props, readOnlyTrue = () => true, dataType = getObjectType(data);
    switch (dataType) {
      case ERROR:
        return import_react.default.createElement(JsonObject, { data, name, isCollapsed, keyPath, deep, handleRemove, onUpdate, onDeltaUpdate, readOnly: readOnlyTrue, dataType, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser });
      case OBJECT:
        return import_react.default.createElement(JsonObject, { data, name, isCollapsed, keyPath, deep, handleRemove, onUpdate, onDeltaUpdate, readOnly, dataType, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser });
      case ARRAY:
        return import_react.default.createElement(JsonArray, { data, name, isCollapsed, keyPath, deep, handleRemove, onUpdate, onDeltaUpdate, readOnly, dataType, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser });
      case STRING:
        return import_react.default.createElement(JsonValue, { name, value: `"${data}"`, originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case NUMBER:
        return import_react.default.createElement(JsonValue, { name, value: data, originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case BOOLEAN:
        return import_react.default.createElement(JsonValue, { name, value: data ? "true" : "false", originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case DATE:
        return import_react.default.createElement(JsonValue, { name, value: data.toISOString(), originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly: readOnlyTrue, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case NULL:
        return import_react.default.createElement(JsonValue, { name, value: "null", originalValue: "null", keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case UNDEFINED:
        return import_react.default.createElement(JsonValue, { name, value: "undefined", originalValue: "undefined", keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case FUNCTION:
        return import_react.default.createElement(JsonFunctionValue, { name, value: data.toString(), originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly, dataType, getStyle, cancelButtonElement, editButtonElement, textareaElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      case SYMBOL:
        return import_react.default.createElement(JsonValue, { name, value: data.toString(), originalValue: data, keyPath, deep, handleRemove, handleUpdateValue, readOnly: readOnlyTrue, dataType, getStyle, cancelButtonElement, editButtonElement, inputElementGenerator, minusMenuElement, logger: logger4, onSubmitValueParser });
      default:
        return null;
    }
  }
};
JsonNode.defaultProps = { keyPath: [], deep: 0 };
var JsonObject = class extends import_react.Component {
  constructor(props) {
    super(props);
    let keyPath = props.deep === -1 ? [] : [...props.keyPath, props.name];
    this.state = { name: props.name, data: props.data, keyPath, deep: props.deep, nextDeep: props.deep + 1, collapsed: props.isCollapsed(keyPath, props.deep, props.data), addFormVisible: false }, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveValue = this.handleRemoveValue.bind(this), this.handleAddMode = this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed = this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? { data: props.data } : null;
  }
  onChildUpdate(childKey, childData) {
    let { data, keyPath } = this.state;
    data[childKey] = childData, this.setState({ data });
    let { onUpdate } = this.props, size = keyPath.length;
    onUpdate(keyPath[size - 1], data);
  }
  handleAddMode() {
    this.setState({ addFormVisible: true });
  }
  handleAddValueCancel() {
    this.setState({ addFormVisible: false });
  }
  handleAddValueAdd({ key, newValue }) {
    let { data, keyPath, nextDeep: deep } = this.state, { beforeAddAction, logger: logger4 } = this.props;
    beforeAddAction(key, keyPath, deep, newValue).then(() => {
      data[key] = newValue, this.setState({ data }), this.handleAddValueCancel();
      let { onUpdate, onDeltaUpdate } = this.props;
      onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: ADD_DELTA_TYPE, keyPath, deep, key, newValue });
    }).catch(logger4.error);
  }
  handleRemoveValue(key) {
    return () => {
      let { beforeRemoveAction, logger: logger4 } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[key];
      beforeRemoveAction(key, keyPath, deep, oldValue).then(() => {
        let deltaUpdateResult = { keyPath, deep, key, oldValue, type: REMOVE_DELTA_TYPE };
        delete data[key], this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate(deltaUpdateResult);
      }).catch(logger4.error);
    };
  }
  handleCollapseMode() {
    this.setState((state) => ({ collapsed: !state.collapsed }));
  }
  handleEditValue({ key, value: value2 }) {
    return new Promise((resolve, reject) => {
      let { beforeUpdateAction } = this.props, { data, keyPath, nextDeep: deep } = this.state, oldValue = data[key];
      beforeUpdateAction(key, keyPath, deep, oldValue, value2).then(() => {
        data[key] = value2, this.setState({ data });
        let { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data), onDeltaUpdate({ type: UPDATE_DELTA_TYPE, keyPath, deep, key, newValue: value2, oldValue }), resolve();
      }).catch(reject);
    });
  }
  renderCollapsed() {
    let { name, keyPath, deep, data } = this.state, { handleRemove, readOnly, dataType, getStyle, minusMenuElement } = this.props, { minus, collapsed } = getStyle(name, data, keyPath, deep, dataType), keyList = Object.getOwnPropertyNames(data), isReadOnly = readOnly(name, data, keyPath, deep, dataType), removeItemButton = (0, import_react.cloneElement)(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus });
    return import_react.default.createElement("span", { className: "rejt-collapsed" }, import_react.default.createElement("span", { className: "rejt-collapsed-text", style: collapsed, onClick: this.handleCollapseMode }, "{...}", " ", keyList.length, " ", keyList.length === 1 ? "key" : "keys"), !isReadOnly && removeItemButton);
  }
  renderNotCollapsed() {
    let { name, data, keyPath, deep, nextDeep, addFormVisible } = this.state, { isCollapsed, handleRemove, onDeltaUpdate, readOnly, getStyle, dataType, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser } = this.props, { minus, plus, addForm, ul, delimiter } = getStyle(name, data, keyPath, deep, dataType), keyList = Object.getOwnPropertyNames(data), isReadOnly = readOnly(name, data, keyPath, deep, dataType), addItemButton = (0, import_react.cloneElement)(plusMenuElement, { onClick: this.handleAddMode, className: "rejt-plus-menu", style: plus }), removeItemButton = (0, import_react.cloneElement)(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: minus }), list = keyList.map((key) => import_react.default.createElement(JsonNode, { key, name: key, data: data[key], keyPath, deep: nextDeep, isCollapsed, handleRemove: this.handleRemoveValue(key), handleUpdateValue: this.handleEditValue, onUpdate: this.onChildUpdate, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator, textareaElementGenerator, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser }));
    return import_react.default.createElement("span", { className: "rejt-not-collapsed" }, import_react.default.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "{"), !isReadOnly && addItemButton, import_react.default.createElement("ul", { className: "rejt-not-collapsed-list", style: ul }, list), !isReadOnly && addFormVisible && import_react.default.createElement("div", { className: "rejt-add-form", style: addForm }, import_react.default.createElement(JsonAddValue, { handleAdd: this.handleAddValueAdd, handleCancel: this.handleAddValueCancel, addButtonElement, cancelButtonElement, inputElementGenerator, keyPath, deep, onSubmitValueParser })), import_react.default.createElement("span", { className: "rejt-not-collapsed-delimiter", style: delimiter }, "}"), !isReadOnly && removeItemButton);
  }
  render() {
    let { name, collapsed, data, keyPath, deep } = this.state, { getStyle, dataType } = this.props, value2 = collapsed ? this.renderCollapsed() : this.renderNotCollapsed(), style = getStyle(name, data, keyPath, deep, dataType);
    return import_react.default.createElement("div", { className: "rejt-object-node" }, import_react.default.createElement("span", { onClick: this.handleCollapseMode }, import_react.default.createElement("span", { className: "rejt-name", style: style.name }, name, " :", " ")), value2);
  }
};
JsonObject.defaultProps = { keyPath: [], deep: 0, minusMenuElement: import_react.default.createElement("span", null, " - "), plusMenuElement: import_react.default.createElement("span", null, " + ") };
var JsonValue = class extends import_react.Component {
  constructor(props) {
    super(props);
    let keyPath = [...props.keyPath, props.name];
    this.state = { value: props.value, name: props.name, keyPath, deep: props.deep, editEnabled: false, inputRef: null }, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.value !== state.value ? { value: props.value } : null;
  }
  componentDidUpdate() {
    let { editEnabled, inputRef, name, value: value2, keyPath, deep } = this.state, { readOnly, dataType } = this.props, isReadOnly = readOnly(name, value2, keyPath, deep, dataType);
    editEnabled && !isReadOnly && typeof inputRef.focus == "function" && inputRef.focus();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(event) {
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || ((event.code === "Enter" || event.key === "Enter") && (event.preventDefault(), this.handleEdit()), (event.code === "Escape" || event.key === "Escape") && (event.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let { handleUpdateValue, originalValue, logger: logger4, onSubmitValueParser, keyPath } = this.props, { inputRef, name, deep } = this.state;
    if (!inputRef)
      return;
    let newValue = onSubmitValueParser(true, keyPath, deep, name, inputRef.value);
    handleUpdateValue({ value: newValue, key: name }).then(() => {
      isComponentWillChange(originalValue, newValue) || this.handleCancelEdit();
    }).catch(logger4.error);
  }
  handleEditMode() {
    this.setState({ editEnabled: true });
  }
  refInput(node) {
    this.state.inputRef = node;
  }
  handleCancelEdit() {
    this.setState({ editEnabled: false });
  }
  render() {
    let { name, value: value2, editEnabled, keyPath, deep } = this.state, { handleRemove, originalValue, readOnly, dataType, getStyle, editButtonElement, cancelButtonElement, inputElementGenerator, minusMenuElement, keyPath: comeFromKeyPath } = this.props, style = getStyle(name, originalValue, keyPath, deep, dataType), isReadOnly = readOnly(name, originalValue, keyPath, deep, dataType), isEditing = editEnabled && !isReadOnly, inputElement = inputElementGenerator(VALUE, comeFromKeyPath, deep, name, originalValue, dataType), editButtonElementLayout = (0, import_react.cloneElement)(editButtonElement, { onClick: this.handleEdit }), cancelButtonElementLayout = (0, import_react.cloneElement)(cancelButtonElement, { onClick: this.handleCancelEdit }), inputElementLayout = (0, import_react.cloneElement)(inputElement, { ref: this.refInput, defaultValue: JSON.stringify(originalValue) }), minusMenuLayout = (0, import_react.cloneElement)(minusMenuElement, { onClick: handleRemove, className: "rejt-minus-menu", style: style.minus });
    return import_react.default.createElement("li", { className: "rejt-value-node", style: style.li }, import_react.default.createElement("span", { className: "rejt-name", style: style.name }, name, " : "), isEditing ? import_react.default.createElement("span", { className: "rejt-edit-form", style: style.editForm }, inputElementLayout, " ", cancelButtonElementLayout, editButtonElementLayout) : import_react.default.createElement("span", { className: "rejt-value", style: style.value, onClick: isReadOnly ? null : this.handleEditMode }, String(value2)), !isReadOnly && !isEditing && minusMenuLayout);
  }
};
JsonValue.defaultProps = { keyPath: [], deep: 0, handleUpdateValue: () => Promise.resolve(), editButtonElement: import_react.default.createElement("button", null, "e"), cancelButtonElement: import_react.default.createElement("button", null, "c"), minusMenuElement: import_react.default.createElement("span", null, " - ") };
var object = { minus: { color: "red" }, plus: { color: "green" }, collapsed: { color: "grey" }, delimiter: {}, ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" }, name: { color: "#2287CD" }, addForm: {} };
var array = { minus: { color: "red" }, plus: { color: "green" }, collapsed: { color: "grey" }, delimiter: {}, ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" }, name: { color: "#2287CD" }, addForm: {} };
var value = { minus: { color: "red" }, editForm: {}, value: { color: "#7bba3d" }, li: { minHeight: "22px", lineHeight: "22px", outline: "0px" }, name: { color: "#2287CD" } };
function parse3(string) {
  let result = string;
  if (result.indexOf("function") === 0)
    return (0, eval)(`(${result})`);
  try {
    result = JSON.parse(string);
  } catch {
  }
  return result;
}
var JsonTree = class extends import_react.Component {
  constructor(props) {
    super(props), this.state = { data: props.data, rootName: props.rootName }, this.onUpdate = this.onUpdate.bind(this), this.removeRoot = this.removeRoot.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data || props.rootName !== state.rootName ? { data: props.data, rootName: props.rootName } : null;
  }
  onUpdate(key, data) {
    this.setState({ data }), this.props.onFullyUpdate(data);
  }
  removeRoot() {
    this.onUpdate(null, null);
  }
  render() {
    let { data, rootName } = this.state, { isCollapsed, onDeltaUpdate, readOnly, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElement, textareaElement, minusMenuElement, plusMenuElement, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser, fallback = null } = this.props, dataType = getObjectType(data), readOnlyFunction = readOnly;
    getObjectType(readOnly) === "Boolean" && (readOnlyFunction = () => readOnly);
    let inputElementFunction = inputElement;
    inputElement && getObjectType(inputElement) !== "Function" && (inputElementFunction = () => inputElement);
    let textareaElementFunction = textareaElement;
    return textareaElement && getObjectType(textareaElement) !== "Function" && (textareaElementFunction = () => textareaElement), dataType === "Object" || dataType === "Array" ? import_react.default.createElement("div", { className: "rejt-tree" }, import_react.default.createElement(JsonNode, { data, name: rootName, deep: -1, isCollapsed, onUpdate: this.onUpdate, onDeltaUpdate, readOnly: readOnlyFunction, getStyle, addButtonElement, cancelButtonElement, editButtonElement, inputElementGenerator: inputElementFunction, textareaElementGenerator: textareaElementFunction, minusMenuElement, plusMenuElement, handleRemove: this.removeRoot, beforeRemoveAction, beforeAddAction, beforeUpdateAction, logger: logger4, onSubmitValueParser })) : fallback;
  }
};
JsonTree.defaultProps = { rootName: "root", isCollapsed: (keyPath, deep) => deep !== -1, getStyle: (keyName, data, keyPath, deep, dataType) => {
  switch (dataType) {
    case "Object":
    case "Error":
      return object;
    case "Array":
      return array;
    default:
      return value;
  }
}, readOnly: () => false, onFullyUpdate: () => {
}, onDeltaUpdate: () => {
}, beforeRemoveAction: () => Promise.resolve(), beforeAddAction: () => Promise.resolve(), beforeUpdateAction: () => Promise.resolve(), logger: { error: () => {
} }, onSubmitValueParser: (isEditMode, keyPath, deep, name, rawValue) => parse3(rawValue), inputElement: () => import_react.default.createElement("input", null), textareaElement: () => import_react.default.createElement("textarea", null), fallback: null };
var { window: globalWindow2 } = import_global.global;
var Wrapper6 = newStyled.div(({ theme }) => ({ position: "relative", display: "flex", ".rejt-tree": { marginLeft: "1rem", fontSize: "13px" }, ".rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed": { "& > svg": { opacity: 0, transition: "opacity 0.2s" } }, ".rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed": { "& > svg": { opacity: 1 } }, ".rejt-edit-form button": { display: "none" }, ".rejt-add-form": { marginLeft: 10 }, ".rejt-add-value-node": { display: "inline-flex", alignItems: "center" }, ".rejt-name": { lineHeight: "22px" }, ".rejt-not-collapsed-delimiter": { lineHeight: "22px" }, ".rejt-plus-menu": { marginLeft: 5 }, ".rejt-object-node > span > *, .rejt-array-node > span > *": { position: "relative", zIndex: 2 }, ".rejt-object-node, .rejt-array-node": { position: "relative" }, ".rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before": { content: '""', position: "absolute", top: 0, display: "block", width: "100%", marginLeft: "-1rem", padding: "0 4px 0 1rem", height: 22 }, ".rejt-collapsed::before, .rejt-not-collapsed::before": { zIndex: 1, background: "transparent", borderRadius: 4, transition: "background 0.2s", pointerEvents: "none", opacity: 0.1 }, ".rejt-object-node:hover, .rejt-array-node:hover": { "& > .rejt-collapsed::before, & > .rejt-not-collapsed::before": { background: theme.color.secondary } }, ".rejt-collapsed::after, .rejt-not-collapsed::after": { content: '""', position: "absolute", display: "inline-block", pointerEvents: "none", width: 0, height: 0 }, ".rejt-collapsed::after": { left: -8, top: 8, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "3px solid rgba(153,153,153,0.6)" }, ".rejt-not-collapsed::after": { left: -10, top: 10, borderTop: "3px solid rgba(153,153,153,0.6)", borderLeft: "3px solid transparent", borderRight: "3px solid transparent" }, ".rejt-value": { display: "inline-block", border: "1px solid transparent", borderRadius: 4, margin: "1px 0", padding: "0 4px", cursor: "text", color: theme.color.defaultText }, ".rejt-value-node:hover > .rejt-value": { background: theme.color.lighter, borderColor: theme.appBorderColor } }));
var ButtonInline = newStyled.button(({ theme, primary }) => ({ border: 0, height: 20, margin: 1, borderRadius: 4, background: primary ? theme.color.secondary : "transparent", color: primary ? theme.color.lightest : theme.color.dark, fontWeight: primary ? "bold" : "normal", cursor: "pointer", order: primary ? "initial" : 9 }));
var ActionAddIcon = newStyled(AddIcon)(({ theme, disabled }) => ({ display: "inline-block", verticalAlign: "middle", width: 15, height: 15, padding: 3, marginLeft: 5, cursor: disabled ? "not-allowed" : "pointer", color: theme.textMutedColor, "&:hover": disabled ? {} : { color: theme.color.ancillary }, "svg + &": { marginLeft: 0 } }));
var ActionSubstractIcon = newStyled(SubtractIcon)(({ theme, disabled }) => ({ display: "inline-block", verticalAlign: "middle", width: 15, height: 15, padding: 3, marginLeft: 5, cursor: disabled ? "not-allowed" : "pointer", color: theme.textMutedColor, "&:hover": disabled ? {} : { color: theme.color.negative }, "svg + &": { marginLeft: 0 } }));
var Input = newStyled.input(({ theme, placeholder }) => ({ outline: 0, margin: placeholder ? 1 : "1px 0", padding: "3px 4px", color: theme.color.defaultText, background: theme.background.app, border: `1px solid ${theme.appBorderColor}`, borderRadius: 4, lineHeight: "14px", width: placeholder === "Key" ? 80 : 120, "&:focus": { border: `1px solid ${theme.color.secondary}` } }));
var RawButton = newStyled(IconButton)(({ theme }) => ({ position: "absolute", zIndex: 2, top: 2, right: 2, height: 21, padding: "0 3px", background: theme.background.bar, border: `1px solid ${theme.appBorderColor}`, borderRadius: 3, color: theme.textMutedColor, fontSize: "9px", fontWeight: "bold", textDecoration: "none", span: { marginLeft: 3, marginTop: 1 } }));
var RawInput = newStyled(Form.Textarea)(({ theme }) => ({ flex: 1, padding: "7px 6px", fontFamily: theme.typography.fonts.mono, fontSize: "12px", lineHeight: "18px", "&::placeholder": { fontFamily: theme.typography.fonts.base, fontSize: "13px" }, "&:placeholder-shown": { padding: "7px 10px" } }));
var ENTER_EVENT = { bubbles: true, cancelable: true, key: "Enter", code: "Enter", keyCode: 13 };
var dispatchEnterKey = (event) => {
  event.currentTarget.dispatchEvent(new globalWindow2.KeyboardEvent("keydown", ENTER_EVENT));
};
var selectValue = (event) => {
  event.currentTarget.select();
};
var getCustomStyleFunction = (theme) => () => ({ name: { color: theme.color.secondary }, collapsed: { color: theme.color.dark }, ul: { listStyle: "none", margin: "0 0 0 1rem", padding: 0 }, li: { outline: 0 } });
var ObjectControl = ({ name, value: value2, onChange }) => {
  let theme = useTheme(), data = (0, import_react.useMemo)(() => value2 && (0, import_cloneDeep.default)(value2), [value2]), hasData = data != null, [showRaw, setShowRaw] = (0, import_react.useState)(!hasData), [parseError, setParseError] = (0, import_react.useState)(null), updateRaw = (0, import_react.useCallback)((raw) => {
    try {
      raw && onChange(JSON.parse(raw)), setParseError(void 0);
    } catch (e) {
      setParseError(e);
    }
  }, [onChange]), [forceVisible, setForceVisible] = (0, import_react.useState)(false), onForceVisible = (0, import_react.useCallback)(() => {
    onChange({}), setForceVisible(true);
  }, [setForceVisible]), htmlElRef = (0, import_react.useRef)(null);
  if ((0, import_react.useEffect)(() => {
    forceVisible && htmlElRef.current && htmlElRef.current.select();
  }, [forceVisible]), !hasData)
    return import_react.default.createElement(Button, { id: getControlSetterButtonId(name), onClick: onForceVisible }, "Set object");
  let rawJSONForm = import_react.default.createElement(RawInput, { ref: htmlElRef, id: getControlId(name), name, defaultValue: value2 === null ? "" : JSON.stringify(value2, null, 2), onBlur: (event) => updateRaw(event.target.value), placeholder: "Edit JSON string...", autoFocus: forceVisible, valid: parseError ? "error" : null }), isObjectOrArray = Array.isArray(value2) || typeof value2 == "object" && (value2 == null ? void 0 : value2.constructor) === Object;
  return import_react.default.createElement(Wrapper6, null, isObjectOrArray && import_react.default.createElement(RawButton, { onClick: (e) => {
    e.preventDefault(), setShowRaw((v) => !v);
  } }, showRaw ? import_react.default.createElement(EyeCloseIcon, null) : import_react.default.createElement(EyeIcon, null), import_react.default.createElement("span", null, "RAW")), showRaw ? rawJSONForm : import_react.default.createElement(JsonTree, { readOnly: !isObjectOrArray, isCollapsed: isObjectOrArray ? void 0 : () => true, data, rootName: name, onFullyUpdate: onChange, getStyle: getCustomStyleFunction(theme), cancelButtonElement: import_react.default.createElement(ButtonInline, { type: "button" }, "Cancel"), editButtonElement: import_react.default.createElement(ButtonInline, { type: "submit" }, "Save"), addButtonElement: import_react.default.createElement(ButtonInline, { type: "submit", primary: true }, "Save"), plusMenuElement: import_react.default.createElement(ActionAddIcon, null), minusMenuElement: import_react.default.createElement(ActionSubstractIcon, null), inputElement: (_, __, ___, key) => key ? import_react.default.createElement(Input, { onFocus: selectValue, onBlur: dispatchEnterKey }) : import_react.default.createElement(Input, null), fallback: rawJSONForm }));
};
var RangeInput = newStyled.input(({ theme, min, max, value: value2 }) => ({ "&": { width: "100%", backgroundColor: "transparent", appearance: "none" }, "&::-webkit-slider-runnable-track": { background: theme.base === "light" ? `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} 100%)`, boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`, borderRadius: 6, width: "100%", height: 6, cursor: "pointer" }, "&::-webkit-slider-thumb": { marginTop: "-6px", width: 16, height: 16, border: `1px solid ${rgba(theme.appBorderColor, 0.2)}`, borderRadius: "50px", boxShadow: `0 1px 3px 0px ${rgba(theme.appBorderColor, 0.2)}`, cursor: "grab", appearance: "none", background: `${theme.input.background}`, transition: "all 150ms ease-out", "&:hover": { background: `${curriedDarken$1(0.05, theme.input.background)}`, transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)", transition: "all 50ms ease-out" }, "&:active": { background: `${theme.input.background}`, transform: "scale3d(1, 1, 1) translateY(0px)", cursor: "grabbing" } }, "&:focus": { outline: "none", "&::-webkit-slider-runnable-track": { borderColor: rgba(theme.color.secondary, 0.4) }, "&::-webkit-slider-thumb": { borderColor: theme.color.secondary, boxShadow: `0 0px 5px 0px ${theme.color.secondary}` } }, "&::-moz-range-track": { background: theme.base === "light" ? `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} 100%)`, boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`, borderRadius: 6, width: "100%", height: 6, cursor: "pointer", outline: "none" }, "&::-moz-range-thumb": { width: 16, height: 16, border: `1px solid ${rgba(theme.appBorderColor, 0.2)}`, borderRadius: "50px", boxShadow: `0 1px 3px 0px ${rgba(theme.appBorderColor, 0.2)}`, cursor: "grab", background: `${theme.input.background}`, transition: "all 150ms ease-out", "&:hover": { background: `${curriedDarken$1(0.05, theme.input.background)}`, transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)", transition: "all 50ms ease-out" }, "&:active": { background: `${theme.input.background}`, transform: "scale3d(1, 1, 1) translateY(0px)", cursor: "grabbing" } }, "&::-ms-track": { background: theme.base === "light" ? `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedDarken$1(0.02, theme.input.background)} 100%)` : `linear-gradient(to right, 
            ${theme.color.green} 0%, ${theme.color.green} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} ${(value2 - min) / (max - min) * 100}%, 
            ${curriedLighten$1(0.02, theme.input.background)} 100%)`, boxShadow: `${theme.appBorderColor} 0 0 0 1px inset`, color: "transparent", width: "100%", height: "6px", cursor: "pointer" }, "&::-ms-fill-lower": { borderRadius: 6 }, "&::-ms-fill-upper": { borderRadius: 6 }, "&::-ms-thumb": { width: 16, height: 16, background: `${theme.input.background}`, border: `1px solid ${rgba(theme.appBorderColor, 0.2)}`, borderRadius: 50, cursor: "grab", marginTop: 0 }, "@supports (-ms-ime-align:auto)": { "input[type=range]": { margin: "0" } } }));
var RangeLabel = newStyled.span({ paddingLeft: 5, paddingRight: 5, fontSize: 12, whiteSpace: "nowrap", fontFeatureSettings: "tnum", fontVariantNumeric: "tabular-nums" });
var RangeCurrentAndMaxLabel = newStyled(RangeLabel)(({ numberOFDecimalsPlaces, max }) => ({ width: `${numberOFDecimalsPlaces + max.toString().length * 2 + 3}ch`, textAlign: "right", flexShrink: 0 }));
var RangeWrapper = newStyled.div({ display: "flex", alignItems: "center", width: "100%" });
function getNumberOfDecimalPlaces(number) {
  let match = number.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return match ? Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)) : 0;
}
var RangeControl = ({ name, value: value2, onChange, min = 0, max = 100, step = 1, onBlur, onFocus }) => {
  let handleChange = (event) => {
    onChange(parse2(event.target.value));
  }, hasValue = value2 !== void 0, numberOFDecimalsPlaces = (0, import_react.useMemo)(() => getNumberOfDecimalPlaces(step), [step]);
  return import_react.default.createElement(RangeWrapper, null, import_react.default.createElement(RangeLabel, null, min), import_react.default.createElement(RangeInput, { id: getControlId(name), type: "range", onChange: handleChange, name, value: value2, min, max, step, onFocus, onBlur }), import_react.default.createElement(RangeCurrentAndMaxLabel, { numberOFDecimalsPlaces, max }, hasValue ? value2.toFixed(numberOFDecimalsPlaces) : "--", " / ", max));
};
var Wrapper7 = newStyled.label({ display: "flex" });
var MaxLength = newStyled.div(({ isMaxed }) => ({ marginLeft: "0.75rem", paddingTop: "0.35rem", color: isMaxed ? "red" : void 0 }));
var TextControl = ({ name, value: value2, onChange, onFocus, onBlur, maxLength }) => {
  let handleChange = (event) => {
    onChange(event.target.value);
  }, [forceVisible, setForceVisible] = (0, import_react.useState)(false), onForceVisible = (0, import_react.useCallback)(() => {
    onChange(""), setForceVisible(true);
  }, [setForceVisible]);
  if (value2 === void 0)
    return import_react.default.createElement(Button, { variant: "outline", size: "medium", id: getControlSetterButtonId(name), onClick: onForceVisible }, "Set string");
  let isValid = typeof value2 == "string";
  return import_react.default.createElement(Wrapper7, null, import_react.default.createElement(Form.Textarea, { id: getControlId(name), maxLength, onChange: handleChange, size: "flex", placeholder: "Edit string...", autoFocus: forceVisible, valid: isValid ? null : "error", name, value: isValid ? value2 : "", onFocus, onBlur }), maxLength && import_react.default.createElement(MaxLength, { isMaxed: (value2 == null ? void 0 : value2.length) === maxLength }, (value2 == null ? void 0 : value2.length) ?? 0, " / ", maxLength));
};
var FileInput = newStyled(Form.Input)({ padding: 10 });
function revokeOldUrls(urls) {
  urls.forEach((url) => {
    url.startsWith("blob:") && URL.revokeObjectURL(url);
  });
}
var FilesControl = ({ onChange, name, accept = "image/*", value: value2 }) => {
  let inputElement = (0, import_react.useRef)(null);
  function handleFileChange(e) {
    if (!e.target.files)
      return;
    let fileUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    onChange(fileUrls), revokeOldUrls(value2);
  }
  return (0, import_react.useEffect)(() => {
    value2 == null && inputElement.current && (inputElement.current.value = null);
  }, [value2, name]), import_react.default.createElement(FileInput, { ref: inputElement, id: getControlId(name), type: "file", name, multiple: true, onChange: handleFileChange, accept, size: "flex" });
};
var LazyColorControl = (0, import_react.lazy)(() => import("./Color-RQJUDNI5-GUAK6EHR.js"));
var ColorControl = (props) => import_react.default.createElement(import_react.Suspense, { fallback: import_react.default.createElement("div", null) }, import_react.default.createElement(LazyColorControl, { ...props }));
var Controls2 = { array: ObjectControl, object: ObjectControl, boolean: BooleanControl, color: ColorControl, date: DateControl, number: NumberControl, check: OptionsControl, "inline-check": OptionsControl, radio: OptionsControl, "inline-radio": OptionsControl, select: OptionsControl, "multi-select": OptionsControl, range: RangeControl, text: TextControl, file: FilesControl };
var NoControl = () => import_react.default.createElement(import_react.default.Fragment, null, "-");
var ArgControl = ({ row, arg, updateArgs, isHovered }) => {
  var _a;
  let { key, control } = row, [isFocused, setFocused] = (0, import_react.useState)(false), [boxedValue, setBoxedValue] = (0, import_react.useState)({ value: arg });
  (0, import_react.useEffect)(() => {
    isFocused || setBoxedValue({ value: arg });
  }, [isFocused, arg]);
  let onChange = (0, import_react.useCallback)((argVal) => (setBoxedValue({ value: argVal }), updateArgs({ [key]: argVal }), argVal), [updateArgs, key]), onBlur = (0, import_react.useCallback)(() => setFocused(false), []), onFocus = (0, import_react.useCallback)(() => setFocused(true), []);
  if (!control || control.disable) {
    let canBeSetup = (control == null ? void 0 : control.disable) !== true && ((_a = row == null ? void 0 : row.type) == null ? void 0 : _a.name) !== "function";
    return isHovered && canBeSetup ? import_react.default.createElement(Link2, { href: "https://storybook.js.org/docs/react/essentials/controls", target: "_blank", withArrow: true }, "Setup controls") : import_react.default.createElement(NoControl, null);
  }
  let props = { name: key, argType: row, value: boxedValue.value, onChange, onBlur, onFocus }, Control = Controls2[control.type] || NoControl;
  return import_react.default.createElement(Control, { ...props, ...control, controlType: control.type });
};
var Name = newStyled.span({ fontWeight: "bold" });
var Required = newStyled.span(({ theme }) => ({ color: theme.color.negative, fontFamily: theme.typography.fonts.mono, cursor: "help" }));
var Description = newStyled.div(({ theme }) => ({ "&&": { p: { margin: "0 0 10px 0" }, a: { color: theme.color.secondary } }, code: { ...codeCommon({ theme }), fontSize: 12, fontFamily: theme.typography.fonts.mono }, "& code": { margin: 0, display: "inline-block" }, "& pre > code": { whiteSpace: "pre-wrap" } }));
var Type = newStyled.div(({ theme, hasDescription }) => ({ color: theme.base === "light" ? curriedTransparentize$1(0.1, theme.color.defaultText) : curriedTransparentize$1(0.2, theme.color.defaultText), marginTop: hasDescription ? 4 : 0 }));
var TypeWithJsDoc = newStyled.div(({ theme, hasDescription }) => ({ color: theme.base === "light" ? curriedTransparentize$1(0.1, theme.color.defaultText) : curriedTransparentize$1(0.2, theme.color.defaultText), marginTop: hasDescription ? 12 : 0, marginBottom: 12 }));
var StyledTd = newStyled.td(({ theme, expandable }) => ({ paddingLeft: expandable ? "40px !important" : "20px !important" }));
var toSummary = (value2) => value2 && { summary: typeof value2 == "string" ? value2 : value2.name };
var ArgRow = (props) => {
  var _a;
  let [isHovered, setIsHovered] = (0, import_react.useState)(false), { row, updateArgs, compact, expandable, initialExpandedArgs } = props, { name, description } = row, table = row.table || {}, type = table.type || toSummary(row.type), defaultValue = table.defaultValue || row.defaultValue, required = (_a = row.type) == null ? void 0 : _a.required, hasDescription = description != null && description !== "";
  return import_react.default.createElement("tr", { onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false) }, import_react.default.createElement(StyledTd, { expandable }, import_react.default.createElement(Name, null, name), required ? import_react.default.createElement(Required, { title: "Required" }, "*") : null), compact ? null : import_react.default.createElement("td", null, hasDescription && import_react.default.createElement(Description, null, import_react.default.createElement(index_modern_default, null, description)), table.jsDocTags != null ? import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(TypeWithJsDoc, { hasDescription }, import_react.default.createElement(ArgValue, { value: type, initialExpandedArgs })), import_react.default.createElement(ArgJsDoc, { tags: table.jsDocTags })) : import_react.default.createElement(Type, { hasDescription }, import_react.default.createElement(ArgValue, { value: type, initialExpandedArgs }))), compact ? null : import_react.default.createElement("td", null, import_react.default.createElement(ArgValue, { value: defaultValue, initialExpandedArgs })), updateArgs ? import_react.default.createElement("td", null, import_react.default.createElement(ArgControl, { ...props, isHovered })) : null);
};
var ExpanderIconDown = newStyled(ChevronDownIcon)(({ theme }) => ({ marginRight: 8, marginLeft: -10, marginTop: -2, height: 12, width: 12, color: theme.base === "light" ? curriedTransparentize$1(0.25, theme.color.defaultText) : curriedTransparentize$1(0.3, theme.color.defaultText), border: "none", display: "inline-block" }));
var ExpanderIconRight = newStyled(ChevronRightIcon)(({ theme }) => ({ marginRight: 8, marginLeft: -10, marginTop: -2, height: 12, width: 12, color: theme.base === "light" ? curriedTransparentize$1(0.25, theme.color.defaultText) : curriedTransparentize$1(0.3, theme.color.defaultText), border: "none", display: "inline-block" }));
var FlexWrapper = newStyled.span(({ theme }) => ({ display: "flex", lineHeight: "20px", alignItems: "center" }));
var Section = newStyled.td(({ theme }) => ({ position: "relative", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: theme.typography.weight.bold, fontSize: theme.typography.size.s1 - 1, color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText), background: `${theme.background.app} !important`, "& ~ td": { background: `${theme.background.app} !important` } }));
var Subsection = newStyled.td(({ theme }) => ({ position: "relative", fontWeight: theme.typography.weight.bold, fontSize: theme.typography.size.s2 - 1, background: theme.background.app }));
var StyledTd2 = newStyled.td(() => ({ position: "relative" }));
var StyledTr = newStyled.tr(({ theme }) => ({ "&:hover > td": { backgroundColor: `${curriedLighten$1(5e-3, theme.background.app)} !important`, boxShadow: `${theme.color.mediumlight} 0 - 1px 0 0 inset`, cursor: "row-resize" } }));
var ClickIntercept = newStyled.button(() => ({ background: "none", border: "none", padding: "0", font: "inherit", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, height: "100%", width: "100%", color: "transparent", cursor: "row-resize !important" }));
var SectionRow = ({ level = "section", label, children, initialExpanded = true, colSpan = 3 }) => {
  let [expanded, setExpanded] = (0, import_react.useState)(initialExpanded), Level = level === "subsection" ? Subsection : Section, itemCount = (children == null ? void 0 : children.length) || 0, caption = level === "subsection" ? `${itemCount} item${itemCount !== 1 ? "s" : ""}` : "", helperText = `${expanded ? "Hide" : "Show"} ${level === "subsection" ? itemCount : label} item${itemCount !== 1 ? "s" : ""}`;
  return import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(StyledTr, { title: helperText }, import_react.default.createElement(Level, { colSpan: 1 }, import_react.default.createElement(ClickIntercept, { onClick: (e) => setExpanded(!expanded), tabIndex: 0 }, helperText), import_react.default.createElement(FlexWrapper, null, expanded ? import_react.default.createElement(ExpanderIconDown, null) : import_react.default.createElement(ExpanderIconRight, null), label)), import_react.default.createElement(StyledTd2, { colSpan: colSpan - 1 }, import_react.default.createElement(ClickIntercept, { onClick: (e) => setExpanded(!expanded), tabIndex: -1, style: { outline: "none" } }, helperText), expanded ? null : caption)), expanded ? children : null);
};
var Row = newStyled.div(({ theme }) => ({ display: "flex", gap: 16, borderBottom: `1px solid ${theme.appBorderColor}`, "&:last-child": { borderBottom: 0 } }));
var Column = newStyled.div(({ numColumn }) => ({ display: "flex", flexDirection: "column", flex: numColumn || 1, gap: 5, padding: "12px 20px" }));
var SkeletonText = newStyled.div(({ theme, width, height }) => ({ animation: `${theme.animation.glow} 1.5s ease-in-out infinite`, background: theme.appBorderColor, width: width || "100%", height: height || 16, borderRadius: 3 }));
var columnWidth = [2, 4, 2, 2];
var Skeleton = () => import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(Row, null, import_react.default.createElement(Column, { numColumn: columnWidth[0] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[1] }, import_react.default.createElement(SkeletonText, { width: "30%" })), import_react.default.createElement(Column, { numColumn: columnWidth[2] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[3] }, import_react.default.createElement(SkeletonText, { width: "60%" }))), import_react.default.createElement(Row, null, import_react.default.createElement(Column, { numColumn: columnWidth[0] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[1] }, import_react.default.createElement(SkeletonText, { width: "80%" }), import_react.default.createElement(SkeletonText, { width: "30%" })), import_react.default.createElement(Column, { numColumn: columnWidth[2] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[3] }, import_react.default.createElement(SkeletonText, { width: "60%" }))), import_react.default.createElement(Row, null, import_react.default.createElement(Column, { numColumn: columnWidth[0] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[1] }, import_react.default.createElement(SkeletonText, { width: "80%" }), import_react.default.createElement(SkeletonText, { width: "30%" })), import_react.default.createElement(Column, { numColumn: columnWidth[2] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[3] }, import_react.default.createElement(SkeletonText, { width: "60%" }))), import_react.default.createElement(Row, null, import_react.default.createElement(Column, { numColumn: columnWidth[0] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[1] }, import_react.default.createElement(SkeletonText, { width: "80%" }), import_react.default.createElement(SkeletonText, { width: "30%" })), import_react.default.createElement(Column, { numColumn: columnWidth[2] }, import_react.default.createElement(SkeletonText, { width: "60%" })), import_react.default.createElement(Column, { numColumn: columnWidth[3] }, import_react.default.createElement(SkeletonText, { width: "60%" }))));
var Wrapper8 = newStyled.div(({ inAddonPanel, theme }) => ({ height: inAddonPanel ? "100%" : "auto", display: "flex", border: inAddonPanel ? "none" : `1px solid ${theme.appBorderColor}`, borderRadius: inAddonPanel ? 0 : theme.appBorderRadius, padding: inAddonPanel ? 0 : 40, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 15, background: theme.background.content, boxShadow: "rgba(0, 0, 0, 0.10) 0 1px 3px 0" }));
var Links = newStyled.div(({ theme }) => ({ display: "flex", fontSize: theme.typography.size.s2 - 1, gap: 25 }));
var Divider = newStyled.div(({ theme }) => ({ width: 1, height: 16, backgroundColor: theme.appBorderColor }));
var Empty = ({ inAddonPanel }) => {
  let [isLoading, setIsLoading] = (0, import_react.useState)(true);
  return (0, import_react.useEffect)(() => {
    let load = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(load);
  }, []), isLoading ? null : import_react.default.createElement(Wrapper8, { inAddonPanel }, import_react.default.createElement(EmptyTabContent, { title: inAddonPanel ? "Interactive story playground" : "Args table with interactive controls couldn't be auto-generated", description: import_react.default.createElement(import_react.default.Fragment, null, "Controls give you an easy to use interface to test your components. Set your story args and you'll see controls appearing here automatically."), footer: import_react.default.createElement(Links, null, inAddonPanel && import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(Link2, { href: "https://youtu.be/0gOfS6K0x0E", target: "_blank", withArrow: true }, import_react.default.createElement(VideoIcon, null), " Watch 5m video"), import_react.default.createElement(Divider, null), import_react.default.createElement(Link2, { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: true }, import_react.default.createElement(DocumentIcon, null), " Read docs")), !inAddonPanel && import_react.default.createElement(Link2, { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: true }, import_react.default.createElement(DocumentIcon, null), " Learn how to set that up")) }));
};
var TableWrapper = newStyled.table(({ theme, compact, inAddonPanel }) => ({ "&&": { borderSpacing: 0, color: theme.color.defaultText, "td, th": { padding: 0, border: "none", verticalAlign: "top", textOverflow: "ellipsis" }, fontSize: theme.typography.size.s2 - 1, lineHeight: "20px", textAlign: "left", width: "100%", marginTop: inAddonPanel ? 0 : 25, marginBottom: inAddonPanel ? 0 : 40, "thead th:first-of-type, td:first-of-type": { width: "25%" }, "th:first-of-type, td:first-of-type": { paddingLeft: 20 }, "th:nth-of-type(2), td:nth-of-type(2)": { ...compact ? null : { width: "35%" } }, "td:nth-of-type(3)": { ...compact ? null : { width: "15%" } }, "th:last-of-type, td:last-of-type": { paddingRight: 20, ...compact ? null : { width: "25%" } }, th: { color: theme.base === "light" ? curriedTransparentize$1(0.25, theme.color.defaultText) : curriedTransparentize$1(0.45, theme.color.defaultText), paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15 }, td: { paddingTop: "10px", paddingBottom: "10px", "&:not(:first-of-type)": { paddingLeft: 15, paddingRight: 15 }, "&:last-of-type": { paddingRight: 20 } }, marginLeft: inAddonPanel ? 0 : 1, marginRight: inAddonPanel ? 0 : 1, tbody: { ...inAddonPanel ? null : { filter: theme.base === "light" ? "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))" }, "> tr > *": { background: theme.background.content, borderTop: `1px solid ${theme.appBorderColor}` }, ...inAddonPanel ? null : { "> tr:first-of-type > *": { borderBlockStart: `1px solid ${theme.appBorderColor}` }, "> tr:last-of-type > *": { borderBlockEnd: `1px solid ${theme.appBorderColor}` }, "> tr > *:first-of-type": { borderInlineStart: `1px solid ${theme.appBorderColor}` }, "> tr > *:last-of-type": { borderInlineEnd: `1px solid ${theme.appBorderColor}` }, "> tr:first-of-type > td:first-of-type": { borderTopLeftRadius: theme.appBorderRadius }, "> tr:first-of-type > td:last-of-type": { borderTopRightRadius: theme.appBorderRadius }, "> tr:last-of-type > td:first-of-type": { borderBottomLeftRadius: theme.appBorderRadius }, "> tr:last-of-type > td:last-of-type": { borderBottomRightRadius: theme.appBorderRadius } } } } }));
var StyledIconButton = newStyled(IconButton)(({ theme }) => ({ margin: "-4px -12px -4px 0" }));
var ControlHeadingWrapper = newStyled.span({ display: "flex", justifyContent: "space-between" });
var sortFns = { alpha: (a, b) => a.name.localeCompare(b.name), requiredFirst: (a, b) => {
  var _a, _b;
  return +!!((_a = b.type) == null ? void 0 : _a.required) - +!!((_b = a.type) == null ? void 0 : _b.required) || a.name.localeCompare(b.name);
}, none: void 0 };
var groupRows = (rows, sort) => {
  let sections = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
  if (!rows)
    return sections;
  Object.entries(rows).forEach(([key, row]) => {
    let { category, subcategory } = (row == null ? void 0 : row.table) || {};
    if (category) {
      let section = sections.sections[category] || { ungrouped: [], subsections: {} };
      if (!subcategory)
        section.ungrouped.push({ key, ...row });
      else {
        let subsection = section.subsections[subcategory] || [];
        subsection.push({ key, ...row }), section.subsections[subcategory] = subsection;
      }
      sections.sections[category] = section;
    } else if (subcategory) {
      let subsection = sections.ungroupedSubsections[subcategory] || [];
      subsection.push({ key, ...row }), sections.ungroupedSubsections[subcategory] = subsection;
    } else
      sections.ungrouped.push({ key, ...row });
  });
  let sortFn = sortFns[sort], sortSubsection = (record) => sortFn ? Object.keys(record).reduce((acc, cur) => ({ ...acc, [cur]: record[cur].sort(sortFn) }), {}) : record;
  return { ungrouped: sections.ungrouped.sort(sortFn), ungroupedSubsections: sortSubsection(sections.ungroupedSubsections), sections: Object.keys(sections.sections).reduce((acc, cur) => ({ ...acc, [cur]: { ungrouped: sections.sections[cur].ungrouped.sort(sortFn), subsections: sortSubsection(sections.sections[cur].subsections) } }), {}) };
};
var safeIncludeConditionalArg = (row, args, globals) => {
  try {
    return O(row, args, globals);
  } catch (err) {
    return import_client_logger.once.warn(err.message), false;
  }
};
var ArgsTable = (props) => {
  let { updateArgs, resetArgs, compact, inAddonPanel, initialExpandedArgs, sort = "none", isLoading } = props;
  if ("error" in props) {
    let { error } = props;
    return import_react.default.createElement(EmptyBlock, null, error, " ", import_react.default.createElement(Link2, { href: "http://storybook.js.org/docs/", target: "_blank", withArrow: true }, import_react.default.createElement(DocumentIcon, null), " Read the docs"));
  }
  if (isLoading)
    return import_react.default.createElement(Skeleton, null);
  let { rows, args, globals } = "rows" in props && props, groups = groupRows((0, import_pickBy.default)(rows, (row) => {
    var _a;
    return !((_a = row == null ? void 0 : row.table) == null ? void 0 : _a.disable) && safeIncludeConditionalArg(row, args || {}, globals || {});
  }), sort), hasNoUngrouped = groups.ungrouped.length === 0, hasNoSections = Object.entries(groups.sections).length === 0, hasNoUngroupedSubsections = Object.entries(groups.ungroupedSubsections).length === 0;
  if (hasNoUngrouped && hasNoSections && hasNoUngroupedSubsections)
    return import_react.default.createElement(Empty, { inAddonPanel });
  let colSpan = 1;
  updateArgs && (colSpan += 1), compact || (colSpan += 2);
  let expandable = Object.keys(groups.sections).length > 0, common = { updateArgs, compact, inAddonPanel, initialExpandedArgs };
  return import_react.default.createElement(ResetWrapper, null, import_react.default.createElement(TableWrapper, { compact, inAddonPanel, className: "docblock-argstable sb-unstyled" }, import_react.default.createElement("thead", { className: "docblock-argstable-head" }, import_react.default.createElement("tr", null, import_react.default.createElement("th", null, import_react.default.createElement("span", null, "Name")), compact ? null : import_react.default.createElement("th", null, import_react.default.createElement("span", null, "Description")), compact ? null : import_react.default.createElement("th", null, import_react.default.createElement("span", null, "Default")), updateArgs ? import_react.default.createElement("th", null, import_react.default.createElement(ControlHeadingWrapper, null, "Control", " ", !isLoading && resetArgs && import_react.default.createElement(StyledIconButton, { onClick: () => resetArgs(), title: "Reset controls" }, import_react.default.createElement(UndoIcon, { "aria-hidden": true })))) : null)), import_react.default.createElement("tbody", { className: "docblock-argstable-body" }, groups.ungrouped.map((row) => import_react.default.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], ...common })), Object.entries(groups.ungroupedSubsections).map(([subcategory, subsection]) => import_react.default.createElement(SectionRow, { key: subcategory, label: subcategory, level: "subsection", colSpan }, subsection.map((row) => import_react.default.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], expandable, ...common })))), Object.entries(groups.sections).map(([category, section]) => import_react.default.createElement(SectionRow, { key: category, label: category, level: "section", colSpan }, section.ungrouped.map((row) => import_react.default.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], ...common })), Object.entries(section.subsections).map(([subcategory, subsection]) => import_react.default.createElement(SectionRow, { key: subcategory, label: subcategory, level: "subsection", colSpan }, subsection.map((row) => import_react.default.createElement(ArgRow, { key: row.key, row, arg: args && args[row.key], expandable, ...common })))))))));
};
var TabbedArgsTable = ({ tabs, ...props }) => {
  let entries = Object.entries(tabs);
  return entries.length === 1 ? import_react.default.createElement(ArgsTable, { ...entries[0][1], ...props }) : import_react.default.createElement(TabsState, null, entries.map((entry, index) => {
    let [label, table] = entry, id = `prop_table_div_${label}`, Component4 = "div", argsTableProps = index === 0 ? props : { sort: props.sort };
    return import_react.default.createElement(Component4, { key: id, id, title: label }, ({ active }) => active ? import_react.default.createElement(ArgsTable, { key: `prop_table_${label}`, ...table, ...argsTableProps }) : null);
  }));
};
var Label4 = newStyled.div(({ theme }) => ({ marginRight: 30, fontSize: `${theme.typography.size.s1}px`, color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText) }));
var Sample = newStyled.div({ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" });
var TypeSpecimen = newStyled.div({ display: "flex", flexDirection: "row", alignItems: "baseline", "&:not(:last-child)": { marginBottom: "1rem" } });
var Wrapper9 = newStyled.div(withReset, ({ theme }) => ({ ...getBlockBackgroundStyle(theme), margin: "25px 0 40px", padding: "30px 20px" }));
var Typeset = ({ fontFamily, fontSizes, fontWeight, sampleText, ...props }) => import_react.default.createElement(Wrapper9, { ...props, className: "docblock-typeset sb-unstyled" }, fontSizes.map((size) => import_react.default.createElement(TypeSpecimen, { key: size }, import_react.default.createElement(Label4, null, size), import_react.default.createElement(Sample, { style: { fontFamily, fontSize: size, fontWeight, lineHeight: 1.2 } }, sampleText || "Was he a beast if music could move him so?"))));
var ItemTitle = newStyled.div(({ theme }) => ({ fontWeight: theme.typography.weight.bold, color: theme.color.defaultText }));
var ItemSubtitle = newStyled.div(({ theme }) => ({ color: theme.base === "light" ? curriedTransparentize$1(0.2, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText) }));
var ItemDescription = newStyled.div({ flex: "0 0 30%", lineHeight: "20px", marginTop: 5 });
var SwatchLabel = newStyled.div(({ theme }) => ({ flex: 1, textAlign: "center", fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.size.s1, lineHeight: 1, overflow: "hidden", color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText), "> div": { display: "inline-block", overflow: "hidden", maxWidth: "100%", textOverflow: "ellipsis" }, span: { display: "block", marginTop: 2 } }));
var SwatchLabels = newStyled.div({ display: "flex", flexDirection: "row" });
var Swatch = newStyled.div(({ background }) => ({ position: "relative", flex: 1, "&::before": { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background, content: '""' } }));
var SwatchColors = newStyled.div(({ theme }) => ({ ...getBlockBackgroundStyle(theme), display: "flex", flexDirection: "row", height: 50, marginBottom: 5, overflow: "hidden", backgroundColor: "white", backgroundImage: "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)", backgroundClip: "padding-box" }));
var SwatchSpecimen = newStyled.div({ display: "flex", flexDirection: "column", flex: 1, position: "relative", marginBottom: 30 });
var Swatches = newStyled.div({ flex: 1, display: "flex", flexDirection: "row" });
var Item = newStyled.div({ display: "flex", alignItems: "flex-start" });
var ListName = newStyled.div({ flex: "0 0 30%" });
var ListSwatches = newStyled.div({ flex: 1 });
var ListHeading = newStyled.div(({ theme }) => ({ display: "flex", flexDirection: "row", alignItems: "center", paddingBottom: 20, fontWeight: theme.typography.weight.bold, color: theme.base === "light" ? curriedTransparentize$1(0.4, theme.color.defaultText) : curriedTransparentize$1(0.6, theme.color.defaultText) }));
var List = newStyled.div(({ theme }) => ({ fontSize: theme.typography.size.s2, lineHeight: "20px", display: "flex", flexDirection: "column" }));
function renderSwatch(color, index) {
  return import_react.default.createElement(Swatch, { key: `${color}-${index}`, title: color, background: color });
}
function renderSwatchLabel(color, index, colorDescription) {
  return import_react.default.createElement(SwatchLabel, { key: `${color}-${index}`, title: color }, import_react.default.createElement("div", null, color, colorDescription && import_react.default.createElement("span", null, colorDescription)));
}
function renderSwatchSpecimen(colors) {
  if (Array.isArray(colors))
    return import_react.default.createElement(SwatchSpecimen, null, import_react.default.createElement(SwatchColors, null, colors.map((color, index) => renderSwatch(color, index))), import_react.default.createElement(SwatchLabels, null, colors.map((color, index) => renderSwatchLabel(color, index))));
  let swatchElements = [], labelElements = [];
  for (let colorKey in colors) {
    let colorValue = colors[colorKey];
    swatchElements.push(renderSwatch(colorValue, swatchElements.length)), labelElements.push(renderSwatchLabel(colorKey, labelElements.length, colorValue));
  }
  return import_react.default.createElement(SwatchSpecimen, null, import_react.default.createElement(SwatchColors, null, swatchElements), import_react.default.createElement(SwatchLabels, null, labelElements));
}
var ColorItem = ({ title, subtitle, colors }) => import_react.default.createElement(Item, null, import_react.default.createElement(ItemDescription, null, import_react.default.createElement(ItemTitle, null, title), import_react.default.createElement(ItemSubtitle, null, subtitle)), import_react.default.createElement(Swatches, null, renderSwatchSpecimen(colors)));
var ColorPalette = ({ children, ...props }) => import_react.default.createElement(ResetWrapper, null, import_react.default.createElement(List, { ...props, className: "docblock-colorpalette sb-unstyled" }, import_react.default.createElement(ListHeading, null, import_react.default.createElement(ListName, null, "Name"), import_react.default.createElement(ListSwatches, null, "Swatches")), children));
var ItemLabel = newStyled.div(({ theme }) => ({ fontFamily: theme.typography.fonts.base, fontSize: theme.typography.size.s2, color: theme.color.defaultText, marginLeft: 10, lineHeight: 1.2 }));
var ItemSpecimen = newStyled.div(({ theme }) => ({ ...getBlockBackgroundStyle(theme), overflow: "hidden", height: 40, width: 40, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", "> img, > svg": { width: 20, height: 20 } }));
var Item2 = newStyled.div({ display: "inline-flex", flexDirection: "row", alignItems: "center", flex: "0 1 calc(20% - 10px)", minWidth: 120, margin: "0px 10px 30px 0" });
var List2 = newStyled.div({ display: "flex", flexFlow: "row wrap" });
var IconItem = ({ name, children }) => import_react.default.createElement(Item2, null, import_react.default.createElement(ItemSpecimen, null, children), import_react.default.createElement(ItemLabel, null, name));
var IconGallery = ({ children, ...props }) => import_react.default.createElement(ResetWrapper, null, import_react.default.createElement(List2, { ...props, className: "docblock-icongallery sb-unstyled" }, children));
var anchorBlockIdFromId = (storyId) => `anchor--${storyId}`;
var Anchor = ({ storyId, children }) => import_react.default.createElement("div", { id: anchorBlockIdFromId(storyId), className: "sb-anchor" }, children);
import_global.global && import_global.global.__DOCS_CONTEXT__ === void 0 && (import_global.global.__DOCS_CONTEXT__ = (0, import_react.createContext)(null), import_global.global.__DOCS_CONTEXT__.displayName = "DocsContext");
var DocsContext = import_global.global ? import_global.global.__DOCS_CONTEXT__ : (0, import_react.createContext)(null);
var useOf = (moduleExportOrType, validTypes) => (0, import_react.useContext)(DocsContext).resolveOf(moduleExportOrType, validTypes);
var titleCase = (str) => str.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
var getComponentName = (component) => {
  if (component)
    return typeof component == "string" ? component.includes("-") ? titleCase(component) : component : component.__docgenInfo && component.__docgenInfo.displayName ? component.__docgenInfo.displayName : component.name;
};
function scrollToElement(element, block = "start") {
  element.scrollIntoView({ behavior: "smooth", block, inline: "nearest" });
}
function extractComponentArgTypes(component, parameters) {
  let { extractArgTypes } = parameters.docs || {};
  if (!extractArgTypes)
    throw new Error("Args unsupported. See Args documentation for your framework.");
  return extractArgTypes(component);
}
function getArgTypesFromResolved(resolved) {
  if (resolved.type === "component") {
    let { component: component2, projectAnnotations: { parameters: parameters2 } } = resolved;
    return { argTypes: extractComponentArgTypes(component2, parameters2), parameters: parameters2, component: component2 };
  }
  if (resolved.type === "meta") {
    let { preparedMeta: { argTypes: argTypes2, parameters: parameters2, component: component2, subcomponents: subcomponents2 } } = resolved;
    return { argTypes: argTypes2, parameters: parameters2, component: component2, subcomponents: subcomponents2 };
  }
  let { story: { argTypes, parameters, component, subcomponents } } = resolved;
  return { argTypes, parameters, component, subcomponents };
}
var ArgTypes = (props) => {
  var _a;
  let { of } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let resolved = useOf(of || "meta"), { argTypes, parameters, component, subcomponents } = getArgTypesFromResolved(resolved), argTypesParameters = ((_a = parameters.docs) == null ? void 0 : _a.argTypes) || {}, include = props.include ?? argTypesParameters.include, exclude = props.exclude ?? argTypesParameters.exclude, sort = props.sort ?? argTypesParameters.sort, filteredArgTypes = (0, import_preview_api.filterArgTypes)(argTypes, include, exclude);
  if (!(!!subcomponents && Object.keys(subcomponents).length > 0))
    return import_react.default.createElement(ArgsTable, { rows: filteredArgTypes, sort });
  let mainComponentName = getComponentName(component), subcomponentTabs = Object.fromEntries(Object.entries(subcomponents).map(([key, comp]) => [key, { rows: (0, import_preview_api.filterArgTypes)(extractComponentArgTypes(comp, parameters), include, exclude), sort }])), tabs = { [mainComponentName]: { rows: filteredArgTypes, sort }, ...subcomponentTabs };
  return import_react.default.createElement(TabbedArgsTable, { tabs, sort });
};
function argsHash(args) {
  return stringify(args, { allowFunction: false });
}
var SourceContext = (0, import_react.createContext)({ sources: {} });
var UNKNOWN_ARGS_HASH = "--unknown--";
var SourceContainer = ({ children, channel }) => {
  let [sources, setSources] = (0, import_react.useState)({});
  return (0, import_react.useEffect)(() => {
    let handleSnippetRendered = (idOrEvent, inputSource = null, inputFormat = false) => {
      let { id, args = void 0, source, format: format2 } = typeof idOrEvent == "string" ? { id: idOrEvent, source: inputSource, format: inputFormat } : idOrEvent, hash = args ? argsHash(args) : UNKNOWN_ARGS_HASH;
      setSources((current) => ({ ...current, [id]: { ...current[id], [hash]: { code: source, format: format2 } } }));
    };
    return channel.on(SNIPPET_RENDERED, handleSnippetRendered), () => channel.off(SNIPPET_RENDERED, handleSnippetRendered);
  }, []), import_react.default.createElement(SourceContext.Provider, { value: { sources } }, children);
};
var getStorySource = (storyId, args, sourceContext) => {
  let { sources } = sourceContext, sourceMap = sources == null ? void 0 : sources[storyId];
  return (sourceMap == null ? void 0 : sourceMap[argsHash(args)]) || (sourceMap == null ? void 0 : sourceMap[UNKNOWN_ARGS_HASH]) || { code: "" };
};
var getSnippet = ({ snippet, storyContext, typeFromProps, transformFromProps }) => {
  var _a, _b;
  let { __isArgsStory: isArgsStory } = storyContext.parameters, sourceParameters = ((_a = storyContext.parameters.docs) == null ? void 0 : _a.source) || {}, type = typeFromProps || sourceParameters.type || SourceType.AUTO;
  if (sourceParameters.code !== void 0)
    return sourceParameters.code;
  let code = type === SourceType.DYNAMIC || type === SourceType.AUTO && snippet && isArgsStory ? snippet : sourceParameters.originalSource || "";
  return ((_b = transformFromProps ?? sourceParameters.transform) == null ? void 0 : _b(code, storyContext)) || code;
};
var useSourceProps = (props, docsContext, sourceContext) => {
  var _a, _b, _c, _d;
  let story, { of } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  if (of)
    story = docsContext.resolveOf(of, ["story"]).story;
  else
    try {
      story = docsContext.storyById();
    } catch {
    }
  let sourceParameters = ((_b = (_a = story == null ? void 0 : story.parameters) == null ? void 0 : _a.docs) == null ? void 0 : _b.source) || {}, { code } = props, format2 = props.format ?? sourceParameters.format, language = props.language ?? sourceParameters.language ?? "jsx", dark = props.dark ?? sourceParameters.dark ?? false;
  if (!code && !story)
    return { error: "Oh no! The source is not available." };
  if (code)
    return { code, format: format2, language, dark };
  let storyContext = docsContext.getStoryContext(story), argsForSource = props.__forceInitialArgs ? storyContext.initialArgs : storyContext.unmappedArgs, source = getStorySource(story.id, argsForSource, sourceContext);
  return format2 = source.format ?? ((_d = (_c = story.parameters.docs) == null ? void 0 : _c.source) == null ? void 0 : _d.format) ?? false, { code: getSnippet({ snippet: source.code, storyContext: { ...storyContext, args: argsForSource }, typeFromProps: props.type, transformFromProps: props.transform }), format: format2, language, dark };
};
var Source2 = (props) => {
  let sourceContext = (0, import_react.useContext)(SourceContext), docsContext = (0, import_react.useContext)(DocsContext), sourceProps = useSourceProps(props, docsContext, sourceContext);
  return import_react.default.createElement(Source, { ...sourceProps });
};
function useStory(storyId, context) {
  let stories = useStories([storyId], context);
  return stories && stories[0];
}
function useStories(storyIds, context) {
  let [storiesById, setStories] = (0, import_react.useState)({});
  return (0, import_react.useEffect)(() => {
    Promise.all(storyIds.map(async (storyId) => {
      let story = await context.loadStory(storyId);
      setStories((current) => current[storyId] === story ? current : { ...current, [storyId]: story });
    }));
  }), storyIds.map((storyId) => {
    if (storiesById[storyId])
      return storiesById[storyId];
    try {
      return context.storyById(storyId);
    } catch {
      return null;
    }
  });
}
var getStoryId2 = (props, context) => {
  let { of, meta } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  return meta && context.referenceMeta(meta, false), context.resolveOf(of || "story", ["story"]).story.id;
};
var getStoryProps = (props, story, context) => {
  let { parameters = {} } = story || {}, { docs = {} } = parameters, storyParameters = docs.story || {};
  if (docs.disable)
    return null;
  if (props.inline ?? storyParameters.inline ?? false) {
    let height2 = props.height ?? storyParameters.height, autoplay = props.autoplay ?? storyParameters.autoplay ?? false;
    return { story, inline: true, height: height2, autoplay, forceInitialArgs: !!props.__forceInitialArgs, primary: !!props.__primary, renderStoryToElement: context.renderStoryToElement };
  }
  let height = props.height ?? storyParameters.height ?? storyParameters.iframeHeight ?? "100px";
  return { story, inline: false, height, primary: !!props.__primary };
};
var Story2 = (props = { __forceInitialArgs: false, __primary: false }) => {
  let context = (0, import_react.useContext)(DocsContext), storyId = getStoryId2(props, context), story = useStory(storyId, context);
  if (!story)
    return import_react.default.createElement(StorySkeleton, null);
  let storyProps = getStoryProps(props, story, context);
  return storyProps ? import_react.default.createElement(Story, { ...storyProps }) : null;
};
var Canvas = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  let docsContext = (0, import_react.useContext)(DocsContext), sourceContext = (0, import_react.useContext)(SourceContext), { of, source } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let { story } = useOf(of || "story", ["story"]), sourceProps = useSourceProps({ ...source, ...of && { of } }, docsContext, sourceContext), layout = props.layout ?? story.parameters.layout ?? ((_b = (_a = story.parameters.docs) == null ? void 0 : _a.canvas) == null ? void 0 : _b.layout) ?? "padded", withToolbar = props.withToolbar ?? ((_d = (_c = story.parameters.docs) == null ? void 0 : _c.canvas) == null ? void 0 : _d.withToolbar) ?? false, additionalActions = props.additionalActions ?? ((_f = (_e = story.parameters.docs) == null ? void 0 : _e.canvas) == null ? void 0 : _f.additionalActions), sourceState = props.sourceState ?? ((_h = (_g = story.parameters.docs) == null ? void 0 : _g.canvas) == null ? void 0 : _h.sourceState) ?? "hidden", className = props.className ?? ((_j = (_i = story.parameters.docs) == null ? void 0 : _i.canvas) == null ? void 0 : _j.className);
  return import_react.default.createElement(Preview, { withSource: sourceState === "none" ? void 0 : sourceProps, isExpanded: sourceState === "shown", withToolbar, additionalActions, className, layout }, import_react.default.createElement(Story2, { of: of || story.moduleExport, meta: props.meta, ...props.story }));
};
var useGlobals = (story, context) => {
  let storyContext = context.getStoryContext(story), [globals, setGlobals] = (0, import_react.useState)(storyContext.globals);
  return (0, import_react.useEffect)(() => {
    let onGlobalsUpdated = (changed) => {
      setGlobals(changed.globals);
    };
    return context.channel.on(import_core_events.GLOBALS_UPDATED, onGlobalsUpdated), () => context.channel.off(import_core_events.GLOBALS_UPDATED, onGlobalsUpdated);
  }, [context.channel]), [globals];
};
var useArgs = (story, context) => {
  let result = useArgsIfDefined(story, context);
  if (!result)
    throw new Error("No result when story was defined");
  return result;
};
var useArgsIfDefined = (story, context) => {
  let storyContext = story ? context.getStoryContext(story) : { args: {} }, { id: storyId } = story || { id: "none" }, [args, setArgs] = (0, import_react.useState)(storyContext.args);
  (0, import_react.useEffect)(() => {
    let onArgsUpdated = (changed) => {
      changed.storyId === storyId && setArgs(changed.args);
    };
    return context.channel.on(import_core_events.STORY_ARGS_UPDATED, onArgsUpdated), () => context.channel.off(import_core_events.STORY_ARGS_UPDATED, onArgsUpdated);
  }, [storyId, context.channel]);
  let updateArgs = (0, import_react.useCallback)((updatedArgs) => context.channel.emit(import_core_events.UPDATE_STORY_ARGS, { storyId, updatedArgs }), [storyId, context.channel]), resetArgs = (0, import_react.useCallback)((argNames) => context.channel.emit(import_core_events.RESET_STORY_ARGS, { storyId, argNames }), [storyId, context.channel]);
  return story && [args, updateArgs, resetArgs];
};
function extractComponentArgTypes2(component, parameters) {
  let { extractArgTypes } = parameters.docs || {};
  if (!extractArgTypes)
    throw new Error("Args unsupported. See Args documentation for your framework.");
  return extractArgTypes(component);
}
var Controls3 = (props) => {
  var _a;
  let { of } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let context = (0, import_react.useContext)(DocsContext), { story } = context.resolveOf(of || "story", ["story"]), { parameters, argTypes, component, subcomponents } = story, controlsParameters = ((_a = parameters.docs) == null ? void 0 : _a.controls) || {}, include = props.include ?? controlsParameters.include, exclude = props.exclude ?? controlsParameters.exclude, sort = props.sort ?? controlsParameters.sort, [args, updateArgs, resetArgs] = useArgs(story, context), [globals] = useGlobals(story, context), filteredArgTypes = (0, import_preview_api.filterArgTypes)(argTypes, include, exclude);
  if (!(!!subcomponents && Object.keys(subcomponents).length > 0))
    return Object.keys(filteredArgTypes).length > 0 || Object.keys(args).length > 0 ? import_react.default.createElement(ArgsTable, { rows: filteredArgTypes, sort, args, globals, updateArgs, resetArgs }) : null;
  let mainComponentName = getComponentName(component), subcomponentTabs = Object.fromEntries(Object.entries(subcomponents).map(([key, comp]) => [key, { rows: (0, import_preview_api.filterArgTypes)(extractComponentArgTypes2(comp, parameters), include, exclude), sort }])), tabs = { [mainComponentName]: { rows: filteredArgTypes, sort }, ...subcomponentTabs };
  return import_react.default.createElement(TabbedArgsTable, { tabs, sort, args, globals, updateArgs, resetArgs });
};
var { document: document2 } = import_global.global;
var assertIsFn = (val) => {
  if (typeof val != "function")
    throw new Error(`Expected story function, got: ${val}`);
  return val;
};
var AddContext = (props) => {
  let { children, ...rest } = props, parentContext = import_react.default.useContext(DocsContext);
  return import_react.default.createElement(DocsContext.Provider, { value: { ...parentContext, ...rest } }, children);
};
var CodeOrSourceMdx = ({ className, children, ...rest }) => {
  if (typeof className != "string" && (typeof children != "string" || !children.match(/[\n\r]/g)))
    return import_react.default.createElement(Code, null, children);
  let language = className && className.split("-");
  return import_react.default.createElement(Source, { language: language && language[1] || "text", format: false, code: children, ...rest });
};
function navigate(context, url) {
  context.channel.emit(import_core_events.NAVIGATE_URL, url);
}
var A = components2.a;
var AnchorInPage = ({ hash, children }) => {
  let context = (0, import_react.useContext)(DocsContext);
  return import_react.default.createElement(A, { href: hash, target: "_self", onClick: (event) => {
    let id = hash.substring(1);
    document2.getElementById(id) && navigate(context, hash);
  } }, children);
};
var AnchorMdx = (props) => {
  let { href, target, children, ...rest } = props, context = (0, import_react.useContext)(DocsContext);
  if (href) {
    if (href.startsWith("#"))
      return import_react.default.createElement(AnchorInPage, { hash: href }, children);
    if (target !== "_blank" && !href.startsWith("https://"))
      return import_react.default.createElement(A, { href, onClick: (event) => {
        event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && (event.preventDefault(), navigate(context, event.currentTarget.getAttribute("href")));
      }, target, ...rest }, children);
  }
  return import_react.default.createElement(A, { ...props });
};
var SUPPORTED_MDX_HEADERS = ["h1", "h2", "h3", "h4", "h5", "h6"];
var OcticonHeaders = SUPPORTED_MDX_HEADERS.reduce((acc, headerType) => ({ ...acc, [headerType]: newStyled(headerType)({ "& svg": { position: "relative", top: "-0.1em", visibility: "hidden" }, "&:hover svg": { visibility: "visible" } }) }), {});
var OcticonAnchor = newStyled.a(() => ({ float: "left", lineHeight: "inherit", paddingRight: "10px", marginLeft: "-24px", color: "inherit" }));
var HeaderWithOcticonAnchor = ({ as, id, children, ...rest }) => {
  let context = (0, import_react.useContext)(DocsContext), OcticonHeader = OcticonHeaders[as], hash = `#${id}`;
  return import_react.default.createElement(OcticonHeader, { id, ...rest }, import_react.default.createElement(OcticonAnchor, { "aria-hidden": "true", href: hash, tabIndex: -1, target: "_self", onClick: (event) => {
    document2.getElementById(id) && navigate(context, hash);
  } }, import_react.default.createElement(LinkIcon, null)), children);
};
var HeaderMdx = (props) => {
  let { as, id, children, ...rest } = props;
  if (id)
    return import_react.default.createElement(HeaderWithOcticonAnchor, { as, id, ...rest }, children);
  let Component4 = as, { as: omittedAs, ...withoutAs } = props;
  return import_react.default.createElement(Component4, { ...nameSpaceClassNames(withoutAs, as) });
};
var HeadersMdx = SUPPORTED_MDX_HEADERS.reduce((acc, headerType) => ({ ...acc, [headerType]: (props) => import_react.default.createElement(HeaderMdx, { as: headerType, ...props }) }), {});
var Markdown2 = (props) => {
  var _a;
  if (!props.children)
    return null;
  if (typeof props.children != "string")
    throw new Error(esm_default`The Markdown block only accepts children as a single string, but children were of type: '${typeof props.children}'
        This is often caused by not wrapping the child in a template string.
        
        This is invalid:
        <Markdown>
          # Some heading
          A paragraph
        </Markdown>

        Instead do:
        <Markdown>
        {\`
          # Some heading
          A paragraph
        \`}
        </Markdown>
      `);
  return import_react.default.createElement(index_modern_default, { ...props, options: { forceBlock: true, overrides: { code: CodeOrSourceMdx, a: AnchorMdx, ...HeadersMdx, ...(_a = props == null ? void 0 : props.options) == null ? void 0 : _a.overrides }, ...props == null ? void 0 : props.options } });
};
var DescriptionType = ((DescriptionType2) => (DescriptionType2.INFO = "info", DescriptionType2.NOTES = "notes", DescriptionType2.DOCGEN = "docgen", DescriptionType2.AUTO = "auto", DescriptionType2))(DescriptionType || {});
var getDescriptionFromResolvedOf = (resolvedOf) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  switch (resolvedOf.type) {
    case "story":
      return ((_b = (_a = resolvedOf.story.parameters.docs) == null ? void 0 : _a.description) == null ? void 0 : _b.story) || null;
    case "meta": {
      let { parameters, component } = resolvedOf.preparedMeta, metaDescription = (_d = (_c = parameters.docs) == null ? void 0 : _c.description) == null ? void 0 : _d.component;
      return metaDescription || ((_f = (_e = parameters.docs) == null ? void 0 : _e.extractComponentDescription) == null ? void 0 : _f.call(_e, component, { component, parameters })) || null;
    }
    case "component": {
      let { component, projectAnnotations: { parameters } } = resolvedOf;
      return ((_h = (_g = parameters.docs) == null ? void 0 : _g.extractComponentDescription) == null ? void 0 : _h.call(_g, component, { component, parameters })) || null;
    }
    default:
      throw new Error(`Unrecognized module type resolved from 'useOf', got: ${resolvedOf.type}`);
  }
};
var DescriptionContainer = (props) => {
  let { of } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let resolvedOf = useOf(of || "meta"), markdown = getDescriptionFromResolvedOf(resolvedOf);
  return markdown ? import_react.default.createElement(Markdown2, null, markdown) : null;
};
var Wrapper10 = newStyled.div(({ theme }) => ({ width: "10rem", "@media (max-width: 768px)": { display: "none" } }));
var Content = newStyled.div(({ theme }) => ({ position: "fixed", bottom: 0, top: 0, width: "10rem", paddingTop: "4rem", paddingBottom: "2rem", overflowY: "auto", fontFamily: theme.typography.fonts.base, fontSize: theme.typography.size.s2, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", WebkitTapHighlightColor: "rgba(0, 0, 0, 0)", WebkitOverflowScrolling: "touch", "& *": { boxSizing: "border-box" }, "& > .toc-wrapper > .toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${theme.color.mediumlight}`, ".toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${theme.color.mediumlight}`, ".toc-list": { paddingLeft: 0, borderLeft: `solid 2px ${theme.color.mediumlight}` } } }, "& .toc-list-item": { position: "relative", listStyleType: "none", marginLeft: 20, paddingTop: 3, paddingBottom: 3 }, "& .toc-list-item::before": { content: '""', position: "absolute", height: "100%", top: 0, left: 0, transform: "translateX(calc(-2px - 20px))", borderLeft: `solid 2px ${theme.color.mediumdark}`, opacity: 0, transition: "opacity 0.2s" }, "& .toc-list-item.is-active-li::before": { opacity: 1 }, "& .toc-list-item > a": { color: theme.color.defaultText, textDecoration: "none" }, "& .toc-list-item.is-active-li > a": { fontWeight: 600, color: theme.color.secondary, textDecoration: "none" } }));
var Heading = newStyled.p(({ theme }) => ({ fontWeight: 600, fontSize: "0.875em", color: theme.textColor, textTransform: "uppercase", marginBottom: 10 }));
var OptionalTitle = ({ title }) => title === null ? null : typeof title == "string" ? import_react.default.createElement(Heading, null, title) : title;
var TableOfContents = ({ title, disable, headingSelector, contentsSelector, ignoreSelector, unsafeTocbotOptions }) => ((0, import_react.useEffect)(() => {
  let configuration = { tocSelector: ".toc-wrapper", contentSelector: contentsSelector ?? ".sbdocs-content", headingSelector: headingSelector ?? "h3", ignoreSelector: ignoreSelector ?? ".docs-story *, .skip-toc", headingsOffset: 40, scrollSmoothOffset: -40, orderedList: false, onClick: () => false, ...unsafeTocbotOptions }, timeout = setTimeout(() => tocbot.init(configuration), 100);
  return () => {
    clearTimeout(timeout), tocbot.destroy();
  };
}, [disable]), import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(Wrapper10, null, disable ? null : import_react.default.createElement(Content, null, import_react.default.createElement(OptionalTitle, { title: title || null }), import_react.default.createElement("div", { className: "toc-wrapper" })))));
var { document: document3, window: globalWindow3 } = import_global.global;
var DocsContainer = ({ context, theme, children }) => {
  var _a, _b, _c, _d, _e;
  let toc;
  try {
    toc = (_b = (_a = context.resolveOf("meta", ["meta"]).preparedMeta.parameters) == null ? void 0 : _a.docs) == null ? void 0 : _b.toc;
  } catch {
    toc = (_e = (_d = (_c = context == null ? void 0 : context.projectAnnotations) == null ? void 0 : _c.parameters) == null ? void 0 : _d.docs) == null ? void 0 : _e.toc;
  }
  return (0, import_react.useEffect)(() => {
    let url;
    try {
      if (url = new URL(globalWindow3.parent.location.toString()), url.hash) {
        let element = document3.getElementById(url.hash.substring(1));
        element && setTimeout(() => {
          scrollToElement(element);
        }, 200);
      }
    } catch {
    }
  }), import_react.default.createElement(DocsContext.Provider, { value: context }, import_react.default.createElement(SourceContainer, { channel: context.channel }, import_react.default.createElement(ThemeProvider, { theme: ensure(theme) }, import_react.default.createElement(DocsPageWrapper, { toc: toc ? import_react.default.createElement(TableOfContents, { className: "sbdocs sbdocs-toc--custom", ...toc }) : null }, children))));
};
var STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;
var extractTitle = (title) => {
  let groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
  return groups && groups[groups.length - 1] || title;
};
var Title2 = ({ children }) => {
  let context = (0, import_react.useContext)(DocsContext), content = children || extractTitle(context.storyById().title);
  return content ? import_react.default.createElement(Title, { className: "sbdocs-title sb-unstyled" }, content) : null;
};
var Subtitle2 = ({ children }) => {
  var _a;
  let docsContext = (0, import_react.useContext)(DocsContext), content = children || ((_a = docsContext.storyById().parameters) == null ? void 0 : _a.componentSubtitle);
  return content ? import_react.default.createElement(Subtitle, { className: "sbdocs-subtitle sb-unstyled" }, content) : null;
};
var Subheading = ({ children, disableAnchor }) => {
  if (disableAnchor || typeof children != "string")
    return import_react.default.createElement(H3, null, children);
  let tagID = globalThis.encodeURIComponent(children.toLowerCase());
  return import_react.default.createElement(HeaderMdx, { as: "h3", id: tagID }, children);
};
var DocsStory = ({ of, expanded = true, withToolbar: withToolbarProp = false, __forceInitialArgs = false, __primary = false }) => {
  var _a, _b;
  let { story } = useOf(of || "story", ["story"]), withToolbar = ((_b = (_a = story.parameters.docs) == null ? void 0 : _a.canvas) == null ? void 0 : _b.withToolbar) ?? withToolbarProp;
  return import_react.default.createElement(Anchor, { storyId: story.id }, expanded && import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(Subheading, null, story.name), import_react.default.createElement(DescriptionContainer, { of })), import_react.default.createElement(Canvas, { of, withToolbar, story: { __forceInitialArgs, __primary }, source: { __forceInitialArgs } }));
};
var Primary = (props) => {
  let { of } = props;
  if ("of" in props && of === void 0)
    throw new Error("Unexpected `of={undefined}`, did you mistype a CSF file reference?");
  let { csfFile } = useOf(of || "meta", ["meta"]), primaryStory = (0, import_react.useContext)(DocsContext).componentStoriesFromCSFFile(csfFile)[0];
  return primaryStory ? import_react.default.createElement(DocsStory, { of: primaryStory.moduleExport, expanded: false, __primary: true, withToolbar: true }) : null;
};
var Heading2 = ({ children, disableAnchor, ...props }) => {
  if (disableAnchor || typeof children != "string")
    return import_react.default.createElement(H2, null, children);
  let tagID = children.toLowerCase().replace(/[^a-z0-9]/gi, "-");
  return import_react.default.createElement(HeaderMdx, { as: "h2", id: tagID, ...props }, children);
};
var StyledHeading = newStyled(Heading2)(({ theme }) => ({ fontSize: `${theme.typography.size.s2 - 1}px`, fontWeight: theme.typography.weight.bold, lineHeight: "16px", letterSpacing: "0.35em", textTransform: "uppercase", color: theme.textMutedColor, border: 0, marginBottom: "12px", "&:first-of-type": { marginTop: "56px" } }));
var Stories = ({ title = "Stories", includePrimary = true }) => {
  var _a;
  let { componentStories, projectAnnotations, getStoryContext } = (0, import_react.useContext)(DocsContext), stories = componentStories(), { stories: { filter } = { filter: void 0 } } = ((_a = projectAnnotations.parameters) == null ? void 0 : _a.docs) || {};
  return filter && (stories = stories.filter((story) => filter(story, getStoryContext(story)))), includePrimary || (stories = stories.slice(1)), !stories || stories.length === 0 ? null : import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(StyledHeading, null, title), stories.map((story) => story && import_react.default.createElement(DocsStory, { key: story.id, of: story.moduleExport, expanded: true, __forceInitialArgs: true })));
};
var DocsPage = () => {
  let resolvedOf = useOf("meta", ["meta"]), { stories } = resolvedOf.csfFile, isSingleStory = Object.keys(stories).length === 1;
  return import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement(Title2, null), import_react.default.createElement(Subtitle2, null), import_react.default.createElement(DescriptionContainer, { of: "meta" }), isSingleStory ? import_react.default.createElement(DescriptionContainer, { of: "story" }) : null, import_react.default.createElement(Primary, null), import_react.default.createElement(Controls3, null), isSingleStory ? null : import_react.default.createElement(Stories, null));
};
function Docs({ context, docsParameter }) {
  let Container = docsParameter.container || DocsContainer, Page = docsParameter.page || DocsPage;
  return import_react.default.createElement(Container, { context, theme: docsParameter.theme }, import_react.default.createElement(Page, null));
}
var ExternalDocsContext = class extends import_preview_api.DocsContext {
  constructor(channel, store, renderStoryToElement, processMetaExports) {
    super(channel, store, renderStoryToElement, []);
    this.channel = channel;
    this.store = store;
    this.renderStoryToElement = renderStoryToElement;
    this.processMetaExports = processMetaExports;
    this.referenceMeta = (metaExports, attach) => {
      let csfFile = this.processMetaExports(metaExports);
      this.referenceCSFFile(csfFile), super.referenceMeta(metaExports, attach);
    };
  }
};
var ConstantMap = class {
  constructor(prefix) {
    this.prefix = prefix;
    this.entries = /* @__PURE__ */ new Map();
  }
  get(key) {
    return this.entries.has(key) || this.entries.set(key, `${this.prefix}${this.entries.size}`), this.entries.get(key);
  }
};
var ExternalPreview = class extends import_preview_api.Preview {
  constructor(projectAnnotations) {
    super((path) => Promise.resolve(this.moduleExportsByImportPath[path]), () => (0, import_preview_api.composeConfigs)([{ parameters: { docs: { story: { inline: true } } } }, this.projectAnnotations]), new import_channels.Channel({}));
    this.projectAnnotations = projectAnnotations;
    this.importPaths = new ConstantMap("./importPath/");
    this.titles = new ConstantMap("title-");
    this.storyIndex = { v: 4, entries: {} };
    this.moduleExportsByImportPath = {};
    this.processMetaExports = (metaExports) => {
      let importPath = this.importPaths.get(metaExports);
      this.moduleExportsByImportPath[importPath] = metaExports;
      let title = metaExports.default.title || this.titles.get(metaExports), csfFile = this.storyStoreValue.processCSFFileWithCache(metaExports, importPath, title);
      return Object.values(csfFile.stories).forEach(({ id, name }) => {
        this.storyIndex.entries[id] = { id, importPath, title, name, type: "story" };
      }), this.onStoriesChanged({ storyIndex: this.storyIndex }), csfFile;
    };
    this.docsContext = () => new ExternalDocsContext(this.channel, this.storyStoreValue, this.renderStoryToElement.bind(this), this.processMetaExports.bind(this));
  }
  async getStoryIndexFromServer() {
    return this.storyIndex;
  }
};
function usePreview(projectAnnotations) {
  let previewRef = (0, import_react.useRef)();
  return previewRef.current || (previewRef.current = new ExternalPreview(projectAnnotations)), previewRef.current;
}
function ExternalDocs({ projectAnnotationsList, children }) {
  var _a;
  let projectAnnotations = (0, import_preview_api.composeConfigs)(projectAnnotationsList), preview2 = usePreview(projectAnnotations), docsParameter = { ...(_a = projectAnnotations.parameters) == null ? void 0 : _a.docs, page: () => children };
  return import_react.default.createElement(Docs, { docsParameter, context: preview2.docsContext() });
}
var preview;
var ExternalDocsContainer = ({ projectAnnotations, children }) => (preview || (preview = new ExternalPreview(projectAnnotations)), import_react.default.createElement(DocsContext.Provider, { value: preview.docsContext() }, import_react.default.createElement(ThemeProvider, { theme: ensure(themes.light) }, children)));
var Meta = ({ of }) => {
  let context = (0, import_react.useContext)(DocsContext);
  of && context.referenceMeta(of, true);
  try {
    let primary = context.storyById();
    return import_react.default.createElement(Anchor, { storyId: primary.id });
  } catch {
    return null;
  }
};
var Unstyled = (props) => import_react.default.createElement("div", { ...props, className: "sb-unstyled" });
var Wrapper11 = ({ children }) => import_react.default.createElement("div", { style: { fontFamily: "sans-serif" } }, children);
var PRIMARY_STORY = "^";

export {
  BooleanControl,
  parseDate,
  parseTime,
  formatDate,
  formatTime,
  DateControl,
  parse2,
  format,
  NumberControl,
  OptionsControl,
  ObjectControl,
  RangeControl,
  TextControl,
  FilesControl,
  ColorControl,
  ArgsTable,
  Typeset,
  ColorItem,
  ColorPalette,
  IconItem,
  IconGallery,
  anchorBlockIdFromId,
  Anchor,
  DocsContext,
  useOf,
  ArgTypes,
  argsHash,
  SourceContext,
  UNKNOWN_ARGS_HASH,
  SourceContainer,
  useSourceProps,
  Source2,
  getStoryId2,
  getStoryProps,
  Story2,
  Canvas,
  Controls3,
  assertIsFn,
  AddContext,
  CodeOrSourceMdx,
  AnchorMdx,
  HeaderMdx,
  HeadersMdx,
  Markdown2,
  DescriptionType,
  DescriptionContainer,
  DocsContainer,
  extractTitle,
  Title2,
  Subtitle2,
  Subheading,
  DocsStory,
  Primary,
  Heading2,
  Stories,
  DocsPage,
  Docs,
  ExternalDocs,
  ExternalDocsContainer,
  Meta,
  Unstyled,
  Wrapper11,
  PRIMARY_STORY
};
//# sourceMappingURL=chunk-7WF72OTG.js.map
