import { useState, useRef } from 'react'
import { MessageCircle, Play } from 'lucide-react'

const VideoApresentacao = () => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const whatsappUrl = `https://wa.me/5521994078286?text=${encodeURIComponent('Oi Fabiano! Vi seu vídeo no site e quero entender como isso pode funcionar para o meu negócio.')}`

  const handlePlay = () => {
    setPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto max-w-4xl">

        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
            Quem está por trás disso tudo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
            Deixa eu te explicar em 2 minutos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
              o que faço e como posso ajudar o seu negócio.
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Assiste ao vídeo. Se fizer sentido, é só clicar no botão abaixo — te respondo em minutos.
          </p>
        </div>

        {/* Player com thumbnail e overlay de play */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-black aspect-video mb-8 group cursor-pointer" onClick={handlePlay}>
          <video
            ref={videoRef}
            src="/videos/video2.mp4"
            className="w-full h-full object-cover"
            controls={playing}
            playsInline
            preload="metadata"
          />
          {!playing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors duration-200">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-2xl shadow-green-500/40 group-hover:scale-110 transition-transform duration-200 mb-4">
                <Play size={36} fill="white" className="text-white ml-1" />
              </div>
              <p className="text-white font-bold text-lg">Assistir apresentação</p>
              <p className="text-gray-300 text-sm mt-1">aprox. 2 minutos</p>
            </div>
          )}
        </div>

        {/* Texto abaixo do vídeo */}
        <div className="text-center">
          <p className="text-gray-300 text-base mb-6 max-w-xl mx-auto leading-relaxed">
            Depois de assistir, se fizer sentido para você,
            é só clicar no botão abaixo — te respondo em minutos.
            <span className="text-gray-400"> Sem pressão. Sem proposta. Só uma conversa direta.</span>
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-black text-lg shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle size={24} />
            Entendi — quero falar com o Fabiano
          </a>
          <p className="text-gray-500 text-sm mt-4">Resposta em até 15 minutos · Sem compromisso</p>
        </div>

      </div>
    </section>
  )
}

export default VideoApresentacao
