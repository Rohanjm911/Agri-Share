export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  profile_image?: string | null;
  bio?: string;
  location?: string;
  is_staff: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  equipment_count?: number;
  created_at: string;
  updated_at: string;
}

export type EquipmentCondition = "NEW" | "EXCELLENT" | "GOOD" | "FAIR";
export type EquipmentStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE" | "INACTIVE";

export interface EquipmentImage {
  id: number;
  equipment: number;
  image: string;
  is_primary: boolean;
  created_at: string;
}

export interface EquipmentListItem {
  id: number;
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: number;
  category_name: string;
  category_slug: string;
  price_per_day: string | number;
  security_deposit: string | number;
  condition: EquipmentCondition;
  status: EquipmentStatus;
  is_available: boolean;
  location: string;
  primary_image: string | null;
  owner_name: string;
  owner_id: number;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface EquipmentDetail extends Omit<EquipmentListItem, "category"> {
  description: string;
  manufacturing_year: number;
  category: Category;
  owner: User;
  images: EquipmentImage[];
  updated_at: string;
}

export type BookingStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: number;
  equipment: number;
  equipment_detail: EquipmentListItem;
  renter: User;
  owner_name: string;
  owner_email: string;
  start_date: string;
  end_date: string;
  total_days: number;
  price_per_day: string | number;
  security_deposit: string | number;
  total_amount: string | number;
  status: BookingStatus;
  notes: string;
  can_review: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingCreatePayload {
  equipment: number;
  start_date: string;
  end_date: string;
  notes?: string;
}

export interface Review {
  id: number;
  booking: number;
  reviewer: User;
  equipment: number;
  equipment_name: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewCreatePayload {
  booking: number;
  rating: number;
  comment: string;
}

export type NotificationType =
  | "BOOKING_REQUESTED"
  | "BOOKING_APPROVED"
  | "BOOKING_REJECTED"
  | "BOOKING_CANCELLED"
  | "BOOKING_COMPLETED"
  | "REVIEW_RECEIVED"
  | "SYSTEM";

export interface Notification {
  id: number;
  recipient: number;
  sender: number | null;
  sender_name: string | null;
  notification_type: NotificationType;
  title: string;
  message: string;
  link: string;
  is_read: boolean;
  created_at: string;
}

export interface OwnerMetrics {
  total_equipment: number;
  active_listings: number;
  incoming_pending_requests: number;
  completed_rentals: number;
  total_earnings: number;
  total_reviews_received: number;
  average_rating: number;
}

export interface RenterMetrics {
  total_bookings: number;
  pending_bookings: number;
  approved_bookings: number;
  completed_bookings: number;
  total_spent: number;
}

export interface DashboardStats {
  owner_metrics: OwnerMetrics;
  renter_metrics: RenterMetrics;
  unread_notifications: number;
}

export interface DashboardOverview {
  recent_equipment: EquipmentListItem[];
  recent_requests: Booking[];
  recent_bookings: Booking[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface EquipmentFilterParams {
  category?: number;
  category_slug?: string;
  condition?: EquipmentCondition;
  status?: EquipmentStatus;
  is_available?: boolean;
  location?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
  page?: number;
}
