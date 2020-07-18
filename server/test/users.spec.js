import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import sampleData from './sampleData';
import sinon from 'sinon';
import { pool } from '../models/index';

const {
    expect
} = chai;
chai.use(chaiHttp);

let token;


describe('/GET API base', () => {
    it('should return 200 status to confirm that the API server is running', (done) => {
        chai
            .request(app)
            .get('/')
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
            .send(sampleData.validUser1)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.have.property('token');
                ({
                    token
                } = res.body.data.token);
                done();
            });
    });

    it('should return 409 bad request error without an auth token when a user is already signed up', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(sampleData.validUser1)
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
            .send(sampleData.invalidUser)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('should return 500 internal error when database throws error', (done) => {
        const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(sampleData.validUser1)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('error');
                queryStub.restore();
                done();
            });
    });
});

describe('/POST /auth/signin', () => {
    it('should return 200 status with an auth token when user successfully logs in', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(sampleData.validUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.have.property('token');
                ({
                    token
                } = res.body.data);
                done();
            });
    });

    it('should return 400 bad request when a user tries to signin with invalid credentials', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(sampleData.invalidUser)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                done();
            });
    });

    it('should return 400 bad request error when user sigin with valid credentials but which are wrong', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(sampleData.incorrectUser)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });

    it('should return 400 bad request error when user signin with valid credentials but which one is wrong', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(sampleData.incorrectUser2)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('should return 500 internal error when database throws error', (done) => {
        const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(sampleData.validUser)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('error');
                queryStub.restore();
                done();
            });
    });
});

