const nodemailer = require('nodemailer')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  // Configuration du transporteur email
  // Tu devras remplacer ces informations par les tiennes
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou autre service
    auth: {
      user: process.env.EMAIL_USER, // ton email
      pass: process.env.EMAIL_PASS, // ton mot de passe d'application
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '💕 Félicitations ma Valentine ! 💕',
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 40px;">
        <h1 style="color: #ff1493; font-size: 32px;">🎉 Bravo mon amoureuse ! 🎉</h1>
        
        <p style="font-size: 24px; color: #ff69b4; margin: 30px 0;">
          Vous êtes officiellement la Valentine de votre copain ! 💖
        </p>
        
        <img src="https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif" alt="Celebration" style="max-width: 400px; border-radius: 20px;">
        
        <h2 style="color: #ff1493; font-size: 28px; margin-top: 30px;">
          Je t'aime énormément ! 💕💕💕
        </h2>
        
        <p style="font-size: 18px; color: #ff69b4;">
          Ton copain qui t'aime 💖
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email envoyé avec succès!' })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' })
  }
}
