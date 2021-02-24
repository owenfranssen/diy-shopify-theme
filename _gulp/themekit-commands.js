const gulp = require('gulp');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const themeKit = require('@shopify/themekit');
const prompt = require('gulp-prompt');

const env = 'development';

gulp.task('new-theme', function() {
  return themeKit.command('new', {
      env: env,
      vars: '.env'
  });
});