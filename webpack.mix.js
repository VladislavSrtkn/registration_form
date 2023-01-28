let mix = require('laravel-mix');

mix.sass('source/css/custom.scss', 'dist/css/style.css').options({
  processCssUrls: false,
});
mix.css('node_modules/cropperjs/dist/cropper.css', 'dist/css/style.css');

mix.js('source/js/index.js', 'dist/js/index.js');
mix.js('source/js/validationFunctions.js', 'dist/js/index.js');
mix.js('source/js/userData.js', 'dist/js/index.js');
mix.js('node_modules/bootstrap/dist/js/bootstrap.bundle.js', 'dist/js/index.js');
mix.js('node_modules/cropperjs/dist/cropper.js', 'dist/js/index.js');
