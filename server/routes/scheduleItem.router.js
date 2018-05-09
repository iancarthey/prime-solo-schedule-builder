const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('poop');
    const scheduleId = req.query.id;
    console.log(scheduleId);
    let queryText = 'SELECT * FROM schedule_item WHERE schedule_id = $1 ORDER BY order_id;';

    pool.query(queryText, [scheduleId]).then((result) => {
        console.log(result.rows)
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR IN GET scheduleItem.router: ', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;