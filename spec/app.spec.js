process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
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
      });
    });
  });
});
