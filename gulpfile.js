/// <binding AfterBuild='prepare-app' />
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

    //Angular Material
    gulp.src(libsRoot + "angular-material/angular-material*.js")
        .pipe(gulp.dest(libsTarget + "angular-material/"));
    gulp.src(libsRoot + "angular-material/angular-material.*css")
        .pipe(gulp.dest(libsTarget + "angular-material/"));

    //Bootstrap
    gulp.src(libsRoot + "bootstrap/dist/js/bootstrap.js")
        .pipe(gulp.dest(libsTarget + "bootstrap/js/"));
    gulp.src(libsRoot + "bootstrap/dist/css/*.css")
        .pipe(gulp.dest(libsTarget + "bootstrap/css/"));
    gulp.src(libsRoot + "bootstrap/dist/fonts/*.*")
        .pipe(gulp.dest(libsTarget + "bootstrap/fonts/"));

    //OL3
    gulp.src(libsRoot + "ol3/**/*.*", { base: libsRoot + "ol3/" })
        .pipe(gulp.dest(libsTarget + "ol3/"));

    //Cesium
    gulp.src(libsRoot + "cesium/debug/**/*.*", { base: libsRoot + "cesium/debug/" })
        .pipe(gulp.dest(libsTarget + "cesium/"));

    cb();
});

gulp.task("prepare-app", ["clean:app", "copy:app"]);
gulp.task("prepare-libs", ["clean:libs", "copy:libs"]);