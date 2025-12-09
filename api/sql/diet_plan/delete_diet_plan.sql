-- delete a diet plan (requires full key)
DELETE FROM Diet_Plan
WHERE uid = ? AND cname = ? AND dp_number = ?;