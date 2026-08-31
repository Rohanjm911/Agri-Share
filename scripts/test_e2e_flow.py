import requests
import sys

BASE_URL = "http://127.0.0.1:8000/api"

def run_e2e_flow():
    print("==================================================")
    print("AGRISHARE COMPLETE END-TO-END WORKFLOW TEST")
    print("==================================================")

    # 1. Test Categories & Public Equipment Catalog
    print("\n[Step 1] Fetching Public Equipment Catalog & Categories...")
    cats_res = requests.get(f"{BASE_URL}/equipment/categories/")
    assert cats_res.status_code == 200, f"Categories failed: {cats_res.text}"
    cats = cats_res.json()
    print(f"  [OK] Fetched {len(cats.get('results', cats))} categories")

    eq_res = requests.get(f"{BASE_URL}/equipment/")
    assert eq_res.status_code == 200, f"Equipment catalog failed: {eq_res.text}"
    eq_data = eq_res.json()
    print(f"  [OK] Fetched {eq_data['count']} equipment listings in directory")
    # Find equipment owned by John Sterling
    john_eq = next((eq for eq in eq_data['results'] if "John" in eq["owner_name"]), eq_data['results'][0])
    target_eq_id = john_eq['id']

    # 2. Test User Registration
    print("\n[Step 2] Testing User Registration...")
    import random
    rand_id = random.randint(1000, 9999)
    new_user_payload = {
        "username": f"farmer_sam_{rand_id}",
        "email": f"sam_{rand_id}@agrishare.com",
        "first_name": "Sam",
        "last_name": "Hayward",
        "phone_number": "+1 (555) 789-0123",
        "password": "SecurePassword123!",
        "password_confirm": "SecurePassword123!",
    }
    reg_res = requests.post(f"{BASE_URL}/auth/register/", json=new_user_payload)
    assert reg_res.status_code == 201, f"Registration failed: {reg_res.text}"
    reg_data = reg_res.json()
    sam_access = reg_data["access"]
    print(f"  [OK] User registered: {reg_data['user']['email']}")
    print(f"  [OK] JWT tokens issued upon registration")

    # 3. Test Owner Login (John)
    print("\n[Step 3] Testing Owner Login (John)...")
    login_res = requests.post(
        f"{BASE_URL}/auth/login/",
        json={"email": "john.farmer@agrishare.com", "password": "password123"},
    )
    assert login_res.status_code == 200, f"Login failed: {login_res.text}"
    owner_token = login_res.json()["access"]
    print(f"  [OK] Owner authenticated, access token acquired")

    # 4. Test Renter Login (David)
    print("\n[Step 4] Testing Renter Login (David)...")
    renter_login = requests.post(
        f"{BASE_URL}/auth/login/",
        json={"email": "david.miller@agrishare.com", "password": "password123"},
    )
    assert renter_login.status_code == 200, f"Renter login failed: {renter_login.text}"
    renter_token = renter_login.json()["access"]
    print(f"  [OK] Renter authenticated, access token acquired")

    # 5. Test Authenticated Profile
    print("\n[Step 5] Testing Authenticated Profile...")
    prof_res = requests.get(
        f"{BASE_URL}/auth/profile/",
        headers={"Authorization": f"Bearer {renter_token}"},
    )
    assert prof_res.status_code == 200
    print(f"  [OK] Profile retrieved for: {prof_res.json()['email']}")

    # 6. Test Renter Creating a Booking on Owner's Equipment
    print("\n[Step 6] Testing Booking Creation by Renter...")
    from datetime import date, timedelta
    start_d = (date.today() + timedelta(days=20)).isoformat()
    end_d = (date.today() + timedelta(days=23)).isoformat() # 4 days

    booking_payload = {
        "equipment": target_eq_id,
        "start_date": start_d,
        "end_date": end_d,
        "notes": "E2E automated rental test for corn harvesting.",
    }
    book_res = requests.post(
        f"{BASE_URL}/bookings/",
        json=booking_payload,
        headers={"Authorization": f"Bearer {renter_token}"},
    )
    assert book_res.status_code == 201, f"Booking creation failed: {book_res.text}"
    booking_id = book_res.json()["id"]
    print(f"  [OK] Booking #{booking_id} created in PENDING status")

    # 7. Test Owner Approving Booking
    print("\n[Step 7] Testing Booking Approval by Owner...")
    approve_res = requests.post(
        f"{BASE_URL}/bookings/{booking_id}/approve/",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert approve_res.status_code == 200, f"Approval failed: {approve_res.text}"
    assert approve_res.json()["status"] == "APPROVED"
    print(f"  [OK] Booking #{booking_id} status transitioned to APPROVED")

    # 8. Test Marking Completed & Submitting Review
    print("\n[Step 8] Testing Rental Completion & Review Submission...")
    complete_res = requests.post(
        f"{BASE_URL}/bookings/{booking_id}/complete/",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert complete_res.status_code == 200, f"Completion failed: {complete_res.text}"
    assert complete_res.json()["status"] == "COMPLETED"
    print(f"  [OK] Booking #{booking_id} marked as COMPLETED")

    review_res = requests.post(
        f"{BASE_URL}/reviews/",
        json={
            "booking": booking_id,
            "rating": 5,
            "comment": "Superb machine, flawless performance across all 4 days of rental!",
        },
        headers={"Authorization": f"Bearer {renter_token}"},
    )
    assert review_res.status_code == 201, f"Review submission failed: {review_res.text}"
    print(f"  [OK] Verified 5-star review submitted for Booking #{booking_id}")

    # 9. Test Notifications
    print("\n[Step 9] Testing Notifications System...")
    notif_res = requests.get(
        f"{BASE_URL}/notifications/",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert notif_res.status_code == 200
    notifs = notif_res.json()
    count = notifs.get("count", len(notifs))
    print(f"  [OK] Owner has {count} notifications")

    # 10. Test Dashboard Aggregated Metrics
    print("\n[Step 10] Testing Dashboard Metrics...")
    dash_res = requests.get(
        f"{BASE_URL}/dashboard/stats/",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert dash_res.status_code == 200
    stats = dash_res.json()
    print(f"  [OK] Owner Listings: {stats['owner_metrics']['total_equipment']}")
    print(f"  [OK] Owner Completed Rentals: {stats['owner_metrics']['completed_rentals']}")
    print(f"  [OK] Owner Total Earnings: INR {stats['owner_metrics']['total_earnings']}")

    print("\n==================================================")
    print("ALL END-TO-END WORKFLOW CHECKS PASSED PERFECTLY!")
    print("==================================================")

if __name__ == "__main__":
    run_e2e_flow()
