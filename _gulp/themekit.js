const gulp = require('gulp');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const themeKit = require('@shopify/themekit');

gulp.task('set-dev-env', function(cb) {
  env = 'development';
  cb();
});

gulp.task('set-prod-env', function(cb) {
  env = 'production';
  cb();
});

gulp.task('start-themekit', () => {
    themeKit.command('watch', {
        allowLive: true,
        notify: './theme.update',
        env: 'development',
        vars: '.env'
    });

    const config = require('../config.json');

    browserSync.init({
        proxy: `https://${config.development.store}?preview_theme_id=${config.development.theme_id}`,
        reloadDelay: 3000
    });

    gulp.watch('./theme.update').on('change', browserSync.reload);
});

gulp.task('deploy', function() {
    return themeKit.command('deploy', {
        env: env,
        vars: '.env'
    });
});

gulp.task('download', function() {
    return themeKit.command('download', {
        env: env,
        vars: '.env'
    });
});
gulp.task('download-development', gulp.series(['download']));

gulp.task('download-production', function() {
  return themeKit.command('download', {
      allowLive: true,
      vars: '.env'
  });
});
gulp.task('download-prod', gulp.series(['download-production']));

gulp.task('download-settings', function() {
  return themeKit.command('download', {
      env: env,
      vars: '.env'
  });
});