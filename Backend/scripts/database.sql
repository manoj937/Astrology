-- Database Schema for Astrology Project
-- Inferred from Backend/email_app.js

CREATE DATABASE IF NOT EXISTS `nagoreto_darshini_astrology`;
USE `nagoreto_darshini_astrology`;

-- Table structure for table `userDetails`
DROP TABLE IF EXISTS `userDetails`;
CREATE TABLE `userDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `birthplace` varchar(255) DEFAULT NULL,
  `birthstar` varchar(100) DEFAULT NULL,
  `birthtime` varchar(50) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rashi` varchar(100) DEFAULT NULL,
  `maritialstatus` varchar(50) DEFAULT NULL,
  `otherques` text,
  `createdon` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `marriage_match`
DROP TABLE IF EXISTS `marriage_match`;
CREATE TABLE `marriage_match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_name` varchar(255) DEFAULT NULL,
  `m_dob` varchar(50) DEFAULT NULL,
  `m_time` varchar(50) DEFAULT NULL,
  `m_birth_place` varchar(255) DEFAULT NULL,
  `m_birth_star` varchar(100) DEFAULT NULL,
  `m_rashi` varchar(100) DEFAULT NULL,
  `f_name` varchar(255) DEFAULT NULL,
  `f_dob` varchar(50) DEFAULT NULL,
  `f_time` varchar(50) DEFAULT NULL,
  `f_birth_place` varchar(255) DEFAULT NULL,
  `f_birth_star` varchar(100) DEFAULT NULL,
  `f_rashi` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `createdon` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
