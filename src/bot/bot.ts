import { Telegraf } from 'telegraf';
import { createChatCompletion } from "../openai/openAiService";

const botUsername = process.env.BOT_USERNAME;

export const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.use(async (ctx: any, next: any) => {
  const allowAllAccess = process.env.TELEGRAM_WHITELIST_USERNAMES === undefined;
  console.log(process.env.TELEGRAM_WHITELIST_USERNAMES)
  if (allowAllAccess) {
    await next();
    return;
  }

  const whitelist = process.env.TELEGRAM_WHITELIST_USERNAMES!.split(',');
  const isNotInWhitelist = !whitelist.includes(ctx.message.from.username);
  if (isNotInWhitelist) {
    await ctx.reply('You are not allowed to use this bot');
    return;
  }

  await next();
});

bot.command(['/start', '/help'], async (ctx: any) => {
  const msg = `
Hello, this bot will reply like ChatGPT

Example with command:
/c <query>

Example with inline query:
@${botUsername} <query>;;

(For inline query, end prompt with 2 semicolons)
`
  await ctx.reply(msg)
})

bot.command('/c', async (ctx: any) => {
  try {
    await validateCommandInput(ctx);
    const text = ctx.message.text;
    const initMsg = await ctx.reply('thinking...');
    const msg = await createChatCompletion(text);
    await ctx.telegram.editMessageText(ctx.chat.id, initMsg.message_id, undefined, msg);
  } catch (error: any) {
    console.log(error);
    ctx.reply('Error: ' + error.message)
    return;
  }
})

async function validateCommandInput(ctx: any) {
  if (!ctx.message){
    throw new Error('No message');
  }
  const text = ctx.message.text;
  const args = text.split(' ');
  if (args.length < 2) {
    throw new Error('Bot needs a query');
  }
}

bot.on('inline_query', async (ctx: any) => {
  try {
    const query = ctx.inlineQuery.query;

    // Inline query ends with double semicolon so OpenAI API won't be spammed
    // because this is intended to be deployed on a serverless platform without a database or cache
    const has2SemicolonsWithQuery = query.endsWith(';;') && query.split(';;').filter(Boolean).length >= 1;
    if (!has2SemicolonsWithQuery) {
      return;
    }
    const processedQuery = query.split(';;').filter(Boolean)[0];

    const msg = await createChatCompletion(query);

    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, [
      {
        type: 'article',
        id: query,
        title: query,
        input_message_content: {
          message_text: `${processedQuery}:\n\n${msg}`,
        },
      },
    ], {
      cache_time: 20,
    });    
  } catch (error: any) {
    console.log(error);
    return;
  }
});
