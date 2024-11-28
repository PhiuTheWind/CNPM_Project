CREATE DATABASE IF NOT EXISTS `hcmut_spss`;

USE `hcmut_spss`;

CREATE TABLE IF NOT EXISTS `Student` (
    `username` varchar(255) primary key,
    `password` varchar(255) not null,
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
    `status` varchar(255)
);

CREATE TABLE IF NOT EXISTS `Request` (
    `file_name` VARCHAR(255), 
    `request_id` INT AUTO_INCREMENT,
    `paper_size` VARCHAR(10),
    `num_copies` INT,
    `side_option` TINYINT(1), 
    `page_range` VARCHAR(255),
    `selected_pages` JSON, 
    `status` VARCHAR(255),
    `start_date` DATE, 
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

INSERT IGNORE INTO `Student` (`username`, `password`)
VALUES
('student1', 'password1');

INSERT IGNORE INTO `SPSO` (`username`, `password`)
VALUES
('spso1', 'password1');

INSERT IGNORE INTO `maintenance` (`content`, `date_update`)
VALUES
('Ahahahahahahahahahhahahaahahahhahahahahahahahahahaha', '2024-11-25 15:30:30');

INSERT IGNORE INTO `printer` (num_paper, location, status)
VALUES
  (100, '402A5-CS1', 'Bật'),
  (200, '402A4-CS1', 'Tắt'),
  (110, '402A3-CS1', 'Bảo trì'),
  (200, '402A2-CS1', 'Bật'),
  (105, '402A4-CS1', 'Tắt'),
  (300, '402A1-CS1', 'Bảo trì'),
  (200, '402A2-CS1', 'Bật'),
  (200, '402A3-CS1', 'Tắt'),
  (100, '402A5-CS1', 'Bảo trì'),
  (110, '402A6-CS1', 'Bật'),
  (102, '402A7-CS1', 'Tắt'),
  (101, '402A3-CS1', 'Bảo trì'),
  (105, '402A4-CS1', 'Bật'),
  (100, '402A5-CS1', 'Tắt'),
  (140, '402A7-CS1', 'Bảo trì'),
  (150, '402A5-CS1', 'Bật'),
  (50, '402A4-CS1', 'Tắt'),
  (105, '402A3-CS1', 'Bảo trì'),
  (100, '402A2-CS1', 'Bật');
