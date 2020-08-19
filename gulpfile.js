const gulp = require('gulp');
const debug = require('gulp-debug');
const concat = require('gulp-concat');

// используем для правильного порядка
const decl = [
  'header-text',
  'main-btn',
  'main-text',
  'addit-info',
  'container',
  'container-bets',
  'bet',
  'bet/__image/bet__image',
  'bet/__button/bet__button',
  'bet/__text/bet__text',
];

gulp.task('build', function(){
  gulp.src(decl.map( s => { return 'blocks/*/'+s+'.css'}))
  .pipe(concat('index.css'))
  .pipe(gulp.dest('dist'))
  .pipe(debug());
  gulp.src(decl.map( s => { return 'blocks/*/'+s+'.js'}))
  .pipe(concat('index.js'))
  .pipe(gulp.dest('dist'))
  .pipe(debug());
  return
});


gulp.task('watch', function() {
  gulp.watch('styles/*.css', gulp.series('build'));
});
