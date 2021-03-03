-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: isak_tech_paste
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
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(45) NOT NULL,
  `postid` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Dummy Text',1),(2,'Placeholder Text',1),(3,'Dump',0),(4,'Password File',0),(5,'Crap',0),(6,'Dump',0),(7,'Password File',0),(8,'Crap',0),(9,'Dump',0),(10,'Password File',0),(11,'Crap',0),(12,'Dump',2),(13,'Password File',2),(14,'Crap',2),(15,'qwtqwtqwt215',3),(16,'qwtqwt',4),(17,'Corn',4),(18,'Wheat',4),(19,'Flour',4),(20,'Seeds',4),(21,'Grass',4),(22,'Stuff',4),(23,'Twitch',5),(24,'Stream',5),(25,'Video',5),(26,'Youtube',5),(27,'Gambling',5),(28,'qwtqwtqwt215',6),(29,'abcdfg',6),(30,'wwww',6),(31,'test',6),(32,'abc',6),(33,'TV SHOW',7),(34,'FUN',7),(35,'Heheee',7),(36,'TV SHOW',8),(37,'FUN',8),(38,'Heheee',8),(39,'Animals',9),(40,'Funny',9),(41,'Hilarious',9),(42,'Animals',10),(43,'Funny',10),(44,'Hilarious',10),(45,'Animals',11),(46,'Funny',11),(47,'Hilarious',11),(48,'Animals',12),(49,'Funny',12),(50,'Hilarious',12),(51,'Animals',13),(52,'Funny',13),(53,'Hilarious',13),(54,'Animals',14),(55,'Funny',14),(56,'Hilarious',14),(57,'Animals',15),(58,'Funny',15),(59,'Hilarious',15),(60,'Animals',16),(61,'Funny',16),(62,'Hilarious',16),(63,'Animals',17),(64,'Funny',17),(65,'Hilarious',17),(66,'Animals',18),(67,'Funny',18),(68,'Hilarious',18),(69,'Animals',19),(70,'Funny',19),(71,'Hilarious',19),(72,'Animals',20),(73,'Funny',20),(74,'Hilarious',20),(75,'Animals',21),(76,'Funny',21),(77,'Hilarious',21),(78,'Animals',22),(79,'Funny',22),(80,'Hilarious',22),(81,'Animals',23),(82,'Funny',23),(83,'Hilarious',23),(84,'Animals',24),(85,'Funny',24),(86,'Hilarious',24),(87,'Animals',25),(88,'Funny',25),(89,'Hilarious',25),(90,'Animals',26),(91,'Funny',26),(92,'Hilarious',26),(93,'Animals',27),(94,'Funny',27),(95,'Hilarious',27),(96,'Animals',28),(97,'Funny',28),(98,'Hilarious',28),(99,'Animals',29),(100,'Funny',29),(101,'Hilarious',29),(102,'Animals',30),(103,'Funny',30),(104,'Hilarious',30),(105,'Animals',31),(106,'Funny',31),(107,'Hilarious',31),(108,'Animals',32),(109,'Funny',32),(110,'Hilarious',32),(111,'Animals',33),(112,'Funny',33),(113,'Hilarious',33),(114,'Animals',34),(115,'Funny',34),(116,'Hilarious',34),(117,'Animals',35),(118,'Funny',35),(119,'Hilarious',35),(120,'Animals',36),(121,'Funny',36),(122,'Hilarious',36),(123,'Animals',37),(124,'Funny',37),(125,'Hilarious',37),(126,'Animals',38),(127,'Funny',38),(128,'Hilarious',38),(129,'Animals',39),(130,'Funny',39),(131,'Hilarious',39),(132,'Animals',40),(133,'Funny',40),(134,'Hilarious',40),(135,'Animals',41),(136,'Funny',41),(137,'Hilarious',41),(138,'Animals',42),(139,'Funny',42),(140,'Hilarious',42),(141,'Animals',43),(142,'Funny',43),(143,'Hilarious',43),(144,'Cat',44),(145,'Cow',44),(146,'Pet',44),(147,'Cake',45),(148,'Delicious',45),(149,'Cake',45),(150,'Pizza',45),(151,'Hotdog',45);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
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
