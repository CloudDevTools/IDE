/**
 * Created by yubing on 2016/9/21.
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var del = require('del');
var pkg = require('./package.json');
var imagemin = require('gulp-imagemin');
var headerfooter = require('gulp-header-footer');

var templateCache = require('gulp-angular-templatecache');

gulp.task("less",function(){
    var injectFiles = gulp.src(['./src/**/*.less','!./src/index.less'], { read: false });
    var injectOptions = {
        transform: function(filePath) {
            return '@import "' + filePath + '";\r\n';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };
    return gulp.src(['./src/index.less'])
        .pipe($.inject(injectFiles, injectOptions))
        .pipe($.less())
        .pipe(gulp.dest('.tmp/dist'))
});

gulp.task("js",function(){
    return gulp.src('src/**/*.js')
        .pipe($.concat("index.js"))
        .pipe(headerfooter({header:'(function(window) {\'use strict\';\n', footer:'})(window);',filter:function(){return true;}}))
        .pipe(gulp.dest('.tmp/dist'));
});

gulp.task("images",function(){
   return gulp.src("src/**/*.png")
       .pipe(imagemin())
       .pipe(gulp.dest('.tmp/dist'))
});

gulp.task('html', function () {
    return gulp.src(['src/**/*.html','!src/index.html'])
        .pipe(templateCache({
            module:'app'
        }))
        .pipe(gulp.dest('.tmp/dist/'));
});

gulp.task("build",['js','less','images','html'],function () {
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
    gulp.watch(['src/**','bower_components/**'], ['build']);
});

gulp.task("serve",['build','watch'],function(){
    connect.server({
        root: ['.tmp/dist', '.'],
        livereload: true,
        port: 8080
    });
});