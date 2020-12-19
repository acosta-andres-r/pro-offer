const router = require('express').Router();
const cloudinary = require('cloudinary').v2

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

// cloudinary configuration
cloudinary.config({
    cloud_name: "dsy1qntg2",
    api_key: "993255289595125",
    api_secret: "sD36cbHlVRl6DIARKkx0bbnjsvE"
});

router
    .route('/')
    .post(async (req, res) => {
        // Log required data
        // console.log("in upload post request");
        // console.log(req.body);
        // console.log(req.file);

        // upload image here
        const result = await cloudinary.uploader.upload(req.file.path,
            options = {
                folder: "pro-offer"
            })

        await unlinkAsync(req.file.path)
        // console.log(result);

        res.json(result)
    })
    .delete(async (req, res) => {
        // Log required data
        // console.log("in delete image");
        // console.log(req.body.publicID);
        const public_id = req.body.publicID

        // delete image
        const result = await cloudinary.uploader.destroy(public_id)

        // console.log(result);
        res.json(result)
    });

module.exports = router;