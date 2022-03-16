CREATE TABLE users_test_rodolfotagle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(16) NOT NULL,
  second_name VARCHAR(16),
  first_lastname VARCHAR(16) NOT NULL,
  second_lastname VARCHAR(16) NOT NULL,
  birth_date DATE NOT NULL,
  mail VARCHAR(64) NOT NULL,
  phone VARCHAR(16) NOT NULL
);