import Button from "~/components/button";

type TextContentProps = {
    heading?: string;
    subheading?: string;
    paragraph?: string;
    buttonText?: string;
    buttonLink?: string;
    buttonVariant?: "primary" | "secondary" | "link" | "outline" | "custom";
};
  
const TextContent = ({
    heading = "Default Heading",
    subheading = "Default Subheading",
    paragraph = "This is a default paragraph. Customize this section with your content.",
    buttonText = "Learn More",
    buttonLink = "#",
    buttonVariant = "primary",
}: TextContentProps) => {
    return (
      <div className="p-8 flex flex-col">
        {heading && <h1 className="text-2xl font-bold">{heading}</h1>}
        {subheading && <h2 className="text-xl font-semibold text-gray-600 mt-6">{subheading}</h2>}
        {paragraph && <p className="text-gray-700 mt-6">{paragraph}</p>}
        {buttonText && (
          <Button
            variant={buttonVariant}
            className="mt-6"
            onClick={() => window.location.href = buttonLink}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
};
  
export default TextContent;