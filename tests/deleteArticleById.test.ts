import express from 'express';
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
import { MongoMemoryServer } from 'mongodb-memory-server';

const server = require('../src/api/app');

chai.use(chaiHttp);

describe('DELETE /articles/:id', () => {
  let DBMemory: MongoMemoryServer;
  before(async () => {
    DBMemory = await MongoMemoryServer.create();

    const URLMock = await DBMemory.getUri();

    const connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  const articleMock = {
    title: 'test mock in mongoMemory',
    url: 'https://www.google.com.br',
    newsSite: 'News teste',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png',
    sumary: 'test mock',
  };

  describe('When id not exists in database', () => {
    let response: express.Request;
    const invalidId: string = '12345678';

    beforeEach(async () => {
      response = await chai.request(server).delete(`/articles/${invalidId}`);
    });

    it('Return code status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Return object', () => {
      expect(response.body).to.be.a('object');
    });

    it('Object have property "message" ', () => {
      expect(response.body).to.have.property('message');
    });

    it('The property "message" have a text "No found article"', () => {
      expect(response.body.message).to.be.equal('No found article');
    });
  });

  describe('When id exists in database', () => {
    let response: express.Request;

    const articleUpdateMock = {
      title: 'Update test mock in mongoMemory',
      newsSite: 'Update News test',
    };

    beforeEach(async () => {
      const { body } = await chai
        .request(server)
        .post('/articles')
        .send(articleMock);

      response = await chai.request(server).delete(`/articles/${body._id}`);
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

    it('The property "message" have a text "Article deleted"', () => {
      expect(response.body.message).to.be.equal('Article deleted');
    });
  });
});
