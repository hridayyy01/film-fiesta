import React, { useCallback, useEffect, useState } from "react";

function useFetch(initialURL) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(initialURL);
  const [error, setError] = useState(null);
  const controller = new AbortController();
  const fetchData = useCallback(async() => {
    try {
      setIsLoading(true);
      const res = await fetch(url, { signal: controller.signal });
      if (res.ok) {
        const data = await res.json();
        setData(data);
        setError(null);
      } else {
        setData([]);
        setError({ status: res.status, msg: res.statusText });
      }
    } catch (ex) {
      if (ex.name !== "AbortError") {
        console.warn(ex);
        setError({ status: 423, msg: ex.message });
      }
    } finally {
      setIsLoading(false);
    }
  },[url]);

  useEffect(() => {
    fetchData();
    return () => {
      controller.abort();
    };
  }, [fetchData]);
  return { data, isLoading, error, setUrl };
}
export default useFetch;