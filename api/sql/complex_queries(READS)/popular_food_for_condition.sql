-- Find Most Popular Food Brands for Cats with a Specific Condition
/* Parameters:
 * 1. pname (condition name)
 */
SELECT 
    F.brand,
    COUNT(DISTINCT CP.uid, CP.cname) AS popularity_count -- uses distinct so data isn't skewed by multiple feeding entries
FROM Cat_Problem CP
    JOIN Feeds FD ON CP.uid = FD.uid AND CP.cname = FD.cname
    JOIN Food F ON FD.fid = F.fid
WHERE 
    CP.pname = ?
GROUP BY 
    F.brand
ORDER BY 
    popularity_count DESC;