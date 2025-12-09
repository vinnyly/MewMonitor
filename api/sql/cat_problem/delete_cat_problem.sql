-- delete a cat problem (requires full key)
DELETE FROM Cat_Problem
WHERE uid = ? AND cname = ? AND pname = ?;