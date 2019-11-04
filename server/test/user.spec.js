import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";
import sample from '../test/Sample';
import { pool, query } from '../models/index';

let token;

const {
  expect
} = chai;

chai.use(chaiHttp);


describe('Example Node Server', () => {
  it('should return 200 response', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});


describe('/POST /auth/signup', () => {
  it('should return 201 with an auth token when a new user is successfully created', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(sample.anotherValidUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        ({ token } = res.body.data);
        done();
      });
  });

  it('should return 409 conflict error without an auth token when a user is already signed up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(sample.anotherValidUser2)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).not.to.have.property('token');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return 400 bad request error when a user tries to sign up with invalid details', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(sample.invalidValidUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('/POST /auth/login', () => {
  it('should return 200 with an auth token when user successfully logs in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(sample.validUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        ({ token } = res.body);
        done();
      });
  });

  it('should return 400 bad request when a user tries to login with invalid credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(sample.invalidUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

 
});

