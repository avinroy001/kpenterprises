import { useEffect, useState } from "react";
import { fetchPageBySlug } from "../services/pageApi";

export function usePageContent(slug) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchPageBySlug(slug, controller.signal)
      .then((item) => {
        setPage(item);
        setError("");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (err.status === 404) {
          setError("not_found");
        } else {
          setError("Unable to load page content.");
        }
        setPage(null);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [slug]);

  return { page, loading, error };
}
