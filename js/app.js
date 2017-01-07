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
        lineWrapping: true
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
    slider.on('slide', function (slideValue) {
        jQuery(editorElement).css("font-size", originalSize + slideValue);
        editor.refresh();
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