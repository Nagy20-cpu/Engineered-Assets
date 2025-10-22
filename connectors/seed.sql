INSERT INTO "inventory_system"."Categories" ("categoryName") VALUES
('Mechanical Equipment'),
('Pharmacy Equipment'),
('Hospital Equipment'),
('Laboratory Tools'),
('Construction Equipment'),
('Medical Supplies');

INSERT INTO "inventory_system"."Suppliers" ("supplierName", "contactInfo", "address") VALUES
('MechPro Tools', 'mechpro@example.com, +1 800 555 0101', '123 Mechanical Dr, Houston, TX'),
('PharmaWorld', 'pharmaworld@example.com, +1 800 555 0202', '456 Pharma St, Boston, MA'),
('Hospital Essentials', 'hospitalessentials@example.com, +1 800 555 0303', '789 Health Ave, Seattle, WA'),
('LabCorp Supplies', 'labcorp@example.com, +1 800 555 0404', '321 Lab Lane, Chicago, IL'),
('BuildStrong Co.', 'buildstrong@example.com, +1 800 555 0505', '654 Construct Blvd, Phoenix, AZ'),
('MediCare Supply Depot', 'medicare@example.com, +1 800 555 0606', '987 Medical Way, Atlanta, GA');

INSERT INTO "inventory_system"."Users" ("username", "email", "password", "role")
VALUES 
('adminUser', 'admin@example.com', '123', 'admin'),
('johnDoe', 'john@example.com', '123', 'standard user');

