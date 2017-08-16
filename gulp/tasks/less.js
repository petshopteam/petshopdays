'use strict';


module.exports = function() {

  let cleanCSS = require('gulp-clean-css');

  $.gulp.task('less', function() {
    return $.gulp.src('./source/style/app.less')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.less()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.sourcemaps.write())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
      .pipe($.browserSync.stream());
  })


};
