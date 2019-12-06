import fetch from 'node-fetch';
import { CronJob } from 'cron';
import dotenv from 'dotenv';

dotenv.config();

export const keepAlive = (): void => {
  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      new CronJob(
        '0 */10 0,7-23 * * *',
        () => {
          const url = 'https://alkoselain.herokuapp.com/api/products';
          fetch(url).then(res =>
            console.log('frontend status ping: ', res.status)
          );
        },
        () => {},
        true,
        'Europe/Helsinki'
      );
    }, 30000);
  }
};
