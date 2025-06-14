import React from "react";
import { AllinsightProvider } from "./provider";

export const metadata = {
  title: "Allinsight",
  description: "Allinsight layout",
};

export default function AllinsightLayout({ children }) {
  return (
    <AllinsightProvider>
      {children}
    </AllinsightProvider>
  );
}
