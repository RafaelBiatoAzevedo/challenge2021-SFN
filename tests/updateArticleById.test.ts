import express from 'express';
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
import { MongoMemoryServer } from 'mongodb-memory-server';

const server = require('../src/api/app');

chai.use(chaiHttp);

describe('PUT /articles/:id', () => {
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

  describe('When id not exists in database', () => {
    let response: express.Request;
    const invalidId: string = '12345678';

    beforeEach(async () => {
      response = await chai
        .request(server)
        .put(`/articles/${invalidId}`)
        .send(articleMock);
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
      const { body } = await chai
        .request(server)
        .post('/articles')
        .send(articleMock);

      response = await chai
        .request(server)
        .put(`/articles/${body._id}`)
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

  describe('When id exists in database', () => {
    let response: express.Request;

    const articleUpdateMock = {
      title: 'Update test mock in mongoMemory',
      newsSite: 'Update News test',
      summary: 'Update Test',
    };

    beforeEach(async () => {
      const { body } = await chai
        .request(server)
        .post('/articles')
        .send(articleMock);

      response = await chai
        .request(server)
        .put(`/articles/${body._id}`)
        .send(articleUpdateMock);
    });

    it('Return code status 200', () => {
      expect(response).to.have.status(200);
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

    it(`The property "title" is equal "${articleUpdateMock.title}"`, () => {
      expect(response.body.title).to.be.equal(articleUpdateMock.title);
    });

    it(`The property "url" is equal "${articleMock.url}"`, () => {
      expect(response.body.url).to.be.equal(articleMock.url);
    });

    it(`The property "imageUrl" is equal "${articleMock.imageUrl}"`, () => {
      expect(response.body.imageUrl).to.be.equal(articleMock.imageUrl);
    });

    it(`The property "newsSite" is equal "${articleUpdateMock.newsSite}"`, () => {
      expect(response.body.newsSite).to.be.equal(articleUpdateMock.newsSite);
    });

    it(`The property "summary" is equal "${articleUpdateMock.summary}"`, () => {
      expect(response.body.summary).to.be.equal(articleUpdateMock.summary);
    });
  });
});
