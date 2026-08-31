from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.accounts.models import User
from apps.equipment.models import Category, Equipment, EquipmentCondition, EquipmentStatus, EquipmentImage
from apps.bookings.models import Booking, BookingStatus
from apps.reviews.models import Review
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
                "phone_number": "+91 98765 43210",
                "location": "Ludhiana, Punjab",
                "bio": "Progressive farmer managing 80 acres in Ludhiana. Offering high-performance 4WD Mahindra and Swaraj tractors and rotavators.",
            },
        )
        owner1.set_password("password123")
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
                "phone_number": "+91 98765 43211",
                "location": "Rajkot, Gujarat",
                "bio": "Custom farm machinery operator in Saurashtra. Renting John Deere 5310 tractors, multi-crop threshers, and heavy disc harrows.",
            },
        )
        owner2.set_password("password123")
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
                "phone_number": "+91 98765 43213",
                "location": "Karnal, Haryana",
                "bio": "Agricultural contractor offering Preet combine harvesters and Dasmesh super seeders for paddy and wheat season.",
            },
        )
        owner3.set_password("password123")
        owner3.save()

        renter1, _ = User.objects.get_or_create(
            email="ramesh.sharma@agrishare.com",
            defaults={
                "username": "ramesh_sharma",
                "first_name": "Ramesh",
                "last_name": "Sharma",
                "phone_number": "+91 98765 43212",
                "location": "Indore, Madhya Pradesh",
                "bio": "Soybean and wheat grower utilizing shared high-efficiency farm implements to reduce capital overhead.",
            },
        )
        renter1.set_password("password123")
        renter1.first_name = "Ramesh"
        renter1.last_name = "Sharma"
        renter1.location = "Indore, Madhya Pradesh"
        renter1.save()

        self.stdout.write(self.style.SUCCESS("[OK] Indian kisan demo users created."))

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
        ]

        cat_objs = {}
        for cdata in categories_data:
            cat, _ = Category.objects.get_or_create(
                slug=cdata["slug"],
                defaults=cdata,
            )
            cat_objs[cdata["slug"]] = cat

        self.stdout.write(self.style.SUCCESS("[OK] Equipment categories seeded."))

        # 3. Indian Machinery Equipment Listings
        equipment_data = [
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
                "owner": owner3,
                "category": cat_objs["harvesters-combines"],
                "name": "Preet 987 Self-Propelled Combine Harvester",
                "brand": "Preet",
                "model": "987 Harvester",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 6500.00,
                "security_deposit": 20000.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "101 HP Ashok Leyland turbo engine, 14-foot cutter bar width with hydraulic reel adjustment and large grain tank. Designed for rapid, low-grain-loss harvesting of wheat, paddy, mustard, and soybeans in northern India.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tillage-cultivation"],
                "name": "Shaktiman Semi-Champion Rotary Tiller (Rotavator 7 Ft)",
                "brand": "Shaktiman",
                "model": "Semi-Champion 7 Ft",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 1400.00,
                "security_deposit": 4000.00,
                "location": "Indore, Madhya Pradesh",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Heavy-duty multi-speed gearbox with Boron steel L-type blades. Delivers superior pulverization and soil aerating in dry and wet field conditions with minimal tractor load.",
            },
            {
                "owner": owner2,
                "category": cat_objs["tractors"],
                "name": "John Deere 5310 PowerTech CRDI Tractor (55 HP)",
                "brand": "John Deere",
                "model": "5310 GearPro",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 3200.00,
                "security_deposit": 9000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "55 HP Turbocharged PowerTech engine with dual torque mode, power steering, oil immersed disc brakes, and 2,000 kg heavy lift. Perfect for cotton, groundnut, and sugarcane operations across Gujarat.",
            },
            {
                "owner": owner3,
                "category": cat_objs["planting-seeding"],
                "name": "Dasmesh 912 Paddy Straw Chopper & Super Seeder",
                "brand": "Dasmesh",
                "model": "912 Super Seeder",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 2200.00,
                "security_deposit": 6000.00,
                "location": "Bathinda, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Simultaneous paddy stubble mulching and wheat seed drilling in a single pass. Prevents stubble burning while saving seedbed prep time and moisture.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tillage-cultivation"],
                "name": "Lemken Opal 090 Hydraulic Reversible MB Plough",
                "brand": "Lemken",
                "model": "Opal 090 (3 Furrow)",
                "manufacturing_year": 2021,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 1600.00,
                "security_deposit": 5000.00,
                "location": "Nashik, Maharashtra",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "3-furrow hydraulic reversible mouldboard plough. Deep soil inversion, burying weeds and previous crop residues for enhanced soil fertility in grape, onion, and sugarcane belts.",
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
                "location": "Guntur, Andhra Pradesh",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "High output multi-crop thresher for wheat, maize, pulses, and paddy with pneumatic blower and 5-ton hydraulic tipping trailer attachment.",
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

        # 4. Seed sample completed booking and review
        today = timezone.now().date()
        past_start = today - timedelta(days=14)
        past_end = today - timedelta(days=10)

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

        # 5. Seed initial notifications
        Notification.objects.get_or_create(
            recipient=owner1,
            notification_type=NotificationType.BOOKING_COMPLETED,
            defaults={
                "title": "Rental Contract Completed",
                "message": f"Rental for {created_equipment[0].name} by Ramesh Sharma has been completed successfully.",
                "link": "/bookings",
            },
        )

        self.stdout.write(self.style.SUCCESS("[OK] Seed data complete! Ready for local dev & testing."))
