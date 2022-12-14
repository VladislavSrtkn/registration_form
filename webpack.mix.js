let mix = require('laravel-mix');

mix.sass('source/css/custom.scss', 'dist/css/style.css').options({
  processCssUrls: false,
});
mix.css('node_modules/cropperjs/dist/cropper.css', 'dist/css/style.css');

mix.js('source/js/scripts.js', 'dist/js/index.js');
mix.js('source/js/validation_functions.js', 'dist/js/index.js');
mix.js('source/js/user_data.js', 'dist/js/index.js');
mix.js(
  'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
  'dist/js/index.js'
);
mix.js('node_modules/cropperjs/dist/cropper.js', 'dist/js/index.js');
