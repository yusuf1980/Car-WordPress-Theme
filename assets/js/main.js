"use strict";

/* Chosen v1.8.7 | (c) 2011-2018 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */

(function() {
  var t,
    e,
    s,
    i,
    n = function n(t, e) {
      return function() {
        return t.apply(e, arguments);
      };
    },
    r = function r(t, e) {
      function s() {
        this.constructor = t;
      }
      for (var i in e) {
        o.call(e, i) && (t[i] = e[i]);
      }
      return s.prototype = e.prototype, t.prototype = new s(), t.__super__ = e.prototype, t;
    },
    o = {}.hasOwnProperty;
  (i = function() {
    function t() {
      this.options_index = 0, this.parsed = [];
    }
    return t.prototype.add_node = function(t) {
      return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t);
    }, t.prototype.add_group = function(t) {
      var e, s, i, n, r, o;
      for (e = this.parsed.length, this.parsed.push({
          array_index: e,
          group: !0,
          label: t.label,
          title: t.title ? t.title : void 0,
          children: 0,
          disabled: t.disabled,
          classes: t.className
        }), o = [], s = 0, i = (r = t.childNodes).length; s < i; s++) {
        n = r[s], o.push(this.add_option(n, e, t.disabled));
      }
      return o;
    }, t.prototype.add_option = function(t, e, s) {
      if ("OPTION" === t.nodeName.toUpperCase()) return "" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        value: t.value,
        text: t.text,
        html: t.innerHTML,
        title: t.title ? t.title : void 0,
        selected: t.selected,
        disabled: !0 === s ? s : t.disabled,
        group_array_index: e,
        group_label: null != e ? this.parsed[e].label : null,
        classes: t.className,
        style: t.style.cssText
      })) : this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        empty: !0
      }), this.options_index += 1;
    }, t;
  }()).select_to_array = function(t) {
    var e, s, n, r, o;
    for (r = new i(), s = 0, n = (o = t.childNodes).length; s < n; s++) {
      e = o[s], r.add_node(e);
    }
    return r.parsed;
  }, e = function() {
    function t(e, s) {
      this.form_field = e, this.options = null != s ? s : {}, this.label_click_handler = n(this.label_click_handler, this), t.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready());
    }
    return t.prototype.set_default_values = function() {
      return this.click_test_action = function(t) {
        return function(e) {
          return t.test_active_click(e);
        };
      }(this), this.activate_action = function(t) {
        return function(e) {
          return t.activate_field(e);
        };
      }(this), this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || Infinity, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select;
    }, t.prototype.set_default_text = function() {
      return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || t.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || t.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || t.default_no_result_text;
    }, t.prototype.choice_label = function(t) {
      return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + this.escape_html(t.group_label) + "</b>" + t.html : t.html;
    }, t.prototype.mouse_enter = function() {
      return this.mouse_on_container = !0;
    }, t.prototype.mouse_leave = function() {
      return this.mouse_on_container = !1;
    }, t.prototype.input_focus = function(t) {
      if (this.is_multiple) {
        if (!this.active_field) return setTimeout(function(t) {
          return function() {
            return t.container_mousedown();
          };
        }(this), 50);
      } else if (!this.active_field) return this.activate_field();
    }, t.prototype.input_blur = function(t) {
      if (!this.mouse_on_container) return this.active_field = !1, setTimeout(function(t) {
        return function() {
          return t.blur_test();
        };
      }(this), 100);
    }, t.prototype.label_click_handler = function(t) {
      return this.is_multiple ? this.container_mousedown(t) : this.activate_field();
    }, t.prototype.results_option_build = function(t) {
      var e, s, i, n, r, o, h;
      for (e = "", h = 0, n = 0, r = (o = this.results_data).length; n < r && (s = o[n], i = "", "" !== (i = s.group ? this.result_add_group(s) : this.result_add_option(s)) && (h++, e += i), (null != t ? t.first : void 0) && (s.selected && this.is_multiple ? this.choice_build(s) : s.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(s))), !(h >= this.max_shown_results)); n++) {}
      return e;
    }, t.prototype.result_add_option = function(t) {
      var e, s;
      return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), s = document.createElement("li"), s.className = e.join(" "), t.style && (s.style.cssText = t.style), s.setAttribute("data-option-array-index", t.array_index), s.innerHTML = t.highlighted_html || t.html, t.title && (s.title = t.title), this.outerHTML(s)) : "";
    }, t.prototype.result_add_group = function(t) {
      var e, s;
      return (t.search_match || t.group_match) && t.active_options > 0 ? ((e = []).push("group-result"), t.classes && e.push(t.classes), s = document.createElement("li"), s.className = e.join(" "), s.innerHTML = t.highlighted_html || this.escape_html(t.label), t.title && (s.title = t.title), this.outerHTML(s)) : "";
    }, t.prototype.results_update_field = function() {
      if (this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing) return this.winnow_results();
    }, t.prototype.reset_single_select_options = function() {
      var t, e, s, i, n;
      for (n = [], t = 0, e = (s = this.results_data).length; t < e; t++) {
        (i = s[t]).selected ? n.push(i.selected = !1) : n.push(void 0);
      }
      return n;
    }, t.prototype.results_toggle = function() {
      return this.results_showing ? this.results_hide() : this.results_show();
    }, t.prototype.results_search = function(t) {
      return this.results_showing ? this.winnow_results() : this.results_show();
    }, t.prototype.winnow_results = function(t) {
      var e, s, i, n, r, o, h, l, c, _, a, u, d, p, f;
      for (this.no_results_clear(), _ = 0, e = (h = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), c = this.get_search_regex(e), i = 0, n = (l = this.results_data).length; i < n; i++) {
        (r = l[i]).search_match = !1, a = null, u = null, r.highlighted_html = "", this.include_option_in_results(r) && (r.group && (r.group_match = !1, r.active_options = 0), null != r.group_array_index && this.results_data[r.group_array_index] && (0 === (a = this.results_data[r.group_array_index]).active_options && a.search_match && (_ += 1), a.active_options += 1), f = r.group ? r.label : r.text, r.group && !this.group_search || (u = this.search_string_match(f, c), r.search_match = null != u, r.search_match && !r.group && (_ += 1), r.search_match ? (h.length && (d = u.index, o = f.slice(0, d), s = f.slice(d, d + h.length), p = f.slice(d + h.length), r.highlighted_html = this.escape_html(o) + "<em>" + this.escape_html(s) + "</em>" + this.escape_html(p)), null != a && (a.group_match = !0)) : null != r.group_array_index && this.results_data[r.group_array_index].search_match && (r.search_match = !0)));
      }
      return this.result_clear_highlight(), _ < 1 && h.length ? (this.update_results_content(""), this.no_results(h)) : (this.update_results_content(this.results_option_build()), (null != t ? t.skip_highlight : void 0) ? void 0 : this.winnow_results_set_highlight());
    }, t.prototype.get_search_regex = function(t) {
      var e, s;
      return s = this.search_contains ? t : "(^|\\s|\\b)" + t + "[^\\s]*", this.enable_split_word_search || this.search_contains || (s = "^" + s), e = this.case_sensitive_search ? "" : "i", new RegExp(s, e);
    }, t.prototype.search_string_match = function(t, e) {
      var s;
      return s = e.exec(t), !this.search_contains && (null != s ? s[1] : void 0) && (s.index += 1), s;
    }, t.prototype.choices_count = function() {
      var t, e, s;
      if (null != this.selected_option_count) return this.selected_option_count;
      for (this.selected_option_count = 0, t = 0, e = (s = this.form_field.options).length; t < e; t++) {
        s[t].selected && (this.selected_option_count += 1);
      }
      return this.selected_option_count;
    }, t.prototype.choices_click = function(t) {
      if (t.preventDefault(), this.activate_field(), !this.results_showing && !this.is_disabled) return this.results_show();
    }, t.prototype.keydown_checker = function(t) {
      var e, s;
      switch (s = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), 8 !== s && this.pending_backstroke && this.clear_backstroke(), s) {
        case 8:
          this.backstroke_length = this.get_search_field_value().length;
          break;
        case 9:
          this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
          break;
        case 13:
        case 27:
          this.results_showing && t.preventDefault();
          break;
        case 32:
          this.disable_search && t.preventDefault();
          break;
        case 38:
          t.preventDefault(), this.keyup_arrow();
          break;
        case 40:
          t.preventDefault(), this.keydown_arrow();
      }
    }, t.prototype.keyup_checker = function(t) {
      var e, s;
      switch (s = null != (e = t.which) ? e : t.keyCode, this.search_field_scale(), s) {
        case 8:
          this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0 ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
          break;
        case 13:
          t.preventDefault(), this.results_showing && this.result_select(t);
          break;
        case 27:
          this.results_showing && this.results_hide();
          break;
        case 9:
        case 16:
        case 17:
        case 18:
        case 38:
        case 40:
        case 91:
          break;
        default:
          this.results_search();
      }
    }, t.prototype.clipboard_event_checker = function(t) {
      if (!this.is_disabled) return setTimeout(function(t) {
        return function() {
          return t.results_search();
        };
      }(this), 50);
    }, t.prototype.container_width = function() {
      return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px";
    }, t.prototype.include_option_in_results = function(t) {
      return !(this.is_multiple && !this.display_selected_options && t.selected) && !(!this.display_disabled_options && t.disabled) && !t.empty;
    }, t.prototype.search_results_touchstart = function(t) {
      return this.touch_started = !0, this.search_results_mouseover(t);
    }, t.prototype.search_results_touchmove = function(t) {
      return this.touch_started = !1, this.search_results_mouseout(t);
    }, t.prototype.search_results_touchend = function(t) {
      if (this.touch_started) return this.search_results_mouseup(t);
    }, t.prototype.outerHTML = function(t) {
      var e;
      return t.outerHTML ? t.outerHTML : ((e = document.createElement("div")).appendChild(t), e.innerHTML);
    }, t.prototype.get_single_html = function() {
      return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>';
    }, t.prototype.get_multi_html = function() {
      return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>';
    }, t.prototype.get_no_results_html = function(t) {
      return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + this.escape_html(t) + "</span>\n</li>";
    }, t.browser_is_supported = function() {
      return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : !(/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent));
    }, t.default_multiple_text = "Select Some Options", t.default_single_text = "Select an Option", t.default_no_result_text = "No results match", t;
  }(), (t = jQuery).fn.extend({
    chosen: function chosen(i) {
      return e.browser_is_supported() ? this.each(function(e) {
        var n, r;
        r = (n = t(this)).data("chosen"), "destroy" !== i ? r instanceof s || n.data("chosen", new s(this, i)) : r instanceof s && r.destroy();
      }) : this;
    }
  }), s = function(s) {
    function n() {
      return n.__super__.constructor.apply(this, arguments);
    }
    return r(n, e), n.prototype.setup = function() {
      return this.form_field_jq = t(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex;
    }, n.prototype.set_up_html = function() {
      var e, s;
      return (e = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className), this.is_rtl && e.push("chosen-rtl"), s = {
        "class": e.join(" "),
        title: this.form_field.title
      }, this.form_field.id.length && (s.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = t("<div />", s), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior();
    }, n.prototype.on_ready = function() {
      return this.form_field_jq.trigger("chosen:ready", {
        chosen: this
      });
    }, n.prototype.register_observers = function() {
      return this.container.on("touchstart.chosen", function(t) {
        return function(e) {
          t.container_mousedown(e);
        };
      }(this)), this.container.on("touchend.chosen", function(t) {
        return function(e) {
          t.container_mouseup(e);
        };
      }(this)), this.container.on("mousedown.chosen", function(t) {
        return function(e) {
          t.container_mousedown(e);
        };
      }(this)), this.container.on("mouseup.chosen", function(t) {
        return function(e) {
          t.container_mouseup(e);
        };
      }(this)), this.container.on("mouseenter.chosen", function(t) {
        return function(e) {
          t.mouse_enter(e);
        };
      }(this)), this.container.on("mouseleave.chosen", function(t) {
        return function(e) {
          t.mouse_leave(e);
        };
      }(this)), this.search_results.on("mouseup.chosen", function(t) {
        return function(e) {
          t.search_results_mouseup(e);
        };
      }(this)), this.search_results.on("mouseover.chosen", function(t) {
        return function(e) {
          t.search_results_mouseover(e);
        };
      }(this)), this.search_results.on("mouseout.chosen", function(t) {
        return function(e) {
          t.search_results_mouseout(e);
        };
      }(this)), this.search_results.on("mousewheel.chosen DOMMouseScroll.chosen", function(t) {
        return function(e) {
          t.search_results_mousewheel(e);
        };
      }(this)), this.search_results.on("touchstart.chosen", function(t) {
        return function(e) {
          t.search_results_touchstart(e);
        };
      }(this)), this.search_results.on("touchmove.chosen", function(t) {
        return function(e) {
          t.search_results_touchmove(e);
        };
      }(this)), this.search_results.on("touchend.chosen", function(t) {
        return function(e) {
          t.search_results_touchend(e);
        };
      }(this)), this.form_field_jq.on("chosen:updated.chosen", function(t) {
        return function(e) {
          t.results_update_field(e);
        };
      }(this)), this.form_field_jq.on("chosen:activate.chosen", function(t) {
        return function(e) {
          t.activate_field(e);
        };
      }(this)), this.form_field_jq.on("chosen:open.chosen", function(t) {
        return function(e) {
          t.container_mousedown(e);
        };
      }(this)), this.form_field_jq.on("chosen:close.chosen", function(t) {
        return function(e) {
          t.close_field(e);
        };
      }(this)), this.search_field.on("blur.chosen", function(t) {
        return function(e) {
          t.input_blur(e);
        };
      }(this)), this.search_field.on("keyup.chosen", function(t) {
        return function(e) {
          t.keyup_checker(e);
        };
      }(this)), this.search_field.on("keydown.chosen", function(t) {
        return function(e) {
          t.keydown_checker(e);
        };
      }(this)), this.search_field.on("focus.chosen", function(t) {
        return function(e) {
          t.input_focus(e);
        };
      }(this)), this.search_field.on("cut.chosen", function(t) {
        return function(e) {
          t.clipboard_event_checker(e);
        };
      }(this)), this.search_field.on("paste.chosen", function(t) {
        return function(e) {
          t.clipboard_event_checker(e);
        };
      }(this)), this.is_multiple ? this.search_choices.on("click.chosen", function(t) {
        return function(e) {
          t.choices_click(e);
        };
      }(this)) : this.container.on("click.chosen", function(t) {
        t.preventDefault();
      });
    }, n.prototype.destroy = function() {
      return t(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.form_field_label.length > 0 && this.form_field_label.off("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show();
    }, n.prototype.search_field_disabled = function() {
      return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.off("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.on("focus.chosen", this.activate_field);
    }, n.prototype.container_mousedown = function(e) {
      var s;
      if (!this.is_disabled) return !e || "mousedown" !== (s = e.type) && "touchstart" !== s || this.results_showing || e.preventDefault(), null != e && t(e.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !e || t(e.target)[0] !== this.selected_item[0] && !t(e.target).parents("a.chosen-single").length || (e.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), t(this.container[0].ownerDocument).on("click.chosen", this.click_test_action), this.results_show()), this.activate_field());
    }, n.prototype.container_mouseup = function(t) {
      if ("ABBR" === t.target.nodeName && !this.is_disabled) return this.results_reset(t);
    }, n.prototype.search_results_mousewheel = function(t) {
      var e;
      if (t.originalEvent && (e = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != e) return t.preventDefault(), "DOMMouseScroll" === t.type && (e *= 40), this.search_results.scrollTop(e + this.search_results.scrollTop());
    }, n.prototype.blur_test = function(t) {
      if (!this.active_field && this.container.hasClass("chosen-container-active")) return this.close_field();
    }, n.prototype.close_field = function() {
      return t(this.container[0].ownerDocument).off("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur();
    }, n.prototype.activate_field = function() {
      if (!this.is_disabled) return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus();
    }, n.prototype.test_active_click = function(e) {
      var s;
      return (s = t(e.target).closest(".chosen-container")).length && this.container[0] === s[0] ? this.active_field = !0 : this.close_field();
    }, n.prototype.results_build = function() {
      return this.parsing = !0, this.selected_option_count = null, this.results_data = i.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
        first: !0
      })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1;
    }, n.prototype.result_do_highlight = function(t) {
      var e, s, i, n, r;
      if (t.length) {
        if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), i = parseInt(this.search_results.css("maxHeight"), 10), r = this.search_results.scrollTop(), n = i + r, s = this.result_highlight.position().top + this.search_results.scrollTop(), (e = s + this.result_highlight.outerHeight()) >= n) return this.search_results.scrollTop(e - i > 0 ? e - i : 0);
        if (s < r) return this.search_results.scrollTop(s);
      }
    }, n.prototype.result_clear_highlight = function() {
      return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null;
    }, n.prototype.results_show = function() {
      return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
        chosen: this
      }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
        chosen: this
      }));
    }, n.prototype.update_results_content = function(t) {
      return this.search_results.html(t);
    }, n.prototype.results_hide = function() {
      return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
        chosen: this
      })), this.results_showing = !1;
    }, n.prototype.set_tab_index = function(t) {
      var e;
      if (this.form_field.tabIndex) return e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e;
    }, n.prototype.set_label_behavior = function() {
      if (this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = t("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0) return this.form_field_label.on("click.chosen", this.label_click_handler);
    }, n.prototype.show_search_field_default = function() {
      return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"));
    }, n.prototype.search_results_mouseup = function(e) {
      var s;
      if ((s = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first()).length) return this.result_highlight = s, this.result_select(e), this.search_field.focus();
    }, n.prototype.search_results_mouseover = function(e) {
      var s;
      if (s = t(e.target).hasClass("active-result") ? t(e.target) : t(e.target).parents(".active-result").first()) return this.result_do_highlight(s);
    }, n.prototype.search_results_mouseout = function(e) {
      if (t(e.target).hasClass("active-result") || t(e.target).parents(".active-result").first()) return this.result_clear_highlight();
    }, n.prototype.choice_build = function(e) {
      var s, i;
      return s = t("<li />", {
        "class": "search-choice"
      }).html("<span>" + this.choice_label(e) + "</span>"), e.disabled ? s.addClass("search-choice-disabled") : ((i = t("<a />", {
        "class": "search-choice-close",
        "data-option-array-index": e.array_index
      })).on("click.chosen", function(t) {
        return function(e) {
          return t.choice_destroy_link_click(e);
        };
      }(this)), s.append(i)), this.search_container.before(s);
    }, n.prototype.choice_destroy_link_click = function(e) {
      if (e.preventDefault(), e.stopPropagation(), !this.is_disabled) return this.choice_destroy(t(e.target));
    }, n.prototype.choice_destroy = function(t) {
      if (this.result_deselect(t[0].getAttribute("data-option-array-index"))) return this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale();
    }, n.prototype.results_reset = function() {
      if (this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field) return this.results_hide();
    }, n.prototype.results_reset_cleanup = function() {
      return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove();
    }, n.prototype.result_select = function(t) {
      var e, s;
      if (this.result_highlight) return e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
        chosen: this
      }), !1) : (this.is_multiple ? e.removeClass("active-result") : this.reset_single_select_options(), e.addClass("result-selected"), s = this.results_data[e[0].getAttribute("data-option-array-index")], s.selected = !0, this.form_field.options[s.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(s) : this.single_set_selected_text(this.choice_label(s)), this.is_multiple && (!this.hide_results_on_select || t.metaKey || t.ctrlKey) ? t.metaKey || t.ctrlKey ? this.winnow_results({
        skip_highlight: !0
      }) : (this.search_field.val(""), this.winnow_results()) : (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
        selected: this.form_field.options[s.options_index].value
      }), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale());
    }, n.prototype.single_set_selected_text = function(t) {
      return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t);
    }, n.prototype.result_deselect = function(t) {
      var e;
      return e = this.results_data[t], !this.form_field.options[e.options_index].disabled && (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
        deselected: this.form_field.options[e.options_index].value
      }), this.search_field_scale(), !0);
    }, n.prototype.single_deselect_control_build = function() {
      if (this.allow_single_deselect) return this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect");
    }, n.prototype.get_search_field_value = function() {
      return this.search_field.val();
    }, n.prototype.get_search_text = function() {
      return t.trim(this.get_search_field_value());
    }, n.prototype.escape_html = function(e) {
      return t("<div/>").text(e).html();
    }, n.prototype.winnow_results_set_highlight = function() {
      var t, e;
      if (e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), null != (t = e.length ? e.first() : this.search_results.find(".active-result").first())) return this.result_do_highlight(t);
    }, n.prototype.no_results = function(t) {
      var e;
      return e = this.get_no_results_html(t), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
        chosen: this
      });
    }, n.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    }, n.prototype.keydown_arrow = function() {
      var t;
      return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show();
    }, n.prototype.keyup_arrow = function() {
      var t;
      return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result")).length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight()) : void 0 : this.results_show();
    }, n.prototype.keydown_backstroke = function() {
      var t;
      return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last()).length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0;
    }, n.prototype.clear_backstroke = function() {
      return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null;
    }, n.prototype.search_field_scale = function() {
      var e, s, i, n, r, o, h;
      if (this.is_multiple) {
        for (r = {
            position: "absolute",
            left: "-1000px",
            top: "-1000px",
            display: "none",
            whiteSpace: "pre"
          }, s = 0, i = (o = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length; s < i; s++) {
          r[n = o[s]] = this.search_field.css(n);
        }
        return (e = t("<div />").css(r)).text(this.get_search_field_value()), t("body").append(e), h = e.width() + 25, e.remove(), this.container.is(":visible") && (h = Math.min(this.container.outerWidth() - 10, h)), this.search_field.width(h);
      }
    }, n.prototype.trigger_form_field_change = function(t) {
      return this.form_field_jq.trigger("input", t), this.form_field_jq.trigger("change", t);
    }, n;
  }();
}).call(undefined);
"use strict";

/*
 * Copyright (c) 2018, WebRotate 360 LLC. All rights reserved.
 */
eval(function(x) {
  var d = "";
  var p = 0;
  while (p < x.length) {
    if (x.charAt(p) != "`") d += x.charAt(p++);
    else {
      var l = x.charCodeAt(p + 3) - 28;
      if (l > 4) d += d.substr(d.length - x.charCodeAt(p + 1) * 96 - x.charCodeAt(p + 2) + 3104 - l, l);
      else d += "`";
      p += 4;
    }
  }
  return d;
}("var WR360 = {};(function () {F` &#.prototype.aK = ` ;&eB) {if (eB.constructor == ` U$) {this` Z& = new eB;` **` S* this` 1-t = eB` (&` 1,iQ = 0` &,aB`!h)) {var ` h!` E!ct;for (var i` -$iQ; i > 0; i--) {` K!ct.ct;}` ;#++;return ct;};} else`\"=/`!qW;}` {#` ?!};String` ='pg`\")0tx`\"6$;`\".$arguments.length;while (`\"8\"` J#xt.replace(new RegExp(\"\\\\{\" + i + \"\\\\}\", \"gm\"),` k&[i])`!b&xt`!W0bE`![,if (this == \"auto\") {` ^#0` f%parseInt` F!`!W%\"px\", \"\"))` x0gO` |,` a(Floa` BInA`#G;`#../\\r\\n/g, \"<br>\")` .1n\\r` #<r` C=` 5(`#u)})()`*%+Date.now = ` \"%||`\"u1+`)c!Date;};jQuery.fn.fI`\"^)onclick, proxy`\"r#` '! =` .\" === undefined ? \"\" : \".` 8!\" +` @\"`'#!gv`){!` &!q = \"touchstart\";if (window.navigator.pointerEnabled) {` R\"` 0#down\"`)P$` K1msP` L2MS` 2#D` ^\"`%h!bind(gq`!l$,`-?() {`\"e#.call`&9!, e);e.stopPropagation();e.preventDefault();`\"W!`$,$(`$a%false;})`*z\"`!<!\"`!!!`#1%`!6,if (` ^& - gv < 400`$r%;}`#b#`![2}`%}&`+o\"`%3&oe`%0)`$T\\`\"/!un`\"0\"`%!'` 9$`\"O#` :$`\"J*`!V,`2#!.by`)Z,` 0&.mZ` -,try`'h%`%V#self !==` ($top;} catch`#[\"`!/$rue;}` s'lf`*q0Device`3Z\"` &\".UA = `&Z&userAgent` 8$T`0Q\"`%5\"` -#jf = [\"iPhone\", \"iPod` \"\"a` #!android\"]`2#&d`% ! d <`!?#.jf`/v$ d++`,_$ =` 6&[d]`!,#[t] = !!`!l%.match`0-(t, \"i\"))`!j+` \"(||` (#[t]`/I%` 5(?`#D! :`'b$`#F&fU = `#S'()` 2&cz`#_)s`/,!, d`(i\"Valu`(#$!` 6\" || ` $\"`\"[# == `()&` M)`!_%` K\"`!H(dM` 6~`1X)` V\")`!8(j`)7*` B~` U#`3\"%,\", \".`3%\"`!M%bX` T~`$*$.toLowerCase() == \"true\"` h'` 0.1\"`!c(g`#7*`($#charCode`1>!jd = \"\"` '!mq = 10 +`\"r\"Int(Math.random() * 10)`)1&i`)5\"i < mq; i`)(!` v$ = 97` O826);jd += S`\"(\"fromC` W#(` _$)`\"m%jd`\"/(qk`\"+,if (document.ad.msie ==`)5!`0+'`*h!rident = /T` %\"\\/7\\./`3z!` 6#.test(`,N/)) {` |(version = \"99\";`!1.`-\"` ,(webkit`-5%` F)ozilla` '1oper` 0&`\")$` 6(sa = /(`-`#)/i`!l6`\"G!` L,`#%%var hL`/+3` J(rY = hL.indexOf(\"Chrome\") > -1` t-rY =`!z#`#8+sO` Z+M`\"d\"/5.0` g# &&` 5)AppleWebKit`!($}`1`(mG`'k0`/\\!ed, browser`!_!!jQuery.uaMatch) {` #*` \\)ua) {ua = ua`)6*`(a\"` J#/(c`\"g!)[ \\/]([\\w.]+)/.exec` _!|| /(`%F\"` &:`%4!)(?:.*`&G#|` 3:msie) ` (2ua`#8&compatible\") < 0 && /(`&]#`!+\"? rv:` b$|` ]+[]`&`# {`#G#:`\"Y![1] || \"\", `!j#` 1#2` 2\"0\"};};}`$$# = `#`*`&{2` {# = {}`$P!` X#.` 2#)`!<%[` ++]`)=$` )#`)i'` B$` +#;}if (` ?$`$Y#` o%`)o&` i!} else ` F(`$g#` H&safari` I%`'g' =`&Y%`,k'(`1#)fS`&L)`)R$fw = 0, gI`.]!var s`!Q!ypeof e.originalEvent !== \"undefined\" &&` 33.targetTouches` H,`#o!st`*~$ &&` ?= null` (=`2s$>`2u!`\"8!` 39[0].pageX;`\"\\!` 'AY`' %x:fw, y:gI}`0(\"rA`#1&window.e`\"y;` ;(`\"r?`$f&U`-6% &&`!5!`-D&if (e`\"3\" || ` %\"Y`\"h&`\"F)`\".\"`&W'e.client` U#` '\"` S'` 6$+ `&[%body.scrollLeft` /(` <$Ele` +!` <&`!9$` z#` Y3Top` M>Top;}`$\"1if (`\"w\"`&B$`#U9`&>%` ,6`&1/` 36`&2+` '>`&'3`\"'1`*4&pe`*1)qv, dX`*<#jS = qv.slice(-3`4J\"jS`&:\"svg\") {` z\"`+K'`#}!appendChild(dX);dX.width = dX.offsetWidth;dX.height` /(H` -!;` f*remove` j&`,8(A`!y)cu, eJ`!#x = cu` r#().left`,J!y` *+top` 3!x2 = x +` 8!uter`!d!(`(=\"` T\"2 = y` 7'`!j\"` 7(jx = Math.abs(eJ.x)`$8$jx >= x && jx <= x2`,:!J.y >= y` $%<= y2`$@)`\"9*`\":#rlocalProtocol = /^(?:about|app|app\\-storage|.+\\-exten`4]!file|res|widget):$/`!y!rur` b#[\\w\\+\\.\\-]+:)(?:\\/\\/([^\\/?#:]*)(?::(\\d+)|)|)` V\"ajaxLoca`!_!= \"\";try {` (+l` $#.href;} catch`0x\"` ;+`%<%create`)x#(\"a\");` ?(` e!`!+\"` S+` 5-`.N\"` 0#Parts =`\"O!.exec(` C)toLowerCase()) || []`\"C!qm =`#m+.test` W$` s![1]`%/%qm`$`(qT`$_)options) {`#)!if (!`4>'.msie`)%%`/)\"`\" \"qW`*t&ActiveXObjec`0U\"`/|%`)v!qW`/`(` ^*`!-!`&?'()` z1xhr `-&\"`$q\"` )#ew`!/1(\"Microsoft.XMLHTTP\")`% *`!4!` a!` q\"`!C2`\"x#.async) {` #) = jQuery.ajaxSetting` 5#;}xhr.open`#[$.type, ` &$url` #&` y\"`){\"v`(|,`\"K!var text = xhr.responseText`#^!` b$success`!`'` +#(text);}`\"X)` N(error` M'` +!(e);}}};xhr.send(`#&!`!-!`\"k-jv()`4*(`!b\"adyState === 4) {setTimeout(jv, 0` K%{`#-!n` N!statechange = jv`0g%true`$[*`$H*};})();(`#5)`&9\"J`#H-his.d`& $Array`(A%J.prototype.iS` M)item`-;$esult = -1;for (var i = 0; i < ` {#`3z#; i++`#o#` 3#[i] == ` l#` f%i;break;}`\"O$` 4\"`!I1bk`!==`\"v\"if` 8\" !`'i%`!X$push` T\";` L%`#d\"` ~>`2y\"Item`!!Cvar hN =`\"x\"iS`!2#if (hN > -1`!O'splice(hN, 1`!*Oclear`$`Tcontains`\"$0`&g$`!w(`!w!` U1mh` V*ndex` V+dr[` 2!]` L1d`!7*` K-`&:$` H0nz` 7A == 0;`(E7gl`#41s`-1#`#H#` F\"kT;` 8!bF`#Y)` /!hi` \".aw` \".ky` 40.ep`({!` &%U` \")rows = `#}&gl`)~(q`\"O8` w\"> 0 &&` (&U >`\"s!` \\/ly` _,`*\\%dj`*`\"dj`*_$bF`*^%dj`*c!var cd`(!$bF[dj]`(\"!cd.disabled`30% && cd.renderMode !=`#e$c.bf.au`\"$'`(:!`(8$`-T#`!{#Contro`$V2g`#W!.12`#J\"inBrowserFullScreen`)}%`%w\"`./!` &&iu` 1+oubleClickFulls` P/mouseHoverDrag` )/WheelDrag` E/` 3%ZoomOn`$*\"` :&qc`+#$`&R#deHotspotsOnLoad` A*` 2*Zoom` R)rowSensitivity = 15`\"?#rag` ++`&j#zoomStep`&m\"` )&peed = 30` A#sing`#!#Zoom`*H!`!N&pauseOnPrel`!c-resume` 4#On`#D!` 9%`%+$Margi`#s!`%!-to`(d'right` %&bott`\"_!` )#lef` 8\"` j*`(&'parse` {)fG`2J#fG =`12\" || fG`+j(`'0%;}var aj = fG`/w!t(\",\")`3H1aj`3I+switch (i) {case 0:`\"9'`!m\"by.dM(aj[i],`)2\"top)`3h#` P!1` O\"`\"d$` ?4` ;!` L)2` S\"`#-%` B4` ;\"` N)3` U\"`#Z#` A4lef`!)%default:` (\"}}`$+$Alig`$t2vertical` x%` F!.TOP`'w#orizont` 1-LEF`/G#`$z!`&W&`!').TOP = -1` ()CENTER`$O!` +(BOTTOM`(0!` z,` ;ERIGHT` R-`&a'`\"V-`/`(`\"d&`\"?*`!&#`/y$`\"i(` 50`\"U+`'n8bK`(##bK`'~(bK`'o7gP = bK`'~(`#{*gP` V$> 0`(11` 9%`(+7var `\"i$`%y$gP[i].toLowerCase().trim()`1^!` @+= \"top\" ||` Y,= \"-1\"`&B?} else ` g2center` i30` _<`$D$` f8`)P\"` k3`!`=`'K\";}`+;)`,g!g`#*>ag`! !left`!;!` )#`#,'`)>:`\"-'` T#`#$'` +#`\"z&` S5`\"t.` U#`-&!` a(`!6?`)Y!`\"h$`,54ix`,51x`1)&y`14&isXDefin`+v'` 1#Y` (,` v&`)G'ot`*T8` s'||` +$` q$` [2`*1.offsetX, ` #\"Y`\")$`!n)` ># !`*]#&&` +$`)(`\").` m#` F.Y` G-x`0V+`!O%` 8\"`+>#y` 11Y` ?#y)`\"M%kc`$21id = \"\"` g\"type` $'indicatorImag` 4!circ-cross-thin-blue.svg` J#disabl`$l,hotspotInfo `\"Q\"` 2\"`!e\" = new`!}#ix` 5\"margin` .)M` .!` 9\"a`,x#` 4&`'+!` 7\"wrap = tru`!9#renderMode`##%kc.bf.aC` h#ctivateOnClick`!p*de` \"9effects`#0\"`#b&.bf = {` $).aC`2U'` -\"io`2R'` ?#u = 2` &)kd = 3` ,#H`#B)`$`.src`$Y'clickA` =\"`\"V$` W'.iE.NONE` B'Data` Q,DataParam` .'url` <'urlTarg`$k!\"_self`&,$x` .!` $&Width = 242` +%Color = \"#525B69` D&Bk` 2&FFFFFF` 5#fntHeight = 14`!e#s`$\"#` (\"d`!|*img`!4$`)S$mg` u'transparent` K#lbxShowClo`*!`&)&lbxBackCover`%B*lbx`%a!Activ` G*imgNoScal`+k!`,w)`$$*`%n(`$9/`%z'` /+qq`&#'` -+mA`&,'` H,x`&*2.iE.sL = 4` %3s = 5` &2rH = 6` y3P = 7` &2pB = 8` y3r = 9` %3X = 1`\"b3`$A!1`\"r$lv`(6?labe`'U(dela`1~'bF`+y#Array`-\"#i` \".cS`-,$`$j$lq`!(2ourc`.R(`0{$`!*%`0T$= 0` d%nu`/@2`/)$first`,/&jJ` :1f`&.\"`-h\"otat` V\"alse`!F#kC = -1`!B#`##!` 3(gg`$l!`\"t\"oun`\"$!`(+'` .\"Rows`(%)useInertia`(;*` .\"RelToDragSpe`0o!` 1-TimeToStop = 70`*.$` 7\"MaxInterval = 12` 7#flipHorizontalInput`!^*flipVertic` *1rowsOnSingleIndex` L.Axis`*2-kT`#f1eH`1{)nu`#*#I` *)jH`&'#ontrol` /)C` .\"` Q#g` J*J`%1&H`!+1hb`#L)gj`#[)gw`#i*T` \")bY` 0*U` 0*z` ]*x`&:&toolbarPosi`1R#` 2#gH`/d!fffff`0Y$i`31!.9` ;#`(,!` &$fullScreen`.i\"`0B$` T)showF` @%T`!6\"`$H*customCursorCla`0Z)viewerHin`1{)` `\"Autohid`/?.kB`+E:};})();(` 6)` U\"dh` F1dw`01\"` z$dh.prototype = {constructor:` :$, oK:` ^)return`,*#, addEventListener` B'type, cc, param) {if` 0\"of `!K#[type] == \"undefined\"`!g&` 7$ [];}` ').push({cc:` x%:`!\"!});}, dispatch`!W!`!I'event`!<*` .!`!=!string\") {` -# {type:` )!};}if (!` (!.target` B$` (# =`\"2!` ;*ype`\"+!row`(r!Error(\"`!T! object missing 'type' property.\");}var handl`,\\!`%^\"`!y!`\"g#` }&] instanceof`0[\") {var c`-o!` >.;for (var i = 0, `.!!cs.length; i < ia; i++` d#r`\"A!cs[i].cc.call`!E!,`#A\",` 4#`%+\"`!b\"`#`\"ret !`$y* &&` j\"`*?\") {`\">&`*Q!}}}`&G#` 2#;}, remove`&4<`${$`%z)`\"[@`\"EPif (`\"k$ ===`!:\"cs.splice(i, 1);break;}}}}`)9$`%>\"`)_(`!y\"bubbles, cancelable`(Z&`+7\"`)m\"typ`-c$` M\" =` U$`,/#` X% =` c'` 7\"` m! =` t\"`+39Y`+;1aB().`+*'`%D&)`!7#Q`2I,otPath`,Y$` v$.aK(`+i$)` ,&`,4%.Ini`\"z*` b$, V`!F$` r'` #$`!5-`\")7ba` t)image, index,` h%, graphics` (\"oq`\"H@if` i# ==`-s!`*\\0ImageO`*j!.` \\!` E! == hotspot\")`-;#` d# ` #!`\"=\"F`4L#` `!`%J#G `!'\"`2\\#ndex =`\"+\"`#}-`##*`\"8( =`\"F)` ;\"oq = oq`!5#.b`&f!hi`&M#F.onloa`*!!` j!m` .&err`3[!` 3\"c` 3\"aA()`%E%ba`%:0ba.iK = \"pixel.png\"` 0&`%^&aA`&t1`\"f\"`\"p,`!h,bG`' -bG`!}+lQ` .'`\" )lL` /'abor`0&$.lG`\"1(`!c&gm`!],var bu` P$be;bu.`1|)(new ` e\"ah`\"~#ah.COMPLETE,`-r!,`!|\", bu,`\"'\", bu`%<\"` :$\"\")`#f)`!K'c` ndERROR`!/@` *#\"`(%! loading`'Y\": \" +`!3\"src`!\\4l`$R!`!W9if (bu.hx`)N\") {`0t\"`(m#`%4!`1/!`!vCeD`\"'/` +\"`#BFlL`!=W`!BCdU`!F?`#l2high-res`#^IG`!1~f`#X@`\"+$A`)F!`!WXhx`0(.`!l%` c\".src`!3\"Of`!a#`,M!) != -1` b2L`+R\"`\"|-qv`#%$oq ?` $\"`! \"cS.src :` ((sr`-#F` 7!` S#`/S%+ qv`\" 3S`!-,if `$.!`-k!`1_'`.z%`,y$` s2`!X-`!\"2aE` rB`)S)hK`05*`!|'K`!_D`3b+forceU`/Y!HighRes:`%Z!resBitmapLoader==null`3t%`0/2`\"f'`30)+ \"/\" +`'=#`%N!`!p2kz`\"GJ` 3'`!K!`!J#` 7' else`$W#`#8\"`!1$ah` )typ`(T!bbles, cancelable, af, ht, `(l#success, `2T!Mess`($\"`%\\\"B().constructor.call`!_!, ` j5)`#<\"af = af` '\"ht = ht` '\"`!5! =`!<\"` -\"`!?# =`!H$` 1\"`!H( =`!V)`#j%ah.aK`)Y#`+\\!)` /&`3<$ = \"ImageObject_complete\"` A&`24!` 8,`!,!` :'eD` 2,H`&7\"` ^0f` 45abort` ?'dU` 24`!:#})();(`%~)` W\"fC`%*)bi`$o%`)|$`$I>`$I#bi = bi`$*5F =`)%!`!b!` -\"`*%=`!&%`,O$be`(U#` )$o`)P!`(h%m` .&`\"?!` 0%`+W&fC`$o&dh`$n$fC`% \"s = {` @'` /\".CLICK_ACTION = \"HOTSPOT_API_` 0(`#v$da`(/EO`'R~aO = aO`'Spda`(03da`(:)Hotspot`(23da`(?&` <*`(>)fC`-<'gm`2]0`0o!`%\\$var handle`%@%be;setTimeout`'g0by.pe`4S\".src,` l\");` a#.dispatch`\"H!(new`/*#da`&,$`\"O&, true,`.J\",`!C$,`!L$`$%\"` =$\"\"));}, 100`1u&`\"D*c`\">0bu`\"1'bu`!<A`#h!`!O+bu, bu`!L$` .#\"`2\\! loading`\"f\": \"`4Z$src)`!V3L`)Q\"`!b)`)U#`2W'`*B%` j#bi.h`%:\"Info.sr`)k)` t&js`2J6` U*clickA` B\"!=`\"e#`&=#` <!iE.NONE`2f%`\"q!;}` %$` `/url.length > 0`$53L`!Q,` V7cdata` h' ||` B\"`#'!` %0` R+txt`!1=e`,%*`!4:imgWidth != 0 ?` &::`!e$width`!(2kv`!1)`&$!rotator`'@$O =`&Q\";switch`$O=) {case`$^2sX:if` {*.pY ==`${!) {` -)cJ();} else` ++g` 5!`!X!`%T!break;` ~6qq:` h.` `.` GFmA` ^/`!%Gx`!0<bV.iG(1` IHsL` OB-` HJs` h*bV.qB`%+6Data,`(Z2` 7$Param` wHrH`!v?qo`!7:`#rIP`!#*mf`$QIpB` P+t` 2Isr` Q*rc(null` 7Her:var mE`1=%`\"_3;if (mE`,='`*R#hZ = window[mE]` C!typeof` 6!== \"`+1$\") {hZ`#v$`![(}}`!c\"default:`/8%bO`+{2c`+eH`0t%`3E4` *\"` ~%` *!s.CLICK_ACTION`3J%` \"!))`+'`!{'`+|\"`!&%js(` =(`2 @=`2&:var url`$63url`\"G!`,B*D`!7*` 0(sm`\"N)sY.rU.rR);}var re = url.substr(`34!astIndexOf(\".\") + 1)`!0!re && re`2D(` +\"toLowerCase`!E\"\"xml\"`!<,reload(url, `!W*ettings.rootPath`/a&var win`&X%.open` ]\"`\"i3Target);win.focus()`&C%`$^\"`$i\"his.kv`&**;}if (bO`$d+`#+_`!:$`')\"};})();(`'U&) {` N\"cL`'j)bh) {`!g!aB().construc`-6!all`&I!`$8\"bh == `*y! {throw new Error(\"ImageP`#|\"er:`#z\"R`!q\" is` S!\");}`!&!` 8! ` g\";`#a\"h = bh`)a%cL.aK`\"?#dY)` ,&le = \"first\"` +'a = \"none` *'`*A&Load`\"I)`%@$, V`\"W$ct.Init`\"L&, ` :(;`,D!h = V`&%&eH`\"%\"` 8!av = `,P#`\"-#.qQ !== \"undefined\" &&` 3'(` r\"qI`)F%h` t&fullScreenOnClick`$\"!!av`*\\)h.dV`%g$` q(`$%\"`$2!`))! >=`.H%bW`!%'` 9,`-\"&` 4%Row` ]#` Z%rd`\"f!aw`)e$/` (\"rows;` m/` Z%* rd + bW`(%#W >` [)- 1) {` ]!0;}`#k#aw[bW].src`-V(`#w/` ^$== 0 ||`$90`+;.`%|'`%F$`/O4cO`&n#cO.COMPLETE,`#w!`/V%null` +$\"\"));`)T\";}`+k$`!u\"`\"H&=`$3\"` ?u`&x!F =`&B!`%b#`\"m*bg`$S!OnSingl`%i#` C$? parseInt`#e(bg.fE) :`$~%pH.bV.ob(`,S!`& !aF <`$!\"aF`$q1`!Q!`$y)aF`% \"var oq = av &&`!`(control.qc`'b(bV.lc`!0!oq) {` c*cS !`+g\" ?` *(.src :`!+*}`,3+ew `(6!`,A\"`%{\"be`'X#` )(onl`+`\"` /!o` -+error` 5$mj` 1(src` 1$`+i$ + h`-?)`,a&os`,\\)`%p$be`%?X` [$`!L!`%w)`!/1mj` hXERROR`''1` &#\"`0^% IO ` J!: \" +`!a\"src`!L(O`!>)type, bubbles, cancelable,`1K\", success, `$-!Message`2A>,`/U!` f1)`$b' =`!\"\"` -\"`!%# =`!.$` 1\"`!.( =`!<)`\"-'`2V&`#H!`2Z%`$[& = \"complet`2M&`#Y# = \"` t!\";})();(`$B)`3Q#P`#/)cR`\"E>`\"E#aw`(4#Array`\"F#U` \".`0@!0` 9#tart`/}%` .%cG` 9&cR = cR` '\"mu`\";!ache_\" + cR.substr(1, cR`+B#`%@&dP`#(&dY`#'$dP`'-'lU`\"D)row`3C#row >`&8#U` r$ {row`,:\"`.$\"` 9$[row]`!,(` x&sd`(*,` M*` u#` F3M` A8rd` @2rr` :8`.I%` G2Init`\"e+`+|\", graphics` (\"V, `.4!`$B\"t` T!`(2(` N&V`%]#ln` N;`!<2ln` ~N`&B!`0r(/` (\"rows`0/!` >$%`11!` ?1;` I% = 1;}for (var `%=$` $!<` n' row++` h$`%P#`'w)`3u!sK` l!` &!l` e!` r%i` s\"i` o$`!C# i` r!if (i >= sK *`%<$) {sK++;` d#` }!af`!/#`#I\"ba(`2-!i], sl`$/(`#5*oq`*%%[i] = af`*\"$[sK - 1][sl++` 4#if (`3|'bg.fE == i`\"Y%`*2+` ^\";}}`$s1kE`0O1`*h#`\"o0`'A+`\"#`\"X%`\"!&`!f!af`3U&.indexOf(\"dummy.png\") >= 0`!/$kA({ht:`1:#af:af});continue;}af.be` ~#;af.add`.q!Listener`+q#ah`3V(his.nU)` 2:`2f$his.ou` H!Load();`#\"2n`,V*`1r%be.kA(e`(_3kA` E-if (e.ht`+(%;}`#{#++`')!eR =`4W$f.PROGRESS`(f&cG >`#n%`-k&` I*`\"g$`/Z#Q = true`!%#dispatch`\"w!(`'9&cf(eR,` E!, `$.#e.af, Math.round`!<%* 100 /`!:,` W$\"\")`\"^3ou`\"d-var bu`&&$be;bu`!I8`\">%`$^$`!T9bu`!c(bu`!`)` L%`4Q!Message`!o'cf`!`)type, bubbles, cancelabl`'9!, ee, success, ` e)`%h#aB().constructor`/@(` c5`+($f`+\"'ee = ee` &#` ' =`!,)`+T#`!N\" =`!V$`\"5'`4U&`#e!`4Z$`&Q' = \"ImagesCache_progress\"` A&`&H$` ;,complete` @'`$O!` 8,`!n!` :'bJ` Y-`\"j!ed\";})();(`,W)`&?#c`,g1`#Z6`#R#dH`-)!`&V\"F`0^)` /!hu = -1`'D&c`#*&dY`#)$dc`'Y'Init`3:3V`4BIku` N)`!8(`+\\'`(d*` ~*`+O!W`2G7bF`2O/!V.bF[i].disabled` 1#`\"h%= -1`-<%F[eW`3|$`!Z\"fC(` [#, eW`\"0&);} else `-C!W`0x$hu` 6ReW++`2?(`\"i)D`%:1`%'#`225`\"^-`2F!O`,4%F`2B%O.bi.hotspotInfo`2O!` V\" >`2@!aO`1t(O`184da`1p,mN)` 2:`1s)g` H!`1x$`#Z\"`3Z#q`-o'da` {1`-q(aO, aO`4S\"`/<*`#N2mN`2]6q`2j)`$-)q` @2dH`2R.dK`2Q/dH`2[%`$F%`2V*dK`2-SdK`2O1O`2R.dH`2V*`!@&`2N2`\"V(og`2'Yd`+v%K`2L4`!c*bu`!c(bu`!`)`2D<dK`2;EO`1d|O = aO`1vjdK`2M3`&Q' = \"H`*E\"`2O3`&G'` ;.`2X,`$P$` 8.`2])dK`2c#` _+`2J>cI`$G)visi`$9%bV, H`)+%f = ` 8#`2h#z`2e&dg` \"&`#o)bV = bV` &#h` (!.bh` *\"playin`'^!als` p#H = H`#k%cI`(#'c`.t2fR(`&[&` D)aH`\"*0) {` 91eC` A)x`\"R%z = x` l2fv` G)y` K%g = y` >2nT`!w,`,H%bH == null) {return;}`0t!M`*I%V.oy` H\"aO`/S#bH.qh`/_#bH.qw`( #`!u!aM.x`$;'aM.y`$(#H.gM.css(\"left\"` Z#dz` W#` 5'top` 6%g)`.7&bH.image !`!p\" &&` @\"`2C.imgNoScale =`%*#`/}%` &width`!#$aO.ea() *`\"Q%lB);`0y%`#{*R`#2?`!S(gL()`!7& = `-m&bx` R#V`!@%` \"#H`\"q&jw(` \"'`,3\".gV(`2`!`!N0gV`!R,`${\" {x:`#r#, y` $#g}`%f2pM`\"+8`##`\"-&['delete'](`!R!`*O5a`&f*`*N6`.\\6`&L$`*6odW`*p0` E\"b `\"O\"` )\"`&K#HtmlId = \"\"` 2\"kN`(W%h.settings.graphicsPath + \"/\" +`'4(indicatorIm`07%`'j\"`%i\"` ,'`%}\"`!?%fc`!d*gB`\"N&gE` \"&pl = \"` %_active `!8,d + \"_` 7,`\"5#`!M!.onload = jQuery.prox`+!#nK`'9\"`$;#` H$`0^!` ;2Y` D)`#E,`#@$gK`, $.bi` E#cb`\"3&kn` \"&jP` u1jP` })mC` 11mC` 9)kG`)3$`\"%\"src`!N$kN`&5#H`/e%`(`%aT`4V&dh`4U$aT`4g\"s =`0.&` ,%.ACTIVA`4E#OTSPOT_API_` 0$`3{$` H&DE` <4` 0&` D.mI` B(ROLLOVER_REMOVED` E'`*b&kG`2Z1`(-!`#>\"(\"<div style='position:absolute' class='`$z#`&7&`&A<\" + \" wr360` T$` I%bh.oY + \"' id='` /%`%x*+ \"'/>\").appendTo`%$\"H`0r'`!5\"effects == \"scaleUp\"`\"A&.addClass(`(Z'` M\"_` I!_up\");}` G$mouseover(`&9)`#<&event` x$OnMouseOver` 2#;}`&c#`/t$` k$ut` EIut` W6fI` FAkf` K4h.add`&3!Listener`'o#`&E#hG`2(#mC);var self`([#`!=%bind(\"touchend `\"A!down\",`&I'e) {e.stopPropagation();self.bh.jB(e);}`)7)`'7&nK`'4)e) {var `.:$e.target`!R-setTim`#o!`1x/by.pe(`!=!`/20,` z\"`!]#eC` D\"dz` *#fv` *#g`!~$b.css(\"background-` \\!\", \"url(\" +` l\"`,\"!+ \")\"` K+width\"`!1#.` )!` 3+height` :%` )\"`$s!100`#%4Y`#,-`\"Y#Z.gA(\"DynamicH`)0\"Presenter. E`/r!loading`!,\":`*K!`#h$.src` ~3cD`+c,` 21aH` :)`.c#, aX`'5$df = ` 1#`*M!`/&$ {if (` ?&bb.fadeIn(3`\"f! else` 2&show();}` 0$` H1Out` H2hide` Y!`!q1eC`!y)x`!s%z = x`(@%`$]!left\", x -`(t\"`%!' / 2`#83fv` u)y` y%g = y` t*top\", y` s*`%d\"` g7lX`$A,return`!U-` H3T` =>`!>\"` J2`4k!`&w*if (e.param !`4O#`0.)`\"]$gY(false);`$)2`.!&` s-`+0` o!fc = ` q!`!Z2`/f'`!d1`.8$pY == true`\"j%;}`!\"0e.pr`/!!Default(`2/-activateOnClick =`!Z#`-E$H`-/#.fR` V#iH`!2'`#%\"E = Date.n`((#`\")1kf`!{6`!,=if (` y&`&_$gE < 150`\"\\'`!H&0;}` t(js()`!o'` /(gL` 5\"`!(! ||` w\"`!6: &&` A\"dW` R@`*k%h.dispatch`2j!(new `2t'`2y.` Z!,` `\"`32#`'#*);}var pU`$C$aO.cv`%e$`$O\"pU`!Z;`'d,`#G$`#J\"`'.'`\"9%` B9`,~(`%u!`%=2jP`%B-clearInterval`!$\"gB);` 2!`3o$` 1!kn` \"0cb`)%#cb`%>!`,]$removeClass` C\"pl`(!'`\"&\"`$A$`%~)dW`\"R%var aq = `+:#` [!aq`$s-ld()`&N*`%r2`)r+if `%7#by.f`$L!` 3+var cV = {x:`&%%O, y` %%ei}`!Q!cV.x == 0 && cV.y` (!` t5A`%g#b, cV`(:(`%4&tru`\"\\\"lM`&A#`#V\"gB = set`$J%`/#)lM.lb();}, 2`2^!`252b`%:)t`$k\", hZ`!:%R` .$`$O#` '\" !== undefined`'Q%cb`\"G$var self`!f)`%V!set`%q$`!e)self.gY(`\"\\!`!'!hZ` y*) {hZ(` C!mv());}}, `!U%`\",2fR`\".0`/H+fu`#r$`+{%`({&` *%fc`%I-`0l$`*hv` r$cJ`2$$`(3!`%P!` 4$lp` 4$bb.add`(u4ll`._&`.A(`-[1oX`%/&`\"?*`#0&`1L!null`.<%`1m%`)6\"renderMode ==`\"e#kc.bf.kd ? `\"w&fH` l#V`\"a#aO` \"#H) :` >'bx` /6`\"]#H.add`#a!Listener`#s#aT`#u$mI` N#jP` L&jw`#>%H.j`-;$V`&D!`.+(` ,.`\"y4`$A!`&b1ll`&j)`&'&`$}\"`%d?`\"#&ACTIVATE`&\"*))`!#3d` PfDE` nJgY`!/)aX`0kH`0q,`1C2`0[X`(?&d`(?&`'S$`1D'` ?-bH !`'y,.cN(aX,` ^\"`,&3gV`#u3`0$dz`0{%dg}`#?2oX`,g7`1y:`#e3var oP =`.4$`/^+?` /%: 0` H!`/](`3o+de`3i3 &&`! !`2p*`$a#`0&=`2?9` >!jE`2X\"3`2Y!, oP`&^3jE`#u,var cV`,b$bh.hA`\"2!cV.x`!l! && cV.y`!n,`#d*A`%V#b, cV`.4)`-o/`.g%bH.iI(` B+`$5\"`2t$`$@3}`&/2lb`\"'5`&?$bh.dO`&A%bh.ei}`!dj`38%`(\\#`!l3` \"#`*;!`!x2nT`!~,`192`)S-`11<io`\"s#aM`%1%V.oy` V$`0J#bH.qh`0V#bH.qw`4.$z = aM.x` (#g` )\"y`0h%gM.css(\"left\"` Z#dz`1'&` 8$top` 6%g)`!e8!`3B,`\"_*.imag` A!`&;!&&`4-(hotspotInfo.imgNoScal`\"o!`$E)`!M'width`!R$aO.ea() *`# %l`&G6mv`&M0oJ = {`!A#HtmlId`&Y\"` &), parentContainer` >\"H, ` @#Config` 0\"`\"6!, coordX`-w&` +!Y`-~$, isVisible` ,#f}`4H$oJ`*m2pM`!r,`0$unbind(`1(,(`1!'`0(1` A\"`3B!Listener`3M-mI`#g#jP`%^%['delete']()`/'5`3&2`2t8h`!67`!G#hG`!G#mC` N$V `\"2\"` ]$` '$`#.2Z`#7)isHide`%E#ps = \"`$k#_indicator_hidden\"`#G!` K\"`4&,bb.addClass(ps);} else` 3&`\"1\"` 5'};})();`0C*`,[#x`!U)bV, aO, H`!$$aB().constructor.cal`#p\"`\"e(bV`\"d'bV.bh` *\"H = H` %\"ig `)s$by.ge`%w$dv`#D)gM` \")`*)\"` &(qh`-d!` &\"w` \"&aO = aO` '\"`*?'` 1!`*O+` ?\"`-K(` =#` )&` =\"sT` w&bP = 5` &\"v`(f\"`/Q%`!f\"A = new Arra`-=#`\"9!jQuery(\"<div class='`%0$rollover position` (&\" +`,R(id + \"` 6%\" + \" wr360` +$_` I%bh.oY + \"' id='` /%ig` 0!/>\").appendTo`(1\"H)`'9%bx.aK`(!#dh)` ,&`1F'`20!`%m%`\"h#`.d#` $&`\"\\#.show(`&y+dv.hide();}`#D+` ##`!D(`.-'`!%1, duration, hZ`!/5fadeIn(` ?)`!E-fadeOut` 6,`!9HiI`!X)eJ`1Y(` [%`1-&`.c#`&&\"}` '#`(C%fA`,#M, eJ`$;)`!('L`0|0`)\"/`!?%`2b(cdata.length != 0`#-$`)J!`'$8` U!`&<&`&'6dv`*J#gM` 3#`!03);var bn =`'/!` L%find(\"iframe\").each`,c*bn.iA.push(`!k#`,B!.attr(\"src\"));}`%(%`\"`%aO.F.src`\"X$>`\"Z!var hY`!>#`!Y)imgNoSca`$Y' ?`)1#V.lB : 1`,b'`#1)`\"ZJcss(\"width\"`1A#aO.ea() * hY` 9+background-color` K$`!l+BkColor` V#`.8$`!\\%img style='display:block;`!B!:100%;' src`+K'`#9$`!{4gM`#c.`!J(txt`&6B`\"sGkr`!2&`\"$htm`1u\"`!--nA()`*<$`#H$`.i$\", \"relative\"`(8D ||`#l.`\"/5`'U#a\").fI`'6#.proxy`'W'event` L$ib` )#;}`%!\"));}`*d1kr`*l)dR`, (`!w)ss`!V$=`!X\"dR`\"d\"font-family\", \"Arial\");` 7$`&t)`\"A+Width + \"px` G'`&g5txt`&w#` C$`'2@txt`'M%`!g)size` =0fntHeight`!I-border\", \"1px #eeeeee solid` ;'padding\", \"6px 8px 10` #\"\"`0g&dR`+s$tyl`!31css`$?4jw`/@,`%2\"L(`'I#qh`,4$dv.outer`#g!` 6%w` /,`\"L\"`/v(renderMode !`0?$kc.bf.aC`-;#aM` _$bV.o`.,\".aO`\"%#qh`\".#qw`+~+left\", aM.x` ++top` 3\"y` 2#dv`%y*0` )+h`!s!` 3\"`4?)` }+-`\"/#qh / 2)`!\"1` ;%w` =#`*M\"nc(`4%\"`!,*`4E!ilit`'r!`4Q#\"`3j3lm`$D)e) {e.stopPropagation();e.pr`)u!Default(`2I\"pU`#`$aO.cv`!`\"bh`$'Bu &&` ]!`1G#`%e$cN(true`&+4ib`!6Xlink`.v&e.target`3f$href`-f#` C\"== undefined ||` Z!`+`+`!o!lm(e`$~&`\"U%bh.gD() == `\".!` G#bh.sm.Event(`\"<\"sY.rU.rR);}var `!P\"`!N6` (\"\");window.open`!m!,` R%`!m)? \"_self\" :` :#`#F4nR`#Q)it, ab`(o#gd = 0`#B!jj = ab / 2` +!margin`%B'bi.` .\";switch`\"j#` 4\"align.horizontal) {case`%X#A` 9!LEFT:`!-!it - jj -` #.right;break;` G-CENTER` O'` I( +` '$lef` J5RIGH`!2&+ jj` C1d`&3\":`$M\"ca =` D\"`$}\"P`'z&`\"O\"wrap`%>'`&h!D`#*$H`+A().bE`-*#gd - ca <`&F\"`!97`&U#` N#+ ca >= lD` K'`#20}` v, || ` L1`!c!mi`%K$;}}return gd`+E2oi`%~)gR, bq`\"S#ho`&\"%hC = bq`%NYvertic`%s2TOP:`!*!gR - hC`\"X&bottom`%j;` Q&` I)`#t&top` K4BOTTOM` Z%+ hC` D0`%z+E =` C\"`%_FmQ`%z+`17#`%'ho - cE`&\"$`!:6`%~'ho + cE >= mQ` J'`#21`&%!` z( || ` M1`&\"$`%K#`& &ho`%t2m`%|*`,()`)3!`,$\"`#('`(XB`(e!`']'`!@#lD`(*!`\"^(`(Y!`)>&` B#ca;`!s$it`3I3F`'k6`%%!`'t\"`!l+`$M?`$W!`#O'`!A#mQ`#|!`*b)R`%-)`!t$E`!s%gR`!f2jl`!o)cU`1x$iZ`!>#` )!visible`&h'` r\"`%L\"` >!renderMod` A!`!%\"kc.bf.aC`\"f#ab`\"K$qh`\"_!bq` (%w`!#&image != null &&` <\"hotspotInfo.imgNoSca`!L\"false) {` u&aO.ea() *`#k#V.lB;`!(!ab` -$aO.F.`#n\" /` ('`%}!;` +!gM`$4\"left\", - (`&_\"))` 2*top` 9\"`%#\"))`*@\"kK`-8%lg` &!`*7+`,s\"parsed`#S$`\"G%` 6)n()`\">(` u!` A!nR(cU.x`/)\"`!!!` 2!oi(cU.y`)5#`%b\"` K'm` :!` E-lF` J(` .!dv`\"V)kK`\"T#` 0$`\"U\"lg` H$mc(true, 300, jQuery.proxy`\"S\"jm,`!'!))`&Z2cN`&c)aX, aq) {`&V0`\"f$`&_(aX`'9$mc(` <!, 2`!52kk`!A&`\"{#`#M\"` R#`\"C#kk();}a`%x!q !== undefined ? aq :`!C\"`\"q#ispatchEvent(new`(##` *\"` &\"aT` )\"s.mI,` W\",` ^\"`\"H!`\"c3iZ`\"m)`\"?$gM.unbind(`!i#H` ($\"touchstart.\"`+u$ig` 6-mousedown` 8*`.p2x`!8)e) {e.stopPropagation`+,(`*j'!`*f+u`!z$cN`%n!);}`,,2m`\"H,`+NA ||`\"&\"` +6io`!;$sT = Date.now(`'D$gM.`\"w'over\",`\"Q(vent) {` #!`\"R/}`\"b\"!`\"-#y.f`.4%` l*down\"`&s+` u.`)\\\"m` )#;}`'4%`$h#`$R7` VBmx` j.`(,)`!m%`&/&`!/d`&u2`!=W`0y!n`,r#`/%%f`!(!iframe\").each` k'index`1d#sS =`!7#`&G!).attr(\"src\")`/N!hv = bn.iA[` T!]`'p\"ypeof sS`+%!\"`+\"%\" && sS.length == 0`/e!` I\"hv` ?,) {`!'3, hv);}}`)K3kk`'Ry` d%sT != 0` '(bh.gD`1c\"`*,!`$9#bh.sm`-4)sY.rU.te,`))' -`!:\"sT`)7$`)P!0;}`)D%`$@:`\"v8\"\"`)J!`&1\"Z(`#%2['delete']`.41` S!`2T$remove`.K$dv` \"+bV = null` (#h` '$};})();`!i*`!E\"jI`!*)id, `2E#`!:$Id = id` n\"V`2`$` >$` `8cP` k-dF, cn`.[%j `3I#`\"+#f` \"*i`!/(dF = dF` '\"cn = cn` '\"K`(K&\"#`)&d`#g&cP`2'(W`#Z,`4e\"` Q\"cj` @2fi` I)fh`&X(cj == ` /!` f\";}`.`!` 6#`\"H$K`%X#class\"`+1\".cn`-\"+` 11dF`&y$`#/\"h`!P2aH`!Y)`$a&`!b%K =`%P\"`!P!row new Error(\"Set`${#: buttonElement==null.\"`!=$`$E!`%;$if` ~(`!}#sh`2.\"`\",*hide(`3i'e`&M.cg, be`%d#k, cn, cY, d`4R%aB().constructor.call`\"9!, `&:'`%W\"jn`&&*cg = cg` &#k = ck` &#Y = cY`&G#u = du`(c#e = b` Z#resubscribeTimer`(;!0` 6\"pj`&b%`0W#`! #`$_#be`!O#toggledCallbackProxy` E2Y` P'`#,&.aK`,o#cP)` ,&`%?&cD`.X5jn`&|'`$1#`2k!`\"y#`2Q+`!q-`#M(true`!K(`!7&ub`,[1K.un`!(!)`1s\"`#<2) {clearTimeout` .5`!y#`#73`-A&`$3!`-D#`!Y/`)hP`!9]`*k2`\"w#`$$#`#d#`*5`!@%du =`2r\"`$\\1`\"m5`)W&var bu =` G!`'O7set`\"4$`$q)bu.ka();}`,I$u);}`*O+`!sFdF`!nKpj`!>ilj`!z-`.;>ka`'\\3`#cF` c0l`!/!` QB`\"b!` ^#f`)4*`-Vb` G7`!.'`,5&eI`,7$fb`\")'p`*m-`3x(iW(` a)` N&j`)\\*playing`!u$fi` )%`*?&`#0*`05'`0?K` g&`.H1j`!['nM`!uE` K)as` K)d`![%fi(d`!>!})();`' *` b\"bN`%P1he = 1`'~\"aF = -` &#kl`1l&bU`-`)bB` \")V` 0)es` N&fe` Y'h` :)db`05$`&z\"A` 1)hz` \")ce` u*`4C+hw`4S+X = new `\"T\"J`\"7#`!w*dZ`!R&jr`!@)lc` b*H`\"P*d` \")aG` \")kL` \")lB`#U&rm` i*pJ`!8&sn` \"&ph` '!`%9$bN`%6'iF`$Y)bh, bd`$d$`#^!bh`!\\'bd`!Z'bd` ^2cD` f*U, bB, V, es, fe, aU, H` ~$`$E\"ew Array`$D(` &*`$O\"` &*`&$!bU`&7'bU.startRowIndex`&7'bB`&6&V`$Y'a` Y#H = H`#\\'`\"]#.l` Q#`'V!` -$bA.settings.bg.kC == -1 ? 1 : -1`0c&bh.pH !`$`\" &&` Z%pH.configFileFullScreenURL == \"\"` @(`!#%f` ?%OnClick =`%>#`#H$`(L!` y'dG`(R'` ,(A`1w%` N&e`1x#` H!fe;}`!~%V`!:&control.hideHotspotsOnLoa`%q%`)I!`&u\"}for (var i`&b! i <`!@#B.bF.length; i++)`3D\"aO`!`%B.bF[i]`#H!aO.bi.disabled =`(|\") {continue;}var dj = ` F\"id;` k!i`([$` ]&renderMode !=`*1#kc.bf.au) {` M\"`*I%aT(`\"(!, aO`2R\"`2W#H)`#;%` D+cI` 87`'q#[dj] = ai`'m$` *#`'h#[i]` f)jI(dj,`\"P\";ai.cD();}`).1oy`)6)aO, width, height`#c#x`$-!var y`$7!var bi`#8$`#'$F.src`$A# > 0` V#hY`#`%h`%?\"Info.imgNoScale`&q% ?`\"-\"lB : 1;`!E!` V\"ea() * hY;`!R\" =`!b\" * `!4!` /#/` (\"` 6!`&m\"bi.offset.ot()`2F&{x:` 1&x *`!1$, y` .'y` /&};}switch` o!align.horizontal) {case`#z#A` 9!LEFT:x = bi.margin.left;break;` >-CENTER` >/ +`(s#H.css(\"`\"9!\").bE() -` =,` %(r`\"p!-`#%\") / 2`!%4RIGH`!g\"` eA` l)` m#default:`\"u/vertic`\"p2TOP:y`\"G)top`\"e;` ?-`\"s,`%I\"`!f0top` #)bottom -`'g%`\"j7BOTTOM`!9!` gB` n+`\"x-`&b&x, y:y}`2r2sx`)X)`(p#sz`-5%U.sd()`0`&kl < sz - 1`.A$kl++`+{$`.w0bg.bounceRows`0:-`3-!0`,)#dE` X\"aF`+\\$`!a1ta`!DN`+/\"` '#--`!2[`\"\\\"`!HJfo`!b0dir`!o$`!5*kC`!v&` ,*oc`48!true\"`!N$he =` f\"= -1 ? 1 : -1`3Q*` 4--1`-I!`3X&tk()`\"F(`& #true`&+%` D!iG` K\"h`\"64eT`!L~`!K` =$`![otk`\":0jq`&g'lU`&d$)`2@!af = jq[`%t#]`2E\"f.image.delay`'.#`!g%sn++ < ` 7*` 5(bh.gQ != -`)U%` .!++`\"'%`\"G!;}`'4\"sn`)8!`\"K)`\"+0rE`\"/,` S(` >1ny` >1dE(0`#-3nC` :4`#0/.length`,#!` Y2iG` b)jG`$v'`)h* + jG` O3q`)g*label`#j$ypeof ` .! === \"undefined\" ||` 3\"`!`$<=`$f!`#w*`#9(`,L2for (` 6!H` A! sH`.[!; sH++`&03sH` M(i` R#i < jq`!I#; si` [!if (jq[si]`&-#`!p\"toLowerCase`(=\"` $/`-C*H`%}%`#V#si);}}`&H+`#N1B`#Q., rF, hZ`'Q(pJ !`#9)`'*\"`#@gbh.cJ(`)Y\"`#p8h`#L#h`$$$h`$#%rD `+I#` a!`$*-h` ]'pO` b\"pO`$-*pO`$/(pO`#fQ`!D!`\"}!break;}`#$!rD =` 1\") {` '.`-:+`\"u#if (pO` T!`(J#&&`\"`!` *#kl`$$,var lh`!9$`\"G!v = Math.abs`)0%- pO`4A\"pv <=`\"[& / 2) {` ^\"` F#< pO`/Y%` -)>` 5!`!0!M` 0#`!0!q`$(!`+F(if (lM.bh.pY`\"H%`%]!M.aF == pO && lM`'R!= sh) {clearInterval(lM.pJ);` \"!`$\\!` k\"eg.ji(`#<\"` ,#pY`%D%`!2#` x(`'.#hZ !`'$*`!a#` 4! null) {hZ`+u#;`(k$;}lM.rm`#]$if (sh >`!u\") {lM.sx()`#*$` 9#<` 4(ta()`$y\"`!U\"!= pO`#q\"? lM.eT() : lM.fo()`!'&`*%$`(M$`\"U\"`&1!` +%`\"W!`%6%gg = `*U#y.dM(rF, 1`)$\"eo = gg /`%4'* 1000` g\"`#a!set`#x%`$e)qD();}, eo)`1f>ob`%D)nh`/=*nh`#{, && n`'d\"`(N\"`,y(`0U!`-;$*`+#&M()`3f%` B#`!92lV`!B)index`/=3`)!$`#-!kj`&+)` S! <`,q!` &\"= - ` %!;` F!`-_&` 9\">`#_'- 1` L'` \"\"%`,#'` J)0 && kj` F'` ](`!,\"`\"R$` '#`\"D0nk`\"&Nif (!` )!rm`(Y!his.V.settings.bg.bounce`$l#`!l#`!T*1`$X&` *)`(9(`#G#`08)0`)-%`!2\"lV`!n#`\"*2fK`\"3)bW, deltaX,` \"\"Y`$a@fL`#Z![bW].bG`\"[!fL =`*i%`*^$` P!hs(fL.src`):#eh(bW` %#hw`%:%`!Y0dE`#{., isVertical`!e#ic`.G&`![!`!:\"Value` x$`(.$= parseInt`\"-\"nk`#(#`$a\"ic >=`&&\"` I%= ic`\",%` m$`15'`+O$bA`%&)rowsOnSingleI`& #` F%kl !`4Y'tartRow` ?$`!U4` s.fE`&X#`\"h)` {$` k3;}}`1M!`$g9af`$~\"`!E#]`!\"!`$[\"n && af.image.cS`0!'if (af.bG` ,$` D#bG.cQ`,A'` p\"S(` R!`$7\"fK`3t$`00%` >%af`(z(cX.contains(af)` g$cX.bk` F!af.addEventListener(`&9\"ah.eD, jQuery.proxy`!0\"hm,`\"f!)` ?;dU` J0eK` 8Bf`!'1` P*hS(`\"G\"`#B\"`(o# ||`#;)`4g\"`\"S#bh.hc`2>#}`&o!` 2FiM`#o$,`$7\";}}`#r)` 4)`)o\"`0Z&`(*'`)m2aS`)u*w`)m#bC = 0`&+&`$h(iw)) {` =!1;}while` <&ds() > bC` b#`'#!` 5$mh(0`#5$ != `!*!af.remove`%67`%=#`#|!` 09dU` F#eK` +>f` r$` F#aE(`'f#cX` S#Item`'/!`$R\"`\"9)=`/c\"`$x'`$T\";}`#V1iM`/J-jT`1X@` 1#`/./if (`/a#F.src`1P$`!S#`/X,` ?(`/`*` d!T`\"%$`/r!`-{#`!v1kg`!~)`-n(ce`+d'for (`/~!`&)! i <`%E#e`!d#; i++`*y%e[i].Visibl`/:'`!.2eh`#>-aX`!C#`,\"\"db` q$nT();`#)(` ;\"bh.av ||`#s#` )!`0r$bh.isFullScreenOn`\"9(aG.is(\":v`!e\"\")`0I!`-u\"`(Y!n`$h#`#_\"ph = setTimeout(`#-)bn`#\"`!z!;}, 400`!c&`$V\"kg`+m#`!q#U`$r'`0!EbW`0?\"!af` T'`$/0`0S%bF`$8+` k!l =` 7([i` r\"a`3/!`%3#` D!i`*R%A[al.source` F#i` B'ai.eC`#Q%css(\"left\").bE() +` _\"` 3$margin-` 4*al.offsetX *`$;&` K!width` B$/`*J#`/H!i.fv` >*top` x:` 4)`!,%Y`!$-heigh`!W%`!/#fe`!0\"aH`0(!`%,\"`),\"z`\"v'`'w'tru`'|!`'<&`$u\"Q()`/:2nT`)J,`(zF`'5!`$J&e`$q$bi !== undefined && ` /!`$t5bi.Id`$v/` D!O = ai.aO` :\"O`%;*`\"@!}}`*>3kQ`!aZjg`\"-.!jg`#j$`, %A[jg.Id].aH`/K&`!<2`/H*duration, left, top, `%v\"L` ,!` &\"Top, `&t!, `%e\"`/i<`)~(`&D\"F];`({~`)[>`$_1.bi.renderMod`0-!`#5\"kc.bf.au`%&\"bb.animate({left:left +`#%'`*)-`#/!`){' - ai.lX`) !2`#k!:top` \\%T` '!`)[*`#k\"`)J'` ^#T` _\"}, {`$_$:`$f&queue:`%H!}`&g7lx`%C)`1J%`&N#`2BOA`%*\"`2w\"`&h(`0K#`*w\"bh.R`3)&`!F0hs`!M)src` {$bd.attr(\"src\", src`+G3bo`)/,`%9!I = new Array`&`1`+CJ!bi) {continue`2=\"aN`+I3N instanceof`&?#aT) {aI.push(aN.mv());}}`2N\" aI`\"(2ActivateHotspot`***j, t`4Y\", hZ`\"R$`!I(dj`!2<N.eb(` Z(;`%n2op`!-+` WTgY`1$!` p4qb`\"3-isHide`!)#cA`!&&`+{\"N = ` uCpZ(` f#`1n\"fP`/T!`!31G`1#n`%B^ || ` &0cI`\":#M`1d\"`*Q1O`\"%)`0p%db = true`\"n\"eh`*r\"aF,` 1!`#$#bh.ih`$R$` k0m`):*` q*`*]\"` +!lx` _#` l'`2'$` d0fP`#y,`!X+` A3hm`!B*, `.I\"`-5#e.af =`0I%`)A\";`,R\"cX.removeItem` E!)`$/!` 5$ds() == 0`,D%h.hc`!}%`%&!`!_\"n` p'e.af` q#EventListener(`$v#h.eD,`%E\"hm);` ->dU` H#eK` +@f` v$eK`\")\"` N!index !`&]#aF`\"\\,fK`#I;eK`%'-`\"a{`\"G~`\"~G};})();(`&u)` E\"sY`'%1sZ`(\"+abel = document.titl` 5#rN = \"WebRotate360\"` 2#s = \"ga` '$z `#e\"` )\"hW` '$`$K$sY`$H'cD`!L)viewName, sZ`$W#` +$`,r# >`$\"&`!g$` ;$`$m#`\"1!sZ`$^&sZ =`\"A#`%5'var sb = \"GoogleAnalyticsObject\"`/N!ga = window[sb`-J\"typeof ga !== \"undefined\" && ga`!V/`\"~!ga`\"v'` m\";} else {` |'.parent.` <u` s*;}`+ !` <%`(>%`!*'_gaq`!',` ~$`${!`\" *` O'`!$*` AC` H#`0R'`%f)`(&!`%i)a` #!, valu`45$rJ`'R%`1!` E\"==`1_#sY.rU.sG) {` E!`10!`\"`&`%l\"`08!`\"c#`\"y#!`\"w%` +#[`#e#](\"send\", \"event\"`)R#rN, `!X$`'+&`!e#, rJ)`#*)`\"d#` x+hW`#7!.push([\"_track`\"c!` ^E]`4!(`\"Y! = {` $).ZOOM = \"Zoom\"` -)rQ = \"Playback` .*sP = \"ArrowNavigation` 5*FULLSCREE`+?!Fullscree` 7+sk = \"HotspotsOnOff`!7+C = \"ImageGrab` .+W` 4%Hover` m+G = \"ViewerLoaded` 1+c` 6&Rel` //te`!S'Popup`!1+R` 5'A`$&!\"`.W6bs`.a,`2)%s`-E6`'U#self `3!\";jQuery(\".wr360embed, ` \"'-cdl\").each`!:*var data =` k!.ed`&Y!)`-2!cF = \"` a!_\" +` D!.name + \"_playerid\"`(v!` 7!fsclick`(K'var hX = `![#` x!.attr(\"id\"`3a\"hX && hX`,Q*`!9!hX`-U%` L2, cF);}` =$var am`!&&\"<div id='\" + cF + \"' class='`\"4\"`\"\"\"'></div>\")`#E$`!\"#ppend(am`!e\"`\"B!background`!d*am.css(\"` 6&-color\",`#5\"` .&);}`15!r `,#$`'.!`3P!or.Create(cF);r.settings.configFileURL =` n\"xmlfile;r.license` 1+lic` 2*Code` 2'` u(graphicsPath` ;$` ,$` ;)`3%!`+u!Tracking` G$`-1!` @)responsiveBaseWid` r&basewidth` :2MinHeight` H$minh` ,!` D(`!-!`!?$Alias` G$name` m)oot`\"/(rootpa`!0*fullS`,1!OnC`'F\"` G\"`'T#` @(inBrowserF` L%`\"1%` 3\"f`\"])crossDomainC`$f!`+~!r`(-,hasClass(`)4\"`)u' ?`(r! :`2('`!*!onready`&`*var fn`3G%[` >(]` W!`48#fn === \"`*q$\") {`!l'apiReadyCallba`\"m!fn;}`3\"!` m#progress` |A` E$` xH` L$`!4,r.run`(O(();});`-q1ed`-y)hk`-1*`#}#hk).data(\"imager` q\"\"`-K\"defs = new`)o#jQ;`-K&`.f\".bv`\"q\"name, (new Date).getTime())` O\"`)T#` H,` 0#, \"`)k#.lic\"` J&` =/, \"` 9$`)h$` 6,` 0$, \"https://cdn.web`\">!e360.com/lib/`\"N(/` Q$` y$`*<\"` o,` 0\",`\"}!`*l0` V#`*I%` P,` 0%` \\#`+#/` \\#`*\\%` S,` 0%` R-`+@%` \\#`*Q$` R,` 0$` Y$`+)#`!s%`/6$`!k.` 2$`#~'`)##` <,` 0#` <)`'V$` :.` 2$` D'`3[%` >*` 0#`!t#`,V-`!|$`,0$`!r-` 1$` Z#`,i/);return`(L!`(m2bv`(v)param, ez) {`*A'` 2!`*I\"undefined\" ||` 3\"`+<$<=`+@!`!-#ez;}` $#` A!;};})();(`!$&) {`!M\"fH`!9)bV, aO, H) {`\"O!aB().constructor.call`.W\";`\"o\"V = bV` &#h` (!.bh` *\"dv = null` )\"gM ` \")S` \")iX =`+$#by.ge(` {#H = H` %\"eV` E)aO = aO` '\"hotspotInfo` 1!.bi` ((` ?\"sT = 0`$(%fH.aK(` &\"dh)` ,&`$=&iL`\"t)`\"p$`\"5!`-@#\"<div class='`!,#_rollover lightbox` (&\" +`&+\"`!_\"id + \"` 6%\" + \" `2*!` +$_` I%`#W!.oY + \"' id='` 2%iX` 0!/>\").appendTo`$D!.H)`0X\"`!,#F.src`10*`$4&`!0img_wrap'></div` o.dv`$D#gM.css(\"`*;&-`-[!\", \"url(`\"N(`!B! + \")\"` D6color\",` O\"`$c'.imgBkColor`\"2'` 5(lbxShowClose == true`\"A%S`\"33closelbox`\"(?S.fI(` _\".proxy`(t'`/]!`!&$lw` )#;}`\"#\"));}}`$&(`&|*.c`1e\"`$8% ||`%d(` ?(txt`$\\*var hn`$N7title`\"\"9var ao` L3usr_text` N0hn`#u3`\"$)!`,F\"ao` R#` 83).addClass(\"`(l$` 4!\");} else`#X#kr(hn, ao);ao.htm`,9\"`\"v-nA());}ao.find(\"a\")`$:Dib`$N0`*z0kr`+!)`!R#`/K#`\"7-ss`\"m$=`/5(`!`!attr(\"style`'l0css`$D\"kh = `(A.` 7!mB = \"text-align\";hn`(~!kh, a` `!(kh)`#4!` /$\"none\")` B$mB` A%mB))`-n(`\"L&jw`-O1iL(`)C6`3e!Activ`)N-dv`#qDm`$&/` [$`+F!curs`+<!\"pointer\");}` :$mousedown` s() {e.stopPropagation();}` o&` R!over` 1B`\"|2l`#%)cU`%X(dv.is(\":visible\")`\"v'`%Z$`#?4BackC`1!!`-$,`.+.siz`.u!c`12!`(m&`0?*wid`+Y!`0e\"` )\"()`,((F.height` ;&` *\"()` xAntain`*&,` 77auto\");}`$b\"eV = cU`$5%fadeIn(300,`,Z#`%q.`!O$jY(e`*')`$70cN`$>)aX, aq`$1:!= false` ?#aX =` (&` L$hide(`&/#iY(null`\"U+`\"'#Out(4`!k@i`!,}aq = aq !== undefined ? aq :`!K\"`#1#ispatchEvent(new `\"c\"` *\"` &\"aT` )\"s.mI,` W\",` ^\"`\"l!`#'3ib`#1)`(04e.pr`*%!Default(`,w\"link`1?&e.target)`-V#href\"`+\\\"` C\"`\"9)||` Z!`.3+`+.%`'\\/bh.gD(`)\"(` /$sm`\"^)sY.rU.rR);}var `!P\"`!N6` (\"\");window.open`!m!,` R%`$1+\"_self\" :` :#`0w4m`#!YpU =`)|%cv`\"^#V.bh`#O\"pU`+f/` @!cN(` 2!`$~2l`0!*`!>4` G?jY` Y-` Q!sT = Date.now(`&C4` K.`%\"%sT !`%K\"`$fTte,`!7' -`#C\"sT`0x$`!^!0`$A3iI`!M*J`/^=`+6$`$!\"`)u#}` '#` |\"by.fA` [$, eJ`\"b2['delete']`4@1dv.unbind`4P(gS`/A%S` 5&`3@%remov`,d%bV = null` (#h` '$};})();`,P') {`!s%mG`&p#hT `\"I#` *!jR `$,\";`(x#`(`\").on(\"beforeunload\",`\"!*`-h#each(lH.ew` 1+`2=&v`\"6$pR`.`$}`4W!`!#+resize`!r*` ]Eo`4\"-pS(`!!%` K%ra` IIloaded` j$qn` j$`!s#document).read`0J() {`#d!`#U!` j!ypeof lH`,)!\"`,&%\" || ` 4%.ew` 0,`*r'var ii = `0Y&bs;ii.cD(`#F$`!{6`4.\"y(`\"l!}`%G\"ko = \"ECAwQFBgcICQAB\"` 5!fp = \"\"`'[#jX`'91eY`)A!` &\"v` \"&fd` .&fM`)d\"` c#ImageRotator` g)cR` n$aB().constructor.call`$+!`(N\"cR !`'n\" && cR`1<$>`19&cR = \"#\" + cR`!B\"oY = cR;}lH.add` i#`+G\"ettings`#M)jQ`!y#m`\"!'J` \"&iR` \"&dO`\"]'i` \"&hA`)_)hl`)2%` +!r`,C!` &&n`#a!` &&cp` `'a` l'g` \"&qe`!0'u` R*eS` 1'`!X'ri`!)+`\",'kU` .*p`/b!` &&oS` \"*bU`,!*B` \")eE` 1)eP`#)'G`#5'A` \"&`)-\"` w*viewerBackgroundCol`%y!\"\"`!/#`#c!`$R%g`!(#nL` 9'configFileFullScreenUR` 6(fN` \"'gf` \"'rootPath` c(q`\"-)toolbar`!:)T` .\"`&>(dV`%3+eload`(/!Index = -1` /(Row` ),a`#m!ew Array` q#n` j*qY`+t$` *!R`$E+d`!o)jp`!~)jW`$#&jt`%w'L`(2*X`1D(`,'&N`#F#s`(L'X`% 'b`!M)f`'$+gC`&@+`+ !` &&av`#-0Callback`!{)ok` \")sm`![)sY` Z#K`!R&sI`(9'Z`!u'`,|'gb`'b*`#.*g`!&*n` ?*dC` ^&nB` \"&po` \"&canShowAuto`%y#`\"C*fl` B&ak` N&aV`!e'q` \"&o`+-'p`+E'O = 5`$r$o` (!`\":$y`\"C'Q`&N'bw = 3` ?$jN`)i'icenseFile`(l#` +#.lic`(J#` +#Code`([(`(N!`\"y%cZ`$U*`(@+f`3J%` )\"Q`,=+L` 2)eg`#p*N`$L*Y` \")q`!,*hB`(D+`-(+ey`')+T` A+M`)B+`/L+lB = `#Q#is`,(&O`)y,F = jQuery.proxy(`3(&event`2J$qE` )#;}, `+g'nV` :Cuj` K2gu = \"rdVd3lrjF/EFcxKccvguE5TGmYpDXz16dn3CLv2qNR7fcnEECgg7ebiZEA==`%$#oD = \"i8ujXOfyQKsb0ntiQLRJNqDYT9/9OTL6lvTpPB41YFAxMZ9Rt1pBp` [&hV = \"pEObvaqAslGmqYSI1iZngQ3MF/Ar3ZGxZ78TLJ1LZW4kqxU0` V#p`!=!ohtdbI/Ul1vCoSNkyoMEAlSUbVOqLNdSbs9XJPekPzilsNp6DFHMI/E`!:$gF = \"RamEB6nl1dIeNBEZm7QDsOVb3dGGYWkwNVHWuvJ94wp9G3vW5SHvOOlX44oxMBX7X1vxUANM+tmDqjoqh`\"9&j`#l!GlSkJBzsD5RcCjrwLEVCJ7mIFwJDyCqGGD5Nd` K&bc = \"I13W8RlKe6Yayl4GlxmUeikOpnYC2f+670yXu72y7idNN0j795CD7MjrbQHnCttCWNIRfqtetvfZdjtFHMv9B7N/svehVJIIBsyUikJiMwEb6x2IQ4F8Ue4S76ECejNSntsUyU13oKS5AbEC9I2fJPKiAN7Oq0L1wpWA/3ScM3QEsWCdWBJB6g/BFwhPLtUawmtmb254VB7usOdolJ7j/rE8Pto5WyJpPFwNzdADjNTMQYwO0ruTgFdxUcI7IPnU3UxU49p+VNyE+NNU8agNqu+ja5effa3g9YNRg8MFGXE4uzKOr/s`#9$ap`&4!muBtCy0JoqL8AqvfsdLp7NbUBIFSFSHA/hjzT60rFMcQZGaXjIvVG+PwebPexdTRRFhyH/8IrTen6fzgGtVnycjCxmpPvwvFrxqmS1BUPc38AiMjyJA+wcPoTqnhL1YZOfCkjvQOuafTER2Kuvy09Xw9ObUwJqTP3Bh7nxnMsu/O3tM12gTkg/MHR3c488+qMyNHGh52KogLg/RrlY8EFSlf35VhJrvqCG6PBfGaspU57NOPDpbzwVi2d06gG4rBxa3CA4FsOTfOwxsb+L2yYc54X43e8NT`#%$Y = \"gLXFo2OyFFajJLgDCn5XLL+N71QzGlT6B6SRJw9wR6kFt1YpKgjqYwA`'*%j = \"U9qFtDJ21PC9rzk1zcXKJ0aTTb0z7Ojb48ynUZ6BaTrthixUOunP6ZM`$N%Q = \"6WRVZbWJBZrmjJ4O+gNBk4awRfKJaHfVd0ucq/Be49pmSPS3hN04UyU` ]$cl = \"Lry6mt1Er3KgdvDjSqztJMzw8wHNLfeCLQIJ` I$B = \"2+lMNTNVifwdgdpXfSXjH+M4KoHd0xgNcw`)V%ay = \"QNwfbJZzxJbLJoAS6wD5rjfHAwo` A$eN = \"nULFbgdXOAsnDyopPfu7L0d0NtZ5uMg+A`*O&e`\"\\!4UVPbHd7uENiUDjx+NgOOXMkA9nZbGalFg` H%ft = \"cKxrnJWgw/pyjuCD7caPMhlgsXkfOeTBusEnY`!v&iO = \"sU1SxZ+bTWPPsst0n2G3qVvXmytz72GF/Dk7IouwuM`-d&Z = \"yEvByyFGwPn9PODQyazu6d22IbKQKoUYm0puGAnoKLbaWmrieWizccI4EOouWWN4lHyq/MPudc9xTPClmSInstXxtQ`0t&G = \"N3Oot1cePmbsji2oPcfULKAFPMinvbeLZH31LoT9L4dbkWM3k15lxRgcWBytwrfPAY8uvzhLrPrPJxiXLKQSbCPc5VhbU2SX4PS+RowzOvSKGUDOizkbK2CS9+kNrEkD+D8V3dwfmtLqMZz9oKincRhdEV6xfLOU0Qa3hoLEb2aGjBD8ExW52qnqFglW4iIRL8f6IOHe39qgrjG6KKYDb4lP4cppwXHZWbSlsIWK0TKoJUJZbW9ZX8wFbt5PR4BNwqPmmoaNQyMb+4K3E0V+wC3x9TB925PaBWjy/cvWaWn5Bp9RMg2VTzdzP8xeg4XtdtNmNmFwDdFekRDcwwSivzPck0EHtSXAG7yrrX4YavkjEChsn77hVPzAG6eE+6WCHTPLJljaSAhoy0iwonbNc9Voq3evmBW7Efgzi03UykTfEJZLc8MfrVJ6iafslafD4wYRxLpTXIO/oKsRnCvMfr4Q0PUWKLY65gZXVv/LAlMiglj0uWXUhE3hIx4QrnyUl6848eTaHxALUI+172sS2oMnIQxT7ofapXJS3MSD96JDHAbMjAJCyEvCBj/8msZfd5tiuAozgEb8AV7qU2/KMCyL+tqXbqkCz/x7P+sTFmLNlSgNn7SjLIMGji7gDxUR39wZOXACsl8Y0k+aYzJ8T/Ylk5AJf1wnNi6X86+JAPPimkAIXfEVXJ87yKG1jB9kFksfBxC7hnmzxcxrMcnXV62HBS9zCB+P7AwJhPFMHZNNwHPg16NWqmW4CIt2EmLDNFSf5+GE4WG6UxnI/IyJYLmKhP4`(A$pf = \"Xj/4NHvML4pcsq3MvkaM3AhqEAHI30bVi+sjPrV7r`(w'z = \"OGSH4lbDbOGbEEdbKPThRY4clOe0bgh/0he/hcDHFWw4S2VT9feiyo5zOHX7gO4Cng7ZCbU0Yh2jdHWGyv4tOdk` |%`+d!4IIhiEFPgpBJmPziEDdMl+hEws/AK+6ACB9P` J#hU = \"RTR7h9G0iybClgAKpw+bxhAq01JBVtZqngSiAZUOYoWI6uwhWDBCprBK04s5Rj3hWQsawztsRFeEjMbIdhi3F3eBa1cJyTIhceBXhmGusFzcb35LpoEM8C8aO12BlCO2bB5aPanQfOWPqPswgdFWENgt0Hjrxii/VzDH1+eP+o8c8VMb7LeypwEzz2+VrDHLFgy8NF5BQQMw92SpBkL6TMroAeCp7Pt4+7PVmIHjd/Tiq7o1DO0ZmvMpZc84owOAzesRD6AsLAhVAlcprJPlOSE8g9XIzypUqWYCWsSGlrvQMlrnzpVw43CFEYFABorIYlfRxJei/S2h2grnVZ52lkPSET5FiL/uuhTg8PCJmaamaVtXuucxmDviAUoDFS65uX2zTP48nowqHyz2C2+cYyJkUC3OobBZp9xthjYmE+1nqqrRh+s5qFDiS8Gr/7OXCIa1qaeFwmEIy55cp8GPFOVUzmEct6dZI4YfsWGxtlkTEQ+jjyj6HT5ve4XYMulkj7yQFb2+LzogCMbGw/BrJIExoVCcl6ijaHgJ2HTMMBou31YkMlp5iP6eUV7R7bfDAbHLFp88ufSaAT7xk5SRYqwcCZH+dVRn55SheAwoHBkfm7FaRUF5P5d5UgjlpqYnWZoF8Kzbr+oSaL5jIxki9LuqwnMs9OB0HNcu90AeWFjxeX5bHE+3/bfLY9cQo53VasMh8LjUV28TRv71rxW8Gw4TNFrUfhOumOpYdvHgXg4oFwTBviQ3uM2ckYurQwe7/Xysnj7o25tLjVeqNt+keCbXVJGG1OIcxvSHH3+9zhx4FPuAbs1s49XrZ50sVcQsUvAGuLhpRQNy2hnSUsBj8+Kgd2yEyJ+Lqe9XirHfTH5G2w3xjZpS3mu1j4Cs2W7Lg+mbI0ZuRatGlW1l09U2U/wP1wgCg3verVqXPYOF9YUoESlKFCjc5iBCuCprSNKlivQiBijmAfP+yr4wXpqjrjD5BH0CrDPhlRYY5oFtNbOA7bkmXM7PW0au4In40jVjFIWDeksZTe64iU2Lq4BbK68F+TsrBByt0y68h1ID2ZenZSNBOsWPd7ia2kGUngGb/SDS+5Dfr2VByazUw+ivcdscos3JsOrL7vbn9hxKxbhy9B8o1GeCa6LMPkH4XQz36iAUAxFVfUveqTxvAfG/Eas4Nq+FmuASkfqr2mo6G9+ASMKwm+6y6G38bCeY9w4Y1+QjBqp6B03Ht/GKJ9imf6dDx6vA0uoFA+i27vRHhUgBrfcRNqgoa7zp7ZtF1B5favRr6pb/5bKJK204AmLka0Qjo7FnSjla/Fr3+oz7Q3dlcT0goEoQRwVF6oEKNxtVlKWT4nJBlfxYH70dEdLd+17B6ln6EN7cFlJHWl7keAgypYbPXOEEzwRdp2OfvwaOKROZo1Wary62I2P19G+c0UXSqlXZow1BViQL3ucJCav6QCuaQYlovC9njtk/uLFJRgZk9XMS2pHDRjyrgKbu69rM+PLZl1U3HbB3Vod1/ND66IPHoaEnOlwPrSiIQEVhB7xvWg0IzzuFDtKGyg`1n%pi = \"mJgNlTEGtveYiNQvknk723yoaeTP8laCEZEoePk79YPL1hM3QFoUJ48sBi1xFeiKxJs36ZgRjNUN91RVSkZ2xsjzhFcmhGT8F8E993dIJrLP8S0rnSqH\";};WR360.ImageRotator.aK(` 0\"dh)` ,0Events = {` J1` 9\".IMAGE_ZOOM = \"` )!ROTATOR_API_` 5&\"` Q0km = 4;var oH = false` 50Create = function (cR) {if (!oH) {var nf = lH.get(0);if (cR != null && cR.length > 0) {nf.cR = \"#\" + cR;nf.oY = cR;}`!M!true;return nf;}` #$ew `!U.(cR)`#W2kR`!o)`!s#fp`!A*` v#fp;}fp = kP + ko + kZ`!=$fp` l2prototype.bm` x0!jR || `&g!bM =`\"5\"`!,%;}`#<!s =`\"%/.kR()`$A!bQ = ac.fk.bL(ns)`'W\"gu` 1\"G.aD(` +#, bQ` 8#oD` /,oD` 4'hV` /,hV` 4'p` M-p` R(gF`!+-F` 4'j`!J-j`!O(bc` /,bc` 4'ap` /,ap` 3(Y` .-Y` q(j` l-j` R(`#F#` S'Q`\"k(q`\"f-U` 4'cl` /,cl` 3(B` .-B`!0(y`!+-y` 4'eN` /,eN` 3(`!i-e`!n(ft` /,ft` 4'iO` /,iO`$e(Z`$`-Z`&!(G`%|-G`%b(f`%]-f` R(z` M-z` 3(`!J-o`!O(`/@!` o*i`%$(M`+*$`)D;rh`)S,ra(`+$3nn` ?)align, defaultVal`* !if` 3# =`-(\"`+D&` >(;}` @%.toLocaleLowerCase() == \"left\"` U&-1` 1@righ` J(1`-a%`!1*`\"X;eload`/X*onfigFileURL, rootPath, hZ, ` J\"` h!Index` *$Row` +!) {`$3!uu(`$;#kI(`0!` (#ri`$I$`0G!`! (`0J!` %(`.}*` Z!settings.` L*=` K*;}` ?*`!|$ =`\"&%`*J#B`2Z%`)k\"o`!o$cJ` \"$ff` \"$hD` \"$mU(`2G\"`,y\"N) {clearTimeout` .%`$c\"`'$\"V.pJ` @$Interval` /(` =+h` _1` 4\"`\"9#loade`$X!`!x&eP = 0` &\"dC ` \"&b`#p$`\"/\"N =`1T\"`#<2`*q#f` 5-`#2*fX` x&bA =`4;'gl` 0#V` *)bN`%A#`%r!Callback `(]\"`!d#V`!^)`&C, = typeof`&\\- !== \"undefined\" ?` 1.: -1` l(`'1$` f,` /%` \\4` 8%` m!`$V!` Z\"hZ` C-&&` 0\"`+ $`\"L2hZ`$q#gN(` D!`)^;['delete']`,k,`&J~`&`hjQuery`3I$).remove`!W$bp` '&` l%eE`\">$eE`%t$`!'(` 6$`&W\"` 0*toolbar` ;$` (#` 6.cq`#A%q` q/B` {%B` +/U` 5%U` ,.eg`!u%g.ub`\"B$eg` B%`-u+qF`(4)n`\"-%lH`\"u$this`\"{\"lH.get(0`0B!`&J#_i`%w'` }%`/};i`3%*db`!n$`+G!db`$%&bY`\"F%Y.fi(!` @#)` c=lz`',,` k&A.ly()`$a&.mo(` P>iV` GGlO` O?run` .(`2*R` u(cR`#l$ ||`-s\"cR`1~$==`2\"!`2R!` ;)` 2-throw`-o!Error(\"Player ID parameter is empty.\"`0'$cR = \"#\" + cR`%d\"oY = cR`&Q'`/@%fullScreenOnClick =`.P\" &&`!u\"pH === `,_%`#/%m();var bn`08#;`)v)R).click(`\"}&e) {e.preventDefault();bn.rg();});return`4Q$`\" &` +!aR(\"wr360UpButton\", ` \"+`(C#sj` C3Down` M+` ('` W#gU` G3Left` O+` ('`.+$d` G3Righ` O,` ((` Y#jA` I3Zoom` P+` ('` V$D` G3Play` O+` ('` W#kp` G3Hotspots` S+` (+` _#pQ` O3F`&D%` Y+` (-`\"&$a` S3ThemePanel_` \\%` ((` Y#ie` H4oolBar` R&` )#` Q#n`!j4` z&Back`!(/` 2!`#F$W`#t4rogress`!6(` ((`4?$`'.4` D$Num` O-Num\")`)9-addClass` Z#_p`+F!`! %m = ` C,innerWidth`18$fJ` /4Height` @$iR`*j#.fJ` ,\"viewerBackgroundCol`-}!`+ -ss(\"b` 9*`)M%f` n$`,T%rootPath`!X#N` 0-configFileURL` `#N(`2i!`-S#r `-)\";`/_;gN`/d)hQ`/=#!hQ || hQ.success == false`-_%S` {$`'M\"y`0i?aR`!!)stringToChange, oA) {`-e\" ` .*.replace(oA, oA + \"_`%w%oY)`\"'<oQ`2~5qX`!,%`.y#ap`#i$aR` >\"ap,`2I#l`!A%\"#\", \"\")`#k#aY` D-Y` M$B` =4bj` E,bj` N#eN` q5Q` y-Q` M$Q` =4hq` E,hq`({$contain`(N&` 18image` %@toolhead` QB`!p!` %A`1G/` 37`16/` 38`3a,` 08`3O.` 28`2!.` 28`1q.` 28`1Y2` 68`1A4` 88`15/` 29`1-*` TB`0{(`\"c9`0d.` +@`0_\"`*##` ?,cl` G$_menu` @%B` 8-B`)x=e`/+%` M$eN`)x=e`*(-e`)w>ft` E,ft`(_2p`0/!` <\"`2*#O` L,iO`)e6p`1`%` F$pf`+*5qX`0zCjy`.f0hT`1'% && document.readyState === \"complete\") {hT`!*%`/T%bS` ^&|| ` k(||`\"'\"hB =` R\"`/x,sm.cD` b\"`3q%eventTrackingAlias`$;#` 9%googleE` <(`\"m#rK = Date.now(`'/$`&:!`3>%bm` 1$oQ` \"$lk` \"$pS` \"$kO(`2>3ov`#A,`3K#ac` :3Z` :3` 9/kR` 4`$h&hj`$^0!`'B\"k()` w&`\"p\"ootPath;}` *(`#F%disableRelativeAssets ? \"\" :` Q,`!::lk`!H,var playerElm = jQuery`*>#R);`%~%dV`%o%) {` J%.append`+f$`$4#bp` \\+pf` 3#gk` ++ja` 3#nb` ++nQ)`&_#qV`%,$bp.css({width:`!<&innerWidth(), height` /,H` 1!()}`\"+'qr) {` ##()`(K'qU` 0%U(`!@$toolbar.cD`!G%d`!k&\"#`*c!image_\" +`$5\"oY` C$V.iF` x!`(H#bd`\"k%.hide`&2!` f\".ajaxSetup({error:`$K&XMLHttpRequest, fr, ec) {`%4\"bZ.gA(fr)`%C#` *\"ec` \"*` W*.responseText);}}` E$`%p3im`%w,`-N\"L();var aW`.>%N.length != 0`#s!aW`(\")mY`(*!`!Q(\"Could not parse XML config path.\");`,>$`$3\"fs = 0`#H\"dn `'!#`'2'N`!\\$dN.as(`'A\"`&6$Y`+r)R` R)`!_\"av &&`\",\"pL`!x#`!3\"`.)!tru`.!this != lH.get(0`*>&;}`&1&` b'fT` j*` E$`&]&S`+\"'` 2\"`#;!`-;\"i();} else`\"6$q();}`*F;kO`,)0`.A\"icenseCode`$P$> 0`!($`*?$` ;'`#&var bu`%1#`%A!options = {type:\"GET\", url:` [(FileURL, dataT` D!text\", mime` '&/plain\", cache:true, success`(4'gi) {bu.nd(gi);}, `(Q,e` ;\"lW(e`#(!`%\"!`&Y#y.qT(`!r#)) {`)D'` .%`#@=md`(*1ok = new ` R!`2;#k.src`(F$gZ`/!<n` m*`\"H!`%U4`.9\"K`\"b!` '!im(`-5\"`'O\"dV && ` &\"gz`)8*o`%$#gu + \" ~ `,g%`1M%version`\"M>lW`!g)e`!S<dQ`.6$`!l!` ~R`!5:e`2W-`3m(`*/\"`*^\"` J;gz` L9Q`*v$` G=D` L8ek()`+_%||`+)$`!=EqS`*95`+l'` d$var l`*\"$.jh(document.location.hostname`/i\"qt` B'` #!hV` 4\"pP` *,pD`&]\"lu.indexOf(qt`\"8!-1 && ` -'pP` 1#`\"c'`#F!`!a*`(2;l`!]zp`\"G0`\"1,p`!x-`!)#`\"*)`!k:jh`(X*A) {var gr`2V!if (eA.substr(0, 10`!0!\"http://www\") {` I!11`0N$` E-7` H)` I%7` 858` G&s` F(8` 9511` E*`!M)2` >54` P\"www.` F%4`$L\"gG = eA`#g%\"/\", gr`$\"\"gG`#s%` @$`24\"` V\"pa` .\"`!#\"ing(gr, gG`21$ pa`#z<a`*S-`&:%ci`,t'`% #`%sMkH`&4,cZ`&<$ != kH`!&)Z`\"^&.\"`&O&` 5(`\"[\" >= 4`)%+` w$ !`)%0`)++`$D\"` 4+`\"n:dQ`2f1f` 2!` q!`.Y%`'pBK`2b*W`\"C#gW == null || gW`\"K$== 0`!-$`1#!`12$var mW = ` |/kR();try`)+\"hy = getBrowserId(gW, mW);} catch (kV` o1if (hy`!M(hy`!4AfW = hy.split(\"^^\"`%:\"f`\"/%< 3` I1`$j\"r = fW[0]` Q!` -#` y=`%E#` V\"2` P(`%y%`!Y9hF` U\"1` U\"hF` N$!= 12` }2`#]$an`'l$cr +` ##Z`(*!aa`-,!for (var i` *! i < an`*4$ i++) {aa += an.charCodeAt(i)`!Y\"bD = hF`+V)` {\"e = parseInt(bD, 16`#j\"aa != ae`\":5kS` g)6, 1`)}#J = Number(kS)`'_#Q =` 5!= 1`%XA` 1!gz() &&`\"n\"az(`*>!`(W!`$L6`(k!`2kAm`,\\-jQuery`!6\"iO).show()` H<hD`-<5o`#A!0) {clearInterval` 5$`\"v#o`%!\"`\"N&pp` <7pp` P#pp` Q\"`!@;o`\"l!`\"/4ft).remove(`$C$t`&h$pr + Date.n`\"c!` L(oz.pg` [$.replace(\"#\", \"\"),` [\"oG` \"#hV` *$D)).appendTo` Y\"bp).css({}`#I=nI`#V0!`!L(cl).is(\":visible\")`\"B+cl`\"A,aL`\"-+cl).unbind`\"E#O` C#bp.un` \"2` *(,`!Y'event) {ow` $#;}` {.` 0I`*,!`+,$`!`4\"mous`\"A!\"`\"#5` >\"out` 0/` U,`!B0bn.g`1s&` G9out` F9`)i#)`',=mY`%2,var configFileURL`'6$fN`,d!`1;!!=` 5+&&` #*`/($>`)1!var el ` F+.lastIndexOf(\"/`1R#-1 == el) {` 3<\\\\\")`*@\"-1 !` N#var path`!o$gf`!j)` 6!&&` #!`!Z' &&`+%#ek`-Q\"true || !`)u\"L)`-[$rootP` {\"path;} else` +.`!k*`0A&el + 1)`.8#nL` 34` @$` B!jF` 7,`.#`%g#` g\"` A!`!:*`2Z#n` A+`%8:ki`%B0hI` v$jF`#O!` '!settings.crossDomainC`!d!Loader`#D$) {` W&pi + encodeURIComponent` l\"jF`3_$u`)N$var options = {type:\"GET\", url:hI, dataT` 3!xml\", cache:true, success:`\")&di) {bu.mO(di);}, error` 7'jk, fr, ec` C#H` '(;}}`\"^!!`#B\"by.qT(`![#`-X&.ajax` .%`),=dq`#g,`*V\"q = new ` W\"lE`/a#A`/~\"`%[#eP`#U$bA`$+&bg.fE`$C&bA.aw`'h+` /&[0].cS != null`!7$bV.lc`,.%` b%av`$o'`,>)R`19#'background-color':`!N.I.fullScreenBackColor})`(h*bp` T:viewerB` 4%` \\%`\"M(`!((customCursorClass`,B*`!-$add` 9!` >B`*+$eE`$C)cL` Z!`$?$E.addEventListener(` A#O.COMPLETE, `%y#prox`#P#lZ`%(#` E@ERROR` Q1K` U-Loa`3&#hj()` 9\".bA)`*e<lZ`'!)e`*#image = e.` %!`&W!` -#`&/%`,%\"`#(#jV`.R#E` L\"`!S#bV.hs` T\".src`4B\"eG`*f(fg`'`/;`!J%finalize() {if (fg.control.pauseOnPreload && !eG.av` \"$`$%`&s&OnClick` :$dV) {eG.gC`(3$eG.cq.hide(`2$\"fg.bI`&u#Hint`&6*eG.bp.find(\".spinner_hint_item\").html` S-`(t#opacity:1}`-d#jM = \"mousedown touchstart\"`!D$`\"T$resume`\"T#OnHover) {jM += \" ` _!move\";}`!K5\").fadeIn(500,`,F*`*a').on(jM` 5(e) {e.preventDefault();e.stopPropagation();` \\)fadeOut` o=ff().r`!|!();eG.oB();}` &!`$G!fals`$E$show` 8\"})`2y#`\"P!` N\"`+4%dV =` R#`*t%d`\"G6`&N&` k(` O$`!-#` 9(`(j:oB`(w-` f\"B`+Z)dc`/]&ek()`!a.B.hu =` H#`! )km`!X$B`+=4dK.PROGRESS`+D0nN`+J*` L9`,%5pq` ;G`-Q8n`-^+bB.Init`,r1` #\"U`#?*P`2#%` 8$`.55f`\"\\9mP`!;+` M8`/c9` =H`#I5ml` U-`\"d1`-8%graphicsPath`#,%` \"#`-j\"`2k-`+a$qc` 5&V.lc`!,#fX +`//$U.aw`-P#` +.B.bF` 0)bB.kD(`!p&kE`(<>lK`(M-` J\"bZ.gA(e.errorMess`16!` O;mH` a)jk, fr, ec` h+\"Could not `0|!configur`,v! file '\" +`\"C\"fN + \"': \" + fr + \",` '!ec.toString()`!:>O`!O)di`4*#V`2{&`*}!`!a#y.pA() && document.ad.msie) {di =`%u%arseXML(di`1&#ip` 5%(di)`0:#`%8$\"`2X\"ip && ip`2N$==`2R!`\"y)`'\"!: Cannot re`#!% se`\"!\"'` n$'.\"`.\"&`!+-p`2(\"er\").each(`.d)V`&r&eH.image`!w&`0R\"attr(\"` 6!\"`/2!` r-userInterface` g<bI.hb`.C%by.bX(` }/showArrows\"), ` P,);` $*gj` LBTogglePlayButton` j.gj` k-w` VBZoom` p\"`!`/gw` g,iT` QBFullScreen`![4iT` l,bY` VBHotspots` b4bY`!e-U`#ADolTip`\"W/iU`!]-z` NBProgressNumber` h/bz`$K-x` r%`*n)nn` q0toolbarAlig`%F0x` n,` I#Posi`'e!`!{'dM` f7` I$` r.` 2+`!~-H` x(cz` i7BackColor`!v/H`$e-C` l(je`\"`9pha`$c/C`![-X` KEBack` a3gX` h,f`(&&`\";$`\"S>` B/` z.` 2/`!-,`)C*T`!y\"`)XL` P#`!/.` 21`!3,customCursorClass`\"<>` B-`!).` 2-`!',viewerHint` n>` B&` w.` 2&`(W3Autohide`#4>` B+`(U5` 9$`1g2control`1W<` @#.gp`'5>dragSpeed`!D+` Z&`\"O)` /$dJ`\"2>disableMouseC`!r$` p1dJ` p1inBrowser`&?&` t>` B/` 3` 7/`\"62oubleClickFulls`!\"C` B1`\"I4` 80`\"^2u` mIZoom`(S,` a&` m1qc`3jCighresOn`#H=qc` t1mouseHoverDrag` s>` B*` u3` 7*`!#1hideHotspotsOnLoad` z>` B.`!)3` 7.`!!?Zoom` tLZoom` AZoom`!/1rowSensitivity`!4(dM`!,0` B*`!%3` 7*`(Z2rag` lI` B+`(L4` 8*`!&1zoomStep`1<)` 2` B%` x3` 7%` o6pee`&.)` n7`.G7` 7%` t1sing`*@(`)Y?` C+`! 3` 7,`!)1pauseOnPrel`(BA` B*`!#3` 7*`'%2esume` ;#On`*K!` |>` B0`'/4` 8/`,K6Wheel`,:G` G%`,I8` <%` u?ZoomOnl`(_)` |@` P$`!#A` E$);});` t#di).find(\"rotation\").each(function () {` q'bg.fE`!\\(cz`!T0firstImage`!M+` [!`\"f)bg.`!8!e` T>` B\"` `.` 2\"` f,kC`-1@tateDire`\"I!` i.kC` g,o`3T)`\"H3orc` Z8o`3E*bg.g`&P)`!Q8Perio`)-,` ]!` d,bounc`#J)`%2` B\"` `.` 2\"` `2Row`,*?` B&` f4Row`,.*bg.useInertia` `>` B&` p.` 2&` r,i` 1\"RelToDrag`/[-` w2` B1`!&.` 21`!,3TimeToStop`$~>` B-`!\"5` 9&`! 3MaxInterval` oE` I'`! 5` 9'`!*,flipHorizontalInput`#P>` B/`+>/` 3.`!)0Vertic` nI` F)`!#2` 6)`,g.wsOnS`4'!Index`2#?` C,`,{0` 4+`\":0Axi`)>?` B$`\"&2Axis`0J!var hH = `0G-hotspots\");if (hH && hH.length > 0) {var kw = 0;hH`0m/`!L)` k)`1:1var bi = new`\":#kc;bi.id`!Y&`'4)d\");bi.renderMod`-H)`.63` C%\"), ` P)` g!indicator`2A!`/q>` B*` m#` '*` s!disabl`+j@` B$` e#` '$` a!wra`+D)` L2wra`+?!` J#` U!activateOnClick` C>` B+` i#` '+`\"5\"e` LM` B-`\"E$` (,` |!effect`'j)`#w2` B#` f#` '#` ^!offset.parse` F0` :\"X\"),`&50` 8\"Y\")` g!margin` R6` :\"` F#alig` 17` :!\")`)E\"dI`#t?bsolutePosition\"), false`)c\"dI == true) {`(%2kc.bf.au;}`)M/spotinfo`)L1bi.`)y#Info`)\\)H` .&;` 9*.src`$8>src`$O#` L+`#@!` ((ur`2.)` Y2ur`2'!` I.` [0Targe`0M)` \\5` E\"` e2` 6\"` p-tx` X?tx` a0tx` Z1Width`,h>` B$` c2` 6!` j0Color`!MA` E!` h2` 6!` j0Bk` VF` E#` l2` 6#` s-fntHeigh`#h)`\"k2` B%` o/` 3%` p-img`#ZC` B$` l/` 3$` j0`\"ZE` B&` l2`\"k4cs`-h?cs`-$` L+`!_0NoScal`3!)`,H2` B&`!]2` 6#` s-lbxShowClos` c?` B(` u/` 3(` v0BackCove`#v)` q5` E%` t2` 6%` v0`2>!Activ`!pB` E'` x2` 6'`%%.` 4$on`&z>` B'`%30` 4&` q2Data`&!?` C$` k4Data` g6Param`!dC` G%` o8` <!);`2d/cd`!a!`2S=.` D!`\">8text(`!1/d`\"F!});}`4c\"bi.disabled == false) {V.bF[kw] = bi;V.hi[bi.id` *#kw++;}` `\"} else {return;}var fV = `!I#di`\"6$images\"`!3\"fV && fV.length > 0) {var bW = 0;fV`\"T/V.aw.ep`#l>highres`-P%` R#);` #\"U` 9E`/1&` S#` \\#row`,r)` O2row`,{!` J%`%\"1`\"t!`%\"1var dp = new`!%#lv;dp.src`#Y&`!&(src\");dp.label`'{>` B!\"), ` K$` X!delay`!}>` B!` V#` '!);var hO`$]!`\"7/`&e#`\"35al`\">*q;al.sourc`,M)`!u2` B\"\"), ` L%);al.offsetX`!m>` B#` [#` '#` X'Y` ;DY` V)Y`#N!bF[hO] = al;dp.hi[`!]%` /#hO++;}`%M1`&f#`##1dp.cS`#*)kB;` 0!`%_#`\"w<rc`$\\#` L\"`*1!V.aw[bW] = dp;V.ky[`&P\"` +#bW`!f\"`*V'`! #Z.gA(\"ERROR: Cannot read config se`!u\"'`*i\"'.\");`+4$this.dq();};` i\"ImageRotator.prototype.mP = `\"\\&e) {` V\"S` :>nN` \"Vl` |8` %!jb(e`!!>Z` \"aml` V-`#y(e.errorMessag` L>pq` \"hdS` a)`\":$fs++`*!kt = Math.round`&m!.fs / ` $\"X * 100`\"h#cq.il(kt`0V\"` .!settings.progressCallback != null`!+$` 05` b\"av, kt);}`!r;jb`\"n-`!C%qS())`2Y&` /%fs <`\"($` 5'try`!U#`\"2\"99`%.$V` R\"bU.aw[` &!eP].F` 8#bV.cD` :$,` s\"bB,` \"#A` \"#dG` +#d` *$a` D%p`#6'dV == true &&` :\"reload`\"\\!Index >=`42!` K%` ;\"Row` 2)`!U$kl =` ](` @$`*2#bV.dE` \\(` &`+=%`$m.fullScreenOnClick`!m%|| typeof`!.\"qz === \"undefined\" || !` 5#`$<!var jq`!]$bU.lU`#h%start`!j$`2\"\"eP = parseInt` B#A`!P&bg.fE`#K\"eP > jq.length - 1) {` Z!eP %` 0&`\"])eP)` )#cq.destroy`*X$lo(`$:-fals`+\"%bd.fadeIn(600, `/R\".proxy`01*` I!ke();}`%@\")`/)&` b$show`!2$` E\"`(2q`*+!` h/apiReady` k,`&o%dV !`%/\"` }-` L,(`2]&API`2C\"`'$v` \"#` T%eventTrackingAlias`!T(`((5`\"K4` 0*`#I$` E+` M\"` |'rK !`(x+gD()`!4$`\"I%m.Eve`&`$dV ?`\"@#sY.rU.sc :` #*G, Date.now() -`!z#K`&L$rK = 0`3l$V `&9#;} catch (ex`/s+\"Exception: \" + ex.m`0%%`-_;fK`/z1bV.en `\"C\"`,{%`*}$bV.aF`0h=ci` j,if (location.href.indexOf(\"https://\"`#Z!-1 && ` 07` >(||` 24localhost\") !` -;127.0.0` B$`0,%`\"\\\"}` &#`$##`\";:lo`#>1dG`,u'`0Y).width`#a\"dA` -5height`+$aded`$4)kY`'Q$nx` \"$toolbar.m`1x$`13#`,X'qa`!Y$qa(`&\\$nt` Z$pS`-$(ek`'z\"`\"c!`)4%ci` +'`/G#lM`\"!#;setTimeout`-2*lM.md`-8\"20`+|!`#9;g`&}*bi`!$#ax = bi.id`!d!ax`*T'` 7!ax.replace(/ /g, \"_\"`+I#bi.renderMode ==`)c#kc.bf.au`%=&\"wr360StaticSpot_\" + ax + \"` &!`\"d!oY`/9%` J)Dynam` 9;`\">;mU`)P4qG(`)+=nt` N,var b`*=!his`#3!bn`1z1p.bind(\"select`4(!\",` a'`/&!) {bn.na` '#;}`%w#` U%mousemove` D4onMouseMove` G:down` F;Down` G:up` D;Up` C:lea`!k=Lea`\" )`(]%bA`2@&control.` q!WheelDrag`#m-wheel` q;` Y!`!%'`*%\"bd` \\#dblclick` N4lJ` (\"`*z$`\"P%` Y$touchend` I4mr` H5on(\"drag`%e6` #!.pr` #!Default(`#l.`(I\"O` N0ow`\"Q'jQuery` I\"cl)` /J`#m*`\"R!`'[9mk` ?:`'\\8nm` >:`#T8L` =:canc`%f+` R#`)\\(`\"u1`'_\"over`!%4gT`15$` E;u`\"~5` ^!`3K#`.g$n`0u*) {`(M%nl` 3\"true) {`!((ft).r`+Z!()`.Z$` h#oa == 0`(B#a = setInterval`1C*bn.oT`1C*` ^#pp` Z'pp` F;nI` _\"5`1qAnx`.HO`\"Q(sR`#j#{`-W%:`!C,tj`!M\"`-6#` /-rq` 5'out` /.M();}`$|+sj` x>sQ` |:so` {;sC`!'/gU` x>np` |:nr` {;lY`!'/hd` w?v` |:m`&?#`!!5mK`!'/jA` ~8`*l(t`*6%` T+kp` [$`0%!` H3f` G4pQ` ?<`'&#rc`%o#c` a&`,<$dN = new `(0\"ej`\"6$.replace(\"#\", \"\"), \"zoomin_button\"` *#out` *$`-0$Y` g)cP`\"G$` `0hotspotso` l(` ,%ff` m+qZ` g1pQ` h0fullscreen` q)` ,'` o-eg` s)fb`\"i#D` l0`4Y$this, \"play` }&bn.mR, \"pause` )*p`,)!`!)%.cD(` &#gk.`&&%`,_'`1V(j`0w,` L$`.L!` >2D` <4lea` =4o` }(}` Q!ih(!`$|\"A.settings.control.hideH`$Q#OnLoad);`..;pS`.=,`0v%pW`1!(pW()` $(bV) {` ##.eh` -$.aF,`.n#;}return;}`!u\"kI(` 2#`1]\"m = `2{)R).innerWidth()`/d!`.1\"`\"A$responsiveBase` C!`1@$` n\"J` \\4Height`$|$bp.css({width:`!H#, h` @!` )#J`$A$lB = 1`3>$`1H!ratio`1I#.iR /` $\"`!L8`\"N#J` N$fm *` b\"`\">&fJ <` Q5Min`!\"`\"@)` -=`%q#`\"*D`#-,` P!` %=parent(` 74`#=&`\"S$`\"m@}`&A' != null`\"T$gs`%T(bV.H` 2,`&d.`(R\"av`%<$V`!H'lB;}}`(,;gs`(;,var cW` \\$bp`'1*var dk` .,`&`%var jU = dk / cW` ,!ks` H$dA`\"}$dG` 6!fB = 0, cw` \"\"fa` *\"fF = 0` >!hE =`)7\"`\"r&dG < cW &&` o%< dk) {` l!` z$` q!` :#;` v!(cW -` 8$) / 2;`!&!(dk` /%A` 2\"`!3!true`(<%if (jU >= ks`!#$cW`! \"cW`\"0& *`!'*0` x(cw` y\"` m$` Y!dk;` i!`#1!`\"*$` ^$G`!o(fB`!k'0`+~$`(\"#\"text-alig`1K!left`33%d` <\"margin-` 6!, fa` )2top\", fF` /+`)#!\", fB` *+`(7\"\", cw` 3#aU['_viewPort.x']`$`!` (0y` 6\"F` (0`!,!` :\"B` ,0`!2\"` <!cw`(P'A.iq`/U!`(-$dZ`'*%A.aw.ep`#a$` |1;}`&U!ighResLoaded` X$av`&M%`1Z0qc` 5&V.lc`!P!!` \\*` 4)) {`'W'`*z!hE`!q%p.addClass(\"container_zoomoff\")`%}%` F$r`4I!` 58`*Q;isZoomOff`*g,`2Q\"`*N%has` j8`*R\"P = \"AQIDBAUGBwgJAA\"`!!:aP`4A5dV =`# #`\"s(ppend` <\"ap`/6+l)` 2*Y` 1+B` 2*bj` \":aQ`\"~>aL`-|0eZ = \"\"`\"q!gn`&#$gu`'N\"mz`4[$aP`/v(ek`'?!` '%cr`0($`%z%cr.length > 0` E#`0-\"gz` X!`!5!` ,!ju +` M$`%o%` 5&cr + \" &copy;\";}}` ;$`!e'F`&z\"eZ`!-$!=`!1!var ij`\"=\"`!d&Z`!\\.` P%`!d&`!d%` :(indexOf(\".\") == -1`\"[)i`\"6!`$?(eN).html`$b#c.pg(\"\", eZ)`$f*eQ).hide();`'L\";}`!u!document.location.hostnam`/t'j`##%Z;}}` <ij`!8#` X$` @-`!A\"`#N!`$G)`!_-` k+` &!hV, gn` g4`\"<&`&q<jV`'$)imag`(w%dG = ` -!`-S\"`&\"dA` -%`.Z\"` 1\"pS();` n;ng`(*0`4J&`.W2if (fB >`4N&`,&$1;}`,,(dG / fB`!&<mJ`+L5`0D#`'Q\"` o(ng(`#a&`-?)V.dZ`#E=kY` y6U.sM() > 0`0e1bg.gg`(J#`$w\"o`2!'` 8+`2.#` l$* 1000`$:\"O` N$eo`2})`1r-gp`!\"(O *` {/` B&;}`\"<<mR`\"O)`&5%gJ`-!(gD(`*F!tru` 9%sm.Event(` z\"sY.rU.r`.C?mp` }2cJ`&a?r` E3o` :>l`$y*e`$|(pY`1o-` m\"`!0<`!u3bV.eT`0Q$`\"4!` j&`'-\"X `!)#` *\"rI` \"*hl `#i\"`1R!bu`%Y#`1C#k = setTimeout(`'/)bu.jz();},`%S#w`$5PsP`\";>rq`#SVrM`#;ntj`#t5sx`#\\C`#n!`#x&` 9\"`#!~`#KTmt`#21`1l\"isZoomOff`1t!` .!jL(`\".!, e` Z?K`'^ov`$+5f`$1%`'xU`#M~`#p[T`'xVso`(TVsC`#xnsQ`$Q5ta`$I3`(t&`#]~`#kpf`#-6R) {return;}` ,%db`!,,l`!e! else` +#iV()` H'`!GFk`(k?`-@.e.stopPropagation();e.preventDefault`$L$dispatch`!7\"new `!(\"`!A(` '!s.hG,`$Y\",`&$#`4I>D`%j2kU`%a$` B;o`/X3` \\!`&%\"`!#<a`\"l/`\"Z-`\"~0`!;<nMouseWhee`'S!`%]2av`)1% &&`'6#A.settings.control.m` c%Drag`/O!nly`%]$` R%dn`)}(`&d$`$dH`.S!if (e.original`$z!.deltaY > 0`*;'eT`';,`/=$`&W<`\"x#Down`&HT`!`\"butto`\"R!mg`2;&pm(e`*X'`#?0dJ`\"x'`%p\"x(e`\"&%` m-D` y!`3V!`\"4\"by.fU`!)$nP` W!`\"7<jB`\"=-var cC =`(r#by.fS(e)`-?!uS`-=#.uh`)I%O = uS`%Z1bg.flipHorizontalInput ? - cC.x :` \"!` b\"ei` G=Vertic` W+y` `\"y`/.#A = cC`#U2` `#Axis`\"B#temp`\"+$dO`\"&'`!L#`!P'temp`%f=kx`*K2f`0X!`1!&` l!` &%`'`!`.1\"q` \"$e` D*sI = Date.now` <$po`!b$sI`\"M!!`'*! = window.`&}!;}`#q~`#q~`$m\"` O:`$=X` +!jW` :$bV.aG.css(\"margin-left\").bE`\"~$jt` 36top` ?)nB` A'ob`/*!var kZ = \"AgMEBQYHCAkAAQI=\"`&':su`&8)`/4(eu`.S-sI !=`-a!` =%gD()` @$`&z$sm`37)sY.rU.rC,`&J' -` j$);}`#+\"`&r!0`0|<sq`!R;`1#*rZ`!7WW`!^0rZ`!i%rZ`!N@`0(#Up`*!*, nF`!K(`/\"Bsu`07#` ;5singleClickZooms && !` I!is`3X!ff()` 0!`!7%`\"3.po < 200`#?%nB`#.!`&K'`!p(fu` l!jQuery(e.target).closest(\".theme_panel\")[0]`1'$` Z\"dO == `!$&ei` +!`2J%jL(`$I!`2w0}}`$'#`-S!`%9!`-+'` %'ff`(F!`$(@Leave`.M-`#wP`.[+`! `lJ`%y,`#h# {e.stopPropagation(`\"~1`!_F` ,:oub`&C#Fullscreen`$K$rc(e);` \\(`&_\"` U0iu ||`%4\"`&y'`#@,`%>#, `\"H&`$HCMo`$R8qS` )`\"OJ`2?ccp`2@bha`2$~`2c?cp`\",'`!R#`!V'`2{'hg += Math.abs`#s\"cp`+$dO`\"y#qe` 5.ha` ?$ei`'I'`/o3`+K!`&t$Z =`/O'`%)'` I0`%40mouseHoverDrag` K%` y$dO`\"Z,ei`\"_'`&:-` ]V`1~#` a%pY`4L%`(k$dn` \"-kU`2Q,`!KC`!n!uS` N$kF();} else` +#`,\\!`*D&R` B$nq(e`/'!`)S:qO`)[)marginLeft, ` &\"Top`\"H#` 2& <`%@#L.eY) {` /'`!{#` 5!`!a$` N+>` :%fd` E4fd`$G\"`!;%`!'(v` M%To`'g%` 4!`! .Top`!%(M` D3fM;}`#m\"`!E(:`\"Z1` /#Top}`-/<nq`-5-var pK`!3$qO`& \"jW +`&*#`)@),` $\"jt` 6%`)8)`)f#bV.aG.css(\"`!V\"-left\", pK.`!y&` 45top` @(Top` A&fP`2^>mk`3z\\eS`*r*` /\"`(9%hg` ,\"kx(e);`3`0`!B<r`4I5`!@Fvar now`!\\*if (now`$,$fY < 30`-0%lJ`!\"'`!\"`2|#Up` 5!ru`4J'` [$= now`!s=L`#6\\`!?'`!T$C(`#+Qnm` qWvar qg`%!'` ,!`(9&e`#+)Move(e`14'hg - qg > 8`/B%qe - qK < 20`.[%av`.f@bA.aw.rows > 1`0 9rowSensitivity >`2K!e.preventDefault`/ ,r`/a!rue;}`&uPa`$NcLea`#B\"`!F+`!!OqV`!G)`,}#self`$\\#;` 4%unsubscribeTracking() {self.bp.off(\"touchstart.toolbarAutoHide\");` =)`48!move` $Alea` 51}`!@1`-:#p.on`!69,`\"L*if (`!6!loaded &&`\"d!`$/)bI` Z(hide`&]$`\"c$gk.fadeIn(400`\"%#nb` ')`!_2}}`!k*`\"h6`!`4canShowAutoT` M\" == fals`!U%` /0`%w\"` ]%jN !=`(*!clearTimeout` 4$`\"+#jN = 0;}`\"2~` -#}`\"j1`%B2`\"RJ`!=(`\"j1`#<!`\"L'set`\"m$` {)`\"m>`\"AiOut`\"}.` ,%}}, 10` $\"`*E=uh`*V,`+q\"`.j#Y` @<fO` P,` T!gQ`0 $`\"4)g.bounce ?` 6#U.sM() * 2 - 2 :` *)` |<ke`!,,`. 1bg.rotat`#I!\"`$n!\"`.4'` 1?onc` N!` B!fO()`.n#gJ`!B?F`!L5fl =`))\"var bu`.P$` 4% setInterval`&C*bu.lN();},`#,\"O`(;#eS = Date.now`-G$eO`4;'}`$Q<f`!M?`#4$`'s!`!Y%` >#`!/#`!|!0` &\"oC`\"g>lp`%u1nJ = 500` ?<oC`!d0!`$f0useInertia`%30dn`3l,`3b!`*e\"`#Q0 -`#W\"eS`#].` 3%O;var gp` 3$eO /` N%if (gp > 0.1 &&` 2\"nJ < 120`\"a$qM(0, gp)`$B=qM`\"^)`2]!Time, pu`&F#ox`!A$O`,5\"` <$ >`&h%relativeToSpeed`)z3i`#D\"RelToDrag` G!`\"H!pI =` S.`,k\"`*X%` X1TimeToStop * pu`*n%` .;`!0\"y`!K:Max`')$` K!nH`$],`\"c%;`#!!py * (nH /= pI) * nH +`#1(ox > py`%l'} else {`#M&`)I)}`*B*`0^4if (bu.ri` o'bu.qf();bu.qM`$l+;}, ox`(h=`!I!`*,2gy++`$>!`/>\"`&S$cJ()`\"E!` 2\"b != null`/e%b();}`(G)ql`*0>q`+Z-`&v!M`$J3kC == -1 ? 1 : -1`!I&bV.h`/&!oM`/y)V.eT() =`)x#`!h$bV.fo()`$>&` F(fo` <2eT` M!`!t<l`#D5pY` k(`#&$`!Q~`!S|gJ`\"F)gg`\"G*`-~,eg.ji(true`0B#pY `*o\"` )\"gy`0S!var i`)b# = gg === undefined ||` ,$null`+H$eo : gg`.4$bU.sM() * 100` n\"`3W,q`3H;me`3a\"`!D$`'5=c`\"a*`1<)`\"V4`\"^(`0~'gQ = -1`\"k)`4$&q !`4(\"`3r0q`3~$q` Q!`$D<co`&~5ak` {)`,B$` 5#`! #ak`!!\"` L&V`!C7aV` O$V`!9Ajz`*u0`$[+` g!`$N8iJ`$d\"`/4\"`$G=lN`!%,`4/$+`32%var tc`)t%U.sd() > 1` 5!dragSensitivit`1C1control.` <+` Z!r`\";!c`3*%&&` a-> 0 && Math.abs`#X\"cp -`!$\"dO) <` E,`%}!ru`*D(`$M%cp !`!_#dO`\"G'`$n*cp >` 5,`+W%`+Y\"` @(<` 9/`+T\"` 1#`\"q$cp`,t'`-;*rowsOnSingleIndex` d$ei` V$ha;}`!^\"`#*%`%b#row`#`C` <*`#$\"` O*>`'O!`/0!W`)d%`%B!`!>'`#x$ei`\"+\"i >`!6+`\"`'ta();` h!`-?!`#5(i < -` @6sx` L*if (oW`\"R'`\"p.`#/M`$1)}}`/l=i`-)1` \\!rI`!l,`%],nX`\"h,` 2,hl`%t-`2)#`27+`!H:hc`!Y)show`!^(`\"q%progressCallbac`-E!nul`!<%` 05`-!#v, -1, ` {!;`/p$if`!)%`#S\"q.show`!|,cq.hid`19!`\"&$lE`!j)V, bh`\"g%h = bh`-F\"showP`!L#Num = V`%$'I.bz` B\"tf` P!.qQ`1;$rO`15*`\"1$BarElm = jQuery(bh.kW`1o$`! &` 4,fj` p$V`%>6O`'('`\"y(`3.\"bh.gC`\">$`!A*`#/%`!4/.html(\"\")`'j&`\"e-`-8&` L1`#w#`$)(` 4+`!8$}`\"y0.addClas`.p#tf`/A%? \"` C$_bar_anim_fs\" :` &/`!v(bh`&a7=`&s%`2y!n`2v$set`4M$`2e*n.rV`2h'`!T)500 : 200`#V$il`$T)percent`(I)`#M.`+|(`$+0` _# + \"%\"`#>&destroy`%Y5` WO\"\"`&x1`$|%`$L0` 5#`#r(`-j)I.toolbarAutohide`&)% ||`0~#h.canShowAutoT` I\"`!`,bh.gk`'>*`)B!`/P\"`*(&`\"`,`'v8` P\"`!O\"` 4>`\"^$;`+b$bZ` G,` 0&.od` 0)text`1$%F(\"INFO\", ` 2!` f'.p` 9:DBG` B0gA` 99ERR` B0oU` 99CRI` B0nG` 99WRN` B0eF` I)lA` =#`'+\"window.console) {` #*.log(lA + \" \" +` v$};` h%mg`'t$document.ad.msie` 0#parseInt` 3)version.substring(0, 1)) < 9 && ` .:1, 2) == \".\"`.l% 1;}}` $#0;}`!W&D(` :&2;}`3]9qn`&[1e`*H!`1-&gT` '%`0f#`2n\"l).fadeOut(`,6\"`$ #` w3pm`!!)`#*$`!,#` \"(gT`/~-qn(`4M$`)D#`\"=#`)R\"` &#`!_\"`!);m`%U*`.|#scrollX = 0,` &#Y = 0`+l\"ypeof `%g#pageYOffset`$2!number\") {` [&` @'X` E\";` k&` V.`21$`&-)body &&` #+.` b\"Left ||`%r&` 1'Top)`!A)` I4`!I'` Q3`!D1` D$Element`!V*` .+`!W4` 12`!`6` ]6`!q0` e5`%b%` |$:`!%#`%,%` *#Y`.V&`%q3nP`'?-var cC = `,)#y.fS(e);var o`%j#`1E#p.` +\"()`(d-css(\"left\", cC.x -` V#.left` 93top` I\"y` E&top` <.fadeIn`)l\"`*E&`(b!`(W+`\"3%ow`\"9!e.preventDefault`)H&` K#`\"P\"`3P%`\"r'bh`*!$sD`(q!` '!tg` \"&hM` \"&iz` .&ik` -'y` \"&r` -'jZ` \"&bh = bh` J#B`,Q%`$e$`!W#`$]'cD`*`,`, %iB`+x-`!{!`#H(bh.sR).outerWidth(true`#U#`\"=!` >,j` 64`\"_!` ?+gU` 64`#!!` ?+hd` 55k` <.jA` 55y` ;/D` 64`$'!` ?+pQ` 64`$I!` ?+kp`!15B`&v$}`$I6Translate`$])V, `&S!if (V.settings.bI.iU =` p\"`%&$`/[\"` {!_TRANSLATE_OVERRIDE !== \"undefined\") {bh` h&i18n`*M$` K/;}`%]/attr(\"title\", ` ^,.sV`)l*`%q#` 6<y` E-gU` 5=arrowLeftButtonToolti`+++`&5#` F@Righ` L;jA` J=zoom` _\"s` M5D` E=togglePlay`!3:pQ` J=fullScreen` M:kp` J=hotspo`\"t,`'E7mV`'D1var qL`(d&bh.i`1'#qN`-B!.gk` *!panelBackElm` 3\"nb;`(&.t`!4\"Posi`!%!== 1) {qN`0!{bottom:\"auto\", top:0});` q(` ,9}` 8.'background-color':`!E*gH, opacity` *,X})`!j6Autohide`*A$ && bh.canShowAuto`1_%`/X&`!S)hide();}qL`!d#float`!O-x`#!! ? \"right\" : ` .0-` >!lef` =!\"none\"`\"\"4iC}`$`\"cT`24!`\"3.hb`,V'cT += `0Z$+` $\"iz`&q$`*^#show(`'%%`*)#` .#` {\"aw.rows >`%0!` k'sD` n$tg` V'sR` c/sj` ,%} else {` D*`#P#` D*`#d$}` \"M`\"7*` $-hd` s&`#5.gw`#12ik;bh.dN.aH`1E#`!Q$` .%`%m\"` `1j` ^3y`!M'jD`\"l7jD`!k&var jO`0v$.by.mZ() && !bh.pz(bh.bp[0]`'x0iT`'p+av`'f% &&` t!`'t&`!a'r`\"\\!qZ`\"L1` 1\"`\"G6bY`!*(V.ly()` q*jZ;bh.bY` j1` 1\"` w$`)7#\"width\", cT);` _!Translate`-H#;`-v%` 2#ions`-j)) {` U!`0i. = \"Zoom in / out\"` ~\"`.u0 = \"Hot-spots o` L!ff` J#`0.3 = \"Full ` 6\"` F,`1O3 = \"Play / Stop` F#`482 = \"Rotate `+_!` A'`3~.` B'`,N\"` H\"sV = \"Move u`!&$sy` +%down\"`#]%jQ`#G1graphicsPath = \"` `#configFileURL` -'root` <+responsiveBaseWid` 9!0` -,MinHeight` 3&zIndexLayersOn `&]\"` 5\"inBrowserF`$8% `'r#`$I,OnClick` 1*apiReadyCallba` 9!null` 7\"progress` (1googleEventTracking` m*e` /(Alias`#,(rossDomainC`#>!Loader` T*disableRelativeAsset`'u!` 9&version = \"v3.6 (build 3.6.3.10)`!(#i18n = new`+h#`(`(`%2%`\"(!`(j-` 0*.hG`(D!IDE_ROLLOVER\"` ;#lC`%f1ew = []` ~%lC.prototype = {constructor:` :$, add:` b&rotator) {if (!` ($ instanceof`\"2#Image`'!or)`!=!row`\"T!Error(\"Added object is not an ` L(` 7#.\");}for (var i = 0, ia `-%#ew.length; i < ia; i++`![#` ;#[i] === `!u&`!93`!2)already exists`!B!}`!+$push`\"e%;}, remove`\"v1`!*n` U\"splice(i, 1);break;}}}, get`!='index` l#` '! < 0 || ` '\">`!;+ - 1) {return`)\"\"`0T$` -#`!O%ndex];}}};var lH`'M)lC;})()` 6!_i`#K(` :(`#d(;(`'')`4I\".fn.`&=$`'I(op`(O!) {var oR = ` J#extend({},` *$` Y&.defaults, ` Y$;`\"))ach`!8*` y!` s&metadata ?` |/oR`!*%` @$.get`$d!)) : oR;qu` *!, o);});};`!%%qu(qd, oR`!/#cR = qd.attributes.id.value;if (cR =`-C\" || (typeof cR).toString().toLowerCase() != \"s` 6!\" || cR`%,$== 0`(!0Can't get Player ID from the`\"D# selected elemen`)i\"`'i!r =`$t/.Create(cR)`\"#!ir`\" $`&N%;}ir.licenseCode = oR` %(;` 6&`2J&` 9&` -#;ir.setting`3(-oR` %)` >)`3=,oR` %*` @)`3W'oR` %%` 5*`3]1oR` %0` B3`4\"(` L)` 0%` L)`49-oR` %+` B)`1P#oR` %!` .)`4D0oR` %.` b*nBrowserF` >%` x#` '.` L)apiReadyCallba`!%$` &,` F)progress` E*` &,`%=*oogle`3C!Tracking`%K#` '.` L)e` .(Alias` R\"` &.`&\"*rossDomainC`&#!Loader`&3#` '2` T)disableRelativeAsset`!4#` &1`(q#.qC) {` #!(`'7)`#t&URL)`))!run`)Y(();}`-d6 = {`)C':\"\", `)-*:\"` )#.lic\", `) (` J!`(d)` #+`!R)` 7!`(o$` '\"`(D.:0` +(`(+%:0, `'i*:true, `'.-:false, `&n/` 2%18n:`1p&Transla`0`!, `&s,:null, `&W,` 0#`$}3`!\"$`$_1` 5$`&q/` 3$`&U.:\"\"}`4!\"`2$.c = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";var d = window.ac = {}` 2!a = d.fk = {iv:`!8&h, g`/d% h << g | h >>> 32 - g;}, om` 6:` D\"` P%` O!endian` L() {if (h.constructo`1-!Number` i&a.iv(h, 8) & 16711935 |` /%24) & 4278255360;}for (var g = 0; g < h`3L#; g++) {h[g] = a.`!S\"(h[g]);}`!$;}, mw`!`+` k)[]; h > 0; h--) {g.push(Math.floor` %\"random() * 256)` z&`\"r!ar` l4k` !, j = 0,`\"#$j`!~)j++, g += 8) {k[g`#k!5] |= h[j] << 24`$(!% 32`!2%k;}, iP`!0'i`!/(h`!4#`#4'i`!-# * 32;`!*&h`\"O\"i`!1&>>>`!(( & 255`#K+aZ`!0'g`!/(j`!4#h`!5\"h < g`\"F%h`$U!j`!-\"(g[h`!(\"4).toString(16));` 5)& 15` 1,`!E$j.join(\"\")`'R!I`$r:, i`!P\"i`#x)i += 2`%7&parseInt(h.substr(i, 2), `!.)`%8\"J`'~/typeof btoa == \"` :$\"`()&btoa(e.T(h))`'`+[], l`!a\"l`!Z)l += 3`+]#m = h[l`%\\!16 | h[l + 1` ,!8` '%2];`&c)0; k < 4; k`$&!if (l * 8 + k * 6 <=`!*% *`%]!`\"o#c.charAt(m`$O!6 * (3 - k) & 63));} else` H%\"=\");}}`#'%`$>)bL`\"6atob`#!4e.de(atob`#4\"h = h.replace(/[^A-Z0-9+\\/]/gi, \"\")`\"W&`#V$`)J#`\"i#`)C*k = ++j % 4`!N#k == 0) {continue;}`\":#(c.indexOf(h`\"u$j - 1)) & `+7!pow(2, -2 * k + 8)` ;! <<`#j!2 | ` Q0))`#]#-` A\"`&I)};d.mode`0%&b`0*!charen`0;'f = b.UTF8 = {de`)d+`#F(unescape(encodeURIComponent(g))`$N!T` J2de` A-` d$.T` V#`!J\"e`!K!Binary`!A-j`)[0`+:'j`+6+`#}#j`\"R!CodeAt`%M\"`)S(`!c,`+sO`+p\".fromC`!##`,2!`+n3};})();(`!.&`)j#f = ac,`4V!f.fk,`$Q!f`$N$,`\"w#UTF8, d`\"'`#6!c` G!SHA1 = `/j'`4U\"`/k$a.iP(c.mn(i));`\"a$ && g.asBytes ? h :` +&`\"9\" ? d`,(! : a.aZ(h);};c.mn`!\")o`(,#o.constructor == ` `\") {o =`&+\"o);}var v`!R!ar(o), x = o`+R', p`$!#r = 1732584193, q = -271733879`)f\"-` 8%4`$S\"` 8$8`2C\"-1009589776;v[x `3@%128`3?%x`3B\"v[(x + 64`)#!9 << 4) + 15] = x`+*&z`%[\"z < v`%X%z += 16`#s#E = r, D = q, C = k, B = h, A = g` d&y` h\"y < 80; y`.[%y <` k\"p[y] = v[z + y]`.+%var u = p[y - 3] ^` $#8]` \"%14` -&16];` e#u`0?! | u`\"H!31`$4\"s = (r << 5 | r` 7!27) + g + (` X!>>> 0) +`![\"20 ? (q & k | ~q & h`#/\"18500249 :`\"7!4` B#^ k ^` =#859775393` =#6` `)` g! | k` n\"- 1894007588 :` ^)- 899497514);g = h;h = k;k = q << 30` l!`\"+!;q = r;r = s;}r += E;q += D;k += C;h += B;g += A`*+%[r, q, k, h, g]`()!dB = 16`**4e`*7'e`*9%e`*8&`*0\"`*<\"c`*6(e.HMAC`(~)l, m`!9\"`%[#m`({5m`/y!de(m);}`1m!` 25k` C$k` B%`)G#> l.dB *`2R!k = l(k, {`+/#:true}`*,#g = k.slice(0), n` #)`'c&`3b!`3Z\"` t$; j`/7\"[j] ^= 92;n` $#54` x\"f`!7!g.concat(l(n` #$m)`!@-)`!Q.`$Y#h && h`-+'f :` +&`--%c.T(f`--%f);`/9#`$ %getBrowserId(t, k`%&#kb`%)!.fk.bL(k`!/%ac.G.aD` F!b);}`$yjPBKDF2`%\\)q, o, f, t`%b#q`%%5q`%6$q`%7#`/*:` F!`/@$s = t && t.hasher || e`1M!`.x\"` 6#iterations || 1`#?&p(i, j) {`#\"#`'n\"(s, j, i`&43h`08#g = 1;while (h`',$< f`#M#l = p`\"f!`%e$`2f![g]))`&g'r = l`'+\"1; n < k; n`&m!r` Z$r` E'm`'<\"m`'=!`/u$m` K!l[m`'2!r[m];}}h = h`'+%);g++;}`!`%= f`%X$`# #`4 *` ,%`&k)`3+`+c/ac.mode.OFB = {jc:a, aD:a}`#n&a(c, b, d`#$#g = `,f!* 4,`))!d`)i/e`\"T\"e < b`\"Q%e`1f%e % g == 0) {c.mX(f, 0);}b[e`\"r!f[` >!];}}`-W3l`'|'l`(\"!u` %!`'~%s = u`( #j` '!`( #var v = [99, 124, 11` %!3, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 16`!A!4, 192, 18`!\"!3, 147, 38, 54, 6`!\\!7, 204, 5` b!5, 229, 24`!F!` {!6, 49, 21, ` m!9, 35, 195, `\"J!50, `!6!4, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, ` >!`\"{!0, 90, 160, 82, 5`!/!4, 179, 41, 227, 47, 132, `\"0!09, 0, 237, 32, 2`\"\"!77, 9`#_!6, 203, 190, 57, 74, 76, 8`#a!`\"X!8, 2`![\"0, 251, 67, 77, 51, 133, 6`\"n!9, 2, 127, 80, 60, 159, 168, 81, 163, `#w!4`#h!6, 157, 56, 245, 188, 182, 218, 33, 16, 25`#F!`#i!`%/!5, `$r!9, 236, 9`#Z!1, 6`!h!, 19`%\"!7, 126, 6`\"H!0, 9`%%!, 115, ` ?!29, 79, 220, 34, `&n!44, 136, `\"O!3`!Q!4, 20, 222, 9`%|!, 2`!>!24, `% !8, 10, 73, 6, `!U!`!b!`'=!1, 172, 98, 1`\"I!`#-!2`%J!1, 231, 200, 55, 109, 1`$r!13, `%X!69, 108, 8`#,!4, 234, 1`'~\"`$u!4, `!h!`\"6!0, 37, 46, `!!!66, 180, 19`##!2, 22`'D!6, 31, `(=!8`&[!`&`!`&m!2, `(Z!`$]!02, 72, `(7!6, 14, 97, 53, 8`'X!5, 1`!Q!`#g!9, 15`'g!`$^!8, 1`&]\", 105, 2` %!`#n\"` 8!5, 30, 135, 23`'?!6, 85, 4`#x!`%t!`(#!`&X!`'i!, 19`#<!0, `\"?!04, 6`%O!3, `#f!`+:!6, 84, 187, 22]`-v&n`1r#r`.\"\"r < 256; r`-~!n[v[r]] = r`2B\"q` H#p` P#m` )#`2T([],`.r![]`/S&f(y, x) {`!0%w = 0, z`!2\"z < 8; z`/0%x & 1) {w ^= y`!7\"A = y & 128;y` '!<< 1 & 255;if (A) {y ^= 27;}x >>>= 1;}`2+#w;}`3T)`\"=.q[r] = f(r, 2);p` $'3);m` $'9);h` $'11);g` $(3);e` $(4)`!}\"k = [0`/b!2`-p!`&x!`,<\"`*z!`-Y!7, 54]`0[!c = [[],`#Q!` \"\"], d`3%!t` =!o`1I!G`3Q#`1u&A, z, y`1#i = s.de(A), x = a.mw(o`3Y#),`$+!z.constructor == String ? l.PBKDF2(z, x`!i\"{asBytes:true}) : z`!K!mode`$C\"& y.` )!|| l` %!.OFB;o.jC(w);` ,!jc(o, i, x);`$A#a.aJ(x.concat(i));}, aD`\"0'z, `&(#`%O$a.bL(z`\" #A.splice(0, `\"7'i = y`\" >y, w`\"*4y`\"6(x && x`\")5i`\";#aD(o, A, w`\"9%s.T(A`\"2!dB:4, mX`\"2'w`(:+D`'%\"D <`\"(!; D`''!` 7%i` :\"i < 4; i` 8!c[D][i] = w[x + i * 4 + D];}`'{&` o'4` JI^= t[i][` a*C = 1; C < b; C` a*` SU= v[` %#];}}c[1].push(` %!shift());c[2` /%2].shift());c[2` G%` **3].un` *\"` (!pop())`-P&`!A0var B = c[0][i],`&W!c[1` '\"z` (!2` '\"y` (!3][i];` H# = q[B] ^ p[A] ^ z ^ y;` Y# = B ^ q` 5\"p[z]` 7#` l!` 7#A` =!` 6!p[y]`\"\"!` 8\"p` t\"A` p#q[y]`-%'`$MZC`%x#`%+$` 5_`#u~`$`3`\",Zb`\"[+`))Y`)L,`%m!`!(!;}}}, oE`*l'x, w`*-fx[w`* s`\"i5`*k0`%(!`$E&1`$F%`$cQ` 1#3` -'`&E`n`&}(`\"?c(b - C)`\"t4`+'qe`*|\"h`+[\"g`+@\"m`+@\"`+z$m` >\"e` >\"h` >\"g` >\"`, $g` >\"m` >\"e` >\"h`, *h` >\"g` >\"m` >\"e`,/!`*F\"`$3~`$3~`2Q]`)PP`)j,`+%,jC`+*'i) {d = i.length / 4;b = d + 6;o.ni(i);}, ni` L'w) {t = []`#B&x`!F\"x < d; x`!G!t[x] = [w[x * 4], ` ## + 1]` \"(2` /)3]`1P(x =` n!`\"_# * (b + 1)` $`\"c$[t[x - 1][0], ` $%1]` \"'2` .(3]];if (x % d == 0) {i`%m\"i`%f&i[0`1K\"i[0]];i[1` '$1` *!2` '$2` *!3` '$` z![0`$y!k[x / d];} else {if (d > 6 && `!8%4) {` SX}}`#l$`\"?\"d]`!;! i`\"h'd][1` .\"`\"p&d][2` .\"`\"w&d][3` .\"` t\"};})();(`%>&) {WR360.ImageRotator.prototype.jL = ` E&gh, e, target)`\"]\"this.R) {return;}var et = null`$9!gh`$}#fw = ` L!bA.settings.bg.flipAxis ?` 9\"ei :` $\"dO;var gI` 3CdO` R$ei;`!+!Math.abs(fw);` c!` )%gI)` y!offs`!n!` |\"p.` +\"();` 1!{x:fw -` @#.left, y:gI` *&top};}if (!`!A\"n ||`!K#C <`!i.control.zoomSteps) {` H#++;` %!kX(true, et)`&M%` k$= 0` ?#I` :(};`$S9kX`$c)aX` R!`$7\"jq`\"X%U.lU`$s\"bV.kl`\"\"af = jq[` 0$aF]` 3!hJ = af.image.cS !`%0'`\"?5hideHotspotsOnZoom`\"Y$lz()`& \"geo`!K$sN(et)`\"L\"bV.aG.animate({marginLeft:geo.qs, ` -\"Top` -!nS, width` )!cK, heigh` I\"fz, left:0, top:0},`$.;peed, jQuery.proxy`(c*`%8$= true`\"H:`%5% <`\"B#dC` [$bp.addClass(\"container_zoomed\"`\"e#dN.as`%<!)`&Y\"hJ` X$fK();}`#*$fP(` L#R = false` [#ispatchEvent(new `%|\"` *\"`%{/` 4!s.IMAGE_ZOOM,` i\",` p\", `$!!H)`11!this)`$N&kM`\"M;`#W\"0, 0` a#s` \"\"nS` \"\"cK` \"\"fz`\"#'`#c!` )!qY`\"4%`#o%gD() =` @\" &&`)L%== 1`#$$sm`\"C)sY.rU.ZOOM`(P?I`(]2`*`(`-S'` 2!aX`*r(`1p#`*)-bV.aS(null`#7&en`$P*bV.dE`)b%aF`(M){qs:` 6!aU['_viewPort.x'], nS` '0y'], cK` '0`(]!'], fz` +0`(m\"'], qH:0}`#z!!aX`'D%`)o!css({'`)X\"-left'`)j%` .$top` /\"`)GK`\"|#rv(0`#$&`'p!`#n(`#\\$!`#m\"`+O.`(G%`*`~`+#[rv(`)\"#`(&~`(|(`'p;sN`(\")`0u%fB`#b$`&\"1`0e!cw` .2`&4$` @!sJ`1^%`&+%\"`&('\").gO(`1m\"rG` 26top` >)j` 8/`!X!` 9)S` 3/`!Y\"` ;(sf =`&F#fm - rj) / 2` 7!tp` 2&J - rS` 2&q`\"3%mJ` c$g = (qJ - 1) /`%[;teps`#E\"K = sg *`+]%* fB + fB` ;!fz` ..cw + cw`!1\"F = cK / rj` +\"A = fz / rS` ,!oh = (sf - sJ) * sF` 3!pV`\";!p - rG` 3!A`#5\"X`,u!` g!v` &!if`%U'sB = et.x -`!M\"fm`\"n%rw` 6\"y` 3%J` 7!` n!sB`!7! - sB;` u!rw`!1! - rw`-I\"qs`$\"*cK`#o! - oh - rX`!\"!nS`$,*fz` >$pV - sv`($\"eL.fd`$@$` h# < 0 ? 0 :` *)` G&M` H%` t\"` @-` 1\"` H%eY` l2` &):`0B$eL.ev` l2` &):`#z#pK` E$qO(qs, nS`-`$`0P!pK.`-*&`0G!` )%Top`0=!cK`0%!fz`/l!`%e!(fB * qJ)}`*e<rv`*x)qH`2V%N.as(`2;!)`4X&`2t,`2U+q`#'!ru` (#iV(`/@$R` ;*dispatchEvent(new `!`\"` *\"`!_/` 4!s.IMAGE_ZOOM,` i\",` p\", qH`.L%p.removeClass(\"container_zoomed\");};})();`/>*`\"k9getAPI`\")) {`$B#`!v&API`#$!)`#o%` F,L`#4$toolbar =` Q*.Tools(L`\"&#images` 4-`!a!` <&configura` !` =,C` 9!` D%hotspot` c.H` 2#` A%L = L`!~(`%m(eload`\".)`!@\"FileURL, rootPath, hZ, ` J\"`!s!Index` *$Row` +!`\"o$L` s#` /[`!`2['delete']`$Z,`'Y%`$7%L` C&(`\"e'null` (\"`$V'` +%`$E&` *%`$+-` 1%`#}(ull;}`#T2updateDimensions`!k,`#0#pS(`\"H*`$g$`&I2`$j.` H$`'h*Dynamic` X1`'x&`!=#bV.bo`!03` l'hide` \\)dj, isHide`\"&&bV.qb` .(` V<activat` h.timeout, hZ` r)A` J#` e#` ;-` q<de` |3` y)op(dj` K=onA` Y\"` ^(`!k!`&u!ypeof hZ !== \"` :$\"`#x%`3W\"cA`0e$`!5!cA;for (var fZ in cA) {var aN = cA[fZ]`/X!aN instanceof`*l#aT) {aN.aO.add`.\\!Listener`.{#fC`.p$CLICK_ACTION,`%T*`2A!aram`!T$bi`29$hZ(` 5!);});}`'r)`\"j5`#^-`\"#~`\"`A`\"l2aT`\"z$ACTIVATE`\"^<mv()`\"HTD`&[2`\" ~`\"=aDE`\"5k`3E!`,vD` H!`#C'zoomToggl`#>*`*1&mt`,z+` R,`/X#` G:f` F;openFullScree`*p*`3''c(null` L:rotateOnc`!>*period`-U#if (`%W#undefined` }&gb = hZ;}` )#fO`2p%.gJ` c#`!':playback`\"b/` X#`3(.pY == tru`0-'cJ();} else` *&o`!51` _'gD()` Z.sm`&W\"`&e#sY.rU.rQ`%t1`!s/Stop`#|3`!`\"` ?Aart`\"S2`\"*/` r!`#EJmoveRowU`!\\*ef`1X)sx(`#(#`*}\"ef === \"`%=%\" ||` .$`#=#`#(RsP`#><`!j#Dow`'b*`!d+ta` q~`!KDstartLeftArrowR`)%!`%A4`$W3np`%R;` !Righ` IXv` d=op` XC` [(Image`.\"E` H\"`.=+` P)sp, et`$C*isZoomOff()`1a+pE = sp <`1l&A.settings.control`! !Steps ? sp :` 'A`&<!pE < 0) {`!$!0;}` .#=`!'%dC`!D+uZ = pE >` 8&`#|$dC` 6!` u!uZ`#K&kX(true`\"T!`,p,kI` 0(`#/9getRowCoun`+H*`!X%`\"O%V.bU.sd`$V1` c*Total` 4!` OErr` U?CurrentRowIndex` W=kl` KD` 6!` OBob`!J<show` 0!By` a.index, r`!}#`)\">bV.rE`,M*` U$`3t!`,V'`'z#` 6%<`$J. &&` U&>=`'\"!`#%( =` 6%;}`4Q$bV.dE`!t\"`\"1FDelta`\"N)jG`!V~`!hliG(jG`\"6;playToLabel`\"C)label, `3o\", h`)r'`\":7qB` F/`!#:jump`!(5` oBo` F#` k:onZ`.K,`\"1!var self `,|\"` q$add`2y!Listener`2#` r!`0L!or`39\"s.IMAGE_ZOOM,`4W(vent`);&hZ` ,\".param,`!.!`.(\";}`!l*Config`0c:})();(`*@)`!M/`\"S&qQ`*`8av`!8%` H4r` P,`1e%av === `'I%`!c$av = false`0_\"` 0!qR` 72qR = null` A'pH` 62pH` :.qA` a3A = \"\"` ?'c`#Y!FileFullScreenURL` I2` 45` f*pF`!S3F`!W/j`!S3j`#%&`#n;pW`#q8&&`$o\"loaded && jQuery`\"X#R).is(\":visible\")` X#!`!?#`!G%y();`%]$rue;}}` '#`!^#`!F:jo`!W)pk) {`!A#\"html, body\").css(\"overflow\", pk ? \"hidden\" : \"\"`(4&`&e4y`\"`,`!}!jo(true);var h`*8$.mF();`\"c,css({top:hf.scrollY, left` '&X, width:` U#window).` 0!(), height:` 2\".innerH` .! ? ` \"/:`$0$` a$` Z\"()}`!Q*pf`!X#` <~`!7#`!2!gs(`#W>C`#l)`(73`&t(qS()`+t%;`1f\"`(k6` #3`!7<r`-o*`!%7var z`3R\"= 50000`%h!suffix = \"_fs\"`\"j\"rh`4h$`\"y!D() ==`(5!`&H$sm`0+\"`0C#sY.rU.FULLSCREEN)`-7,`*u!`1:#pG`&w$cR +`!:#`!G!pw` 2$oY` 0&if (`$Z#pG).length == 0` i$arentElement =`%&$\"`)0\"` [!` 4+`!G%throw new Error(\"Can't create full-s`$&! image r`#{\":`!-# e` k#is NULL.\")`#c\"f`$[%Elm`!H'<div id='\" + pw + \"' class='wr360_player w` \"'_fs'></div>\").appendTo`\"&*`*T\"rf`!\"&`*G%attr(\"`! !\");`!M).addClass(rf` \\\"`/B!` 7)[0]` 5!`/0!`)`\"z(pF`#R\"`-!`#\\!F.request`'5&) {` #0();} else ` R#mozR` F2` &0` N-webkit` K3` &3`!2.s` 9'`%-\"`!<#` '.();}`#9*`,I'` =\"`,F\"`,A%` .#` (\", 'background-color':`#T!bA.settings.bI.` z&BackColor}`!o%`/V>`!P/position:\"absolute\", `/)~`.HA, 'z-index':`,B\"`\"I\\`.M\"qR =`*=!`-v.(pw`/{#qR` g&viewName`#E$` (-` A.google`-M!Tracking` M-` 1/` V/raphicsPath` P.` 2'` I.`0W&`0k\"`0t8`-}$> 0 ?` -9 :`!6+` z)`!=%license`!/+` (*` =,Cod`#[%` ('`\"(.`$u&OnClick`\"i-` 1-` S.root`#A1` 1$` A.`&`\"LayersOn` H-` 1*` M.inBrowser`#G&` S-` 1/`$g/rossDomainC`#y!Loader` \\-` 13` _.apiReadyCallba`#=/` 1,` Z%av = tru`$3/progress` \\5` 1,` Z%pH` E#` (&F = pF` '%`17!qj`1)&` @%N();`*@$.run`*2)`-^+qR.qi` G%is`#j&`$x\"`\"+(` (2};`+3..prototype.pN`38!nction (e) {`-&#docu`4B!.on(\"mozf`0e%change `1c\"` &-MS`1.&C` .!\",`#R\"qF)`!0<qE`!?-if (!`!F$.moz`&r'&& ` 1&`!J\"I`\"\\'` 2*m` 5!`!S\"Ele`\"8!` y\"`\"L#`+P\"R).is(\":visible\")`$U$pR(e);}}`#3<z`!v)cu` ~#`/v-control`) 2`$Y\" ||`(}>` E$) {return false;}` '#cu != null && (cu.request` X'|| cu.mozR` #4s` /'`#>\"` 3#`#q\"` G-`$i>i`\"{)`\"z(qS()`\"%%;}`%=!` 4!av` (+` I\"j` Q(pF`\"..`$Z%` )/`)*&` W(`\"W0` ['` +0` S2`\"g4` b&` +3`!A3`#v.`!K(` ,.();}`'P,css({width:` ?\".` (!, height` -$` (\"}`,$,y()`#r'pH`&6$`!@$bV.kl`.$$pH` *\"`,A\"bV.dE` P$.bV.ob()`,w$bV.aG.fadeIn(600);`!h,show(`%x=uu`%6R`!b'`,w.ff`,BdR`-(!` l2click` ?'nV)`/=$['delete'](`\"P*qR`\"\\!remove(` G% `\"'\";`+s=Z`\"_0`(a/`0r2`+J\"`$O$` #8cJ`!U$rh` \"$`$r\"hid`!p%dispatchEvent(new `!x\"` *\"`\"$\"` '!s.hG,` z\",`!!\")` k&lx`\"v+cR)` $`+\\<U`%J5av &&`'2&`/%'bI.iT`.B'`#~\"A`'b$cR + \"_X\";`0c,qA).length == 0`&Q&`!m%append(\"<a class='`&C&off_button' id='\" +`%t#A.replace(\"#\", \"\") + \"'></a>\"`%q+A).`&S!`!R#.proxy(`3_'v`2i\"`$V\"o` )#;}`'!\")`'80n`'<+nV`2[?q`2p*) {var success`&#%`#x2`+'^` ~&tru`2x&` 0#`%U=a`%[7` \"(`%j%f`(>'Click ||`!i\"`&*+show`(l&Toolbar`&A'`)S)gk`(a)nb`'m%`!b;rc`!t)e`!h(R`3W6`%N\"g`!($kI(`)E\"`0**` -&` J\"n(e`!0>pR`!A-` Y0pZ()`%P!`!P\"qj` @$jo`!C%`\"<<o` y-e.pr`'c!Default`,R%`!u\"` Q;`-5!`#62`%@*qj && `(Q%.moz`%!& || ` 1%`1\"\"I`.5'` 2)m` 4!`*p\"Ele`)B!`!\"#` ;%cancel` W&) {` #5(`$Y%` V)mozC` K7` ,/` R3`\")\"` P8` ,2`!@4sExit`\"Y&`!H)` -+`((!`&r(pR`&i\"`$W;uj`$Z8 && `/+,is(\":visible\"`$'$e.whic`/j!27`&/7`!L&})();"));
"use strict";

/*! jQuery UI - v1.12.1 - 2019-01-04
 * http://jqueryui.com
 * Includes: widget.js, data.js, scroll-parent.js, widgets/draggable.js, widgets/droppable.js, widgets/mouse.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function(t) {
  t.ui = t.ui || {}, t.ui.version = "1.12.1";
  var e = 0,
    i = Array.prototype.slice;
  t.cleanData = function(e) {
    return function(i) {
      var s, n, o;
      for (o = 0; null != (n = i[o]); o++) {
        try {
          s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove");
        } catch (a) {}
      }
      e(i);
    };
  }(t.cleanData), t.widget = function(e, i, s) {
    var n,
      o,
      a,
      r = {},
      l = e.split(".")[0];
    e = e.split(".")[1];
    var h = l + "-" + e;
    return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][h.toLowerCase()] = function(e) {
      return !!t.data(e, h);
    }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function(t, e) {
      return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e);
    }, t.extend(o, n, {
      version: s.version,
      _proto: t.extend({}, s),
      _childConstructors: []
    }), a = new i(), a.options = t.widget.extend({}, a.options), t.each(s, function(e, s) {
      return t.isFunction(s) ? (r[e] = function() {
        function t() {
          return i.prototype[e].apply(this, arguments);
        }

        function n(t) {
          return i.prototype[e].apply(this, t);
        }
        return function() {
          var e,
            i = this._super,
            o = this._superApply;
          return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e;
        };
      }(), void 0) : (r[e] = s, void 0);
    }), o.prototype = t.widget.extend(a, {
      widgetEventPrefix: n ? a.widgetEventPrefix || e : e
    }, r, {
      constructor: o,
      namespace: l,
      widgetName: e,
      widgetFullName: h
    }), n ? (t.each(n._childConstructors, function(e, i) {
      var s = i.prototype;
      t.widget(s.namespace + "." + s.widgetName, o, i._proto);
    }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o;
  }, t.widget.extend = function(e) {
    for (var s, n, o = i.call(arguments, 1), a = 0, r = o.length; r > a; a++) {
      for (s in o[a]) {
        n = o[a][s], o[a].hasOwnProperty(s) && void 0 !== n && (e[s] = t.isPlainObject(n) ? t.isPlainObject(e[s]) ? t.widget.extend({}, e[s], n) : t.widget.extend({}, n) : n);
      }
    }
    return e;
  }, t.widget.bridge = function(e, s) {
    var n = s.prototype.widgetFullName || e;
    t.fn[e] = function(o) {
      var a = "string" == typeof o,
        r = i.call(arguments, 1),
        l = this;
      return a ? this.length || "instance" !== o ? this.each(function() {
        var i,
          s = t.data(this, n);
        return "instance" === o ? (l = s, !1) : s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (i = s[o].apply(s, r), i !== s && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + o + "'");
      }) : l = void 0 : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))), this.each(function() {
        var e = t.data(this, n);
        e ? (e.option(o || {}), e._init && e._init()) : t.data(this, n, new s(o, this));
      })), l;
    };
  }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      classes: {},
      disabled: !1,
      create: null
    },
    _createWidget: function _createWidget(i, s) {
      s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = e++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function remove(t) {
          t.target === s && this.destroy();
        }
      }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
    },
    _getCreateOptions: function _getCreateOptions() {
      return {};
    },
    _getCreateEventData: t.noop,
    _create: t.noop,
    _init: t.noop,
    destroy: function destroy() {
      var e = this;
      this._destroy(), t.each(this.classesElementLookup, function(t, i) {
        e._removeClass(i, t);
      }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
    },
    _destroy: t.noop,
    widget: function widget() {
      return this.element;
    },
    option: function option(e, i) {
      var s,
        n,
        o,
        a = e;
      if (0 === arguments.length) return t.widget.extend({}, this.options);
      if ("string" == typeof e)
        if (a = {}, s = e.split("."), e = s.shift(), s.length) {
          for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) {
            n[s[o]] = n[s[o]] || {}, n = n[s[o]];
          }
          if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
          n[e] = i;
        } else {
          if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
          a[e] = i;
        } return this._setOptions(a), this;
    },
    _setOptions: function _setOptions(t) {
      var e;
      for (e in t) {
        this._setOption(e, t[e]);
      }
      return this;
    },
    _setOption: function _setOption(t, e) {
      return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this;
    },
    _setOptionClasses: function _setOptionClasses(e) {
      var i, s, n;
      for (i in e) {
        n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({
          element: s,
          keys: i,
          classes: e,
          add: !0
        })));
      }
    },
    _setOptionDisabled: function _setOptionDisabled(t) {
      this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
    },
    enable: function enable() {
      return this._setOptions({
        disabled: !1
      });
    },
    disable: function disable() {
      return this._setOptions({
        disabled: !0
      });
    },
    _classes: function _classes(e) {
      function i(i, o) {
        var a, r;
        for (r = 0; i.length > r; r++) {
          a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]]);
        }
      }
      var s = [],
        n = this;
      return e = t.extend({
        element: this.element,
        classes: this.options.classes || {}
      }, e), this._on(e.element, {
        remove: "_untrackClassesElement"
      }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ");
    },
    _untrackClassesElement: function _untrackClassesElement(e) {
      var i = this;
      t.each(i.classesElementLookup, function(s, n) {
        -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()));
      });
    },
    _removeClass: function _removeClass(t, e, i) {
      return this._toggleClass(t, e, i, !1);
    },
    _addClass: function _addClass(t, e, i) {
      return this._toggleClass(t, e, i, !0);
    },
    _toggleClass: function _toggleClass(t, e, i, s) {
      s = "boolean" == typeof s ? s : i;
      var n = "string" == typeof t || null === t,
        o = {
          extra: n ? e : i,
          keys: n ? t : e,
          element: n ? this.element : t,
          add: s
        };
      return o.element.toggleClass(this._classes(o), s), this;
    },
    _on: function _on(e, i, s) {
      var n,
        o = this;
      "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function(s, a) {
        function r() {
          return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0;
        }
        "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
        var l = s.match(/^([\w:-]*)\s*(.*)$/),
          h = l[1] + o.eventNamespace,
          c = l[2];
        c ? n.on(h, c, r) : i.on(h, r);
      });
    },
    _off: function _off(e, i) {
      i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get());
    },
    _delay: function _delay(t, e) {
      function i() {
        return ("string" == typeof t ? s[t] : t).apply(s, arguments);
      }
      var s = this;
      return setTimeout(i, e || 0);
    },
    _hoverable: function _hoverable(e) {
      this.hoverable = this.hoverable.add(e), this._on(e, {
        mouseenter: function mouseenter(e) {
          this._addClass(t(e.currentTarget), null, "ui-state-hover");
        },
        mouseleave: function mouseleave(e) {
          this._removeClass(t(e.currentTarget), null, "ui-state-hover");
        }
      });
    },
    _focusable: function _focusable(e) {
      this.focusable = this.focusable.add(e), this._on(e, {
        focusin: function focusin(e) {
          this._addClass(t(e.currentTarget), null, "ui-state-focus");
        },
        focusout: function focusout(e) {
          this._removeClass(t(e.currentTarget), null, "ui-state-focus");
        }
      });
    },
    _trigger: function _trigger(e, i, s) {
      var n,
        o,
        a = this.options[e];
      if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
        for (n in o) {
          n in i || (i[n] = o[n]);
        }
      return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented());
    }
  }, t.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function(e, i) {
    t.Widget.prototype["_" + e] = function(s, n, o) {
      "string" == typeof n && (n = {
        effect: n
      });
      var a,
        r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
      n = n || {}, "number" == typeof n && (n = {
        duration: n
      }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
        t(this)[e](), o && o.call(s[0]), i();
      });
    };
  }), t.widget, t.extend(t.expr[":"], {
    data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
      return function(i) {
        return !!t.data(i, e);
      };
    }) : function(e, i, s) {
      return !!t.data(e, s[3]);
    }
  }), t.fn.scrollParent = function(e) {
    var i = this.css("position"),
      s = "absolute" === i,
      n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
      o = this.parents().filter(function() {
        var e = t(this);
        return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"));
      }).eq(0);
    return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document);
  }, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
  var s = !1;
  t(document).on("mouseup", function() {
    s = !1;
  }), t.widget("ui.mouse", {
    version: "1.12.1",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function _mouseInit() {
      var e = this;
      this.element.on("mousedown." + this.widgetName, function(t) {
        return e._mouseDown(t);
      }).on("click." + this.widgetName, function(i) {
        return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0;
      }), this.started = !1;
    },
    _mouseDestroy: function _mouseDestroy() {
      this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function _mouseDown(e) {
      if (!s) {
        this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
        var i = this,
          n = 1 === e.which,
          o = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
        return n && !o && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
          i.mouseDelayMet = !0;
        }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
          return i._mouseMove(t);
        }, this._mouseUpDelegate = function(t) {
          return i._mouseUp(t);
        }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), s = !0, !0)) : !0;
      }
    },
    _mouseMove: function _mouseMove(e) {
      if (this._mouseMoved) {
        if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
        if (!e.which)
          if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
          else if (!this.ignoreMissingWhich) return this._mouseUp(e);
      }
      return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
    },
    _mouseUp: function _mouseUp(e) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, s = !1, e.preventDefault();
    },
    _mouseDistanceMet: function _mouseDistanceMet(t) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function _mouseDelayMet() {
      return this.mouseDelayMet;
    },
    _mouseStart: function _mouseStart() {},
    _mouseDrag: function _mouseDrag() {},
    _mouseStop: function _mouseStop() {},
    _mouseCapture: function _mouseCapture() {
      return !0;
    }
  }), t.ui.plugin = {
    add: function add(e, i, s) {
      var n,
        o = t.ui[e].prototype;
      for (n in s) {
        o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]]);
      }
    },
    call: function call(t, e, i, s) {
      var n,
        o = t.plugins[e];
      if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
        for (n = 0; o.length > n; n++) {
          t.options[o[n][0]] && o[n][1].apply(t.element, i);
        }
    }
  }, t.ui.safeActiveElement = function(t) {
    var e;
    try {
      e = t.activeElement;
    } catch (i) {
      e = t.body;
    }
    return e || (e = t.body), e.nodeName || (e = t.body), e;
  }, t.ui.safeBlur = function(e) {
    e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
  }, t.widget("ui.draggable", t.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null
    },
    _create: function _create() {
      "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
    },
    _setOption: function _setOption(t, e) {
      this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
    },
    _destroy: function _destroy() {
      return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0);
    },
    _mouseCapture: function _mouseCapture(e) {
      var i = this.options;
      return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blurActiveElement(e), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1);
    },
    _blockFrames: function _blockFrames(e) {
      this.iframeBlocks = this.document.find(e).map(function() {
        var e = t(this);
        return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0];
      });
    },
    _unblockFrames: function _unblockFrames() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    },
    _blurActiveElement: function _blurActiveElement(e) {
      var i = t.ui.safeActiveElement(this.document[0]),
        s = t(e.target);
      s.closest(i).length || t.ui.safeBlur(i);
    },
    _mouseStart: function _mouseStart(e) {
      var i = this.options;
      return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
        return "fixed" === t(this).css("position");
      }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0);
    },
    _refreshOffsets: function _refreshOffsets(t) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: !1,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }, this.offset.click = {
        left: t.pageX - this.offset.left,
        top: t.pageY - this.offset.top
      };
    },
    _mouseDrag: function _mouseDrag(e, i) {
      if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
        var s = this._uiHash();
        if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;
        this.position = s.position;
      }
      return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
    },
    _mouseStop: function _mouseStop(e) {
      var i = this,
        s = !1;
      return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
        i._trigger("stop", e) !== !1 && i._clear();
      }) : this._trigger("stop", e) !== !1 && this._clear(), !1;
    },
    _mouseUp: function _mouseUp(e) {
      return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e);
    },
    cancel: function cancel() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", {
        target: this.element[0]
      })) : this._clear(), this;
    },
    _getHandle: function _getHandle(e) {
      return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0;
    },
    _setHandleClassName: function _setHandleClassName() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle");
    },
    _removeHandleClassName: function _removeHandleClassName() {
      this._removeClass(this.handleElement, "ui-draggable-handle");
    },
    _createHelper: function _createHelper(e) {
      var i = this.options,
        s = t.isFunction(i.helper),
        n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
      return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n;
    },
    _setPositionRelative: function _setPositionRelative() {
      /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
    },
    _adjustOffsetFromHelper: function _adjustOffsetFromHelper(e) {
      "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
        left: +e[0],
        top: +e[1] || 0
      }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
    },
    _isRootNode: function _isRootNode(t) {
      return (/(html|body)/i.test(t.tagName) || t === this.document[0]);
    },
    _getParentOffset: function _getParentOffset() {
      var e = this.offsetParent.offset(),
        i = this.document[0];
      return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
        top: 0,
        left: 0
      }), {
        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function _getRelativeOffset() {
      if ("relative" !== this.cssPosition) return {
        top: 0,
        left: 0
      };
      var t = this.element.position(),
        e = this._isRootNode(this.scrollParent[0]);
      return {
        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
      };
    },
    _cacheMargins: function _cacheMargins() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      };
    },
    _cacheHelperProportions: function _cacheHelperProportions() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function _setContainment() {
      var e,
        i,
        s,
        n = this.options,
        o = this.document[0];
      return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0);
    },
    _convertPositionTo: function _convertPositionTo(t, e) {
      e || (e = this.position);
      var i = "absolute" === t ? 1 : -1,
        s = this._isRootNode(this.scrollParent[0]);
      return {
        top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
        left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
      };
    },
    _generatePosition: function _generatePosition(t, e) {
      var i,
        s,
        n,
        o,
        a = this.options,
        r = this._isRootNode(this.scrollParent[0]),
        l = t.pageX,
        h = t.pageY;
      return r && this.offset.scroll || (this.offset.scroll = {
        top: this.scrollParent.scrollTop(),
        left: this.scrollParent.scrollLeft()
      }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
        top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
        left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
      };
    },
    _clear: function _clear() {
      this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
    },
    _trigger: function _trigger(e, i, s) {
      return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s);
    },
    plugins: {},
    _uiHash: function _uiHash() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  }), t.ui.plugin.add("draggable", "connectToSortable", {
    start: function start(e, i, s) {
      var n = t.extend({}, i, {
        item: s.element
      });
      s.sortables = [], t(s.options.connectToSortable).each(function() {
        var i = t(this).sortable("instance");
        i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n));
      });
    },
    stop: function stop(e, i, s) {
      var n = t.extend({}, i, {
        item: s.element
      });
      s.cancelHelperRemoval = !1, t.each(s.sortables, function() {
        var t = this;
        t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
          position: t.placeholder.css("position"),
          top: t.placeholder.css("top"),
          left: t.placeholder.css("left")
        }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n));
      });
    },
    drag: function drag(e, i, s) {
      t.each(s.sortables, function() {
        var n = !1,
          o = this;
        o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function() {
          return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n;
        })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function() {
          return i.helper[0];
        }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function() {
          this.refreshPositions();
        }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function() {
          this.refreshPositions();
        }));
      });
    }
  }), t.ui.plugin.add("draggable", "cursor", {
    start: function start(e, i, s) {
      var n = t("body"),
        o = s.options;
      n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor);
    },
    stop: function stop(e, i, s) {
      var n = s.options;
      n._cursor && t("body").css("cursor", n._cursor);
    }
  }), t.ui.plugin.add("draggable", "opacity", {
    start: function start(e, i, s) {
      var n = t(i.helper),
        o = s.options;
      n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity);
    },
    stop: function stop(e, i, s) {
      var n = s.options;
      n._opacity && t(i.helper).css("opacity", n._opacity);
    }
  }), t.ui.plugin.add("draggable", "scroll", {
    start: function start(t, e, i) {
      i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
    },
    drag: function drag(e, i, s) {
      var n = s.options,
        o = !1,
        a = s.scrollParentNotHidden[0],
        r = s.document[0];
      a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e);
    }
  }), t.ui.plugin.add("draggable", "snap", {
    start: function start(e, i, s) {
      var n = s.options;
      s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
        var e = t(this),
          i = e.offset();
        this !== s.element[0] && s.snapElements.push({
          item: this,
          width: e.outerWidth(),
          height: e.outerHeight(),
          top: i.top,
          left: i.left
        });
      });
    },
    drag: function drag(e, i, s) {
      var n,
        o,
        a,
        r,
        l,
        h,
        c,
        u,
        d,
        p,
        f = s.options,
        g = f.snapTolerance,
        m = i.offset.left,
        _ = m + s.helperProportions.width,
        v = i.offset.top,
        b = v + s.helperProportions.height;
      for (d = s.snapElements.length - 1; d >= 0; d--) {
        l = s.snapElements[d].left - s.margins.left, h = l + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, l - g > _ || m > h + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {
          snapItem: s.snapElements[d].item
        })), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b), o = g >= Math.abs(u - v), a = g >= Math.abs(l - _), r = g >= Math.abs(h - m), n && (i.position.top = s._convertPositionTo("relative", {
          top: c - s.helperProportions.height,
          left: 0
        }).top), o && (i.position.top = s._convertPositionTo("relative", {
          top: u,
          left: 0
        }).top), a && (i.position.left = s._convertPositionTo("relative", {
          top: 0,
          left: l - s.helperProportions.width
        }).left), r && (i.position.left = s._convertPositionTo("relative", {
          top: 0,
          left: h
        }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = g >= Math.abs(c - v), o = g >= Math.abs(u - b), a = g >= Math.abs(l - m), r = g >= Math.abs(h - _), n && (i.position.top = s._convertPositionTo("relative", {
          top: c,
          left: 0
        }).top), o && (i.position.top = s._convertPositionTo("relative", {
          top: u - s.helperProportions.height,
          left: 0
        }).top), a && (i.position.left = s._convertPositionTo("relative", {
          top: 0,
          left: l
        }).left), r && (i.position.left = s._convertPositionTo("relative", {
          top: 0,
          left: h - s.helperProportions.width
        }).left)), !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {
          snapItem: s.snapElements[d].item
        })), s.snapElements[d].snapping = n || o || a || r || p);
      }
    }
  }), t.ui.plugin.add("draggable", "stack", {
    start: function start(e, i, s) {
      var n,
        o = s.options,
        a = t.makeArray(t(o.stack)).sort(function(e, i) {
          return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
        });
      a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function(e) {
        t(this).css("zIndex", n + e);
      }), this.css("zIndex", n + a.length));
    }
  }), t.ui.plugin.add("draggable", "zIndex", {
    start: function start(e, i, s) {
      var n = t(i.helper),
        o = s.options;
      n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex);
    },
    stop: function stop(e, i, s) {
      var n = s.options;
      n._zIndex && t(i.helper).css("zIndex", n._zIndex);
    }
  }), t.ui.draggable, t.widget("ui.droppable", {
    version: "1.12.1",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      addClasses: !0,
      greedy: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function _create() {
      var e,
        i = this.options,
        s = i.accept;
      this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function(t) {
        return t.is(s);
      }, this.proportions = function() {
        return arguments.length ? (e = arguments[0], void 0) : e ? e : e = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight
        };
      }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable");
    },
    _addToManager: function _addToManager(e) {
      t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this);
    },
    _splice: function _splice(t) {
      for (var e = 0; t.length > e; e++) {
        t[e] === this && t.splice(e, 1);
      }
    },
    _destroy: function _destroy() {
      var e = t.ui.ddmanager.droppables[this.options.scope];
      this._splice(e);
    },
    _setOption: function _setOption(e, i) {
      if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
        return t.is(i);
      };
      else if ("scope" === e) {
        var s = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(s), this._addToManager(i);
      }
      this._super(e, i);
    },
    _activate: function _activate(e) {
      var i = t.ui.ddmanager.current;
      this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
    },
    _deactivate: function _deactivate(e) {
      var i = t.ui.ddmanager.current;
      this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i));
    },
    _over: function _over(e) {
      var i = t.ui.ddmanager.current;
      i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
    },
    _out: function _out(e) {
      var i = t.ui.ddmanager.current;
      i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
    },
    _drop: function _drop(e, i) {
      var s = i || t.ui.ddmanager.current,
        o = !1;
      return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
        var i = t(this).droppable("instance");
        return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && n(s, t.extend(i, {
          offset: i.element.offset()
        }), i.options.tolerance, e) ? (o = !0, !1) : void 0;
      }), o ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1;
    },
    ui: function ui(t) {
      return {
        draggable: t.currentItem || t.element,
        helper: t.helper,
        position: t.position,
        offset: t.positionAbs
      };
    },
    _addHoverClass: function _addHoverClass() {
      this._addClass("ui-droppable-hover");
    },
    _removeHoverClass: function _removeHoverClass() {
      this._removeClass("ui-droppable-hover");
    },
    _addActiveClass: function _addActiveClass() {
      this._addClass("ui-droppable-active");
    },
    _removeActiveClass: function _removeActiveClass() {
      this._removeClass("ui-droppable-active");
    }
  });
  var n = t.ui.intersect = function() {
    function t(t, e, i) {
      return t >= e && e + i > t;
    }
    return function(e, i, s, n) {
      if (!i.offset) return !1;
      var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
        a = (e.positionAbs || e.position.absolute).top + e.margins.top,
        r = o + e.helperProportions.width,
        l = a + e.helperProportions.height,
        h = i.offset.left,
        c = i.offset.top,
        u = h + i.proportions().width,
        d = c + i.proportions().height;
      switch (s) {
        case "fit":
          return o >= h && u >= r && a >= c && d >= l;
        case "intersect":
          return o + e.helperProportions.width / 2 > h && u > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && d > l - e.helperProportions.height / 2;
        case "pointer":
          return t(n.pageY, c, i.proportions().height) && t(n.pageX, h, i.proportions().width);
        case "touch":
          return (a >= c && d >= a || l >= c && d >= l || c > a && l > d) && (o >= h && u >= o || r >= h && u >= r || h > o && r > u);
        default:
          return !1;
      }
    };
  }();
  t.ui.ddmanager = {
    current: null,
    droppables: {
      "default": []
    },
    prepareOffsets: function prepareOffsets(e, i) {
      var s,
        n,
        o = t.ui.ddmanager.droppables[e.options.scope] || [],
        a = i ? i.type : null,
        r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
      t: for (s = 0; o.length > s; s++) {
        if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
          for (n = 0; r.length > n; n++) {
            if (r[n] === o[s].element[0]) {
              o[s].proportions().height = 0;
              continue t;
            }
          }
          o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({
            width: o[s].element[0].offsetWidth,
            height: o[s].element[0].offsetHeight
          }));
        }
      }
    },
    drop: function drop(e, i) {
      var s = !1;
      return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
        this.options && (!this.options.disabled && this.visible && n(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)));
      }), s;
    },
    dragStart: function dragStart(e, i) {
      e.element.parentsUntil("body").on("scroll.droppable", function() {
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      });
    },
    drag: function drag(e, i) {
      e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var s,
            o,
            a,
            r = n(e, this, this.options.tolerance, i),
            l = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
          l && (this.options.greedy && (o = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function() {
            return t(this).droppable("instance").options.scope === o;
          }), a.length && (s = t(a[0]).droppable("instance"), s.greedyChild = "isover" === l)), s && "isover" === l && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[l] = !0, this["isout" === l ? "isover" : "isout"] = !1, this["isover" === l ? "_over" : "_out"].call(this, i), s && "isout" === l && (s.isout = !1, s.isover = !0, s._over.call(s, i)));
        }
      });
    },
    dragStop: function dragStop(e, i) {
      e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
    }
  }, t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, {
    options: {
      hoverClass: !1,
      activeClass: !1
    },
    _addActiveClass: function _addActiveClass() {
      this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass);
    },
    _removeActiveClass: function _removeActiveClass() {
      this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass);
    },
    _addHoverClass: function _addHoverClass() {
      this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass);
    },
    _removeHoverClass: function _removeHoverClass() {
      this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
    }
  }), t.ui.droppable;
});
"use strict";

// Pannellum 2.4.0, https://github.com/mpetroff/pannellum
window.libpannellum = function(J, f, m) {
  function Ba(P) {
    function bb(a, e) {
      return 1 == a.level && 1 != e.level ? -1 : 1 == e.level && 1 != a.level ? 1 : e.timestamp - a.timestamp;
    }

    function W(a, e) {
      return a.level != e.level ? a.level - e.level : a.diff - e.diff;
    }

    function X(a, e, d, f, p, c) {
      this.vertices = a;
      this.side = e;
      this.level = d;
      this.x = f;
      this.y = p;
      this.path = c.replace("%s", e).replace("%l", d).replace("%x", f).replace("%y", p);
    }

    function Y(a, e, f, m, p) {
      var c;
      var g = e.vertices;
      c = ea(a, g.slice(0, 3));
      var t = ea(a, g.slice(3, 6)),
        z = ea(a, g.slice(6, 9)),
        g = ea(a, g.slice(9, 12)),
        y = c[0] + t[0] + z[0] + g[0]; - 4 == y || 4 == y ? c = !1 : (y = c[1] + t[1] + z[1] + g[1], c = -4 == y || 4 == y ? !1 : 4 != c[2] + t[2] + z[2] + g[2]);
      if (c) {
        c = e.vertices;
        t = c[0] + c[3] + c[6] + c[9];
        z = c[1] + c[4] + c[7] + c[10];
        g = c[2] + c[5] + c[8] + c[11];
        y = Math.sqrt(t * t + z * z + g * g);
        g = Math.asin(g / y);
        t = Math.atan2(z, t) - m;
        t += t > Math.PI ? -2 * Math.PI : t < -Math.PI ? 2 * Math.PI : 0;
        t = Math.abs(t);
        e.diff = Math.acos(Math.sin(f) * Math.sin(g) + Math.cos(f) * Math.cos(g) * Math.cos(t));
        t = !1;
        for (z = 0; z < d.nodeCache.length; z++) {
          if (d.nodeCache[z].path == e.path) {
            t = !0;
            d.nodeCache[z].timestamp = d.nodeCacheTimestamp++;
            d.nodeCache[z].diff = e.diff;
            d.currentNodes.push(d.nodeCache[z]);
            break;
          }
        }
        t || (e.timestamp = d.nodeCacheTimestamp++, d.currentNodes.push(e), d.nodeCache.push(e));
        if (e.level < d.level) {
          var g = s.cubeResolution * Math.pow(2, e.level - s.maxLevel),
            t = Math.ceil(g * s.invTileResolution) - 1,
            z = g % s.tileResolution * 2,
            E = 2 * g % s.tileResolution;
          0 === E && (E = s.tileResolution);
          0 === z && (z = 2 * s.tileResolution);
          y = 0.5;
          if (e.x == t || e.y == t) y = 1 - s.tileResolution / (s.tileResolution + E);
          var r = 1 - y,
            g = [],
            v = y,
            Q = y,
            I = y,
            l = r,
            A = r,
            D = r;
          if (E < s.tileResolution)
            if (e.x == t && e.y != t) {
              if (A = Q = 0.5, "d" == e.side || "u" == e.side) D = I = 0.5;
            } else e.x != t && e.y == t && (l = v = 0.5, "l" == e.side || "r" == e.side) && (D = I = 0.5);
          z <= s.tileResolution && (e.x == t && (v = 0, l = 1, "l" == e.side || "r" == e.side) && (I = 0, D = 1), e.y == t && (Q = 0, A = 1, "d" == e.side || "u" == e.side) && (I = 0, D = 1));
          E = [c[0], c[1], c[2], c[0] * v + c[3] * l, c[1] * y + c[4] * r, c[2] * I + c[5] * D, c[0] * v + c[6] * l, c[1] * Q + c[7] * A, c[2] * I + c[8] * D, c[0] * y + c[9] * r, c[1] * Q + c[10] * A, c[2] * I + c[11] * D];
          E = new X(E, e.side, e.level + 1, 2 * e.x, 2 * e.y, s.fullpath);
          g.push(E);
          e.x == t && z <= s.tileResolution || (E = [c[0] * v + c[3] * l, c[1] * y + c[4] * r, c[2] * I + c[5] * D, c[3], c[4], c[5], c[3] * y + c[6] * r, c[4] * Q + c[7] * A, c[5] * I + c[8] * D, c[0] * v + c[6] * l, c[1] * Q + c[7] * A, c[2] * I + c[8] * D], E = new X(E, e.side, e.level + 1, 2 * e.x + 1, 2 * e.y, s.fullpath), g.push(E));
          e.x == t && z <= s.tileResolution || e.y == t && z <= s.tileResolution || (E = [c[0] * v + c[6] * l, c[1] * Q + c[7] * A, c[2] * I + c[8] * D, c[3] * y + c[6] * r, c[4] * Q + c[7] * A, c[5] * I + c[8] * D, c[6], c[7], c[8], c[9] * v + c[6] * l, c[10] * y + c[7] * r, c[11] * I + c[8] * D], E = new X(E, e.side, e.level + 1, 2 * e.x + 1, 2 * e.y + 1, s.fullpath), g.push(E));
          e.y == t && z <= s.tileResolution || (E = [c[0] * y + c[9] * r, c[1] * Q + c[10] * A, c[2] * I + c[11] * D, c[0] * v + c[6] * l, c[1] * Q + c[7] * A, c[2] * I + c[8] * D, c[9] * v + c[6] * l, c[10] * y + c[7] * r, c[11] * I + c[8] * D, c[9], c[10], c[11]], E = new X(E, e.side, e.level + 1, 2 * e.x, 2 * e.y + 1, s.fullpath), g.push(E));
          for (e = 0; e < g.length; e++) {
            Y(a, g[e], f, m, p);
          }
        }
      }
    }

    function Ca() {
      return [-1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1];
    }

    function ra(a, e, d) {
      var f = Math.sin(e);
      e = Math.cos(e);
      if ("x" == d) return [a[0], e * a[1] + f * a[2], e * a[2] - f * a[1], a[3], e * a[4] + f * a[5], e * a[5] - f * a[4], a[6], e * a[7] + f * a[8], e * a[8] - f * a[7]];
      if ("y" == d) return [e * a[0] - f * a[2], a[1], e * a[2] + f * a[0], e * a[3] - f * a[5], a[4], e * a[5] + f * a[3], e * a[6] - f * a[8], a[7], e * a[8] + f * a[6]];
      if ("z" == d) return [e * a[0] + f * a[1], e * a[1] - f * a[0], a[2], e * a[3] + f * a[4], e * a[4] - f * a[3], a[5], e * a[6] + f * a[7], e * a[7] - f * a[6], a[8]];
    }

    function sa(a) {
      return [a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]];
    }

    function La(a) {
      a.textureLoad || (a.textureLoad = !0, Ma(encodeURI(a.path + "." + s.extension), function(e) {
        a.texture = e;
        a.textureLoaded = !0;
      }, Z.crossOrigin));
    }

    function ea(a, e) {
      var d = [a[0] * e[0] + a[1] * e[1] + a[2] * e[2], a[4] * e[0] + a[5] * e[1] + a[6] * e[2], a[11] + a[8] * e[0] + a[9] * e[1] + a[10] * e[2], 1 / (a[12] * e[0] + a[13] * e[1] + a[14] * e[2])],
        f = d[0] * d[3],
        p = d[1] * d[3],
        d = d[2] * d[3],
        c = [0, 0, 0]; - 1 > f && (c[0] = -1);
      1 < f && (c[0] = 1); - 1 > p && (c[1] = -1);
      1 < p && (c[1] = 1);
      if (-1 > d || 1 < d) c[2] = 1;
      return c;
    }

    function ta() {
      console.log("Reducing canvas size due to error 1286!");
      A.width = Math.round(A.width / 2);
      A.height = Math.round(A.height / 2);
    }
    var A = f.createElement("canvas");
    A.style.width = A.style.height = "100%";
    P.appendChild(A);
    var d, a, V, N, na, R, ua, fa, s, G, va, ka, F, ba, Da, Z;
    this.init = function(h, e, Ia, ja, p, c, g, t) {
      e === m && (e = "equirectangular");
      if ("equirectangular" != e && "cubemap" != e && "multires" != e) throw console.log("Error: invalid image type specified!"), {
        type: "config error"
      };
      G = e;
      s = h;
      va = Ia;
      Z = t || {};
      if (d) {
        V && (a.detachShader(d, V), a.deleteShader(V));
        N && (a.detachShader(d, N), a.deleteShader(N));
        a.bindBuffer(a.ARRAY_BUFFER, null);
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
        d.texture && a.deleteTexture(d.texture);
        if (d.nodeCache)
          for (h = 0; h < d.nodeCache.length; h++) {
            a.deleteTexture(d.nodeCache[h].texture);
          }
        a.deleteProgram(d);
        d = m;
      }
      fa = m;
      "cubemap" == G && 0 !== (s[0].width & s[0].width - 1) && (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 8_/) || navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 9_/) || navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 10_/) || navigator.userAgent.match(/Trident.*rv[ :]*11\./)) || (a || (a = A.getContext("experimental-webgl", {
        alpha: !1,
        depth: !1
      })), a && 1286 == a.getError() && ta());
      if (!a && ("multires" == G && s.hasOwnProperty("fallbackPath") || "cubemap" == G) && ("WebkitAppearance" in f.documentElement.style || navigator.userAgent.match(/Trident.*rv[ :]*11\./) || -1 !== navigator.appVersion.indexOf("MSIE 10"))) {
        R && P.removeChild(R);
        R = f.createElement("div");
        R.className = "pnlm-world";
        ja = s.basePath ? s.basePath + s.fallbackPath : s.fallbackPath;
        var z = "frblud".split(""),
          y = 0;
        p = function p() {
          var a = f.createElement("canvas");
          a.className = "pnlm-face pnlm-" + z[this.side] + "face";
          R.appendChild(a);
          var c = a.getContext("2d");
          a.style.width = this.width + 4 + "px";
          a.style.height = this.height + 4 + "px";
          a.width = this.width + 4;
          a.height = this.height + 4;
          c.drawImage(this, 2, 2);
          var e = c.getImageData(0, 0, a.width, a.height),
            d = e.data,
            h,
            l;
          for (h = 2; h < a.width - 2; h++) {
            for (l = 0; 4 > l; l++) {
              d[4 * (h + a.width) + l] = d[4 * (h + 2 * a.width) + l], d[4 * (h + a.width * (a.height - 2)) + l] = d[4 * (h + a.width * (a.height - 3)) + l];
            }
          }
          for (h = 2; h < a.height - 2; h++) {
            for (l = 0; 4 > l; l++) {
              d[4 * (h * a.width + 1) + l] = d[4 * (h * a.width + 2) + l], d[4 * ((h + 1) * a.width - 2) + l] = d[4 * ((h + 1) * a.width - 3) + l];
            }
          }
          for (l = 0; 4 > l; l++) {
            d[4 * (a.width + 1) + l] = d[4 * (2 * a.width + 2) + l], d[4 * (2 * a.width - 2) + l] = d[4 * (3 * a.width - 3) + l], d[4 * (a.width * (a.height - 2) + 1) + l] = d[4 * (a.width * (a.height - 3) + 2) + l], d[4 * (a.width * (a.height - 1) - 2) + l] = d[4 * (a.width * (a.height - 2) - 3) + l];
          }
          for (h = 1; h < a.width - 1; h++) {
            for (l = 0; 4 > l; l++) {
              d[4 * h + l] = d[4 * (h + a.width) + l], d[4 * (h + a.width * (a.height - 1)) + l] = d[4 * (h + a.width * (a.height - 2)) + l];
            }
          }
          for (h = 1; h < a.height - 1; h++) {
            for (l = 0; 4 > l; l++) {
              d[h * a.width * 4 + l] = d[4 * (h * a.width + 1) + l], d[4 * ((h + 1) * a.width - 1) + l] = d[4 * ((h + 1) * a.width - 2) + l];
            }
          }
          for (l = 0; 4 > l; l++) {
            d[l] = d[4 * (a.width + 1) + l], d[4 * (a.width - 1) + l] = d[4 * (2 * a.width - 2) + l], d[a.width * (a.height - 1) * 4 + l] = d[4 * (a.width * (a.height - 2) + 1) + l], d[4 * (a.width * a.height - 1) + l] = d[4 * (a.width * (a.height - 1) - 2) + l];
          }
          c.putImageData(e, 0, 0);
          y++;
          6 == y && (na = this.width, P.appendChild(R), g());
        };
        for (h = 0; 6 > h; h++) {
          c = new Image(), c.crossOrigin = Z.crossOrigin ? Z.crossOrigin : "anonymous", c.side = h, c.onload = p, c.src = "multires" == G ? encodeURI(ja.replace("%s", z[h]) + "." + s.extension) : encodeURI(s[h].src);
        }
      } else {
        if (!a) throw console.log("Error: no WebGL support detected!"), {
          type: "no webgl"
        };
        s.fullpath = s.basePath ? s.basePath + s.path : s.path;
        s.invTileResolution = 1 / s.tileResolution;
        e = Ca();
        ua = [];
        for (h = 0; 6 > h; h++) {
          ua[h] = e.slice(12 * h, 12 * h + 12), e = Ca();
        }
        if ("equirectangular" == G) {
          if (h = Math.max(s.width, s.height), e = a.getParameter(a.MAX_TEXTURE_SIZE), h > e) throw console.log("Error: The image is too big; it's " + h + "px wide, but this device's maximum supported width is " + e + "px."), {
            type: "webgl size error",
            width: h,
            maxWidth: e
          };
        } else if ("cubemap" == G && (h = s[0].width, e = a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE), h > e)) throw console.log("Error: The cube face image is too big; it's " + h + "px wide, but this device's maximum supported width is " + e + "px."), {
          type: "webgl size error",
          width: h,
          maxWidth: e
        };
        t === m || t.horizonPitch === m && t.horizonRoll === m || (fa = [t.horizonPitch == m ? 0 : t.horizonPitch, t.horizonRoll == m ? 0 : t.horizonRoll]);
        h = a.TEXTURE_2D;
        a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight);
        V = a.createShader(a.VERTEX_SHADER);
        e = r;
        "multires" == G && (e = v);
        a.shaderSource(V, e);
        a.compileShader(V);
        N = a.createShader(a.FRAGMENT_SHADER);
        e = Na;
        "cubemap" == G ? (h = a.TEXTURE_CUBE_MAP, e = Oa) : "multires" == G && (e = oa);
        a.shaderSource(N, e);
        a.compileShader(N);
        d = a.createProgram();
        a.attachShader(d, V);
        a.attachShader(d, N);
        a.linkProgram(d);
        a.getShaderParameter(V, a.COMPILE_STATUS) || console.log(a.getShaderInfoLog(V));
        a.getShaderParameter(N, a.COMPILE_STATUS) || console.log(a.getShaderInfoLog(N));
        a.getProgramParameter(d, a.LINK_STATUS) || console.log(a.getProgramInfoLog(d));
        a.useProgram(d);
        d.drawInProgress = !1;
        d.texCoordLocation = a.getAttribLocation(d, "a_texCoord");
        a.enableVertexAttribArray(d.texCoordLocation);
        "multires" != G ? (ka || (ka = a.createBuffer()), a.bindBuffer(a.ARRAY_BUFFER, ka), a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]), a.STATIC_DRAW), a.vertexAttribPointer(d.texCoordLocation, 2, a.FLOAT, !1, 0, 0), d.aspectRatio = a.getUniformLocation(d, "u_aspectRatio"), a.uniform1f(d.aspectRatio, a.drawingBufferWidth / a.drawingBufferHeight), d.psi = a.getUniformLocation(d, "u_psi"), d.theta = a.getUniformLocation(d, "u_theta"), d.f = a.getUniformLocation(d, "u_f"), d.h = a.getUniformLocation(d, "u_h"), d.v = a.getUniformLocation(d, "u_v"), d.vo = a.getUniformLocation(d, "u_vo"), d.rot = a.getUniformLocation(d, "u_rot"), a.uniform1f(d.h, ja / (2 * Math.PI)), a.uniform1f(d.v, p / Math.PI), a.uniform1f(d.vo, c / Math.PI * 2), "equirectangular" == G && (d.backgroundColor = a.getUniformLocation(d, "u_backgroundColor"), a.uniform4fv(d.backgroundColor, (t.backgroundColor ? t.backgroundColor : [0, 0, 0]).concat([1]))), d.texture = a.createTexture(), a.bindTexture(h, d.texture), "cubemap" == G ? (a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s[1]), a.texImage2D(a.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s[3]), a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s[4]), a.texImage2D(a.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s[5]), a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s[0]), a.texImage2D(a.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s[2])) : a.texImage2D(h, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s), a.texParameteri(h, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(h, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texParameteri(h, a.TEXTURE_MIN_FILTER, a.LINEAR), a.texParameteri(h, a.TEXTURE_MAG_FILTER, a.LINEAR)) : (d.vertPosLocation = a.getAttribLocation(d, "a_vertCoord"), a.enableVertexAttribArray(d.vertPosLocation), F || (F = a.createBuffer()), ba || (ba = a.createBuffer()), Da || (Da = a.createBuffer()), a.bindBuffer(a.ARRAY_BUFFER, ba), a.bufferData(a.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), a.STATIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, Da), a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), a.STATIC_DRAW), d.perspUniform = a.getUniformLocation(d, "u_perspMatrix"), d.cubeUniform = a.getUniformLocation(d, "u_cubeMatrix"), d.level = -1, d.currentNodes = [], d.nodeCache = [], d.nodeCacheTimestamp = 0);
        ja = a.getError();
        if (0 !== ja) throw console.log("Error: Something went wrong with WebGL!", ja), {
          type: "webgl error"
        };
        g();
      }
    };
    this.destroy = function() {
      P !== m && (A !== m && P.contains(A) && P.removeChild(A), R !== m && P.contains(R) && P.removeChild(R));
      if (a) {
        var d = a.getExtension("WEBGL_lose_context");
        d && d.loseContext();
      }
    };
    this.resize = function() {
      var h = J.devicePixelRatio || 1;
      A.width = A.clientWidth * h;
      A.height = A.clientHeight * h;
      a && (1286 == a.getError() && ta(), a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight), "multires" != G && a.uniform1f(d.aspectRatio, A.clientWidth / A.clientHeight));
    };
    this.resize();
    this.setPose = function(a, d) {
      fa = [a, d];
    };
    this.render = function(h, e, f, r) {
      var p;
      p = 0;
      r === m && (r = {});
      r.roll && (p = r.roll);
      if (fa !== m) {
        var c = fa[0],
          g = fa[1],
          t = h,
          z = e,
          y = Math.cos(g) * Math.sin(h) * Math.sin(c) + Math.cos(h) * (Math.cos(c) * Math.cos(e) + Math.sin(g) * Math.sin(c) * Math.sin(e)),
          v = -Math.sin(h) * Math.sin(g) + Math.cos(h) * Math.cos(g) * Math.sin(e);
        h = Math.cos(g) * Math.cos(c) * Math.sin(h) + Math.cos(h) * (-Math.cos(e) * Math.sin(c) + Math.cos(c) * Math.sin(g) * Math.sin(e));
        h = Math.asin(Math.max(Math.min(h, 1), -1));
        e = Math.atan2(v, y);
        c = [Math.cos(t) * (Math.sin(g) * Math.sin(c) * Math.cos(z) - Math.cos(c) * Math.sin(z)), Math.cos(t) * Math.cos(g) * Math.cos(z), Math.cos(t) * (Math.cos(c) * Math.sin(g) * Math.cos(z) + Math.sin(z) * Math.sin(c))];
        g = [-Math.cos(h) * Math.sin(e), Math.cos(h) * Math.cos(e)];
        g = Math.acos(Math.max(Math.min((c[0] * g[0] + c[1] * g[1]) / (Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]) * Math.sqrt(g[0] * g[0] + g[1] * g[1])), 1), -1));
        0 > c[2] && (g = 2 * Math.PI - g);
        p += g;
      }
      if (a || "multires" != G && "cubemap" != G) {
        if ("multires" != G) f = 2 * Math.atan(Math.tan(0.5 * f) / (a.drawingBufferWidth / a.drawingBufferHeight)), f = 1 / Math.tan(0.5 * f), a.uniform1f(d.psi, e), a.uniform1f(d.theta, h), a.uniform1f(d.rot, p), a.uniform1f(d.f, f), !0 === va && "equirectangular" == G && (a.bindTexture(a.TEXTURE_2D, d.texture), a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, s)), a.drawArrays(a.TRIANGLES, 0, 6);
        else {
          c = a.drawingBufferWidth / a.drawingBufferHeight;
          g = 2 * Math.atan(Math.tan(f / 2) * a.drawingBufferHeight / a.drawingBufferWidth);
          g = 1 / Math.tan(g / 2);
          c = [g / c, 0, 0, 0, 0, g, 0, 0, 0, 0, 100.1 / -99.9, 20 / -99.9, 0, 0, -1, 0];
          for (g = 1; g < s.maxLevel && a.drawingBufferWidth > s.tileResolution * Math.pow(2, g - 1) * Math.tan(f / 2) * 0.707;) {
            g++;
          }
          d.level = g;
          g = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          g = ra(g, -p, "z");
          g = ra(g, -h, "x");
          g = ra(g, e, "y");
          g = [g[0], g[1], g[2], 0, g[3], g[4], g[5], 0, g[6], g[7], g[8], 0, 0, 0, 0, 1];
          a.uniformMatrix4fv(d.perspUniform, !1, new Float32Array(sa(c)));
          a.uniformMatrix4fv(d.cubeUniform, !1, new Float32Array(sa(g)));
          c = [c[0] * g[0], c[0] * g[1], c[0] * g[2], 0, c[5] * g[4], c[5] * g[5], c[5] * g[6], 0, c[10] * g[8], c[10] * g[9], c[10] * g[10], c[11], -g[8], -g[9], -g[10], 0];
          d.nodeCache.sort(bb);
          if (200 < d.nodeCache.length && d.nodeCache.length > d.currentNodes.length + 50)
            for (g = d.nodeCache.splice(200, d.nodeCache.length - 200), p = 0; p < g.length; p++) {
              a.deleteTexture(g[p].texture);
            }
          d.currentNodes = [];
          g = "fbudlr".split("");
          for (p = 0; 6 > p; p++) {
            t = new X(ua[p], g[p], 1, 0, 0, s.fullpath), Y(c, t, h, e, f);
          }
          d.currentNodes.sort(W);
          for (p = 0; p < d.currentNodes.length; p++) {
            if (!d.currentNodes[p].texture) {
              setTimeout(La, 0, d.currentNodes[p]);
              break;
            }
          }
          if (!d.drawInProgress) {
            d.drawInProgress = !0;
            for (h = 0; h < d.currentNodes.length; h++) {
              d.currentNodes[h].textureLoaded && (a.bindBuffer(a.ARRAY_BUFFER, F), a.bufferData(a.ARRAY_BUFFER, new Float32Array(d.currentNodes[h].vertices), a.STATIC_DRAW), a.vertexAttribPointer(d.vertPosLocation, 3, a.FLOAT, !1, 0, 0), a.bindBuffer(a.ARRAY_BUFFER, ba), a.vertexAttribPointer(d.texCoordLocation, 2, a.FLOAT, !1, 0, 0), a.bindTexture(a.TEXTURE_2D, d.currentNodes[h].texture), a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0));
            }
            d.drawInProgress = !1;
          }
        }
        if (r.returnImage !== m) return A.toDataURL("image/png");
      } else
        for (p = na / 2, r = {
            f: "translate3d(-" + (p + 2) + "px, -" + (p + 2) + "px, -" + p + "px)",
            b: "translate3d(" + (p + 2) + "px, -" + (p + 2) + "px, " + p + "px) rotateX(180deg) rotateZ(180deg)",
            u: "translate3d(-" + (p + 2) + "px, -" + p + "px, " + (p + 2) + "px) rotateX(270deg)",
            d: "translate3d(-" + (p + 2) + "px, " + p + "px, -" + (p + 2) + "px) rotateX(90deg)",
            l: "translate3d(-" + p + "px, -" + (p + 2) + "px, " + (p + 2) + "px) rotateX(180deg) rotateY(90deg) rotateZ(180deg)",
            r: "translate3d(" + p + "px, -" + (p + 2) + "px, -" + (p + 2) + "px) rotateY(270deg)"
          }, f = 1 / Math.tan(f / 2), f = f * a.drawingBufferWidth / 2 + "px", h = "perspective(" + f + ") translateZ(" + f + ") rotateX(" + h + "rad) rotateY(" + e + "rad) ", e = Object.keys(r), p = 0; 6 > p; p++) {
          f = R.querySelector(".pnlm-" + e[p] + "face").style, f.webkitTransform = h + r[e[p]], f.transform = h + r[e[p]];
        }
    };
    this.isLoading = function() {
      if (a && "multires" == G)
        for (var f = 0; f < d.currentNodes.length; f++) {
          if (!d.currentNodes[f].textureLoaded) return !0;
        }
      return !1;
    };
    this.getCanvas = function() {
      return A;
    };
    var Ma = function() {
      function d() {
        var e = this;
        this.texture = this.callback = null;
        this.image = new Image();
        this.image.crossOrigin = c ? c : "anonymous";
        this.image.addEventListener("load", function() {
          var c = e.image;
          a.bindTexture(a.TEXTURE_2D, e.texture);
          a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, c);
          a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
          a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
          a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
          a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
          a.bindTexture(a.TEXTURE_2D, null);
          e.callback(e.texture);
          p.length ? (c = p.shift(), e.loadTexture(c.src, c.texture, c.callback)) : m[f++] = e;
        });
      }

      function e(a, c, d) {
        this.src = a;
        this.texture = c;
        this.callback = d;
      }
      var f = 4,
        m = {},
        p = [],
        c;
      d.prototype.loadTexture = function(a, c, d) {
        this.texture = c;
        this.callback = d;
        this.image.src = a;
      };
      for (var g = 0; g < f; g++) {
        m[g] = new d();
      }
      return function(d, g, h) {
        c = h;
        h = a.createTexture();
        f ? m[--f].loadTexture(d, h, g) : p.push(new e(d, h, g));
        return h;
      };
    }();
  }
  var r = "attribute vec2 a_texCoord;varying vec2 v_texCoord;void main() {gl_Position = vec4(a_texCoord, 0.0, 1.0);v_texCoord = a_texCoord;}",
    v = "attribute vec3 a_vertCoord;attribute vec2 a_texCoord;uniform mat4 u_cubeMatrix;uniform mat4 u_perspMatrix;varying mediump vec2 v_texCoord;void main(void) {gl_Position = u_perspMatrix * u_cubeMatrix * vec4(a_vertCoord, 1.0);v_texCoord = a_texCoord;}",
    Oa = "precision mediump float;\nuniform float u_aspectRatio;\nuniform float u_psi;\nuniform float u_theta;\nuniform float u_f;\nuniform float u_h;\nuniform float u_v;\nuniform float u_vo;\nuniform float u_rot;\nconst float PI = 3.14159265358979323846264;\nuniform sampler2D u_image;\nuniform samplerCube u_imageCube;\nvarying vec2 v_texCoord;\nuniform vec4 u_backgroundColor;\nvoid main() {\nfloat x = v_texCoord.x * u_aspectRatio;\nfloat y = v_texCoord.y;\nfloat sinrot = sin(u_rot);\nfloat cosrot = cos(u_rot);\nfloat rot_x = x * cosrot - y * sinrot;\nfloat rot_y = x * sinrot + y * cosrot;\nfloat sintheta = sin(u_theta);\nfloat costheta = cos(u_theta);\nfloat a = u_f * costheta - rot_y * sintheta;\nfloat root = sqrt(rot_x * rot_x + a * a);\nfloat lambda = atan(rot_x / root, a / root) + u_psi;\nfloat phi = atan((rot_y * costheta + u_f * sintheta) / root);float cosphi = cos(phi);\ngl_FragColor = textureCube(u_imageCube, vec3(cosphi*sin(lambda), sin(phi), cosphi*cos(lambda)));\n}",
    Na = "precision mediump float;\nuniform float u_aspectRatio;\nuniform float u_psi;\nuniform float u_theta;\nuniform float u_f;\nuniform float u_h;\nuniform float u_v;\nuniform float u_vo;\nuniform float u_rot;\nconst float PI = 3.14159265358979323846264;\nuniform sampler2D u_image;\nuniform samplerCube u_imageCube;\nvarying vec2 v_texCoord;\nuniform vec4 u_backgroundColor;\nvoid main() {\nfloat x = v_texCoord.x * u_aspectRatio;\nfloat y = v_texCoord.y;\nfloat sinrot = sin(u_rot);\nfloat cosrot = cos(u_rot);\nfloat rot_x = x * cosrot - y * sinrot;\nfloat rot_y = x * sinrot + y * cosrot;\nfloat sintheta = sin(u_theta);\nfloat costheta = cos(u_theta);\nfloat a = u_f * costheta - rot_y * sintheta;\nfloat root = sqrt(rot_x * rot_x + a * a);\nfloat lambda = atan(rot_x / root, a / root) + u_psi;\nfloat phi = atan((rot_y * costheta + u_f * sintheta) / root);lambda = mod(lambda + PI, PI * 2.0) - PI;\nvec2 coord = vec2(lambda / PI, phi / (PI / 2.0));\nif(coord.x < -u_h || coord.x > u_h || coord.y < -u_v + u_vo || coord.y > u_v + u_vo)\ngl_FragColor = u_backgroundColor;\nelse\ngl_FragColor = texture2D(u_image, vec2((coord.x + u_h) / (u_h * 2.0), (-coord.y + u_v + u_vo) / (u_v * 2.0)));\n}",
    oa = "varying mediump vec2 v_texCoord;uniform sampler2D u_sampler;void main(void) {gl_FragColor = texture2D(u_sampler, v_texCoord);}";
  return {
    renderer: function renderer(f, m, r, v) {
      return new Ba(f, m, r, v);
    }
  };
}(window, document);
window.requestAnimationFrame || (window.requestAnimationFrame = function() {
  return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(J, f) {
    window.setTimeout(J, 1E3 / 60);
  };
}());
window.pannellum = function(J, f, m) {
  function Ba(r, v) {
    function Oa(u) {
      J.removeEventListener("deviceorientation", Oa);
      u && null !== u.alpha && null !== u.beta && null !== u.gamma ? (w.container.appendChild(w.orientation), pa = !0, Ya && Ka()) : pa = !1;
    }

    function Na() {
      var u = f.createElement("div");
      u.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e";
      if (1 == u.getElementsByTagName("i").length) W();
      else {
        wa = b.hfov;
        Ea = b.pitch;
        var a;
        if ("cubemap" == b.type) {
          O = [];
          for (u = 0; 6 > u; u++) {
            O.push(new Image()), O[u].crossOrigin = b.crossOrigin;
          }
          n.load.lbox.style.display = "block";
          n.load.lbar.style.display = "none";
        } else if ("multires" == b.type) u = JSON.parse(JSON.stringify(b.multiRes)), b.basePath && b.multiRes.basePath && !/^(?:[a-z]+:)?\/\//i.test(b.multiRes.basePath) ? u.basePath = b.basePath + b.multiRes.basePath : b.multiRes.basePath ? u.basePath = b.multiRes.basePath : b.basePath && (u.basePath = b.basePath), O = u;
        else if (!0 === b.dynamic) O = b.panorama;
        else {
          if (b.panorama === m) {
            W(b.strings.noPanoramaError);
            return;
          }
          O = new Image();
        }
        if ("cubemap" == b.type)
          for (var ca = 6, c = function c() {
              ca--;
              0 === ca && P();
            }, d = function d(a) {
              var u = f.createElement("a");
              u.href = a.target.src;
              u.innerHTML = u.href;
              W(b.strings.fileAccessError.replace("%s", u.outerHTML));
            }, u = 0; u < O.length; u++) {
            O[u].onload = c, O[u].onerror = d, a = b.cubeMap[u], b.basePath && !oa(a) && (a = b.basePath + a), O[u].src = encodeURI(a);
          } else if ("multires" == b.type) P();
          else if (a = "", b.basePath && (a = b.basePath), !0 !== b.dynamic) {
          a = oa(b.panorama) ? b.panorama : a + b.panorama;
          O.onload = function() {
            J.URL.revokeObjectURL(this.src);
            P();
          };
          var e = new XMLHttpRequest();
          e.onloadend = function() {
            if (200 != e.status) {
              var u = f.createElement("a");
              u.href = encodeURI(a);
              u.innerHTML = u.href;
              W(b.strings.fileAccessError.replace("%s", u.outerHTML));
            }
            Ba(this.response);
            n.load.msg.innerHTML = "";
          };
          e.onprogress = function(a) {
            if (a.lengthComputable) {
              n.load.lbarFill.style.width = a.loaded / a.total * 100 + "%";
              var u, b;
              1E6 < a.total ? (u = "MB", b = (a.loaded / 1E6).toFixed(2), a = (a.total / 1E6).toFixed(2)) : 1E3 < a.total ? (u = "kB", b = (a.loaded / 1E3).toFixed(1), a = (a.total / 1E3).toFixed(1)) : (u = "B", b = a.loaded, a = a.total);
              n.load.msg.innerHTML = b + " / " + a + " " + u;
            } else n.load.lbox.style.display = "block", n.load.lbar.style.display = "none";
          };
          try {
            e.open("GET", a, !0);
          } catch (g) {
            W(b.strings.malformedURLError);
          }
          e.responseType = "blob";
          e.setRequestHeader("Accept", "image/*,*/*;q=0.9");
          e.withCredentials = "use-credentials" === b.crossOrigin;
          e.send();
        }
        b.draggable && C.classList.add("pnlm-grab");
        C.classList.remove("pnlm-grabbing");
      }
    }

    function oa(a) {
      return (/^(?:[a-z]+:)?\/\//i.test(a) || "/" == a[0] || "blob:" == a.slice(0, 5));
    }

    function P() {
      B || (B = new libpannellum.renderer(M));
      Sa || (Sa = !0, H.addEventListener("mousedown", Ca, !1), f.addEventListener("mousemove", La, !1), f.addEventListener("mouseup", ea, !1), b.mouseZoom && (C.addEventListener("mousewheel", na, !1), C.addEventListener("DOMMouseScroll", na, !1)), b.doubleClickZoom && H.addEventListener("dblclick", ra, !1), C.addEventListener("mozfullscreenchange", y, !1), C.addEventListener("webkitfullscreenchange", y, !1), C.addEventListener("msfullscreenchange", y, !1), C.addEventListener("fullscreenchange", y, !1), J.addEventListener("resize", ka, !1), J.addEventListener("orientationchange", ka, !1), b.disableKeyboardCtrl || (r.addEventListener("keydown", R, !1), r.addEventListener("keyup", fa, !1), r.addEventListener("blur", ua, !1)), f.addEventListener("mouseleave", ea, !1), H.addEventListener("touchstart", ta, !1), H.addEventListener("touchmove", A, !1), H.addEventListener("touchend", d, !1), H.addEventListener("pointerdown", a, !1), H.addEventListener("pointermove", V, !1), H.addEventListener("pointerup", N, !1), H.addEventListener("pointerleave", N, !1), J.navigator.pointerEnabled && (r.style.touchAction = "none"));
      h();
      setTimeout(function() {}, 500);
    }

    function Ba(a) {
      var k = new FileReader();
      k.addEventListener("loadend", function() {
        var ca = k.result;
        if (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 8_/)) {
          var c = ca.indexOf("\xFF\xC2");
          (0 > c || 65536 < c) && W(b.strings.iOS8WebGLError);
        }
        c = ca.indexOf("<x:xmpmeta");
        if (-1 < c && !0 !== b.ignoreGPanoXMP) {
          var d = ca.substring(c, ca.indexOf("</x:xmpmeta>") + 12),
            e = function e(a) {
              var u;
              0 <= d.indexOf(a + '="') ? (u = d.substring(d.indexOf(a + '="') + a.length + 2), u = u.substring(0, u.indexOf('"'))) : 0 <= d.indexOf(a + ">") && (u = d.substring(d.indexOf(a + ">") + a.length + 1), u = u.substring(0, u.indexOf("<")));
              return u !== m ? Number(u) : null;
            },
            ca = e("GPano:FullPanoWidthPixels"),
            c = e("GPano:CroppedAreaImageWidthPixels"),
            f = e("GPano:FullPanoHeightPixels"),
            g = e("GPano:CroppedAreaImageHeightPixels"),
            h = e("GPano:CroppedAreaTopPixels"),
            l = e("GPano:PoseHeadingDegrees"),
            p = e("GPano:PosePitchDegrees"),
            e = e("GPano:PoseRollDegrees");
          null !== ca && null !== c && null !== f && null !== g && null !== h && (0 > da.indexOf("haov") && (b.haov = c / ca * 360), 0 > da.indexOf("vaov") && (b.vaov = g / f * 180), 0 > da.indexOf("vOffset") && (b.vOffset = -180 * ((h + g / 2) / f - 0.5)), null !== l && 0 > da.indexOf("northOffset") && (b.northOffset = l, !1 !== b.compass && (b.compass = !0)), null !== p && null !== e && (0 > da.indexOf("horizonPitch") && (b.horizonPitch = p), 0 > da.indexOf("horizonRoll") && (b.horizonRoll = e)));
        }
        O.src = J.URL.createObjectURL(a);
      });
      k.readAsBinaryString !== m ? k.readAsBinaryString(a) : k.readAsText(a);
    }

    function W(a) {
      a === m && (a = b.strings.genericWebGLError);
      n.errorMsg.innerHTML = "<p>" + a + "</p>";
      w.load.style.display = "none";
      n.load.box.style.display = "none";
      n.errorMsg.style.display = "table";
      Pa = !0;
      M.style.display = "none";
      ga("error", a);
    }

    function X(a) {
      var b = Y(a);
      ha.style.left = b.x + "px";
      ha.style.top = b.y + "px";
      clearTimeout(X.t1);
      clearTimeout(X.t2);
      ha.style.display = "block";
      ha.style.opacity = 1;
      X.t1 = setTimeout(function() {
        ha.style.opacity = 0;
      }, 2E3);
      X.t2 = setTimeout(function() {
        ha.style.display = "none";
      }, 2500);
      a.preventDefault();
    }

    function Y(a) {
      var b = r.getBoundingClientRect(),
        c = {};
      c.x = a.clientX - b.left;
      c.y = a.clientY - b.top;
      return c;
    }

    function Ca(a) {
      a.preventDefault();
      r.focus();
      if (L && b.draggable) {
        var k = Y(a);
        if (b.hotSpotDebug) {
          var c = sa(a);
          console.log("Pitch: " + c[0] + ", Yaw: " + c[1] + ", Center Pitch: " + b.pitch + ", Center Yaw: " + b.yaw + ", HFOV: " + b.hfov);
        }
        Ja();
        l();
        b.roll = 0;
        x.hfov = 0;
        la = !0;
        S = Date.now();
        xa = k.x;
        ya = k.y;
        Qa = b.yaw;
        Ra = b.pitch;
        C.classList.add("pnlm-grabbing");
        C.classList.remove("pnlm-grab");
        ga("mousedown", a);
        F();
      }
    }

    function ra(a) {
      b.minHfov === b.hfov ? za.setHfov(wa, 1E3) : (a = sa(a), za.lookAt(a[0], a[1], b.minHfov, 1E3));
    }

    function sa(a) {
      var k = Y(a);
      a = B.getCanvas();
      var c = a.clientWidth,
        d = a.clientHeight;
      a = k.x / c * 2 - 1;
      var d = (1 - k.y / d * 2) * d / c,
        e = 1 / Math.tan(b.hfov * Math.PI / 360),
        f = Math.sin(b.pitch * Math.PI / 180),
        g = Math.cos(b.pitch * Math.PI / 180),
        k = e * g - d * f,
        c = Math.sqrt(a * a + k * k),
        d = 180 * Math.atan((d * g + e * f) / c) / Math.PI;
      a = 180 * Math.atan2(a / c, k / c) / Math.PI + b.yaw; - 180 > a && (a += 360);
      180 < a && (a -= 360);
      return [d, a];
    }

    function La(a) {
      if (la && L) {
        S = Date.now();
        var k = B.getCanvas(),
          c = k.clientWidth,
          k = k.clientHeight;
        a = Y(a);
        var d = 180 * (Math.atan(xa / c * 2 - 1) - Math.atan(a.x / c * 2 - 1)) / Math.PI * b.hfov / 90 + Qa;
        x.yaw = (d - b.yaw) % 360 * 0.2;
        b.yaw = d;
        c = 360 * Math.atan(Math.tan(b.hfov / 360 * Math.PI) * k / c) / Math.PI;
        c = 180 * (Math.atan(a.y / k * 2 - 1) - Math.atan(ya / k * 2 - 1)) / Math.PI * c / 90 + Ra;
        x.pitch = 0.2 * (c - b.pitch);
        b.pitch = c;
      }
    }

    function ea(a) {
      la && (la = !1, 15 < Date.now() - S && (x.pitch = x.yaw = 0), C.classList.add("pnlm-grab"), C.classList.remove("pnlm-grabbing"), S = Date.now(), ga("mouseup", a));
    }

    function ta(a) {
      if (L && b.draggable) {
        Ja();
        l();
        b.roll = 0;
        x.hfov = 0;
        var k = Y(a.targetTouches[0]);
        xa = k.x;
        ya = k.y;
        if (2 == a.targetTouches.length) {
          var c = Y(a.targetTouches[1]);
          xa += 0.5 * (c.x - k.x);
          ya += 0.5 * (c.y - k.y);
          Fa = Math.sqrt((k.x - c.x) * (k.x - c.x) + (k.y - c.y) * (k.y - c.y));
        }
        la = !0;
        S = Date.now();
        Qa = b.yaw;
        Ra = b.pitch;
        ga("touchstart", a);
        F();
      }
    }

    function A(a) {
      if (b.draggable && (a.preventDefault(), L && (S = Date.now()), la && L)) {
        var k = Y(a.targetTouches[0]),
          c = k.x,
          d = k.y;
        2 == a.targetTouches.length && -1 != Fa && (a = Y(a.targetTouches[1]), c += 0.5 * (a.x - k.x), d += 0.5 * (a.y - k.y), k = Math.sqrt((k.x - a.x) * (k.x - a.x) + (k.y - a.y) * (k.y - a.y)), U(b.hfov + 0.1 * (Fa - k)), Fa = k);
        k = b.hfov / 360;
        c = (xa - c) * k + Qa;
        x.yaw = (c - b.yaw) % 360 * 0.2;
        b.yaw = c;
        d = (d - ya) * k + Ra;
        x.pitch = 0.2 * (d - b.pitch);
        b.pitch = d;
      }
    }

    function d() {
      la = !1;
      150 < Date.now() - S && (x.pitch = x.yaw = 0);
      Fa = -1;
      S = Date.now();
      ga("touchend", event);
    }

    function a(a) {
      "touch" == a.pointerType && (ma.push(a.pointerId), Aa.push({
        clientX: a.clientX,
        clientY: a.clientY
      }), a.targetTouches = Aa, ta(a), a.preventDefault());
    }

    function V(a) {
      if ("touch" == a.pointerType)
        for (var b = 0; b < ma.length; b++) {
          if (a.pointerId == ma[b]) {
            Aa[b].clientX = a.clientX;
            Aa[b].clientY = a.clientY;
            a.targetTouches = Aa;
            A(a);
            break;
          }
        }
    }

    function N(a) {
      if ("touch" == a.pointerType) {
        for (var b = !1, c = 0; c < ma.length; c++) {
          a.pointerId == ma[c] && (ma[c] = m), ma[c] && (b = !0);
        }
        b || (ma = [], Aa = [], d());
        a.preventDefault();
      }
    }

    function na(a) {
      L && ("fullscreenonly" != b.mouseZoom || Ga) && (a.preventDefault(), Ja(), S = Date.now(), a.wheelDeltaY ? (U(b.hfov - 0.05 * a.wheelDeltaY), x.hfov = 0 > a.wheelDelta ? 1 : -1) : a.wheelDelta ? (U(b.hfov - 0.05 * a.wheelDelta), x.hfov = 0 > a.wheelDelta ? 1 : -1) : a.detail && (U(b.hfov + 1.5 * a.detail), x.hfov = 0 < a.detail ? 1 : -1), F());
    }

    function R(a) {
      Ja();
      S = Date.now();
      l();
      b.roll = 0;
      var k = a.which || a.keycode;
      0 > Za.indexOf(k) || (a.preventDefault(), 27 == k ? Ga && z() : s(k, !0));
    }

    function ua() {
      for (var a = 0; 10 > a; a++) {
        q[a] = !1;
      }
    }

    function fa(a) {
      var b = a.which || a.keycode;
      0 > Za.indexOf(b) || (a.preventDefault(), s(b, !1));
    }

    function s(a, b) {
      var c = !1;
      switch (a) {
        case 109:
        case 189:
        case 17:
        case 173:
          q[0] != b && (c = !0);
          q[0] = b;
          break;
        case 107:
        case 187:
        case 16:
        case 61:
          q[1] != b && (c = !0);
          q[1] = b;
          break;
        case 38:
          q[2] != b && (c = !0);
          q[2] = b;
          break;
        case 87:
          q[6] != b && (c = !0);
          q[6] = b;
          break;
        case 40:
          q[3] != b && (c = !0);
          q[3] = b;
          break;
        case 83:
          q[7] != b && (c = !0);
          q[7] = b;
          break;
        case 37:
          q[4] != b && (c = !0);
          q[4] = b;
          break;
        case 65:
          q[8] != b && (c = !0);
          q[8] = b;
          break;
        case 39:
          q[5] != b && (c = !0);
          q[5] = b;
          break;
        case 68:
          q[9] != b && (c = !0), q[9] = b;
      }
      c && b && (ia = "undefined" !== typeof performance && performance.now() ? performance.now() : Date.now(), F());
    }

    function G() {
      if (L) {
        var a = !1,
          k = b.pitch,
          c = b.yaw,
          d = b.hfov,
          e;
        e = "undefined" !== typeof performance && performance.now() ? performance.now() : Date.now();
        ia === m && (ia = e);
        var f = (e - ia) * b.hfov / 1700,
          f = Math.min(f, 1);
        q[0] && !0 === b.keyboardZoom && (U(b.hfov + (0.8 * x.hfov + 0.5) * f), a = !0);
        q[1] && !0 === b.keyboardZoom && (U(b.hfov + (0.8 * x.hfov - 0.2) * f), a = !0);
        if (q[2] || q[6]) b.pitch += (0.8 * x.pitch + 0.2) * f, a = !0;
        if (q[3] || q[7]) b.pitch += (0.8 * x.pitch - 0.2) * f, a = !0;
        if (q[4] || q[8]) b.yaw += (0.8 * x.yaw - 0.2) * f, a = !0;
        if (q[5] || q[9]) b.yaw += (0.8 * x.yaw + 0.2) * f, a = !0;
        a && (S = Date.now());
        Date.now();
        if (b.autoRotate) {
          if (0.001 < e - ia) {
            var a = (e - ia) / 1E3,
              g = (x.yaw / a * f - 0.2 * b.autoRotate) * a,
              g = (0 < -b.autoRotate ? 1 : -1) * Math.min(Math.abs(b.autoRotate * a), Math.abs(g));
            b.yaw += g;
          }
          b.autoRotateStopDelay && (b.autoRotateStopDelay -= e - ia, 0 >= b.autoRotateStopDelay && (b.autoRotateStopDelay = !1, $ = b.autoRotate, b.autoRotate = 0));
        }
        K.pitch && (va("pitch"), k = b.pitch);
        K.yaw && (va("yaw"), c = b.yaw);
        K.hfov && (va("hfov"), d = b.hfov);
        0 < f && !b.autoRotate && (q[4] || q[5] || q[8] || q[9] || K.yaw || (b.yaw += x.yaw * f * 0.85), q[2] || q[3] || q[6] || q[7] || K.pitch || (b.pitch += x.pitch * f * 0.85), q[0] || q[1] || K.hfov || U(b.hfov + x.hfov * f * 0.85));
        ia = e;
        0 < f && (x.yaw = 0.8 * x.yaw + (b.yaw - c) / f * 0.2, x.pitch = 0.8 * x.pitch + (b.pitch - k) / f * 0.2, x.hfov = 0.8 * x.hfov + (b.hfov - d) / f * 0.2, k = b.autoRotate ? Math.abs(b.autoRotate) : 5, x.yaw = Math.min(k, Math.max(x.yaw, -k)), x.pitch = Math.min(k, Math.max(x.pitch, -k)), x.hfov = Math.min(k, Math.max(x.hfov, -k)));
        q[0] && q[0] && (x.hfov = 0);
        (q[2] || q[6]) && (q[3] || q[7]) && (x.pitch = 0);
        (q[4] || q[8]) && (q[5] || q[9]) && (x.yaw = 0);
      }
    }

    function va(a) {
      var k = K[a],
        c = Math.min(1, Math.max((Date.now() - k.startTime) / 1E3 / (k.duration / 1E3), 0)),
        c = k.startPosition + b.animationTimingFunction(c) * (k.endPosition - k.startPosition);
      if (k.endPosition > k.startPosition && c >= k.endPosition || k.endPosition < k.startPosition && c <= k.endPosition || k.endPosition === k.startPosition) {
        c = k.endPosition;
        x[a] = 0;
        var k = K[a].callback,
          d = K[a].callbackArgs;
        delete K[a];
        "function" == typeof k && k(d);
      }
      b[a] = c;
    }

    function ka() {
      y();
    }

    function F() {
      Ta || (Ta = !0, ba());
    }

    function ba() {
      Da();
      Ua && clearTimeout(Ua);
      if (la || !0 === aa) requestAnimationFrame(ba);
      else if (q[0] || q[1] || q[2] || q[3] || q[4] || q[5] || q[6] || q[7] || q[8] || q[9] || b.autoRotate || K.pitch || K.yaw || K.hfov || 0.01 < Math.abs(x.yaw) || 0.01 < Math.abs(x.pitch) || 0.01 < Math.abs(x.hfov)) G(), 0 <= b.autoRotateInactivityDelay && $ && Date.now() - S > b.autoRotateInactivityDelay && !b.autoRotate && (b.autoRotate = $, za.lookAt(Ea, m, wa, 3E3)), requestAnimationFrame(ba);
      else if (B && (B.isLoading() || !0 === b.dynamic && $a)) requestAnimationFrame(ba);
      else {
        Ta = !1;
        ia = m;
        var a = b.autoRotateInactivityDelay - (Date.now() - S);
        0 < a ? Ua = setTimeout(function() {
          b.autoRotate = $;
          za.lookAt(Ea, m, wa, 3E3);
          F();
        }, a) : 0 <= b.autoRotateInactivityDelay && $ && (b.autoRotate = $, za.lookAt(Ea, m, wa, 3E3), F());
      }
    }

    function Da() {
      var a;
      if (L) {
        180 < b.yaw ? b.yaw -= 360 : -180 > b.yaw && (b.yaw += 360);
        a = b.yaw;
        var k = b.maxYaw - b.minYaw,
          d = -180,
          e = 180;
        360 > k && (d = b.minYaw + b.hfov / 2, e = b.maxYaw - b.hfov / 2, k < b.hfov && (d = e = (d + e) / 2));
        b.yaw = Math.max(d, Math.min(e, b.yaw));
        !1 !== b.autoRotate && a != b.yaw && (b.autoRotate *= -1);
        a = B.getCanvas();
        a = 2 * Math.atan(Math.tan(b.hfov / 180 * Math.PI * 0.5) / (a.width / a.height)) / Math.PI * 180;
        k = b.minPitch + a / 2;
        d = b.maxPitch - a / 2;
        b.maxPitch - b.minPitch < a && (k = d = (k + d) / 2);
        isNaN(k) && (k = -90);
        isNaN(d) && (d = 90);
        b.pitch = Math.max(k, Math.min(d, b.pitch));
        B.render(b.pitch * Math.PI / 180, b.yaw * Math.PI / 180, b.hfov * Math.PI / 180, {
          roll: b.roll * Math.PI / 180
        });
        b.hotSpots.forEach(c);
        b.compass && (Ha.style.transform = "rotate(" + (-b.yaw - b.northOffset) + "deg)", Ha.style.webkitTransform = "rotate(" + (-b.yaw - b.northOffset) + "deg)");
      }
    }

    function Z(a, b, c, d) {
      this.w = a;
      this.x = b;
      this.y = c;
      this.z = d;
    }

    function Ma(a) {
      var c;
      c = a.alpha;
      var d = a.beta;
      a = a.gamma;
      d = [d ? d * Math.PI / 180 / 2 : 0, a ? a * Math.PI / 180 / 2 : 0, c ? c * Math.PI / 180 / 2 : 0];
      c = [Math.cos(d[0]), Math.cos(d[1]), Math.cos(d[2])];
      d = [Math.sin(d[0]), Math.sin(d[1]), Math.sin(d[2])];
      c = new Z(c[0] * c[1] * c[2] - d[0] * d[1] * d[2], d[0] * c[1] * c[2] - c[0] * d[1] * d[2], c[0] * d[1] * c[2] + d[0] * c[1] * d[2], c[0] * c[1] * d[2] + d[0] * d[1] * c[2]);
      c = c.multiply(new Z(Math.sqrt(0.5), -Math.sqrt(0.5), 0, 0));
      d = J.orientation ? -J.orientation * Math.PI / 180 / 2 : 0;
      c = c.multiply(new Z(Math.cos(d), 0, -Math.sin(d), 0)).toEulerAngles();
      "number" == typeof aa && 10 > aa ? aa += 1 : 10 === aa ? (ab = c[2] / Math.PI * 180 + b.yaw, aa = !0, requestAnimationFrame(ba)) : (b.pitch = c[0] / Math.PI * 180, b.roll = -c[1] / Math.PI * 180, b.yaw = -c[2] / Math.PI * 180 + ab);
    }

    function h() {
      try {
        var a = {};
        b.horizonPitch !== m && (a.horizonPitch = b.horizonPitch * Math.PI / 180);
        b.horizonRoll !== m && (a.horizonRoll = b.horizonRoll * Math.PI / 180);
        b.backgroundColor !== m && (a.backgroundColor = b.backgroundColor);
        B.init(O, b.type, b.dynamic, b.haov * Math.PI / 180, b.vaov * Math.PI / 180, b.vOffset * Math.PI / 180, e, a);
        !0 !== b.dynamic && (O = m);
      } catch (c) {
        if ("webgl error" == c.type || "no webgl" == c.type) W();
        else if ("webgl size error" == c.type) W(b.strings.textureSizeError.replace("%s", c.width).replace("%s", c.maxWidth));
        else throw W(b.strings.unknownError), c;
      }
    }

    function e() {
      if (b.sceneFadeDuration && B.fadeImg !== m) {
        B.fadeImg.style.opacity = 0;
        var a = B.fadeImg;
        delete B.fadeImg;
        setTimeout(function() {
          M.removeChild(a);
          ga("scenechangefadedone");
        }, b.sceneFadeDuration);
      }
      Ha.style.display = b.compass ? "inline" : "none";
      ja();
      n.load.box.style.display = "none";
      qa !== m && (M.removeChild(qa), qa = m);
      L = !0;
      ga("load");
      F();
    }

    function Ia(a) {
      a.pitch = Number(a.pitch) || 0;
      a.yaw = Number(a.yaw) || 0;
      var c = f.createElement("div");
      c.className = "pnlm-hotspot-base";
      c.className = a.cssClass ? c.className + (" " + a.cssClass) : c.className + (" pnlm-hotspot pnlm-sprite pnlm-" + D(a.type));
      var d = f.createElement("span");
      a.text && (d.innerHTML = D(a.text));
      var e;
      if (a.video) {
        e = f.createElement("video");
        var g = a.video;
        b.basePath && !oa(g) && (g = b.basePath + g);
        e.src = encodeURI(g);
        e.controls = !0;
        e.style.width = a.width + "px";
        M.appendChild(c);
        d.appendChild(e);
      } else if (a.image) {
        g = a.image;
        b.basePath && !oa(g) && (g = b.basePath + g);
        e = f.createElement("a");
        e.href = encodeURI(a.URL ? a.URL : g);
        e.target = "_blank";
        d.appendChild(e);
        var h = f.createElement("img");
        h.src = encodeURI(g);
        h.style.width = a.width + "px";
        h.style.paddingTop = "5px";
        M.appendChild(c);
        e.appendChild(h);
        d.style.maxWidth = "initial";
      } else a.URL ? (e = f.createElement("a"), e.href = encodeURI(a.URL), e.target = "_blank", M.appendChild(e), c.style.cursor = "pointer", d.style.cursor = "pointer", e.appendChild(c)) : (a.sceneId && (c.onclick = c.ontouchend = function() {
        c.clicked || (c.clicked = !0, I(a.sceneId, a.targetPitch, a.targetYaw, a.targetHfov));
        return !1;
      }, c.style.cursor = "pointer", d.style.cursor = "pointer"), M.appendChild(c));
      if (a.createTooltipFunc) a.createTooltipFunc(c, a.createTooltipArgs);
      else if (a.text || a.video || a.image) c.classList.add("pnlm-tooltip"), c.appendChild(d), d.style.width = d.scrollWidth - 20 + "px", d.style.marginLeft = -(d.scrollWidth - c.offsetWidth) / 2 + "px", d.style.marginTop = -d.scrollHeight - 12 + "px";
      a.clickHandlerFunc && (c.addEventListener("click", function(b) {
        a.clickHandlerFunc(b, a.clickHandlerArgs);
      }, "false"), c.style.cursor = "pointer", d.style.cursor = "pointer");
      a.div = c;
    }

    function ja() {
      Va || (b.hotSpots ? (b.hotSpots = b.hotSpots.sort(function(a, b) {
        return a.pitch < b.pitch;
      }), b.hotSpots.forEach(Ia)) : b.hotSpots = [], Va = !0, b.hotSpots.forEach(c));
    }

    function p() {
      var a = b.hotSpots;
      Va = !1;
      delete b.hotSpots;
      if (a)
        for (var c = 0; c < a.length; c++) {
          for (var d = a[c].div; d.parentNode != M;) {
            d = d.parentNode;
          }
          M.removeChild(d);
          delete a[c].div;
        }
    }

    function c(a) {
      var c = Math.sin(a.pitch * Math.PI / 180),
        d = Math.cos(a.pitch * Math.PI / 180),
        e = Math.sin(b.pitch * Math.PI / 180),
        f = Math.cos(b.pitch * Math.PI / 180),
        g = Math.cos((-a.yaw + b.yaw) * Math.PI / 180),
        h = c * e + d * g * f;
      if (90 >= a.yaw && -90 < a.yaw && 0 >= h || (90 < a.yaw || -90 >= a.yaw) && 0 >= h) a.div.style.visibility = "hidden";
      else {
        var l = Math.sin((-a.yaw + b.yaw) * Math.PI / 180),
          p = Math.tan(b.hfov * Math.PI / 360);
        a.div.style.visibility = "visible";
        var m = B.getCanvas(),
          n = m.clientWidth,
          m = m.clientHeight,
          c = [-n / p * l * d / h / 2, -n / p * (c * f - d * g * e) / h / 2],
          d = Math.sin(b.roll * Math.PI / 180),
          e = Math.cos(b.roll * Math.PI / 180),
          c = [c[0] * e - c[1] * d, c[0] * d + c[1] * e];
        c[0] += (n - a.div.offsetWidth) / 2;
        c[1] += (m - a.div.offsetHeight) / 2;
        n = "translate(" + c[0] + "px, " + c[1] + "px) translateZ(9999px) rotate(" + b.roll + "deg)";
        a.div.style.webkitTransform = n;
        a.div.style.MozTransform = n;
        a.div.style.transform = n;
      }
    }

    function g(a) {
      b = {};
      var c,
        d,
        e = "haov vaov vOffset northOffset horizonPitch horizonRoll".split(" ");
      da = [];
      for (c in Wa) {
        Wa.hasOwnProperty(c) && (b[c] = Wa[c]);
      }
      for (c in v.default) {
        if (v.default.hasOwnProperty(c))
          if ("strings" == c)
            for (d in v.default.strings) {
              v.default.strings.hasOwnProperty(d) && (b.strings[d] = D(v.default.strings[d]));
            } else b[c] = v.default[c], 0 <= e.indexOf(c) && da.push(c);
      }
      if (null !== a && "" !== a && v.scenes && v.scenes[a]) {
        var f = v.scenes[a];
        for (c in f) {
          if (f.hasOwnProperty(c))
            if ("strings" == c)
              for (d in f.strings) {
                f.strings.hasOwnProperty(d) && (b.strings[d] = D(f.strings[d]));
              } else b[c] = f[c], 0 <= e.indexOf(c) && da.push(c);
        }
        b.scene = a;
      }
      for (c in v) {
        if (v.hasOwnProperty(c))
          if ("strings" == c)
            for (d in v.strings) {
              v.strings.hasOwnProperty(d) && (b.strings[d] = D(v.strings[d]));
            } else b[c] = v[c], 0 <= e.indexOf(c) && da.push(c);
      }
    }

    function t(a) {
      if ((a = a ? a : !1) && "preview" in b) {
        var c = b.preview;
        b.basePath && !oa(c) && (c = b.basePath + c);
        qa = f.createElement("div");
        qa.className = "pnlm-preview-img";
        qa.style.backgroundImage = "url('" + encodeURI(c) + "')";
        M.appendChild(qa);
      }
      var c = b.title,
        d = b.author;
      a && ("previewTitle" in b && (b.title = b.previewTitle), "previewAuthor" in b && (b.author = b.previewAuthor));
      b.hasOwnProperty("title") || (n.title.innerHTML = "");
      b.hasOwnProperty("author") || (n.author.innerHTML = "");
      b.hasOwnProperty("title") || b.hasOwnProperty("author") || (n.container.style.display = "none");
      w.load.innerHTML = "<p>" + b.strings.loadButtonLabel + "</p>";
      n.load.boxp.innerHTML = b.strings.loadingLabel;
      for (var e in b) {
        if (b.hasOwnProperty(e)) switch (e) {
          case "title":
            n.title.innerHTML = D(b[e]);
            n.container.style.display = "inline";
            break;
          case "author":
            n.author.innerHTML = b.strings.bylineLabel.replace("%s", D(b[e]));
            n.container.style.display = "inline";
            break;
          case "fallback":
            n.errorMsg.innerHTML = '<p>Your browser does not support WebGL.<br><a href="' + encodeURI(b[e]) + '" target="_blank">Click here to view this panorama in an alternative viewer.</a></p>';
            break;
          case "hfov":
            U(Number(b[e]));
            break;
          case "autoLoad":
            !0 === b[e] && B === m && (n.load.box.style.display = "inline", w.load.style.display = "none", Na());
            break;
          case "showZoomCtrl":
            w.zoom.style.display = b[e] && !1 != b.showControls ? "block" : "none";
            break;
          case "showFullscreenCtrl":
            w.fullscreen.style.display = b[e] && !1 != b.showControls && ("fullscreen" in f || "mozFullScreen" in f || "webkitIsFullScreen" in f || "msFullscreenElement" in f) ? "block" : "none";
            break;
          case "hotSpotDebug":
            Xa.style.display = b[e] ? "block" : "none";
            break;
          case "showControls":
            b[e] || (w.orientation.style.display = "none", w.zoom.style.display = "none", w.fullscreen.style.display = "none");
            break;
          case "orientationOnByDefault":
            b[e] && (pa === m ? Ya = !0 : !0 === pa && Ka());
        }
      }
      a && (c ? b.title = c : delete b.title, d ? b.author = d : delete b.author);
    }

    function z() {
      if (L && !Pa)
        if (Ga) f.exitFullscreen ? f.exitFullscreen() : f.mozCancelFullScreen ? f.mozCancelFullScreen() : f.webkitCancelFullScreen ? f.webkitCancelFullScreen() : f.msExitFullscreen && f.msExitFullscreen();
        else try {
          r.requestFullscreen ? r.requestFullscreen() : r.mozRequestFullScreen ? r.mozRequestFullScreen() : r.msRequestFullscreen ? r.msRequestFullscreen() : r.webkitRequestFullScreen();
        } catch (a) {}
    }

    function y() {
      f.fullscreen || f.mozFullScreen || f.webkitIsFullScreen || f.msFullscreenElement ? (w.fullscreen.classList.add("pnlm-fullscreen-toggle-button-active"), Ga = !0) : (w.fullscreen.classList.remove("pnlm-fullscreen-toggle-button-active"), Ga = !1);
      B.resize();
      U(b.hfov);
      F();
    }

    function E(a) {
      var c = b.minHfov;
      "multires" == b.type && B && (c = Math.min(c, B.getCanvas().width / (b.multiRes.cubeResolution / 90 * 0.9)));
      return c > b.maxHfov ? (console.log("HFOV bounds do not make sense (minHfov > maxHfov)."), b.hfov) : a < c ? c : a > b.maxHfov ? b.maxHfov : a;
    }

    function U(a) {
      b.hfov = E(a);
    }

    function Ja() {
      K = {};
      $ = b.autoRotate ? b.autoRotate : $;
      b.autoRotate = !1;
    }

    function Q() {
      Pa && (n.load.box.style.display = "none", n.errorMsg.style.display = "none", Pa = !1, ga("errorcleared"));
      w.load.style.display = "none";
      n.load.box.style.display = "inline";
      Na();
    }

    function I(a, c, d, e, f) {
      L = !1;
      K = {};
      var h, l;
      if (b.sceneFadeDuration && !f && (h = B.render(b.pitch * Math.PI / 180, b.yaw * Math.PI / 180, b.hfov * Math.PI / 180, {
          returnImage: !0
        }), h !== m)) {
        f = new Image();
        f.className = "pnlm-fade-img";
        f.style.transition = "opacity " + b.sceneFadeDuration / 1E3 + "s";
        f.style.width = "100%";
        f.style.height = "100%";
        f.onload = function() {
          I(a, c, d, e, !0);
        };
        f.src = h;
        M.appendChild(f);
        B.fadeImg = f;
        return;
      }
      f = "same" === c ? b.pitch : c;
      h = "same" === d ? b.yaw : "sameAzimuth" === d ? b.yaw + (b.northOffset || 0) - (v.scenes[a].northOffset || 0) : d;
      l = "same" === e ? b.hfov : e;
      p();
      g(a);
      x.yaw = x.pitch = x.hfov = 0;
      t();
      f !== m && (b.pitch = f);
      h !== m && (b.yaw = h);
      l !== m && (b.hfov = l);
      ga("scenechange", a);
      Q();
    }

    function l() {
      J.removeEventListener("deviceorientation", Ma);
      w.orientation.classList.remove("pnlm-orientation-button-active");
      aa = !1;
    }

    function Ka() {
      aa = 1;
      J.addEventListener("deviceorientation", Ma);
      w.orientation.classList.add("pnlm-orientation-button-active");
    }

    function D(a) {
      return v.escapeHTML ? String(a).split(/&/g).join("&amp;").split('"').join("&quot;").split("'").join("&#39;").split("<").join("&lt;").split(">").join("&gt;").split("/").join("&#x2f;").split("\n").join("<br>") : String(a).split("\n").join("<br>");
    }

    function ga(a) {
      if (a in T)
        for (var b = T[a].length; 0 < b; b--) {
          T[a][T[a].length - b].apply(null, [].slice.call(arguments, 1));
        }
    }
    var za = this,
      b,
      B,
      qa,
      la = !1,
      S = Date.now(),
      xa = 0,
      ya = 0,
      Fa = -1,
      Qa = 0,
      Ra = 0,
      q = Array(10),
      Ga = !1,
      L = !1,
      Pa = !1,
      Sa = !1,
      O,
      ia,
      x = {
        yaw: 0,
        pitch: 0,
        hfov: 0
      },
      Ta = !1,
      aa = !1,
      ab = 0,
      Ua,
      $ = 0,
      wa,
      Ea,
      K = {},
      T = {},
      da = [],
      $a = !1,
      Va = !1,
      Wa = {
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        pitch: 0,
        minPitch: m,
        maxPitch: m,
        yaw: 0,
        minYaw: -180,
        maxYaw: 180,
        roll: 0,
        haov: 360,
        vaov: 180,
        vOffset: 0,
        autoRotate: !1,
        autoRotateInactivityDelay: -1,
        autoRotateStopDelay: m,
        type: "equirectangular",
        northOffset: 0,
        showFullscreenCtrl: !0,
        dynamic: !1,
        doubleClickZoom: !0,
        keyboardZoom: !0,
        mouseZoom: !0,
        showZoomCtrl: !0,
        autoLoad: !1,
        showControls: !0,
        orientationOnByDefault: !1,
        hotSpotDebug: !1,
        backgroundColor: [0, 0, 0],
        animationTimingFunction: function animationTimingFunction(a) {
          return 0.5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a;
        },
        draggable: !0,
        disableKeyboardCtrl: !1,
        crossOrigin: "anonymous",
        strings: {
          loadButtonLabel: "Click to<br>Load<br>Panorama",
          loadingLabel: "Loading...",
          bylineLabel: "by %s",
          noPanoramaError: "No panorama image was specified.",
          fileAccessError: "The file %s could not be accessed.",
          malformedURLError: "There is something wrong with the panorama URL.",
          iOS8WebGLError: "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
          genericWebGLError: "Your browser does not have the necessary WebGL support to display this panorama.",
          textureSizeError: "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
          unknownError: "Unknown error. Check developer console."
        }
      },
      Za = [16, 17, 27, 37, 38, 39, 40, 61, 65, 68, 83, 87, 107, 109, 173, 187, 189];
    r = "string" === typeof r ? f.getElementById(r) : r;
    r.classList.add("pnlm-container");
    r.tabIndex = 0;
    var C = f.createElement("div");
    C.className = "pnlm-ui";
    r.appendChild(C);
    var M = f.createElement("div");
    M.className = "pnlm-render-container";
    r.appendChild(M);
    var H = f.createElement("div");
    H.className = "pnlm-dragfix";
    C.appendChild(H);
    var ha = f.createElement("span");
    ha.className = "pnlm-about-msg";
    ha.innerHTML = '<a href="https://pannellum.org/" target="_blank">Pannellum</a> 2.4.0';
    C.appendChild(ha);
    H.addEventListener("contextmenu", X);
    var n = {},
      Xa = f.createElement("div");
    Xa.className = "pnlm-sprite pnlm-hot-spot-debug-indicator";
    C.appendChild(Xa);
    n.container = f.createElement("div");
    n.container.className = "pnlm-panorama-info";
    n.title = f.createElement("div");
    n.title.className = "pnlm-title-box";
    n.container.appendChild(n.title);
    n.author = f.createElement("div");
    n.author.className = "pnlm-author-box";
    n.container.appendChild(n.author);
    C.appendChild(n.container);
    n.load = {};
    n.load.box = f.createElement("div");
    n.load.box.className = "pnlm-load-box";
    n.load.boxp = f.createElement("p");
    n.load.box.appendChild(n.load.boxp);
    n.load.lbox = f.createElement("div");
    n.load.lbox.className = "pnlm-lbox";
    n.load.lbox.innerHTML = '<div class="pnlm-loading"></div>';
    n.load.box.appendChild(n.load.lbox);
    n.load.lbar = f.createElement("div");
    n.load.lbar.className = "pnlm-lbar";
    n.load.lbarFill = f.createElement("div");
    n.load.lbarFill.className = "pnlm-lbar-fill";
    n.load.lbar.appendChild(n.load.lbarFill);
    n.load.box.appendChild(n.load.lbar);
    n.load.msg = f.createElement("p");
    n.load.msg.className = "pnlm-lmsg";
    n.load.box.appendChild(n.load.msg);
    C.appendChild(n.load.box);
    n.errorMsg = f.createElement("div");
    n.errorMsg.className = "pnlm-error-msg pnlm-info-box";
    C.appendChild(n.errorMsg);
    var w = {};
    w.container = f.createElement("div");
    w.container.className = "pnlm-controls-container";
    C.appendChild(w.container);
    w.load = f.createElement("div");
    w.load.className = "pnlm-load-button";
    w.load.addEventListener("click", function() {
      t();
      Q();
    });
    C.appendChild(w.load);
    w.zoom = f.createElement("div");
    w.zoom.className = "pnlm-zoom-controls pnlm-controls";
    w.zoomIn = f.createElement("div");
    w.zoomIn.className = "pnlm-zoom-in pnlm-sprite pnlm-control";
    w.zoomIn.addEventListener("click", function() {
      L && (U(b.hfov - 5), F());
    });
    w.zoom.appendChild(w.zoomIn);
    w.zoomOut = f.createElement("div");
    w.zoomOut.className = "pnlm-zoom-out pnlm-sprite pnlm-control";
    w.zoomOut.addEventListener("click", function() {
      L && (U(b.hfov + 5), F());
    });
    w.zoom.appendChild(w.zoomOut);
    w.container.appendChild(w.zoom);
    w.fullscreen = f.createElement("div");
    w.fullscreen.addEventListener("click", z);
    w.fullscreen.className = "pnlm-fullscreen-toggle-button pnlm-sprite pnlm-fullscreen-toggle-button-inactive pnlm-controls pnlm-control";
    (f.fullscreenEnabled || f.mozFullScreenEnabled || f.webkitFullscreenEnabled || f.msFullscreenEnabled) && w.container.appendChild(w.fullscreen);
    w.orientation = f.createElement("div");
    w.orientation.addEventListener("click", function(a) {
      aa ? l() : Ka();
    });
    w.orientation.addEventListener("mousedown", function(a) {
      a.stopPropagation();
    });
    w.orientation.addEventListener("touchstart", function(a) {
      a.stopPropagation();
    });
    w.orientation.addEventListener("pointerdown", function(a) {
      a.stopPropagation();
    });
    w.orientation.className = "pnlm-orientation-button pnlm-orientation-button-inactive pnlm-sprite pnlm-controls pnlm-control";
    var pa,
      Ya = !1;
    J.DeviceOrientationEvent ? J.addEventListener("deviceorientation", Oa) : pa = !1;
    var Ha = f.createElement("div");
    Ha.className = "pnlm-compass pnlm-controls pnlm-control";
    C.appendChild(Ha);
    v.firstScene ? g(v.firstScene) : v.default && v.default.firstScene ? g(v.default.firstScene) : g(null);
    t(!0);
    var ma = [],
      Aa = [];
    Z.prototype.multiply = function(a) {
      return new Z(this.w * a.w - this.x * a.x - this.y * a.y - this.z * a.z, this.x * a.w + this.w * a.x + this.y * a.z - this.z * a.y, this.y * a.w + this.w * a.y + this.z * a.x - this.x * a.z, this.z * a.w + this.w * a.z + this.x * a.y - this.y * a.x);
    };
    Z.prototype.toEulerAngles = function() {
      var a = Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y)),
        b = Math.asin(2 * (this.w * this.y - this.z * this.x)),
        c = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z));
      return [a, b, c];
    };
    this.isLoaded = function() {
      return L;
    };
    this.getPitch = function() {
      return b.pitch;
    };
    this.setPitch = function(a, c, d, e) {
      (c = c == m ? 1E3 : Number(c)) ? K.pitch = {
        startTime: Date.now(),
        startPosition: b.pitch,
        endPosition: a,
        duration: c,
        callback: d,
        callbackArgs: e
      }: b.pitch = a;
      F();
      return this;
    };
    this.getPitchBounds = function() {
      return [b.minPitch, b.maxPitch];
    };
    this.setPitchBounds = function(a) {
      b.minPitch = Math.max(-90, Math.min(a[0], 90));
      b.maxPitch = Math.max(-90, Math.min(a[1], 90));
      return this;
    };
    this.getYaw = function() {
      return b.yaw;
    };
    this.setYaw = function(a, c, d, e) {
      c = c == m ? 1E3 : Number(c);
      a = (a + 180) % 360 - 180;
      c ? (180 < b.yaw - a ? a += 360 : 180 < a - b.yaw && (a -= 360), K.yaw = {
        startTime: Date.now(),
        startPosition: b.yaw,
        endPosition: a,
        duration: c,
        callback: d,
        callbackArgs: e
      }) : b.yaw = a;
      F();
      return this;
    };
    this.getYawBounds = function() {
      return [b.minYaw, b.maxYaw];
    };
    this.setYawBounds = function(a) {
      b.minYaw = Math.max(-180, Math.min(a[0], 180));
      b.maxYaw = Math.max(-180, Math.min(a[1], 180));
      return this;
    };
    this.getHfov = function() {
      return b.hfov;
    };
    this.setHfov = function(a, c, d, e) {
      (c = c == m ? 1E3 : Number(c)) ? K.hfov = {
        startTime: Date.now(),
        startPosition: b.hfov,
        endPosition: E(a),
        duration: c,
        callback: d,
        callbackArgs: e
      }: U(a);
      F();
      return this;
    };
    this.getHfovBounds = function() {
      return [b.minHfov, b.maxHfov];
    };
    this.setHfovBounds = function(a) {
      b.minHfov = Math.max(0, a[0]);
      b.maxHfov = Math.max(0, a[1]);
      return this;
    };
    this.lookAt = function(a, b, c, d, e, f) {
      d = d == m ? 1E3 : Number(d);
      a !== m && (this.setPitch(a, d, e, f), e = m);
      b !== m && (this.setYaw(b, d, e, f), e = m);
      c !== m && this.setHfov(c, d, e, f);
      return this;
    };
    this.getNorthOffset = function() {
      return b.northOffset;
    };
    this.setNorthOffset = function(a) {
      b.northOffset = Math.min(360, Math.max(0, a));
      F();
      return this;
    };
    this.getHorizonRoll = function() {
      return b.horizonRoll;
    };
    this.setHorizonRoll = function(a) {
      b.horizonRoll = Math.min(90, Math.max(-90, a));
      B.setPose(b.horizonPitch * Math.PI / 180, b.horizonRoll * Math.PI / 180);
      F();
      return this;
    };
    this.getHorizonPitch = function() {
      return b.horizonPitch;
    };
    this.setHorizonPitch = function(a) {
      b.horizonPitch = Math.min(90, Math.max(-90, a));
      B.setPose(b.horizonPitch * Math.PI / 180, b.horizonRoll * Math.PI / 180);
      F();
      return this;
    };
    this.startAutoRotate = function(a) {
      a = a || $ || 1;
      b.autoRotate = a;
      za.lookAt(Ea, m, wa, 3E3);
      F();
      return this;
    };
    this.stopAutoRotate = function() {
      $ = b.autoRotate ? b.autoRotate : $;
      b.autoRotate = !1;
      b.autoRotateInactivityDelay = -1;
      return this;
    };
    this.getRenderer = function() {
      return B;
    };
    this.setUpdate = function(a) {
      $a = !0 === a;
      B === m ? P() : F();
      return this;
    };
    this.mouseEventToCoords = function(a) {
      return sa(a);
    };
    this.loadScene = function(a, b, c, d) {
      L && I(a, b, c, d);
      return this;
    };
    this.getScene = function() {
      return b.scene;
    };
    this.addScene = function(a, b) {
      v.scenes[a] = b;
      return this;
    };
    this.removeScene = function(a) {
      if (b.scene === a || !v.scenes.hasOwnProperty(a)) return !1;
      delete v.scenes[a];
      return !0;
    };
    this.toggleFullscreen = function() {
      z();
      return this;
    };
    this.getConfig = function() {
      return b;
    };
    this.getContainer = function() {
      return r;
    };
    this.addHotSpot = function(a, d) {
      if (d === m && b.scene === m) b.hotSpots.push(a);
      else {
        var e = d !== m ? d : b.scene;
        if (v.scenes.hasOwnProperty(e)) v.scenes[e].hasOwnProperty("hotSpots") || (v.scenes[e].hotSpots = [], e == b.scene && (b.hotSpots = v.scenes[e].hotSpots)), v.scenes[e].hotSpots.push(a);
        else throw "Invalid scene ID!";
      }
      if (d === m || b.scene == d) Ia(a), L && c(a);
      return this;
    };
    this.removeHotSpot = function(a) {
      if (!b.hotSpots) return !1;
      for (var c = 0; c < b.hotSpots.length; c++) {
        if (b.hotSpots[c].hasOwnProperty("id") && b.hotSpots[c].id === a) {
          for (a = b.hotSpots[c].div; a.parentNode != M;) {
            a = a.parentNode;
          }
          M.removeChild(a);
          delete b.hotSpots[c].div;
          b.hotSpots.splice(c, 1);
          return !0;
        }
      }
      return !1;
    };
    this.resize = function() {
      y();
    };
    this.isLoaded = function() {
      return L;
    };
    this.isOrientationSupported = function() {
      return pa || !1;
    };
    this.stopOrientation = function() {
      l();
    };
    this.startOrientation = function() {
      pa && Ka();
    };
    this.isOrientationActive = function() {
      return Boolean(aa);
    };
    this.on = function(a, b) {
      T[a] = T[a] || [];
      T[a].push(b);
      return this;
    };
    this.off = function(a, b) {
      if (!a) return T = {}, this;
      if (b) {
        var c = T[a].indexOf(b);
        0 <= c && T[a].splice(c, 1);
        0 == T[a].length && delete T[a];
      } else delete T[a];
      return this;
    };
    this.destroy = function() {
      B && B.destroy();
      Sa && (H.removeEventListener("mousedown", Ca, !1), H.removeEventListener("dblclick", ra, !1), f.removeEventListener("mousemove", La, !1), f.removeEventListener("mouseup", ea, !1), r.removeEventListener("mousewheel", na, !1), r.removeEventListener("DOMMouseScroll", na, !1), r.removeEventListener("mozfullscreenchange", y, !1), r.removeEventListener("webkitfullscreenchange", y, !1), r.removeEventListener("msfullscreenchange", y, !1), r.removeEventListener("fullscreenchange", y, !1), J.removeEventListener("resize", ka, !1), J.removeEventListener("orientationchange", ka, !1), r.removeEventListener("keydown", R, !1), r.removeEventListener("keyup", fa, !1), r.removeEventListener("blur", ua, !1), f.removeEventListener("mouseleave", ea, !1), H.removeEventListener("touchstart", ta, !1), H.removeEventListener("touchmove", A, !1), H.removeEventListener("touchend", d, !1), H.removeEventListener("pointerdown", a, !1), H.removeEventListener("pointermove", V, !1), H.removeEventListener("pointerup", N, !1), H.removeEventListener("pointerleave", N, !1));
      r.innerHTML = "";
      r.classList.remove("pnlm-container");
      C.classList.remove("pnlm-grab");
      C.classList.remove("pnlm-grabbing");
    };
  }
  return {
    viewer: function viewer(f, m) {
      return new Ba(f, m);
    }
  };
}(window, document);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;
(function(factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function($) {
  'use strict';

  var Slick = window.Slick || {};

  Slick = function() {

    var instanceUid = 0;

    function Slick(element, settings) {

      var _ = this,
        dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function customPaging(slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };

      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };

      $.extend(_, _.initials);

      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;

      dataSettings = $(element).data('slick') || {};

      _.options = $.extend({}, _.defaults, settings, dataSettings);

      _.currentSlide = _.options.initialSlide;

      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);

      _.instanceUid = instanceUid++;

      // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source
      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

      _.registerBreakpoints();
      _.init(true);
    }

    return Slick;
  }();

  Slick.prototype.activateADA = function() {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

    var _ = this;

    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }

    _.unload();

    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function(index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.animateHeight = function() {
    var _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function(targetLeft, callback) {

    var animProps = {},
      _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }
    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {

      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }
        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function step(now) {
            now = Math.ceil(now);
            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';
              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';
              _.$slideTrack.css(animProps);
            }
          },
          complete: function complete() {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {

        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }
        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function() {

            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }
      }
    }
  };

  Slick.prototype.getNavTarget = function() {

    var _ = this,
      asNavFor = _.options.asNavFor;

    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;
  };

  Slick.prototype.asNavFor = function(index) {

    var _ = this,
      asNavFor = _.getNavTarget();

    if (asNavFor !== null && (typeof asNavFor === 'undefined' ? 'undefined' : _typeof(asNavFor)) === 'object') {
      asNavFor.each(function() {
        var target = $(this).slick('getSlick');
        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };

  Slick.prototype.applyTransition = function(slide) {

    var _ = this,
      transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.autoPlay = function() {

    var _ = this;

    _.autoPlayClear();

    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };

  Slick.prototype.autoPlayClear = function() {

    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };

  Slick.prototype.autoPlayIterator = function() {

    var _ = this,
      slideTo = _.currentSlide + _.options.slidesToScroll;

    if (!_.paused && !_.interrupted && !_.focussed) {

      if (_.options.infinite === false) {

        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {

          slideTo = _.currentSlide - _.options.slidesToScroll;

          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }

      _.slideHandler(slideTo);
    }
  };

  Slick.prototype.buildArrows = function() {

    var _ = this;

    if (_.options.arrows === true) {

      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if (_.slideCount > _.options.slidesToShow) {

        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {

        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };

  Slick.prototype.buildDots = function() {

    var _ = this,
      i,
      dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');
    }
  };

  Slick.prototype.buildOut = function() {

    var _ = this;

    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

    _.slideCount = _.$slides.length;

    _.$slides.each(function(index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };

  Slick.prototype.buildRows = function() {

    var _ = this,
      a,
      b,
      c,
      newSlides,
      numOfSlides,
      originalSlides,
      slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if (_.options.rows > 0) {

      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');
        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');
          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }
          slide.appendChild(row);
        }
        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);
      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };

  Slick.prototype.checkResponsive = function(initial, forceUpdate) {

    var _ = this,
      breakpoint,
      targetBreakpoint,
      respondToWidth,
      triggerBreakpoint = false;
    var sliderWidth = _.$slider.width();
    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }
              _.refresh(initial);
            }
            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }
            _.refresh(initial);
          }
          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;
          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }
          _.refresh(initial);
          triggerBreakpoint = targetBreakpoint;
        }
      }

      // only trigger breakpoints during an actual break. not on initialize.
      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };

  Slick.prototype.changeSlide = function(event, dontAnimate) {

    var _ = this,
      $target = $(event.currentTarget),
      indexOffset,
      slideOffset,
      unevenOffset;

    // If target is a link, prevent default action.
    if ($target.is('a')) {
      event.preventDefault();
    }

    // If target is not the <li> element (ie: a child), find the <li>.
    if (!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {

      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }
        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }
        break;

      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
        $target.children().trigger('focus');
        break;

      default:
        return;
    }
  };

  Slick.prototype.checkNavigable = function(index) {

    var _ = this,
      navigables,
      prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;
    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }
        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function() {

    var _ = this;

    if (_.options.dots && _.$dots !== null) {

      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };

  Slick.prototype.cleanUpSlideEvents = function() {

    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };

  Slick.prototype.cleanUpRows = function() {

    var _ = this,
      originalSlides;

    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');
      _.$slider.empty().append(originalSlides);
    }
  };

  Slick.prototype.clickHandler = function(event) {

    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  Slick.prototype.destroy = function(refresh) {

    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.$prevArrow.length) {

      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }

    if (_.$nextArrow && _.$nextArrow.length) {

      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }

    if (_.$slides) {

      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function() {
        $(this).attr('style', $(this).data('originalStyling'));
      });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');
    _.$slider.removeClass('slick-initialized');
    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };

  Slick.prototype.disableTransition = function(slide) {

    var _ = this,
      transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.fadeSlide = function(slideIndex, callback) {

    var _ = this;

    if (_.cssTransitions === false) {

      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {

      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function() {

          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }
    }
  };

  Slick.prototype.fadeSlideOut = function(slideIndex) {

    var _ = this;

    if (_.cssTransitions === false) {

      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {

      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

    var _ = this;

    if (filter !== null) {

      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.focusHandler = function() {

    var _ = this;

    // If any child element receives focus within the slider we need to pause the autoplay
    _.$slider.off('focus.slick blur.slick').on('focus.slick', '*', function(event) {
      var $sf = $(this);

      setTimeout(function() {
        if (_.options.pauseOnFocus) {
          if ($sf.is(':focus')) {
            _.focussed = true;
            _.autoPlay();
          }
        }
      }, 0);
    }).on('blur.slick', '*', function(event) {
      var $sf = $(this);

      // When a blur occurs on any elements within the slider we become unfocused
      if (_.options.pauseOnFocus) {
        _.focussed = false;
        _.autoPlay();
      }
    });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

    var _ = this;
    return _.currentSlide;
  };

  Slick.prototype.getDotCount = function() {

    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;
  };

  Slick.prototype.getLeft = function(slideIndex) {

    var _ = this,
      targetLeft,
      verticalHeight,
      verticalOffset = 0,
      targetSlide,
      coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }
        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }

    if (_.options.variableWidth === true) {

      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;
  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

    var _ = this;

    return _.options[option];
  };

  Slick.prototype.getNavigableIndexes = function() {

    var _ = this,
      breakPoint = 0,
      counter = 0,
      indexes = [],
      max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;
  };

  Slick.prototype.getSlick = function() {

    return this;
  };

  Slick.prototype.getSlideCount = function() {

    var _ = this,
      slidesTraversed,
      swipedSlide,
      swipeTarget,
      centerOffset;

    centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
    swipeTarget = _.swipeLeft * -1 + centerOffset;

    if (_.options.swipeToSlide === true) {

      _.$slideTrack.find('.slick-slide').each(function(index, slide) {

        var slideOuterWidth, slideOffset, slideRightBoundary;
        slideOuterWidth = $(slide).outerWidth();
        slideOffset = slide.offsetLeft;
        if (_.options.centerMode !== true) {
          slideOffset += slideOuterWidth / 2;
        }

        slideRightBoundary = slideOffset + slideOuterWidth;

        if (swipeTarget < slideRightBoundary) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };

  Slick.prototype.init = function(creation) {

    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {

      $(_.$slider).addClass('slick-initialized');

      _.buildRows();
      _.buildOut();
      _.setProps();
      _.startLoad();
      _.loadSlider();
      _.initializeEvents();
      _.updateArrows();
      _.updateDots();
      _.checkResponsive(true);
      _.focusHandler();
    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if (_.options.autoplay) {

      _.paused = false;
      _.autoPlay();
    }
  };

  Slick.prototype.initADA = function() {
    var _ = this,
      numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
      tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
        return val >= 0 && val < _.slideCount;
      });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);

        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function(i) {
        var mappedSlideIndex = tabControlIndexes[i];

        $(this).attr({
          'role': 'presentation'
        });

        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();
  };

  Slick.prototype.initArrowEvents = function() {

    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);
      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);
        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };

  Slick.prototype.initDotEvents = function() {

    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initSlideEvents = function() {

    var _ = this;

    if (_.options.pauseOnHover) {

      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initializeEvents = function() {

    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();
    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);
    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);
    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);
    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };

  Slick.prototype.initUI = function() {

    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

      _.$prevArrow.show();
      _.$nextArrow.show();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

      _.$dots.show();
    }
  };

  Slick.prototype.keyHandler = function(event) {

    var _ = this;
    //Dont slide if the cursor is inside the form fields and arrow keys are pressed
    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };

  Slick.prototype.lazyLoad = function() {

    var _ = this,
      loadRange,
      cloneRange,
      rangeStart,
      rangeEnd;

    function loadImages(imagesScope) {

      $('img[data-lazy]', imagesScope).each(function() {

        var image = $(this),
          imageSource = $(this).attr('data-lazy'),
          imageSrcSet = $(this).attr('data-srcset'),
          imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
          imageToLoad = document.createElement('img');

        imageToLoad.onload = function() {

          image.animate({
            opacity: 0
          }, 100, function() {

            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);

              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }

            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function() {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });
            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };

        imageToLoad.onerror = function() {

          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };

        imageToLoad.src = imageSource;
      });
    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
        nextSlide = rangeEnd,
        $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };

  Slick.prototype.loadSlider = function() {

    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };

  Slick.prototype.next = Slick.prototype.slickNext = function() {

    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };

  Slick.prototype.orientationChange = function() {

    var _ = this;

    _.checkResponsive();
    _.setPosition();
  };

  Slick.prototype.pause = Slick.prototype.slickPause = function() {

    var _ = this;

    _.autoPlayClear();
    _.paused = true;
  };

  Slick.prototype.play = Slick.prototype.slickPlay = function() {

    var _ = this;

    _.autoPlay();
    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };

  Slick.prototype.postSlide = function(index) {

    var _ = this;

    if (!_.unslicked) {

      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if (_.options.autoplay) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function() {

    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };

  Slick.prototype.preventDefault = function(event) {

    event.preventDefault();
  };

  Slick.prototype.progressiveLazyLoad = function(tryCount) {

    tryCount = tryCount || 1;

    var _ = this,
      $imgsToLoad = $('img[data-lazy]', _.$slider),
      image,
      imageSource,
      imageSrcSet,
      imageSizes,
      imageToLoad;

    if ($imgsToLoad.length) {

      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function() {

        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);

          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }

        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
        _.progressiveLazyLoad();
      };

      imageToLoad.onerror = function() {

        if (tryCount < 3) {

          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function() {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {

          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

          _.progressiveLazyLoad();
        }
      };

      imageToLoad.src = imageSource;
    } else {

      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };

  Slick.prototype.refresh = function(initializing) {

    var _ = this,
      currentSlide,
      lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow;

    // in non-infinite sliders, we don't want to go past the
    // last visible index.
    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    }

    // if less slides than to show, go to start.
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });

    _.init();

    if (!initializing) {

      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };

  Slick.prototype.registerBreakpoints = function() {

    var _ = this,
      breakpoint,
      currentBreakpoint,
      l,
      responsiveSettings = _.options.responsive || null;

    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

      _.respondTo = _.options.respondTo || 'window';

      for (breakpoint in responsiveSettings) {

        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

          // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.
          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }
            l--;
          }

          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function(a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };

  Slick.prototype.reinit = function() {

    var _ = this;

    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();
    _.setupInfinite();
    _.buildArrows();
    _.updateArrows();
    _.initArrowEvents();
    _.buildDots();
    _.updateDots();
    _.initDotEvents();
    _.cleanUpSlideEvents();
    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();
    _.focusHandler();

    _.paused = !_.options.autoplay;
    _.autoPlay();

    _.$slider.trigger('reInit', [_]);
  };

  Slick.prototype.resize = function() {

    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function() {
        _.windowWidth = $(window).width();
        _.checkResponsive();
        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

    var _ = this;

    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.setCSS = function(position) {

    var _ = this,
      positionProps = {},
      x,
      y;

    if (_.options.rtl === true) {
      position = -position;
    }
    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};
      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
        _.$slideTrack.css(positionProps);
      }
    }
  };

  Slick.prototype.setDimensions = function() {

    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();

    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);
      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };

  Slick.prototype.setFade = function() {

    var _ = this,
      targetLeft;

    _.$slides.each(function(index, element) {
      targetLeft = _.slideWidth * index * -1;
      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };

  Slick.prototype.setHeight = function() {

    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.css('height', targetHeight);
    }
  };

  Slick.prototype.setOption = Slick.prototype.slickSetOption = function() {

    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */

    var _ = this,
      l,
      item,
      option,
      value,
      refresh = false,
      type;

    if ($.type(arguments[0]) === 'object') {

      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {

      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];

      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {

        type = 'single';
      }
    }

    if (type === 'single') {

      _.options[option] = value;
    } else if (type === 'multiple') {

      $.each(option, function(opt, val) {

        _.options[opt] = val;
      });
    } else if (type === 'responsive') {

      for (item in value) {

        if ($.type(_.options.responsive) !== 'array') {

          _.options.responsive = [value[item]];
        } else {

          l = _.options.responsive.length - 1;

          // loop through the responsive object and splice out duplicates.
          while (l >= 0) {

            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

              _.options.responsive.splice(l, 1);
            }

            l--;
          }

          _.options.responsive.push(value[item]);
        }
      }
    }

    if (refresh) {

      _.unload();
      _.reinit();
    }
  };

  Slick.prototype.setPosition = function() {

    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);
  };

  Slick.prototype.setProps = function() {

    var _ = this,
      bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }
    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }
    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }
    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };

  Slick.prototype.setSlideClasses = function(index) {

    var _ = this,
      centerOffset,
      allSlides,
      indexOffset,
      remainder;

    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

    _.$slides.eq(index).addClass('slick-current');

    if (_.options.centerMode === true) {

      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {

        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {

          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }

        if (index === 0) {

          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {

          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }

      _.$slides.eq(index).addClass('slick-center');
    } else {

      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {

        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {

        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {

          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function() {

    var _ = this,
      i,
      slideIndex,
      infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {

      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {

        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }
        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }
        _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
          $(this).attr('id', '');
        });
      }
    }
  };

  Slick.prototype.interrupt = function(toggle) {

    var _ = this;

    if (!toggle) {
      _.autoPlay();
    }
    _.interrupted = toggle;
  };

  Slick.prototype.selectHandler = function(event) {

    var _ = this;

    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

    var index = parseInt(targetElement.attr('data-slick-index'));

    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {

      _.slideHandler(index, false, true);
      return;
    }

    _.slideHandler(index);
  };

  Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

    var targetSlide,
      animSlide,
      oldSlide,
      slideLeft,
      targetLeft = null,
      _ = this,
      navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);

    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    }

    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if (_.options.asNavFor) {

      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }

    _.updateDots();
    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {

        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function() {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }
      _.animateHeight();
      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function() {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };

  Slick.prototype.startLoad = function() {

    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

      _.$prevArrow.hide();
      _.$nextArrow.hide();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

      _.$dots.hide();
    }

    _.$slider.addClass('slick-loading');
  };

  Slick.prototype.swipeDirection = function() {

    var xDist,
      yDist,
      r,
      swipeAngle,
      _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);

    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }
    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  };

  Slick.prototype.swipeEnd = function(event) {

    var _ = this,
      slideCount,
      direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

    if (_.touchObject.curX === undefined) {
      return false;
    }

    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }

    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

      direction = _.swipeDirection();

      switch (direction) {

        case 'left':
        case 'down':

          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

          _.currentDirection = 0;

          break;

        case 'right':
        case 'up':

          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

          _.currentDirection = 1;

          break;

        default:

      }

      if (direction != 'vertical') {

        _.slideHandler(slideCount);
        _.touchObject = {};
        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {

      if (_.touchObject.startX !== _.touchObject.curX) {

        _.slideHandler(_.currentSlide);
        _.touchObject = {};
      }
    }
  };

  Slick.prototype.swipeHandler = function(event) {

    var _ = this;

    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }

    switch (event.data.action) {

      case 'start':
        _.swipeStart(event);
        break;

      case 'move':
        _.swipeMove(event);
        break;

      case 'end':
        _.swipeEnd(event);
        break;

    }
  };

  Slick.prototype.swipeMove = function(event) {

    var _ = this,
      edgeWasHit = false,
      curLeft,
      swipeDirection,
      swipeLength,
      positionOffset,
      touches,
      verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);

    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }

    swipeLength = _.touchObject.swipeLength;

    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }
    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);
  };

  Slick.prototype.swipeStart = function(event) {

    var _ = this,
      touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

    _.dragging = true;
  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

    var _ = this;

    if (_.$slidesCache !== null) {

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.unload = function() {

    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };

  Slick.prototype.unslick = function(fromBreakpoint) {

    var _ = this;
    _.$slider.trigger('unslick', [_, fromBreakpoint]);
    _.destroy();
  };

  Slick.prototype.updateArrows = function() {

    var _ = this,
      centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {

        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };

  Slick.prototype.updateDots = function() {

    var _ = this;

    if (_.$dots !== null) {

      _.$dots.find('li').removeClass('slick-active').end();

      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };

  Slick.prototype.visibility = function() {

    var _ = this;

    if (_.options.autoplay) {

      if (document[_.hidden]) {

        _.interrupted = true;
      } else {

        _.interrupted = false;
      }
    }
  };

  $.fn.slick = function() {
    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;
    for (i = 0; i < l; i++) {
      if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);
      else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }
    return _;
  };
});
"use strict";
'use strict';

$('.panel-collapse').on('show.bs.collapse', function() {
  $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function() {
  $(this).siblings('.panel-heading').removeClass('active');
});

$('.panel-heading').removeClass('active');

$(document).ready(function() {
  $(".carousel-inner .carousel-item").first().addClass("active");
});
'use strict';

var accordionToggle = function($) {
  var $doc = $(document);
  var accordianSel = '.open-accordian';

  function accordionOn() {
    accordionOff();
    $doc.on('click.toggleAccodion', '.open-accordian', function() {
      if ($(this).children('.triangle-icon').hasClass('triangle-close')) {
        $(this).children('.triangle-icon').addClass('triangle-open');
        $(this).children('.triangle-icon').removeClass('triangle-close');
      } else {
        $(this).children('.triangle-icon').addClass('triangle-close');
        $(this).children('.triangle-icon').removeClass('triangle-open');
      }
    });
  }

  function accordionOff() {
    $doc.off('click.toggleAccodion');
  }

  function init() {
    $doc.ready(function() {
      if ($(accordianSel).length > 0) {
        accordionOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

accordionToggle.init();
"use strict";

$('#appntment-request-sent').hide();

function hybris_form_submit(form) {
  if (form.id == "form-how-can-we-help") {
    //$('.see-car-form').hide();
    //$('#appntment-request-sent').show();
    event.preventDefault();
  }
}
'use strict';

var formAjax = function($) {
  function formAjaxInit(event, el) {
    event.preventDefault();
    var formEl = $(el),
      formVal = el,
      formMethod = formEl.attr('method') || 'post',
      formApi = formEl.attr('action'),
      formData = formEl.serialize();
    if (formEl.hasClass('loan-eligibility-form')) {
      var array = formEl.serializeArray();
      var json = {};
      $.each(array, function() {
        json[this.name] = this.value || '';
      });

      json.monthly_household_income = json.monthly_household_income.replace(/[^0-9]/g, '');
      json.down_payment = json.down_payment.replace(/[^0-9]/g, '');
      var loanData = JSON.stringify(json);
    }
    formEl.find('button').prop('disabled', 'disabled');
    if (formEl.hasClass('form-how-can-we-help')) {
      contactUsForm.formObj(formVal);
      if (contactUsRequestPayload.vehicleRegExpiry != "") {
        contactUsRequestPayload.vehicleRegExpiry = contactUsRequestPayload.vehicleRegExpiry + "T00:00:00Z";
      }
      formData = JSON.stringify(contactUsRequestPayload);
      $.ajax({
        url: formApi,
        type: formMethod,
        data: formData,
        dataType: "json",
        contentType: 'application/json; charset=UTF-8'
      }).done(function(response) {
        formEl.find('button').prop('disabled', '');
        if (response.status == 200) {
          contactUsForm.responseSuccess(response, formEl);
        } else {
          contactUsForm.responseFailure(response, formEl);
        }
      }).fail(function(error) {
        if (formEl.hasClass('car-reservation-individual-form') || formEl.hasClass('car-reservation-company-form')) {
          alert("There is some internal server error, please try again latter");
        }
        formEl.find('button').prop('disabled', '');
      }).always(function(alwaysResponse) {
        formEl.find('button').prop('disabled', '');
        if (alwaysResponse.status == 200) {
          contactUsForm.responseSuccess(alwaysResponse, formEl);
        } else {
          contactUsForm.responseFailure(alwaysResponse, formEl);
        }
      });
    } else if (formEl.hasClass('loan-eligibility-form')) {
      $.ajax({
        url: formApi,
        type: formMethod,
        data: loanData,
        dataType: "json",
        contentType: 'application/json; charset=UTF-8'
      }).done(function(response) {
        formEl.find('button').prop('disabled', '');
        loanEligibility.responseOn(response);
      }).fail(function(error) {
        formEl.find('button').prop('disabled', '');
      });
    } else if (formEl.hasClass('pdp-contactus-form')) {
      contactUsForm.formObj(formVal);
      formData = JSON.stringify(contactUsRequestPayload);
      $.ajax({
        url: formApi,
        type: formMethod,
        data: formData,
        dataType: "json",
        contentType: 'application/json; charset=UTF-8'
      }).done(function(response) {
        formEl.find('button').prop('disabled', '');
        if (response.status == 200) {
          pdpContactUs.responseSuccess(contactUsRequestPayload);
        } else {
          pdpContactUs.responseFailure();
        }
      }).fail(function(response) {
        if (response.status == 200) {
          pdpContactUs.responseSuccess(contactUsRequestPayload);
        } else {
          pdpContactUs.responseFailure();
        }
        formEl.find('button').prop('disabled', '');
      }).always(function(alwaysResponse) {
        formEl.find('button').prop('disabled', '');
        if (alwaysResponse.status == 200) {
          pdpContactUs.responseSuccess(contactUsRequestPayload);
        } else {
          pdpContactUs.responseFailure();
        }
      });
    } else {
      $.ajax({
        url: formApi,
        type: formMethod,
        data: formData
      }).done(function(response) {
        formEl.find('button').prop('disabled', '');
        if (formEl.hasClass('car-reservation-personal-info') || formEl.hasClass('car-reservation-appointment-form') || formEl.hasClass('car-reservation-individual-form') || formEl.hasClass('car-reservation-company-form')) {
          carReservation.responseOn(response, formEl);
        }
        if (formEl.hasClass('sell-car-form')) {
          sellCar.responseOn(response, formEl);
        }
      }).fail(function(error) {
        formEl.find('button').prop('disabled', '');
      });
    }
  }

  return {
    formAjaxInit: formAjaxInit
  };
}(jQuery);
"use strict";

/** password display as text on click of eye */

// (function () {
// 	'use strict';
// 	window.addEventListener('load', function () {
// 		forms_validation();
// 	}, false);
// })();
var sunmit_enabled_forms = ["profile-overview", "car-reservation-appointment-form", "car-reservation-personal-info", "car-reservation-upload-individual", "car-reservation-upload-individual"];
var forms_validation = function forms_validation(form, formreset) {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = form ? form : document.getElementsByClassName('needs-validation');

  var validation = Array.prototype.filter.call(forms, function(form) {
    var myform = form;
    $.each(form.elements, function(index, element) {
      $(element).on("focusout", function(ele) {
        if (ele.currentTarget.checkValidity() === false) {
          $(ele.currentTarget).removeClass("is-valid");
          $(ele.currentTarget).addClass("is-invalid");
          if (ele.currentTarget.form.name != "form-how-can-we-help" && $.inArray(form.name, sunmit_enabled_forms) != -1) {
            // $(ele.currentTarget.form).children("button").attr("disabled","disabled");
          }
        } else {
          if (this.id == "lastname" && this.value == "" || $(this).hasClass('hide-valid-icon') && this.value == "") {
            $(ele.currentTarget).removeClass("is-invalid");
            $(ele.currentTarget).removeClass("is-valid");
          } else {
            $(ele.currentTarget).removeClass("is-invalid");
            if (ele.currentTarget.form.id === "carrosRegisterForm" || ele.currentTarget.form.id === "carrosLoginForm") {
              $(ele.currentTarget).addClass("is-valid");
            }
          }
          if (ele.currentTarget.form.checkValidity() === true) {
            $(ele.currentTarget.form).children("button").prop("disabled", "");
          }
        }
        if (form.checkValidity() === true) {
          $(form).find('button.btn').prop('disabled', '');
        } else {
          if ($.inArray(form.name, sunmit_enabled_forms) == -1) {
            // $(form).find('button.btn').prop('disabled', 'disabled');
          } else {
            $(form).find('button.btn').prop('disabled', '');
          }
        }
      });
      $(element).next('.chosen-container').on("focusout", function() {
        $(this).parent().find('select').focusout();
      });
      $(element).on("input", function(ele) {
        /**
         *  condition to check if password field has length > 0, to show eye icon
         */
        var pwdFieldForEye = ele.currentTarget;
        if (pwdFieldForEye && pwdFieldForEye != null) {
          var currentTragetId = pwdFieldForEye.id;
          if (currentTragetId && (currentTragetId == "password" || currentTragetId == "pwd")) {
            if (pwdFieldForEye.value.length > 0) {
              $("#" + currentTragetId + " + .custom-group-append").show();
            } else {
              $("#" + currentTragetId + " + .custom-group-append").hide();
            }
          }
        }
        if (ele.currentTarget.checkValidity() === false) {
          $(ele.currentTarget).removeClass("is-valid");
          $(ele.currentTarget).addClass("is-invalid");
          // if(ele.currentTarget.form.name != "form-how-can-we-help" && $.inArray( form.name, sunmit_enabled_forms ) == -1){
          // 	$(ele.currentTarget.form).children("button").attr("disabled","disabled");
          // }
        } else {
          if (this.id == "lastname" && this.value == "" || $(this).hasClass('hide-valid-icon') && this.value == "") {
            $(ele.currentTarget).removeClass("is-invalid");
            $(ele.currentTarget).removeClass("is-valid");
          } else {
            $(ele.currentTarget).removeClass("is-invalid");
            if (ele.currentTarget.form.id === "carrosRegisterForm" || ele.currentTarget.form.id === "carrosLoginForm") {
              $(ele.currentTarget).addClass("is-valid");
            }
          }
          if (ele.currentTarget.form.checkValidity() === true) {
            $(ele.currentTarget.form).children("button").prop("disabled", "");
          }
        }
      });
      if (form.checkValidity() === true) {
        $(form).find('button.btn').prop('disabled', '');
      } else {
        if ($.inArray(form.name, sunmit_enabled_forms) == -1) {
          // $(form).find('button.btn').prop('disabled', 'disabled');
        } else {
          $(form).find('button.btn').prop('disabled', '');
        }
      }
    });

    if (!formreset) {
      fomsValidationSubmitOn(form);
    }
  });

  // Explicit function for accepting terms and conditions
  $('.accept-terms-conditions').on('click', function() {
    if (this.checked === true && document.getElementById("signup-validation").checkValidity() === true) {
      $("#signup-validation").children("button").removeAttr("disabled");
    } else {
      $("#signup-validation").children("button").attr("disabled", "disabled");
    }
  });
};
forms_validation();

function fomsValidationSubmitOn(form) {
  form.addEventListener('submit', function(event) {
    //$(form).find('button').prop('disabled', 'disabled');
    var uploadcontrolList = $(form).find('.cr-fileupload-box');
    if (uploadcontrolList && uploadcontrolList.length > 0) {
      $.each(uploadcontrolList, function(index, element) {
        if ($(element).find('.cr-file-upload')[0].validity.valid === false) {
          $(element).find('.car-reservation-upload-text').hide();
        } else {
          $(element).find('.car-reservation-upload-text').show();
        }
      });
    }
    $('.invalid-feedback-password').hide();
    if (form.checkValidity() === false) {
      $('#fp-success').hide();
      $('#fp-failure').show();
      event.preventDefault();
      event.stopPropagation();
    } else {
      $('#fp-success').show();
      $('#fp-failure').hide();
      if ($(form).hasClass('form-ajax')) {
        formAjax.formAjaxInit(event, form);
      } else {
        $(form).find('button').prop('disabled', '');
        hybris_form_submit(form);
      }
    }
    form.classList.add('was-validated');
    if (form.name === "profile-info") {
      $.each(form.elements, function(index, element) {
        if (form.elements[index].value.trim() === "") {
          $(form.elements[index]).css("background", "none");
        }
      });
    }
  }, false);
}
"use strict";

// GA on click of buy now product in PDP
$(document).on("click", ".ga-buy-now", function() {
  var send = $('#ga-param-send').val();
  var event = $('#ga-param-event').val();
  var actionPoint = $('#ga-param-action-point-pdp').val();
  var action = $('#ga-param-action-buy').val();
  var successMessage = $('#ga-param-success-msg-pdp').val();
  var price = $('#ga-param-product-price').val();
  ga(send, event, actionPoint, action, successMessage, price);
});

//GA on click of buy now product in Wishlist Page
$(document).on("click", ".ga-buy-now-wishlist", function() {
  var send = $('#ga-param-send').val();
  var event = $('#ga-param-event').val();
  var actionPoint = $('#ga-param-action-point-pdp').val();
  var action = $('#ga-param-action-buy').val();
  var successMessage = $('#ga-param-success-msg-pdp').val();
  var price = $(this).attr('data-product-price');
  ga(send, event, actionPoint, action, successMessage, price);
});

//GA user registration confirmation
$("#email-activation-modal").on("shown.bs.modal", function() {
  var send = $('#ga-param-send-reg').val();
  var event = $('#ga-param-event-reg').val();
  var actionPoint = $('#ga-param-action-point-form-reg').val();
  var action = $('#ga-param-action-reg').val();
  var successMessage = $('#ga-param-success-msg-reg').val();
  ga(send, event, actionPoint, action, successMessage);
});

// GA PDP appointment booking
$('.ga-pdp-appointment-book').on("click", function() {
  var send = $('#ga-param-send').val();
  var event = $('#ga-param-event').val();
  var actionPoint = $('#ga-param-action-point-pdp-appnt-book').val();
  var action = $('#ga-param-action-pdp-appnt-book').val();
  var successMessage = $('#ga-param-success-msg-pdp-appnt-book').val();
  ga(send, event, actionPoint, action, successMessage);
});

// GA 360 deg spinner
$('.product-tray-360spinner').on("click", function() {
  var send = $('#ga-param-send').val();
  var event = $('#ga-param-event').val();
  var actionPoint = $('#ga-param-action-point-pdp-360-deg').val();
  var action = $('#ga-param-action-pdp-360-deg-click').val();
  var successMessage = $('#ga-param-success-msg-pdp-360-deg').val();
  ga(send, event, actionPoint, action, successMessage);
});
"use strict";

// /*
//   Dropdown with Multiple checkbox select with jQuery
// */
$(".drop-down-menu ul").hide();

$(".drop-down-view").on('click', function() {
  if ($(this).parent().children('.mutliSelect').children('ul').is(':visible') == true) {
    $(this).parent().children('.mutliSelect').children('ul').css('display', 'none');
  } else {
    $(".drop-down-menu.open").children('.mutliSelect').children('ul').css('display', 'none');
    $(".drop-down-menu.open").removeClass('open');
    $(this).parent().children('.mutliSelect').children('ul').css('display', 'block');
  }
});

$('.mutliSelect').find("input[type='checkbox']").on("click", function() {
  $(this).parents(".multiSelect").children('ul').show();
});

// herosearch group checkboxes
$(document).on("click", ".price-check", function() {
  $(".price-check").not($(this)).each(function(index, obj1) {
    $(obj1)[0].checked = false;
  });
});
$(document).on("click", ".year-check", function() {
  $(".year-check").not($(this)).each(function(index, obj1) {
    $(obj1)[0].checked = false;
  });
});

//On click outside the div the dropdown menu should be hidden
// $(document).mouseup(function (e){
//     var multiselectMenu = $(".drop-down-menu");
//     var sortDropDown = $('.sort-drop-down');
//     var mutliSelect =$('.filter-check');
//     var dropDownMenu = $(".multiSelect ul li");
//     if (!$('.drop-down-view').is(e.target) && !dropDownMenu.is(e.target) && !mutliSelect.is(e.target)){    
//         $(".drop-down-menu ul").hide();
//     }
// });


//On click outside the div the dropdown menu should be hidden
$(document).mouseup(function(e) {
  var sortDropDown = $('.sort-drop-down');
  if (!sortDropDown.is(e.target) && sortDropDown.has(e.target).length === 0) {
    sortDropDown.fadeOut();
  }
  if ($(e.target).parents('.mutliSelect').length == 0 && !e.target.classList.contains('drop-down-view')) {
    $(".drop-down-menu ul").hide();
    $('#price-multiselect').removeClass('open');
    $('#year-multiselect').removeClass('open');
    $('#transmission-multiselect').removeClass('open');
  }
});
"use strict";

$(".select-enquiry").on('change', function() {
  var jsLang = $(this).children(":selected").attr("id");
  $('.dependent-controls').html("");
  switch (jsLang) {
    case 'ge':
      var showControls = '<div class="form-row">' + '<div class="col-lg-6 col-md-6 mb-12 col-sm-12 col-xs-12">' + '<div class="form-group">' + ' <input type="text" placeholder="First Name*" name="firstname" class="form-control mobil-controls f-14" required>' + '<div class="invalid-feedback">' + '  Please enter a valid name.' + ' </div>' + '</div>' + '</div>' + '<div class="col-lg-6 col-md-6 mb-12 col-sm-12 col-xs-12">' + '<div class="form-group">' + ' <input type="text" placeholder="Last Name*" name="lastname" class="form-control mobil-controls f-14" required>' + '<div class="invalid-feedback">' + ' Please enter a valid name.' + ' </div>' + ' </div>' + '</div>' + '  </div>' + ' <div class="form-group">' + ' <input type="text" placeholder="Contact Number*" name="contactnumber" class="form-control mobil-controls f-14" required>' + '<div class="invalid-feedback">' + ' Please enter a valid number, e.g. 0211234567.' + ' </div>' + '</div>' + '<div class="form-group">' + '<input type="email" placeholder="Email Address*" name="emailaddress" class="form-control mobil-controls f-14" required>' + ' <div class="invalid-feedback">' + ' Please enter a valid email, e.g. john@gmail.com' + ' </div>' + '</div>';
      // $('.dependent-controls').remove();
      $('.dependent-controls').append(showControls);
      break;

    default:

  }
});

// Type ahead search box onclick should display the value in searchbox

// $('.type-ahead-li a').on("click",function(){
//     var valueSelected = $(this).text().trim();
//     $(this).parents('.typeahead').children('input').val(valueSelected);
//     $(".typeahead-dropdown").hide();
//     return false;
// });
$('.typeahead-input').on("focus", function() {
  $(this).siblings('.typeahead-dropdown').show();
});

//show ui control of type ahead 
$(".typeahead-input").on("input", function() {
  if ($(this).val().length > 3) {
    // $('.typeahead-dropdown ul .prerendered').hide();
    // $('.typeahead-dropdown ul .searchrendered').hide();
    // $(this).siblings('.typeahead-dropdown').hide();
  } else {
    $('.typeahead-dropdown').show();
    $('.typeahead-dropdown ul .prerendered').show();
    $('.typeahead-dropdown ul .searchrendered').remove();
  }
});

//for google analytics
$(".typeahead-input").on("keypress", function(e) {
  if (e.keyCode == 13) {
    ga('send', 'pageview', '/search?text=' + $(this).val());
  }
});
$("#signinsignup-verification-modal").on("hidden.bs.modal", function() {
  var forgotpswd = localStorage.getItem('forgotpswdclick');
  if (!forgotpswd) {
    document.location.reload();
  }
});

//add a class to body whe modal is open to prevent the body from scrolling

$(".modal").on("shown.bs.modal", function() {
  if (($(".modal").data('bs.modal') || {})._isShown) {
    $("body").addClass("carros-modal-open");
  } else {
    if (($("#signup-activation-modal.modal").data('bs.modal') || $("#signinsignup-verification-modal").data('bs.modal') || {})._isShown === true) {
      $("body").addClass("carros-modal-open");
    } else {
      $("body").removeClass("carros-modal-open");
    }
  }
}).on("hidden.bs.modal", function() {
  if (($(".modal").data('bs.modal') || {})._isShown) {
    $("body").addClass("carros-modal-open");
  } else {
    if (($("#signup-activation-modal.modal").data('bs.modal') || $("#signinsignup-verification-modal").data('bs.modal') || {})._isShown === true) {
      $("body").addClass("carros-modal-open");
    } else {
      $("body").removeClass("carros-modal-open");
    }
  }
});
"use strict";
'use strict';

/** password display as text on click of eye */

(function() {
  'use strict';

  $('.login-signin-pwd').addClass('strikethrough');
  $('.show-password').show();
  $('.custom-group-append').hide();
  $('.show-password-highlight').hide();
  window.addEventListener('load', function() {
    //show modals on page load
    $('.temp-modal').modal('show');
    $('.login-signin-pwd').click(function(e) {
      var pwd = $('.swich-text-pwd').attr('type');
      if (pwd == 'password') {
        $('.swich-text-pwd').attr('type', 'text');
        $(this).removeClass('strikethrough');
        $('.show-password-highlight').show();
        $('.show-password').hide();
      } else {
        $('.swich-text-pwd').attr('type', 'password');
        $(this).addClass('strikethrough');
        $('.show-password').show();
        $('.show-password-highlight').hide();
      }
    });
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    $('#fp-failure').hide();
    $('.invalid-feedback-mail').hide();

    // on tab change
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      var formSelected = $(this).attr('href');
      $(formSelected).children("form").removeClass('was-validated');
      if ($(formSelected).children("form").get(0) && $(formSelected).children("form").get(0) != undefined) {
        $(formSelected).children("form").get(0).reset();
      }
      $(formSelected).children("form").children().find('.form-control').removeClass('is-invalid');
      $('.login-signin-pwd').addClass('strikethrough');
      $('.swich-text-pwd').attr('type', 'password');
      $('.show-password').show();
      $('.show-password-highlight').hide();
      var pwdFieldSignin = $('#signin-form #password');
      if (pwdFieldSignin && pwdFieldSignin.length != 0 && pwdFieldSignin.val().length == 0) {
        $('#signin-form #password + .custom-group-append').hide();
      }
      var pwdFieldSignup = $('#signup-form #pwd');
      if (pwdFieldSignup && pwdFieldSignup.length != 0 && pwdFieldSignup.val().length == 0) {
        $('#signup-form #pwd + .custom-group-append').hide();
      }
    });

    $('.signin-tab').on('click', function(event) {
      $('#signin-form').addClass("show active");
      $('#signup-form').removeClass("show active");
      $('#m88-signin-tab').addClass("show active");
      $('#m88-signup-tab').removeClass("show active");
    });
    $('.signup-tab').on('click', function(event) {
      $('#signin-form').removeClass("show active");
      $('#signup-form').addClass("show active");
      $('#m88-signin-tab').removeClass("show active");
      $('#m88-signup-tab').addClass("show active");
      event.preventDefault();
      event.stopPropagation();
    });

    //onload clear the form
    $("#signup-activation-modal").on("hidden.bs.modal", function() {
      //resetting the localstorage on close
      localStorage.setItem("login-invoked-from", "");
      //resetting the signup and signin form on close
      $("#signin-form form").removeClass('was-validated'); //clearing the form validity
      $("#signup-form form").removeClass('was-validated');
      $("#signin-form form").children().find('.form-control').removeClass('is-invalid is-valid'); //clearing the control validity
      $("#signup-form form").children().find('.form-control').removeClass('is-invalid is-valid');
      $('#signin-form form').get(0).reset(); //reset the forms
      $('#signup-form form').get(0).reset();
    });

    // 
    $("#signup-activation-modal").on("hide.bs.modal", function() {
      // if session is timeed out 
      if ($('#isSessionTimeOut').val() === "true") {
        localStorage.setItem("logoutuser", "true");
        window.location.href = $('#homepageUrl').val() + "?logoutuser=" + true;
      }
      //resetting the localstorage on close
      localStorage.setItem("login-invoked-from", "");
      //resetting the signup and signin form on close
      $("#signin-form form").removeClass('was-validated'); //clearing the form validity
      $("#signup-form form").removeClass('was-validated');
      $("#signin-form form").children().find('.form-control').removeClass('is-invalid is-valid'); //clearing the control validity
      $("#signup-form form").children().find('.form-control').removeClass('is-invalid is-valid');
      $('#signin-form form').get(0).reset(); //reset the forms
      $('#signup-form form').get(0).reset();
    });

    //HYBRIS force reload

    $("#forgot-password-email-modal ").on("hidden.bs.modal", function() {
      var inv = $('#invalidCredentials').val();
      if (inv == "true") {
        document.location.reload();
      }
    });
  }, false);
})();
'use strict';

$('.show-this-vehicle-details').click(function() {
  if ($(this).children('.show-vehicle-details').hasClass('arrow-up')) {
    $(this).siblings().addClass('display-acc-content');
    $(this).children('.show-vehicle-details').removeClass('arrow-up');
    $(this).children('.show-vehicle-details').addClass('arrow-down');
  } else {
    $(this).siblings().removeClass('display-acc-content');
    $(this).children('.show-vehicle-details').removeClass('arrow-down');
    $(this).children('.show-vehicle-details').addClass('arrow-up');
  }
});

$('#pdp-carousel').carousel({
  interval: false
});
var slideFrom = $('#pdp-carousel').find('.active').index() + 1;
var totalSlides = $('#pdp-carousel').children('.carousel-inner').children('.carousel-item').length;
var count = slideFrom + '/' + totalSlides;
$('.pdp-indicators-text').html('' + slideFrom + '/' + totalSlides + '');
$('#pdp-carousel').bind('slide.bs.carousel', function(e) {
  console.log('slide event!');
  var slideFrom = $(this).find('.active').index() + 1;
  var totalSlides = $(this).children('.carousel-inner').children('.carousel-item').length;
  var count = slideFrom + '/' + totalSlides;
  $('.pdp-indicators-text').html('' + slideFrom + '/' + totalSlides + '');
});

$('.gallery_overlay,.fullimg').on("click", function() {
  $("#pdp-overlay").show();
  $(".carros-header").hide();
});
$('.gallery_degree').on("click", function() {
  $("#pdp-degree-overlay").show();
  $(".carros-header").hide();
});

$(".pdp-close").on("click", function() {
  $("#pdp-overlay").hide();
  $(".carros-header").show();
});
$(".pdp-degree-close").on("click", function() {
  $("#pdp-degree-overlay").hide();
  $(".carros-header").show();
});
$(".pdp-video-close").on("click", function() {
  $("#pdp-video-overlay").hide();
  $(".carros-header").show();
});

$(".pdp-detail-carousel .carousel-item .container .row .car-details").each(function() {
  $(this).find("img").on("click", function() {
    var imagesrc = $(this).attr("src");
    $(".fullimg").attr("src", imagesrc);
    $(".fullimg").show();
  });
  $(this).find("div").on("click", function() {
    $("#pdp-video-overlay").show();
    $(".carros-header").hide();
  });
});

var header = document.getElementById("pdp-sticky-header");
if (header) {
  var header = document.getElementById("pdp-sticky-header");
  var sticky = header.offsetTop;
  $('#pdp-sticky-header').hide();
  window.onscroll = function() {
    myFunction();
  };
}

function myFunction() {
  if (window.pageYOffset > sticky) {
    $('#pdp-sticky-header').show();
    header.classList.add("pdp-sticky");
    $('.pdp-sticky').css('top', $('.carros-header').height());
    $(".out").css({
      "-webkit-filter": "blur(10px)",
      "filter": "blur(10px)"
    });
  } else {
    $('#pdp-sticky-header').show();
    $('.pdp-sticky').hide();
    $(".out").css({
      "-webkit-filter": "blur(0px)",
      "filter": "blur(0px)"
    });
  }
}
$('.percentage').blur(function() {
  var perc = $('.percentage').val();
  if (perc < 25) {
    $('.invalid_downpay').show();
    $('.percentage').addClass('invalid');
  } else {
    $('.invalid_downpay').hide();
    $('.percentage').removeClass('invalid');
  }
  var total_price = $("input[name='carprice']").val();
  var down_pay = perc * total_price / 100;
  $("input[name='downpayment']").val(down_pay);
});
$("input[name='downpayment']").blur(function() {
  var dowm_pay = $("input[name='downpayment']").val();
  var total_price = $("input[name='carprice']").val();
  var perc = dowm_pay / total_price * 100;
  if (perc < 25) {
    $('.invalid_downpay').show();
    $('.percentage').addClass('invalid');
  } else {
    $('.invalid_downpay').hide();
    $('.percentage').removeClass('invalid');
  }
  $(".percentage").val(perc);
});
$("input[name='carprice']").change(function() {
  var total_price = $("input[name='carprice']").val();
  var perc = $('.percentage').val();
  var down_pay = perc * total_price / 100;
  $("input[name='downpayment']").val(down_pay);
});
$('.btn-reset').click(function() {
  $("input[type=text], textarea, select").val("");
  $('.invalid_downpay').hide();
  $('.percentage').removeClass('invalid');
});

$(document).ready(function() {
  $(".footerdesktop").hide();
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 600) {
      $(".footerdesktop").show();
    } else {
      $(".footerdesktop").hide();
    }
  });
  $("#check-loan input[type='text'], #check-loan select").on("keyup", function() {
    if ($("input[name='carprice']").val() != "" && $("input[name='downpayment']").val() != "" && $("input[name='percentage']").val() != "" && $(".select-enquiry").val() != "" && $("input[name='contactnumber']").val() != "") {
      $(".primary-defaultgrey").removeAttr("disabled");
    } else {
      $(".primary-defaultgrey").attr("disabled", "disabled");
    }
  });
  //common class to show the tooltip
  $('.disclaimer-info-icon img').hover(function() {
    if (window.matchMedia("(min-width: 1366px)").matches) {
      $(this).siblings('span.disclaimer-info').toggleClass("disclaimer-info_hover");
    }
  });
  $('.disclaimer-info-icon img').click(function() {
    $(this).siblings('span.disclaimer-info').toggleClass("disclaimer-info_hover");
  });
  $(document).on("click touchstart", function(e) {
    if (e.target.nextElementSibling && $(e.target.nextElementSibling).hasClass("disclaimer-info")) {
      $(e.target.nextElementSibling).addClass("disclaimer-info_hover");
    } else {
      $(".disclaimer-info").removeClass("disclaimer-info_hover");
    }
  });
  //hiding the disclamier on click outside
  $(document).click(function(e) {
    if (e.target.nextElementSibling && $(e.target.nextElementSibling).hasClass("disclaimer-info")) {
      $(e.target.nextElementSibling).addClass("disclaimer-info_hover");
    } else {
      $(".disclaimer-info").removeClass("disclaimer-info_hover");
    }
  });

  $('.eligibility-calculator-close').click(function() {
    $('.loan-eligibility-overlay').css('display', 'none');
    $('.modal-backdrop').remove();
  });
  $('.check-loan-eligibility-mob .calculate-now').click(function() {
    $('.loan-eligibility-overlay').css('display', 'block');
  });
  $("#contactus-form").submit(function(event) {
    event.preventDefault();
    var contactDetail = {};
    contactDetail['firstname'] = $("#fname").val();
    contactDetail['lastname'] = $("#lname").val();
    contactDetail['contactnumber'] = $("#cno").val();
    contactDetail['email'] = $("#email").val();
    contactDetail['date'] = $("#date").val();
    console.log("Data>>>>>", contactDetail);
  });
});
'use strict';

/*Scroll to top */
$(window).scroll(function() {
  var height = $(window).scrollTop();
  var isCompareBarVisibile = $('.compare-bar-container').is(":visible");
  var isCompareBarOpen = $('.open-compare-drawer').is(":visible");
  var isPdpStickyFooterVisible = $('.pdp-sticky-footer').is(":visible");
  var pdpStickyFooterHeight = $('.pdp-sticky-footer').outerHeight();
  $('.chat-btn').removeClass("chat-btn-onload");
  if (height > 100) {
    $('#goTop').fadeIn();
    $('.chat-btn').removeClass('chat-btn-top');
  } else {
    $('#goTop').fadeOut();
    $('.chat-btn').addClass('chat-btn-top');
  }

  if (isCompareBarVisibile || isCompareBarOpen || isPdpStickyFooterVisible) {
    if (isPdpStickyFooterVisible && isCompareBarVisibile) {
      if (isCompareBarOpen) {
        calculateFooter(pdpStickyFooterHeight + $('.open-compare-drawer').outerHeight());
      } else {
        calculateFooter(pdpStickyFooterHeight + $('.compare-bar-container').outerHeight());
      }
    } else {
      if (isPdpStickyFooterVisible) {
        calculateFooter(pdpStickyFooterHeight);
      }
      if (isCompareBarVisibile) {
        if (isCompareBarOpen) {
          calculateFooter($('.open-compare-drawer').outerHeight());
        } else {
          calculateFooter($('.compare-bar-container').outerHeight());
        }
      }
    }
  } else {
    calculateFooter(0);
  }

  function calculateFooter(stickyElement) {
    if ($(window).scrollTop() + window.innerHeight < $(document).height() - $("footer").outerHeight(true) + stickyElement) {
      if (isCompareBarVisibile || isCompareBarOpen || isPdpStickyFooterVisible) {
        if (isPdpStickyFooterVisible && isCompareBarVisibile) {
          if (isCompareBarOpen) {
            $('#goTop').css("bottom", pdpStickyFooterHeight + $('.open-compare-drawer').outerHeight() + 20);
            $('.chat-btn').css("bottom", pdpStickyFooterHeight + $('.open-compare-drawer').outerHeight() + 20);
          } else {
            $('#goTop').css("bottom", pdpStickyFooterHeight + $('.compare-bar-container').outerHeight() + 20);
            $('.chat-btn').css("bottom", pdpStickyFooterHeight + $('.compare-bar-container').outerHeight() + 20);
          }
        } else {
          if (isPdpStickyFooterVisible) {
            $('#goTop').css("bottom", pdpStickyFooterHeight + 20);
            $('.chat-btn').css("bottom", pdpStickyFooterHeight + 20);
          }
          if (isCompareBarVisibile) {
            if (isCompareBarOpen) {
              $('#goTop').css("bottom", $('.open-compare-drawer').outerHeight() + 20);
              $('.chat-btn').css("bottom", $('.open-compare-drawer').outerHeight() + 20);
            } else {
              $('#goTop').css("bottom", $('.compare-bar-container').outerHeight() + 20);
              $('.chat-btn').css("bottom", $('.compare-bar-container').outerHeight() + 20);
            }
          }
        }
      } else {
        $('#goTop').css("bottom", "20px");
        $('.chat-btn').css("bottom", "20px");
      }
    }
    if ($(window).scrollTop() + window.innerHeight > $(document).height() - $("footer").outerHeight(true) + stickyElement) {
      $('#goTop').css("bottom", window.innerHeight - ($(document).height() - $(window).scrollTop() - $("footer").outerHeight(true)) + 20);
      $('.chat-btn').css("bottom", window.innerHeight - ($(document).height() - $(window).scrollTop() - $("footer").outerHeight(true)) + 20);
    }
  }
});
$(document).ready(function() {
  $("#goTop").click(function(event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  var isPdpStickyFooterVisible = $('.pdp-sticky-footer').is(":visible");
  var pdpStickyFooterHeight = $('.pdp-sticky-footer').outerHeight();
  var isCompareBarVisibile = $('.compare-bar-container').is(":visible");
  var isCompareBarOpen = $('.open-compare-drawer').is(":visible");
  $('.chat-btn').addClass("chat-btn-onload");
  if (isPdpStickyFooterVisible) {
    $('.compare-bar-container').css("bottom", pdpStickyFooterHeight);
    $('footer').css("margin-bottom", pdpStickyFooterHeight);
  }
  if (isCompareBarVisibile || isCompareBarOpen || isPdpStickyFooterVisible) {
    if (isPdpStickyFooterVisible && isCompareBarVisibile) {
      if (isCompareBarOpen) {
        $('.chat-btn').css("bottom", pdpStickyFooterHeight + $('.open-compare-drawer').outerHeight() + 20);
      } else {
        $('.chat-btn').css("bottom", pdpStickyFooterHeight + $('.compare-bar-container').outerHeight() + 20);
      }
    } else {
      if (isPdpStickyFooterVisible) {
        $('.chat-btn').css("bottom", pdpStickyFooterHeight + 20);
      }
      if (isCompareBarVisibile) {
        if (isCompareBarOpen) {
          $('.chat-btn').css("bottom", $('.open-compare-drawer').outerHeight() + 20);
        } else {
          $('.chat-btn').css("bottom", $('.compare-bar-container').outerHeight() + 20);
        }
      }
    }
  }
});
"use strict";

$(document).ready(function() {
  $(".dropdown-toggle").click(function() {
    $(".arrow").toggleClass('up-arrrow');
  });
  //remove the current box on click of close icon
  $('.searchclear').on('click', function() {
    $(this).siblings('.searchterm').parent().hide();
    $(this).hide();
  });
  /*
      on click of clear filters all the checkboxes will be unselected
  */
  $(".clear-filters").click(function() {
    //clears the functionality on left list of checkboxes
    $('.styled-checkbox').each(function(i) {
      $(this)[0].checked = false;
    });
    var inputFilters = [];
    $('.styled-checkbox').each(function(i) {
      var main_filter = $(this).parents().eq(3).attr("id");
      var sub_filters = $(this)[0].id;
      if ($(this)[0].checked) {
        var chosen = {};
        chosen[main_filter] = sub_filters;
        inputFilters.push(chosen);
      }
    });
    $('.filter-count').html(inputFilters.length);
    if (inputFilters.length == 0) {
      $(this).hide();
    }

    ////clears the functionality filter inputs list
    // $('.search-buttons-filters').children().hide().finish();
    $('.search-count').text("0 results");
    // $('.filters-list-btn .btn-group').hide();
    $(this).parent().children('.btn-group').hide();
  });
  /*
      Validation for filter checkboxes
      avoids submit if the atleast one checkbox is not checked
  */

  $('#filter-form').submit(function(e) {
    var inputFilters = [];
    //check atleat 1 checkbox is checked
    if (!$(this).find(".styled-checkbox").is(':checked')) {
      //prevent the default form submit if it is not checked
      e.preventDefault();
    } else {
      $(this).find(".styled-checkbox").each(function(i) {
        var main_filter = $(this).parents().eq(3).attr("id");
        var sub_filters = $(this)[0].id;

        var chosen = {};
        if (chosen[main_filter]) {
          chosen[main_filter].push(sub_filters);
        } else {
          chosen[main_filter] = sub_filters;
        }
        if (this.checked === true) {
          inputFilters.push(chosen);
        }
        e.preventDefault();
      });
      console.log(inputFilters);
    }
  });
});

$('.sort-drop-down').hide();
$('.show-filters').on('click', function() {
  $('.sort-drop-down').show();
});
$('.sort-drop-down ul li').on('click', function() {
  $('.filter-value').text($(this).text().trim());
  $('.sort-drop-down').hide();
});
'use strict';

$('.responsive').not('.slick-initialized').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  centerPadding: 10,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: false
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  }]
});
"use strict";
// const sample = (function ($) {
//   const $doc = $(document);
//   const sampleString = 'Sample Component';

//   function sampleFunction() {
//     console.log(`Function for ${sampleString}`);
//   }

//   function init() {
//     $doc.ready(function() {
//       sampleFunction();
//     });
//   };

//   return {
//     init: init
//   };

// })(jQuery);

// sample.init();
"use strict";
'use strict';

var youtubeOverlay = function($) {
  var $doc = $(document);
  var youtubePlayIcon = '.youtube-play-icon';
  var youtubeURL = null;

  function openYoutubeModal() {
    $(".youtube-modal").on('shown.bs.modal', function(e) {
      playYoutubeVideo($(this));
    });
  }

  function closeYoutubeModal() {
    $(".youtube-modal").on('hidden.bs.modal', function(e) {
      stopYoutubeVideo($(this));
    });
  }

  function stopYoutubeVideo(el) {
    var $el = el;
    $el.find('iframe').attr('src', '');
  }

  function playYoutubeVideo(el) {
    var $el = el;
    $el.find('iframe').attr('src', '');
    $el.find('iframe').attr('src', youtubeURL);
  }

  function getVideoUrl() {
    $doc.off('click.youtubePlayIcon');
    $doc.on('click.youtubePlayIcon', youtubePlayIcon, function(e) {
      e.preventDefault();
      youtubeURL = null;
      youtubeURL = $(this).data('video-url');
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(youtubePlayIcon).length > 0) {
        getVideoUrl();
        openYoutubeModal();
        closeYoutubeModal();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

youtubeOverlay.init();
'use strict';

var alp = function($) {
  var $doc = $(document);
  var alpSel = '.article-listing-area';

  function ddSelectOn() {
    $doc.off('change.tabSelector');
    $doc.on('change.tabSelector', '#tab_selector', function() {
      $('.article-tabs li').find('#' + $(this).val() + '-tab').tab('show');
    });
  }

  function tabsOn() {
    $doc.off('click.navLink');
    $doc.on('click.navLink', '.article-tabs .nav-link', function() {
      var ddValue = $(this).data('dropdown-value');
      $('#tab_selector').val(ddValue).attr('selected', 'selected');
      $('#tab_selector').trigger("chosen:updated");
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(alpSel).length > 0) {
        tabsOn();
        ddSelectOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

alp.init();
"use strict";

// /*
//   Dropdown with Multiple checkbox select with jQuery
// */
$(".drop-down-menu ul").hide();

// $(".drop-down-menu").on('click', function () {
//   $(this).children('.mutliSelect').children('ul').show();
//     $(".drop-down-menu").not($(this)).each(function(index,obj){
//         console.log("fired");
//         $(obj).children('ul').hide();
//     });
// });

$('.mutliSelect').find("input[type='checkbox']").on("click", function() {
  $(this).parents(".multiSelect").children('ul').show();
});

// herosearch group checkboxes
$(document).on("click", ".price-check", function() {
  $(".price-check").not($(this)).each(function(index, obj1) {
    $(obj1)[0].checked = false;
  });
});
$(document).on("click", ".year-check", function() {
  $(".year-check").not($(this)).each(function(index, obj1) {
    $(obj1)[0].checked = false;
  });
});

//On click outside the div the dropdown menu should be hidden
// $(document).mouseup(function (e){
//     var multiselectMenu = $(".drop-down-menu");
//     var sortDropDown = $('.sort-drop-down');
//     var mutliSelect =$('.filter-check');
//     if (!multiselectMenu.is(e.target) && !sortDropDown.is(e.target) && sortDropDown.has(e.target).length === 0 && !mutliSelect.is(e.target)){
//             $(".drop-down-menu ul").fadeOut();
//             sortDropDown.fadeOut();
// 	}
// });
'use strict';

/*****************************************************************************
 *
 * Brand Selection
 *
 *****************************************************************************/

var brandSelection = function($) {

  var $doc = $(document);
  var brandCarousel = '.brand-carousel';
  var slickBrandConfig = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5
      }
    }]
  };

  // public functions 
  function init() {
    $doc.ready(function() {
      if ($(brandCarousel).children('.brand-transparency').length < slickBrandConfig.slidesToShow && $(brandCarousel).children('.brand-transparency').length != 0) {
        slickBrandConfig.slidesToShow = $(brandCarousel).children('.brand-transparency').length;
      }
      $(brandCarousel).slick(slickBrandConfig);

      $('.brand-image').on("mouseover", function() {
        if ($(this).parent().siblings().hasClass('brand-name')) {
          $(this).parent().siblings().css("visibility", "visible");
        }
      });
      $('.brand-image').on("mouseout", function() {
        if ($(this).parent().siblings().hasClass('brand-name')) {
          $(this).parent().siblings().css("visibility", "hidden");
        }
      });
    });
  }

  return {
    init: init
  };
}(jQuery);

brandSelection.init();
'use strict';

var carReservation = function($) {
  var $doc = $(document);
  var carReservationSel = '.car-reservation';
  var personalInfoFormData = null;
  var appointmentInfoFormData = null;
  var docIndividualInfoFormData = null;
  var docCompanyInfoFormData = null;
  var isDocInfoFormDataEmpty = true;
  var defaultDeliveryMethod = null;

  function datepickerOn() {
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      endDate: '-1d'
    }).on('changeDate', function(e) {
      $(this).datepicker('hide');
      $(this).focusout();
    });
  }

  function appointmentDatepickerOn() {
    $('.appointement-datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '+1d'
    }).on('changeDate', function(e) {
      $(this).datepicker('hide');
      $(this).focusout();
    });
  }

  function fileUploadOn() {
    $doc.off('click.fileUpload');
    $doc.on('click.fileUpload', '.cr-file-upload-btn', function() {
      if (!$(this).hasClass('disabled')) {
        var fileUplodBox = $(this).parents('.cr-fileupload-box');
        fileUplodBox.find('.cr-file-upload').trigger('click');
      }
    });
  }

  function fileUploadChangeOn() {
    $doc.off('change.upload');
    $doc.on('change.upload', '.cr-file-upload', function() {
      var form = $(this).parents('form');
      var thisId = $(this).attr('id');
      var fileUplodBox = $(this).parents('.cr-fileupload-box');
      var file = fileUplodBox.find('.cr-file-upload');
      var filename = file.val().toString().split('\\');
      var filenameStr = filename[filename.length - 1];
      var deleteBtn = fileUplodBox.find('.cr-file-delete-btn');
      var fileUploadBtn = fileUplodBox.find('.cr-file-upload-btn');
      var filesize = null;
      var fileFormats = ["jpg", "jpeg", "png", "pdf"];
      var filetype = null;
      var endPoint = form.attr('action');

      if (filename.length <= 1) {
        fileUplodBox.find('.cr-file-text').val('');
        addHideClass(deleteBtn);
        fileUploadBtn.find('img.file-upload-icon').show();
        fileUploadBtn.find('img.file-uploaded-icon').hide();
      } else {
        filesize = this.files[0].size / 1024 / 1024;
        filetype = fileUplodBox.find('.cr-file-upload').val().split('.').pop().toLowerCase();
        form.find('.cruf-submit-btn').prop('disabled', 'disabled');
        removeHideClass(deleteBtn);
        fileUploadBtn.find('img.file-upload-icon').hide();
        fileUploadBtn.find('img.file-uploaded-icon').show();
        // trim filename to 30 characters
        if (filenameStr.length > 30) {
          var trimedFilename = filenameStr.substr(0, 30);
          fileUplodBox.find('.cr-file-text').val(trimedFilename + '...');
        } else {
          fileUplodBox.find('.cr-file-text').val(filename[filename.length - 1]);
        }
        // validate file type & file size
        if ($.inArray(filetype, fileFormats) == -1 && filesize > 5) {
          fileUplodBox.find('.cr-file-text').removeClass('size-is-invalid');
          fileUplodBox.find('.cr-file-text').addClass('is-invalid');
          $(this).parents().eq(2).find('.car-reservation-upload-text').hide();
        } else if ($.inArray(filetype, fileFormats) == -1 || filesize > 5) {
          if ($.inArray(filetype, fileFormats) == -1) {
            fileUplodBox.find('.cr-file-text').removeClass('size-is-invalid');
            fileUplodBox.find('.cr-file-text').addClass('is-invalid');
            $(this).parents().eq(2).find('.car-reservation-upload-text').hide();
          } else {
            fileUplodBox.find('.cr-file-text').removeClass('is-invalid');
            fileUplodBox.find('.cr-file-text').addClass('size-is-invalid');
            $(this).parents().eq(2).find('.car-reservation-upload-text').hide();
          }
        } else {
          fileUplodBox.find('.cr-file-text').removeClass('is-invalid');
          fileUplodBox.find('.cr-file-text').removeClass('size-is-invalid');
          fileUplodBox.find('.cr-file-text').addClass('is-valid');
          fileUplodBox.find('.cr-file-text').next('.invalid-feedback').html("");
          $(this).parents().eq(2).find('.car-reservation-upload-text').show();
          // ajaxFileUpload(form, endPoint, file);
          uploadBlobByStream(false, thisId, fileUploadBtn);
        }
      }
    });
  }

  function fileUploadDeleteOn() {
    $doc.off('click.deleteFileUpload');
    $doc.on('click.deleteFileUpload', '.cr-file-delete-btn', function() {
      var form = $(this).parents('form');
      var fileUplodBox = $(this).parents('.cr-fileupload-box');
      var deleteBtn = fileUplodBox.find('.cr-file-delete-btn');
      var fileUploadBtn = fileUplodBox.find('.cr-file-upload-btn');
      var errorClass = null;
      fileUplodBox.find('.cr-file-upload, .cr-file-text').val('');
      var uploadedId = fileUplodBox.find('.cr-file-upload').attr("id");
      fileUplodBox.find('#' + uploadedId + 'Url').attr('value', null);
      if ($(this).parents('.cr-fileupload-box').find('.cr-file-upload')[0].validity.valid === false) {
        $(this).parents('.cr-fileupload-box').find('.car-reservation-upload-text').hide();
        $(this).parents('.cr-fileupload-box').find('.cr-file-upload').addClass('is-invalid');
      } else {
        $(this).parents('.cr-fileupload-box').find('.car-reservation-upload-text').show();
        $(this).parents('.cr-fileupload-box').find('.cr-file-upload').removeClass('is-invalid');
      }
      fileUplodBox.find('.cr-file-text').removeClass('is-invalid');
      fileUplodBox.find('.cr-file-text').removeClass('size-is-invalid');
      errorClass = form.find('.is-invalid');
      addHideClass(deleteBtn);
      fileUploadBtn.find('img.file-upload-icon').show();
      fileUploadBtn.find('img.file-uploaded-icon').hide();
      fileUploadBtn.removeClass('disabled');
      if (errorClass.length == 0) {
        form.find('.cruf-submit-btn').prop('disabled', '');
      }
    });
  }

  // function ajaxFileUpload(form, endPoint, file) {
  //     var data = new FormData(file.prop('files')[0]);

  //     $.ajax({
  //         // type: "POST",
  //         type: "GET",
  //         enctype: 'multipart/form-data',
  //         url: endPoint,
  //         data: data,
  //         processData: false,
  //         contentType: false,
  //         cache: false,
  //         success: function (data) {
  //             $doc.ajaxStop(function() {
  //                 form.find('.cruf-submit-btn').prop('disabled', '');
  //             });
  //         },
  //         error: function (e) {
  //             console.log('fail');
  //         }
  //     });
  // }

  function uploadBlobByStream(checkMD5, documentId, uploadButtonId) {
    var sasKey = $('#sasKey').val();
    var blobUri = $('#blobUri').val();
    var container = $('#container').val();
    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, sasKey).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());
    var tempCartId = $('#tempCartId').val(); // Pass hybris cart id here.
    var email = $('#email').val();
    var files = document.getElementById(documentId).files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }
    var file = files[0];

    if (!blobService) return;

    uploadButtonId.addClass('disabled');
    // Make a smaller block size when uploading small blobs
    var blockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
    var options = {
      storeBlobContentMD5: checkMD5,
      blockSize: blockSize
    };
    blobService.singleBlobPutThresholdInBytes = blockSize;

    var finishedOrError = false;
    var fileNameConversion = email + "_" + tempCartId + "/" + file.name;
    var speedSummary = blobService.createBlockBlobFromBrowserFile(container, fileNameConversion, file, options, function(error, result, response) {
      finishedOrError = true;
      uploadButtonId.removeClass('disabled');
      if (error) {
        alert('Upload failed, open browser console for more detailed info.');
        console.log(error);
        //displayProcess(0);
        $('#' + documentId).parents('.cr-fileupload-box').find('.cr-file-delete-btn').trigger('click');
        // BUILD RETRY HERE IF YOU WANT
      } else {
        console.log("Final URL " + blobUri + "/" + container + "/" + fileNameConversion); // PASS THIS TO COOKIE SO HYBRIS CAN PICK UP THE URL
        $('#' + documentId + 'Url').val(blobUri + "/" + container + "/" + fileNameConversion);
        $('.cruf-submit-btn').prop('disabled', '');
      }
    });
  }

  function addHideClass(el) {
    $(el).addClass('hide-class');
  }

  function removeHideClass(el) {
    $(el).removeClass('hide-class');
  }

  function tabsOn() {
    $doc.off('click.tabs');
    $doc.on('click.tabs', '.car-reservation-upload-item', function() {
      var activeFormId = $(this).data('trigger-id');
      addHideClass('.car-reservation-upload-form');
      removeHideClass('#' + activeFormId);
      $(this).addClass('active').siblings().removeClass('active');
    });
  }

  function responseOn(response, el) {
    //var response = JSON.parse(response);
    //var res = response.responseData;
    var form = $(el);
    //var successFlag = form.data('success-flag');
    var accordionToOpen = form.data('accordionto-open');
    var formdata = {};
    form.serializeArray().map(function(x) {
      formdata[x.name] = x.value;
    });

    if (form.hasClass('car-reservation-personal-info')) {
      personalInfoFormData = null;
      personalInfoFormData = formdata;
      accordionClose('#car-reservation-personal-info');
      accordionOpen(accordionToOpen);
      appointmentDatepickerOn();
    } else if (form.hasClass('car-reservation-appointment-form')) {
      appointmentInfoFormData = null;
      appointmentInfoFormData = formdata;
      accordionClose('#car-reservation-appointment-form');
      accordionOpen(accordionToOpen);
      defaultDeliveryMethod = form.data('default-appointment-method');
      updateDetailConfirmationModal();
      if ($('#checkout-deposit').val() == 'true') {
        $('#car-reservation-information-modal').modal('show');
      }
    } else if (form.hasClass('car-reservation-individual-form')) {
      docIndividualInfoFormData = null;
      docCompanyInfoFormData = null;
      docIndividualInfoFormData = formdata;
      docEmptyCheck(docIndividualInfoFormData);
      updateDetailConfirmationModal();
      $('#car-reservation-information-modal').modal('show');
    } else if (form.hasClass('car-reservation-company-form')) {
      docIndividualInfoFormData = null;
      docCompanyInfoFormData = null;
      docCompanyInfoFormData = formdata;
      docEmptyCheck(docCompanyInfoFormData);
      updateDetailConfirmationModal();
      $('#car-reservation-information-modal').modal('show');
    }
  }

  function docEmptyCheck(el) {
    $.each(el, function(i, val) {
      if (val !== '') {
        isDocInfoFormDataEmpty = false;
        return true;
      }
    });
  }

  function updateDetailConfirmationModal() {
    updateModalInfo();
    if (isDocInfoFormDataEmpty) {
      addHideClass('.car-resevation-modal-doc-info');
    } else {
      removeHideClass('.car-resevation-modal-doc-info');
      addHideClass('.car-resevation-modal-company-doc, .car-resevation-modal-individual-doc, .car-resevation-modal-company-npwp-doc, .car-resevation-modal-individual-npwp-doc');
      if (docIndividualInfoFormData === null) {
        if (docCompanyInfoFormData.companyNpwp != undefined) {
          removeHideClass('.car-resevation-modal-company-npwp-doc');
          updateCompanyNpwpInfo();
        } else {
          removeHideClass('.car-resevation-modal-company-doc');
          updateCompanyInfo();
        }
      } else if (docCompanyInfoFormData === null) {
        if (docIndividualInfoFormData.individualNpwp != undefined) {
          removeHideClass('.car-resevation-modal-individual-npwp-doc');
          updateIndividualNpwpInfo();
        } else {
          removeHideClass('.car-resevation-modal-individual-doc');
          updateIndividualInfo();
        }
      }
    }
  }

  function updateModalInfo() {
    $('#first-name-field').html(personalInfoFormData.firstName);
    $('#last-name-field').html(personalInfoFormData.lastName);
    $('#contact-number-field').html(personalInfoFormData.contactNumber);
    $('#email-field').html(personalInfoFormData.email);
    $('#identification-number-field').html(personalInfoFormData.identificationNumber);
    $('#vat-field').html(personalInfoFormData.vatRegisterationNumber);
    $('#address-field').html(personalInfoFormData.address);
    $('#delivery-method-field').html(appointmentInfoFormData.deliverymethod ? appointmentInfoFormData.deliverymethod : defaultDeliveryMethod);
    if (appointmentInfoFormData.isHomeDelivery == "true") {
      $('#appointment-date-field').html("-");
    } else {
      $('#appointment-date-field').html(appointmentInfoFormData.appointmentDate);
    }
    $('#test-drive-field').html(appointmentInfoFormData.testDrive ? $('#test-drive-yes').val() : $('#test-drive-no').val());
  }

  function updateIndividualInfo() {
    var uploadedText = $('#document-uploaded').val();
    var notUploadedText = $('#document-not-uploaded').val();
    $('#personal-id-field').html(docIndividualInfoFormData.personalId != '' && docIndividualInfoFormData.personalId != undefined ? uploadedText : notUploadedText);
    $('#payslip-field').html(docIndividualInfoFormData.payslip != '' && docIndividualInfoFormData.payslip != undefined ? uploadedText : notUploadedText);
    $('#bank-statement-field').html(docIndividualInfoFormData.bankstatement != '' && docIndividualInfoFormData.bankstatement != undefined ? uploadedText : notUploadedText);
    $('#family-card-field').html(docIndividualInfoFormData.familycard != '' && docIndividualInfoFormData.familycard != undefined ? uploadedText : notUploadedText);
    $('#saving-account-number-field').html(docIndividualInfoFormData.savingsAccount != '' && docIndividualInfoFormData.savingsAccount != undefined ? uploadedText : notUploadedText);
    $('#building-tax-field').html(docIndividualInfoFormData.buildingTax != '' && docIndividualInfoFormData.buildingTax != undefined ? uploadedText : notUploadedText);
  }

  function updateCompanyInfo() {
    var uploadedText = $('#document-uploaded').val();
    var notUploadedText = $('#document-not-uploaded').val();
    $('#national-id-field').html(docCompanyInfoFormData.nationalId != '' && docCompanyInfoFormData.nationalId != undefined ? uploadedText : notUploadedText);
    $('#notary-field').html(docCompanyInfoFormData.notary != '' && docCompanyInfoFormData.notary != undefined ? uploadedText : notUploadedText);
    $('#license-field').html(docCompanyInfoFormData.businessLicense != '' && docCompanyInfoFormData.businessLicense != undefined ? uploadedText : notUploadedText);
    $('#tax-id-field').html(docCompanyInfoFormData.taxId != '' && docCompanyInfoFormData.taxId != undefined ? uploadedText : notUploadedText);
    $('#bank-field').html(docCompanyInfoFormData.bankStatement != '' && docCompanyInfoFormData.bankStatement != undefined ? uploadedText : notUploadedText);
    $('#residence-field').html(docCompanyInfoFormData.residence != '' && docCompanyInfoFormData.residence != undefined ? uploadedText : notUploadedText);
    $('#company-npwp').html(docCompanyInfoFormData.companyNpwp != '' && docCompanyInfoFormData.companyNpwp != undefined ? uploadedText : notUploadedText);
  }

  function updateIndividualNpwpInfo() {
    var uploadedText = $('#document-uploaded').val();
    var notUploadedText = $('#document-not-uploaded').val();
    $('#npwp-personal-id-field').html(docIndividualInfoFormData.personalId != '' && docIndividualInfoFormData.personalId != undefined ? uploadedText : notUploadedText);
    $('#individual-npwp').html(docIndividualInfoFormData.individualNpwp != '' && docIndividualInfoFormData.individualNpwp != undefined ? uploadedText : notUploadedText);
  }

  function updateCompanyNpwpInfo() {
    var uploadedText = $('#document-uploaded').val();
    var notUploadedText = $('#document-not-uploaded').val();
    $('#company-npwp').html(docCompanyInfoFormData.companyNpwp != '' && docCompanyInfoFormData.companyNpwp != undefined ? uploadedText : notUploadedText);
    $('#company-nppkp').html(docCompanyInfoFormData.companyNppkp != '' && docCompanyInfoFormData.companyNppkp != undefined ? uploadedText : notUploadedText);
  }

  function accordionOpen(el) {
    var accordionBox = $('#' + el).parents('.panel-default');
    accordionBox.addClass('active').find('.car-reservation-panel-head ').addClass('active');
    accordionBox.find('.car-reservation-panel-link').attr('data-toggle', 'collapse');
    accordionBox.find('.panel-collapse').addClass('show');
  }

  function accordionClose(el) {
    var accordionBox = $(el).parents('.panel-default');
    // accordionBox.removeClass('active').find('.car-reservation-panel-head ').removeClass('active');
    accordionBox.find('.panel-collapse').removeClass('show').addClass('collapse');
  }

  function accordionDisable(el) {
    var accordionBox = $(el).parents('.panel-default');
    accordionBox.removeClass('active').find('.car-reservation-panel-head ').removeClass('active');
    accordionBox.find('.car-reservation-panel-link').attr('data-toggle', '');
    accordionBox.find('.panel-collapse').removeClass('show');
  }

  function accordionOn() {
    $doc.on('click', '.car-reservation-panel-link', function(e) {
      e.preventDefault();
      var accordionToClose = $(this).data('collapse-accordion');
      if ($(this).attr('data-toggle') != '') {
        accordionClose(accordionToClose);
      }
    });
  }

  function deliverymethodOn() {
    $doc.off('change.deliveryMethod');
    $doc.on('change.deliveryMethod', '.car-reservation-deliverymethod', function() {
      $('.crdm-label').removeClass('active');
      $(this).parents('.crdm-label').addClass('active');
      if ($(this).hasClass('pickupinbranch')) {
        addHideClass('.craf-homedelivery-box');
        removeHideClass('.craf-pickupinbranch-box');
      } else if ($(this).hasClass('homedelivery')) {
        addHideClass('.craf-pickupinbranch-box');
        removeHideClass('.craf-homedelivery-box');
      }
    });
  }

  function userIdentificationCheck() {
    var formEl = $('#car-reservation-personal-info'),
      endPoint = formEl.data('user-validation-endpoint'),
      firstName = formEl.find('#firstname').val(),
      lastName = formEl.find('#lastname').val(),
      identificationNumber = formEl.find('#identificationnumber').val(),
      defaultErrorMsg = formEl.find('#identificationnumber').data('default-error-msg'),
      identificataionErrorMsg = formEl.find('#identificationnumber').data('validation-check-msg');
    formEl.find('.btn').prop('disabled', 'disabled');
    if (firstName !== '' && identificationNumber !== '') {
      $.ajax({
        type: "GET",
        url: endPoint + '?identificationNumber=' + identificationNumber + '&firstName=' + firstName + '&lastName=' + lastName,
        success: function success(data) {
          if (data === 'Success') {
            $('#hidden-identificationfield').val($('#identificationnumber').val());
            $('#identificationnumber').removeClass('is-invalid');
            $('#identificationnumber').next('.invalid-feedback').html(defaultErrorMsg);
            forms_validation(formEl, true);
          } else {
            $('#hidden-identificationfield').val('');
            $('#identificationnumber').addClass('is-invalid');
            $('#identificationnumber').next('.invalid-feedback').html(identificataionErrorMsg);
            formEl.find('.btn').prop('disabled', 'disabled');
          }
        }
      });
    }
  }

  function sasExpireyOn() {
    var expiryMsg = $('#sasExpiry').data('expiry-msg');
    var timer2 = $('#sasExpiry').val() + ':00';
    var interval = setInterval(function() {
      var timer = timer2.split(':');
      var minutes = parseInt(timer[0], 10);
      var seconds = parseInt(timer[1], 10);
      --seconds;
      minutes = seconds < 0 ? --minutes : minutes;
      seconds = seconds < 0 ? 59 : seconds;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      if (seconds <= 0 && minutes <= 0) {
        clearInterval(interval);
        alert(expiryMsg);
        location.reload();
      }
      timer2 = minutes + ':' + seconds;
    }, 1000);
  }

  function userIdentificationFieldsOn() {
    $doc.off('focusout.identificationCheck');
    $doc.on('focusout.identificationCheck', '.user-identification-check', function() {
      var identificationNumLn = $('#identificationnumber').val().length;
      var identificationMinLn = $('#identificationnumber').attr('minlength');
      if (identificationNumLn >= identificationMinLn) {
        userIdentificationCheck();
      }
    });
  }

  function paymentDeclinedFooter() {
    if ($('.reserve-car-confirmation-failed').length > 0) {
      $('.car-footer-container').addClass("fixed-footer");
    } else {
      $('.car-footer-container').removeClass("fixed-footer");
    }
  }

  function init() {
    $doc.ready(function() {
      if ($(carReservationSel).length > 0) {
        datepickerOn();
        fileUploadOn();
        fileUploadChangeOn();
        fileUploadDeleteOn();
        tabsOn();
        accordionOn();
        deliverymethodOn();
        userIdentificationCheck();
        userIdentificationFieldsOn();
        sasExpireyOn();
      }
      paymentDeclinedFooter();
    });
  }

  return {
    init: init,
    responseOn: responseOn,
    accordionOpen: accordionOpen,
    accordionClose: accordionClose,
    accordionDisable: accordionDisable
  };
}(jQuery);

carReservation.init();
'use strict';

var carReservationModal = function($) {
  var $doc = $(document);
  var reservationModal = '#car-reservation-information-modal';
  var oosModal = '#car-reservation-oos-modal';

  function termsConditionOn() {
    $doc.off('change.termsConditions');
    $doc.on('change.termsConditions', '#agree-termsandconditions', function() {
      if ($(this).is(':checked')) {
        $('#car-reservation-information-modal .primary-defaultgrey').prop('disabled', false);
      } else {
        $('#car-reservation-information-modal .primary-defaultgrey').prop('disabled', true);
      }
    });
  }

  function confirmPayOn() {
    $doc.off('click.confirmPay');
    $doc.on('click.confirmPay', '.crcm-confirm-pay', function() {
      this.disabled = true;
      var endpoint = $(this).data('endpoint');
      var method = $(this).data('method');

      $.ajax({
        url: endpoint,
        type: method,
        data: ""
      }).done(function(data) {
        if (data.responseJSON == 'UNABLE_TO_BLOCK_INVENTORY') {
          $(reservationModal).modal('hide');
          $(oosModal).modal('show');
        } else {
          updateConfirmPayForm(data);
          $('#confirm-pay-form').submit();
        }
      }).fail(function(data) {
        if (data.responseJSON == 'UNABLE_TO_BLOCK_INVENTORY') {
          $(reservationModal).modal('hide');
          $(oosModal).modal('show');
        } else {
          updateConfirmPayForm(data);
          $('#confirm-pay-form').submit();
        }
      });
    });
  }

  function updateConfirmPayForm(data) {
    $('#mallid').val(data.mallId);
    $('#chainmerchant').val(data.chainMerchant);
    $('#amount').val(data.amount);
    $('#purchaseamount').val(data.purchaseAmount);
    $('#transidmerchant').val(data.transIdMerchant);
    $('#words').val(data.word);
    $('#requestdatetime').val(getCurrentDateTime());
    $('#currency').val(data.currency);
    $('#purchasecurrency').val(data.purchaseCurrency);
    $('#sessionid').val(data.sessionId);
    $('#name').val(data.name);
    $('#emailId').val(data.email);
    $('#basket').val(data.basket);
    $('#confirm-pay-form').attr('action', data.url);
  }

  function getCurrentDateTime() {
    var cDate = new Date(),
      yyyy = cDate.getFullYear().toString(),
      mm = (cDate.getMonth() + 1).toString(),
      month = mm < 10 ? '0' + mm : mm,
      dd = cDate.getDate() < 10 ? '0' + cDate.getDate() : cDate.getDate(),
      hh = cDate.getHours() < 10 ? '0' + cDate.getHours() : cDate.getHours(),
      min = cDate.getMinutes() < 10 ? '0' + cDate.getMinutes() : cDate.getMinutes(),
      ss = cDate.getSeconds() < 10 ? '0' + cDate.getSeconds() : cDate.getSeconds();
    var curDateTime = yyyy + month + dd + hh + min + ss;
    return curDateTime;
  }

  function editCarReservationForm() {
    $doc.off('click.editCarReservation');
    $doc.on('click.editCarReservation', '.edit-carreservation-btn', function() {
      $('.Vehicle-info-close').trigger('click');
      var accordionsToDisable = $(this).data('disable-accordion');
      carReservation.accordionOpen('car-reservation-personal-info');
      carReservation.accordionClose(accordionsToDisable);
      // carReservation.accordionDisable(accordionsToDisable);
    });
  }

  function modalCloseFunction() {
    // Function call for modal close event
    $doc.on('hidden.bs.modal', reservationModal, function(e) {
      carReservation.accordionOpen('headingOne');
      carReservation.accordionClose('#headingTwo, #headingThree');
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(reservationModal).length > 0) {
        confirmPayOn();
        termsConditionOn();
        editCarReservationForm();
        modalCloseFunction();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

carReservationModal.init();
'use strict';

var loanEligibility = function($) {
  var $doc = $(document);
  var leForm = '.loan-eligibility-form';
  var carprice = null,
    downPaymentVal = null,
    percentageTotalVal = null,
    dropdownData = null,
    tenures = null;

  function validateForm() {
    carprice = parseInt($('.loan-eligibility-form .carprice').val());
    downPaymentOn();
    percentageTotalOn();
  }
  //function to mask the integers with dots after 3 numbers
  function removeMask(data) {
    return data.replace(/[^0-9]/g, '');
  }

  function downPaymentOn() {
    $doc.off('focusout.downPayment');
    $doc.on('focusout.downPayment', '.down-payment', function() {
      var unMaskeVal = removeMask($(this).val());
      downPaymentVal = parseInt(unMaskeVal);
      var percent = downPaymentVal * 100 / carprice;
      var percentage = parseFloat(percent).toFixed(2);
      var min = $('.percentage-total').attr('min');
      var max = $('.percentage-total').attr('max');
      if (percent < min || percent > max) {
        $('.percentage-total').val(percentage).addClass('is-invalid');
        $('.down-payment').addClass('is-invalid');
      } else {
        $('.percentage-total').val(percentage).removeClass('is-invalid');
        roundOffDownpayment($('.percentage-total'));
      }
      var reversePercentage = unMaskeVal.toString().split('').reverse();
      var maskedPercentage = maskPercentage(reversePercentage);
      $(this).val(maskedPercentage);
    });

    //on focusout of down payment
    $doc.off('focusout.monthly_household_income');
    $doc.on('focusout.monthly_household_income', '.monthly-house-hold-income', function() {
      var unMaskeVal = removeMask($(this).val());
      var reversePercentage = unMaskeVal.toString().split('').reverse();
      var maskedPercentage = maskPercentage(reversePercentage);
      $(this).val(maskedPercentage);
    });
  }

  function percentageTotalOn() {
    $doc.off('blur.percentageTotal');
    $doc.on('blur.percentageTotal', '.percentage-total', function() {
      roundOffDownpayment($(this));
    });
  }

  function roundOffDownpayment(el) {
    percentageTotalVal = parseInt(el.val());
    var percentageTotal = parseFloat(el.val()).toFixed(2);
    var min = $('.percentage-total').attr('min');
    var max = $('.percentage-total').attr('max');
    var percentage = parseInt(carprice * percentageTotal / 100);
    var reversePercentage = percentage.toString().split('').reverse();
    var maskedPercentage = maskPercentage(reversePercentage);
    if (percentageTotalVal < min || percentageTotalVal > max) {
      $('.down-payment').val(maskedPercentage).addClass('is-invalid');
    } else {
      $('.down-payment').val(maskedPercentage).removeClass('is-invalid');
    }
  }
  //function to add dots after 3 intergers in currency
  function maskPercentage(data) {
    var maskedVal = '';
    var ln = data.length - 1;
    $(data).each(function(i, v) {
      if ((i + 1) % 3 === 0) {
        if (i == ln) {
          maskedVal += v;
        } else {
          maskedVal += v + '.';
        }
      } else {
        maskedVal += v;
      }
    });
    maskedVal = maskedVal.split('').reverse().join('');
    return maskedVal;
  }

  function responseOn(data) {
    // Hybris code
    var res = data.decision;
    addHideClass('.loan-eligibility-default-view');
    addHideClass('.loan-eligibility-response .ler-default-msg');
    updateResponseText('.loan-eligibility-response .ler-expected-payment .ler-price', data.expected_monthly_payment.formattedValue);
    updateResponseText('.loan-eligibility-response .ler-down-payment .ler-price', data.total_down_payment.formattedValue);
    if (res === $.Constants.RES_LOAN_ELIGIBLE_RESPONSE && data.response_code === 200) {
      updateResponseText('.loan-eligibility-response .ler-error-msg', '');
      updateResponseText('.loan-eligibility-response .ler-success-msg', $.Constants.RES_LOAN_ELIGIBLE_MSG);
      removeHideClass('.loan-eligibility-response .ler-buy-with-loan-option, .ler-success-msg');
      addHideClass('.loan-eligibility-response .ler-change-payment-method, .ler-error-msg');
      removeHideClass('.loan-eligibility-response');
    } else if (res === $.Constants.RES_LOAN_NOT_ELIGIBLE_RESPONSE && data.response_code === 200) {
      updateResponseText('.loan-eligibility-response .ler-success-msg', '');
      updateResponseText('.loan-eligibility-response .ler-error-msg', $.Constants.RES_LOAN_NOT_ELIGIBLE_MSG);
      removeHideClass('.loan-eligibility-response .ler-change-payment-method, .ler-error-msg');
      addHideClass('.loan-eligibility-response .ler-buy-with-loan-option, .ler-success-msg');
      removeHideClass('.loan-eligibility-response');
    }
    /*Fed code*/
    // const res = data.responseData;
    // const successFlag = $(leForm).data('success-flag');
    // const failFlag = $(leForm).data('fail-flag');
    // addHideClass('.loan-eligibility-response .ler-default-msg');
    // updateResponseText('.loan-eligibility-response .ler-expected-payment .ler-price', res.monthlyPayment);
    // updateResponseText('.loan-eligibility-response .ler-down-payment .ler-price', res.downPayment);
    // if(res.flag === successFlag) {
    //   updateResponseText('.loan-eligibility-response .ler-error-msg', '');
    //   updateResponseText('.loan-eligibility-response .ler-success-msg', res.responseText)
    //   removeHideClass('.loan-eligibility-response .ler-buy-with-loan-option, .ler-success-msg');
    //   addHideClass('.loan-eligibility-response .ler-change-payment-method, .ler-error-msg');
    // }else if (res.flag === failFlag) {
    //   updateResponseText('.loan-eligibility-response .ler-success-msg', '');
    //   updateResponseText('.loan-eligibility-response .ler-error-msg', res.responseText)
    //   removeHideClass('.loan-eligibility-response .ler-change-payment-method, .ler-error-msg');
    //   addHideClass('.loan-eligibility-response .ler-buy-with-loan-option, .ler-success-msg');
    // }
  }

  function addHideClass(el) {
    $(el).addClass('hide-class');
  }

  function removeHideClass(el) {
    $(el).removeClass('hide-class');
  }

  function updateResponseText(el, text) {
    $(el).html('');
    $(el).html(text);
  }

  function resetForm() {
    $doc.off('click.resetbtn');
    $doc.on('click.resetbtn', '.ler-rest-btn', function() {
      $('.loan-eligibility-form').each(function() {
        this.reset();
        this.elements.insurance.value = "";
        $(".m88-insurance").trigger("chosen:updated");
      });
      $('.loan-eligibility-form').removeClass('was-validated').find('.is-invalid').removeClass('is-invalid');
      $(".m88-loantenure, .m88-leasing, .m88-insurance").trigger("chosen:updated");
      addHideClass('.ler-success-msg, .ler-error-msg, .ler-buy-with-loan-option, .ler-change-payment-method');
      removeHideClass('.ler-default-msg');
      $('.ler-price').html('');
    });
  }

  function loanTenureOn() {
    $doc.off("change.loanTenure");
    $doc.on("change.loanTenure", ".m88-loantenure", function() {
      var selectedTenure = $(this)[0].value;
      $.each(tenures, function(i, v) {
        if (v.code == selectedTenure) {
          var insurance = v.insurance;
          // sortObj(insurance);
          buildDropDown(insurance, $('.m88-insurance'), selectedTenure);
        }
      });
    });
  }

  // function sortObj(obj) {
  //   obj.sort(function(a, b) {
  //     return a.sequence - b.sequence;
  //   });
  // }

  function buildDropDown(result, dropdown, selectedTenure) {
    var selectedTenure = selectedTenure;
    contactUsForm.resetDropdown(dropdown, false);
    if (result != '') {
      $.each(result, function(k, v) {
        if (v.code === selectedTenure + 'R') {
          dropdown.append('<option value="' + v.code + '" selected="selected">' + v.displayName + '</option>');
        } else {
          dropdown.append('<option value="' + v.code + '" >' + v.displayName + '</option>');
        }
      });
      dropdown.trigger("chosen:updated");
    }
  }

  function buildLeasingDropDown(result, dropdown) {
    contactUsForm.resetDropdown(dropdown, false);
    if (result != '') {
      $.each(result, function(k, v) {
        dropdown.append('<option value="' + v + '" >' + v + '</option>');
      });
      dropdown.trigger("chosen:updated");
    }
  }

  function getAllDropDowns() {
    var dropdownEndpoint = $('.loan-eligibility-form').data('dropdown-endpoint');
    $.ajax({
      url: dropdownEndpoint,
      type: 'GET',
      success: function success(data) {
        dropdownData = data;
        buildAllDropdowns();
      }
    });
  }

  function buildAllDropdowns() {
    tenures = dropdownData.tenures;
    var leasing = dropdownData.leasingCompanies;
    // sortObj(tenures);
    buildDropDown(tenures, $('.m88-loantenure'), false);
    buildLeasingDropDown(leasing, $('.m88-leasing'));
    loanTenureOn();
  }

  function init() {
    $doc.ready(function() {
      if ($(leForm).length > 0) {
        validateForm();
        resetForm();
        getAllDropDowns();
        //hide the eligibility values on load and show only default messsage.
        removeHideClass('.loan-eligibility-default-view');
        addHideClass('.loan-eligibility-response');
      }
    });
  }

  return {
    init: init,
    responseOn: responseOn
  };
}(jQuery);

loanEligibility.init();
'use strict';

var slickCarouselComp = function($) {
  var $doc = $(document);
  var slickCarouselSelector = '.slick-carousel-comp';

  function slickCarouselInt() {
    var carouselEl = $(slickCarouselSelector);
    carouselEl.each(function() {
      var $this = $(this);
      $this.slick({
        dots: false,
        prevArrow: $('#' + $this.data('prev-id')),
        nextArrow: $('#' + $this.data('next-id')),
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 3000
      });
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(slickCarouselSelector).length > 0) {
        slickCarouselInt();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

slickCarouselComp.init();
'use strict';

var compare = function() {
  var $doc = $(document);
  var compareCarousel = '.compare-carousel';
  var small = 768;
  var medium = 1200;
  var large = 2000;

  function compareCarouselOn() {
    var carouselEl = $(compareCarousel);
    carouselEl.each(function() {
      var $this = $(this);
      $this.slick({
        dots: false,
        prevArrow: $('#' + $this.data('prev-id')),
        nextArrow: $('#' + $this.data('next-id')),
        infinite: false,
        speed: 300,
        slidesToScroll: 1,
        draggable: false,
        asNavFor: '.compare-carousel',
        responsive: [{
          breakpoint: large,
          settings: "unslick"
        }, {
          breakpoint: medium,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: small,
          settings: {
            slidesToShow: 2
          }
        }]
      });
    });
    if ($('.compare-specs-wrapper').eq(0).find('.slick-slide').length == 2) {
      $('.compare-specs-wrapper').addClass("compare-specs-wrapper-two-prds");
    } else {
      $('.compare-specs-wrapper').removeClass("compare-specs-wrapper-two-prds");
    }
  }

  function freezeProductsSection() {
    var compareTitleHt = $('.compare-page-title').outerHeight(true);
    var headerHeight = $('.stickySearchHeader').outerHeight();
    $(window).scroll(function() {
      var topPosition = $(window).scrollTop();
      if (topPosition > compareTitleHt) {
        $('.compare-products').css('transform', 'translate(0,' + headerHeight + 'px)').addClass('compare-sticky');
      } else {
        $('.compare-products').css('transform', 'translate(0,' + 0 + 'px)').removeClass('compare-sticky');
      }
    });
  }

  function deleteFromCompareOn() {
    $doc.off('click.deleteFromCompare');
    $doc.on('click.deleteFromCompare', '.compare-product-delete', function(e) {
      e.preventDefault();
      var productId = $(this).data('prod-id');
      var redirectCompareURL = $('#compareRedirectUrl').val();
      var compareData = localStorage.getItem("compareData") !== null ? JSON.parse(localStorage.getItem("compareData")) : {};
      var compareURL = window.location.href;
      var relativeCompareURL = compareURL.substring(0, compareURL.lastIndexOf('/') + 1);
      var fullCompareURL = '';
      compareBar.deleteProductFromCompare(compareData, productId);
      fullCompareURL = compareBar.buildUrl(relativeCompareURL);
      if (Object.keys(JSON.parse(localStorage.getItem("compareData"))).length < 2 || localStorage.getItem("compareData") === null || localStorage.getItem("compareData") == "{}") {
        window.location.href = redirectCompareURL;
      } else {
        window.location.href = fullCompareURL;
      }
    });
  }

  function draganddropOn() {
    $(".compare-product-tile-wrapper .compare-product-tile").draggable({
      appendTo: ".compare-product-tile-wrapper",
      helper: "clone",
      cursor: "move",
      zIndex: 10000,
      revert: "invalid"
    });
    initDroppable($(".compare-product-tile-wrapper .compare-product-tile"));

    function initDroppable($elements) {
      $elements.droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-drop-hover",
        accept: ":not(.ui-sortable-helper)",
        over: function over(event, ui) {
          var $this = $(this);
        },
        drop: function drop(event, ui) {
          var $this = $(this);
          var thisId = $this.attr('data-id');
          var draggableId = $(ui.draggable).attr('data-id');
          var div1 = $('<div data-id="' + draggableId + '" class="compare-product-tile ui-draggable ui-draggable-handle ui-droppable">' + ui.draggable.html() + '</div>');
          var linew1 = $(this).after(div1);
          var div2 = $('<div data-id="' + thisId + '" class="compare-product-tile ui-draggable ui-draggable-handle ui-droppable">' + $(this).html() + '</div>');
          var linew2 = $(ui.draggable).after(div2);

          $(ui.draggable).remove();
          $(this).remove();

          initDroppable($(".compare-product-tile-wrapper .compare-product-tile"));
          $(".compare-product-tile-wrapper .compare-product-tile").draggable({
            appendTo: ".compare-product-tile-wrapper",
            helper: "clone",
            cursor: "move",
            zIndex: 10000,
            revert: "invalid"
          });
          $('.compare-specs-wrapper').each(function() {
            var spec1 = $(this).find('.compare-specs-tile[data-id=' + draggableId + ']');
            var clonedSpec1 = $(this).find('.compare-specs-tile[data-id=' + draggableId + ']').clone();
            var spec2 = $(this).find('.compare-specs-tile[data-id=' + thisId + ']');
            var clonedSpec2 = $(this).find('.compare-specs-tile[data-id=' + thisId + ']').clone();
            spec1.replaceWith(clonedSpec2);
            spec2.replaceWith(clonedSpec1);
          });
        }
      });
    }
  }

  function init() {
    $doc.ready(function() {
      if ($(compareCarousel).length > 0) {
        compareCarouselOn();
        freezeProductsSection();
        deleteFromCompareOn();
        draganddropOn();
        /*strikethrough fix*/
        $('.compare-product-price').each(function(index) {
          if ($(this).siblings('.compare-product-strike-price').length < 1) {
            $('<p class ="no-strike-through-price"></p>').insertAfter($(this));
          }
        });
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

compare.init();
'use strict';

var allregions = '';
var selectedDropdown = '';
var contactUsForm = function($) {
  var $doc = $(document);
  var csForm = '.form-how-can-we-help';
  var controlsDiv = $('.dependent-controls-container');

  function loadFormFields() {
    var selectedOption = $('.contact-us-type').find(':selected').attr('data-id');
    loadContactUsTypeFields(selectedOption);
  }

  function loadContactUsTypeFields(el) {
    var $El = $('#' + el);
    $(".chosen-select").chosen("destroy");
    controlsDiv.html("");
    controlsDiv.append($El.html());
    $(".chosen-select").chosen({
      disable_search: true
    }).change(function() {
      $(this).trigger("chosen:close");
    });
    forms_validation($(csForm), true);
  }

  function changeTypeOn() {
    $doc.off('change.contactUsType');
    $doc.on('change.contactUsType', '.contact-us-type', function() {
      var selectedType = $(this).find(':selected').attr("data-id");
      loadContactUsTypeFields(selectedType);
      forms_validation($(csForm), true);
      resetFormValidatedClass();
      datepickerOn();
    });
  }

  function datepickerOn() {
    $('.m88-date-picker').datepicker({
      startDate: '+1d',
      format: 'yyyy-mm-dd'
    }).on('changeDate', function(e) {
      $(this).datepicker('hide');
      $(this).focusout();
    });
  }

  function resetFormValidatedClass() {
    $('.form-how-can-we-help').removeClass('was-validated');
  }

  function resetForm() {
    $('#contact-us-modal').on('hidden.bs.modal', function(e) {
      if ($('#contact-us-modal').hasClass('failure-modal')) {
        $('#contact-us-modal').removeClass('failure-modal');
      } else {
        $('#form-how-can-we-help').get(0).reset();
        $('.form-how-can-we-help').removeClass('was-validated');
        loadFormFields();
      }
    });
  }

  function getAllBranches() {
    var branch = $('.m88-branch'),
      method = branch.data('method'),
      url = branch.data('endpoint');
    getData(method, url, branch);
  }

  function buildBranchDropDown(result, dropdown) {
    result = sortByKey(result, 'name');
    resetDropdown(dropdown, false);
    if (result != '') {
      $.each(result, function(k, v) {
        dropdown.append('<option value="' + v.name + '">' + v.displayName + '</option>');
      });
    }
    $(".m88-branch").trigger("chosen:updated");
  }

  function resetDropdown(dropdown, placeholderNotRequired) {
    $.each(dropdown, function(dd, ddval) {
      var placeholder = $(ddval).data('placeholder');
      if (!placeholder) {
        placeholder = dropdown.data('placeholder');
      }
      var placeholderOption = '<option value="" disabled selected>' + placeholder + '</option>';
      $(ddval).html('');
      if (!placeholderNotRequired) {
        $(ddval).append(placeholderOption);
      }
    });
  }

  function getData(method, url, el) {
    $.ajax({
      type: method,
      url: url,
      success: function success(data) {
        if (el.hasClass('m88-branch')) {
          buildBranchDropDown(data.stores, el);
        } else if (el.hasClass('m88-region')) {
          allregions = data.regions;
          buildRegionDropDown(data.regions, el);
        }
      }
    });
  }

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  function getAllRegions() {
    var region = $('.m88-region'),
      method = region.data('method'),
      url = region.data('endpoint');
    getData(method, url, region);
  }

  function buildRegionDropDown(result, dropdown) {
    result = sortByKey(result, 'name');
    resetDropdown(dropdown, false);
    var selectedRegion = $('#defaultRegion').length > 0 ? $('#defaultRegion').val() : false;
    var regionVal = false;
    if (result != '') {
      $.each(result, function(k, v) {
        var isRSelected = selectedRegion ? v.isocode == selectedRegion ? true : false : false;
        if (isRSelected) {
          regionVal = v.cities;
          dropdown.append('<option value="' + v.isocode + '" selected>' + v.name + '</option>');
        } else {
          dropdown.append('<option value="' + v.isocode + '" >' + v.name + '</option>');
        }
      });
      $(".m88-region").trigger("chosen:updated");
      if (selectedRegion) {
        buildCityDropDown(regionVal, $('.m88-city'));
      }
    }
  }

  function buildCityDropDown(result, dropdown) {
    resetDropdown(dropdown, true);
    var selectedCity = $('#defaultCity').length > 0 ? $('#defaultCity').val() : false;
    if (result != '') {
      $.each(result, function(k, v) {
        var isCSelected = selectedCity ? v.isocode == selectedCity ? true : false : false;
        if (isCSelected) {
          dropdown.append('<option value="' + v.isocode + '" selected>' + v.name + '</option>');
        } else {
          dropdown.append('<option value="' + v.isocode + '" >' + v.name + '</option>');
        }
      });
      $(".m88-city").trigger("chosen:updated");
    }
  }

  function updateCityDropdown() {
    $doc.off("change.regionDD");
    $doc.on("change.regionDD", ".m88-region", function() {
      selectedDropdown = $(this)[0].value;
      var cityDD = $(this).parents('form').find($('.m88-city')),
        selectedCities = allregions.find(checkRegion);
      buildCityDropDown(selectedCities.cities, cityDD);
    });
  }

  function checkRegion(allreg) {
    return allreg.name == selectedDropdown;
  }

  function responseSuccess(response, formEl) {
    $('#contact-us-modal').modal('show');
    var type = $(formEl).find('.contact-us-type').find(':selected').attr('data-id');
    if ($(formEl).find('.sell-car-input').attr('data-id') == "sell-car-controls") {
      type = $(formEl).find('.sell-car-input').attr('data-id');
    }
    $('#contact-us-modal').removeClass('failure-modal');
    addClassDispNone('.enquiry-fail-head, .enquiry-fail-message, .enquiry-success-message, .enquiry-fail-btn');
    removeClassDispNone('.enquiry-success-head, .enquiry-success-btn, .enquiry-success-message[data-id=' + type + ']');
  }

  function responseFailure(response, formEl) {
    $('#contact-us-modal').modal('show');
    $('#contact-us-modal').addClass('failure-modal');
    addClassDispNone('.enquiry-success-head, .enquiry-success-message, .enquiry-success-btn');
    removeClassDispNone('.enquiry-fail-head, .enquiry-fail-message, .enquiry-fail-btn');
  }

  function removeClassDispNone(el) {
    $(el).removeClass('dsp-none');
  }

  function addClassDispNone(el) {
    $(el).addClass('dsp-none');
  }

  function customDropdownOn() {
    $(".chosen-select").chosen({
      disable_search: true
    }).change(function() {
      $(this).trigger("chosen:close");
    });
    forms_validation(false, true);
  }

  function formObj(formVal) {
    contactUsRequestPayload.enquiryType = '';
    contactUsRequestPayload.firstName = '';
    contactUsRequestPayload.lastName = '';
    contactUsRequestPayload.contactNumber = '';
    contactUsRequestPayload.email = '';
    contactUsRequestPayload.city = '';
    contactUsRequestPayload.region = '';
    contactUsRequestPayload.message = '';
    contactUsRequestPayload.carBrand = '';
    contactUsRequestPayload.carType = '';
    contactUsRequestPayload.transmission = '';
    contactUsRequestPayload.colour = '';
    contactUsRequestPayload.mileage = '';
    contactUsRequestPayload.personalOrCorporate = '';
    contactUsRequestPayload.branch = '';
    // contactUsRequestPayload.branch.displayName = '';
    contactUsRequestPayload.vehicleRegExpiry = '';
    contactUsRequestPayload.certOwnershipNo = '';
    contactUsRequestPayload.price = '';
    contactUsRequestPayload.programName = '';
    contactUsRequestPayload.vehicleIdentificationNumber = '';
    contactUsRequestPayload.corporateName = '';
    switch (formVal.contactus.value) {
      case "GENERAL":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        break;
      case "TRADEIN":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        contactUsRequestPayload.carBrand = formVal.brandmodel.value;
        contactUsRequestPayload.carType = formVal.typeseries.value;
        contactUsRequestPayload.transmission = formVal.transmission.value;
        contactUsRequestPayload.colour = formVal.colour.value;
        contactUsRequestPayload.mileage = formVal.mileage.value;
        contactUsRequestPayload.personalOrCorporate = formVal.personalOrCorporate.value;
        contactUsRequestPayload.branch = formVal.branch.value;
        //contactUsRequestPayload.branch.displayName = formVal.branch.selectedOptions[0].text;
        break;
      case "SELLCAR":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        contactUsRequestPayload.vehicleRegExpiry = formVal.vehicle_registration_expiry.value;
        contactUsRequestPayload.certOwnershipNo = formVal.cert_ownership_number.value;
        contactUsRequestPayload.price = parseInt(formVal.price.value);
        contactUsRequestPayload.carBrand = formVal.brandmodel.value;
        contactUsRequestPayload.carType = formVal.typeseries.value;
        contactUsRequestPayload.transmission = formVal.transmission.value;
        contactUsRequestPayload.colour = formVal.colour.value;
        contactUsRequestPayload.mileage = formVal.mileage.value;
        contactUsRequestPayload.personalOrCorporate = formVal.personalOrCorporate.value;
        contactUsRequestPayload.branch = formVal.branch.value;
        // contactUsRequestPayload.branch.displayName = formVal.branch.selectedOptions[0].text;
        break;
      case "BUYCAR":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        contactUsRequestPayload.carBrand = formVal.brandmodel.value;
        contactUsRequestPayload.carType = formVal.typeseries.value;
        contactUsRequestPayload.transmission = formVal.transmission.value;
        contactUsRequestPayload.colour = formVal.colour.value;
        contactUsRequestPayload.personalOrCorporate = formVal.personalOrCorporate.value;
        contactUsRequestPayload.branch = formVal.branch.value;
        // contactUsRequestPayload.branch.displayName = formVal.branch.selectedOptions[0].text;
        break;
      case "COMPLAIN":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        break;
      case "PROGRAM":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.programName = formVal.program_promotion_name.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        break;
      case "DOKUMEN":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.vehicleIdentificationNumber = formVal.VIN_Number.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        break;
      case "CORPORATE":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.corporateName = formVal.corporate_name.value;
        contactUsRequestPayload.region = formVal.province.value;
        contactUsRequestPayload.message = formVal.usermessage.value;
        break;
      case "APPOINTMENT":
        contactUsRequestPayload.enquiryType = formVal.contactus.value;
        contactUsRequestPayload.firstName = formVal.firstname.value;
        contactUsRequestPayload.lastName = formVal.lastname.value;
        contactUsRequestPayload.contactNumber = formVal.contactnumber.value;
        contactUsRequestPayload.email = formVal.emailaddress.value;
        contactUsRequestPayload.city = formVal.city.value;
        contactUsRequestPayload.branch = formVal.branch.value;
        contactUsRequestPayload.carBrand = formVal.brandmodel.value;
        contactUsRequestPayload.carType = formVal.typeseries.value;
        contactUsRequestPayload.transmission = formVal.transmission.value;
        contactUsRequestPayload.colour = formVal.colour.value;
        contactUsRequestPayload.additionalAttribute = "ProductID : " + formVal.appointmentProductCode.value + "\n Preferred Appointment Date : " + formVal.date.value;
        break;
      default:
    }
  }

  function init() {
    $doc.ready(function() {
      if ($(csForm).length > 0) {
        loadFormFields();
        changeTypeOn();
        resetForm();
        getAllBranches();
        datepickerOn();
      }
      if ($('.chosen-select').length > 0) {
        customDropdownOn();
        getAllRegions();
        updateCityDropdown();
      }
    });
  }

  return {
    init: init,
    responseSuccess: responseSuccess,
    responseFailure: responseFailure,
    formObj: formObj,
    resetDropdown: resetDropdown
  };
}(jQuery);

contactUsForm.init();
"use strict";

var contactUsRequestPayload = {
  "enquiryType": "",
  "firstName": "",
  "lastName": "",
  "city": "",
  "contactNumber": "",
  "email": "",
  "programName": "",
  "corporateName": "",
  "vehicleRegExpiry": "",
  "certOwnershipNo": "",
  "price": 0,
  "carBrand": "",
  "carType": "",
  "transmission": "",
  "colour": "",
  "mileage": "",
  "personalOrCorporate": "",
  "branch": "",
  "vehicleIdentificationNumber": "",
  "message": ""
};
"use strict";

$(document).ready(function() {
  var helpSupports = $(".help-support");
  var howItWorks = $(".how-it-works");
  var dropDownMenu = $(".dropdown-hover-menu");
  $(document).on('mouseenter', "#profile-li", function() {
    $(this).children('.dropdown-hover-menu').show();
  });
  $(document).on('mouseleave', "#profile-li", function() {
    $(this).children('.dropdown-hover-menu').hide();
  });
  $(document).on('mouseenter', "#help-supportsticky", function() {
    $(this).children('.help-support').show();
    $(this).addClass('show');
  });
  $(document).on('mouseleave', "#help-supportsticky", function() {
    $(this).children('.help-support').hide();
    $(this).removeClass('show');
  });
  $(document).on('mouseenter', "#how-it-workssticky", function() {
    $(this).children('.how-it-works').show();
    $(this).addClass('show');
  });
  $(document).on('mouseleave', "#how-it-workssticky", function() {
    $(this).children('.how-it-works').hide();
    $(this).removeClass('show');
  });
  $(".dropdown").on("shown.bs.dropdown", function(event) {
    if ($(this)[0].id == 'how-it-workssticky') {
      howItWorks.show();
    }
    if ($(this)[0].id == 'help-supportsticky') {
      helpSupports.show();
    }
  });
  $(".dropdown").on("hidden.bs.dropdown", function(event) {
    if ($(this)[0].id == 'how-it-workssticky') {
      howItWorks.hide();
    }
    if ($(this)[0].id == 'help-supportsticky') {
      helpSupports.hide();
    }
  });
  $(".dropdown").on("show.bs.dropdown", function(event) {
    if ($(this)[0].id == 'how-it-workssticky') {
      howItWorks.show();
    }
    if ($(this)[0].id == 'help-supportsticky') {
      helpSupports.show();
    }
  });
  $(".dropdown").on("hide.bs.dropdown", function(event) {
    if ($(this)[0].id == 'how-it-workssticky') {
      howItWorks.hide();
    }
    if ($(this)[0].id == 'help-supportsticky') {
      helpSupports.hide();
    }
  });

  $(window).scroll(function() {
    howItWorks.hide();
    helpSupports.hide();
    $('#how-it-workssticky').removeClass('show');
    $('#help-supportsticky').removeClass('show');
    $("#how-it-workssticky").trigger("mouseleave");
    $("#help-supportsticky").trigger("mouseleave");
    var height = $(window).scrollTop();
    var s = $(".stickyHeader");
    var clogo = $(".color-logo");
    var wlogo = $(".white-logo");
    var search = $(".sticky-input");
    var topOfOthDiv = 0;
    if ($("#othdiv").length != 0) {
      topOfOthDiv = $("#othdiv").offset().top;
    } else {
      topOfOthDiv = 0;
    }
    var stickyFilter = $(".sticky-filter");
    var sHide = $(".s-hide");
    if (height > 50) {
      $('#stickyHeader').fadeIn();
    } else {
      $('#stickyHeader').fadeOut();
    }
    if ($(window).scrollTop() < topOfOthDiv) {
      s.addClass("banner-sticky");
      wlogo.show();
      clogo.hide();
      search.hide();
      $('.typeahead-input').trigger('focusout');
      $('.typeahead-input').blur();
      stickyFilter.hide();
      stickyFilter.removeClass("stickyHeader");
      sHide.removeClass("v-hidden");
    } else {
      s.removeClass("banner-sticky");
      wlogo.hide();
      clogo.show();
      search.show();
      stickyFilter.show();
      stickyFilter.addClass("stickyHeader");
      sHide.addClass("v-hidden");
    }
  });
  $('#stickyHeader').addClass('remove');
  $('.sticky-filter').addClass('remove');
  $('.nav-slider .submenu').addClass('collapsed');
});
"use strict";

var headerLoggedin = function($) {
  var $doc = $(document);

  function init() {
    $doc.ready(function() {
      var dropDownMenu = $(".dropdown-hover-menu");
      var helpSupportId = $("#help-support");
      var helpSupports = $(".help-support");
      var howItWorksId = $("#how-it-works");
      var howItWorks = $(".how-it-works");
      var profileId = $("#profile-li");

      var dropdown = $(".dropdown-hover-toggle");
      var howItWorksToggle = $("#how-it-works .dropdown-toggle");
      var helpSupportsToggle = $("#help-support .dropdown-toggle");

      profileId.hover(function() {
        dropDownMenu.show();
      }, function() {
        dropDownMenu.hide();
      });
      dropdown.on('click', function() {
        if (dropDownMenu.is(":visible")) {
          dropDownMenu.hide();
        } else {
          dropDownMenu.show();
        }
      });
      helpSupportId.hover(function() {
        helpSupports.show();
        helpSupportId.addClass('show');
      }, function() {
        helpSupports.hide();
        helpSupportId.removeClass('show');
      });
      helpSupportsToggle.on('click', function() {
        if (helpSupports.is(":visible")) {
          helpSupports.hide();
          helpSupportId.removeClass('show');
          helpSupports.removeClass('show');
        } else {
          helpSupports.show();
          helpSupportId.addClass('show');
          helpSupports.addClass('show');
        }
      });
      howItWorksId.hover(function() {
        howItWorks.show();
        howItWorksId.addClass('show');
      }, function() {
        howItWorks.hide();
        howItWorksId.removeClass('show');
      });
      howItWorksToggle.on('click', function() {
        if (howItWorks.is(":visible")) {
          howItWorks.hide();
          howItWorksId.removeClass('show');
          howItWorks.removeClass('show');
        } else {
          howItWorks.show();
          howItWorksId.addClass('show');
          howItWorks.addClass('show');
        }
      });
    });
  }
  return {
    init: init
  };

  
}(jQuery);

headerLoggedin.init();
'use strict';

$(document).ready(function() {
  $('.home-page-banner-carousel').on('init', function(event, slick) {
    setTimeout(function() {
      $('.home-page-banner-carousel').css("visibility", "visible");
      $('.default-image').hide();
    }, 2);
  });
  $('.home-page-banner-carousel').slick({
    arrows: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    dotsClass: "vertical-dots",
    mobileFirst: true,
    autoplay: true
  });
});
'use strict';

var navBar = function($) {
  var $doc = $(document);
  var navBar = '.myacc-ln-links';
  // const target = '#carros-right-content';
  // const navSelect = '.myacc-ln-select';
  // var carprice = null,
  //   downPaymentVal = null,
  //   percentageTotalVal = null;

  // function NavOn() {
  //   $doc.off('click.leftNavLink');
  //   $doc.on('click.leftNavLink', '.myacc-ln-link', function (event) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     var $this = $(this);
  //     var $thisId = $this.data('id');
  //     var $endpoint = $this.attr('href');
  //     removeNavActiveClass();
  //     addNavActiveClass($this);
  //     updateHTML($endpoint);
  //     $(navSelect).find('option[data-id=' + $thisId +']').prop('selected', 'selected');
  //     $(navSelect).trigger("chosen:updated");
  //   });
  // }

  function navChangeOn() {
    $doc.off('change.leftNavSelect');
    $doc.on('change.leftNavSelect', '.myacc-ln-select', function() {
      window.location.href = $(this).val();
      // var $thisId = $(this).find(':selected').attr('data-id');
      // var navEl = $('.myacc-ln-link[data-id=' + $thisId + ']');
      // var $endpoint = $(this).val();
      // removeNavActiveClass();
      // addNavActiveClass(navEl);
      // updateHTML($endpoint);
    });
  }

  // function removeNavActiveClass() {
  //   $('.myacc-ln-link').removeClass('active');
  // }

  // function addNavActiveClass(el) {
  //   $(el).addClass('active');
  // }

  // function updateHTML(url) {
  //   $.ajax({
  //     type: 'GET',
  //     url: url,
  //     success: function (data) {
  //       $(target).html('');
  //       $(target).html(data);
  //     }
  //   });
  // }

  function init() {
    $doc.ready(function() {
      if ($(navBar).length > 0) {
        // NavOn();
        navChangeOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

navBar.init();
'use strict';

var pagination = function($) {
  var $doc = $(document);
  var paginationSelector = '.pagination';
  var paginationDisabledSelector = '.pagination-disabled';

  function disablePaginationBtn() {
    $doc.on('click', paginationDisabledSelector, function(event) {
      event.preventDefault();
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(paginationSelector).length > 0) {
        disablePaginationBtn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

pagination.init();
'use strict';

var pdpContactUs = function($) {
  var $doc = $(document);
  var pdpContactUsSel = '.pdp-contactus-container';

  function responseSuccess(formVal) {
    var formVal = formVal;
    var months = $('.pdp-contactus-datepicker').data('months');
    var dateObj = $('.pdp-contactus-datepicker').val().split('/'),
      dd = parseInt(dateObj[0]),
      mm = parseInt(dateObj[1]) - 1,
      yyyy = parseInt(dateObj[2]),
      date = new Date(yyyy, mm, dd),
      formatted = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    $('#pdp-contactus-firstname').html(formVal.firstName);
    $('#pdp-contactus-lastname').html(formVal.lastName);
    $('#pdp-contactus-emailaddress').html(formVal.email);
    $('#pdp-contactus-contactnumber').html(formVal.contactNumber);
    $('#pdp-contactus-date').html(formatted);
    $('.pdp-contactus-form').addClass('hide-class');
    $('.pdp-contactus-success-form').removeClass('hide-class');
  }

  function responseFailure() {
    $('#pdp-contactus-error-modal').modal('show');
  }

  function pdpContactUsDatePickerOn() {
    var enddate = $('.pdp-contactus-datepicker').data('enddate');
    $('.pdp-contactus-datepicker').datepicker({
      format: 'dd/mm/yyyy',
      startDate: '+1d',
      endDate: '+' + enddate + 'd',
      orientation: 'bottom'
    }).on('changeDate', function(e) {
      $(this).datepicker('hide');
      $(this).focusout();
    });
  }

  function init() {
    $doc.ready(function() {
      if ($('.pdp-contactus-datepicker').length > 0) {
        pdpContactUsDatePickerOn();
      }
    });
  }
  return {
    init: init,
    responseSuccess: responseSuccess,
    responseFailure: responseFailure
  };
}(jQuery);
pdpContactUs.init();
'use strict';

var pdpTrayCarousel = function($) {
  var $doc = $(document);
  var carouselSelector = '.pdp-tray-carousel';
  var thumbs = '.pdp-tray-carousel-thumnails-trigger';
  var pdpMainImage = '.product-tray';
  var hybrisURL = '';
  var internalFileURL = '';
  var externalFileURL = '';
  var licenseFileURL = '';
  var graphicsFileURL = '';
  var externalViewLoaded = false;
  var internalViewLoaded = false;

  //$('.pdp-tray-carousel-thumbnails').hide();
  //$('.product-tray-mb').hide();

  // $(".product-tray").click(function() {
  //   $('#pdp-tray-modal').modal('show')
  // });

  function pdpMainImageClickOn() {
    pdpMainImageClickOff();
    $doc.on('click.pdpMainImage', pdpMainImage, function(e) {
      openProductTrayModal();
    });
  }

  function pdpMainImageClickOff() {
    $doc.on('click.pdpMainImage');
  }

  function carouselInt() {
    var carouselEl = $(carouselSelector);
    carouselEl.each(function() {
      var $this = $(this),
        count = $this.data('slide-count');
      $this.slick({
        dots: true,
        prevArrow: $('#' + $this.data('prev-id')),
        nextArrow: $('#' + $this.data('next-id')),
        infinite: true,
        speed: 300,
        slidesToShow: count,
        slidesToScroll: count,
        draggable: true
      });
    });

    if (window.matchMedia("(min-width: 1366px)").matches) {
      $('.pdp-tray-carousel-thumbnails').show();
      $('.product-tray-dt').show();
    } else {
      $('.product-tray-mb').show();
    }
    //  $('.product-tray-mb').show();
    $(window).resize();
  }

  function thumbnailsOn() {
    thumbnailsOff();
    $doc.on('click.thumbs', thumbs, function(e) {
      e.preventDefault();
      var $this = $(this),
        itemId = $this.data('trigger-id');
      if (!$this.hasClass('pdp-youtube-video')) {
        $('.product-tray-item').removeClass('active');
        $('.product-tray-item[data-show-id=' + itemId + ']').addClass('active');
      }
    });
  }

  function thumbnailsOff() {
    $doc.off('click.thumbs');
  }

  function openYoutubeModal() {
    $("#pdp-youtube-modal").on('shown.bs.modal', function(e) {
      playYoutubeVideo($(this));
    });
  }

  function closeYoutubeModal() {
    $("#pdp-youtube-modal").on('hidden.bs.modal', function(e) {
      pauseYoutubeVideo($(this));
    });
  }

  function pauseYoutubeVideo(el) {
    var El = el;
    $(El.find('iframe')).each(function() {
      var src = $(this).attr('src');
      src = src.indexOf('?') != -1 ? src.substring(0, src.indexOf('?')) : src;
      $(this).attr('src', '');
      $(this).attr('src', src);
    });
  }

  function playYoutubeVideo(el) {
    var $el = el;
    var src = $el.find('iframe').attr('src') + '?autoplay=1';
    $el.find('iframe').attr('src', '');
    $el.find('iframe').attr('src', src);
  }

  function openProductTrayModal() {
    $("#pdp-tray-modal").on('shown.bs.modal', function(e) {
      $('#pdp-tray-modal').resize();
      if (window.matchMedia("(min-width: 1366px)").matches) {
        $('.product-tray-mb').show();
      }
      $(".slick-track").addClass("slick-width");
      updateCarouselState();
      carouselSlideTo();
      setTimeout(function() {
        setIframeHeight();
      }, 1000);
      focusCarouselArrow();
    });
  }

  function closeProductTrayModal() {
    $("#pdp-tray-modal").on('hidden.bs.modal', function(e) {
      if (window.matchMedia("(min-width: 1366px)").matches) {
        $('.product-tray-mb').hide();
      }
      pauseYoutubeVideo($(this));
    });
  }

  function carouselSlideTo() {
    var mobileCarousel = $('#product-tray-mb'),
      desktopCarousel = $('#product-tray-dt'),
      slideTo = 1;
    if (mobileCarousel.is(':visible')) {
      slideTo = mobileCarousel.find('.slick-dots .slick-active').index();
    } else if (desktopCarousel.is(':visible')) {
      slideTo = desktopCarousel.find('.product-tray-item.active').index() - 1;
    }
    $('#pdp-tray-modal .pdp-tray-carousel').slick('slickGoTo', slideTo);
  }

  function updateCarouselState() {
    var totalslides = $('#pdp-tray-modal').find('.slick-dots li').length;
    if (totalslides <= 1) {
      $("#pdp-tray-modal .slick-initialized .slick-slide").addClass("width-vw");
      $(".slick-track").addClass("width-vw");
    }
    totalslides = totalslides === 0 ? 1 : totalslides;
    var currentslide = totalslides === 1 ? 1 : $('#pdp-tray-modal').find('.slick-dots li.slick-active').index() + 1;
    $('.pdp-tray-carousel-current-slide').html(currentslide);
    $('.pdp-tray-carousel-total-slide').html(totalslides);
  }

  function pdpTrayCarouselChange() {
    $('#pdp-tray-modal .pdp-tray-carousel-component').on('afterChange', function(event, slick, currentSlide, nextSlide) {
      updateCarouselState();
      focusCarouselArrow();
    });
  }

  function focusCarouselArrow() {
    $('#pdp-tray-modal .slick-arrow').focus();
    $('#pdp-tray-modal .pdp-tray-carousel-slide-count').focus();
  }

  function updateMobileCarouselState() {
    var totalslides = $('#product-tray-mb').find('.slick-dots li').length;
    totalslides = totalslides === 0 ? 1 : totalslides;
    var currentslide = totalslides === 1 ? 1 : $('#product-tray-mb').find('.slick-dots li.slick-active').index() + 1;
    $('.pdp-tray-mb-carousel-current-slide').html(currentslide);
    $('.pdp-tray-mb-carousel-total-slide').html(totalslides);
  }

  function pdpMobileCarouselChange() {
    $('#product-tray-mb .pdp-tray-carousel-component').on('afterChange', function(event, slick, currentSlide, nextSlide) {
      updateMobileCarouselState();
    });
  }

  function setIframeHeight() {
    var carouselHasYoutbueVideo = $('.youtube-player').length > 0 ? true : false;
    if (carouselHasYoutbueVideo) {
      $('.youtube-player').each(function() {
        var imageHt = $(this).parents('.pdp-tray-carousel-component').find('.pdp-tray-carousel-img').height();
        if (imageHt === 0) {
          $(this).css('height', 100);
        } else {
          $(this).css('height', imageHt);
        }
      });
    }
  }

  function resizeIframe() {
    $(window).resize(function() {
      setIframeHeight();
    });
  }

  function exteranl360On() {
    $('#wr360PlayerId').rotator({
      licenseFileURL: licenseFileURL,
      configFileURL: externalFileURL,
      graphicsPath: graphicsFileURL,
      responsiveBaseWidth: 600,
      responsiveMinHeight: 0,
      googleEventTracking: false
    });
  }

  function spinner360On() {
    $doc.off('click.360spinner');
    $doc.on('click.360spinner', '.product-tray-360spinner-block', function() {
      if (internalViewLoaded === false) {
        pannellum.viewer('panorama', {
          "type": "equirectangular",
          "panorama": internalFileURL,
          "compass": true,
          "northOffset": 247.5
        });
        internalViewLoaded = true;
      }
      $('#pdp-360-modal').modal('show');
    });
  }

  function toggle360View() {
    $doc.off('click.360ToggleLinks');
    $doc.on('click.360ToggleLinks', '.pdp-modal-360btn', function(e) {
      e.preventDefault();
      var $this = $(this),
        spinnerBoxId = $this.data('id');
      $('.pdp-modal-360btn, .pdp-modal-360-box').removeClass('active');
      $($this).addClass('active');
      $('#' + spinnerBoxId).addClass('active');

      if ($this.hasClass('pdp-modal-360-external') && externalViewLoaded === false) {
        exteranl360On();
        externalViewLoaded = true;
      }
    });
  }

  function spinner360ViewPath() {
    var productTrayWrapper = $('.product-tray-wrapper');
    hybrisURL = productTrayWrapper.data('360hybris-url');
    internalFileURL = productTrayWrapper.data('360-internal-image-url');
    externalFileURL = productTrayWrapper.data('360-external-image-url');
    licenseFileURL = productTrayWrapper.data('360-external-license-path');
    graphicsFileURL = productTrayWrapper.data('360-external-graphics-path');
  }

  function productTrayInt() {
    setTimeout(function() {
      carouselInt();
      // pdpStickyHead.showStickyOnload();
      pdpMobileCarouselChange();
      updateMobileCarouselState();
    }, 1000);
    thumbnailsOn();
    pdpMainImageClickOn();
    openYoutubeModal();
    closeYoutubeModal();
    openProductTrayModal();
    closeProductTrayModal();
    pdpTrayCarouselChange();
    setIframeHeight();
    resizeIframe();
    spinner360ViewPath();
    spinner360On();
    toggle360View();
  }

  function init() {
    $doc.ready(function() {
      if ($(carouselSelector).length > 0) {
        productTrayInt();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

pdpTrayCarousel.init();
'use strict';

var pdpStickyHead = function($) {
  var $doc = $(document);
  var stickyHeadSel = '.pdp-product-sticky-wrapper';

  function showPdpStickyHead() {
    $(window).scroll(function(event) {
      showStickyOnload();
    });
  }

  function showStickyOnload() {
    var scroll = $(window).scrollTop(),
      specsPos = parseInt($('.pdp-tray-specification-item-box').offset().top);
    if (scroll > specsPos - 180) {
      $(stickyHeadSel).addClass('show-class');
    } else {
      $(stickyHeadSel).removeClass('show-class');
    }
  }

  function init() {
    $doc.ready(function() {
      if ($(stickyHeadSel).length > 0) {
        showPdpStickyHead();
        showStickyOnload();
      }
    });
  }

  return {
    init: init
    //   ,showStickyOnload: showStickyOnload
  };
}(jQuery);
pdpStickyHead.init();
'use strict';

var pdpModalSpecs = function($) {
  var $doc = $(document);

  function toggleSpecs() {
    $doc.off('click.specTitle');
    $doc.off('pdp-spec-modal-collapse-icon');
    $doc.on('click.specTitle', '.pdp-spec-modal-title', function() {
      $(this).parents('.pdp-spec-modal-box').toggleClass('active');
      $(".pdp-spec-modal-title").not($(this)).each(function(index, obj1) {
        $(obj1).parents('.pdp-spec-modal-box').removeClass('active');
      });
    });
  }

  function init() {
    $doc.ready(function() {
      if ($('.pdp-spec-modal-title').length > 0) {
        toggleSpecs();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

pdpModalSpecs.init();
"use strict";

var wishlistAddRemove = function($) {
  var $doc = $(document);
  var wishlistSel = '.addwishlist';
  var wishlistProductCode = null;
  var addProductToWishlistUrl = null;
  var removeProductFromWishlistUrl = null;
  var isAnonymousUser = null;
  var productAdded = null;
  var productRemoved = null;

  function addWishlistFromLocalstorage() {
    if (localStorage.getItem("login-invoked-from") === "PDP-ADDTOWISHLIST") {
      addWishlist();
    }
  }

  function removeWishlist() {
    $doc.off('click.removeWishlist');
    $doc.on('click.removeWishlist', '#removeFromWishlistLink', function() {
      $.ajax({
        url: removeProductFromWishlistUrl,
        type: 'GET',
        data: {
          'productCode': wishlistProductCode
        },
        success: function success(response) {
          if (response && response.status === productRemoved) {
            $('.addProductToWishList').removeClass('dsp-none');
            $('.removeProductFromWishList').addClass('dsp-none');
            return false;
          }
        },
        error: function error(e) {}
      });
    });
  }

  function addWishlist() {
    $doc.off("click.addToWishlist");
    $doc.on("click.addToWishlist", '#addToWishlistLink', function() {
      if (isAnonymousUser === 'false') {
        $.ajax({
          url: addProductToWishlistUrl,
          type: 'GET',
          data: {
            'productCode': wishlistProductCode
          },
          success: function success(response) {
            if (response && response.status === productAdded) {
              $('.addProductToWishList').addClass('dsp-none');
              $('.removeProductFromWishList').removeClass('dsp-none');
              localStorage.removeItem("login-invoked-from");
              return false;
            }
          },
          error: function error(e) {}
        });
      } else {
        localStorage.setItem("login-invoked-from", "PDP-ADDTOWISHLIST");
        $("#signup-activation-modal").modal("show");
      }
    });
  }

  function getWishlistValues() {
    wishlistProductCode = $('#addToWishlistLink').attr('data-product-code');
    addProductToWishlistUrl = $('#addToWishlistLink').attr('data-add-to-wishlist-url');
    removeProductFromWishlistUrl = $('#removeFromWishlistLink').attr('data-remove-from-wishlist-url');
    isAnonymousUser = $('#addToWishlistLink').attr('data-is-anonymous-user');
    productAdded = $('#addToWishlistLink').attr('data-product-added');
    productRemoved = $('#removeFromWishlistLink').attr('data-product-removed');
  }

  function init() {
    $doc.ready(function() {
      if ($(wishlistSel).length > 0) {
        getWishlistValues();
        addWishlist();
        addWishlistFromLocalstorage();
        removeWishlist();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

wishlistAddRemove.init();
'use strict';

var compareBar = function() {
  var $doc = $(document);
  var compareBtn = '.compare-cta';
  var maxCompare = 4;
  var productsInCompareBar = 0;
  var deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="47" viewBox="0 0 46 47"><defs><filter id="a" width="243.3%" height="238.7%" x="-71.7%" y="-69.4%" filterUnits="objectBoundingBox"><feOffset dy="3" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="4"/><feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0.885391831 0 0 0 0 0.900447845 0 0 0 0 0.960671782 0 0 0 1 0"/><feMerge><feMergeNode in="shadowMatrixOuter1"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g fill="none" fill-rule="evenodd" filter="" transform="translate(8 5)"><rect width="30" height="31" fill="#eecd58" rx="15"/><path fill="#FFF" d="M12.9 21h1.4v-6h-1.4v6zm2.8 0h1.4v-6h-1.4v6zm-4.2 1.5h7v-9h-7v9zM12.9 12h4.2v-1.5h-4.2V12zm5.6 0V9h-7v3H8v1.5h2.1V24h9.8V13.5H22V12h-3.5z"/></g></svg>';
  var emptyTile = '<img class="compare-product-img" src="./assets/img/icons/comparison-placeholder-image.png" alt="add new product" />';
  var smEmptyTile = '<img class="compare-product-img" src="./assets/img/icons/comparison-placeholder-image_mobile.png" alt="add new product" />';

  var stickyFooterHt = 0;
  var mdMax = 1199;
  var smMax = 767;

  function compareBtnOn() {
    $doc.off('click.compareBtn');
    $doc.on('click.compareBtn', compareBtn, function() {
      var $this = $(this),
        parentEl = $this.parents('.for-compare-button'),
        productId = parentEl.data('product-id'),
        productName = parentEl.data('product-name'),
        productImgUrl = parentEl.data('image-url');
      var compareData = localStorage.getItem("compareData") !== null ? JSON.parse(localStorage.getItem("compareData")) : {};
      productsInCompareBar = 0;
      productsInCompareBar = Object.entries(compareData).length;
      if ($this.hasClass('active')) {
        removeProducts(productId);
      } else {
        if (productsInCompareBar < maxCompare) {
          addProducts(productId, productName, productImgUrl);
        } else {
          $this.next('.compare-tooltip').removeClass('hide-class');
          hideMobileTooltip();
        }
      }
      loadCompareBar();
    });
  }

  function addProducts(productId, productName, imgUrl) {
    var compareData = localStorage.getItem("compareData") !== null ? JSON.parse(localStorage.getItem("compareData")) : {};
    var compareBtn = $('.for-compare-button[data-product-id=' + productId + ']').find('.compare-cta');
    compareData[productId] = {
      "productName": productName,
      "imageUrl": imgUrl
    };
    localStorage.setItem("compareData", JSON.stringify(compareData));
    updateCompareDrawer(false);
    addActiveClass(compareBtn);
    buildComparePageURL();
  }

  function removeProducts(productId) {
    var compareData = localStorage.getItem("compareData") !== null ? JSON.parse(localStorage.getItem("compareData")) : {};
    var compareBtn = $('.for-compare-button[data-product-id=' + productId + ']').find('.compare-cta');
    deleteProductFromCompare(compareData, productId);
    updateCompareDrawer(true);
    removeActiveClass(compareBtn);
    buildComparePageURL();
  }

  function deleteProductFromCompare(compareData, productId) {
    var compareData = compareData;
    $.each(compareData, function(i, v) {
      if (i === productId) {
        delete compareData[i];
      }
    });
    localStorage.setItem("compareData", JSON.stringify(compareData));
  }

  function buildComparePageURL() {
    var comparePageBtn = $('.compare-page-btn');
    var compareURL = comparePageBtn.attr('data-href');
    var relativeCompareURL = compareURL.substring(0, compareURL.lastIndexOf('/') + 1);
    var fullCompareURL = buildUrl(relativeCompareURL);
    comparePageBtn.attr('data-href', fullCompareURL);
  }

  function buildUrl(relativeCompareURL) {
    var relativeCompareURL = relativeCompareURL;
    var compareData = JSON.parse(localStorage.getItem("compareData"));
    $.each(compareData, function(i, v) {
      relativeCompareURL = relativeCompareURL + i + ',';
    });
    relativeCompareURL = relativeCompareURL.substring(0, relativeCompareURL.length - 1);
    return relativeCompareURL;
  }

  function updateCompareDrawer(isRemove) {
    var compareData = {};
    compareData = JSON.parse(localStorage.getItem("compareData"));
    productsInCompareBar = 0;
    productsInCompareBar = Object.entries(compareData).length;
    clearCompareTiles();
    if (productsInCompareBar === 0) {
      hideCompareBar();
    } else {
      if (productsInCompareBar === 1) {
        $('.compare-bar-products-added-text').hide();
        $('.compare-bar-products-added-text.for-single-product').show();
      } else {
        $('.compare-bar-products-added-text').show();
        $('.compare-bar-products-added-text.for-single-product').hide();
      }
      addCompareTiles(compareData);
      showCompareBar();
      updateCompareQty();
    }

    if (productsInCompareBar > 1) {
      activateComparePageBtn();
    } else if (productsInCompareBar < 2) {
      disableComparePageBtn();
    }
  }

  function clearCompareTiles() {
    $('.compare-bar-tiles-row').html('');
  }

  function addCompareTiles(compareData) {
    var compareData = compareData;
    var noOfEmptyTiles = maxCompare - Object.entries(compareData).length;
    $.each(compareData, function(i, v) {
      var html = '<div class="compare-bar-tile">' + '<div class="compare-bar-img">' + '<img src="' + v.imageUrl + '" alt="" />' + '</div>' + '<div class="compare-bar-title-box">' + '<p class="compare-bar-title-text">' + v.productName + '</p>' + '<a href="#" class="compare-delete-icon" data-product-id="' + i + '">' + deleteIcon + '</a >' + '</div >' + '</div >';
      $('.compare-bar-tiles-row').append(html);
    });
    if (noOfEmptyTiles > 0) {
      loadEmptyTiles(noOfEmptyTiles);
    }
  }

  function loadEmptyTiles(noOfEmptyTiles) {
    var html = '<div class="compare-bar-tile empty">' + '<span class="compar-bar-empty-md">' + emptyTile + '</span>' + '<div class="comp-empty-sec-mobile-wrap">' + '<span class="compar-bar-empty-sm">' + smEmptyTile + '</span>' + '<div class="h-bar-wrap">' + '<p class="grey-bar"></p>' + '<p class="grey-bar half"></p>' + '</div>' + '</div>' + '</div>';
    for (var i = 0; i < noOfEmptyTiles; ++i) {
      $('.compare-bar-tiles-row').append(html);
    }
  }

  function showCompareBar() {
    $('.compare-bar-container').removeClass('hide-class').addClass('active');
    if ($(window).scrollTop() + $(window).height() < $(document).height() - $("footer").height()) {
      if ($('.pdp-sticky-footer').is(":visible")) {
        $('#goTop').css("bottom", $('.pdp-sticky-footer').outerHeight() + $('.compare-bar-container').outerHeight() + 20);
        $('.chat-btn').css("bottom", $('.pdp-sticky-footer').outerHeight() + $('.compare-bar-container').outerHeight() + 20);
      } else {
        $('#goTop').css("bottom", $('.compare-bar-container').outerHeight() + 20);
        $('.chat-btn').css("bottom", $('.compare-bar-container').outerHeight() + 20);
      }
    }

    // positionCompareBar();
  }

  function hideCompareBar() {
    $('.compare-bar-container').addClass('hide-class').removeClass('active').removeClass('open-compare-drawer');
    if ($(window).scrollTop() + $(window).height() < $(document).height() - $("footer").height()) {
      if ($('.pdp-sticky-footer').is(":visible")) {
        $('#goTop').css("bottom", $('.pdp-sticky-footer').outerHeight() + 20);
        $('.chat-btn').css("bottom", $('.pdp-sticky-footer').outerHeight() + 20);
      } else {
        $('#goTop').css("bottom", '20px');
        $('.chat-btn').css("bottom", '20px');
      }
    }
  }

  function positionCompareBar() {
    if ($('.pdp-sticky-footer').length > 0 && $(window).outerWidth() <= mdMax) {
      stickyFooterHt = $('.pdp-sticky-footer').outerHeight();
      $('.compare-bar-container').css({
        'bottom': stickyFooterHt + 'px'
      });
    }
  }

  function setCompareBarHeight() {
    if ($('.pdp-sticky-footer').length > 0 && $(window).outerWidth() <= smMax) {
      var windowHt = $(window).height();
      var compareBarContainerHt = $('.compare-bar-container').height();
      var compareBarHt = $('.compare-bar').height();
      $('.compare-bar-container').css({
        'height': windowHt - stickyFooterHt + 'px'
      });
      $('.compare-bar-drawer').css({
        'height': compareBarContainerHt - (compareBarHt + stickyFooterHt) + 'px'
      });
    }
  }

  function unsetCompareBarHeight() {
    if ($('.pdp-sticky-footer').length > 0 && $(window).outerWidth() <= smMax) {
      $('.compare-bar-container').css({
        'height': 'auto'
      });
      $('.compare-bar-drawer').css({
        'height': 'auto'
      });
    }
  }

  function updateCompareQty() {
    $('.productsToCompare').html(productsInCompareBar);
  }

  function toggleCompareDrawer() {
    $doc.off('click.compareBar');
    $doc.on('click.compareBar', '.compare-bar-title', function() {
      $(this).parents('.compare-bar-container').toggleClass('open-compare-drawer');
      if ($(this).parents('.compare-bar-container').hasClass('open-compare-drawer')) {
        if ($(window).scrollTop() + $(window).height() < $(document).height() - $("footer").height()) {
          if ($('.pdp-sticky-footer').is(":visible")) {
            $('#goTop').css("bottom", $('.pdp-sticky-footer').outerHeight() + $('.open-compare-drawer').outerHeight() + 20);
            $('.chat-btn').css("bottom", $('.pdp-sticky-footer').outerHeight() + $('.open-compare-drawer').outerHeight() + 20);
          } else {
            $('#goTop').css("bottom", $('.open-compare-drawer').outerHeight() + 20);
            $('.chat-btn').css("bottom", $('.open-compare-drawer').outerHeight() + 20);
          }
        }
      } else {
        if ($(window).scrollTop() + $(window).height() < $(document).height() - $("footer").height()) {
          if ($('.pdp-sticky-footer').is(":visible")) {
            $('#goTop').css("bottom", $('.pdp-sticky-footer').outerHeight() + $(this).parents('.compare-bar-container').outerHeight() + 20);
            $('.chat-btn').css("bottom", $('.pdp-sticky-footer').outerHeight() + $(this).parents('.compare-bar-container').outerHeight() + 20);
          } else {
            $('#goTop').css("bottom", $(this).parents('.compare-bar-container').outerHeight() + 20);
            $('.chat-btn').css("bottom", $(this).parents('.compare-bar-container').outerHeight() + 20);
          }
        }
      }
      // if($('.compare-bar-container').hasClass('open-compare-drawer')){
      //     setCompareBarHeight();
      // }else{
      //     unsetCompareBarHeight();
      // }
    });
  }

  function loadCompareBar() {
    var compareData = localStorage.getItem("compareData") !== null ? JSON.parse(localStorage.getItem("compareData")) : {};
    if (Object.entries(compareData).length > 0) {
      updateCompareDrawer(false);
      makeCompareBtnActive();
      buildComparePageURL();
    } else {
      makeCompareBtnInActive();
    }
  }

  function makeCompareBtnActive() {
    var compareData = JSON.parse(localStorage.getItem("compareData"));
    removeActiveClass('.compare-cta');
    $.each(compareData, function(i, v) {
      $('.for-compare-button[data-product-id=' + i + ']').find('.compare-cta').addClass('active');
    });
  }

  function makeCompareBtnInActive() {
    $('.compare-cta').removeClass('active');
  }

  function activateComparePageBtn() {
    $('.compare-page-btn').prop('disabled', '');
  }

  function disableComparePageBtn() {
    $('.compare-page-btn').prop('disabled', 'disabled');
  }

  function addActiveClass(el) {
    $(el).addClass('active');
  }

  function removeActiveClass(el) {
    $(el).removeClass('active');
  }

  function clearAllFromCompareBar() {
    $doc.off('click.clearCompare');
    $doc.on('click.clearCompare', '.compare-clear-all', function() {
      var compareData = {};
      localStorage.setItem("compareData", JSON.stringify(compareData));
      updateCompareDrawer(true);
      makeCompareBtnInActive();
    });
  }

  function deleteCompareOn() {
    $doc.off('click.deleteCompare');
    $doc.on('click.deleteCompare', '.compare-delete-icon', function(e) {
      e.preventDefault();
      var productId = $(this).data('product-id');
      removeProducts(productId);
    });
  }

  function hideTooltip() {
    $doc.off('focusout.hideTooltip');
    $doc.on('focusout.hideTooltip', compareBtn, function() {
      $('.compare-tooltip').addClass('hide-class');
    });
  }

  function hideMobileTooltip() {
    setTimeout(function() {
      $('.compare-tooltip').addClass('hide-class');
    }, 5000);
  }

  function comparePageBtnOn() {
    $doc.off('click.comparePageBtn');
    $doc.on('click.comparePageBtn', '.compare-page-btn', function() {
      var url = $(this).attr('data-href');
      window.location.href = url;
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(compareBtn).length > 0) {
        compareBtnOn();
        toggleCompareDrawer();
        loadCompareBar();
        clearAllFromCompareBar();
        deleteCompareOn();
        hideTooltip();
        comparePageBtnOn();
      }
    });
  }

  return {
    init: init,
    deleteProductFromCompare: deleteProductFromCompare,
    buildUrl: buildUrl
  };
}(jQuery);

compareBar.init();
'use strict';

var profileInfo = function($) {
  var $doc = $(document);
  var profileInfoSel = '.profile-overview';

  function datepickerOn() {
    $('.m88-date-picker').datepicker({
      endDate: '+0d',
      format: 'mm/dd/yyyy'
    }).on('changeDate', function(e) {
      $(this).datepicker('hide');
      $(this).focusout();
    });
  }

  function checkConfrimPassword() {
    var currentPasswordEl = $('#current-password'),
      currentPassword = currentPasswordEl.val(),
      confirmPassword = $('.confirm-password').val(),
      defaultErrMsg = currentPasswordEl.data('default-errormsg'),
      customErrMsg = currentPasswordEl.data('custom-errormsg');
    if (currentPassword === confirmPassword) {
      currentPasswordEl.removeClass('is-invalid');
      currentPasswordEl.next('.invalid-feedback').html(defaultErrMsg);
    } else {
      $('.update-profile-btn').prop('disabled', 'disabled');
      currentPasswordEl.addClass('is-invalid');
      currentPasswordEl.removeClass('is-valid');
      currentPasswordEl.next('.invalid-feedback').html(customErrMsg);
    }
  }

  function checkConfrimPasswordKeyupOn() {
    $doc.off('keyup.confirmPassword');
    $doc.on('keyup.confirmPassword', '.confirm-password, .current-password', function() {
      checkConfrimPassword();
    });
  }

  function checkConfrimPasswordFocusoutOn() {
    $doc.off('focusout.confirmPassword');
    $doc.on('focusout.confirmPassword', '.confirm-password, .current-password', function() {
      checkConfrimPassword();
    });
  }

  function profileUpdatedOn() {
    var isProfileUpdated = $('#profile-updated').val();
    if (isProfileUpdated === 'true') {
      $('.profile-updated-modal').modal('show');
    }
    setTimeout(function() {
      $('.profile-updated-modal').modal('hide');
    }, 2000);
  }

  function init() {
    $doc.ready(function() {
      if ($(profileInfoSel).length > 0) {
        datepickerOn();
        checkConfrimPasswordKeyupOn();
        checkConfrimPasswordFocusoutOn();
        profileUpdatedOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

profileInfo.init();
'use strict';

var printBtn = function($) {
  var $doc = $(document);
  var printSelector = '.print-btn';

  function printOn() {
    $doc.off('click.print');
    $doc.on('click.print', printSelector, function() {
      window.print();
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(printSelector).length > 0) {
        printOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

printBtn.init();
'use strict';

var sellCar = function($) {

  function responseOn(data, formEl) {
    $('#sell-car-modal').modal('show');
  }

  return {
    responseOn: responseOn
  };
}(jQuery);
'use strict';

var sitemap = function($) {
  var $doc = $(document);
  var sitemapSelector = '.site-map';
  var sitemapbrandscontainer = '.site-map-all-brands-container';
  var branchSearch = $('#brandSearchUrl').val();

  function getSiteBrands() {
    var endpoint = $(sitemapSelector).data('endpoint');
    $.ajax({
      type: "GET",
      url: endpoint,
      success: function success(data) {
        parseFacets(data.facets);
      },
      error: function error(e) {
        console.log('fail');
      }
    });
  }

  function parseFacets(facets) {
    for (var i = 0; i < facets.length; i++) {
      if (facets[i].code === 'brand') {
        updateBrands(facets[i].values);
      }
    }
  }

  function updateBrands(brands) {
    var sitemaphtml = '';
    for (var j = 0; j < brands.length; j++) {
      if (brands[j].code != 'brands') {
        sitemaphtml += '<li class="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 col-xs-12 nopadding li-sitemap"><a href="' + branchSearch + brands[j].query.url + '" class="site-map-anchors color-grey">' + brands[j].name + '</a></li>';
      }
    }
    $(sitemapbrandscontainer).html(sitemaphtml);
  }

  function init() {
    $doc.ready(function() {
      if ($(sitemapSelector).length > 0) {
        getSiteBrands();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

sitemap.init();
'use strict';

var m88Accordion = function($) {
  var $doc = $(document);
  var accordionSel = '.carros-accordion';

  function accordionOn() {
    $doc.off('click.accordion');
    $doc.on('click.accordion', '.carros-accordion-header', function() {
      $(this).parents(accordionSel).toggleClass('active');
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(accordionSel).length > 0) {
        accordionOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

m88Accordion.init();
"use strict";

var registerChangeBtn = function($) {
  var $doc = $(document);
  var otherBtn = '.other-btn';

  function init() {
    $(window).scroll(function() {

      var scroll = $(window).scrollTop();
      if (scroll > 80) {
        $(otherBtn).addClass("changedColor");
      } else {
        $(otherBtn).removeClass("changedColor");
      }
    })
  }

  return {
    init: init
  };
}(jQuery);

registerChangeBtn.init();
"use strict";

var compareWishlist = function($) {
  var $doc = $(document);
  var wishlistSel = '.compareWishlist';
  var wishlistProductCode = null;
  var addProductToWishlistUrl = null;
  var removeProductFromWishlistUrl = null;
  var isAnonymousUser = null;
  var productAdded = null;
  var productRemoved = null;

  function addWishlistFromLocalstorage() {
    if (localStorage.getItem("login-invoked-from") === "COMPARE-ADDTOWISHLIST") {
      addToWishlist();
    }
  }

  function removeWishlist() {
    $doc.off('click.removeWishlist');
    $doc.on('click.removeWishlist', '.compare-remove', function() {
      var wishlistProductCode = $(this).attr('data-product-code');
      $.ajax({
        url: removeProductFromWishlistUrl,
        type: 'GET',
        data: {
          'productCode': wishlistProductCode
        },
        success: function success(response) {
          if (response && response.status === productRemoved) {
            $('#add_' + wishlistProductCode).removeClass('dsp-none');
            $('#remove_' + wishlistProductCode).addClass('dsp-none');
            return false;
          }
        },
        error: function error(e) {}
      });
    });
  }

  function addWishlist() {
    $doc.off("click.compareadd");
    $doc.on("click.compareadd", '.compare-add', function() {
      var wishlistProductCode = $(this).attr('data-product-code');
      if (isAnonymousUser === 'false') {
        $.ajax({
          url: addProductToWishlistUrl,
          type: 'GET',
          data: {
            'productCode': wishlistProductCode
          },
          success: function success(response) {
            if (response && response.status === productAdded) {
              $('#add_' + wishlistProductCode).addClass('dsp-none');
              $('#remove_' + wishlistProductCode).removeClass('dsp-none');
              localStorage.removeItem("login-invoked-from");
              return false;
            }
          },
          error: function error(e) {}
        });
      } else {
        localStorage.setItem("login-invoked-from", "COMPARE-ADDTOWISHLIST");
        $("#signup-activation-modal").modal("show");
      }
    });
  }

  function getWishlistValues() {
    addProductToWishlistUrl = $('.compare-add').attr('data-add-to-wishlist-url');
    removeProductFromWishlistUrl = $('.compare-remove').attr('data-remove-from-wishlist-url');
    isAnonymousUser = $('.compare-add').attr('data-is-anonymous-user');
    productAdded = $('.compare-add').attr('data-product-added');
    productRemoved = $('.compare-remove').attr('data-product-removed');
  }

  function init() {
    $doc.ready(function() {
      if ($(wishlistSel).length > 0) {
        getWishlistValues();
        addWishlist();
        addWishlistFromLocalstorage();
        removeWishlist();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

compareWishlist.init();
'use strict';

var wishlist = function($) {
  var $doc = $(document);
  var wishlistDeleteSelector = '.wishlist-delete-btn-container';
  var wishlistDeleteModalSelector = '#wishlist-delete-modal';
  var wishlistDeleteBtn = '#wishlist-delete-modal .wishlist-remove-btn';

  function deleteWishlist() {
    $doc.off('click.wishlistIcon');
    $doc.on('click.wishlistIcon', wishlistDeleteSelector, function(event) {
      event.preventDefault();
      var prodId = $(this).data('product-id');
      $(wishlistDeleteModalSelector).modal('show');
      wishlistModalOn(prodId);
    });
  }

  function wishlistModalOn(prodId) {
    $(wishlistDeleteBtn).attr('data-product-id', prodId);
  }

  function wishlistDeleteOn() {
    $doc.off('click.wishListDelete');
    $doc.on('click.wishListDelete', wishlistDeleteBtn, function() {
      var $this = $(this);
      var prodId = $this.attr('data-product-id');
      var endPoint = $this.data('endpoint');
      $(this).prop('disabled', 'disabled');
      $.ajax({
        url: endPoint,
        type: "GET",
        data: "productCode=" + prodId,
        dataType: "json",
        contentType: 'application/json; charset=UTF-8'
      }).done(function() {
        window.location.reload();
      }).fail(function() {
        $this.prop('disabled', '');
        $(wishlistDeleteModalSelector).modal('hide');
      });
    });
  }

  function init() {
    $doc.ready(function() {
      if ($(wishlistDeleteSelector).length > 0) {
        deleteWishlist();
        wishlistDeleteOn();
      }
    });
  }

  return {
    init: init
  };
}(jQuery);

wishlist.init();