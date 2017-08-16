'use strict';

module.exports = function() {

  let uglify = require('gulp-uglify');
  let pump = require('pump');

  let jsfiles = [
  "source/js/**/*.js"
  ];

  $.gulp.task('js:process', function () {
      return $.gulp.src(jsfiles)
          .pipe($.gp.sourcemaps.init())
          .pipe($.gp.concat('app.js'))
          .pipe($.gp.sourcemaps.write())
          .pipe(uglify())
          .pipe($.gulp.dest($.config.root + '/assets/js'))
  })

};
