var currentId = 0;
var selectedItem = null;

/**
 * @param {String} string
 * @returns {String}
 */
function escapeCharFactor(string) {
    return String(string).replace(/[\\ \[\]()?+\-*|.\^$%]/g, '%$&');
}

/**
 * @param {String} string
 * @returns {String}
 */
function escapeCharClass(string) {
    return String(string).replace(/[\\ \[\]\^\-%]/g, '%$&');
}

/**
 * @param {Node} selectedItem
 * @returns {Number}
 */
function getItemNum(selectedItem) {
    var t = selectedItem.id.split('-');
    return Number(t[1]);
}

/**
 * @param {String} itemType
 * @returns {Node} new htmlElement of the item
 */
function createNewItem(itemType) {
    var theItem = getItemByType(itemType);
    return duplicateItem(theItem);
}

/**
 * @param {String} itemType
 * @returns {Element} htmlElement model of the item
 */
function getItemByType(itemType) {
    var tabTypes = document.querySelectorAll('#type-XXX');
    for (var i = 0; i < tabTypes.length; i++) {
        var typeNd = tabTypes[i];
        if (typeNd.value == itemType) {
            return typeNd.parentNode;
        }
    }
    return null;
}

/**
 * @param {Node} oldNode node to be duplicated
 * @returns {Node} duplicated htmlNode
 */
function duplicateItem(oldNode) {
    /**
     * @type Node
     */
    var newItem = oldNode.cloneNode(true);
    currentId++;
    newItem.innerHTML = newItem.innerHTML.replace(new RegExp('XXX', 'g'), String(currentId));
    newItem.innerHTML = newItem.innerHTML.replace('disabled="disabled"', '');
    newItem.id = newItem.id.replace('XXX', String(currentId));
    newItem.setAttribute("style", "");
    return newItem;
}

/**
 * @param {Event} event
 * @param {String} field
 */
function fold(event, field) {
    if (!event.target.checked) {
        gel(field).style.display = 'none';
    } else {
        gel(field).style.display = 'block';
    }
}

function showStructure() {
    gel('structureFieldset').style.display = 'block';
}

/**
 * @param {Event} event
 */
function showQuantifierBlock(event) {
    selectedItem = event.target.parentNode;
    var q = gel('quantifierBlock');
    q.style.display = 'block';
    q.style.left = String(event.pageX) + 'px';
    q.style.top = String(event.pageY) + 'px';
    var n = getItemNum(selectedItem);
    var min = gel('min-' + n).value;
    var max = gel('max-' + n).value;
    if ((min == 1) && (max == 1)) {
        gel('quantifierOne').checked = true;
    } else if ((min === '0') && (max === '1')) {
        gel('quantifierOptionnal').checked = true;
    } else if ((min === '0') && (max === '')) {
        gel('quantifierIndefinitelyOpt').checked = true;
    } else if ((min === '0') && (max === '-1')) {
        gel('quantifierIndefinitelyShort').checked = true;
    } else if ((min === '1') && (max === '')) {
        gel('quantifierIndefinitely').checked = true;
    }/* else if (max === '') {
        gel('quantifierAtLeast').checked = true;
        gel('quantifierAtLeastMin').value = min;
    } else if (min === '0') {
        gel('quantifierAtMost').checked = true;
        gel('quantifierAtMostMax').value = max;
    } else if (min === max) {
        gel('quantifierExact').checked = true;
        gel('quantifierExactMin').value = min;
    } else {
        gel('quantifierRepeated').checked = true;
        gel('quantifierRepeatedMin').value = min;
        gel('quantifierRepeatedMax').value = max;
    }*/
}

/**
 * @param {Event} event
 */
function closeQuantifierBlock(event) {
    var q = gel('quantifierBlock');
    q.style.display = 'none';
}

/**
 * @param {Event} event
 */
function saveQuantifierBlock(event) {
    var q = gel('quantifierBlock');
    q.style.display = 'none';
    var n = getItemNum(selectedItem);
    if (gel('quantifierOne').checked) {
        gel('min-' + n).value = '1';
        gel('max-' + n).value = '1';
    } else if (gel('quantifierOptionnal').checked) {
        gel('min-' + n).value = '0';
        gel('max-' + n).value = '1';
    } else if (gel('quantifierIndefinitelyOpt').checked) {
        gel('min-' + n).value = '0';
        gel('max-' + n).value = '';
    }  else if (gel('quantifierIndefinitelyShort').checked) {
        gel('min-' + n).value = '0';
        gel('max-' + n).value = '-1';
    } else if (gel('quantifierIndefinitely').checked) {
        gel('min-' + n).value = '1';
        gel('max-' + n).value = '';
    }/* else if (gel('quantifierExact').checked) {
        gel('min-' + n).value = gel('quantifierExactMin').value;
        gel('max-' + n).value = gel('quantifierExactMin').value;
    } else if (gel('quantifierAtLeast').checked) {
        gel('min-' + n).value = gel('quantifierAtLeastMin').value;
        gel('max-' + n).value = '';
    } else if (gel('quantifierAtMost').checked) {
        gel('min-' + n).value = '0';
        gel('max-' + n).value = gel('quantifierAtMostMax').value;
    } else if (gel('quantifierRepeated').checked) {
        gel('min-' + n).value = gel('quantifierRepeatedMin').value;
        gel('max-' + n).value = gel('quantifierRepeatedMax').value;
    }*/
    setQuantifierText(n);
    refresh();
}

/**
 * @param {Number} n
 * @param {Node} node
 */
function setQuantifierText(n, node) {
    var min = gel('min-' + n, node).value;
    var max = gel('max-' + n, node).value;
    var txt = '';
    if ((min == 1) && (max == 1)) {
        txt = 'one time';
    } else if ((min === '0') && (max === '1')) {
        txt = 'optionnal';
    } else if ((min === '0') && (max === '')) {
        txt = 'indefinitely longest optionnal';
    } else if ((min === '0') && (max === '-1')) {
        txt = 'indefinitely shortest optionnal';
    }  else if ((min === '1') && (max === '')) {
        txt = 'indefinitely';
    }/* else if (max === '') {
        txt = 'at least ' + min + ' times';
    } else if (min === '0') {
        txt = 'at most ' + max + ' times';
    } else if (min === max) {
        txt = 'exactly ' + min + ' times';
    } else {
        txt = 'repeated ' + min + ' to ' + max + ' times ';
    }*/
    gel('quantifier-' + n, node).innerHTML = txt;
}

function loadExampleList() {
    gel("saved_regexp").innerHTML = '';
    for (var i = 0; i < regexpExamples.length; i++) {
        gel("saved_regexp").innerHTML += '<option value="' + i + '">' + regexpExamples[i].name + '</option>';
    }
}

/**
 * @param {Number} i
 */
function loadExample(i) {
    setValue('regexp', regexpExamples[i].regexp);
    gel('test').value = regexpExamples[i].tests[0];
    typeRegexp();
}

/**
 * 
 */
function delExample() {
    regexpExamples.splice(gel('saved_regexp').selectedIndex, 1);
    localStorage.setItem("examples", JSON.stringify(regexpExamples));
    loadExampleList();
}

/**
 * 
 */
function saveExample() {
    var name = prompt("A name for this regexp:");
    if (name) {
        var exmpl = {
            "name": name,
            "regexp": getValue('regexp'),
            "tests": [
                getValue('test')
            ],
            "testsFails": []
        };
        regexpExamples.push(exmpl);
        localStorage.setItem("examples", JSON.stringify(regexpExamples));
        loadExampleList();
    }
}

function showAdvencedTests(isShown) {
    if (isShown) {
        gel('simpleTests').style.display = 'none';
        gel('advencedTests').style.display = 'block';
    } else {
        gel('simpleTests').style.display = 'block';
        gel('advencedTests').style.display = 'none';
    }
}

/**
 * @param {String} elem
 */
function addTest(elem) {
    var str = prompt("String to be tested");
    if (!str) {
        return;
    }
    var matches = prompt("Matches (JSON)");
    gel(elem).add(new Option(str, matches));
}

/**
 * @param {String} elem
 */
function delTest(elem) {
    var e = gel(elem);
    e.remove(e.selectedIndex);
}

/**
 * 
 */
function init() {
    selectedItem = gel('schema');
    // localStorage.removeItem("examples");
    if (localStorage.getItem("examples")) {
        regexpExamples = JSON.parse(localStorage.getItem("examples"));
    } else {
        localStorage.setItem("examples", JSON.stringify(regexpExamples));
    }
    loadExampleList();
}

