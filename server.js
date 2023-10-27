import router from './routes/index';

const express = require('express');

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

export default app;
