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
    icon: LineChart,
    image: '',
  },
  {
    name: 'tablets',
    value: 'tablets',
    icon: LineChart,
    image: '',
  },
  {
    name: 'laptops',
    value: 'laptops',
    icon: LineChart,
    image: '',
  },
  {
    name: 'headphones',
    value: 'headphones',
    icon: LineChart,
    image: '',
  },
  {
    name: 'speakers',
    value: 'speakers',
    icon: LineChart,
    image: '',
  },
  {
    name: 'smartwatches',
    value: 'smartwatches',
    icon: LineChart,
    image: '',
  },
  {
    name: 'gaming consoles',
    value: 'gaming-consoles',
    icon: LineChart,
    image: '',
  },
];

export const STORE_SIDEBAR_LINKS = [
  {
    title: 'categories',
    items: PRODUCT_CATEGORIES.map((category) => {
      return {
        title: category.name,
        href: `/categories/${category.value}`,
        icon: category.icon,
      };
    }),
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

export const ORDERS_SORT_ITEMS = [
  {
    name: 'date created',
    value: 'date_created',
  },
  {
    name: 'date updated',
    value: 'date_updated',
  },
];

export const ORDER_STATUSES_SORT_ITEMS = [
  {
    name: 'pending',
    value: 'pending',
  },
  {
    name: 'processing',
    value: 'processing',
  },
  {
    name: 'in transit',
    value: 'in-transit',
  },
  // {
  //   name: 'dispatched',
  //   value: 'dispatched',
  // },
  {
    name: 'partially shipped',
    value: 'partially-shipped',
  },
  {
    name: 'out for delivery',
    value: 'out-for-delivery',
  },
  {
    name: 'shipped',
    value: 'shipped',
  },
  {
    name: 'delivered',
    value: 'delivered',
  },
  {
    name: 'cancelled',
    value: 'cancelled',
  },
];

export const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombi',
  'Comoros',
  'Congo (Brazzaville)',
  'Congo',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor (Timor Timur)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia, The',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea, North',
  'Korea, South',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia and Montenegro',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
