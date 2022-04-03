# TheTranscendence
NextJS + NestJs + postgresSQL + Docker Compose

This 42 Pong support realtime game, chat, group chat channel, friend's online-offline status, guild, guild war, ranking system and tournament. All layouts are fully responsive.

## How to launch
For launching our website, just enter the command below.
```
docker-compose up --build
```

To access `42pong` site, go to localhost 
```
http://127.0.0.1
```
## How to login
1. Login with 42 intranet id (More OAuth system will be added)

	just click the button `login with 42`, then it will redirect you to 42 Oauth login page.

2. Login with database id and password

	For those who do not have an 42 intranet ID, we have created a backdoor login page.
	```
	http://127.0.0.1/login
	```


