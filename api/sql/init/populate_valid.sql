INSERT INTO `User` (uid, name, email, phone, password, num_cats)
VALUES
(1, 'Alice Smith', 'alice@email.com', '123-456-7890', 'pass123', 1),
(2, 'Bob Johnson', 'bob@work.org', '234-567-8901', 'secureP@ss', 2),
(3, 'Charlie Brown', 'charlie@web.net', '345-678-9012', 'myPassword!', 1),
(4, 'David Lee', 'd.lee@mail.com', '456-789-0123', 'daveLee99', 1),
(5, 'Eve Davis', 'eve.davis@inbox.co', '567-890-1234', 'eve!2025', 0);

INSERT INTO Cat (uid, name, weight, breed, age, gender)
VALUES
(1, 'Fluffy', 9.50, 'Persian', 5, 'F'),
(2, 'Whiskers', 11.20, 'Siamese', 3, 'M'),
(2, 'Shadow', 14.10, 'Maine Coon', 7, 'M'),
(3, 'Luna', 8.70, 'Tabby', 2, 'F'),
(4, 'Simba', 12.00, 'Bengal', 4, 'M');

INSERT INTO Food (fid, brand, name, type, calories, carbs, protein, fat)
VALUES
(101, 'PurrfectPaws', 'Salmon Delight', 'Wet', 150, 10, 20, 5),
(102, 'KibbleKing', 'Chicken Crunch', 'Dry', 350, 40, 30, 15),
(103, 'MeowMix', 'Tuna Pate', 'Wet', 120, 5, 15, 8),
(104, 'HealthCat', 'Indoor Formula', 'Dry', 300, 35, 35, 10),
(105, 'PurrfectPaws', 'Ocean Medley', 'Wet', 140, 8, 18, 6);

INSERT INTO Feeds (uid, cname, fid, feed_date, feed_time)
VALUES
(1, 'Fluffy', 101, '2025-11-17', '08:00:00'),
(2, 'Whiskers', 102, '2025-11-17', '08:30:00'),
(2, 'Shadow', 102, '2025-11-17', '08:31:00'),
(3, 'Luna', 103, '2025-11-17', '09:00:00'),
(1, 'Fluffy', 105, '2025-11-17', '18:00:00');