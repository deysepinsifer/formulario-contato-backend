CREATE TABLE solicitacao (
  id int NOT NULL primary key AUTO_INCREMENT,
  mensagem varchar(5000) NOT NULL,
  cliente_id int(11) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);
 

ALTER table solicitacao add CONSTRAINT fk_cliente_solicitacao FOREIGN KEY (cliente_id) REFERENCES cliente (id);