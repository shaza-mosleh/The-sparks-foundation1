CREATE DATABASE bankingg_system;

USE bankingg_system;

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
);

INSERT INTO customers (name, email, balance) VALUES
    ('John Doe', 'john@example.com', 1000.00),
    ('Jane Smith', 'jane@example.com', 1500.00),
    ('Alice Johnson', 'alice@example.com', 2000.00),
    ('Shaza Hamdy', 'Shaza@example.com', 33000.00),
    ('Shady Hamdy', 'Shady@example.com', 200000.00),
    ('Hamdy Mosleh', 'Hamdy@example.com', 500000.00),
    ('Ilan Hamdy', 'Ilan@example.com', 11111000.00),
    ('Elham Ahmed', 'Elham@example.com', 205200.00),
    ('Daryn Essam', 'Daryn@example.com', 4000000.00);


    
