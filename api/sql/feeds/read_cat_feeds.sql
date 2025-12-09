-- get all feeding entries for a cat
SELECT *
FROM Feeds
WHERE uid = ? AND cname = ?;