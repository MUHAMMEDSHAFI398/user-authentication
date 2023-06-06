const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cities = require("../models/cityModel");
dotenv.config();

module.exports = {
  register: async (req, res, next) => {
    try {
      const userExist = await user.findOne({ email: req.body.email });
      if (userExist) {
        return res.status(409).json({
          message: "user already exist",
        });
      } else {
        const cityExist = await cities.findOne({ cityName: req.body.city });
        if (!cityExist) {
          const cityName = cities({
            cityName: req.body.city,
          });
          cityName.save().then(async (city) => {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userData = user({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              city: city._id,
            });
            userData
              .save()
              .then((user) => {
                res.send({
                  status: true,
                  message: "user created successfully",
                  user: {
                    id: user._id,
                    email: user.email,
                  },
                });
              })
              .catch((err) => {
                res.send({
                  status: false,
                  message: "something went wrong",
                  error: err,
                });
              });
          });
        } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const userData = user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            city: cityExist._id,
          });
          userData
            .save()
            .then((user) => {
              res.send({
                status: true,
                message: "user created successfully",
                user: {
                  id: user._id,
                  email: user.email,
                },
              });
            })
            .catch((err) => {
              res.send({
                status: false,
                message: "something went wrong",
                error: err,
              });
            });
        }
      }
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    const data = req.body;
    try {
      const userData = await user.findOne({ email: data.email });
      if (userData) {
        const passwordMatch = await bcrypt.compare(
          data.password,
          userData.password
        );
        if (passwordMatch) {
          const payload = {
            email: data.email,
          };
          jwt.sign(
            payload,
            process.env.USER_SECRET,
            {
              expiresIn: 3600000,
            },
            (err, token) => {
              if (err) console.error("There is some error in token", err);
              else {
                res.json({
                  status: true,
                  token: `Bearer ${token}`,
                });
              }
            }
          );
        } else {
          res.json({ error: "Invalid email or password" });
        }
      } else {
        res.json({ error: "Invalid email or password" });
      }
    } catch (err) {
      next(err);
    }
  },
  googleLogin: async (req, res, next) => {
    const data = req.body;
    try {
      const userExist = await user.findOne({ email: req.body.email });
      if (!userExist && data.email_verified) {
        const userData = user({
          name: req.body.name,
          email: req.body.email,
        });
        userData
          .save()
          .then(() => {
            const payload = {
              email: data.email,
            };
            jwt.sign(
              payload,
              process.env.USER_SECRET,
              {
                expiresIn: 3600000,
              },
              (err, token) => {
                if (err) console.error("There is some error in token", err);
                else {
                  res.json({
                    status: true,
                    token: `Bearer ${token}`,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.send({
              status: false,
              message: "something went wrong",
              error: err,
            });
          });
      } else if (userExist && data.email_verified) {
        const payload = {
          email: data.email,
        };
        jwt.sign(
          payload,
          process.env.USER_SECRET,
          {
            expiresIn: 3600000,
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                status: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
      }
    } catch (err) {
      next(err);
    }
  },
  authenticate: (req, res, next) => {
    try {
      return res.status(200).send({
        success: true,
        user: {
          id: req.user._id,
          email: req.user.email,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
