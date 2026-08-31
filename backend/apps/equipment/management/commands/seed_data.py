from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.accounts.models import User
from apps.equipment.models import Category, Equipment, EquipmentCondition, EquipmentStatus, EquipmentImage
from apps.bookings.models import Booking, BookingStatus
from apps.reviews.models import Review
from apps.notifications.models import Notification, NotificationType

class Command(BaseCommand):
    help = "Seeds database with demo categories, users, equipment, bookings, and reviews."

    def handle(self, *args, **options):
        self.stdout.write("Seeding AgriShare data...")

        # 1. Create Users
        admin_user, _ = User.objects.get_or_create(
            email="admin@agrishare.com",
            defaults={
                "username": "admin",
                "first_name": "AgriShare",
                "last_name": "Admin",
                "is_staff": True,
                "is_superuser": True,
                "phone_number": "+1 (555) 010-0000",
                "location": "Des Moines, Iowa",
                "bio": "Platform Administrator for AgriShare.",
            },
        )
        admin_user.set_password("admin12345")
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()

        owner1, _ = User.objects.get_or_create(
            email="john.farmer@agrishare.com",
            defaults={
                "username": "john_farmer",
                "first_name": "John",
                "last_name": "Sterling",
                "phone_number": "+91 98765 43210",
                "location": "Ludhiana, Punjab",
                "bio": "Third-generation farmer managing 1,200 acres. Offering modern tractors, combines, and precision implements during non-peak windows.",
            },
        )
        owner1.set_password("password123")
        owner1.save()

        owner2, _ = User.objects.get_or_create(
            email="sarah.agri@agrishare.com",
            defaults={
                "username": "sarah_agri",
                "first_name": "Sarah",
                "last_name": "Jenkins",
                "phone_number": "+91 98765 43211",
                "location": "Indore, Madhya Pradesh",
                "bio": "Certified agronomist and custom operator with well-maintained high-clearance sprayers, precision planters, and forage balers.",
            },
        )
        owner2.set_password("password123")
        owner2.save()

        renter1, _ = User.objects.get_or_create(
            email="david.miller@agrishare.com",
            defaults={
                "username": "david_miller",
                "first_name": "David",
                "last_name": "Miller",
                "phone_number": "+91 98765 43212",
                "location": "Karnal, Haryana",
                "bio": "Grower specializing in corn, soybeans, and wheat. Utilizing shared equipment to scale seasonal operations.",
            },
        )
        renter1.set_password("password123")
        renter1.save()

        self.stdout.write(self.style.SUCCESS("[OK] Demo users created."))

        # 2. Categories
        categories_data = [
            {
                "name": "Tractors",
                "slug": "tractors",
                "icon": "Tractor",
                "description": "Utility, row-crop, 4WD, and compact tractors for all agricultural tasks.",
            },
            {
                "name": "Harvesters & Combines",
                "slug": "harvesters-combines",
                "icon": "Combine",
                "description": "Combine harvesters, grain headers, and forage harvesters for peak season.",
            },
            {
                "name": "Tillage & Cultivation",
                "slug": "tillage-cultivation",
                "icon": "Layers",
                "description": "Discs, plows, cultivators, and seedbed prep equipment.",
            },
            {
                "name": "Planting & Seeding",
                "slug": "planting-seeding",
                "icon": "Sprout",
                "description": "Precision air seeders, row crop planters, and grain drills.",
            },
            {
                "name": "Sprayers & Application",
                "slug": "sprayers-application",
                "icon": "Droplets",
                "description": "Self-propelled sprayers, pull-behind rigs, and fertilizer spreaders.",
            },
            {
                "name": "Hay & Forage",
                "slug": "hay-forage",
                "icon": "Sun",
                "description": "Round & square balers, disc mowers, rakes, and tedders.",
            },
            {
                "name": "Trailers & Hauling",
                "slug": "trailers-hauling",
                "icon": "Truck",
                "description": "Grain carts, hopper bottom trailers, and heavy equipment haulers.",
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

        # 3. Equipment Listings
        equipment_data = [
            {
                "owner": owner1,
                "category": cat_objs["tractors"],
                "name": "John Deere 8R 370 Row Crop Tractor",
                "brand": "John Deere",
                "model": "8R 370",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 4500.00,
                "security_deposit": 10000.00,
                "location": "Ludhiana, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "High-efficiency 370 HP row-crop tractor equipped with AutoTrac guidance, CommandView 4 cab, ILS front suspension, and dual rear wheels. Ideal for heavy tillage, high-speed planting, and grain cart operations.",
            },
            {
                "owner": owner1,
                "category": cat_objs["harvesters-combines"],
                "name": "Case IH Axial-Flow 8250 Combine Harvester",
                "brand": "Case IH",
                "model": "Axial-Flow 8250",
                "manufacturing_year": 2021,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 8500.00,
                "security_deposit": 25000.00,
                "location": "Karnal, Haryana",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Tier 4B engine with 480 HP rated power, 410-bushel grain tank capacity, automated crop flow monitoring, and luxury cab package. Comes with 12-row corn head connection option.",
            },
            {
                "owner": owner2,
                "category": cat_objs["planting-seeding"],
                "name": "Kinze 3600 16-Row Precision Planter",
                "brand": "Kinze",
                "model": "3600 Pivot Fold",
                "manufacturing_year": 2020,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 3200.00,
                "security_deposit": 8000.00,
                "location": "Indore, Madhya Pradesh",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "16-row 30-inch spacing planter with bulk fill seed hoppers, hydraulic row weight transfer, electric row clutches, and precision seed meters.",
            },
            {
                "owner": owner2,
                "category": cat_objs["sprayers-application"],
                "name": "Hagie STS12 Self-Propelled High-Clearance Sprayer",
                "brand": "Hagie",
                "model": "STS12",
                "manufacturing_year": 2023,
                "condition": EquipmentCondition.NEW,
                "price_per_day": 6500.00,
                "security_deposit": 15000.00,
                "location": "Nashik, Maharashtra",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "120-foot carbon fiber boom, 1200-gallon stainless steel tank, front-boom visibility, all-wheel steer, and high crop clearance for late-season nitrogen and fungicide applications.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tillage-cultivation"],
                "name": "Great Plains 3000TM Turbo-Max Vertical Tillage",
                "brand": "Great Plains",
                "model": "3000TM",
                "manufacturing_year": 2019,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 2600.00,
                "security_deposit": 6000.00,
                "location": "Bathinda, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "30-foot working width, hydraulic gang angle adjustment from 0 to 6 degrees, rolling spider tines, and heavy-duty rear reel for optimal residue sizing and seedbed preparation.",
            },
            {
                "owner": owner2,
                "category": cat_objs["hay-forage"],
                "name": "New Holland Roll-Belt 560 Round Baler",
                "brand": "New Holland",
                "model": "Roll-Belt 560",
                "manufacturing_year": 2021,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 2900.00,
                "security_deposit": 7000.00,
                "location": "Rajkot, Gujarat",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "Produces 5x6 foot dense round bales with EdgeWrap net wrap system, wide pickup with dual gauge wheels, and moisture sensing kit.",
            },
            {
                "owner": owner1,
                "category": cat_objs["tractors"],
                "name": "Kubota M7-172 Deluxe Heavy Utility Tractor",
                "brand": "Kubota",
                "model": "M7-172",
                "manufacturing_year": 2022,
                "condition": EquipmentCondition.EXCELLENT,
                "price_per_day": 3400.00,
                "security_deposit": 8500.00,
                "location": "Amritsar, Punjab",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "168 HP 4-cylinder engine, K-VT continuously variable transmission, front loader attachment included with quick-attach grapple bucket.",
            },
            {
                "owner": owner2,
                "category": cat_objs["trailers-hauling"],
                "name": "Brent 882 Avalanche Grain Cart (850 Bushel)",
                "brand": "Brent / Unverferth",
                "model": "882",
                "manufacturing_year": 2020,
                "condition": EquipmentCondition.GOOD,
                "price_per_day": 2100.00,
                "security_deposit": 5000.00,
                "location": "Nagpur, Maharashtra",
                "is_available": True,
                "status": EquipmentStatus.AVAILABLE,
                "description": "850-bushel capacity grain cart with 20-inch corner auger, hydraulic spout control, roll tarp, and scale indicator for field weight recording.",
            },
        ]

        images_map = [
            "equipment/tractor_john_deere.jpg",
            "equipment/combine_harvester.jpg",
            "equipment/precision_planter.jpg",
            "equipment/crop_sprayer.jpg",
            "equipment/vertical_tillage.jpg",
            "equipment/round_baler.jpg",
            "equipment/kubota_tractor.jpg",
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

        self.stdout.write(self.style.SUCCESS(f"[OK] {len(created_equipment)} Equipment listings seeded with real photos."))

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
                "notes": "Rented for spring pre-plant field preparation.",
            },
        )
        if booking1.status != BookingStatus.COMPLETED:
            booking1.status = BookingStatus.COMPLETED
            booking1.save()

        # Review for booking1
        Review.objects.get_or_create(
            booking=booking1,
            defaults={
                "reviewer": renter1,
                "equipment": created_equipment[0],
                "rating": 5,
                "comment": "Outstanding tractor! John had the John Deere 8R clean, fully fueled, and GPS calibrated upon delivery. Saved us over three days on our corn fields. Highly recommend!",
            },
        )

        # Seed sample pending booking request
        future_start = today + timedelta(days=5)
        future_end = today + timedelta(days=8)
        Booking.objects.get_or_create(
            equipment=created_equipment[1],
            renter=renter1,
            start_date=future_start,
            end_date=future_end,
            defaults={
                "status": BookingStatus.PENDING,
                "notes": "Looking to rent for wheat harvest next week.",
            },
        )

        # Seed sample notification
        Notification.objects.get_or_create(
            recipient=owner1,
            sender=renter1,
            notification_type=NotificationType.BOOKING_REQUESTED,
            title="New Rental Request Received",
            message=f"David Miller has requested to rent '{created_equipment[1].name}' from {future_start} to {future_end}.",
            link="/bookings",
        )

        self.stdout.write(self.style.SUCCESS("[OK] Seed data complete! Ready for local dev & testing."))
