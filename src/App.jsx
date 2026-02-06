import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <main className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
