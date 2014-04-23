var tape = require("tape")
  , path = require("path")
  , fs = require("fs")
  , through = require("through2")
  , jadeExports = require("../")
  , util = require("gulp-util")

tape("metadata (line endings)", function(test){
  var stream = jadeExports()
    , exports = jadeExports.exports
    , contents = fs.readFileSync(
        path.resolve(__dirname, "./pages/", "index.jade")
      )
    , crContents = contents.toString().replace(/\n/g, "\r\n")
    , file = new util.File({
        base : path.resolve(__dirname, "./pages/"),
        path : path.resolve(__dirname, "./pages/", "index.jade"),
        contents : new Buffer(crContents)
      })

  stream.on("data", function(){
    var indexExports
    test.equal(typeof exports, "object", "exports are object")
    indexExports = exports["index"]
    test.equal(typeof indexExports, "object", "exports are object")
    test.equal(indexExports.title, "foo", "exports have title")
    test.equal(indexExports.slug, "index", "exports have slug")
    test.deepEqual(
      indexExports.tags,
      [
        "these",
        "are",
        "tags"
      ],
      "exports can pass arrays"
    )
    test.end()
  })

  stream.write(file)
  stream.end()
})
