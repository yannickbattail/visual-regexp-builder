function fileLog(message) {
    try {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var file = fso.OpenTextFile("single_file.log", 8, true);
        file.WriteLine(message);
        file.close();
    } catch (e) {
        // consoleLoging(e.message, LOG_LEVEL.INFO, "Exception");
    }
}

function replacmentStyles(matches, capture) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var file = fso.openTextFile(capture, 1, false, 0);
    var fileContent = file.readAll();
    file.close();
    return '<style type="text/css">\r\n/* ' + capture + ' */\r\n' + fileContent + '\r\n</style>';
}
function replacmentScripts(matches, capture) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var file = fso.openTextFile(capture, 1, false, 0);
    var fileContent = file.readAll();
    file.close();
    return '<script type="text/javascript">\r\n/* ' + capture + ' */\r\n' + fileContent + '\r\n</script>';
}

var fileName = 'schema';

var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.openTextFile(fileName + '.html', 1, false, 0);
var fileContent = file.readAll();
file.close();
var lines = fileContent.split("\r\n");

var file = fso.OpenTextFile(fileName + '_single_file.html', 2, true);
var data = {};
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    line = line.replace(/<link\ rel="stylesheet"\ type="text\/css"\ href="([^"]*)"\ \/>/gm, replacmentStyles);
    line = line.replace(/<script\ type="text\/javascript"\ src="([^"]*)">\s*<\/script>/gm, replacmentScripts);
    file.WriteLine(line);
}
file.close();
