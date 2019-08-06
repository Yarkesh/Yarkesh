const User = require('../models/user');
const bcrypt = require('bcrypt');
const errorHandler = require('./errorHandler');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/secretAndUrl').jwtSecret;
const { validationResult } = require('express-validator');
const ProjectMembers = require('../models/projectMembers')
const Project = require('../models/project')

//! FOR TEST ONLY
exports.getUserInfo = (req, res) => {
  User.findAll({
    where: {
      userId: req.user.userId
    }
  }).then(user => {
    return res.status(200).json({
      userInfo: user[0]
    });
  })
    .catch(err => {
      return res.status(500).json({
        err
      })
    });
};

exports.getUserProjects = (req, res) => {
  ProjectMembers.findAll({
    where: {
      memberId: req.user.userId
    },
    include: [{
      model: Project,
      attributes: ['title', 'projectId', 'description', 'createdAt'],
      include: [{
        model: User,
        as: 'creator',
        attributes: ['name']
      }]
    }]
  }).then(projects => {
    return res.status(200).json(
      projects.map(project => project.project)
    );
  })
    .catch(err => {
      return res.status(500).json({
        err
      })
    });
};


exports.signUp = (req, res) => {
  //TODO FIX ERRORHANDLER
  //first we go to validation to validate the errors.  then we get a list and we call errorHandler.handler on it
  //then we get another list called handledErrorsList which contains errors beautifully
  const errorsList = validationResult(req).errors;
  const handledErrorsList = errorHandler.handler(errorsList);
  if (Object.keys(handledErrorsList).length > 0) {
    return res.status(422).json(handledErrorsList);
  }
  //hasing the password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({

        message: 'sign up failed',
        err: 'cannot hash',
        err
      });
    } else if (hash) {
      //create user in database with the given attributes
      User.create({
        userName: req.body.userName,
        email: req.body.email,
        name: req.body.name,
        password: hash
      })
        //sign up success
        .then((user) => {
          return res.status(200).json({
            message: 'sign up complete',
            userName: user.userName,
            email: user.email,
            userId: user.userId
          });
        })
        //sign up failed
        .catch(err => {
          return res.status(500).json({
            message: 'sign up failed',
            err
          });
        });
    }
  });
};

exports.signIn = (req, res) => {
  //finding the user in database with given email
  User.findAll({
    where: {
      email: req.body.email
    }
  }).then(user => {
    // if user with such email does not exist
    if (user.length == 0) {
      return res.status(404).json({
        message: 'email or password incorrect'
      });
      // if user with this email exists
    } else {
      let firstuser = user[0]
      //checking if the password given is equal to the password in database
      bcrypt.compare(req.body.password, firstuser.password, (err, check) => {
        if (err) {
          return res.status(500).json({
            message: 'compare not complete'
          });
        } else {
          // if passwords are correct
          if (check) {
            //creating the jwt for user
            const jwtpayload = {
              name: firstuser.name,
              email: firstuser.email,
              userId: firstuser.userId,
              userName: firstuser.userName
            };
            jwt.sign(
              jwtpayload,
              jwtSecret, {
                expiresIn: '10h'
              },
              (err, encoded) => {
                if (err) {
                  throw new Error('error in jwt');
                }
                return res.status(200).json({
                  done: true,
                  secret: 'bearer ' + encoded
                });
              }
            );
            //if passwords did not match that means password incorrect
          } else {
            return res.status(404).json({
              message: 'email or password incorrect'
            });
          }
        }
      });
    }
  });
};