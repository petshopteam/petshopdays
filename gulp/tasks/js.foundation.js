'use strict';

module.exports = function() {

  // let minifyjs = require('gulp-js-minify');


  $.gulp.task('js:foundation', function() {
    return $.gulp.src($.path.jsFoundation)
      .pipe($.gp.concat('foundation.js'))
      // .pipe(minifyjs())
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
