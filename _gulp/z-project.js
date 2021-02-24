const gulp = require('gulp');

gulp.task('watch-project', gulp.series(gulp.parallel('watch-scss', 'watch-js', 'watch-svg')));

gulp.task('build-project', gulp.series('convert-yml', 'build-scss', 'build-js'));

gulp.task('start-project', gulp.series('build-project', gulp.parallel('watch-project', 'start-themekit')));

// download (dev)
// download-production

gulp.task('deploy-dev', gulp.series(['set-dev-env', 'build-project', 'deploy']));
//gulp.task('deploy-prod', gulp.series(['set-prod-env', 'build-project', 'deploy']));

gulp.task('default', gulp.series('start-project'));