'use client'

import { useRouter } from "next/navigation"; // Asegúrate de tener esta importación
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Camera, Heart, LogIn, LogOut, Menu, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Navbar Component
const Navbar = ({
  isLoggedIn,
  toggleLogin,
  mobileMenuOpen,
  setMobileMenuOpen,
  router
}: {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  router: ReturnType<typeof useRouter>;
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">VenezuelaStock</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/explorar">Explorar</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/colecciones">Colecciones</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/comunidad">Comunidad</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Upload className="w-4 h-4 mr-2" /> Subir
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={toggleLogin} className="hidden md:flex">
              {isLoggedIn ? <LogOut className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
              {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="sr-only">Menú</span>
            </Button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors" href="/explorar">Explorar</Link>
            <Link className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors" href="/colecciones">Colecciones</Link>
            <Link className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors" href="/comunidad">Comunidad</Link>
            {isLoggedIn && (
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" /> Subir
              </Button>
            )}

             <Button variant="ghost" size="sm" onClick={() => {
              if (!isLoggedIn) {
                router.push('http://localhost:3000/api/auth/callback/');
              } else {
                toggleLogin();
              }
            }} className="hidden md:flex">
              {isLoggedIn ? <LogOut className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
              {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
            </Button>

          </div>
        </div>
      )}
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
      <Image
        alt="Paisaje venezolano"
        className="absolute inset-0 object-cover w-full h-full"
        height="500"
        src="/1.jpg"
        style={{ aspectRatio: "1000/500", objectFit: "cover" }}
        width="1000"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Descubre Venezuela en imágenes</h1>
        <p className="text-lg sm:text-xl text-white mb-8">La belleza de nuestro país en alta resolución</p>
        <div className="flex justify-center">
          <Input className="w-full max-w-xs sm:max-w-sm md:max-w-md" placeholder="Busca imágenes de Venezuela..." type="search" />
          <Button className="ml-2" type="submit">Buscar</Button>
        </div>
      </div>
    </section>
  );
};

// Featured Images Section Component
const FeaturedImagesSection = () => {
  return (
    <section className="py-8 sm:py-12 px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Imágenes destacadas</h2>
      <div className="text-center mt-6 sm:mt-8">
        <Button>Ver más imágenes</Button>
      </div>
    </section>
  );
};

// Main Component
export default function Component() {
    const router = useRouter(); // Inicializa el enrutador
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isLoggedIn={isLoggedIn}
        router={router}
        toggleLogin={toggleLogin}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-1">
        <HeroSection />
        <FeaturedImagesSection />
      </main>
      <footer className="bg-gray-100 py-6 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-gray-600">© 2024 VenezuelaStock. Todos los derechos reservados.</p>
          </div>
          <nav className="flex space-x-4">
            <Link className="text-sm text-gray-600 hover:underline" href="#">Acerca de</Link>
            <Link className="text-sm text-gray-600 hover:underline" href="#">Términos</Link>
            <Link className="text-sm text-gray-600 hover:underline" href="#">Privacidad</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

