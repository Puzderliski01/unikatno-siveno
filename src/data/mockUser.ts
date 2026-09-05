import { User, PurchaseHistoryItem, ExclusiveInvitation } from '../types';
import { PRODUCTS } from './products';

export const MOCK_USER: User = {
  id: 'user-001',
  fullName: 'Ana Petrović',
  email: 'ana.petrovic@email.com',
  phone: '+381 60 123-4567',
  joinDate: '2023-05-15',
  loyaltyPoints: 2450,
  vipLevel: 'gold',
  purchaseHistory: [
    {
      id: 'order-001',
      date: '2024-01-15',
      productId: 'larisa-dress',
      productName: 'Haljina "Larisa"',
      size: 'S (36)',
      price: 7990,
      status: 'delivered'
    },
    {
      id: 'order-002',
      date: '2024-03-22',
      productId: 'olivia-dress',
      productName: 'Haljina "Olivia"',
      size: 'M (38)',
      price: 7990,
      status: 'delivered'
    },
    {
      id: 'order-003',
      date: '2024-05-10',
      productId: 'julliet-top',
      productName: 'Top "Jullyet"',
      size: 'S (36)',
      price: 4490,
      status: 'delivered'
    },
    {
      id: 'order-004',
      date: '2024-07-03',
      productId: 'crvena-asimetricna-haljina',
      productName: 'Crvena asimetrična haljina "Linda"',
      size: 'L (40)',
      price: 9990,
      status: 'delivered'
    }
  ],
  wishlist: [
    'kaliope-dress',
    'crna-asimetricna',
    'gaby-jacket'
  ],
  exclusiveInvitations: [
    {
      id: 'inv-001',
      title: 'Pregled nove letnje kolekcije 2025',
      description: 'Eksklusivni preview naše nove letnje kolekcije pre officialnog launches',
      date: '2024-12-15',
      type: 'new_collection',
      expiresAt: '2024-12-14',
      isRsvp: true,
      rsvpStatus: 'pending'
    },
    {
      id: 'inv-002',
      title: 'Privatna prodaja - 30% popust na sve haljine',
      description: 'Eksklusivna prilika za naše najvip klijente',
      date: '2025-01-10',
      type: 'private_sale',
      expiresAt: '2025-01-09',
      isRsvp: true,
      rsvpStatus: 'accepted'
    },
    {
      id: 'inv-003',
      title: 'Večer modne izložbe u Ateljeu',
      description: 'Poziv na eksklusivnu večer uz koktail i muzyku',
      date: '2025-02-28',
      type: 'event',
      expiresAt: '2025-02-27',
      isRsvp: true,
      rsvpStatus: 'pending'
    }
  ]
};

// Helper function to get product by ID
export const getProductById = (id: string): import('../types').Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

// Helper function to get user's wishlist products
export const getWishlistProducts = (): import('../types').Product[] => {
  return MOCK_USER.wishlist
    .map(id => getProductById(id))
    .filter((product): product is import('../types').Product => product !== undefined);
};

// Helper function to get user's purchase history with product details
export const getPurchaseHistoryWithDetails = (): Array<PurchaseHistoryItem & { product: import('../types').Product }> => {
  return MOCK_USER.purchaseHistory
    .map(item => ({
      ...item,
      product: getProductById(item.productId) as import('../types').Product
    }))
    .filter(item => item.product !== undefined);
};