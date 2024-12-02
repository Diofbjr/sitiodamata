import { forwardRef } from "react";
import { Image } from "@shopify/hydrogen";
import { Section, SectionProps } from "~/components/section";
import { HydrogenComponentSchema } from "@weaverse/hydrogen";

// Definir as propriedades do componente NewsLetter
type NewsLetterProps = SectionProps & {
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
  imageSize?: "small" | "medium" | "large";  // Nova propriedade para tamanho da imagem
};

let NewsLetter = forwardRef<HTMLElement, NewsLetterProps>((props, ref) => {
  const {
    image,
    heading,
    subheading,
    paragraph,
    buttonText,
    buttonLink,
    buttonVariant,
    imageSize = "medium",  // Tamanho padrão
    children,
    ...rest
  } = props;

  // Define as classes para o tamanho da imagem
  const imageSizeClass = imageSize === "small" ? "w-1/3" : imageSize === "large" ? "w-full" : "w-2/3";

  return (
    <Section
      ref={ref}
      {...rest}
      containerClassName="flex flex-col md:flex-row w-full max-w-full overflow-hidden relative justify-center items-center pt-32 sm:pt-16 pb-12"
    >
      {/* Seção de Imagem */}
      <div className={`overflow-hidden flex justify-center items-center mt-8 md:mt-0 ${imageSizeClass} hidden md:block `}>
        {image?.url && (
          <Image
            data={{
              url: image.url,
              altText: image.altText || "Newsletter Image",
            }}
            className="h-full object-cover"
          />
        )}
      </div>

      {/* Seção de Conteúdo de Texto */}
      <div className="w-full md:w-1/2 overflow-hidden p-8 gap-6 flex flex-col justify-center items-center absolute md:relative z-10 text-center md:text-right">
        {children || (
          <div>
            <h2 className="text-2xl font-semibold">{heading}</h2>
            <h3 className="text-xl text-gray-500">{subheading}</h3>
            <p className="text-md text-gray-700 mt-4">{paragraph}</p>
            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className={`btn ${buttonVariant || "primary"} mt-6`}
              >
                {buttonText}
              </a>
            )}
          </div>
        )}
      </div>
    </Section>
  );
});

export default NewsLetter;

export let schema: HydrogenComponentSchema = {
  type: "newsletter",
  title: "Newsletter",
  childTypes: ["heading", "subheading", "paragraph", "newsletter-form", "image"],
  inspector: [
    {
      group: "Text Content",
      inputs: [
        { type: "text", name: "heading", label: "Heading", defaultValue: "Sign up & save 15%" },
        { type: "text", name: "subheading", label: "Subheading", defaultValue: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals." },
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
    {
      group: "Image Settings",
      inputs: [
        {
          type: "image",
          name: "image",  // Este campo permite o upload de uma imagem no painel administrativo
          label: "Image",
        },
        {
          type: "select",
          name: "imageSize",  // Novo campo para selecionar o tamanho da imagem
          label: "Image Size",
          defaultValue: "medium",  // Valor padrão
          configs: {
            options: [
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" },
            ],
          },
        },
      ],
    },
  ],
  presets: {
    gap: 20,
    children: [
      { type: "heading", content: "SIGN UP & SAVE 15%" },
      { type: "paragraph", content: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals." },
      { type: "newsletter-form" },
    ],
  },
};
