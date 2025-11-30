-- Disable foreign key checks temporarily to ensure tables drop/create cleanly
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `Feeds`;
DROP TABLE IF EXISTS `Food`;
DROP TABLE IF EXISTS `Cat`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Diet_Plan`;
DROP TABLE IF EXISTS `Cat_Problem`;
DROP TABLE IF EXISTS `Medicinal_Problem`;
DROP TABLE IF EXISTS `Referenced_In`;

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE `User` ( -- Added backticks around `User` because it is a reserved keyword in MySQL.
    uid BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(64),
    email VARCHAR(254) UNIQUE NOT NULL,
    phone CHAR(12),
    password VARCHAR(128) NOT NULL,
    num_cats INT NOT NULL DEFAULT 0,

    CONSTRAINT chk_email CHECK(email LIKE '%@%.%'),
    CONSTRAINT chk_phone CHECK(phone LIKE '___-___-____'),
    PRIMARY KEY (uid)
);

CREATE TABLE Cat (
    uid BIGINT UNSIGNED NOT NULL,
    name VARCHAR(64) NOT NULL,
    weight DECIMAL(4,2),
    breed VARCHAR(64),
    age INT,
    gender CHAR(1),

    CONSTRAINT chk_weight CHECK(weight BETWEEN 1 AND 100),
    CONSTRAINT chk_age CHECK(age BETWEEN 1 AND 50),
    CONSTRAINT chk_gender CHECK(gender='M' OR gender='F'),
    PRIMARY KEY (uid, name),
    FOREIGN KEY (uid) REFERENCES `User`(uid) ON DELETE CASCADE
);

CREATE TABLE Diet_Plan (
    uid BIGINT UNSIGNED NOT NULL,
    cname VARCHAR(64) NOT NULL,
    dp_number INT UNSIGNED NOT NULL, 
    feeding_interval INT UNSIGNED NOT NULL,
    feeding_portion INT UNSIGNED,
    description VARCHAR(1024),

    PRIMARY KEY(uid, cname, dp_number), 
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE
);

CREATE TABLE Cat_Problem (
    uid BIGINT UNSIGNED NOT NULL,
    cname VARCHAR(64) NOT NULL,
    pname VARCHAR(64) NOT NULL,
    diagnosis_date DATE,
    severity CHAR(10),
    description VARCHAR(1024),

    CONSTRAINT chk_severity CHECK (severity = 'Low' OR severity = 'Moderate' OR severity = 'Severe'),
    PRIMARY KEY (uid, cname, pname),
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid,name) ON DELETE CASCADE,
    FOREIGN KEY (pname) REFERENCES Medicinal_Problem(Mname) ON DELETE CASCADE
);

CREATE TABLE Food (
    fid BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    brand VARCHAR(64),
    name VARCHAR(64) NOT NULL,
    type CHAR(5),
    calories DECIMAL(4, 2),
    carbs DECIMAL(4, 2),
    protein DECIMAL(4, 2),
    fat DECIMAL(4, 2),

    CONSTRAINT chk_calories CHECK(calories >= 0),
    CONSTRAINT chk_nutrients CHECK(carbs >= 0 AND protein >= 0 AND fat >= 0),
    CONSTRAINT chk_type CHECK(type = 'Wet' OR type = 'Dry' OR type = 'Mixed'),
    PRIMARY KEY (fid)
);

CREATE TABLE Feeds (
    uid BIGINT NOT NULL,
    cname VARCHAR(64) NOT NULL,
    fid BIGINT NOT NULL,
    feed_date DATE NOT NULL,
    feed_time TIME NOT NULL,

    PRIMARY KEY (uid, cname, fid, feed_date, feed_time),
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE,
    FOREIGN KEY (fid) REFERENCES Food(fid) ON DELETE CASCADE
);

CREATE TABLE Medicinal_Problem (
    Mname VARCHAR(64) NOT NULL,
    description VARCHAR(1024),

    PRIMARY KEY (Mname)
);

CREATE TABLE Referenced_In (
    uid BIGINT NOT NULL,
    cname VARCHAR(64) NOT NULL,
    dp_number BIGINT NOT NULL,
    fid BIGINT NOT NULL,

    PRIMARY KEY (uid, cname, dp_number, fid),
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE,
    FOREIGN KEY (dp_number) REFERENCES Diet_Plan(dp_number) ON DELETE CASCADE,
    FOREIGN KEY (fid) REFERENCES Food(fid) ON DELETE CASCADE
);