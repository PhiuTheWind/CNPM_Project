
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
    `side_option` VARCHAR(10), 

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
DROP TRIGGER IF EXISTS `before_insert_request`;

DELIMITER $$

CREATE TRIGGER `before_insert_request`
BEFORE INSERT ON `Request`
FOR EACH ROW
BEGIN
    -- Calculate the next request_id for the given student_send
    DECLARE next_request_id INT;

    -- Get the maximum request_id for the current student_send
    SELECT IFNULL(MAX(request_id), 0) + 1
    INTO next_request_id
    FROM Request
    WHERE student_send = NEW.student_send;

    -- Assign the calculated request_id to the new row
    SET NEW.request_id = next_request_id;
END$$

DELIMITER ;


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
  



INSERT IGNORE INTO `Request` 
(`file_name`, `paper_size`, `num_copies`, `side_option`, `selected_pages`, `status`, `start_date`, `end_date`, `received_date`, `student_send`, `printer_id`)
VALUES
('assignment1.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-11-01', '2024-11-02', '2024-11-03', 'student1', 1),
('report2.pdf', 'A3', 1, 2 , '"all"', "Chưa nhận", '2024-11-02', '2024-11-03', NULL, 'student1', 2),
('notes3.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-11-03', '2024-11-04', '2024-11-05', 'student5', 3),
('project4.pdf', 'A3', 4, 1, '"all"', "Chưa nhận", '2024-11-04', '2024-11-05', NULL, 'student3', 4),
('document5.doc', 'A4', 1, 1, '"even"', "Đã nhận", '2024-11-05', '2024-11-06', '2024-11-07', 'student1', 5),
('assignment6.pdf', 'A3', 2, 2, '"all"', "Đang in", '2024-11-06', NULL, NULL, 'student3', 6),
('summary7.doc', 'A4', 5, 1, '"all"', "Đã nhận", '2024-11-07', '2024-11-08', '2024-11-09', 'student1', 7),
('presentation8.pdf', 'A3', 3, 2, '"all"', "Chưa nhận", '2024-11-08', '2024-11-09', NULL, 'student4', 8),
('report9.doc', 'A4', 4, 2, '"all"', "Đã nhận", '2024-11-09', '2024-11-10', '2024-11-11', 'student5', 9),
('notes10.pdf', 'A3', 1, 2, '"even"', "Chưa nhận", '2024-11-10', '2024-11-11', NULL, 'student1', 10),
('assignment2.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-11-01', '2024-11-02', '2024-11-03', 'student2', 1),
('notes10.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-11-03', '2024-11-04', '2024-11-05', 'student2', 3),
('assignment1.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-12-01', '2024-12-02', '2024-12-03', 'student1', 1),
('report2.pdf', 'A3', 1, 2 , '"even"', "Chưa nhận", '2024-12-02', '2024-12-03', NULL, 'student1', 2),
('notes3.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-12-03', '2024-12-04', '2024-12-05', 'student5', 3),
('project4.pdf', 'A3', 4, 1, '"odd"', "Chưa nhận", '2024-12-04', '2024-12-05', NULL, 'student3', 4),
('document5.doc', 'A4', 1, 1, '"all"', "Đã nhận", '2024-12-05', '2024-12-06', '2024-11-07', 'student1', 5),
('assignment6.pdf', 'A3', 2, 2, '"all"', "Đang in", '2024-12-06', NULL, NULL, 'student3', 6),
('summary7.doc', 'A4', 5, 1, '"all"', "Đã nhận", '2024-12-07', '2024-12-08', '2024-12-09', 'student1', 7),
('presentation8.pdf', 'A3', 3, 2, '"all"', "Chưa nhận", '2024-12-08', '2024-11-09', NULL, 'student4', 8),
('report9.doc', 'A4', 4, 2, '"all"', "Đã nhận", '2024-12-09', '2024-12-10', '2024-12-11', 'student5', 9),
('notes10.pdf', 'A3', 1, 2, '"odd"', "Chưa nhận", '2024-12-10', '2024-12-11', NULL, 'student1', 10),
('assignment2.doc', 'A4', 2, 1, '"all"', "Đã nhận", '2024-12-01', '2024-12-02', '2024-12-03', 'student2', 1),
('notes10.doc', 'A4', 3, 2, '"all"', "Đã nhận", '2024-12-03', '2024-12-04', '2024-12-05', 'student2', 3);