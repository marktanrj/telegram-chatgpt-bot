import './config';
import serverless from 'serverless-http';
import { createApp } from './app';
import { isProductionEnv } from './utils/isProductionEnv';

const main = async () => {
  if (!isProductionEnv) {
    const { app, bot } = await createApp();
    const port = 4000;
    app.listen(port, async () => {
      bot.launch();
      console.log('Bot started in polling mode')
    });
  }
};
main();

if (isProductionEnv) {
  exports.handler = async (event: any, context:any) => {
    const { app } = await createApp();
    const handler = serverless(app);
    try {
      const result = await handler(event, context);
      return result;
    } catch (err: any) {
      return err;
    }
  };
}
