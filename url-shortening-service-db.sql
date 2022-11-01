SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+03:00";

CREATE TABLE `urlRedirects` (
  `id` int(11) NOT NULL,
  `urlRedirect` varchar(256) NOT NULL,
  `binCode` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `urlRedirects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `binCode` (`binCode`);

ALTER TABLE `urlRedirects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;