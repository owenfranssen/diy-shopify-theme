const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const config = require('../project-config.json');

gulp.task('build-js', function() {
  return new Promise((resolve, reject) => {
     webpack(webpackConfig, (error, stats) => {
         if (error) {
             return reject(error);
         }
         if (stats.hasErrors()) {
             return reject(new Error(stats.compilation.errors.join('\n')));
         }
         resolve();
     });
  });
});

gulp.task('watch-js', () => {
  gulp.watch(`${config.custom.js}/**/*.js`, gulp.series('build-js'));
});