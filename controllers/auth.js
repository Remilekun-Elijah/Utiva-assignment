const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');
const Mail = require('../config/mail');

exports.signup = async function (req, res) {

  const {
    name,
    email,
    number,
    age,
    password
  } = res.locals.validatedBody
  const user = {
    name,
    email,
    number,
    age
  }

  const hash = bcrypt.hashSync(password, salt);
  user.password = hash;

  UserModel.create(user).then(data => {
    res.status(201).json({
      message: 'User created successfully',
      status: "success",
      data
    })
  }).catch(error => {
    let message;
    if (error.code === 11000) {
      message = 'User already exists'
    } else message = 'Something went wrong'
    res.status(500).json({
      message: 'Error creating user',
      status: "error",
      data: message
    })

  })

}

exports.login = async function (req, res) {
  const {
    email,
    password
  } = res.locals.validatedBody;
  try {
    // finds the user
    const user = await UserModel.findOne({
      email
    });

    // checks if user exists
    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: "error",
        data: null
      });
    } else {
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({
          id: user._id
        }, 'secret', {
          expiresIn: '3d'
        });

        res.status(200).json({
          message: 'User logged in successfully',
          status: "success",
          data: token
        });
      } else {
        res.status(401).json({
          message: 'Password incorrect',
          status: "error",
          data: null
        });
      }
    }

  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      status: "error",
      data: error.message
    });
  }
}

exports.changePassword = async function (req, res) {
  const {
    oldPassword,
    newPassword
  } = res.locals.validatedBody;
  const {
    userId
  } = res.locals;

  try {
    const user = await UserModel.findById(userId);
    const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
    if (passwordMatch) {
      const hash = bcrypt.hashSync(newPassword, salt);
      const updatedData = await UserModel.findByIdAndUpdate(userId, {
        password: hash
      })

      if (updatedData) {
        res.status(200).json({
          message: 'Password changed successfully',
          status: "success"
        });

      } else {
        res.status(200).json({
          message: 'Failed to change password',
          status: "error",
          data: null
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      status: "error",
      data: error.message
    });
  }
}

exports.forgotPassword = async function (req, res) {
  const {
    email
  } = res.locals.validatedBody;
  try {
    const user = await UserModel.findOne({
      email
    });
    if (!user) {
      res.status(404).json({
        message: 'User not found',
        status: "error",
        data: null
      });
    } else {

      const token = Math.random().toString(10).substring(2, 8)
      Mail.sendMail({
        to: email,
        subject: 'Reset Password',
        body: `Please use the token below to reset your password: \n ${token}`
      });
      const updatedData = await UserModel.findByIdAndUpdate(user._id, {
        token
      }, {
        new: true
      })

      res.status(200).json({
        message: 'Your reset password token has been sent to your email',
        status: "success",
        data: updatedData
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      status: "error",
      data: error.message
    });
  }
}

exports.resetPassword = async function (req, res) {
  const {
    token,
    password
  } = res.locals.validatedBody;
  try {
    const user = await UserModel.findOne({
      token
    });
    if (!user) {
      res.status(404).json({
        message: 'Invalid token',
        status: "error",
        data: null
      });
    } else {

      const hash = bcrypt.hashSync(password, salt);
      const updatedData = await UserModel.findByIdAndUpdate(user._id, {
        password: hash,
        token: null
      }, {new: true})

      res.status(200).json({
        message: 'Password reset successful',
        status: "success",
        data: updatedData
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      status: "error",
      data: error.message
    });
  }
}