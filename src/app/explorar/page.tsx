import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Camera } from "lucide-react"


const categories = [
  "Paisajes",
  "Cultura",
  "Gastronomía",
  "Fauna",
  "Flora",
  "Playas",
  "Ciudades",
  "Festividades"
]

const images = [
  { id: 1, src: "/1.jpg", alt: "Salto Ángel", author: "Carlos Pérez" },
  { id: 2, src: "/1.jpg", alt: "Morrocoy", author: "Ana Rodríguez" },
  { id: 3, src: "/1.jpg", alt: "Caracas de noche", author: "Luis Gómez" },
  { id: 4, src: "/1.jpg", alt: "Arepa venezolana", author: "María González" },
  { id: 5, src: "/1.jpg", alt: "Tepuy Roraima", author: "Pedro Ramírez" },
  { id: 6, src: "/1.jpg", alt: "Chama en Mérida", author: "Laura Díaz" },
  // Agrega más imágenes según sea necesario
]

export default function Explorer() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 mr-6">
                <Camera className="w-8 h-8 text-primary" />
            <span className="font-bold">VenezuelaStock</span>
          </Link>
          <div className="flex-1 flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar imágenes venezolanas..."
              className="w-full md:w-[300px] lg:w-[400px]"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Button asChild variant="ghost">
              <Link href="/explorar">Explorar</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/colecciones">Colecciones</Link>
            </Button>
          </nav>
          <Button>Subir imagen</Button>
        </div>
      </header>
      <main className="container max-w-6xl mx-auto py-6 px-4">
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Categorías populares</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Imágenes destacadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end justify-start p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold">{image.alt}</h3>
                    <p className="text-sm">por {image.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
