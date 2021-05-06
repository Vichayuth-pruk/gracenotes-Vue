-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2021 at 02:43 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gracenotes`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับความคิดเห็น',
  `comment_detail` text NOT NULL COMMENT 'ความคิดเห็น',
  `member_id` int(4) NOT NULL COMMENT 'ผู้แสดงความคิดเห็น',
  `social_id` int(4) NOT NULL COMMENT 'โพสต์ของความคิดเห็น',
  `comment_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลาความคิดเห็น'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `comment_detail`, `member_id`, `social_id`, `comment_timestamp`) VALUES
(16, 'เยี่ยมไปเลย', 42, 6, '2021-05-06 10:45:22'),
(17, 'Good', 43, 5, '2021-05-06 10:53:54'),
(18, 'Not bad', 44, 6, '2021-05-06 10:57:22'),
(19, 'Well done', 46, 5, '2021-05-06 11:26:22'),
(20, 'ทำดีมาก', 47, 6, '2021-05-06 11:29:32'),
(21, 'ขยันจริง', 48, 5, '2021-05-06 11:32:48'),
(22, 'งานดี', 49, 6, '2021-05-06 11:36:17'),
(23, 'God bless you', 47, 7, '2021-05-06 11:42:37'),
(24, 'ช่วยโลกใบนี้ไว้', 48, 7, '2021-05-06 11:43:26');

-- --------------------------------------------------------

--
-- Table structure for table `grace`
--

