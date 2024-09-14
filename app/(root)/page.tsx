import { Container, Filters, Stories, Title, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/ProductsGroupList";
import { findBeats } from "@/shared/lib/find-beats";
import { Suspense } from "react";
import { GetSearchParams } from "@/shared/lib/find-beats";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findBeats(searchParams)
  return (
    <>
      <Container className="mt-5">
        <Title size="lg" text="All beats" className="text-purple-300 font-extrabold"/>
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[70px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList key={category.id} title={category.name} items={category.products} categoryId={category.id} />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
