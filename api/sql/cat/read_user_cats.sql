-- get homepage info for all cats of a user 
SELECT name, age, breed
FROM Cat
WHERE uid = ?;