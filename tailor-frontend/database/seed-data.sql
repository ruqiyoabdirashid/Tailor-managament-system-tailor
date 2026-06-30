-- CORRECT INSERTS (magacyada columns waa inay la mid noqdaan CREATE TABLE)

USE tailormanagementsystemdb;
GO

-- Hore u tirtir haddii aad mar kale run gareyso (optional)
-- DELETE FROM Payments; DELETE FROM Measurements; DELETE FROM Orders; DELETE FROM Tailors; DELETE FROM Customers;

INSERT INTO Customers (CustomerName, Phone, Address)
VALUES ('Ahmed Ali', '0611111111', 'Mogadishu');

INSERT INTO Tailors (TailorName, Phone, Specialty)
VALUES ('Mohamed Xasan', '0622222222', 'Suits');

INSERT INTO Orders (CustomerID, TailorID, OrderDate, DeliveryDate, TotalAmount)
VALUES (1, 1, GETDATE(), '2026-07-01', 50.00);

INSERT INTO Measurements (CustomerID, Chest, Waist, Length)
VALUES (1, 40.00, 34.00, 50.00);

INSERT INTO Payments (OrderID, PaymentDate, AmountPaid)
VALUES (1, GETDATE(), 50.00);

-- Hubi xogta
SELECT * FROM Customers;
SELECT * FROM Tailors;
SELECT * FROM Orders;
SELECT * FROM Measurements;
SELECT * FROM Payments;
