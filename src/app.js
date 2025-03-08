import './styles.css'
import { useFetch } from './api'
import { random } from './utils'
import { MessageModule } from './modules/message.modules'
import { modules } from './modules'

useFetch({url: `https://jsonplaceholder.typicode.com/posts/${random(1, 100)}`})


const message  = new MessageModule();
message.renderMessage()

console.log(message)
document.querySelector("#message")?.addEventListener('click', () => {
    message.trigger()
})

