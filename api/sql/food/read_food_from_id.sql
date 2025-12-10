-- get all food info for one food based off fid
SELECT fid, brand, name, type, calories, carbs, protein, fat
FROM Food
WHERE fid = ?;