import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";

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