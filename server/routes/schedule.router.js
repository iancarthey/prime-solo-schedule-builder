const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for schedules
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM schedule;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR IN GET schedule.router: ', error);
        res.sendStatus(500);
    })
});

/**
 * POST route for new Schedules
 */
router.post('/', (req, res) => {
    const schedule = req.body;
    let index = 0;

    (async () => {
        const client = await pool.connect();
        try{
            await client.query('BEGIN');
            //creates new schedule that can be referenced in later query
            let queryText = `INSERT INTO schedule (schedule_name, date, schedule_group_id) VALUES ($1, $2, $3) 
                             RETURNING "id";`;
            //values to be inserted in query
            values = [schedule.newScheduleInfo.newSchedule.name, schedule.newScheduleInfo.newSchedule.date, schedule.newScheduleInfo.newSchedule.group];

            const scheduleResult = await client.query(queryText, values);
            //id of the newly inserted schedule
            const scheduleId = scheduleResult.rows[0].id;

            //For loop to go through each schedule item
            for(let scheduleItem of schedule.newScheduleItems){
                //define order_id
                let orderId = index += 1;
                console.log(orderId);
                //query for each item
                console.log(scheduleItem);
                queryText = `INSERT INTO schedule_item (name, github, description, order_id, schedule_id) 
                            VALUES ($1, $2, $3, $4, $5);`;
                //values for each item
                values = [scheduleItem.name, scheduleItem.url, scheduleItem.description, orderId, scheduleId];
                const result = await client.query(queryText, values); 
            }
            await client.query('COMMIT');
            res.sendStatus(201);
        } catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }

    })().catch( (error) => {
        console.log('ERROR IN ASYNC POST: ', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    const scheduleId = req.params.id
    let queryText = 'DELETE FROM schedule WHERE "id" = $1;';
    pool.query(queryText, [scheduleId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR IN DELETE schedule.router: ', error);
    })
})

module.exports = router;