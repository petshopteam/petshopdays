'use strict';

module.exports = function() {

  var jsfiles = [
  "source/js/**/*.js"
  ];

  $.gulp.task('js:process', function () {
      // return gulp.src(jsfiles, {base: 'source/js'})
      return $.gulp.src(jsfiles)
          .pipe($.gp.sourcemaps.init())
          .pipe($.gp.concat('app.js'))
          .pipe($.gp.sourcemaps.write())
          .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
