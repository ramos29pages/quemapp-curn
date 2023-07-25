

const form = document.querySelector("#formulario");
const messagesContainer = document.querySelector("#contenedor-mensajes");
const welcome = document.getElementById('welcome');
const loader = document.getElementById('loader');
const middle = document.querySelector('.middle');

form.addEventListener("submit", async (event) => {

    console.log(event);
  event.preventDefault();

  const messageInput = form.elements.message;
  const message = messageInput.value.trim();
  messageInput.value = "";

  if (!message) {
    return;
  }

  welcome.style.display = 'none';
  let boxUser = document.createElement('div');
  boxUser.setAttribute('class', 'boxUser');
  boxUser.innerHTML = `<strong class="titulitos">Daniel</strong><p>${message}</p> `;
  messagesContainer.appendChild(boxUser);
  messagesContainer.scrollTop = '9999';

  //mostramos el loader
  loader.style.display = 'block';
  middle.style.display = 'flex';

  //esperamos la resouesta del servidor
  const response = await sendMessageToChatGPT(message);


  //ocultamos el loader
  loader.style.display = 'none';
  middle.style.display = 'none';

  //insertamos la respuesta
  messagesContainer.insertAdjacentHTML("beforeend",
    `
    <div class="boxBrain">
        <strong class="titulitos">QuemApp</strong><p>${response}</p> 
    </div>
      `
  );

  messagesContainer.scrollTop = '9999';
});

//fetch a /chat
async function sendMessageToChatGPT(message) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  return data.response;
}
