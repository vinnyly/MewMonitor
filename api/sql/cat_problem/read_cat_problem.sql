-- get all info of one cat problem (requires full key)
SELECT *
FROM Cat_Problem
WHERE uid = ? AND cname = ? AND pname = ?;