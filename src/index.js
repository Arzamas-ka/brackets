module.exports = function check(str, bracketsConfig) {
    bracketsConfig = bracketsConfig.map(elem => elem.join(""));
    replaceBrackets = string => {
        for (let i = bracketsConfig.length - 1; i >= 0; i--) {
            if (string.includes(bracketsConfig[i])) {
                string = string.replace(bracketsConfig[i], "");
                return replaceBrackets(string);
            } else if (string.length === 0) {
                return true;
            }
        }
        return false;
    };
    return replaceBrackets(str);
};
