import express from 'express';
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/api/app');

chai.use(chaiHttp);

describe('GET /', () => {
  let response: express.Request;

  before(async () => {
    response = await chai.request(server).get('/');
  });

  it('Return code status 200', () => {
    expect(response).to.have.status(200);
  });

  it('Return object', () => {
    expect(response.body).to.be.a('object');
  });

  it('Object have property "message" ', () => {
    expect(response.body).to.have.property('message');
  });

  it('The property "message" have a text "Back-end Challenge 2021 🏅 - Space Flight News"', () => {
    expect(response.body.message).to.be.equal(
      'Back-end Challenge 2021 🏅 - Space Flight News'
    );
  });
});
