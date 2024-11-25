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
    `request_id` int auto_increment,
    `paper_size` varchar(10),
    `num_copies` int,
    `side_option` TINYINT(1), 
    `page_range` varchar(255),
    `student_send` varchar(255),
    primary key (`request_id`, `student_send`),
    `printer_id` int,
    foreign key (`student_send`) references `Student`(`username`),
    foreign key (`printer_id`) references `Printer`(`printer_id`)
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