import express from 'express';
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
import { MongoMemoryServer } from 'mongodb-memory-server';

const server = require('../src/api/app');

chai.use(chaiHttp);

describe('POST /articles', () => {
  let DBMemory: MongoMemoryServer;
  const articleMock = {
    title: 'test mock in mongoMemory',
    url: 'https://www.google.com.br',
    newsSite: 'News teste',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png',
    summary: 'test mock',
  };

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

  describe('When body schema contain entries invalids ', () => {
    let response: express.Request;

    const articleMockInvalid = {
      title: 100,
      url: 'https://www.google.com.br',
      newsSite: 'News teste',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png',
      summary: 'test mock',
    };

    beforeEach(async () => {
      response = await chai
        .request(server)
        .post('/articles')
        .send(articleMockInvalid);
    });

    it('Return code status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return object', () => {
      expect(response.body).to.be.a('object');
    });

    it('Object have property "message" ', () => {
      expect(response.body).to.have.property('message');
    });

    it('The property "message" have a text "Invalid body schema. Correct and try again."', () => {
      expect(response.body.message).to.be.equal(
        'Invalid body schema. Correct and try again.'
      );
    });
  });

  describe('When body schema is valid', () => {
    let response: express.Request;
    beforeEach(async () => {
      response = await chai.request(server).post('/articles').send(articleMock);
    });

    it('Return code status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Return object', () => {
      expect(response.body).to.be.a('object');
    });

    it('Object have properties "_id", "title", "featured", "url", "imageUrl", "newsSite","summary", "publishedAt", "updatedAt", "launches" and "events" ', async () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('featured');
      expect(response.body).to.have.property('url');
      expect(response.body).to.have.property('imageUrl');
      expect(response.body).to.have.property('newsSite');
      expect(response.body).to.have.property('summary');
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

    it(`The property "sumary" is equal "${articleMock.summary}"`, () => {
      expect(response.body.summary).to.be.equal(articleMock.summary);
    });
  });
});
