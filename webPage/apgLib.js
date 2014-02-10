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
/*global
isArray, stateToString, opcodeToString
*/
"use strict";
// opcode operator types
var ALT = 1;
var CAT = 2;
var REP = 3;
var RNM = 4;
var TRG = 5;
var TLS = 6;
var TBS = 7;
var PRD = 8;

// opcode syntactic predicate types
var APG_NOT = 0;
var APG_AND = 1;

// opcode & syntax analysis states
var APG_ACTIVE = 1;
var APG_MATCH = 2;
var APG_EMPTY = 3;
var APG_NOMATCH = 4;

// opcode execution return state
var OP_STATE = 0;
var OP_MATCHED = 1;

// semantic analysis callback states
var APG_PRE = 5;
var APG_POST = 6;

// semantic analysis callback return values
var APG_SEM_OK = 1;
var APG_SEM_ERROR = 0;
var APG_SEM_SKIP = 2;

/*CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC*/
// the APG library class
function ApgLib(strings, rules, ops)
{
    this.constructed = false;
    /*****************************************************************************/
    this.clear = function()
    {
        this.startRule = 0;
        this.ruleCount = this.rules.length;
        this.stats = null;
        this.ast = null;
        this.chars = null;
        this.charEOS = 0;
        this.treeDepth = 0;
        this.trace = null;
        this.stats = null;
        this.syntax = null;
        this.syntaxData = null;
        this.semantic = null;
        this.state = [APG_ACTIVE, 0];
    };
    while(true)
    {
        // validate the input
        if(!isArray(strings)){break;}
        if(!isArray(rules)){break;}
        if(!isArray(ops)){break;}
        if(rules.length === 0){break;}
        if(ops.length === 0){break;}
        
        // initialize the object
        this.strings = strings;
        this.rules = rules;
        this.opcodes = ops;
        this.constructed = true;
        this.clear();
        break;
    }
    
    /*****************************************************************************/
    // initialize APG for syntax analysis
    // list - an array of syntax call back function pointers
    this.syntaxInit = function(list)
    {
        this.syntax = [];
        if(isArray(list) && list.length > 0)
        {
            for(var i = 0; i < list.length; i+=1)
            {
                if(list[i]){this.syntax[i] = list[i];}
                else{this.syntax[i] = false;}
            }
        }
    };

    /*****************************************************************************/
    // initialize APG for semantic analysis
    // list - an array of semantic call back function pointers
    this.semanticInit = function(list)
    {
        this.semantic = [];
        if(isArray(list) && list.length > 0)
        {
            for(var i = 0; i < list.length; i+=1)
            {
                if(list[i]){this.semantic[i] = list[i];}
            }
        }
    };
    
    /*****************************************************************************/
    // initialize APG for AST generation (required if doing semantic analysis)
    // ast - a previously constructed AST object
    this.astInit = function(ast)
    {
        this.ast = ast;
    };
    
    /*****************************************************************************/
    // initialize APG for tracing the parser
    // trace - a previously constructed Trace object
    this.traceInit = function(trace)
    {
        if(trace){this.trace = trace;}
        else{this.trace = null;}
        
    };
    
    /*****************************************************************************/
    // initialize APG for statistics collection
    // stats - a previously constructed Stats object
    this.statsInit = function(stats)
    {
        this.stats = stats;
    };
    
    /*****************************************************************************/
    // displays the collected statistics
    // caption - optional caption for the statistics table
    this.stateDisplay = function(caption)
    {
        var html = '';
        if(this.stats)
        {
            html += '<table id="state-display">';
            if(typeof(caption) === 'string')
            {
                html += '<caption>PARSER STATE</caption>';
            }
            html += '<tr><th>Parser State:</th><td>'+stateToString(this.state[OP_STATE])+'</td></tr>';
            html += '<tr><th>Characters Input:</th><td>'+this.charEOS+'</td></tr>';
            html += '<tr><th>Characters Matched:</th><td>'+this.state[OP_MATCHED]+'</td></tr>';
            html += '</table>';
        }
        return html;
    };
    
    /*****************************************************************************/
    // evaluate any rule name
    // can be called from syntax call back functions for handwritten parsing
    // ruleIndex - index of the rule to execute (see the opcodes)
    // charIndex - what phrase to parser, offset into the input string
    // state - array to return the final state (OP_STATE) and number of matched characters (OP_MATCH)
    this.evaluateRule = function(ruleIndex, charIndex, state)
    {
        var length, valid = (ruleIndex < this.rules.length) && (charIndex < this.chars.length);
        if(valid)
        {
            // create a dummy RNM operator
            length = this.opcodes.length;
            this.opcodes[length] = [];
            this.opcodes[length].opNext = length + 1;
            this.opcodes[length].type = RNM;
            this.opcodes[length].ruleIndex = ruleIndex;
            this.opExecute(length, charIndex, state);
            this.opcodes.length = length;
        }
    };
    
    /*****************************************************************************/
    // parses the input string
    // start - the index of the start rule
    // input - array of character codes of the input string
    // data - options user-defined data, is passed to the syntax call back functions
    this.syntaxAnalysis = function(start, input, data)
    {
        var ret = false, startOpIndex;
        while(true)
        {
            // validate input
            if(typeof(start) !== 'number'){break;}
            if(!isArray(input)){break;}
            if(start >= this.ruleCount){break;}
            
            // initialize
            this.chars = input;
            this.charEOS = input.length; 
            this.startRule = start;
            this.syntaxData = data;
            if(this.ast){this.ast.ast.length = 0;}
            
            // create a dummy opcode for the start rule
            startOpIndex = this.opcodes.length;
            this.opcodes.push({'type':RNM, 'opCount':1, 'ruleIndex':this.startRule});
            
            // execute the start rule
            this.opExecute(startOpIndex, 0, this.state);
            this.opcodes.pop();
            
            // test the result
            if(this.state[OP_STATE] === APG_ACTIVE){break;}
            if(this.state[OP_MATCHED] !== this.charEOS){this.state[OP_STATE] = APG_NOMATCH;}
            if(this.state[OP_STATE] !== APG_NOMATCH){ret = true;}
            
            // success
            break;
        }
        return ret;
    };
    
    /*****************************************************************************/
    // translate the rule named phrases into APG JavaScript opcodes
    // data - optional user-defined data, passed to the semantic call back functions
    this.semanticAnalysis = function(data)
    {
        var i, forRet, ast, ret, downIndex, ruleIndex, upIndex, name, index, count;
        ret = false;
        //var lineNo = 0;
        if(this.ast !== null)
        {
            ast = this.ast.ast;
            forRet = true;
            for(i=0; i < ast.length; i+=1)
            {
                if(ast[i].down)
                {
                    downIndex = i;
                    ruleIndex = ast[downIndex].ruleIndex;
                    if(this.semantic[ruleIndex])
                    {
                        upIndex = ast[downIndex].upIndex;
                        name = rules[ruleIndex].rule;
                        index = ast[upIndex].phraseIndex;
                        count = ast[upIndex].phraseLength;
                        ret = this.semantic[ruleIndex](APG_PRE, this.chars, index, count, data);
                        if(ret === APG_SEM_SKIP){i = upIndex;}
                        else if(ret !== APG_SEM_OK){forRet = false; break;}
                    }
                }
                else
                {
                    upIndex = i;
                    downIndex = ast[upIndex].downIndex;
                    ruleIndex = ast[downIndex].ruleIndex;
                    if(this.semantic[ruleIndex])
                    {
                        upIndex = ast[downIndex].upIndex;
                        name = rules[ruleIndex].rule;
                        index = ast[upIndex].phraseIndex;
                        count = ast[upIndex].phraseLength;
                        ret = this.semantic[ruleIndex](APG_POST, this.chars, index, count, data);
                        if(ret !== APG_SEM_OK){forRet = false; break;}
                    }
                }
            }
            ret = forRet;
        }
        return ret;
    };
    
    /*****************************************************************************/
    // the ALTERNATION operator
    // opIndex - index of the ALT operator opcode
    // charIndex - input string index of the phrase to be parsed
    // state - array for return of the final state and matched phrase length
    this.opALT = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var childOpIndex, op = this.opcodes[opIndex];
        if(op.type !== ALT){throw ['opALT: type ' + opcodeToString(op.type) +' not ALT'];}
        childOpIndex = opIndex + 1;
        for(; childOpIndex < op.opNext; childOpIndex = this.opcodes[childOpIndex].opNext)
        {
            this.opExecute(childOpIndex, charIndex, state);
            if(state[OP_STATE] !== APG_NOMATCH){break;}
            else if(this.stats !== null){this.stats.backtrack(op);}
        }
    };
    /*****************************************************************************/
    // the CONCATENATION operator
    this.opCAT = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var op, astLength, catState, catCharIndex, catMatched, childOpIndex;
        op = this.opcodes[opIndex];
        if(op.type !== CAT){throw ['opCAT: type ' + opcodeToString(op.type) +' not CAT'];}
        astLength = (this.ast) ? this.ast.currentLength() : 0;
        catState = [APG_NOMATCH, 0];
        catCharIndex = charIndex;
        catMatched = 0;
        childOpIndex = opIndex + 1;
        for(; childOpIndex < op.opNext; childOpIndex = this.opcodes[childOpIndex].opNext)
        {
            this.opExecute(childOpIndex, catCharIndex, catState);
            catCharIndex += catState[OP_MATCHED];
            catMatched += catState[OP_MATCHED];
            if(catState[OP_STATE] === APG_NOMATCH){break;}
        }
        state[OP_MATCHED] = catMatched;
        if(childOpIndex === op.opNext)
        {
            // success
            state[OP_STATE] = catMatched === 0 ? APG_EMPTY : APG_MATCH;
        }
        if(this.ast && state[OP_STATE] === APG_NOMATCH){this.ast.truncate(astLength);}
    };
    /*****************************************************************************/
    // the REPETITION operator
    this.opREP = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var nextState, nextCharIndex, matchedCount, op, childOpIndex, astLength;
        nextState = [APG_ACTIVE, 0];
        nextCharIndex = charIndex;
        matchedCount = 0;
        op = this.opcodes[opIndex];
        childOpIndex = opIndex + 1;
        if(op.type !== REP){throw ['opREP: type ' + opcodeToString(op.type) +' not REP'];}
        astLength = (this.ast) ? this.ast.currentLength() : 0;
        while(true)
        {
            // always end on End of String
            if(nextCharIndex >= this.charEOS){break;}

            // execute the child opcode
            this.opExecute(childOpIndex, nextCharIndex, nextState);
            
            // end on nomatch
            if(nextState[OP_STATE] === APG_NOMATCH)
            {
                if(this.stats !== null){this.stats.backtrack(op);}
                break;
            }
            
            // always end on empty
            if(nextState[OP_STATE] === APG_EMPTY){break;}
            
            // increment for next repetition
            matchedCount+=1;
            state[OP_MATCHED] += nextState[OP_MATCHED];
            nextCharIndex += nextState[OP_MATCHED];
            
            // end on maxed out matches
            if(matchedCount === op.max){break;} 
        }
        
        // evaluate the match count
        if(state[OP_MATCHED] >= op.min)
        {
            // got a mathc
            state[OP_STATE] = (state[OP_MATCHED] === 0) ? APG_EMPTY : APG_MATCH;
        }
        else
        {
            // failed to meet minimum match requirement
            state[OP_STATE] = APG_NOMATCH;
            if(this.stats !== null){this.stats.backtrack(op);}
        }
        if(this.ast && state[OP_STATE] === APG_NOMATCH){this.ast.truncate(astLength);}
    };
    /*****************************************************************************/
    // the RULE NAME operator
    this.opRNM = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_ACTIVE;
        state[OP_MATCHED] = 0;
        var downIndex, astLength, op, rule, ruleOpIndex, ruleDefined;
        downIndex = 0;
        astLength = 0;
        op = this.opcodes[opIndex];
        if(op.type !== RNM){throw ['opRNM: type ' + opcodeToString(op.type) +' not RNM'];}

        rule = this.rules[op.ruleIndex];
        ruleOpIndex = rule.opcodeIndex;
        
        // AST
        ruleDefined = this.ast && this.ast.ruleDefined(op.ruleIndex); 
        if(ruleDefined)
        {
            astLength = this.ast.currentLength();
            downIndex = this.ast.down(op.ruleIndex);
        }
        
        // syntax call back
        if(this.syntax && this.syntax[op.ruleIndex])
        {
            this.syntax[op.ruleIndex](state, this.chars, charIndex, this.syntaxData);
        }
        
        if(state[OP_STATE] === APG_ACTIVE)
        {
            // execute the rule
            this.opExecute(ruleOpIndex, charIndex, state);
        }
        
        // syntax call back
        if(this.syntax && this.syntax[op.ruleIndex])
        {
            this.syntax[op.ruleIndex](state, this.chars, charIndex, this.syntaxData);
        }

        // AST
        if(ruleDefined)
        {
            if(state[OP_STATE] === APG_NOMATCH){this.ast.truncate(astLength);}
            else{this.ast.up(downIndex, charIndex, state[OP_MATCHED]);}
        }
    };
    /*****************************************************************************/
    // the SYNTACTIC PREDICATE operator
    this.opPRD = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var op, prdState = [APG_ACTIVE, 0];
        op = this.opcodes[opIndex];
        if(op.type !== PRD){throw ['opPRD: type ' + opcodeToString(op.type) +' not PRD'];}

        // execute the child opcode
        if(this.ast){this.ast.inPRD+=1;}
        this.opExecute((opIndex + 1), charIndex, prdState);
        if(this.ast){this.ast.inPRD-=1;}
        
        // evaluate the result
        switch(prdState[OP_STATE])
        {
            case APG_EMPTY:
            case APG_MATCH:
            if(op.and)
            {
                // AND predicate
                state[OP_STATE] = APG_EMPTY;
            }
            else
            {
                // NOT predicate
                state[OP_STATE] = APG_NOMATCH;
                state[OP_MATCHED] = prdState[OP_MATCHED];
            }
            break;
                    
            case APG_NOMATCH:
            if(op.and)
            {
                // AND predicate
                state[OP_STATE] = APG_NOMATCH;
                state[OP_MATCHED] = prdState[OP_MATCHED];
            }
            else
            {
                // NOT predicate
                state[OP_STATE] = APG_EMPTY;
            }
            break;
            
            default:
            throw ['opPRD: invalid state ' + prdState[OP_STATE]];
        }
        // PRD always backtracks
        if(this.stats !== null){this.stats.backtrack(op);}
    };
    /*****************************************************************************/
    // the TERMINAL RANGE operator
    this.opTRG = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var op = this.opcodes[opIndex];
        if(op.type !== TRG){throw ['opTRG: type ' + opcodeToString(op.type) +' not TRG'];}
        if(charIndex < this.charEOS)
        {
            if(op.min <= this.chars[charIndex] && this.chars[charIndex] <= op.max)
            {
                state[OP_STATE] = APG_MATCH;
                state[OP_MATCHED] = 1;
            }
        }
    };
    /*****************************************************************************/
    // the TERMINAL BINARY STRING operator
    this.opTBS= function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var i, op, len, stringIndex;
        op = this.opcodes[opIndex];
        if(op.type !== TBS){throw ['opTBS: type ' + opcodeToString(op.type) +' not TBS'];}
        len = op.length;
        stringIndex = op.stringIndex;
        if(len === 0){throw ['opTBS: string length cannot be 0'];}
        if((charIndex + len)  <= this.charEOS)
        {
            for(i=0; i < len; i+=1)
            {
                if(this.chars[charIndex + i] !== this.strings[stringIndex + i]){break;}
            }
            state[OP_MATCHED] = i;
            if(i === len){state[OP_STATE] = APG_MATCH;}
        }
    };
    /*****************************************************************************/
    // the TERMINAL LITERAL STRING operator
    this.opTLS = function(opIndex, charIndex, state)
    {
        state[OP_STATE] = APG_NOMATCH;
        state[OP_MATCHED] = 0;
        var i, code, strChar, len, stringIndex, op;
        op = this.opcodes[opIndex];
        if(op.type !== TLS){throw ['opTLS: type ' + opcodeToString(op.type) +' not TLS'];}
        len = op.length;
        stringIndex = op.stringIndex;
        if(len === 0)
        {
            state[OP_STATE] = APG_EMPTY;
        }
        else if((charIndex + len)  <= this.charEOS)
        {
            for(i=0; i < len; i+=1)
            {
                strChar = this.strings[stringIndex + i];
                if(strChar >= 65 && strChar <= 90){strChar += 32;}
                code = this.chars[charIndex + i];
                if(code >= 65 && code <= 90){code += 32;}
                if(code !== strChar){break;}
            }
            state[OP_MATCHED] = i;
            if(i === len){state[OP_STATE] = APG_MATCH;}
        }
    };
    /*****************************************************************************/
    // excecute any APG operator 
    this.opExecute = function(opIndex, charIndex, state)
    {
        var op, ret = true;
        op = this.opcodes[opIndex];
        
        // tree depth
        this.treeDepth+=1;

        // trace down
        state[OP_STATE] = APG_ACTIVE;
        state[OP_MATCHED] = 0;
        if(this.trace !== null){this.trace.traceDown(op, state[OP_STATE], charIndex, state[OP_MATCHED]);}
        
        switch(op.type)
        {
            case ALT:
            this.opALT(opIndex, charIndex, state);
            break;

            case CAT:
            this.opCAT(opIndex, charIndex, state);
            break;

            case RNM:
            this.opRNM(opIndex, charIndex, state);
            break;

            case REP:
            this.opREP(opIndex, charIndex, state);
            break;

            case PRD:
            this.opPRD(opIndex, charIndex, state);
            break;

            case TRG:
            this.opTRG(opIndex, charIndex, state);
            break;

            case TBS:
            this.opTBS(opIndex, charIndex, state);
            break;

            case TLS:
            this.opTLS(opIndex, charIndex, state);
            break;

            default:
            ret = false;
            break;
        }
        if((state[OP_STATE] !== APG_MATCH) && (state[OP_STATE] !== APG_NOMATCH) && (state[OP_STATE] !== APG_EMPTY))
            {throw ['opExecute: invalid state returned'];}
        
        // statistics up
        if(this.stats !== null){this.stats.collect(op, state);}
        
        // trace up
        if(this.trace !== null){this.trace.traceUp(op, state[OP_STATE], charIndex, state[OP_MATCHED]);}
        
        // tree depth
        this.treeDepth-=1;
        
        return ret;
    };
}
