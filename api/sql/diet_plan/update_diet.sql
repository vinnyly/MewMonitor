-- update details (feeding_interval, feed_portion, and description) of a given diet plan

/* Parameters:
 * 1. feeding_interval
 * 2. feeding_portion
 * 3. description
 * 4. dp_number
 */
UPDATE Diet_Plan
SET feeding_interval = ?, feeding_portion = ?, description = ?
WHERE dp_number = ?;