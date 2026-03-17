import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import Navbar from "@/components/Navbar";
import FloatingChatButton from "@/components/FloatingChatButton";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Diagnostic from "./pages/Diagnostic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname === "/diagnostico";
  const showFloating = location.pathname !== "/diagnostico";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/empresas" element={<Companies />} />
        <Route path="/empresas/:id" element={<CompanyDetail />} />
        <Route path="/diagnostico" element={<Diagnostic />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFloating && <FloatingChatButton />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
