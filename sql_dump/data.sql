DROP DATABASE IF EXISTS nodetest;
CREATE DATABASE nodetest;
grant all on nodetest.* to 'ncadmin'@'localhost';
USE nodetest;

-- task_list
DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks(
	-- Attributes --
	id INT(11) NOT NULL AUTO_INCREMENT,
	statusId INT(11) NOT NULL,
	name VARCHAR(255) DEFAULT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- task_status
DROP TABLE IF EXISTS statuses;
CREATE TABLE statuses(
	-- Attributes --
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) DEFAULT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

ALTER TABLE tasks ADD
    CONSTRAINT  FK_task_status  FOREIGN KEY (statusId) REFERENCES statuses (id) on update cascade on delete restrict;

INSERT INTO statuses (id, name) VALUES (1,'New'),(2,'In work'),(3,'Finished');
INSERT INTO tasks (name,statusId) VALUES ('Make todo list',3),('Learn node.js',2),('Go to grocery store',1);
