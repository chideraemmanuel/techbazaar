import {
  ChartArea,
  ChartColumn,
  LineChart,
  ShoppingBagIcon,
  ShoppingCart,
  Users,
  Users2,
} from 'lucide-react';

export const NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/;

export const PASSWORD_VALIDATION = {
  regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,16}$/,
  hint: 'Password must be 8-16 characters long, and contain at least one numeric digit, and special character',
};

export const EMAIL_REGEX =
  /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

export const ADMIN_DASHBAORD_SIDEBAR_LINKS = [
  {
    title: 'resources',
    items: [
      {
        title: 'overview',
        href: '/admin/dashboard',
        // icon: LineChart,
        icon: ChartColumn,
      },
      {
        title: 'products',
        href: '/admin/dashboard/products',
        icon: ShoppingBagIcon,
      },
      {
        title: 'orders',
        href: '/admin/dashboard/orders',
        icon: ShoppingCart,
      },
      {
        title: 'users',
        href: '/admin/dashboard/users',
        icon: Users,
      },
    ],
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: 'smartphones',
    name: 'smartphones',
    value: 'smartphones',
  },
  {
    id: 'tablets',
    name: 'tablets',
    value: 'tablets',
  },
  {
    id: 'laptops',
    name: 'laptops',
    value: 'laptops',
  },
  {
    id: 'headphones',
    name: 'headphones',
    value: 'headphones',
  },
  {
    id: 'speakers',
    name: 'speakers',
    value: 'speakers',
  },
  {
    id: 'smartwatches',
    name: 'smartwatches',
    value: 'smartwatches',
  },
  {
    id: 'gaming-consoles',
    name: 'gaming consoles',
    value: 'gaming-consoles',
  },
];
