
create table telefone(
	id int primary key auto_increment,	
	tipo varchar(30) not null,
	numero int (15)not null,
	cliente_id int not null,
	createdAt datetime default current_timestamp,
	updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
	);
	
	alter table telefone add constraint fk_cliente_telefone foreign key (cliente_id) references cliente(id);