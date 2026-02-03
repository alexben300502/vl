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
        <title>WOUWOUWOUWOUWOWU</title>
      </Head>
      
      <div className="hearts-bg">
        {createHearts()}
      </div>
      
      <div className="container success-animation">
        <h1 className="title celebration">
          WOUWOUWOUWOUWOUWOUWOUWOUWOU
        </h1>
        
        <div className="gif-container">
          <img 
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5qdWhpMDgwcnp0bjBlOW5sbGhkZWx3bm9kNTluaHVhZTVzNDRwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/z7767kGHHQ2s/giphy.gif" 
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
          Je t'invite à vérifier ton ptit email 🙂‍↔️
        </p>
        
        <div style={{marginTop: '40px'}}>
          <h2 style={{color: '#ff69b4', fontSize: '24px'}}>
            Je t'aime mon amoireuse ❤️
          </h2>
        </div>
      </div>
    </>
  )
}
