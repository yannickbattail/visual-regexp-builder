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
isArray
*/
"use strict";
var ASCII_CR = 13;
var ASCII_LF = 10;
var ASCII_TAB = 9;
var ASCII_SPACE = 32;
var ASCII_MIN = 32;
var ASCII_MAX = 126;
var ASCII_LANGLE = 60;
var ASCII_RANGLE = 62;

/*****************************************************************************/
// convert a decimal integer to a hexidecimal string, eg. 16 -> 'FF'
// free download - source forgotten, apologies to the author
function dec2hex(d) {return d.toString(16).toUpperCase();}
/*****************************************************************************/
// convert a hexidecimal string to an integer, eg. 'FF' -> 16
// free download - source forgotten, apologies to the author
function hex2dec(h) {return parseInt(h,16);}
/*****************************************************************************/
// determine if an object is an array
// free download - source forgotten, apologies to the author
function isArray(a)
{
    return (Object.prototype.toString.apply(a) === '[object Array]');
}

/*****************************************************************************/
// a simple message log
// generates and displays an array of strings
function MsgLog()
{
    this.log = [];

    // returns the number of messages logged
    this.count = function(){return this.log.length;};

    // clears all logged messages
    this.clear = function(){this.log.length = 0;};

    // specialty function for logging error locations in grammar source
    // line - grammar line number
    // offset - location of the error, character offset into the grammar file
    // len - length of the (partially) matched phrase
    this.logLine = function(line, offset, len, msg)
    {
        if(typeof(msg) !== 'string'){msg = 'msg type: '+typeof(msg);}
        if(typeof(line) !== 'number'){line = false;}
        if(typeof(offset) !== 'number'){offset = false;}
        if(typeof(len) !== 'number'){len = false;}
        this.log.push([line, offset, len, ': '+msg]);
    };

    // add a message to the log
    this.logMsg = function(msg)
    {
        if(typeof(msg) !== 'string'){msg = 'msg type: '+typeof(msg);}
        this.log.push([false, false, false, msg]);
    };

    // HTML display the array of logged messages
    this.logDisplay = function(title)
    {
        var html = '';
        var i;
        if(typeof(title) === 'string'){html += title + '<br />';}
        if(this.log.length === 0)
        {
            html += '&lt;no messages&gt;<br />';
        }
        else
        {
            for(i = 0; i < this.log.length; i+=1)
            {
                var log = this.log[i];
                html += (i+1)+': ';
                if(!(log[0] === false)){html += ' line: '+log[0];}
                if(!(log[1] === false)){html += ' offset: '+log[1];}
                if(!(log[2] === false)){html += ' char: '+log[2];}

                html += log[3];
                html += '<br />';
            }
        }
        return html;
    };

    // table format HTML display the array of logged messages
    this.logDisplayTable = function(title)
    {
        var line;
        var offset;
        var len;
        var html = '<table class="log-table">';
        var i;
        if(typeof(title) === 'string'){html += '<caption class="log-caption">'+title + '</caption>';}
        if(this.log.length === 0)
        {
            html += '<tr><td>0</td><td>&lt;no messages&gt;</td></tr>';
        }
        else
        {
            for(i = 0; i < this.log.length; i+=1)
            {
                var log = this.log[i];
                if(log[0] === false){line = '-';}
                else{line = log[0];}
                if(log[1] === false){offset = '-';}
                else{offset = log[1];}
                if(log[2] === false){len = '-';}
                else{len = log[2];}
                if(i%2 === 0)
                {
                    html += '<tr class="even"><td>'+line+'</td><td>'+offset+'</td><td>'+len+'</td>';
                    html += '<td class="log-msg">'+log[3]+'</td></tr>';
                }
                else
                {
                    html += '<tr class="odd"><td>'+line+'</td><td>'+offset+'</td><td>'+len+'</td>';
                    html += '<td class="log-msg">'+log[3]+'</td></tr>';
                }
            }
        }
        html += '</table>';
        return html;
    };
}

/*****************************************************************************/
// assertion
// condition - if not true, a string execption is thrown
// msg - message string to be thrown as exception
function apgAssert(condition, msg)
{
    if(!condition)
    {
        var message = "apgAssert: failed: ";
        if(typeof(msg) === 'string'){message += msg;}
        throw [message];
    }
}

