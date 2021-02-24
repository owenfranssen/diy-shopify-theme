const gulp = require('gulp');
const yaml = require('gulp-yaml');

gulp.task('convert-yml', () => {
  return gulp.src('./config.yml')
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest('./'));
});

gulp.task('setup-folder-structure', () => {
  return gulp.src('*.*', {
      read: false
    })
    .pipe(gulp.dest('./_src'))
    .pipe(gulp.dest('./_src/scss'))
    .pipe(gulp.dest('./_src/scss/base'))
    .pipe(gulp.dest('./_src/scss/components'))
    .pipe(gulp.dest('./_src/scss/pages'))
    .pipe(gulp.dest('./_src/scss/sections'))
    .pipe(gulp.dest('./_src/scss/ui-components'))
    .pipe(gulp.dest('./_src/svg'));
});