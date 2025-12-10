-- get all diet plans for a cat
-- input: uid, cname    (because cname is not unique by itself)
SELECT uid, cname, dp_number, feeding_interval, feeding_portion, description
FROM Diet_Plan
WHERE uid = ? AND cname = ?;