/*****************************************************************************/
// translate a substring (phrase) from ASCII character codes to a string
// chars - the full array of character codes
// phraseIndex - offset into chars to the first character of the phrase
// phraseLength - number of characters in the phrase
function charsToString(chars, phraseIndex, phraseLength)
{
    var string = '';
    if(isArray(chars))
    {
        var charIndex = (typeof(phraseIndex) === 'number' ) ? phraseIndex : 0;
        var charLength = (typeof(phraseLength) === 'number' ) ? phraseLength : chars.length;
        if(charLength > chars.length){charLength = chars.length;}
        var charEnd = charIndex + charLength;
        for(var i = charIndex; i < charEnd; i+=1)
        {
            if(chars[i]){string += String.fromCharCode(chars[i]);}
        }
    }
    return string;
}

/*****************************************************************************/
// translate a string to a normalized array of ASCII character codes
//   TAB  -> SPACE
//   CRLF -> LF
//   CR   -> LF
//   EOF  -> LF EOF (if missing)
// log - an instance of MsgLog();
// string - the string to translate
// chars = [] - the array to receive the ASCII character codes
function grammarToChars(log, string, chars)
{
    var ret = true;
    var lineNo = 0;
    var lineOffset = 0;
    var lineChar = 0;
    if(typeof(string) === 'string' && isArray(chars))
    {
        var charIndex = 0;
        var codeIndex = 0;
        chars.length = 0;
        while(charIndex < string.length)
        {
            var code = string.charCodeAt(charIndex);
            // convert TAB to SPACE
            if(code === ASCII_TAB){code = ASCII_SPACE;}
            else if(code === ASCII_CR)
            {
                // convert CRLF or CR to LF
                code = ASCII_LF;
                if(string.charCodeAt(charIndex+1) === ASCII_LF){charIndex+=1;}
            }
            else if(code !== ASCII_LF && (code < ASCII_MIN || code > ASCII_MAX) )
            {
                log.logLine(lineNo, lineOffset, lineChar, 'stringToChar: non-ASCII character found: '+code);
                ret = false;
            }
            chars[codeIndex] = code;
            charIndex+=1;
            codeIndex+=1;
            lineOffset+=1;
            lineChar+=1;
            if(code === ASCII_LF)
            {
                lineNo+=1;
                lineChar = 0;
            }
        }
        if(chars.length > 0 && chars[chars.length - 1] !== ASCII_LF)
        {
            // add missing line end
            //chars[chars.length] = ASCII_LF;
        }
        if(chars.length === 0)
        {
            log.logLine(0, 0, 0, 'input string may not be empty');
            ret = false;
        }
    }
    return ret;
}

/*****************************************************************************/
// converts ASCII-formatted binary characters to numbers, e.g. 0xff to 15
// log - an instance of a message log
// string - the ASCII formatted binary characters
// chars - an empty arrar for the translated numbers
function binaryStringToChars(log, string, chars)
{
    var ret = false, test;
    var stringIndex = 0;
    var charIndex = 0;
    var code, text, strlen;
    while(true)
    {
        if(typeof(string) !== 'string'){log.logMsg('apgUtilities: binaryStringToChars: string not type \'string\'');}
        if(!isArray(chars)){log.logMsg('apgUtilities: binaryStringToChars: chars not type \'array\'');}
        chars.length = 0;
        strlen = string.length;
        ret = true;
        while(stringIndex < strlen)
        {
            code = string.charCodeAt(stringIndex);
            if(code === 9 || code === 10 || code === 13 || code === 32)
            {
                // skip white space
                stringIndex+=1;
            }
            else
            {
                // get the next byte
                test = parseInt(string.substring(stringIndex));
                if(isNaN(test))
                {
                    log.logMsg('apgUtilities: binaryStringToChars: non-integer at: '+stringIndex);
                    ret = false;
                    break;
                }
                else if(test > 255)
                {
                    log.logMsg('apgUtilities: binaryStringToChars: integer > 255 at: '+stringIndex);
                    ret = false;
                    break;
                }
                else
                {
                    // get the byte code
                    chars[charIndex] = test;
                    charIndex+=1;

                    // skip over the parsed int
                    for(; stringIndex < strlen; stringIndex+=1)
                    {
                        code = string.charCodeAt(stringIndex);
                        if(!(code === 9 || code === 10 || code === 13 || code === 32)){continue;}
                        break;
                    }
                }
            }
        }

        break;
    }
    return ret;
}

