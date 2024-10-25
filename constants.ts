import { ChartArea, LineChart } from 'lucide-react';

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
        icon: LineChart,
      },
    ],
  },
];
