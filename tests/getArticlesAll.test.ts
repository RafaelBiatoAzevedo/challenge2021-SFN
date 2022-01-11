import express from 'express';
import { not } from 'joi';
const connection = require('../src/models/connectionMongoDb');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const assertArrays = require('chai-arrays');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
import { MongoMemoryServer } from 'mongodb-memory-server';
import { articlesMock } from './utils/articlesMock';

const server = require('../src/api/app');

chai.use(chaiHttp);
chai.use(assertArrays);

describe('GET /articles', () => {
  before(async () => {
    let DBMemory: MongoMemoryServer;
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

  describe('When request not contain query params ', () => {
    describe('When database is empty', () => {
      let response: express.Request;

      beforeEach(async () => {
        await connection().then((db: any) =>
          db.collection('articles').insertMany(articlesMock)
        );

        await connection().then((db: any) =>
          db.collection('articles').deleteMany({})
        );

        response = await chai.request(server).get('/articles');
      });

      it('Return code status 200', () => {
        expect(response).to.have.status(200);
      });

      it('Return object', () => {
        expect(response.body).to.be.a('object');
      });

      it('Object have properties "page", "limit", "pagesCount" and "data" ', () => {
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('limit');
        expect(response.body).to.have.property('pagesCount');
        expect(response.body).to.have.property('data');
      });

      it('The property "page" have a value 1', () => {
        expect(response.body.page).to.be.equal(1);
      });

      it('The property "limit" have a value 20', () => {
        expect(response.body.limit).to.be.equal(20);
      });

      it('The property "pagesCount" have a value 0', () => {
        expect(response.body.pagesCount).to.be.equal(0);
      });

      it('The property "data" is array with 0 values', () => {
        expect(response.body.data).to.be.array();
        expect(response.body.data).to.be.ofSize(0);
      });
    });

    describe('When database contain articles', () => {
      let response: express.Request;

      beforeEach(async () => {
        await connection().then((db: any) =>
          db.collection('articles').insertMany(articlesMock)
        );

        response = await chai.request(server).get('/articles');
      });

      afterEach(async () => {
        await connection().then((db: any) =>
          db.collection('articles').deleteMany({})
        );
      });

      it('Return code status 200', () => {
        expect(response).to.have.status(200);
      });

      it('Return object', () => {
        expect(response.body).to.be.a('object');
      });

      it('Object have properties "page", "limit", "pagesCount" and "data" ', () => {
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('limit');
        expect(response.body).to.have.property('pagesCount');
        expect(response.body).to.have.property('data');
      });

      it('The property "page" have a value 1', () => {
        expect(response.body.page).to.be.equal(1);
      });

      it('The property "limit" have a value 20', () => {
        expect(response.body.limit).to.be.equal(20);
      });

      it('The property "pagesCount" have a value 2', () => {
        expect(response.body.pagesCount).to.be.equal(2);
      });

      it(`The property "data" is array with values`, () => {
        expect(response.body.data).to.be.array();
        expect(response.body.data).not.to.be.ofSize(0);
      });
    });
  });

  describe('When request contain query params', () => {
    describe('When database is empty', () => {
      let response: express.Request;
      let DBMemory: MongoMemoryServer;

      const queryMock = { page: 1, limit: 20 };

      beforeEach(async () => {
        response = await chai.request(server).get('/articles').query(queryMock);
      });

      it('Return code status 200', () => {
        expect(response).to.have.status(200);
      });

      it('Return object', () => {
        expect(response.body).to.be.a('object');
      });

      it('Object have properties "page", "limit", "pagesCount" and "data" ', () => {
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('limit');
        expect(response.body).to.have.property('pagesCount');
        expect(response.body).to.have.property('data');
      });

      it(`The property "page" have a value ${queryMock.page}`, () => {
        expect(response.body.page).to.be.equal(queryMock.page);
      });

      it(`The property "limit" have a value ${queryMock.limit}`, () => {
        expect(response.body.limit).to.be.equal(queryMock.limit);
      });

      it('The property "pagesCount" have a value 0', () => {
        expect(response.body.pagesCount).to.be.equal(0);
      });

      it('The property "data" is array with 0 values', () => {
        expect(response.body.data).to.be.array();
        expect(response.body.data).to.be.ofSize(0);
      });
    });

    describe('When database contain articles', () => {
      let response: express.Request;
      const queryMock = { page: 2, limit: 10 };

      beforeEach(async () => {
        await connection().then((db: any) =>
          db.collection('articles').insertMany(articlesMock)
        );

        response = await chai.request(server).get('/articles').query(queryMock);
      });

      afterEach(async () => {
        await connection().then((db: any) =>
          db.collection('articles').deleteMany({})
        );
      });

      it('Return code status 200', () => {
        expect(response).to.have.status(200);
      });

      it('Return object', () => {
        expect(response.body).to.be.a('object');
      });

      it('Object have properties "page", "limit", "pagesCount" and "data" ', () => {
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('limit');
        expect(response.body).to.have.property('pagesCount');
        expect(response.body).to.have.property('data');
      });

      it('The property "page" have a value 2', () => {
        expect(response.body.page).to.be.equal(2);
      });

      it('The property "limit" have a value 10', () => {
        expect(response.body.limit).to.be.equal(10);
      });

      it('The property "pagesCount" have a value 4', () => {
        expect(response.body.pagesCount).to.be.equal(4);
      });

      it('The property "data" is array with values', () => {
        expect(response.body.data).to.be.array();
        expect(response.body.data).not.to.be.ofSize(0);
      });
    });
  });
});