/*****************************************************************************/
// converts a string to an array of character codes
// log - an instance of a message log object for error reporting
// string - the string to convert
// chars - an empty array to recieve the converted characters
function stringToChars(log, string, chars)
{
    var ret = false;
    if(typeof(string) === 'string' && isArray(chars))
    {
        var charIndex = 0;
        while(charIndex < string.length)
        {
            chars[charIndex] = string.charCodeAt(charIndex);
            charIndex+=1;
        }
        if(charIndex > 0){ret = true;}
    }
    return ret;
}

/*****************************************************************************/
// add line & character numbers before each line
// display line endings in colored text
function formatString(string)
{
    var ret = '';
    var line = '';
    var lineNo = 1;
    var lineLen = 0;
    var lineBeg = 0;
    var linePrint = false;
    var code;
    var i = 0;
    for(;i < string.length; i+=1)
    {
        if(linePrint)
        {
            // add the line prefix
            ret += lineNo+':['+lineBeg+']['+(lineLen)+'] '+line+'<br />';
            line = '';
            lineLen = 0;
            lineBeg = i;
            lineNo+=1;
            linePrint = false;
        }
        code = string.charCodeAt(i);
        if(code === ASCII_CR)
        {
            line += '<span class="non-ascii">CR</span>';
            if(string.charCodeAt(i+1) !== ASCII_LF){linePrint = true;}
        }
        else if(code === ASCII_LF)
        {
            line += '<span class="non-ascii">LF</span>';
            linePrint = true;
        }
        else if(code < ASCII_MIN || code > ASCII_MAX){line += '<span class="non-ascii">x'+dec2hex(code)+'</span>';}
        else{line += string.charAt(i);}
        lineLen+=1;
    }
    if(lineLen > 0)
    {
        ret += lineNo+':['+lineBeg+']['+(lineLen)+'] '+line+'<br />';
    }
    return ret;
}

/*****************************************************************************/
// formats an array of character codes for HTML display of the string
// chars - the array of character codes
// returns HTML
function formatChars(chars)
{
    var ret = '';
    var line = '';
    var lineNo = 1;
    var lineLen = 0;
    var lineBeg = 0;
    var linePrint = false;
    var code;
    var i = 0;
    for(;i < chars.length; i+=1)
    {
        if(linePrint)
        {
            // add the line prefix
            ret += lineNo+':['+lineBeg+']['+(lineLen)+'] '+line+'<br />';
            line = '';
            lineLen = 0;
            lineBeg = i;
            lineNo+=1;
            linePrint = false;
        }
        code = chars[i];
        if(code === ASCII_CR)
        {
            line += '<span class="non-ascii">CR</span>';
            if(chars[i+1] !== ASCII_LF){linePrint = true;}
        }
        else if(code === ASCII_LF)
        {
            line += '<span class="non-ascii">LF</span>';
            linePrint = true;
        }
        else if(code < ASCII_MIN || code > ASCII_MAX){line += '<span class="non-ascii">x'+dec2hex(code)+'</span>';}
        else{line += String.fromCharCode(chars[i]);}
        lineLen+=1;
    }
    if(lineLen > 0)
    {
        ret += lineNo+':['+lineBeg+']['+(lineLen)+'] '+line+'<br />';
    }
    return ret;
}

/*****************************************************************************/
// returns true if the first 1000 array values are ASCII character codes
// chars - an array of integers
this.charsAreAscii = function(chars)
{
    var count = 0;
    var max = 1000;
    var len = (chars.length > max) ? max : chars.length;
    for(var i = 0; i < len; i+=1)
    {
        if(chars[i] === 9){count+=1;}
        else if(chars[i] === 10){count+=1;}
        else if(chars[i] === 13){count+=1;}
        else if(chars[i] >= 32 && chars[i] <= 127){count+=1;}
    }
    return (((count * 100)/len) >= 25);
};

