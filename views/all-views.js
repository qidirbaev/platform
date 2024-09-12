require('dotenv').config()

const order_text = `
<b>Fundamental NodeJs</b>

<code>Qısqasha:</code>
<blockquote expandable>
<b>Baǵdarlamalawdı NodeJs texnologiyası járdeminde úyretiwshi kitap. Kitap keń auditoriyaǵa mólsherlengen bolıp baǵdarlamalawdı endi baslaǵanlarǵa kúshli fundament wazıypasın atqaradı al tájriybeli baǵdarlamalawshılarǵa texnologiyanı tolıq túsiniw imkánin beredi.</b>
</blockquote>
<code>Tolıq:</code> <b><a href="https://${process.env.SERVER_URL}/book/about">codinger.uz/book/about</a></b>
<code>Demo: </code> <b><a href="https://${process.env.SERVER_URL}/book/demo">codinger.uz/book/demo</a></b>
<code>Baha: </code> <b><tg-spoiler>51 000 $UZS</tg-spoiler> <s>60 000 $UZS</s></b> (<b>15%</b> shegirme menen)

<blockquote><code>
Avtor:   <b>Begzat Kidirbaev</b>
Jıl:     2024
Til:     Qaraqalpaq
Alfavit: Latin
Bet:     260
Format:  A5
</code></blockquote>
#fundamental #nodejs #js
`
const order_info_text = (full_name, phone_number, shipment_address) => `
Buyırtpa maǵlıwmatları:

👤 <b>Atı:</b> <code>${full_name}</code>
📞 <b>Telefon:</b> <code>${phone_number}</code>
📍  <b>Mánzil:</b> <code>${shipment_address}</code>
`
const help_text = `
<b>@books_nukus_bot</b> botı <a href="https://xemis.uz"><b>Xemis Group</b></a> tárepinen, <a href="https://${process.env.SERVER_URL}/"><b>codinger.uz</b></a> platforması hámde <a href="https://${process.env.SERVER_URL}#about"><b>Fundamental NodeJs</b></a> kitabı ushın arnawlı jaratılǵan.

Bot járdeminde tómendegishe ámellerdi qılsańıs boladı:
/start\b\b\b\b\b\b\b\b\b\b\b\b- Bottı qaytadan baslaw
/help\b\b\b\b\b\b\b\b\b\b\b\b\b- Bot haqqındaǵı maǵlıwmatlar hám bottı basqarıw ushın komandalar
/order\b\b\b\b\b\b\b\b\b\b\b- "Fundamental NodeJs" kitabına buyırtpa beriw
/subscribe\b\b\b- <a href="https://${process.env.SERVER_URL}/">codinger.uz</a> platformasına aǵza bolıw
/support\b\b\b\b\b\b- Qollap-quwwatlawǵa xabar qaldırıw
/contact\b\b\b\b\b\b- Baylanıs ushın maǵlıwmatlar

<tg-spoiler>"<b>Fundamental NodeJs</b>" kitabı ushın <b>12/09/2024</b> sánesinen baslapqı buyırtpalarǵa <b>15%</b> shegirme qılınadı.
</tg-spoiler>
`
const contact_text = `<b>Baylanıs ushın maǵlıwmatlar</b>

📞 +998889321507
👩‍🚀 @gulinaz_hr
📧 <a href="https://${process.env.SERVER_URL}/send_mail_to_team?from=telegram">qidirbaevbegzat@gmail.com</a>
🌐 <a href="https://${process.env.SERVER_URL}/">https://codinger.uz/</a>
`
const subscribe_text = `
⚡ <a href="https://${process.env.SERVER_URL}/"><b>Platformaǵa</b></a> jańa aǵzalardı qabıllaw <b>11/09/2024</b> sánesinen baslanadı.
`
const conversation_support_text = (ctx, id) => `Sizdiń

<blockquote>${ctx.message.text}</blockquote>

bolǵan xabarıńıs #msg${id} IDsı menen qabıllandı. Tez arada juwap beremis.
`
const conversation_support_hello_text = `Sizdi qızıqtırǵan másele boyınsha usı jerge xabar qaldırsańıs boladı 👇🏻:

(<i>Iltimas xabardı, tolıq bir xabar qılıp jiberiń</i>)
`
const new_order_notification_text = (order) => `🆕 New Order 🆕

ID: ${order.id}\r\n
Name: ${order.name}\r\n
Phone: <code>+998${order.phone.replaceAll(' ', '')}</code>\r\n
Address: ${order.address}\r\n
Payment Option: ${order.payment_option}\r\n
Comment: ${order.comment}
`
const errorHTML = (code, msg = "Bul bet endi tayarlanıw ústinde, iltimas bıraz waqıttan soń qaytadan kiriń yáki qollap-quwwatlawǵa qátelik haqqında maǵlıwmat beriń") => `
  <main class="main" style="margin-top: 100px;">

    <div class="container ">
      <section id="blog-details" class="blog-details section">
        <div class="container">
          <article class="article"
            style="min-height: 300px; align-items: center; justify-content: center; display: flex;">
            <div>
              <h2>${code} kodlı qátelik júz berdi :(</h2>
              <p class="bad-page-message">
                ${msg}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>

  </main>
`

const support_text_for_admin = (ctx, id) => `
"<code>${ctx.from.id}</code>" IDlı (@${ctx.from.username}) paydalanıwshı botqa xabar qaldırdı!

<blockquote>${ctx.message.text}</blockquote>

Xabar #msg${id} IDsı menen qabıllandı.

Juwap jiberiw ushın botqa
<code>/send ${ctx.from.id} #msg${id} xabarına juwap\r\n\r\n</code> jazıwı menen baslanıwshı xabar jiberiń.
`

module.exports = {
  order_text,
  help_text,
  contact_text,
  subscribe_text,
  conversation_support_text,
  conversation_support_hello_text,
  new_order_notification_text,
  support_text_for_admin,
  errorHTML
}