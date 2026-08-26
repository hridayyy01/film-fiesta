import { useEffect, useState } from "react";

function useFetch(initialURL) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(initialURL);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(initialURL);
  }, [initialURL]);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setError(null);
        } else {
          setData(null);
          setError({ status: res.status, msg: res.statusText });
        }
      } catch (ex) {
        if (ex.name !== "AbortError") {
          console.warn(ex);
          setData(null);
          setError({ status: 423, msg: ex.message });
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error, setUrl };
}
export default useFetch;
