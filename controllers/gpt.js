const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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";

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function gerenacion(user) {

  let User = user;

 /*  let prompt = `Hola estoy en un sitio el cual no posee acceso a servicios de salud
  y sufrí una quemadura en la parte del ${User.parteCuerpo}de ${User.grado}, tengo una estatura de ${User.talla}, con una edad de ${User.edad}
  acompañado de un peso total de ${User.peso}, el agente por el cual sufri la quemadura fue ${User.agenteFisico}, que recomendaciones me sugieres como primera medida y porfavor dame recomendaciones de Primeros auxilios, cuidados y posibles tratamientos puedesincluir una lista de ellos`; */

/*   let prompt = 'Hola.. esta es una prueba.'

  const Diagnostico = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    respuesta = completion.data.choices[0].message.content;

    if(respuesta){console.log('Respuesta Generada');}

    return respuesta;
  };
 */
  return 'PRUEBA DE FUNCIONAMIENTO CORRECTIVO...';

};

module.exports = gerenacion;

//console.log(completion.data.choices[0].message);
