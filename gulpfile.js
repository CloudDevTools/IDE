/**
 * Created by yubing on 2016/9/21.
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var del = require('del');
var pkg = require('./package.json');
var headerfooter = require('gulp-header-footer');

gulp.task("css",function(){
    return gulp.src('src/**/*.css')
        .pipe($.concat("index.css"))
        .pipe(gulp.dest('.tmp/dist'));
});

gulp.task("js",function(){
    return gulp.src('src/**/*.js')
        .pipe($.concat("index.js"))
        .pipe(headerfooter({header:'(function(window) {\'use strict\';\n', footer:'})(window);',filter:function(){return true;}}))
        .pipe(gulp.dest('.tmp/dist'));
});

gulp.task("build",['css','js'],function () {
    var jsFiles = gulp.src(['.tmp/dist/**/*.js'])
        .pipe($.angularFilesort());
    var cssFiles = gulp.src(['.tmp/dist/**/*.css']);
    gulp.src('src/index.html')
        .pipe(wiredep({
            directory: './bower_components/',
            bowerJson: require('./bower.json'),
            devDependencies: true,
            dependencies: true
        }))
        .pipe($.inject(jsFiles))
        .pipe($.inject(cssFiles))
        .pipe(gulp.dest('.tmp/dist'))
        .pipe(connect.reload());
});
gulp.task('watch', function(){
    gulp.watch(['src/**'], ['build']);
});

gulp.task("serve",['build','watch'],function(){
    connect.server({
        root: ['.tmp/dist', '.'],
        livereload: true,
        port: 8080
    });
});