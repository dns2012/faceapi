const express   = require('express');
const router    = express.Router();
const multer    = require('multer');
const storage   = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../../public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get("/", (req, res, next) => {
    res.status(200).json({
        message : "Present API"
    })
})

router.post("/image", upload.single('image'), (req, res, next) => {
    console.log(req.file);
    res.status(200).json({
        message : "uploaded",
        link : "https://facerest.herokuapp.com/"+req.file.filename
    })
})

module.exports = router;