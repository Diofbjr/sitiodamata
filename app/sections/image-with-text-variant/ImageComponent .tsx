import { forwardRef } from "react";
import { Image } from "@shopify/hydrogen";
import { Section } from "~/components/section"; 
import type { SectionProps } from "~/components/section";
import TextContent from "./TextContent";


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

let ImageSection = forwardRef<HTMLElement, ImageSectionProps>((props, ref) => {
  let {
    children,
    image,
    heading,
    subheading,
    paragraph,
    buttonText,
    buttonLink,
    buttonVariant,
    ...rest
  } = props;

  return (
    <Section
      ref={ref}
      {...rest}
      containerClassName="flex flex-col md:flex-row w-screen max-w-full overflow-hidden"
    >
      <div className="w-full md:w-1/2 bg-gray-100 overflow-hidden">
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
      </div>
      <div className="w-full md:w-1/2 overflow-hidden">
        {image?.url && (
          <Image
            data={{
              url: image.url,
              altText: image.altText || "Section Image",
            }}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </Section>
  );
});

export default ImageSection;
