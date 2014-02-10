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
ALT, CAT, REP, PRD, TRG, TBS, TLS, RNM,
isArray, stateToString, opcodeToString, apgAssert
*/
"use strict";
/*CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC*/
// AST CLASS
// records a subset of the RNM nodes of a parse tree
// list - a list of true/false values for each rule name in the grammar
// rules - the list of rules from the APG-generated opcodes
// ruleIds - the list of rule IDs from the APG-generated opcodes
// chars - the array of character codes for the input string
function Ast(list, rules, ruleIds, chars)
{
    this.rules = rules;
    this.chars = chars;
    this.ruleIds = ruleIds;
    this.inPRD = 0;
    this.astList = [];
    this.ast = [];
    this.rulePhrases = [];
    this.ruleCount = rules.length;

    var i;
    for(i=0; i < this.ruleCount; i+=1)
    {
        // initialize the AST rule name node list
        if(list[i] === true){this.astList[i] = [];}
        else{this.astList[i] = null;}

        // initialize the rule phrases
        this.rulePhrases[i] = [];
    }
    
    /*****************************************************************************/
    // clears the array of nodes
    this.clear = function()
    {
        this.ast.length = 0;
    };
    
    /*****************************************************************************/
    // returns true if the rule corresponding to ruleIndex is a rule retained in the AST
    this.ruleDefined = function(ruleIndex)
    {
        return (this.astList[ruleIndex] !== null);
    };
    
    // saves a node to the AST during downward traversal of the syntax tree
    // ruleIndex - index of the rule name of the RNM  node
    this.down = function(ruleIndex)
    {
        var thisIndex = this.ast.length;
        if(this.inPRD === 0)
        {
            // only record this node if not in a PRD opcode branch
            this.ast[thisIndex] = []; 
            this.ast[thisIndex].down = true;
            this.ast[thisIndex].ruleIndex = ruleIndex; 
            this.ast[thisIndex].upIndex = null; 
        } 
        return thisIndex;
    };
    
    // saves a node to the AST during upward traversal of the syntax tree
    // downIndex - AST record index for the corresponding downward index
    // phraseIndex - offset into the character code array of the input string
    //               for the beginning of the matched phrase
    // phraseLength - number of characters in the matched phrase
    /*****************************************************************************/
    this.up = function(downIndex, phraseIndex, phraseLength)
    {
        var thisIndex = this.ast.length;
        if(this.inPRD === 0)
        {
            // only record this node if not in a PRD opcode branch
            this.ast[thisIndex] = []; 
            this.ast[thisIndex].down = false;
            this.ast[thisIndex].downIndex = downIndex;
            this.ast[thisIndex].phraseIndex = phraseIndex;
            this.ast[thisIndex].phraseLength = phraseLength;
            this.ast[downIndex].upIndex = thisIndex; 
        }
        return thisIndex;
    };

    /*****************************************************************************/
    // truncate all saved AST node records above "length" records
    // used to delete AST node records saved in a branch that ultimately failed
    // and had to be backtracked over
    this.truncate = function(length)
    {
        if(this.inPRD === 0){this.ast.length = length;}
    };
    
    /*****************************************************************************/
    // returns the number of AST records currently saved
    this.currentLength = function()
    {
        return this.ast.length;
    };
    
    /*****************************************************************************/
    // specialty function to aid EventLoop() in constructing the drop down list
    // of matched phrases for interactive display
    this.countPhrases = function()
    {
        for(var i = 0; i < this.ast.length; i+=1)
        {
            if(this.ast[i].down)
            {
                // count and index the phrase
                this.rulePhrases[this.ast[i].ruleIndex].push(this.ast[i].upIndex);
            }
        }
    };

    /*****************************************************************************/
    // specialty function to aid EventLoop() in constructing the drop down list
    // of matched phrases for interactive display
    this.getDropDownOptions = function(options)
    {
        for(var i = 0; i < this.ruleCount; i+=1)
        {
            var j = this.ruleIds[i];
            options[j] = [];
            options[j].rule = this.rules[j].rule;
            options[j]['phrase-count'] = this.rulePhrases[j].length;
        }
    };
    
    /*****************************************************************************/
    // returns HTML ASCII-formatted input string with highlighted phrases for the
    // ruleIndex rule name
    this.displayPhrasesAscii = function(ruleIndex)
    {
        var html = '';
        var list = [];
        var stack = [];
        var listIndex = 0;
        var node;
        var nextNode;

        list = this.rulePhrases[ruleIndex];
        if(list[listIndex] !== undefined)
        {
            nextNode = this.ast[list[listIndex]];
        }
        else{nextNode = undefined;}
        for(var i = 0; i < this.chars.length; i+=1)
        {
            if(nextNode && nextNode.phraseIndex === i)
            {
                if(nextNode.phraseLength === 0)
                {
                    // empty phrase
                    html += '<span class="ast-empty">&epsilon;</span>';
                    while(true)
                    {
                        listIndex+=1;
                        nextNode = (list[listIndex] !== undefined) ? this.ast[list[listIndex]] : undefined;
                        if(nextNode && nextNode.phraseIndex === i)
                        {
                            // empty phrase
                            html += '<span class="ast-empty">&epsilon;</span>';
                        }
                        else{break;}
                    }
                }
                else
                {
                    // open the next highlighted phrase
                    if(stack.length%2 === 0){html += '<span class="ast-highlight-even">';}
                    else{html += '<span class="ast-highlight-odd">';}
                    stack.push(nextNode);
                    listIndex+=1;
                    nextNode = (list[listIndex] !== undefined) ? this.ast[list[listIndex]] : undefined;
                }
            }
            
            if(this.chars[i] === 10){html += '<span class="control-char">LF</span><br />';}
            else if(this.chars[i] === 13){html +='<span class="control-char">CR</span>';}
            else if(this.chars[i] === 9){html += '<span class="control-char">TAB</span>';}
            else if(this.chars[i] < 32 || this.chars[i] > 126)
                {html +='<span class="non-ascii">x'+this.chars[i].toString(16).toUpperCase()+'</span>';}
            else if(this.chars[i] === 32){html += '&nbsp;';}
            else{html += '&#'+this.chars[i];}
            
            // check for end of last opened phrase
            if(stack.length > 0)
            {
                node = stack[stack.length - 1];
                while(node && (node.phraseIndex + node.phraseLength - 1) === i)
                {
                    html += '</span>';
                    stack.pop();
                    node = stack[stack.length - 1];
                }
            }
        }
        if(stack.length > 0)
        {
            apgAssert(stack.length === 1, 'displayPhrasesAscii: stack length: '+stack.length);
            html += '</span>';
            stack.pop();
        }
        
        return html;
    };

    /*****************************************************************************/
    // returns HTML hexidecimal-formatted input string with highlighted phrases for the
    // ruleIndex rule name
    this.displayPhrasesHex = function(ruleIndex)
    {
        var html = '';
        var htmlHex = '';
        var htmlAscii = '';
        var list = [];
        var stack = [];
        var listIndex = 0;
        var node;
        var nextNode;
        var hexChar;
        var spanEven = '<span class="ast-highlight-even">';
        var spanOdd = '<span class="ast-highlight-odd">';
        var emptyHex = '<span class="ast-empty">00</span>';
        var emptyAscii = '<span class="ast-empty">&epsilon;</span>';
        
        var count = 0;
        var matchLen = 24;

        list = this.rulePhrases[ruleIndex];
        if(list[listIndex] !== undefined)
        {
            nextNode = this.ast[list[listIndex]];
        }
        else{nextNode = undefined;}
        for(var i = 0; i < this.chars.length; i+=1)
        {
            if(nextNode && nextNode.phraseIndex === i)
            {
                if(nextNode.phraseLength === 0)
                {
                    // empty phrase
                    htmlAscii += emptyAscii;
                    htmlHex += emptyHex;
                    count+=1;
                    if(count === matchLen)
                    {
                        htmlHex += '<br />';
                        htmlAscii += '<br />';
                        count = 0;
                    }
                    else
                    {
                        if(count%4 === 0){htmlHex += '&nbsp;';}
                    }
                    while(true)
                    {
                        listIndex+=1;
                        nextNode = (list[listIndex] !== undefined) ? this.ast[list[listIndex]] : undefined;
                        if(nextNode && nextNode.phraseIndex === i)
                        {
                            // empty phrase
                            htmlAscii += emptyAscii;
                            htmlHex += emptyHex;
                            count+=1;
                            if(count === matchLen)
                            {
                                htmlHex += '<br />';
                                htmlAscii += '<br />';
                                count = 0;
                            }
                            else
                            {
                                if(count%4 === 0){htmlHex += '&nbsp;';}
                            }
                        }
                        else{break;}
                    }
                }
                else
                {
                    // open the next highlighted phrase
                    if(stack.length%2 === 0){htmlAscii += spanEven; htmlHex += spanEven;}
                    else{htmlAscii += spanOdd; htmlHex += spanOdd;}
                    stack.push(nextNode);
                    listIndex+=1;
                    nextNode = (list[listIndex] !== undefined) ? this.ast[list[listIndex]] : undefined;
                }
            }
            
            if(this.chars[i] < 32 || this.chars[i] > 126){htmlAscii += '&#46;';}
            else if(this.chars[i] === 32){htmlAscii += '&nbsp;';}
            else{htmlAscii += '&#'+this.chars[i];}
            hexChar = this.chars[i].toString(16).toUpperCase();
            if(hexChar.length === 1){htmlHex += '0' + hexChar;}
            else{htmlHex += hexChar;}
            // check for end of last opened phrase
            if(stack.length > 0)
            {
                node = stack[stack.length - 1];
                if((node.phraseIndex + node.phraseLength - 1) === i)
                {
                    htmlHex += '</span>';
                    htmlAscii += '</span>';
                    stack.pop();
                }
            }
            
            count+=1;
            if(count === matchLen)
            {
                htmlHex += '<br />';
                htmlAscii += '<br />';
                count = 0;
            }
            else
            {
                if(count%4 === 0){htmlHex += '&nbsp;';}
            }
            
        }
        if(stack.length > 0)
        {
            apgAssert(stack.length === 1, 'displayPhrasesHex: stack length: '+stack.length);
            html += '</span>';
            stack.pop();
        }
        html += '<pre><table class="phrase-table"><tr><td>'+htmlHex+'</td><td>'+htmlAscii+'</td></tr></table></pre>';
        return html;
    };
    
    /*****************************************************************************/
    // helper function for dump() of the AST
    function printLine(indent, up, name, phraseIndex, phraseLength, chars)
    {
        var out = "";
        var i = 0;
        for(; i < indent; i+=1)
        {
            out += '&nbsp;';
        }
        if(up){out += '&uarr;';}
        else{out += '&darr;';}
        out += name+': ['+phraseIndex+']['+phraseLength+']';
        out += '<br />';
        return out;
    }

    /*****************************************************************************/
    // mostly for debugging
    // gives a quick HTML formatted dump of the entire AST
    this.dump = function(rules, chars)
    {
        var i, indent, downIndex, upIndex, ruleIndex, name, index, count;
        var html = '';

        html += 'AST dump:';
        html += '<br />';
        indent = 0;
        i = 0;
        for(; i < this.ast.length; i+=1)
        {
            if(this.ast[i].down)
            {
                downIndex = i;
                upIndex = this.ast[downIndex].upIndex;
                ruleIndex = this.ast[downIndex].ruleIndex;
                name = rules[ruleIndex].rule;
                index = this.ast[upIndex].phraseIndex;
                count = this.ast[upIndex].phraseLength;
                html += printLine(indent, false, name, index, count, chars);
                indent+=1;
            }
            else
            {
                indent-=1;
                upIndex = i;
                downIndex = this.ast[upIndex].downIndex;
                ruleIndex = this.ast[downIndex].ruleIndex;
                name = rules[ruleIndex].rule;
                index = this.ast[upIndex].phraseIndex;
                count = this.ast[upIndex].phraseLength;
                html += printLine(indent, true, name, index, count, chars);
            }
        }
        return html;
    };
}
