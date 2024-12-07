-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2024 at 05:49 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testlaravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave`
--

CREATE TABLE `leave` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` bigint(20) UNSIGNED NOT NULL,
  `leave_type_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave`
--

INSERT INTO `leave` (`id`, `employee_id`, `leave_type_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-12-01', '2024-12-04', '2024-12-06 05:20:50', '2024-12-06 05:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `leave_types`
--

CREATE TABLE `leave_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `LeaveType` varchar(200) DEFAULT NULL,
  `Description` mediumtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave_types`
--

INSERT INTO `leave_types` (`id`, `LeaveType`, `Description`, `created_at`, `updated_at`) VALUES
(1, 'Casual Leaves', 'Casual Leaves', '2024-12-06 05:08:18', '2024-12-06 05:08:18');

-- --------------------------------------------------------

--
-- Table structure for table `machine`
--

CREATE TABLE `machine` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Model` varchar(255) NOT NULL,
  `Brand` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_10_25_035452_create_machine_table', 1),
(5, '2024_10_25_083802_create_tblemployees_table', 1),
(6, '2024_10_25_100236_create_tbldepartments_table', 1),
(7, '2024_10_25_100750_create_company_table', 1),
(8, '2024_10_25_101242_create_gender_table', 1),
(9, '2024_10_25_101840_create_event_table', 1),
(10, '2024_10_25_102848_create_position_table', 1),
(11, '2024_10_25_103445_create_shift_table', 1),
(12, '2024_11_04_084445_create_salary_structures_table', 1),
(13, '2024_11_05_045440_create_leave_types_table', 1),
(14, '2024_11_08_041740_create_admin_table', 1),
(15, '2024_11_15_165344_create_uploaded_files_table', 1),
(16, '2024_11_16_121558_create_upexcel_table', 1),
(17, '2024_11_18_141558_create_payroll_table', 1),
(18, '2024_11_20_032317_create_personal_access_tokens_table', 1),
(19, '2024_11_20_204857_create_leave_table', 1),
(20, '2024_11_20_210409_create_events_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payroll`
--

CREATE TABLE `payroll` (
  `payroll_id` int(10) UNSIGNED NOT NULL,
  `emp_id` bigint(20) UNSIGNED NOT NULL,
  `basic_salary` decimal(10,2) NOT NULL,
  `AttendanceIncentive` decimal(10,2) NOT NULL DEFAULT 0.00,
  `SuperAttendance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `PerformanceIncentive` decimal(10,2) NOT NULL DEFAULT 0.00,
  `BRA1` decimal(10,2) NOT NULL DEFAULT 0.00,
  `BRA2` decimal(10,2) NOT NULL DEFAULT 0.00,
  `BRA3` decimal(10,2) NOT NULL DEFAULT 0.00,
  `deductions` decimal(10,2) NOT NULL DEFAULT 0.00,
  `net_salary` decimal(10,2) GENERATED ALWAYS AS (`basic_salary` + `AttendanceIncentive` + `SuperAttendance` + `PerformanceIncentive` + `BRA1` + `BRA2` + `BRA3` - `deductions`) STORED,
  `payment_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payroll`
--

INSERT INTO `payroll` (`payroll_id`, `emp_id`, `basic_salary`, `AttendanceIncentive`, `SuperAttendance`, `PerformanceIncentive`, `BRA1`, `BRA2`, `BRA3`, `deductions`, `payment_date`, `created_at`, `updated_at`) VALUES
(1, 21, 30000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 1000.00, 500.00, '2024-06-13 00:00:00', '2024-12-06 05:22:40', '2024-12-06 05:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `salary_structures`
--

CREATE TABLE `salary_structures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `Week` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbldepartments`
--

CREATE TABLE `tbldepartments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `DepartmentName` varchar(150) DEFAULT NULL,
  `DepartmentShortName` varchar(100) DEFAULT NULL,
  `DepartmentCode` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblemployees`
--

CREATE TABLE `tblemployees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `EmpId` bigint(20) UNSIGNED NOT NULL,
  `NameWithInitials` varchar(255) NOT NULL,
  `EPFNumber` varchar(100) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `CurrentAddress` text NOT NULL,
  `PermanentAddress` text NOT NULL,
  `PersonalEmail` varchar(255) NOT NULL,
  `CompanyEmail` varchar(255) NOT NULL,
  `DateOfJoining` date NOT NULL,
  `Status` enum('Active','Inactive','Suspended','Left') NOT NULL,
  `Salutation` enum('Mr','Ms','Mrs') NOT NULL,
  `Designation` varchar(100) NOT NULL,
  `Branch` varchar(100) NOT NULL,
  `Company` varchar(100) NOT NULL,
  `ReportsTo` varchar(100) NOT NULL,
  `EmploymentType` enum('Intern','Full-time','Part-time','Contract') NOT NULL,
  `EmergencyContactName` varchar(255) NOT NULL,
  `EmergencyPhone` varchar(20) NOT NULL,
  `Relation` varchar(100) NOT NULL,
  `DefaultShift` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblemployees`
--

INSERT INTO `tblemployees` (`id`, `EmpId`, `NameWithInitials`, `EPFNumber`, `Phone`, `CurrentAddress`, `PermanentAddress`, `PersonalEmail`, `CompanyEmail`, `DateOfJoining`, `Status`, `Salutation`, `Designation`, `Branch`, `Company`, `ReportsTo`, `EmploymentType`, `EmergencyContactName`, `EmergencyPhone`, `Relation`, `DefaultShift`, `created_at`, `updated_at`) VALUES
(1, 21, 'Rukshi', '001', '0714826756', '338/2,\nGodakawela', '338/2, \nGodakawela', 'test@gmail.com', 'com@gmail.com', '2024-12-10', 'Active', 'Ms', 'General Manager', 'Branch 02', 'Company 02', 'ReportsTo', 'Full-time', 'Rukshi', '0714826756', 'Unmarried', 'WeekEnd', '2024-12-06 05:09:03', '2024-12-06 05:09:03');

-- --------------------------------------------------------

--
-- Table structure for table `upexcel`
--

CREATE TABLE `upexcel` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `index` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `week` varchar(255) NOT NULL,
  `timetable` varchar(255) NOT NULL,
  `check_in` varchar(255) DEFAULT NULL,
  `check_out` varchar(255) DEFAULT NULL,
  `work` int(11) NOT NULL DEFAULT 0,
  `ot` int(11) NOT NULL DEFAULT 0,
  `attended` int(11) NOT NULL DEFAULT 0,
  `late` int(11) NOT NULL DEFAULT 0,
  `early` int(11) NOT NULL DEFAULT 0,
  `absent` int(11) NOT NULL DEFAULT 0,
  `leave` int(11) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL,
  `records` varchar(255) DEFAULT NULL,
  `file_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `upexcel`
--

INSERT INTO `upexcel` (`id`, `index`, `person_id`, `name`, `department`, `position`, `gender`, `date`, `week`, `timetable`, `check_in`, `check_out`, `work`, `ot`, `attended`, `late`, `early`, `absent`, `leave`, `status`, `records`, `file_id`, `created_at`, `updated_at`) VALUES
(1, 1, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(2, 2, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(3, 3, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(4, 4, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '09:46:09', '17:33:47', 468, 0, 468, 76, 0, 72, 0, 'L-W', '09:46:09 17:33:47', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(5, 5, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(6, 6, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:32:13', '17:31:30', 539, 0, 539, 0, 0, 1, 0, 'W', '08:32:13 17:31:30', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(7, 7, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(8, 8, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(9, 9, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(10, 10, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '08:25:51', '17:33:33', 540, 0, 548, 0, 0, 0, 0, 'W', '08:25:51 17:33:33', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(11, 11, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '09:21:34', '17:30:57', 489, 0, 489, 52, 0, 51, 0, 'L-W', '09:21:34 17:30:57', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(12, 12, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(13, 13, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:48:20', '17:35:02', 527, 0, 527, 18, 0, 13, 0, 'L-W', '08:48:20 17:35:02', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(14, 14, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(15, 15, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:40:21', '13:31:38', 291, 0, 291, 10, 238, 249, 0, 'L-W-E', '08:40:21 13:31:38', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(16, 16, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(17, 17, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(18, 18, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(19, 19, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:27:35', '17:32:49', 540, 0, 545, 0, 0, 0, 0, 'W', '08:27:35 17:32:49', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(20, 20, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(21, 21, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(22, 22, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(23, 23, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(24, 24, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '09:47:50', '17:32:32', 465, 0, 465, 78, 0, 75, 0, 'L-W', '09:47:50 17:32:32', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(25, 25, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(26, 26, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(27, 27, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', 'work from', 'home', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(28, 28, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:48:09', '17:46:26', 538, 0, 538, 18, 0, 2, 0, 'L-W', '08:48:09 17:46:26', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(29, 29, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(30, 30, 21, 'Rukshi', 'Ultimate Eng', '-', 'Female', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(31, 31, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '08:13:23', '13:30:47', 317, 0, 317, 0, 60, 223, 0, 'W-E', '08:13:23', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(32, 32, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(33, 33, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '08:19:27', '17:34:19', 540, 0, 555, 0, 0, 0, 0, 'W', '08:19:27 17:34:19', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(34, 34, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '08:20:11', '17:31:51', 540, 0, 552, 0, 0, 0, 0, 'W', '08:20:11 17:31:51', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(35, 35, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:24:14', '17:30:31', 540, 0, 546, 0, 0, 0, 0, 'W', '08:24:14 17:30:31', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(36, 36, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:22:29', '17:33:19', 540, 0, 551, 0, 0, 0, 0, 'W', '08:22:29 17:33:19', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(37, 37, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:14:37', '17:32:34', 540, 0, 558, 0, 0, 0, 0, 'W', '08:14:37 17:32:34', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(38, 38, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '08:15:29', '13:33:15', 318, 0, 318, 0, 237, 222, 0, 'W-E', '08:15:29 13:33:15', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(39, 39, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(40, 40, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:26', '17:30:08', 540, 0, 549, 0, 0, 0, 0, 'W', '08:21:26 17:30:08', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(41, 41, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '08:16:46', '17:30:37', 540, 0, 554, 0, 0, 0, 0, 'W', '08:16:46 17:30:37', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(42, 42, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '08:15:29', '17:30:32', 540, 0, 555, 0, 0, 0, 0, 'W', '08:15:29 17:30:32', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(43, 43, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:15:35', '17.30', 0, 0, 0, 0, 60, 540, 0, 'W-E', '08:15:35', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(44, 44, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:15:32', '17:30:11', 540, 0, 555, 0, 0, 0, 0, 'W', '08:15:32 08:23:12 17:30:11', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(45, 45, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:16:51', '13:30:49', 314, 0, 314, 0, 60, 226, 0, 'W-E', '08:16:51', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(46, 46, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(47, 47, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:43', '17:30:34', 540, 0, 549, 0, 0, 0, 0, 'W', '08:21:43 17:30:34', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(48, 48, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:17:26', '17:31:39', 540, 0, 554, 0, 0, 0, 0, 'W', '08:17:26 17:31:39', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(49, 49, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:20:51', '17:30:26', 540, 0, 550, 0, 0, 0, 0, 'W', '08:20:51 17:30:26', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(50, 50, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '08:18:38', '16:19:20', 481, 0, 481, 0, 71, 59, 0, 'W-E', '08:18:38 08:21:19 16:19:20', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(51, 51, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(52, 52, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(53, 53, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(54, 54, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:16:25', '17:32:09', 540, 0, 556, 0, 0, 0, 0, 'W', '08:16:25 17:32:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(55, 55, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '08:47:38', '17:31:55', 524, 0, 524, 18, 0, 16, 0, 'L-W', '08:47:38 17:31:55', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(56, 56, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '08:17:50', '17:30:40', 540, 0, 553, 0, 0, 0, 0, 'W', '08:17:50 17:30:40', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(57, 57, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '08:16:19', '17:33:06', 540, 0, 557, 0, 0, 0, 0, 'W', '08:16:19 17:33:06', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(58, 58, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:16:22', '13:30:15', 314, 0, 314, 0, 60, 226, 0, 'W-E', '08:16:22', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(59, 59, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:15:17', '13.30', 0, 0, 0, 0, 60, 540, 0, 'W-E', '08:15:17', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(60, 60, 22, 'Manjith', 'Ultimate Eng', '-', 'Male', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(61, 91, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '08:43:42', '13:40:37', 297, 0, 297, 14, 229, 243, 0, 'L-W-E', '08:43:42 13:40:37', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(62, 92, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(63, 93, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '09:08:14', '17:37:36', 509, 0, 509, 38, 0, 31, 0, 'L-W', '09:08:14 17:37:36', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(64, 94, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '08:49:14', '17:33:50', 525, 0, 525, 19, 0, 15, 0, 'L-W', '08:49:14 17:33:50', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(65, 95, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:23:00', '17:31:09', 540, 0, 548, 0, 0, 0, 0, 'W', '08:23:00 17:31:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(66, 96, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '09:00:03', '17:33:41', 514, 0, 514, 30, 0, 26, 0, 'L-W', '09:00:03 17:33:41', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(67, 97, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:48:02', '17:32:19', 524, 0, 524, 18, 0, 16, 0, 'L-W', '08:48:02 17:32:19', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(68, 98, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '08:53:08', '13:34:31', 281, 0, 281, 23, 235, 259, 0, 'L-W-E', '08:53:08 13:34:31', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(69, 99, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(70, 100, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '08:51:55', '17:34:01', 522, 0, 522, 22, 0, 18, 0, 'L-W', '08:51:55 17:34:01', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(71, 101, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(72, 102, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '08:50:19', '17:34:09', 524, 0, 524, 20, 0, 16, 0, 'L-W', '08:50:19 17:34:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(73, 103, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:22:04', '17:36:09', 540, 0, 554, 0, 0, 0, 0, 'W', '08:22:04 17:36:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(74, 104, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:41:52', '17:29:25', 528, 0, 528, 12, 0, 12, 0, 'L-W', '08:41:52 17:29:25', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(75, 105, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:52:11', '11:08:52', 137, 0, 137, 22, 60, 403, 0, 'L-W-E', '08:52:11 11:08:52', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(76, 106, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(77, 107, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:46:16', '17:32:21', 526, 0, 526, 16, 0, 14, 0, 'L-W', '08:46:16 17:32:21', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(78, 108, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:28:27', '17:33:07', 540, 0, 545, 0, 0, 0, 0, 'W', '08:28:27 17:33:07', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(79, 109, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:18:57', '17:32:51', 540, 0, 554, 0, 0, 0, 0, 'W', '08:18:57 17:32:51', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(80, 110, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '08:42:00', '17:32:36', 531, 0, 531, 12, 0, 9, 0, 'L-W', '08:42:00 17:32:36', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(81, 111, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(82, 112, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '08:37:12', '13:31:38', 294, 0, 294, 0, 238, 246, 0, 'W-E', '08:37:12 13:31:38', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(83, 113, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(84, 114, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:37:20', '17:33:30', 536, 0, 536, 0, 0, 4, 0, 'W', '08:37:20 17:33:30', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(85, 115, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '08:46:49', '16:57:33', 491, 0, 491, 17, 32, 49, 0, 'L-W-E', '08:46:49 16:57:33', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(86, 116, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '09:50:07', '17:32:07', 462, 0, 462, 80, 0, 78, 0, 'L-W', '09:50:07 17:32:07', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(87, 117, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '08:37:00', '17:33:57', 537, 0, 537, 0, 0, 3, 0, 'W', '08:37:00 17:33:57', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(88, 118, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:36:52', '17:48:21', 540, 0, 551, 0, 0, 0, 0, 'W', '08:36:52 17:48:21', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(89, 119, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:34:47', '13:33:03', 298, 0, 298, 0, 237, 242, 0, 'W-E', '08:34:47 13:33:03', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(90, 120, 25, 'Nimasha', 'Ultimate Eng', '-', 'Female', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(91, 61, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '08:29:44', '13:30:49', 301, 0, 301, 0, 60, 239, 0, 'W-E', '08:29:44', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(92, 62, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '10:17:42', '11:53:34', 96, 0, 96, 108, 60, 444, 0, 'L-W-E-#', '10:17:42 11:53:34', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(93, 63, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '08:31:35', '17:34:59', 540, 0, 543, 0, 0, 0, 0, 'W', '08:31:35 17:34:59', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(94, 64, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '08:31:36', '23:35:57', 540, 0, 904, 0, 0, 0, 0, 'W', '08:31:36 23:35:57', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(95, 65, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:38:23', '17:30:22', 532, 0, 532, 0, 0, 8, 0, 'W', '08:38:23 17:30:22', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(96, 66, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:35:43', '17:34:03', 538, 0, 538, 0, 0, 2, 0, 'W', '08:35:43 17:34:03', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(97, 67, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:26:40', '13:30:15', 304, 0, 304, 0, 60, 236, 0, 'W-E', '08:26:40', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(98, 68, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(99, 69, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(100, 70, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(101, 71, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '08:22:30', '13.30', 0, 0, 0, 0, 60, 540, 0, 'W-E', '08:22:30', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(102, 72, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '07:56:59', '17:30:26', 540, 0, 573, 0, 0, 0, 0, 'W', '07:56:59 17:30:26', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(103, 73, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:22:45', '17:32:08', 540, 0, 549, 0, 0, 0, 0, 'W', '08:22:45 17:32:08', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(104, 74, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:16:49', '17:30:02', 540, 0, 553, 0, 0, 0, 0, 'W', '08:16:49 17:30:02', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(105, 75, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:23:47', '14:08:05', 344, 0, 344, 0, 202, 196, 0, 'W-E', '08:23:47 14:08:05', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(106, 76, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(107, 77, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:27:57', '17:30:17', 540, 0, 542, 0, 0, 0, 0, 'W', '08:27:57 17:30:17', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(108, 78, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:29:04', '17:31:59', 540, 0, 543, 0, 0, 0, 0, 'W', '08:29:04 17:31:59', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(109, 79, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:29:06', '17:30:22', 540, 0, 541, 0, 0, 0, 0, 'W', '08:29:06 17:30:22', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(110, 80, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '08:34:42', '18:33:49', 540, 0, 599, 0, 0, 0, 0, 'W', '08:34:42 18:33:49', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(111, 81, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(112, 82, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '08:24:49', '13:31:00', 306, 0, 306, 0, 0, 234, 0, 'W-E', '08:24:49', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(113, 83, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(114, 84, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:30:56', '17:32:04', 540, 0, 541, 0, 0, 0, 0, 'W', '08:30:56 17:32:04', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(115, 85, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '08:32:03', '17:30:35', 539, 0, 539, 0, 0, 1, 0, 'W', '08:32:03 17:30:35', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(116, 86, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '08:28:37', '17:30:52', 540, 0, 542, 0, 0, 0, 0, 'W', '08:28:37 17:30:52', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(117, 87, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(118, 88, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:27:12', '12:08:20', 221, 0, 221, 0, 60, 319, 0, 'W-E', '08:27:12 12:08:20', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(119, 89, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:26:06', '13:33:09', 307, 0, 307, 0, 237, 233, 0, 'W-E', '08:26:06 13:33:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(120, 90, 24, 'Prabath', 'Ultimate Eng', '-', 'Male', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(121, 121, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '08:28:41', '13:31:39', 303, 0, 303, 0, 238, 237, 0, 'W-E', '08:28:41 13:31:39', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(122, 122, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(123, 123, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '08:25:17', '17:30:43', 540, 0, 545, 0, 0, 0, 0, 'W', '08:25:17 17:30:43', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(124, 124, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '08:22:38', '17:30:09', 540, 0, 548, 0, 0, 0, 0, 'W', '08:22:38 17:30:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(125, 125, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:23:39', '17:30:10', 540, 0, 547, 0, 0, 0, 0, 'W', '08:23:39 17:30:10', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(126, 126, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:21:14', '17:30:57', 540, 0, 550, 0, 0, 0, 0, 'W', '08:21:14 17:30:57', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(127, 127, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:21:45', '17:30:41', 540, 0, 549, 0, 0, 0, 0, 'W', '08:21:45 17:30:41', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(128, 128, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '08:27:30', '13:30:26', 303, 0, 303, 0, 60, 237, 0, 'W-E', '08:27:30', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(129, 129, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(130, 130, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:19', '17:30:04', 540, 0, 549, 0, 0, 0, 0, 'W', '08:21:19 17:30:04', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(131, 131, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '08:19:21', '17:30:49', 540, 0, 551, 0, 0, 0, 0, 'W', '08:19:21 17:30:49', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(132, 132, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '08:23:40', '17:30:17', 540, 0, 547, 0, 0, 0, 0, 'W', '08:23:40 08:53:28 17:30:17', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(133, 133, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:21:13', '17:31:20', 540, 0, 550, 0, 0, 0, 0, 'W', '08:21:13 17:31:20', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(134, 134, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:21:31', '17:30:05', 540, 0, 549, 0, 0, 0, 0, 'W', '08:21:31 17:30:05', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(135, 135, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:26:48', '13:30:05', 303, 0, 303, 0, 60, 237, 0, 'W-E', '08:26:48', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(136, 136, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(137, 137, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:25:14', '17:30:12', 540, 0, 545, 0, 0, 0, 0, 'W', '08:25:14 17:30:12', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(138, 138, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:23:10', '17:31:24', 540, 0, 548, 0, 0, 0, 0, 'W', '08:23:10 17:31:24', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(139, 139, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:21:50', '17:30:15', 540, 0, 548, 0, 0, 0, 0, 'W', '08:21:50 17:30:15', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(140, 140, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '08:24:41', '17:30:05', 540, 0, 545, 0, 0, 0, 0, 'W', '08:24:41 17:30:05', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(141, 141, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(142, 142, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '08:30:43', '13:30:22', 300, 0, 300, 0, 60, 240, 0, 'W-E', '08:30:43', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(143, 143, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(144, 144, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:18', '17:30:23', 540, 0, 549, 0, 0, 0, 0, 'W', '08:21:18 17:30:23', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(145, 145, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '08:24:04', '17:30:31', 540, 0, 546, 0, 0, 0, 0, 'W', '08:24:04 17:30:31', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(146, 146, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '08:27:43', '17:30:17', 540, 0, 543, 0, 0, 0, 0, 'W', '08:27:43 17:30:17', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(147, 147, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '08:23:55', '17:30:56', 540, 0, 547, 0, 0, 0, 0, 'W', '08:23:55 17:30:56', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(148, 148, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:24:58', '17:31:57', 540, 0, 547, 0, 0, 0, 0, 'W', '08:24:58 17:31:57', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(149, 149, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:31:09', '13:30:39', 300, 0, 300, 0, 60, 241, 0, 'W-E', '08:31:09', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(150, 150, 27, 'Nawarathne', 'Ultimate Eng', '-', 'Male', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(151, 151, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '08:29:51', '13:38:27', 309, 0, 309, 0, 232, 231, 0, 'W-E', '08:29:51 13:38:27', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(152, 152, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(153, 153, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:05', '17:38:18', 540, 0, 557, 0, 0, 0, 0, 'W', '08:21:05 17:38:18', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(154, 154, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '08:25:44', '17:34:26', 540, 0, 549, 0, 0, 0, 0, 'W', '08:25:44 17:34:26', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(155, 155, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:27:30', '17:32:00', 540, 0, 545, 0, 0, 0, 0, 'W', '08:27:30 17:32:00', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(156, 156, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:27:51', '17:33:43', 540, 0, 546, 0, 0, 0, 0, 'W', '08:27:51 17:33:43', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(157, 157, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:31:15', '17:33:07', 540, 0, 542, 0, 0, 0, 0, 'W', '08:31:15 17:33:07', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(158, 158, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '08:33:28', '13:35:50', 302, 0, 302, 0, 234, 238, 0, 'W-E', '08:33:28 13:35:50', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(159, 159, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(160, 160, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '12:15:23', '17:34:39', 319, 0, 319, 225, 0, 221, 0, 'L-W', '12:15:23 17:34:39', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(161, 161, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '08:26:43', '17:32:11', 540, 0, 545, 0, 0, 0, 0, 'W', '08:26:43 17:31:10 17:32:11', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(162, 162, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '08:13:34', '17:35:32', 540, 0, 562, 0, 0, 0, 0, 'W', '08:13:34 17:35:32', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(163, 163, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:27:46', '17.30', 0, 0, 0, 0, 60, 540, 0, 'W-E', '08:27:46', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(164, 164, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:27:46', '14:30:46', 363, 0, 363, 0, 179, 177, 0, 'W-E', '08:27:46 14:30:46', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(165, 165, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:33:11', '13:32:50', 300, 0, 300, 0, 237, 240, 0, 'W-E', '08:33:11 13:32:50', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(166, 166, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(167, 167, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:22:26', '17:33:42', 540, 0, 551, 0, 0, 0, 0, 'W', '08:22:26 17:33:42', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(168, 168, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:35:08', '17:34:16', 539, 0, 539, 0, 0, 1, 0, 'W', '08:35:08 17:34:16', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(169, 169, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:38:09', '17:34:20', 536, 0, 536, 0, 0, 4, 0, 'W', '08:38:09 17:34:20', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(170, 170, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '08:29:03', '17:33:21', 540, 0, 544, 0, 0, 0, 0, 'W', '08:29:03 17:33:21', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(171, 171, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(172, 172, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '08:56:45', '13:31:58', 275, 0, 275, 27, 238, 265, 0, 'L-W-E', '08:56:45 13:31:58', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(173, 173, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(174, 174, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:49', '17:34:19', 540, 0, 553, 0, 0, 0, 0, 'W', '08:21:49 17:34:19', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(175, 175, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '08:41:38', '17:31:48', 530, 0, 530, 12, 0, 10, 0, 'L-W', '08:41:38 17:31:48', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(176, 176, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '08:35:21', '17:33:53', 539, 0, 539, 0, 0, 1, 0, 'W', '08:35:21 17:33:53', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(177, 177, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '08:31:36', '17:34:50', 540, 0, 543, 0, 0, 0, 0, 'W', '08:31:36 17:34:50', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(178, 178, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:37:41', '17:46:32', 540, 0, 549, 0, 0, 0, 0, 'W', '08:37:41 17:46:32', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(179, 179, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:31:52', '13:33:43', 302, 0, 302, 0, 236, 238, 0, 'W-E', '08:31:52 13:33:43', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(180, 180, 9, 'Hansika', 'Ultimate Eng', '-', 'Male', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(181, 181, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '08:07:13', '13:37:28', 330, 0, 330, 0, 233, 210, 0, 'W-E', '08:07:13 13:37:28', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(182, 182, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(183, 183, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:02', '17:37:10', 540, 0, 556, 0, 0, 0, 0, 'W', '08:21:02 17:37:10', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(184, 184, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(185, 185, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:13:10', '16:12:21', 479, 0, 479, 0, 78, 61, 0, 'W-E', '08:13:10 16:12:21', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(186, 186, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:26:58', '17:33:03', 540, 0, 546, 0, 0, 0, 0, 'W', '08:26:58 17:33:03', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(187, 187, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:12:08', '17:32:21', 540, 0, 560, 0, 0, 0, 0, 'W', '08:12:08 17:32:21', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(188, 188, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '08:14:31', '13:34:25', 320, 0, 320, 0, 236, 220, 0, 'W-E', '08:14:31 13:34:25', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(189, 189, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(190, 190, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '08:11:29', '17:33:25', 540, 0, 562, 0, 0, 0, 0, 'W', '08:11:29 17:33:25', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(191, 191, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '11:09:54', '17:31:02', 381, 0, 381, 160, 0, 159, 0, 'L-W', '11:09:54 17:31:02', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(192, 192, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '08:13:28', '17:34:12', 540, 0, 561, 0, 0, 0, 0, 'W', '08:13:28 17:34:12', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(193, 193, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(194, 194, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:27:50', '17:29:06', 540, 0, 541, 0, 0, 0, 0, 'W', '08:27:50 17:29:06', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(195, 195, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(196, 196, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(197, 197, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:22:20', '17:32:46', 540, 0, 550, 0, 0, 0, 0, 'W', '08:22:20 17:32:46', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(198, 198, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:35:11', '17:31:55', 537, 0, 537, 0, 0, 3, 0, 'W', '08:35:11 17:31:55', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(199, 199, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(200, 200, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '07:55:37', '17:31:23', 540, 0, 576, 0, 0, 0, 0, 'W', '07:55:37 17:31:23', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(201, 201, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(202, 202, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '08:10:10', '13:31:29', 321, 0, 321, 0, 239, 219, 0, 'W-E', '08:10:10 13:31:29', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(203, 203, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(204, 204, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:21:07', '17:33:20', 540, 0, 552, 0, 0, 0, 0, 'W', '08:21:07 17:33:20', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(205, 205, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '11:41:10', '17:31:04', 350, 0, 350, 191, 0, 190, 0, 'L-W', '11:41:10 17:31:04', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(206, 206, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '08:29:11', '12:55:51', 267, 0, 267, 0, 60, 273, 0, 'W-E', '08:29:11 12:55:51', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(207, 207, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '08:14:02', '17:33:53', 540, 0, 560, 0, 0, 0, 0, 'W', '08:14:02 17:33:53', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(208, 208, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:16:47', '17.30', 0, 0, 0, 0, 60, 540, 0, 'W-E', '08:16:47', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(209, 209, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:12:44', '13:33:00', 320, 0, 320, 0, 237, 220, 0, 'W-E', '08:12:44 13:33:00', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(210, 210, 29, 'Nethmi', 'Ultimate Eng', '-', 'Male', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(211, 211, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-01', 'Sat.', 'time table(08:30:00-17:30:00)', '8.30', '13:31:55', 0, 0, 0, 60, 238, 540, 0, 'L-W-E', '13:31:55', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(212, 212, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-02', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(213, 213, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-03', 'Mon.', 'time table(08:30:00-17:30:00)', '08:29:31', '17:36:45', 540, 0, 547, 0, 0, 0, 0, 'W', '08:29:31 17:36:45', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(214, 214, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-04', 'Tue.', 'time table(08:30:00-17:30:00)', '08:25:55', '17:30:58', 540, 0, 545, 0, 0, 0, 0, 'W', '08:25:55 17:30:58', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(215, 215, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-05', 'Wed.', 'time table(08:30:00-17:30:00)', '08:29:36', '17:30:16', 540, 0, 541, 0, 0, 0, 0, 'W', '08:29:36 17:30:16', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(216, 216, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-06', 'Thu.', 'time table(08:30:00-17:30:00)', '08:30:00', '17:33:00', 540, 0, 543, 0, 0, 0, 0, 'W', '08:30:00 17:33:00', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(217, 217, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-07', 'Fri.', 'time table(08:30:00-17:30:00)', '08:32:16', '17:20:05', 528, 0, 528, 0, 0, 12, 0, 'W', '08:32:16 17:20:05', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(218, 218, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-08', 'Sat.', 'time table(08:30:00-17:30:00)', '08:26:30', '13:30:56', 304, 0, 304, 0, 60, 236, 0, 'W-E', '08:26:30', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(219, 219, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-09', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40');
INSERT INTO `upexcel` (`id`, `index`, `person_id`, `name`, `department`, `position`, `gender`, `date`, `week`, `timetable`, `check_in`, `check_out`, `work`, `ot`, `attended`, `late`, `early`, `absent`, `leave`, `status`, `records`, `file_id`, `created_at`, `updated_at`) VALUES
(220, 220, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-10', 'Mon.', 'time table(08:30:00-17:30:00)', '08:25:44', '17:34:10', 540, 0, 548, 0, 0, 0, 0, 'W', '08:25:44 17:34:10', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(221, 221, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-11', 'Tue.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(222, 222, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-12', 'Wed.', 'time table(08:30:00-17:30:00)', '08:28:57', '17:36:43', 540, 0, 548, 0, 0, 0, 0, 'W', '08:28:57 17:36:43', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(223, 223, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-13', 'Thu.', 'time table(08:30:00-17:30:00)', '08:26:40', '17:34:55', 540, 0, 548, 0, 0, 0, 0, 'W', '08:26:40 17:34:55', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(224, 224, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-14', 'Fri.', 'time table(08:30:00-17:30:00)', '08:30:44', '17:20:16', 530, 0, 530, 0, 0, 10, 0, 'W', '08:30:44 17:20:16', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(225, 225, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-15', 'Sat.', 'time table(08:30:00-17:30:00)', '08:21:37', '13:30:31', 309, 0, 309, 0, 60, 231, 0, 'W-E', '08:21:37', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(226, 226, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-16', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(227, 227, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-17', 'Mon.', 'time table(08:30:00-17:30:00)', '08:25:27', '17:30:02', 540, 0, 545, 0, 0, 0, 0, 'W', '08:25:27 17:30:02', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(228, 228, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-18', 'Tue.', 'time table(08:30:00-17:30:00)', '08:28:51', '17:34:10', 540, 0, 545, 0, 0, 0, 0, 'W', '08:28:51 17:34:10', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(229, 229, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-19', 'Wed.', 'time table(08:30:00-17:30:00)', '08:29:19', '17:30:03', 540, 0, 541, 0, 0, 0, 0, 'W', '08:29:19 17:30:03', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(230, 230, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-20', 'Thu.', 'time table(08:30:00-17:30:00)', '08:30:14', '17:55:59', 540, 0, 566, 0, 0, 0, 0, 'W', '08:30:14 17:55:59', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(231, 231, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-21', 'Fri.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(232, 232, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-22', 'Sat.', 'time table(08:30:00-17:30:00)', '08:29:57', '13:30:05', 300, 0, 300, 0, 60, 240, 0, 'W-E', '08:29:57', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(233, 233, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-23', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(234, 234, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-24', 'Mon.', 'time table(08:30:00-17:30:00)', '08:30:31', '17:30:33', 540, 0, 540, 0, 0, 0, 0, 'W', '08:30:31 17:30:33', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(235, 235, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-25', 'Tue.', 'time table(08:30:00-17:30:00)', '08:30:13', '17:30:54', 540, 0, 541, 0, 0, 0, 0, 'W', '08:30:13 17:30:54', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(236, 236, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-26', 'Wed.', 'time table(08:30:00-17:30:00)', '08:32:49', '17:31:37', 539, 0, 539, 0, 0, 1, 0, 'W', '08:32:49 17:31:37', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(237, 237, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-27', 'Thu.', 'time table(08:30:00-17:30:00)', '08:29:51', '17:31:10', 540, 0, 541, 0, 0, 0, 0, 'W', '08:29:51 17:31:10', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(238, 238, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-28', 'Fri.', 'time table(08:30:00-17:30:00)', '08:24:52', '17:22:17', 537, 0, 537, 0, 0, 3, 0, 'W', '08:24:52 17:22:17', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(239, 239, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-29', 'Sat.', 'time table(08:30:00-17:30:00)', '08:25:56', '13:30:30', 305, 0, 305, 0, 60, 235, 0, 'W-E', '08:25:56', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40'),
(240, 240, 31, 'Premachandra', 'Ultimate Eng', '-', 'Male', '2024-06-30', 'Sun.', 'time table(08:30:00-17:30:00)', '-', '-', 0, 0, 0, 60, 60, 540, 0, 'L-W-E-#', '-', 1, '2024-12-06 05:07:40', '2024-12-06 05:07:40');

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `file_name`, `year`, `month`, `created_at`, `updated_at`) VALUES
(1, 'june (1).xlsx', 2024, 6, '2024-12-06 05:07:39', '2024-12-06 05:07:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_email_unique` (`email`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave`
--
ALTER TABLE `leave`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leave_leave_type_id_foreign` (`leave_type_id`);

--
-- Indexes for table `leave_types`
--
ALTER TABLE `leave_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `machine`
--
ALTER TABLE `machine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payroll`
--
ALTER TABLE `payroll`
  ADD PRIMARY KEY (`payroll_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary_structures`
--
ALTER TABLE `salary_structures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbldepartments`
--
ALTER TABLE `tbldepartments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblemployees`
--
ALTER TABLE `tblemployees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `upexcel`
--
ALTER TABLE `upexcel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `upexcel_file_id_foreign` (`file_id`);

--
-- Indexes for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave`
--
ALTER TABLE `leave`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `leave_types`
--
ALTER TABLE `leave_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `machine`
--
ALTER TABLE `machine`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `payroll`
--
ALTER TABLE `payroll`
  MODIFY `payroll_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salary_structures`
--
ALTER TABLE `salary_structures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbldepartments`
--
ALTER TABLE `tbldepartments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblemployees`
--
ALTER TABLE `tblemployees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `upexcel`
--
ALTER TABLE `upexcel`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leave`
--
ALTER TABLE `leave`
  ADD CONSTRAINT `leave_leave_type_id_foreign` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `upexcel`
--
ALTER TABLE `upexcel`
  ADD CONSTRAINT `upexcel_file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `uploaded_files` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
