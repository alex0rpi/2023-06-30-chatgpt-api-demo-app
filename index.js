// import openai from './config/open-ai';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Benvingut a aquesta aplicació Chatbot!'));
  console.log(colors.bold.green('Ja pots començar a xatejar amb el bot🤖!'));

  while (true) {
    const userInput = readlineSync.question(colors.yellow('Tu: '));

    try {
      // Call the API with the user's input

      if (userInput === 'exit') {
        break;
      }
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
