import {
  getAvailableProductByIdOrSlug,
  getAvailableProducts,
} from '@/lib/data/product';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getAvailableProducts();

  // return data.map((product) => product.slug);
  return data.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const product = await getAvailableProductByIdOrSlug(slug);

  if (!product) notFound();

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.BASE_URL}/products/${slug}`,
    },
  };
}

const ProductDetailsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProductDetailsLayout;
