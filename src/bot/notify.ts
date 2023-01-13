import { bot } from "./bot";

const botAdmin = process.env.BOT_ADMIN_ID!;

export const notifyError = async (username: string, error: any) => {
  const output = `
Encountered Error
username: ${username}
${error}
`;
  await bot.telegram.sendMessage(botAdmin, output);
}

export const notifyAlert = async (username: string, message: string) => {
  const output = `
Alert
username: ${username}
message: ${message}
`;
  await bot.telegram.sendMessage(botAdmin, output);
}