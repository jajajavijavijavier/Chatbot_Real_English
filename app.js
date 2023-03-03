const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowAgendar = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes ayudarnos con tu granito de arena en nuestras redes  ',
        '[*Twitter*] https://twitter.com/RealEnglish191',
        '[*facebook*] https://www.facebook.com/profile.php?id=100063605289046',
        '[*Instagram*] https://www.instagram.com/realenglish19/'
    ]
)



const flowGracias = addKeyword(['agendar']).addAnswer(
    [
        '🕐 Puedes agendar con nosotros tu clase muestra :',
        '[*Viernes*] https://twitter.com/RealEnglish191',
        '[*Miercoles*] https://www.facebook.com/profile.php?id=100063605289046',
        '[*Sabados*] https://www.instagram.com/realenglish19/',
        'Cuentame cual es de tu agrado y a que hora te gustaria'
    ]
)

const flowDocs = addKeyword('info', 'información', 'datos').addAnswer(['📄 Aquí encontras la información de nuestros cursos'])
.addAnswer({ media:'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/333924407_224445153306501_2657589699874441165_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=PELJN1R9tUcAX-XpUNj&_nc_ht=scontent.fqro3-1.fna&oh=00_AfAHvBGJO4aSyrUYuX3_kDHrV0dUIHtfRMzFdLkNV6fSlw&oe=6401D694'})
.addAnswer({ media:'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/333124755_609151260545478_7503614010542090844_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=TymB40htZh8AX-AQYoV&tn=YTHilcD4lcRA4_-E&_nc_ht=scontent.fqro3-1.fna&oh=00_AfByPwRKJ4_DjIequYjK7th9ZAL78sElxg1i8b6b2bmK2w&oe=640363B5'})
.addAnswer(['Dinos cual es de tu agrado y aclaramos tus dudas 🔔'],
    null,
    null,
    [flowGracias]
)


const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas'])
    .addAnswer('🙌 Hola bienvenido a Real English 🇱🇷')
    .addAnswer(
        [
            'te comparto las siguientes opciones',
            '👉 *info* para conocer sobre nuestros cursos',
            '👉 *gracias* para ver nuestras redes sociales',
            '👉 *Agendar* Programa tu clase muestra ',
        ],
        null,
        null,
        [flowDocs, flowGracias]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    
}
QRPortalWeb()
main()
