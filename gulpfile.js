"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const uglify = require("gulp-uglify");
const pump = require("pump");
const htmlmin = require("gulp-htmlmin");
const pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('source/views/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('source'));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src(["source/img/*.svg"])
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
});

gulp.task("js", function (cb) {
  pump([
        gulp.src("source/js/*.js"),
        // uglify(),
        rename(function (path) {
          path.basename += ".min";
        }),
        gulp.dest("build/js")
    ],
    cb
  );
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2,ttf}",
    "source/img/**",
    "source/js/**",
    "source/index.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copy-svg", function () {
  return gulp.src([
    "source/img/*.svg"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("copy-svg", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/views/**/*.pug", gulp.series("pug"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));

});

gulp.task("build", gulp.series("clean", "pug",  "copy", "css", "js", "html", "sprite"));

gulp.task("start", gulp.series("build", "server"));
