/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../utils/mockData';
import tokens from '../utils/tokens';
import app from '../../app';

const { adminToken } = tokens;
const { userToken } = tokens;
const { validTripDetails, emptyTripDetails } = mockData.Trip;

describe('Trip routes:', () => {
    describe('## Create', () => {
        it(' admin should create a new trip', (done) => {
            request(app)
                .post('/api/v1/trips')
                .set('Accept', 'application/json')
                .set('Authorization', adminToken)
                .send({ ...validTripDetails })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('data');
                   
                    done(err);
                });
        });

        it('should return error for empty field', (done) => {
            request(app)
                .post('/api/v1/trips')
                .set('Accept', 'application/json')
                .set('Authorization', adminToken)
                .send({ ...emptyTripDetails })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('errors');

                    done(err);
                });
        });

        it('should return error unauthorized user', (done) => {
            request(app)
                .post('/api/v1/trips')
                .set('Accept', 'application/json')
                .send({ ...validTripDetails })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Unauthorized user');

                    done(err);
                });
        });

        it("should return all trips", done => {
          request(app)
            .get("/api/v1/trips")
            .set("Accept", "application/json")
            .set('Authorization', adminToken)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.a("object");
              

              done(err);
            });
        });


        it("should return all bookings", done => {
            request(app)
                .get("/api/v1/booking")
                .set("Accept", "application/json")
                .set('Authorization', adminToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.a("object");


                    done(err);
                });
        });

        it("should return unauthorized user", done => {
          request(app)
            .get("/api/v1/booking")
            .set("Accept", "application/json")
              .end((err, res) => {
              expect(res.statusCode).to.equal(401);
                  expect(res.body).to.be.a("object");
                  expect(res.body).to.include.keys('error');
                  expect(res.body.error).to.equal('Unauthorized user');

              done(err);
            });
        });
    });

    describe('## Update', () => {
        it('should return new account update', (done) => {
            request(app)
                .patch('/api/v1/trips/2')
                .set('Accept', 'application/json')
                .set('Authorization', adminToken)
                .send({ status: 'cancelled' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include.keys('message');
                    expect(res.body.message).to.equal('Trip cancelled successfully');

                    done(err);
                });
        });

        it('should return error empty data', (done) => {
            request(app)
                .patch('/api/v1/trips/1')
                .set('Accept', 'application/json')
                .set('Authorization', adminToken)
                .send({ status: '' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.include.keys('errors');

                    done(err);
                });
        });

        it('should return error for Param must be an integer', (done) => {
            request(app)
                .patch('/api/v1/trips/2')
                .set('Accept', 'application/json')
                .set('Authorization', adminToken)
                .send({ status: 'cancelled' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include.keys('message');
                    expect(res.body.message).to.equal('Trip cancelled successfully');

                    done(err);
                });
        });

        it('should return error for unauthorized user', (done) => {
            request(app)
                .patch('/api/v1/booking/2')
                .set('Accept', 'application/json')
                .send({ status: '' })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Unauthorized user');

                    done(err);
                });
        });
    });

    describe('## Delete', () => {
        it('should delete an existing account', (done) => {
            request(app)
                .delete('/api/v1/booking/2')
                .set('Accept', 'application/json')
                .set('Authorization', adminToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include.keys('message');
                    expect(res.body.message).to.equal('Booking deleted successfully');

                    done(err);
                });

        });

        it('should return error for account not found', (done) => {
            request(app)
                .delete('/api/v1/booking/9')
                .set('Accept', 'application/json')
                .set('Authorization', userToken)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Booking neither found nor deleted');

                    done(err);
                });

        });

        it('should return error for unauthorized user', (done) => {
            request(app)
                .delete('/api/v1/booking/2')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.include.keys('error');
                    expect(res.body.error).to.equal('Unauthorized user');

                    done(err);
                });

        });
    });
});
