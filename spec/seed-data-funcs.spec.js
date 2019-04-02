const { expect } = require("chai");
const {
  formatArticleData,
  formatCommentData,
  indexArticleTitle
} = require("../utils/seed-data-funcs");

describe("seedArticles", () => {
  describe("formatArticleData", () => {
    it("returns an array of the same length given", () => {
      expect(
        formatArticleData([
          {
            title: "Running a Node App",
            topic: "coding",
            author: "jessjelly",
            body:
              "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: 1471522072389
          }
        ]).length
      ).to.eql(1);
    });
    it("updates the created_at timestamp", () => {
      const myDate1 = new Date(1471522072389);
      const myDate2 = new Date(1500584273256);
      expect(
        formatArticleData([
          {
            title: "Running a Node App",
            topic: "coding",
            author: "jessjelly",
            body:
              "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: 1471522072389
          },
          {
            title:
              "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
            topic: "coding",
            author: "jessjelly",
            body:
              "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
            created_at: 1500584273256
          }
        ])
      ).to.eql([
        {
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: myDate1
        },
        {
          title:
            "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
          topic: "coding",
          author: "jessjelly",
          body:
            "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
          created_at: myDate2
        }
      ]);
    });
  });
});
describe("seedComments", () => {
  describe("indexArticleTitle", () => {
    const articles = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 533132514171
      }
    ];
    it("returns a single article_id object", () => {
      expect(
        indexArticleTitle([
          {
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: 1542284514171,
            votes: 100
          }
        ])
      ).to.eql({ "Living in the shadow of a great man": 1 });
    });
    it("returns article_id object", () => {
      expect(indexArticleTitle(articles)).to.eql({
        "Living in the shadow of a great man": 1,
        "They're not exactly dogs, are they?": 2
      });
    });
  });

  describe.only("formatCommentData", () => {
    const comments = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articlesID = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2
    };
    it("updates property belongs_to to article_id and replaces the timestamp with a date", () => {
      const myDate = new Date(1479818163389);
      expect(
        formatCommentData(
          [
            {
              body:
                "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
              belongs_to: "Living in the shadow of a great man",
              created_by: "butter_bridge",
              votes: 14,
              created_at: 1479818163389
            }
          ],
          articlesID
        )
      ).to.eql([
        {
          body:
            "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          article_id: 1,
          created_by: "butter_bridge",
          votes: 14,
          created_at: myDate
        }
      ]);
    });
    it("updates property belongs_to to article_id and replaces the timestamp with a date", () => {
      const myDate1 = new Date(1479818163389);
      const myDate2 = new Date(1511354163389);
      expect(formatCommentData(comments, articlesID)).to.eql([
        {
          body:
            "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          article_id: 1,
          created_by: "butter_bridge",
          votes: 14,
          created_at: myDate1
        },
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 2,
          created_by: "butter_bridge",
          votes: 16,
          created_at: myDate2
        }
      ]);
    });
  });
});
