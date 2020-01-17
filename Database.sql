FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
Create database eshop;
CREATE TABLE users ( id int primary key auto_increment, name varchar(20) not null, password varchar(20) not null, email varchar(20) unique not null);