-- get a users uid and password based off their email
SELECT uid, password
FROM `User`
WHERE
    email = '?';