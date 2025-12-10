-- get all food entries with a matching name (uses LIKE for partial matching)
SELECT fid, brand, name, type, calories, carbs, protein, fat
FROM Food
WHERE name LIKE CONCAT('%', ?, '%');