var express = require('express');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'public/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+fileExtension);
    },
  })

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, 
      },
  });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send(`Zure izena: ${req.body.izena}  URL-a: <a href='https://ominous-waddle-979459p95gw9cxx5w-3000.app.github.dev/uploads/${req.file.filename}'>${req.file.filename}</a>`);
})


module.exports = router;
