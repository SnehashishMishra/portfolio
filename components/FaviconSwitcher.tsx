"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

export default function FaviconSwitcher() {
  const { theme } = useTheme();

  useEffect(() => {
    const favicon = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement;
    if (!favicon) return;

    favicon.href = theme === "dark" ? "/logo_dark.svg" : "/logo_light.svg";
  }, [theme]);

  return null;
}
