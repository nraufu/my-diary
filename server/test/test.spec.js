import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";
import entries from '../models/entries'

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

describe('/GET entries', () => {
  it('it should return all user entries', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.eql(entries.length);
        done();
      })
  })
});


describe('/GET/:id entries', () => {
  it('should return a single entry by id', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.eql(1);
        expect(res.body).to.have.property('timestamp');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('content');
        expect(res.body).to.have.property('isFavorite');
        done();
      });
  });

  it('should not return an entry', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/0')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('errors');
        done();
      });
  });
});

