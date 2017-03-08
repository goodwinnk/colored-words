define("Settings", [], function () {
    var FONT_SIZE_KEY = "font-size";

    var obj = {};
    obj.load = function(defaultFontSize) {
        var fontSize = defaultFontSize;
        if (typeof(Storage) !== "undefined") {
            var storedFontSizeStr = localStorage.getItem(FONT_SIZE_KEY);
            if (storedFontSizeStr !== null) {
                fontSize = parseInt(storedFontSizeStr);
            }
        }

        return {
            fontSize: fontSize
        };
    };

    obj.save = function (settings) {
        if (typeof(Storage) === "undefined") {
            return
        }

        localStorage.setItem(FONT_SIZE_KEY, settings.fontSize);
    };

    return obj;
});