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

function gel(id) {
    return document.getElementById(id);
}

function getValue(id) {
    var e = gel(id);
    if (e.tagName == 'SELECT') {
        return getSel(id);
    } else if (e.tagName == 'INPUT') {
        if (e.type == 'checkbox') {
            return gel(id).checked;
        } else {
            return gel(id).value;
        }
    }
    throw "unknown field type " + e.tagName;
}

function setValue(id, value) {
    var e = gel(id);
    if (e.tagName == 'SELECT') {
        return setSel(id, value);
    } else if (e.tagName == 'INPUT') {
        if (e.type == 'checkbox') {
            return gel(id).checked = value ? true : false;
        } else {
            return gel(id).value = value;
        }
    }
    throw "unknown field type" + e.tagName;
}

function setSel(id, value) {
    var sel = gel(id);
    for (var i, j = 0; i = sel.options[j]; j++) {
        if (i.value == value) {
            sel.selectedIndex = j;
            break;
        }
    }
}
