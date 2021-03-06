﻿/// <binding AfterBuild='prepare-app' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    del = require("del");

var webRoot = "./wwwroot/";
var appRoot = webRoot + "app/";
var libsRoot = "../SarcoNecMero.Angular/libs/";
var libsTarget = webRoot + "lib/";
var srcRoot = "../SarcoNecMero.Angular/dist/";

gulp.task("clean:app", function () {
    return del(appRoot + "**");
});

gulp.task("copy:app", ["clean:app"], function () {
    return gulp.src(srcRoot + "**", { base: srcRoot })
        .pipe(gulp.dest(webRoot));
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
    gulp.src(libsRoot + "angular-animate/angular-animate.js")
        .pipe(gulp.dest(libsTarget + "angular-animate/"));
    gulp.src(libsRoot + "angular-aria/angular-aria.js")
        .pipe(gulp.dest(libsTarget + "angular-aria/"));
    gulp.src(libsRoot + "angular-messages/angular-messages.js")
        .pipe(gulp.dest(libsTarget + "angular-messages/"));
    gulp.src(libsRoot + "angular-route/angular-route.js")
        .pipe(gulp.dest(libsTarget + "angular-route/"));
    gulp.src(libsRoot + "angular-i18n/angular-locale_fr-fr.js")
    .pipe(gulp.dest(libsTarget + "angular/"));

    //Angular Material
    gulp.src(libsRoot + "angular-material/angular-material*.js")
        .pipe(gulp.dest(libsTarget + "angular-material/"));
    gulp.src(libsRoot + "angular-material/angular-material.*css")
        .pipe(gulp.dest(libsTarget + "angular-material/"));

    //lodash
    gulp.src(libsRoot + "lodash/lodash*.js")
        .pipe(gulp.dest(libsTarget + "lodash/"));

    //es6-shim
    gulp.src(libsRoot + "es6-shim/es6-shim*.js")
        .pipe(gulp.dest(libsTarget + "es6-shim/"));

    //OL3
    gulp.src(libsRoot + "ol3/**/*.*", { base: libsRoot + "ol3/" })
        .pipe(gulp.dest(libsTarget + "ol3/"));

    //Proj4
    gulp.src(libsRoot + "proj4/dist/proj4.js")
        .pipe(gulp.dest(libsTarget + "proj4/"));

    cb();
});

gulp.task("prepare-app", ["clean:app", "copy:app"]);
gulp.task("prepare-libs", ["clean:libs", "copy:libs"]);