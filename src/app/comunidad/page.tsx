'use client'

import { useState, useEffect } from 'react'
import { Search, Heart, MessageCircle, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '../../components/ui/button'

import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Textarea } from '../../components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog'

interface Post {
  id: number
  author: string
  handle: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
  timestamp: string
}

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'María Rodríguez',
    handle: '@maria_fotografia',
    content: '¡Acabo de capturar el amanecer más hermoso en el Parque Nacional Canaima! ¿Alguien más ha tenido la oportunidad de fotografiar este paraíso?',
    image: '/placeholder.svg?height=400&width=600',
    likes: 124,
    comments: [
      { id: 1, author: 'Carlos Gómez', content: '¡Increíble! Me encantaría ver más fotos.', timestamp: '1h' },
      { id: 2, author: 'Ana Martínez', content: 'El Parque Nacional Canaima es un sueño para los fotógrafos.', timestamp: '30m' },
    ],
    timestamp: '2h',
  },
  {
    id: 2,
    author: 'Carlos Gómez',
    handle: '@cgomez_landscapes',
    content: 'Buscando consejos para fotografiar la biodiversidad en Los Llanos. ¿Algún fotógrafo de naturaleza tiene recomendaciones de equipo?',
    likes: 56,
    comments: [
      { id: 3, author: 'Luis Pérez', content: 'Te recomiendo un teleobjetivo de al menos 400mm para la fauna.', timestamp: '45m' },
    ],
    timestamp: '4h',
  },
  {
    id: 3,
    author: 'Ana Martínez',
    handle: '@anamartinez_urban',
    content: 'Nuevo proyecto: documentando la arquitectura colonial en Coro. ¿Qué lugares imperdibles me recomiendan?',
    image: '/placeholder.svg?height=400&width=600',
    likes: 89,
    comments: [],
    timestamp: '6h',
  },
]

function CommentModal({ isOpen, onClose, comments, postId, onAddComment }: {
  isOpen: boolean
  onClose: () => void
  comments: Comment[]
  postId: number
  onAddComment: (postId: number, comment: string) => void
}) {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(postId, newComment)
      setNewComment('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comentarios</DialogTitle>
          <DialogDescription>Únete a la conversación y comparte tus pensamientos.</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.content}</p>
                <p className="text-sm text-muted-foreground">{comment.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <Textarea
            placeholder="Añade un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Comentar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function Community() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)

  const loadMorePosts = () => {
    // Simular carga de más posts
    const newPosts = [
      {
        id: posts.length + 1,
        author: 'Luis Pérez',
        handle: '@luisperez_travel',
        content: 'Explorando los mercados de Mérida. ¡Cuántos colores y texturas para capturar!',
        likes: Math.floor(Math.random() * 100),
        comments: [],
        timestamp: Math.floor(Math.random() * 12) + 'h',
      },
    ]
    setPosts([...posts, ...newPosts])
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [posts])

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      const newPostObject = {
        id: posts.length + 1,
        author: 'Usuario Actual',
        handle: '@usuario_actual',
        content: newPost,
        likes: 0,
        comments: [],
        timestamp: 'Ahora',
      }
      setPosts([newPostObject, ...posts])
      setNewPost('')
    }
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const openCommentModal = (postId: number) => {
    setCurrentPostId(postId)
    setCommentModalOpen(true)
  }

  const addComment = (postId: number, commentContent: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          author: 'Usuario Actual',
          content: commentContent,
          timestamp: 'Ahora'
        }
        return { ...post, comments: [...post.comments, newComment] }
      }
      return post
    }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-2xl mx-auto flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-primary" />
            <span className="font-bold">VenezuelaStock</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/explorar">Explorar</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/colecciones">Colecciones</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/comunidad">Comunidad</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="container max-w-2xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Comunidad VenezuelaStock</h1>
        <form onSubmit={handlePostSubmit} className="mb-8">
          <Textarea
            placeholder="¿Qué estás fotografiando hoy?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" size="icon">
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Adjuntar imagen</span>
            </Button>
            <Button type="submit">Publicar</Button>
          </div>
        </form>
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{post.author}</h3>
                      <span className="text-sm text-muted-foreground">{post.handle}</span>
                      <span className="text-sm text-muted-foreground">· {post.timestamp}</span>
                    </div>
                    <p className="mt-2">{post.content}</p>
                    {post.image && (
                      <Image
                        src='/1.jpg'
                        alt="Post image"
                        width={500}
                        height={300}
                        className="mt-3 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex items-center space-x-4 mt-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => handleLike(post.id)}>
                        <Heart className={`h-4 w-4 mr-1 ${post.likes > 0 ? 'fill-current text-red-500' : ''}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => openCommentModal(post.id)}>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments.length}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
      {currentPostId !== null && (
        <CommentModal
          isOpen={commentModalOpen}
          onClose={() => setCommentModalOpen(false)}
          comments={posts.find(post => post.id === currentPostId)?.comments || []}
          postId={currentPostId}
          onAddComment={addComment}
        />
      )}
    </div>
  )
}
