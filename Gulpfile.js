var gulp = require("gulp")
  , jadeExports = require("./")

gulp.task("metadata", function(){
  return gulp.src("./test/pages/**/*.jade")
    .pipe(jadeExports())
})

gulp.task("test", ["metadata"], function(){
  require("./test")(jadeExports.exports)
})
