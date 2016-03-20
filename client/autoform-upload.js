AutoForm.addInputType('upload', {
  template: 'afUpload',
  valueOut() {
    return this.val();
  }
});


Template.afUpload.events({
  'change #input-file': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      let reader = new FileReader();
      reader.onload = function(e) {
        template.localImage.set(e.target.result);
      };

      reader.readAsDataURL(file);

      template.insertStarted.set(true);

      Images.insert(file, function(err, fileObj) {
        template.insertStarted.set(false);
        if (err) {
          return template.error.set(err);
        }

        template.file.set(fileObj._id);
      });
    });
  },
  'click #trigger-file': function(e, t) {
    e.preventDefault();
    e.stopPropagation();
    let file = $(t.find('#input-file'));
    file.trigger('click');
  },
  'click #remove': function(e, t) {
    e.preventDefault();

    Images.remove({
      _id: t.file.get()
    });

    t.file.set(null);
    t.error.set(null);
    t.localImage.set(null);
    t.insertStarted.set(null);
  }
});

Template.afUpload.helpers({
  file() {
    return Template.instance().file.get();
  },
  subsReady() {
    return Template.instance().fileSub.ready();
  },
  fileInstance() {
    return Images.findOne({
      _id: Template.instance().file.get()
    });
  },
  isStored() {
    return this.hasStored('original');
  },
  insertStarted() {
    return Template.instance().insertStarted.get();
  },
  imagePreview() {
    let template = Template.instance();
    let localImage = template.localImage.get();
    let file = template.file.get();

    if (localImage) {
      return localImage;
    }

    if (file) {
      let image = Images.findOne({_id: file});
      if (image) {
        return image.url();
      }
    }


    return '/packages/rafa93br_autoform-upload/public/img/image.png';
  },
  schemaKey() {
    return  this.atts['data-schema-key'];
  },

});

Template.afUpload.onCreated(function() {
  this.localImage = new ReactiveVar();
  this.file = new ReactiveVar();
  this.error = new ReactiveVar();
  this.insertStarted = new ReactiveVar();
  this.autorun(() => {
    let data = Template.currentData();
    let value = data.value;
    if (value) {
      this.file.set(this.data.value);
    }
  });

  this.autorun(() => {
    let file = this.file.get();

    if (file) {
      this.fileSub = this.subscribe('af-upload.file', file);
    }
  });
});
