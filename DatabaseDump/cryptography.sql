-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 12, 2016 at 08:01 PM
-- Server version: 5.7.15-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eccypography`
--

-- --------------------------------------------------------

--
-- Table structure for table `auto_id`
--

CREATE TABLE `auto_id` (
  `form_name` varchar(50) DEFAULT NULL,
  `prefix` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auto_id`
--

INSERT INTO `auto_id` (`form_name`, `prefix`) VALUES
('registration', '100010');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) NOT NULL,
  `userid` varchar(50) DEFAULT NULL,
  `file_name` varchar(100) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `f_status` char(1) DEFAULT '1',
  `encrypted_aes_key` varchar(255) DEFAULT NULL,
  `publickey` varchar(255) DEFAULT NULL,
  `privatekey` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `userid`, `file_name`, `file_path`, `created`, `f_status`, `encrypted_aes_key`, `publickey`, `privatekey`) VALUES
(2, '100010', 'h.txt', 'uploads/f1478979701016.txt.aes', '2016-11-12 19:41:41', '1', '4C3330534A5636534E5448374B43464E', NULL, '1C18580EFC2443B3F7C454D281387');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(20) NOT NULL,
  `gen_user_id` varchar(200) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `dob` varchar(100) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `user_key` varchar(50) DEFAULT NULL,
  `secretu` varchar(200) DEFAULT NULL,
  `user_otp` varchar(10) DEFAULT NULL,
  `utype` varchar(20) DEFAULT 'user',
  `u_status` char(1) DEFAULT '1',
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `gen_user_id`, `name`, `email`, `mobile`, `dob`, `gender`, `user_key`, `secretu`, `user_otp`, `utype`, `u_status`, `created`) VALUES
('100010', '908589175481035665712', 'Varun Dhall', 'varun.vd1994@gmail.com', '8868838028', '10-11-1994', 'Male', 'sect113r2', '1A538A5072E9C81BCCC98D5E98FD5', '564636', 'user', '1', '2016-11-12 19:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `userid` varchar(20) NOT NULL,
  `otp` varchar(10) NOT NULL DEFAULT '',
  `created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`userid`, `otp`, `created`) VALUES
('100006', '655199', '2015-05-09'),
('100010', '169244', '2016-11-12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `userid` (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`userid`,`otp`,`created`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
