import nodemailer from "nodemailer";
import sgTrnasport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret  = () => {
    const loginSecret = "#secretKey";
    return loginSecret;
}

const sendMail = (email) => {
    const options =  {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTrnasport(options));
    return client.sendMail(email);
};


export const sendSecretMail = (address, secret) => {
    const email = {
        from: "master@prismagram.com",
        to: address,
        subject: "Login Secret for Prismagram",
        html: `Hello! You login secret is 「<Strong>${secret}</Strong>」<br/>Copy paste on the app/website to log in`
    }
    return sendMail(email);
}

export const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET)