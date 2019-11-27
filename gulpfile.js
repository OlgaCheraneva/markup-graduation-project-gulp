const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

gulp.task('clean', async function() {
    del.sync('dist');
});

gulp.task('css', () => {
    return gulp
        .src('app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css-libs', function() {
    return gulp
        .src([
            'node_modules/normalize.css/normalize.css',
            'node_modules/slick-carousel/slick/slick.css',
            'node_modules/slick-carousel/slick/slick-theme.css'
        ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('export', async function() {
    gulp.src('app/fontawesome/**/*').pipe(gulp.dest('dist/fontawesome'));
    gulp.src('app/img/*').pipe(gulp.dest('dist/img'));
});

gulp.task('html', function() {
    return gulp
        .src('app/*.html')
        .pipe(
            htmlmin({
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                continueOnParseError: true,
                removeAttributeQuotes: true
            })
        )
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp
        .src('app/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', function() {
    return gulp
        .src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/slick-carousel/slick/slick.min.js',
            'node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js',
            'node_modules/body-scroll-lock/lib/bodyScrollLock.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

// Static Server + watching html/css files
gulp.task('serve', function() {
    browserSync.init({
        server: 'app/'
    });

    gulp.watch('app/**').on('change', browserSync.reload);
});

gulp.task(
    'build',
    gulp.series('clean', gulp.parallel('export', 'html', 'css', 'js'))
);
gulp.task('default', gulp.parallel('css-libs', 'scripts', 'serve'));
