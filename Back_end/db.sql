
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
    `request_id` INT,
    `paper_size` VARCHAR(10),
    `num_copies` INT,
    `side_option` VARCHAR(255), 

    `selected_pages` VARCHAR(255), 
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
('student1', 'password1', '2252898', 'Huỳnh Ngọc Văn', 100),
('student2', 'password2', '2252327', 'Lê Hà Nguyên Khánh', 100),
('student3', 'password3', '2252293', 'Huỳnh Mai Quốc Khang', 100),
('student4', 'password4', '2252608', 'Hoàng Văn Phi', 100),
('student5', 'password5', '2252023', 'Lê Đỗ Minh Anh', 100);


INSERT IGNORE INTO `SPSO` (`username`, `password`)
VALUES
('spso1', 'password1');

INSERT IGNORE INTO `maintenance` (`content`, `date_update`)
VALUES
('Ahahahahahahahahahhahahaahahahhahahahahahahahahahaha', '2024-11-25 15:30:30');

INSERT IGNORE INTO `Printer` (`num_paper`, `location`, `status`, `printer_name`, `ip`)
VALUES
  (100, '402A5-CS1', 'Bật', 'Printer A5', '192.168.1.1'),
  (200, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
  (110, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
  (200, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4'),
  (105, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
  (300, '402A1-CS1', 'Bảo trì', 'Printer A1', '192.168.1.5'),
  (200, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4'),
  (200, '402A3-CS2', 'Tắt', 'Printer A3', '192.168.1.3'),
  (100, '402A5-CS2', 'Bảo trì', 'Printer A5', '192.168.1.1'),
  (110, '402A6-CS2', 'Bật', 'Printer A6', '192.168.1.6'),
  (102, '402A7-CS1', 'Tắt', 'Printer A7', '192.168.1.7'),
  (101, '402A3-CS1', 'Bảo trì', 'Printer A3', '192.168.1.3'),
  (105, '402A4-CS2', 'Bật', 'Printer A4', '192.168.1.2'),
  (100, '402A5-CS1', 'Tắt', 'Printer A5', '192.168.1.1'),
  (140, '402A7-CS1', 'Bảo trì', 'Printer A7', '192.168.1.7'),
  (150, '402A5-CS2', 'Bật', 'Printer A5', '192.168.1.1'),
  (50, '402A4-CS1', 'Tắt', 'Printer A4', '192.168.1.2'),
  (105, '402A3-CS2', 'Bảo trì', 'Printer A3', '192.168.1.3'),
  (100, '402A2-CS1', 'Bật', 'Printer A2', '192.168.1.4');
  

