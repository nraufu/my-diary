import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";
import entries from '../models/entries'

const { expect } = chai;
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
  it('it should GET all entries', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err,res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(entries.length);
          done();
      })
  })
})