-- get all feeding entries and food details for a cat
SELECT 
    F.uid,
    F.cname,
    F.fid,
    F.feed_date,
    F.feed_time,
    FD.fid AS food_fid,
    FD.brand AS food_brand,
    FD.name AS food_name,
    FD.`type` AS food_type,
    FD.calories AS food_calories,
    FD.carbs AS food_carbs,
    FD.protein AS food_protein,
    FD.fat AS food_fat
FROM Feeds F 
JOIN Food FD ON F.fid = FD.fid
WHERE F.uid = ? AND F.cname = ?;