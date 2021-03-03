-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: isak_tech_portal
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `href` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `thumbnail` varchar(500) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'https://isak-tech.tk','Personal site for promoting my services','https://portal.isak-tech.tk/public/images/isaktech.png','2021-02-26 21:11:42'),(2,'https://paste.isak-tech.tk','Paste whatever you\'d like and grab it later','https://portal.isak-tech.tk/public/images/paste.png','2021-02-26 21:13:08'),(3,'https://mail.isak-tech.tk','my personal mail server','https://portal.isak-tech.tk/public/images/email.png','2021-02-26 21:14:28'),(4,'https://www.shapedivider.app/','Create cool and awesome backgrounds','https://portal.isak-tech.tk/public/images/bgcreator.png','2021-02-26 21:14:38'),(5,'https://www.cssmatic.com/box-shadow','Experiment with the box shadow property','https://portal.isak-tech.tk/public/images/boxshadow.png','2021-02-26 21:14:54'),(6,'https://tailwindcss.com/docs','New interesting UI library','https://portal.isak-tech.tk/public/images/tw.png','2021-02-26 21:15:03'),(7,'https://michalsnik.github.io/aos/','An awesome animation library','https://portal.isak-tech.tk/public/images/aos.png','2021-02-26 21:15:09'),(8,'https://www.iloveimg.com/','A solid image compressor','https://portal.isak-tech.tk/public/images/imgcompress.png','2021-02-26 21:15:17'),(9,'https://autoprefixer.github.io/','Vendor Prefixer CSS/SCSS','https://portal.isak-tech.tk/public/images/vendorprefix.png','2021-02-26 21:15:28'),(18,'https://obfuscator.io/','Make JavaScript Code Almost Unreadable','https://i.ibb.co/yPgMkkB/ee.png','2021-02-28 05:01:36'),(19,'https://imgbb.com/','Free Image Hosting Solution','https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','2021-02-28 05:02:56'),(20,'https://www.iloveimg.com/compress-image/compress-png','Compress Images','https://www.winzip.com/static/images/seo/image-compression.png','2021-02-28 05:05:07'),(21,'https://www.freelogodesign.org/','Create A Free Website Logo','https://cdn.mos.cms.futurecdn.net/2LDXhWbsWQ3VWreWPsrahn.jpg','2021-02-28 05:52:54');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-03  7:05:51
