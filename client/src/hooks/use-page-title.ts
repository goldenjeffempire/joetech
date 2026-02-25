import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    if (title === "Home") {
      document.title = "JOE Technologies — AI-Driven Software Engineering";
    } else {
      document.title = `${title} | JOE Technologies`;
    }
  }, [title]);
}
