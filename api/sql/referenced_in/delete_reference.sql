/*
 * Unlinks a food from a diet plan
 *
 * Parameters:
 * 1. uid
 * 2. dp_number
 * 3. fid
 */
DELETE FROM Referenced_In
WHERE uid = ? AND dp_number = ? AND fid = ?;