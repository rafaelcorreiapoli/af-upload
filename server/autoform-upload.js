Meteor.publish('af-upload.file', function(fileId) {
  check(fileId, String);
  return Images.find({_id: fileId});
});
