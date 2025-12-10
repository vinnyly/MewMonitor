-- update food entry in database (will accept args to update all values) (requires full key)

/* Parameters:
 * 1. brand
 * 2. name
 * 3. type
 * 4. calories
 * 5. carbs
 * 6. protein
 * 7. fat
 * 8. fid
 */
UPDATE Food
SET brand = ?, name = ?, type = ?, calories = ?, carbs = ?, protein = ?, fat = ?
WHERE fid = ?;