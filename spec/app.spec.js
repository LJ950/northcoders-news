process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const supertest = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const request = supertest(app);

chai.use(chaiSorted);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200 returns endpoints json", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
        });
    });
    describe("/topics", () => {
      it("GET status:200 returns all topics", () => {
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

      describe("errors", () => {
        it("POST PUT PATCH DELETE status:405 responds with error message when method not allowed", () => {
          const reqTypes = ["post", "put", "patch", "delete"];
          return Promise.all(
            reqTypes.map(reqType => {
              return request[reqType]("/api/users/1")
                .expect(405)
                .then(res => {
                  expect(res.body.msg).to.equal("Method Not Allowed");
                });
            })
          );
        });
      });
    });
    describe("/users", () => {
      it("GET status:200 returns all users", () => {
        return request
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.eql({
              users: [
                {
                  avatar_url:
                    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                  name: "jonny",
                  username: "butter_bridge"
                },
                {
                  avatar_url:
                    "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
                  name: "sam",
                  username: "icellusedkars"
                },
                {
                  avatar_url:
                    "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
                  name: "paul",
                  username: "rogersop"
                }
              ]
            });
          });
      });
      describe("errors", () => {
        it("POST PUT PATCH DELETE status:405 responds with error message when method not allowed", () => {
          const reqTypes = ["post", "put", "patch", "delete"];
          return Promise.all(
            reqTypes.map(reqType => {
              return request[reqType]("/api/users")
                .expect(405)
                .then(res => {
                  expect(res.body.msg).to.equal("Method Not Allowed");
                });
            })
          );
        });
      });
    });
    describe("/users/:username", () => {
      it("GET status:200 requested user", () => {
        return request
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.user).to.eql({
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            });
          });
      });
      describe("errors", () => {
        it("GET status:404 responds with error message when non existent id is requested", () => {
          return request
            .get("/api/users/abc")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Not Found");
            });
        });
      });
      it("POST PUT PATCH DELETE status:405 responds with error message when method not allowed", () => {
        const reqTypes = ["post", "put", "patch", "delete"];
        return Promise.all(
          reqTypes.map(reqType => {
            return request[reqType]("/api/users/1")
              .expect(405)
              .then(res => {
                expect(res.body.msg).to.equal("Method Not Allowed");
              });
          })
        );
      });
    });
    describe("/articles", () => {
      it("GET status:200 returns all articles", () => {
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
      it("GET status:200 accepts author query", () => {
        return request
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(article => {
              expect(article.author).to.eql("butter_bridge");
            });
          });
      });
      it("GET status:200 accepts topic query", () => {
        return request
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(article => {
              expect(article.topic).to.eql("mitch");
            });
          });
      });
      it("GET status:200 also accepts sort_by query which default to date (order defaults to descending)", () => {
        return request
          .get("/api/articles?author=icellusedkars&sort_by=title")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("title", {
              descending: true
            });
            body.articles.forEach(article => {
              expect(article.author).to.eql("icellusedkars");
            });
          });
      });
      it("GET status:200 also accepts order query which defaults to descending", () => {
        return request
          .get("/api/articles?topic=mitch&sort_by=author&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("author", {
              ascending: true
            });
            body.articles.forEach(article => {
              expect(article.topic).to.eql("mitch");
            });
          });
      });
      describe("errors", () => {
        it("POST PUT PATCH DELETE status:405 responds with error message when method not allowed", () => {
          const reqTypes = ["post", "put", "patch", "delete"];
          return Promise.all(
            reqTypes.map(reqType => {
              return request[reqType]("/api/articles")
                .expect(405)
                .then(res => {
                  expect(res.body.msg).to.equal("Method Not Allowed");
                });
            })
          );
        });
        it("GET status:404 gives an error message when topic does not exist", () => {
          return request
            .get("/api/articles?topic=notatopic")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Not Found");
            });
        });
        it("GET status:404 gives an error message when author does not exist", () => {
          return request
            .get("/api/articles?author=notanauthor")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Not Found");
            });
        });
        it("GET status:404 gives an error message when asked to sort by non existent column", () => {
          return request
            .get("/api/articles?author=butter_bridge&sort_by=notacolumn")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("Bad Request");
            });
        });
      });
      describe("articles/:article_id", () => {
        it("GET status:200 and returns requested article", () => {
          return request
            .get("/api/articles/2")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys(
                "article_id",
                "title",
                "topic",
                "author",
                "body",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(+body.article.comment_count).to.equal(0);
              expect(body.article.article_id).to.equal(2);
            });
        });

        it("PATCH status:200 responds with updated article", () => {
          return request
            .patch("/api/articles/1")
            .send({
              title: "Updated Title",
              body: "Existence is no longer challenging"
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.eql({
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
        it("PATCH status:200 increments the vote count", () => {
          return request
            .patch("/api/articles/1")
            .send({
              inc_votes: 10
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.eql(110);
            });
        });
        it("PATCH status:201 decrements the vote count", () => {
          return request
            .patch("/api/articles/1")
            .send({
              inc_votes: -10
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.eql(90);
            });
        });

        it("DELETE status:204 deletes an article", () => {
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

        describe("errors", () => {
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
          it("POST PUT status:405 responds with error message when method not allowed", () => {
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
          it("PATCH status:422 responds with error when update request cannot be processed", () => {
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
        describe("articles/:article_id/comments", () => {
          it("GET status:200 returns an array of comments for the requested article", () => {
            return request
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments[0]).to.contain.keys(
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                );
                expect(comments.length).to.equal(13);
              });
          });
          it("GET status:200 accepts sort_by query defaults to desc", () => {
            return request
              .get("/api/articles/1/comments?sort_by=comment_id")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("comment_id", {
                  descending: true
                });
              });
          });
          it("GET status:200 order query can be given", () => {
            return request
              .get("/api/articles/1/comments?sort_by=author&order=asc")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("author", {
                  ascending: true
                });
              });
          });
          it("GET status:200 default sort is created_at", () => {
            return request
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("POST status:201 adds a new comment to the article and returns it", () => {
            return request
              .post("/api/articles/2/comments")
              .send({
                username: "butter_bridge",
                body: "I've added a new comment"
              })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment).to.eql({
                  comment_id: 19,
                  author: "butter_bridge",
                  body: "I've added a new comment",
                  article_id: 2
                });
              })
              .then(() => {
                return request
                  .get("/api/articles/2/comments")
                  .expect(200)
                  .then(({ body: { comments } }) => {
                    expect(comments.length).to.equal(1);
                  });
              });
          });

          describe("errors", () => {
            it("GET status:400 responds with error message when bad request", () => {
              return request
                .get("/api/articles/abc/comments")
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.equal("Bad Request");
                });
            });
            it("GET status:404 responds with error message when non existent id is requested", () => {
              return request
                .get("/api/articles/999/comments")
                .expect(404)
                .then(res => {
                  expect(res.body.msg).to.equal("Not Found");
                });
            });
            it("GET status:405 responds with error message when method not allowed", () => {
              const reqTypes = ["put"];
              return Promise.all(
                reqTypes.map(reqType => {
                  return request[reqType]("/api/articles/1/comments")
                    .expect(405)
                    .then(res => {
                      expect(res.body.msg).to.equal("Method Not Allowed");
                    });
                })
              );
            });
          });
        });
      });
    });
    describe("comments/:comment_id", () => {
      it("GET status:200 returns the requested comment", () => {
        return request
          .get("/api/comments/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.eql({
              comment_id: 1,
              article_id: 9,
              author: "butter_bridge",
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              created_at: "2017-11-22T12:36:03.389Z",
              votes: 16
            });
          });
      });
      it("PATCH status:200 updates comment by comment_id and return updated comment", () => {
        return request
          .patch("/api/comments/1")
          .send({
            body: "I've updated this comment",
            inc_votes: 1
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0]).to.eql({
              author: "butter_bridge",
              body: "I've updated this comment",
              votes: 17,
              article_id: 9,
              comment_id: 1,
              created_at: "2017-11-22T12:36:03.389Z"
            });
          })
          .then(() => {
            return request
              .get("/api/comments/1")
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment).to.eql({
                  author: "butter_bridge",
                  body: "I've updated this comment",
                  votes: 17,
                  article_id: 9,
                  comment_id: 1,
                  created_at: "2017-11-22T12:36:03.389Z"
                });
              });
          });
      });
      it("DELETE status:204 deletes comment by ID", () => {
        return request
          .delete("/api/comments/1")
          .expect(204)
          .then(() => {
            return request.get("/api/comments/1").expect(404);
          });
      });

      describe("errors", () => {
        it("GET status:400 responds with error message when bad request", () => {
          return request
            .get("/api/comments/abc")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("Bad Request");
            });
        });
        it("GET status:404 responds with error message when non existent id is requested", () => {
          return request
            .get("/api/comments/999")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Not Found");
            });
        });
        it("POST PUT status:405 responds with error message when method not allowed", () => {
          const reqTypes = ["post", "put"];
          return Promise.all(
            reqTypes.map(reqType => {
              return request[reqType]("/api/comments/1")
                .expect(405)
                .then(res => {
                  expect(res.body.msg).to.equal("Method Not Allowed");
                });
            })
          );
        });
        it("PATCH status:404 responds with error when non existent comment is patched", () => {
          return request
            .patch("/api/comments/999")
            .send({
              body: "update body"
            })
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.eql("Not Found");
            });
        });
        it("PATCH status:404 responds with error when non existent comment is deleted", () => {
          return request
            .delete("/api/comments/999")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.eql("Not Found");
            });
        });
        it("PATCH status:422 responds with error when update request cannot be processed", () => {
          return request
            .patch("/api/comments/1")
            .send({
              comment_id: 5
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
