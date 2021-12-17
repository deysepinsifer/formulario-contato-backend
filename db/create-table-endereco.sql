create table endereco(
	id int primary key auto_increment,	
	cep varchar(10),
	logradouro varchar(30)not null,
	endereco varchar(100)not null,
	bairro varchar(100),
	complemento varchar(100),
	cidade varchar(50) not null,
	estado char(2) not null,
	cliente_id int(11) not null,
	createdAt datetime default current_timestamp,
	updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
	);
	
	alter table endereco add constraint fk_cliente_endereco foreign key (cliente_id) references cliente(id);