var CodeMirror = require('codemirror');
require("../node_modules/codemirror/lib/codemirror.css");
require("../css/app.css");
require('./kids-mode.js');

function init() {
    var textArea = document.getElementById("editor");
    var editor = CodeMirror.fromTextArea(textArea, {
        mode: "kids"
    });

    var value = getQueryParams(document.location.search).v;
    if (value) {
        editor.setValue(value);
    }
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