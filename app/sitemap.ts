import { PRODUCT_CATEGORIES } from '@/constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoriesSitemaps = PRODUCT_CATEGORIES.map((category) => ({
    url: `${process.env.BASE_URL}/categories/${category.value}`,
    priority: 0.9,
  }));

  // TODO: add sitemaps for product details page..?

  return [
    {
      url: `${process.env.BASE_URL}`,
      priority: 1,
    },
    ...categoriesSitemaps,
  ];
}
