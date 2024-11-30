-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 07:10 AM
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
-- Table structure for table `ct_result`
--

CREATE TABLE `ct_result` (
  `ct_result_id` int(11) NOT NULL,
  `course_code` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  `student_roll` int(11) NOT NULL,
  `ct_1` float NOT NULL DEFAULT 0,
  `ct_2` float NOT NULL DEFAULT 0,
  `ct_3` float NOT NULL DEFAULT 0,
  `ct_4` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ct_result`
--
ALTER TABLE `ct_result`
  ADD PRIMARY KEY (`ct_result_id`),
  ADD KEY `ct_student_rel` (`student_roll`),
  ADD KEY `ct_course_rel` (`course_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ct_result`
--
ALTER TABLE `ct_result`
  MODIFY `ct_result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ct_result`
--
ALTER TABLE `ct_result`
  ADD CONSTRAINT `ct_course_rel` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`),
  ADD CONSTRAINT `ct_student_rel` FOREIGN KEY (`student_roll`) REFERENCES `students` (`student_roll`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
