-- add diet plan to a cat
-- uid, cname, feed_interval are REQUIRED
INSERT INTO Diet_Plan (uid, cname, feepding_interval, feeding_portion, description)
VALUES (?, ?, ?, ?, ?);