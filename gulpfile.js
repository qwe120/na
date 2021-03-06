/*
 * @Author: zhangzirui
 * @Date: 2018-11-05 08:28:31
 * @Last Modified by: zhangzirui
 * @Last Modified time: 2018-11-05 09:58:22
 */

// 引入
var gulp = require('gulp');
var fs = require('fs');
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean-css');
var babel = require('gulp-babel');

// 生产环境
// 转换scss
gulp.task('devSass', function () {
    return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./src/css'))
});
//压缩js
gulp.task('devUglify', function () {
    return gulp.src('./src/js/*.js')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./src/js'))
});
// 监听scss
gulp.task('watch', function () {
    return gulp.watch('./src/scss/*.scss', gulp.series('devSass'))
});
// 起服务器
gulp.task('server', function () {
    return gulp.src('./src')
            .pipe(webserver({
                port: 8081,
                livereload: true,
                middleware: [bodyParser.urlencoded({extended: false}), function (req, res, next) {
                    if (req.url === '/favicon.ico'){
                        return res.end('');
                    }
                    var pathname = url.parse(req.url).pathname;
                    if (/^\/api/.test(pathname)) {// 接口
                        if (pathname === '/api/load') {
                            res.end(JSON.stringify({code:0, msg: '成功'}));
                        }
                    } else { // 文件
                        pathname = pathname === '/' ? 'index.html' : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }
                }]
            }))
})

gulp.task('dev', gulp.series('devSass', 'devUglify', 'server', 'watch'));

// 线上环境 打包
// css
gulp.task('buildCss', function () {
    return gulp.src('./src/css/*.css')
            .pipe(clean())
            .pipe(gulp.dest('./dist/css'))
});
// 普通js
gulp.task('buildUglify', function () {
    return gulp.src('./src/js/*.js')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
});
// libs
gulp.task('copyJs', function () {
    return gulp.src('./src/js/libs/*.js')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js/libs'))
});
// 压缩html
gulp.task('htmlmin', function () {
    return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('buildCss', 'buildUglify', 'copyJs', 'htmlmin'));