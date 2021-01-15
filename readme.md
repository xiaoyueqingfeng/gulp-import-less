# gulp-import-less
A gulp plugin use with gulp-less.

## Information

<table>
<tr>
<td>Package</td><td>gulp-import-less</td>
</tr>
<tr>
<td>Description</td>
<td>Less plugin for gulp</td>
</tr>
</table>

## Installation

```
npm install gulp-import-less
```

## Basic Usage

```js
var importLess = require('gulp-import-less');

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(importLess())
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});
```
You can write like this:
index.less
```less
@import './a/**/*.less';
@import './b/c/**/*.less';
```