const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes ayudarnos con tu granito de arena en nuestras redes  ',
        '[*Twitter*] https://twitter.com/RealEnglish191',
        '[*facebook*] https://www.facebook.com/profile.php?id=100063605289046',
        '[*Instagram*] https://www.instagram.com/realenglish19/'
    ]
)



const flowAgendar = addKeyword(['agendar']).addAnswer(
    [
        '🕐 Puedes agendar con nosotros tu clase muestra (1 hora):',
        '[*Lunes*] - de 10am a 6pm',
        '[*Miercoles*] - de 4pm a 8pm',
        '[*Viernes*] - de 10am a 6pm',
        '[*Sabados*] - de 9am a 6pm',
        'Cuentame cual es de tu agrado y a que hora te gustaria'
    ],
    null,
    null,
    flowGracias
)

const flowDocs = addKeyword('info', 'información', 'datos').addAnswer('📄 Aquí encontras la información de nuestros cursos Dinos cual es de tu agrado y aclaramos tus dudas 🔔',{
    media:'https://scontent.fqro3-1.fna.fbcdn.net/v/t39.30808-6/335264699_1289520988617071_2728054448342204104_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=EUuTATsJ_P0AX-gWjCq&_nc_ht=scontent.fqro3-1.fna&oh=00_AfCMfjXB8wRo1iv9Rvdk9rmTgjHNRLzyL1-VPJUSEyzYuw&oe=6414045E'
},
  null,
    [flowGracias, flowAgendar]
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
        [flowDocs, flowGracias, flowAgendar]
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
