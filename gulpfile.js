'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./assets/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src("./sass/*.scss")
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(autoprefixer({
			browsers: ['> 1%', 'iOS 8', 'ie 9'],
			cascade: false
		}))
    .pipe(gulp.dest("./assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);