
CREATE DATABASE IF NOT EXISTS `hcmut_spss`;

USE `hcmut_spss`;

CREATE TABLE IF NOT EXISTS `Student` (
    `username` varchar(255) primary key,
    `password` varchar(255) not null,
    `stu_id` char(7) unique not null,
    `stu_name` varchar(255) not null,
    `page_num` int
);

CREATE TABLE IF NOT EXISTS `SPSO` (
    `username` varchar(255) primary key,
    `password` varchar(255) not null
);

CREATE TABLE IF NOT EXISTS `Printer` (
    `printer_id` int auto_increment primary key,
    `num_paper` int,
    `location` varchar(255),
    `status` varchar(255),
    `printer_name` varchar(255),
    `ip` varchar(255)
);

CREATE TABLE IF NOT EXISTS `Request` (
    `file_name` VARCHAR(255), 
    `request_id` INT AUTO_INCREMENT,
    `paper_size` VARCHAR(10),
    `num_copies` INT,
    `side_option` TINYINT(1), 

    `selected_pages` JSON, 
    `status` VARCHAR(255),
    `start_date` DATE, 
    `end_date`	DATE,
    `received_date` DATE, 
    `student_send` VARCHAR(255),
    `printer_id` INT,
    PRIMARY KEY (`request_id`, `student_send`),
    FOREIGN KEY (`student_send`) REFERENCES `Student`(`username`),
    FOREIGN KEY (`printer_id`) REFERENCES `Printer`(`printer_id`)
);

CREATE TABLE IF NOT EXISTS `Report` (
    `report_id` int auto_increment primary key,
    `report_time` datetime, 
    `report_type` varchar(255)
);

CREATE TABLE IF NOT EXISTS `SPSO_Manage_Printer` (
    `SPSO_username` varchar(255),
    `Printer_id` int,
    `time_manage` datetime,
    primary key (`SPSO_username`, `Printer_id`),
    foreign key (`SPSO_username`) references `SPSO`(`username`),
    foreign key (`Printer_id`) references `Printer`(`printer_id`)
);

CREATE TABLE IF NOT EXISTS `Report_reference` (
    `report_id` int,
    `request_id` int,
    `student_send` varchar(255),
    primary key (`report_id`, `request_id`),
    foreign key (`report_id`) references `Report`(`report_id`),
    foreign key (`request_id`, `student_send`) references `Request`(`request_id`, `student_send`)
);

CREATE TABLE IF NOT EXISTS `maintenance` (
    `id` int auto_increment primary key,
    `content` text,
    `date_update` datetime,
    `spso_update` varchar(255),
    foreign key (`spso_update`) references `SPSO`(`username`)
);

CREATE TABLE IF NOT EXISTS `guideline` (
    `id` int auto_increment primary key,
    `content` text,
    `date_update` datetime,
    `spso_update` varchar(255),
    foreign key (`spso_update`) references `SPSO`(`username`)
);

CREATE TABLE IF NOT EXISTS `contact` (
    `id` int auto_increment primary key,
    `content` text,
    `date_update` datetime,
    `spso_update` varchar(255),
    foreign key (`spso_update`) references `SPSO`(`username`)
);

INSERT IGNORE INTO `Student` (`username`, `password`, stu_id, stu_name, page_num)
VALUES
('student1', 'password1', '2252898', 'Huỳnh Ngọc Văn', 100);


INSERT IGNORE INTO `SPSO` (`username`, `password`)
VALUES
('spso1', 'password1');

INSERT IGNORE INTO `maintenance` (`content`, `date_update`)
VALUES
('Ahahahahahahahahahhahahaahahahhahahahahahahahahahaha', '2024-11-25 15:30:30');

-- INSERT IGNORE INTO `Printer` (`num_paper`, `location`, `status`, `printer_name`, `ip`)
-- VALUES
--   (100, '402A5-CS1', 'Bật', 'Printer A5', '192.168.1.1'),
--   (200, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
--   (110, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
--   (200, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4'),
--   (105, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
--   (300, '402A1-CS1', 'Bảo trì', 'Printer A1', '192.168.1.5'),
--   (200, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4'),
--   (200, '402A3-CS1', 'Tắt', 'Printer A3', '192.168.1.3'),
--   (100, '402A5-CS1', 'Bảo trì', 'Printer A5', '192.168.1.1'),
--   (110, '402A6-CS1', 'Bật', 'Printer A6', '192.168.1.6'),
--   (102, '402A7-CS1', 'Tắt', 'Printer A7', '192.168.1.7'),
--   (101, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
--   (105, '402A4-CS1', 'Bật', 'Printer A4', '192.168.1.2'),
--   (100, '402A5-CS1', 'Tắt', 'Printer A5', '192.168.1.1'),
--   (140, '402A7-CS1', 'Bảo trì', 'Printer A7', '192.168.1.7'),
--   (150, '402A5-CS1', 'Bật', 'Printer A5', '192.168.1.1'),
--   (50, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
--   (105, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
--   (100, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4');
  



-- INSERT IGNORE INTO `Request` 
-- (`file_name`, `paper_size`, `num_copies`, `side_option`, `selected_pages`, `status`, `start_date`, `end_date`, `received_date`, `student_send`, `printer_id`)
-- VALUES
-- ('assignment1.doc', 'A4', 2, 1, '"All"', "Đã nhận", '2024-11-01', '2024-11-02', '2024-11-03', 'student1', 1),
-- ('report2.pdf', 'A3', 1, 2 , '"All"', "Chưa nhận", '2024-11-02', '2024-11-03', '2024-11-04', 'student1', 2),
-- ('notes3.doc', 'A4', 3, 2, '"All"', "Đã nhận", '2024-11-03', '2024-11-04', '2024-11-05', 'student1', 3),
-- ('project4.pdf', 'A3', 4, 1, '"All"', "Chưa nhận", '2024-11-04', '2024-11-05', '2024-11-06', 'student1', 4),
-- ('document5.doc', 'A4', 1, 1, '"All"', "Đã nhận", '2024-11-05', '2024-11-06', '2024-11-07', 'student1', 5),
-- ('assignment6.pdf', 'A3', 2, 2, '"All"', "Chưa nhận", '2024-11-06', '2024-11-07', '2024-11-08', 'student1', 6),
-- ('summary7.doc', 'A4', 5, 1, '"All"', "Đã nhận", '2024-11-07', '2024-11-08', '2024-11-09', 'student1', 7),
-- ('presentation8.pdf', 'A3', 3, 2, '"All"', "Chưa nhận", '2024-11-08', '2024-11-09', '2024-11-10', 'student1', 8),
-- ('report9.doc', 'A4', 4, 2, '"All"', "Đã nhận", '2024-11-09', '2024-11-10', '2024-11-11', 'student1', 9),
-- ('notes10.pdf', 'A3', 1, 2, '"All"', "Chưa nhận", '2024-11-10', '2024-11-11', '2024-11-12', 'student1', 10);
