'use client';

import { useState, useEffect, useRef } from 'react';

const cache = new Map<string, Uint8Array>();

export function useTemplateLoader(templatePath: string) {
  const [templateBytes, setTemplateBytes] = useState<Uint8Array | null>(
    cache.get(templatePath) ?? null
  );
  const [loading, setLoading] = useState(!cache.has(templatePath));
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (cache.has(templatePath)) {
      setTemplateBytes(cache.get(templatePath)!);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    fetch(templatePath, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load template: ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        cache.set(templatePath, bytes);
        setTemplateBytes(bytes);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [templatePath]);

  return { templateBytes, loading, error };
}
