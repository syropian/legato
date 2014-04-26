var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var paths = {
  js: ['assets/coffee/lastfmService.coffee', 'assets/coffee/mainCtrl.coffee', 'assets/coffee/app.coffee'],
  styles: 'assets/sass/app.scss'
};
gulp.task('js', function(){
  //Javascript
  gulp.src(paths.js)
    .pipe(coffee())
    .pipe(gulp.dest('public/js/'));
});
gulp.task('sass', function(){
  gulp.src(paths.styles)
    .pipe(sass({
      loadPath: require('node-bourbon').includePaths,
      style: 'compressed',
      quiet: true
    }))
    .pipe(gulp.dest('public/css/'));
});
gulp.task('watch', function(){
  gulp.watch(['assets/coffee/**/*.coffee'], ['js']);
  gulp.watch(['assets/sass/**/*.scss'], ['sass']);
});
gulp.task('default', [
  'js',
  'sass',
  'watch'
]);