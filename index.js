import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Benvingut a aquesta aplicació Chatbot!'));
  console.log(colors.bold.green('Ja pots començar a xatejar amb el bot🤖!'));

  const chatHistory = []; //store conversation history

  while (true) {
    const userInput = readlineSync.question(colors.yellow('Tu: '));

    try {
      // Construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({ role, content }));

      //   Add latest user input
      messages.push({ role: 'user', content: userInput });

      // Call the API with the user's input
      const completion = openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        // We pass all the messages made to the bot, so it can answer further question with the previous messages in mind.
        messages: messages,
      });

      // Get chatbot completion text
      const completionText = (await completion).data.choices[0].message.content;

      if (userInput.toLocaleLowerCase() === 'exit') {
        console.log(colors.green('Bot🤖: ') + completionText);
        return;
      }

      console.log(colors.green('Bot🤖: ') + completionText);

      //   Update history with user input and bot response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['bot', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
