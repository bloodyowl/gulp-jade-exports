# gulp-jade-exports

![https://travis-ci.org/bloodyowl/gulp-jade-exports](https://travis-ci.org/bloodyowl/gulp-jade-exports.svg)

takes all the `exports` blocks from the given jade files
to collect information before running the jade task.

this can be used to collect all the metadata to use it
in the templates afterwards.

## install

```sh
$ npm install gulp-jade-exports
```

## notice

your project must have LF line-endings. you can easily configure that using `.gitattributes`.

## usage

### in your jade page

```jade
block exports
  -exports.title = "my page title"
  -exports.tags = ["wow", "very", "seo"]
```

### in your gulp file

```javascript
var gulp = require("gulp")
  , jade = require("gulp-jade")
  , pages = require("gulp-jade-exports")

gulp.task("exports", function(){
  return gulp.src("pages/**.jade")
    .pipe(pages())
})

gulp.task("pages", ["exports"], function(){
  return gulp.src("pages/**.jade")
    .pipe(jade({
      locals : {
        pages : pages.exports
      }
    }))
})
```

now all the jade files found in `pages` will receive a
local `pages` object like this :

```javascript
{
  "index" : {
    "title" : "my page title",
    "tags" : ["wow", "very", "seo"]
  },
  "about" : {
    "title" : "my page title",
    "tags" : ["some", "other", "tags"]
  }
}
```