/*****************************************************************************/
// returns true if the array of character codes represents an ASCII-formatted string of binary values
// chars - the array of character codes
function inputIsBinary(chars)
{
    var ret = true;
    var isWhite, value, string;
    var count = 0;
    var i = 0;
    var len = chars.length;
    var max = 100;
    while(i < len && count < max)
    {
        // skip white space
        isWhite = true;
        while(i < len && isWhite)
        {
            if(chars[i] === 9 || chars[i] === 10 || chars[i] === 13 || chars[i] === 32){isWhite = true;i+=1;}
            else{isWhite = false;}
        }
        if(i === len){break;}

        // get next binary value
        string = '';
        isWhite = false;
        while(i < len && !isWhite)
        {
            if(chars[i] === 9 || chars[i] === 10 || chars[i] === 13 || chars[i] === 32){isWhite = true;}
            else{string += String.fromCharCode(chars[i]);i+=1;}
        }

        value = parseInt(string, 10);
        if(isNaN(value)){ret = false;break;}
        else{count+=1;}
    }
    if(count === 0){ret = false;}
    return ret;
}

/*****************************************************************************/
// formats an array of character codes to an HTML table of hexidecimal format
// chars - the array of character codes
function tableCharsHex(chars)
{
        var html = '';
        var htmlHex = '';
        var htmlAscii = '';
        var htmlCount = '';
        var hexChar;
        var spanEven = '<span class="ast-highlight-even">';
        var spanOdd = '<span class="ast-highlight-odd">';
        var emptyHex = '<span class="ast-empty">00</span>';
        var emptyAscii = '<span class="ast-empty">&epsilon;</span>';
        var count = 0;
        var matchLen = 24;
        htmlCount += '0:<br />';
        for(var i = 0; i < chars.length; i+=1)
        {
            if(chars[i] < 32 || chars[i] > 126){htmlAscii += '&#46;';}
            else if(chars[i] === 32){htmlAscii += '&nbsp;';}
            else{htmlAscii += '&#'+chars[i];}
            hexChar = chars[i].toString(16).toUpperCase();
            if(hexChar.length === 1){htmlHex += '0' + hexChar;}
            else{htmlHex += hexChar;}
            count+=1;
            if(count === matchLen)
            {
                htmlHex += '<br />';
                htmlAscii += '<br />';
                htmlCount += i+':<br />';
                count = 0;
            }
            else
            {
                if(count%4 === 0){htmlHex += '&nbsp;';}
            }

        }
        html += '<pre><table class="phrase-table"><tr>';
        html += '<td class="right">'+htmlCount+'</td>';
        html += '<td>'+htmlHex+'</td>';
        html += '<td>'+htmlAscii+'</td>';
        html += '</tr></table></pre>';
        return html;
}

