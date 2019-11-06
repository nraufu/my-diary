import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import sampleData from './sampleData';
import {
    pool,
    query
} from '../models/index';

const {
    expect
} = chai;
chai.use(chaiHttp);

let token; // for caching token for further requests
let cachedEntry; // for caching retrieved entry for later comparison

const makeAuthHeader = authToken => `Bearer ${authToken}`;



describe('/GET API base', () => {
    it('should return 200 status to confirm that the API server is running', (done) => {
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

    it('should return 400 bad request error without an auth token when a user is already signed up', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(sampleData.validUser1)
            .end((err, res) => {
                expect(res).to.have.status(400);
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
                expect(res.body).to.have.property('error');
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
                expect(res.body).to.have.property('error');
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
});

describe('/POST entries', () => {
    it('should create a new entry when passed valid data and valid token and return 201', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries/')
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.validEntry)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.newEntry).to.be.have.all.keys('id', 'created_on', 'title', 'description', 'isfavorite');
                cachedEntry = res.body.newEntry;

                done();
            });
    });

    it('should return 400 bad request error when passed invalid data and valid token', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries')
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.invalidEntry)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 401 unauthorized error when passed valid data with invalid or expired token', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries')
            .set('Authorization', makeAuthHeader(sampleData.invalidToken))
            .send(sampleData.validEntry)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 401 unauthorized error when passed valid data with no token', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries')
            .set('Authorization', null)
            .send(sampleData.validEntry)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should create another entry which is a user favorite when passed valid data and token then return 201', (done) => {
        chai
            .request(app)
            .post('/api/v1/entries/')
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.anotherValidEntry)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.newEntry).to.be.have.property('isfavorite', true);
                done();
            });
    });

    it('should return 500 error due to database error', (done) => {
        const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
        chai
            .request(app)
            .post('/api/v1/entries')
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.anotherValidEntry)
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('newEntry');
                queryStub.restore();
                done();
            });
    });
});

describe('/GET entries', () => {
    it('should return all user entries when passed a valid token and return 200 status', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries/')
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('Entries');
                done();
            });
    });

    it('should return 401 unauthorized error along with error object when passed an invalid or expired token', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries/')
            .set('Authorization', makeAuthHeader(sampleData.invalidToken))
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 401 unauthorized error along with error object when passed no token', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries/')
            .set('Authorization', '')
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 200 status with array of entries after user adds an entry and sends a valid token', (done) => {
        chai
            .request(app)
            .get('/api/v1/entries/')
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('Entries');
                expect(res.body.Entries).to.be.an('array');
                expect(res.body.Entries.length).to.eql(2);
                done();
            });
    });

    it('should return 500 internal error when database throws error', (done) => {
        const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
        chai
            .request(app)
            .get('/api/v1/entries/')
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('error');
                queryStub.restore();
                done();
            });
    });
});

describe('/GET/:id entries', () => {
    it('should return 200 status and a single user entry with specified existing id when passed a valid token', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.entry).to.be.eql(cachedEntry);
                done();
            });
    });

    it('should return 400 bad request when passed a valid token but nonexistent id', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${sampleData.invalidEntryId}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('Error');
                done();
            });
    });

    it('should return a 404 not found error when passed an invalid entry id and a valid token', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${sampleData.nonExistentId}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 401 unauthorized error when passed an invalid or expired token', (done) => {
        chai
            .request(app)
            .get(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(sampleData.invalidToken))
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('entry');
                done();
            });
    });

    it('should return 500 internal error when database throws error', (done) => {
        const queryStub = sinon.stub(pool, 'query').throws(new Error('Query failed'));
        chai
            .request(app)
            .get(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('entry');
                queryStub.restore();
                done();
            });
    });
});

describe('/PATCH entries', () => {
    it('should modify an existing entry when passed valid id, data and token then return 200 status', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.anotherValidEntry)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.Entry).to.be.eql(Object.assign(cachedEntry, sampleData.anotherValidEntry));
                done();
            });
    });

    it('should return 400 bad request error when passed invalid data and valid token', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.invalidEntry)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 401 unauthorized error when passed valid data with invalid or expired token', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(sampleData.invalidToken))
            .send(sampleData.validEntry)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 404 not found error when passed valid data, valid token but invalid id', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/entries/${sampleData.nonExistentId}`)
            .set('Authorization', makeAuthHeader(token))
            .send(sampleData.validEntry)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });


});

describe('/DELETE/:id entries', () => {
    it('should return 401 unauthorized error when passed an invalid or expired token', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(sampleData.invalidToken))
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });

    it('should return 400 bad request error when passed invalid id', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${sampleData.invalidEntryId}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('Error');
                done();
            });
    });

    it('should delete a single user entry with specified existing id when passed a valid token', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${cachedEntry.id}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should return a 404 not found Request error when passed a nonexistent id and a valid token', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/entries/${sampleData.nonExistentId}`)
            .set('Authorization', makeAuthHeader(token))
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.have.property('error');
                done();
            });
    });
});