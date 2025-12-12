-- Calculate Average Daily Nutritional(Calories, Carbs, Protein, Fat) intake for a specific cat

/* Parameters:
 * 1. uid
 * 2. name (of cat)
 */
SELECT 
    T.uid, 
    T.cname, 
    AVG(T.daily_calories) AS Avg_Daily_Calories,
    AVG(T.daily_carbs) AS Avg_Daily_Carbs,
    AVG(T.daily_protein) AS Avg_Daily_Protein,
    AVG(T.daily_fat) AS Avg_Daily_Fat
FROM (
    -- Inner Query: Calculate totals per day
    SELECT 
        F.uid, 
        F.cname, 
        F.feed_date, 
        SUM(FD.calories) AS daily_calories, 
        SUM(FD.carbs) AS daily_carbs,
        SUM(FD.protein) AS daily_protein,
        SUM(FD.fat) AS daily_fat
    FROM Feeds F
    JOIN Food FD ON F.fid = FD.fid
    WHERE F.uid = ? AND F.cname = ?
    GROUP BY F.uid, F.cname, F.feed_date
) AS T
GROUP BY T.uid, T.cname;