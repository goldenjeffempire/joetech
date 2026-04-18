import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    if (title === "Home") {
      document.title = "JOE Technologies — Apps, Websites, Digital Systems & AI Solutions";
    } else {
      document.title = `${title} | JOE Technologies`;
    }
  }, [title]);
}
