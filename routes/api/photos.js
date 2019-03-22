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
    // check if any file was uploaded
    if (Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    const photo = req.files.photo;
    const mainDir = __dirname.split("routes\\api")[0];
    const uploadPath = mainDir + 'public/uploads/' + photo.name;

    // save photo to public/uploads directory
    photo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });

    // extract hashtags from description
    const hashtags = ExtractHashtagsFromString(req.body.desc);

    const newPhoto = new Photo ({
        path: `/uploads/${req.files.photo.name}`,
        description: req.body.desc,
        hashtags: hashtags
    })
    // save to db
    newPhoto.save().then(photo => res.json(photo));
});

module.exports = router;