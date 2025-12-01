INSERT INTO `User` VALUES (6, 'Invalid Email', 'invalid.email.com', '678-901-2345', 'badEmail1', 0);

INSERT INTO `User` VALUES (7, 'Invalid Phone', 'valid@email.com', '6789012345', 'badPhone1', 0);

INSERT INTO Cat VALUES (1, 'TinyBad', 0.50, 'Munchkin', 3, 'F');

INSERT INTO Cat VALUES (1, 'AncientBad', 9.00, 'Unknown', -1, 'M');

INSERT INTO Cat VALUES (1, 'MysteryBad', 8.00, 'Tabby', 4, 'X');

INSERT INTO Food VALUES (200, 'TestBrand', 'Raw Formula', 'Raw', 250, 15, 20, 10);

INSERT INTO Food VALUES (201, 'TestBrand', 'Unknown Type Food', 'XYZ', 220, 10, 18, 9);

INSERT INTO Diet_Plan VALUES (1, 'Fluffy', 999, 0, -10, 'Invalid plan with non-positive feeding values');

INSERT INTO Cat_Problem VALUES (1, 'Fluffy', 'Obesity', '2025-11-17', 'Mild', 'Should fail: severity not allowed.');

INSERT INTO Cat_Problem VALUES (1, 'Fluffy', 'NonexistentProblem', '2025-11-17', 'Low', 'Should fail: problem not defined in Medicinal_Problem.');

INSERT INTO Feeds VALUES (999, 'GhostCat', 101, '2025-11-17', '10:00:00');

INSERT INTO Referenced_In VALUES (1, 'Fluffy', 888, 101);
