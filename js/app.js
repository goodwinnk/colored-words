var CodeMirror = require('codemirror');
require("../node_modules/codemirror/lib/codemirror.css");
require("../css/app.css");
require('./kids-mode.js');
var Settings = require("./settings.js");

function init() {
    var BACKSPACE_KEY_CODE = 8;
    var DELETE_KEY_CODE = 46;

    var HOLLOW_STYLESHEET_LINK_NODE = document.getElementById('hollow_stylesheet');
    HOLLOW_STYLESHEET_LINK_NODE.parentNode.removeChild(HOLLOW_STYLESHEET_LINK_NODE);

    var textArea = document.getElementById("editor");
    var editor = CodeMirror.fromTextArea(textArea, {
        mode: "kids",
        indentUnit: 0,
        smartIndent: false,
        lineWrapping: true,
        autofocus: true
    });

    var keyIsDown = {};
    editor.on("keydown", function (cm, evt) {
        var code = evt.keyCode;

        if (code === BACKSPACE_KEY_CODE || code === DELETE_KEY_CODE) {
            return;
        }

        if (evt.repeat || keyIsDown[code]) {
            evt.preventDefault();
            return;
        }

        keyIsDown[code] = true;
    });

    editor.on("keyup", function (cm, evt) {
        var code = evt.keyCode;
        if (keyIsDown[code]) {
            delete keyIsDown[code];
        }
    });

    var editorElement = document.getElementsByClassName("CodeMirror").item(0);
    var originalSize = parseInt(jQuery(editorElement).css("font-size"));

    var value = getQueryParams(document.location.search).v;
    if (value) {
        editor.setValue(value);
    }

    var previousSettings = {};
    Settings.apply = function (settings) {
        function exchangeClasses(element, isFirst, first, second) {
            if (isFirst) {
                element.removeClass(second).addClass(first);
            } else {
                element.removeClass(first).addClass(second);
            }
        }

        if (previousSettings.fontSize !== settings.fontSize) {
            jQuery(editorElement).css("font-size", settings.fontSize);
            previousSettings.fontSize = settings.fontSize;
            editor.refresh();
        }
        if (previousSettings.isUpperCase !== settings.isUpperCase) {
            jQuery(editorElement).css("text-transform", settings.isUpperCase ? "uppercase" : "none");
            exchangeClasses(jQuery("#capslock-button-icon"), settings.isUpperCase, "glyphicon-upload", "glyphicon-download");
            previousSettings.isUpperCase = settings.isUpperCase;
            editor.refresh();
        }
        if (previousSettings.isHollowLetters !== settings.isHollowLetters) {
            var headNode = document.getElementsByTagName('head')[0];
            if (settings.isHollowLetters) {
                // Append after generates style elements inserted with webpack
                headNode.appendChild(HOLLOW_STYLESHEET_LINK_NODE);
            } else {
                var lastChild = headNode.lastChild;
                if (lastChild === HOLLOW_STYLESHEET_LINK_NODE) {
                    headNode.removeChild(HOLLOW_STYLESHEET_LINK_NODE)
                }
            }

            exchangeClasses(
                jQuery("#fill-vowels-button-icon"), settings.isHollowLetters, "glyphicon-star-empty", "glyphicon-star");

            previousSettings.isHollowLetters = settings.isHollowLetters;
        }
        Settings.save(settings);
    };

    var settings = Settings.load(originalSize);
    Settings.apply(settings);

    var slider = new Slider('#fontSizeSlider', {
        tooltip: "hide",
        tooltip_position: "bottom",
        min: originalSize,
        max: originalSize + 80,
        step: 1,
        value: settings.fontSize
    });

    slider.on('change', function (diff) {
        settings.fontSize = diff.newValue;
        Settings.apply(settings);
    });

    document.getElementById('print-button').onclick = function () {
        window.print();
    };

    document.getElementById('fill-vowels-button').onclick = function () {
        settings.isHollowLetters = !settings.isHollowLetters;
        Settings.apply(settings);
    };

    document.getElementById('capslock-button').onclick = function () {
        settings.isUpperCase = !settings.isUpperCase;
        Settings.apply(settings);
    };

    document.onclick = function () {
        editor.focus();
    };
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {};
    var tokens;

    var re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

init();