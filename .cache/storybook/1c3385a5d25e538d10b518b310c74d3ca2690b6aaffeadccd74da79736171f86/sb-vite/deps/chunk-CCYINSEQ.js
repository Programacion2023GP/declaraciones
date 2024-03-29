import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/markdown-to-jsx/dist/index.modern.js
var t = __toESM(require_react());
function n() {
  return n = Object.assign ? Object.assign.bind() : function(t2) {
    for (var n2 = 1; n2 < arguments.length; n2++) {
      var e2 = arguments[n2];
      for (var r2 in e2)
        Object.prototype.hasOwnProperty.call(e2, r2) && (t2[r2] = e2[r2]);
    }
    return t2;
  }, n.apply(this, arguments);
}
var e = ["children", "options"];
var r = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((t2, n2) => (t2[n2.toLowerCase()] = n2, t2), { for: "htmlFor" });
var o = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" };
var c = ["style", "script"];
var a = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi;
var _ = /mailto:/i;
var u = /\n{2,}$/;
var i = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/;
var s = /^ *> ?/gm;
var l = /^ {2,}\n/;
var f = /^(?:( *[-*_])){3,} *(?:\n *)+\n/;
var d = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/;
var p = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/;
var m = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/;
var g = /^(?:\n *)*\n/;
var y = /\r\n?/g;
var h = /^\[\^([^\]]+)](:.*)\n/;
var k = /^\[\^([^\]]+)]/;
var x = /\f/g;
var b = /^\s*?\[(x|\s)\]/;
var $ = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
var v = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
var S = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/;
var z = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i;
var w = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
var A = /^<!--[\s\S]*?(?:-->)/;
var E = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/;
var L = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i;
var M = /^\{.*\}$/;
var O = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/;
var I = /^<([^ >]+@[^ >]+)>/;
var j = /^<([^ >]+:\/[^ >]+)>/;
var B = /-([a-z])?/gi;
var R = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/;
var T = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/;
var C = /^!\[([^\]]*)\] ?\[([^\]]*)\]/;
var D = /^\[([^\]]*)\] ?\[([^\]]*)\]/;
var F = /(\[|\])/g;
var N = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/;
var P = /\t/g;
var Z = /^ *\| */;
var G = /(^ *\||\| *$)/g;
var H = / *$/;
var q = /^ *:-+: *$/;
var U = /^ *:-+ *$/;
var V = /^ *-+: *$/;
var W = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/;
var Q = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/;
var X = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/;
var J = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/;
var K = /^\\([^0-9A-Za-z\s])/;
var Y = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i;
var tt = /^\n+/;
var nt = /^([ \t]*)/;
var et = /\\([^\\])/g;
var rt = / *\n+$/;
var ot = /(?:^|\n)( *)$/;
var ct = "(?:\\d+\\.)";
var at = "(?:[*+-])";
function _t(t2) {
  return "( *)(" + (1 === t2 ? ct : at) + ") +";
}
var ut = _t(1);
var it = _t(2);
function st(t2) {
  return new RegExp("^" + (1 === t2 ? ut : it));
}
var lt = st(1);
var ft = st(2);
function dt(t2) {
  return new RegExp("^" + (1 === t2 ? ut : it) + "[^\\n]*(?:\\n(?!\\1" + (1 === t2 ? ct : at) + " )[^\\n]*)*(\\n|$)", "gm");
}
var pt = dt(1);
var mt = dt(2);
function gt(t2) {
  const n2 = 1 === t2 ? ct : at;
  return new RegExp("^( *)(" + n2 + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + n2 + " (?!" + n2 + " ))\\n*|\\s*\\n*$)");
}
var yt = gt(1);
var ht = gt(2);
function kt(t2, n2) {
  const e2 = 1 === n2, r2 = e2 ? yt : ht, o2 = e2 ? pt : mt, c2 = e2 ? lt : ft;
  return { t(t3, n3, e3) {
    const o3 = ot.exec(e3);
    return o3 && (n3.o || !n3._ && !n3.u) ? r2.exec(t3 = o3[1] + t3) : null;
  }, i: Ht.HIGH, l(t3, n3, r3) {
    const a2 = e2 ? +t3[2] : void 0, _2 = t3[0].replace(u, "\n").match(o2);
    let i2 = false;
    return { p: _2.map(function(t4, e3) {
      const o3 = c2.exec(t4)[0].length, a3 = new RegExp("^ {1," + o3 + "}", "gm"), u2 = t4.replace(a3, "").replace(c2, ""), s2 = e3 === _2.length - 1, l2 = -1 !== u2.indexOf("\n\n") || s2 && i2;
      i2 = l2;
      const f2 = r3._, d2 = r3.o;
      let p2;
      r3.o = true, l2 ? (r3._ = false, p2 = u2.replace(rt, "\n\n")) : (r3._ = true, p2 = u2.replace(rt, ""));
      const m2 = n3(p2, r3);
      return r3._ = f2, r3.o = d2, m2;
    }), m: e2, g: a2 };
  }, h: (n3, e3, r3) => t2(n3.m ? "ol" : "ul", { key: r3.k, start: n3.g }, n3.p.map(function(n4, o3) {
    return t2("li", { key: o3 }, e3(n4, r3));
  })) };
}
var xt = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
var bt = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
var $t = [i, d, p, $, S, v, A, R, pt, yt, mt, ht];
var vt = [...$t, /^[^\n]+(?:  \n|\n{2,})/, z, L];
function St(t2) {
  return t2.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function zt(t2) {
  return V.test(t2) ? "right" : q.test(t2) ? "center" : U.test(t2) ? "left" : null;
}
function wt(t2, n2, e2) {
  const r2 = e2.$;
  e2.$ = true;
  const o2 = n2(t2.trim(), e2);
  e2.$ = r2;
  let c2 = [[]];
  return o2.forEach(function(t3, n3) {
    "tableSeparator" === t3.type ? 0 !== n3 && n3 !== o2.length - 1 && c2.push([]) : ("text" !== t3.type || null != o2[n3 + 1] && "tableSeparator" !== o2[n3 + 1].type || (t3.v = t3.v.replace(H, "")), c2[c2.length - 1].push(t3));
  }), c2;
}
function At(t2, n2, e2) {
  e2._ = true;
  const r2 = wt(t2[1], n2, e2), o2 = t2[2].replace(G, "").split("|").map(zt), c2 = function(t3, n3, e3) {
    return t3.trim().split("\n").map(function(t4) {
      return wt(t4, n3, e3);
    });
  }(t2[3], n2, e2);
  return e2._ = false, { S: o2, A: c2, L: r2, type: "table" };
}
function Et(t2, n2) {
  return null == t2.S[n2] ? {} : { textAlign: t2.S[n2] };
}
function Lt(t2) {
  return function(n2, e2) {
    return e2._ ? t2.exec(n2) : null;
  };
}
function Mt(t2) {
  return function(n2, e2) {
    return e2._ || e2.u ? t2.exec(n2) : null;
  };
}
function Ot(t2) {
  return function(n2, e2) {
    return e2._ || e2.u ? null : t2.exec(n2);
  };
}
function It(t2) {
  return function(n2) {
    return t2.exec(n2);
  };
}
function jt(t2, n2, e2) {
  if (n2._ || n2.u)
    return null;
  if (e2 && !e2.endsWith("\n"))
    return null;
  let r2 = "";
  t2.split("\n").every((t3) => !$t.some((n3) => n3.test(t3)) && (r2 += t3 + "\n", t3.trim()));
  const o2 = r2.trimEnd();
  return "" == o2 ? null : [r2, o2];
}
function Bt(t2) {
  try {
    if (decodeURIComponent(t2).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch (t3) {
    return null;
  }
  return t2;
}
function Rt(t2) {
  return t2.replace(et, "$1");
}
function Tt(t2, n2, e2) {
  const r2 = e2._ || false, o2 = e2.u || false;
  e2._ = true, e2.u = true;
  const c2 = t2(n2, e2);
  return e2._ = r2, e2.u = o2, c2;
}
function Ct(t2, n2, e2) {
  const r2 = e2._ || false, o2 = e2.u || false;
  e2._ = false, e2.u = true;
  const c2 = t2(n2, e2);
  return e2._ = r2, e2.u = o2, c2;
}
function Dt(t2, n2, e2) {
  return e2._ = false, t2(n2, e2);
}
var Ft = (t2, n2, e2) => ({ v: Tt(n2, t2[1], e2) });
function Nt() {
  return {};
}
function Pt() {
  return null;
}
function Zt(...t2) {
  return t2.filter(Boolean).join(" ");
}
function Gt(t2, n2, e2) {
  let r2 = t2;
  const o2 = n2.split(".");
  for (; o2.length && (r2 = r2[o2[0]], void 0 !== r2); )
    o2.shift();
  return r2 || e2;
}
var Ht;
function qt(e2, u2 = {}) {
  u2.overrides = u2.overrides || {}, u2.slugify = u2.slugify || St, u2.namedCodesToUnicode = u2.namedCodesToUnicode ? n({}, o, u2.namedCodesToUnicode) : o;
  const G2 = u2.createElement || t.createElement;
  function H2(t2, e3, ...r2) {
    const o2 = Gt(u2.overrides, `${t2}.props`, {});
    return G2(function(t3, n2) {
      const e4 = Gt(n2, t3);
      return e4 ? "function" == typeof e4 || "object" == typeof e4 && "render" in e4 ? e4 : Gt(n2, `${t3}.component`, t3) : t3;
    }(t2, u2.overrides), n({}, e3, o2, { className: Zt(null == e3 ? void 0 : e3.className, o2.className) || void 0 }), ...r2);
  }
  function q2(n2) {
    let e3 = false;
    u2.forceInline ? e3 = true : u2.forceBlock || (e3 = false === N.test(n2));
    const r2 = ct2(ot2(e3 ? n2 : `${n2.trimEnd().replace(tt, "")}

`, { _: e3 }));
    for (; "string" == typeof r2[r2.length - 1] && !r2[r2.length - 1].trim(); )
      r2.pop();
    if (null === u2.wrapper)
      return r2;
    const o2 = u2.wrapper || (e3 ? "span" : "div");
    let c2;
    if (r2.length > 1 || u2.forceWrapper)
      c2 = r2;
    else {
      if (1 === r2.length)
        return c2 = r2[0], "string" == typeof c2 ? H2("span", { key: "outer" }, c2) : c2;
      c2 = null;
    }
    return t.createElement(o2, { key: "outer" }, c2);
  }
  function U2(n2) {
    const e3 = n2.match(a);
    return e3 ? e3.reduce(function(n3, e4, o2) {
      const c2 = e4.indexOf("=");
      if (-1 !== c2) {
        const a2 = function(t2) {
          return -1 !== t2.indexOf("-") && null === t2.match(E) && (t2 = t2.replace(B, function(t3, n4) {
            return n4.toUpperCase();
          })), t2;
        }(e4.slice(0, c2)).trim(), _2 = function(t2) {
          const n4 = t2[0];
          return ('"' === n4 || "'" === n4) && t2.length >= 2 && t2[t2.length - 1] === n4 ? t2.slice(1, -1) : t2;
        }(e4.slice(c2 + 1).trim()), u3 = r[a2] || a2, i2 = n3[u3] = function(t2, n4) {
          return "style" === t2 ? n4.split(/;\s?/).reduce(function(t3, n5) {
            const e5 = n5.slice(0, n5.indexOf(":"));
            return t3[e5.replace(/(-[a-z])/g, (t4) => t4[1].toUpperCase())] = n5.slice(e5.length + 1).trim(), t3;
          }, {}) : "href" === t2 ? Bt(n4) : (n4.match(M) && (n4 = n4.slice(1, n4.length - 1)), "true" === n4 || "false" !== n4 && n4);
        }(a2, _2);
        "string" == typeof i2 && (z.test(i2) || L.test(i2)) && (n3[u3] = t.cloneElement(q2(i2.trim()), { key: o2 }));
      } else
        "style" !== e4 && (n3[r[e4] || e4] = true);
      return n3;
    }, {}) : null;
  }
  const V2 = [], et2 = {}, rt2 = { blockQuote: { t: Ot(i), i: Ht.HIGH, l: (t2, n2, e3) => ({ v: n2(t2[0].replace(s, ""), e3) }), h: (t2, n2, e3) => H2("blockquote", { key: e3.k }, n2(t2.v, e3)) }, breakLine: { t: It(l), i: Ht.HIGH, l: Nt, h: (t2, n2, e3) => H2("br", { key: e3.k }) }, breakThematic: { t: Ot(f), i: Ht.HIGH, l: Nt, h: (t2, n2, e3) => H2("hr", { key: e3.k }) }, codeBlock: { t: Ot(p), i: Ht.MAX, l: (t2) => ({ v: t2[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (t2, e3, r2) => H2("pre", { key: r2.k }, H2("code", n({}, t2.O, { className: t2.M ? `lang-${t2.M}` : "" }), t2.v)) }, codeFenced: { t: Ot(d), i: Ht.MAX, l: (t2) => ({ O: U2(t2[3] || ""), v: t2[4], M: t2[2] || void 0, type: "codeBlock" }) }, codeInline: { t: Mt(m), i: Ht.LOW, l: (t2) => ({ v: t2[2] }), h: (t2, n2, e3) => H2("code", { key: e3.k }, t2.v) }, footnote: { t: Ot(h), i: Ht.MAX, l: (t2) => (V2.push({ I: t2[2], j: t2[1] }), {}), h: Pt }, footnoteReference: { t: Lt(k), i: Ht.HIGH, l: (t2) => ({ v: t2[1], B: `#${u2.slugify(t2[1])}` }), h: (t2, n2, e3) => H2("a", { key: e3.k, href: Bt(t2.B) }, H2("sup", { key: e3.k }, t2.v)) }, gfmTask: { t: Lt(b), i: Ht.HIGH, l: (t2) => ({ R: "x" === t2[1].toLowerCase() }), h: (t2, n2, e3) => H2("input", { checked: t2.R, key: e3.k, readOnly: true, type: "checkbox" }) }, heading: { t: Ot(u2.enforceAtxHeadings ? v : $), i: Ht.HIGH, l: (t2, n2, e3) => ({ v: Tt(n2, t2[2], e3), T: u2.slugify(t2[2]), C: t2[1].length }), h: (t2, n2, e3) => H2(`h${t2.C}`, { id: t2.T, key: e3.k }, n2(t2.v, e3)) }, headingSetext: { t: Ot(S), i: Ht.MAX, l: (t2, n2, e3) => ({ v: Tt(n2, t2[1], e3), C: "=" === t2[2] ? 1 : 2, type: "heading" }) }, htmlComment: { t: It(A), i: Ht.HIGH, l: () => ({}), h: Pt }, image: { t: Mt(bt), i: Ht.HIGH, l: (t2) => ({ D: t2[1], B: Rt(t2[2]), F: t2[3] }), h: (t2, n2, e3) => H2("img", { key: e3.k, alt: t2.D || void 0, title: t2.F || void 0, src: Bt(t2.B) }) }, link: { t: Lt(xt), i: Ht.LOW, l: (t2, n2, e3) => ({ v: Ct(n2, t2[1], e3), B: Rt(t2[2]), F: t2[3] }), h: (t2, n2, e3) => H2("a", { key: e3.k, href: Bt(t2.B), title: t2.F }, n2(t2.v, e3)) }, linkAngleBraceStyleDetector: { t: Lt(j), i: Ht.MAX, l: (t2) => ({ v: [{ v: t2[1], type: "text" }], B: t2[1], type: "link" }) }, linkBareUrlDetector: { t: (t2, n2) => n2.N ? null : Lt(O)(t2, n2), i: Ht.MAX, l: (t2) => ({ v: [{ v: t2[1], type: "text" }], B: t2[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: Lt(I), i: Ht.MAX, l(t2) {
    let n2 = t2[1], e3 = t2[1];
    return _.test(e3) || (e3 = "mailto:" + e3), { v: [{ v: n2.replace("mailto:", ""), type: "text" }], B: e3, type: "link" };
  } }, orderedList: kt(H2, 1), unorderedList: kt(H2, 2), newlineCoalescer: { t: Ot(g), i: Ht.LOW, l: Nt, h: () => "\n" }, paragraph: { t: jt, i: Ht.LOW, l: Ft, h: (t2, n2, e3) => H2("p", { key: e3.k }, n2(t2.v, e3)) }, ref: { t: Lt(T), i: Ht.MAX, l: (t2) => (et2[t2[1]] = { B: t2[2], F: t2[4] }, {}), h: Pt }, refImage: { t: Mt(C), i: Ht.MAX, l: (t2) => ({ D: t2[1] || void 0, P: t2[2] }), h: (t2, n2, e3) => H2("img", { key: e3.k, alt: t2.D, src: Bt(et2[t2.P].B), title: et2[t2.P].F }) }, refLink: { t: Lt(D), i: Ht.MAX, l: (t2, n2, e3) => ({ v: n2(t2[1], e3), Z: n2(t2[0].replace(F, "\\$1"), e3), P: t2[2] }), h: (t2, n2, e3) => et2[t2.P] ? H2("a", { key: e3.k, href: Bt(et2[t2.P].B), title: et2[t2.P].F }, n2(t2.v, e3)) : H2("span", { key: e3.k }, n2(t2.Z, e3)) }, table: { t: Ot(R), i: Ht.HIGH, l: At, h: (t2, n2, e3) => H2("table", { key: e3.k }, H2("thead", null, H2("tr", null, t2.L.map(function(r2, o2) {
    return H2("th", { key: o2, style: Et(t2, o2) }, n2(r2, e3));
  }))), H2("tbody", null, t2.A.map(function(r2, o2) {
    return H2("tr", { key: o2 }, r2.map(function(r3, o3) {
      return H2("td", { key: o3, style: Et(t2, o3) }, n2(r3, e3));
    }));
  }))) }, tableSeparator: { t: function(t2, n2) {
    return n2.$ ? (n2._ = true, Z.exec(t2)) : null;
  }, i: Ht.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: It(Y), i: Ht.MIN, l: (t2) => ({ v: t2[0].replace(w, (t3, n2) => u2.namedCodesToUnicode[n2] ? u2.namedCodesToUnicode[n2] : t3) }), h: (t2) => t2.v }, textBolded: { t: Mt(W), i: Ht.MED, l: (t2, n2, e3) => ({ v: n2(t2[2], e3) }), h: (t2, n2, e3) => H2("strong", { key: e3.k }, n2(t2.v, e3)) }, textEmphasized: { t: Mt(Q), i: Ht.LOW, l: (t2, n2, e3) => ({ v: n2(t2[2], e3) }), h: (t2, n2, e3) => H2("em", { key: e3.k }, n2(t2.v, e3)) }, textEscaped: { t: Mt(K), i: Ht.HIGH, l: (t2) => ({ v: t2[1], type: "text" }) }, textMarked: { t: Mt(X), i: Ht.LOW, l: Ft, h: (t2, n2, e3) => H2("mark", { key: e3.k }, n2(t2.v, e3)) }, textStrikethroughed: { t: Mt(J), i: Ht.LOW, l: Ft, h: (t2, n2, e3) => H2("del", { key: e3.k }, n2(t2.v, e3)) } };
  true !== u2.disableParsingRawHTML && (rt2.htmlBlock = { t: It(z), i: Ht.HIGH, l(t2, n2, e3) {
    const [, r2] = t2[3].match(nt), o2 = new RegExp(`^${r2}`, "gm"), a2 = t2[3].replace(o2, ""), _2 = (u3 = a2, vt.some((t3) => t3.test(u3)) ? Dt : Tt);
    var u3;
    const i2 = t2[1].toLowerCase(), s2 = -1 !== c.indexOf(i2);
    e3.N = e3.N || "a" === i2;
    const l2 = s2 ? t2[3] : _2(n2, a2, e3);
    return e3.N = false, { O: U2(t2[2]), v: l2, G: s2, H: s2 ? i2 : t2[1] };
  }, h: (t2, e3, r2) => H2(t2.H, n({ key: r2.k }, t2.O), t2.G ? t2.v : e3(t2.v, r2)) }, rt2.htmlSelfClosing = { t: It(L), i: Ht.HIGH, l: (t2) => ({ O: U2(t2[2] || ""), H: t2[1] }), h: (t2, e3, r2) => H2(t2.H, n({}, t2.O, { key: r2.k })) });
  const ot2 = function(t2) {
    let n2 = Object.keys(t2);
    function e3(r2, o2) {
      let c2 = [], a2 = "";
      for (; r2; ) {
        let _2 = 0;
        for (; _2 < n2.length; ) {
          const u3 = n2[_2], i2 = t2[u3], s2 = i2.t(r2, o2, a2);
          if (s2) {
            const t3 = s2[0];
            r2 = r2.substring(t3.length);
            const n3 = i2.l(s2, e3, o2);
            null == n3.type && (n3.type = u3), c2.push(n3), a2 = t3;
            break;
          }
          _2++;
        }
      }
      return c2;
    }
    return n2.sort(function(n3, e4) {
      let r2 = t2[n3].i, o2 = t2[e4].i;
      return r2 !== o2 ? r2 - o2 : n3 < e4 ? -1 : 1;
    }), function(t3, n3) {
      return e3(function(t4) {
        return t4.replace(y, "\n").replace(x, "").replace(P, "    ");
      }(t3), n3);
    };
  }(rt2), ct2 = (at2 = /* @__PURE__ */ function(t2) {
    return function(n2, e3, r2) {
      return t2[n2.type].h(n2, e3, r2);
    };
  }(rt2), function t2(n2, e3 = {}) {
    if (Array.isArray(n2)) {
      const r2 = e3.k, o2 = [];
      let c2 = false;
      for (let r3 = 0; r3 < n2.length; r3++) {
        e3.k = r3;
        const a2 = t2(n2[r3], e3), _2 = "string" == typeof a2;
        _2 && c2 ? o2[o2.length - 1] += a2 : null !== a2 && o2.push(a2), c2 = _2;
      }
      return e3.k = r2, o2;
    }
    return at2(n2, t2, e3);
  });
  var at2;
  const _t2 = q2(e2);
  return V2.length ? H2("div", null, _t2, H2("footer", { key: "footer" }, V2.map(function(t2) {
    return H2("div", { id: u2.slugify(t2.j), key: t2.j }, t2.j, ct2(ot2(t2.I, { _: true })));
  }))) : _t2;
}
!function(t2) {
  t2[t2.MAX = 0] = "MAX", t2[t2.HIGH = 1] = "HIGH", t2[t2.MED = 2] = "MED", t2[t2.LOW = 3] = "LOW", t2[t2.MIN = 4] = "MIN";
}(Ht || (Ht = {}));
var index_modern_default = (n2) => {
  let { children: r2, options: o2 } = n2, c2 = function(t2, n3) {
    if (null == t2)
      return {};
    var e2, r3, o3 = {}, c3 = Object.keys(t2);
    for (r3 = 0; r3 < c3.length; r3++)
      n3.indexOf(e2 = c3[r3]) >= 0 || (o3[e2] = t2[e2]);
    return o3;
  }(n2, e);
  return t.cloneElement(qt(r2, o2), c2);
};

export {
  qt,
  index_modern_default
};
//# sourceMappingURL=chunk-CCYINSEQ.js.map
