var gulp = require('gulp');
var server = require('browser-sync').create();

gulp.task('server', function() {
  server.init({
    server: {
      baseDir: 'source/'
    }
  });
  gulp.watch("source/*.html").on('change', server.reload);
  gulp.watch("source/**/*.js").on('change', server.reload);
});

gulp.task("build", gulp.series("server"));
