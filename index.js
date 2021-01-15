var through = require('through2');
var glob = require('glob')
var path = require('path')

function lessStreamFilter(file) {
  var lessContents = String(file.contents)
  var r = /@import\s+("|')([^;\n\r]+\.less)("|');/g
  var result
  while ((result = r.exec(lessContents)) !== null) {
    var quotes = result[1]
    var fileDir = path.dirname(file.path)
    var lessFiles = glob.sync(path.resolve(fileDir, result[2]))
    var importFileStr = ''
    lessFiles.forEach(file => {
      importFileStr += `@import ${quotes}${file}${quotes};\n`
    });
    lessContents = lessContents.replace(result[0], importFileStr)
  }
  file.contents = Buffer.from(lessContents);
  return file;
}

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    var newFile = null;
    var err = null;
    try {
      newFile = lessStreamFilter(file);
    } catch (e) {
      err = e;
    }
    callback(err, newFile);
  });
}