-- Count Health Conditions by Age Group

SELECT 
    C.age, 
    CP.pname AS Condition_Name, 
    COUNT(*) AS Cases_Count
FROM Cat C
JOIN Cat_Problem CP ON C.uid = CP.uid AND C.name = CP.cname
GROUP BY C.age, CP.pname
ORDER BY C.age ASC, Cases_Count DESC;