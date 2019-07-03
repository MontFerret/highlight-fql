// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.registerFQL = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
    return function (hljs) {
        var KEYWORDS = {
            keyword:
                "FOR IN RETURN LET AND OR LIMIT FILTER DISTINCT SORT COLLECT ASC DESC" +
                "INTO KEEP WITH COUNT ALL ANY AGGREGATE LIKE NOT",
            literal: "TRUE true FALSE false NONE"
        };
        var NUMBER = {
            className: "number",
            variants: [
                { begin: "\\b(0[bB][01]+)" },
                { begin: "\\b(0[oO][0-7]+)" },
                { begin: hljs.C_NUMBER_RE }
            ],
            relevance: 0
        };
        var BACKTICK_STRING = {
            className: 'string',
            begin: '\`',
            end: '\`',
            illegal: '\\n',
            contains: [hljs.BACKSLASH_ESCAPE],
            relevance: 0
        };
        var PARAM = {
            className: "params",
            begin: '\@'
        };
    
        return {
            aliases: ["fql"],
            case_insensitive: false,
            keywords: KEYWORDS,
            contains: [
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE,
                BACKTICK_STRING,
                NUMBER,
                PARAM,
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE,
            ],
            illegal: /#(?!!)/
        };
    };
}));