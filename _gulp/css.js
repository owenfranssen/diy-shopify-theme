const gulp = require('gulp'),
  sass = require('gulp-dart-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpStylelint = require('gulp-stylelint'),
  config = require('../project-config.json');

gulp.task('stylelint', () => {
  return gulp.src([`${config.custom.scss}/**/*.scss`])
    .pipe(gulpStylelint({
      syntax: 'scss',
      fix: true,
      reporters: [
        {
          formatter: 'string',
          console: true
        },
        {
          formatter: 'string',
          save: 'stylelint-report.txt'
        }
      ]
    }));
});

gulp.task('scss', () => {
  gulp.src([`${config.custom.scss}/**/*.scss`])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: "expanded"
      }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer()
      ]))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.output.css));

  return gulp.src([`${config.custom.scss}/**/*.scss`])
  .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
  .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
  .pipe(gulp.dest(config.shopify.css));

});

gulp.task('build-scss', gulp.series('stylelint', 'scss'));

gulp.task('watch-scss', () => {
  gulp.watch([`${config.custom.scss}/**/*.scss`], gulp.series('build-scss'));
});