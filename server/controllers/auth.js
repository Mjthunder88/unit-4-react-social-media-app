require("dotenv").config();
const { SECRET } = process.env;



const { User } = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    { expiresIn: "2 days" }
  );
};

module.exports = {
  login: async (req, res) => {
    try {
        const {username, password} = req.body
        const foundUser = await User.findOne({where: {username: username}})
        if (foundUser) {
            const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
            if (isAuthenticated) {
                const token = createToken(
                    foundUser.dataValues.username,
                    foundUser.dataValues.id
                )
                const exp = Date.now() + 1000 * 60 * 60 * 48;
                res.status(200).send({
                    username: foundUser.dataValues.username,
                    userId: foundUser.dataValues.id,
                    token: token,
                    exp: exp,
                  })
            } else {
                res.status(400).send('Cannon log in')
            }
        } else {
            res.status(400).send('Cannon log in')
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
  },
  logout: (req, res) => {
    console.log("User Logging Out");
  },
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username: username } }); //? Find one is just a query that sequelize provides for us. Saves us from writing the full query oureselves
      if (foundUser) {
        //? The where is just like in a normal query when we say SELECT * FROM user "WHERE" ......
        res.status(400).send("This username already exsists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username: username,
          hashedPass: hash,
        });
        console.log(newUser);
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token: token,
          exp: exp,
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },
};
