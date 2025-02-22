[shiki-link]: https://shiki.matsu.io
[shiki-lang-link]: https://github.com/shikijs/shiki/blob/main/docs/languages.md
[shiki-theme-link]: https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
[flourite-link]: https://github.com/teknologi-umum/flourite
[sharp-link]: https://github.com/lovell/sharp

<kbd>

![logo.png](./scratch/logo.png)

</kbd>

---

## Usage

Graphene has two ways of usage.

### Web Interface

TBD

### API

Send a `POST` request to `https://teknologi-umum-graphene.fly.dev/api` with the following JSON body payload:

- `code`

  The code snippet you want to prettify.

  - Required: `true`
  - Default: `undefined`

- `lang`

  The language used for highlighting. See [shikijs/language][shiki-lang-link]. If you leave this field empty, [flourite][flourite-link] will try its best to guess it.

  - Required: `false`
  - Default: `''`
  - Valid Options: [`See here`][shiki-lang-link]

- `format`

  The output format. If you choose `svg`, you won't get `border` since the border is created by [sharpjs][sharp-link] instead of embedding it in the svg.

  - Required: `false`
  - Default: `png`
  - Valid Options: `jpeg`, `png`, `webp`, and `svg`

- `upscale`

  How much do you want to upscale the image.

  - Required: `false`
  - Default: `false`
  - Valid Options: `1 - 5`

- `theme`

  Colorscheme used for the code.

  - Required: `false`
  - Default: `github-dark`
  - Valid Options: [`See here`][shiki-theme-link]

- `font`

  Font used for the code.

  - Required: `false`
  - Default: `JetBrains Mono`
  - Valid Options: `SF Mono`, `JetBrains Mono` and `Fira Code`

- `border.thickness`

  How thick do you want the border to be.

  - Required: `false`
  - Default: `0`
  - Valid Options: `1 - Infinity`

- `border.colour`

  The border colour in hex format.

  - Required: `false`
  - Default: `'#a0adb6'`

Example request:

```json
{
  "code": "import foo from './bar';\nconsole.log(foo.bar);",
  "theme": "dark-plus",
  "format": "jpeg",
  "lang": "javascript",
  "upscale": 3,
  "lang": "javascript",
  "font": "jetbrains mono",
  "border": {
    "thickness": 20,
    "colour": "#efefef"
  }
}
```

Example output:

<kbd>

![output.png](https://github.com/teknologi-umum/graphene/blob/master/scratch/output.png)

</kbd>

## I'm here for Hacktoberfest, what can I do?

If you're new to open source, we really recommend reading a few articles about contributing to open source projects:

- [Open Source Guide's How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Hacktoberfest Contributor's Guide: How To Find and Contribute to Open-Source Projects](https://www.digitalocean.com/community/tutorials/hacktoberfest-contributor-s-guide-how-to-find-and-contribute-to-open-source-projects)
- [Tips for high-quality Pull Request](https://twitter.com/sudo_navendu/status/1437456596473303042)

You can start by reading the [CONTRIBUTING.md](./CONTRIBUTING.md). Then you can search for [issues that you can work on](https://github.com/teknologi-umum/graphene/issues?q=is%3Aopen+is%3Aissue+label%3Ahacktoberfest).

Have fun!

## FAQ

### Why Shiki?

Because it gives pretty much the same _accurate_ highlighting as Visual Studio Code. Though it won't highlight it semantically since it still uses RegEx.

### How it works

- You send a request with stuff
- Graphene does its magic
- ???
- Profit

<details>

<summary>ok sorry, click here for the real answer</summary>

- You send a POST request with a JSON body containing [valid options](#api)
- It will Highlight the code using Shiki and apply some options
- Then, render the result to svg using [custom svg renderer](./src/logic/svgRenderer.ts) which is a heavily modified version of the [original svg renderer](https://github.com/shikijs/shiki/tree/main/packages/renderer-svg)
- Apply border, upscale, and convert to the desired output format using [sharpjs][sharp-link]
- Send it back to you

</details>

### ..what is up with the commit messages?

I don't even know

### Why do I prefer this over, say, carbon.now.sh?

Well, I made this because I want it to be used programatically, without having to open a browser and doing it myself.
Because it uses [shiki][shiki-link], the highlight produced is more accurate, it's identical to the one used in vscode.