/**
 * 
 */
function refresh() {
    var structure = schemaToStructure();
    var regexp = structureToRegexp(structure);
    setValue('regexp', regexp);
    // buildRegexp();
    testRegexp();
}

/**
 * 
 */
function typeRegexp() {
    var regexp = getValue('regexp');
    var structure = regexpToStructure(regexp);
    gel('structure').value = JSON.stringify(structure, null, 2);
    if (!structure) {
        gel('regexp').style.backgroundColor = 'pink';
        gel('errMsg').innerHTML = 'There is an error in your regular expression.';
    } else {
        gel('regexp').style.backgroundColor = 'lightgreen';
        gel('errMsg').innerHTML = '';
        structureToSchema(structure);
        testRegexp();
    }
}

/**
 * 
 */
function generateCode() {
    var regexp = getValue('regexp');
    var test = getValue('test');
    var code = '';
    code += 'local myStr = "' + test.replace('"', '\\"') + '"\r\n';
    code += 'local matches = string.match(myStr, + "' + regexp.replace('"', '\\"') + '")\r\n';
    code += 'if matches ~= nil then\r\n';
    code += '    for i,match in ipairs(matches) do\r\n';
    code += '        -- do your code with the "match" variable\r\n';
    code += '        print("match: " + match)\r\n';
    code += '    end\r\n';
    code += 'else\r\n';
    code += '    print("The regexp does not matche.")\r\n';
    code += 'end\r\n';
    gel('code').innerHTML = code;
}

/**
 * 
 */
function testRegexp() {
    /*
    try {
        var theRegexp = eval(gel('regexp').value);
        var res = gel('test').value.match(theRegexp);
        if (res == null) {
            gel('errMsg').innerHTML = 'Nothing matches in the string.';
            gel('result').value = '';
        } else {
            // gel('result').value = res.join('\n');
            gel('result').value = JSON.stringify(res, null, 4);
            gel('errMsg').innerHTML = '';
        }
        gel('regexp').className = 'regexpOk';
    } catch (e) {
        gel('errMsg').innerHTML = 'Some thing is wrong in the regexp. Error message: ' + e.message;
        gel('regexp').className = 'regexpFailed';
    }
    */
    generateCode();
}

/** *************** construct regexp string **************** */

/**
 * @param {Object} structure
 * @returns {String} the regexp
 */
function structureToRegexp(structure) {
    var regexp = '';
    if (structure.atStart) {
        regexp += '^';
    }
    regexp += structureToRegexpRecurs(structure.group);
    if (structure.atEnd) {
        regexp += '$';
    }
    return regexp;
}

/**
 * @param {Object} itemGroup
 * @returns {String} the regexp
 */
function structureToRegexpRecurs(itemGroup) {
    var regexp = '';
    for (var i = 0; i < itemGroup.length; i++) {
        var item = itemGroup[i];
        if (item.type == "word") {
            regexp += escapeCharFactor(item.value);
            regexp += structureToRegexpQuantifier(item.min, item.max);
        } else if (item.type == "class") {
            regexp += '[';
            if (item.negative) {
                regexp += '^';
            }
            regexp += structureToRegexpClass(item.group);
            regexp += ']';
            regexp += structureToRegexpQuantifier(item.min, item.max);
        }/* else if (item.type == "alternative") {
            regexp += '|';
        } else if (item.type == "or") {
            regexp += '(';
            regexp += structureToRegexpRecurs(item.group);
            regexp += ')|(';
            regexp += structureToRegexpRecurs(item.group2);
            regexp += ')';
        }*/ else if (item.type == "group") {
            regexp += '(';
            /*
            if (item.capture == 'yes') {
                // regexp += '?:';
            } else if (item.capture == 'no') {
                regexp += '?:';
            } else if (item.capture == '+lookAhead') {
                regexp += '?=';
            } else if (item.capture == '-lookAhead') {
                regexp += '?!';
            }
            */
            regexp += structureToRegexpRecurs(item.group);
            regexp += ')';
            regexp += structureToRegexpQuantifier(item.min, item.max);
        }
    }
    return regexp;
}

/**
 * @param {Object} itemGroup
 * @returns {String} the regexp
 */
