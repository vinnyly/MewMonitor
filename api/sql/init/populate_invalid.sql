INSERT INTO `User` (uid, name, email, phone, password, num_cats)
VALUES
(6, 'Invalid Email', 'invalid.email.com', '678-901-2345', 'badEmail1', 0),
(7, 'Invalid Phone', 'valid@email.com', '6789012345', 'badPhone1', 0);

INSERT INTO Cat (uid, name, weight, breed, age, gender)
VALUES
(1, 'TinyBad', 0.50, 'Munchkin', 3, 'F'),
(1, 'AncientBad', 9.00, 'Unknown', -1, 'M'),
(1, 'MysteryBad', 8.00, 'Tabby', 4, 'X');

INSERT INTO Food (fid, brand, name, type, calories, carbs, protein, fat)
VALUES
(200, 'TestBrand', 'Raw Formula', 'Raw', 250, 15, 20, 10),
(201, 'TestBrand', 'Unknown Type Food', 'XYZ', 220, 10, 18, 9);

INSERT INTO Diet_Plan (uid, cname, dp_number, feeding_Intervals, feeding_portion, description)
VALUES
(1, 'Fluffy', 999, 0, -10, 'Invalid plan with non-positive feeding values');

INSERT INTO Cat_Problem (uid, cname, pname, diagnosis_date, severity, description)
VALUES
(1, 'Fluffy', 'Obesity', '2025-11-17', 'Mild', 'Should fail: severity not allowed.'),
(1, 'Fluffy', 'NonexistentProblem', '2025-11-17', 'Low', 'Should fail: problem not defined in Medicinal_Problem.');

INSERT INTO Feeds (uid, cname, fid, feed_date, feed_time)
VALUES
(999, 'GhostCat', 101, '2025-11-17', '10:00:00');

INSERT INTO Referenced_In (uid, cname, dp_number, fid)
VALUES
(1, 'Fluffy', 888, 101);
