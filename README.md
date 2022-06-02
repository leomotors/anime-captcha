# Anime Captcha

Just a Normal Captcha, _you are not a robot? Then pass this Captcha!_

Featuring 2 _Cultured_ Quizzes to test if you are a Robot

## 🍅 Reference

<img src="https://pbs.twimg.com/media/EXqFcdtWAAETZwC.jpg" height="300px" />

<br />

<img src="https://titterfun.com/api/assets/image/zmmkr837ciax.jpg" height="350px" />

## ✨✨ Statistic & History Update (1.3 & 1.4)

Recently, Anime Captcha has been rewritten for better developer and user experience

- Now written in SvelteKit with SSR (Was Svelte SPA with Vite)

- Now use TailwindCSS (Was Bootstrap 5)

- Now has many routes✨

- Animations🤩 and miscellaneous design changes

- Statistics and Play history

- Much better responsiveness for mobile and various screen sizes

Changelog: [./CHANGELOG.md](./CHANGELOG.md)

## ➕ Want to Contribute? See Here!

[Contributing Guideline](./CONTRIBUTING.md)

## 🌐 API

/api/get : Get Questions just like how the app would retrieve data

- Optional Parameter: category

### /api/get example

```
https://anime-captcha.vercel.app/api/get?category=fbi
```

### Other APIs

/api/getall : Get All Data this website has

/api/insight : Get Insight about the data ex. Questions Count

## 🔼 To Run Locally (prerequisites: nodejs 16, yarn)

- yarn install

- yarn dev
