import type { LayoutQuery } from "storefrontapi.generated";
import type { EnhancedMenu } from "~/lib/utils";
import { Footer } from "./footer";
import { Header } from "./header";

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function Layout({ children, layout }: LayoutProps) {
  let { headerMenu, footerMenu } = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        {/* Link para pular diretamente ao conteúdo */}
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        {/* Cabeçalho com menu, se disponível */}
        {headerMenu && layout?.shop.name && (
          <Header shopName={layout.shop.name} menu={headerMenu} />
        )}

        {/* Conteúdo principal */}
        <main id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>

      {/* Rodapé com menu, se disponível */}
      {footerMenu && layout?.shop.name && (
        <Footer shopName={layout.shop.name} menu={footerMenu} />
      )}
    </>
  );
}
