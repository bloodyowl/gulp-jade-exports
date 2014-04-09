var through = require("through2")
  , jade = require("jade")
  , util = require("gulp-util")
  , path = require("path")
  , exportsRE = /block exports\n((?:(\s+)[\S\s]+\n+)+)?(?:block|$)/
  , jadeExtensionRE = /\.jade$/

module.exports = exported

function exported(){
  exported.exports = {}
  return through.obj(metadata)
}

function metadata(file, encoding, callback){
  var contents = file.contents.toString()
    , match = contents.match(exportsRE)
    , compiled
    , template
    , indentationRE
    , relativePath = toRelativePath(file.path, file.base)
  if(!match) {
    exported.exports[relativePath] = {}
    this.push(file)
    return callback()
  }
  indentationRE = RegExp("(?:^|\\n)" + match[2], "g")
  template = match[1].replace(indentationRE, "\n")
  compiled = jade.compile(template)
  compiled({
    exports : exported.exports[relativePath] = {}
  })
  this.push(file)
  return callback()
}

function toRelativePath(filePath, basePath){
  return path.relative(basePath, filePath)
    .replace(jadeExtensionRE, "")
}
