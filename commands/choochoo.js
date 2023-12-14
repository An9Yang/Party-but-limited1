// Importing modules using ES6 syntax
import { SlashCommandBuilder } from 'discord.js';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName('choochoo')
  .setDescription('This is a demo choo choo!')
  .addStringOption(option => 
    option.setName('input')
      .setDescription('Input for OpenAI')
      .setRequired(true));

      async function getResponse(prompt) {
        try {
            const response = await openai.completions.create({
                model: "text-davinci-002", // replace with the model you want to use
                prompt: "introduce yourself", // pass the prompt as a string
                temperature: 0.7,
                max_tokens: 256,
            });
    
            if (response && response.data && response.data.choices && response.data.choices.length > 0) {
                const answer = response.data.choices[0].text;
                console.log('answer=====',answer);
                return answer; // return the answer from the function
            } else {
                console.log('No choices found in the response');
                return 'No choices found in the response';
            }
        } catch (error) {
            console.error('An error occurred while getting the response:', error);
            return 'An error occurred while getting the response';
        }
    }
    
    // Execute function export
    export async function execute(interaction, userInput) {
        const res = await getResponse(userInput)
        console.log('res=====',res);
        await interaction.reply(res); // reply with the answer from the getResponse function
    }