/*
  Warnings:

  - A unique constraint covering the columns `[idorder]` on the table `buy_order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `buy_order_idorder_key` ON `buy_order`(`idorder`);
