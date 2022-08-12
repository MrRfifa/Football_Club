const router = require("express").Router();
const User = require("../models/userModel");
const Kid = require("../models/kidModel");
const Contact = require("../models/contactModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/Auth");

//register
router.post("/reg", async (req, res) => {
  try {
    const { username, password, passwordVerify, type } = req.body;

    //validation
    if (!username || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    } else if (password.length < 8) {
      return res.status(400).json({ error: "Password must be 8" });
    } else if (password !== passwordVerify) {
      return res.status(400).json({ error: "Please enter the same password" });
    }
    //finding if existing user with the same username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An account with this username already exists" });
    }

    //hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account to database
    const newUser = new User({
      username,
      passwordHash,
      type,
    });
    const savedUser = await newUser.save();

    //Creating the token
    const token = jwt.sign(
      {
        user: savedUser._id,
        userType: savedUser.type,
        userName: savedUser.username,
      },
      process.env.JWT_SECRET
    );
    //res.json({ password: passwordHash, token: token });
    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Registred successfully!" });
  } catch (error) {
    //res.json(error);
    res.status(500).send();
  }
});

//log in
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        error: "Wrong username or password",
      });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong username or password",
      });
    }
    //Creating the token

    const token = jwt.sign(
      {
        user: existingUser._id,
        userType: existingUser.type,
        userName: existingUser.username,
      },
      process.env.JWT_SECRET
    );
    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Loggedin successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send({ message: "logged out successfully" });
});
//verifying logged in or not
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send({
        loggedIn: false,
        type: "nothing",
        username: "no one",
        userid: "null",
      });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      res.send({
        loggedIn: true,
        type: verified.userType,
        username: verified.userName,
        userid: verified.user,
      });
    }
  } catch (error) {
    res.json(false);
  }
});

//change password
router.put("/changepassword", auth, async (req, res) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  const user = await User.findOne({ username: req.username });
  if (!oldPassword || !newPassword || !newPasswordConfirm) {
    return res.status(400).json({ error: "Please enter all required fields" });
  } else if (newPassword.length < 8) {
    return res.status(400).json({ error: "Password must be 8" });
  } else if (newPassword !== newPasswordConfirm) {
    return res.status(400).json({ error: "Please enter the same password" });
  }
  const passwordCorrect = await bcrypt.compare(oldPassword, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "Wrong Password entered",
    });
  } else {
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    User.findOneAndUpdate(
      {
        username: req.username,
      },
      { $set: { passwordHash: newPasswordHash } },
      {
        returnNewDocument: true,
      }
    ).then(
      (data) => {
        //console.log("Data", data);
      },
      (err) => {
        //console.log("Error Update", err);
      }
    );
    return res.json({ message: "Password updated successfully" });
  }
});

//change username
router.put("/changeusername", auth, async (req, res) => {
  const { newUsername, password } = req.body;

  const user = await User.findOne({ username: req.username });
  if (!newUsername || !password) {
    return res.status(400).json({ error: "Please enter all required fields" });
  } else if (password.length < 8) {
    return res.status(400).json({ error: "Password must be 8" });
  }
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  //existing user with same new username
  const existingUser = await User.findOne({ newUsername });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "An account with this username already exists" });
  }

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "Wrong Password entered",
    });
  } else {
    User.findOneAndUpdate(
      {
        _id: user._id,
      },
      { $set: { username: newUsername } },
      {
        returnNewDocument: true,
      }
    ).then(
      (data) => {
        // console.log("Data", data);
      },
      (err) => {
        // console.log("Error Update", err);
      }
    );
    Kid.updateMany(
      {
        parentId: user._id,
      },
      { $set: { parentUname: newUsername } },
      {
        returnNewDocument: true,
      }
    ).then(
      (data) => {
        // console.log("Data", data);
      },
      (err) => {
        // console.log("Error Update", err);
      }
    );
    return res.json({ message: "Username updated successfully" });
  }
});

//contacting admins
router.post("/contactanonym", async (req, res) => {
  try {
    const { identifier, subject, description } = req.body;
    if (!identifier || !subject || !description) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    const newMessage = new Contact({
      identifier,
      subject,
      description,
      isAnonymous: true,
    });
    await newMessage.save();
    res.send({ message: "Your message submitted successfully!" });
  } catch (error) {
    res.status(400).send({ error: "Ooops! an error occured" });
  }
});
module.exports = router;
