CREATE TABLE User (
    uid INT NOT NULL,
    name VARCHAR(50),
    email VARCHAR(50) CHECK(email LIKE '%@%.%') UNIQUE,
    phone CHAR(12) CHECK(phone LIKE '___-___-____'),
    password VARCHAR(100),
    num_cats INT NOT NULL DEFAULT 0,
    PRIMARY KEY (uid)
);

CREATE TABLE Cat (
    uid INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    weight DECIMAL(4,2) CHECK(weight BETWEEN 1 AND 100),
    breed VARCHAR(20),
    age INT CHECK(age BETWEEN 0 AND 50),
    gender CHAR(1) CHECK(gender='M' OR gender='F'),
    PRIMARY KEY (uid, name),
    FOREIGN KEY (uid) REFERENCES User(uid)
);

CREATE TABLE Food (
    fid INT NOT NULL,
    brand VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    type CHAR(3) CHECK(type = 'Wet' OR type = 'Dry'),
    calories INT,
    carbs INT,
    protein INT,
    fat INT,
    PRIMARY KEY (fid)
);

CREATE TABLE Feeds (
    uid INT NOT NULL,
    cname VARCHAR(30) NOT NULL,
    fid INT NOT NULL,
    feed_date DATE NOT NULL, -- YYYY:MM:DD
    feed_time CHAR(8) CHECK(feed_time LIKE '__:__:__') NOT NULL, -- HH:MM:SS
    PRIMARY KEY (uid, cname, fid, feed_date, feed_time),
    FOREIGN KEY (uid) REFERENCES User(uid),
    FOREIGN KEY (cname) REFERENCES Cat(name),
    FOREIGN KEY (fid) REFERENCES Food(fid)
);



INSERT INTO User (uid, name, email, phone, password, num_cats)
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