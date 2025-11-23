-- Disable foreign key checks temporarily to ensure tables drop/create cleanly
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `Feeds`;
DROP TABLE IF EXISTS `Food`;
DROP TABLE IF EXISTS `Cat`;
DROP TABLE IF EXISTS `User`;

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE `User` ( -- Added backticks around `User` because it is a reserved keyword in MySQL.
    uid INT NOT NULL,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    phone CHAR(12),
    password VARCHAR(100),
    num_cats INT NOT NULL DEFAULT 0,
    CONSTRAINT chk_email CHECK(email LIKE '%@%.%'),
    CONSTRAINT chk_phone CHECK(phone LIKE '___-___-____'),
    PRIMARY KEY (uid)
);

CREATE TABLE Cat (
    uid INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    weight DECIMAL(4,2),
    breed VARCHAR(20),
    age INT,
    gender CHAR(1),
    CONSTRAINT chk_weight CHECK(weight BETWEEN 1 AND 100),
    CONSTRAINT chk_age CHECK(age BETWEEN 0 AND 50),
    CONSTRAINT chk_gender CHECK(gender='M' OR gender='F'),
    PRIMARY KEY (uid, name),
    FOREIGN KEY (uid) REFERENCES `User`(uid) ON DELETE CASCADE
);

CREATE TABLE Food (
    fid INT NOT NULL,
    brand VARCHAR(50),
    name VARCHAR(50) NOT NULL,
    type CHAR(3),
    calories INT,
    carbs INT,
    protein INT,
    fat INT,
    CONSTRAINT chk_type CHECK(type = 'Wet' OR type = 'Dry'),
    PRIMARY KEY (fid)
);

CREATE TABLE Feeds (
    uid INT NOT NULL,
    cname VARCHAR(30) NOT NULL,
    fid INT NOT NULL,
    feed_date DATE NOT NULL,
    feed_time TIME NOT NULL,
    PRIMARY KEY (uid, cname, fid, feed_date, feed_time),
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE,
    FOREIGN KEY (fid) REFERENCES Food(fid) ON DELETE CASCADE
);