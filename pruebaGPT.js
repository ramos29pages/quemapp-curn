// Información necesaria para interactuar con la API de ChatGPT
const apiKey = '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';
const endpoint = 'https://api.openai.com/v1/chat/completions';
//https://api.openai.com/v1/chat/completions
// Ejemplo de uso
const preguntaUsuario = '¿Cuál es la importancia de la inteligencia artificial?';

// Función para enviar una pregunta a la API
async function enviarPregunta(pregunta) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [{ role: 'system', content: 'You are ChatGPT, a large language model.' }, { role: 'user', content: preguntaUsuario }]
    })
  });

  const data = await response.json();
  // respuestaDelBot.innerHTML = data.choices[0].message.content;
  console.log('WEARE',data.choices[0].message.content);
  return 'ramosdev';

}


/* enviarPregunta(preguntaUsuario)
  .then(respuesta => {
    console.log('Respuesta del modelo:', respuesta);
    // Puedes usar la respuesta como desees en tu página web
  })
  .catch(error => {
    console.error('Error:', error);
  });
 */