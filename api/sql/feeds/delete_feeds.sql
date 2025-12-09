-- remove feeds entry (requires full key)
DELETE FROM Feeds
WHERE uid = ?, cname = ?, fid = ?, feed_date = ?, feed_time = ?;