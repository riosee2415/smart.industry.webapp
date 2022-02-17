const Sequelize = require("sequelize");
const user = require("./user");
const mainbanner = require("./mainbanner");
const companyinfo = require("./companyinfo");
const popup = require("./popup");
const acceptrecord = require("./acceptrecord");
const notice = require("./notice");
const gallary = require("./gallary");
const question = require("./question");
const questiontype = require("./questiontype");
const boughtHistory = require("./boughtHistory");
const category = require("./category");
const faq = require("./faq");
const faqtype = require("./faqtype");
const lease = require("./lease");
const menu = require("./menu");
const prodQuestion = require("./prodQuestion");
const product = require("./product");
const productimage = require("./productimage");
const review = require("./review");
const wishItem = require("./wishItem");
const seo = require("./seo");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = user;
db.MainBanner = mainbanner;
db.CompanyInfo = companyinfo;
db.Popup = popup;
db.AcceptRecord = acceptrecord;
db.Notice = notice;
db.Gallary = gallary;
db.Question = question;
db.QuestionType = questiontype;
db.BoughtHistory = boughtHistory;
db.Category = category;
db.Faq = faq;
db.FaqType = faqtype;
db.Lease = lease;
db.Menu = menu;
db.ProdQuestion = prodQuestion;
db.Product = product;
db.ProductImage = productimage;
db.Review = review;
db.WishItem = wishItem;
db.Seo = seo;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
