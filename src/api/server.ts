require('dotenv/config');
const app = require('./app');
const CronJob = require('cron').CronJob;
const { loadingData } = require('./models/loadingData');
const updateArticlesDaily = require('./models/cronUpdate9AM');

const job = new CronJob(
  '0 0 9 * * *',
  () => updateArticlesDaily(),
  null,
  true,
  'America/Sao_Paulo'
);

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => console.log(`SERVER ONLINE IN PORT ${PORT}`));
  loadingData();
} catch (error) {
  console.log('SERVER OFFLINE', error);
}
