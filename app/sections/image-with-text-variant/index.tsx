import { forwardRef } from "react";
import { Image } from "@shopify/hydrogen";
import { Section, SectionProps } from "~/components/section";
import TextContent from "./TextContent";
import { PRODUCT_CARD_FRAGMENT } from "~/data/fragments";
import type { FeaturedProductsQuery } from "storefrontapi.generated";
import type { ComponentLoaderArgs, HydrogenComponentSchema } from "@weaverse/hydrogen";
import { HorizontalProductCard } from "~/modules/product-card/HorizontalProductCard";

// Definir as propriedades do componente ImageSection
type ImageSectionProps = SectionProps & {
  image?: {
    url: string;
    altText?: string;
  };
  heading?: string;
  subheading?: string;
  paragraph?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "primary" | "secondary" | "link" | "outline" | "custom";
};

// Query GraphQL renomeada para evitar conflito
let FEATURED_PRODUCTS_QUERY = `#graphql
  query imageSectionFeaturedProducts($country: CountryCode, $language: LanguageCode) {
    products(first: 3) {
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
  return await weaverse.storefront.query<FeaturedProductsQuery>(FEATURED_PRODUCTS_QUERY, {
    variables: { country, language },
  });
};

const ImageSection = forwardRef<HTMLElement, ImageSectionProps>((props, ref) => {
  const {
    image,
    heading,
    subheading,
    paragraph,
    buttonText,
    buttonLink,
    buttonVariant,
    loaderData,
    children,
    ...rest
  } = props;

  let { products } = loaderData || { products: { nodes: [] } };

  // Limitar o número de cards a 3
  const limitedProducts = products.nodes.slice(0, 3);

  return (
    <Section
      ref={ref}
      {...rest}
      containerClassName="flex flex-col md:flex-row w-screen max-w-full overflow-hidden relative"
    >
      {/* Text Content Section */}
      <div className="w-full md:w-1/2 overflow-hidden p-8 gap-6 absolute md:relative z-10 border-red-600">
        {children || (
          <TextContent
            heading={heading}
            subheading={subheading}
            paragraph={paragraph}
            buttonText={buttonText}
            buttonLink={buttonLink}
            buttonVariant={buttonVariant}
          />
        )}

        {products && (
          <div className="mt-8">
            <div className="flex flex-col gap-6">
              {limitedProducts.map((product) => (
                <HorizontalProductCard
                  key={product.id}
                  product={product}
                  className="w-full bg-white md:mt-2"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Background Image Section */}
      <div className="w-full md:w-1/2 overflow-hidden md:relative md:mt-0">
        {image?.url && (
          <Image
            data={{
              url: image.url,
              altText: image.altText || "Section Image",
            }}
            className="w-full h-full object-cover md:transform md:translate-x-0 transform translate-x-1/2 mt-40"
          />
        )}
      </div>
    </Section>
  );
});

// Modificando o schema para incluir a configuração de gap
export let schema: HydrogenComponentSchema = {
  type: "image-section",
  title: "Image Section with Products",
  childTypes: ["heading", "subheading", "paragraph", "button", "featured-products-items"],
  inspector: [
    {
      group: "Text Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Default Heading",
        },
        {
          type: "text",
          name: "subheading",
          label: "Subheading",
          defaultValue: "Default Subheading",
        },
        { type: "textarea", name: "paragraph", label: "Paragraph", defaultValue: "This is a default paragraph." },
        { type: "text", name: "buttonText", label: "Button Text", defaultValue: "Learn More" },
        { type: "url", name: "buttonLink", label: "Button Link", defaultValue: "#" },
        {
          type: "select",
          name: "buttonVariant",
          label: "Button Variant",
          defaultValue: "primary",
          configs: {
            options: [
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Link", value: "link" },
              { label: "Outline", value: "outline" },
              { label: "Custom", value: "custom" },
            ],
          },
        },
      ],
    },
  ],
  presets: {
    verticalPadding: "none",
    alignment: "center",
    children: [
      { type: "heading", content: "Heading for image" },
      { type: "subheading", content: "Subheading for image" },
      { type: "paragraph", content: "This is a paragraph explaining the image and products." },
      { type: "button", text: "Shop now" },
    ],
  },
};

export default ImageSection;
