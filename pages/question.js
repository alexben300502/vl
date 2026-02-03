import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Question() {
  const [showError, setShowError] = useState(false)
  const [yesButtonSize, setYesButtonSize] = useState(1)
  const router = useRouter()

  const handleNo = () => {
    setShowError(true)
    setTimeout(() => {
      setShowError(false)
      setYesButtonSize(prev => prev + 0.3)
    }, 5000)
  }

  const handleYes = async () => {
    const email = localStorage.getItem('userEmail')
    
    // Envoyer l'email
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
    } catch (error) {
      console.log('Erreur envoi email:', error)
    }
    
    router.push('/success')
  }

  const createHearts = () => {
    const hearts = []
    for (let i = 0; i < 20; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${4 + Math.random() * 4}s`
      }
      hearts.push(
        <div key={i} className="heart" style={style}>
          💝
        </div>
      )
    }
    return hearts
  }

  return (
    <>
      <Head>
        <title>💕 Une question importante 💕</title>
      </Head>
      
      <div className="hearts-bg">
        {createHearts()}
      </div>
      
      {showError && (
        <div className="error-message">
          <div className="cross">❌</div>
          <div>ÇA VA PAS ELLE EST MALADE CELLE LÀ</div>
        </div>
      )}
      
      <div className="container">
        <h1 className="title">💕 Veux-tu être ma Valentine ? 🫣 💕</h1>
        
        <div className="gif-container">
          <img 
            src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif" 
            alt="Cute question gif"
            width="400"
            height="300"
          />
        </div>
        
        <div style={{marginTop: '40px'}}>
          <button 
            className="cute-button yes-button"
            onClick={handleYes}
            style={{
              transform: `scale(${yesButtonSize})`,
              margin: '20px'
            }}
          >
            OUI ! 💖
          </button>
          
          <button 
            className="cute-button no-button"
            onClick={handleNo}
            style={{margin: '20px'}}
          >
            Non 💔
          </button>
        </div>
      </div>
    </>
  )
}
