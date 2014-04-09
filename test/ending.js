var tape = require("tape")
  , path = require("path")
  , fs = require("fs")
  , through = require("through2")
  , jadeExports = require("../")
  , util = require("gulp-util")

tape("metadata (ending)", function(test){
  var stream = jadeExports()
    , exports = jadeExports.exports
    , contents = fs.readFileSync(
        path.resolve(__dirname, "./pages/", "endingExports.jade")
      )
    , file = new util.File({
        base : path.resolve(__dirname, "./pages/"),
        path : path.resolve(__dirname, "./pages/", "ending.jade"),
        contents : new Buffer(contents)
      })

  stream.on("data", function(){
    var indexExports
    test.equal(typeof exports, "object", "exports are object")
    indexExports = exports["ending"]
    test.equal(typeof indexExports, "object", "exports are object")
    test.equal(indexExports.title, "foo", "exports have title")
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