CREATE TABLE `grace` (
  `grace_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับความดี',
  `grace_time` time NOT NULL COMMENT 'จำนวนเวลาที่ใช้ทำความดี',
  `grace_date` date NOT NULL COMMENT 'วันที่ทำความดี',
  `grace_detail` text NOT NULL COMMENT 'รายละเอียดความดี',
  `grace_agency` varchar(50) NOT NULL COMMENT 'หน่วยงานที่ทำความดี',
  `grace_img` varchar(50) NOT NULL COMMENT 'รูปถ่ายความดี',
  `grace_check` enum('รอการอนุมัติ','ผ่าน','ไม่ผ่าน') NOT NULL DEFAULT 'รอการอนุมัติ' COMMENT 'การรับรองความดี',
  `member_id` int(4) NOT NULL COMMENT 'หมายเลขผู้บันทึกความดี',
  `grace_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลาความดี'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grace`
--

INSERT INTO `grace` (`grace_id`, `grace_time`, `grace_date`, `grace_detail`, `grace_agency`, `grace_img`, `grace_check`, `member_id`, `grace_timestamp`) VALUES
(7, '01:30:00', '2021-04-26', 'ช่วยแม่ทำความสะอาดบ้านครั้งใหญ่', 'บ้าน', '\\uploads\\grace\\myImage-1620296815445.jpg', 'ผ่าน', 39, '2021-05-06 10:26:55'),
(8, '02:40:00', '2000-08-18', 'ช่วยภารโรงทำความสะอาดห้องเรียนก่อนใช้สอบ', 'โรงเรียน', '\\uploads\\grace\\myImage-1620297449770.jpg', 'ผ่าน', 41, '2021-05-06 10:37:29'),
(9, '01:35:00', '2021-04-22', 'เก็บขยะบริเวณรอบๆวัดและภายในวัด', 'วัด', '\\uploads\\grace\\myImage-1620297853078.jpg', 'รอการอนุมัติ', 42, '2021-05-06 10:44:13'),
(10, '01:25:00', '2000-06-06', 'ไปบริจาคเลือดที่สภากาชาดมาครับ', 'สภากาชาดไทย', '\\uploads\\grace\\myImage-1620298360528.jpg', 'ผ่าน', 43, '2021-05-06 10:52:40'),
(11, '00:30:00', '2021-04-24', 'เก็บขยะบริเวณสนามเด็กเล่นภายในโรงเรียน', 'โรงเรียน', '\\uploads\\grace\\myImage-1620298947787.jpg', 'รอการอนุมัติ', 44, '2021-05-06 11:02:27'),
(12, '02:06:00', '2021-05-02', 'ปลูกป่าชายเลนที่ใกล้บ้านที่สุด', 'กรมทรัพยากรทางทะเลและชายฝั่ง', '\\uploads\\grace\\myImage-1620299401552.jpg', 'ผ่าน', 45, '2021-05-06 11:10:01'),
(14, '01:32:00', '2021-05-03', 'ช่วยแม่ทำมื้อเช้าให้ครอบครัวรับประทาน', 'บ้าน', '\\uploads\\grace\\myImage-1620300203039.jpg', 'รอการอนุมัติ', 45, '2021-05-06 11:23:23');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับสมาชิก',
  `member_user` varchar(10) NOT NULL COMMENT 'รหัสนักเรียน',
  `member_password` varchar(50) NOT NULL COMMENT 'รหัสผ่าน',
  `member_fname` varchar(30) NOT NULL COMMENT 'ชื่อ',
  `member_lname` varchar(30) NOT NULL COMMENT 'นามสกุล',
  `member_class` varchar(5) NOT NULL COMMENT 'ห้องเรียน',
  `member_no` int(11) NOT NULL COMMENT 'เลขที่',
  `member_dob` date NOT NULL COMMENT 'วันเกิด',
  `member_address` text NOT NULL COMMENT 'ที่อยู่',
  `member_img` varchar(50) NOT NULL COMMENT 'รูปประจำตัว',
  `member_level` enum('student','teacher') NOT NULL DEFAULT 'student' COMMENT 'บทบาท',
  `member_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `member_user`, `member_password`, `member_fname`, `member_lname`, `member_class`, `member_no`, `member_dob`, `member_address`, `member_img`, `member_level`, `member_timestamp`) VALUES
(39, '76203891', 'Pruk2543', 'โดเนีย', 'อานิน', '4/5', 26, '2000-05-11', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/12', '\\uploads\\profile\\myImage-1620295513613.jpg', 'student', '2021-05-06 10:05:13'),
(40, '62070168', 'Pruk2543', 'วิชยุตม์', 'ทวิชัยยุทธ', '6/1', 23, '2000-07-01', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/39', '\\uploads\\profile\\myImage-1620296159511.jpg', 'teacher', '2021-05-06 10:15:59'),
(41, '76203890', 'Pruk2543', 'ดาเกียว', 'อารี', '6/3', 52, '2000-03-18', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/41', '\\uploads\\profile\\myImage-1620297194883.jpg', 'student', '2021-05-06 10:33:14'),
(42, '76203892', 'Pruk2543', 'เรเดียม', 'มากรี', '5/4', 32, '2000-11-25', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/31', '\\uploads\\profile\\myImage-1620297685105.jpg', 'student', '2021-05-06 10:41:25'),
(43, '76203889', 'Pruk2543', 'ทีเนีย', 'ทามากัส', '4/3', 47, '2000-06-09', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/5', '\\uploads\\profile\\myImage-1620298103053.jpg', 'student', '2021-05-06 10:48:23'),
(44, '76203888', 'Pruk2543', 'การี', 'เหนาส', '5/7', 52, '2001-06-16', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/70', '\\uploads\\profile\\myImage-1620298601880.jpg', 'student', '2021-05-06 10:56:41'),
(45, '76203893', 'Pruk2543', 'อากัส', 'โลดาน', '3/5', 10, '2002-07-21', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/59', '\\uploads\\profile\\myImage-1620299115619.jpg', 'student', '2021-05-06 11:05:15'),
(46, '76203887', 'Pruk2543', 'กาเรีย', 'ทีโน่', '6/2', 45, '2001-11-06', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/65', '\\uploads\\profile\\myImage-1620300351810.jpg', 'student', '2021-05-06 11:25:51'),
(47, '76203894', 'Pruk2543', 'หันนาส', 'เฟรโด', '3/1', 18, '2004-07-17', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/82', '\\uploads\\profile\\myImage-1620300540567.jpg', 'student', '2021-05-06 11:29:00'),
(48, '76203886', 'Pruk2543', 'ซารีนัส', 'มารีเนีย', '5/4', 38, '2001-01-18', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/90', '\\uploads\\profile\\myImage-1620300732838.jpg', 'student', '2021-05-06 11:32:12'),
(49, '76203895', 'Pruk2543', 'มงเชล', 'เอเนียส', '3/6', 26, '2002-06-15', 'จ.สมุทรปราการ อ.เมือง ต.บางเมืองใหม่ หมู่บ้าน ไอริส 100/73', '\\uploads\\profile\\myImage-1620300945404.jfif', 'student', '2021-05-06 11:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับรายงาน',
  `report_topic` varchar(100) NOT NULL COMMENT 'หัวข้อปัญหา',
  `report_detail` text NOT NULL COMMENT 'รายละเอียดปัญหา',
  `member_id` int(4) NOT NULL COMMENT 'ผู้ร้องเรียน',
  `report_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลาร้องเรียน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`report_id`, `report_topic`, `report_detail`, `member_id`, `report_timestamp`) VALUES
(29, 'เลขที่', 'เปลี่ยนเลขที่ไม่ได้ครับ', 39, '2021-05-06 10:09:14'),
(30, 'ห้องเรียน', 'ใส่ห้องเรียนไม่ได้ครับ', 41, '2021-05-06 10:34:42'),
(31, 'โพสต์', 'กดไลก์ไม่ได้ครับ', 42, '2021-05-06 10:44:54'),
(32, 'รหัสผ่าน', 'เปลี่ยนรหัสผ่านไม่ได้ครับ', 43, '2021-05-06 10:50:53'),
(33, 'คอมเมนต์', 'คอมเมนต์ใต้โพสต์ไม่ได้ครับ', 45, '2021-05-06 11:11:36'),
(34, 'รูปภาพ', 'อัปโหลดรูปไม่ได้ครับ', 48, '2021-05-06 11:33:52');

