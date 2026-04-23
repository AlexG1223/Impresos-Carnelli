-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 23, 2026 at 12:46 PM
-- Server version: 11.8.6-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u240116336_ic`
--

-- --------------------------------------------------------

--
-- Table structure for table `archivos`
--

CREATE TABLE `archivos` (
  `id` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `ruta_archivo` varchar(255) NOT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  `fecha_subida` datetime NOT NULL DEFAULT current_timestamp(),
  `etapa_origen` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `archivos`
--

INSERT INTO `archivos` (`id`, `id_orden`, `ruta_archivo`, `tipo`, `fecha_subida`, `etapa_origen`) VALUES
(1, 4, 'uploads/ordenes/4/archivo_6957fb36d2491.jpeg', 'jpeg', '2026-01-02 17:07:02', 'INGRESADA'),
(2, 4, 'uploads/ordenes/4/archivo_6957fb36d277e.jpeg', 'jpeg', '2026-01-02 17:07:02', 'INGRESADA'),
(3, 5, 'uploads/ordenes/5/archivo_6957fe35b93b6.pdf', 'pdf', '2026-01-02 17:19:49', 'INGRESADA'),
(9, 15, 'uploads/ordenes/15/archivo_695ad32a43d02.pdf', 'pdf', '2026-01-04 20:52:58', 'INGRESADA'),
(10, 16, 'uploads/ordenes/16/archivo_695be92c79589.jpeg', 'jpeg', '2026-01-05 16:39:08', 'INGRESADA'),
(12, 18, 'uploads/ordenes/18/archivo_695c259967822.pdf', 'pdf', '2026-01-05 20:56:57', 'INGRESADA'),
(13, 18, 'uploads/ordenes/18/archivo_695c259967bc4.jpeg', 'jpeg', '2026-01-05 20:56:57', 'INGRESADA'),
(14, 18, 'uploads/ordenes/18/archivo_695c259967d7b.pdf', 'pdf', '2026-01-05 20:56:57', 'INGRESADA'),
(16, 27, 'uploads/ordenes/27/archivo_69721eb43554e.jpeg', 'jpeg', '2026-01-22 12:57:24', 'INGRESADA'),
(17, 28, 'uploads/ordenes/28/archivo_697413d8f29c3.jpeg', 'jpeg', '2026-01-24 00:35:36', 'INGRESADA'),
(18, 29, 'uploads/ordenes/29/archivo_69774a9586375.jpeg', 'jpeg', '2026-01-26 11:05:57', 'INGRESADA'),
(19, 29, 'uploads/ordenes/29/archivo_69774a9586531.jpeg', 'jpeg', '2026-01-26 11:05:57', 'INGRESADA'),
(20, 30, 'uploads/ordenes/30/archivo_6977e7a184ae9.pdf', 'pdf', '2026-01-26 22:16:01', 'INGRESADA'),
(21, 33, 'uploads/ordenes/33/archivo_6977ef06c4ef4.jpeg', 'jpeg', '2026-01-26 22:47:34', 'INGRESADA'),
(22, 35, 'uploads/ordenes/35/archivo_69795310ccb8e.pdf', 'pdf', '2026-01-28 00:06:40', 'INGRESADA'),
(23, 35, 'uploads/ordenes/35/archivo_69795310ccdfd.pdf', 'pdf', '2026-01-28 00:06:40', 'INGRESADA'),
(24, 36, 'uploads/ordenes/36/archivo_6979541b4c3be.jpeg', 'jpeg', '2026-01-28 00:11:07', 'INGRESADA'),
(25, 36, 'uploads/ordenes/36/archivo_6979541b4c5c5.pdf', 'pdf', '2026-01-28 00:11:07', 'INGRESADA'),
(26, 38, 'uploads/ordenes/38/archivo_6979fea070309.jpeg', 'jpeg', '2026-01-28 12:18:40', 'INGRESADA'),
(27, 38, 'uploads/ordenes/38/archivo_6979fea070568.jpeg', 'jpeg', '2026-01-28 12:18:40', 'INGRESADA'),
(28, 39, 'uploads/ordenes/39/archivo_697c037adb75b.jpeg', 'jpeg', '2026-01-30 01:03:54', 'INGRESADA'),
(29, 39, 'uploads/ordenes/39/archivo_697c037adbb20.jpeg', 'jpeg', '2026-01-30 01:03:54', 'INGRESADA'),
(30, 39, 'uploads/ordenes/39/archivo_697c037adbc73.jpeg', 'jpeg', '2026-01-30 01:03:54', 'INGRESADA'),
(31, 40, 'uploads/ordenes/40/archivo_697c0573bc6ad.jpeg', 'jpeg', '2026-01-30 01:12:19', 'INGRESADA'),
(32, 40, 'uploads/ordenes/40/archivo_697c0573bc8a0.jpeg', 'jpeg', '2026-01-30 01:12:19', 'INGRESADA'),
(33, 40, 'uploads/ordenes/40/archivo_697c0573bc9d3.jpeg', 'jpeg', '2026-01-30 01:12:19', 'INGRESADA'),
(34, 41, 'uploads/ordenes/41/archivo_697d012e03f9e.jpeg', 'jpeg', '2026-01-30 19:06:22', 'INGRESADA'),
(35, 41, 'uploads/ordenes/41/archivo_697d012e0417c.jpeg', 'jpeg', '2026-01-30 19:06:22', 'INGRESADA'),
(36, 41, 'uploads/ordenes/41/archivo_697d012e04375.jpeg', 'jpeg', '2026-01-30 19:06:22', 'INGRESADA'),
(37, 46, 'uploads/ordenes/46/archivo_698525102eb0c.pdf', 'pdf', '2026-02-05 23:17:36', 'INGRESADA'),
(38, 47, 'uploads/ordenes/47/archivo_698535dd03b15.pdf', 'pdf', '2026-02-06 00:29:17', 'INGRESADA'),
(39, 48, 'uploads/ordenes/48/archivo_69853eab36e94.pdf', 'pdf', '2026-02-06 01:06:51', 'INGRESADA'),
(40, 49, 'uploads/ordenes/49/archivo_6989d753cade6.jpeg', 'jpeg', '2026-02-09 12:47:15', 'INGRESADA'),
(41, 49, 'uploads/ordenes/49/archivo_6989d753cb270.jpeg', 'jpeg', '2026-02-09 12:47:15', 'INGRESADA'),
(42, 53, 'uploads/ordenes/53/archivo_69932b4386aa1.jpeg', 'jpeg', '2026-02-16 14:35:47', 'INGRESADA'),
(43, 53, 'uploads/ordenes/53/archivo_69932b4386eec.jpeg', 'jpeg', '2026-02-16 14:35:47', 'INGRESADA'),
(44, 53, 'uploads/ordenes/53/archivo_69932b4387092.jpeg', 'jpeg', '2026-02-16 14:35:47', 'INGRESADA'),
(45, 54, 'uploads/ordenes/54/archivo_69932d7a2fce8.jpeg', 'jpeg', '2026-02-16 14:45:14', 'MODIFICACION'),
(46, 55, 'uploads/ordenes/55/archivo_69937e5c38804.jpeg', 'jpeg', '2026-02-16 20:30:20', 'INGRESADA'),
(47, 56, 'uploads/ordenes/56/archivo_69937fd352c5c.jpeg', 'jpeg', '2026-02-16 20:36:35', 'INGRESADA'),
(48, 56, 'uploads/ordenes/56/archivo_699380195bdf9.jpeg', 'jpeg', '2026-02-16 20:37:45', 'MODIFICACION'),
(49, 56, 'uploads/ordenes/56/archivo_699380195bfe2.jpeg', 'jpeg', '2026-02-16 20:37:45', 'MODIFICACION'),
(50, 57, 'uploads/ordenes/57/archivo_6993811bad33d.jpeg', 'jpeg', '2026-02-16 20:42:03', 'INGRESADA'),
(51, 58, 'uploads/ordenes/58/archivo_6993876f7b40b.jpeg', 'jpeg', '2026-02-16 21:09:03', 'INGRESADA'),
(52, 58, 'uploads/ordenes/58/archivo_6993876f7b635.jpeg', 'jpeg', '2026-02-16 21:09:03', 'INGRESADA'),
(53, 58, 'uploads/ordenes/58/archivo_6993876f7b78e.jpeg', 'jpeg', '2026-02-16 21:09:03', 'INGRESADA'),
(54, 58, 'uploads/ordenes/58/archivo_6993876f7b925.jpeg', 'jpeg', '2026-02-16 21:09:03', 'INGRESADA'),
(55, 58, 'uploads/ordenes/58/archivo_699387b5ca062.svg', 'svg', '2026-02-16 21:10:13', 'MODIFICACION'),
(56, 55, 'uploads/ordenes/55/archivo_699387f444cf2.jpeg', 'jpeg', '2026-02-16 21:11:16', 'MODIFICACION'),
(57, 59, 'uploads/ordenes/59/archivo_6994785b61879.jpeg', 'jpeg', '2026-02-17 14:16:59', 'INGRESADA'),
(58, 59, 'uploads/ordenes/59/archivo_6994785b61c57.jpeg', 'jpeg', '2026-02-17 14:16:59', 'INGRESADA'),
(59, 59, 'uploads/ordenes/59/archivo_6994785b61e07.jpeg', 'jpeg', '2026-02-17 14:16:59', 'INGRESADA'),
(60, 59, 'uploads/ordenes/59/archivo_6994785b61fc7.jpeg', 'jpeg', '2026-02-17 14:16:59', 'INGRESADA'),
(61, 59, 'uploads/ordenes/59/archivo_6994785b6210b.jpeg', 'jpeg', '2026-02-17 14:16:59', 'INGRESADA'),
(62, 59, 'uploads/ordenes/59/archivo_6994785b6226e.jpeg', 'jpeg', '2026-02-17 14:16:59', 'INGRESADA'),
(63, 60, 'uploads/ordenes/60/archivo_6994804f53731.jpeg', 'jpeg', '2026-02-17 14:50:55', 'INGRESADA'),
(64, 63, 'uploads/ordenes/63/archivo_69963512bda86.jpeg', 'jpeg', '2026-02-18 21:54:26', 'INGRESADA'),
(65, 64, 'uploads/ordenes/64/archivo_69983ebc6296a.jpeg', 'jpeg', '2026-02-20 11:00:12', 'INGRESADA'),
(66, 65, 'uploads/ordenes/65/archivo_6998c526ac4ad.pdf', 'pdf', '2026-02-20 20:33:42', 'MODIFICACION'),
(69, 60, 'uploads/ordenes/60/archivo_6999bd4d4ba24.jpeg', 'jpeg', '2026-02-21 14:12:29', 'MODIFICACION'),
(71, 66, 'uploads/ordenes/66/archivo_6999de817c39a.pdf', 'pdf', '2026-02-21 16:34:09', 'INGRESADA'),
(72, 66, 'uploads/ordenes/66/archivo_6999de817d2bd.jpeg', 'jpeg', '2026-02-21 16:34:09', 'INGRESADA'),
(73, 66, 'uploads/ordenes/66/archivo_6999de817d3f8.jpeg', 'jpeg', '2026-02-21 16:34:09', 'INGRESADA'),
(74, 67, 'uploads/ordenes/67/archivo_699f8685c3392.jpeg', 'jpeg', '2026-02-25 23:32:21', 'INGRESADA'),
(75, 68, 'uploads/ordenes/68/archivo_699f87da765ce.pdf', 'pdf', '2026-02-25 23:38:02', 'INGRESADA'),
(76, 73, 'uploads/ordenes/73/archivo_69a0ce8835388.jpeg', 'jpeg', '2026-02-26 22:51:52', 'MODIFICACION'),
(77, 74, 'uploads/ordenes/74/archivo_69a0d0971a882.jpeg', 'jpeg', '2026-02-26 23:00:39', 'MODIFICACION'),
(78, 75, 'uploads/ordenes/75/archivo_69a1b7d8ac3f6.jpeg', 'jpeg', '2026-02-27 15:27:20', 'INGRESADA'),
(79, 76, 'uploads/ordenes/76/archivo_69a1d5fb14042.pdf', 'pdf', '2026-02-27 17:35:55', 'INGRESADA'),
(80, 77, 'uploads/ordenes/77/archivo_69a21c41146e3.pdf', 'pdf', '2026-02-27 22:35:45', 'INGRESADA'),
(83, 79, 'uploads/ordenes/79/archivo_69af6c6e0d274.pdf', 'pdf', '2026-03-10 00:57:18', 'INGRESADA'),
(84, 80, 'uploads/ordenes/80/archivo_69b3f79746bf5.pdf', 'pdf', '2026-03-13 11:40:07', 'INGRESADA'),
(85, 82, 'uploads/ordenes/82/archivo_69b3fe76d0f0d.pdf', 'pdf', '2026-03-13 12:09:26', 'INGRESADA'),
(86, 82, 'uploads/ordenes/82/archivo_69b3fe76dd9e8.jpeg', 'jpeg', '2026-03-13 12:09:26', 'INGRESADA'),
(87, 84, 'uploads/ordenes/84/archivo_69b40280e864c.jpeg', 'jpeg', '2026-03-13 12:26:40', 'INGRESADA'),
(88, 84, 'uploads/ordenes/84/archivo_69b40280e8820.jpeg', 'jpeg', '2026-03-13 12:26:40', 'INGRESADA'),
(89, 84, 'uploads/ordenes/84/archivo_69b40280e897c.jpeg', 'jpeg', '2026-03-13 12:26:40', 'INGRESADA'),
(90, 84, 'uploads/ordenes/84/archivo_69b40280e8ab4.jpeg', 'jpeg', '2026-03-13 12:26:40', 'INGRESADA'),
(91, 85, 'uploads/ordenes/85/archivo_69b408437d45c.jpeg', 'jpeg', '2026-03-13 12:51:15', 'INGRESADA'),
(92, 86, 'uploads/ordenes/86/archivo_69b412f2cf93d.jpeg', 'jpeg', '2026-03-13 13:36:50', 'MODIFICACION'),
(93, 86, 'uploads/ordenes/86/archivo_69b412f2cfc1e.jpeg', 'jpeg', '2026-03-13 13:36:50', 'MODIFICACION'),
(94, 86, 'uploads/ordenes/86/archivo_69b412f2cfd3f.jpeg', 'jpeg', '2026-03-13 13:36:50', 'MODIFICACION'),
(95, 87, 'uploads/ordenes/87/archivo_69b416f457c99.pdf', 'pdf', '2026-03-13 13:53:56', 'INGRESADA'),
(96, 87, 'uploads/ordenes/87/archivo_69b416f458327.jpeg', 'jpeg', '2026-03-13 13:53:56', 'INGRESADA'),
(97, 87, 'uploads/ordenes/87/archivo_69b416f4584e4.jpeg', 'jpeg', '2026-03-13 13:53:56', 'INGRESADA'),
(98, 89, 'uploads/ordenes/89/archivo_69b4a7f53e997.jpeg', 'jpeg', '2026-03-14 00:12:37', 'INGRESADA'),
(99, 91, 'uploads/ordenes/91/archivo_69b4b534d5515.jpeg', 'jpeg', '2026-03-14 01:09:08', 'MODIFICACION'),
(100, 89, 'uploads/ordenes/89/archivo_69b7326b6bb3f.jpeg', 'jpeg', '2026-03-15 22:27:55', 'MODIFICACION'),
(101, 90, 'uploads/ordenes/90/archivo_69b73419e8e75.pdf', 'pdf', '2026-03-15 22:35:05', 'MODIFICACION'),
(102, 90, 'uploads/ordenes/90/archivo_69b73419ea307.jpeg', 'jpeg', '2026-03-15 22:35:05', 'MODIFICACION'),
(103, 90, 'uploads/ordenes/90/archivo_69b73419ea48a.jpeg', 'jpeg', '2026-03-15 22:35:05', 'MODIFICACION'),
(104, 90, 'uploads/ordenes/90/archivo_69b73419ea5e0.jpeg', 'jpeg', '2026-03-15 22:35:05', 'MODIFICACION'),
(105, 90, 'uploads/ordenes/90/archivo_69b73419ea757.jpeg', 'jpeg', '2026-03-15 22:35:05', 'MODIFICACION'),
(106, 90, 'uploads/ordenes/90/archivo_69b73419ea8c4.jpeg', 'jpeg', '2026-03-15 22:35:05', 'MODIFICACION'),
(107, 84, 'uploads/ordenes/84/archivo_69b7498aab24c.jpg', 'jpg', '2026-03-16 00:06:34', 'MODIFICACION'),
(108, 92, 'uploads/ordenes/92/archivo_69b80b3d0829c.pdf', 'pdf', '2026-03-16 13:53:01', 'INGRESADA'),
(109, 92, 'uploads/ordenes/92/archivo_69b80b3d08504.jpeg', 'jpeg', '2026-03-16 13:53:01', 'INGRESADA'),
(110, 93, 'uploads/ordenes/93/archivo_69b8abe03ffb3.jpeg', 'jpeg', '2026-03-17 01:18:24', 'INGRESADA'),
(111, 94, 'uploads/ordenes/94/archivo_69b8ad9d31578.jpeg', 'jpeg', '2026-03-17 01:25:49', 'INGRESADA'),
(112, 94, 'uploads/ordenes/94/archivo_69b8ad9d318d9.jpeg', 'jpeg', '2026-03-17 01:25:49', 'INGRESADA'),
(113, 94, 'uploads/ordenes/94/archivo_69b8ad9d31a1d.jpeg', 'jpeg', '2026-03-17 01:25:49', 'INGRESADA'),
(114, 100, 'uploads/ordenes/100/archivo_69ba0f1294762.pdf', 'pdf', '2026-03-18 02:33:54', 'INGRESADA'),
(115, 101, 'uploads/ordenes/101/archivo_69bae2a66e4f9.jpeg', 'jpeg', '2026-03-18 17:36:38', 'INGRESADA'),
(116, 101, 'uploads/ordenes/101/archivo_69bae2a66e999.jpeg', 'jpeg', '2026-03-18 17:36:38', 'INGRESADA'),
(117, 103, 'uploads/ordenes/103/archivo_69bda71c50da6.pdf', 'pdf', '2026-03-20 19:59:24', 'INGRESADA'),
(118, 104, 'uploads/ordenes/104/archivo_69bdaa986eaf6.jpeg', 'jpeg', '2026-03-20 20:14:16', 'INGRESADA'),
(119, 104, 'uploads/ordenes/104/archivo_69bdaab2e0601.jpeg', 'jpeg', '2026-03-20 20:14:42', 'MODIFICACION'),
(120, 105, 'uploads/ordenes/105/archivo_69bdacd937f33.jpeg', 'jpeg', '2026-03-20 20:23:53', 'INGRESADA'),
(121, 105, 'uploads/ordenes/105/archivo_69bdacfcacfa3.jpeg', 'jpeg', '2026-03-20 20:24:28', 'MODIFICACION'),
(122, 106, 'uploads/ordenes/106/archivo_69bdb3c233d3c.jpeg', 'jpeg', '2026-03-20 20:53:22', 'INGRESADA'),
(123, 106, 'uploads/ordenes/106/archivo_69bdb3c234ad3.jpeg', 'jpeg', '2026-03-20 20:53:22', 'INGRESADA'),
(124, 108, 'uploads/ordenes/108/archivo_69beb9ce954ea.jpeg', 'jpeg', '2026-03-21 15:31:26', 'MODIFICACION'),
(125, 109, 'uploads/ordenes/109/archivo_69c153edbe665.jpeg', 'jpeg', '2026-03-23 14:53:33', 'INGRESADA'),
(126, 110, 'uploads/ordenes/110/archivo_69c1c307dc37f.jpeg', 'jpeg', '2026-03-23 22:47:35', 'INGRESADA'),
(131, 110, 'uploads/ordenes/110/archivo_69c2a2fbedb00.jpeg', 'jpeg', '2026-03-24 14:43:07', 'MODIFICACION'),
(132, 101, 'uploads/ordenes/101/archivo_69c2a3ba7f4df.jpeg', 'jpeg', '2026-03-24 14:46:18', 'MODIFICACION'),
(133, 111, 'uploads/ordenes/111/archivo_69c315b61f0a2.jpeg', 'jpeg', '2026-03-24 22:52:38', 'MODIFICACION'),
(134, 111, 'uploads/ordenes/111/archivo_69c315b61f40e.jpeg', 'jpeg', '2026-03-24 22:52:38', 'MODIFICACION'),
(135, 112, 'uploads/ordenes/112/archivo_69c317579682e.pdf', 'pdf', '2026-03-24 22:59:35', 'INGRESADA'),
(136, 112, 'uploads/ordenes/112/archivo_69c3175796b36.pdf', 'pdf', '2026-03-24 22:59:35', 'INGRESADA'),
(137, 112, 'uploads/ordenes/112/archivo_69c3175796dd7.pdf', 'pdf', '2026-03-24 22:59:35', 'INGRESADA'),
(138, 113, 'uploads/ordenes/113/archivo_69c53936e8b46.jpeg', 'jpeg', '2026-03-26 13:48:38', 'INGRESADA'),
(139, 115, 'uploads/ordenes/115/archivo_69cab41b2f64d.jpeg', 'jpeg', '2026-03-30 17:34:19', 'INGRESADA'),
(140, 116, 'uploads/ordenes/116/archivo_69cab652d2206.jpeg', 'jpeg', '2026-03-30 17:43:46', 'INGRESADA'),
(141, 116, 'uploads/ordenes/116/archivo_69cab652d242b.jpeg', 'jpeg', '2026-03-30 17:43:46', 'INGRESADA'),
(142, 119, 'uploads/ordenes/119/archivo_69cb14c595c42.pdf', 'pdf', '2026-03-31 00:26:45', 'INGRESADA'),
(143, 118, 'uploads/ordenes/118/archivo_69cb14ef4d4f5.pdf', 'pdf', '2026-03-31 00:27:27', 'MODIFICACION'),
(144, 120, 'uploads/ordenes/120/archivo_69cc758446ae8.jpeg', 'jpeg', '2026-04-01 01:31:48', 'INGRESADA'),
(145, 121, 'uploads/ordenes/121/archivo_69d6d0d9c5dda.jpeg', 'jpeg', '2026-04-08 22:04:09', 'INGRESADA'),
(146, 121, 'uploads/ordenes/121/archivo_69d6d0d9c6153.jpeg', 'jpeg', '2026-04-08 22:04:09', 'INGRESADA'),
(147, 122, 'uploads/ordenes/122/archivo_69d6d28f97430.pdf', 'pdf', '2026-04-08 22:11:27', 'INGRESADA'),
(148, 122, 'uploads/ordenes/122/archivo_69d6d28f9773b.jpeg', 'jpeg', '2026-04-08 22:11:27', 'INGRESADA'),
(149, 124, 'uploads/ordenes/124/archivo_69dfad9ed1820.jpeg', 'jpeg', '2026-04-15 15:24:14', 'INGRESADA'),
(150, 124, 'uploads/ordenes/124/archivo_69dfad9ed1a3f.jpeg', 'jpeg', '2026-04-15 15:24:14', 'INGRESADA'),
(151, 124, 'uploads/ordenes/124/archivo_69dfad9ed1c6b.jpeg', 'jpeg', '2026-04-15 15:24:14', 'INGRESADA'),
(152, 124, 'uploads/ordenes/124/archivo_69dfad9ed1dc5.jpeg', 'jpeg', '2026-04-15 15:24:14', 'INGRESADA'),
(153, 126, 'uploads/ordenes/126/archivo_69e1373aaac67.jpeg', 'jpeg', '2026-04-16 19:23:38', 'INGRESADA'),
(154, 128, 'uploads/ordenes/128/archivo_69e13d8858a03.jpeg', 'jpeg', '2026-04-16 19:50:32', 'INGRESADA'),
(155, 132, 'uploads/ordenes/132/archivo_69e962210960a.jpeg', 'jpeg', '2026-04-23 00:04:49', 'INGRESADA'),
(156, 134, 'uploads/ordenes/134/archivo_69e9684cef73a.pdf', 'pdf', '2026-04-23 00:31:08', 'INGRESADA'),
(157, 135, 'uploads/ordenes/135/archivo_69e96ae984820.jpeg', 'jpeg', '2026-04-23 00:42:17', 'INGRESADA');

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `razon_social` varchar(100) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `rut` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `fecha_alta` date DEFAULT NULL,
  `departamento` varchar(50) DEFAULT NULL,
  `localidad` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `empresa` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `razon_social`, `nombre`, `rut`, `telefono`, `observaciones`, `fecha_alta`, `departamento`, `localidad`, `direccion`, `empresa`) VALUES
(1, 'RS', 'Cliente PruebaA', '1234567', '092473724', 'abc', '2025-12-27', 'ABC', 'ABCD', 'ABCD', NULL),
(2, 'Negra Burger', 'Santiago Negra Burguer', '.', '098294909', 'enviar por de punta a levantar', '2026-01-02', 'Maldonado', 'Pitiapolis', 'Piriapolis', NULL),
(3, 'Maico Caceres', 'Maico Caceres Pizz La Tertulia', '120284490017', '099837148', 'Retira por DAC  en agencia nombre de Maico Caceres', '2026-01-02', 'Paysandú', 'Paysandú', 'Paysandú', NULL),
(4, 'Roticcelli', 'Diego Hernández Roticcelli', '1', '095717770', 'Levanta en el taller', '2026-01-04', 'Canelones', 'Ciudad de la Costa', 'Calle aerosur manz 102 sol 4 local 2', NULL),
(5, 'Sabrina en la Cocina', 'Sabrina Ceja Fray Bentos', '1', '093603882', '', '2026-01-05', 'Rio Negro', 'Fray Bentos', 'Covisin 1 Viv 17 Fray Bentos Rio Nrgro', NULL),
(6, 'FIORELLI HATCHONDO BRUNO', 'Bruno Fiorelli Befe Burgers', '150607200017', '098864839', 'Retira en Agencia\nenviar por minstrans\nconsultar antes por las dudas\n\n', '2026-01-05', 'Rio Negro', 'Young', 'Juan Pedro Marín 3171 esq 12 de Octubre', 'Befe Burgers'),
(7, 'REYES MAIRET NICOLAS Y REYES MAIRET MATHIAS', 'Maika El Garage Empanadas', '100846450018', '099913578', 'Enviar por de punta o Dac', '2026-01-12', 'Maldonado', 'Piriapolis', 'el garage av central esq rambla de los ingleses pu', NULL),
(8, 'EAST WAVE SAS', 'Mariana Plaza Cafe', '218874020013', '097 400 393', 'mandar por box mas', '2026-01-12', 'Montevideo', 'Montevideo', 'Jackson 885 Montevideo', NULL),
(9, 'LETHAL GYM', 'Silver Piedrabuena', '0000', '099 961 625', 'Barrio Jardines del Liceo', '2026-01-15', 'Canelones', 'Sauce', 'Calle Santa Isabel Esq. Santiago', NULL),
(10, '00', 'Leticia Santos', '00', '095 987 233', '', '2026-01-22', 'Canelones', 'Shangrilá', 'San Francisco', NULL),
(11, 'Probando', 'Alex Carnelli', '3456723', 'dsdsa', '', '2026-01-22', 'Montevideo', 'Texas', 'fdfd', NULL),
(12, 'Richard Morgan Bradford', 'Richard Bradford', '130169440018', '099810815', '', '2026-01-24', 'Rio Negro', 'Fray Bentos', 'Retira en Agencia', 'A Donde Sea'),
(13, '', 'Leonardo Freidenberg', '', '092 242 150', '', '2026-01-26', 'Canelones', 'El Pinar', '', ''),
(14, 'Pascal y Castilla sas', 'Focaccia - Prado', '21921808011', '098325497', '098325497 Carlos Encargado \n099407790 Agustin Dueño', '2026-01-26', 'Montevideo', 'Montevideo', 'Venancio Benavidez 3417 - Prado', 'Focaccia'),
(15, '', 'Esteban Garelli Pizzeria Donatello', '4.830.452-9', '099766135', '', '2026-01-26', 'Rivera', 'Rivera', 'Juana de Oriol 946 esq Agustín Ortega', 'Pizzeria Donatello'),
(16, '.', 'Rossana Pizz La Fabrica', '.', '09995364', 'estan para pasar datos de empresa', '2026-01-26', 'Maldonado', 'Cerro Pelado Maldonado', 'Benito Nardone, Es la primer boca calle sobre la i', 'Pizzeria La Fabrica'),
(17, 'IL diavolo', 'Matías Bravo', '5.007.245-7', '092430158', 'El papel amarillo (Maldonado 1354 esq ejido local rojo y amarillo) Montevideo\n\nPapel rojo por agencia a Mercedes Soriano, Don Bosco 973 Viv 55 la dirección //De 10 hs en adelante hasta las 17 hs aprox', '2026-01-27', 'Soriano', 'Mercedes', '', 'IL diavolo'),
(18, '', 'Tatiana Qrico.uy', '', '093987189', '', '2026-01-28', 'Canelones', 'Las Piedras', 'Dr Enrique Pouey 659 (Las Piedras)', 'Qrico.uy'),
(19, '8857533', 'Martin Salgueiro Pizz Cuatrocientos', '220301890010', '098598435', 'enviar po Mistrans', '2026-01-29', 'Florida', 'Florida', 'Gallinal 667 apto 103 esq. Gallinal Florida', 'M Pizzeria CUATROCIENTOSº'),
(20, '', 'José González ', 'C.i 3.989.598.7', '098869084', 'hay que enviarlo el 10 /02 mas tardar', '2026-01-30', '', 'Artigas - Bella Union', 'Juaquin Suárez 1029', 'Cantina El Yaca'),
(21, 'Fabinel SA', 'Alvaro Distribuidor Fabinel  SA', '2137822620013', '095 977 461', 'por box + o a acoordinar', '2026-01-30', 'Montevideo', 'Montevideo', 'Santa Fe 1222 esq Sapican', 'Fabinel SA'),
(22, 'SOSA PALACIOS IGNACIO', 'Ignacio Sosa Pizzeria Ventuno', '150902070013', '098788241', '', '2026-01-30', 'Soriano', 'Mercedes', 'Eusebio Giménez 69', 'Pizzeria Ventuno'),
(23, 'Costa del Golf S.A.', 'Soledad Queirolo Hotel Costa Del Golf', '100164880018', '099924032', 'dirección de envio igual a dirección fiscal\nenviar por de punta a puerta', '2026-02-05', 'Maldonado', 'Maldonado', 'Av. del Agua, Parada 19 brava', 'Hotel Costa Del Golf'),
(24, 'Favio Alejandro Araujo Araujo', 'Favio Alejandro Araujo Araujo', '030124420011', '099805701', 'Leandro Gómez 4498 Rio Branco Cerro Largo\nTaller araujo', '2026-02-05', 'Cerro Largo', 'Rio Branco', 'Leandro Gómez 4498', 'Taller Araujo'),
(25, 'Buena Quinta Sas', 'Santiago Figueredo Buena Quinta', '190326280016', '097977364', 'consultar si se envia por box o levanta en taller por cadete propio', '2026-02-05', 'Montevideo', 'Montevideo', 'José Leguizamón 3879 bis entre andres aguiar y pro', 'Buena Quinta'),
(26, '', 'Paola Roglia Del Sur Bakery', '218431170016', '099540070', 'enviar por box', '2026-02-05', 'Montevideo', 'Montevideo', 'Pan de azucar 2750 esq avellaneda', 'Del Sur Bakery'),
(27, '', 'Santiago Hernandez  Dulces Onlie', '4858022-0 CI', '098995868', '\n', '2026-02-05', 'Maldonado', 'Piriapolis', 'Retira en Agencia', 'Browny  Dulces Onlie'),
(28, 'REYES MAIRET NICOLAS Y REYES MAIRET MATHIAS', 'Naika Nicolas Reyes', '100846450018', '099913578', '', '2026-02-06', 'Maldonado', 'punta fria Piriapolis', 'av central esq rambla de los ingleses punta fria p', 'El Garage'),
(29, '', 'Diego Instalaciones Electricas', '', '096001880', 'Levanta Jorge en el taller', '2026-02-09', 'Canelones', 'Barros Blancos', 'ruta 8 km 23', 'IE Instalaciones Electricas'),
(30, '', 'Santiago Paema', '220519560016', '097 005 300', 'Enviar Por depunta \nrazon social la tiene Mauro', '2026-02-09', 'Maldonado', 'Maldonado', 'Román Guerra 1047(Gestoria)', 'Paema'),
(31, '.', 'Tatiana Mendoza', '.', '093987189', 'Viene para Dr Pouey 659 Las Piedras ( al lado de center Plast )', '2026-02-12', 'Canelones', 'Las Piedras', 'Dr Enrique Pouey 659 (Las Piedras)', 'Qrico.uy'),
(32, 'Mariana Rivero', 'Mariana Rivero', '21 931917 0016', '094973264', 'levanta jorge en el taller', '2026-02-16', 'montevideo', 'Montevideo', 'Gobernador Viana 2573, entre 8 de octubre y Joanic', 'Morfit'),
(33, '.', 'RAQUEL NUÑEZ', '2 827 485 1', '095 806 447', 'enviar por minstrans', '2026-02-16', 'Tacuarembó', 'Tacuarembó', 'AV GUTIERREZ RUIZ 398 ESQUINA CELEDONIO ROJAS', 'HAMBURGUESERIA AL PASO'),
(34, 'Yessica Quintero', 'Yessica Quintero Tikicuquis', '216405850017', '099090749', 'enviar a la casa hay gente todo el dia', '2026-02-16', 'Montevideo', 'Montevideo', 'congreso de mercedes 2912 casa 132 esq Prudencio m', 'Tikicuquis'),
(35, '', 'Rosina Collazo Madera', '4.874.950-7', '091263803', 'Retira en agencia', '2026-02-17', 'Colonia', 'Juan Lacaze', '(calle 30 ) entre la calle 39 y la plaza de villa ', 'Sonia\'s Fritas con Sabor a Tradición.'),
(36, '', 'Gerardo Rodriguez', '34940092', '094101994', 'Consumidor Final', '2026-02-18', 'Las Piedras', 'Canelones', 'Alfonso esplnola 494 Entre libertad y canelones', 'Lo del tío Geroncho'),
(37, 'Pizzeria Altchobar sas', 'Adriana Pizzzeria El Talcho', '220138300019', '092446012', '', '2026-02-20', 'Montevideo', 'Montevideo', 'Pan de Azucar 2532', 'Pizzeria Al Tacho'),
(38, 'La Nogera SAS', 'Fabian Doña Isabel', '219387600012', '096126266', 'Horario de entrega de martes a viernes, de 10 a 20 hs.', '2026-02-21', 'Montevideo', 'Ciudad Vieja Montevideo', 'Sarandí 351 esquina Alzaibar.', 'Doña Isabel'),
(39, 'Moira Núñez Bareño Aracy', 'Moira Núñez', '100586990018', '098 586 084', 'enviar por de Punta \nHorario: de 9 a 19', '2026-02-25', 'Maldonado', 'Maldonado', 'Arturo Santana 976, entre Joaquín de viana y Solís', 'Por amor al arte'),
(40, '.', 'Silvia Britos', '.', '098068235', 'Levanta en el taller', '2026-02-25', 'Canelones', 'Ciudad De la costa', '.', 'Baked by Silvia'),
(41, 'Manjares ltda', 'Matias Rodriguez', '070089410018', '091205423', 'Enviar Por Minstran', '2026-02-26', 'Florida', 'Florida', 'Dirección Batlle 746', 'Confiteria Manjares'),
(42, 'Food Truk Pascuariello', 'Nicolas Emery', '.', '099099510', 'enviar por de punta agencia Maldonado', '2026-02-26', 'Maldonado', 'Maldonado', 'Maldonado', 'Food Truk Pascuariello'),
(43, 'Yanet Aviega  Torena', 'Yanet Aviega  Torena', '090243850013', '+598 99 047 681', 'Mevir 4271  Calle Salto de Agua esq Durazno  .locaidad Cerro Chato  depto Treinta y Tres\nEnviar por Minstrans', '2026-02-27', 'Treinta y Tres', 'Cerro Chato', 'Mevir 4271  Calle Salto de Agua esq Durazno  .loca', 'Carrito el Gordo'),
(44, '.', 'Agustin Perez (Piccolo)', '44193079', '098 31 44 77', 'Levanta en el Taller', '2026-02-27', 'Canelones', 'Shangrila', 'Cielo azul 5611 esq rambla', 'Piccolo'),
(45, 'Punto Deli sas', 'Karina Cafeteria Amelia', '220534160015', '099242604', 'Enviar por box', '2026-02-27', 'Canelones', 'Parque Miramar', 'Alfonsina storni 8212', 'Cafeteria Amelia'),
(46, 'Valmart Sas', 'Valentina de León Unica Burguer', '220385690018', '091035056', '', '2026-03-10', 'Canelones', 'Sauce', 'Carmelo René González esq Santa Isabel (grido sauc', 'Unica Burguer'),
(47, 'BERGARA LINARES ALVARO NICOLÁS', 'ALVARO BERGARA Pizz La Fortuna', '220622940012', '091355249', 'Horario de entrega amplio Hay Portero', '2026-03-13', 'Montevideo', 'Montevideo', 'SALTO 1293. Apto 1006. ESQUINA CONSTITUYENTE. Mont', 'LA FORTUNA'),
(48, 'Carolina Vergara', 'Carolina Vergara Full Market', '220180540014', '091211666', 'Horario de 08 a 22', '2026-03-13', 'Durazno', 'Durazno', 'Ansina 359esquina Lavalleja Durazno ciudad', 'Full Market'),
(49, 'Cake’s Montevideo srl', 'Fernanda Pereira Cake’s Montevideo', '211287820015', '099114453', 'De 9 a 13hs de lunes a viernes \nMontevideo Pocitos', '2026-03-13', 'Montevideo', 'Montevideo', 'Ellauri 1067 esq cavia', 'Cake’s Montevideo'),
(50, 'Analia Rodríguez', 'Analia Rodríguez A mi Manera', '215504410017', '091826393', '', '2026-03-13', 'Rio Negro', 'Young', 'Zeballos y Artigas 3680', 'A Mi Manera'),
(51, 'Sonia Almada', 'Sonia Almada Las Margaritas', '010163800011', '098 754 977', 'Bella Unión Artigas', '2026-03-13', 'Artigas', 'Bella Unión', 'Rivera 1236 Entre Juaquin Suares y Ascencio ', 'Las Margaritas'),
(52, '.', 'Tano', '.', '097388056', 'Completar Datos Con Mauro', '2026-03-13', 'Canelones', 'ciudad De La Costa', '.', 'GO Constucciones'),
(53, '.', 'Tayron leodan Plankton burgers', '5395552-3', '094181816', 'Pan De azucar Maldonado', '2026-03-14', 'Maldonado', 'Pan De Azucar', 'Carlos Silva 534 entre Leonardo olivera', 'Plankton burgers'),
(54, 'Suares Company SAS', 'Edgar Valito', '2196629300014', '098887802', 'Edward Dueño 098887802', '2026-03-14', 'Montevideo', 'Montevideo', 'Gaboto 1287', 'Valito'),
(55, '.', 'Carlos Remeras Sudafrica', '.', '091096646', '', '2026-03-14', 'Canelones', 'Cidad De La Costa', 'Levanta Taller', '.'),
(56, 'Florencia Sanguinetti - Virginia Ponce de León /Creto', 'Florencia Sanguinetti Creto', '.', '092122555 o 09445433', 'generalmente Levanta Taller', '2026-03-16', 'Canelones', 'Shangrila', 'Carlos racine Edificio cala del yatch apto 502', 'Creto'),
(57, 'GV FRANQUICIAS SAS', 'Martin La Mantequeria', '220736910015', '089379486', '', '2026-03-17', 'Maldonado', 'Punta Del Este', 'Gorlero 951', 'La Mantequeria'),
(58, 'Dardo Vila', 'Dardo Vila Empanadas Arachanitas', '030205770012', '098516269', 'horario de entrega todo el dia', '2026-03-18', 'Cerro Largo', 'Melo', 'Mata 714 y Herrera Cerro largo (Melo)', 'Arachanitas'),
(59, 'Pizzeria Masa Brava', 'Gustavo Fagundez Pizzeria Masa Brava', '5062047-8', '098133943', 'enviar por Dac', '2026-03-18', 'Tacuarembó', 'Tacuarembó', '25 de Mayo 701 Tacuarembó', 'Pizzeria Masa Brava'),
(60, 'Gaminer S.A.', 'CURCIO CAPITAL', '214309100014', '099657920', 'Karina', '2026-03-18', 'Montevideo', 'Montevideo', 'Valparaiso 1131', 'Gaminer S.A.'),
(61, 'María Noelia Sanabria Machado', 'Noelia Empanadas Rizar', '217010990019', '099903566 -099 691 6', '099 691 641numero noelia Pedidos', '2026-03-20', 'Maldonado', 'La Barra Maldonado', 'Nina Miranda s/n esq. Ruta 10, La Barra, Maldonado', 'Rizar'),
(62, '.', 'Selva Gonzalez', '47701803', '091412585', 'enviar antes de semana Santa', '2026-03-20', 'Artigas', 'Bella Union', 'Joaquín Suárez 1070 - Bella Union - Artigas', 'Estetica Selva'),
(63, '.', 'Leonardo BUCKET', '54480802', '+598 92 137 434', 'Leonardo contacto', '2026-03-20', 'Paysandú', 'Paysandú', '25 mayo 1708 esquina gral luna', 'BUCKET BURGUERS'),
(64, 'John henderson turino', 'John henderson  Beer House', '160289870011', '099 166 471', 'Enviar a Joaquín Suárez 382, salto a mi nombre', '2026-03-20', 'Salto', 'Salto', 'Joaquín Suárez 396', 'Beer House'),
(65, 'Mauricio Yurramendi', 'Mauricio Yurramendi Buffet Pastas Melo', '030125650010', '099 803 902', '099 803 902\n46422266', '2026-03-21', 'Cerro Largo', 'Melo', 'Aparició Saravia 729, esquina.Florencio Sanchez', 'Bufet Pastas Melo'),
(66, '.', 'Luciano Barrios La Frita', '5238210-7', '098796075', '', '2026-03-23', 'Flores', 'Trinidad', 'PENZA 885', 'LA FRITA'),
(67, '.', 'Andrea Valleo.Cumpleaños', '.', '099889581.', '', '2026-03-23', 'Florida', 'Sarandi Grande', 'Agraciada S/N. Esq. Machado Ribas.', '.Cumpleaños'),
(68, '.', 'Bruno Bentancourt Gumo', '4.801.924-7', '091860850', 'Horario de entrega de 8 a 12', '2026-03-23', 'Paysandú', 'Paysandú', 'Bulevar Artigas 1412 entre tacuarembo y Av. Salto ', 'Gumo'),
(69, 'SATIBE SAS', 'Belen Silver Cantina', '219856500015', '091 316 106', '219856500015', '2026-03-24', 'Montevideo', 'Montevideo', 'Dirección fiscal: Rincon 477/804 Montevideo', 'Silver Cantina'),
(70, '.', 'Natalia Rocha Combinando Sabores', '51236763', '095975459', 'enviar por Minstrans', '2026-03-30', 'Canelones', 'Balneareo San Luis', 'Diagonal Perú m354 s27 entre 18 julio y 25 mayo', 'Combinando Sabores'),
(71, 'Pablo Casanova', 'Pablo Casanova Burger Factory', '100755590011', '099767164', 'Retira en agencia', '2026-04-08', 'Maldonado', 'Maldonado', 'Maldonado', 'Burger Factory'),
(72, '.', 'Horacio Hernandes Trailer en boca de todos', '.', '099960331', 'Manuel Melendez esq. Andrés Areguatí.Trailer', '2026-04-08', 'Treinta y Tres', 'Treinta y Tres', 'Manuel Melendez esq. Andrés Areguatí.', 'Trailer en boca de todos'),
(73, 'Roberto Cetrangolo y Mercedes Díaz', 'Mercedes Díaz', '219288450012', '099910909', 'Levanta Taller', '2026-04-15', 'Canelones', 'Pinar', 'Costa RicaM246 s17 esq Costanera y Naciones Unidas', 'Falmenta Cocina Gourmet'),
(74, 'Guillermo Garcia Silva', 'Gillermo Garcia El Carrito', '218471360010', '093359644', 'La Nave', '2026-04-16', 'Cerro Largo', 'Melo', 'Colon 607', 'El Carrito'),
(75, 'Blessed Food', 'Agustín González Blessed Food', '.', '098100037', '', '2026-04-23', 'San José de Mayo', 'San José de Mayo', 'Flores 810 Esq. Av.Italia y ecuador', 'Blessed Food'),
(76, 'GUIPI SAS', 'German Casa Berracos', '219634250012', '099584183', '', '2026-04-23', 'Montevideo', 'Montevideo', 'Estero Bellaco 2835', 'Casa Berracos'),
(77, 'Carrito boulevard', 'Agustina Santos Carrito boulevard', '.', '098820326', '', '2026-04-23', 'Cardona', 'Soriano', 'boulevard Cardona casi mendiondo', 'Carrito boulevard');

-- --------------------------------------------------------

--
-- Table structure for table `configuracion_sistema`
--

CREATE TABLE `configuracion_sistema` (
  `id` int(11) NOT NULL,
  `Es24hs` tinyint(1) NOT NULL DEFAULT 0,
  `Horario_Entrada` time DEFAULT NULL,
  `Horario_Salida` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `configuracion_sistema`
--

INSERT INTO `configuracion_sistema` (`id`, `Es24hs`, `Horario_Entrada`, `Horario_Salida`) VALUES
(1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detalle_diseño`
--

