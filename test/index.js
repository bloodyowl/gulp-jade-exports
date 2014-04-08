var tape = require("tape")
  , path = require("path")

module.exports = function(exports){

  tape("metadata", function(test){
    var indexPath = "index"
      , indexExports = exports[indexPath]
    test.equal(typeof indexExports, "object", "exports are object")
    test.equal(indexExports.title, "foo", "exports have title")
    test.deepEqual(
      indexExports.tags,
      [
        "these",
        "are",
        "tags"
      ],
      "exports can pass arrays")
    test.end()
  })

  tape("metadata (nested)", function(test){
    var indexPath = "nested/index"
      , indexExports = exports[indexPath]
    test.equal(typeof indexExports, "object", "exports are object")
    test.equal(indexExports.title, "foo", "exports have title")
    test.deepEqual(
      indexExports.tags,
      [
        "these",
        "are",
        "tags"
      ],
      "exports can pass arrays")
    test.end()
  })


  tape("metadata (tabs)", function(test){
    var tabsPath = "tabs"
      , tabsExports = exports[tabsPath]
    test.equal(typeof tabsExports, "object", "exports are object")
    test.equal(tabsExports.title, "foo", "exports have title")
    test.deepEqual(
      tabsExports.tags,
      [
        "these",
        "are",
        "tags"
      ],
      "exports can pass arrays")
    test.end()
  })

  tape("metadata (ending exports)", function(test){
    var endingExportsPath = "endingExports"
      , endingExportsExports = exports[endingExportsPath]
    test.equal(typeof endingExportsExports, "object", "exports are object")
    test.equal(endingExportsExports.title, "foo", "exports have title")
    test.deepEqual(
      endingExportsExports.tags,
      [
        "these",
        "are",
        "tags"
      ],
      "exports can pass arrays")
    test.end()
  })


}
