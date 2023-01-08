import { useEffect, useState } from "react";

export function useFakeBackend<T>(jsonUrl: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(jsonUrl);
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [jsonUrl]);

  return { data, loading, error };
}

export default useFakeBackend;
