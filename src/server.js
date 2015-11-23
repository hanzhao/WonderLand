/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import Mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Redis from 'redis';
import RedisStore from 'connect-redis';

Mongoose.connect('mongodb://localhost/wonderland-development');
Mongoose.connection.on('error', () => {
  throw new Error('Unable to connect MongoDB');
});

let RedisSession = RedisStore(session);

const server = global.server = express();

server.use(cookieParser('RecordYourDream'));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(session({
  secret: 'RecordYourDream',
  store: new RedisSession({
    client: Redis.createClient(6379, '127.0.0.1')
  }),
  resave: false,
  saveUninitialized: false
}))

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));
server.use('/api/dream', require('./api/dream'));
server.use('/api/user', require('./api/user'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('/', (req, res, next) => {
  if (!req.session.user)
    return res.redirect('/login')
  else
    return res.redirect('/router')
})
server.get('*', async (req, res, next) => {
  if (!req.session.user && req.path !== '/register' && req.path !== '/login') {
    return res.redirect('/login')
  }
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!DOCTYPE html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});
