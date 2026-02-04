const nodemailer = require('nodemailer')
const PDFDocument = require('pdfkit')

function generateTicketPDF(email) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 0,
      })

      let buffers = []
      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        resolve(Buffer.concat(buffers))
      })
      doc.on('error', reject)

      // Fond dégradé rose/rouge
      doc
        .rect(0, 0, doc.page.width, doc.page.height)
        .fill('#ff1493')

      // Bordure dorée
      doc
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3)
        .stroke('#FFD700')

      // Titre principal
      doc
        .fontSize(48)
        .font('Helvetica-Bold')
        .fillColor('#FFFFFF')
        .text('PLACE DE SAINT-VALENTIN', 40, 80, {
          align: 'center',
          width: doc.page.width - 80,
        })

      // Décoration
      doc
        .fontSize(32)
        .text('💕', 40, 150, { align: 'center', width: doc.page.width - 80 })

      // Détails
      doc.fontSize(24).font('Helvetica').fillColor('#FFFFFF')
      doc.text('Star de l event', 40, 200, {
        align: 'center',
        width: doc.page.width - 80,
      })

      doc
        .fontSize(28)
        .font('Helvetica-Bold')
        .fillColor('#FFD700')
        .text('Canelle Rigole', 40, 250, {
          align: 'center',
          width: doc.page.width - 80,
        })

      // Email
      doc.fontSize(16).font('Helvetica').fillColor('#FFFFFF')
      doc.text(`Email: ${email}`, 40, 310, {
        align: 'center',
        width: doc.page.width - 80,
      })

      // Détails de l'événement
      doc.fontSize(18).font('Helvetica-Bold').fillColor('#FFD700')
      doc.text('ÉVÉNEMENT', 40, 370, {
        align: 'center',
        width: doc.page.width - 80,
      })

      doc.fontSize(20).font('Helvetica').fillColor('#FFFFFF')
      doc.text('Un rendez-vous en amoireux', 40, 410, {
        align: 'center',
        width: doc.page.width - 80,
      })

      // Date et lieu
      doc.fontSize(16).fillColor('#FFFFFF')
      doc.text('Date: 14 février 2026', 40, 460, {
        align: 'center',
        width: doc.page.width - 80,
      })

      doc.text('Lieu: Dans mon corazon', 40, 490, {
        align: 'center',
        width: doc.page.width - 80,
      })

      // Numéro de place
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .fillColor('#FFD700')
        .text('Numéro de place: VIP-AMOUR-001', 40, 560, {
          align: 'center',
          width: doc.page.width - 80,
        })

      // Message
      doc
        .fontSize(14)
        .font('Helvetica')
        .fillColor('#FFFFFF')
        .text('Cette place est nominative et non-transférable', 40, 620, {
          align: 'center',
          width: doc.page.width - 80,
        })

      doc.text('Hehe', 40, 650, {
        align: 'center',
        width: doc.page.width - 80,
      })

      // Bas de page
      doc
        .fontSize(16)
        .fillColor('#FFD700')
        .text('Te quiero ', 40, 720, {
          align: 'center',
          width: doc.page.width - 80,
        })

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  // Configuration du transporteur email
  // Tu devras remplacer ces informations par les tiennes
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true pour port 465, false pour port 587
    auth: {
      user: process.env.EMAIL_USER, // ton email
      pass: process.env.EMAIL_PASS, // ton mot de passe d'application
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  })

  try {
    // Générer le PDF de la place
    const pdfBuffer = await generateTicketPDF(email)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Félicitations ma Valentine ! 💕',
      html: `
        <div style="text-align: center; font-family: Arial, sans-serif; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 40px;">
          <h1 style="color: #ff1493; font-size: 32px;">WouWouuuuu</h1>
          
          <p style="font-size: 24px; color: #ff69b4; margin: 30px 0;">
            Tu es officiellement la Valentine de ton copain 🫡
          </p>
          
          <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJueGxsM2NrYWUzdjNneHAwajE5bGs5MzQ4M2xtdG5kaDB1amdsNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dJexNmtXdBOlEqqh4a/giphy.gif" alt="Celebration" style="max-width: 400px; border-radius: 20px;">
          
          <h2 style="color: #ff1493; font-size: 28px; margin-top: 30px;">
            Te keur ❤️
          </h2>
          
          <p style="font-size: 18px; color: #ff69b4;">
            N'oublie pas de télécharger ta place de Saint-Valentin 😌
          </p>
          
          <p style="font-size: 18px; color: #ff69b4;">
            Présentation de la place obligatoire lors de l'évènement 🙂‍↕️
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'Place_Saint_Valentin.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email envoyé avec succès!' })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' })
  }
}
