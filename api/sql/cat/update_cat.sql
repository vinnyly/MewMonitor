-- update a cat (can update all values except uid)
UPDATE Cat
SET name = ?, weight = ?, breed = ?, age = ?, gender = ?
WHERE uid = ? AND name = ?;