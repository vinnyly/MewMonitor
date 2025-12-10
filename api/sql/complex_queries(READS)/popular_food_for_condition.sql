-- Find Most Popular Food Brands for Cats with a Specific Condition
/* Parameters:
 * 1. pname (condition name)
 */
SELECT 
    CP.pname,
    FD.brand, 
    COUNT(*) AS popularity_count
FROM Cat_Problem CP
JOIN Feeds F ON CP.uid = F.uid AND CP.cname = F.cname
JOIN Food FD ON F.fid = FD.fid
WHERE CP.pname = ?
GROUP BY FD.brand
ORDER BY popularity_count DESC;