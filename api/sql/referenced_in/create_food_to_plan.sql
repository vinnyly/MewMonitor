/*
 * Links a specific food to a specific diet plan. ASSUMING TS IS HOW IT WORKS FOR FRONTEND. this query would be run alongside the related query that creates a diet plan
 *
 * Parameters:
 * 1. uid
 * 2. cname
 * 3. dp_number
 * 4. fid
 */

INSERT INTO Referenced_In (uid, cname, dp_number, fid)
VALUES (?, ?, ?, ?);