SELECT `user_logins`.`id`, `user_loguser_loginsins`.`role_id`, `user`.`id` AS `user.id`, `user`.`namaLengkap` AS `user.namaLengkap`, `user`.`nickname` AS `user.nickname`, `user`.`username` AS `user.username`, `user`.`email` AS `user.email`, `user`.`nomorTelepon` AS `user.nomorTelepon`, `user`.`tanggalLahir` AS `user.tanggalLahir`, `user`.`status` AS `user.status`, `user`.`photo` AS `user.photo`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt` FROM `user_logins` AS `user_logins` INNER JOIN `users` AS `user` ON `user_logins`.`username` = `user`.`username` WHERE `user_logins`.`username` = 'hendry2' AND `user_logins`.`typeLogin` = 'manual' LIMIT 1user_logins