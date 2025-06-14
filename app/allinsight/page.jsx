// app/Allinsight/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AllinsightPage() {
  useEffect(() => {
    document.title = "allinsight";
  }, []);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/allinsight");
    }, 100); // delay just enough for title to be applied

    return () => clearTimeout(timer);
  }, [router]);

  return null;;  // unchanged line
}