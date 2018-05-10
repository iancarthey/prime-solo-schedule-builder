const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const scheduleId = req.query.id;
    console.log(scheduleId);
    let queryText = `SELECT schedule.schedule_name, schedule.date, schedule_item.name, 
                     schedule_item.github, schedule_item.description, schedule_item.order_id, schedule_id
                     FROM schedule_item JOIN schedule ON schedule_item.schedule_id = schedule.id 
                     WHERE schedule_id = $1 ORDER BY order_id;`

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

//PUT ROUTE FOR UPDATING ITEM ORDER
router.put('/', (req, res) => {
    let scheduleItemId = req.query.id
    let newScheduleOrder = req.body;
    let queryText = 'UPDATE schedule_item SET "order_id" = $1 WHERE "id" = $2;';
    pool.query(queryText, [newScheduleOrder.newOrder, scheduleItemId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR IN PUT scheduleItem.router: ',error);
    })
})

module.exports = router;