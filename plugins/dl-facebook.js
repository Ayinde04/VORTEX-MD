import fg from 'api-dylux'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `🎄 Ho Ho Hold up! Send me the damn Facebook video link, you impatient reindeer! 🎅🏼\n\n📌 EXAMPLE:\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`
}

const urlRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
if (!urlRegex.test(args[0])) {
  throw '⚠️ Don’t play games with Santa. Give me a valid URL, now!'
}

m.react(rwait)

try {
  const result = await fg.fbdl(args[0])
  const tex = `
🎁 Here’s your Christmas gift! 🎥 \n\n
☆ *VIDEO TITLE:* ${result.title}\n\n
🎅 Thanks for using 𝚅𝙾𝚁𝚃𝙴𝚇-MD, you cheeky elf!`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
    m.react(done)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.diamond = true

export default handler
