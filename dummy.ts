import phone from '@/assets/images/phone.png';

export const DUMMY_PRODUCTS = [
  {
    _id: '64b7a0f0cd5a5b00249f842b',
    name: 'iPhone 12 Pro',
    brand: {
      name: 'Apple',
      logo: '',
    },
    description:
      'pan trunk stems serious shout furniture worried facing plain shadow chicken saddle slave sets goose weak tool phrase mill eat flies electricity wolf citizen',
    category: 'smartphones',
    image: phone.src,
    price: 599,
    stock: 21,
    SKU: 'jAO6ay',
    slug: 'iphone-12-pro-jAO6ay',
    is_featured: false,
    is_archived: false,
    is_deleted: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const DUMMY_USERS = [
  {
    _id: '64b7a0f0cd5a5b00249f842b',
    first_name: 'Chidera',
    last_name: 'Emmanuel',
    email: 'chidera@email.com',
    email_verified: true,
    auth_type: 'manual',
    role: 'admin',
    disabled: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const DUMMY_ORDERS = [
  {
    _id: '64b7a0f0cd5a5b00249f842b',
    user: '64b7a0f0cd5a5b00249f842b',
    items: [
      {
        product: DUMMY_PRODUCTS[0],
        quantity: 1,
      },
    ],
    billing_information: {
      receipent: {
        first_name: 'Chidera',
        last_name: 'Emmanuel',
        mobile_number: '1234567890',
      },
      address: {
        street: 'Chidera street',
        city: 'Ejigbo',
        state: 'Lagos',
        country: 'Nigeria',
      },
    },
    status: 'pending',
    total_price: 1200,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];
