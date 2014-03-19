var charfactor = ["#","%","&","!","'",",","-",":",";","<","=",">","@","_","`","~","."];
var charclass = ["{","}","(",")",".","$","+","*","?","|","#","%","&","!","'",",",":",";","<","=",">","@","_","`","~" ];
var charspecialfactor =  [ "[","\\","]","^","/","{","}","(",")","?","+","*","|",".","^","$"," "];
var charspecial =  ["-","[","\\","]","^"," "];

var test = ["a", "b", "c", "f", "g", "h", "s", "x", "y", "z"];
// opt(test);
var s = 'charfactor = ' + opt(charfactor) + '\r\n';
s += 'charclass = ' + opt(charclass) + '\r\n';
s += 'charspecialfactor = ' + opt(charspecialfactor) + '\r\n';
s += 'charspecial = ' + opt(charspecial) + '\r\n';
if (typeof alert === "undefined") {
    alert = function(s) {
        WScript.Echo(s);
    };
}
alert(s);

/**
 * 
 * @param {Array} arr
 * @returns {String}
 */
function opt(arr) {
    arr = arr.sort();
    var prevChar = arr[0].charCodeAt(0);
    var ret = "%d" + prevChar;
    for (var i = 1; i < arr.length; i++) {
        var charcode = arr[i].charCodeAt(0);
        if (prevChar != (charcode - 1)) {
            ret += "-" + prevChar + " / %d" + charcode;
            // ret += "-" + String.fromCharCode(prevChar) + " " + String.fromCharCode(charcode);
        }
        
        prevChar = charcode;
    }
    ret += "-" + prevChar;
    return ret;
}
