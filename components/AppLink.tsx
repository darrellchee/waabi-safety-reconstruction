"use client";

import { forwardRef, type ComponentProps } from "react";
import NextLink from "next/link";
import { Link as TransitionLink } from "next-view-transitions";

/** Only route changes use the reference's native snapshot transition. */
const AppLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(
  function AppLink({ href, onClick, ...props }, ref) {
    const localRoute = typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
    const Link = localRoute ? TransitionLink : NextLink;
    return <Link {...props} ref={ref} href={href} onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented || !localRoute) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || (props.target && props.target !== "_self")) return;
      const destination = new URL(String(href), location.href);
      if (destination.pathname === location.pathname && destination.search === location.search) {
        // Scroll anchors directly; never snapshot an unchanged route.
        event.preventDefault();
        if (destination.hash) {
          document.getElementById(decodeURIComponent(destination.hash.slice(1)))?.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          });
          history.pushState(history.state, "", destination.hash);
        }
      }
    }} />;
  },
);
export default AppLink;
