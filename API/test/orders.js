/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('Orders Test', () => {
  describe('PUT /api/v1/orders/:id', () => {
    it('should not modify an order that does not exist and tell the user it exist not', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .send({
          mealId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid orderId.']);
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should tell the user that there are no orders available.', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.eql(['No orders available.']);
          done();
        });
    });
  });

  describe('POST /api/v1/orders', () => {
    it('should make an order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 1,
          customerId: 1,
          catererId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not make an order if no mealId, customerId and CatererId is sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should not make an order if neither mealId, customerId or CatererId is sent', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customerId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 4,
          customerId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.an('array');
        });
      done();
    });
    it('should not make an order if either mealId, customer or catererId is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 'p',
          customerId: 3,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.eql(['An invalid id was sent.']);
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 2,
          customerId: -1,
          catererId: 6,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.an('array');
        });
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          mealId: 8,
          customerId: 3,
          catererId: 'l',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.eql(['An invalid id was sent.']);
        });
      done();
    });
  });


  describe('PUT /api/v1/orders/:id', () => {
    it('should not modify an order if the orderId is invalid', (done) => {
      chai.request(app)
        .put('/api/v1/orders/p')
        .send({
          mealId: 1,
          customerId: 1,
          catererId: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.eql(['Invalid mealId.']);
          done();
        });
    });
    it('should not modify an order if no mealId is sent.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body).to.be.eql(['orders.mealId cannot be null']);
        });
      chai.request(app)
        .put('/api/v1/orders/1')
        .send({ mealId: '' })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid mealId.']);
        });
      done();
    });
    it('should not modify an order if the orderId sent is not available.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/2')
        .send({ mealId: 5 })
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          expect(res.body).to.be.eql(['Invalid orderId.']);
          done();
        });
    });
    it('should modify an order if the orderId exist.', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .send({ mealId: 5 })
        .end((err, res) => {
          expect(res.status).to.be.eql(201);
          expect(res.body).to.be.an('Object');
          done();
        });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should get all orders.', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
