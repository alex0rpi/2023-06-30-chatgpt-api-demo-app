import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Benvingut a aquesta aplicació Chatbot!'));
  console.log(colors.bold.green('Ja pots començar a xatejar amb el bot🤖!'));

  while (true) {
    const userInput = readlineSync.question(colors.yellow('Tu: '));

    try {
      // Call the API with the user's input
      const completion = openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }],
      });

      // Get chatbot completion text
      const completionText = (await completion).data.choices[0].message.content;

      if (userInput.toLocaleLowerCase() === 'exit') {
        console.log(colors.green('Bot🤖: ') + completionText);
        return;
      }

      console.log(colors.green('Bot🤖: ') + completionText);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
