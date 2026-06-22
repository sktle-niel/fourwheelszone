-- ============================================================
--  Four Wheels Zone — reviews database
--  Import this in phpMyAdmin (Import tab) to create everything.
--  It creates the database, the `reviews` table, and seed rows.
-- ============================================================

CREATE DATABASE IF NOT EXISTS `fourwheelszone`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `fourwheelszone`;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(80)  NOT NULL,
  `vehicle`    VARCHAR(80)  DEFAULT NULL,
  `rating`     TINYINT UNSIGNED NOT NULL,
  `comment`    TEXT         NOT NULL,
  `status`     ENUM('approved','pending','hidden') NOT NULL DEFAULT 'approved',
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status_created` (`status`, `created_at`),
  CONSTRAINT `chk_rating` CHECK (`rating` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed reviews (only inserted when the table is empty)
INSERT INTO `reviews` (`name`, `vehicle`, `rating`, `comment`)
SELECT * FROM (
  SELECT 'Mark Anthony Reyes' AS name, 'Toyota Hilux' AS vehicle, 5 AS rating,
         'Brought my Hilux in for brakes and a PMS. Finished the same day, fair price, and they walked me through every part they replaced.' AS comment
  UNION ALL SELECT 'Joanna Marie Cruz', 'Honda City', 5,
         'Aircon was barely cold. They traced the leak fast and fixed it properly. My City feels brand new on the road again.'
  UNION ALL SELECT 'Rodel Villanueva', 'Mitsubishi Montero Sport', 4,
         'Sorted a check-engine light that two other shops missed. Took a little longer than promised, but the fix has held for months.'
  UNION ALL SELECT 'Aileen Gabriel', 'Toyota Vios', 5,
         'Honest mechanics who will not upsell you. Oil change and tire rotation done in under an hour. This is now my go-to shop.'
  UNION ALL SELECT 'Jerome Santos', 'Ford Ranger', 5,
         'The suspension on my Ranger had been knocking for months. One visit and the ride is smooth and quiet again.'
  UNION ALL SELECT 'Christine Lim', 'Toyota Fortuner', 4,
         'Friendly team and clean work. I booked ahead and they kept to the schedule. Will be back for the next service.'
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM `reviews`);
