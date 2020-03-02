CREATE TABLE IF NOT EXISTS test.products(
    id VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    type VARCHAR(100) NOT NULL,
    stock INT,
    enabled BOOLEAN,
    url VARCHAR(250),
    primary KEY (ID)
);
CREATE TABLE IF NOT EXISTS test.users(
    id VARCHAR(255) NOT NULL,
    login VARCHAR(30) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    pwd VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID)
);