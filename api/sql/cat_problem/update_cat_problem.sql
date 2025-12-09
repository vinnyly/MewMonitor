-- update non-prime attributes of a cat problem
-- todo: update attributes set based off ui
UPDATE Cat_Problem
SET severity = ?, description = ?
WHERE uid = ? AND cname = ? AND pname = ?;