const asyncHandler = require("express-async-handler");
const image = require("./Scema");

const postImage = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({ error: "no file found" })

        } const imageFile = Image({
            filename: req.file.filename,
            filepath: req.file.path,
        })

        const savedImage = await imageFile.save();

        res.status(200).json(savedImage);

    } catch (err) {
        console.log(err);
    }
})

module.exports = { postImage };

