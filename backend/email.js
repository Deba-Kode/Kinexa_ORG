import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: 'debashishraut9860@gmail.com',
        pass: 'fvch rldb kjnc cpdr'
    }
});
export default transporter;