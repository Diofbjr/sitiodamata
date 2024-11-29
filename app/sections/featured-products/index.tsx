import type {
  ComponentLoaderArgs,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";
import type { FeaturedProductsQuery } from "storefrontapi.generated";
import type { SectionProps } from "~/components/section";
import { Section, layoutInputs } from "~/components/section";
import { PRODUCT_CARD_FRAGMENT } from "~/data/fragments";

// Interface para dados de produtos destacados
interface FeaturedProductsData {}

interface FeaturedProductsProps
  extends SectionProps<FeaturedProductsLoaderData>,
    FeaturedProductsData {}

// Query GraphQL renomeada para evitar conflito
let FEATURED_PRODUCTS_QUERY = `#graphql
  query featuredProductsList($country: CountryCode, $language: LanguageCode) {
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
  return await weaverse.storefront.query<FeaturedProductsQuery>(
    FEATURED_PRODUCTS_QUERY,
    {
      variables: {
        country,
        language,
      },
    }
  );
};

let FeaturedProducts = forwardRef<HTMLElement, FeaturedProductsProps>(
  (props, ref) => {
    let { loaderData, children, ...rest } = props;
    return (
      <Section ref={ref} {...rest}>
        {children}
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
