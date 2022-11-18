let mix = require('laravel-mix');

mix.setPublicPath('./dist');

mix.css('node_modules/bootstrap/dist/css/bootstrap.min.css', 'css/style.css');
mix.css('source/css/custom.css', 'css/style.css').options({
  processCssUrls: false,
});

mix.js('source/js/scripts.js', '/js/index.js');
mix.js('source/js/validation_functions.js', 'js/index.js');
mix.js('node_modules/bootstrap/dist/js/bootstrap.bundle.js', 'js/index.js');
