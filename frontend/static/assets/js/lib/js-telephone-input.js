/*
 * International Telephone Input v7.1.1
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */
! function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], function(b) {
    a(b, window, document)
  }) : "object" == typeof module && module.exports ? module.exports = a(require("jquery"), window, document) : a(jQuery, window, document)
}(function(a, b, c, d) {
  "use strict";

  function e(b, c) {
    this.a = b, c && (a.extend(c, c, {
      a: c.allowExtensions,
      b: c.formatAsYouType,
      c: c.autoHideDialCode,
      d: c.autoPlaceholder,
      e: c.dropdownContainer,
      f: c.excludeCountries,
      g: c.geoIpLookup,
      h: c.initialCountry,
      i: c.nationalMode,
      j: c.numberType,
      k: c.onlyCountries,
      l: c.preferredCountries,
      m: c.utilsScript
    })), this.b = a.extend({}, h, c), this.c = h, this.ns = "." + f + g++, this.d = Boolean(b.setSelectionRange), this.e = Boolean(a(b).attr("placeholder")), this.f = f
  }
  var f = "intlTelInput",
    g = 1,
    h = {
      a: !1,
      b: !1,
      c: !0,
      d: !0,
      e: "",
      f: [],
      g: null,
      h: "",
      i: !0,
      j: "MOBILE",
      k: [],
      l: ["us", "gb"],
      m: ""
    },
    i = {
      b: 38,
      c: 40,
      d: 13,
      e: 27,
      f: 43,
      A: 65,
      Z: 90,
      g: 48,
      h: 57,
      i: 32,
      Bi: 8,
      k: 9,
      l: 46,
      m: 17,
      n: 91,
      o: 224
    },
    j = !1;
  a(b).load(function() {
    j = !0
  }), e.prototype = {
    _a: function() {
      return this.b.i && (this.b.c = !1), navigator.userAgent.match(/IEMobile/i) && (this.b.b = !1), this.g = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.g && (a("body").addClass("iti-mobile"), this.b.e || (this.b.e = "body")), this.h = new a.Deferred, this.i = new a.Deferred, this._b(), this._f(), this._h(), this._aListeners(), this._aRequests(), [this.h, this.i]
    },
    _b: function() {
      this._processAllCountries(), this._processCountryCodes(), this._processPreferredCountries()
    },
    _c: function(a, b, c) {
      b in this.q || (this.q[b] = []);
      var d = c || 0;
      this.q[b][d] = a
    },
    _filterCountries: function(b, c) {
      var d;
      for (d = 0; d < b.length; d++) b[d] = b[d].toLowerCase();
      for (this.p = [], d = 0; d < k.length; d++) c(a.inArray(k[d].iso2, b)) && this.p.push(k[d])
    },
    _processAllCountries: function() {
      this.b.k.length ? this._filterCountries(this.b.k, function(a) {
        return -1 != a
      }) : this.b.f.length ? this._filterCountries(this.b.f, function(a) {
        return -1 == a
      }) : this.p = k
    },
    _processCountryCodes: function() {
      this.q = {};
      for (var a = 0; a < this.p.length; a++) {
        var b = this.p[a];
        if (this._c(b.iso2, b.dialCode, b.priority), b.areaCodes)
          for (var c = 0; c < b.areaCodes.length; c++) this._c(b.iso2, b.dialCode + b.areaCodes[c])
      }
    },
    _processPreferredCountries: function() {
      this.r = [];
      for (var a = 0; a < this.b.l.length; a++) {
        var b = this.b.l[a].toLowerCase(),
          c = this._y(b, !1, !0);
        c && this.r.push(c)
      }
    },
    _f: function() {
      this.j = a(this.a), this.j.attr("autocomplete", "off"), this.j.wrap(a("<div>", {
        "class": "intl-tel-input"
      })), this.k = a("<a>", {
        "class": "flag-container"
      }).insertBefore(this.j);
      var b = a("<div>", {
        tabindex: "0",
        "class": "selected-flag"
      }).appendTo(this.k);
      this.l = a("<div>", {
        "class": "iti-flag"
      }).appendTo(b), a("<div>", {
        "class": "iti-arrow"
      }).appendTo(b), this.m = a("<ul>", {
        "class": "country-list hide"
      }), this.r.length && (this._g(this.r, "preferred"), a("<li>", {
        "class": "divider"
      }).appendTo(this.m)), this._g(this.p, ""), this.mItems = this.m.children(".country"), this.b.e ? this.dropdown = a("<div>", {
        "class": "intl-tel-input iti-container"
      }).append(this.m) : this.m.appendTo(this.k)
    },
    _g: function(a, b) {
      for (var c = "", d = 0; d < a.length; d++) {
        var e = a[d];
        c += "<li class='country " + b + "' data-dial-code='" + e.dialCode + "' data-country-code='" + e.iso2 + "'>", c += "<div class='flag-box'><div class='iti-flag " + e.iso2 + "'></div></div>", c += "<span class='country-name'>" + e.name + "</span>", c += "<span class='dial-code'>+" + e.dialCode + "</span>", c += "</li>"
      }
      this.m.append(c)
    },
    _h: function() {
      var a = this.j.val();
      if (this._af(a)) this._v(a);
      else if ("auto" !== this.b.h && (this.b.h ? this._setFlag(this.b.h) : (this.defaultCountry = this.r.length ? this.r[0].iso2 : this.p[0].iso2, a || this._setFlag(this.defaultCountry)), !a)) {
        var b = this._y(this.defaultCountry, !1, !1);
        this._ae(b.dialCode, !1)
      }
      a && this._uFromNumber(a)
    },
    _aListeners: function() {
      var a = this;
      this._aKeyListeners(), (this.b.c || this.b.b) && this._aFocusListeners();
      var b = this.j.closest("label");
      b.length && b.on("click" + this.ns, function(b) {
        a.m.hasClass("hide") ? a.j.focus() : b.preventDefault()
      });
      var c = this.l.parent();
      c.on("click" + this.ns, function() {
        !a.m.hasClass("hide") || a.j.prop("disabled") || a.j.prop("readonly") || a._n()
      }), this.k.on("keydown" + a.ns, function(b) {
        var c = a.m.hasClass("hide");
        !c || b.which != i.b && b.which != i.c && b.which != i.i && b.which != i.d || (b.preventDefault(), b.stopPropagation(), a._n()), b.which == i.k && a._ac()
      })
    },
    _aRequests: function() {
      var c = this;
      this.b.m ? j ? a.fn[f].loadUtils(this.b.m, this.i) : a(b).load(function() {
        a.fn[f].loadUtils(c.b.m, c.i)
      }) : this.i.resolve(), "auto" === this.b.h ? this._i3() : this.h.resolve()
    },
    _i3: function() {
      var c = b.Cookies ? Cookies.get("itiAutoCountry") : "";
      c && (a.fn[f].autoCountry = c), a.fn[f].autoCountry ? this.handleAutoCountry() : a.fn[f].startedLoadingAutoCountry || (a.fn[f].startedLoadingAutoCountry = !0, "function" == typeof this.b.g && this.b.g(function(c) {
        a.fn[f].autoCountry = c.toLowerCase(), b.Cookies && Cookies.set("itiAutoCountry", a.fn[f].autoCountry, {
          path: "/"
        }), setTimeout(function() {
          a(".intl-tel-input input").intlTelInput("handleAutoCountry")
        })
      }))
    },
    _aKeyListeners: function() {
      var a = this;
      this.b.b && this.j.on("keypress" + this.ns, function(c) {
        if (c.which >= i.i && !c.ctrlKey && !c.metaKey && b.intlTelInputUtils && !a.j.prop("readonly")) {
          c.preventDefault();
          var d = c.which >= i.g && c.which <= i.h || c.which == i.f,
            e = a.j[0],
            f = a.d && e.selectionStart == e.selectionEnd,
            g = a.j.attr("maxlength"),
            h = a.j.val(),
            j = g ? h.length < g : !0;
          if (j && (d || f)) {
            var k = d ? String.fromCharCode(c.which) : null;
            a._k(k, !0, d), h != a.j.val() && a.j.trigger("input")
          }
          d || a._j3()
        }
      }), this.j.on("cut" + this.ns + " paste" + this.ns, function() {
        setTimeout(function() {
          if (a.b.b && b.intlTelInputUtils) {
            var c = a.d && a.j[0].selectionStart == a.j.val().length;
            a._k(null, c, !0), a._j2()
          } else a._v(a.j.val())
        })
      }), this.j.on("keyup" + this.ns, function(c) {
        if (c.which == i.d || a.j.prop("readonly"));
        else if (a.b.b && b.intlTelInputUtils) {
          var d = a.d && a.j[0].selectionStart == a.j.val().length;
          a.j.val() ? (c.which == i.l && !d || c.which == i.Bi) && a._k(null, !1, !1) : a._v(""), a._j2()
        } else a._v(a.j.val())
      })
    },
    _j2: function() {
      if (!this.b.i) {
        var a = this.j.val(),
          b = this.j[0];
        if ("+" != a.charAt(0)) {
          var c = this.d ? b.selectionStart + 1 : 0;
          this.j.val("+" + a), this.d && b.setSelectionRange(c, c)
        }
      }
    },
    _j3: function() {
      var a = this;
      this.j.trigger("invalidkey").addClass("iti-invalid-key"), setTimeout(function() {
        a.j.removeClass("iti-invalid-key")
      }, 100)
    },
    _k: function(a, b, c) {
      var d, e = this.j.val(),
        f = (this._m2(e), this.j[0]),
        g = 0;
      if (this.d ? (g = this._k3(e, f.selectionEnd), a ? e = e.substr(0, f.selectionStart) + a + e.substring(f.selectionEnd, e.length) : d = e.substr(f.selectionStart - 2, 2)) : a && (e += a), this.b.i || "+" == e.charAt(0) || (e = "+" + e), this._v(e), this._uAsYouType(e, b, c), this.d) {
        var h;
        e = this.j.val(), g ? (h = this._k2(e, g), a || (h = this._k1(e, h, d))) : h = e.length, f.setSelectionRange(h, h)
      }
    },
    _uAsYouType: function(a, c, d) {
      var e;
      e = b.intlTelInputUtils && this.s ? this._cap(intlTelInputUtils.formatNumberAsYouType(a, this.s.iso2, c, this.b.a, d)) : a, this.j.val(e)
    },
    _cap: function(a) {
      var b = this.j.attr("maxlength");
      return b && a.length > b ? a.substr(0, b) : a
    },
    _k1: function(b, c, d) {
      for (var e = c; e > 0; e--) {
        var f = b.charAt(e - 1);
        if (a.isNumeric(f) || b.substr(e - 2, 2) == d) return e
      }
      return 0
    },
    _k2: function(b, c) {
      for (var d = b.length - 1; d >= 0; d--)
        if (a.isNumeric(b.charAt(d)) && 0 === --c) return d;
      return 0
    },
    _k3: function(b, c) {
      for (var d = 0, e = c; e < b.length; e++) a.isNumeric(b.charAt(e)) && d++;
      return d
    },
    _aFocusListeners: function() {
      var a = this;
      this.b.c && this.j.on("mousedown" + this.ns, function(b) {
        a.j.is(":focus") || a.j.val() || (b.preventDefault(), a.j.focus())
      }), this.j.on("focus" + this.ns, function() {
        var c = a.j.val();
        a.j.data("focusVal", c), a.b.c && !c && !a.j.prop("readonly") && a.s.dialCode && (a._uAsYouType("+" + a.s.dialCode, !0, !1), a.j.one("keypress.plus" + a.ns, function(c) {
          if (c.which == i.f) {
            var d = a.b.b && b.intlTelInputUtils ? "+" : "";
            a.j.val(d)
          }
        }), setTimeout(function() {
          var b = a.j[0];
          if (a.d) {
            var c = a.j.val().length;
            b.setSelectionRange(c, c)
          }
        }))
      }), this.j.on("blur" + this.ns, function() {
        if (a.b.c) {
          var c = a.j.val(),
            d = "+" == c.charAt(0);
          if (d) {
            var e = a._m(c);
            e && a.s.dialCode != e || a.j.val("")
          }
          a.j.off("keypress.plus" + a.ns)
        }
        a.b.b && b.intlTelInputUtils && a.j.val() != a.j.data("focusVal") && a.j.trigger("change")
      })
    },
    _m: function(a) {
      return a.replace(/\D/g, "")
    },
    _m2: function(a) {
      var b = "+" == a.charAt(0) ? "+" : "";
      return b + this._m(a)
    },
    _n: function() {
      this._o();
      var a = this.m.children(".active");
      a.length && (this._x(a), this._ad(a)), this._p(), this.l.children(".iti-arrow").addClass("up")
    },
    _o: function() {
      var c = this;
      if (this.b.e && this.dropdown.appendTo(this.b.e), this.n = this.m.removeClass("hide").outerHeight(), !this.g) {
        var d = this.j.offset(),
          e = d.top,
          f = a(b).scrollTop(),
          g = e + this.j.outerHeight() + this.n < f + a(b).height(),
          h = e - this.n > f;
        if (this.m.toggleClass("dropup", !g && h), this.b.e) {
          var i = !g && h ? 0 : this.j.innerHeight();
          this.dropdown.css({
            top: e + i,
            left: d.left
          }), a(b).on("scroll" + this.ns, function() {
            c._ac()
          })
        }
      }
    },
    _p: function() {
      var b = this;
      this.m.on("mouseover" + this.ns, ".country", function() {
        b._x(a(this))
      }), this.m.on("click" + this.ns, ".country", function() {
        b._ab(a(this))
      });
      var d = !0;
      a("html").on("click" + this.ns, function() {
        d || b._ac(), d = !1
      });
      var e = "",
        f = null;
      a(c).on("keydown" + this.ns, function(a) {
        a.preventDefault(), a.which == i.b || a.which == i.c ? b._q(a.which) : a.which == i.d ? b._r() : a.which == i.e ? b._ac() : (a.which >= i.A && a.which <= i.Z || a.which == i.i) && (f && clearTimeout(f), e += String.fromCharCode(a.which), b._s(e), f = setTimeout(function() {
          e = ""
        }, 1e3))
      })
    },
    _q: function(a) {
      var b = this.m.children(".highlight").first(),
        c = a == i.b ? b.prev() : b.next();
      c.length && (c.hasClass("divider") && (c = a == i.b ? c.prev() : c.next()), this._x(c), this._ad(c))
    },
    _r: function() {
      var a = this.m.children(".highlight").first();
      a.length && this._ab(a)
    },
    _s: function(a) {
      for (var b = 0; b < this.p.length; b++)
        if (this._t(this.p[b].name, a)) {
          var c = this.m.children("[data-country-code=" + this.p[b].iso2 + "]").not(".preferred");
          this._x(c), this._ad(c, !0);
          break
        }
    },
    _t: function(a, b) {
      return a.substr(0, b.length).toUpperCase() == b
    },
    _uFromNumber: function(a) {
      b.intlTelInputUtils && this.s && this.b.i && "+" === a.charAt(0) && (a = intlTelInputUtils.formatNumber(a, this.s.iso2, intlTelInputUtils.numberFormat.NATIONAL)), this._uAsYouType(a, !1, !1)
    },
    _v: function(b) {
      b && this.b.i && this.s && "1" == this.s.dialCode && "+" != b.charAt(0) && ("1" != b.charAt(0) && (b = "1" + b), b = "+" + b);
      var c = this._af(b),
        d = null;
      if (c) {
        var e = this.q[this._m(c)],
          f = this.s && -1 != a.inArray(this.s.iso2, e);
        if (!f || this._w(b, c))
          for (var g = 0; g < e.length; g++)
            if (e[g]) {
              d = e[g];
              break
            }
      } else "+" == b.charAt(0) && this._m(b).length ? d = "" : b && "+" != b || (d = this.defaultCountry);
      null !== d && this._setFlag(d)
    },
    _w: function(a, b) {
      return "+1" == b && this._m(a).length >= 4
    },
    _x: function(a) {
      this.mItems.removeClass("highlight"), a.addClass("highlight")
    },
    _y: function(a, b, c) {
      for (var d = b ? k : this.p, e = 0; e < d.length; e++)
        if (d[e].iso2 == a) return d[e];
      if (c) return null;
      throw new Error("No country data for '" + a + "'")
    },
    _setFlag: function(a) {
      this.s = a ? this._y(a, !1, !1) : {}, this.s.iso2 && (this.defaultCountry = this.s.iso2), this.l.attr("class", "iti-flag " + a);
      var b = a ? this.s.name + ": +" + this.s.dialCode : "Unknown";
      this.l.parent().attr("title", b), this._aa(), this.mItems.removeClass("active"), a && this.mItems.find(".iti-flag." + a).first().closest(".country").addClass("active")
    },
    _aa: function() {
      if (b.intlTelInputUtils && !this.e && this.b.d && this.s) {
        var a = this.s.iso2,
          c = intlTelInputUtils.numberType[this.b.j],
          d = a ? intlTelInputUtils.getExampleNumber(a, this.b.i, c) : "";
        "function" == typeof this.b.customPlaceholder && (d = this.b.customPlaceholder(d, this.s)), this.j.attr("placeholder", d)
      }
    },
    _ab: function(a) {
      if (this._setFlag(a.attr("data-country-code")), this._ac(), this._ae(a.attr("data-dial-code"), !0), this.j.trigger("country-change"), this.j.focus(), this.d) {
        var b = this.j.val().length;
        this.j[0].setSelectionRange(b, b)
      }
    },
    _ac: function() {
      this.m.addClass("hide"), this.l.children(".iti-arrow").removeClass("up"), a(c).off(this.ns), a("html").off(this.ns), this.m.off(this.ns), this.b.e && (this.g || a(b).off("scroll" + this.ns), this.dropdown.detach())
    },
    _ad: function(a, b) {
      var c = this.m,
        d = c.height(),
        e = c.offset().top,
        f = e + d,
        g = a.outerHeight(),
        h = a.offset().top,
        i = h + g,
        j = h - e + c.scrollTop(),
        k = d / 2 - g / 2;
      if (e > h) b && (j -= k), c.scrollTop(j);
      else if (i > f) {
        b && (j += k);
        var l = d - g;
        c.scrollTop(j - l)
      }
    },
    _ae: function(b, c) {
      var d, e = this.j.val();
      if (b = "+" + b, this.b.i && "+" != e.charAt(0)) d = e;
      else if (e) {
        var f = this._af(e);
        if (f.length > 1) d = e.replace(f, b);
        else {
          var g = "+" != e.charAt(0) ? a.trim(e) : "";
          d = b + g
        }
      } else d = !this.b.c || c ? b : "";
      this._uAsYouType(d, c, !1)
    },
    _af: function(b) {
      var c = "";
      if ("+" == b.charAt(0))
        for (var d = "", e = 0; e < b.length; e++) {
          var f = b.charAt(e);
          if (a.isNumeric(f) && (d += f, this.q[d] && (c = b.substr(0, e + 1)), 4 == d.length)) break
        }
      return c
    },
    handleAutoCountry: function() {
      "auto" === this.b.h && (this.defaultCountry = a.fn[f].autoCountry, this.j.val() || this.setCountry(this.defaultCountry), this.h.resolve())
    },
    destroy: function() {
      this._ac(), this.j.off(this.ns), this.l.parent().off(this.ns), this.j.closest("label").off(this.ns);
      var a = this.j.parent();
      a.before(this.j).remove()
    },
    getExtension: function() {
      return this.j.val().split(" ext. ")[1] || ""
    },
    getNumber: function(a) {
      return b.intlTelInputUtils ? intlTelInputUtils.formatNumber(this.j.val(), this.s.iso2, a) : ""
    },
    getNumberType: function() {
      return b.intlTelInputUtils ? intlTelInputUtils.getNumberType(this.j.val(), this.s.iso2) : -99
    },
    getSelectedCountryData: function() {
      return this.s || {}
    },
    getValidationError: function() {
      return b.intlTelInputUtils ? intlTelInputUtils.getValidationError(this.j.val(), this.s.iso2) : -99
    },
    isValidNumber: function() {
      var c = a.trim(this.j.val()),
        d = this.b.i ? this.s.iso2 : "";
      return b.intlTelInputUtils ? intlTelInputUtils.isValidNumber(c, d) : !1
    },
    setCountry: function(a) {
      a = a.toLowerCase(), this.l.hasClass(a) || (this._setFlag(a), this._ae(this.s.dialCode, !1))
    },
    setNumber: function(c, d) {
      this._v(c), a.isNumeric(d) && b.intlTelInputUtils && this.s ? this.j.val(this._cap(intlTelInputUtils.formatNumber(val, this.s.iso2, d))) : this._uFromNumber(c)
    },
    handleUtils: function() {
      b.intlTelInputUtils && (this.j.val() && this._uFromNumber(this.j.val()), this._aa()), this.i.resolve()
    }
  }, a.fn[f] = function(b) {
    var c = arguments;
    if (b === d || "object" == typeof b) {
      var g = [];
      return this.each(function() {
        if (!a.data(this, "plugin_" + f)) {
          var c = new e(this, b),
            d = c._a();
          g.push(d[0]), g.push(d[1]), a.data(this, "plugin_" + f, c)
        }
      }), a.when.apply(null, g)
    }
    if ("string" == typeof b && "_" !== b[0]) {
      var h;
      return this.each(function() {
        var d = a.data(this, "plugin_" + f);
        d instanceof e && "function" == typeof d[b] && (h = d[b].apply(d, Array.prototype.slice.call(c, 1))), "destroy" === b && a.data(this, "plugin_" + f, null)
      }), h !== d ? h : this
    }
  }, a.fn[f].getCountryData = function() {
    return k
  }, a.fn[f].loadUtils = function(b, c) {
    a.fn[f].loadedUtilsScript ? c && c.resolve() : (a.fn[f].loadedUtilsScript = !0, a.ajax({
      url: b,
      complete: function() {
        a(".intl-tel-input input").intlTelInput("handleUtils")
      },
      dataType: "script",
      cache: !0
    }))
  }, a.fn[f].version = "7.1.1";
  for (var k = [
      ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
      ["Albania (Shqipëri)", "al", "355"],
      ["Algeria (‫الجزائر‬‎)", "dz", "213"],
      ["American Samoa", "as", "1684"],
      ["Andorra", "ad", "376"],
      ["Angola", "ao", "244"],
      ["Anguilla", "ai", "1264"],
      ["Antigua and Barbuda", "ag", "1268"],
      ["Argentina", "ar", "54"],
      ["Armenia (Հայաստան)", "am", "374"],
      ["Aruba", "aw", "297"],
      ["Australia", "au", "61", 0],
      ["Austria (Österreich)", "at", "43"],
      ["Azerbaijan (Azərbaycan)", "az", "994"],
      ["Bahamas", "bs", "1242"],
      ["Bahrain (‫البحرين‬‎)", "bh", "973"],
      ["Bangladesh (বাংলাদেশ)", "bd", "880"],
      ["Barbados", "bb", "1246"],
      ["Belarus (Беларусь)", "by", "375"],
      ["Belgium (België)", "be", "32"],
      ["Belize", "bz", "501"],
      ["Benin (Bénin)", "bj", "229"],
      ["Bermuda", "bm", "1441"],
      ["Bhutan (འབྲུག)", "bt", "975"],
      ["Bolivia", "bo", "591"],
      ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
      ["Botswana", "bw", "267"],
      ["Brazil (Brasil)", "br", "55"],
      ["British Indian Ocean Territory", "io", "246"],
      ["British Virgin Islands", "vg", "1284"],
      ["Brunei", "bn", "673"],
      ["Bulgaria (България)", "bg", "359"],
      ["Burkina Faso", "bf", "226"],
      ["Burundi (Uburundi)", "bi", "257"],
      ["Cambodia (កម្ពុជា)", "kh", "855"],
      ["Cameroon (Cameroun)", "cm", "237"],
      ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
      ["Cape Verde (Kabu Verdi)", "cv", "238"],
      ["Caribbean Netherlands", "bq", "599", 1],
      ["Cayman Islands", "ky", "1345"],
      ["Central African Republic (République centrafricaine)", "cf", "236"],
      ["Chad (Tchad)", "td", "235"],
      ["Chile", "cl", "56"],
      ["China (中国)", "cn", "86"],
      ["Christmas Island", "cx", "61", 2],
      ["Cocos (Keeling) Islands", "cc", "61", 1],
      ["Colombia", "co", "57"],
      ["Comoros (‫جزر القمر‬‎)", "km", "269"],
      ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
      ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
      ["Cook Islands", "ck", "682"],
      ["Costa Rica", "cr", "506"],
      ["Côte d’Ivoire", "ci", "225"],
      ["Croatia (Hrvatska)", "hr", "385"],
      ["Cuba", "cu", "53"],
      ["Curaçao", "cw", "599", 0],
      ["Cyprus (Κύπρος)", "cy", "357"],
      ["Czech Republic (Česká republika)", "cz", "420"],
      ["Denmark (Danmark)", "dk", "45"],
      ["Djibouti", "dj", "253"],
      ["Dominica", "dm", "1767"],
      ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
      ["Ecuador", "ec", "593"],
      ["Egypt (‫مصر‬‎)", "eg", "20"],
      ["El Salvador", "sv", "503"],
      ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
      ["Eritrea", "er", "291"],
      ["Estonia (Eesti)", "ee", "372"],
      ["Ethiopia", "et", "251"],
      ["Falkland Islands (Islas Malvinas)", "fk", "500"],
      ["Faroe Islands (Føroyar)", "fo", "298"],
      ["Fiji", "fj", "679"],
      ["Finland (Suomi)", "fi", "358", 0],
      ["France", "fr", "33"],
      ["French Guiana (Guyane française)", "gf", "594"],
      ["French Polynesia (Polynésie française)", "pf", "689"],
      ["Gabon", "ga", "241"],
      ["Gambia", "gm", "220"],
      ["Georgia (საქართველო)", "ge", "995"],
      ["Germany (Deutschland)", "de", "49"],
      ["Ghana (Gaana)", "gh", "233"],
      ["Gibraltar", "gi", "350"],
      ["Greece (Ελλάδα)", "gr", "30"],
      ["Greenland (Kalaallit Nunaat)", "gl", "299"],
      ["Grenada", "gd", "1473"],
      ["Guadeloupe", "gp", "590", 0],
      ["Guam", "gu", "1671"],
      ["Guatemala", "gt", "502"],
      ["Guernsey", "gg", "44", 1],
      ["Guinea (Guinée)", "gn", "224"],
      ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
      ["Guyana", "gy", "592"],
      ["Haiti", "ht", "509"],
      ["Honduras", "hn", "504"],
      ["Hong Kong (香港)", "hk", "852"],
      ["Hungary (Magyarország)", "hu", "36"],
      ["Iceland (Ísland)", "is", "354"],
      ["India (भारत)", "in", "91"],
      ["Indonesia", "id", "62"],
      ["Iran (‫ایران‬‎)", "ir", "98"],
      ["Iraq (‫العراق‬‎)", "iq", "964"],
      ["Ireland", "ie", "353"],
      ["Isle of Man", "im", "44", 2],
      ["Israel (‫ישראל‬‎)", "il", "972"],
      ["Italy (Italia)", "it", "39", 0],
      ["Jamaica", "jm", "1876"],
      ["Japan (日本)", "jp", "81"],
      ["Jersey", "je", "44", 3],
      ["Jordan (‫الأردن‬‎)", "jo", "962"],
      ["Kazakhstan (Казахстан)", "kz", "7", 1],
      ["Kenya", "ke", "254"],
      ["Kiribati", "ki", "686"],
      ["Kuwait (‫الكويت‬‎)", "kw", "965"],
      ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
      ["Laos (ລາວ)", "la", "856"],
      ["Latvia (Latvija)", "lv", "371"],
      ["Lebanon (‫لبنان‬‎)", "lb", "961"],
      ["Lesotho", "ls", "266"],
      ["Liberia", "lr", "231"],
      ["Libya (‫ليبيا‬‎)", "ly", "218"],
      ["Liechtenstein", "li", "423"],
      ["Lithuania (Lietuva)", "lt", "370"],
      ["Luxembourg", "lu", "352"],
      ["Macau (澳門)", "mo", "853"],
      ["Macedonia (FYROM) (Македонија)", "mk", "389"],
      ["Madagascar (Madagasikara)", "mg", "261"],
      ["Malawi", "mw", "265"],
      ["Malaysia", "my", "60"],
      ["Maldives", "mv", "960"],
      ["Mali", "ml", "223"],
      ["Malta", "mt", "356"],
      ["Marshall Islands", "mh", "692"],
      ["Martinique", "mq", "596"],
      ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
      ["Mauritius (Moris)", "mu", "230"],
      ["Mayotte", "yt", "262", 1],
      ["Mexico (México)", "mx", "52"],
      ["Micronesia", "fm", "691"],
      ["Moldova (Republica Moldova)", "md", "373"],
      ["Monaco", "mc", "377"],
      ["Mongolia (Монгол)", "mn", "976"],
      ["Montenegro (Crna Gora)", "me", "382"],
      ["Montserrat", "ms", "1664"],
      ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
      ["Mozambique (Moçambique)", "mz", "258"],
      ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
      ["Namibia (Namibië)", "na", "264"],
      ["Nauru", "nr", "674"],
      ["Nepal (नेपाल)", "np", "977"],
      ["Netherlands (Nederland)", "nl", "31"],
      ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
      ["New Zealand", "nz", "64"],
      ["Nicaragua", "ni", "505"],
      ["Niger (Nijar)", "ne", "227"],
      ["Nigeria", "ng", "234"],
      ["Niue", "nu", "683"],
      ["Norfolk Island", "nf", "672"],
      ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
      ["Northern Mariana Islands", "mp", "1670"],
      ["Norway (Norge)", "no", "47", 0],
      ["Oman (‫عُمان‬‎)", "om", "968"],
      ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
      ["Palau", "pw", "680"],
      ["Palestine (‫فلسطين‬‎)", "ps", "970"],
      ["Panama (Panamá)", "pa", "507"],
      ["Papua New Guinea", "pg", "675"],
      ["Paraguay", "py", "595"],
      ["Peru (Perú)", "pe", "51"],
      ["Philippines", "ph", "63"],
      ["Poland (Polska)", "pl", "48"],
      ["Portugal", "pt", "351"],
      ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
      ["Qatar (‫قطر‬‎)", "qa", "974"],
      ["Réunion (La Réunion)", "re", "262", 0],
      ["Romania (România)", "ro", "40"],
      ["Russia (Россия)", "ru", "7", 0],
      ["Rwanda", "rw", "250"],
      ["Saint Barthélemy (Saint-Barthélemy)", "bl", "590", 1],
      ["Saint Helena", "sh", "290"],
      ["Saint Kitts and Nevis", "kn", "1869"],
      ["Saint Lucia", "lc", "1758"],
      ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
      ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
      ["Saint Vincent and the Grenadines", "vc", "1784"],
      ["Samoa", "ws", "685"],
      ["San Marino", "sm", "378"],
      ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
      ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
      ["Senegal (Sénégal)", "sn", "221"],
      ["Serbia (Србија)", "rs", "381"],
      ["Seychelles", "sc", "248"],
      ["Sierra Leone", "sl", "232"],
      ["Singapore", "sg", "65"],
      ["Sint Maarten", "sx", "1721"],
      ["Slovakia (Slovensko)", "sk", "421"],
      ["Slovenia (Slovenija)", "si", "386"],
      ["Solomon Islands", "sb", "677"],
      ["Somalia (Soomaaliya)", "so", "252"],
      ["South Africa", "za", "27"],
      ["South Korea (대한민국)", "kr", "82"],
      ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
      ["Spain (España)", "es", "34"],
      ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
      ["Sudan (‫السودان‬‎)", "sd", "249"],
      ["Suriname", "sr", "597"],
      ["Svalbard and Jan Mayen", "sj", "47", 1],
      ["Swaziland", "sz", "268"],
      ["Sweden (Sverige)", "se", "46"],
      ["Switzerland (Schweiz)", "ch", "41"],
      ["Syria (‫سوريا‬‎)", "sy", "963"],
      ["Taiwan (台灣)", "tw", "886"],
      ["Tajikistan", "tj", "992"],
      ["Tanzania", "tz", "255"],
      ["Thailand (ไทย)", "th", "66"],
      ["Timor-Leste", "tl", "670"],
      ["Togo", "tg", "228"],
      ["Tokelau", "tk", "690"],
      ["Tonga", "to", "676"],
      ["Trinidad and Tobago", "tt", "1868"],
      ["Tunisia (‫تونس‬‎)", "tn", "216"],
      ["Turkey (Türkiye)", "tr", "90"],
      ["Turkmenistan", "tm", "993"],
      ["Turks and Caicos Islands", "tc", "1649"],
      ["Tuvalu", "tv", "688"],
      ["U.S. Virgin Islands", "vi", "1340"],
      ["Uganda", "ug", "256"],
      ["Ukraine (Україна)", "ua", "380"],
      ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
      ["United Kingdom", "gb", "44", 0],
      ["United States", "us", "1", 0],
      ["Uruguay", "uy", "598"],
      ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
      ["Vanuatu", "vu", "678"],
      ["Vatican City (Città del Vaticano)", "va", "39", 1],
      ["Venezuela", "ve", "58"],
      ["Vietnam (Việt Nam)", "vn", "84"],
      ["Wallis and Futuna", "wf", "681"],
      ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1],
      ["Yemen (‫اليمن‬‎)", "ye", "967"],
      ["Zambia", "zm", "260"],
      ["Zimbabwe", "zw", "263"],
      ["Åland Islands", "ax", "358", 1]
    ], l = 0; l < k.length; l++) {
    var m = k[l];
    k[l] = {
      name: m[0],
      iso2: m[1],
      dialCode: m[2],
      priority: m[3] || 0,
      areaCodes: m[4] || null
    }
  }
});
