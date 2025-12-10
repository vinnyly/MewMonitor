-- get all food entries with a specific name (this is needed in case we dont know the fid and there are multiple entries)
SELECT fid, brand, name, type, calories, carbs, protein, fat
FROM Food
WHERE name = ?;