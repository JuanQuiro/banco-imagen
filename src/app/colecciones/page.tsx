import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Camera } from "lucide-react"

const collections = [
  {
    id: 1,
    title: "Parques Nacionales",
    description: "Bellezas naturales de Venezuela",
    imageCount: 120,
    coverImage: "/1.jpg",
  },
  {
    id: 2,
    title: "Gastronomía Venezolana",
    description: "Sabores y platos típicos",
    imageCount: 85,
    coverImage: "/1.jpg",
  },
  {
    id: 3,
    title: "Carnaval de El Callao",
    description: "Tradiciones y colores",
    imageCount: 64,
    coverImage: "/1.jpg",
  },
  {
    id: 4,
    title: "Arquitectura Colonial",
    description: "Historia en cada rincón",
    imageCount: 92,
    coverImage: "/1.jpg",
  },
  {
    id: 5,
    title: "Aves del Orinoco",
    description: "Biodiversidad alada",
    imageCount: 150,
    coverImage: "/1.jpg",
  },
  {
    id: 6,
    title: "Playas del Caribe",
    description: "Paraísos costeros",
    imageCount: 110,
    coverImage: "/1.jpg",
  },
  {
    id: 7,
    title: "Tepuyes y Mesetas",
    description: "Formaciones geológicas únicas",
    imageCount: 78,
    coverImage: "/1.jpg",
  },
  {
    id: 8,
    title: "Artesanía Indígena",
    description: "Arte y tradición ancestral",
    imageCount: 56,
    coverImage: "/1.jpg",
  },
]

export default function Collections() {
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
              placeholder="Buscar colecciones..."
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
        <h1 className="text-3xl font-bold mb-6 text-center">Colecciones de VenezuelaStock</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link href={`/colecciones/${collection.id}`} key={collection.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-2">
                <Image
                  src={collection.coverImage}
                  alt={collection.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-xl font-bold">{collection.title}</h2>
                    <p className="text-sm">{collection.imageCount} imágenes</p>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold">{collection.title}</h3>
              <p className="text-sm text-muted-foreground">{collection.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
