import {
  require_utils
} from "./chunk-HXAPWV7L.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/doctrine/package.json
var require_package = __commonJS({
  "node_modules/doctrine/package.json"(exports, module) {
    module.exports = {
      name: "doctrine",
      description: "JSDoc parser",
      homepage: "https://github.com/eslint/doctrine",
      main: "lib/doctrine.js",
      version: "3.0.0",
      engines: {
        node: ">=6.0.0"
      },
      directories: {
        lib: "./lib"
      },
      files: [
        "lib"
      ],
      maintainers: [
        {
          name: "Nicholas C. Zakas",
          email: "nicholas+npm@nczconsulting.com",
          web: "https://www.nczonline.net"
        },
        {
          name: "Yusuke Suzuki",
          email: "utatane.tea@gmail.com",
          web: "https://github.com/Constellation"
        }
      ],
      repository: "eslint/doctrine",
      devDependencies: {
        coveralls: "^3.0.1",
        dateformat: "^1.0.11",
        eslint: "^1.10.3",
        "eslint-release": "^1.0.0",
        linefix: "^0.1.1",
        mocha: "^3.4.2",
        "npm-license": "^0.3.1",
        nyc: "^10.3.2",
        semver: "^5.0.3",
        shelljs: "^0.5.3",
        "shelljs-nodecli": "^0.1.1",
        should: "^5.0.1"
      },
      license: "Apache-2.0",
      scripts: {
        pretest: "npm run lint",
        test: "nyc mocha",
        coveralls: "nyc report --reporter=text-lcov | coveralls",
        lint: "eslint lib/",
        "generate-release": "eslint-generate-release",
        "generate-alpharelease": "eslint-generate-prerelease alpha",
        "generate-betarelease": "eslint-generate-prerelease beta",
        "generate-rcrelease": "eslint-generate-prerelease rc",
        "publish-release": "eslint-publish-release"
      },
      dependencies: {
        esutils: "^2.0.2"
      }
    };
  }
});

// node_modules/browser-assert/lib/assert.js
var require_assert = __commonJS({
  "node_modules/browser-assert/lib/assert.js"(exports, module) {
    function assert(expr, message) {
      if (!Boolean(expr)) {
        throw new Error(message || "unknown assertion error");
      }
    }
    module.exports = assert;
  }
});

// node_modules/doctrine/lib/utility.js
var require_utility = __commonJS({
  "node_modules/doctrine/lib/utility.js"(exports) {
    (function() {
      "use strict";
      var VERSION;
      VERSION = require_package().version;
      exports.VERSION = VERSION;
      function DoctrineError(message) {
        this.name = "DoctrineError";
        this.message = message;
      }
      DoctrineError.prototype = function() {
        var Middle = function() {
        };
        Middle.prototype = Error.prototype;
        return new Middle();
      }();
      DoctrineError.prototype.constructor = DoctrineError;
      exports.DoctrineError = DoctrineError;
      function throwError(message) {
        throw new DoctrineError(message);
      }
      exports.throwError = throwError;
      exports.assert = require_assert();
    })();
  }
});

