'use strict';

module.exports = function() {

  let uglify = require('gulp-uglify');
  let pump = require('pump');


  $.gulp.task('js:foundation', function() {
    return $.gulp.src($.path.jsFoundation)
      .pipe($.gp.concat('foundation.js'))
      .pipe(uglify())
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
