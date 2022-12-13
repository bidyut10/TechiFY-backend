const AuthorModel = require("../models/authorModel");
const bcrypt= require('bcrypt');
// const authorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    //edge cases according to authormodel
    //if body is empty
    let data = req.body;
    const {name,email,phone, password}=data
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Please provide your author details in body",
      });
    }

    //empty space
    if (name.trim().length === 0 && password.trim().length === 0 && phone.trim().length ===0){
      res.status(400).send("Missing Field")
    }
    //checking alphabet
    if (!/^\s*([a-zA-Z])([^0-9]){2,64}\s*$/.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "name should be in alphabat type" });
    }

    //checking num
    if (!/^[0-9]*$/.test(phone)) {
      return res
        .status(400)
        .send({ status: false, msg: "phoneNo should be in Num type" });
    }

    //checking emailid is registered or not and also email format valid or not
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter a valid Email" });
    }

    //checking email is registerd or not
    let emailId = await AuthorModel.findOne({ email: email });
    if (emailId) {
      return res
        .status(400)
        .send({ status: false, msg: "Email is already registerd" });
    }
    //checking phoneNo is registerd or not
    let phoneFind = await AuthorModel.findOne({ phone: phone});
    if (phoneFind) {
      return res
        .status(400)
        .send({ status: false, msg: "phoneNo No is already registerd" });
    }

    const saltRounds = 10;
    const bcryptPass = await bcrypt.hash(password, saltRounds);
    data["password"] = bcryptPass;

    let authorCreated = await AuthorModel.create(data);
    {
      return res.status(201).send({ data: data });
    }
  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
};

const authorDetails = async (req, res) => {
  const authorId = req.params.authorId;
  const author = await AuthorModel.findOne({ _id: authorId });
  console.log(author);
  res.status(200).send({ data: author });
};

const loginUser = async function (req, res) {
  try {
    //edge case for email and pasword
    //checking body and email-password must be present
    let data = req.body;
    const {email, password}=data
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Please provide your Blog details in body",
      });
    }
    //empty space
    if (password.trim() === 0) {
      res.status(400).send("Missing Field")
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "Password is required" });
    }

    //checking emailid is registered or not and also email format valid or not
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter a valid Email" });
    }
    //checking Login Credentials
    const user = await AuthorModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ status: false, message: "Invalid Author, Login Credentials Doesn't Matched" });
    }

    // console.log(user)
    //checking req body password and DB's decryptPassword is same or not using "bcrypt package"
    const decrypPassword = user.password;
    // console.log(decrypPassword)
    const pass = await bcrypt.compare(password, decrypPassword);
    if (!pass) {
      return res
        .status(400)
        .send({ status: false, message: "Password Incorrect" });
    }
    // data["password"]=decrypPassword
    // console.log(data["password"])
    // console.log(password);

    //checking both feilds are matched or not
    let author = await AuthorModel.findOne({
      email: email,
      password: decrypPassword
    });
    if (!author) {
      return res
        .status(401)
        .send({ status: false, msg: "Email and Password does'nt match" });
    } else {
      return res
        .status(201)
        .send({ status: true, msg: "logIn Successful", user: author });
    }
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
};

module.exports= {createAuthor, loginUser, authorDetails}