function structureToRegexpClass(itemGroup) {
    var regexp = '';
    for (var i = 0; i < itemGroup.length; i++) {
        var item = itemGroup[i];
        if (item.type == "char") {
            regexp += escapeCharClass(item.value);
        } else if (item.type == "predefinedClass") {
            regexp += item.value;
        } else if (item.type == "range") {
            regexp += item.first + '-' + item.last;
        }
    }
    return regexp;
}

/**
 * @param {String} v1
 * @param {String} v2
 * @returns {String} the regexp
 */
function structureToRegexpQuantifier(v1, v2) {
    var regexp = '';
    if (!v1) {
        v1 = 0;
    }
    if (v1 == 0 && v2 == 1) {
        regexp += '?';
    } else if (v1 == 0 && v2 == '') {
        regexp += '*';
    } else if (v1 == 1 && v2 == '') {
        regexp += '+';
    }  else if (v1 == 0 && v2 == '-1') {
        regexp += '-';
    } else if (v1 == 1 && v2 == 1) {
        regexp += '';
    }/* else if (v1 == v2) {
        regexp += '{' + v1 + '}';
    } else {
        regexp += '{' + v1 + ',' + v2 + '}';
    }*/
    return regexp;
}

/** *************** construct schema **************** */

/**
 * @param {Object} structure
 */
function structureToSchema(structure) {
    gel('schema').innerHTML = "";
    for ( var varName in structure) {
        if ((varName !== 'type') && (varName !== 'group')) {
            setValue(varName, structure[varName]);
        } else if (varName === 'group') {
            for (var i = 0; i < structure['group'].length; i++) {
                var item = structure['group'][i];
                gel('schema').appendChild(structureToSchemaRecurs(item));
            }
        }
    }
}

/**
 * 
 * @param {Object} item
 * @returns {Node} the new item htmlNode
 */
function structureToSchemaRecurs(item) {
    var itemNode = createNewItem(item['type']);
    var n = getItemNum(itemNode);
    for ( var varName in item) {
        if ((varName !== 'type') && (varName !== 'group')) {
            setValue(varName + '-' + n, item[varName], itemNode);
        } else if (varName === 'group') {
            for (var i = 0; i < item[varName].length; i++) {
                var subItem = item[varName][i];
                gel(varName + '-' + n, itemNode).appendChild(structureToSchemaRecurs(subItem));
            }
        }
    }
    if ((item['type'] == 'word') || (item['type'] == 'class') || (item['type'] == 'group')) {
        setQuantifierText(n, itemNode);
    }
    return itemNode;
}

/** *************** schema To Structure **************** */

/**
 * @returns {ObjectS}
 */
function schemaToStructure() {
    var item = {};
    item.type = "literal";
    item.atStart = getValue('atStart') ? true : false;
    item.atEnd = getValue('atEnd') ? true : false;
    /*
    item.global = getValue('global') ? true : false;
    item.insensitive = getValue('insensitive') ? true : false;
    item.multiline = getValue('multiline') ? true : false;
    */
    item.group = schemaToStructureRecurs(gel('schema'));
    gel('structure').value = JSON.stringify(item, null, 2);
    return item;
}

/**
 * @param {Node} nodeRoot
 * @returns {Array}
 */
function schemaToStructureRecurs(nodeRoot) {
    var nodes = nodeRoot.childNodes;
    var itemTab = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ((node.nodeType == Node.ELEMENT_NODE) && ((node.className == 'item') || (node.className == 'itemClass'))) {
            var item = {};
            var n = getItemNum(node);
            if (gel('type-' + n).value == "word") {
                item.type = "word";
                item.value = getValue('value-' + n);
                item.min = getValue('min-' + n);
                item.max = getValue('max-' + n);
            } else if (gel('type-' + n).value == "class") {
                item.type = "class";
                item.negative = getValue('negative-' + n) ? true : false;
                item.group = schemaToStructureRecurs(gel('group-' + n));
                item.min = getValue('min-' + n);
                item.max = getValue('max-' + n);
            }/* else if (gel('type-' + n).value == "alternative") {
                item.type = "alternative";
            } else if (gel('type-' + n).value == "or") {
                item.type = "or";
                item.group = schemaToStructureRecurs(gel('group-' + n));
                item.group2 = schemaToStructureRecurs(gel('group2-' + n));
            }*/ else if (gel('type-' + n).value == "group") {
                item.type = "group";
                //item.capture = getValue('capture-' + n);
                item.group = schemaToStructureRecurs(gel('group-' + n));
                item.min = getValue('min-' + n);
                item.max = getValue('max-' + n);
            } else if (gel('type-' + n).value == "char") {
                item.type = "char";
                item.value = getValue('value-' + n);
            } else if (gel('type-' + n).value == "predefinedClass") {
                item.type = "predefinedClass";
                item.value = getValue('value-' + n);
            } else if (gel('type-' + n).value == "range") {
                item.type = "range";
                item.first = getValue('first-' + n);
                item.last = getValue('last-' + n);
            }
            itemTab.push(item);
        }
    }
    return itemTab;
}