/*****************************************************************************/
// formats an array of character codes into an HTML table of ASCII lines
// chars - the array of character codes
function tableChars(chars)
{
    var html = '';
    var maxLineLen = 0;
    var line = '';
    var lineNo = 1;
    var lineLen = 0;
    var lineBeg = 0;
    var linePrint = false;
    var lineBreak = 128;
    var linePrintLen = 0;
    var lineContinue = false;
    var code;
    var i = 0;
    html += '<tr>';
    html += '<td>(a)</td>';
    html += '<td>(b)</td>';
    html += '<td>(c)</td>';
    html += '<td class="log-msg">&nbsp;</td>';
    html += '</tr>';
    for(;i < chars.length; i+=1)
    {
        if(linePrint)
        {
            if(lineNo%2 === 0){html += '<tr class="odd">';}
            else{html += '<tr class="even">';}
            linePrintLen += lineLen;
            if(lineContinue)
            {
                html += '<td>'+lineNo+':</td>';
                html += '<td>'+lineBeg+':</td>';
                html += '<td>&ndash;&gt;:</td>';
                html += '<td class="log-msg">'+line+'</td></tr>';
            }
            else
            {
                html += '<td>'+lineNo+':</td>';
                html += '<td>'+lineBeg+':</td>';
                html += '<td>'+linePrintLen+':</td>';
                html += '<td class="log-msg">'+line+'</td></tr>';
                lineNo+=1;
                linePrintLen = 0;
            }
            line = '';
            if(maxLineLen < lineLen){maxLineLen = lineLen;}
            lineLen = 0;
            lineBeg = i;
            linePrint = false;
            lineContinue = false;
        }
        code = chars[i];
        if(code === ASCII_CR)
        {
            line += '<span class="non-ascii">CR</span>';
            lineLen+=2;
            if(chars[i+1] !== ASCII_LF){linePrint = true;}
        }
        else if(code === ASCII_LF)
        {
            line += '<span class="non-ascii">LF</span>';
            lineLen+=2;
            linePrint = true;
        }
        else if(code < ASCII_MIN || code > ASCII_MAX){line += '<span class="non-ascii">x'+dec2hex(code)+'</span>';lineLen+=3;}
        else if(chars[i] === 32){line += '&nbsp;';lineLen+=1;}
        else{line += '&#'+chars[i];lineLen+=1;}
        if(lineLen >= lineBreak)
        {
            linePrint = true;
            lineContinue = true;
        }
    }
    if(lineLen > 0)
    {
        linePrintLen += lineLen;
        if(lineNo%2 === 0){html += '<tr class="odd">';}
        else{html += '<tr class="even">';}
        html += '<td>'+lineNo+':</td>';
        html += '<td>'+lineBeg+':</td>';
        html += '<td>'+linePrintLen+':</td>';
        html += '<td class="log-msg">'+line+'</td></tr>';
    }
    html += '<tr>';
    html += '<td>(a)</td>';
    html += '<td>(b)</td>';
    html += '<td>(c)</td>';
    html += '<td class="log-msg">&nbsp;</td>';
    html += '</tr>';
    html = '<table width="'+(maxLineLen*10)+'" class="log-table">' + html + '</table>';
    html += '<p class="log-msg">';
    html += '(a) - line number<br />';
    html += '(b) - first character of line (or line fragment<sup>*</sup>)<br />';
    html += '(c) - line length (or "&ndash;&gt;" for line fragment<sup>*</sup>)<br /><br />';
    html += '<sup>*</sup>Lines longer than '+lineBreak+' are displayed as multiple printed fragments<br />';
    html += '</p>';
    return html;
}

/*****************************************************************************/
// convert a true/false value  to a string
function trueToString(value)
{
    if(value){return 'TRUE';}
    else{return 'FALSE';}
}

/*****************************************************************************/
// convert an APG state to a string
function stateToString(state)
{
    var ret = 'unknown';
    switch(state)
    {
        case APG_ACTIVE:
        ret = 'ACTIVE';
        break;

        case APG_EMPTY:
        ret = 'EMPTY';
        break;

        case APG_NOMATCH:
        ret = 'NOMATCH';
        break;

        case APG_MATCH:
        ret = 'MATCH';
        break;

        case APG_PRE:
        ret = 'SEMANTIC PRE-BRANCH';
        break;

        case APG_POST:
        ret = 'SEMANTIC POST-BRANCH';
        break;
    }
    return ret;
}

/*****************************************************************************/
// convert APG opcode type to a string
function opcodeToString(type)
{
    var ret = 'unknown';
    switch(type)
    {
        case ALT:
        ret = 'ALT';
        break;

        case CAT:
        ret = 'CAT';
        break;

        case RNM:
        ret = 'RNM';
        break;

        case PRD:
        ret = 'PRD';
        break;

        case REP:
        ret = 'REP';
        break;

        case TRG:
        ret = 'TRG';
        break;

        case TBS:
        ret = 'TBS';
        break;

        case TLS:
        ret = 'TLS';
        break;
    }
    return ret;
}

/*****************************************************************************/
// universal evaluation of a thrown object
function objEval(obj)
{
    var ret = 'objEval: ';
    for(var x in obj)
    {
        ret += x + ": " + obj[x];
        ret += '<br />\n';
    }
    return ret;
}

/*****************************************************************************/
// selects all text in an HTML element with id="testarea"
function SelecText(testarea)
{
    window.document.getElementById("testarea").select();
}

