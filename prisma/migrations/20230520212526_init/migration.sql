-- CreateTable
CREATE TABLE `buy_order` (
    `idorder` INTEGER NOT NULL AUTO_INCREMENT,
    `adress` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NULL,
    `user_iduser` INTEGER NOT NULL,
    `car_idcar` INTEGER NOT NULL,

    INDEX `fk_buy_order_car1_idx`(`car_idcar`),
    INDEX `fk_buy_order_user1_idx`(`user_iduser`),
    PRIMARY KEY (`idorder`, `user_iduser`, `car_idcar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car` (
    `idcar` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(255) NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NULL,

    PRIMARY KEY (`idcar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `role` VARCHAR(45) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `buy_order` ADD CONSTRAINT `fk_buy_order_car1` FOREIGN KEY (`car_idcar`) REFERENCES `car`(`idcar`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `buy_order` ADD CONSTRAINT `fk_buy_order_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
