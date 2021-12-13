CREATE TABLE cliente (
  id int(11) NOT NULL primary key AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  telefone varchar(15) NOT NULL,
  email varchar(30) NOT NULL UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);