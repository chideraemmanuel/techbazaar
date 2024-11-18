import { PRODUCT_CATEGORIES } from '@/constants';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  // return PRODUCT_CATEGORIES.map((category) => category.value);
  return PRODUCT_CATEGORIES.map((category) => ({
    category: category.value,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params;

  const categoryExists = PRODUCT_CATEGORIES.find(
    (product_category) => product_category.value === category
  );

  if (!categoryExists) notFound();

  return {
    title: `${categoryExists.name
      .charAt(0)
      .toUpperCase()}${categoryExists.name.slice(1)}`,
    description: categoryExists.hero_paragraph,
    keywords: [],
    openGraph: {
      title: categoryExists.hero_header,
      description: categoryExists.hero_paragraph,
      images: [
        {
          url: categoryExists.hero_image,
          width: 1200,
          height: 630,
          alt: categoryExists.name,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.BASE_URL}/categories/${category}`,
    },
  };
}

const CategoryLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default CategoryLayout;
