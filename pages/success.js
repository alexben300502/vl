import { useEffect } from 'react'
import Head from 'next/head'

export default function Success() {
  const createHearts = () => {
    const hearts = []
    for (let i = 0; i < 30; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }
      hearts.push(
        <div key={i} className="heart" style={style}>
          🎉
        </div>
      )
    }
    return hearts
  }

  return (
    <>
      <Head>
        <title>🎉 YAAAAAY! 🎉</title>
      </Head>
      
      <div className="hearts-bg">
        {createHearts()}
      </div>
      
      <div className="container success-animation">
        <h1 className="title celebration">
          🎉 YAAAAY! TU ES MA VALENTINE! 🎉
        </h1>
        
        <div className="gif-container">
          <img 
            src="https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif" 
            alt="Celebration gif"
            width="500"
            height="375"
          />
        </div>
        
        <p style={{
          fontSize: '28px', 
          color: '#ff1493', 
          marginTop: '30px',
          textShadow: '2px 2px 4px rgba(255, 20, 147, 0.3)'
        }}>
          Vérifie tes emails pour une surprise ! 💌✨
        </p>
        
        <div style={{marginTop: '40px'}}>
          <h2 style={{color: '#ff69b4', fontSize: '24px'}}>
            Je t'aime mon amoireuse ! 💕💕💕
          </h2>
        </div>
      </div>
    </>
  )
}
