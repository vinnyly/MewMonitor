-- add a cat problem to a cat
-- uid, cname, pname are required; rest can be NULL
INSERT INTO Cat_Problem (uid, cname, pname, diagnosis_date, severity, description)
VALUES (?, ?, ?, ?, ?, ?);