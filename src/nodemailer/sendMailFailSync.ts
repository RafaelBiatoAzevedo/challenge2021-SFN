'use strict';
export {};
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const moment = require('moment');
require('dotenv/config');

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_SERVER,
      pass: process.env.PASSWORD_MAIL_SERVER,
    },
  })
);

const mailOptions = {
  from: 'challenge2021sfn@gmail.com',
  to: 'rafaelazevedo321@gmail.com',
  subject: 'Fail sync articles',
  text: `There was a failure to sync the articles at ${moment().format(
    'YYYY-MM-DD HH:mm:ss'
  )}`,
};

const sendMail = () => {
  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
