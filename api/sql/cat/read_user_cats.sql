-- get homepage info for all cats of a user 
SELECT name, age, breed, weight, gender
FROM Cat
WHERE uid = ?;