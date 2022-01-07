require('dotenv/config');
const app = require('./app');

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => console.log(`SERVER ONLINE IN PORT ${PORT}`));
} catch (error) {
  console.log('SERVER OFFLINE', error);
}
