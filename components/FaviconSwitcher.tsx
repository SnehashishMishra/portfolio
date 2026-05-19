"use client";

import { useEffect } from "react";

import { useTheme } from "@/components/theme-provider";

export default function FaviconSwitcher() {
  const { theme } = useTheme();

  useEffect(() => {
    const FAVICON_ID = "theme-favicon";

    // Find or create a dedicated <link> for the theme-aware favicon
    let link = document.getElementById(FAVICON_ID) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = FAVICON_ID;
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }

    // Cache-bust with timestamp so the browser actually swaps the icon
    const iconPath = theme === "dark" ? "/logo_dark.svg" : "/logo_light.svg";
    link.href = `${iconPath}?v=${Date.now()}`;
  }, [theme]);

  return null;
}
