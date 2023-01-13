# Telegram ChatGPT Bot

Simple Telegram bot that uses OpenAI API to generate text like ChatGPT.

<img src="./src/assets/example.png" alt="example" width="400"/>

## Development

1) `pnpm install` 
2) Create `.local.env` and fill in config

```
BOT_TOKEN=your_bot_token
BOT_USERNAME=your_test_bot
BOT_ADMIN_ID=your_telegram_id
OPENAI_KEY=your_openapi_key
OPENAI_ORG_ID=your_openapi_org_id
TELEGRAM_WHITELIST_USERNAMES=your_username    // add this config to restrict to specific users
```

3) `pnpm dev`

## Deployment

Hosted on AWS Lambda

## Additional Info

Inline query ends with double semicolon so OpenAI API won't be spammed because this bot is intended to be deployed on a serverless platform without a database or cache