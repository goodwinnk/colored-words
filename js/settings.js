define("Settings", [], function () {
    var FONT_SIZE_KEY = "font-size";
    var UPPERCASE_KEY = "uppercase";

    var obj = {};
    obj.load = function(defaultFontSize) {
        var fontSize = defaultFontSize;
        var isUpperCase = false;
        if (typeof(Storage) !== "undefined") {
            var storedFontSizeStr = localStorage.getItem(FONT_SIZE_KEY);
            if (storedFontSizeStr !== null) {
                fontSize = parseInt(storedFontSizeStr);
            }

            var isUpperCaseStr = localStorage.getItem(UPPERCASE_KEY);
            if (isUpperCaseStr !== null) {
                isUpperCase = (isUpperCaseStr === "true");
            }
        }

        return {
            fontSize: fontSize,
            isUpperCase: isUpperCase
        };
    };

    obj.save = function (settings) {
        if (typeof(Storage) === "undefined") {
            return
        }

        localStorage.setItem(FONT_SIZE_KEY, settings.fontSize);
        localStorage.setItem(UPPERCASE_KEY, settings.isUpperCase);
    };

    return obj;
});