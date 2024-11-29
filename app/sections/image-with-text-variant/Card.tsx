import Button from "~/components/button";

type CardProps = {
  imgSrc: string;
  title: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "primary" | "secondary" | "link" | "outline" | "custom";
};

const Card = ({
  imgSrc,
  title,
  buttonText = "Saiba Mais",
  buttonLink = "#",
  buttonVariant = "primary",
}: CardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-row w-full max-w-sm">
      {/* Seção da imagem */}
      <div className="flex-shrink-0">
        <img
          src={imgSrc}
          alt={title}
          className="w-12 h-12 object-cover rounded-full"  // Imagem com tamanho reduzido
          width={48}
          height={48}
        />
      </div>

      {/* Seção do conteúdo do card */}
      <div className="flex flex-col justify-between ml-4 w-full">
        <h1 className="text-lg font-semibold">{title}</h1>

        {/* Botão posicionado no final */}
        <div className="mt-auto">
          <Button
            variant={buttonVariant}
            onClick={() => (window.location.href = buttonLink)}
            className="mt-4"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
