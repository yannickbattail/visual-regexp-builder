/**
HTML Requirements:
  A web page (or pages) capable of:
   - capturing the input string to be parsed
   - running the JavaScript parser
   - displaying the output

The web page must have the following elements:
1. required - include APG library
2. required - include generated parser
3. optional - user-written JavaScript syntax call back functions
4. optional - user-written JavaScript semantic call back functions
5. required - user-written JavaScript driver "main" program

The main function below performs the following steps:
function main()
{
    1. intitialize
       - parser opcodes
       - the parser
       - a message log
       - the syntax call back functions
       - the semantic call back functions
       - the AST
       - the input string
       - the parsing statistics
       - the parser trace
    2. parse input string - syntax analysis
    3. translate the input string - semantic analysis
       - display the translation
    4. display
       - the parser's final state
       - the parsing statistics
       - the parser trace
       - selected parsed phrases
}
*/
// /////////////////////////////////////////////////////////////////////////////
// 3. syntax call back functions
// /////////////////////////////////////////////////////////////////////////////
// state is an array, call back function may change the parser state and/or the matched character count
// state[OP_STATE] - APG_ACTIVE, APG_MATCH, APG_EMPTY or APG_NOMATCH - the state of the parser
// state[OP_MATCHED] - the number of characters in the matched phrase (if state = APG_MATCH or APG_EMPTY)
// chars - an array of character codes for the input string
// phraseIndex - the index of the first character of the phrase being examined
// e.g. chars[phraseIndex] is the first character code of the phrase
// data - user-defined data, specified in parser call to "syntaxAnalysis()"
/**
 * @param state
 * @param chars
 * @param phraseIndex
 * @param data
 * 
 */
function synSectionName(state, chars, phraseIndex, data) {
    // handwritten parser to eliminate lots of calls to alpha & digit
    if (state[OP_STATE] == APG_ACTIVE) {
        var i, count = 0;
        for (i = phraseIndex; i < chars.length; i += 1) {
            var thisChar = chars[i];
            if ((thisChar >= 65 && thisChar <= 90) || (thisChar >= 97 && thisChar <= 122) || (thisChar >= 48 && thisChar <= 57) || (thisChar == 95)) {
                count += 1;
            } else {
                break;
            }
        }
        if (count > 0) {
            state[OP_STATE] = APG_MATCH;
            state[OP_MATCHED] = count;
        } else {
            state[OP_STATE] = APG_NOMATCH;
            state[OP_MATCHED] = 0;
        }
    }
}
function synValueName(state, chars, phraseIndex, data) {
    // handwritten parser to eliminate lots of calls to alpha & digit
    if (state[OP_STATE] == APG_ACTIVE) {
        var i, count = 0;
        for (i = phraseIndex; i < chars.length; i += 1) {
            var thisChar = chars[i];
            if ((thisChar >= 65 && thisChar <= 90) || (thisChar >= 97 && thisChar <= 122) || (thisChar >= 48 && thisChar <= 57) || (thisChar == 95)) {
                count += 1;
            } else {
                break;
            }
        }
        if (count > 0) {
            state[OP_STATE] = APG_MATCH;
            state[OP_MATCHED] = count;
        } else {
            state[OP_STATE] = APG_NOMATCH;
            state[OP_MATCHED] = 0;
        }
    }
}
function synAlphaDigit(state, chars, phraseIndex, data) {
    // handwritten parser to eliminate lots of calls to alpha & digit
    if (state[OP_STATE] == APG_ACTIVE) {
        var i, count = 0;
        for (i = phraseIndex; i < chars.length; i += 1) {
            var thisChar = chars[i];
            if ((thisChar >= 65 && thisChar <= 90) || (thisChar >= 97 && thisChar <= 122) || (thisChar >= 48 && thisChar <= 57)) {
                count += 1;
            } else {
                break;
            }
        }
        if (count > 0) {
            state[OP_STATE] = APG_MATCH;
            state[OP_MATCHED] = count;
        } else {
            state[OP_STATE] = APG_NOMATCH;
            state[OP_MATCHED] = 0;
        }
    }
}
function synBadSectionLine(state, chars, phraseIndex, data) {
    // error reporting on discovery of a bad section line
    if (state[OP_STATE] == APG_MATCH) {
        data.log.logMsg('bad section line at line number: ' + data.lineno);
    }
}
function synBadValueLine(state, chars, phraseIndex, data) {
    // error reporting on discovery of a bad value line
    if (state[OP_STATE] == APG_MATCH) {
        data.log.logMsg('bad value line at line number: ' + data.lineno);
    }
}
function synLineEnd(state, chars, phraseIndex, data) {
    // counts the input string line numbers
    if (state[OP_STATE] == APG_MATCH) {
        data.lineno += 1;
    }
}
function SyntaxCallbacks(ruleIds) {
    // must be called prior to syntax analysis
    this.init = function(chars, log) {
        this.chars = chars; // the input string characters (array of ASCII character codes, not a string)
        this.log = log; // a msgLog() object
        this.lineno = 0; // the current line number, for error reporting
    };
    
    // ruleID - from the grammar opcodes
    // synList - an empty array for the call back function pointers
    this.callbackList = function(ruleID, synList) {
        // clear all call back functions
        for (var i = 0; i < ruleID.length; i += 1) {
            synList[i] = false;
        }
        
        // specify only the call back functions that have been defined
        synList[ruleID["badsectionline"]] = synBadSectionLine;
        synList[ruleID["badvalueline"]] = synBadValueLine;
        synList[ruleID["sectionname"]] = synSectionName;
        synList[ruleID["valuename"]] = synValueName;
        synList[ruleID["alphadigit"]] = synAlphaDigit;
        synList[ruleID["lineend"]] = synLineEnd;
    };
    this.chars = null; // the input string characters
    this.log = null; // a msgLog() object
    this.lineno = 0; // the current line number, for error reporting
    this.synList = []; // the list of syntax call back function pointers
    this.callbackList(ruleIds, this.synList); // initialize the call back function list
}

// /////////////////////////////////////////////////////////////////////////////
// 4. semantic call back functions
// /////////////////////////////////////////////////////////////////////////////

// state - APG_PRE, APG_POST - the direction of AST traversal (APG_PRE = down, APG_POST = up)
// chars - an array of character codes for the input string
// phraseIndex - the index of the first character of the phrase being examined
// e.g. chars[phraseIndex] is the first character code of the phrase
// phraseCount - the number of characters in the matched phrase
// data - user-defined data, specified in parser call to "semanticAnalysis()"
function semGeneric(state, chars, phraseIndex, phraseCount, data, ruleName) {
    var ret = APG_SEM_OK;
    if (state == APG_PRE) {
        data.xmlTree += '<' + ruleName + '>'/* + '\r\n' */;
        if (ruleName === 'regexpquantifier') {
            var char1 = charsToString(chars, phraseIndex, 1);
            if (char1 !== '{') {
                data.xmlTree += char1/* + '\r\n' */;
            }
        }
    }
    if (state == APG_POST) {
        data.xmlTree += '</' + ruleName + '>'/* + '\r\n' */;
    }
    return ret;
}

function semGenericSingle(state, chars, phraseIndex, phraseCount, data, ruleName) {
    var ret = APG_SEM_OK;
    if (state == APG_POST) {
        data.xmlTree += '<' + ruleName + ' />'/* + '\r\n' */;
    }
    return ret;
}

function semGenericContent(state, chars, phraseIndex, phraseCount, data, ruleName) {
    var ret = APG_SEM_OK;
    if (state == APG_PRE) {
        data.xmlTree += '<' + ruleName + '>'/* + '\r\n' */;
    }
    if (state == APG_POST) {
        data.xmlTree += escapeHtml(charsToString(chars, phraseIndex, phraseCount))/* + '\r\n' */;
        data.xmlTree += '</' + ruleName + '>'/* + '\r\n' */;
    }
    return ret;
}

