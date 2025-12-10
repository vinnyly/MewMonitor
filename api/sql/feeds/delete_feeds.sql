-- remove feeds entry (requires full key)
DELETE FROM Feeds
WHERE uid = ? AND cname = ? AND fid = ? AND feed_date = ? AND feed_time = ?;