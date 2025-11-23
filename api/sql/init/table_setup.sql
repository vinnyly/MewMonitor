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

-- 1. User Table
-- Added backticks around `User` because it is a reserved keyword in MySQL.
CREATE TABLE `User` (
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

-- 2. Cat Table
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

-- 3. Food Table
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

-- 4. Feeds Table
CREATE TABLE Feeds (
    uid INT NOT NULL,
    cname VARCHAR(30) NOT NULL,
    fid INT NOT NULL,
    feed_date DATE NOT NULL,
    feed_time TIME NOT NULL,
    
    PRIMARY KEY (uid, cname, fid, feed_date, feed_time),
    
    -- This is the MAJOR fix. We must reference both columns of the Cat Primary Key.
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE,
    FOREIGN KEY (fid) REFERENCES Food(fid) ON DELETE CASCADE

);

-- 5. Medicinal Problem Table
CREATE TABLE Medicinal_Problem (
    Mname VARCHAR(65) NOT NULL,
    description VARCHAR(1024),

    PRIMARY KEY (Mname)
);

-- 6. Diet Plan Table
CREATE TABLE Diet_Plan (
    uid INT NOT NULL,
    cname VARCHAR(30) NOT NULL,
    dp_number INT NOT NULL, 
    feeding_Intervals INT NOT NULL,
    feeding_portion INT,
    description VARCHAR(1024),  --Is this enough characters?

    CONSTRAINT chk_feedingint CHECK (feeding_Intervals > 0),
    CONSTRAINT chk_feedingportion CHECK (feeding_portion > 0),
    PRIMARY KEY(dp_number), 
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE

);

-- 7. Cat Problem Table
CREATE TABLE Cat_Problem (
    uid INT NOT NULL,
    cname VARCHAR(30) NOT NULL,
    pname VARCHAR(65) NOT NULL,
    diagnosis_date DATE,
    severity CHAR(10) NOT NULL,
    description VARCHAR(1024),

    CONSTRAINT chk_severity CHECK (severity = 'Low' OR severity = 'Moderate' OR severity = 'Severe'),
    PRIMARY KEY (uid, cname, pname),

    -- Fixing Foreign Key reference to Cat table
    -- Foreign key pname must reference Medicinal_Problem table
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid,name) ON DELETE CASCADE,
    FOREIGN KEY (pname) REFERENCES Medicinal_Problem(Mname) ON DELETE CASCADE

);

-- 8. Refereced In Table
CREATE TABLE Referenced_In (
    uid INT NOT NULL,
    cname VARCHAR(30) NOT NULL,
    dp_number INT NOT NULL,
    fid INT NOT NULL,

    PRIMARY KEY (uid, cname, dp_number, fid),
    FOREIGN KEY (uid, cname) REFERENCES Cat(uid, name) ON DELETE CASCADE,
    FOREIGN KEY (dp_number) REFERENCES Diet_Plan(dp_number) ON DELETE CASCADE,
    FOREIGN KEY (fid) REFERENCES Food(fid) ON DELETE CASCADE
);