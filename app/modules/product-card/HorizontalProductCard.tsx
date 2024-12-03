import { Image, flattenConnection } from "@shopify/hydrogen";
import type { MoneyV2 } from "@shopify/hydrogen/storefront-api-types";
import clsx from "clsx";
import type { ProductCardFragment } from "storefrontapi.generated";
import { Link } from "~/components/link";
import { ProductTag } from "~/components/product-tag";
import { VariantPrices } from "~/components/variant-prices";
import { isDiscounted, isNewArrival } from "~/lib/utils";

export function HorizontalProductCard({
  product,
  className,
  loading,
}: {
  product: ProductCardFragment;
  className?: string;
  loading?: HTMLImageElement["loading"];
}) {
  if (!product?.variants?.nodes?.length) return null;

  let variants = flattenConnection(product.variants);
  let firstVariant = variants[0];

  if (!firstVariant) return null;

  let { image, price, compareAtPrice } = firstVariant;
  let cardLabel = "";
  if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = "Sale";
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = "Novo";
  }

  return (
    <div
      className={clsx(
        "flex items-start border border-gray-300 rounded-lg p-2 hover:shadow-lg transition-shadow gap-4",
        className
      )}
    >
      {/* Imagem do Produto */}
      <div className="relative w-1/3 aspect-[1/1] bg-background/5 group shrink-0">
        {image && (
          <Link to={`/products/${product.handle}`} prefetch="intent">
            <Image
              className="object-cover w-full opacity-0 animate-fade-in"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              aspectRatio="1/1"
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          </Link>
        )}
        {cardLabel && (
          <ProductTag className="absolute top-2.5 right-2.5 bg-background text-body uppercase">
            {cardLabel}
          </ProductTag>
        )}

        {/* Preço sobreposto na parte inferior centralizado */}
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-opacity-80 bg-black px-3 py-1 rounded text-sm"
          style={{ color: "#9CCC65" }}
        >
          <VariantPrices variant={firstVariant} />
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="flex flex-1 flex-col justify-between">
          {/* Alinhamento do título e botão */}
        <div className="flex justify-between items-start">
          <Link to={`/products/${product.handle}`} prefetch="intent">
            <span className="text-md font-medium">{product.title}</span>
            {firstVariant.sku && (
              <span className="text-sm text-gray-500">({firstVariant.sku})</span>
            )}
          </Link>
          {/* Botão alinhado à direita no desktop */}
          <div className="hidden sm:block mt-1">
            <Link
              to={`/products/${product.handle}`}
              className="px-4 py-2 border rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors"
              style={{
                borderColor: "#191817", // Cor da borda
                color: "#191817", // Cor do texto
                backgroundColor: "transparent", // Fundo transparente
              }}
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Botão em dispositivos móveis (alinhado ao final) */}
        <div className="flex sm:hidden mt-2 sm:mt-4 sm:flex-row-reverse sm:ml-4 md:mt-4">
          <Link
            to={`/products/${product.handle}`}
            className="px-2 py-1 border rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors w-3/3 sm:w-auto ml-auto"
            style={{
              borderColor: "#191817", // Cor da borda
              color: "#191817", // Cor do texto
              backgroundColor: "transparent", // Fundo transparente
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
