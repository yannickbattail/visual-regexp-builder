var currentId = 0;
var selectedItem = null;

function escapeCharFactor(string) {
    return String(string).replace(/[\\ \/\\\[\]{}()?+*|.\^$]/g, '\\$&');
}

function escapeCharClass(string) {
    return String(string).replace(/[\\ \/\\\[\]\^\-]/g, '\\$&');
}

function getItemNum(selectedItem) {
    var t = selectedItem.id.split('-');
    return t[1];
}

/**
 * @param {String} itemType
 * @returns {Element} new htmlElement of the item
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
 * @param {Element} oldNode node to be duplicated
 * @returns {Element} duplicated htmlNode
 */
function duplicateItem(oldNode) {
    var newItem = oldNode.cloneNode(true);
    currentId++;
    newItem.innerHTML = newItem.innerHTML.replace(new RegExp('XXX', 'g'), String(currentId));
    newItem.innerHTML = newItem.innerHTML.replace('disabled="disabled"', '');
    newItem.id = newItem.id.replace('XXX', String(currentId));
    newItem.setAttribute("style", "");
    return newItem;
}

function showQuantifier(event) {
    var n = getItemNum(event.target);
    var quantifier = gel('quantifier-' + n);
    if (quantifier.style.display == 'inline') {
        quantifier.style.display = 'none';
    } else {
        quantifier.style.display = 'inline';
    }
}

function loadExampleList() {
    for (var i = 0; i < regexpExamples.length; i++) {
        gel("saved_regexp").innerHTML += '<option value="' + i + '">' + regexpExamples[i].name + '</option>';
    }
}

function loadExample(i) {
    structureToSchema(regexpExamples[i].structure);
    gel('test').value = regexpExamples[i].tests[0];
    refresh();
}

function init() {
    selectedItem = gel('schema');
    loadExampleList();
}

function refresh() {
    var structure = schemaToStructure();
    var regexp = structureToRegexp(structure);
    setValue('regexp', regexp);
    // buildRegexp();
    testRegexp();
}

function testRegexp() {
    try {
        var theRegexp = eval(gel('regexp').value);
        var res = gel('test').value.match(theRegexp);
        if (res == null) {
            gel('errMsg').innerHTML = 'Nothing matches in the string.';
            gel('result').value = '';
        } else {
            // gel('result').value = res.join('\n');
            gel('result').value = JSON.stringify(res);
            gel('errMsg').innerHTML = '';
        }
        gel('regexp').className = 'regexpOk';
    } catch (e) {
        gel('errMsg').innerHTML = 'Some thing is wrong in the regexp. Error message: ' + e.message;
        gel('regexp').className = 'regexpFailed';
    }
    
}

/***************** construct regexp string *****************/
/**
 * @param {Object} structure
 * @returns String the regexp
 */
