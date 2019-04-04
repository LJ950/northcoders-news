process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET status:200 and returns all topics", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.eql({
              topics: [
                {
                  description: "The man, the Mitch, the legend",
                  slug: "mitch"
                },
                {
                  description: "Not dogs",
                  slug: "cats"
                }
              ]
            });
          });
      });
    });
    describe("/articles", () => {
      //GETs
      it("GET status:200 and returns all articles", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.eql(12);
            expect(body.articles[0]).to.contain.keys(
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes"
            );
          });
      });
      describe("/:article_id", () => {
        it("GET status:200 and returns requested article", () => {
          return request
            .get("/api/articles/2")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.contain.keys(
                "article_id",
                "title",
                "topic",
                "author",
                "body",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(+body.articles.comment_count).to.equal(1);
              expect(body.articles.article_id).to.equal(2);
            });
        });

        //Patch
        it("POST status:201 responds with updated article", () => {
          return request
            .patch("/api/articles/1")
            .send({
              title: "Updated Title",
              body: "Existence is no longer challenging"
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.eql({
                article_id: 1,
                author: "butter_bridge",
                title: "Updated Title",
                body: "Existence is no longer challenging",
                topic: "mitch",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 100
              });
            });
        });
        it("POST status:201 increments the vote count", () => {
          return request
            .patch("/api/articles/1")
            .send({
              votes: 10
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.votes).to.eql(110);
            });
        });
        it("POST status:201 decrements the vote count", () => {
          return request
            .patch("/api/articles/1")
            .send({
              votes: -10
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.votes).to.eql(90);
            });
        });

        //delete
        it("DELETE status:204 no content returned", () => {
          return request
            .delete("/api/articles/1")
            .expect(204)
            .then(() => {
              return request
                .get("/api/articles")
                .then(({ body }) => {
                  expect(body.articles.length).to.eql(11);
                })
                .then(() => {
                  return request.get("/api/articles/1").expect(404);
                });
            });
        });

        //errors
        it("GET status:400 responds with error message when bad request", () => {
          return request
            .get("/api/articles/abc")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("Bad Request");
            });
        });
        it("GET status:404 responds with error message when non existent id is requested", () => {
          return request
            .get("/api/articles/999")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Not Found");
            });
        });
        it("GET status:405 responds with error message when method not allowed", () => {
          const reqTypes = ["post", "put"];
          return Promise.all(
            reqTypes.map(reqType => {
              return request[reqType]("/api/articles/1")
                .expect(405)
                .then(res => {
                  expect(res.body.msg).to.equal("Method Not Allowed");
                });
            })
          );
        });
        it("POST status:422 responds with error when update request cannot be processed", () => {
          return request
            .patch("/api/articles/1")
            .send({
              article_id: 5
            })
            .expect(422)
            .then(res => {
              expect(res.body.msg).to.eql("Not Updated");
            });
        });
      });
    });
  });
});
