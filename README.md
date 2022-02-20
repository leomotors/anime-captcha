# Anime Captcha

Just a Normal Captcha, _you are not a robot? Then pass this Captcha!_

Featuring 2 _Cultured_ Quizzes to test if you are a Robot

## 🍅 Reference

<img src="https://pbs.twimg.com/media/EXqFcdtWAAETZwC.jpg" height="300px" />

<br />

<img src="https://titterfun.com/api/assets/image/zmmkr837ciax.jpg" height="350px" />

## ➕ Want to Contribute? See Here!

[Contributing Guideline](./CONTRIBUTING.md)

## 🌐 API

/api/get : Get Questions just like how the app would retrieve data

- Optional Parameter: category

- Optional Parameter: filter

### /api/get example

```
https://anime-captcha.vercel.app/api/get?category=loli&filter=byanime:attackontitan,jujutsu&filter=byname:inui,!yeager&ignoreSize=1
```

will returns category of `loli` with any character that comes from
`Attack on Titan` **or** `Jujutsu` **or** have name of `Inui`,
**AND** do not have the name of `Yeager`
ignoreSize is to prevent the API from throwing error
if the results has less than 16 characters

The matcher is case and space insensitive

### Other APIs

/api/getall : Get All Data this website has

/api/insight : Get Insight about the data ex. Questions Count

## 🔼 To Run Locally (prerequisites: nodejs, npm, yarn, vercel)

- yarn install

- vercel dev

- Go to localhost:3000
