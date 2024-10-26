create table tipo_usuario(
	id_tipo_usuario int primary key not null,
	nombre			 varchar(30)
);

insert into tipo_usuario (id_tipo_usuario, nombre) values (1, 'Administrador');
insert into tipo_usuario (id_tipo_usuario, nombre) values (2, 'Gerente de Proyecto');
insert into tipo_usuario (id_tipo_usuario, nombre) values (3, 'Analista de Calidad');
insert into tipo_usuario (id_tipo_usuario, nombre) values (4, 'Desarrollador');

create table usuario(
	id_usuario 	SERIAL PRIMARY KEY NOT NULL,
	nombre 				varchar(50) not null,
	email 				varchar(50) not null,
	pass				varchar(255) not null,
	fk_tipo_usuario		int,
	foreign key(fk_tipo_usuario) references tipo_usuario(id_tipo_usuario)
);

insert into usuario (nombre, email, pass, fk_tipo_usuario) values ('admin', 'admin@gmail.com', 'admmin', 1);

create table proyecto(
	id_proyecto 	SERIAL PRIMARY KEY NOT NULL,
	nombre			varchar(50),
	fecha_inicio	date,
	fecha_final		date
);

create table proyecto_usuario(
	fk_id_usuario	int,
	fk_id_proyecto	int,
	foreign key (fk_id_usuario) references usuario(id_usuario),
	foreign key (fk_id_proyecto) references proyecto(id_proyecto),
	primary key (fk_id_usuario, fk_id_proyecto)
);

create table tipo_tarea(  
	id_tipo_tarea	int primary key,
	etiqueta	varchar(30)
);

INSERT INTO tipo_tarea (id_tipo_tarea, etiqueta) values (1, 'Nueva Tarea');
INSERT INTO tipo_tarea (id_tipo_tarea, etiqueta) values (2, 'Correccion Tarea');

create table estado(
	id_estado	int primary key,
	nombre		varchar(30)
);

INSERT INTO estado (id_estado, nombre) values (1, 'En Proceso');
INSERT INTO estado (id_estado, nombre) values (2, 'Completada');
INSERT INTO estado (id_estado, nombre) values (3, 'Sin Terminar');

create table prioridad(
	id_prioridad	int primary key,
	categoria		varchar(25)
);

INSERT INTO prioridad (id_prioridad, categoria) values (1, 'Baja');
INSERT INTO prioridad (id_prioridad, categoria) values (2, 'Mediana');
INSERT INTO prioridad (id_prioridad, categoria) values (3, 'Urgente');

create table tareas(
	id_tarea			serial primary key not null,
	nombre				varchar(50)not null,
	descripcion			varchar(250),
	fecha_inicio		date,
	fecha_final			date,
	fecha_completado	date,
	fk_id_tipo_tarea	int,
	fk_id_estado 		int, 
	fk_id_prioridad		int,
	fk_id_proyecto		int,
	fk_id_responsable	int, 
	fk_id_supervisor	int, 
	foreign key(fk_id_tipo_tarea) references TIPO_TAREA(id_tipo_tarea),
	foreign key(fk_id_estado) references ESTADO(id_estado),
	foreign key(fk_id_prioridad) references PRIORIDAD(id_prioridad),
	foreign key(fk_id_proyecto) references PROYECTO(id_proyecto),
	foreign key(fk_id_responsable) references USUARIO(id_usuario),
	foreign key(fk_id_supervisor) references USUARIO(id_usuario)
);

create table plan_prueba(
	id_plan_prueba	serial primary key not null,
	descripcion 	varchar(200),
	anotaciones		varchar(250),
	fecha			date,
	fk_id_proyecto	int not null,
	foreign key(fk_id_proyecto) references proyecto(id_proyecto)
);

create table tipo_prueba(
	id_tipo_prueba	int primary key not null,
	nombre 			varchar(50)
);

INSERT INTO tipo_prueba (id_tipo_prueba, nombre) values (1, 'Prueba Unitaria');
INSERT INTO tipo_prueba (id_tipo_prueba, nombre) values (2, 'Prueba funcional');
INSERT INTO tipo_prueba (id_tipo_prueba, nombre) values (3, 'Prueba de intregracion');
INSERT INTO tipo_prueba (id_tipo_prueba, nombre) values (4, 'Prueba de regresion');

create table prueba(
	id_prueba			serial primary key not null,
	definicion 			varchar(250),
	datos				varchar(250),
	criterioAceptacion	varchar(250),
	aprobacion			bool,
	fk_id_plan_prueba	int not null,
	fk_id_tarea			int not null,
	fk_id_tipo_prueba	int,
	foreign key(fk_id_plan_prueba) references plan_prueba(id_plan_prueba),
	foreign key(fk_id_tarea) references tareas(id_tarea),
	foreign key(fk_id_tipo_prueba) references tipo_prueba(id_tipo_prueba)
);

create table clasificacion_falla(
	id_clasificacion_falla	int primary key not null,
	nombre					varchar(50)
);

INSERT INTO clasificacion_falla (id_clasificacion_falla, nombre) values (1, 'Error de Cálculo');
INSERT INTO clasificacion_falla (id_clasificacion_falla, nombre) values (2, 'Error de Lógica');
INSERT INTO clasificacion_falla (id_clasificacion_falla, nombre) values (3, 'Error de Integración');
INSERT INTO clasificacion_falla (id_clasificacion_falla, nombre) values (4, 'Error de Validación');
INSERT INTO clasificacion_falla (id_clasificacion_falla, nombre) values (5, 'Error de Regresión');

create table falla(
	id_falla					serial primary key not null,
	descripcion					varchar(250) not null,
	fk_id_prueba				int not null,
	fk_id_tarea					int not null,
	fk_id_clasificacion_falla	int not null,
	foreign key (fk_id_prueba) references prueba(id_prueba),
	foreign key (fk_id_tarea) references tareas(id_tarea),
	foreign key (fk_id_clasificacion_falla) references clasificacion_falla(id_clasificacion_falla)
);





