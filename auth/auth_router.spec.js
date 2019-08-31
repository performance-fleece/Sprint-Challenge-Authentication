const request = require('supertest');
const db = require('../database/dbConfig.js');

const server = require('../api/server.js');

describe('server', () => {
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST /api/auth/register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert a user into the db', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'kevin',
          password: 'password'
        })
        .then(res => {
          expect(res.body.message).toEqual('Welcome kevin');
        });
    });
    it('should return 201 OK', () => {
      return request(server)
        .post('/api/auth/register')
        .send({
          username: 'kevin',
          password: 'password'
        })
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });
  });
  describe('POST /api/auth/login', () => {
    it('should login and return username', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'kevin',
          password: 'password'
        })

        .then(res => {
          expect(res.body.message).toEqual('Welcome kevin');
        });
    });

    it('should return 200 OK', () => {
      return request(server)
        .post('/api/auth/login')
        .send({
          username: 'kevin',
          password: 'password'
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
