const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const gulpStylelint = require('gulp-stylelint');
const fs = require('fs');

//sass.compiler = require('node-sass');
const config = require('../project-config.json');

gulp.task('stylelint', () => {
  return gulp.src([`${config.custom.scss}/**/*.scss`, `!${config.custom.scss}/custom.scss`])
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

gulp.task('concat-scss', () => {
  return gulp.src([
      `${config.custom.scss}/mixins/*.scss`,
      `${config.custom.scss}/variables/*.scss`,
      `${config.custom.scss}/base/*.scss`,
      `${config.custom.scss}/vendor/*.scss`,
      `${config.custom.scss}/ui-components/*.scss`,
      `${config.custom.scss}/components/*.scss`,
      `${config.custom.scss}/sections/*.scss`,
      `${config.custom.scss}/pages/*.scss` ])
    .pipe(concat('custom.scss'))
    .pipe(gulp.dest(config.custom.scss));
});

gulp.task('process-scss', done => {
  const source = `${config.custom.scss}/custom.scss`;
  fs.open(source, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return;
      }
    } else {
      return gulp.src(source)
        .pipe(sass({
          outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(postcss([
          autoprefixer(),
          cssnano()
        ]))
        .pipe(rename('custom.scss'))
        .pipe(gulp.dest(config.output.css));
    }
  });
  done();
});

gulp.task('build-scss', gulp.series('concat-scss', 'stylelint', 'process-scss'));

gulp.task('watch-scss', () => {
  gulp.watch([`${config.custom.scss}/**/*.scss`, `!${config.custom.scss}/custom.scss`], gulp.series('build-scss'));
});