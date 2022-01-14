import express from 'express';
import { getClient } from '../db';

const routes = express.Router();
// POST /commute
// Add your commutes
routes.post('/commute', async (req, res) => {
    // add your commutes
    const newCommute = req.body;
    const client = await getClient();
    const results = await client
        .db()
        .collection('commutes')
        .insertOne({
            user: newCommute.user,
            commute: newCommute.commute,
            distance: newCommute.distance,
    });
    res.json(results);
});
// GET /commute/:user
// example /commute/BJ
// Returns all of the commutes for a specific user
routes.get('/commute/:user', async (req, res) => {
    const user = req.params.user;
    const client = await getClient();
    const results = await client
        .db()
        .collection('commutes')
        .find({
            user: user
        })
        .toArray();
    // lives in firebase CDN for 1 hour
    // lives on browser for 60 seconds
    res.set('Cache-control', 'public, max-age=30, s-maxage=30')
    res.json(results);
});
// GET /saved/:user
// Returns how much money a specific user has saved

// GET /leaderboard
// Returns the top savers using the app
export default routes;