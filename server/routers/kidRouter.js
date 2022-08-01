const router = require("express").Router();
const Kid = require("../models/kidModel");
const User = require("../models/userModel");
const auth = require("../middlewares/Auth");
const { default: mongoose } = require("mongoose");

//adding kid
router.post("/addKid", auth, async (req, res) => {
  try {
    if (req.userType === "Parent") {
      const { firstName, lastName, dateOfBirth } = req.body;
      //
      parentUname = req.username;
      parentId = req.userId;
      //validation
      if (!firstName || !lastName || !dateOfBirth) {
        return res
          .status(400)
          .json({ error: "Please enter all required fields" });
      }
      const existingKid = await Kid.findOne({
        lastName: lastName,
        firstName: firstName,
      });
      if (existingKid) {
        return res
          .status(400)
          .json({ error: "A kid with those information already exists" });
      }
      //saving the kid to the DB

      const newKid = new Kid({
        firstName,
        lastName,
        dateOfBirth,
        parentId,
        parentUname,
      });

      const savedKid = await newKid.save();

      //adding the kid to the parent kids array
      var addedKid = mongoose.Types.ObjectId(savedKid._id);
      User.updateOne(
        { _id: parentId },
        { $push: { options: addedKid } },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
      //
      res.send("Kid added successfully");
    } else {
      res.json({ error: "You are not a parent" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Ooops! error in adding the kid" });
  }
});
//getting kids for a specific parent
router.get("/", auth, async (req, res) => {
  try {
    const parentId = req.userId;
    const Kids = await Kid.find({ parentId: parentId });
    res.status(200).json(Kids);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Ooops! error can't get kids" });
  }
});

//get Kid by id
router.get("/:id", auth, async (req, res) => {
  try {
    const Kidinfo = await Kid.findById(mongoose.Types.ObjectId(req.params.id));
    res.status(200).json(Kidinfo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Ooops! error can't get this specific kid" });
  }
});
//delete kid
router.delete("/delete/:kidId", auth, async (req, res) => {
  try {
    const kidId = mongoose.Types.ObjectId(req.params.kidId);
    Kid.findById(kidId, async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        const parentUname = docs.parentUname;
        // console.log(parentUname);
        if (parentUname === req.username) {
          await Kid.deleteOne({ _id: kidId });
          await User.updateOne(
            { username: req.username },
            {
              $pullAll: {
                kids: [{ _id: kidId }],
              },
            }
          );
          res.json({ message: "deleted successfully" });
        } else {
          res.send({ message: "unauthorized" });
        }
      }
    });
  } catch (error) {
    res.send({ message: " Ooops! error in deleting the kid" });
  }
});
//update kid
router.put("/update/:kidId", auth, async (req, res) => {
  try {
    const kidId = mongoose.Types.ObjectId(req.params.kidId);
    const { firstName, lastName, dateOfBirth } = req.body;

    Kid.findById(kidId, async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        const parentUname = docs.parentUname;
        if (parentUname === req.username) {
          //todo existing kid with the same data
          // const existingKid = await Kid.findOne({
          //   lastName: lastName,
          //   firstName: firstName,
          //   dateOfBirth: dateOfBirth,
          // });
          // console.log(existingKid);
          // if (existingKid) {
          //   return res
          //     .status(400)
          //     .json({ error: "A kid with those information already exists" });
          // }
          //todo existing kid with the same data
          const updatedkid = await Kid.findOneAndUpdate(
            { _id: kidId },
            {
              $set: {
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
              },
            },
            { new: true }
          );
          res.json({ message: "updated successfully" });
        } else {
          res.send({ message: "unauthorized" });
        }
      }
    });
  } catch (error) {
    res.send({ message: "Ooops! error in updating the kid" });
    console.log(error);
  }
});

module.exports = router;
