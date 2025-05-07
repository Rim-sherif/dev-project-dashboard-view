
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Developers from "./pages/developers/Developers";
import AddDeveloper from "./pages/developers/AddDeveloper";
import Projects from "./pages/projects/Projects";
import AddProject from "./pages/projects/AddProject";
import Properties from "./pages/properties/Properties";
import AddProperty from "./pages/properties/AddProperty";
import Images from "./pages/images/Images";
import UploadImages from "./pages/images/UploadImages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/developers/add" element={<AddDeveloper />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/add" element={<AddProperty />} />
          <Route path="/images" element={<Images />} />
          <Route path="/images/upload" element={<UploadImages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
