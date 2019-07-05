/*
 Navicat Premium Data Transfer

 Source Server         : MAMP-PRO
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : localhost:8889
 Source Schema         : vlog_dev

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : 65001

 Date: 03/07/2019 09:54:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for vlog_categories
-- ----------------------------
DROP TABLE IF EXISTS `vlog_categories`;
CREATE TABLE `vlog_categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `title` varchar(64) NOT NULL,
  `desc` varchar(1024) DEFAULT NULL,
  `icon_url` varchar(1024) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vlog_food_comments
-- ----------------------------
DROP TABLE IF EXISTS `vlog_food_comments`;
CREATE TABLE `vlog_food_comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `author_id` varchar(255) NOT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `content` varchar(1024) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `vlog_food_comments_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `vlog_users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `vlog_food_comments_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `vlog_foods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vlog_food_items
-- ----------------------------
DROP TABLE IF EXISTS `vlog_food_items`;
CREATE TABLE `vlog_food_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `title` varchar(64) NOT NULL,
  `desc` varchar(1024) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `vid` varchar(64) DEFAULT NULL,
  `video_url` varchar(1024) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `vlog_food_items_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `vlog_foods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vlog_foods
-- ----------------------------
DROP TABLE IF EXISTS `vlog_foods`;
CREATE TABLE `vlog_foods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `author_id` varchar(255) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `type` varchar(32) DEFAULT NULL,
  `tag` varchar(32) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(1024) DEFAULT NULL,
  `is_shared` tinyint(1) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `vlog_foods_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `vlog_users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `vlog_foods_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `vlog_categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vlog_trophies
-- ----------------------------
DROP TABLE IF EXISTS `vlog_trophies`;
CREATE TABLE `vlog_trophies` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `related_user_id` varchar(255) DEFAULT NULL,
  `related_food_id` bigint(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vlog_users
-- ----------------------------
DROP TABLE IF EXISTS `vlog_users`;
CREATE TABLE `vlog_users` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `avatar_url` varchar(1024) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `gender` int(255) DEFAULT NULL,
  `language` varchar(32) DEFAULT NULL,
  `country` varchar(32) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `province` varchar(64) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
