const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URI =
  'mongodb+srv://rafael:62178177@cluster0.bnjov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let db: any = null;

const connection = () => {
  if (db) return Promise.resolve(db);

  return MongoClient.connect(MONGO_DB_URI, OPTIONS).then((conn: any) => {
    db = conn.db('Challenge2021-SFN');
    return db;
  });
};

module.exports = connection;
