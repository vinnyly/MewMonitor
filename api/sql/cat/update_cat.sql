-- update a cat (can update all values except uid and name)
UPDATE Cat
SET weight = ?, breed = ?, age = ?, gender = ?
WHERE uid = ? AND name = ?;