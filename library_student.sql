-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `admno` int NOT NULL,
  `branch` varchar(20) DEFAULT NULL,
  `phno` int DEFAULT NULL,
  PRIMARY KEY (`admno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('Amritha','s',3601,'computer science',789456123),('Arun','madhav',3602,'computer science',789456100),('barath','chandran',3603,'computer science',754756100),('chris','belmond',3604,'computer science',987756100),('david','harbour',3605,'computer science',987722100),('harinder','singh',3606,'computer science',987732100),('lekshmi','dev',3607,'computer science',884832100),('sneha','simon',3608,'computer science',987452163),('senalda','jaison',3609,'computer science',987452130),('ashok','raj',4601,'EC',910452163),('ashok','raj',4602,'EC',910452163),('riya','somani',4603,'EC',701295216),('madhav','jha',4604,'EC',701298946),('mouni','roy',4605,'EC',701298000),('ram','gopal',4606,'EC',952698000),('adithya','verma',4607,'EC',952818000),('amir','khan',4608,'EC',952818123),('farah','firoz',4609,'EC',821818123),('kartik','tiwari',5600,'EEE',813787569),('anand','nair',5601,'EEE',940787569),('roopa','rajesh',5602,'EEE',940787500),('rahul','ram',5603,'EEE',798787500),('jai','shankar',5604,'EEE',940087500),('varun','kumar',5605,'EEE',940087537),('fiza','m.k',5606,'EEE',940050537),('khushi','k',5607,'EEE',940052437),('rani','rajkumar',5608,'EEE',701252437),('adam','john',5609,'EEE',885892437),('steve','harrington',6001,'artificial eng',911478563),('jane','hopper',6002,'artificial eng',897478563),('meera','krishnamurthy',6003,'artificial eng',897475063),('rahana','azad',6004,'artificial eng',803475063);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-25 20:51:30
