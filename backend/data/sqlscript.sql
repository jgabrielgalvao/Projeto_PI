create database Animais;

use Animais;

drop table animais_doar;

create table animais_doar(
    id int(11) PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    raca VARCHAR(60) NOT NULL,
    sexo VARCHAR(60) NOT NULL,
    idade VARCHAR(60) NOT NULL,
    porte VARCHAR(60) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    estado VARCHAR(60) NOT NULL,
    vermifugado VARCHAR(60),
    castrado VARCHAR(60),
    vacinado VARCHAR(60),
    cuidados_especiais VARCHAR(60),
    imagem BLOB
);

SELECT * FROM animais_doar;

INSERT INTO animais_doar (nome, raca, idade, porte, cidade, estado, vermifugado, castrado, vacinado, cuidados_especiais, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)