/** *************** drag n drop **************** */

var dragged;

/**
 * @param {Event} event
 */
function drag(event) {
    event.dataTransfer.setData('text/plain', null);
}

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {
    
}, false);

document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    var source = dragged.parentNode;
    var dest = event.target;
    var elem = dragged;
    
    // move dragged elem to the selected drop target
    if (isValidMove(source, dest, elem)) {
        if (dest.style) {
            if (dest.id == 'recycledBin') {
                dest.className = "group recycledBinFull";
            } else {
                dest.style.background = "chartreuse";
            }
        }
    } else {
        if (dest.style) {
            if (dest.id == 'recycledBin') {
                dest.className = "group";
            } else {
                dest.style.background = "red";
            }
        }
    }
}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element
    // leaves it
    // var source = dragged.parentNode;
    var dest = event.target;
    // var elem = dragged;
    if (dest.style) {
        if (dest.id == 'recycledBin') {
            dest.className = "group";
        } else {
            dest.style.background = "";
        }
    }
    
}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    var source = dragged.parentNode;
    var dest = event.target;
    var elem = dragged;
    if (dest.style) {
        if (dest.id == 'recycledBin') {
            dest.className = "group";
        } else {
            dest.style.background = "";
        }
    }
    // move dragged elem to the selected drop target
    if (isValidMove(source, dest, elem)) {
        doMove(source, dest, elem);
    }
    
}, false);

/**
 * 
 * @param {Node} source
 * @param {Node} dest
 * @param {Node} elem
 * @returns {Boolean}
 */
function isValidMove(source, dest, elem) {
    if (dest == elem) {
        // dragged in the same node
        return false;
    }
    if ((dest.id == 'ressources') || (dest.parentNode.id == "ressources") || (dest.parentNode.parentNode.id == "ressources")) {
        return false;
    }
    // move dragged elem to the selected drop target
    if (dest.id == 'recycledBin') {
        if (source.id == "ressources") {
            return false;
        }
        return true;
    }
    if ((dest.className == "group") || (dest.parentNode.className == "group")) {
        if (elem.className == "item") {
            return true;
        }
    } else if ((dest.className == "groupClass") || (dest.parentNode.className == "groupClass")) {
        if (elem.className == "itemClass") {
            return true;
        }
    }
    return false;
}

/**
 * @param {Node} source
 * @param {Node} dest
 * @param {Node} elem
 */
function doMove(source, dest, elem) {
    if (source.id == 'ressources') {
        elem = duplicateItem(elem);
    } else {
        source.removeChild(elem);
    }
    if (dest.id != 'recycledBin') {
        if ((dest.parentNode.className == "group") || (dest.parentNode.className == "groupClass")) {
            dest.parentNode.insertBefore(elem, dest);
        } else {
            dest.appendChild(elem);
        }
    }
    refresh();
}

var konamiCode = {
    "i": 0,
    "list": [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ],
    "init": function() {
        document.getElementsByTagName('BODY')[0].onkeydown = function(e) {
            if (e.keyCode == konamiCode.list[konamiCode.i]) {
                if (konamiCode.i == (konamiCode.list.length - 1)) {
                    konamiCode.callback();
                    konamiCode.i = 0;
                } else {
                    konamiCode.i++;
                }
            } else {
                konamiCode.i = 0;
            }
        };
    },
    "callback": function() {
        alert("konami code! Debug mode ON");
        showStructure();
    }
};
