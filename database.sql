CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);


CREATE TABLE schedule_group (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	active BOOLEAN DEFAULT TRUE,
	user_id INT REFERENCES person ON DELETE CASCADE
);

CREATE TABLE schedule (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100),
	date TIMESTAMP,
	schedule_group_id INT REFERENCES schedule_group ON DELETE CASCADE
);

CREATE TABLE schedule_item (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	github VARCHAR (100),
	description VARCHAR (1000),
	order_id INT,
	schedule_id INT REFERENCES schedule ON DELETE CASCADE
);

INSERT INTO schedule_group (name, user_id) VALUES ('hadar', 1);

INSERT INTO schedule (name, date, schedule_group_id) VALUES ('React-Redux', '5/15/2018', 2);

INSERT INTO schedule_item(name, github, description, order_id, schedule_id) 
VALUES ('Redux Lecture', 'N/A', 'fun stuff', 1, 1), 
('React Lecture','N/A', 'more fun', 2, 1), ('Lunch @ 12', 'N/A', 'yummy stuff', 3, 1), 
('Guest Speaker', 'N/A', 'interesting stuff', 4, 1), 
('Redux activity', 'N/A', 'group stuff', 5, 1), 
('Weekend Challenge', 'N/A', 'Hard stuff', 6, 1);
