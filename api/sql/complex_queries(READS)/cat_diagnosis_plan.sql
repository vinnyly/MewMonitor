-- List All Cats Diagnosed with a Specific Health Condition and Their Diet Plan
/* Parameters:
 * 1. target condition
 */

SELECT 
    C.name AS Cat_Name, 
    MP.Mname AS Diagnosis, 
    DP.description AS Diet_Description,
    DP.feeding_interval,
    DP.feeding_portion
FROM Cat C
JOIN Cat_Problem CP ON C.uid = CP.uid AND C.name = CP.cname
JOIN Medicinal_Problem MP ON CP.pname = MP.Mname
JOIN Diet_Plan DP ON C.uid = DP.uid AND C.name = DP.cname
WHERE MP.Mname = ?;