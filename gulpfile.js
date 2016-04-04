(function() {

  'use strict';

  var gulp        = require('gulp'),
      concat      = require('gulp-concat'),
      scss        = require('gulp-sass'),
      uglify      = require('gulp-uglify'),
      ngAnnotate  = require('gulp-ng-annotate'),
      browserSync = require('browser-sync'),
      reload      = browserSync.reload;

  gulp.task('libsjs', function(){
    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
      ])
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('builds/dev'))
      .pipe(reload({stream: true}));
  });

  gulp.task('js', function(){
    gulp.src([
        'builds/dev/app/**/*.js',
      ])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('builds/dev'))
      .pipe(reload({stream: true}));
  });

  gulp.task('css', function(){
    gulp.src([
       'bower_components/angular/angular-csp.css',
       'bower_components/bulma/css/bulma.css'
      ])
      .pipe(concat('theme.css'))
      .pipe(gulp.dest('builds/dev/css'))
      .pipe(reload({stream: true}));
  });

  gulp.task('fonts', function(){
    gulp.src('bower_components/bootstrap/dist/fonts/**/*.*')
      .pipe(gulp.dest('builds/dev/fonts/'))
      .pipe(reload({stream: true}));
  });

  gulp.task('scss', function(){
    gulp.src([
      'builds/dev/app/scss/**/*.scss',
    ])
    .pipe(scss())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('builds/dev/css'))
    .pipe(reload({stream: true}));
  });

  gulp.task('server', function () {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: 'builds/dev'
      }
    });
  });

  gulp.task('watch', function(){
    gulp.watch('builds/dev/app/**/*.js', ['js']);
    gulp.watch('builds/dev/app/scss/**/*.scss', ['scss']);
    gulp.watch([
      'builds/dev/**/*.html',
      'builds/dev/css/**/*.css'
    ]).on('change', reload);
  });

  gulp.task('default', [ 'libsjs', 'server', 'watch']);

}());