function structureToRegexp(structure) {
    var regexp = '/';
    if (structure.atStart) {
        regexp += '^';
    }
    regexp += structureToRegexpRecurs(structure.group);
    if (structure.atEnd) {
        regexp += '$';
    }
    regexp += '/';
    if (structure.global) {
        regexp += 'g';
    }
    if (structure.insensitive) {
        regexp += 'i';
    }
    if (structure.multiline) {
        regexp += 'm';
    }
    return regexp;
}

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
        } else if (item.type == "alternative") {
            regexp += '|';
        } else if (item.type == "or") {
            regexp += '(';
            regexp += structureToRegexpRecurs(item.group);
            regexp += ')|(';
            regexp += structureToRegexpRecurs(item.group2);
            regexp += ')';
        } else if (item.type == "group") {
            regexp += '(';
            if (item.capture == 'yes') {
                // regexp += '?:';
            } else if (item.capture == 'no') {
                regexp += '?:';
            } else if (item.capture == '+lookAhead') {
                regexp += '?=';
            } else if (item.capture == '-lookAhead') {
                regexp += '?!';
            }
            regexp += structureToRegexpRecurs(item.group);
            regexp += ')';
            regexp += structureToRegexpQuantifier(item.min, item.max);
        }
    }
    return regexp;
}

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
    } else if (v1 == 1 && v2 == 1) {
        regexp += '';
    } else if (v1 == v2) {
        regexp += '{' + v1 + '}';
    } else {
        regexp += '{' + v1 + ',' + v2 + '}';
    }
    return regexp;
}
/***************** construct regexp string *****************/
/*
 * function buildRegexp() { var regexp = ''; regexp += buildRegexpRecurs(gel('schema')); if (getValue('atStart')) { regexp = '^' + regexp; } if (getValue('atEnd')) { regexp += '$'; } regexp = '/' +
 * regexp + '/'; if (getValue('global')) { regexp += 'g'; } if (getValue('insensitive')) { regexp += 'i'; } if (getValue('multiline')) { regexp += 'm'; } gel('regexp').value = regexp; }
 * 
 * function buildRegexpRecurs(nodeRoot) { var nodes = nodeRoot.childNodes; var regexp = ''; for (var i = 0; i < nodes.length; i++) { var node = nodes[i]; if ((node.nodeType == Node.ELEMENT_NODE) &&
 * (node.className == 'item')) { var n = getItemNum(node); if (gel('type-' + n).value == "word") { regexp += escapeCharFactor(getValue('value-' + n)); regexp += buildQuantifier(getValue('min-' + n),
 * getValue('max-' + n)); } else if (gel('type-' + n).value == "class") { regexp += '['; if (getValue('negative-' + n)) { regexp += '^'; } regexp += buildClass(gel('group-' + n)); regexp += ']';
 * regexp += buildQuantifier(getValue('min-' + n), getValue('max-' + n)); } else if (gel('type-' + n).value == "alternative") { regexp += '|'; } else if (gel('type-' + n).value == "or") { regexp +=
 * '('; regexp += buildRegexpRecurs(gel('group-' + n)); regexp += ')|('; regexp += buildRegexpRecurs(gel('group2-' + n)); regexp += ')'; } else if (gel('type-' + n).value == "group") { regexp += '(';
 * if (getValue('capture-' + n) == 'yes') { // regexp += '?:'; } else if (getValue('capture-' + n) == 'no') { regexp += '?:'; } else if (getValue('capture-' + n) == '+lookAhead') { regexp += '?='; }
 * else if (getValue('capture-' + n) == '-lookAhead') { regexp += '?!'; }
 * 
 * regexp += buildRegexpRecurs(gel('group-' + n)); regexp += ')'; regexp += buildQuantifier(getValue('min-' + n), getValue('max-' + n)); } } } return regexp; }
 * 
 * function buildClass(nodeRoot) { var nodes = nodeRoot.childNodes; var regexp = ''; for (var i = 0; i < nodes.length; i++) { var node = nodes[i]; if ((node.nodeType == Node.ELEMENT_NODE) &&
 * (node.className == 'itemClass')) { var n = getItemNum(node); if (gel('type-' + n).value == "char") { regexp += escapeCharClass(getValue('value-' + n)); } else if (gel('type-' + n).value ==
 * "predefinedClass") { regexp += getValue('value-' + n); } else if (gel('type-' + n).value == "range") { regexp += getValue('first-' + n) + '-' + getValue('last-' + n); } } } return regexp; }
 * 
 * function buildQuantifier(v1, v2) { var regexp = ''; if (!v1) { v1 = 0; } if (v1 == 0 && v2 == 1) { regexp += '?'; } else if (v1 == 0 && v2 == '') { regexp += '*'; } else if (v1 == 1 && v2 == '') {
 * regexp += '+'; } else if (v1 == 1 && v2 == 1) { regexp += ''; } else if (v1 == v2) { regexp += '{' + v1 + '}'; } else { regexp += '{' + v1 + ',' + v2 + '}'; } return regexp; }
 */

/***************** construct schema *****************/

/**
 * 
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
    return itemNode;
}

/***************** schema To Structure *****************/

function schemaToStructure() {
    var item = {};
    item.type = "literal";
    item.atStart = getValue('atStart') ? true : false;
    item.atEnd = getValue('atEnd') ? true : false;
    item.global = getValue('global') ? true : false;
    item.insensitive = getValue('insensitive') ? true : false;
    item.multiline = getValue('multiline') ? true : false;
    item.group = schemaToStructureRecurs(gel('schema'));
    return item;
}

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
            } else if (gel('type-' + n).value == "alternative") {
                item.type = "alternative";
            } else if (gel('type-' + n).value == "or") {
                item.type = "or";
                item.group = schemaToStructureRecurs(gel('group-' + n));
                item.group2 = schemaToStructureRecurs(gel('group2-' + n));
            } else if (gel('type-' + n).value == "group") {
                item.type = "group";
                item.capture = getValue('capture-' + n);
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

/***************** drag n drop *****************/

var dragged;

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
            dest.style.background = "chartreuse";
        }
    } else {
        if (dest.style) {
            dest.style.background = "red";
        }
    }
}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    // var source = dragged.parentNode;
    var dest = event.target;
    // var elem = dragged;
    if (dest.style) {
        dest.style.background = "";
    }
    
}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    var source = dragged.parentNode;
    var dest = event.target;
    var elem = dragged;
    if (dest.style) {
        dest.style.background = "";
    }
    // move dragged elem to the selected drop target
    if (isValidMove(source, dest, elem)) {
        doMove(source, dest, elem);
    }
    
}, false);

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
