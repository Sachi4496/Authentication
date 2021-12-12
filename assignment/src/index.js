const express = require('express');

const { body, validationResult } = require("express-validator");

const { register , login } = require('./controllers/auth.controller');

const posttController = require('./controllers/post.controller');

const app = express();

app.use(express.json());

app.post("/register",body("email").custom( async (value) => {
    console.log(body.email)

    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);

    const listOfDomain = ["gmail.com","yahoo.com"];

    const email = value.split("@");
    if(!listOfDomain.includes(email[1])){
        throw new Error("we don not accept email from this domain");
    }

    if(!isEmail){
        throw new Error("Please Enter a proper email address");
    }
    // const userEmail = await User.findOne({ email: value }).lean().exec();

    // if(userEmail){
    //     throw new Error("Please try with a different email address");
    // }
    return true;
}),
body("password").custom(async (value) => {
    const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    if(!pass){
        throw new Error("Minimum eight characters, at least one letter and one number");
    }
    return true;
}), register);
app.post("/login",body("email").custom( async (value) => {

    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);

    const listOfDomain = ["gmail.com","yahoo.com"];

    const email = value.split("@");
    if(!listOfDomain.includes(email[1])){
        throw new Error("we don not accept email from this domain");
    }

    if(!isEmail){
        throw new Error("Please Enter a proper email address");
    }
    // const userEmail = await User.findOne({ email: value }).lean().exec();

    // if(userEmail){
    //     throw new Error("Please try with a different email address");
    // }
    return true;
}),
body("password").custom(async (value) => {
    const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    if(!pass){
        throw new Error("Minimum eight characters, at least one letter and one number");
    }
    return true;
}), login)

app.use("/post", posttController);

module.exports = app;