// log - a message log object
// ruleIds - the rule ID array from the APG-generated opcodes
function SemCallbacks(log, ruleIds) {
    // ruleIds - the rule ID array from the APG-generated opcodes
    // semList - an empty array for the array of call back function pointers
    this.callbackList = function(ruleID, semList) {
        for (var i = 0; i < ruleID.length; i += 1) {
            semList[i] = false;
        }
        
        semList[ruleID["regexpliteral"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpliteral");
        };
        semList[ruleID["regexpatstart"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericSingle(state, chars, phraseIndex, phraseCount, data, "regexpatstart");
        };
        semList[ruleID["regexpatend"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericSingle(state, chars, phraseIndex, phraseCount, data, "regexpatend");
        };
        semList[ruleID["regexpoptions"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "regexpoptions");
        };
        semList[ruleID["regexpgroupcapture"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "regexpgroupcapture");
        };
        semList[ruleID["regexpclassnegative"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericSingle(state, chars, phraseIndex, phraseCount, data, "regexpclassnegative");
        };
        // semList[ruleID["regexpchoice"]] = function(state, chars, phraseIndex, phraseCount, data) {
        // return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpchoice");
        // };
        semList[ruleID["regexpsequence"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpsequence");
        };
        semList[ruleID["regexpalternative"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericSingle(state, chars, phraseIndex, phraseCount, data, "regexpalternative");
        };
        // semList[ruleID["regexpfactor"]] = function(state, chars, phraseIndex, phraseCount, data) {
        // return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpfactor");
        // };
        semList[ruleID["regexpgroup"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpgroup");
        };
        semList[ruleID["regexpclass"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpclass");
        };
        semList[ruleID["regexpcharrange"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpcharrange");
        };
        semList[ruleID["regexpcharstart"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "regexpcharstart");
        };
        semList[ruleID["regexpcharend"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "regexpcharend");
        };
        semList[ruleID["regexpquantifier"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpquantifier");
        };
        semList[ruleID["regexpquantifierrange"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGeneric(state, chars, phraseIndex, phraseCount, data, "regexpquantifierrange");
        };
        semList[ruleID["regexpclassword"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "regexpclassword");
        };
        semList[ruleID["regexpfactorword"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "regexpfactorword");
        };
        semList[ruleID["min"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "min");
        };
        semList[ruleID["max"]] = function(state, chars, phraseIndex, phraseCount, data) {
            return semGenericContent(state, chars, phraseIndex, phraseCount, data, "max");
        };
    };
    
    // semList - a complete array of call back function pointers
    // astList - an empty array for the AST's list of nodes
    this.astNodeList = function(semList, astList) {
        for (var i = 0; i < semList.length; i += 1) {
            if (semList[i]) {
                astList[i] = true;
            } else {
                astList[i] = false;
            }
        }
    };
    
    this.xmlTree = "";
    this.log = log;
    this.astList = [];
    this.semList = [];
    this.callbackList(ruleIds, this.semList);
    this.astNodeList(this.semList, this.astList);
}

var xmlToJson = {};

/**
 * 
 * @param {Node} rootNode
 * @returns {Object}
 */
xmlToJson.parse = function(rootNode) {
    return xmlToJson.regexpliteral(rootNode.firstChild);
};

xmlToJson.regexpliteral = function(rootNode) {
    var ret = {};
    ret.type = "literal";
    ret.global = false;
    ret.insensitive = false;
    ret.multiline = false;
    ret.atStart = false;
    ret.atEnd = false;
    ret.group = [];
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        var node = rootNode.childNodes[i];
        if (node.nodeName == "regexpatstart") {
            ret.atStart = true;
        } else if (node.nodeName == "regexpatend") {
            ret.atEnd = true;
        } else if ((node.nodeName == "regexpoptions") && (node.firstChild)) {
            if (node.firstChild.nodeValue.indexOf('g') !== -1) {
                ret.global = true;
            }
            if (node.firstChild.nodeValue.indexOf('i') !== -1) {
                ret.insensitive = true;
            }
            if (node.firstChild.nodeValue.indexOf('m') !== -1) {
                ret.multiline = true;
            }
        } else if (node.nodeName == "regexpalternative") {
            ret.group.push({
                "type": "alternative"
            });
        } else if (node.nodeName == "regexpsequence") {
            ret.group = ret.group.concat(xmlToJson.regexpsequence(node));
        }
    }
    return ret;
};

xmlToJson.regexpsequence = function(rootNode) {
    var tab = [];
    var lastItem = null;
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        var node = rootNode.childNodes[i];
        if (node.nodeName == "regexpclass") {
            lastItem = xmlToJson.regexpclass(node);
            tab.push(lastItem);
        } else if (node.nodeName == "regexpgroup") {
            lastItem = xmlToJson.regexpgroup(node);
            tab.push(lastItem);
        } else if (node.nodeName == "regexpfactorword") {
            lastItem = {
                "type": "word",
                "value": node.firstChild.nodeValue
            };
            tab.push(lastItem);
        } else if (node.nodeName == "regexpquantifier") {
            if (lastItem) {
                lastItem.min = "1";
                lastItem.max = "1";
                if (node.firstChild.nodeType == Node.TEXT_NODE) {
                    if (node.firstChild.nodeValue.trim() === '?') {
                        lastItem.min = "0";
                        lastItem.max = "1";
                    } else if (node.firstChild.nodeValue.trim() === '+') {
                        lastItem.min = "1";
                        lastItem.max = "";
                    } else if (node.firstChild.nodeValue.trim() === '*') {
                        lastItem.min = "0";
                        lastItem.max = "";
                    }
                } else {
                    var n = node.getElementsByTagName('min');
                    if (n && n[0]) {
                        lastItem.min = n[0].firstChild.nodeValue.trim();
                        n = node.getElementsByTagName('max');
                        if (n && n[0]) {
                            lastItem.max = n[0].firstChild.nodeValue.trim();
                        } else {
                            lastItem.max = lastItem.min;
                        }
                    }
                }
            }
        }
    }
    return tab;
};

xmlToJson.regexpclass = function(rootNode) {
    var ret = {};
    ret.type = "class";
    ret.negative = false;
    ret.group = [];
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        var node = rootNode.childNodes[i];
        if (node.nodeName == "regexpclassnegative") {
            ret.negative = true;
        } else if (node.nodeName == "regexpcharrange") {
            var lastItem = {};
            lastItem.type = "range";
            var n = node.getElementsByTagName('regexpcharstart');
            if (n && n[0]) {
                lastItem.first = n[0].firstChild.nodeValue.trim();
            }
            n = node.getElementsByTagName('regexpcharend');
            if (n && n[0]) {
                lastItem.last = n[0].firstChild.nodeValue.trim();
            }
            ret.group.push(lastItem);
        } else if (node.nodeName == "regexpclassword") {
            ret.group.push({
                "type": "char",
                "value": node.firstChild.nodeValue
            });
        }
    }
    return ret;
};

xmlToJson.regexpgroup = function(rootNode) {
    var ret = {};
    ret.type = "group";
    ret.capture = "yes";
    ret.group = [];
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        var node = rootNode.childNodes[i];
        //
        if (node.nodeName == "regexpgroupcapture") {
            if (node.firstChild.nodeValue.trim() === '?:') {
                ret.capture = "no";
            } else if (node.firstChild.nodeValue.trim() === '?=') {
                ret.capture = "+lookAhead";
            } else if (node.firstChild.nodeValue.trim() === '?!') {
                ret.capture = "-lookAhead";
            }
        } else if (node.nodeName == "regexpalternative") {
            ret.group.push({
                "type": "alternative"
            });
        } else if (node.nodeName == "regexpsequence") {
            ret.group = ret.group.concat(xmlToJson.regexpsequence(node));
        }
    }
    return ret;
};

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}

// /////////////////////////////////////////////////////////////////////////////
// 5. driver "main" program
// /////////////////////////////////////////////////////////////////////////////
function regexpToStructure(regexp) {
    // clear the output string
    var html = '';
    
    // initialize the APG-generated opcodes
    var parserOpcodes = new ABNFOpcodes();
    
    // initialize the parser
    var parser = new ApgLib(parserOpcodes.stringTable, parserOpcodes.rules, parserOpcodes.opcodes);
    
    // initialize the syntax call back functions
    var log = new MsgLog();
    var synCallbacks = new SyntaxCallbacks(parserOpcodes.ruleIds);
    // EXERCISE: Reduce the node count with handwritten parsers for selected rules
    // 1.Comment out the syntaxInit() line below so that there are no syntax call back functions called
    // 2.Parse the input string
    // 3.Note the statistics: TOTAL/ALL and the rule name counts for "alpha" and "digit"
    // 4.Now un-comment the syntaxInit() line and parse the same string again with syntax call back functions
    // 5.Note again the statistics. There should be a big reduction in the TOTAL/ALL count
    // and the "alpha" and "digit" counts should be zero (absent from the list)
    parser.syntaxInit(synCallbacks.synList);
    
    // get and preprocess the input string
    var stringChars = [];
    grammarToChars(log, regexp, stringChars);
    
    // NOTE: Some browsers will add line ending characters to the textarea content.
    // If in doubt, you can check it by un-commenting the following lines:
    // html += '<br /><br />input string chars:';
    // for(var i = 0; i < stringChars.length; i +=1)
    // {
    // html += '<br />';
    // html += 'i: '+i+' char: '+stringChars[i];
    // }
    
    // initialize the semantic call back functions
    var semCallbacks = new SemCallbacks(log, parserOpcodes.ruleIds);
    parser.semanticInit(semCallbacks.semList);
    
    // initialize the AST (required for semantic analysis)
    var ast = new Ast(semCallbacks.astList, parserOpcodes.rules, stringChars);
    parser.astInit(ast);
    
    // initialize the parser statistics
    var parserStats = new Stats(parserOpcodes.rules);
    parser.statsInit(parserStats);
    
    // initialize the parser trace
    var parserTrace = new Trace();
    parserTrace.initRules(parserOpcodes.rules);
    parserTrace.initChars(stringChars);
    parser.traceInit(parserTrace);
    parserTrace.setFilter(parserTrace.parseFilter, 'tls', true); // turn on TLS operator for trace record saving
    parserTrace.setFilter(parserTrace.displayFilter, 'tls', true); // turn on TLS operator for trace record display
    parserTrace.setFilter(parserTrace.parseFilter, 'rule', false, 18); // turn off wsp
    parserTrace.setFilter(parserTrace.parseFilter, 'rule', false, 21); // turn off any
    
    // parse the string
    synCallbacks.init(stringChars, log);
    var test = parser.syntaxAnalysis(0, stringChars, synCallbacks);
    var structure = {};
    
    if (log.count() !== 0) {
        html += log.logDisplay('syntaxAnalysis analysis errors encountered');
        return null;
    }
    if (!test) {
        html += 'There is an error in your regular expression.';
        return null;
    }
    
    // translate the string - semantic analysis
    parser.semanticAnalysis(semCallbacks);
    if (log.count() !== 0) {
        html += log.logDisplay('semanticAnalysis analysis errors encountered');
        return null;
    }
    
    var oParser = new DOMParser();
    var oDOM = oParser.parseFromString(semCallbacks.xmlTree, "text/xml");
    
    structure = xmlToJson.parse(oDOM);
    
    return structure;
}
