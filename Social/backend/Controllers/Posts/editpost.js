

const jwt = require("jsonwebtoken");
const keys = require('../../config/key');
const Post = require("../../Schema/Post");
const { findById } = require("../../Schema/User");

const editpost = async (req, res) => {
    console.log(req.body);
    const postid = req.params.postid;
    console.log(postid);
    req.body.updated = Date.now();
    console.log(req.body.caption);
    console.log(req.body.photo);
    try {
        const updatedPost = await Post.findByIdAndUpdate(postid, {
            caption: req.body.caption,
            photo: req.body.photo,
            updated: req.body.updated
        }, { new: true }); // Set { new: true } to return the updated document
        console.log(updatedPost);
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

// module.exports = editpost;




module.exports = editpost