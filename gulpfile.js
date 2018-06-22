"use strict";

var gulp            = require('gulp'),
    less            = require('gulp-less'),
    sourcemaps      = require('gulp-sourcemaps'),
    minifyCSS       = require('gulp-minify-css'),
    rename          = require("gulp-rename"),
    jade            = require('gulp-jade'),
    watch           = require('gulp-watch'),
    notify          = require("gulp-notify"),
    livereload      = require('gulp-livereload'),
    connect         = require('gulp-connect'),
    rev             = require('gulp-rev'),
    revCollector    = require('gulp-rev-collector'),
    gutil           = require('gulp-util'),
    rimraf          = require('rimraf'),
    revOutdated     = require('gulp-rev-outdated'),
    path            = require('path'),
    through         = require('through2'),
    bump            = require('gulp-bump'),
    update          = require('gulp-update');


// Will patch the version
gulp.task('bump', function(){
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});


//npmUpdate
gulp.task('npmUpdate', function () {
    var update = require('gulp-update')();

    gulp.watch('./package.json').on('change', function (file) {
        update.write(file);
    });

});    

// server connect
gulp.task('connect', function () {
    connect.server({
        'port': 1340,
        'livereload': true
    });
});


// templates
gulp.task('templates', function () {
    gulp.src('./jade/*.jade')
        .pipe(jade({
            pretty: true,
            data: {
                debug: false
            }
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});


gulp.task('rev', function () {
    return gulp.src('./less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())

        .on('error', function (err) {
            console.log(err);
            this.emit('end');
        })

        .pipe(minifyCSS())
        .pipe(gulp.dest('./css/'))

        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./manifests/'))
        .pipe(notify('Done!'))

});

gulp.task('rev_collector', ['rev'], function () {
    return gulp.src(['./manifests/**/*.json', './*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))

        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
});

function cleaner() {
    return through.obj(function (file, enc, cb) {
        rimraf(path.resolve((file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task('clean',['rev_collector'], function () {
    gulp.src(['./**/*.*'], {read: false})
        .pipe(revOutdated(1)) // leave 2 recent assets (default value)
        .pipe(cleaner())

    return;

});


// watch
gulp.task('watch', function () {
    gulp.watch(('./**/*.jade'), ['templates']);
    gulp.watch(('./**/*.less'), ['rev_all'])
});

// default
gulp.task('default', ['connect', 'templates', 'rev_all', 'watch']);

// rev_all
gulp.task('rev_all', ['rev', 'rev_collector', 'clean']);