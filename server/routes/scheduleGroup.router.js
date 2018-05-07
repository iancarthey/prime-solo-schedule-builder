const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    queryText = 'SELECT id, name FROM schedule_group;';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log('ERROR IN GET scheduleGroup.router: ', err)
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    group = req.body;
    queryText = 'INSERT INTO schedule_group (name, active, user_id) VALUES ($1, $2, $3);';
    values = [group.newGroup.name, group.newGroup.active, group.user.id];
    pool.query(queryText, values).then((result) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('ERROR IN POST scheduleGroup.router: ', err);
        res.sendStatus(500);
    }) 
});

module.exports = router;