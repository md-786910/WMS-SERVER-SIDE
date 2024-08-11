const Video = require("../models/video");
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const API_KEY = process.env.API_KEY
module.exports = {
    postVideo: async (req, res) => {
        try {
            await Video.collection.drop();
            setTimeout(async () => {
                const resp = await youtube.playlistItems.list({
                    key: API_KEY,
                    part: 'id,snippet',
                    playlistId: req.body.title,
                    maxResults: 50,
                })

                let { data } = resp;
                data?.items.forEach(async (d) => {
                    await Video.create({
                        videoId: d.snippet?.resourceId?.videoId,
                        title: d.snippet?.title,
                        image: d.snippet?.thumbnails?.standard?.url ?? "",
                        publishedAt: d.snippet?.publishedAt
                    })
                })
                let token = data?.nextPageToken
                let count = 4;
                while (count--) {
                    const resp1 = await youtube.playlistItems.list({
                        key: API_KEY,
                        part: 'id,snippet',
                        playlistId: req.body.title,
                        maxResults: 50,
                        pageToken: token
                    })
                    let { data } = resp1;
                    data?.items.forEach(async (d) => {
                        await Video.create({
                            videoId: d.snippet.resourceId?.videoId,
                            title: d.snippet?.title,
                            image: d.snippet?.thumbnails?.standard?.url,
                            publishedAt: d.snippet?.publishedAt
                        })
                    })
                    token = data.nextPageToken
                }
            }, 1000);
            res.status(200).json({ message: "video add successfully", data: [], success: true })
        } catch (error) {
            res.status(404).json({ message: error.message, success: false })
        }
    },
    getVideo: async (req, res) => {
        try {
            const data = await Video.find({}).sort({ publishedAt: 1 })
            res.status(200).json({ message: "video add successfully", data: data, success: true })
        } catch (error) {
            res.status(404).json({ message: error.message, success: false })
        }
    },

}