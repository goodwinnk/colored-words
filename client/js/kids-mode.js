(function(mod) {
    if (typeof exports == "object" && typeof module == "object")
        mod(require("../node_modules/codemirror/lib/codemirror"));
    else if (typeof define == "function" && define.amd)
        define(["../node_modules/codemirror/lib/codemirror"], mod);
    else
        mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";

    CodeMirror.defineMode("kids", function () {
        var en_vowels = "aeiou";
        var ru_vowels = "аоиеёэыуюя";
        var vowels = en_vowels + ru_vowels;

        function tokenize(stream, state) {
            var ch = stream.next();
            if (ch == null) return null;

            if (vowels.indexOf(ch.toLowerCase()) !== -1) {
                return 'number';
            }

            return null;
        }
        return {
            token: function (stream, state) {
                if (stream.eatSpace()) return null;
                return tokenize(stream, state);
            }
        };
    });

    CodeMirror.defineMIME("text/kids", "kids");
});
