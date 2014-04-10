var tape = require("tape")
  , path = require("path")
  , fs = require("fs")
  , through = require("through2")
  , jadeExports = require("../")
  , util = require("gulp-util")

tape("metadata", function(test){
  var stream = jadeExports()
    , exports = jadeExports.exports
    , contents = fs.readFileSync(
        path.resolve(__dirname, "./pages/", "test.jade")
      )
    , file = new util.File({
        base : path.resolve(__dirname, "./pages/"),
        path : path.resolve(__dirname, "./pages/", "test.jade"),
        contents : new Buffer(contents)
      })

  stream.on("data", function(){
    var indexExports
    test.equal(typeof exports, "object", "exports are object")
    indexExports = exports["test"]
    test.equal(typeof indexExports, "object", "exports are object")
    test.equal(indexExports.title, "homepage", "exports have title")
    test.equal(indexExports.slug, "test", "exports have slug")
    test.equal(indexExports.description, "some seo content", "exports have desc")

    test.end()
  })

  stream.write(file)
  stream.end()
})
