import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import router from './router';
import { MONGO_URI, PORT, VIEWS_DIR, STATIC_PATH } from './@config';
import bodyParser from 'body-parser';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
const server = createServer(app);

app.enable('strict routing');
app.disable('etag');
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);
app.use(STATIC_PATH, express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('main');
});

app.use('/api', router);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  server.listen(PORT);
});
