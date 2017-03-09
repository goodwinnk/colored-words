var CodeMirror = require('codemirror');
require("../node_modules/codemirror/lib/codemirror.css");
require("../css/app.css");
require('./kids-mode.js');
var Settings = require("./settings.js");

function init() {
    var BACKSPACE_KEY_CODE = 8;
    var DELETE_KEY_CODE = 46;

    var textArea = document.getElementById("editor");
    var editor = CodeMirror.fromTextArea(textArea, {
        mode: "kids",
        indentUnit: 0,
        smartIndent: false,
        lineWrapping: true,
        autofocus: true
    });

    var keyIsDown = {};
    editor.on("keydown", function(cm, evt) {
        var code = evt.keyCode;
        console.log(code);

        if (code === BACKSPACE_KEY_CODE || code === DELETE_KEY_CODE) {
            return;
        }

        if (evt.repeat || keyIsDown[code]) {
            evt.preventDefault();
            return;
        }

        keyIsDown[code] = true;
    });

    editor.on("keyup", function(cm, evt) {
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
        if (previousSettings.fontSize !== settings.fontSize) {
            jQuery(editorElement).css("font-size", settings.fontSize);
            previousSettings.fontSize = settings.fontSize;
            editor.refresh();
        }
        if (previousSettings.isUpperCase !== settings.isUpperCase) {
            jQuery(editorElement).css("text-transform", settings.isUpperCase ? "uppercase" : "none");
            previousSettings.isUpperCase = settings.isUpperCase;
            editor.refresh();
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

    jQuery('#print-button').click(function () {
        window.print();
    });

    jQuery('#fill-vowels-button').click(function () {
        var span = jQuery(this).find('span');

        var style = "";
        if (span.hasClass("glyphicon-star")) {
            style =
                ".cm-s-default .cm-number {color: #E8E8EE!important;}\n" +
                ".cm-s-default .cm-comment {color: #E8E8EE!important;}";
        }
        jQuery('#print').text(style);

        span.toggleClass("glyphicon-star").toggleClass("glyphicon-star-empty");
    });

    jQuery('#capslock-button').click(function () {
        settings.isUpperCase = !settings.isUpperCase;
        Settings.apply(settings);
    });
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