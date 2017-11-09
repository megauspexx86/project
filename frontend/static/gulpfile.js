'use strict';

var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    rename         = require('gulp-rename'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    notify         = require("gulp-notify"),
    sourcemaps = require('gulp-sourcemaps'),
    pngquant = require('imagemin-pngquant'),
    cssmin = require('gulp-minify-css');

// Пользовательские скрипты проекта


gulp.task('common-js', function() {
    return gulp.src([
        'dev/js/common.js'
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dev/js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
        // 'dev/libs/jquery/dist/jquery.min.js', раскомментировать, если будем использовать не из sdn
        'dev/js/common.min.js' // Всегда в конце
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('dev/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dev'
        },
        notify: false
    });
});

gulp.task('sass', function() {
    return gulp.src('dev/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cssmin()) //Сожмем
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('imagemin', function() {
    return gulp.src('dev/img/**/*') //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('production/img')) //И бросим в build
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('dev/sass/**/*.sass', ['sass']);
    gulp.watch(['dev/libs/**/*.js', 'dev/js/common.js'], ['js']);
    gulp.watch('dev/*.html', browserSync.reload);
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

    var buildFiles = gulp.src([
        'dev/*.html',
        'dev/.htaccess'
    ]).pipe(gulp.dest('production'));

    var buildCss = gulp.src([
        'dev/css/main.min.css'
    ]).pipe(gulp.dest('production/css'));

    var buildJs = gulp.src([
        'dev/js/scripts.min.js'
    ]).pipe(gulp.dest('production/js'));

    var buildFonts = gulp.src([
        'dev/fonts/**/*'
    ]).pipe(gulp.dest('production/fonts'));

});



gulp.task('removedist', function() { return del.sync('production'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);