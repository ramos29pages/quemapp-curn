const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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"


const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function gerenacion(user) {

  let User = user;
  console.log("DATA IN GPT RAMOSDEV");

 /*  let prompt = `Hola estoy en un sitio el cual no posee acceso a servicios de salud
  y sufrí una quemadura en la parte del ${User.parteCuerpo}de ${User.grado}, tengo una estatura de ${User.talla}, con una edad de ${User.edad}
  acompañado de un peso total de ${User.peso}, el agente por el cual sufri la quemadura fue ${User.agenteFisico}, que recomendaciones me sugieres como primera medida y porfavor dame recomendaciones de Primeros auxilios, cuidados y posibles tratamientos puedesincluir una lista de ellos`; */

  // model: "gpt-3.5-turbo",
   let prompt = 'Hola.. esta es una prueba.'

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
  });

  respuesta = completion.data.choices[0].message.content;

  if(respuesta){
    console.log("success - GPT.JS -> ", respuesta);
    return respuesta;
  } else {
    return ' GPT TUVO INCONVENIENTES PARA ENTENDERTE.';
  }



};

module.exports = gerenacion;

//console.log(completion.data.choices[0].message);
