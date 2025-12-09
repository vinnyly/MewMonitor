-- update user info
UPDATE `User`
SET name = ?, email = ?, phone = ?, password = ?, num_cats = ?
WHERE uid = ?;