const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewear/requireLogin");
const Transection = mongoose.model("Transection");
const User = mongoose.model("User");

router.get("/mytransection", requireLogin, (req, res) => {
  User.find({ phoneNum: req.user.phoneNum })
    .select("-_id -phoneNum -availableAmound -password -tPin")
    // .populate("transection", "_id sender recever amount date")
    .then((transection) => {
      if (!transection.transection == "") {
        console.log(transection);
        return res.json({ transection: transection.transection });
      } else {
        return res.status(402).json({ massege: "you had no transection yet" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addmoney", requireLogin, (req, res) => {
  User.findOneAndUpdate(
    { phoneNum: req.user.phoneNum },
    { $set: { availableAmound: req.user.availableAmound + req.body.amount } },
    { new: true }
  )
    .select("-password -tPin")
    // .populate("transection", "_id sender recever amount date")
    .then((addmoney) => {
      console.log(addmoney);
      res.json({
        massege:
          "add money(" +
          req.body.amount +
          ") in your wallet current balenced is" +
          addmoney.availableAmound +
          " etc",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/search-user", requireLogin, (req, res) => {
  let userPattern = String(req.body.phoneNum);
  User.find({ phoneNum: userPattern })
    .select("_id name phoneNum")
    .then((user) => {
      console.log({ user });
      res.json({ user: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* router.get("/user/:_id", requireLogin, (req, res) => {
  const { amount, tPin } = req.body;
  User.findOne({ _id: req.params._id })
    .then((user) => {
      if (!amount) {
        return res.status(422).json({ error: "minimum 1 rupees" });
      }else if (req.user.tPin !== tPin) {
        return res.status(422).json({ error: "transection pim not correct" });
      } else {
        const transection = new Transection({
          sender: req.user.phoneNum,
          recever: req.params.phoneNum,
          amount,
        });
        transection.save().then((transection) => {
          try {
            User.findByIdAndUpdate(
              req.user._id,
              {
                $push: { transection: transection._id },
              },
              {
                new: true,
              }
            ).then((err, result) => {
              if (err) {
                console.log(err);
                return res.status(200).json({ transection: err });
              } else {
                console.log(result, "success");
                res.status(422).json(result);
              }
            });
          } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
          }
          try {
            User.findByIdAndUpdate(
              req.params._id,
              {
                $push: { transection: transection._id },
              },
              {
                new: true,
              }
            ).then((err, result) => {
              if (err) {
                console.log(err);
                return res.status(200).json({ transection: err });
              } else {
                console.log(result, "success");
                res.status(422).json(result);
              }
            });
          } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
          }
        });
      }
    })
    .catch((err) => {
      return res.status(456).json({ error: "user not found" });
    });
}); */

/* router.post("/user/:_id", requireLogin, (req, res) => {
  const { amount, tPin } = req.body;
  /* const me = User.findOne({ _id: req.user._id });
  if (me) {
    const mytpin = me.tPin;
    return mytpin;
  } else {
    res.status(500).send("server error");
  } */
/*
  User.findOne({ _id: req.params._id })
    .then((user) => {
      if (!amount) {
        return res.status(422).json({ error: "minimum 1 rupees" });
      } else if (req.user.tPin !== tPin) {
        return res.status(422).json({ error: "transection pim not correct" });
      } else {
        const transection = new Transection({
          sender: req.user.phoneNum,
          recever: req.params.phoneNum,
          amount,
        });
        transection.save().then((transection) => {
          try {
            User.updateMany(
              { _id: { $in: [req.user._id, req.params._id] } },
              { $push: { transection: transection._id } },
              { $set: { availableAmound: availableAmound - amount } },
              { $set: { availableAmound: availableAmound + amount } },
              { new: true }
            )
              .then((result) => {
                console.log(result);
                return res.status(200).json({ transection: result });
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send("server error");
              });
          } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
          }
        });
      }
    })
    .catch((err) => {
      return res.status(456).json({ error: "user not found" });
    });
}); */

router.post("/user/:_id/transfer", requireLogin, (req, res) => {
  const { amount, tPin } = req.body;
  if (amount == 0 || req.user.availableAmound < amount) {
    console.log("minimum 1 rupees or ensufiicient balenced");
    return res.status(422).json({ error: "minimum 1 rupees" });
  } else if (!req.user.tPin == tPin) {
    console.log("transection pim not correct");
    return res.status(422).json({ error: "transection pim not correct" });
  } else {
    User.findOne({ phoneNum: req.params._id })
      .then((userAvailable) => {
        User.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { availableAmound: req.user.availableAmound - amount } },
          { new: true }
        ).then((res) => {
          console.log("-amount");
        });
        const transection = new Transection({
          sender: req.user.phoneNum,
          recever: req.params._id,
          amount,
        });
        transection.save().then((transection) => {
          console.log("-transection");
          try {
            User.updateMany(
              { _id: { $in: [req.user._id, userAvailable._id] } },
              { $push: { transection: transection._id } },
              { new: true }
            )
              .then((re) => {
                console.log(re);
              })
              .catch((err) => {
                console.error(err);
              });
            User.findOneAndUpdate(
              { phoneNum: req.params._id },
              {
                $set: {
                  availableAmound: userAvailable.availableAmound + amount,
                },
              },
              { new: true }
            )
              .then((result) => {
                console.log(result);
                return res.status(200).json({ transection: result });
              })
              .catch((err) => {
                console.error(err);
                // res.status(500).send("server error");
              });
          } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
          }
        });
      })
      .catch((err) => {
        return res.status(456).json({ error: "user not found" });
      });
  }
});

router.get("/user/:_id/transections", requireLogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (
        user.transection.sender !== req.params._id ||
        user.transection.recever !== req.params._id
      ) {
        return res
          .status(422)
          .json({ massege: "no transition commited. trying to send money" });
      } else {
        return res.json({ transections: user.transection });
      }
    })
    .catch((err) => {
      return res.status(456).json({ error: "user not found" });
    });
});

module.exports = router;
