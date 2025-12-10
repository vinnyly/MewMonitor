-- read all diet plan (for one diet)
SELECT uid, cname, dp_number, feeding_interval, feeding_portion, description
FROM Diet_Plan
WHERE dp_number = ?;