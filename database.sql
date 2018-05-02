CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);


CREATE TABLE schedule_group (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	active BOOLEAN DEFAULT TRUE,
	date_created TIMESTAMP,
	user_id INT REFERENCES person
);

CREATE TABLE schedule (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100),
	date TIMESTAMP,
	schedule_group_id INT REFERENCES schedule_group
);

CREATE TABLE schedule_item (
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	type VARCHAR (100) NOT NULL,
	github VARCHAR (100),
	description VARCHAR (1000),
	schedule_id INT REFERENCES schedule
);

INSERT INTO schedule_group (name, date_created, user_id) VALUES ('hadar', '4/30/2018', 1);

INSERT INTO schedule (name, date, schedule_group_id) VALUES ('React-Redux', '5/15/2018', 2);

INSERT INTO schedule_item(name, type, github, description, schedule_id) 
VALUES ('Redux Lecture', 'lecture', 'N/A', 'fun stuff', 1), 
('React Lecture', 'lecture','N/A', 'more fun', 1), ('Lunch @ 12', 'misc', 'N/A', 'yummy stuff', 1), 
('Guest Speaker', 'event', 'N/A', 'interesting stuff', 1), 
('Redux activity', 'activity', 'N/A', 'group stuff', 1), 
('Weekend Challenge', 'HW',  'N/A', 'Hard stuff', 1);