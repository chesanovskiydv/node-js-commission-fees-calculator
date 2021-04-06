import 'dotenv/config.js';
import { file } from './src/utils/index.js';
import App from './src/App.js';

const filePath = process.argv[2];

const app = new App();

file
  .read(filePath)
  .then((content) => JSON.parse(content))
  .then((transactionsData) =>
    Promise.all(
      transactionsData.map((transactionData) =>
        app.getCommissionFee(transactionData)
      )
    )
  )
  .then((fees) => {
    fees.forEach((fee) => {
      // eslint-disable-next-line no-console
      console.log(parseFloat(fee).toFixed(2));
    });
  });
