Package.describe({
  name: 'rafa93br:autoform-upload',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Autoform component for uploading images',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rafaelcorreiapoli/af-upload',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'reactive-var',
    'aldeed:autoform@5.8.1',
    'fortawesome:fontawesome@4.5.0',
    'cfs:ui@0.1.3',
    'es5-shim',
  ], 'client');

  api.use([
    'underscore',
    'ecmascript',
    'templating'
  ]);

  api.use([
    'check',
  ], 'server');

  api.addFiles('client/autoform-upload.html', 'client');
  api.addFiles('client/autoform-upload.js', 'client');
  api.addFiles('client/autoform-upload.css', 'client');

  api.addFiles('server/autoform-upload.js', 'server');

  api.addAssets('public/img/image.png', 'client');
});
