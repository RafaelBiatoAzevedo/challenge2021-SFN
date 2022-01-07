const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://localhost:27017';

let db: any = null;

const connection = () => {
  if (db) return Promise.resolve(db);
  return MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn: any) => {
    db = conn.db('Challenge2021-SFN');
    return db;
  });
};

export default connection;
