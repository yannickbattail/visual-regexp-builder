/********************************************************************
  APG - an ABNF Parser Generator
  Copyright (C) 2009 Coast to Coast Research, Inc.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see
  <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
  or write to the Free Software Foundation, Inc.,
  51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

      author: Lowell Thomas
              lowell@coasttocoastresearch.com
              http://www.coasttocoastresearch.com

*********************************************************************/
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
function synSectionName(state, chars, phraseIndex, data) {
    // handwritten parser to eliminate lots of calls to alpha & digit
    if (state[OP_STATE] == APG_ACTIVE) {
        var i, count = 0;
        for (i = phraseIndex; i < chars.length; i += 1) {
            var thisChar = chars[i];
            if ((thisChar >= 65 && thisChar <= 90) || (thisChar >= 97 && thisChar <= 122) || (thisChar >= 48 && thisChar <= 57) || (thisChar == 95)) {
                count += 1;
            } else {
                break
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
                break
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
                break
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
    }

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
function semIniFile(state, chars, phraseIndex, phraseCount, data) {
    var ret = APG_SEM_OK;
    if (state == APG_PRE) {
        // initialize for a new ini file
        data.total = 0;
        data.sectionName = '';
    } else if (state == APG_POST) {
        // convert the total cents to dollars
        data.total = data.total / 100;
    }
    return ret;
}
function semSectionName(state, chars, phraseIndex, phraseCount, data) {
    var ret = APG_SEM_OK;
    if (state == APG_POST) {
        // convert the section name characters to a string
        var name = charsToString(chars, phraseIndex, phraseCount);
        data.sectionName = name.toLowerCase();
    }
    return ret;
}
function semValue(state, chars, phraseIndex, phraseCount, data) {
    var ret = APG_SEM_OK;
    if (state == APG_POST) {
        if (data.sectionName == 'dollars' || data.sectionName == 'cents') {
            // get the integer value
            var value = 0;
            for (var i = 0; i < phraseCount; i += 1) {
                thisChar = chars[phraseIndex + i];
                if (thisChar < 48 || thisChar > 57) {
                    // log a value format error
                    var stringValue = charsToString(chars, phraseIndex, phraseCount);
                    data.log.logMsg('non-integer value found: section: [' + data.sectionName + '] value: ' + stringValue);
                    value = false;
                    break;
                }
                value = (value * 10) + (thisChar - 48);
            }
            if (value !== false) {
                if (data.sectionName == 'dollars') {
                    data.total += value * 100;
                } else {
                    data.total += value;
                }
            }
        }
        // ignore any other sections
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
        semList[ruleID["inifile"]] = semIniFile;
        semList[ruleID["sectionname"]] = semSectionName;
        semList[ruleID["value"]] = semValue;
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
    
    this.log = log;
    this.sectionName = '';
    this.total = 0;
    this.astList = [];
    this.semList = [];
    this.callbackList(ruleIds, this.semList);
    this.astNodeList(this.semList, this.astList);
}

// /////////////////////////////////////////////////////////////////////////////
// 5. driver "main" program
// /////////////////////////////////////////////////////////////////////////////
function main() {
    // clear the output string
    var html = '';
    
    // initialize the APG-generated opcodes
    var parserOpcodes = new regexpParser();
    
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
    var input = window.document.getElementById('input-string').value;
    var stringChars = [];
    grammarToChars(log, input, stringChars);
    
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
    
    // single point of exit loop
    while (true) {
        if (log.count() !== 0) {
            html += log.logDisplay('syntaxAnalysis analysis errors encountered');
            ;
            break;
        }
        if (!test) {
            html += '<br /><br />parser: syntaxAnalysis analysis errors of unknown type encountered';
            break;
        }
        
        // translate the string - semantic analysis
        parser.semanticAnalysis(semCallbacks);
        if (log.count() !== 0) {
            html += log.logDisplay('semanticAnalysis analysis errors encountered');
            ;
            break;
        }
        
        // success
        html += '<h4>Parser Translation:</h4>';
        html += 'total dollars and cents: $' + semCallbacks.total;
        break;
    }
    
    html += '<h4>Parser State:</h4>';
    html += parser.stateDisplay(); // display the parser state
    html += '<h4>Parser Statistics:</h4>';
    html += parser.stats.display(); // display the parser statistics
    html += '<h4>Parser Trace:</h4>';
    html += parserTrace.display(); // display the parser trace
    // print the accumulated output
    window.document.getElementById('parser-output').innerHTML = html;
    alert(ast.dump('regepliteral', stringChars));
}
