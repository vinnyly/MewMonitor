-- create a user with minimum required info (attributes that cannot be NULL)
INSERT INTO `User` (email, password)
VALUES (?, ?);