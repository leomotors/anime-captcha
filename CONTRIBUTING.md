# Contributing Guideline

**Schema of JSON**: See [src/models/CaptchaType.ts](src/models/CaptchaType.ts)
for how JSON File should look like and edit them in src/data

When adding a character, prefer japanese name to be written without spaces,
prefer the english name order to be the same as written in Japanese

## For example

香風智乃 -> Kafū Chino

ミカサ・アッカーマン -> Mikasa Ackerman

## Exception can be made for some cases

保登心愛 -> Hoto Cocoa (Instead of Hoto Kokoa)

空条徐倫 -> Jolyne Cujoh (Instead of Kūjō Jōrīn)

## For Picture

Make sure it is usable, Pictures from Wikipedia likely can't be displayed

If you are able to run it locally (which you need vercel account and project to do that)
There is Debug Tools to check if photos are displaying correctly

### Custom Image

If the picture is very hard to find, (not centered, or CORS goes brrrr),
save that image as **webp**, make sure **its size** is appropriate and put it in
`images/`, The URL **should** point to GitHub Content. (it will not appear right
now but if set correctly, will appear once pushed)

**Example**

```
https://github.com/Leomotors/anime-captcha/blob/main/images/Armin.webp?raw=true
```
