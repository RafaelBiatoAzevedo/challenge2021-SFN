import express from 'express';
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
import { MongoMemoryServer } from 'mongodb-memory-server';

const server = require('../src/api/app');

chai.use(chaiHttp);

describe('GET /articles/:id', () => {
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

  describe('When id not exists in database', () => {
    let response: express.Request;
    const invalidId: string = '12345678';

    beforeEach(async () => {
      response = await chai.request(server).get(`/articles/${invalidId}`);
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

    let articleMock = {
      title: 'test mock in mongoMemory',
      url: 'https://www.google.com.br',
      newsSite: 'News teste',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png',
      sumary: 'test mock',
    };

    beforeEach(async () => {
      const { body } = await chai
        .request(server)
        .post('/articles')
        .send(articleMock);

      response = await chai.request(server).get(`/articles/${body._id}`);
    });

    it('Return code status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return object', () => {
      expect(response.body).to.be.a('object');
    });

    it('Object have properties "_id", "title", "featured", "url", "imageUrl", "newsSite","sumary", "publishedAt", "updatedAt", "launches" and "events" ', async () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('featured');
      expect(response.body).to.have.property('url');
      expect(response.body).to.have.property('imageUrl');
      expect(response.body).to.have.property('newsSite');
      expect(response.body).to.have.property('sumary');
      expect(response.body).to.have.property('publishedAt');
      expect(response.body).to.have.property('updatedAt');
      expect(response.body).to.have.property('launches');
      expect(response.body).to.have.property('events');
    });

    it(`The property "title" is equal "${articleMock.title}"`, () => {
      expect(response.body.title).to.be.equal(articleMock.title);
    });

    it(`The property "url" is equal "${articleMock.url}"`, () => {
      expect(response.body.url).to.be.equal(articleMock.url);
    });

    it(`The property "imageUrl" is equal "${articleMock.imageUrl}"`, () => {
      expect(response.body.imageUrl).to.be.equal(articleMock.imageUrl);
    });

    it(`The property "newsSite" is equal "${articleMock.newsSite}"`, () => {
      expect(response.body.newsSite).to.be.equal(articleMock.newsSite);
    });

    it(`The property "sumary" is equal "${articleMock.sumary}"`, () => {
      expect(response.body.sumary).to.be.equal(articleMock.sumary);
    });
  });
});