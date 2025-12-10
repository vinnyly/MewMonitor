/*
 * get all foods' details for a diet plan
 *
 * Parameters:
 * 1. uid
 * 2. dp_number
 */
SELECT F.fid, F.brand, F.name, F.type, F.calories, F.carbs, F.protein, F.fat
FROM Food F
JOIN Referenced_In R ON F.fid = R.fid
WHERE R.uid = ? AND R.dp_number = ?;