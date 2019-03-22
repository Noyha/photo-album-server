const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');
const ExtractHashtagsFromString = require('../../helpers/ExtractHashtagsFromString');
const Photo = require('../../models/Photo'); //get Photo Model

router.use(fileUpload());

// @route GET api/photos || api/photos?hashtag=name
// @desc Get all photos || Get photos by query
router.get('/', (req, res) => {
    if (req.query.hashtag) {
        Photo.find({ hashtags: req.query.hashtag })
            .then(photos => res.json(photos))
    } else {
        Photo.find()
            .then(photos => res.json(photos))
    }
});

// @route GET api/photos/:id
// @desc Get photos
router.get("/:id", (req, res) => {
    Photo.findById(req.params.id)
        .then(photo => res.json(photo));
});

// @route POST api/photos/upload
// @desc Post a photo
router.post('/upload', (req, res) => {
    let sampleFile, uploadPath, mainDir;

    // check if any file was uploaded
    if (Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;
    mainDir = __dirname.split("routes\\api")[0];
    uploadPath = mainDir + 'public/uploads/' + sampleFile.name;

    // save file to public/uploads directory
    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });

    // extract hashtags from description
    const hashtags = ExtractHashtagsFromString(req.body.desc);

    const newPhoto = new Photo ({
        path: `/uploads/${req.files.sampleFile.name}`,
        description: req.body.desc,
        hashtags: hashtags
    })
    // save to db
    newPhoto.save().then(photo => res.json(photo));
});

module.exports = router;