INSERT INTO "inventory_system"."Equipments" ("equipmentName", "equipmentImg", "rating", "modelNumber", "purchaseDate", "quantity", "status", "location", "categoryID", "supplierID", "price") VALUES
('Lathe Machine', 'https://www.shitalmachines.com/img/product-compress/Medium-Duty-Lathe-11zon.webp', 5, 'LATHE123', '2024-01-10', 4, 'Available', 'Workshop A', 1, 1, 5000),
('Hydraulic Press', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkodiHiaBXTHPGbPDaHP_LYoY-RrhRf1Zp-Q&s', 5, 'HP456', '2023-11-15', 3, 'UnderMaintenance', 'Workshop B', 1, 1, 12000),
('CNC Milling Machine', 'https://4.imimg.com/data4/EJ/BH/MY-705452/cnc-milling-machine.jpg', 4, 'CNC789', '2023-10-22', 2, 'InUse', 'Workshop A', 1, 1, 20000),
('Welding Machine', 'https://m.media-amazon.com/images/I/71psYPsFjWL._AC_SL1500_.jpg', 5, 'WELD101', '2023-12-05', 10, 'Available', 'Workshop B', 1, 1, 3000),
('Drill Press', 'https://m.media-amazon.com/images/I/713-kkZmrNL._AC_SL1500_.jpg', 4, 'DRILL202', '2024-01-15', 8, 'Available', 'Workshop A', 1, 1, 2500),
('Gear Shaper', 'https://gmmachinery.com/wp-content/uploads/2024/04/MAXICUT-3A-Gear-Shaper-with-Spur-Helical-Guides.-6-Riser-Change-Gears-1.jpg', 5, 'GEAR303', '2023-11-20', 2, 'InUse', 'Workshop C', 1, 1, 15000),
('Bench Grinder', 'https://m.media-amazon.com/images/I/71vibkKxZNL.jpg', 4, 'GRIND404', '2023-10-30', 5, 'Available', 'Workshop D', 1, 1, 1200),
('Metal Shear', 'https://cdn5.grizzly.com/pics/jpeg2000/t/t32957-ec0698ed01ed4b43c78dedd4310f161d.jpg', 5, 'SHEAR505', '2023-11-10', 3, 'InUse', 'Workshop B', 1, 1, 10000),
('Plasma Cutter', 'https://m.media-amazon.com/images/I/71hIZPHFJ0L._AC_SL1500_.jpg', 5, 'PLAS606', '2024-02-01', 4, 'Available', 'Workshop E', 1, 1, 6000),
('Grinding Machine', 'https://cdn-iladddd.nitrocdn.com/wRmszbQUAUIbCSBECUlJIeTOFPXAFlOY/assets/images/optimized/rev-9c4d6e4/phillipscorp.com/india/wp-content/uploads/sites/3/2024/09/grind1-Photoroom.png', 4, 'GRIND707', '2023-09-15', 3, 'Available', 'Workshop F', 1, 1, 3500),
('Bandsaw Machine', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiy4zaSXJB2Va1VVQ344pvIA4teBhLkwo5dA&s', 5, 'BAND808', '2023-11-05', 6, 'InUse', 'Workshop G', 1, 1, 8000),
('Heat Treatment Furnace', 'https://www.ramsell-naber.co.uk/sites/default/files/images/slideshow/lacvknc-heat-treatment-bogey-half-furnace.jpg', 5, 'FURN909', '2023-12-20', 2, 'Available', 'Workshop H', 1, 1, 25000);
INSERT INTO "inventory_system"."Equipments" ("equipmentName", "equipmentImg", "rating", "modelNumber", "purchaseDate", "quantity", "status", "location", "categoryID", "supplierID", "price") VALUES
('Pill Counting Machine', 'https://www.capsahealthcare.com/wp-content/uploads/2024/06/Alprazolam-30-of-30.Hero-Image-Combo-scaled-1.jpg', 5, 'PCM2024', '2024-02-01', 10, 'Available', 'Pharmacy A', 2, 2, 1500),
('Refrigerated Medicine Cabinet', 'https://s.alicdn.com/@sc04/kf/H81cbc48541354c0ea3825f025b523feag.jpg', 4, 'RMC3000', '2023-12-10', 5, 'InUse', 'Pharmacy Storage', 2, 2, 5000),
('Pharmaceutical Mixer', 'https://www.saintytec.com/wp-content/uploads/2017/04/HD-Multi-Directional-Motions-Mixer.jpg', 5, 'PMX2023', '2023-11-20', 2, 'Available', 'Pharmacy Lab', 2, 2, 8000),
('Tablet Coating Machine', 'https://www.saintytec.com/wp-content/uploads/2024/11/Technical-Specifications-of-Tablet-Coaters-.jpg', 4, 'TCOAT400', '2024-01-10', 3, 'InUse', 'Pharmacy B', 2, 2, 12000),
('Capsule Filler', 'https://m.media-amazon.com/images/I/71JcZDG835L.jpg', 5, 'CFILL500', '2023-10-30', 4, 'Available', 'Pharmacy C', 2, 2, 10000),
('Liquid Filling Machine', 'https://m.media-amazon.com/images/I/619W5Z+7gCL._SL1500_.jpg', 4, 'LFILL600', '2023-12-01', 6, 'InUse', 'Pharmacy Lab', 2, 2, 7500),
('Automatic Labeler', 'https://www.adr-shop.com/media/4140/catalog/lab510cof-automatic-labeler-for-coffee-pouches-w--valve-doypacks-1.jpg', 5, 'LABEL700', '2024-02-15', 5, 'Available', 'Pharmacy A', 2, 2, 4000),
('Blister Packaging Machine', 'https://sssindustrialdevelopment.com/wp-content/uploads/2023/12/kdb120-blister-packing-machine.jpg', 5, 'BLISTER800', '2023-11-10', 3, 'InUse', 'Pharmacy D', 2, 2, 14000),
('Pharma Dryer', 'https://lytzen.com/wp-content/uploads/2021/08/tray-dryer-with-tip-up-ramp-scaled.jpg', 5, 'DRY900', '2023-10-15', 2, 'Available', 'Pharmacy E', 2, 2, 18000),
('Granulation Machine', 'https://5.imimg.com/data5/SELLER/Default/2024/6/424918580/XQ/JM/VD/1167558/tablet-granulation-machine.jpg', 4, 'GRAN1000', '2023-12-25', 2, 'InUse', 'Pharmacy Lab', 2, 2, 16000),
('Weighing Scale', 'https://asiapacific.ohaus.com/getmedia/a7ab02b4-661f-4888-8717-45eb0b894712/Pioneer_Pharmacy_Semi-Micro_1_600x600', 5, 'SCALE1100', '2023-09-10', 20, 'Available', 'Pharmacy F', 2, 2, 500),
('Sterile Packaging Machine', 'https://cellar-c2.services.clever-cloud.com/sleever-machine-test/documents/e794ca1cfcadd69b4fadb091ae6ef312.png', 5, 'STERPACK1200', '2024-01-20', 3, 'Available', 'Pharmacy G', 2, 2, 9000);
INSERT INTO "inventory_system"."Equipments" ("equipmentName", "equipmentImg", "rating", "modelNumber", "purchaseDate", "quantity", "status", "location", "categoryID", "supplierID", "price") VALUES
('X-Ray Machine', 'https://c8.alamy.com/comp/2AFWEA7/modern-medical-room-with-automatic-x-ray-machine-and-couch-2AFWEA7.jpg', 5, 'XRAY500', '2024-01-25', 3, 'Available', 'Radiology Dept', 3, 3, 25000),
('MRI Scanner', 'https://marketing.webassets.siemens-healthineers.com/f3d0e73785a37ae8/3c839c3fdbc1/v/728a5e8b8e33/siemens-healthineers_MR_MAGNETOM-Viato.Mobile_teaser.jpg', 5, 'MRI2024', '2023-12-15', 1, 'InUse', 'Imaging Dept', 3, 3, 100000),
('Patient Monitor', 'https://m.media-amazon.com/images/I/81a8KdgRfnL.jpg', 4, 'PMON123', '2024-02-05', 15, 'Available', 'ICU', 3, 3, 2000),
('Ultrasound Machine', 'https://5.imimg.com/data5/SELLER/Default/2022/8/BB/XG/RJ/50732130/shutterstock-561061939-scaled.jpg', 5, 'USM500', '2023-10-20', 8, 'Available', 'Radiology', 3, 3, 15000),
('ECG Machine', 'https://getwellue.com/cdn/shop/products/3_07123a73-ef02-4f63-bc19-e130ffaa164d_1000x.jpg?v=1679997926', 4, 'ECG200', '2023-09-30', 12, 'InUse', 'Cardiology', 3, 3, 5000),
('Ventilator', 'https://upload.wikimedia.org/wikipedia/commons/3/31/Servo_I_Ventilator.jpg', 5, 'VENT400', '2024-02-10', 6, 'InUse', 'ICU', 3, 3, 7000),
('Infusion Pump', 'https://maxwellcart.com/cdn/shop/products/HK-400_Side_1200x1200.jpg?v=1591101212', 4, 'INF500', '2023-12-05', 8, 'Available', 'Wards', 3, 3, 2500),
('Anesthesia Machine', 'https://www.penlon.com/app/uploads/2024/02/Prima_460-BG-1920px.png', 5, 'ANES600', '2023-11-15', 4, 'Available', 'Surgery', 3, 3, 12000),
('Operating Table', 'https://www.merivaara.com/wp-content/uploads/2023/05/Scandia-Prime-operating-table.jpg', 5, 'OTABLE700', '2024-01-30', 5, 'InUse', 'Surgery', 3, 3, 10000),
('Surgical Light', 'https://storage.googleapis.com/avante/images/WhSk5cQOQzySt7Eqwq10I80Sz7C8RjsSZQcq8nfm.jpeg', 5, 'SLIGHT800', '2023-10-25', 6, 'Available', 'Operating Room', 3, 3, 4000),
('Oxygen Concentrator', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAShYJvxRW321yUHduEKBzI5JzPGlk5GKxzQ&s', 5, 'OXYGEN900', '2023-12-20', 20, 'Available', 'ICU', 3, 3, 1800);
INSERT INTO "inventory_system"."Equipments" ("equipmentName", "equipmentImg", "rating", "modelNumber", "purchaseDate", "quantity", "status", "location", "categoryID", "supplierID", "price") VALUES
('Microscope', 'https://cdn.britannica.com/50/114750-050-06EEB5F0/compound-microscope.jpg', 5, 'MICRO123', '2023-11-01', 10, 'Available', 'Lab A', 4, 4, 1500),
('Centrifuge Machine', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDbYw8rzjJJBxQEbqGV0YEF9z3gFol9uvYg&s', 5, 'CENT456', '2023-10-15', 4, 'InUse', 'Lab B', 4, 4, 5000),
('Spectrophotometer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw76xG5W_DQkXZh8RynjfYSZILvjmqgOSHYw&s', 4, 'SPEC789', '2023-12-05', 2, 'Available', 'Lab C', 4, 4, 8000),
('Lab Incubator', 'https://m.media-amazon.com/images/I/61xsQBpjLOL._SL1500_.jpg', 5, 'INC101', '2023-11-25', 3, 'InUse', 'Lab A', 4, 4, 3500),
('Autoclave', 'https://s3.eu-west-1.amazonaws.com/drive.dentacarts.com/public/product_image/8234/823463.jpg', 4, 'AUTO303', '2023-12-15', 3, 'Available', 'Lab A', 4, 4, 4000),
('pH Meter', 'https://images-cdn.ubuy.co.id/651f0b0148a8e72b8c215fee-ph-meter-digital-ph-meter-for-water.jpg', 5, 'PH404', '2023-09-20', 10, 'InUse', 'Lab C', 4, 4, 500),
('Water Bath', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKKZEQX8Zkvy-5HME0BfNO_oaFZB6-4A9Dw&s', 4, 'WB505', '2024-02-01', 4, 'Available', 'Lab D', 4, 4, 2000),
('Vacuum Pump', 'https://www.ubuy.com.eg/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFHWE5ldmJ4OEwuX0FDX1NMMTUwMF8uanBn.jpg', 5, 'VP707', '2023-12-25', 3, 'Available', 'Lab F', 4, 4, 3500),
('Bunsen Burner', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Mechero_Bunsen.jpg/1200px-Mechero_Bunsen.jpg', 5, 'BURN808', '2023-11-05', 15, 'Available', 'Lab G', 4, 4, 50),
('Laboratory Oven', 'https://www.teurprogroup.com/wp-content/uploads/2024/03/G030_03.jpg', 5, 'OVEN909', '2024-01-15', 2, 'InUse', 'Lab H', 4, 4, 2500);
INSERT INTO "inventory_system"."Equipments" ("equipmentName", "equipmentImg", "rating", "modelNumber", "purchaseDate", "quantity", "status", "location", "categoryID", "supplierID", "price") VALUES
('Excavator', 'https://s7d2.scene7.com/is/image/Caterpillar/CM20180212-37556-05525', 5, 'EXC123', '2023-10-20', 3, 'Available', 'Site A', 5, 5, 75000),
('Tower Crane', 'https://m.media-amazon.com/images/I/71nsOUuJzXL.jpg', 4, 'CRANE789', '2024-01-05', 1, 'Available', 'Site C', 5, 5, 150000),
('Concrete Mixer', 'https://m.media-amazon.com/images/I/61MEKxYaC1L._AC_SL1500_.jpg', 5, 'MIX101', '2023-11-15', 5, 'Available', 'Site A', 5, 5, 12000),
('Jackhammer', 'https://m.media-amazon.com/images/I/61dECsvnMoL._AC_SL1200_.jpg', 4, 'JACK202', '2023-12-20', 8, 'InUse', 'Site B', 5, 5, 1500),
('Scissor Lift', 'https://goldenmetalgroup.com/wp-content/uploads/2022/11/Scissor-Lift-Manufacturer-Malaysia0358496.jpg', 5, 'LIFT303', '2024-02-01', 2, 'Available', 'Site D', 5, 5, 30000),
('Road Roller', 'https://www.xcmgmachinery.com.au/wp-content/uploads/2022/01/XS83-Hero-Edit-Quarry-min-scaled.jpg', 5, 'ROLL404', '2023-10-05', 3, 'InUse', 'Site E', 5, 5, 40000),
('Dump Truck', 'https://www.inboundlogistics.com/wp-content/uploads/dump-trucks.jpg', 5, 'DUMP505', '2023-11-30', 4, 'Available', 'Site F', 5, 5, 65000),
('Pile Driver', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4rJWKcFvTZ9WvQxNpL9YBUqjZ2eZ4_7C3g&s', 5, 'PILE606', '2024-01-20', 1, 'InUse', 'Site G', 5, 5, 90000),
('Welding Generator', 'https://m.media-amazon.com/images/I/61PIAB7d-JL.jpg', 5, 'WGEN707', '2023-09-30', 4, 'Available', 'Site H', 5, 5, 10000),
('Concrete Vibrator', 'https://m.media-amazon.com/images/I/712VbuqP7zL.jpg', 5, 'VIB808', '2023-11-10', 5, 'Available', 'Site A', 5, 5, 3000),
('Portable Generator', 'https://images-cdn.ubuy.co.in/65da94365d9db12e484a6b9c-ai-power-4000w-gasoline-generator-with.jpg', 5, 'PGEN909', '2024-01-25', 6, 'InUse', 'Site B', 5, 5, 8000);
INSERT INTO "inventory_system"."Equipments" ("equipmentName", "equipmentImg", "rating", "modelNumber", "purchaseDate", "quantity", "status", "location", "categoryID", "supplierID", "price") VALUES
('Syringes', 'https://images-cdn.ubuy.co.in/65ab7423187f175a97234be5-disposable-3ml-cc-syringe-with-23-gauge.jpg', 5, 'SYR123', '2023-11-10', 500, 'Available', 'Supply Room A', 6, 6, 0.5),
('Bandages', 'https://curad.com/wp-content/uploads/2020/05/SKU_CUR0700RB_BOX_FRONT_RGB.jpg', 5, 'BAND456', '2023-10-15', 300, 'Available', 'Supply Room B', 6, 6, 1.0),
('Gloves', 'https://m.media-amazon.com/images/I/71GJx79GiFL._AC_SL1500_.jpg', 5, 'GLOVE789', '2023-12-01', 1000, 'Available', 'Supply Room C', 6, 6, 0.2),
('Face Masks', 'https://m.media-amazon.com/images/I/71n7lcvSbNL._AC_UF1000,1000_QL80_.jpg', 5, 'MASK101', '2023-11-05', 2000, 'Available', 'Supply Room D', 6, 6, 0.1),
('Thermometers', 'https://images-cdn.ubuy.co.id/64ae9dd45af3f81fab215bf2-mabis-digital-thermometer-for-adults.jpg', 5, 'THERM303', '2023-11-20', 50, 'Available', 'Supply Room F', 6, 6, 15.0),
('Scalpels', 'https://m.media-amazon.com/images/I/71YISiXtnTL._SL1500_.jpg', 5, 'SCAL404', '2024-01-10', 100, 'Available', 'Supply Room G', 6, 6, 3.0),
('Wheelchairs', 'https://m.media-amazon.com/images/I/51X3AT0K46L._AC_UF1000,1000_QL80_.jpg', 5, 'WHEEL505', '2023-09-30', 20, 'Available', 'Supply Room H', 6, 6, 100.0),
('Stethoscopes', 'https://m.media-amazon.com/images/I/511lukacscL._SL1000_.jpg', 5, 'STETH606', '2023-11-15', 40, 'Available', 'Supply Room I', 6, 6, 20.0),
('Crutches', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOlWTsieGiM_aVoRQAHfchvdxqk_M2iqXRQ&s', 5, 'CRUT707', '2023-12-25', 30, 'Available', 'Supply Room J', 6, 6, 25.0),
('Blood Pressure Monitors', 'https://m.media-amazon.com/images/I/6138LurvciL._AC_SL1500_.jpg', 4, 'BP808', '2023-10-05', 15, 'Available', 'Supply Room K', 6, 6, 50.0);



INSERT INTO "inventory_system"."Orders" ("userID", "orderDate")
VALUES 
(2, '2024-12-01 10:30:00'),
(3, '2024-12-02 15:45:00'),
(2, '2024-12-03 12:00:00');
INSERT INTO "inventory_system"."Cart" ("userID", "equipmentID", "quantity", "grandTotal")
VALUES 
(2, 1, 1, 1000),  
(3, 2, 1, 500),   
(2, 3, 2, 2400);  

INSERT INTO "inventory_system"."Rating" ("userID", "equipmentID", "comment", "score")
VALUES 
(2, 1, 'Great product, works well!', 5),
(3, 2, 'Comfortable but expensive.', 4),
(2, 3, 'Highly functional and efficient.', 5);
INSERT INTO "inventory_system"."EquipmentOrder" ("orderID", "equipmentID", "quantity")
VALUES 
(1, 1, 1),
(2, 2, 1),
(3, 3, 2);
