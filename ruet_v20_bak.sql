-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2024 at 11:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ruet_v20`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_notice`
--

CREATE TABLE `all_notice` (
  `notice_id` int(11) NOT NULL,
  `notice_creator` varchar(250) NOT NULL,
  `notice_title` varchar(250) NOT NULL,
  `notice` longtext NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `series` int(11) NOT NULL DEFAULT 0,
  `section` varchar(50) NOT NULL DEFAULT '""',
  `department` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `all_notice`
--

INSERT INTO `all_notice` (`notice_id`, `notice_creator`, `notice_title`, `notice`, `time`, `series`, `section`, `department`) VALUES
(1, 'Md. Sozib Hossain', 'test', 'hello everyone', '2024-10-09 00:00:00', 20, 'A', 3),
(3, 'Md. Sozib Hossain', 'test', 'dawdawd', '2024-10-13 02:24:48', 20, 'A', 3);

-- --------------------------------------------------------

--
-- Table structure for table `class_routine`
--

CREATE TABLE `class_routine` (
  `routine_id` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `section` varchar(10) NOT NULL,
  `yr_sem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_routine`
--

INSERT INTO `class_routine` (`routine_id`, `department`, `section`, `yr_sem`) VALUES
(3, 3, 'A', 32);

-- --------------------------------------------------------

--
-- Table structure for table `class_routine_details`
--

CREATE TABLE `class_routine_details` (
  `routine_details_id` int(11) NOT NULL,
  `routine_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `starting_time` int(11) NOT NULL,
  `ending_time` int(11) NOT NULL,
  `weekday` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_routine_details`
--

INSERT INTO `class_routine_details` (`routine_details_id`, `routine_id`, `course_id`, `starting_time`, `ending_time`, `weekday`) VALUES
(1, 3, 14, 1, 2, 1),
(2, 3, 13, 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_times`
--

CREATE TABLE `class_times` (
  `class_time_id` int(11) NOT NULL,
  `time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_times`
--

INSERT INTO `class_times` (`class_time_id`, `time`) VALUES
(1, '2024-09-20 02:00:00'),
(2, '2024-09-20 02:50:00'),
(3, '2024-09-20 03:40:00'),
(4, '2024-09-20 04:30:00'),
(5, '2024-09-20 04:50:00'),
(6, '2024-09-20 05:40:00'),
(7, '2024-09-20 06:30:00'),
(8, '2024-09-20 07:20:00'),
(9, '2024-09-20 08:30:00'),
(10, '2024-09-20 09:20:00'),
(11, '2024-09-20 10:10:00'),
(12, '2024-09-20 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_code` int(11) NOT NULL,
  `course_name` varchar(250) NOT NULL,
  `department` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `course_credit` decimal(3,2) NOT NULL,
  `syllabus` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_code`, `course_name`, `department`, `section`, `course_credit`, `syllabus`) VALUES
(13, 3205, 'Theory of computation', 3, 'A', 3.00, NULL),
(14, 3201, 'Database System', 3, 'A', 3.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courses_teacher_relationship`
--

CREATE TABLE `courses_teacher_relationship` (
  `course_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses_teacher_relationship`
--

INSERT INTO `courses_teacher_relationship` (`course_id`, `teacher_id`) VALUES
(13, 6),
(13, 19),
(14, 4);

-- --------------------------------------------------------

--
-- Table structure for table `course_advisors`
--

CREATE TABLE `course_advisors` (
  `advisor_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `series` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ct`
--

CREATE TABLE `ct` (
  `ct_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `department` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ct`
--

INSERT INTO `ct` (`ct_id`, `course_id`, `section`, `department`, `time`, `note`) VALUES
(44, 13, 'A', 3, '2024-10-13 08:00:33', 'test'),
(45, 13, 'A', 3, '2024-10-13 02:24:32', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `ct_result`
--

CREATE TABLE `ct_result` (
  `ct_result_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `student_roll` int(11) NOT NULL,
  `ct_1` float NOT NULL DEFAULT 0,
  `ct_2` float NOT NULL DEFAULT 0,
  `ct_3` float NOT NULL DEFAULT 0,
  `ct_4` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ct_result`
--

INSERT INTO `ct_result` (`ct_result_id`, `course_id`, `student_roll`, `ct_1`, `ct_2`, `ct_3`, `ct_4`) VALUES
(7, 14, 2003037, 0, 0, 0, 0),
(16, 13, 2003009, 0, 0, 0, 0),
(17, 13, 2003037, 14, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `dept_name` varchar(250) NOT NULL,
  `dept_short_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `dept_name`, `dept_short_name`) VALUES
(1, 'Electrical and Electronics Engineering', 'EEE'),
(3, 'Computer Science and Engineering', 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `greetings`
--

CREATE TABLE `greetings` (
  `greeting_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `for_teachers` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `greetings`
--

INSERT INTO `greetings` (`greeting_id`, `text`, `for_teachers`) VALUES
(1, 'কিরে ? দিনকাল ভালো ?', 0),
(2, 'Welcome to Digital RUET', 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_roll` int(11) NOT NULL,
  `student_name` varchar(250) NOT NULL,
  `student_email` varchar(250) NOT NULL,
  `student_password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_roll`, `student_name`, `student_email`, `student_password`) VALUES
(2003009, 'Sadia Rahman Sharna', 'sadiasharna3@gmail.com', 'U2FsdGVkX1/moxCOPPI0EcUWnQmtcb+qQ0xT9kanHVY='),
(2003037, 'Mehedi Hasan', 'mjmehedihasanoo7@gmail.com', 'U2FsdGVkX1/moxCOPPI0EcUWnQmtcb+qQ0xT9kanHVY='),
(2003091, 'Sadia Sharna Test', 'sadiasharna2@gmail.com', 'U2FsdGVkX19Jwg4TEDPPs9ypfHj6MhXJsfWbxRQqqFE=');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_name` varchar(250) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `teacher_email` varchar(250) NOT NULL,
  `teacher_password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_name`, `department_id`, `teacher_email`, `teacher_password`) VALUES
(1, 'Dr. Md. Shahid Uz Zaman', 3, 'szaman22.ruet@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(3, 'Mohiuddin Ahmed', 3, 'mohiuddin.nirob.mn@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(4, 'Barshon Sen', 3, 'sen.barshon@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(5, 'Dr. Md. Selim Hossain', 1, 'engg.selim@gmail.com', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(6, 'Md. Mazharul Islam', 3, 'mazharul.islam@cse.ruet.ac.bd', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(7, 'Utsha Das', 3, 'utsha.das@cse.ruet.ac.bd', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(8, 'Md. Nasif Osman Khansur', 3, 'nasif.khansur@cse.ruet.ac.bd', 'U2FsdGVkX19nhM5DvmMWTMkXgM2xNBoLQXsyt8bu4uE='),
(19, 'Md. Sozib Hossain', 3, 'sozib.hossain@cse.ruet.ac.bd', 'U2FsdGVkX1/FGy4Uu/qjdug0qIMZJwd57Qnmn9C6JUg=');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_notice`
--

CREATE TABLE `teacher_notice` (
  `notice_id` int(11) NOT NULL,
  `notice_creator` varchar(250) NOT NULL,
  `department` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `notice_title` varchar(250) NOT NULL,
  `notice` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher_notice`
--

INSERT INTO `teacher_notice` (`notice_id`, `notice_creator`, `department`, `time`, `notice_title`, `notice`) VALUES
(2, 'Md. Sozib Hossain', 3, '2024-10-09 00:00:00', 'test', 'test teachers notice'),
(3, 'Md. Sozib Hossain', 3, '2024-10-13 02:25:06', 'test teachers', 'dawdawd');

-- --------------------------------------------------------

--
-- Table structure for table `weekday`
--

CREATE TABLE `weekday` (
  `day_id` int(11) NOT NULL,
  `weekday_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weekday`
--

INSERT INTO `weekday` (`day_id`, `weekday_name`) VALUES
(1, 'Saturday'),
(2, 'Sunday'),
(3, 'Monday'),
(4, 'Tuesday'),
(5, 'Wednesday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_notice`
--
ALTER TABLE `all_notice`
  ADD PRIMARY KEY (`notice_id`),
  ADD KEY `dept_for_key` (`department`);

--
-- Indexes for table `class_routine`
--
ALTER TABLE `class_routine`
  ADD PRIMARY KEY (`routine_id`),
  ADD KEY `routine_dept_rel` (`department`);

--
-- Indexes for table `class_routine_details`
--
ALTER TABLE `class_routine_details`
  ADD PRIMARY KEY (`routine_details_id`),
  ADD KEY `routine_routine_details_rel` (`routine_id`),
  ADD KEY `routine_details_course_rel` (`course_id`),
  ADD KEY `weekday_class_rel` (`weekday`),
  ADD KEY `class_starting_rel` (`starting_time`),
  ADD KEY `class_ending_rel` (`ending_time`);

--
-- Indexes for table `class_times`
--
ALTER TABLE `class_times`
  ADD PRIMARY KEY (`class_time_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `dept` (`department`);

--
-- Indexes for table `courses_teacher_relationship`
--
ALTER TABLE `courses_teacher_relationship`
  ADD KEY `course_rel` (`course_id`),
  ADD KEY `teacher_rel` (`teacher_id`);

--
-- Indexes for table `course_advisors`
--
ALTER TABLE `course_advisors`
  ADD PRIMARY KEY (`advisor_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `department_id` (`department`);

--
-- Indexes for table `ct`
--
ALTER TABLE `ct`
  ADD PRIMARY KEY (`ct_id`),
  ADD KEY `dept_id` (`department`),
  ADD KEY `ct_notice_course_rel` (`course_id`);

--
-- Indexes for table `ct_result`
--
ALTER TABLE `ct_result`
  ADD PRIMARY KEY (`ct_result_id`),
  ADD KEY `ct_student_rel` (`student_roll`),
  ADD KEY `ct_course_rel` (`course_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `dept_short_name` (`dept_short_name`);

--
-- Indexes for table `greetings`
--
ALTER TABLE `greetings`
  ADD PRIMARY KEY (`greeting_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_roll`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `teacher_email` (`teacher_email`),
  ADD KEY `teacher_dept_rel` (`department_id`);

--
-- Indexes for table `teacher_notice`
--
ALTER TABLE `teacher_notice`
  ADD PRIMARY KEY (`notice_id`),
  ADD KEY `dept_teacher_id` (`department`);

--
-- Indexes for table `weekday`
--
ALTER TABLE `weekday`
  ADD PRIMARY KEY (`day_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_notice`
--
ALTER TABLE `all_notice`
  MODIFY `notice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `class_routine`
--
ALTER TABLE `class_routine`
  MODIFY `routine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `class_routine_details`
--
ALTER TABLE `class_routine_details`
  MODIFY `routine_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class_times`
--
ALTER TABLE `class_times`
  MODIFY `class_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `course_advisors`
--
ALTER TABLE `course_advisors`
  MODIFY `advisor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ct`
--
ALTER TABLE `ct`
  MODIFY `ct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `ct_result`
--
ALTER TABLE `ct_result`
  MODIFY `ct_result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `greetings`
--
ALTER TABLE `greetings`
  MODIFY `greeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `teacher_notice`
--
ALTER TABLE `teacher_notice`
  MODIFY `notice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `weekday`
--
ALTER TABLE `weekday`
  MODIFY `day_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `all_notice`
--
ALTER TABLE `all_notice`
  ADD CONSTRAINT `dept_for_key` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `class_routine`
--
ALTER TABLE `class_routine`
  ADD CONSTRAINT `routine_dept_rel` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_routine_details`
--
ALTER TABLE `class_routine_details`
  ADD CONSTRAINT `class_ending_rel` FOREIGN KEY (`ending_time`) REFERENCES `class_times` (`class_time_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `class_starting_rel` FOREIGN KEY (`starting_time`) REFERENCES `class_times` (`class_time_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `routine_details_course_rel` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `routine_routine_details_rel` FOREIGN KEY (`routine_id`) REFERENCES `class_routine` (`routine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `weekday_class_rel` FOREIGN KEY (`weekday`) REFERENCES `weekday` (`day_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `dept` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `courses_teacher_relationship`
--
ALTER TABLE `courses_teacher_relationship`
  ADD CONSTRAINT `course_rel` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_rel` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_advisors`
--
ALTER TABLE `course_advisors`
  ADD CONSTRAINT `department_id` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

--
-- Constraints for table `ct`
--
ALTER TABLE `ct`
  ADD CONSTRAINT `ct_notice_course_rel` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dept_id` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `ct_result`
--
ALTER TABLE `ct_result`
  ADD CONSTRAINT `ct_course_rel` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ct_student_rel` FOREIGN KEY (`student_roll`) REFERENCES `students` (`student_roll`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teacher_dept_rel` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `teacher_notice`
--
ALTER TABLE `teacher_notice`
  ADD CONSTRAINT `dept_teacher_id` FOREIGN KEY (`department`) REFERENCES `departments` (`department_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
