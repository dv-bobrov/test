'use strict';

const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');

const rename = require('gulp-rename');
const webpack = require("webpack-stream");
const gulpif = require("gulp-if");

gulp.task('scripts', function () {
  return webpack( require('./webpack.config.js') )
      .pipe(gulp.dest('build/js'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('serve', ['clean'], function () {
  gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('build', ['clean', 'scripts']);

gulp.task('default', ['serve', 'scripts']);
