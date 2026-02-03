import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      localStorage.setItem('userEmail', email)
      router.push('/question')
    } else {
      alert('Merci de rentrer un email valide mon amour ! 💕')
    }
  }

  const createHearts = () => {
    const hearts = []
    for (let i = 0; i < 15; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${4 + Math.random() * 4}s`
      }
      hearts.push(
        <div key={i} className="heart" style={style}>
          💖
        </div>
      )
    }
    return hearts
  }

  return (
    <>
      <Head>
        <title>💕 Saint-Valentin Spéciale 💕</title>
        <meta name="description" content="Une surprise spéciale pour la Saint-Valentin" />
      </Head>
      
      <div className="hearts-bg">
        {createHearts()}
      </div>
      
      <div className="container">
        <h1 className="title">💕 Bienvenue mon amour 💕</h1>
        
        <div className="gif-container">
          <img 
            src="https://media.giphy.com/media/l0HlSJd4dJFGCOHmw/giphy.gif" 
            alt="Cute love gif"
            width="300"
            height="225"
          />
        </div>
        
        <p style={{fontSize: '24px', color: '#ff1493', marginBottom: '30px'}}>
          Entre ton email pour une surprise spéciale ! 💌
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="cute-input"
            placeholder="ton-email@exemple.com 💕"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="cute-button">
            Continuer 💖
          </button>
        </form>
      </div>
    </>
  )
}
