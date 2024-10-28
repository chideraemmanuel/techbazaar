import DataTablePagination from '@/components/data-table-pagination';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RiFilter3Line, RiSortDesc } from '@remixicon/react';
import { FC } from 'react';

interface Props {}

const CategoryPage: FC<Props> = () => {
  return (
    <>
      {/* hero */}
      <section className="h-[50vh] bg-secondary"></section>

      <section className="pt-7 container grid md:grid-cols-[250px,_1fr]">
        <aside className="sticky top-[calc(80px+8px)] border border-border h-[calc(100vh-80px-16px)] hidden md:block">
          <ScrollArea className="h-full p-3">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
              distinctio sequi asperiores ullam! Consequuntur ducimus dicta quam
              doloribus quibusdam repellat fugiat perspiciatis praesentium,
              nihil, exercitationem nobis minima error voluptatibus, molestias
              maiores quaerat veritatis libero eligendi? Iste magnam,
              accusantium quia sit consectetur facere tempore doloremque,
              voluptatibus a, quae ratione expedita alias nobis quos aliquid id.
              A fugiat facilis sapiente doloremque ipsam id, quod nihil, ratione
              soluta odio dolores culpa ullam, quos quibusdam blanditiis libero
              laudantium illo quisquam dolor! Ipsum, maiores quisquam culpa
              fugiat ea, soluta blanditiis totam necessitatibus illo consectetur
              harum assumenda. Tempore, sunt explicabo? Doloremque debitis,
              dolorem sit eaque nemo rerum dolores modi quae quis animi esse cum
              iusto recusandae iure. Autem ut cum facere voluptas maiores atque!
              Adipisci debitis molestiae vel corrupti exercitationem eius amet
              reiciendis veniam repudiandae. Pariatur expedita, perferendis
              vitae ducimus exercitationem optio, eveniet accusamus aut, animi
              veritatis cupiditate quasi vero nisi consectetur minima? Voluptate
              maiores aliquid esse, soluta placeat nihil voluptates ratione vero
              quis nemo expedita molestias, necessitatibus inventore tenetur
              corrupti ipsum, quas perspiciatis totam voluptas hic architecto
              vel! Recusandae voluptatem odit aperiam officia ipsa. Doloribus
              harum ipsa ex, voluptate accusamus dolor molestias eaque cumque?
              Et, in omnis? Id labore maiores tempore culpa? Cupiditate
              obcaecati voluptas doloribus molestias quaerat debitis, voluptate,
              repudiandae iusto exercitationem reiciendis nisi, quasi nemo.
              Quaerat ducimus, ea nobis, velit porro molestias deserunt, nisi
              illo explicabo maxime voluptatibus atque ipsa dolores quisquam
              harum vel totam beatae laudantium aut odit amet. Dicta, ab.
              Eveniet accusamus ratione eligendi quos dignissimos excepturi est
              totam consequatur veritatis at. Nobis voluptas iure quidem sed
              quis animi ullam ut est blanditiis eius recusandae porro commodi,
              odit soluta cumque, accusantium voluptatem, ducimus dolores itaque
              perspiciatis? Nihil tenetur architecto optio iure reiciendis id
              nisi tempora eos sunt excepturi iste cum, saepe, culpa molestiae
              magni. Odit accusamus ut, assumenda nesciunt quas eos.
            </p>
          </ScrollArea>
        </aside>

        <div className="container">
          <div className="flex md:hidden justify-end space-x-2 mb-5">
            <Button size={'sm'} variant={'outline'}>
              <RiFilter3Line />
              <span className="inline-block">Filter</span>
            </Button>

            <Button size={'sm'} variant={'outline'}>
              <RiSortDesc />
              <span className="inline-block">Sort</span>
            </Button>
          </div>

          {/* <div className="flex items-center justify-center h-[calc(100vh-80px)] md:h-full">
            <span className="text-muted-foreground">
              No products to display
            </span>
          </div> */}

          <div className="grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-4 sm:gap-5 mb-10">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          <div className="flex justify-center pb-7">
            <DataTablePagination totalPages={50} totalPagesToDisplay={3} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
