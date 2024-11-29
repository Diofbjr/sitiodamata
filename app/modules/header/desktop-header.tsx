import {
  Await,
  Link,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { useThemeSettings } from "@weaverse/hydrogen";
import { Suspense, useEffect, useState } from "react";
import useWindowScroll from "react-use/esm/useWindowScroll";
import { IconMagnifyingGlass, IconUser } from "~/components/icons";
import { Logo } from "~/components/logo";
import { cn } from "~/lib/cn";
import { type EnhancedMenu, useIsHomePath } from "~/lib/utils";
import { PredictiveSearch } from "~/modules/predictive-search";
import type { RootLoader } from "~/root";
import { Drawer, useDrawer } from "../drawer";
import { CartCount } from "./cart-count";
import { DesktopMenu } from "./menu/desktop-menu";

export function DesktopHeader({
  menu,
  openCart,
  shopName,
}: {
  openCart: () => void;
  menu?: EnhancedMenu;
  shopName: string;
}) {
  let { enableTransparentHeader, topbarHeight } = useThemeSettings();
  let isHome = useIsHomePath();
  let { y } = useWindowScroll();
  let routeError = useRouteError();

  let scrolled = y >= 50;
  let enableTransparent = enableTransparentHeader && isHome && !routeError;
  let isTransparent = enableTransparent && !scrolled;

  return (
    <header
      style={
        {
          "--initial-topbar-height": `${topbarHeight}px`,
        } as React.CSSProperties
      }
      className={cn(
        "transition-colors duration-300 ease-in-out",
        "hidden lg:flex flex-col items-center z-10 leading-none gap-0", // Removendo gap extra entre as partes
        "text-[var(--color-header-text)]",
        scrolled && "shadow-header",
        enableTransparent
          ? [
              "fixed top-[var(--topbar-height,var(--initial-topbar-height))] w-screen",
              !scrolled &&
                "text-[var(--color-transparent-header-text)] bg-transparent border-transparent",
            ]
          : "sticky top-0"
      )}
    >
      <div className="w-full bg-white shadow-lg">
        <div className="flex items-center w-full justify-between py-4 md:px-10 lg:px-16">
          <Logo isTransparent={isTransparent} shopName={shopName} />
          <div className="flex-grow flex justify-center"> 
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-1">
            <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-body/5" />
            <CartCount
              isHome={isHome}
              openCart={openCart}
              isTransparent={isTransparent}
            />
          </div>
        </div>
      </div>
      {menu && (
        <div className="w-full bg-[#F5F5F5] md:px-10 lg:px-16 py-6">
        <DesktopMenu menu={menu} />
      </div>
      )}
    </header>
  );
}

function AccountLink({ className }: { className?: string }) {
  let rootData = useRouteLoaderData<RootLoader>("root");
  let isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconUser className="w-5 h-5" />}>
        <Await
          resolve={isLoggedIn}
          errorElement={<IconUser className="w-5 h-5" />}
        >
          {(isLoggedIn) =>
            isLoggedIn ? (
              <IconUser className="w-5 h-5" />
            ) : (
              <IconUser className="w-5 h-5" />
            )
          }
        </Await>
      </Suspense>
    </Link>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-64 h-8 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <IconMagnifyingGlass className="absolute right-3 w-5 h-5 text-gray-500" />
    </div>
  );
}
