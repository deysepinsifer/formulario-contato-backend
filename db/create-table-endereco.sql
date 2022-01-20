
create table endereco(
	id int primary key auto_increment,	
	cep varchar(10) not null,
	tipo_de_logradouro varchar(30)not null,
	logradouro varchar(100)not null,
	numero varchar(15) not null,
	complemento varchar(100),
	bairro varchar(100)not null,
	cidade varchar(50) not null,
	estado char(2) not null,
	cliente_id int(11) not null,
	createdAt datetime default current_timestamp,
	updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
	);
	
	alter table endereco add constraint fk_cliente_endereco foreign key (cliente_id) references cliente(id);

