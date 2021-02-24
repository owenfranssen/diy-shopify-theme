const gulp = require('gulp');
const svgo = require('gulp-svgo');
const rename = require('gulp-rename');
const config = require('../project-config.json');

gulp.task('svg', function() {
  console.log(`Reading SVG images from ${config.custom.svg}/*.svg and placing output in ${config.output.svg}`)
  return gulp.src(`${config.custom.svg}/**/*.svg`)
      .pipe(svgo({plugins:[{removeViewBox:false}]}))
      .pipe(rename(function (path) {
          path.basename = `icon_${path.basename}.svg`;
          path.extname = '.liquid';
      }))
      .pipe(gulp.dest('./snippets'));
});

gulp.task('watch-svg', () => {
  gulp.watch(`${config.custom.svg}/*.svg`, gulp.series('svg'));
});