/*****************************************************************************/
/**
* source: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
* Function : dump()
* Arguments: The data - array,hash(associative array),object
*    The level - OPTIONAL
* Returns  : The textual representation of the array.
* This function was inspired by the print_r function of PHP.
* This will accept some data as the argument and return a
* text that will be a more readable version of the
* array/hash/object that is given.
*/
function dump(arr,level) {
var dumped_text = "";
if(!level) {level = 0;}

//The padding given at the beginning of the line.
var level_padding = "";
for(var j=0;j<level;j+=1) {level_padding += "  ";}

if(typeof(arr) === 'object') { //Array/Hashes/Objects
 for(var item in arr) {
  var value = arr[item];

  if(typeof(value) === 'object') { //If it is an array,
   dumped_text += level_padding + "'" + item + "' ...\n";
   dumped_text += dump(value,level+1);
  } else {
   dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
  }
 }
} else { //Stings/Chars/Numbers etc.
 dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
}
return dumped_text;
}

/*****************************************************************************/
// from: http://elmicoxcodes.blogspot.com/2007/06/htmlentities-and-arraysearch-in.html
function htmlentities(texto){
    //by Micox - elmicoxcodes.blogspot.com - www.ievolutionweb.com
    var i,carac,letra,novo='';
    for(i=0;i<texto.length;i++){
        carac = texto[i].charCodeAt(0);
        if( (carac > 47 && carac < 58) || (carac > 62 && carac < 127) ){
            //se for numero ou letra normal
            novo += texto[i];
        }else{
            novo += "&#" + carac + ";";
        }
    }
    return novo;
}

/*****************************************************************************/
// clumsy replacement of special characters with HTML entities
// chars - array of character codes
function htmlspecialchars(chars)
{
    var i, c, html = '';
    for(i = 0; i < chars.length; i++)
    {
        c = chars.charAt(i);
        switch(c)
        {
            case '<': html += '&lt;';break;
            case '>': html += '&gt;';break;
            case '&': html += '&amp;';break;
            case '"': html += '&quot;';break;
            case '\'': html += '&#039;';break;
            default: html += c;break;
        }
    }
    return html;
}

/*****************************************************************************/
// circular buffer
// used by Trace to keep track of where the last N records are in a circular
// buffer used to store at most N trace information records
function Circular()
{
    this.lastIndex = 0;
    this.nextIndex = 0;
    this.bufferMax = 0;
    this.itemCount = 0;
    this.bufferSize = 0;

    // initialize the circular buffer for record collection
    this.initCollection = function(size)
    {
        this.bufferSize = size;
        this.lastIndex = 0;
        this.itemCount = 0;
        this.nextIndex = 0;
        this.sequential = true;
    };

    // called once for each record collected
    this.collect = function()
    {
        if(this.lastIndex >= this.bufferSize){this.lastIndex = 0;this.sequential = false;}
        var ret = this.lastIndex;
        this.lastIndex += 1;
        if(this.lastIndex > this.itemCount){this.itemCount = this.lastIndex;}
        return ret;
    };

    // returns the bufferSize (N))
    this.size = function(){return this.bufferSize;}

    // returns the total number of records saved
    this.items = function(){return this.itemCount;}

    // returns true if the number of records <= the buffer size
    // e.g. the records read top to bottom in the buffer
    this.isSequential = function(){return this.sequential;}

    // initialize a replay of the record numbers saved in the buffer
    this.initReplay = function()
    {
        if(this.isSequential()){this.nextIndex = 0;}
        else{this.nextIndex = this.lastIndex;}
    };

    // on each call returns the buffer location of the next saved record
    // records are returned in ascending order
    // e.g. if last 100 of 1000 records were save, replay() would
    // successively return buffer positions corresponding to records 100, 101, ... 198, 199
    this.replay = function()
    {
        var ret;
        if(this.nextIndex >= this.bufferSize){this.nextIndex = 0;}
        ret = this.nextIndex;
        this.nextIndex += 1;
        return ret;
    };

    // initialize the replay for reverse order or descending
    this.initReverse = function()
    {
        if(this.isSequential()){this.nextIndex = this.itemCount - 1;}
        else{this.nextIndex = this.lastIndex - 1;}
    };

    // returns records in opposite order of replay()
    this.reverse = function()
    {
        var ret;
        if(this.nextIndex < 0){this.nextIndex = this.itemCount - 1;if(this.nextIndex < 0){return 0;}}
        ret = this.nextIndex;
        this.nextIndex -= 1;
        return ret;
    };
}