// node_modules/doctrine/lib/typed.js
var require_typed = __commonJS({
  "node_modules/doctrine/lib/typed.js"(exports) {
    (function() {
      "use strict";
      var Syntax, Token, source, length, index, previous, token, value, esutils, utility, rangeOffset, addRange;
      esutils = require_utils();
      utility = require_utility();
      Syntax = {
        NullableLiteral: "NullableLiteral",
        AllLiteral: "AllLiteral",
        NullLiteral: "NullLiteral",
        UndefinedLiteral: "UndefinedLiteral",
        VoidLiteral: "VoidLiteral",
        UnionType: "UnionType",
        ArrayType: "ArrayType",
        RecordType: "RecordType",
        FieldType: "FieldType",
        FunctionType: "FunctionType",
        ParameterType: "ParameterType",
        RestType: "RestType",
        NonNullableType: "NonNullableType",
        OptionalType: "OptionalType",
        NullableType: "NullableType",
        NameExpression: "NameExpression",
        TypeApplication: "TypeApplication",
        StringLiteralType: "StringLiteralType",
        NumericLiteralType: "NumericLiteralType",
        BooleanLiteralType: "BooleanLiteralType"
      };
      Token = {
        ILLEGAL: 0,
        // ILLEGAL
        DOT_LT: 1,
        // .<
        REST: 2,
        // ...
        LT: 3,
        // <
        GT: 4,
        // >
        LPAREN: 5,
        // (
        RPAREN: 6,
        // )
        LBRACE: 7,
        // {
        RBRACE: 8,
        // }
        LBRACK: 9,
        // [
        RBRACK: 10,
        // ]
        COMMA: 11,
        // ,
        COLON: 12,
        // :
        STAR: 13,
        // *
        PIPE: 14,
        // |
        QUESTION: 15,
        // ?
        BANG: 16,
        // !
        EQUAL: 17,
        // =
        NAME: 18,
        // name token
        STRING: 19,
        // string
        NUMBER: 20,
        // number
        EOF: 21
      };
      function isTypeName(ch) {
        return "><(){}[],:*|?!=".indexOf(String.fromCharCode(ch)) === -1 && !esutils.code.isWhiteSpace(ch) && !esutils.code.isLineTerminator(ch);
      }
      function Context(previous2, index2, token2, value2) {
        this._previous = previous2;
        this._index = index2;
        this._token = token2;
        this._value = value2;
      }
      Context.prototype.restore = function() {
        previous = this._previous;
        index = this._index;
        token = this._token;
        value = this._value;
      };
      Context.save = function() {
        return new Context(previous, index, token, value);
      };
      function maybeAddRange(node, range) {
        if (addRange) {
          node.range = [range[0] + rangeOffset, range[1] + rangeOffset];
        }
        return node;
      }
      function advance() {
        var ch = source.charAt(index);
        index += 1;
        return ch;
      }
      function scanHexEscape(prefix) {
        var i, len, ch, code = 0;
        len = prefix === "u" ? 4 : 2;
        for (i = 0; i < len; ++i) {
          if (index < length && esutils.code.isHexDigit(source.charCodeAt(index))) {
            ch = advance();
            code = code * 16 + "0123456789abcdef".indexOf(ch.toLowerCase());
          } else {
            return "";
          }
        }
        return String.fromCharCode(code);
      }
      function scanString() {
        var str = "", quote, ch, code, unescaped, restore;
        quote = source.charAt(index);
        ++index;
        while (index < length) {
          ch = advance();
          if (ch === quote) {
            quote = "";
            break;
          } else if (ch === "\\") {
            ch = advance();
            if (!esutils.code.isLineTerminator(ch.charCodeAt(0))) {
              switch (ch) {
                case "n":
                  str += "\n";
                  break;
                case "r":
                  str += "\r";
                  break;
                case "t":
                  str += "	";
                  break;
                case "u":
                case "x":
                  restore = index;
                  unescaped = scanHexEscape(ch);
                  if (unescaped) {
                    str += unescaped;
                  } else {
                    index = restore;
                    str += ch;
                  }
                  break;
                case "b":
                  str += "\b";
                  break;
                case "f":
                  str += "\f";
                  break;
                case "v":
                  str += "\v";
                  break;
                default:
                  if (esutils.code.isOctalDigit(ch.charCodeAt(0))) {
                    code = "01234567".indexOf(ch);
                    if (index < length && esutils.code.isOctalDigit(source.charCodeAt(index))) {
                      code = code * 8 + "01234567".indexOf(advance());
                      if ("0123".indexOf(ch) >= 0 && index < length && esutils.code.isOctalDigit(source.charCodeAt(index))) {
                        code = code * 8 + "01234567".indexOf(advance());
                      }
                    }
                    str += String.fromCharCode(code);
                  } else {
                    str += ch;
                  }
                  break;
              }
            } else {
              if (ch === "\r" && source.charCodeAt(index) === 10) {
                ++index;
              }
            }
          } else if (esutils.code.isLineTerminator(ch.charCodeAt(0))) {
            break;
          } else {
            str += ch;
          }
        }
        if (quote !== "") {
          utility.throwError("unexpected quote");
        }
        value = str;
        return Token.STRING;
      }
      function scanNumber() {
        var number, ch;
        number = "";
        ch = source.charCodeAt(index);
        if (ch !== 46) {
          number = advance();
          ch = source.charCodeAt(index);
          if (number === "0") {
            if (ch === 120 || ch === 88) {
              number += advance();
              while (index < length) {
                ch = source.charCodeAt(index);
                if (!esutils.code.isHexDigit(ch)) {
                  break;
                }
                number += advance();
              }
              if (number.length <= 2) {
                utility.throwError("unexpected token");
              }
              if (index < length) {
                ch = source.charCodeAt(index);
                if (esutils.code.isIdentifierStartES5(ch)) {
                  utility.throwError("unexpected token");
                }
              }
              value = parseInt(number, 16);
              return Token.NUMBER;
            }
            if (esutils.code.isOctalDigit(ch)) {
              number += advance();
              while (index < length) {
                ch = source.charCodeAt(index);
                if (!esutils.code.isOctalDigit(ch)) {
                  break;
                }
                number += advance();
              }
              if (index < length) {
                ch = source.charCodeAt(index);
                if (esutils.code.isIdentifierStartES5(ch) || esutils.code.isDecimalDigit(ch)) {
                  utility.throwError("unexpected token");
                }
              }
              value = parseInt(number, 8);
              return Token.NUMBER;
            }
            if (esutils.code.isDecimalDigit(ch)) {
              utility.throwError("unexpected token");
            }
          }
          while (index < length) {
            ch = source.charCodeAt(index);
            if (!esutils.code.isDecimalDigit(ch)) {
              break;
            }
            number += advance();
          }
        }
        if (ch === 46) {
          number += advance();
          while (index < length) {
            ch = source.charCodeAt(index);
            if (!esutils.code.isDecimalDigit(ch)) {
              break;
            }
            number += advance();
          }
        }
        if (ch === 101 || ch === 69) {
          number += advance();
          ch = source.charCodeAt(index);
          if (ch === 43 || ch === 45) {
            number += advance();
          }
          ch = source.charCodeAt(index);
          if (esutils.code.isDecimalDigit(ch)) {
            number += advance();
            while (index < length) {
              ch = source.charCodeAt(index);
              if (!esutils.code.isDecimalDigit(ch)) {
                break;
              }
              number += advance();
            }
          } else {
            utility.throwError("unexpected token");
          }
        }
        if (index < length) {
          ch = source.charCodeAt(index);
          if (esutils.code.isIdentifierStartES5(ch)) {
            utility.throwError("unexpected token");
          }
        }
        value = parseFloat(number);
        return Token.NUMBER;
      }
      function scanTypeName() {
        var ch, ch2;
        value = advance();
        while (index < length && isTypeName(source.charCodeAt(index))) {
          ch = source.charCodeAt(index);
          if (ch === 46) {
            if (index + 1 >= length) {
              return Token.ILLEGAL;
            }
            ch2 = source.charCodeAt(index + 1);
            if (ch2 === 60) {
              break;
            }
          }
          value += advance();
        }
        return Token.NAME;
      }
      function next() {
        var ch;
        previous = index;
        while (index < length && esutils.code.isWhiteSpace(source.charCodeAt(index))) {
          advance();
        }
        if (index >= length) {
          token = Token.EOF;
          return token;
        }
        ch = source.charCodeAt(index);
        switch (ch) {
          case 39:
          case 34:
            token = scanString();
            return token;
          case 58:
            advance();
            token = Token.COLON;
            return token;
          case 44:
            advance();
            token = Token.COMMA;
            return token;
          case 40:
            advance();
            token = Token.LPAREN;
            return token;
          case 41:
            advance();
            token = Token.RPAREN;
            return token;
          case 91:
            advance();
            token = Token.LBRACK;
            return token;
          case 93:
            advance();
            token = Token.RBRACK;
            return token;
          case 123:
            advance();
            token = Token.LBRACE;
            return token;
          case 125:
            advance();
            token = Token.RBRACE;
            return token;
          case 46:
            if (index + 1 < length) {
              ch = source.charCodeAt(index + 1);
              if (ch === 60) {
                advance();
                advance();
                token = Token.DOT_LT;
                return token;
              }
              if (ch === 46 && index + 2 < length && source.charCodeAt(index + 2) === 46) {
                advance();
                advance();
                advance();
                token = Token.REST;
                return token;
              }
              if (esutils.code.isDecimalDigit(ch)) {
                token = scanNumber();
                return token;
              }
            }
            token = Token.ILLEGAL;
            return token;
          case 60:
            advance();
            token = Token.LT;
            return token;
          case 62:
            advance();
            token = Token.GT;
            return token;
          case 42:
            advance();
            token = Token.STAR;
            return token;
          case 124:
            advance();
            token = Token.PIPE;
            return token;
          case 63:
            advance();
            token = Token.QUESTION;
            return token;
          case 33:
            advance();
            token = Token.BANG;
            return token;
          case 61:
            advance();
            token = Token.EQUAL;
            return token;
          case 45:
            token = scanNumber();
            return token;
          default:
            if (esutils.code.isDecimalDigit(ch)) {
              token = scanNumber();
              return token;
            }
            utility.assert(isTypeName(ch));
            token = scanTypeName();
            return token;
        }
      }
      function consume(target, text) {
        utility.assert(token === target, text || "consumed token not matched");
        next();
      }
      function expect(target, message) {
        if (token !== target) {
          utility.throwError(message || "unexpected token");
        }
        next();
      }
      function parseUnionType() {
        var elements, startIndex = index - 1;
        consume(Token.LPAREN, "UnionType should start with (");
        elements = [];
        if (token !== Token.RPAREN) {
          while (true) {
            elements.push(parseTypeExpression());
            if (token === Token.RPAREN) {
              break;
            }
            expect(Token.PIPE);
          }
        }
        consume(Token.RPAREN, "UnionType should end with )");
        return maybeAddRange({
          type: Syntax.UnionType,
          elements
        }, [startIndex, previous]);
      }
      function parseArrayType() {
        var elements, startIndex = index - 1, restStartIndex;
        consume(Token.LBRACK, "ArrayType should start with [");
        elements = [];
        while (token !== Token.RBRACK) {
          if (token === Token.REST) {
            restStartIndex = index - 3;
            consume(Token.REST);
            elements.push(maybeAddRange({
              type: Syntax.RestType,
              expression: parseTypeExpression()
            }, [restStartIndex, previous]));
            break;
          } else {
            elements.push(parseTypeExpression());
          }
          if (token !== Token.RBRACK) {
            expect(Token.COMMA);
          }
        }
        expect(Token.RBRACK);
        return maybeAddRange({
          type: Syntax.ArrayType,
          elements
        }, [startIndex, previous]);
      }
      function parseFieldName() {
        var v = value;
        if (token === Token.NAME || token === Token.STRING) {
          next();
          return v;
        }
        if (token === Token.NUMBER) {
          consume(Token.NUMBER);
          return String(v);
        }
        utility.throwError("unexpected token");
      }
      function parseFieldType() {
        var key, rangeStart = previous;
        key = parseFieldName();
        if (token === Token.COLON) {
          consume(Token.COLON);
          return maybeAddRange({
            type: Syntax.FieldType,
            key,
            value: parseTypeExpression()
          }, [rangeStart, previous]);
        }
        return maybeAddRange({
          type: Syntax.FieldType,
          key,
          value: null
        }, [rangeStart, previous]);
      }
      function parseRecordType() {
        var fields, rangeStart = index - 1, rangeEnd;
        consume(Token.LBRACE, "RecordType should start with {");
        fields = [];
        if (token === Token.COMMA) {
          consume(Token.COMMA);
        } else {
          while (token !== Token.RBRACE) {
            fields.push(parseFieldType());
            if (token !== Token.RBRACE) {
              expect(Token.COMMA);
            }
          }
        }
        rangeEnd = index;
        expect(Token.RBRACE);
        return maybeAddRange({
          type: Syntax.RecordType,
          fields
        }, [rangeStart, rangeEnd]);
      }
      function parseNameExpression() {
        var name = value, rangeStart = index - name.length;
        expect(Token.NAME);
        if (token === Token.COLON && (name === "module" || name === "external" || name === "event")) {
          consume(Token.COLON);
          name += ":" + value;
          expect(Token.NAME);
        }
        return maybeAddRange({
          type: Syntax.NameExpression,
          name
        }, [rangeStart, previous]);
      }
      function parseTypeExpressionList() {
        var elements = [];
        elements.push(parseTop());
        while (token === Token.COMMA) {
          consume(Token.COMMA);
          elements.push(parseTop());
        }
        return elements;
      }
      function parseTypeName() {
        var expr, applications, startIndex = index - value.length;
        expr = parseNameExpression();
        if (token === Token.DOT_LT || token === Token.LT) {
          next();
          applications = parseTypeExpressionList();
          expect(Token.GT);
          return maybeAddRange({
            type: Syntax.TypeApplication,
            expression: expr,
            applications
          }, [startIndex, previous]);
        }
        return expr;
      }
      function parseResultType() {
        consume(Token.COLON, "ResultType should start with :");
        if (token === Token.NAME && value === "void") {
          consume(Token.NAME);
          return {
            type: Syntax.VoidLiteral
          };
        }
        return parseTypeExpression();
      }
      function parseParametersType() {
        var params = [], optionalSequence = false, expr, rest = false, startIndex, restStartIndex = index - 3, nameStartIndex;
        while (token !== Token.RPAREN) {
          if (token === Token.REST) {
            consume(Token.REST);
            rest = true;
          }
          startIndex = previous;
          expr = parseTypeExpression();
          if (expr.type === Syntax.NameExpression && token === Token.COLON) {
            nameStartIndex = previous - expr.name.length;
            consume(Token.COLON);
            expr = maybeAddRange({
              type: Syntax.ParameterType,
              name: expr.name,
              expression: parseTypeExpression()
            }, [nameStartIndex, previous]);
          }
          if (token === Token.EQUAL) {
            consume(Token.EQUAL);
            expr = maybeAddRange({
              type: Syntax.OptionalType,
              expression: expr
            }, [startIndex, previous]);
            optionalSequence = true;
          } else {
            if (optionalSequence) {
              utility.throwError("unexpected token");
            }
          }
          if (rest) {
            expr = maybeAddRange({
              type: Syntax.RestType,
              expression: expr
            }, [restStartIndex, previous]);
          }
          params.push(expr);
          if (token !== Token.RPAREN) {
            expect(Token.COMMA);
          }
        }
        return params;
      }
      function parseFunctionType() {
        var isNew, thisBinding, params, result, fnType, startIndex = index - value.length;
        utility.assert(token === Token.NAME && value === "function", "FunctionType should start with 'function'");
        consume(Token.NAME);
        expect(Token.LPAREN);
        isNew = false;
        params = [];
        thisBinding = null;
        if (token !== Token.RPAREN) {
          if (token === Token.NAME && (value === "this" || value === "new")) {
            isNew = value === "new";
            consume(Token.NAME);
            expect(Token.COLON);
            thisBinding = parseTypeName();
            if (token === Token.COMMA) {
              consume(Token.COMMA);
              params = parseParametersType();
            }
          } else {
            params = parseParametersType();
          }
        }
        expect(Token.RPAREN);
        result = null;
        if (token === Token.COLON) {
          result = parseResultType();
        }
        fnType = maybeAddRange({
          type: Syntax.FunctionType,
          params,
          result
        }, [startIndex, previous]);
        if (thisBinding) {
          fnType["this"] = thisBinding;
          if (isNew) {
            fnType["new"] = true;
          }
        }
        return fnType;
      }
      function parseBasicTypeExpression() {
        var context, startIndex;
        switch (token) {
          case Token.STAR:
            consume(Token.STAR);
            return maybeAddRange({
              type: Syntax.AllLiteral
            }, [previous - 1, previous]);
          case Token.LPAREN:
            return parseUnionType();
          case Token.LBRACK:
            return parseArrayType();
          case Token.LBRACE:
            return parseRecordType();
          case Token.NAME:
            startIndex = index - value.length;
            if (value === "null") {
              consume(Token.NAME);
              return maybeAddRange({
                type: Syntax.NullLiteral
              }, [startIndex, previous]);
            }
            if (value === "undefined") {
              consume(Token.NAME);
              return maybeAddRange({
                type: Syntax.UndefinedLiteral
              }, [startIndex, previous]);
            }
            if (value === "true" || value === "false") {
              consume(Token.NAME);
              return maybeAddRange({
                type: Syntax.BooleanLiteralType,
                value: value === "true"
              }, [startIndex, previous]);
            }
            context = Context.save();
            if (value === "function") {
              try {
                return parseFunctionType();
              } catch (e) {
                context.restore();
              }
            }
            return parseTypeName();
          case Token.STRING:
            next();
            return maybeAddRange({
              type: Syntax.StringLiteralType,
              value
            }, [previous - value.length - 2, previous]);
          case Token.NUMBER:
            next();
            return maybeAddRange({
              type: Syntax.NumericLiteralType,
              value
            }, [previous - String(value).length, previous]);
          default:
            utility.throwError("unexpected token");
        }
      }
      function parseTypeExpression() {
        var expr, rangeStart;
        if (token === Token.QUESTION) {
          rangeStart = index - 1;
          consume(Token.QUESTION);
          if (token === Token.COMMA || token === Token.EQUAL || token === Token.RBRACE || token === Token.RPAREN || token === Token.PIPE || token === Token.EOF || token === Token.RBRACK || token === Token.GT) {
            return maybeAddRange({
              type: Syntax.NullableLiteral
            }, [rangeStart, previous]);
          }
          return maybeAddRange({
            type: Syntax.NullableType,
            expression: parseBasicTypeExpression(),
            prefix: true
          }, [rangeStart, previous]);
        } else if (token === Token.BANG) {
          rangeStart = index - 1;
          consume(Token.BANG);
          return maybeAddRange({
            type: Syntax.NonNullableType,
            expression: parseBasicTypeExpression(),
            prefix: true
          }, [rangeStart, previous]);
        } else {
          rangeStart = previous;
        }
        expr = parseBasicTypeExpression();
        if (token === Token.BANG) {
          consume(Token.BANG);
          return maybeAddRange({
            type: Syntax.NonNullableType,
            expression: expr,
            prefix: false
          }, [rangeStart, previous]);
        }
        if (token === Token.QUESTION) {
          consume(Token.QUESTION);
          return maybeAddRange({
            type: Syntax.NullableType,
            expression: expr,
            prefix: false
          }, [rangeStart, previous]);
        }
        if (token === Token.LBRACK) {
          consume(Token.LBRACK);
          expect(Token.RBRACK, "expected an array-style type declaration (" + value + "[])");
          return maybeAddRange({
            type: Syntax.TypeApplication,
            expression: maybeAddRange({
              type: Syntax.NameExpression,
              name: "Array"
            }, [rangeStart, previous]),
            applications: [expr]
          }, [rangeStart, previous]);
        }
        return expr;
      }
      function parseTop() {
        var expr, elements;
        expr = parseTypeExpression();
        if (token !== Token.PIPE) {
          return expr;
        }
        elements = [expr];
        consume(Token.PIPE);
        while (true) {
          elements.push(parseTypeExpression());
          if (token !== Token.PIPE) {
            break;
          }
          consume(Token.PIPE);
        }
        return maybeAddRange({
          type: Syntax.UnionType,
          elements
        }, [0, index]);
      }
      function parseTopParamType() {
        var expr;
        if (token === Token.REST) {
          consume(Token.REST);
          return maybeAddRange({
            type: Syntax.RestType,
            expression: parseTop()
          }, [0, index]);
        }
        expr = parseTop();
        if (token === Token.EQUAL) {
          consume(Token.EQUAL);
          return maybeAddRange({
            type: Syntax.OptionalType,
            expression: expr
          }, [0, index]);
        }
        return expr;
      }
      function parseType(src, opt) {
        var expr;
        source = src;
        length = source.length;
        index = 0;
        previous = 0;
        addRange = opt && opt.range;
        rangeOffset = opt && opt.startIndex || 0;
        next();
        expr = parseTop();
        if (opt && opt.midstream) {
          return {
            expression: expr,
            index: previous
          };
        }
        if (token !== Token.EOF) {
          utility.throwError("not reach to EOF");
        }
        return expr;
      }
      function parseParamType(src, opt) {
        var expr;
        source = src;
        length = source.length;
        index = 0;
        previous = 0;
        addRange = opt && opt.range;
        rangeOffset = opt && opt.startIndex || 0;
        next();
        expr = parseTopParamType();
        if (opt && opt.midstream) {
          return {
            expression: expr,
            index: previous
          };
        }
        if (token !== Token.EOF) {
          utility.throwError("not reach to EOF");
        }
        return expr;
      }
      function stringifyImpl(node, compact, topLevel) {
        var result, i, iz;
        switch (node.type) {
          case Syntax.NullableLiteral:
            result = "?";
            break;
          case Syntax.AllLiteral:
            result = "*";
            break;
          case Syntax.NullLiteral:
            result = "null";
            break;
          case Syntax.UndefinedLiteral:
            result = "undefined";
            break;
          case Syntax.VoidLiteral:
            result = "void";
            break;
          case Syntax.UnionType:
            if (!topLevel) {
              result = "(";
            } else {
              result = "";
            }
            for (i = 0, iz = node.elements.length; i < iz; ++i) {
              result += stringifyImpl(node.elements[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "|" : " | ";
              }
            }
            if (!topLevel) {
              result += ")";
            }
            break;
          case Syntax.ArrayType:
            result = "[";
            for (i = 0, iz = node.elements.length; i < iz; ++i) {
              result += stringifyImpl(node.elements[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += "]";
            break;
          case Syntax.RecordType:
            result = "{";
            for (i = 0, iz = node.fields.length; i < iz; ++i) {
              result += stringifyImpl(node.fields[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += "}";
            break;
          case Syntax.FieldType:
            if (node.value) {
              result = node.key + (compact ? ":" : ": ") + stringifyImpl(node.value, compact);
            } else {
              result = node.key;
            }
            break;
          case Syntax.FunctionType:
            result = compact ? "function(" : "function (";
            if (node["this"]) {
              if (node["new"]) {
                result += compact ? "new:" : "new: ";
              } else {
                result += compact ? "this:" : "this: ";
              }
              result += stringifyImpl(node["this"], compact);
              if (node.params.length !== 0) {
                result += compact ? "," : ", ";
              }
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
              result += stringifyImpl(node.params[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += ")";
            if (node.result) {
              result += (compact ? ":" : ": ") + stringifyImpl(node.result, compact);
            }
            break;
          case Syntax.ParameterType:
            result = node.name + (compact ? ":" : ": ") + stringifyImpl(node.expression, compact);
            break;
          case Syntax.RestType:
            result = "...";
            if (node.expression) {
              result += stringifyImpl(node.expression, compact);
            }
            break;
          case Syntax.NonNullableType:
            if (node.prefix) {
              result = "!" + stringifyImpl(node.expression, compact);
            } else {
              result = stringifyImpl(node.expression, compact) + "!";
            }
            break;
          case Syntax.OptionalType:
            result = stringifyImpl(node.expression, compact) + "=";
            break;
          case Syntax.NullableType:
            if (node.prefix) {
              result = "?" + stringifyImpl(node.expression, compact);
            } else {
              result = stringifyImpl(node.expression, compact) + "?";
            }
            break;
          case Syntax.NameExpression:
            result = node.name;
            break;
          case Syntax.TypeApplication:
            result = stringifyImpl(node.expression, compact) + ".<";
            for (i = 0, iz = node.applications.length; i < iz; ++i) {
              result += stringifyImpl(node.applications[i], compact);
              if (i + 1 !== iz) {
                result += compact ? "," : ", ";
              }
            }
            result += ">";
            break;
          case Syntax.StringLiteralType:
            result = '"' + node.value + '"';
            break;
          case Syntax.NumericLiteralType:
            result = String(node.value);
            break;
          case Syntax.BooleanLiteralType:
            result = String(node.value);
            break;
          default:
            utility.throwError("Unknown type " + node.type);
        }
        return result;
      }
      function stringify(node, options) {
        if (options == null) {
          options = {};
        }
        return stringifyImpl(node, options.compact, options.topLevel);
      }
      exports.parseType = parseType;
      exports.parseParamType = parseParamType;
      exports.stringify = stringify;
      exports.Syntax = Syntax;
    })();
  }
});

// node_modules/doctrine/lib/doctrine.js
var require_doctrine = __commonJS({
  "node_modules/doctrine/lib/doctrine.js"(exports) {
    (function() {
      "use strict";
      var typed, utility, jsdoc, esutils, hasOwnProperty;
      esutils = require_utils();
      typed = require_typed();
      utility = require_utility();
      function sliceSource(source, index, last) {
        return source.slice(index, last);
      }
      hasOwnProperty = /* @__PURE__ */ function() {
        var func = Object.prototype.hasOwnProperty;
        return function hasOwnProperty2(obj, name) {
          return func.call(obj, name);
        };
      }();
      function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            ret[key] = obj[key];
          }
        }
        return ret;
      }
      function isASCIIAlphanumeric(ch) {
        return ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57;
      }
      function isParamTitle(title) {
        return title === "param" || title === "argument" || title === "arg";
      }
      function isReturnTitle(title) {
        return title === "return" || title === "returns";
      }
      function isProperty(title) {
        return title === "property" || title === "prop";
      }
      function isNameParameterRequired(title) {
        return isParamTitle(title) || isProperty(title) || title === "alias" || title === "this" || title === "mixes" || title === "requires";
      }
      function isAllowedName(title) {
        return isNameParameterRequired(title) || title === "const" || title === "constant";
      }
      function isAllowedNested(title) {
        return isProperty(title) || isParamTitle(title);
      }
      function isAllowedOptional(title) {
        return isProperty(title) || isParamTitle(title);
      }
      function isTypeParameterRequired(title) {
        return isParamTitle(title) || isReturnTitle(title) || title === "define" || title === "enum" || title === "implements" || title === "this" || title === "type" || title === "typedef" || isProperty(title);
      }
      function isAllowedType(title) {
        return isTypeParameterRequired(title) || title === "throws" || title === "const" || title === "constant" || title === "namespace" || title === "member" || title === "var" || title === "module" || title === "constructor" || title === "class" || title === "extends" || title === "augments" || title === "public" || title === "private" || title === "protected";
      }
      var WHITESPACE = "[ \\f\\t\\v\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000\\ufeff]";
      var STAR_MATCHER = "(" + WHITESPACE + "*(?:\\*" + WHITESPACE + "?)?)(.+|[\r\n\u2028\u2029])";
      function unwrapComment(doc) {
        return doc.replace(/^\/\*\*?/, "").replace(/\*\/$/, "").replace(new RegExp(STAR_MATCHER, "g"), "$2").replace(/\s*$/, "");
      }
      function convertUnwrappedCommentIndex(originalSource, unwrappedIndex) {
        var replacedSource = originalSource.replace(/^\/\*\*?/, "");
        var numSkippedChars = 0;
        var matcher = new RegExp(STAR_MATCHER, "g");
        var match;
        while (match = matcher.exec(replacedSource)) {
          numSkippedChars += match[1].length;
          if (match.index + match[0].length > unwrappedIndex + numSkippedChars) {
            return unwrappedIndex + numSkippedChars + originalSource.length - replacedSource.length;
          }
        }
        return originalSource.replace(/\*\/$/, "").replace(/\s*$/, "").length;
      }
      (function(exports2) {
        var Rules, index, lineNumber, length, source, originalSource, recoverable, sloppy, strict;
        function advance() {
          var ch = source.charCodeAt(index);
          index += 1;
          if (esutils.code.isLineTerminator(ch) && !(ch === 13 && source.charCodeAt(index) === 10)) {
            lineNumber += 1;
          }
          return String.fromCharCode(ch);
        }
        function scanTitle() {
          var title = "";
          advance();
          while (index < length && isASCIIAlphanumeric(source.charCodeAt(index))) {
            title += advance();
          }
          return title;
        }
        function seekContent() {
          var ch, waiting, last = index;
          waiting = false;
          while (last < length) {
            ch = source.charCodeAt(last);
            if (esutils.code.isLineTerminator(ch) && !(ch === 13 && source.charCodeAt(last + 1) === 10)) {
              waiting = true;
            } else if (waiting) {
              if (ch === 64) {
                break;
              }
              if (!esutils.code.isWhiteSpace(ch)) {
                waiting = false;
              }
            }
            last += 1;
          }
          return last;
        }
        function parseType(title, last, addRange) {
          var ch, brace, type, startIndex, direct = false;
          while (index < last) {
            ch = source.charCodeAt(index);
            if (esutils.code.isWhiteSpace(ch)) {
              advance();
            } else if (ch === 123) {
              advance();
              break;
            } else {
              direct = true;
              break;
            }
          }
          if (direct) {
            return null;
          }
          brace = 1;
          type = "";
          while (index < last) {
            ch = source.charCodeAt(index);
            if (esutils.code.isLineTerminator(ch)) {
              advance();
            } else {
              if (ch === 125) {
                brace -= 1;
                if (brace === 0) {
                  advance();
                  break;
                }
              } else if (ch === 123) {
                brace += 1;
              }
              if (type === "") {
                startIndex = index;
              }
              type += advance();
            }
          }
          if (brace !== 0) {
            return utility.throwError("Braces are not balanced");
          }
          if (isAllowedOptional(title)) {
            return typed.parseParamType(type, { startIndex: convertIndex(startIndex), range: addRange });
          }
          return typed.parseType(type, { startIndex: convertIndex(startIndex), range: addRange });
        }
        function scanIdentifier(last) {
          var identifier;
          if (!esutils.code.isIdentifierStartES5(source.charCodeAt(index)) && !source[index].match(/[0-9]/)) {
            return null;
          }
          identifier = advance();
          while (index < last && esutils.code.isIdentifierPartES5(source.charCodeAt(index))) {
            identifier += advance();
          }
          return identifier;
        }
        function skipWhiteSpace(last) {
          while (index < last && (esutils.code.isWhiteSpace(source.charCodeAt(index)) || esutils.code.isLineTerminator(source.charCodeAt(index)))) {
            advance();
          }
        }
        function parseName(last, allowBrackets, allowNestedParams) {
          var name = "", useBrackets, insideString;
          skipWhiteSpace(last);
          if (index >= last) {
            return null;
          }
          if (source.charCodeAt(index) === 91) {
            if (allowBrackets) {
              useBrackets = true;
              name = advance();
            } else {
              return null;
            }
          }
          name += scanIdentifier(last);
          if (allowNestedParams) {
            if (source.charCodeAt(index) === 58 && (name === "module" || name === "external" || name === "event")) {
              name += advance();
              name += scanIdentifier(last);
            }
            if (source.charCodeAt(index) === 91 && source.charCodeAt(index + 1) === 93) {
              name += advance();
              name += advance();
            }
            while (source.charCodeAt(index) === 46 || source.charCodeAt(index) === 47 || source.charCodeAt(index) === 35 || source.charCodeAt(index) === 45 || source.charCodeAt(index) === 126) {
              name += advance();
              name += scanIdentifier(last);
            }
          }
          if (useBrackets) {
            skipWhiteSpace(last);
            if (source.charCodeAt(index) === 61) {
              name += advance();
              skipWhiteSpace(last);
              var ch;
              var bracketDepth = 1;
              while (index < last) {
                ch = source.charCodeAt(index);
                if (esutils.code.isWhiteSpace(ch)) {
                  if (!insideString) {
                    skipWhiteSpace(last);
                    ch = source.charCodeAt(index);
                  }
                }
                if (ch === 39) {
                  if (!insideString) {
                    insideString = "'";
                  } else {
                    if (insideString === "'") {
                      insideString = "";
                    }
                  }
                }
                if (ch === 34) {
                  if (!insideString) {
                    insideString = '"';
                  } else {
                    if (insideString === '"') {
                      insideString = "";
                    }
                  }
                }
                if (ch === 91) {
                  bracketDepth++;
                } else if (ch === 93 && --bracketDepth === 0) {
                  break;
                }
                name += advance();
              }
            }
            skipWhiteSpace(last);
            if (index >= last || source.charCodeAt(index) !== 93) {
              return null;
            }
            name += advance();
          }
          return name;
        }
        function skipToTag() {
          while (index < length && source.charCodeAt(index) !== 64) {
            advance();
          }
          if (index >= length) {
            return false;
          }
          utility.assert(
            source.charCodeAt(index) === 64
            /* '@' */
          );
          return true;
        }
        function convertIndex(rangeIndex) {
          if (source === originalSource) {
            return rangeIndex;
          }
          return convertUnwrappedCommentIndex(originalSource, rangeIndex);
        }
        function TagParser(options, title) {
          this._options = options;
          this._title = title.toLowerCase();
          this._tag = {
            title,
            description: null
          };
          if (this._options.lineNumbers) {
            this._tag.lineNumber = lineNumber;
          }
          this._first = index - title.length - 1;
          this._last = 0;
          this._extra = {};
        }
        TagParser.prototype.addError = function addError(errorText) {
          var args = Array.prototype.slice.call(arguments, 1), msg = errorText.replace(
            /%(\d)/g,
            function(whole, index2) {
              utility.assert(index2 < args.length, "Message reference must be in range");
              return args[index2];
            }
          );
          if (!this._tag.errors) {
            this._tag.errors = [];
          }
          if (strict) {
            utility.throwError(msg);
          }
          this._tag.errors.push(msg);
          return recoverable;
        };
        TagParser.prototype.parseType = function() {
          if (isTypeParameterRequired(this._title)) {
            try {
              this._tag.type = parseType(this._title, this._last, this._options.range);
              if (!this._tag.type) {
                if (!isParamTitle(this._title) && !isReturnTitle(this._title)) {
                  if (!this.addError("Missing or invalid tag type")) {
                    return false;
                  }
                }
              }
            } catch (error) {
              this._tag.type = null;
              if (!this.addError(error.message)) {
                return false;
              }
            }
          } else if (isAllowedType(this._title)) {
            try {
              this._tag.type = parseType(this._title, this._last, this._options.range);
            } catch (e) {
            }
          }
          return true;
        };
        TagParser.prototype._parseNamePath = function(optional) {
          var name;
          name = parseName(this._last, sloppy && isAllowedOptional(this._title), true);
          if (!name) {
            if (!optional) {
              if (!this.addError("Missing or invalid tag name")) {
                return false;
              }
            }
          }
          this._tag.name = name;
          return true;
        };
        TagParser.prototype.parseNamePath = function() {
          return this._parseNamePath(false);
        };
        TagParser.prototype.parseNamePathOptional = function() {
          return this._parseNamePath(true);
        };
        TagParser.prototype.parseName = function() {
          var assign, name;
          if (isAllowedName(this._title)) {
            this._tag.name = parseName(this._last, sloppy && isAllowedOptional(this._title), isAllowedNested(this._title));
            if (!this._tag.name) {
              if (!isNameParameterRequired(this._title)) {
                return true;
              }
              if (isParamTitle(this._title) && this._tag.type && this._tag.type.name) {
                this._extra.name = this._tag.type;
                this._tag.name = this._tag.type.name;
                this._tag.type = null;
              } else {
                if (!this.addError("Missing or invalid tag name")) {
                  return false;
                }
              }
            } else {
              name = this._tag.name;
              if (name.charAt(0) === "[" && name.charAt(name.length - 1) === "]") {
                assign = name.substring(1, name.length - 1).split("=");
                if (assign.length > 1) {
                  this._tag["default"] = assign.slice(1).join("=");
                }
                this._tag.name = assign[0];
                if (this._tag.type && this._tag.type.type !== "OptionalType") {
                  this._tag.type = {
                    type: "OptionalType",
                    expression: this._tag.type
                  };
                }
              }
            }
          }
          return true;
        };
        TagParser.prototype.parseDescription = function parseDescription() {
          var description = sliceSource(source, index, this._last).trim();
          if (description) {
            if (/^-\s+/.test(description)) {
              description = description.substring(2);
            }
            this._tag.description = description;
          }
          return true;
        };
        TagParser.prototype.parseCaption = function parseDescription() {
          var description = sliceSource(source, index, this._last).trim();
          var captionStartTag = "<caption>";
          var captionEndTag = "</caption>";
          var captionStart = description.indexOf(captionStartTag);
          var captionEnd = description.indexOf(captionEndTag);
          if (captionStart >= 0 && captionEnd >= 0) {
            this._tag.caption = description.substring(
              captionStart + captionStartTag.length,
              captionEnd
            ).trim();
            this._tag.description = description.substring(captionEnd + captionEndTag.length).trim();
          } else {
            this._tag.description = description;
          }
          return true;
        };
        TagParser.prototype.parseKind = function parseKind() {
          var kind, kinds;
          kinds = {
            "class": true,
            "constant": true,
            "event": true,
            "external": true,
            "file": true,
            "function": true,
            "member": true,
            "mixin": true,
            "module": true,
            "namespace": true,
            "typedef": true
          };
          kind = sliceSource(source, index, this._last).trim();
          this._tag.kind = kind;
          if (!hasOwnProperty(kinds, kind)) {
            if (!this.addError("Invalid kind name '%0'", kind)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.parseAccess = function parseAccess() {
          var access;
          access = sliceSource(source, index, this._last).trim();
          this._tag.access = access;
          if (access !== "private" && access !== "protected" && access !== "public") {
            if (!this.addError("Invalid access name '%0'", access)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.parseThis = function parseThis() {
          var value = sliceSource(source, index, this._last).trim();
          if (value && value.charAt(0) === "{") {
            var gotType = this.parseType();
            if (gotType && this._tag.type.type === "NameExpression" || this._tag.type.type === "UnionType") {
              this._tag.name = this._tag.type.name;
              return true;
            } else {
              return this.addError("Invalid name for this");
            }
          } else {
            return this.parseNamePath();
          }
        };
        TagParser.prototype.parseVariation = function parseVariation() {
          var variation, text;
          text = sliceSource(source, index, this._last).trim();
          variation = parseFloat(text, 10);
          this._tag.variation = variation;
          if (isNaN(variation)) {
            if (!this.addError("Invalid variation '%0'", text)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.ensureEnd = function() {
          var shouldBeEmpty = sliceSource(source, index, this._last).trim();
          if (shouldBeEmpty) {
            if (!this.addError("Unknown content '%0'", shouldBeEmpty)) {
              return false;
            }
          }
          return true;
        };
        TagParser.prototype.epilogue = function epilogue() {
          var description;
          description = this._tag.description;
          if (isAllowedOptional(this._title) && !this._tag.type && description && description.charAt(0) === "[") {
            this._tag.type = this._extra.name;
            if (!this._tag.name) {
              this._tag.name = void 0;
            }
            if (!sloppy) {
              if (!this.addError("Missing or invalid tag name")) {
                return false;
              }
            }
          }
          return true;
        };
        Rules = {
          // http://usejsdoc.org/tags-access.html
          "access": ["parseAccess"],
          // http://usejsdoc.org/tags-alias.html
          "alias": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-augments.html
          "augments": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-constructor.html
          "constructor": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-constructor.html
          "class": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-extends.html
          "extends": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-example.html
          "example": ["parseCaption"],
          // http://usejsdoc.org/tags-deprecated.html
          "deprecated": ["parseDescription"],
          // http://usejsdoc.org/tags-global.html
          "global": ["ensureEnd"],
          // http://usejsdoc.org/tags-inner.html
          "inner": ["ensureEnd"],
          // http://usejsdoc.org/tags-instance.html
          "instance": ["ensureEnd"],
          // http://usejsdoc.org/tags-kind.html
          "kind": ["parseKind"],
          // http://usejsdoc.org/tags-mixes.html
          "mixes": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-mixin.html
          "mixin": ["parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-member.html
          "member": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-method.html
          "method": ["parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-module.html
          "module": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-method.html
          "func": ["parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-method.html
          "function": ["parseNamePathOptional", "ensureEnd"],
          // Synonym: http://usejsdoc.org/tags-member.html
          "var": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-name.html
          "name": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-namespace.html
          "namespace": ["parseType", "parseNamePathOptional", "ensureEnd"],
          // http://usejsdoc.org/tags-private.html
          "private": ["parseType", "parseDescription"],
          // http://usejsdoc.org/tags-protected.html
          "protected": ["parseType", "parseDescription"],
          // http://usejsdoc.org/tags-public.html
          "public": ["parseType", "parseDescription"],
          // http://usejsdoc.org/tags-readonly.html
          "readonly": ["ensureEnd"],
          // http://usejsdoc.org/tags-requires.html
          "requires": ["parseNamePath", "ensureEnd"],
          // http://usejsdoc.org/tags-since.html
          "since": ["parseDescription"],
          // http://usejsdoc.org/tags-static.html
          "static": ["ensureEnd"],
          // http://usejsdoc.org/tags-summary.html
          "summary": ["parseDescription"],
          // http://usejsdoc.org/tags-this.html
          "this": ["parseThis", "ensureEnd"],
          // http://usejsdoc.org/tags-todo.html
          "todo": ["parseDescription"],
          // http://usejsdoc.org/tags-typedef.html
          "typedef": ["parseType", "parseNamePathOptional"],
          // http://usejsdoc.org/tags-variation.html
          "variation": ["parseVariation"],
          // http://usejsdoc.org/tags-version.html
          "version": ["parseDescription"]
        };
        TagParser.prototype.parse = function parse2() {
          var i, iz, sequences, method;
          if (!this._title) {
            if (!this.addError("Missing or invalid title")) {
              return null;
            }
          }
          this._last = seekContent(this._title);
          if (this._options.range) {
            this._tag.range = [this._first, source.slice(0, this._last).replace(/\s*$/, "").length].map(convertIndex);
          }
          if (hasOwnProperty(Rules, this._title)) {
            sequences = Rules[this._title];
          } else {
            sequences = ["parseType", "parseName", "parseDescription", "epilogue"];
          }
          for (i = 0, iz = sequences.length; i < iz; ++i) {
            method = sequences[i];
            if (!this[method]()) {
              return null;
            }
          }
          return this._tag;
        };
        function parseTag(options) {
          var title, parser, tag;
          if (!skipToTag()) {
            return null;
          }
          title = scanTitle();
          parser = new TagParser(options, title);
          tag = parser.parse();
          while (index < parser._last) {
            advance();
          }
          return tag;
        }
        function scanJSDocDescription(preserveWhitespace) {
          var description = "", ch, atAllowed;
          atAllowed = true;
          while (index < length) {
            ch = source.charCodeAt(index);
            if (atAllowed && ch === 64) {
              break;
            }
            if (esutils.code.isLineTerminator(ch)) {
              atAllowed = true;
            } else if (atAllowed && !esutils.code.isWhiteSpace(ch)) {
              atAllowed = false;
            }
            description += advance();
          }
          return preserveWhitespace ? description : description.trim();
        }
        function parse(comment, options) {
          var tags = [], tag, description, interestingTags, i, iz;
          if (options === void 0) {
            options = {};
          }
          if (typeof options.unwrap === "boolean" && options.unwrap) {
            source = unwrapComment(comment);
          } else {
            source = comment;
          }
          originalSource = comment;
          if (options.tags) {
            if (Array.isArray(options.tags)) {
              interestingTags = {};
              for (i = 0, iz = options.tags.length; i < iz; i++) {
                if (typeof options.tags[i] === "string") {
                  interestingTags[options.tags[i]] = true;
                } else {
                  utility.throwError('Invalid "tags" parameter: ' + options.tags);
                }
              }
            } else {
              utility.throwError('Invalid "tags" parameter: ' + options.tags);
            }
          }
          length = source.length;
          index = 0;
          lineNumber = 0;
          recoverable = options.recoverable;
          sloppy = options.sloppy;
          strict = options.strict;
          description = scanJSDocDescription(options.preserveWhitespace);
          while (true) {
            tag = parseTag(options);
            if (!tag) {
              break;
            }
            if (!interestingTags || interestingTags.hasOwnProperty(tag.title)) {
              tags.push(tag);
            }
          }
          return {
            description,
            tags
          };
        }
        exports2.parse = parse;
      })(jsdoc = {});
      exports.version = utility.VERSION;
      exports.parse = jsdoc.parse;
      exports.parseType = typed.parseType;
      exports.parseParamType = typed.parseParamType;
      exports.unwrapComment = unwrapComment;
      exports.Syntax = shallowCopy(typed.Syntax);
      exports.Error = utility.DoctrineError;
      exports.type = {
        Syntax: exports.Syntax,
        parseType: typed.parseType,
        parseParamType: typed.parseParamType,
        stringify: typed.stringify
      };
    })();
  }
});

export {
  require_doctrine
};
//# sourceMappingURL=chunk-O6FDI4Z2.js.map
