const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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' //CLAVE ESTABLECIDA 24-AGOSTO-2023
});

const openai = new OpenAIApi(configuration);

async function main(){

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
    });

    if(!completion.data.choices[0].message) {
        throw Error('No completions found');
    }
    console.log(completion.data.choices[0].message);
}

main()