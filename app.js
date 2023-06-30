import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize'
import UserRoute from './router/UserRoute.js'
import DesignRoute from './router/DesignRoute.js'
import PPTRoute from './router/PPTRoute.js'
import WebsiteRoute from './router/WebsiteRoute.js'
import AuthRoute from './router/AuthRoute.js'
dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})

// (async() => {
//     await db.sync()
// })()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(UserRoute)
app.use(DesignRoute)
app.use(PPTRoute)
app.use(WebsiteRoute)
app.use(AuthRoute)

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log('listening on port ' + process.env.APP_PORT);
});