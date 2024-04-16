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

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3001;

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://harshalp1002:Harshal1234@cluster0.qi13yvk.mongodb.net/kinexa",{
            useNewUrlParser: true,
            useUnifiedTopology: true});
        console.log(`Mongoose Atlas db is connected with ${mongoose.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
};

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.post("/register", async (req, res) => {
//     try {
//         const userData = req.body;
//         const hashedPassword = await bcrypt.hash(userData.password, 10);
//         userData.password = hashedPassword;
//         const newUser = new User(userData);
//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully..." });
//     } catch (error) {
//         console.error("Error in registering the user", error);
//         res.status(500).json({ error: "Failed to register user...." });
//     }
// });

app.post("/register", async (req, res) => {
    try {
        if (req.body.password == req.body.cnfPassword) {
            // var form = new formidable.IncomingForm({
            //     allowEmptyFiles: true,
            //     minFileSize: 0
            // });
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
                const og_file_path = files.coverPic[0].originalFilename;
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
                    coverPic: og_file_path,
                    profilePic: og_file_path,
                    country: fields.country[0],
                    state: fields.state[0],
                    city: fields.city[0]
                });
                const result = await newUser.save();
                // if (files.coverPic[0].originalFilename != "") {
                //     var folderpath = path.join(__dirname, './uploads/' + result._id);
                //     console.log(__dirname);
                //     if (!fs.existsSync(folderpath)) {
                //         fs.mkdir(path.join(__dirname, './uploads/' + result._id));
                //     }
                //     var newpath = path.join(__dirname, './uploads/' + result._id + "/" + files.coverPic[0].originalFilename);
                //     fs.copyFile(files.coverPic[0].filepath, newpath, function (err) {
                //         if (err) {
                //             console.error(err);
                //             return res.status(500).send('Internal Server Error');
                //         }
                //     });
                // }

                // if (files.coverPic && files.coverPic.length > 0) {
                //     const og_file_path = files.coverPic[0].originalFilename;
                //     newUser.coverPic = og_file_path;

                //     // Move coverPic file to desired location
                //     console.log(__dirname);
                //     const folderpath = path.join(__dirname+ './uploads/' + newUser._id);
                //     if (!fs.existsSync(folderpath)) {
                //         fs.mkdirSync(folderpath);
                //     }
                //     const newpath = path.join(folderpath, files.coverPic[0].originalFilename);
                //     fs.copyFileSync(files.coverPic[0].path, newpath);
                // }

                // if (files.profilePic && files.profilePic.length > 0) {
                //     const og_profile_path = files.profilePic[0].originalFilename;
                //     newUser.profilePic = og_profile_path;

                //     // Move profilePic file to desired location
                //     const profileFolderPath = path.join(__dirname+ './uploads/profile' + newUser._id );
                //     if (!fs.existsSync(profileFolderPath)) {
                //         fs.mkdirSync(profileFolderPath);
                //     }
                //     const newProfilePath = path.join(profileFolderPath, files.profilePic[0].originalFilename);
                //     fs.copyFileSync(files.profilePic[0].path, newProfilePath);
                // }

                // if (files.coverPic && files.coverPic.length > 0) {
                //     const og_file_path = files.coverPic[0].originalFilename;
                //     newUser.coverPic = og_file_path;
                
                //     // Convert newUser._id to string
                //     const userIdString = newUser._id.toString();
                
                //     const folderpath = path.join(__dirname, './uploads/');
                
                //     // Move coverPic file to desired location
                //     const newFilePath = path.join(folderpath, files.coverPic[0].originalFilename);
                //     fs.writeFileSync(newFilePath, fs.readFileSync(files.coverPic[0].path));
                // }
                
                // if (files.profilePic && files.profilePic.length > 0) {
                //     const og_profile_path = files.profilePic[0].originalFilename;
                //     newUser.profilePic = og_profile_path;
                
                //     // Convert newUser._id to string
                //     const userIdString = newUser._id.toString();
                
                //     const profileFolderPath = path.join(__dirname, './uploads/');
                
                //     // Move profilePic file to desired location
                //     const newProfilePath = path.join(profileFolderPath, files.profilePic[0].originalFilename);
                //     fs.writeFileSync(newProfilePath, fs.readFileSync(files.profilePic[0].path));
                // }

            //     if (files.coverPic && files.coverPic.length > 0) {
            //         const og_file_path = files.coverPic[0].originalFilename;
            //         newUser.coverPic = og_file_path;
                
            //         // Move coverPic file to desired location
            //         const newFilePath = path.join(__dirname, './uploads/', files.coverPic[0].originalFilename);
            //         fs.writeFileSync(newFilePath, fs.readFileSync(files.coverPic[0].path));
            //     }

            //     const userFolderPath = path.join(__dirname, '../uploads', newUser._id.toString());
            // if (!fs.existsSync(userFolderPath)) {
            //     fs.mkdirSync(userFolderPath);
            // }

            // if (files.profilePhoto) {
            //     const file = files.profilePhoto;
            //     const newFilePath = path.join(userFolderPath, file[0].originalFilename);
            //     await fs.promises.rename(file[0].filepath, newFilePath);

            //     await User.updateOne({ _id: newUser._id }, { $set: { profilePhoto: newFilePath } })
            // }

                
            //     if (files.profilePic && files.profilePic.length > 0) {
            //         const og_profile_path = files.profilePic[0].originalFilename;
            //         newUser.profilePic = og_profile_path;
                
            //         // Move profilePic file to desired location
            //         const newProfilePath = path.join(__dirname, './uploads/', files.profilePic[0].originalFilename);
            //         console.log(files.profilePic[0].path);

            //         fs.writeFileSync(newProfilePath, fs.readFileSync(files.profilePic[0].path));
            //     }

            // const coverPic = path.join(__dirname, './uploads', newUser._id.toString());
            // if (!fs.existsSync(coverPic)) {
            //     fs.mkdirSync(coverPic);
            // }

            // if (files.coverPic) {
            //     const file = files.coverPic;
            //     const newFilePath = path.join(coverPic, file[0].originalFilename);
            //     await fs.promises.rename(file[0].filepath, newFilePath);

            //     await User.updateOne({ _id: newUser._id }, { $set: { coverPic: newFilePath } })
            // }

            const coverPic = path.join(__dirname, './uploads', newUser._id.toString());
if (!fs.existsSync(coverPic)) {
    fs.mkdirSync(coverPic);
}

if (files.coverPic && files.coverPic.length > 0) {
    const file = files.coverPic;
    const newFilePath = path.join(coverPic, file[0].originalFilename);
    try {
        await fs.promises.copyFile(file[0].path, newFilePath);
        await User.updateOne({ _id: newUser._id }, { $set: { coverPic: newFilePath } });
        console.log("Image stored successfully.");
    } catch (error) {
        console.error("Error storing image:", error);
        // Handle error appropriately, e.g., return an error response
    }
} else {
    console.error("No image file found.");
    // Handle case where no image file was uploaded
}


                
                

                console.log("Registered Successfully");
                return res.redirect('/');
            };
        }
        else {
            return res.status(400).redirect("/register");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).redirect('/register');
    }
});


app.listen(port, () => {
    console.log(`🚀 Listening to the port at server ${port}`);
});