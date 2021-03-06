module.exports = function(formidable, Group, fupl) {
  return {
    SetRouting: function(router){
      router.get('/dashboard', this.adminPage);
      router.post('/uploadFile', fupl.Upload.any(), this.uploadFile);

      router.post('/dashboard', this.adminPostPage);
    },
    adminPage: function(req, res){
      res.render('admin/dashboard')
    },
    adminPostPage: function(req, res){
      const newGroup = new Group();
      newGroup.name = req.body.group;
      newGroup.country = req.body.country;
      newGroup.image = req.body.upload;
      newGroup.save((err) => {
        res.render('admin/dashboard');
      })
    },
    uploadFile: function(req, res){
      const form = new formidable.IncomingForm();
      //form.uploadDir = path.join(__dirname, '../public/uploads');

      form.on('file', (field, file) => {
        // fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
        //   if(err) throw err
        //   console.log('File Renamed Successfully');
        // })
      });

      form.on('error', (err) => {
        console.log(err);
      });

      form.on('end', () => {
        console.log('File Upload Is Successfully');
      });

      form.parse(req);
    }
  }
}
