/// <binding AfterBuild='prepare-app' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    del = require("del");

var webRoot = "./wwwroot/";
var appRoot = webRoot + "app/";
var libsRoot = "./Scripts/libs/";
var libsTarget = webRoot + "lib/";
var srcRoot = "../SarcoNecMero.Angular/dist/app/";

gulp.task("clean:app", function () {
    return del(appRoot + "**");
});

gulp.task("copy:app", ["clean:app"], function () {
    return gulp.src(srcRoot + "**")
        .pipe(gulp.dest(appRoot));
});

gulp.task("clean:libs", function () {
    return del(libsTarget + "**");
});

gulp.task("copy:libs", ["clean:libs"], function (cb) {
    gulp.src(libsRoot + "jquery/dist/jquery.js")
        .pipe(gulp.dest(libsTarget + "jquery/"));

    //Angular
    gulp.src(libsRoot + "angular/angular.js")
        .pipe(gulp.dest(libsTarget + "angular/"));
    gulp.src(libsRoot + "angular-route/angular-route.js")
        .pipe(gulp.dest(libsTarget + "angular-route/"));
    gulp.src(libsRoot + "angular-resource/angular-resource.js")
        .pipe(gulp.dest(libsTarget + "angular-resource/"));

    //Bootstrap
    gulp.src(libsRoot + "bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest(libsTarget + "bootstrap/js/"));
    gulp.src(libsRoot + "bootstrap/dist/css/*.css")
        .pipe(gulp.dest(libsTarget + "bootstrap/css/"));
    gulp.src(libsRoot + "bootstrap/dist/fonts/*.*")
        .pipe(gulp.dest(libsTarget + "bootstrap/fonts/"));

    cb();
});

gulp.task("prepare-app", ["clean:app", "copy:app"]);
gulp.task("prepare-libs", ["clean:libs", "copy:libs"]);