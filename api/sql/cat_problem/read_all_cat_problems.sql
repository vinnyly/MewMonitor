-- get all cat problems for one cat (just basic info like pname perhaps) (requires just cat key)
-- todo: update select attributes once ui is finished
SELECT pname, severity
FROM Cat_Problem
WHERE uid = ? AND cname = ?;