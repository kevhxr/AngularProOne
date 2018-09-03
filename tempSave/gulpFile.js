var gulp = require('gulp');
//require a function, so must call it first
var $ = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
var open = require('open')

var paths = {
    js: ['src/js/**/*.js'],
    html:['index.html','src/templates/**/*.html'],
    less:['src/style/less/**/*.less'],
    css:['src/style/css/**/*.css'],
    dist:'dist/',
    cssDest:'src/style/css/',
    outputCss:'dist/css/',
    outputJs:'dist/js/'
};

// register tasks

//----register zip task
gulp.task('lib', function () {
    return gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(paths.dist + 'vendor'))
        .pipe($.connect.reload());
});


gulp.task('jszip',function () {
    //find target src, read data into gulp memory
    return gulp.src(paths.js)
        .pipe($.concat('build.js')) //merge file
        .pipe(gulp.dest(paths.outputJs)) //oupt file to local
        .pipe($.uglify()) //compress file
        .pipe($.rename({suffix: '.min'})) //rename
        .pipe(gulp.dest(paths.outputJs))
        .pipe($.connect.reload());
});

gulp.task('jshint',function () {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

//register convert less task
gulp.task('less',function () {
   return gulp.src(paths.less)
       .pipe($.less())
       .pipe(gulp.dest(paths.cssDest))
       .pipe($.connect.reload());
});

gulp.task('css', ['less'], function(){
    return gulp.src(paths.css)
        .pipe($.concat('build.css'))
        .pipe($.rename({suffix: '.min'}))
        //must call cleanCss follow the require order
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.outputCss))
        .pipe($.connect.reload());
});

gulp.task('html',function () {
    return gulp.src(paths.html)
        //htmlmin not htmlMin
        .pipe($.htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest(paths.dist))
        .pipe($.connect.reload());
});

//full auto
gulp.task('server',['default'],function () {
    //setup server configuration
    $.connect.server({
        root: paths.dist,
        livereload: true,
        port: 5000
    });
    open('http://localhost:5000/')
    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(paths.html,['html']);
    gulp.watch(paths.js,['jszip']);
    gulp.watch([paths.less,paths.css],['css']);
});

// register default tasks
gulp.task('default',['jszip', 'less', 'css','lib'])