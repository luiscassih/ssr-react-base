import express from 'express';
import http from 'http';
import router from '@/components/router';
import layout from '@/components/middlewares/layout';
import dotenv from 'dotenv';

const app = express();
const server = http.createServer(app);

dotenv.config({ path: __dirname + '/.env' });

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Layout template for html generation
app.use(layout);

// Main router
app.get('/', (_req, res) => res.redirect('/dashboard'));
app.use('/', router);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('App running on port', PORT));