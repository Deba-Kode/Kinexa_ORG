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
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./SchemalGQL.js";
import resolvers from './resolvers.js';
import otpGenerator from 'otp-generator';
import session from 'express-session';
import transporter from './email.js';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false
}));

function setUser(user) {
    return jwt.sign({
        id: user._id
    }, "Shhh"
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

let UserLoggedInFront = null;
const handleNameUserLog = (req, res) => {
    const { UserName } = req.body;
    UserLoggedInFront = UserName;
    res.status(200).json({ message: "UserName received" });
};

app.post('/NameUserLog', handleNameUserLog);

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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    cors: {
        origin: [
            "http://localhost:3000",
            "http://192.168.0.164:3000",
        ],
        methods: ["GET", "POST"]
    },
    context: ({ req }) => {
        return {
            UserLoggedInFront
        };
    },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Listening to the server at port ${port}`);
    });
});

app.get('/comments/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postID: postId }).populate('userID', 'userName');
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.post("/update-user", async (req, res) => {
    try {
        const userId = req.body._id;
        console.log("User Id I have got is:", userId);
        const updatedUserData = req.body;
        delete updatedUserData._id;
        await User.findByIdAndUpdate(userId, updatedUserData);
        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "Failed to update user data" });
    }
});

app.get('/user-liked-posts', async (req, res) => {
    try {
        const { uID } = req.query;
        const user = await User.findById(uID);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const likedPosts = await Post.find({ likes: uID });
        res.status(200).json(likedPosts);
    } catch (error) {
        console.error("Error fetching liked posts:", error);
        res.status(500).json({ error: "Failed to fetch liked posts" });
    }
});

app.post('/like-post', async (req, res) => {
    try {
        const { post_id, uID } = req.body;
        const post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const likedIndex = post.likes.indexOf(uID);
        if (likedIndex !== -1) {
            post.likes.splice(likedIndex, 1);
            await post.save();
            return res.status(200).json({ message: "Post unliked successfully" });
        } else {
            post.likes.push(uID);
            await post.save();
            return res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        console.error("Error toggling post like:", error);
        res.status(500).json({ error: "Failed to toggle post like" });
    }
});

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
                    try {
                        fs.copyFile(file, newFilePath, function (err) {
                            if (err) throw err;
                        });
                        await User.updateOne({ _id: newUser._id });
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
    const file_path = __dirname + "/uploads/profilePic/" + req.body.user_id + "/" + req.body.img_name;
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


app.post('/uploads/imagesProfileSide', (req, res) => {
    const file_path = __dirname + "/uploads/profilePic/" + req.body.user_id + "/" + req.body.img_name;
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
            const userID = fields.userID;
            const newPost = new Post({
                imageUpload: og_file_path,
                caption: fields.caption[0],
                userID: userID
            });
            const result = await newPost.save();
            const Post_Images = path.join(__dirname, './uploads/Post_Images', result._id.toString());
            if (!fs.existsSync(Post_Images)) {
                fs.mkdirSync(Post_Images);
            }
            if (Post_Images && Post_Images.length > 0) {
                const file = files.imageUpload[0].filepath;
                const newFilePath = path.join(Post_Images, files.imageUpload[0].originalFilename);
                try {
                    fs.copyFile(file, newFilePath, function (err) {
                        if (err) throw err;
                    });
                } catch (error) {
                    console.error("Error storing image:", error);
                }
            } else {
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
        const { commentContent, postId, userId } = req.body;
        const newComment = new Comment({
            commentContent,
            postID: postId,
            userID: userId
        });
        await newComment.save();
        res.status(201).json({ message: "Comment saved successfully", comment: newComment });
    } catch (error) {
        console.error("Error saving comment:", error);
        res.status(500).json({ error: "Failed to save comment" });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ userName: username });
    if (user == null) {
        return res.status(401).json({ success: false, message: 'User not found' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    const token = setUser(user);
    return res.status(200).json({ success: true, message: 'Login successful', token, user });
});

const generateOTP = () => {
    return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
};

app.post('/forgot', async (req, res) => {
    try {
        const fmail = req.body.email;
        const user = await User.findOne({ email: fmail }).maxTimeMS(30000);
        if (!user) {
            console.log("Not a valid User....");
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        req.session.resetToken = resetToken;
        req.session.email = fmail;
        user.resetTokenExpiration = Date.now() + 600000;
        await user.save();
        const resetLink = `http://localhost:3000/reset-pass?resettoken=${resetToken}`;
        const mailOptions = {
            from: 'harshalp1002@gmail.com',
            to: fmail,
            subject: 'Password Reset Request',
            html: `<P>Please click on the following link to reset your password: ${resetLink}</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw new Error('Failed to send email');
            } else {
                console.log('Email sent: ');
                res.json({ ans: " Link has been sent on your email " })
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'err': 'Please enter valid email address' });
    }
});

app.post('/reset', async (req, res) => {
    try {
        const { password, confirm_pass, resetToken } = req.body;
        if (password !== confirm_pass) {
            throw new Error("Passwords do not match");
        }
        const user = await User.findOne({ resetToken: req.body.resetToken });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        let temp = user.email;
        await user.save();
        const mailOptions = {
            from: 'harshalp1002@gmail.com',
            to: temp,
            subject: 'Password Reset Request',
            html: `<P> Dear sir/mam your password has been reset </p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw new Error('Failed to send email');
                res.json({ 'Error ': 'Failed to send email' })
            } else {
                console.log('Email sent : your password has been updated successful');
                res.send(" link sent on email ")
            }
        });
        res.send(' password updated successful ');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error in resetting the password');
    }
});

app.get('/uploads/posts/:postId/:imageName', (req, res) => {
    const postId = req.params.postId;
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, `./uploads/Post_Images/${postId}/${imageName}`);
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            console.error('Error reading image:', err);
            return res.status(500).json({ error: 'Failed to read image' });
        }
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
    });
});