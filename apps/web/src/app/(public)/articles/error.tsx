"use client";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: { error: ErrorProps }) {
  useEffect(() => {
    console.error(error);
  });

  return (
    <p className="news-empty__copy">
      Unable to load articles right now. Please check your network or try again
      later.
    </p>
  );
}
