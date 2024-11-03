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
        title: 'brands',
        href: '/admin/dashboard/brands',
        icon: LineChart,
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
    name: 'smartphones',
    value: 'smartphones',
  },
  {
    name: 'tablets',
    value: 'tablets',
  },
  {
    name: 'laptops',
    value: 'laptops',
  },
  {
    name: 'headphones',
    value: 'headphones',
  },
  {
    name: 'speakers',
    value: 'speakers',
  },
  {
    name: 'smartwatches',
    value: 'smartwatches',
  },
  {
    name: 'gaming consoles',
    value: 'gaming-consoles',
  },
];

export const PRODUCTS_SORT_ITEMS = [
  {
    name: 'name',
    value: 'name',
  },
  {
    name: 'price',
    value: 'price',
  },
  {
    name: 'date created',
    value: 'date_created',
  },
  {
    name: 'date updated',
    value: 'date_updated',
  },
];

export const BRANDS_SORT_ITEMS = [
  {
    name: 'name',
    value: 'name',
  },
  {
    name: 'date created',
    value: 'date_created',
  },
  {
    name: 'date updated',
    value: 'date_updated',
  },
];
