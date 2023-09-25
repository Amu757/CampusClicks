const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    filename: {
        type: String,
        require: true,
    },
    filepath: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("image", ImageSchema);