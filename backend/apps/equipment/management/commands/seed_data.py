from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
# pyrefly: ignore [missing-import]
from apps.accounts.models import User
# pyrefly: ignore [missing-import]
from apps.equipment.models import Category, Equipment, EquipmentCondition, EquipmentStatus, EquipmentImage
# pyrefly: ignore [missing-import]
from apps.bookings.models import Booking, BookingStatus
# pyrefly: ignore [missing-import]
from apps.reviews.models import Review
# pyrefly: ignore [missing-import]
from apps.notifications.models import Notification, NotificationType

class Command(BaseCommand):
    help = "Seeds database with demo Indian categories, kisan users, equipment, bookings, and reviews."

    def handle(self, *args, **options):
        self.stdout.write("Seeding AgriShare Indian farm equipment and kisan users...")

        # 1. Create Indian Users
        admin_user, _ = User.objects.get_or_create(
            email="admin@agrishare.com",
            defaults={
                "username": "admin",
                "first_name": "AgriShare",
                "last_name": "Admin",
                "is_staff": True,
                "is_superuser": True,
                "phone_number": "+91 98000 00000",
                "location": "New Delhi, India",
                "bio": "Platform Administrator for AgriShare India.",
            },
        )
        admin_user.set_password("admin12345")
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()

        owner1, _ = User.objects.get_or_create(
            email="gurpreet.singh@agrishare.com",
            defaults={
                "username": "gurpreet_singh",
                "first_name": "Gurpreet",
                "last_name": "Singh",
                "role": "OWNER",
                "phone_number": "+91 98765 43210",
                "location": "Ludhiana, Punjab",
                "bio": "Progressive farmer managing 80 acres in Ludhiana. Offering high-performance 4WD Mahindra, Swaraj, and Kubota tractors, rotavators, and combine harvesters.",
            },
        )
        owner1.set_password("password123")
        owner1.role = "OWNER"
        owner1.first_name = "Gurpreet"
        owner1.last_name = "Singh"
        owner1.location = "Ludhiana, Punjab"
        owner1.save()

        owner2, _ = User.objects.get_or_create(
            email="rajesh.patel@agrishare.com",
            defaults={
                "username": "rajesh_patel",
                "first_name": "Rajesh",
                "last_name": "Patel",
                "role": "OWNER",
                "phone_number": "+91 98765 43211",
                "location": "Rajkot, Gujarat",
                "bio": "Custom farm machinery operator in Saurashtra. Renting John Deere tractors, super seeders, crop sprayers, round straw balers, and multi-crop threshers.",
            },
        )
        owner2.set_password("password123")
        owner2.role = "OWNER"
        owner2.first_name = "Rajesh"
        owner2.last_name = "Patel"
        owner2.location = "Rajkot, Gujarat"
        owner2.save()

        owner3, _ = User.objects.get_or_create(
            email="vikram.choudhary@agrishare.com",
            defaults={
                "username": "vikram_choudhary",
                "first_name": "Vikram",
                "last_name": "Choudhary",
                "role": "OWNER",
                "phone_number": "+91 98765 43213",
                "location": "Karnal, Haryana",
                "bio": "Certified agri-machinery fleet owner in Haryana. Supplying Claas combine harvesters, laser land levelers, disc harrows, precision carts, and paddy weeders across the GT Road belt.",
            },
        )
        owner3.set_password("password123")
        owner3.role = "OWNER"
        owner3.first_name = "Vikram"
        owner3.last_name = "Choudhary"
        owner3.location = "Karnal, Haryana"
        owner3.save()

        # Renters (7 active farmers/renters across Indian agricultural regions)
        renter1, _ = User.objects.get_or_create(
            email="ramesh.sharma@agrishare.com",
            defaults={
                "username": "ramesh_sharma",
                "first_name": "Ramesh",
                "last_name": "Sharma",
                "role": "RENTER",
                "phone_number": "+91 98765 43212",
                "location": "Indore, Madhya Pradesh",
                "bio": "Soybean and wheat grower utilizing shared high-efficiency farm implements to reduce capital overhead.",
            },
        )
        renter1.set_password("password123")
        renter1.role = "RENTER"
        renter1.first_name = "Ramesh"
        renter1.last_name = "Sharma"
        renter1.location = "Indore, Madhya Pradesh"
        renter1.save()

        renter2, _ = User.objects.get_or_create(
            email="devendra.yadav@agrishare.com",
            defaults={
                "username": "devendra_yadav",
                "first_name": "Devendra",
                "last_name": "Yadav",
                "role": "RENTER",
                "phone_number": "+91 98765 43216",
                "location": "Meerut, Uttar Pradesh",
                "bio": "Sugarcane and potato farmer seeking reliable heavy rotavators, sprayers, and tipper trolleys on rent.",
            },
        )
        renter2.set_password("password123")
        renter2.role = "RENTER"
        renter2.first_name = "Devendra"
        renter2.last_name = "Yadav"
        renter2.location = "Meerut, Uttar Pradesh"
        renter2.save()

        renter3, _ = User.objects.get_or_create(
            email="ananya.reddy@agrishare.com",
            defaults={
                "username": "ananya_reddy",
                "first_name": "Ananya",
                "last_name": "Reddy",
                "role": "RENTER",
                "phone_number": "+91 98765 43214",
                "location": "Warangal, Telangana",
                "bio": "Cotton and paddy cultivator renting modern precision tractors, balers, and seed drills on-demand.",
            },
        )
        renter3.set_password("password123")
        renter3.role = "RENTER"
        renter3.first_name = "Ananya"
        renter3.last_name = "Reddy"
        renter3.location = "Warangal, Telangana"
        renter3.save()

        renter4, _ = User.objects.get_or_create(
            email="harpreet.kaur@agrishare.com",
            defaults={
                "username": "harpreet_kaur",
                "first_name": "Harpreet",
                "last_name": "Kaur",
                "role": "RENTER",
                "phone_number": "+91 98765 43215",
                "location": "Amritsar, Punjab",
                "bio": "Organic basmati rice and wheat farmer renting combine harvesters and orchard sprayers for seasonal field work.",
            },
        )
        renter4.set_password("password123")
        renter4.role = "RENTER"
        renter4.first_name = "Harpreet"
        renter4.last_name = "Kaur"
        renter4.location = "Amritsar, Punjab"
        renter4.save()

        renter5, _ = User.objects.get_or_create(
            email="suresh.kumar@agrishare.com",
            defaults={
                "username": "suresh_kumar",
                "first_name": "Suresh",
                "last_name": "Kumar",
                "role": "RENTER",
                "phone_number": "+91 98765 43217",
                "location": "Jaipur, Rajasthan",
                "bio": "Mustard and pearl millet (bajra) cultivator utilizing tractor rotavators, disc harrows, and weeders.",
            },
        )
        renter5.set_password("password123")
        renter5.role = "RENTER"
        renter5.first_name = "Suresh"
        renter5.last_name = "Kumar"
        renter5.location = "Jaipur, Rajasthan"
        renter5.save()

        renter6, _ = User.objects.get_or_create(
            email="priya.nair@agrishare.com",
            defaults={
                "username": "priya_nair",
                "first_name": "Priya",
                "last_name": "Nair",
                "role": "RENTER",
                "phone_number": "+91 98765 43218",
                "location": "Palakkad, Kerala",
                "bio": "Paddy and spice grower actively renting manual cono weeders, knapsack sprayers, and specialized farm carts.",
            },
        )
        renter6.set_password("password123")
        renter6.role = "RENTER"
        renter6.first_name = "Priya"
        renter6.last_name = "Nair"
        renter6.location = "Palakkad, Kerala"
        renter6.save()

        renter7, _ = User.objects.get_or_create(
            email="manoj.tiwari@agrishare.com",
            defaults={
                "username": "manoj_tiwari",
                "first_name": "Manoj",
                "last_name": "Tiwari",
                "role": "RENTER",
                "phone_number": "+91 98765 43219",
                "location": "Patna, Bihar",
                "bio": "Maize and pulse farmer leveraging shared agricultural implements and multi-crop threshers to boost harvest profitability.",
            },
        )
        renter7.set_password("password123")
        renter7.role = "RENTER"
        renter7.first_name = "Manoj"
        renter7.last_name = "Tiwari"
        renter7.location = "Patna, Bihar"
        renter7.save()

        self.stdout.write(self.style.SUCCESS("[OK] Indian kisan demo users created (3 Owners, 7 Renters)."))

        # 2. Categories
        categories_data = [
            {
                "name": "Tractors",
                "slug": "tractors",
                "icon": "Tractor",
                "description": "Utility, 4WD, heavy-duty, and compact tractors for all field operations.",
            },
            {
                "name": "Harvesters & Combines",
                "slug": "harvesters-combines",
                "icon": "Combine",
                "description": "Self-propelled combine harvesters and paddy grain headers.",
            },
            {
                "name": "Tillage & Rotavators",
                "slug": "tillage-cultivation",
                "icon": "Layers",
                "description": "Rotavators, MB ploughs, disc harrows, and seedbed prep implements.",
            },
            {
                "name": "Seeding & Super Seeders",
                "slug": "planting-seeding",
                "icon": "Sprout",
                "description": "Super seeders, zero-till drills, and precision crop seeders.",
            },
            {
                "name": "Sprayers & Protection",
                "slug": "sprayers-application",
                "icon": "Droplet",
                "description": "Tractor-mounted boom sprayers and high-capacity orchard sprayers.",
            },
            {
                "name": "Straw Balers & Choppers",
                "slug": "hay-forage",
                "icon": "Package",
                "description": "Paddy straw balers, straw reapers, and residue management tools.",
            },
            {
                "name": "Threshers & Haulage",
                "slug": "trailers-hauling",
                "icon": "Truck",
                "description": "Multi-crop threshers, hydraulic tipper trolleys, and grain carts.",
            },
            {
                "name": "Hand Tools & Farm Carts",
                "slug": "hand-tools-carts",
                "icon": "Wrench",
                "description": "Ergonomic harvesting tools, knapsack sprayers, garden weeders, spades, and heavy-duty farm wheelbarrow carts.",
            },
        ]

        cat_objs = {}
        for cdata in categories_data:
            cat, _ = Category.objects.get_or_create(
                slug=cdata["slug"],
                defaults=cdata,
            )
            cat_objs[cdata["slug"]] = cat

        self.stdout.write(self.style.SUCCESS("[OK] Equipment categories seeded."))

        # 3. Indian Machinery Equipment Listings (Properly distributed across 3 Owners)
        equipment_data = [
            # --- Owner 1 (Gurpreet Singh - Punjab): 9 Listings ---
            {
                "owner": owner1,
                "category": cat_objs["tractors"],
                "name": "Mahindra Yuvo Tech+ 585 DI 4WD Tractor (49 HP)",
                "brand": "Mahindra",
                "model": "Yuvo Tech+ 585 DI",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 2800.00,
                "security_deposit": 8000.00,
                "location": "Ludhiana, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "49 HP 4-cylinder mZIP engine, 4WD traction, 12 Forward + 3 Reverse gears, and 1,700 kg hydraulic lift capacity. Ideal for heavy rotavator, laser land leveler, and super seeder operations in Punjab fields.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tractors"],
                "name": "Swaraj 855 FE Heavy Duty Tractor (52 HP)",
                "brand": "Swaraj",
                "model": "855 FE",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 2500.00,
                "security_deposit": 7500.00,
                "location": "Sangrur, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "52 HP 3-cylinder reliable engine with multi-speed reverse PTO, dual clutch, and heavy-duty front axle. Outstanding fuel efficiency for continuous threshing, haulage, and field preparation.",
            },
            {
                "owner": owner1,
                "category": cat_objs["harvesters-combines"],
                "name": "Preet 987 Self-Propelled Combine Harvester",
                "brand": "Preet",
                "model": "987 Harvester",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 6500.00,
                "security_deposit": 20000.00,
                "location": "Ludhiana, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "101 HP Ashok Leyland turbo engine, 14-foot cutter bar width with hydraulic reel adjustment and large grain tank. Designed for rapid, low-grain-loss harvesting of wheat, paddy, mustard, and soybeans in northern India.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tillage-cultivation"],
                "name": "Shaktiman Regular Light Rotavator (7 Feet / 48 Blades)",
                "brand": "Shaktiman",
                "model": "SRT-7",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 950.00,
                "security_deposit": 3000.00,
                "location": "Ludhiana, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Boron steel curved L-blades with side gear drive in oil bath. Provides deep pulverization and soil aerating in single pass, ideal for wheat and paddy sowing.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tractors"],
                "name": "Kubota MU4501 4WD Precision Agriculture Tractor (45 HP)",
                "brand": "Kubota",
                "model": "MU4501 4WD",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 2700.00,
                "security_deposit": 8000.00,
                "location": "Sangrur, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Japanese engineered 4-cylinder quad-valve e-CDIS diesel engine with synchromesh transmission, shuttle shift, and bevel gear 4WD front axle. Superior maneuvering in wet paddy puddling and inter-cultivation.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tillage-cultivation"],
                "name": "Fieldking Tractor-Mounted Hydraulic Post Hole Digger",
                "brand": "Fieldking",
                "model": "FK-PHD-36",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 850.00,
                "security_deposit": 2500.00,
                "location": "Sangrur, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "PTO-driven heavy spiral auger tool (9-inch and 12-inch drill bits) with shear bolt protection. Quickly digs 3-foot deep holes for fencing poles, solar pump foundations, and tree/orchard plantation.",
            },
            {
                "owner": owner1,
                "category": cat_objs["hand-tools-carts"],
                "name": "AgriPro Dual-Wheel Heavy Duty Farm Utility Cart (250 kg Capacity)",
                "brand": "AgriPro",
                "model": "DWC-250",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 250.00,
                "security_deposit": 800.00,
                "location": "Ludhiana, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Heavy-gauge reinforced steel bucket with dual puncture-resistant pneumatic tires and ergonomic padded handles. Perfectly balanced for hauling harvested grains, compost, fertilizer bags, and tools across uneven muddy farm tracks without tipping.",
            },
            {
                "owner": owner1,
                "category": cat_objs["hand-tools-carts"],
                "name": "Bharat Galvanized Steel 2-Wheel Manual Bulk Grain & Fodder Cart",
                "brand": "Bharat Implements",
                "model": "BGC-500",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 240.00,
                "security_deposit": 750.00,
                "location": "Ludhiana, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Traditional heavy galvanized sheet metal haulage cart with reinforced axle, sealed roller bearings, and heavy-duty treaded wheels. Designed for transporting wet cattle dung manure, harvested fodder bundles, and grain bushels.",
            },
            {
                "owner": owner1,
                "category": cat_objs["hand-tools-carts"],
                "name": "Traditional Indian Kisan Hand Tools Kit (Kodali, Sickle, Khurpi & Spading Fork)",
                "brand": "Tata Agrico",
                "model": "Kisan Shrestha Kit",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 120.00,
                "security_deposit": 300.00,
                "location": "Sangrur, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Complete 4-piece hardened high-carbon steel manual farm set including heavy digging Kodali spade, sharp serrated harvesting Sickle (Daranti), ergonomic Khurpi hand weeder, and heavy 4-prong spading fork. Fitted with treated sal-wood handles.",
            },

            # --- Owner 2 (Rajesh Patel - Gujarat): 8 Listings ---
            {
                "owner": owner2,
                "category": cat_objs["tractors"],
                "name": "John Deere 5310 GearPro 4WD Farm Tractor (55 HP)",
                "brand": "John Deere",
                "model": "5310 GearPro 4WD",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 3200.00,
                "security_deposit": 9000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "55 HP turbocharged PowerTech engine, dual-clutch transmission with top shaft synchromesh and oil-immersed disc brakes. Ideal for heavy disk harrows, balers, and laser levelers in Saurashtra cotton fields.",
            },
            {
                "owner": owner2,
                "category": cat_objs["planting-seeding"],
                "name": "National Super Seeder Combo (Paddy Straw Management + Sowing)",
                "brand": "National",
                "model": "Super Seeder 8 Row",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 1600.00,
                "security_deposit": 5000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Zero burning solution! Directly plants wheat seeds into standing paddy stubbles without prior tillage. Equipped with high precision fluted seed metering and fertilizer placement.",
            },
            {
                "owner": owner2,
                "category": cat_objs["trailers-hauling"],
                "name": "Fieldking Multi-Crop High-Yield Thresher & Tipper Trolley",
                "brand": "Fieldking",
                "model": "FK-TH-100",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 1800.00,
                "security_deposit": 5000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "High output multi-crop thresher for wheat, maize, pulses, and paddy with pneumatic blower and 5-ton hydraulic tipping trailer attachment.",
            },
            {
                "owner": owner2,
                "category": cat_objs["sprayers-application"],
                "name": "Mitra Bullet 400L Tractor-Mounted Orchard & Field Sprayer",
                "brand": "Mitra",
                "model": "Bullet 400",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 1200.00,
                "security_deposit": 3500.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "400-liter polyethylene chemical tank, Italian brass high-pressure diaphragm pump, and 2-speed aerodynamic blower. High-efficiency penetration for orchard horticulture, cotton, and vegetables.",
            },
            {
                "owner": owner2,
                "category": cat_objs["hay-forage"],
                "name": "New Holland Roll-Belt 450 Round Straw Baler",
                "brand": "New Holland",
                "model": "Roll-Belt 450",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 3000.00,
                "security_deposit": 10000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "High-density round baler with wide SuperFeed pickup and net wrap technology. Efficiently compacts paddy and sugarcane straw into weatherproof dense cylindrical bales for biogas and biomass trade.",
            },
            {
                "owner": owner2,
                "category": cat_objs["hand-tools-carts"],
                "name": "Kisan Kraft 4-Wheel All-Terrain Flatbed Farm Mesh Cart (400 kg Capacity)",
                "brand": "Kisan Kraft",
                "model": "KK-FBC-400",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 300.00,
                "security_deposit": 1000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "4-wheel heavy steel garden flatbed trolley cart with removable drop-down wire mesh sides, wide 10-inch pneumatic turf tires, and 180-degree turn handle. Superb for bulk harvest sacks, crates of tomatoes, onions, and field seedling trays.",
            },
            {
                "owner": owner2,
                "category": cat_objs["hand-tools-carts"],
                "name": "Swadeshi Push Rotary Drum Seed Drill & Fertilizer Hand Cart",
                "brand": "Swadeshi Agro",
                "model": "SD-FertCart-2R",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 220.00,
                "security_deposit": 700.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Manual 2-row push seed drill and fertilizer applicator cart on spoke bicycle wheels with adjustable furrow openers and calibrated seed metering drum. Ideal for small-scale wheat, soybean, groundnut, and maize sowing.",
            },
            {
                "owner": owner2,
                "category": cat_objs["hand-tools-carts"],
                "name": "Tata Agrico Professional Orchard Pruning Loppers & Secateurs Set",
                "brand": "Tata Agrico",
                "model": "PRO-Cut-Master",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 130.00,
                "security_deposit": 350.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Drop-forged carbon steel bypass heavy loppers (cuts up to 40mm thick branches) with shock-absorbing bumpers, paired with ergonomic Japanese SK5 steel spring-assisted hand secateurs and stainless fruit harvesting shears.",
            },

            # --- Owner 3 (Vikram Choudhary - Haryana): 8 Listings ---
            {
                "owner": owner3,
                "category": cat_objs["harvesters-combines"],
                "name": "Claas Crop Tiger 40 Multi-Crop Combine Harvester",
                "brand": "Claas",
                "model": "Crop Tiger 40 Terra Trac",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 7200.00,
                "security_deposit": 22000.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Rubber crawler track multi-crop combine harvester with tangential threshing system (APS). Delivers unmatched grain cleanliness and zero bogging down in muddy paddy basins.",
            },
            {
                "owner": owner3,
                "category": cat_objs["tillage-cultivation"],
                "name": "Spectra Precision Dual-Slope Laser Land Leveler",
                "brand": "Spectra Precision",
                "model": "GL722 Laser Scraper 7 Ft",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 1900.00,
                "security_deposit": 6000.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Dual-slope high accuracy rotary laser transmitter with hydraulic mast and 7-foot grade bucket scraper. Saves up to 35% irrigation water, improves seed germination, and ensures flat paddy/wheat seedbeds.",
            },
            {
                "owner": owner3,
                "category": cat_objs["tillage-cultivation"],
                "name": "Lemken Rubin 9 Compact Disc Harrow (Vertical Tillage)",
                "brand": "Lemken",
                "model": "Rubin 9/300",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 1400.00,
                "security_deposit": 4500.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Heavy-duty 620mm notched hollow discs with individual overload protection. Incorporates heavy green manure, stalks, and thick crop residue uniformly at high working speeds.",
            },
            {
                "owner": owner3,
                "category": cat_objs["tillage-cultivation"],
                "name": "Mahindra Heavy Duty Trailing Offset Disc Harrow (16 Discs)",
                "brand": "Mahindra",
                "model": "AppliTrac 16D",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 1100.00,
                "security_deposit": 3000.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "16 high-grade Boron steel notched and plain concave discs with heavy box-section frame. Breaks hard clods, uproots weeds, and chops previous crop stubbles for secondary tillage.",
            },
            {
                "owner": owner3,
                "category": cat_objs["hand-tools-carts"],
                "name": "Gorilla Carts Heavy-Duty Quick-Release Poly Farm Dump Cart (300 kg)",
                "brand": "Gorilla Carts",
                "model": "GCR-600P",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 280.00,
                "security_deposit": 900.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "High-impact rust-resistant poly bed with patented quick-release roll-over dumping lever. Dual front steering axle allows effortlessly dumping manure, gravel, compost, and animal feed exactly where needed.",
            },
            {
                "owner": owner3,
                "category": cat_objs["hand-tools-carts"],
                "name": "Kisankraft 16L Battery-Cum-Manual Knapsack Crop Sprayer",
                "brand": "Kisankraft",
                "model": "KK-BMS-16L",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 180.00,
                "security_deposit": 500.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Dual-mode 12V 8Ah rechargeable battery and manual hand pump knapsack sprayer with 16-liter UV-stabilized tank, extendable stainless steel lance, and multiple brass nozzles. Ideal for precise pesticide and foliar fertilizer application in vegetable and cotton patches.",
            },
            {
                "owner": owner3,
                "category": cat_objs["hand-tools-carts"],
                "name": "Agrimate Single-Wheel Push Hoe Cultivator & Inter-Row Weeder",
                "brand": "Agrimate",
                "model": "WH-3T",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 140.00,
                "security_deposit": 400.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Ergonomic manual push wheel hoe with 3 reversible spring-steel cultivation tines and weeding sweep. Eradicates weed roots between vegetable rows 5x faster than conventional hand hoeing while aerating surface soil.",
            },
            {
                "owner": owner3,
                "category": cat_objs["hand-tools-carts"],
                "name": "Kisan Pro Twin-Rotor Manual Cono Weeder for Paddy Fields",
                "brand": "Kisan Pro",
                "model": "CW-TwinRotor",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 150.00,
                "security_deposit": 450.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Manual push SRI paddy field weeder featuring dual conical serrated rotors with float board. Simultaneously uproots aquatic weeds, incorporates them as green organic manure, and aerates submerged rice root zones without chemical weedicides.",
            },
        ]

        images_map = [
            "equipment/mahindra_tractor.jpg",
            "equipment/swaraj_tractor.jpg",
            "equipment/preet_harvester.jpg",
            "equipment/shaktiman_rotavator.jpg",
            "equipment/tractor_john_deere.jpg",
            "equipment/precision_planter.jpg",
            "equipment/vertical_tillage.jpg",
            "equipment/grain_cart.jpg",
            "equipment/kubota_tractor.jpg",
            "equipment/combine_harvester.jpg",
            "equipment/crop_sprayer.jpg",
            "equipment/round_baler.jpg",
            "equipment/laser_land_leveler.jpg",
            "equipment/disc_harrow.jpg",
            "equipment/post_hole_digger.jpg",
            # Carts (5 types)
            "equipment/heavy_duty_wheelbarrow.jpg",
            "equipment/trolley_hand_cart.jpg",
            "equipment/tipping_dump_cart.jpg",
            "equipment/hand_rotary_seeder.jpg",
            "equipment/manual_grain_cart.jpg",
            # Hand Tools (5 types)
            "equipment/hand_tools_set.jpg",
            "equipment/knapsack_manual_sprayer.jpg",
            "equipment/wheel_hoe_weeder.jpg",
            "equipment/pruning_loppers_secateurs.jpg",
            "equipment/cono_weeder_paddy.jpg",
        ]

        created_equipment = []
        for i, eq_dict in enumerate(equipment_data):
            eq, created = Equipment.objects.get_or_create(
                name=eq_dict["name"],
                defaults=eq_dict,
            )
            # Update fields in case they changed
            for k, v in eq_dict.items():
                setattr(eq, k, v)
            eq.save()
            created_equipment.append(eq)

            # Seed Real Equipment Image
            if i < len(images_map):
                img_path = images_map[i]
                EquipmentImage.objects.get_or_create(
                    equipment=eq,
                    image=img_path,
                    defaults={"is_primary": True},
                )

        self.stdout.write(self.style.SUCCESS(f"[OK] {len(created_equipment)} Indian Equipment listings seeded with photos."))

        # 4. Seed sample completed bookings and reviews
        today = timezone.now().date()
        past_start = today - timedelta(days=14)
        past_end = today - timedelta(days=10)

        # Booking 1: Ramesh rented Mahindra Yuvo (Completed + Has Review)
        booking1, _ = Booking.objects.get_or_create(
            equipment=created_equipment[0],
            renter=renter1,
            start_date=past_start,
            end_date=past_end,
            defaults={
                "status": BookingStatus.COMPLETED,
                "notes": "Rented for 4 days of field rotavation and laser leveling in Ludhiana.",
            },
        )
        if booking1.status != BookingStatus.COMPLETED:
            booking1.status = BookingStatus.COMPLETED
            booking1.save()

        # Review for booking1
        Review.objects.get_or_create(
            booking=booking1,
            reviewer=renter1,
            equipment=created_equipment[0],
            defaults={
                "rating": 5,
                "comment": "Outstanding Mahindra Yuvo tractor! Flawless 4WD pulling power for all 4 days. Gurpreet paaji was very helpful with implement hitching.",
            },
        )

        # Booking 2: Ramesh rented Fieldking Multi-Crop Thresher (Completed + Awaiting Review!)
        booking2, _ = Booking.objects.get_or_create(
            equipment=created_equipment[4],
            renter=renter1,
            start_date=today - timedelta(days=7),
            end_date=today - timedelta(days=4),
            defaults={
                "status": BookingStatus.COMPLETED,
                "notes": "Threshed 12 acres of wheat with zero grain breakage. Ready to leave review.",
            },
        )
        if booking2.status != BookingStatus.COMPLETED:
            booking2.status = BookingStatus.COMPLETED
            booking2.save()

        # Booking 3: Devendra rented Swaraj 855 FE (Completed + Has Review)
        booking3, _ = Booking.objects.get_or_create(
            equipment=created_equipment[1],
            renter=renter2,
            start_date=today - timedelta(days=20),
            end_date=today - timedelta(days=16),
            defaults={
                "status": BookingStatus.COMPLETED,
                "notes": "Used for hard soil ploughing and subsoiling in Hapur.",
            },
        )
        if booking3.status != BookingStatus.COMPLETED:
            booking3.status = BookingStatus.COMPLETED
            booking3.save()

        Review.objects.get_or_create(
            booking=booking3,
            reviewer=renter2,
            equipment=created_equipment[1],
            defaults={
                "rating": 5,
                "comment": "Swaraj 855 FE has pure raw diesel torque. Handled deep disc ploughing smoothly even in heavy wet clay soil.",
            },
        )

        # Booking 4: Devendra rented Knapsack Sprayer (Completed + Awaiting Review!)
        booking4, _ = Booking.objects.get_or_create(
            equipment=created_equipment[16],
            renter=renter2,
            start_date=today - timedelta(days=5),
            end_date=today - timedelta(days=3),
            defaults={
                "status": BookingStatus.COMPLETED,
                "notes": "Used for neem oil and bio-fertilizer organic spray across sugarcane patch.",
            },
        )
        if booking4.status != BookingStatus.COMPLETED:
            booking4.status = BookingStatus.COMPLETED
            booking4.save()

        # Booking 5: Ananya rented Laser Land Leveler (Completed + Awaiting Review!)
        booking5, _ = Booking.objects.get_or_create(
            equipment=created_equipment[8],
            renter=renter3,
            start_date=today - timedelta(days=8),
            end_date=today - timedelta(days=5),
            defaults={
                "status": BookingStatus.COMPLETED,
                "notes": "Precision leveling reduced our paddy irrigation water consumption by 35%.",
            },
        )
        if booking5.status != BookingStatus.COMPLETED:
            booking5.status = BookingStatus.COMPLETED
            booking5.save()

        # Booking 6: Vikram rented Heavy Duty Farm Wheelbarrow (Completed + Awaiting Review!)
        booking6, _ = Booking.objects.get_or_create(
            equipment=created_equipment[11],
            renter=renter4,
            start_date=today - timedelta(days=6),
            end_date=today - timedelta(days=4),
            defaults={
                "status": BookingStatus.COMPLETED,
                "notes": "Transported compost and manure effortlessly through narrow crop bunds.",
            },
        )
        if booking6.status != BookingStatus.COMPLETED:
            booking6.status = BookingStatus.COMPLETED
            booking6.save()

        # 5. Seed initial notifications
        Notification.objects.filter(recipient=owner1, notification_type=NotificationType.BOOKING_COMPLETED).first() or \
        Notification.objects.create(
            recipient=owner1,
            notification_type=NotificationType.BOOKING_COMPLETED,
            title="Rental Contract Completed",
            message=f"Rental for {created_equipment[0].name} by Ramesh Sharma has been completed successfully.",
            link="/bookings",
        )

        # Seed sample Approved Notification for Renter (Ramesh)
        Notification.objects.filter(recipient=renter1, notification_type=NotificationType.BOOKING_APPROVED).first() or \
        Notification.objects.create(
            recipient=renter1,
            notification_type=NotificationType.BOOKING_APPROVED,
            title="Booking Approved!",
            message=f"Good news! Your rental request for '{created_equipment[0].name}' has been approved by Gurpreet Singh. You can proceed with fieldwork coordination.",
            link="/bookings",
            is_read=False,
        )

        # Seed sample Declined Notification for Renter (Devendra)
        Notification.objects.filter(recipient=renter2, notification_type=NotificationType.BOOKING_REJECTED).first() or \
        Notification.objects.create(
            recipient=renter2,
            notification_type=NotificationType.BOOKING_REJECTED,
            title="Booking Request Declined",
            message=f"Your booking request for '{created_equipment[4].name}' was declined because the machinery is scheduled for mandatory maintenance.",
            link="/bookings",
            is_read=False,
        )

        self.stdout.write(self.style.SUCCESS("[OK] Seed data complete! Ready for local dev & testing."))
