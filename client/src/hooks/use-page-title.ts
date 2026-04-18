import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    if (title === "Home") {
      document.title = "JOE Technologies — Apps, Websites, Automation, UI/UX & AI Solutions";
    } else {
      document.title = `${title} | JOE Technologies`;
    }
  }, [title]);
}
