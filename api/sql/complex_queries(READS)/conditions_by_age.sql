-- get top 5 most popular health conditions by age
/* Parameters:
 * 1. age (cat age)
 */
SELECT 
    CP.pname AS Problem_Name,
    COUNT(*) AS Frequency
FROM Cat C
JOIN Cat_Problem CP ON C.uid = CP.uid AND C.name = CP.cname
WHERE C.age = ?
GROUP BY CP.pname
ORDER BY Frequency DESC
LIMIT 5;