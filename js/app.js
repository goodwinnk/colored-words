var CodeMirror = require('codemirror');
require("../node_modules/codemirror/lib/codemirror.css");
require("../css/app.css");
require('./kids-mode.js');

function init() {
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

    var slider = new Slider('#fontSizeSlider', {
        formatter: function (value) {
        }
    });
    slider.on('change', function (diff) {
        jQuery(editorElement).css("font-size", originalSize + diff.newValue);
        editor.refresh();
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