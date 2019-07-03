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
        root.registerHLFQL = factory();
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
        var STRINGS = {
            className: 'string',
            variants: [
              hljs.QUOTE_STRING_MODE,
              {begin: '\'', end: '[^\\\\]\''},
              {begin: '`', end: '`'},
            ]
        };

        var VARIABLES = {
            className: 'keyword',
            variants: [
                {
                    beginKeywords: 'LET'
                },
            ]
        }
    
        return {
            aliases: ["fql"],
            case_insensitive: false,
            keywords: KEYWORDS,
            contains: [
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE,
                NUMBER,
                STRINGS,
                VARIABLES,
                {
                    className: 'keyword',
                    variants: [
                        {
                            begin: /\FOR\s*\(/,
                            end: /\IN\b/,
                            returnEnd: true
                        },
                    ]
                  }
            ],
            illegal: /#(?!!)/
        };
    };
}));