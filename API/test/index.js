/* eslint-disable import/no-extraneous-dependencies */
/* eslint linebreak-style: ["error", "windows"] */
/* global describe:true, it:true */
import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('App Entry Points', () => {
  it('should show an html page welcome the user and telling them about the api endpoints', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.text).to.be.eql(
          '<div>'
      + '<h1>Welcome to Meal-Booking-App</h1>'
      + '<h2><a href="https://app.swaggerhub.com/apis-docs/uggo/meal-booking-api/1.0.0" style="text-decoration:none;">API Documentation on Swagger</a></h2>'
      + '<h3>Below are the endpoints to access this API</h3>'
      + '<ul>'
        + '<li><p>Send Header >>> Authorization : token</p></li>'
        + '<li><p>POST /api/v1/caterers/auth/signup<p><span> With the following keys:'
        + '<b> firstname, lastname, restaurant, email, password</span></li>'
        + '<li><p>POST /api/v1/caterers/auth/login</p><span> With the following keys:'
        + '<b> email, password</span></li>'
        + '<li><p>POST /api/v1/customers/auth/signup<p><span> With the following keys:'
        + '<b> firstname, lastname, email, password</span></li>'
        + '<li><p>POST /api/v1/customers/auth/login</p><span> With the following keys:'
        + '<b> email, password</span></li>'
        + '<li><p>GET /api/v1/meals<p></li>'
        + '<li><p>GET /api/v1/meals<p></li>'
        + '<li><p>POST /api/v1/meals<p><span>With the following keys: '
        + '<b>name (string), size (string), price (integer), currency (string), catererId (integer).</b></span></li>'
        + '<li><p>PUT /api/v1/meals/id<p><span>With the following keys: <b>name, price.</b></span></li>'
        + '<li><p>DELETE /api/v1/meals/id<p></li>'
        + '<li><p>POST /api/v1/menu<p><span>With the following keys: '
        + '<b>mealId(s) (integer) (one or more with same key name [mealId]), catererId (interger).</b></span></li>'
        + '<li><p>GET /api/v1/menu</p></li>'
        + '<li><p>POST /api/v1/orders</p><span>With the following keys: '
        + '<b>mealId (integer), customerId (integer), catererId (integer)</b></span></li>'
        + '<li><p>PUT /api/v1/orders/id</p><span>With the following keys: '
        + '<b>mealId (integer)</b></span></li>'
        + '<li><p>GET /api/v1/orders</p></li>'
      + '</ul>'
    + '</div>',
        );
        done();
      });
  });
});
