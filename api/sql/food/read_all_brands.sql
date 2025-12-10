-- retrieves all distinct food brands
SELECT DISTINCT brand
FROM Food
WHERE brand IS NOT NULL
ORDER BY brand;
