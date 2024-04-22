import express from "express";
import mongoose from "mongoose";
import { User } from "./models/User.js";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Post from './models/Post.js';
import imageToBase64 from 'image-to-base64';
import Comment from './models/Comment.js';
import jwt from 'jsonwebtoken';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


function setUser(user) {
    return jwt.sign(
        {
            id: user._id
        },
        "Shhh"
    );
}

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const tokenWithoutBearer = token.split(' ')[1];
    const decode = jwt.verify(tokenWithoutBearer, "Shhh")
    req.userID = decode.userId
    next();
}
//login verification route
app.get('/api/verify', isAuthenticated, (req, res) => {
    res.status(200).json({ message: "User authorized" });
});
app.get('/api/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://debashishadcs:qwerty12345@kinexa.nbb9j9q.mongodb.net/Kinexa`);
        console.log(`Mongoose Atlas db is connected with ${mongoose.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
};

connectDB();

app.post("/register", async (req, res) => {
    try {
        if (req.body.password == req.body.cnfPassword) {
            var form = new IncomingForm(
                {
                    allowEmptyFiles: true,
                    minFileSize: 0
                }
            );
            form.keepExtension = true;
            form.allowEmptyFiles = true;
            let fields;
            let files;
            try {
                [fields, files] = await form.parse(req);
            }
            catch (error) {
                console.log(error);
            }
            if (files) {
                var oldPath = files.coverPic[0].filepath;
                const og_file_path1 = files.coverPic[0].originalFilename;
                const og_file_path2 = files.profilePic[0].originalFilename;
                const hexaPass = await bcrypt.hash(fields.password[0], 5);
                const newUser = new User({
                    firstName: fields.firstName[0],
                    lastName: fields.lastName[0],
                    userName: fields.userName[0],
                    password: hexaPass,
                    email: fields.email[0],
                    phoneNumber: fields.phoneNumber[0],
                    bio: fields.bio[0],
                    profession: fields.profession[0],
                    interest: fields.interest[0],
                    dob: fields.dob[0],
                    gender: fields.gender[0],
                    coverPic: og_file_path1,
                    profilePic: og_file_path2,
                    country: fields.country[0],
                    state: fields.state[0],
                    city: fields.city[0]
                });
                const result = await newUser.save();
                const coverPic = path.join(__dirname, './uploads/coverPic', result._id.toString());
                const profilePic = path.join(__dirname, './uploads/profilePic', result._id.toString());
                if (!fs.existsSync(coverPic)) {
                    fs.mkdirSync(coverPic);
                }
                if (files.coverPic) {
                    const file = files.coverPic[0].filepath;
                    const newFilePath = path.join(coverPic, files.coverPic[0].originalFilename);
                    // console.log("THis is new file path" + newFilePath);
                    try {
                        fs.copyFile(file, newFilePath, function (err) {
                            if (err) throw err;
                        });
                        await User.updateOne({ _id: newUser._id });
                        // console.log("Image stored successfully.");
                    } catch (error) {
                        console.error("Error storing image:", error);
                    }
                } else {
                    console.error("No image file found.");
                }

                if (!fs.existsSync(profilePic)) {
                    fs.mkdirSync(profilePic);
                }
                if (files.profilePic) {
                    const file = files.profilePic[0].filepath;
                    const newFilePath = path.join(profilePic, files.profilePic[0].originalFilename);
                    try {
                        fs.copyFile(file, newFilePath, function (err) {
                            if (err) throw err;
                        });
                        // console.log(file);
                        await User.updateOne({ _id: newUser._id });
                    } catch (error) {
                        console.error("Error storing image:", error);
                    }
                } else {
                    console.error("No image file found.");
                }
                console.log("Registered Successfully");
                return res.send('sucess');
            }
        }
    } catch (error) {
        console.error("Error in registering the user", error);
        res.status(500).json({ error: "Failed to register user...." });
    }
});

app.post('/uploads/images', (req, res) => {
    const file_path = __dirname + "/uploads/coverPic/" + req.body.user_id + "/" + req.body.img_name;
    // console.log(file_path);
    imageToBase64(file_path)
        .then(
            (response) => {
                res.status(200).send(response)
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
});

app.post('/uploads/imagesProfile', (req, res) => {
    // console.log("UserID -> " + req.body.user_id)
    // console.log("Image -> " + req.body.img_name)
    const file_path = __dirname + "/uploads/profilePic/" + req.body.user_id + "/" + req.body.img_name;
    // console.log("File Path is ->" + file_path);
    imageToBase64(file_path)
        .then(
            (response) => {
                res.status(200).send(response)
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
});

app.post('/uploads/posts', (req, res) => {
    const file_path = __dirname + "/uploads/Post_Images/" + req.body.post_id + "/" + req.body.img_name;
    imageToBase64(file_path)
        .then(
            (response) => {
                res.status(200).send(response)
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
});

app.post("/upload-post", async (req, res) => {
    try {
        var form = new IncomingForm({
            allowEmptyFiles: true,
            minFileSize: 0
        });
        form.keepExtension = true;
        form.allowEmptyFiles = true;
        let fields;
        let files;
        try {
            [fields, files] = await form.parse(req);
        } catch (error) {
            console.log(error);
        }
        if (files) {
            var oldPath = files.imageUpload[0].filepath;
            const og_file_path = files.imageUpload[0].originalFilename;
            // console.log(og_file_path);
            const newPost = new Post({
                imageUpload: og_file_path,
                caption: fields.caption[0]
            });
            const result = await newPost.save();
            const Post_Images = path.join(__dirname, './uploads/Post_Images', result._id.toString());
            if (!fs.existsSync(Post_Images)) {
                fs.mkdirSync(Post_Images);
            }
            // console.log("This is my post", Post_Images);
            if (Post_Images && Post_Images.length > 0) {
                const file = files.imageUpload[0].filepath;
                // console.log("File to copy:", file);
                const newFilePath = path.join(Post_Images, files.imageUpload[0].originalFilename);
                // console.log("Destination path:", newFilePath);
                try {
                    fs.copyFile(file, newFilePath, function (err) {
                        if (err) throw err;
                        console.log("Image stored successfully.");
                    });
                } catch (error) {
                    console.error("Error storing image:", error);
                }
            }
            else {
                console.error("No image file found.");
            }
            return res.send('success');
        }
    } catch (error) {
        console.error("Error in registering the user", error);
        res.status(500).json({ error: "Failed to register user...." });
    }
});

app.post("/user-comment", async (req, res) => {
    try {
        const { commentContent, postId } = req.body; // Correctly access postId from req.body
        const newComment = new Comment({ commentContent, postID: postId }); // Use postId to assign to the 'post' field
        await newComment.save();
        res.status(201).json({ message: "Comment saved successfully", comment: newComment });
    } catch (error) {
        console.error("Error saving comment:", error);
        res.status(500).json({ error: "Failed to save comment" });
    }
});

app.post('/api/login', async (req, res) => {
    // console.log("You have logged in");
    const { username, password } = req.body;
    // console.log(req.body);
    // try {
    const user = await User.findOne({ userName: username });
    // console.log(user);
    if (user == null) {
        return res.status(401).json({ success: false, message: 'User not found' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    // console.log("You have successfully found the user");
    // console.log(user);
    const token = setUser(user);
    console.log(token);
    return res.status(200).json({ success: true, message: 'Login successful', token });
    // } catch (err) {
    //    return res.status(500).json({ success: false, message: 'Server error' });
    // }
});


app.listen(port, () => {
    console.log(`🚀 Listening to the server at port ${port}`);
});