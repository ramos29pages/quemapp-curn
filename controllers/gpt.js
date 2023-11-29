const { Configuration, OpenAIApi } = require("openai");


//CLADE KEY

///      --------- DESCOMENTAR LA SIGUIENTE LINEA DE CODIGO PARA TENER ACCESO AL MODELO DE GPT Y
///// GEBERACION DE CODIGO PARA TENER ACCESO AL MODELO --------------------------------
////////////////const apiKey = "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";

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function gerenacion(user) {

  let User = user;
  console.log("DATA IN GPT RAMOSDEV");

  let prompt = `Hola estoy en un sitio el cual no posee acceso a servicios de salud
   y sufrí una quemadura en la parte del ${User.parteCuerpo}de ${User.grado}, tengo una estatura de ${User.talla}, con una edad de ${User.edad}
   acompañado de un peso total de ${User.peso}, el agente por el cual sufri la quemadura fue ${User.agenteFisico}, que recomendaciones me sugieres como primera medida y porfavor dame recomendaciones de Primeros auxilios, cuidados y posibles tratamientos puedesincluir una lista de ellos`;

  // model: "gpt-3.5-turbo",
  // let prompt = 'Hola.. esta es una prueba.'

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
  });

  respuesta = completion.data.choices[0].message.content;
  // respuesta = "GPT TE ESTA ESCUCHANDO...";

  if (respuesta) {
    console.log("success - GPT.JS -> ", respuesta);
    return respuesta;
  } else {
    return ' GPT TUVO INCONVENIENTES PARA ENTENDERTE.';
  }

};

module.exports = gerenacion;

/* async function  gerenacion(user){
  console.log("Gerenacion for ::", user);
  respuesta = "GPT TE ESTA ESCUCHANDO...";

  if(respuesta){
    console.log("success - GPT.JS -> ", respuesta);
    return respuesta;
  } else {
    return ' GPT TUVO INCONVENIENTES PARA ENTENDERTE.';
  }
} */

//console.log(completion.data.choices[0].message);
