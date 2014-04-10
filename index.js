var through = require("through2")
  , jade = require("jade")
  , path = require("path")
  , jadeExtensionRE = /\.jade$/
  , whiteSpaceRE = /^(\s+)/

module.exports = exported

function exported(){
  exported.exports = {}
  return through.obj(metadata)
}

function metadata(file, encoding, callback){
  var contents = file.contents.toString()
    , hasExports = contents.indexOf("block exports") != -1
    , compiled
    , template
    , relativePath = toRelativePath(file.path, file.base)
    , baseObject = {slug : relativePath}
  if(!hasExports) {
    exported.exports[relativePath] = baseObject
    this.push(file)
    return callback()
  }
  template = parseTemplate(contents)
  compiled = jade.compile(template)
  compiled({
    exports : exported.exports[relativePath] = baseObject
  })
  this.push(file)
  return callback()
}

function parseTemplate(contents){
  var block = contents.split("block exports")
    , indentation = null
    , template = ""
    , lines
    , index = -1, length, line

  block = block[1]

  lines = block.split("\n")
  indentation = null

  length = lines.length

  while(++index < length) {
    line = lines[index]
    if(line == "") {
      continue
    }
    if(indentation == null) {
      indentation = line.match(whiteSpaceRE)
      if(indentation == null) {
        break
      }
      indentation = indentation[1]
    }
    if(line.indexOf(indentation) != 0) {
      break
    }
    template += line.slice(indentation.length)
    template += "\n"
  }
  return template
}

function toRelativePath(filePath, basePath){
  return path.relative(basePath, filePath)
    .replace(jadeExtensionRE, "")
}
