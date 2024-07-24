INSERT INTO Category (Name, Description, ParentId, Image, IsActive) VALUES
("Programming", "Programming", null, null, 1),
("Web", "Web", null, null, 1),
("Web-Full-Stack", "Web-Full-Stack", null, null, 1),
("API", "API", null, null, 1),
("Mobile", "Mobile", null, null, 1),
("Desktop App", "Desktop App", null, null, 1),
("Database", "Database", null, null, 1),
("UX/UI", "UX/UI", null, null, 1),
("Video Editor", "Video Editor", null, null, 1),
("Designer", "Designer", null, null, 1),
("Security", "Security", null, null, 1)


INSERT INTO Course (CategoryId, Name, Description, Image, TotalHour, Price, IsActive) VALUES
(1, 'C Programming', 'C Programming', null, 40, 50, 1),
(1, 'C++/C++ OOP', 'C++/C++ OOP', null, 40, 60, 1),
(1, 'Basic Python', 'Basic Python', null, 40, 60, 1),
(1, 'Basic C#', 'Basic C#', null, 40, 60, 1),
(1, 'Basic Java', 'Basic Java', null, 40, 60, 1),


(2, 'HTML/CSS', 'HTML/CSS', null, 40, 60, 1),
(2, 'JavaScript', 'JavaScript', null, 40, 60, 1),
(2, 'ReactJS', 'ReactJS', null, 40, 60, 1),
(2, 'NextJS', 'NextJS', null, 40, 60, 1),
(2, 'VueJS', 'VueJS', null, 40, 60, 1),
(2, 'AngularJS', 'AngularJS', null, 40, 60, 1),
(2, 'PHP', 'PHP', null, 40, 60, 1),
(2, 'Laravel', 'Laravel', null, 40, 60, 1),

(3, 'React-Node-MySQL', 'React-Node-MySQL', null, 40, 70, 1),
(3, 'React-JavaScript_MySQL', 'React-JavaScript_MySQL', null, 40, 70, 1),
(3, 'React-Laravel-MySQL', 'React-Laravel-MySQL', null, 40, 70, 1),

(4, 'Laravel-MySQL', 'Laravel-MySQL', null, 40, 70, 1),
(4, 'Node-Express-MySQL', 'Node-Express-MySQL', null, 40, 70, 1),
(4, 'NestJS-MySQl', 'NestJS-MySQl', null, 40, 70, 1),
(4, 'JavaSpring-MySQL', 'JavaSpring-MySQL', null, 40, 70, 1)