const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema(
    {
        videoId: {
            type: String,
        },
        title: {
            type: String,
        },

        image: {
            type: String,
        },
        publishedAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
    }
);
const Video = mongoose.model("Video", videoSchema)
module.exports = Video;
