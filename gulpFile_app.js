// svn 更新时使用

var lessrev = true;
var jsminrev = true;

var gulp = require('gulp'),
  fs = require('fs'),
  less = require('gulp-less'),
  csso = require('gulp-csso'),
  livereload = require('gulp-livereload'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  replace = require('gulp-replace'),
  revCollector = require('gulp-rev-collector'),
  connect = require('gulp-connect');
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  notify=require('gulp-notify'),
  plumber=require('gulp-plumber');

  var gulp_webpack = require('gulp-webpack')
  var webpack= require('webpack');
  var webpack_config = require('./webpack.config.js');

  var basePath = './app/public/';

  // less 编译
  gulp.task('less', function(event) {
      gulp.src(basePath + 'src/less/*.less')
        .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(basePath + 'src/css'));
  });

  //定义监听文件修改任务
  gulp.task('watchBuild', function(event) {
      livereload.listen();
      gulp.watch([ basePath + 'src/index.js',basePath + 'src/html/*.js'], ['buildjs']);

  });
  //定义监听文件修改任务
  gulp.task('watchLess', function(event) {
      livereload.listen();
      gulp.watch([ basePath + 'src/less/*.less'], ['less']);

  });
  // 生成js文件
  gulp.task('buildjs',function(){
    gulp.src(basePath + 'src/index.js')
      .pipe(gulp_webpack(webpack_config,webpack))
      .pipe(gulp.dest(basePath + 'dist/'))
      .pipe(livereload());
  });

  //定义默认任务
  gulp.task('default',['watchBuild','watchLess']);
  gulp.run('default');
