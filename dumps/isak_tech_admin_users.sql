-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: isak_tech_admin
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','postmaster@isak-tech.tk','$2a$04$Kgn9jRf6XZAdDu01.gNGgOKHSpDUqOhkodNAGtRkUlIHoAJDJK5zq','2021-02-24 05:00:02',0),(2,'isak','postmaster@isak-tech.tk','$2a$04$/jLGhw2WKCVJCX6P.YKJleHcWx0kbC2o/IECtZGFu3eM0xAUn8Y2W','2021-02-24 18:15:17',0),(3,'isakg','postmaster@isak-tech.tk','$2a$04$5K8D993smSpSCOCbvZ4hz.xJ/c6HEoxtXgnti/pQ5SgL4M8Qly4/2','2021-02-24 18:49:54',0),(4,'testaccount','postmaster@isak-tech.tk','$2a$04$MXdpDB7NyxEmNG3reLjg6euqybKBq8UQTpeK3jyfNQ.0jxdfBjir6','2021-02-24 18:56:36',0),(5,'admin123','postmaster@isak-tech.tk','$2a$04$KAomyzHe4rvPaK8R4y/UiubjE8IspLcxMoe7YTbhx9M18USI11r8m','2021-02-24 20:21:27',0),(6,'testabcdfg','postmaster@isak-tech.tk','$2a$04$L2NrJFwwnsSzo8P9kTFEBegZXy8qUbcVbeC2BIq1OTBzZNYx0gMR6','2021-02-24 20:39:58',0),(7,'cooluser123','postmaster@isak-tech.tk','$2a$04$vk7bFZHsc97j.BLe4PgXQ.XIFcY59oqXa8pLTUBj/wFIOxnNyCsGi','2021-02-25 04:49:49',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-03  7:05:50
