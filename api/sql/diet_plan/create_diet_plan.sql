-- add diet plan to a cat
-- uid, cname, feeding_interval are REQUIRED
INSERT INTO Diet_Plan (uid, cname, feeding_interval, feeding_portion, description)
VALUES (?, ?, ?, ?, ?);