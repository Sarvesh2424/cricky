"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const modeContext = createContext();

function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [addMode, setAddMode] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <modeContext.Provider value={{ addMode, setAddMode }}>
        {children}
      </modeContext.Provider>
    </QueryClientProvider>
  );
}

export default QueryProvider;
