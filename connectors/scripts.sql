
create table if not exists "inventory_system"."Session"
(
    "id" serial primary key,
    "userID" integer not null,
    "token" text not null,
    "expiresAt" timestamp not null
);
-- Create Categories Table
CREATE TABLE IF NOT EXISTS "inventory_system"."Categories" (
    "categoryID" SERIAL PRIMARY KEY,
    "categoryName" TEXT NOT NULL
);

-- Create Suppliers Table
CREATE TABLE IF NOT EXISTS "inventory_system"."Suppliers" (
    "supplierID" SERIAL PRIMARY KEY,
    "supplierName" TEXT NOT NULL,
    "contactInfo" TEXT,
    "address" TEXT
);

-- Create Users Table
CREATE TABLE IF NOT EXISTS "inventory_system"."Users" (
    "userID" SERIAL PRIMARY KEY,
    "username" TEXT UNIQUE NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL CHECK ("role" IN ('admin', 'standard user')),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Equipments Table with Cascading Foreign Keys
CREATE TABLE IF NOT EXISTS "inventory_system"."Equipments" (
    "equipmentID" SERIAL PRIMARY KEY,
    "equipmentName" TEXT NOT NULL,
    "equipmentImg" BYTEA,  
    "rating" INTEGER NOT NULL DEFAULT 5,
    "modelNumber" TEXT,
    "purchaseDate" DATE DEFAULT CURRENT_DATE,
    "quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL CHECK ("status" IN ('Available', 'InUse', 'UnderMaintenance')),
    "location" TEXT,
    "categoryID" INTEGER REFERENCES "inventory_system"."Categories"("categoryID") ON DELETE CASCADE ON UPDATE CASCADE,
    "supplierID" INTEGER REFERENCES "inventory_system"."Suppliers"("supplierID") ON DELETE CASCADE ON UPDATE CASCADE,
    "price" INTEGER NOT NULL DEFAULT 0
);

-- Create Orders Table with Cascading Foreign Key
CREATE TABLE IF NOT EXISTS "inventory_system"."Orders" (
    "orderID" SERIAL PRIMARY KEY,
    "userID" INTEGER REFERENCES "inventory_system"."Users"("userID") ON DELETE CASCADE ON UPDATE CASCADE,
    "equipmentID" INTEGER REFERENCES "inventory_system"."Equipments"("equipmentID") ON DELETE CASCADE ON UPDATE CASCADE,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "orderDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cart Table with Cascading Foreign Keys
CREATE TABLE IF NOT EXISTS "inventory_system"."Cart" (
    "cartID" SERIAL PRIMARY KEY,
    "userID" INTEGER REFERENCES "inventory_system"."Users"("userID") ON DELETE CASCADE ON UPDATE CASCADE,
    "equipmentID" INTEGER REFERENCES "inventory_system"."Equipments"("equipmentID") ON DELETE CASCADE ON UPDATE CASCADE,
    "quantity" INTEGER NOT NULL,   
    "grandTotal" INTEGER NOT NULL
);

-- Create Rating Table with Cascading Foreign Keys
CREATE TABLE IF NOT EXISTS "inventory_system"."Rating" (
    "ratingID" SERIAL PRIMARY KEY,
    "userID" INTEGER REFERENCES "inventory_system"."Users"("userID") ON DELETE CASCADE ON UPDATE CASCADE,
    "equipmentID" INTEGER REFERENCES "inventory_system"."Equipments"("equipmentID") ON DELETE CASCADE ON UPDATE CASCADE,
    "comment" TEXT,
    "score" INTEGER NOT NULL
);

-- Create EquipmentOrder Table with Cascading Foreign Keys
CREATE TABLE IF NOT EXISTS "inventory_system"."EquipmentOrder" (
    "orderID" INTEGER REFERENCES "inventory_system"."Orders"("orderID") ON DELETE CASCADE ON UPDATE CASCADE,
    "equipmentID" INTEGER REFERENCES "inventory_system"."Equipments"("equipmentID") ON DELETE CASCADE ON UPDATE CASCADE,
    "quantity" INTEGER NOT NULL,
    PRIMARY KEY ("orderID", "equipmentID")
);


