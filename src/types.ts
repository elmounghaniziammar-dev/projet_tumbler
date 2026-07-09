export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  imageColor: string; // Used for SVG filling
}

export interface AccessoryOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface TechnicalSpecs {
  retentionHot: string;
  retentionCold: string;
  material: string;
  weight: string;
  dimensions: string;
  capacity: string;
  dishwasherSafe: boolean;
  bpaFree: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  basePrice: number;
  rating: number;
  reviewsCount: number;
  imageSeed: string;
  colors: ColorOption[];
  accessories: AccessoryOption[];
  specs: TechnicalSpecs;
  featured: boolean;
  tag?: string; // e.g., "Le Best-Seller", "Nouveauté", "Édition Limitée"
}

export interface CartItem {
  id: string; // Unique ID (productId + selectedColorId + accessoryId + hash(engraving))
  product: Product;
  selectedColor: ColorOption;
  selectedAccessory: AccessoryOption | null;
  engravingText: string;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  total: number;
  date: string;
  status: 'placed' | 'preparing' | 'shipped' | 'delivered';
}

export type PageType = 'home' | 'shop' | 'product' | 'cart' | 'checkout';
