/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, D = x.ShadowRoot && (x.ShadyCSS === void 0 || x.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), F = /* @__PURE__ */ new WeakMap();
let oe = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (D && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = F.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && F.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const le = (n) => new oe(typeof n == "string" ? n : n + "", void 0, G), he = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((o, a, i) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + n[i + 1], n[0]);
  return new oe(t, n, G);
}, ce = (n, e) => {
  if (D) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const o = document.createElement("style"), a = x.litNonce;
    a !== void 0 && o.setAttribute("nonce", a), o.textContent = t.cssText, n.appendChild(o);
  }
}, K = D ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return le(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: de, defineProperty: me, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: ue, getOwnPropertySymbols: pe, getPrototypeOf: ge } = Object, g = globalThis, V = g.trustedTypes, ze = V ? V.emptyScript : "", L = g.reactiveElementPolyfillSupport, b = (n, e) => n, H = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? ze : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, ae = (n, e) => !de(n, e), J = { attribute: !0, type: String, converter: H, reflect: !1, useDefault: !1, hasChanged: ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let C = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = J) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), a = this.getPropertyDescriptor(e, o, t);
      a !== void 0 && me(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: a, set: i } = Ne(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: a, set(r) {
      const l = a == null ? void 0 : a.call(this);
      i == null || i.call(this, r), this.requestUpdate(e, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(b("elementProperties"))) return;
    const e = ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(b("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(b("properties"))) {
      const t = this.properties, o = [...ue(t), ...pe(t)];
      for (const a of o) this.createProperty(a, t[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, a] of t) this.elementProperties.set(o, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const a = this._$Eu(t, o);
      a !== void 0 && this._$Eh.set(a, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const a of o) t.unshift(K(a));
    } else e !== void 0 && t.push(K(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ce(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostConnected) == null ? void 0 : o.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var o;
      return (o = t.hostDisconnected) == null ? void 0 : o.call(t);
    });
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    var i;
    const o = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, o);
    if (a !== void 0 && o.reflect === !0) {
      const r = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : H).toAttribute(t, o.type);
      this._$Em = e, r == null ? this.removeAttribute(a) : this.setAttribute(a, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, r;
    const o = this.constructor, a = o._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const l = o.getPropertyOptions(a), s = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((i = l.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? l.converter : H;
      this._$Em = a, this[a] = s.fromAttribute(t, l.type) ?? ((r = this._$Ej) == null ? void 0 : r.get(a)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, t, o) {
    var a;
    if (e !== void 0) {
      const i = this.constructor, r = this[e];
      if (o ?? (o = i.getPropertyOptions(e)), !((o.hasChanged ?? ae)(r, t) || o.useDefault && o.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(i._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: a, wrapped: i }, r) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), i !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), a === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [i, r] of a) {
        const { wrapped: l } = r, s = this[i];
        l !== !0 || this._$AL.has(i) || s === void 0 || this.C(i, void 0, r, s);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (o = this._$EO) == null || o.forEach((a) => {
        var i;
        return (i = a.hostUpdate) == null ? void 0 : i.call(a);
      }), this.update(t)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((o) => {
      var a;
      return (a = o.hostUpdated) == null ? void 0 : a.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[b("elementProperties")] = /* @__PURE__ */ new Map(), C[b("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: C }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = globalThis, I = $.trustedTypes, Z = I ? I.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ne = "$lit$", p = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + p, Se = `<${ie}>`, f = document, U = () => f.createComment(""), _ = (n) => n === null || typeof n != "object" && typeof n != "function", W = Array.isArray, Ae = (n) => W(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, j = />/g, z = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), q = /'/g, Q = /"/g, re = /^(?:script|style|textarea|title)$/i, fe = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), X = fe(1), w = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ee = /* @__PURE__ */ new WeakMap(), S = f.createTreeWalker(f, 129);
function se(n, e) {
  if (!W(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(e) : e;
}
const Ce = (n, e) => {
  const t = n.length - 1, o = [];
  let a, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = v;
  for (let l = 0; l < t; l++) {
    const s = n[l];
    let c, m, h = -1, N = 0;
    for (; N < s.length && (r.lastIndex = N, m = r.exec(s), m !== null); ) N = r.lastIndex, r === v ? m[1] === "!--" ? r = Y : m[1] !== void 0 ? r = j : m[2] !== void 0 ? (re.test(m[2]) && (a = RegExp("</" + m[2], "g")), r = z) : m[3] !== void 0 && (r = z) : r === z ? m[0] === ">" ? (r = a ?? v, h = -1) : m[1] === void 0 ? h = -2 : (h = r.lastIndex - m[2].length, c = m[1], r = m[3] === void 0 ? z : m[3] === '"' ? Q : q) : r === Q || r === q ? r = z : r === Y || r === j ? r = v : (r = z, a = void 0);
    const u = r === z && n[l + 1].startsWith("/>") ? " " : "";
    i += r === v ? s + Se : h >= 0 ? (o.push(c), s.slice(0, h) + ne + s.slice(h) + p + u) : s + p + (h === -2 ? l : u);
  }
  return [se(n, i + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class k {
  constructor({ strings: e, _$litType$: t }, o) {
    let a;
    this.parts = [];
    let i = 0, r = 0;
    const l = e.length - 1, s = this.parts, [c, m] = Ce(e, t);
    if (this.el = k.createElement(c, o), S.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (a = S.nextNode()) !== null && s.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const h of a.getAttributeNames()) if (h.endsWith(ne)) {
          const N = m[r++], u = a.getAttribute(h).split(p), P = /([.?@])?(.*)/.exec(N);
          s.push({ type: 1, index: i, name: P[2], strings: u, ctor: P[1] === "." ? ye : P[1] === "?" ? ve : P[1] === "@" ? be : T }), a.removeAttribute(h);
        } else h.startsWith(p) && (s.push({ type: 6, index: i }), a.removeAttribute(h));
        if (re.test(a.tagName)) {
          const h = a.textContent.split(p), N = h.length - 1;
          if (N > 0) {
            a.textContent = I ? I.emptyScript : "";
            for (let u = 0; u < N; u++) a.append(h[u], U()), S.nextNode(), s.push({ type: 2, index: ++i });
            a.append(h[N], U());
          }
        }
      } else if (a.nodeType === 8) if (a.data === ie) s.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = a.data.indexOf(p, h + 1)) !== -1; ) s.push({ type: 7, index: i }), h += p.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const o = f.createElement("template");
    return o.innerHTML = e, o;
  }
}
function y(n, e, t = n, o) {
  var r, l;
  if (e === w) return e;
  let a = o !== void 0 ? (r = t._$Co) == null ? void 0 : r[o] : t._$Cl;
  const i = _(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== i && ((l = a == null ? void 0 : a._$AO) == null || l.call(a, !1), i === void 0 ? a = void 0 : (a = new i(n), a._$AT(n, t, o)), o !== void 0 ? (t._$Co ?? (t._$Co = []))[o] = a : t._$Cl = a), a !== void 0 && (e = y(n, a._$AS(n, e.values), a, o)), e;
}
class we {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: o } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ?? f).importNode(t, !0);
    S.currentNode = a;
    let i = S.nextNode(), r = 0, l = 0, s = o[0];
    for (; s !== void 0; ) {
      if (r === s.index) {
        let c;
        s.type === 2 ? c = new M(i, i.nextSibling, this, e) : s.type === 1 ? c = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (c = new $e(i, this, e)), this._$AV.push(c), s = o[++l];
      }
      r !== (s == null ? void 0 : s.index) && (i = S.nextNode(), r++);
    }
    return S.currentNode = f, a;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class M {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, o, a) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = y(this, e, t), _(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== w && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ae(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && _(this._$AH) ? this._$AA.nextSibling.data = e : this.T(f.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: t, _$litType$: o } = e, a = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = k.createElement(se(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === a) this._$AH.p(t);
    else {
      const r = new we(a, this), l = r.u(this.options);
      r.p(t), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = ee.get(e.strings);
    return t === void 0 && ee.set(e.strings, t = new k(e)), t;
  }
  k(e) {
    W(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, a = 0;
    for (const i of e) a === t.length ? t.push(o = new M(this.O(U()), this.O(U()), this, this.options)) : o = t[a], o._$AI(i), a++;
    a < t.length && (this._$AR(o && o._$AB.nextSibling, a), t.length = a);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class T {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, a, i) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = a, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = d;
  }
  _$AI(e, t = this, o, a) {
    const i = this.strings;
    let r = !1;
    if (i === void 0) e = y(this, e, t, 0), r = !_(e) || e !== this._$AH && e !== w, r && (this._$AH = e);
    else {
      const l = e;
      let s, c;
      for (e = i[0], s = 0; s < i.length - 1; s++) c = y(this, l[o + s], t, s), c === w && (c = this._$AH[s]), r || (r = !_(c) || c !== this._$AH[s]), c === d ? e = d : e !== d && (e += (c ?? "") + i[s + 1]), this._$AH[s] = c;
    }
    r && !a && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ye extends T {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class ve extends T {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class be extends T {
  constructor(e, t, o, a, i) {
    super(e, t, o, a, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = y(this, e, t, 0) ?? d) === w) return;
    const o = this._$AH, a = e === d && o !== d || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, i = e !== d && (o === d || a);
    a && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class $e {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    y(this, e);
  }
}
const R = $.litHtmlPolyfillSupport;
R == null || R(k, M), ($.litHtmlVersions ?? ($.litHtmlVersions = [])).push("3.3.0");
const Ee = (n, e, t) => {
  const o = (t == null ? void 0 : t.renderBefore) ?? e;
  let a = o._$litPart$;
  if (a === void 0) {
    const i = (t == null ? void 0 : t.renderBefore) ?? null;
    o._$litPart$ = a = new M(e.insertBefore(U(), i), i, void 0, t ?? {});
  }
  return a._$AI(n), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class E extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ee(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return w;
  }
}
var te;
E._$litElement$ = !0, E.finalized = !0, (te = A.litElementHydrateSupport) == null || te.call(A, { LitElement: E });
const O = A.litElementPolyfillSupport;
O == null || O({ LitElement: E });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.0");
const Ue = {
  AD: {
    zoneName: "Andorra"
  },
  AE: {
    zoneName: "United Arab Emirates"
  },
  AF: {
    zoneName: "Afghanistan"
  },
  AG: {
    zoneName: "Antigua and Barbuda"
  },
  AL: {
    zoneName: "Albania"
  },
  AM: {
    zoneName: "Armenia"
  },
  AO: {
    zoneName: "Angola"
  },
  AR: {
    zoneName: "Argentina"
  },
  AT: {
    zoneName: "Austria"
  },
  AU: {
    zoneName: "Australia"
  },
  "AU-LH": {
    zoneName: "Lord Howe Island"
  },
  "AU-NSW": {
    zoneName: "New South Wales"
  },
  "AU-NT": {
    zoneName: "Northern Territory"
  },
  "AU-QLD": {
    zoneName: "Queensland"
  },
  "AU-SA": {
    zoneName: "South Australia"
  },
  "AU-TAS": {
    zoneName: "Tasmania"
  },
  "AU-TAS-CBI": {
    zoneName: "Cape Barren Island"
  },
  "AU-TAS-FI": {
    zoneName: "Flinders Island"
  },
  "AU-TAS-KI": {
    zoneName: "King Island"
  },
  "AU-VIC": {
    zoneName: "Victoria"
  },
  "AU-WA": {
    zoneName: "Western Australia"
  },
  "AU-WA-RI": {
    zoneName: "Rottnest Island"
  },
  AW: {
    zoneName: "Aruba"
  },
  AX: {
    zoneName: "Åland Islands"
  },
  AZ: {
    zoneName: "Azerbaijan"
  },
  BA: {
    zoneName: "Bosnia and Herzegovina"
  },
  BB: {
    zoneName: "Barbados"
  },
  BD: {
    zoneName: "Bangladesh"
  },
  BE: {
    zoneName: "Belgium"
  },
  BF: {
    zoneName: "Burkina Faso"
  },
  BG: {
    zoneName: "Bulgaria"
  },
  BH: {
    zoneName: "Bahrain"
  },
  BI: {
    zoneName: "Burundi"
  },
  BJ: {
    zoneName: "Benin"
  },
  BM: {
    zoneName: "Bermuda"
  },
  BN: {
    zoneName: "Brunei"
  },
  BO: {
    zoneName: "Bolivia"
  },
  BR: {
    zoneName: "Brazil"
  },
  "BR-CS": {
    zoneName: "Central Brazil"
  },
  "BR-N": {
    zoneName: "North Brazil"
  },
  "BR-NE": {
    zoneName: "North-East Brazil"
  },
  "BR-S": {
    zoneName: "South Brazil"
  },
  BS: {
    zoneName: "Bahamas"
  },
  BT: {
    zoneName: "Bhutan"
  },
  BW: {
    zoneName: "Botswana"
  },
  BY: {
    zoneName: "Belarus"
  },
  BZ: {
    zoneName: "Belize"
  },
  CA: {
    zoneName: "Canada"
  },
  "CA-AB": {
    zoneName: "Alberta"
  },
  "CA-BC": {
    zoneName: "British Columbia"
  },
  "CA-MB": {
    zoneName: "Manitoba"
  },
  "CA-NB": {
    zoneName: "New Brunswick"
  },
  "CA-NL": {
    zoneName: "Newfoundland and Labrador"
  },
  "CA-NS": {
    zoneName: "Nova Scotia"
  },
  "CA-NT": {
    zoneName: "Northwest Territories"
  },
  "CA-NU": {
    zoneName: "Nunavut"
  },
  "CA-ON": {
    zoneName: "Ontario"
  },
  "CA-PE": {
    zoneName: "Prince Edward Island"
  },
  "CA-QC": {
    zoneName: "Québec"
  },
  "CA-SK": {
    zoneName: "Saskatchewan"
  },
  "CA-YT": {
    zoneName: "Yukon"
  },
  CD: {
    zoneName: "Democratic Republic of the Congo"
  },
  CF: {
    zoneName: "Central African Republic"
  },
  CG: {
    zoneName: "Congo"
  },
  CH: {
    zoneName: "Switzerland"
  },
  CI: {
    zoneName: "Ivory Coast"
  },
  "CL-CHP": {
    zoneName: "Easter Island"
  },
  "CL-SEA": {
    zoneName: "Sistema Eléctrico de Aysén",
    shortname: "Chile - Aysén"
  },
  "CL-SEM": {
    zoneName: "Sistema Eléctrico de Magallanes",
    shortname: "Chile - Magallanes"
  },
  "CL-SEN": {
    zoneName: "Sistema Eléctrico Nacional",
    shortname: "Chile"
  },
  CM: {
    zoneName: "Cameroon"
  },
  CN: {
    zoneName: "China"
  },
  CO: {
    zoneName: "Colombia"
  },
  CR: {
    zoneName: "Costa Rica"
  },
  CU: {
    zoneName: "Cuba"
  },
  CV: {
    zoneName: "Cabo Verde"
  },
  CW: {
    zoneName: "Curaçao"
  },
  CY: {
    zoneName: "Cyprus"
  },
  CZ: {
    zoneName: "Czechia"
  },
  DE: {
    zoneName: "Germany"
  },
  DJ: {
    zoneName: "Djibouti"
  },
  DK: {
    zoneName: "Denmark"
  },
  "DK-BHM": {
    zoneName: "Bornholm"
  },
  "DK-DK1": {
    zoneName: "West Denmark"
  },
  "DK-DK2": {
    zoneName: "East Denmark"
  },
  DM: {
    zoneName: "Dominica"
  },
  DO: {
    zoneName: "Dominican Republic"
  },
  DZ: {
    zoneName: "Algeria"
  },
  EC: {
    zoneName: "Ecuador"
  },
  EE: {
    zoneName: "Estonia"
  },
  EG: {
    zoneName: "Egypt"
  },
  EH: {
    zoneName: "Western Sahara"
  },
  ER: {
    zoneName: "Eritrea"
  },
  ES: {
    zoneName: "Spain"
  },
  "ES-CE": {
    zoneName: "Ceuta"
  },
  "ES-CN-FV": {
    zoneName: "Fuerteventura"
  },
  "ES-CN-GC": {
    zoneName: "Gran Canaria"
  },
  "ES-CN-HI": {
    zoneName: "El Hierro"
  },
  "ES-CN-IG": {
    zoneName: "Isla de la Gomera"
  },
  "ES-CN-LP": {
    zoneName: "La Palma"
  },
  "ES-CN-LZ": {
    zoneName: "Lanzarote"
  },
  "ES-CN-TE": {
    zoneName: "Tenerife"
  },
  "ES-IB-FO": {
    zoneName: "Formentera"
  },
  "ES-IB-IZ": {
    zoneName: "Ibiza"
  },
  "ES-IB-MA": {
    zoneName: "Mallorca"
  },
  "ES-IB-ME": {
    zoneName: "Menorca"
  },
  "ES-ML": {
    zoneName: "Melilla"
  },
  ET: {
    zoneName: "Ethiopia"
  },
  FI: {
    zoneName: "Finland"
  },
  FJ: {
    zoneName: "Fiji"
  },
  FK: {
    zoneName: "Falkland Islands"
  },
  FM: {
    zoneName: "Micronesia"
  },
  FO: {
    zoneName: "Faroe Islands"
  },
  "FO-MI": {
    zoneName: "Main Islands"
  },
  "FO-SI": {
    zoneName: "South Island"
  },
  FR: {
    zoneName: "France"
  },
  "FR-COR": {
    zoneName: "Corsica"
  },
  GA: {
    zoneName: "Gabon"
  },
  GB: {
    zoneName: "Great Britain"
  },
  "GB-NIR": {
    zoneName: "Northern Ireland"
  },
  "GB-ORK": {
    zoneName: "Orkney Islands"
  },
  "GB-ZET": {
    zoneName: "Shetland Islands"
  },
  GE: {
    zoneName: "Georgia"
  },
  GF: {
    zoneName: "French Guiana"
  },
  GG: {
    zoneName: "Guernsey"
  },
  GH: {
    zoneName: "Ghana"
  },
  GI: {
    zoneName: "Gibraltar"
  },
  GL: {
    zoneName: "Greenland"
  },
  GM: {
    zoneName: "Gambia"
  },
  GN: {
    zoneName: "Guinea"
  },
  GP: {
    zoneName: "Guadeloupe"
  },
  GQ: {
    zoneName: "Equatorial Guinea"
  },
  GR: {
    zoneName: "Greece"
  },
  GS: {
    zoneName: "South Georgia and the South Sandwich Islands",
    shortName: "SGSSI"
  },
  GT: {
    zoneName: "Guatemala"
  },
  GU: {
    zoneName: "Guam"
  },
  GW: {
    zoneName: "Guinea-Bissau"
  },
  GY: {
    zoneName: "Guyana"
  },
  HK: {
    zoneName: "Hong Kong"
  },
  HM: {
    zoneName: "Heard Island and McDonald Islands",
    shortName: "HIMI"
  },
  HN: {
    zoneName: "Honduras"
  },
  HR: {
    zoneName: "Croatia"
  },
  HT: {
    zoneName: "Haiti"
  },
  HU: {
    zoneName: "Hungary"
  },
  ID: {
    zoneName: "Indonesia"
  },
  IE: {
    zoneName: "Ireland"
  },
  IL: {
    zoneName: "Israel"
  },
  IM: {
    zoneName: "Isle of Man"
  },
  IN: {
    zoneName: "Mainland India"
  },
  "IN-AN": {
    zoneName: "Andaman and Nicobar Islands"
  },
  "IN-DL": {
    shortName: "India DL"
  },
  "IN-EA": {
    zoneName: "Eastern India"
  },
  "IN-HP": {
    zoneName: "Himachal Pradesh"
  },
  "IN-KA": {
    zoneName: "Unknown",
    shortName: "India KA"
  },
  "IN-MH": {
    zoneName: "Unknown",
    shortName: "India MH"
  },
  "IN-NE": {
    zoneName: "North Eastern India"
  },
  "IN-NO": {
    zoneName: "Northern India"
  },
  "IN-PB": {
    zoneName: "Unknown",
    shortName: "India PB"
  },
  "IN-SO": {
    zoneName: "Southern India"
  },
  "IN-UP": {
    zoneName: "Uttar Pradesh"
  },
  "IN-UT": {
    zoneName: "Uttarakhand"
  },
  "IN-WE": {
    zoneName: "Western India"
  },
  IQ: {
    zoneName: "Iraq"
  },
  IR: {
    zoneName: "Iran"
  },
  IS: {
    zoneName: "Iceland"
  },
  IT: {
    zoneName: "Italy"
  },
  "IT-CNO": {
    zoneName: "Central North Italy"
  },
  "IT-CSO": {
    zoneName: "Central South Italy"
  },
  "IT-NO": {
    zoneName: "North Italy"
  },
  "IT-SAR": {
    zoneName: "Sardinia"
  },
  "IT-SIC": {
    zoneName: "Sicily"
  },
  "IT-SO": {
    zoneName: "South Italy"
  },
  JE: {
    zoneName: "Jersey"
  },
  JM: {
    zoneName: "Jamaica"
  },
  JO: {
    zoneName: "Jordan"
  },
  JP: {
    zoneName: "Japan"
  },
  "JP-CB": {
    zoneName: "Chūbu"
  },
  "JP-CG": {
    zoneName: "Chūgoku"
  },
  "JP-HKD": {
    zoneName: "Hokkaidō"
  },
  "JP-HR": {
    zoneName: "Hokuriku"
  },
  "JP-KN": {
    zoneName: "Kansai"
  },
  "JP-KY": {
    zoneName: "Kyūshū"
  },
  "JP-ON": {
    zoneName: "Okinawa"
  },
  "JP-SK": {
    zoneName: "Shikoku"
  },
  "JP-TH": {
    zoneName: "Tōhoku"
  },
  "JP-TK": {
    zoneName: "Tōkyō"
  },
  KE: {
    zoneName: "Kenya"
  },
  KG: {
    zoneName: "Kyrgyzstan"
  },
  KH: {
    zoneName: "Cambodia"
  },
  KM: {
    zoneName: "Comoros"
  },
  KP: {
    zoneName: "North Korea"
  },
  KR: {
    zoneName: "South Korea"
  },
  KW: {
    zoneName: "Kuwait"
  },
  KY: {
    zoneName: "Cayman Islands"
  },
  KZ: {
    zoneName: "Kazakhstan"
  },
  LA: {
    zoneName: "Laos"
  },
  LB: {
    zoneName: "Lebanon"
  },
  LC: {
    zoneName: "Saint Lucia"
  },
  LI: {
    zoneName: "Liechtenstein"
  },
  LK: {
    zoneName: "Sri Lanka"
  },
  LR: {
    zoneName: "Liberia"
  },
  LS: {
    zoneName: "Lesotho"
  },
  LT: {
    zoneName: "Lithuania"
  },
  LU: {
    zoneName: "Luxembourg"
  },
  LV: {
    zoneName: "Latvia"
  },
  LY: {
    zoneName: "Libya"
  },
  MA: {
    zoneName: "Morocco"
  },
  MC: {
    zoneName: "Monaco"
  },
  MD: {
    zoneName: "Moldova"
  },
  ME: {
    zoneName: "Montenegro"
  },
  MG: {
    zoneName: "Madagascar"
  },
  MK: {
    zoneName: "North Macedonia"
  },
  ML: {
    zoneName: "Mali"
  },
  MM: {
    zoneName: "Myanmar"
  },
  MN: {
    zoneName: "Mongolia"
  },
  MO: {
    zoneName: "Macao"
  },
  MQ: {
    zoneName: "Martinique"
  },
  MR: {
    zoneName: "Mauritania"
  },
  MT: {
    zoneName: "Malta"
  },
  MU: {
    zoneName: "Mauritius"
  },
  MV: {
    zoneName: "Maldives"
  },
  MW: {
    zoneName: "Malawi"
  },
  MX: {
    zoneName: "Mexico"
  },
  MY: {
    zoneName: "Malaysia"
  },
  "MY-EM": {
    zoneName: "Borneo"
  },
  "MY-WM": {
    zoneName: "Peninsula",
    shortName: "Malaysia Peninsula"
  },
  MZ: {
    zoneName: "Mozambique"
  },
  NA: {
    zoneName: "Namibia"
  },
  NC: {
    zoneName: "New Caledonia"
  },
  NE: {
    zoneName: "Niger"
  },
  NG: {
    zoneName: "Nigeria"
  },
  NI: {
    zoneName: "Nicaragua"
  },
  NL: {
    zoneName: "Netherlands"
  },
  NO: {
    zoneName: "Norway"
  },
  "NO-NO1": {
    zoneName: "Southeast Norway"
  },
  "NO-NO2": {
    zoneName: "Southwest Norway"
  },
  "NO-NO3": {
    zoneName: "Middle Norway"
  },
  "NO-NO4": {
    zoneName: "North Norway"
  },
  "NO-NO5": {
    zoneName: "West Norway"
  },
  NP: {
    zoneName: "Nepal"
  },
  NZ: {
    zoneName: "New Zealand"
  },
  "NZ-NZA": {
    zoneName: "Auckland Islands"
  },
  "NZ-NZC": {
    zoneName: "Chatham Islands"
  },
  "NZ-NZST": {
    zoneName: "Stewart Island"
  },
  OM: {
    zoneName: "Oman"
  },
  PA: {
    zoneName: "Panama"
  },
  PE: {
    zoneName: "Peru"
  },
  PF: {
    zoneName: "French Polynesia"
  },
  PG: {
    zoneName: "Papua New Guinea"
  },
  PH: {
    zoneName: "Philippines"
  },
  "PH-LU": {
    zoneName: "Luzon"
  },
  "PH-MI": {
    zoneName: "Mindanao"
  },
  "PH-VI": {
    zoneName: "Visayas"
  },
  PK: {
    zoneName: "Pakistan"
  },
  PL: {
    zoneName: "Poland"
  },
  PM: {
    zoneName: "Saint Pierre and Miquelon"
  },
  PR: {
    zoneName: "Puerto Rico"
  },
  PS: {
    zoneName: "State of Palestine"
  },
  PT: {
    zoneName: "Portugal"
  },
  "PT-AC": {
    zoneName: "Azores"
  },
  "PT-MA": {
    zoneName: "Madeira"
  },
  PW: {
    zoneName: "Palau"
  },
  PY: {
    zoneName: "Paraguay"
  },
  QA: {
    zoneName: "Qatar"
  },
  RE: {
    zoneName: "Réunion"
  },
  RO: {
    zoneName: "Romania"
  },
  RS: {
    zoneName: "Serbia"
  },
  RU: {
    zoneName: "Russia"
  },
  "RU-1": {
    zoneName: "Europe-Ural"
  },
  "RU-2": {
    zoneName: "Siberia"
  },
  "RU-AS": {
    zoneName: "East"
  },
  "RU-EU": {
    zoneName: "Arctic"
  },
  "RU-FE": {
    zoneName: "Far East"
  },
  "RU-KGD": {
    zoneName: "Kaliningrad"
  },
  RW: {
    zoneName: "Rwanda"
  },
  SA: {
    zoneName: "Saudi Arabia"
  },
  SB: {
    zoneName: "Solomon Islands"
  },
  SC: {
    zoneName: "Seychelles"
  },
  SD: {
    zoneName: "Sudan"
  },
  SE: {
    zoneName: "Sweden"
  },
  "SE-SE1": {
    zoneName: "North Sweden"
  },
  "SE-SE2": {
    zoneName: "North Central Sweden"
  },
  "SE-SE3": {
    zoneName: "South Central Sweden"
  },
  "SE-SE4": {
    zoneName: "South Sweden"
  },
  SG: {
    zoneName: "Singapore"
  },
  SI: {
    zoneName: "Slovenia"
  },
  SJ: {
    zoneName: "Svalbard and Jan Mayen"
  },
  SK: {
    zoneName: "Slovakia"
  },
  SL: {
    zoneName: "Sierra Leone"
  },
  SN: {
    zoneName: "Senegal"
  },
  SO: {
    zoneName: "Somalia"
  },
  SR: {
    zoneName: "Suriname"
  },
  SS: {
    zoneName: "South Sudan"
  },
  ST: {
    zoneName: "São Tomé and Príncipe"
  },
  SV: {
    zoneName: "El Salvador"
  },
  SY: {
    zoneName: "Syria"
  },
  SZ: {
    zoneName: "Eswatini"
  },
  TD: {
    zoneName: "Chad"
  },
  TF: {
    zoneName: "French Southern Territories"
  },
  TG: {
    zoneName: "Togo"
  },
  TH: {
    zoneName: "Thailand"
  },
  TJ: {
    zoneName: "Tajikistan"
  },
  TL: {
    zoneName: "Timor-Leste"
  },
  TM: {
    zoneName: "Turkmenistan"
  },
  TN: {
    zoneName: "Tunisia"
  },
  TO: {
    zoneName: "Tonga"
  },
  TR: {
    zoneName: "Turkey"
  },
  TT: {
    zoneName: "Trinidad and Tobago"
  },
  TW: {
    zoneName: "Taiwan"
  },
  TZ: {
    zoneName: "Tanzania"
  },
  UA: {
    zoneName: "Ukraine"
  },
  "UA-CR": {
    zoneName: "Crimea"
  },
  UG: {
    zoneName: "Uganda"
  },
  US: {
    zoneName: "United States"
  },
  "US-AK": {
    zoneName: "Alaska"
  },
  "US-AK-SEAPA": {
    zoneName: "Southeast Alaska Power Agency",
    shortName: "USA - Alaska"
  },
  "US-CAL-BANC": {
    zoneName: "Balancing Authority of Northern California",
    shortName: "USA - California"
  },
  "US-CAL-CISO": {
    zoneName: "CAISO",
    shortName: "USA - California"
  },
  "US-CAL-IID": {
    zoneName: "Imperial Irrigation District",
    shortName: "USA - California"
  },
  "US-CAL-LDWP": {
    zoneName: "Los Angeles Department of Water and Power",
    shortName: "USA - Los Angeles"
  },
  "US-CAL-TIDC": {
    zoneName: "Turlock Irrigation District",
    shortName: "USA - California"
  },
  "US-CAR-CPLE": {
    zoneName: "Duke Energy Progress East",
    shortName: "USA - North Carolina"
  },
  "US-CAR-CPLW": {
    zoneName: "Duke Energy Progress West",
    shortName: "USA - North Carolina"
  },
  "US-CAR-DUK": {
    zoneName: "Duke Energy Carolinas",
    shortName: "USA - Carolinas"
  },
  "US-CAR-SC": {
    zoneName: "South Carolina Public Service Authority",
    shortName: "USA - South Carolina"
  },
  "US-CAR-SCEG": {
    zoneName: "South Carolina Electric & Gas Company",
    shortName: "USA - South Carolina"
  },
  "US-CAR-YAD": {
    zoneName: "Alcoa Power Generating, Inc. Yadkin Division",
    shortName: "USA - North Carolina"
  },
  "US-CENT-SPA": {
    zoneName: "Southwestern Power Administration",
    shortName: "USA - Central"
  },
  "US-CENT-SWPP": {
    zoneName: "Southwest Power Pool",
    shortName: "USA - Central"
  },
  "US-FLA-FMPP": {
    zoneName: "Florida Municipal Power Pool",
    shortName: "USA - Florida"
  },
  "US-FLA-FPC": {
    zoneName: "Duke Energy Florida",
    shortName: "USA - Florida"
  },
  "US-FLA-FPL": {
    zoneName: "Florida Power and Light Company",
    shortName: "USA - Florida"
  },
  "US-FLA-GVL": {
    zoneName: "Gainesville Regional Utilities",
    shortName: "USA - Gainesville"
  },
  "US-FLA-HST": {
    zoneName: "City of Homestead",
    shortName: "USA - Homestead"
  },
  "US-FLA-JEA": {
    zoneName: "Jacksonville Electric Authority",
    shortName: "USA - Jacksonville"
  },
  "US-FLA-SEC": {
    zoneName: "Seminole Electric Cooperative",
    shortName: "USA - Seminole"
  },
  "US-FLA-TAL": {
    zoneName: "City of Tallahassee",
    shortName: "USA - Tallahassee"
  },
  "US-FLA-TEC": {
    zoneName: "Tampa Electric Company",
    shortName: "USA - Tampa"
  },
  "US-HI": {
    zoneName: "Hawaii"
  },
  "US-MIDA-PJM": {
    zoneName: "PJM Interconnection",
    shortName: "USA - Mid Atlantic"
  },
  "US-MIDW-AECI": {
    zoneName: "Associated Electric Cooperative",
    shortName: "USA - Midwest"
  },
  "US-MIDW-LGEE": {
    zoneName: "Louisville Gas and Electric Company and Kentucky Utilities",
    shortName: "USA - Louisville"
  },
  "US-MIDW-MISO": {
    zoneName: "Midcontinent ISO",
    shortName: "USA - Midcontinent"
  },
  "US-NE-ISNE": {
    zoneName: "ISO New England",
    shortName: "USA - New England"
  },
  "US-NW-AVA": {
    zoneName: "Avista Corporation",
    shortName: "USA - Avista"
  },
  "US-NW-BPAT": {
    zoneName: "Bonneville Power Administration",
    shortName: "USA - Bonneville"
  },
  "US-NW-CHPD": {
    zoneName: "Chelan County",
    shortName: "USA - Chelan County"
  },
  "US-NW-DOPD": {
    zoneName: "Douglas County",
    shortName: "USA - Douglas County"
  },
  "US-NW-GCPD": {
    zoneName: "Grant County",
    shortName: "USA - Grant County"
  },
  "US-NW-GRID": {
    zoneName: "Gridforce Energy Management",
    shortName: "USA - Northwest"
  },
  "US-NW-IPCO": {
    zoneName: "Idaho Power Company",
    shortName: "USA - Idaho"
  },
  "US-NW-NEVP": {
    zoneName: "Nevada Power Company",
    shortName: "USA - Nevada"
  },
  "US-NW-NWMT": {
    zoneName: "Northwestern Energy",
    shortName: "USA - Northwest"
  },
  "US-NW-PACE": {
    zoneName: "Pacificorp East",
    shortName: "USA - Northwest"
  },
  "US-NW-PACW": {
    zoneName: "Pacificorp West",
    shortName: "USA - Northwest"
  },
  "US-NW-PGE": {
    zoneName: "Portland General Electric Company",
    shortName: "USA - Portland"
  },
  "US-NW-PSCO": {
    zoneName: "Public Service Company of Colorado",
    shortName: "USA - Colorado"
  },
  "US-NW-PSEI": {
    zoneName: "Puget Sound Energy",
    shortName: "USA - Puget Sound"
  },
  "US-NW-SCL": {
    zoneName: "Seattle City Light",
    shortName: "USA - Seattle"
  },
  "US-NW-TPWR": {
    zoneName: "City of Tacoma",
    shortName: "USA - Tacoma"
  },
  "US-NW-WACM": {
    zoneName: "Western Area Power Administration - Rocky Mountain Region",
    shortName: "USA - Rocky Mountains"
  },
  "US-NW-WAUW": {
    zoneName: "Western Area Power Administration - Upper Great Plains West",
    shortName: "USA - Upper Great Plains"
  },
  "US-NY-NYIS": {
    zoneName: "New York ISO",
    shortName: "USA - New York"
  },
  "US-SE-SEPA": {
    zoneName: "Southeastern Power Administration",
    shortName: "USA - Southeastern"
  },
  "US-SE-SOCO": {
    zoneName: "Southern Company Services",
    shortName: "USA - Southeastern"
  },
  "US-SW-AZPS": {
    zoneName: "Arizona Public Service Company",
    shortName: "USA - Arizona"
  },
  "US-SW-EPE": {
    zoneName: "El Paso Electric Company",
    shortName: "USA - El Paso"
  },
  "US-SW-PNM": {
    zoneName: "Public Service Company of New Mexico",
    shortName: "USA - New Mexico"
  },
  "US-SW-SRP": {
    zoneName: "Salt River Project",
    shortName: "USA - Salt River"
  },
  "US-SW-TEPC": {
    zoneName: "Tucson Electric Power Company",
    shortName: "USA - Tucson"
  },
  "US-SW-WALC": {
    zoneName: "Western Area Power Administration - Desert Southwest Region",
    shortname: "USA - Desert Southwest"
  },
  "US-TEN-TVA": {
    zoneName: "Tennessee Valley Authority",
    shortName: "USA - Tennessee"
  },
  "US-TEX-ERCO": {
    zoneName: "Electric Reliability Council of Texas",
    shortName: "USA - Texas"
  },
  UY: {
    zoneName: "Uruguay"
  },
  UZ: {
    zoneName: "Uzbekistan"
  },
  VC: {
    zoneName: "Saint Vincent and the Grenadines",
    shortName: "Saint Vincent"
  },
  VE: {
    zoneName: "Venezuela"
  },
  VI: {
    zoneName: "Virgin Islands"
  },
  VN: {
    zoneName: "Vietnam"
  },
  VU: {
    zoneName: "Vanuatu"
  },
  WS: {
    zoneName: "Samoa"
  },
  XK: {
    zoneName: "Kosovo"
  },
  XX: {
    zoneName: "Northern Cyprus"
  },
  YE: {
    zoneName: "Yemen"
  },
  YT: {
    zoneName: "Mayotte"
  },
  ZA: {
    zoneName: "South Africa"
  },
  ZM: {
    zoneName: "Zambia"
  },
  ZW: {
    zoneName: "Zimbabwe"
  }
};
class _e extends E {
  static get properties() {
    return {
      location: { type: String },
      gridLevelText: { type: String },
      learnMoreLink: { type: String },
      autoMode: { type: Boolean }
    };
  }
  constructor() {
    super(), this.location = "Location unknown", this.circleFill = "#B0AA9C", this.autoMode = !0, this.gridLevelText = "Your local grid: Data unavailable", this.ignoreCookie = "gaw-ignore", this.ignoreCookieMaxAge = "Session", this.manualVersion = "low", this.learnMoreLink = "#", this.defaultView = "low", this.views = ["low", "moderate", "high"], this.popoverText = "This site changes its design based on the quantity of fossil fuels on your nearest energy grid.", this.addEventListener("load", this._init());
  }
  render() {
    return X`
      <div class="outer-container">
        <div class="inner-container">
          <div class="holder grid-status">
            <div class="divider">
              <svg
                class="icon"
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="40" fill="${this.circleFill}" />
              </svg>
            </div>

            <div class="split-content">
              <p>${this.gridLevelText}</p>
            </div>
            <button id="expander" @click=${this._toggleExpandClick}>
              <span class="caret"></span>
            </button>
          </div>

          <div class="holder location">
            <div class="divider">
              <svg
                class="icon size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <p>${this.location}</p>
          </div>

          <div id="gaw-info-controls" class="controls">
            <div class="holder">
              <div id="gaw-info-bar-manual" class="spaced divider">
                ${this.views.map(
      (e) => X`
                    <button
                      id="gaw-manual-${e.toLowerCase()}"
                      ?disabled="${this.autoMode}"
                      @click=${this._handleManualModeChange}
                      ?data-active=${this._checkIsActive(e.toLowerCase())}
                    >
                      ${e}
                    </button>
                  `
    )}
              </div>
              <div id="gaw-info-bar-auto">
                <p id="toggle-label-text">Grid-aware mode</p>
                <label class="toggle-switch" for="auto-toggle">
                  <input
                    type="checkbox"
                    ?checked="${this.autoMode}"
                    id="auto-toggle"
                    @change="${this._handleAutoToggleChange}"
                    @keydown="${this._handleToggleKeydown}"
                    aria-labelledby="toggle-label-text"
                    role="switch"
                    aria-checked="${this.autoMode ? "true" : "false"}"
                  />
                  <span class="toggle-slider" aria-hidden="true"></span>
                  <span class="toggle-label">Auto</span>
                </label>
                <div class="popover-wrapper">
                  <button popovertarget="mypopover">
                    <svg
                      class="icon size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="popover-content" id="mypopover" popover>
              <p class="popover-message">
                ${this.popoverText}
                <a href="${this.learnMoreLink}">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _formatLocation(e) {
    if (!e) return "Location unknown";
    try {
      let t = e.toString();
      const o = Ue[t];
      return o != null && o.shortName ? o.shortName : o != null && o.zoneName ? o.zoneName : e.toString();
    } catch (t) {
      return console.error(t), "Location unknown";
    }
  }
  /**
   * Handles changes to the auto toggle checkbox
   * @param {Event} event - The change event
   * @private
   */
  _handleAutoToggleChange(e) {
    this.autoMode = e.target.checked, e.target.setAttribute("aria-checked", this.autoMode ? "true" : "false"), this.autoMode ? (document.cookie = `${this.ignoreCookie}=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`, this.views.forEach((t) => {
      document.cookie = `gaw-manual-view=${t.toLowerCase()}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }), document.cookie = `gaw-user-opt-in=true; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax`, window.location.reload()) : (document.cookie = `${this.ignoreCookie}=true; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`, document.cookie = `gaw-manual-view=${this.defaultView.toLowerCase()}; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`, document.cookie = `gaw-user-opt-in=false; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`, window.location.reload());
  }
  /**
   * Handles changes to the manual mode buttons
   * @param {Event} event - The click event
   * @private
   */
  _handleManualModeChange(e) {
    const t = e.target.id.split("-").pop();
    document.cookie = `gaw-manual-view=${t}; path=/; max-age=${this.ignoreCookieMaxAge}; SameSite=lax;`, window.location.reload();
  }
  /**
   * Handles keyboard events for the toggle switch
   * @param {KeyboardEvent} event - The keyboard event
   * @private
   */
  _handleToggleKeydown(e) {
    (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.autoMode = !this.autoMode, e.target.checked = this.autoMode, e.target.setAttribute(
      "aria-checked",
      this.autoMode ? "true" : "false"
    ), this._handleAutoToggleChange({ target: e.target }));
  }
  _checkIsActive(e) {
    return this._getCookieValue("gaw-manual-view") === e ? !0 : this._hasCookie("gaw-manual-view") ? !1 : this.defaultView.toLowerCase() === e;
  }
  /**
   * Checks if a cookie exists
   * @param {string} name - The name of the cookie to check
   * @returns {boolean} - True if the cookie exists, false otherwise
   * @private
   */
  _hasCookie(e) {
    return document.cookie.split(";").some((t) => t.trim().startsWith(`${e}=`));
  }
  _getCookieValue(e) {
    const t = document.cookie.split("; ");
    for (let o = 0; o < t.length; o++) {
      const a = t[o], i = a.indexOf("=");
      if ((i > -1 ? a.substr(0, i) : a) === e)
        return decodeURIComponent(a.substring(i + 1));
    }
    return null;
  }
  _toggleExpandClick(e) {
    const t = e.currentTarget;
    t.hasAttribute("data-expand") ? t.removeAttribute("data-expand") : t.setAttribute("data-expand", "");
  }
  _init() {
    var t;
    const e = this.dataset.gawLevel || this.level;
    this.location = this.dataset.gawLocation || this.location, this.ignoreCookieMaxAge = this.dataset.ignoreCookieMaxAge || this.ignoreCookieMaxAge, this.ignoreCookie = this.dataset.ignoreCookie || this.ignoreCookie, this.learnMoreLink = this.dataset.learnMoreLink || this.learnMoreLink, this.popoverText = this.dataset.popoverText || this.popoverText, this.autoMode = this._getCookieValue("gaw-user-opt-in") !== "false", this.defaultView = this.dataset.defaultView || this.defaultView, this.views = ((t = this.dataset.views) == null ? void 0 : t.split(",").map((o) => o.trim())) || this.views;
    try {
      const o = this._formatLocation(this.location);
      this.location = o;
    } catch (o) {
      console.log("Error formatting location:", o);
    }
    try {
      e === "low" ? (this.circleFill = "#86CA7A", this.gridLevelText = "Your local grid: Cleaner than average.") : e === "moderate" ? (this.circleFill = "#ECA75D", this.gridLevelText = "Your local grid: Around average emissions.") : e === "high" && (this.circleFill = "#E4A08A", this.gridLevelText = "Your local grid: Dirtier than average.");
    } catch (o) {
      console.log(o);
    }
    this._hasCookie(this.ignoreCookie) && (this.autoMode = !1);
  }
  static get styles() {
    return he`
      .outer-container {
        container-type: inline-size;
        container-name: wrapper;
      }

      .inner-container {
        padding: 0.5rem 0;
        font-family: monospace;
        font-size: 0.8em;
        text-transform: uppercase;
        color: inherit;
        /* flex-wrap: wrap-reverse; */
        container-type: inline-size;
        display: grid;
        grid-template-areas:
          "location status"
          ". controls";
      }

      .inner-container:has(input[checked]) .controls {
        display: none;
      }

      .inner-container:has([data-expand]):has(input[checked]) .controls {
        display: flex;
      }

      .inner-container:has(input[checked]) #gaw-info-bar-manual {
        display: none;
      }

      #expander {
        margin-inline-start: auto;
      }

      .caret {
        transform: translateY(-50%);
        display: inline-block;
        height: 10px;
        position: relative;
        transition: 0.4s ease;
        transform: rotate(0);
        width: 13px;
        color: currentColor;
      }

      .caret:after,
      .caret:before {
        background-color: transparent;
        border-bottom: 9px solid currentColor;
        box-sizing: content-box;
        content: "";
        display: inline-block;
        height: 8px;
        left: 0;
        position: absolute;
        top: 0;
        transition: 0.4s ease;
        width: 1px;
      }

      .caret:before {
        transform: rotate(-135deg);
      }
      .caret:after {
        transform: rotate(135deg);
      }

      .inner-container:has([data-expand]) .caret {
        transform: rotate(0);
        transform: translate(0, -6px);
      }

      .inner-container:has([data-expand]) .caret:before {
        transform: rotate(-90deg);
      }

      .inner-container:has([data-expand]) .caret:after {
        transform: rotate(90deg);
      }

      .controls {
        grid-area: controls;
      }

      .location {
        grid-area: location;
      }

      .grid-status {
        grid-area: status;
      }

      .holder {
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        border: 0.5px solid #b8bcb5;
      }

      .holder > * {
        padding-block: 0.25rem;
        padding-inline: 0.75rem;
      }

      .icon {
        width: 1.5em;
        height: 1.5em;
        position: relative;
      }

      div.divider,
      #gaw-info-bar-auto {
        position: relative;
        display: flex;
        align-items: center;
      }

      #gaw-info-bar-auto {
        gap: 0.5rem;
      }

      div.divider:after {
        content: "";
        position: absolute;
        height: calc(100% - 0.8em);
        width: 1px;
        background-color: #b8bcb5;
        top: 0.4em;
        right: -0.25em;
      }

      .split-content {
        postion: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* gap: 1rem; */
        /* justify-content: center; */
      }

      .split-content > * {
        /* padding-inline: 0.25rem; */
        position: relative;
      }

      .divider:has(input) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      div.divider:has(input):after {
        height: calc(100% - 1.5rem);
        top: 0.75rem;
      }

      div.divider:has(input[checked]):after {
        display: none;
      }

      .spaced {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }

      button {
        background: none;
        border: none;
        font-family: inherit;
        padding: 0.5rem 0.75rem;
      }

      /* Toggle Switch Styles */
      .toggle-switch {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;
        min-height: 28px; /* Ensure minimum touch target size */
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }

      .toggle-slider {
        position: relative;
        display: inline-block;
        width: 3.75em;
        height: 2.25em;
        background-color: #ccc;
        border-radius: 1.25em;
        transition: all 0.4s ease;
        box-sizing: border-box;
        border: 1px solid transparent;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 1.75em;
        width: 1.75em;
        left: 0.15em;
        bottom: 0.2em;
        background-color: currentColor;
        border-radius: 50%;
        transition: 0.4s;
      }

      /* On state */
      .toggle-switch input:checked + .toggle-slider {
        background-color: #86ca7a;
      }

      /* Hover state */
      .toggle-switch:hover .toggle-slider {
        background-color: #b3b3b3;
      }

      .toggle-switch:hover input:checked + .toggle-slider {
        background-color: #75b369;
      }

      /* Active/pressed state */
      .toggle-switch:active .toggle-slider {
        background-color: #999999;
      }

      .toggle-switch:active input:checked + .toggle-slider {
        background-color: #5d9a53;
      }

      /* Focus states for accessibility */
      .toggle-switch input:focus + .toggle-slider {
        box-shadow: 0 0 2px 2px rgba(77, 144, 254, 0.5);
      }

      .toggle-switch input:checked + .toggle-slider:before {
        transform: translateX(1.55em);
      }

      .toggle-label {
        user-select: none;
      }

      /* For visual accessibility */
      .toggle-switch input:focus-visible + .toggle-slider {
        outline: 2px solid #4d90fe;
        outline-offset: 1px;
      }

      /* High contrast mode support */
      @media (forced-colors: active) {
        .toggle-slider {
          border: 1px solid CanvasText;
        }
        .toggle-slider:before {
          background-color: CanvasText;
        }
        .toggle-switch input:checked + .toggle-slider {
          background-color: Highlight;
        }
      }

      /* Keyboard accessibility improvements */
      .toggle-switch:focus-within {
        outline: 2px solid transparent;
      }

      /* Improve toggle interactive states */
      .toggle-switch input:disabled + .toggle-slider {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .toggle-slider {
        cursor: pointer;
      }

      /* Improve touch target size for mobile accessibility */
      @media (pointer: coarse) {
        .toggle-slider {
          width: 2.8em;
          height: 1.5em;
        }

        .toggle-slider:before {
          height: 1.1em;
          width: 1.1em;
          bottom: 0.2em;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(1.3em);
        }
      }

      /* Reduce motion preference support */
      @media (prefers-reduced-motion: reduce) {
        .toggle-slider,
        .toggle-slider:before {
          transition-duration: 0.1s;
        }

        .caret,
        .caret:before,
        .caret:after {
          transition-duration: 0.1s;
        }
      }

      /* Support for Windows High Contrast Mode */
      @media screen and (-ms-high-contrast: active) {
        .toggle-slider {
          background-color: WindowText;
          border: 1px solid WindowText;
        }

        .toggle-slider:before {
          background-color: Window;
        }

        .toggle-switch input:checked + .toggle-slider {
          background-color: Highlight;
        }
      }

      :host
        .inner-container:has(#gaw-info-controls label > input:not([checked]))
        > .holder:not(#gaw-info-controls) {
        display: none;
      }

      button:not(:disabled) {
        background: none;
        border: none;
        font-family: inherit;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
      }

      button#gaw-manual-low {
        --activeButtonBackgroundColor: #86ca7a;
      }

      button#gaw-manual-moderate {
        --activeButtonBackgroundColor: #eca75d;
      }

      button#gaw-manual-high {
        --activeButtonBackgroundColor: #e4a08a;
      }

      button:not(#gaw-manual-low):not(#gaw-manual-moderate):not(
          #gaw-manual-high
        ):not(:disabled)[data-active] {
        border: 1px solid currentColor;
      }

      button:not(:disabled)[data-active] {
        background: var(--activeButtonBackgroundColor);
      }

      .popover-wrapper {
        position: relative;
        cursor: pointer;
      }

      .popover-wrapper button {
      }

      .popover-content {
        width: 100%;
        max-width: 40ch;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .popover-content::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
      }

      @supports (position-try: most-height flip-block) {
        .popover-content {
          width: anchor-size(width);
          position: fixed; /* Essential for CSS Anchor Positioning */
          position-anchor: --infoAnchor;

          left: 0;
          top: 0;
          transform: translate(0, 0);

          /* Default position (first attempt: below the anchor) */
          position-area: bottom center;
          margin-top: 8px;
          top: anchor(bottom);
          left: anchor(left);
          position-try: most-height flip-block;
        }

        .popover-content::backdrop {
          background-color: transparent;
        }
      }

      .popover-message {
        padding-inline: 1em;
        text-align: center;
        line-height: 1.65;
      }

      .controls .divider {
        flex-wrap: wrap;
        justify-content: flex-start;
        row-gap: 0;
      }

      .controls > .holder {
        flex-wrap: wrap-reverse;
        width: 100%;
        anchor-name: --infoAnchor;
      }

      @container wrapper (width < 40em) {
        .inner-container {
          grid-template-areas:
            "status"
            "location"
            "controls";
        }

        .inner-container:has(input[checked]) .location {
          display: none;
        }

        .inner-container:has([data-expand]):has(input[checked]) .location {
          display: flex;
        }

        #gaw-info-bar-manual
          button:first-child:not(:disabled):not([data-active]) {
          padding-inline-start: 0;
        }
      }

      @container wrapper (width < 30.625em) {
        .controls .divider:after {
          display: none;
        }
      }

      @container wrapper (width > 45em) {
        .inner-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .location {
          order: 1;
        }
        .grid-status {
          order: 2;
        }
        .controls {
          order: 3;
          flex-grow: 1;
          display: flex;
          justify-content: flex-end;
        }

        .controls .holder {
          width: auto;
        }

        .inner-container:has(input[checked]) .location,
        .inner-container:has(input[checked]) .controls {
          display: flex;
        }

        .holder {
          border: 1px solid #b8bcb5;
        }

        #expander {
          display: none;
        }
      }
    `;
  }
}
customElements.define("gaw-info-bar", _e);
export {
  _e as GawInfoBar,
  _e as default
};
