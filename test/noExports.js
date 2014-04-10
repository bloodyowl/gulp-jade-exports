var tape = require("tape")
  , path = require("path")
  , fs = require("fs")
  , through = require("through2")
  , jadeExports = require("../")
  , util = require("gulp-util")

tape("metadata (no exports)", function(test){
  var stream = jadeExports()
    , exports = jadeExports.exports
    , contents = fs.readFileSync(
        path.resolve(__dirname, "./pages/", "noExports.jade")
      )
    , file = new util.File({
        base : path.resolve(__dirname, "./pages/"),
        path : path.resolve(__dirname, "./pages/", "noExports.jade"),
        contents : new Buffer(contents)
      })

  stream.on("data", function(){
    var indexExports
    test.equal(typeof exports, "object", "exports are object")
    indexExports = exports["noExports"]
    test.equal(typeof indexExports, "object", "exports are object")
    test.equal(indexExports.slug, "noExports", "exports have slug")
    test.deepEqual(
      indexExports,
      {slug:"noExports"},
      "exports are empty by default"
    )
    test.end()
  })

  stream.write(file)
  stream.end()
})
