CREATE DATABASE hcmut_spss;
USE hcmut_spss;
CREATE TABLE Student (
	username varchar(255) primary key,
    `password` varchar(255) not null,
    page_num int
);

CREATE TABLE SPSO (
	username varchar(255) primary key,
    `password` varchar(255) not null
);

CREATE TABLE Printer (
	printer_id int auto_increment primary key,
    num_paper int,
    location varchar(255),
    `status` varchar(255)
);

CREATE TABLE Request (
	request_id int auto_increment,
    paper_size varchar(10),
    num_copies int,
    side_option boolean,
    page_range varchar(255),
    student_send varchar(255),
    primary key (request_id, student_send),
    printer_id int,
    foreign key (student_send) references Student(username),
    foreign key (printer_id) references Printer(printer_id)
);

CREATE TABLE Report (
	report_id int auto_increment primary key,
    `time` datetime,
    report_type varchar(255)
);

CREATE TABLE SPSO_Manage_Printer (
	SPSO_username varchar(255),
    Printer_id int,
    time_manage datetime,
    primary key (SPSO_username, Printer_id),
    foreign key (SPSO_username) references SPSO(username),
    foreign key (Printer_id) references Printer(printer_id)
);

CREATE TABLE Report_reference (
	report_id int,
    request_id int,
    primary key (report_id, request_id),
    foreign key (report_id) references Report(report_id),
    foreign key (request_id) references Request(request_id)
);

INSERT INTO Student (username, `password`)
VALUES
('student1', 'password1');