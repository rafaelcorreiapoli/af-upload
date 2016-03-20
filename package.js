Package.describe({
  name: 'rafa93br:autoform-upload',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Autoform component for uploading images',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rafaelcorreiapoli/af-upload',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'check',
    'underscore',
    'reactive-var',
    'templating',
    'aldeed:autoform',
    'fortawesome:fontawesome',
    'cfs:ui',
    'es5-shim',
    'ecmascript'
  ]);

  api.addFiles('client/autoform-upload.js');
  api.addFiles('client/autoform-upload.html');
  api.addFiles('client/autoform-upload.css');

  api.addFiles('server/autoform-upload.js');
});
