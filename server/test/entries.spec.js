import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";
import entries from '../models/entries';
import sample from '../test/Sample';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoicmF1ZkBnbWFpbC5jb20iLCJpYXQiOjE1NzI1MDUyNzEsImV4cCI6MTU3MzExMDA3MX0.IQvzcMlHU68H32Q5mwNIWNPkiOOfU0SwMpuVaDWVhH8';


const {
  expect
} = chai;

chai.use(chaiHttp);

/* describe('/GET entries', () => {
  it('it should return all user entries', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.entries.length).to.eql(entries.length);
        done();
      })
  })
}); */


describe('/GET/:id entries', () => {
  /* it('should return a single entry by id', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/10')
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.found.id).to.be.eql(1);
        expect(res.body.found).to.have.property('title');
        expect(res.body.found).to.have.property('description');
        expect(res.body.found).to.have.property('createdOn');
        expect(res.body.found).to.have.property('isFavorite');
        done();
      });
  }); */

  it('should not return an entry', (done) => {
    chai
      .request(app)
      .get('/api/v1/entries/0')
      .set('Authorization', `Bearer: ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('UPDATE/ api/v1/entries/:id  update user entry', () => {
  it('should update the entry and return a 200 status code', (done) => {
    chai.request(app)
      .patch('/api/v1/entries/2')
      .set('Authorization', `Bearer: ${token}`)
      .send({
        title: sample.secondValidEntry.title,
        description: sample.secondValidEntry.description,
        isFavorite: sample.secondValidEntry.is_favorite
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      })
  })

  it('should return a 404 status code and a message when  the entry is not found or a wrong entryId is passed', (done) => {
    chai.request(app)
      .patch('/api/v1/entries/2090')
      .set('Authorization', `Bearer: ${token}`)
      .send({
        title: sample.validEntry.title,
        description: sample.validEntry.description,
        isFavorite: sample.validEntry.is_favorite
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('DELETE/ ap1/v1/entries/:id  delete an entry', () => {
  it('should delete an entry and return a 200 status code', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/2')
      .set('Authorization', `Bearer: ${token}`)
      .end((err,res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('should return a 404 status code when the wrong entryId is passed or entry does not exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/entries/2018')
      .set('Authorization', `Bearer: ${token}`)
      .end((err,res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        done();
      })
  })
});