CREATE TABLE `detalle_diseño` (
  `id` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `id_diseñador` int(11) NOT NULL,
  `fecha_inicio_trabajo` datetime DEFAULT NULL,
  `fecha_fin_trabajo` datetime DEFAULT NULL,
  `pago_realizado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `detalle_diseño`
--

INSERT INTO `detalle_diseño` (`id`, `id_orden`, `id_diseñador`, `fecha_inicio_trabajo`, `fecha_fin_trabajo`, `pago_realizado`) VALUES
(1, 63, 1, '2026-02-20 19:08:39', NULL, 0),
(2, 62, 1, '2026-02-20 19:09:05', NULL, 0),
(3, 59, 1, '2026-02-20 19:09:37', NULL, 0),
(4, 56, 1, '2026-02-20 19:10:00', NULL, 0),
(5, 55, 1, '2026-02-20 19:10:16', NULL, 0),
(6, 58, 1, '2026-02-20 19:11:05', NULL, 0),
(7, 54, 1, '2026-02-20 19:11:22', NULL, 0),
(8, 57, 1, '2026-02-20 19:11:35', NULL, 0),
(9, 61, 1, '2026-02-20 19:11:54', NULL, 0),
(10, 36, 1, '2026-02-20 19:12:23', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `detalle_expedicion`
--

CREATE TABLE `detalle_expedicion` (
  `id` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `metodo_envio` varchar(50) NOT NULL,
  `direccion_entrega_final` varchar(200) DEFAULT NULL,
  `estado_embalaje` varchar(50) DEFAULT NULL,
  `etiqueta_impresa` tinyint(1) DEFAULT 0,
  `fecha_lista_entrega` date DEFAULT NULL,
  `autorizado_ventas` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detalle_expedicion`
--

INSERT INTO `detalle_expedicion` (`id`, `id_orden`, `metodo_envio`, `direccion_entrega_final`, `estado_embalaje`, `etiqueta_impresa`, `fecha_lista_entrega`, `autorizado_ventas`, `created_at`, `updated_at`) VALUES
(2, 16, 'ENVIO', 'Enviado', 'PREPARADO_EMBALADO', 0, '2026-01-08', 0, '2026-01-08 20:12:13', '2026-01-08 20:12:13'),
(3, 15, 'ENVIO', '', 'PREPARADO_EMBALADO', 0, '2026-01-08', 0, '2026-01-08 20:29:58', '2026-01-08 20:29:58'),
(4, 18, 'ENVIO', '', 'PREPARADO_EMBALADO', 0, '2026-01-09', 0, '2026-01-09 11:45:13', '2026-01-09 11:45:13'),
(5, 5, 'ENVIO', '', 'PREPARADO_EMBALADO', 0, '2026-01-09', 0, '2026-01-09 11:45:25', '2026-01-09 11:45:25'),
(6, 29, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-01-27', 0, '2026-01-27 17:11:29', '2026-01-27 17:11:29'),
(7, 30, 'RETIRO', NULL, 'PREPARADO_EMBALADO', 0, '2026-01-29', 0, '2026-01-29 19:52:24', '2026-01-29 19:52:24'),
(8, 28, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-01-30', 0, '2026-01-30 17:53:34', '2026-01-30 17:53:34'),
(9, 38, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-01-30', 0, '2026-01-30 18:12:07', '2026-01-30 18:12:07'),
(10, 41, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-01-30', 0, '2026-01-30 19:38:00', '2026-01-30 19:38:00'),
(11, 33, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-01-30', 0, '2026-01-30 19:40:42', '2026-01-30 19:40:42'),
(12, 42, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-03', 0, '2026-02-03 14:02:39', '2026-02-03 14:02:39'),
(13, 35, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-04', 0, '2026-02-04 20:35:16', '2026-02-04 20:35:16'),
(14, 44, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-05', 0, '2026-02-05 23:17:26', '2026-02-05 23:17:26'),
(15, 43, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-05', 0, '2026-02-05 23:18:01', '2026-02-05 23:18:01'),
(16, 34, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-05', 0, '2026-02-05 23:18:18', '2026-02-05 23:18:18'),
(17, 27, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-05', 0, '2026-02-05 23:18:31', '2026-02-05 23:18:31'),
(19, 4, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-05', 0, '2026-02-05 23:19:18', '2026-02-05 23:19:18'),
(20, 45, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-10', 0, '2026-02-10 20:14:26', '2026-02-10 20:14:26'),
(21, 39, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-11', 0, '2026-02-11 13:37:04', '2026-02-11 13:37:04'),
(22, 40, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-11', 0, '2026-02-11 18:10:52', '2026-02-11 18:10:52'),
(23, 50, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-14', 0, '2026-02-14 12:03:13', '2026-02-14 12:03:13'),
(24, 46, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-16', 0, '2026-02-16 19:39:42', '2026-02-16 19:39:42'),
(25, 48, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-18', 0, '2026-02-16 19:41:02', '2026-02-18 13:13:27'),
(26, 53, 'RETIRO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-17', 0, '2026-02-17 19:07:02', '2026-02-17 19:07:02'),
(27, 55, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-20', 0, '2026-02-20 19:14:26', '2026-02-20 19:14:26'),
(28, 56, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-20', 0, '2026-02-20 19:35:38', '2026-02-20 19:35:38'),
(29, 64, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-21', 0, '2026-02-21 14:39:22', '2026-02-21 14:39:22'),
(30, 63, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-21', 0, '2026-02-21 14:51:03', '2026-02-21 14:51:03'),
(31, 60, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-23', 0, '2026-02-23 19:25:42', '2026-02-23 19:25:42'),
(32, 58, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-26', 0, '2026-02-26 18:06:41', '2026-02-26 18:06:41'),
(33, 65, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-27', 0, '2026-02-27 15:34:42', '2026-02-27 15:34:42'),
(34, 66, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-27', 0, '2026-02-27 15:36:54', '2026-02-27 15:36:54'),
(35, 75, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-02-27', 0, '2026-02-27 18:53:59', '2026-02-27 18:53:59'),
(36, 76, 'RETIRO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-02', 0, '2026-03-02 19:05:12', '2026-03-02 19:05:12'),
(37, 67, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-05', 0, '2026-03-05 19:03:51', '2026-03-05 19:03:51'),
(38, 68, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-05', 0, '2026-03-05 19:04:55', '2026-03-05 19:04:55'),
(39, 74, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-05', 0, '2026-03-05 19:05:38', '2026-03-05 19:05:38'),
(40, 73, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-06', 0, '2026-03-06 18:51:51', '2026-03-06 18:51:51'),
(41, 77, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-06', 0, '2026-03-06 18:53:00', '2026-03-06 18:53:00'),
(42, 83, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-13', 0, '2026-03-13 14:02:51', '2026-03-13 14:02:51'),
(43, 81, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-13', 0, '2026-03-13 20:52:25', '2026-03-13 20:52:25'),
(44, 94, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:55:38', '2026-03-17 18:55:38'),
(45, 93, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:56:12', '2026-03-17 18:56:12'),
(46, 89, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:57:09', '2026-03-17 18:57:09'),
(47, 88, 'RETIRO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:57:27', '2026-03-17 18:57:27'),
(48, 87, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:57:54', '2026-03-17 18:57:54'),
(49, 86, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:58:51', '2026-03-17 18:58:51'),
(50, 80, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:59:20', '2026-03-17 18:59:20'),
(51, 79, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 18:59:41', '2026-03-17 18:59:41'),
(52, 84, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-17', 0, '2026-03-17 19:26:42', '2026-03-17 19:26:42'),
(53, 85, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-20', 0, '2026-03-20 17:07:26', '2026-03-20 17:07:26'),
(54, 100, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-24', 0, '2026-03-24 18:54:48', '2026-03-24 18:54:48'),
(55, 101, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-24', 0, '2026-03-24 19:23:40', '2026-03-24 19:23:40'),
(56, 105, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-24', 0, '2026-03-24 19:41:34', '2026-03-24 19:41:34'),
(57, 104, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-24', 0, '2026-03-24 19:50:24', '2026-03-24 19:50:24'),
(58, 107, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-25', 0, '2026-03-25 11:54:13', '2026-03-25 11:54:13'),
(59, 103, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-25', 0, '2026-03-25 12:10:23', '2026-03-25 12:10:23'),
(60, 108, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-26', 0, '2026-03-26 19:58:54', '2026-03-26 19:58:54'),
(61, 91, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-26', 0, '2026-03-26 20:03:55', '2026-03-26 20:03:55'),
(62, 113, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-27', 0, '2026-03-27 17:24:49', '2026-03-27 17:24:49'),
(63, 110, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-27', 0, '2026-03-27 17:30:15', '2026-03-27 17:30:15'),
(64, 111, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-27', 0, '2026-03-27 17:30:33', '2026-03-27 17:30:33'),
(65, 106, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-03-27', 0, '2026-03-27 17:39:22', '2026-03-27 17:39:22'),
(66, 112, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-02', 0, '2026-04-02 13:52:37', '2026-04-02 13:52:37'),
(67, 118, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-02', 0, '2026-04-02 14:08:05', '2026-04-02 14:08:05'),
(68, 90, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-07', 0, '2026-04-07 11:53:58', '2026-04-07 11:53:58'),
(69, 115, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-10', 0, '2026-04-10 12:56:24', '2026-04-10 12:56:24'),
(70, 122, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-11', 0, '2026-04-11 14:00:07', '2026-04-11 14:00:07'),
(71, 120, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-11', 0, '2026-04-11 14:01:06', '2026-04-11 14:01:06'),
(72, 116, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-14', 0, '2026-04-14 12:37:06', '2026-04-14 12:37:06'),
(73, 121, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-14', 0, '2026-04-14 12:42:25', '2026-04-14 12:42:25'),
(74, 124, 'RETIRO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-17', 0, '2026-04-17 11:48:18', '2026-04-17 11:48:18'),
(75, 128, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-17', 0, '2026-04-17 12:06:09', '2026-04-17 12:06:09'),
(76, 125, 'ENVIO', NULL, 'PREPARADO_EMBALADO', 0, '2026-04-17', 0, '2026-04-17 20:11:28', '2026-04-17 20:11:28');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_produccion`
--

CREATE TABLE `detalle_produccion` (
  `id` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `fecha_inicio_trabajo` datetime NOT NULL,
  `fecha_fin_trabajo` datetime DEFAULT NULL,
  `especificaciones_tecnicas` text DEFAULT NULL,
  `sector_responsable` varchar(20) DEFAULT NULL,
  `id_operario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detalle_produccion`
--

INSERT INTO `detalle_produccion` (`id`, `id_orden`, `fecha_inicio_trabajo`, `fecha_fin_trabajo`, `especificaciones_tecnicas`, `sector_responsable`, `id_operario`) VALUES
(5, 4, '2026-01-10 14:04:36', '2026-01-10 14:07:52', '', 'OFFSET', NULL),
(6, 5, '2026-01-08 11:54:25', '2026-01-08 13:26:27', '', 'OFFSET', NULL),
(7, 15, '2026-01-08 14:07:28', '2026-01-08 20:29:18', '', 'OFFSET', NULL),
(8, 16, '2026-01-08 20:09:47', '2026-01-08 20:10:56', '', 'OFFSET', NULL),
(9, 18, '2026-01-08 13:28:20', '2026-01-08 13:49:41', '', 'OFFSET', NULL),
(13, 27, '2026-01-23 11:43:45', '2026-01-26 11:10:42', '', 'SERIGRAFIA', NULL),
(14, 29, '2026-01-26 11:12:58', '2026-01-26 14:53:22', 'Tinta Espalda Elastic Blanco\nNombres Plastisol Blanco', 'SERIGRAFIA', 4),
(15, 30, '2026-01-29 19:29:55', '2026-01-29 19:30:01', '', 'OFFSET', 1),
(16, 28, '2026-01-30 12:35:46', '2026-01-30 17:41:32', '', 'OFFSET', 1),
(17, 34, '2026-01-30 18:44:36', '2026-01-30 18:44:40', '', 'OFFSET', 1),
(18, 33, '2026-01-30 18:44:58', '2026-01-30 19:27:27', '', 'OFFSET', 1),
(19, 35, '2026-01-30 19:27:29', '2026-02-04 20:25:48', '', 'OFFSET', 1),
(20, 38, '2026-01-30 11:12:47', '2026-01-30 18:11:44', '', 'OFFSET', 1),
(21, 41, '2026-01-30 19:37:22', '2026-01-30 19:37:40', '', 'OFFSET', 1),
(22, 40, '2026-02-11 13:36:01', '2026-02-11 18:09:45', '', 'OFFSET', 1),
(23, 42, '2026-02-03 14:02:19', '2026-02-03 14:02:22', '', 'OFFSET', 1),
(24, 43, '2026-02-05 23:16:28', '2026-02-05 23:16:31', '', 'OFFSET', 1),
(25, 44, '2026-02-05 23:16:25', '2026-02-05 23:16:27', '', 'OFFSET', 1),
(26, 45, '2026-02-10 19:40:05', '2026-02-10 20:13:12', '', 'OFFSET', 1),
(27, 39, '2026-02-11 13:36:18', '2026-02-11 13:36:23', '', 'OFFSET', 1),
(28, 50, '2026-02-14 11:21:04', '2026-02-14 12:02:57', '', 'OFFSET', 1),
(29, 49, '2026-02-16 14:51:20', '2026-02-16 14:51:22', '', 'SERIGRAFIA', 1),
(30, 46, '2026-02-16 18:13:37', '2026-02-16 19:39:24', '', 'OFFSET', 1),
(31, 47, '2026-02-11 18:10:13', '2026-02-11 18:10:21', '', 'OFFSET', 1),
(32, 48, '2026-02-16 17:58:32', '2026-02-16 18:09:39', '', 'OFFSET', 1),
(33, 53, '2026-02-17 19:06:41', '2026-02-17 19:06:44', '', 'SERIGRAFIA', 1),
(34, 60, '2026-02-23 14:18:46', '2026-02-23 19:25:22', '', 'OFFSET', 1),
(35, 64, '2026-02-20 17:24:49', '2026-02-21 13:47:58', '', 'OFFSET', 1),
(36, 62, '2026-03-09 13:22:26', '2026-03-13 13:39:08', '', 'OFFSET', 1),
(37, 63, '2026-02-21 13:48:17', '2026-02-21 14:37:30', '', 'OFFSET', 1),
(38, 59, '2026-02-20 19:13:40', '2026-02-20 19:13:42', '', 'OFFSET', 1),
(39, 56, '2026-02-20 19:13:53', '2026-02-20 19:13:55', '', 'OFFSET', 1),
(40, 55, '2026-02-20 19:14:04', '2026-02-20 19:14:07', '', 'OFFSET', 1),
(41, 58, '2026-02-23 14:19:03', '2026-02-23 14:19:25', '', 'SERIGRAFIA', 1),
(42, 54, '2026-02-23 13:57:28', '2026-02-23 13:57:31', '', 'OFFSET', 1),
(43, 57, '2026-02-23 13:57:35', '2026-02-23 13:57:37', '', 'OFFSET', 1),
(44, 61, '2026-02-21 14:36:56', '2026-02-21 14:36:59', '', 'OFFSET', 1),
(45, 36, '2026-02-23 13:57:22', '2026-02-23 13:57:24', '', 'OFFSET', 1),
(46, 68, '2026-02-27 15:31:42', '2026-03-05 19:00:48', '', 'OFFSET', 1),
(51, 66, '2026-02-27 15:36:34', '2026-02-27 15:36:37', '', 'OFFSET', 1),
(52, 67, '2026-02-27 14:13:25', '2026-03-05 14:06:22', '', 'OFFSET', 1),
(53, 65, '2026-02-27 13:09:49', '2026-02-27 14:11:37', '', 'OFFSET', 1),
(54, 75, '2026-02-27 17:28:26', '2026-02-27 17:39:41', '', 'OFFSET', 1),
(56, 73, '2026-03-06 17:25:06', '2026-03-06 18:19:52', '', 'OFFSET', 1),
(57, 74, '2026-03-05 14:14:44', '2026-03-05 17:52:25', '', 'OFFSET', 1),
(58, 76, '2026-03-02 19:04:48', '2026-03-02 19:04:51', '', 'OFFSET', 1),
(59, 77, '2026-03-06 17:24:27', '2026-03-06 17:24:30', '', 'OFFSET', 1),
(60, 80, '2026-03-17 14:37:22', '2026-03-17 14:37:24', '', 'OFFSET', 1),
(61, 81, '2026-03-13 14:04:42', '2026-03-13 17:56:59', '', 'OFFSET', 1),
(62, 79, '2026-03-13 17:58:44', '2026-03-17 11:41:24', '', 'OFFSET', 1),
(63, 83, '2026-03-13 13:41:07', '2026-03-13 14:02:30', '', 'OFFSET', 1),
(64, 88, '2026-03-13 17:58:10', '2026-03-13 17:58:13', '', 'SERIGRAFIA', 1),
(68, 87, '2026-03-17 17:17:45', '2026-03-17 18:54:58', '', 'OFFSET', 1),
(69, 82, '2026-03-17 17:18:01', '2026-03-20 14:34:14', '', 'OFFSET', 1),
(70, 84, '2026-03-17 17:17:56', '2026-03-17 19:26:17', '', 'OFFSET', 1),
(71, 85, '2026-03-20 13:09:57', '2026-03-20 14:33:46', '', 'OFFSET', 1),
(72, 86, '2026-03-17 17:17:49', '2026-03-17 18:55:06', '', 'OFFSET', 1),
(73, 89, '2026-03-17 17:17:37', '2026-03-17 17:17:39', '', 'OFFSET', 1),
(74, 91, '2026-03-26 20:03:11', '2026-03-26 20:03:14', '', 'SERIGRAFIA', 1),
(75, 93, '2026-03-17 18:54:45', '2026-03-17 18:54:48', '', 'OFFSET', 1),
(76, 94, '2026-03-17 17:17:27', '2026-03-17 17:17:29', '', 'OFFSET', 1),
(77, 102, '2026-03-18 19:17:40', '2026-03-18 19:17:42', '', 'OFFSET', 1),
(78, 90, '2026-03-24 14:21:27', '2026-04-07 00:46:24', '', 'OFFSET', 1),
(79, 92, '2026-03-26 19:04:28', '2026-03-26 19:04:30', '', 'OFFSET', 1),
(80, 100, '2026-03-24 14:22:27', '2026-03-24 18:54:27', '', 'OFFSET', 1),
(81, 101, '2026-03-24 14:21:14', '2026-03-24 14:21:18', '', 'OFFSET', 1),
(82, 105, '2026-03-24 13:20:32', '2026-03-24 13:53:50', '', 'OFFSET', 1),
(83, 106, '2026-03-27 12:11:24', '2026-03-27 12:40:26', '', 'OFFSET', 1),
(84, 103, '2026-03-24 11:39:04', '2026-03-24 13:06:28', '', 'OFFSET', 1),
(85, 104, '2026-03-24 13:07:19', '2026-03-24 13:19:59', '', 'OFFSET', 1),
(86, 107, '2026-03-23 19:40:52', '2026-03-24 13:06:49', '', 'OFFSET', 1),
(87, 108, '2026-03-26 12:17:40', '2026-03-26 19:05:00', '', 'OFFSET', 1),
(88, 109, '2026-03-27 14:10:00', '2026-04-07 00:46:37', '', 'OFFSET', 1),
(89, 110, '2026-03-27 13:31:48', '2026-03-27 13:31:50', '', 'OFFSET', 1),
(90, 111, '2026-03-27 13:32:33', '2026-03-27 14:32:04', '', 'OFFSET', 1),
(91, 112, '2026-04-01 20:56:50', '2026-04-01 20:56:52', '', 'OFFSET', 1),
(92, 113, '2026-03-27 14:10:22', '2026-03-27 14:29:35', '', 'OFFSET', 1),
(93, 115, '2026-04-01 18:58:03', '2026-04-01 18:58:12', '', 'OFFSET', 1),
(94, 116, '2026-04-10 19:14:20', '2026-04-10 19:14:22', '', 'OFFSET', 1),
(95, 114, '0000-00-00 00:00:00', NULL, '', 'SERIGRAFIA', NULL),
(96, 117, '0000-00-00 00:00:00', NULL, '', 'OFFSET', NULL),
(97, 118, '2026-04-01 19:51:32', '2026-04-01 19:51:35', '', 'OFFSET', 1),
(98, 119, '0000-00-00 00:00:00', NULL, '', 'OFFSET', NULL),
(99, 120, '2026-04-10 19:14:29', '2026-04-10 19:42:58', '', 'OFFSET', 1),
(100, 121, '2026-04-13 18:46:51', '2026-04-13 18:46:54', '', 'OFFSET', 1),
(101, 122, '2026-04-10 19:45:56', '2026-04-10 20:46:29', '', 'OFFSET', 1),
(102, 123, '0000-00-00 00:00:00', NULL, '', 'SERIGRAFIA', NULL),
(103, 124, '2026-04-17 11:47:55', '2026-04-17 11:47:59', '', 'OFFSET', 1),
(104, 126, '0000-00-00 00:00:00', NULL, '', 'OFFSET', NULL),
(105, 127, '0000-00-00 00:00:00', NULL, '', 'OFFSET', NULL),
(106, 125, '2026-04-17 18:44:04', '2026-04-17 20:11:12', '', 'OFFSET', 1),
(107, 128, '2026-04-17 12:05:48', '2026-04-17 12:05:50', '', 'OFFSET', 1),
(108, 129, '0000-00-00 00:00:00', NULL, '', 'OFFSET', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `historial_movimientos`
--

CREATE TABLE `historial_movimientos` (
  `id` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `accion_realizada` varchar(100) DEFAULT NULL,
  `sector` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historial_movimientos`
--

INSERT INTO `historial_movimientos` (`id`, `id_orden`, `id_usuario`, `fecha_hora`, `accion_realizada`, `sector`) VALUES
(12, 4, 3, '2026-01-02 17:07:02', 'Creación de OT', 'DISEÑO'),
(13, 5, 3, '2026-01-02 17:19:49', 'Creación de OT', 'DISEÑO'),
(24, 15, 3, '2026-01-04 20:52:58', 'Creación de OT', 'DISEÑO'),
(25, 16, 3, '2026-01-05 16:39:08', 'Creación de OT', 'DISEÑO'),
(27, 18, 3, '2026-01-05 20:56:57', 'Creación de OT', 'DISEÑO'),
(28, 4, 1, '2026-01-06 02:23:07', 'Envío a Producción', 'OFFSET'),
(29, 5, 1, '2026-01-06 02:24:33', 'Envío a Producción', 'OFFSET'),
(30, 15, 1, '2026-01-06 02:27:59', 'Envío a Producción', 'OFFSET'),
(31, 16, 1, '2026-01-06 18:15:17', 'Envío a Producción', 'OFFSET'),
(32, 18, 1, '2026-01-07 01:26:50', 'Envío a Producción', 'OFFSET'),
(33, 5, 1, '2026-01-08 11:54:25', 'Inicio de Producción', 'OFFSET'),
(36, 5, 1, '2026-01-08 13:26:27', 'Fin de Producción offset', NULL),
(37, 18, 1, '2026-01-08 13:28:20', 'Inicio de Producción', 'OFFSET'),
(42, 18, 1, '2026-01-08 13:49:41', 'Fin de Producción offset', NULL),
(43, 15, 1, '2026-01-08 14:07:28', 'Inicio de Producción', 'OFFSET'),
(49, 16, 1, '2026-01-08 20:09:47', 'Inicio de Producción', 'OFFSET'),
(56, 16, 1, '2026-01-08 20:10:56', 'Fin de Producción offset', NULL),
(57, 16, 1, '2026-01-08 20:12:13', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(63, 15, 1, '2026-01-08 20:29:18', 'Fin de Producción offset', NULL),
(64, 15, 1, '2026-01-08 20:29:58', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(66, 18, 1, '2026-01-09 11:45:13', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(67, 5, 1, '2026-01-09 11:45:25', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(68, 4, 1, '2026-01-10 14:04:36', 'Inicio de Producción', 'OFFSET'),
(69, 4, 1, '2026-01-10 14:07:52', 'Fin de Producción offset', NULL),
(82, 27, 1, '2026-01-22 12:57:24', 'Creación de OT', 'DISEÑO'),
(83, 27, 1, '2026-01-22 12:58:01', 'Envío a Producción', 'SERIGRAFIA'),
(84, 27, 4, '2026-01-23 11:43:45', 'Inicio de Producción', 'SERIGRAFIA'),
(85, 28, 3, '2026-01-24 00:35:36', 'Creación de OT', 'DISEÑO'),
(86, 29, 1, '2026-01-26 11:05:57', 'Creación de OT', 'DISEÑO'),
(87, 29, 1, '2026-01-26 11:07:15', 'Envío a Producción', 'SERIGRAFIA'),
(88, 27, 1, '2026-01-26 11:10:42', 'Fin de Producción serigrafia', NULL),
(89, 29, 4, '2026-01-26 11:12:58', 'Inicio de Producción', 'SERIGRAFIA'),
(90, 29, 4, '2026-01-26 14:53:22', 'Fin de Producción serigrafia', NULL),
(91, 30, 3, '2026-01-26 22:16:01', 'Creación de OT', 'DISEÑO'),
(94, 33, 3, '2026-01-26 22:47:34', 'Creación de OT', 'DISEÑO'),
(95, 34, 3, '2026-01-26 22:50:22', 'Creación de OT', 'DISEÑO'),
(96, 29, 4, '2026-01-27 17:11:29', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(97, 35, 3, '2026-01-28 00:06:40', 'Creación de OT', 'DISEÑO'),
(98, 36, 3, '2026-01-28 00:11:07', 'Creación de OT', 'DISEÑO'),
(99, 30, 1, '2026-01-28 11:44:12', 'Envío a Producción', 'OFFSET'),
(100, 28, 1, '2026-01-28 11:45:44', 'Envío a Producción', 'OFFSET'),
(101, 34, 1, '2026-01-28 11:46:33', 'Envío a Producción', 'OFFSET'),
(102, 33, 1, '2026-01-28 11:58:21', 'Envío a Producción', 'OFFSET'),
(103, 35, 1, '2026-01-28 11:58:57', 'Envío a Producción', 'OFFSET'),
(105, 38, 3, '2026-01-28 12:18:40', 'Creación de OT', 'DISEÑO'),
(106, 38, 1, '2026-01-28 12:39:29', 'Envío a Producción', 'OFFSET'),
(107, 30, 1, '2026-01-29 19:29:55', 'Inicio de Producción', 'OFFSET'),
(108, 30, 1, '2026-01-29 19:30:01', 'Fin de Producción offset', NULL),
(109, 30, 1, '2026-01-29 19:52:24', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(110, 30, 1, '2026-01-29 19:58:14', 'Actualización de datos de Expedición', 'EXPEDICION'),
(111, 39, 3, '2026-01-30 01:03:54', 'Creación de OT', 'DISEÑO'),
(112, 40, 3, '2026-01-30 01:12:19', 'Creación de OT', 'DISEÑO'),
(113, 38, 1, '2026-01-30 11:12:47', 'Inicio de Producción', 'OFFSET'),
(114, 28, 1, '2026-01-30 12:35:46', 'Inicio de Producción', 'OFFSET'),
(115, 28, 1, '2026-01-30 17:41:32', 'Fin de Producción offset', NULL),
(116, 28, 1, '2026-01-30 17:53:34', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(117, 38, 1, '2026-01-30 18:11:44', 'Fin de Producción offset', NULL),
(118, 38, 1, '2026-01-30 18:12:07', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(119, 34, 1, '2026-01-30 18:44:36', 'Inicio de Producción', 'OFFSET'),
(120, 34, 1, '2026-01-30 18:44:40', 'Fin de Producción offset', NULL),
(121, 33, 1, '2026-01-30 18:44:58', 'Inicio de Producción', 'OFFSET'),
(122, 41, 3, '2026-01-30 19:06:22', 'Creación de OT', 'DISEÑO'),
(123, 33, 1, '2026-01-30 19:27:27', 'Fin de Producción offset', NULL),
(124, 35, 1, '2026-01-30 19:27:29', 'Inicio de Producción', 'OFFSET'),
(125, 41, 1, '2026-01-30 19:36:53', 'Envío a Producción', 'OFFSET'),
(126, 41, 1, '2026-01-30 19:37:22', 'Inicio de Producción', 'OFFSET'),
(127, 41, 1, '2026-01-30 19:37:40', 'Fin de Producción offset', NULL),
(128, 41, 1, '2026-01-30 19:38:00', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(129, 33, 1, '2026-01-30 19:40:42', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(130, 40, 1, '2026-02-02 23:27:13', 'Envío a Producción', 'OFFSET'),
(131, 42, 1, '2026-02-03 14:01:56', 'Creación de OT', 'DISEÑO'),
(132, 42, 1, '2026-02-03 14:02:10', 'Envío a Producción', 'OFFSET'),
(133, 42, 1, '2026-02-03 14:02:19', 'Inicio de Producción', 'OFFSET'),
(134, 42, 1, '2026-02-03 14:02:22', 'Fin de Producción offset', NULL),
(135, 42, 1, '2026-02-03 14:02:39', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(136, 35, 1, '2026-02-04 20:25:48', 'Fin de Producción offset', NULL),
(137, 35, 1, '2026-02-04 20:35:16', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(138, 43, 3, '2026-02-05 12:04:06', 'Creación de OT', 'DISEÑO'),
(139, 44, 3, '2026-02-05 12:07:58', 'Creación de OT', 'DISEÑO'),
(140, 45, 3, '2026-02-05 23:11:34', 'Creación de OT', 'DISEÑO'),
(141, 43, 1, '2026-02-05 23:16:01', 'Envío a Producción', 'OFFSET'),
(142, 44, 1, '2026-02-05 23:16:11', 'Envío a Producción', 'OFFSET'),
(143, 44, 1, '2026-02-05 23:16:25', 'Inicio de Producción', 'OFFSET'),
(144, 44, 1, '2026-02-05 23:16:27', 'Fin de Producción offset', NULL),
(145, 43, 1, '2026-02-05 23:16:28', 'Inicio de Producción', 'OFFSET'),
(146, 43, 1, '2026-02-05 23:16:31', 'Fin de Producción offset', NULL),
(147, 44, 1, '2026-02-05 23:17:26', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(148, 46, 3, '2026-02-05 23:17:36', 'Creación de OT', 'DISEÑO'),
(149, 43, 1, '2026-02-05 23:18:01', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(150, 34, 1, '2026-02-05 23:18:18', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(151, 27, 1, '2026-02-05 23:18:31', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(153, 4, 1, '2026-02-05 23:19:18', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(154, 47, 3, '2026-02-06 00:29:17', 'Creación de OT', 'DISEÑO'),
(155, 48, 3, '2026-02-06 01:06:51', 'Creación de OT', 'DISEÑO'),
(156, 49, 3, '2026-02-09 12:47:15', 'Creación de OT', 'DISEÑO'),
(157, 50, 3, '2026-02-09 12:55:32', 'Creación de OT', 'DISEÑO'),
(160, 45, 1, '2026-02-10 19:39:57', 'Envío a Producción', 'OFFSET'),
(161, 45, 1, '2026-02-10 19:40:05', 'Inicio de Producción', 'OFFSET'),
(162, 45, 1, '2026-02-10 20:13:12', 'Fin de Producción offset', NULL),
(163, 45, 1, '2026-02-10 20:14:26', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(164, 39, 1, '2026-02-11 00:05:13', 'Envío a Producción', 'OFFSET'),
(165, 50, 1, '2026-02-11 00:06:10', 'Envío a Producción', 'OFFSET'),
(166, 49, 1, '2026-02-11 00:06:27', 'Envío a Producción', 'SERIGRAFIA'),
(167, 46, 1, '2026-02-11 00:06:56', 'Envío a Producción', 'OFFSET'),
(168, 47, 1, '2026-02-11 00:07:10', 'Envío a Producción', 'OFFSET'),
(169, 48, 1, '2026-02-11 00:07:25', 'Envío a Producción', 'OFFSET'),
(170, 40, 1, '2026-02-11 13:36:01', 'Inicio de Producción', 'OFFSET'),
(171, 39, 1, '2026-02-11 13:36:18', 'Inicio de Producción', 'OFFSET'),
(172, 39, 1, '2026-02-11 13:36:23', 'Fin de Producción offset', NULL),
(173, 39, 1, '2026-02-11 13:37:04', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(174, 40, 1, '2026-02-11 18:09:45', 'Fin de Producción offset', NULL),
(175, 47, 1, '2026-02-11 18:10:13', 'Inicio de Producción', 'OFFSET'),
(185, 47, 1, '2026-02-11 18:10:21', 'Fin de Producción offset', NULL),
(186, 40, 1, '2026-02-11 18:10:52', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(187, 50, 1, '2026-02-14 11:21:04', 'Inicio de Producción', 'OFFSET'),
(188, 50, 1, '2026-02-14 12:02:57', 'Fin de Producción offset', NULL),
(189, 50, 1, '2026-02-14 12:03:13', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(190, 53, 3, '2026-02-16 14:35:47', 'Creación de OT', 'DISEÑO'),
(191, 54, 3, '2026-02-16 14:42:27', 'Creación de OT', 'DISEÑO'),
(192, 53, 1, '2026-02-16 14:51:07', 'Envío a Producción', 'SERIGRAFIA'),
(193, 49, 1, '2026-02-16 14:51:20', 'Inicio de Producción', 'SERIGRAFIA'),
(194, 49, 1, '2026-02-16 14:51:22', 'Fin de Producción serigrafia', NULL),
(195, 48, 1, '2026-02-16 17:58:32', 'Inicio de Producción', 'OFFSET'),
(196, 48, 1, '2026-02-16 18:09:39', 'Fin de Producción offset', NULL),
(197, 46, 1, '2026-02-16 18:13:37', 'Inicio de Producción', 'OFFSET'),
(198, 46, 1, '2026-02-16 19:39:24', 'Fin de Producción offset', NULL),
(199, 46, 1, '2026-02-16 19:39:42', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(200, 48, 1, '2026-02-16 19:41:02', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(201, 55, 3, '2026-02-16 20:30:20', 'Creación de OT', 'DISEÑO'),
(202, 56, 3, '2026-02-16 20:36:35', 'Creación de OT', 'DISEÑO'),
(203, 57, 3, '2026-02-16 20:42:03', 'Creación de OT', 'DISEÑO'),
(204, 58, 3, '2026-02-16 21:09:03', 'Creación de OT', 'DISEÑO'),
(205, 59, 3, '2026-02-17 14:16:59', 'Creación de OT', 'DISEÑO'),
(206, 60, 3, '2026-02-17 14:50:55', 'Creación de OT', 'DISEÑO'),
(207, 61, 3, '2026-02-17 15:14:06', 'Creación de OT', 'DISEÑO'),
(208, 53, 1, '2026-02-17 19:06:41', 'Inicio de Producción', 'SERIGRAFIA'),
(209, 53, 1, '2026-02-17 19:06:44', 'Fin de Producción serigrafia', NULL),
(210, 53, 1, '2026-02-17 19:07:02', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(211, 62, 3, '2026-02-17 19:09:13', 'Creación de OT', 'DISEÑO'),
(212, 48, 1, '2026-02-18 13:13:27', 'Actualización de datos de Expedición', 'EXPEDICION'),
(213, 63, 3, '2026-02-18 21:54:26', 'Creación de OT', 'DISEÑO'),
(214, 60, 1, '2026-02-19 19:41:48', 'Envío a Producción', 'OFFSET'),
(215, 64, 3, '2026-02-20 11:00:12', 'Creación de OT', 'DISEÑO'),
(216, 64, 5, '2026-02-20 17:23:30', 'Envío a Producción', 'OFFSET'),
(217, 64, 1, '2026-02-20 17:24:49', 'Inicio de Producción', 'SERIGRAFIA'),
(219, 62, 1, '2026-02-20 19:09:14', 'Envío a Producción', 'OFFSET'),
(220, 63, 1, '2026-02-20 19:09:26', 'Envío a Producción', 'OFFSET'),
(221, 59, 1, '2026-02-20 19:09:47', 'Envío a Producción', 'OFFSET'),
(222, 56, 1, '2026-02-20 19:10:07', 'Envío a Producción', 'OFFSET'),
(223, 55, 1, '2026-02-20 19:10:25', 'Envío a Producción', 'OFFSET'),
(224, 58, 1, '2026-02-20 19:11:15', 'Envío a Producción', 'SERIGRAFIA'),
(225, 54, 1, '2026-02-20 19:11:28', 'Envío a Producción', 'OFFSET'),
(226, 57, 1, '2026-02-20 19:11:40', 'Envío a Producción', 'OFFSET'),
(227, 61, 1, '2026-02-20 19:12:00', 'Envío a Producción', 'OFFSET'),
(228, 36, 1, '2026-02-20 19:12:46', 'Envío a Producción', 'OFFSET'),
(229, 59, 1, '2026-02-20 19:13:40', 'Inicio de Producción', 'OFFSET'),
(230, 59, 1, '2026-02-20 19:13:42', 'Fin de Producción offset', NULL),
(231, 56, 1, '2026-02-20 19:13:53', 'Inicio de Producción', 'OFFSET'),
(232, 56, 1, '2026-02-20 19:13:55', 'Fin de Producción offset', NULL),
(233, 55, 1, '2026-02-20 19:14:04', 'Inicio de Producción', 'OFFSET'),
(234, 55, 1, '2026-02-20 19:14:07', 'Fin de Producción offset', NULL),
(235, 55, 1, '2026-02-20 19:14:26', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(236, 56, 1, '2026-02-20 19:35:38', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(237, 65, 3, '2026-02-20 20:32:54', 'Creación de OT', 'DISEÑO'),
(238, 64, 1, '2026-02-21 13:47:58', 'Fin de Producción offset', NULL),
(239, 63, 1, '2026-02-21 13:48:17', 'Inicio de Producción', 'OFFSET'),
(240, 61, 1, '2026-02-21 14:36:56', 'Inicio de Producción', 'OFFSET'),
(242, 61, 1, '2026-02-21 14:36:59', 'Fin de Producción offset', NULL),
(243, 63, 1, '2026-02-21 14:37:30', 'Fin de Producción offset', NULL),
(244, 64, 1, '2026-02-21 14:39:22', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(245, 63, 1, '2026-02-21 14:51:03', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(246, 66, 3, '2026-02-21 16:34:09', 'Creación de OT', 'DISEÑO'),
(247, 36, 1, '2026-02-23 13:57:22', 'Inicio de Producción', 'OFFSET'),
(248, 36, 1, '2026-02-23 13:57:24', 'Fin de Producción offset', NULL),
(249, 54, 1, '2026-02-23 13:57:28', 'Inicio de Producción', 'OFFSET'),
(250, 54, 1, '2026-02-23 13:57:31', 'Fin de Producción offset', NULL),
(251, 57, 1, '2026-02-23 13:57:35', 'Inicio de Producción', 'OFFSET'),
(252, 57, 1, '2026-02-23 13:57:37', 'Fin de Producción offset', NULL),
(253, 60, 1, '2026-02-23 14:18:46', 'Inicio de Producción', 'OFFSET'),
(254, 58, 1, '2026-02-23 14:19:03', 'Inicio de Producción', 'OFFSET'),
(256, 58, 1, '2026-02-23 14:19:25', 'Fin de Producción serigrafia', NULL),
(257, 60, 1, '2026-02-23 19:25:22', 'Fin de Producción offset', NULL),
(258, 60, 1, '2026-02-23 19:25:42', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(259, 67, 3, '2026-02-25 23:32:21', 'Creación de OT', 'DISEÑO'),
(260, 68, 3, '2026-02-25 23:38:02', 'Creación de OT', 'DISEÑO'),
(261, 68, 1, '2026-02-26 01:11:27', 'Envío a Producción', 'OFFSET'),
(268, 66, 1, '2026-02-26 18:05:31', 'Envío a Producción', 'OFFSET'),
(269, 67, 1, '2026-02-26 18:05:55', 'Envío a Producción', 'OFFSET'),
(270, 65, 1, '2026-02-26 18:06:09', 'Envío a Producción', 'OFFSET'),
(271, 58, 1, '2026-02-26 18:06:41', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(272, 73, 3, '2026-02-26 22:51:28', 'Creación de OT', 'DISEÑO'),
(273, 74, 3, '2026-02-26 22:59:59', 'Creación de OT', 'DISEÑO'),
(274, 65, 1, '2026-02-27 13:09:49', 'Inicio de Producción', 'OFFSET'),
(275, 65, 1, '2026-02-27 14:11:37', 'Fin de Producción offset', NULL),
(276, 67, 1, '2026-02-27 14:13:25', 'Inicio de Producción', 'OFFSET'),
(277, 75, 3, '2026-02-27 15:27:20', 'Creación de OT', 'DISEÑO'),
(278, 68, 1, '2026-02-27 15:31:42', 'Inicio de Producción', 'OFFSET'),
(280, 75, 1, '2026-02-27 15:32:55', 'Envío a Producción', 'OFFSET'),
(281, 65, 1, '2026-02-27 15:34:42', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(282, 66, 1, '2026-02-27 15:36:34', 'Inicio de Producción', 'OFFSET'),
(284, 66, 1, '2026-02-27 15:36:37', 'Fin de Producción offset', NULL),
(285, 66, 1, '2026-02-27 15:36:54', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(286, 75, 1, '2026-02-27 17:28:26', 'Inicio de Producción', 'OFFSET'),
(289, 76, 3, '2026-02-27 17:35:55', 'Creación de OT', 'DISEÑO'),
(290, 75, 1, '2026-02-27 17:39:41', 'Fin de Producción offset', NULL),
(291, 75, 1, '2026-02-27 18:53:59', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(292, 77, 3, '2026-02-27 22:35:45', 'Creación de OT', 'DISEÑO'),
(294, 73, 1, '2026-03-02 18:28:03', 'Envío a Producción', 'OFFSET'),
(295, 74, 1, '2026-03-02 18:28:11', 'Envío a Producción', 'OFFSET'),
(296, 76, 1, '2026-03-02 18:28:27', 'Envío a Producción', 'OFFSET'),
(297, 77, 1, '2026-03-02 18:29:03', 'Envío a Producción', 'OFFSET'),
(298, 76, 1, '2026-03-02 19:04:48', 'Inicio de Producción', 'OFFSET'),
(299, 76, 1, '2026-03-02 19:04:51', 'Fin de Producción offset', NULL),
(300, 76, 1, '2026-03-02 19:05:12', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(301, 67, 1, '2026-03-05 14:06:22', 'Fin de Producción offset', NULL),
(302, 74, 1, '2026-03-05 14:14:44', 'Inicio de Producción', 'OFFSET'),
(303, 74, 1, '2026-03-05 17:52:25', 'Fin de Producción offset', NULL),
(304, 68, 1, '2026-03-05 19:00:48', 'Fin de Producción offset', NULL),
(305, 67, 1, '2026-03-05 19:03:51', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(306, 68, 1, '2026-03-05 19:04:55', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(307, 74, 1, '2026-03-05 19:05:38', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(308, 77, 1, '2026-03-06 17:24:27', 'Inicio de Producción', 'OFFSET'),
(309, 77, 1, '2026-03-06 17:24:30', 'Fin de Producción offset', NULL),
(310, 73, 1, '2026-03-06 17:25:06', 'Inicio de Producción', 'OFFSET'),
(311, 73, 1, '2026-03-06 18:19:52', 'Fin de Producción offset', NULL),
(312, 73, 1, '2026-03-06 18:51:51', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(313, 77, 1, '2026-03-06 18:53:00', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(314, 62, 1, '2026-03-09 13:22:26', 'Inicio de Producción', 'OFFSET'),
(315, 79, 3, '2026-03-10 00:57:18', 'Creación de OT', 'DISEÑO'),
(316, 80, 3, '2026-03-13 11:40:07', 'Creación de OT', 'DISEÑO'),
(317, 81, 3, '2026-03-13 11:49:35', 'Creación de OT', 'DISEÑO'),
(318, 82, 3, '2026-03-13 12:09:26', 'Creación de OT', 'DISEÑO'),
(319, 83, 3, '2026-03-13 12:12:42', 'Creación de OT', 'DISEÑO'),
(320, 84, 3, '2026-03-13 12:26:40', 'Creación de OT', 'DISEÑO'),
(321, 85, 3, '2026-03-13 12:51:15', 'Creación de OT', 'DISEÑO'),
(322, 86, 3, '2026-03-13 13:35:46', 'Creación de OT', 'DISEÑO'),
(323, 62, 1, '2026-03-13 13:39:08', 'Fin de Producción offset', NULL),
(324, 80, 1, '2026-03-13 13:40:04', 'Envío a Producción', 'OFFSET'),
(325, 81, 1, '2026-03-13 13:40:22', 'Envío a Producción', 'OFFSET'),
(326, 79, 1, '2026-03-13 13:40:43', 'Envío a Producción', 'OFFSET'),
(327, 83, 1, '2026-03-13 13:40:55', 'Envío a Producción', 'OFFSET'),
(328, 83, 1, '2026-03-13 13:41:07', 'Inicio de Producción', 'OFFSET'),
(330, 87, 3, '2026-03-13 13:53:56', 'Creación de OT', 'DISEÑO'),
(331, 83, 1, '2026-03-13 14:02:30', 'Fin de Producción offset', NULL),
(332, 83, 1, '2026-03-13 14:02:51', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(333, 81, 1, '2026-03-13 14:04:42', 'Inicio de Producción', 'OFFSET'),
(336, 88, 3, '2026-03-13 14:22:37', 'Creación de OT', 'DISEÑO'),
(337, 81, 1, '2026-03-13 17:56:59', 'Fin de Producción offset', NULL),
(338, 88, 1, '2026-03-13 17:58:03', 'Envío a Producción', 'SERIGRAFIA'),
(339, 88, 1, '2026-03-13 17:58:10', 'Inicio de Producción', 'SERIGRAFIA'),
(341, 88, 1, '2026-03-13 17:58:13', 'Fin de Producción serigrafia', NULL),
(342, 79, 1, '2026-03-13 17:58:44', 'Inicio de Producción', 'OFFSET'),
(345, 81, 1, '2026-03-13 20:52:25', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(346, 89, 3, '2026-03-14 00:12:37', 'Creación de OT', 'DISEÑO'),
(347, 90, 3, '2026-03-14 00:41:03', 'Creación de OT', 'DISEÑO'),
(348, 91, 3, '2026-03-14 01:08:47', 'Creación de OT', 'DISEÑO'),
(349, 92, 3, '2026-03-16 13:53:01', 'Creación de OT', 'DISEÑO'),
(350, 93, 3, '2026-03-17 01:18:24', 'Creación de OT', 'DISEÑO'),
(351, 94, 3, '2026-03-17 01:25:49', 'Creación de OT', 'DISEÑO'),
(352, 79, 1, '2026-03-17 11:41:24', 'Fin de Producción offset', NULL),
(353, 80, 1, '2026-03-17 14:37:22', 'Inicio de Producción', 'OFFSET'),
(354, 80, 1, '2026-03-17 14:37:24', 'Fin de Producción offset', NULL),
(369, 87, 1, '2026-03-17 17:13:00', 'Envío a Producción', 'OFFSET'),
(370, 82, 1, '2026-03-17 17:13:09', 'Envío a Producción', 'OFFSET'),
(371, 84, 1, '2026-03-17 17:14:54', 'Envío a Producción', 'OFFSET'),
(372, 85, 1, '2026-03-17 17:15:36', 'Envío a Producción', 'OFFSET'),
(373, 86, 1, '2026-03-17 17:15:50', 'Envío a Producción', 'OFFSET'),
(374, 89, 1, '2026-03-17 17:16:05', 'Envío a Producción', 'OFFSET'),
(375, 91, 1, '2026-03-17 17:16:25', 'Envío a Producción', 'SERIGRAFIA'),
(376, 93, 1, '2026-03-17 17:16:54', 'Envío a Producción', 'OFFSET'),
(377, 94, 1, '2026-03-17 17:17:11', 'Envío a Producción', 'OFFSET'),
(378, 94, 1, '2026-03-17 17:17:27', 'Inicio de Producción', 'OFFSET'),
(379, 94, 1, '2026-03-17 17:17:29', 'Fin de Producción offset', NULL),
(380, 89, 1, '2026-03-17 17:17:37', 'Inicio de Producción', 'OFFSET'),
(381, 89, 1, '2026-03-17 17:17:39', 'Fin de Producción offset', NULL),
(382, 87, 1, '2026-03-17 17:17:45', 'Inicio de Producción', 'OFFSET'),
(383, 86, 1, '2026-03-17 17:17:49', 'Inicio de Producción', 'OFFSET'),
(384, 84, 1, '2026-03-17 17:17:56', 'Inicio de Producción', 'OFFSET'),
(385, 82, 1, '2026-03-17 17:18:01', 'Inicio de Producción', 'OFFSET'),
(386, 93, 1, '2026-03-17 18:54:45', 'Inicio de Producción', 'OFFSET'),
(387, 93, 1, '2026-03-17 18:54:48', 'Fin de Producción offset', NULL),
(388, 87, 1, '2026-03-17 18:54:58', 'Fin de Producción offset', NULL),
(389, 86, 1, '2026-03-17 18:55:06', 'Fin de Producción offset', NULL),
(390, 94, 1, '2026-03-17 18:55:38', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(391, 93, 1, '2026-03-17 18:56:12', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(392, 89, 1, '2026-03-17 18:57:09', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(393, 88, 1, '2026-03-17 18:57:27', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(394, 87, 1, '2026-03-17 18:57:54', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(395, 87, 1, '2026-03-17 18:58:36', 'Actualización de datos de Expedición', 'EXPEDICION'),
(396, 86, 1, '2026-03-17 18:58:51', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(397, 80, 1, '2026-03-17 18:59:20', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(398, 79, 1, '2026-03-17 18:59:41', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(399, 84, 1, '2026-03-17 19:26:17', 'Fin de Producción offset', NULL),
(400, 84, 1, '2026-03-17 19:26:42', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(401, 100, 3, '2026-03-18 02:33:54', 'Creación de OT', 'DISEÑO'),
(402, 101, 3, '2026-03-18 17:36:38', 'Creación de OT', 'DISEÑO'),
(403, 102, 1, '2026-03-18 19:17:19', 'Creación de OT', 'DISEÑO'),
(404, 102, 1, '2026-03-18 19:17:33', 'Envío a Producción', 'OFFSET'),
(405, 102, 1, '2026-03-18 19:17:40', 'Inicio de Producción', 'OFFSET'),
(406, 102, 1, '2026-03-18 19:17:42', 'Fin de Producción offset', NULL),
(407, 85, 1, '2026-03-20 13:09:57', 'Inicio de Producción', 'OFFSET'),
(408, 85, 1, '2026-03-20 14:33:46', 'Fin de Producción offset', NULL),
(409, 82, 1, '2026-03-20 14:34:14', 'Fin de Producción offset', NULL),
(410, 85, 1, '2026-03-20 17:07:26', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(411, 103, 3, '2026-03-20 19:59:24', 'Creación de OT', 'DISEÑO'),
(412, 104, 3, '2026-03-20 20:14:16', 'Creación de OT', 'DISEÑO'),
(413, 105, 3, '2026-03-20 20:23:53', 'Creación de OT', 'DISEÑO'),
(414, 106, 3, '2026-03-20 20:53:22', 'Creación de OT', 'DISEÑO'),
(415, 107, 3, '2026-03-21 14:28:02', 'Creación de OT', 'DISEÑO'),
(416, 108, 3, '2026-03-21 15:31:05', 'Creación de OT', 'DISEÑO'),
(417, 90, 1, '2026-03-23 14:45:13', 'Envío a Producción', 'OFFSET'),
(418, 92, 1, '2026-03-23 14:45:22', 'Envío a Producción', 'OFFSET'),
(419, 100, 1, '2026-03-23 14:45:45', 'Envío a Producción', 'OFFSET'),
(420, 101, 1, '2026-03-23 14:45:56', 'Envío a Producción', 'OFFSET'),
(421, 105, 1, '2026-03-23 14:46:17', 'Envío a Producción', 'OFFSET'),
(422, 106, 1, '2026-03-23 14:46:33', 'Envío a Producción', 'OFFSET'),
(423, 103, 1, '2026-03-23 14:46:57', 'Envío a Producción', 'OFFSET'),
(424, 104, 1, '2026-03-23 14:47:04', 'Envío a Producción', 'OFFSET'),
(425, 107, 1, '2026-03-23 14:47:12', 'Envío a Producción', 'OFFSET'),
(426, 108, 1, '2026-03-23 14:47:22', 'Envío a Producción', 'OFFSET'),
(427, 109, 3, '2026-03-23 14:53:33', 'Creación de OT', 'DISEÑO'),
(428, 107, 1, '2026-03-23 19:40:52', 'Inicio de Producción', 'OFFSET'),
(430, 110, 3, '2026-03-23 22:47:35', 'Creación de OT', 'DISEÑO'),
(431, 111, 3, '2026-03-23 23:02:36', 'Creación de OT', 'DISEÑO'),
(432, 103, 1, '2026-03-24 11:39:04', 'Inicio de Producción', 'OFFSET'),
(434, 103, 1, '2026-03-24 13:06:28', 'Fin de Producción offset', NULL),
(435, 107, 1, '2026-03-24 13:06:49', 'Fin de Producción offset', NULL),
(436, 104, 1, '2026-03-24 13:07:19', 'Inicio de Producción', 'OFFSET'),
(438, 104, 1, '2026-03-24 13:19:59', 'Fin de Producción offset', NULL),
(439, 105, 1, '2026-03-24 13:20:32', 'Inicio de Producción', 'OFFSET'),
(441, 105, 1, '2026-03-24 13:53:50', 'Fin de Producción offset', NULL),
(442, 101, 1, '2026-03-24 14:21:14', 'Inicio de Producción', 'OFFSET'),
(444, 101, 1, '2026-03-24 14:21:18', 'Fin de Producción offset', NULL),
(445, 90, 1, '2026-03-24 14:21:27', 'Inicio de Producción', 'OFFSET'),
(447, 100, 1, '2026-03-24 14:22:27', 'Inicio de Producción', 'OFFSET'),
(449, 100, 1, '2026-03-24 18:54:27', 'Fin de Producción offset', NULL),
(450, 100, 1, '2026-03-24 18:54:48', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(451, 101, 1, '2026-03-24 19:23:40', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(452, 105, 1, '2026-03-24 19:41:34', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(453, 104, 1, '2026-03-24 19:50:24', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(454, 112, 3, '2026-03-24 22:59:35', 'Creación de OT', 'DISEÑO'),
(455, 107, 1, '2026-03-25 11:54:13', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(456, 103, 1, '2026-03-25 12:10:23', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(457, 109, 1, '2026-03-26 02:46:52', 'Envío a Producción', 'OFFSET'),
(458, 110, 1, '2026-03-26 02:47:01', 'Envío a Producción', 'OFFSET'),
(459, 111, 1, '2026-03-26 02:47:10', 'Envío a Producción', 'OFFSET'),
(460, 112, 1, '2026-03-26 02:47:27', 'Envío a Producción', 'OFFSET'),
(461, 108, 1, '2026-03-26 12:17:40', 'Inicio de Producción', 'OFFSET'),
(462, 113, 3, '2026-03-26 13:48:38', 'Creación de OT', 'DISEÑO'),
(463, 92, 1, '2026-03-26 19:04:28', 'Inicio de Producción', 'OFFSET'),
(464, 92, 1, '2026-03-26 19:04:30', 'Fin de Producción offset', NULL),
(465, 108, 1, '2026-03-26 19:05:00', 'Fin de Producción offset', NULL),
(466, 108, 1, '2026-03-26 19:58:54', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(467, 91, 1, '2026-03-26 20:03:11', 'Inicio de Producción', 'OFFSET'),
(469, 91, 1, '2026-03-26 20:03:14', 'Fin de Producción serigrafia', NULL),
(470, 91, 1, '2026-03-26 20:03:55', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(471, 113, 1, '2026-03-26 22:15:09', 'Envío a Producción', 'OFFSET'),
(472, 106, 1, '2026-03-27 12:11:24', 'Inicio de Producción', 'OFFSET'),
(473, 106, 1, '2026-03-27 12:40:26', 'Fin de Producción offset', NULL),
(474, 110, 1, '2026-03-27 13:31:48', 'Inicio de Producción', 'OFFSET'),
(475, 110, 1, '2026-03-27 13:31:50', 'Fin de Producción offset', NULL),
(476, 111, 1, '2026-03-27 13:32:33', 'Inicio de Producción', 'OFFSET'),
(477, 109, 1, '2026-03-27 14:10:00', 'Inicio de Producción', 'OFFSET'),
(479, 113, 1, '2026-03-27 14:10:22', 'Inicio de Producción', 'OFFSET'),
(480, 113, 1, '2026-03-27 14:29:35', 'Fin de Producción offset', NULL),
(481, 111, 1, '2026-03-27 14:32:04', 'Fin de Producción offset', NULL),
(482, 113, 1, '2026-03-27 17:24:49', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(483, 110, 1, '2026-03-27 17:30:15', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(484, 110, 1, '2026-03-27 17:30:17', 'Actualización de datos de Expedición', 'EXPEDICION'),
(485, 111, 1, '2026-03-27 17:30:33', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(486, 111, 1, '2026-03-27 17:30:34', 'Actualización de datos de Expedición', 'EXPEDICION'),
(487, 111, 1, '2026-03-27 17:30:36', 'Actualización de datos de Expedición', 'EXPEDICION'),
(488, 111, 1, '2026-03-27 17:30:36', 'Actualización de datos de Expedición', 'EXPEDICION'),
(489, 111, 1, '2026-03-27 17:30:37', 'Actualización de datos de Expedición', 'EXPEDICION'),
(490, 111, 1, '2026-03-27 17:30:37', 'Actualización de datos de Expedición', 'EXPEDICION'),
(491, 111, 1, '2026-03-27 17:30:37', 'Actualización de datos de Expedición', 'EXPEDICION'),
(492, 111, 1, '2026-03-27 17:30:37', 'Actualización de datos de Expedición', 'EXPEDICION'),
(493, 106, 1, '2026-03-27 17:39:22', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(494, 106, 1, '2026-03-27 17:39:24', 'Actualización de datos de Expedición', 'EXPEDICION'),
(495, 114, 3, '2026-03-30 17:25:29', 'Creación de OT', 'DISEÑO'),
(496, 115, 3, '2026-03-30 17:34:19', 'Creación de OT', 'DISEÑO'),
(497, 116, 3, '2026-03-30 17:43:46', 'Creación de OT', 'DISEÑO'),
(498, 117, 3, '2026-03-30 17:53:13', 'Creación de OT', 'DISEÑO'),
(499, 118, 3, '2026-03-31 00:17:07', 'Creación de OT', 'DISEÑO'),
(500, 119, 3, '2026-03-31 00:26:45', 'Creación de OT', 'DISEÑO'),
(501, 115, 1, '2026-03-31 12:28:40', 'Envío a Producción', 'OFFSET'),
(502, 116, 1, '2026-03-31 12:28:49', 'Envío a Producción', 'OFFSET'),
(503, 114, 1, '2026-03-31 12:28:58', 'Envío a Producción', 'SERIGRAFIA'),
(504, 117, 1, '2026-03-31 12:29:25', 'Envío a Producción', 'OFFSET'),
(505, 118, 1, '2026-03-31 12:29:48', 'Envío a Producción', 'OFFSET'),
(506, 119, 1, '2026-03-31 12:30:02', 'Envío a Producción', 'OFFSET'),
(507, 120, 3, '2026-04-01 01:31:48', 'Creación de OT', 'DISEÑO'),
(508, 115, 1, '2026-04-01 18:58:03', 'Inicio de Producción', 'OFFSET'),
(509, 115, 1, '2026-04-01 18:58:12', 'Fin de Producción offset', NULL),
(510, 118, 1, '2026-04-01 19:51:32', 'Inicio de Producción', 'OFFSET'),
(511, 118, 1, '2026-04-01 19:51:35', 'Fin de Producción offset', NULL),
(512, 112, 1, '2026-04-01 20:56:50', 'Inicio de Producción', 'OFFSET'),
(513, 112, 1, '2026-04-01 20:56:52', 'Fin de Producción offset', NULL),
(514, 112, 1, '2026-04-02 13:52:37', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(515, 118, 1, '2026-04-02 14:08:05', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(516, 120, 1, '2026-04-07 00:46:10', 'Envío a Producción', 'OFFSET'),
(517, 90, 1, '2026-04-07 00:46:24', 'Fin de Producción offset', NULL),
(518, 109, 1, '2026-04-07 00:46:37', 'Fin de Producción offset', NULL),
(519, 90, 1, '2026-04-07 11:53:58', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(520, 121, 3, '2026-04-08 22:04:09', 'Creación de OT', 'DISEÑO'),
(521, 122, 3, '2026-04-08 22:11:27', 'Creación de OT', 'DISEÑO'),
(522, 115, 1, '2026-04-10 12:56:24', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(523, 116, 1, '2026-04-10 19:14:20', 'Inicio de Producción', 'OFFSET'),
(524, 116, 1, '2026-04-10 19:14:22', 'Fin de Producción offset', NULL),
(525, 120, 1, '2026-04-10 19:14:29', 'Inicio de Producción', 'OFFSET'),
(526, 121, 1, '2026-04-10 19:32:15', 'Envío a Producción', 'OFFSET'),
(527, 122, 1, '2026-04-10 19:32:21', 'Envío a Producción', 'OFFSET'),
(528, 120, 1, '2026-04-10 19:42:58', 'Fin de Producción offset', NULL),
(529, 122, 1, '2026-04-10 19:45:56', 'Inicio de Producción', 'OFFSET'),
(530, 122, 1, '2026-04-10 20:46:29', 'Fin de Producción offset', NULL),
(531, 122, 1, '2026-04-11 14:00:07', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(532, 120, 1, '2026-04-11 14:01:06', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(533, 121, 1, '2026-04-13 18:46:51', 'Inicio de Producción', 'OFFSET'),
(534, 121, 1, '2026-04-13 18:46:54', 'Fin de Producción offset', NULL),
(535, 116, 1, '2026-04-14 12:37:06', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(536, 121, 1, '2026-04-14 12:42:25', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(537, 123, 3, '2026-04-15 15:03:51', 'Creación de OT', 'DISEÑO'),
(538, 124, 3, '2026-04-15 15:24:14', 'Creación de OT', 'DISEÑO'),
(539, 125, 3, '2026-04-15 15:36:13', 'Creación de OT', 'DISEÑO'),
(540, 123, 1, '2026-04-16 17:51:46', 'Envío a Producción', 'SERIGRAFIA'),
(541, 126, 3, '2026-04-16 19:23:38', 'Creación de OT', 'DISEÑO'),
(542, 127, 3, '2026-04-16 19:32:49', 'Creación de OT', 'DISEÑO'),
(543, 124, 1, '2026-04-16 19:42:00', 'Envío a Producción', 'OFFSET'),
(544, 126, 1, '2026-04-16 19:42:14', 'Envío a Producción', 'OFFSET'),
(545, 127, 1, '2026-04-16 19:42:27', 'Envío a Producción', 'OFFSET'),
(546, 125, 1, '2026-04-16 19:43:01', 'Envío a Producción', 'OFFSET'),
(547, 128, 3, '2026-04-16 19:50:32', 'Creación de OT', 'DISEÑO'),
(548, 129, 3, '2026-04-16 19:57:36', 'Creación de OT', 'DISEÑO'),
(549, 124, 1, '2026-04-17 11:47:55', 'Inicio de Producción', 'OFFSET'),
(550, 124, 1, '2026-04-17 11:47:59', 'Fin de Producción offset', NULL),
(551, 124, 1, '2026-04-17 11:48:18', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(552, 128, 1, '2026-04-17 12:05:04', 'Envío a Producción', 'OFFSET'),
(553, 129, 1, '2026-04-17 12:05:17', 'Envío a Producción', 'OFFSET'),
(554, 128, 1, '2026-04-17 12:05:48', 'Inicio de Producción', 'OFFSET'),
(557, 128, 1, '2026-04-17 12:05:50', 'Fin de Producción offset', NULL),
(558, 128, 1, '2026-04-17 12:06:09', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(559, 125, 1, '2026-04-17 18:44:04', 'Inicio de Producción', 'OFFSET'),
(560, 125, 1, '2026-04-17 20:11:12', 'Fin de Producción offset', NULL),
(561, 125, 1, '2026-04-17 20:11:28', 'Carga inicial de datos de Expedición', 'EXPEDICION'),
(562, 130, 1, '2026-04-18 23:58:29', 'Creación de OT', 'DISEÑO'),
(563, 131, 1, '2026-04-19 00:03:52', 'Creación de OT', 'DISEÑO'),
(564, 132, 3, '2026-04-23 00:04:49', 'Creación de OT', 'DISEÑO'),
(565, 133, 3, '2026-04-23 00:12:34', 'Creación de OT', 'DISEÑO'),
(566, 134, 3, '2026-04-23 00:31:08', 'Creación de OT', 'DISEÑO'),
(567, 135, 3, '2026-04-23 00:42:17', 'Creación de OT', 'DISEÑO');

-- --------------------------------------------------------

--
-- Table structure for table `ordenes_trabajo`
--

CREATE TABLE `ordenes_trabajo` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `detalle_trabajo` text DEFAULT NULL,
  `presupuesto` decimal(10,2) DEFAULT NULL,
  `fecha_ingreso` datetime NOT NULL,
  `fecha_prometida` date DEFAULT NULL,
  `es_repeticion` tinyint(1) DEFAULT 0,
  `sector_destino` varchar(20) DEFAULT NULL,
  `sena` decimal(10,2) DEFAULT NULL,
  `cantidad_impresiones` int(11) DEFAULT NULL,
  `etapa` varchar(20) DEFAULT NULL,
  `total_pago` tinyint(1) DEFAULT NULL,
  `direccion_entrega` varchar(255) DEFAULT NULL,
  `comision_paga` tinyint(1) DEFAULT NULL,
  `aclaracion_entrega` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordenes_trabajo`
--

INSERT INTO `ordenes_trabajo` (`id`, `id_cliente`, `id_vendedor`, `detalle_trabajo`, `presupuesto`, `fecha_ingreso`, `fecha_prometida`, `es_repeticion`, `sector_destino`, `sena`, `cantidad_impresiones`, `etapa`, `total_pago`, `direccion_entrega`, `comision_paga`, `aclaracion_entrega`) VALUES
(4, 2, 3, 'Santiago Negra Burger se le debe los Volantes\r\n\r\nLogo con correcciones\r\n\r\nSin tilde en la A (Odontología)\r\n\r\nTratamientos.\r\n\r\n-Detartraje y profilaxis (Limpiezas)\r\n-Blanqueamientos\r\n-Eliminación de Caries y Restauraciones\r\n-Prótesis\r\n-Endodoncia\r\n-Odontopediatría\r\n- Ortodoncia\r\n-Cirugía\r\n-Implantes\r\n\r\nUbicación (logo) Mar del Plata casi Caracas, Punta Negra, Piriápolis \r\n\r\nAgenda tu cita ➡️ 099244708', 0.01, '2025-12-17 00:00:00', '2025-12-26', 0, 'OFFSET', 0.01, 1000, 'EXPEDICION', 1, 'null', 0, NULL),
(5, 3, 3, '2000 Antigrasa 30x40 Pantone k', 5765.00, '2025-12-30 00:00:00', '2026-01-08', 0, 'OFFSET', 0.00, 2000, 'EXPEDICION', 1, 'null', 0, NULL),
(15, 4, 3, '2000 Antigrasa Pantone k  (Negro) Medida 20 x 20', 4099.00, '2026-01-03 00:00:00', '2026-01-10', 0, 'OFFSET', 4099.00, 2000, 'EXPEDICION', 1, 'null', 0, NULL),
(16, 5, 3, 'Papel Anti grasa Pantone k medida 20 x 30 cantidad 4000\r\nYa pagó el  Total ', 5900.00, '2026-01-05 00:00:00', '2026-01-09', 0, 'OFFSET', 5900.00, 4000, 'EXPEDICION', 1, 'null', 0, NULL),
(18, 6, 3, '1000 Antigrasa pantone K. Medida 30 X 40  Patron  inclinacion de diseño 15 grados //   ENVIO POR DAC A RETIRAR EN YOUNG//', 4270.00, '2026-12-05 00:00:00', '2026-05-12', 0, 'OFFSET', 2135.00, 1000, 'EXPEDICION', 1, 'null', 0, NULL),
(27, 10, 1, '6 Remeras Negras Talle S\r\nTinta Plastisol Pantone 318U', 0.00, '2026-01-22 00:00:00', '2026-01-23', 0, 'SERIGRAFIA', 900.00, 6, 'EXPEDICION', NULL, 'Retira', 0, NULL),
(28, 12, 3, '3000 antigrasa 30 x 40 \r\n1000 stikers 4 cm \r\npantone k\r\ndiseño de papel repetir imagen en el espacio del papel respetando un logo grande y 4 chicos distribuidos en la superficie\r\nStikers logo del cliente en fondo blanco', 9027.00, '2026-01-22 00:00:00', '2026-01-30', 0, 'OFFSET', 0.00, 3000, 'EXPEDICION', 1, 'Retira en Agencia', 0, ''),
(29, 13, 1, 'Remeras negras 9\r\nTalle M 1 - Lucas\r\nL - Su, Leo, Naty, Sophie, Silvina, Juan, Livia\r\nXL - Mateo', 0.00, '2026-01-23 00:00:00', '2026-01-26', 0, 'SERIGRAFIA', 1000.00, 9, 'EXPEDICION', NULL, '', NULL, NULL),
(30, 16, 3, '5000 Antigrasa Pantone k medida 33 x33', 11224.00, '2026-01-26 00:00:00', '2026-01-30', 0, 'OFFSET', 5612.00, 5000, 'EXPEDICION', 1, 'Retira en local', NULL, NULL),
(33, 6, 3, '1000 Antigrasa  30 X 40 Pantone k // Diseño ya creado por mauro, distinto al primero', 4270.00, '2026-01-26 00:00:00', '2026-02-04', 0, 'OFFSET', 4270.00, 1000, 'EXPEDICION', 0, 'Agencia DAC', NULL, NULL),
(34, 14, 3, '1000 antigrasa diseño y medida la misma', 4270.00, '2026-01-26 00:00:00', '2026-02-05', 0, 'OFFSET', 0.00, 1000, 'EXPEDICION', NULL, 'Venancio Benavidez 3417 - Prado', NULL, NULL),
(35, 17, 3, '3000 antigrasa diseño amarillo, Pantone 2012\r\n3000 antigrasa diseño rojo, Pantone 3546', 15064.00, '2026-01-27 00:00:00', '2026-02-07', 0, 'OFFSET', 7532.00, 6000, 'EXPEDICION', 0, 'El papel amarillo (Maldonado 1354 esq ejido local rojo y amarillo) Montevideo  Papel rojo por agencia a Mercedes Soriano, Don Bosco 973 Viv 55 la dirección ', NULL, NULL),
(36, 18, 3, '1000 bandejas tipo 1 (Referencia Alapar) color logo rosado letras blancas con qr y telefono en diseño 093987189', 6690.00, '2026-01-27 00:00:00', '2026-02-11', 0, 'OFFSET', 3345.00, 1000, 'EXPEDICION', 1, 'Dr Enrique Pouey 659 (Las Piedras)', NULL, NULL),
(38, 15, 3, '1000 antigrasa 33 x 33 pantone k //\r\n referencia Patron negra burger // \r\ndatos patron @Donatello.rivera \r\n099 766 135', 4270.00, '2026-01-26 00:00:00', '2026-02-06', 0, 'OFFSET', 2270.00, 1000, 'EXPEDICION', 1, 'Juana de Oriol 946 esq A. Ortega', NULL, NULL),
(39, 20, 3, '1200 conos fritas\r\n1200 bandejas panchos\r\n\r\n( Diseño 1)\r\nCantina do ze\r\n300 panchos\r\n400 papas\r\n\r\nDiseño 2\r\n(La brecha)\r\n900 panchos\r\n800 papas\r\ndiseño cantina do ze dos hombres en la punta y las letras + telefono 098869084\r\ndiseño la brecha // la palabra + el loguito el yaca\r\n', 13068.00, '2026-01-29 00:00:00', '2026-02-09', 0, 'OFFSET', 8000.00, 2400, 'EXPEDICION', 0, '.', NULL, NULL),
(40, 19, 3, '1000 Antigrasa Pantone k medida  20 x 50\r\nlogo en una punta y diseño tipo damero  pero en rombo ( referencia en la imagen del archivo)\r\ngenerar una opcion tambien con 4 logos uno en cada esquina', 4900.00, '2026-01-29 00:00:00', '2026-02-06', 0, 'OFFSET', 2500.00, 1000, 'EXPEDICION', NULL, '', NULL, NULL),
(41, 22, 3, '2000 antigrasa pantone k 30 x 40', 5807.00, '2026-01-23 00:00:00', '2026-01-30', 0, 'OFFSET', 3000.00, 2000, 'EXPEDICION', 1, 'Eusebio Giménez 69 Mercedes Soriano', NULL, NULL),
(42, 21, 1, '5000 lisos 30x40cm\r\n5000 lisos 20x30cm', 10086.00, '2026-02-03 00:00:00', '2026-02-03', 0, 'OFFSET', 0.00, 7500, 'EXPEDICION', 0, 'Santa Fe 1222', NULL, NULL),
(43, 17, 3, '3000 30 x 40 antigrasa color rojo \r\npizzeria Diabolo\r\nmandar a mercedes por Mirtrans a puerta\r\n', 7532.00, '2026-02-05 00:00:00', '2026-02-05', 0, 'OFFSET', 7532.00, 3000, 'EXPEDICION', 1, 'Don Bosco 973 Viv 55 (Mercedes Soriano) el papel rojo', NULL, NULL),
(44, 17, 3, '3000 antigrasa 30 x 40 color amarillo\r\nPizzeria cerbero\r\nenviar por box a direccion montevideo', 7532.00, '2026-02-05 00:00:00', '2026-02-05', 0, 'OFFSET', 3766.00, 3000, 'EXPEDICION', 1, 'Maldonado 1354 esq ejido local rojo y amarillo) Montevideo', NULL, 'null'),
(45, 25, 3, '3000 antigrasa 30 x 40 pantone k', 7527.00, '2026-02-03 00:00:00', '2026-02-12', 0, 'OFFSET', 3763.00, 3000, 'EXPEDICION', 1, 'José Leguizamón 3879 bis entre andres aguiar y propios', NULL, 'coordinar antes de entregar \r\nposiblemente levante cadete propio\r\nsino box+'),
(46, 26, 3, '3000 antigrasa 30x 40cm\r\nPANTONE 7522U', 7527.00, '2026-02-02 00:00:00', '2026-02-12', 0, 'OFFSET', 3763.00, 3000, 'EXPEDICION', 1, 'Pan de azucar 2750 esq avellaneda', NULL, 'horario de 8 a 20 hs'),
(47, 21, 3, '5000 antigrasa Pantone k 20 x 30', 5645.00, '2026-02-02 00:00:00', '2026-02-12', 0, 'OFFSET', 0.00, 5000, 'EXPEDICION', 0, 'Santa Fe 1222', NULL, 'contacto Damian o Alvaro'),
(48, 27, 3, '2000 antigrasa 30*40\r\n⁠marrón: PANTONE 2317U', 5807.00, '2026-01-31 00:00:00', '2026-02-10', 0, 'OFFSET', 2903.00, 2000, 'EXPEDICION', 1, 'Retira en Agencia', NULL, 'Retira taller'),
(49, 29, 3, '12 remeras a una tinta \r\n11 talles M\r\n1 XXL\r\n', 6120.00, '2026-02-09 00:00:00', '2026-02-14', 0, 'SERIGRAFIA', 0.00, 12, 'EXPEDICION', 1, 'Levanta Taller', NULL, ''),
(50, 30, 3, '2000 Antigrasa 28*28 \r\nojo la medida es la aclarada', 5807.00, '2026-02-09 00:00:00', '2026-02-16', 0, 'OFFSET', 0.00, 2000, 'EXPEDICION', 1, 'Román Guerra 1047(Gestoria) Maldonado', NULL, ''),
(53, 32, 3, '10 remeras negras ,\r\n talles\r\n2 talle 16,\r\n 4 talle S ,\r\n 2 talle M ,\r\n 2 talle L', 5800.00, '2026-02-11 00:00:00', '2026-02-21', 0, 'SERIGRAFIA', 0.00, 10, 'EXPEDICION', 1, 'Levanta Jorge en el Taller', NULL, 'Levanta Jorge en el Taller'),
(54, 6, 3, '2000 antigrasa 30 x 40 \r\npantone k', 5807.00, '2026-02-12 00:00:00', '2026-02-21', 0, 'OFFSET', 0.00, 2000, 'EXPEDICION', 1, 'Young , Río Negro Retira en agencia', 0, ''),
(55, 33, 3, '3000 antigrasa 30 x 40 color rojo\r\n pantone 032', 7527.00, '2026-02-16 00:00:00', '2026-02-25', 0, 'OFFSET', 3763.00, 0, 'EXPEDICION', 1, 'AV GUTIERREZ RUIZ 398 ESQUINA CELEDONIO ROJAS  Tacuarembó ciudad', 1, 'Enviar por minstrans'),
(56, 34, 3, '2000 antigrasa 30 x 40 color rosa', 5807.00, '2026-02-16 00:00:00', '2026-02-25', 0, 'OFFSET', 3000.00, 2000, 'EXPEDICION', 1, ' congreso de mercedes 2912 casa 132 esq Prudencio murgiondo Montevideo', 1, 'hay gente todo el dia \r\nenviar por box'),
(57, 29, 3, '500 tarjeta Personales', 1900.00, '2026-02-10 00:00:00', '2026-02-21', 0, 'OFFSET', 0.00, 500, 'EXPEDICION', 1, 'Levanta Taller', NULL, 'Levanta Taller'),
(58, 30, 3, '6 remeras a una tinta \r\ncolor remera en archivos\r\n1000 stikers a una tinta rojos \r\nson 3 diseños diferentes\r\n333 pocada diseño\r\n', 5280.00, '2026-02-13 00:00:00', '2026-02-21', 0, 'SERIGRAFIA', 0.00, 1006, 'EXPEDICION', 0, 'Román Guerra 1047(Gestoria) Maldonado', NULL, 'Lune a viernes de 9 a 18 hs \r\npor de punta'),
(59, 23, 3, '1500 stikers en dtf\r\nShampoo\r\nShower gel\r\nConditioner\r\nHand soap \r\nBody lotion\r\nTotal: 5 tipos de stickers\r\n300 unid. De cada uno\r\nmedida especificada en los archivos\r\nel mas grande 10cm * 3.3', 18564.00, '2026-02-17 00:00:00', '2026-02-27', 0, 'OFFSET', 0.00, 1500, 'EXPEDICION', 0, ' Av. del Agua, Parada 19 brava hotel costa del golf Maldonado', NULL, 'enviar por de punta'),
(60, 35, 3, '1000 antigrasa 30 x 40 Pantone 722', 4270.00, '2026-02-17 00:00:00', '2026-02-27', 0, 'OFFSET', 2135.00, 1000, 'EXPEDICION', 0, 'Retira en Agencia', NULL, ''),
(61, 23, 3, '1000 antigrasa 30*40', 4270.00, '2026-02-02 00:00:00', '2026-02-09', 0, 'OFFSET', 0.00, 1000, 'EXPEDICION', 1, ' Av. del Agua, Parada 19 brava hotel costa del golf Maldonado', NULL, 'enviar por de punta'),
(62, 21, 3, '5000  Antigrasa 30 x 40 Blanco\r\n5000  Antigrasa  20 X 30 Blanco\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', 11364.00, '2026-02-17 00:00:00', '2026-02-21', 0, 'OFFSET', 0.00, 10000, 'EXPEDICION', 0, 'santa fe 1222 montevideo', NULL, 'enviar por box'),
(63, 36, 3, '2000  antigrasa 30*40 pantone k', 5807.00, '2026-02-18 00:00:00', '2026-02-25', 0, 'OFFSET', 3000.00, 2000, 'EXPEDICION', 1, 'Alfonso esplnola 494 Entre libertad y canelones Canelones Las Piedras', 1, ''),
(64, 37, 3, '4000 antigrasa 20* 30\r\nPantone k', 5807.00, '2026-02-19 00:00:00', '2026-02-23', 0, 'OFFSET', 0.00, 4000, 'EXPEDICION', 1, 'Pan de azucar 2750 esq avellaneda', 1, ''),
(65, 3, 3, '2000 antigrasa 30*40 pantone k', 5807.00, '2026-02-20 00:00:00', '2026-02-26', 0, 'OFFSET', 0.00, 2000, 'EXPEDICION', 1, 'Paysandú', 1, 'levanta en agencia \r\nenviar por dac'),
(66, 38, 3, '2000 antigrasa 30 x 40 Pantone k \r\ndiseño de referencia Damodé', 5807.00, '2026-02-21 00:00:00', '2026-02-27', 0, 'OFFSET', 3000.00, 2000, 'EXPEDICION', 0, 'Sarandí 351 esquina Alzaibar.', NULL, 'Montevideo, ciudad vieja \r\nHorario de entrega de martes a viernes, de 10 a 20 hs.\r\nTienda Doña Isabel'),
(67, 39, 3, '2000 antigrasa color Rojo \r\n30*40', 5807.00, '2026-02-25 00:00:00', '2026-03-04', 0, 'OFFSET', 5807.00, 2000, 'EXPEDICION', 1, ' Arturo Santana 976, entre Joaquín de viana y Solís.', 1, 'enviar por de Punta 09 a19 hs\r\n'),
(68, 40, 3, '4000 antigrasa 20 x 15', 4270.00, '2026-02-25 00:00:00', '2026-03-04', 0, 'OFFSET', 2270.00, 0, 'EXPEDICION', NULL, 'Levanta en el taller', NULL, 'Levanta en el taller'),
(73, 42, 3, '4000 antigrasa 20 x 30 Pantone k\r\narchivo lo tiene Mauro\r\n', 5807.00, '2026-02-26 00:00:00', '2026-03-05', 0, 'OFFSET', 0.00, 4000, 'EXPEDICION', 0, 'Maldonado', NULL, 'enviar por de punta a levantar en agencia'),
(74, 41, 3, '2000 antigrasa 20 x 30 Color bordo', 4207.00, '2026-02-26 00:00:00', '2026-03-05', 0, 'OFFSET', 2000.00, 2000, 'EXPEDICION', 1, 'Dirección Batlle 746 Florida', NULL, 'enviar por minstrans\r\nciudad Florida \r\n'),
(75, 43, 3, '1000 Antigrasa 30 x 40 Pantone k', 4270.00, '2026-02-20 00:00:00', '2026-02-27', 0, 'OFFSET', 2137.00, 1000, 'EXPEDICION', 1, ' Mevir 4271  Calle Salto de Agua esq Durazno  .locaidad Cerro Chato  depto Treinta y Tres', 1, ' Mevir 4271  Calle Salto de Agua esq Durazno  .locaidad Cerro Chato  depto Treinta y Tres\r\nenviar por minstrans'),
(76, 44, 3, '2000 antigrasa Pantone k\r\n20*25\r\n', 4270.00, '2026-02-27 00:00:00', '2026-03-05', 0, 'OFFSET', 2100.00, 2000, 'EXPEDICION', 1, 'Levanta Taller', NULL, 'Levanta Taller'),
(77, 45, 3, 'total 3000 antigrasa 30 x 40\r\n2000 30*40\r\n500   20 x15 \r\n500 en ', 7527.00, '2026-02-27 00:00:00', '2026-03-06', 0, 'OFFSET', 3763.00, 3000, 'EXPEDICION', 1, 'Alfonsina storni 8212 Parque Miramar', NULL, 'enviar por box'),
(79, 46, 3, '3000 antigrasa 30 x 40 pantone k', 7527.00, '2026-03-09 00:00:00', '2026-03-16', 0, 'OFFSET', 0.00, 3000, 'EXPEDICION', 1, 'entrega jorge levanta taller', NULL, 'entrega jorge levanta taller'),
(80, 47, 3, '2000 antigrasa 20 x 30 \r\n Pantone Orange 021 C', 4270.00, '2026-03-11 00:00:00', '2026-03-18', 0, 'OFFSET', 2135.00, 2000, 'EXPEDICION', NULL, ' SALTO 1293. Apto 1006. ESQUINA CONSTITUYENTE. Montevideo.', NULL, 'Horario Amplio hay portero'),
(81, 12, 3, '1000 Conos Fritas Pantone k', 6690.00, '2026-02-28 00:00:00', '2026-03-14', 0, 'OFFSET', 6690.00, 1000, 'EXPEDICION', 1, 'Retira en Agencia', NULL, ''),
(82, 21, 3, '1000 Antigrasa 36*36\r\n Pantone 349 c', 4207.00, '2010-03-26 00:00:00', '2026-03-17', 0, 'OFFSET', 0.00, 1000, 'EXPEDICION', 0, 'santa fe 1222 montevideo', NULL, 'santa fe 1222 montevideo'),
(83, 21, 3, '5000 antigrasa 30 x 40 blanco \r\n 5000 antigrasa 20*30 blanco', 11364.00, '2026-03-10 00:00:00', '2026-03-17', 0, 'OFFSET', 0.00, 10000, 'EXPEDICION', NULL, 'santa fe 1222 montevideo', NULL, 'santa fe 1222 montevideo'),
(84, 48, 3, '6 remeras   Blancas \r\ntalles 2 S, 2M y 2L\r\n: Roticeria y panaderia Full market. Cocinar con el corazón alimenta el alma 091211666 parte de atrasmas logo\r\n6 delantales    Arena Crudo\r\n\" Cocinar con el corazón alimenta el alma\"  mas logo\r\n6 gorros.         Arena Crudo \r\nsolo Logo\r\n2000 antigrasa \r\n1000 30 x 40\r\n4000 20 x 15\r\n1000 stikers.     ', 15587.00, '2026-03-10 00:00:00', '2026-03-18', 0, 'OFFSET', 8000.00, 3018, 'EXPEDICION', 1, 'Ansina 359 esquina Lavalleja Durazno ciudad ', NULL, 'Ansina 359 esquina Lavalleja Durazno ciudad '),
(85, 49, 3, ' 10.000 Antigrasa 20x35 ', 11224.00, '2026-03-10 00:00:00', '2026-03-14', 0, 'OFFSET', 6000.00, 10, 'EXPEDICION', 1, 'Ellauri 1067 esq cavia montevideo', NULL, '099114453\r\nDe 9 a 13hs de lunes a viernes \r\nMontevideo Pocitos'),
(86, 50, 3, '2000 antigrasa 30*40 Pantone k', 5807.00, '2026-03-10 00:00:00', '2026-03-17', 0, 'OFFSET', 2903.00, 2000, 'EXPEDICION', 1, 'Zeballos y Artigas 3680  Young  Río Negro 091826393', NULL, 'Young Rio Negro'),
(87, 51, 3, '1000 stikers \r\n2000 antigrasa de 20 x 20 Pantone k', 6070.00, '2026-03-09 00:00:00', '2026-03-17', 0, 'OFFSET', 4000.00, 3000, 'EXPEDICION', 0, ' Rivera 1236 Entre Juaquin Suares y Ascencio, Bella Unión,Departamento Artigas', NULL, 'Bella Unión\r\nDepartamento Artigas'),
(88, 52, 3, '20remeras Grises ,\r\n5 M\r\n5 L\r\n10 XXL\r\n4 Polos Blancas\r\n2 M \r\n2 L\r\n1 XL\r\n20 Polar Gris\r\n5 M\r\n5 L\r\n10 XXL\r\n', 34120.00, '2026-02-28 00:00:00', '2026-03-14', 0, 'SERIGRAFIA', 0.00, 44, 'EXPEDICION', NULL, 'Levanta Taller', NULL, 'Levanta Taller'),
(89, 53, 3, '1000  Antigrasa 30 x 40 rojo 032', 4270.00, '2026-03-13 00:00:00', '2026-03-20', 0, 'OFFSET', 4270.00, 1000, 'EXPEDICION', 1, ' Carlos Silva 534 entre Leonardo olivera Pan de azúcar ( Maldonado)', NULL, 'Pan de azúcar ( Maldonado)'),
(90, 54, 3, '\r\n20.000 stikers a 4 tintas', 26200.00, '2026-03-13 00:00:00', '2026-03-20', 0, 'OFFSET', 0.00, 20000, 'EXPEDICION', 0, 'Gaboto 1287', NULL, ''),
(91, 55, 3, '12 remeras \r\ndetalles lo tiene mauro', 7000.00, '2026-03-13 00:00:00', '2026-03-20', 0, 'SERIGRAFIA', 3500.00, 12, 'EXPEDICION', 0, 'Levanta Taller', NULL, 'Levanta Taller'),
(92, 56, 3, '2000 etiquetas a una tinta 7 * 6\r\ncon barniz mate\r\n2000 etiquetas a una tinta 21 * 8\r\nFondo blanco \r\nColor logo e inscripción del mismo color de la marca\r\nsemi brillo', 15670.00, '2026-03-16 00:00:00', '2026-03-27', 0, 'OFFSET', 7835.00, 4000, 'EXPEDICION', 0, 'Carlos racine Edificio cala del yatch apto 502 ', NULL, 'Levanta Taller '),
(93, 6, 3, '2000 antigrasa 30 x 40 pantone k Ultimo Diseño', 5807.00, '2026-03-16 00:00:00', '2026-03-28', 0, 'OFFSET', 0.00, 2000, 'EXPEDICION', 1, 'Young Paysandú', NULL, 'enviar a agencia'),
(94, 57, 3, '2000 20 x 30\r\n1000 23 x 13\r\n6000 30 x 40', 15153.00, '2026-03-16 00:00:00', '2026-03-19', 0, 'OFFSET', 8198.00, 7500, 'EXPEDICION', 0, 'Gorlero 951 Horario: 8:30 a 18hs', NULL, 'Gorlero 951\r\nHorario: 8:30 a 18hs'),
(100, 58, 3, ' antigrasa 20.000 del de 20 x15 pantone k', 11224.00, '2026-03-17 00:00:00', '2026-03-24', 0, 'OFFSET', 6000.00, 20000, 'EXPEDICION', 1, 'Mata 714 y Herrera Cero largo (Melo', NULL, 'Mata 714 y Herrera Cero largo (Melo'),
(101, 59, 3, '2000 antigrasa 30 x35 Pantone k', 5807.00, '2026-03-18 00:00:00', '2026-03-25', 0, 'OFFSET', 3000.00, 2000, 'EXPEDICION', 1, '25 de Mayo 701 Tacuarembo ', NULL, 'Enviar por Dac\r\na retirar en agencia'),
(102, 60, 1, '5000 kraft marrón 100g 39x50cm', 29524.00, '2026-03-18 00:00:00', '2026-03-19', 0, 'OFFSET', 14762.00, 5000, 'EXPEDICION', 0, 'Valparaiso 1131', NULL, 'Kraft 40x50cm x 500h'),
(103, 61, 3, '8000 antigrasa 20 x 15 Pantone k\r\nUltimo diseño del pdf', 5807.00, '2026-03-20 00:00:00', '2026-03-27', 0, 'OFFSET', 2903.00, 8000, 'EXPEDICION', NULL, 'Nina Miranda s/n esq. Ruta 10, La Barra, Maldonado.', NULL, 'Horario de entrega: de jueves a lunes de 12:00 a 00hs\r\nNoelia 099 691 641'),
(104, 62, 3, '1000 antigrasa 30 x 30 Pantone k\r\ntiene Urgencia por semana SANTA\r\nHUEVOS DE PASCUA', 4207.00, '2026-03-20 00:00:00', '2026-03-18', 0, 'OFFSET', 2137.00, 1000, 'EXPEDICION', 1, 'Joaquín Suárez 1070 - Bella Union - Artigas', NULL, 'Bella union Artigas'),
(105, 63, 3, '3000 antigrasa 30*40 Pantone k', 7529.00, '2026-03-18 00:00:00', '2026-03-25', 0, 'OFFSET', 3800.00, 3000, 'EXPEDICION', 0, '25 mayo 1708 esquina gral luna Paysandú', NULL, 'De 8 hasta las 18\r\nPaysandu'),
(106, 64, 3, '2000 antigrasa 30 x 40 verde', 5807.00, '2026-03-18 00:00:00', '2026-03-26', 0, 'OFFSET', 3000.00, 2000, 'EXPEDICION', 1, 'Enviar a Joaquín Suárez 382, ', NULL, 'Enviar a Joaquín Suárez 382, salto a mi nombre'),
(107, 21, 3, '5000 antigrasa 30 x 40 liso Blanco\r\n5000 antigrasa 20 x30 liso Blanco', 11364.00, '2026-03-21 00:00:00', '2026-03-27', 0, 'OFFSET', 0.00, 10000, 'EXPEDICION', NULL, 'Santa Fe 1222', NULL, 'Santa Fe 1222'),
(108, 65, 3, '5000 Antigrasa 30*40  Pantone 032 rojo', 11224.00, '2026-03-21 00:00:00', '2026-03-27', 0, 'OFFSET', 6000.00, 5000, 'EXPEDICION', 0, 'Buffet Pastas Melo, Aparició Saravia 729, esquina.Florencio Sanchez', NULL, 'Melo Cerro largo'),
(109, 66, 3, '1000 conos fritas a una tinta', 6690.00, '2026-03-23 00:00:00', '2026-04-02', 0, 'OFFSET', 3345.00, 1000, 'EXPEDICION', NULL, 'PENZA 885 Trinidad Flores', NULL, 'Trinidad Flores enviar por Dac'),
(110, 67, 3, '1000 antigrasa 30 * 40 rosa', 4270.00, '2026-03-23 00:00:00', '2026-04-04', 0, 'OFFSET', 2135.00, 1000, 'EXPEDICION', 1, 'Agraciada S/N. Esq. Machado Ribas.', NULL, 'Sarndi Grande Florida'),
(111, 68, 3, '2000 antigrasa 30 x 40 color cafeteria amelia\r\n1000 stikers Pantone k', 7607.00, '2026-03-23 00:00:00', '2026-03-27', 0, 'OFFSET', 3803.00, 3000, 'EXPEDICION', 0, 'Bulevar Artigas 1412 entre tacuarembo y Av. Salto ', NULL, ''),
(112, 69, 3, 'Papel antigrasa 30 x 40, 1000\r\n\r\nPapel antigrasa 32 x 32 1500\r\nPapel antigrasa 22 x22  1500\r\n', 11797.00, '2026-03-24 00:00:00', '2026-03-31', 0, 'OFFSET', 5898.00, 4000, 'EXPEDICION', 0, 'Jaime Zudáñez 2733 esquina ellauri', NULL, 'RUT 219856500015'),
(113, 66, 3, '2000 antigrasa 30 x 40 Pantone k', 5807.00, '2026-03-24 00:00:00', '2026-04-01', 0, 'OFFSET', 2904.00, 2000, 'EXPEDICION', 0, ' PENZA 885', NULL, 'Trinidad Flores '),
(114, 29, 3, '12 Canguros azul a una tinta  \r\n11talles M \r\n1 XXL', 11280.00, '2026-03-27 00:00:00', '2026-04-04', 0, 'SERIGRAFIA', 0.00, 12, 'EN_PRODUCCION', 0, 'levanta taller Jorge', NULL, 'levanta taller Jorge'),
(115, 38, 3, '2000 antigrasa 30 x 40 Pantone k', 5807.00, '2026-03-26 00:00:00', '2026-04-04', 0, 'OFFSET', 0.00, 2000, 'EXPEDICION', 0, 'Sarandí 351 esquina Alzaibar. Monevideo', NULL, 'Sarandí 351 esquina Alzaibar. Monevideo'),
(116, 70, 3, '1000 Bandejas tipo 1 \r\nPantone 072 c blue\r\n(Referencia A la Pan)', 6690.00, '2026-03-26 00:00:00', '2026-04-04', 0, 'OFFSET', 3345.00, 1000, 'EXPEDICION', 0, 'Diagonal Perú m354 s27 entre 18 julio y 25 Mayo', NULL, 'Enviar por Mirtrans'),
(117, 21, 3, '5000 antigrasa 30 x 40 5000 antigrasa 30*30 lisos', 11364.00, '2026-03-27 00:00:00', '2026-04-03', 0, 'OFFSET', 0.00, 10000, 'EN_PRODUCCION', NULL, 'Santa Fe 1222', NULL, 'Santa fe 1222'),
(118, 17, 3, '2000 antigrasa 30 x 40 Pantone 032', 5807.00, '2026-03-30 00:00:00', '2026-04-03', 0, 'OFFSET', 2903.00, 2000, 'EXPEDICION', 0, 'Don Bosco 973 Viv 55 Mercedes Soriano', NULL, ''),
(119, 17, 3, '2000 antigrasa 30 x 40 amarillo', 5807.00, '2026-03-30 00:00:00', '2026-04-04', 0, 'OFFSET', 2903.00, 2000, 'EN_PRODUCCION', NULL, 'Maldonado 1354 esq ejido local rojo y amarillo', NULL, 'Montevideo\r\nDe 10 hs en adelante hasta las 17 hs aprox '),
(120, 12, 3, '2500 antigrasa 30 x 40\r\n500 sulfito 30 x 40\r\n1000 stikers 5 cm diametro\r\ntodo pantone k', 9327.00, '2026-03-31 00:00:00', '2026-04-03', 0, 'OFFSET', 0.00, 4000, 'EXPEDICION', 0, 'Fray Bentos Rio negro', NULL, ''),
(121, 71, 3, '3000 antigrasa de 35*25 ', 7526.99, '2026-04-01 00:00:00', '2026-04-11', 0, 'OFFSET', 3763.00, 3000, 'EXPEDICION', NULL, 'Maldonado ', NULL, 'Retira en agencia'),
(122, 72, 3, '3000 antigrasa 30 x 40 color Naranja', 7527.00, '2026-04-08 00:00:00', '2026-04-15', 0, 'OFFSET', 3764.00, 3000, 'EXPEDICION', NULL, ' Manuel Melendez esq. Andrés Areguatí. 099960331 ciudad Treinta y Tres', NULL, 'Trailer en boca de todos'),
(123, 70, 3, '6 remeras 1 tinta 6 gorros 1 tinta', 4680.00, '2026-04-09 00:00:00', '2026-04-14', 0, 'SERIGRAFIA', 4680.00, 12, 'EN_PRODUCCION', NULL, ' diagonal Perú m354 s27 entre 18 julio y 25 mayo Balneareo San Juis Canelones', NULL, 'enviar por mirtrans'),
(124, 73, 3, '2000 antigrasa 30 x 40\r\nNaranja amarronado\r\n', 5807.00, '2026-04-13 00:00:00', '2026-04-17', 0, 'OFFSET', 2803.00, 2000, 'EXPEDICION', 0, 'Costa RicaM246 s17 esq Costanera y Naciones Unidas ', NULL, 'Levanta Taller'),
(125, 3, 3, '2000 antigrasa 30 x 40 \r\nPantone k\r\ndiseño ya generado', 5807.00, '2026-04-13 00:00:00', '2026-04-18', 0, 'OFFSET', 0.00, 1998, 'EXPEDICION', NULL, 'Paysandú', NULL, 'Levanta Agencia'),
(126, 63, 3, '1000 Bandejas tipo 2 obaladas\r\nPantone k', 6690.00, '2026-04-15 00:00:00', '2026-04-24', 0, 'OFFSET', 6690.00, 1000, 'EN_PRODUCCION', NULL, 'enviar a Paysandù ', NULL, 'Levanta en agencia'),
(127, 6, 3, '2000 antigrasa pantone k\r\n30 x 40', 5807.00, '2026-04-16 00:00:00', '2026-04-23', 0, 'OFFSET', 0.00, 2000, 'EN_PRODUCCION', NULL, 'Young Paisandù', NULL, 'Levanta agencia \r\nla Nave'),
(128, 74, 3, '1000 Antigrasa 20 x15\r\nPantone K', 6051.00, '2026-04-10 00:00:00', '2026-04-17', 0, 'OFFSET', 3025.00, 10000, 'EXPEDICION', 0, 'COLON 607 Melo Cerro Largo', NULL, 'La Nave'),
(129, 14, 3, '1000  antigrasa Pantone k \r\n30 x 30', 4270.00, '2026-04-16 00:00:00', '2026-04-21', 0, 'OFFSET', -0.01, 1000, 'EN_PRODUCCION', NULL, 'Venancio Benavidez 3417 - Prado', NULL, 'box'),
(130, 1, 1, '', 123.00, '2026-04-18 00:00:00', '2026-04-18', 0, 'DISEÑO', 0.00, 0, 'INGRESADA', NULL, 'santa fe 1222 montevideo', NULL, ''),
(131, 1, 1, 'Pedido Web #3: 1x Prueba 2', 20.00, '2026-04-19 00:00:00', NULL, 0, 'DISEÑO', NULL, NULL, 'INGRESADA', NULL, 'Guayabos 137 ', NULL, 'Envío por: Dac. Notas: '),
(132, 75, 3, '4000 antigrasa 30*40 \r\ncolor logo\r\n', 9394.00, '2026-04-22 00:00:00', '2026-04-29', 0, 'OFFSET', 4700.00, 4000, 'INGRESADA', 0, 'Flores 810 Esq. Av.Italia y ecuador San Jose', NULL, 'San Jose \r\npor la Nave'),
(133, 37, 3, '4000 antigrasa 20*30', 5807.00, '2026-04-22 00:00:00', '2026-04-29', 0, 'DISEÑO', 0.00, 4000, 'INGRESADA', NULL, 'Pan de azucar 2532', NULL, 'Montevideo\r\npor box'),
(134, 76, 3, '4000 antigrasa 20*35\r\nPantone k', 5807.00, '2026-04-15 00:00:00', '2026-04-23', 0, 'OFFSET', 2903.00, 4000, 'INGRESADA', 0, 'Estero Bellaco 2835, a la vuelta de la Universidad Católica', NULL, 'Montevideo'),
(135, 77, 3, '2000 antigrasa 30*40\r\nPantone k\r\n2000 sulfito 50*55 liso', 10257.00, '2026-04-21 00:00:00', '2026-04-29', 0, 'OFFSET', 10257.00, 4000, 'INGRESADA', 0, 'boulevard Cardona casi mendiondo', NULL, 'Carrito Boulevar Cardona Soriano');

-- --------------------------------------------------------

--
-- Table structure for table `sectores`
--

CREATE TABLE `sectores` (
  `id` int(11) NOT NULL,
  `id_usr` int(11) NOT NULL,
  `ventas` tinyint(1) DEFAULT 0,
  `serigrafia` tinyint(1) DEFAULT 0,
  `offset` tinyint(1) DEFAULT 0,
  `expedicion` tinyint(1) DEFAULT 0,
  `diseño` tinyint(1) DEFAULT NULL,
  `administracion` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sectores`
--

INSERT INTO `sectores` (`id`, `id_usr`, `ventas`, `serigrafia`, `offset`, `expedicion`, `diseño`, `administracion`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1),
(3, 3, 1, 0, 0, 0, 0, 0),
(4, 4, 0, 1, 0, 1, 0, 0),
(5, 5, 0, 0, 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `contrasenia`, `rol`) VALUES
(1, 'Mauro Carnelli', '$2y$10$qTJGrN2iSfVJAGiVMq5no.vVotoZowAHqYZ1zlm063cBsoP.fCOhS', 'Administrador'),
(3, 'Jorge Martínez', '$2y$10$aCO37at9CK4XMEKxIytMn.bB02hkTSnXn40QgWYh029jmCTOmhOP2', 'Usuario'),
(4, 'Sol Sugo', '$2y$10$Zs5m8rGyQGFsiiDhpulolOZZbi8TrEeW4apoJ3bC71vOpEoTmRT0u', 'Usuario'),
(5, 'Sebastian', '$2y$10$5BC0lmcW7XcqgS8fSxuZ9e0tH8DDS1cOKUHT5RyoVPvrc9XO7A7/K', 'Usuario');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_archivos_orden` (`id_orden`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `configuracion_sistema`
--
ALTER TABLE `configuracion_sistema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detalle_diseño`
--
ALTER TABLE `detalle_diseño`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orden_diseno` (`id_orden`),
  ADD KEY `fk_disenador` (`id_diseñador`);

--
-- Indexes for table `detalle_expedicion`
--
ALTER TABLE `detalle_expedicion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_detalle_expedicion_orden` (`id_orden`);

--
-- Indexes for table `detalle_produccion`
--
ALTER TABLE `detalle_produccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_detalle_produccion_orden` (`id_orden`);

--
-- Indexes for table `historial_movimientos`
--
ALTER TABLE `historial_movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hm_orden` (`id_orden`),
  ADD KEY `fk_hm_usuario` (`id_usuario`);

--
-- Indexes for table `ordenes_trabajo`
--
ALTER TABLE `ordenes_trabajo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ot_cliente` (`id_cliente`),
  ADD KEY `fk_ot_vendedor` (`id_vendedor`);

--
-- Indexes for table `sectores`
--
ALTER TABLE `sectores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sectores_usuario` (`id_usr`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `configuracion_sistema`
--
ALTER TABLE `configuracion_sistema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `detalle_diseño`
--
ALTER TABLE `detalle_diseño`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `detalle_expedicion`
--
ALTER TABLE `detalle_expedicion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `detalle_produccion`
--
ALTER TABLE `detalle_produccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `historial_movimientos`
--
ALTER TABLE `historial_movimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=568;

--
-- AUTO_INCREMENT for table `ordenes_trabajo`
--
ALTER TABLE `ordenes_trabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `sectores`
--
ALTER TABLE `sectores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `fk_archivos_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes_trabajo` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `detalle_diseño`
--
ALTER TABLE `detalle_diseño`
  ADD CONSTRAINT `fk_disenador` FOREIGN KEY (`id_diseñador`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_orden_diseno` FOREIGN KEY (`id_orden`) REFERENCES `ordenes_trabajo` (`id`);

--
-- Constraints for table `detalle_expedicion`
--
ALTER TABLE `detalle_expedicion`
  ADD CONSTRAINT `fk_detalle_expedicion_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes_trabajo` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `detalle_produccion`
--
ALTER TABLE `detalle_produccion`
  ADD CONSTRAINT `fk_detalle_produccion_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes_trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `historial_movimientos`
--
ALTER TABLE `historial_movimientos`
  ADD CONSTRAINT `fk_hm_orden` FOREIGN KEY (`id_orden`) REFERENCES `ordenes_trabajo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_hm_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `ordenes_trabajo`
--
ALTER TABLE `ordenes_trabajo`
  ADD CONSTRAINT `fk_ot_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `fk_ot_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `sectores`
--
ALTER TABLE `sectores`
  ADD CONSTRAINT `fk_sectores_usuario` FOREIGN KEY (`id_usr`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
