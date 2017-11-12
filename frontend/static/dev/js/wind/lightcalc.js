var $lwc;
(function(win, $lwc) {
    var done = false
      , top = true
      , doc = win.document
      , root = doc.documentElement
      , add = doc.addEventListener ? 'addEventListener' : 'attachEvent'
      , rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent'
      , pre = doc.addEventListener ? '' : 'on'
      , init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete')
            return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true))
            fn.call(win, e.type || e);
    }
      , poll = function() {
        try {
            root.doScroll('left');
        } catch (e) {
            setTimeout(poll, 50);
            return;
        }
        init('poll');
    }
      , fn = function() {
        if (!win.jQuery) {
            if (!$lwc.timestamp)
                $lwc.timestamp = new Date().getTime();
            if (new Date().getTime() - $lwc.timestamp > 3000)
                return;
            setTimeout(fn, 50);
            return;
        }
        $lwc.init();
    }
      , loadScript = function(doc, src, type) {
        var s = doc.createElement(type);
        if (type == "script") {
            s.type = "text/javascript";
            s.src = src;
        } else {
            s.type = "text/css";
            s.rel = "stylesheet";
            s.href = src;
        }
        doc.getElementsByTagName("head")[0].appendChild(s);
    };
    $lwc.base = "";
    for (var j in doc.scripts) {
        if (doc.scripts[j].src.indexOf("lightcalc.js") > 0) {
            $lwc.base = doc.scripts[j].src;
            $lwc.base = $lwc.base.substring(0, $lwc.base.length - 15);
            break;
        }
    }
    if (!$lwc.css) {
        $lwc.css = $lwc.base + "css/calc.css";
        loadScript(doc, $lwc.css, "link");
    }
    $lwc.noConfilct = false;
    if (win.$ && !win.jQuery)
        $lwc.noConfilct = true;
    if (!win.jQuery)
        loadScript(doc, "js/jquery-1.9.1.min.js", "script");
    loadScript(doc, "/dev/js/wind/lwc.js", "script");
    if (doc.readyState == 'complete')
        fn.call(win, 'lazy');
    else {
        if (doc.createEventObject && root.doScroll) {
            try {
                top = !win.frameElement;
            } catch (e) {}
            if (top)
                poll();
        }
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
    }
    $lwc.init = function() {
        if ($lwc.noConfilct)
            $lwc.$ = window.jQuery.noConflict();
        else
            $lwc.$ = window.jQuery;
        if (!$lwc.profiles) {
            $lwc.$.getScript($lwc.base + "js/lwc-design.js", $lwc.init);
            return;
        }
        if (!$lwc.price) {
            $lwc.$.getScript($lwc.base + "js/lwc-price.js", $lwc.init);
            return;
        }
        if (!$lwc.init2) {
            $lwc.$.getScript("/dev/js/wind/lwc.js", $lwc.init);
            alert($lwc.base);
            return;
        }
        $lwc.init2();
    }
}
)(window, $lwc || ($lwc = {}));