-- --------------------------------------------------------

--
-- Table structure for table `report_feedback`
--

CREATE TABLE `report_feedback` (
  `reply_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับตอบกลับรายงาน',
  `report_id` int(4) NOT NULL COMMENT 'หมายเลขรายงาน',
  `reply_detail` text NOT NULL COMMENT 'รายละเอียดตอบกลับ',
  `member_id` int(4) NOT NULL COMMENT 'แอดมินที่ตอบกลับ',
  `reply_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลาตอบกลับรายงาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `report_feedback`
--

INSERT INTO `report_feedback` (`reply_id`, `report_id`, `reply_detail`, `member_id`, `reply_timestamp`) VALUES
(5, 29, 'กำลังแก้ให้ครับ', 40, '2021-05-06 10:20:57'),
(6, 32, 'แก้ไขเรียบร้อยแล้วครับ', 40, '2021-05-06 11:38:51'),
(7, 31, 'แก้ไขแล้วครับ', 40, '2021-05-06 11:39:29');

-- --------------------------------------------------------

--
-- Table structure for table `social`
--

CREATE TABLE `social` (
  `social_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับโพสต์',
  `social_detail` text NOT NULL COMMENT 'รายละเอียดโพสต์',
  `social_img` varchar(50) NOT NULL COMMENT 'รูปโพสต์',
  `member_id` int(4) NOT NULL COMMENT 'ผู้โพสต์',
  `social_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลาโพสต์'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `social`
--

INSERT INTO `social` (`social_id`, `social_detail`, `social_img`, `member_id`, `social_timestamp`) VALUES
(5, 'นาย โดเนีย อานิน ได้ช่วยเหลือมารดาทำความสะอาดบ้านครั้งใหญ่', '\\uploads\\grace\\myImage-1620296815445.jpg', 40, '2021-05-06 10:28:26'),
(6, 'นาย ดาเกียว อารี ได้ช่วยเหลือภารโรงในการทำความสะอาดห้องที่จะใช้สอบ', '\\uploads\\grace\\myImage-1620297449770.jpg', 40, '2021-05-06 10:38:59'),
(7, 'นาย อากัส โลดาน ได้ทำการปลูป่าชายเลนฟื้นฟูสภาพแวดล้อม', '\\uploads\\grace\\myImage-1620299401552.jpg', 40, '2021-05-06 11:40:46');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(4) NOT NULL COMMENT 'หมายเลขกำกับสถานะ',
  `status_type` enum('like','love','sadu') NOT NULL COMMENT 'ชนิดสถานะ',
  `member_id` int(4) NOT NULL COMMENT 'ผู้ส่งสถานะ',
  `social_id` int(4) NOT NULL COMMENT 'สถานะของโพสต์',
  `status_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ประทับเวลาสถานะ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status_type`, `member_id`, `social_id`, `status_timestamp`) VALUES
(54, 'love', 40, 5, '2021-05-06 10:28:37'),
(55, 'like', 42, 6, '2021-05-06 10:45:12'),
(56, 'love', 43, 5, '2021-05-06 10:53:41'),
(57, 'love', 44, 6, '2021-05-06 10:57:02'),
(59, 'like', 46, 5, '2021-05-06 11:26:31'),
(60, 'like', 47, 6, '2021-05-06 11:29:43'),
(61, 'like', 48, 5, '2021-05-06 11:32:51'),
(62, 'like', 48, 6, '2021-05-06 11:33:04'),
(63, 'love', 49, 5, '2021-05-06 11:36:02'),
(64, 'like', 49, 6, '2021-05-06 11:36:08'),
(65, 'like', 40, 7, '2021-05-06 11:41:21'),
(66, 'like', 47, 7, '2021-05-06 11:41:50'),
(67, 'like', 48, 7, '2021-05-06 11:43:29'),
(68, 'like', 40, 6, '2021-05-06 11:45:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `grace`
--
ALTER TABLE `grace`
  ADD PRIMARY KEY (`grace_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`),
  ADD UNIQUE KEY `member_user` (`member_user`),
  ADD UNIQUE KEY `member_img` (`member_img`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `report_feedback`
--
ALTER TABLE `report_feedback`
  ADD PRIMARY KEY (`reply_id`);

--
-- Indexes for table `social`
--
ALTER TABLE `social`
  ADD PRIMARY KEY (`social_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับความคิดเห็น', AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `grace`
--
ALTER TABLE `grace`
  MODIFY `grace_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับความดี', AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับสมาชิก', AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับรายงาน', AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `report_feedback`
--
ALTER TABLE `report_feedback`
  MODIFY `reply_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับตอบกลับรายงาน', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `social`
--
ALTER TABLE `social`
  MODIFY `social_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับโพสต์', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'หมายเลขกำกับสถานะ', AUTO_INCREMENT=69;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
