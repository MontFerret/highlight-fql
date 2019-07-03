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
        var IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
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
        var SUBST = {
            className: "subst",
            begin: "\\$\\{",
            end: "\\}",
            keywords: KEYWORDS,
            contains: [] // defined later
        };
        var TEMPLATE_STRING = {
            className: "string",
            begin: "`",
            end: "`",
            contains: [hljs.BACKSLASH_ESCAPE, SUBST]
        };
        SUBST.contains = [
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            TEMPLATE_STRING,
            NUMBER,
            hljs.REGEXP_MODE
        ];
        var PARAMS_CONTAINS = SUBST.contains.concat([
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_LINE_COMMENT_MODE
        ]);
    
        return {
            aliases: ["fql"],
            case_insensitive: false,
            keywords: KEYWORDS,
            contains: [
                hljs.APOS_STRING_MODE,
                hljs.QUOTE_STRING_MODE,
                TEMPLATE_STRING,
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE,
                NUMBER,
                {
                    // object attr container
                    begin: /[{,]\s*/,
                    relevance: 0,
                    contains: [
                        {
                            begin: IDENT_RE + "\\s*:",
                            returnBegin: true,
                            relevance: 0,
                            contains: [
                                { className: "attr", begin: IDENT_RE, relevance: 0 }
                            ]
                        }
                    ]
                },
                hljs.METHOD_GUARD
            ],
            illegal: /#(?!!)/
        };
    };
}));