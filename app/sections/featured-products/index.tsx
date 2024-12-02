import type {
  ComponentLoaderArgs,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";
import type { FeaturedProductsListQuery } from "storefrontapi.generated"; // Nome corrigido
import type { SectionProps } from "~/components/section";
import { Section, layoutInputs } from "~/components/section";
import { PRODUCT_CARD_FRAGMENT } from "~/data/fragments";

// Interface para dados de produtos destacados
interface FeaturedProductsData {}

interface FeaturedProductsProps
  extends SectionProps<FeaturedProductsLoaderData>,
    FeaturedProductsData {}

// Query GraphQL com uso do modificador @inContext
let FEATURED_PRODUCTS_QUERY = `#graphql
  query featuredProductsList($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 16) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export type FeaturedProductsLoaderData = Awaited<ReturnType<typeof loader>>;

export let loader = async ({ weaverse }: ComponentLoaderArgs) => {
  let { language, country } = weaverse.storefront.i18n;
  return await weaverse.storefront.query<FeaturedProductsListQuery>(
    FEATURED_PRODUCTS_QUERY,
    {
      variables: { country, language },
    }
  );
};

let FeaturedProducts = forwardRef<HTMLElement, FeaturedProductsProps>(
  (props, ref) => {
    let { loaderData, children, ...rest } = props;

    // Exemplo de renderização de produtos (adapte conforme necessário)
    let products = loaderData?.products?.nodes || [];

    return (
      <Section ref={ref} {...rest}>
        {children}
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.title}</h2>
              {/* Renderize outros dados do produto conforme necessário */}
            </div>
          ))}
        </div>
      </Section>
    );
  }
);

export let schema: HydrogenComponentSchema = {
  type: "featured-products",
  title: "Featured products",
  childTypes: ["featured-products-items", "heading", "subheading", "paragraph"],
  inspector: [
    {
      group: "Layout",
      inputs: layoutInputs.filter((i) => i.name !== "borderRadius"),
    },
  ],
  presets: {
    gap: 32,
    children: [
      { type: "heading", content: "Featured products" },
      { type: "featured-products-items" },
    ],
  },
};

export default FeaturedProducts;
