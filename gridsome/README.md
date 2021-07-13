# Remark File Attachment Plugin
[![Build](https://github.com/Healios/remark-file-attachment/actions/workflows/node.js.yml/badge.svg)](https://github.com/Healios/remark-file-attachment/actions/workflows/node.js.yml)

This is a plugin for [Remark](https://remark.js.org/), and allows you to embed file attachments in [markdown](https://daringfireball.net/projects/markdown/) files. The plugin offers the ability to style the file attachments, so that they look like more than a simple link, and arguably it offers better accessability as well. This plugin can also be used with [Gridsome](https://gridsome.org/).

## Installation

```bash
npm i gridsome-remark-file-attachment --save-dev
# yarn add gridsome-remark-file-attachment --dev
```

## Configuration
### Styling
You can provide css and styles for just about all of the attachment's HTML elements.

<img src="overview.jpg" role="presentation" alt="">

1. Attachment container _(ul)_
    ```js
    containerCss: "border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3",
    containerStyle: "list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;",
    ```  

2. Attachment item _(li)_
    ```js
    itemCss: "pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600",
    itemStyle: "content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;",
    ```

3. Icon and paragraph container _(div)_
    ```js
    iconAndParagraphContainerCss: "flex items-center max-w-32 md:max-w-max pr-4",
    ```

4. Paragraph _(span)_
    ```js
    paragraphCss: "ml-2 truncate text-gray-800 max-w-xs",
    ```

5. Link container _(div)_
    ```js
    linkContainerCss: "ml-3 inline-flex space-x-4",
    ```

6. Show link _(a)_
    ```js
    showLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",
    showLinkStyle: "text-decoration: none;",
    ```

7. Download link _(a)_
    ```js
    downloadLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",
    downloadLinkStyle: "text-decoration: none;",
    ```

### Icon
You can provide HTML for an icon next to the attachment name (paragraph).

<img src="icon.jpg" role="presentation" alt="">

Example:
```js
iconHTML: `
    <svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
    </svg>
`,
```

### Alignment
If you want alignment to work, you'll have to supply css classes.

There's three options:
- **cssClassToCenterPlaceholder**

  Example value `w-full flex justify-center`

- **cssClassToLeftAlignPlaceholder**

  Example value `w-full flex justify-start`

- **cssClassToRightAlignPlaceholder**

  Example value `w-full flex justify-end`

Note: You can also add extra css, like bottom margin, to space things out nicely.

### Link text & alt text
You can provide text to use for the "Show" and "Download" link, so thay they fit with the locale of the webiste.

```js
showLinkText: "Show",
showLinkAltSuffix: "in new tab",

// The alt text of the show link will be showLinkText + " " + attachment text attribute + showLinkAltSuffix.
// Show Document 1.pdf in new tab

downloadLinkText: "Download",

// The alt text of the download link will be downloadLinkText + " " + attachment text attribute.
// Download Document 1.pdf
```

### Remark configuration:
```js
  const remark = require("remark");
  const fileAttachment = require("remark-file-attachment");

  const processor = remark().use(fileAttachment, {
    cssClassToCenter: "w-full flex justify-center",
    cssClassToLeftAlign: "w-full flex justify-start",
    cssClassToRightAlign: "w-full flex justify-end",

    containerCss: "border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3",
    containerStyle: "list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;",
    itemCss: "pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600",
    itemStyle: "content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;",

    iconHTML: `
        <svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
        </svg>
    `,
    paragraphCss: "ml-2 truncate text-gray-800 max-w-xs",
    iconAndParagraphContainerCss: "flex items-center max-w-32 md:max-w-max pr-4",

    linkContainerCss: "ml-3 inline-flex space-x-4",

    showLinkText: "Show",
    showLinkAltTextSuffix: "in new tab",
    showLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",

    downloadLinkText: "Download",
    downloadLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",
    downloadLinkStyle: "text-decoration: none;",
  });
```


### Gridsome configuration:
```js
module.exports = {
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        route: "/blog/:year/:month/:day/:slug",
        remark: {
          plugins: [
            [
              "remark-file-attachment",
              {
                cssClassToCenter: "w-full flex justify-center",
                cssClassToLeftAlign: "w-full flex justify-start",
                cssClassToRightAlign: "w-full flex justify-end",

                containerCss: "border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3",
                containerStyle: "list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;",
                itemCss: "pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600",
                itemStyle: "content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;",

                iconHTML: `
                    <svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                    </svg>
                `,
                paragraphCss: "ml-2 truncate text-gray-800 max-w-xs",
                iconAndParagraphContainerCss: "flex items-center max-w-32 md:max-w-max pr-4",

                linkContainerCss: "ml-3 inline-flex space-x-4",

                showLinkText: "Show",
                showLinkAltTextSuffix: "in new tab",
                showLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",

                downloadLinkText: "Download",
                downloadLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",
                downloadLinkStyle: "text-decoration: none;",
              },
            ]
          ]
        }
      }
    }
  ]
}
```

## Usage in markdown

The markdown must consist of all the possible attributes (attachment, text & placement), and you must enclose the markdown in backticks (\`). 

Format:
```markdown
`attachment [FILE_LINK] text [TEXT] placement [Left|Center|Right]`
```

Examples:

```markdown
`attachment /uploads/salesoverview.pdf text Sales overview report placement Left end`

or

`attachment /uploads/salesoverview.pdf text Sales overview report placement Left end attachment /uploads/purchaseoverview.pdf text Purchase overview report placement Left end`

```

## Output

### Attachment/s

This is how the attachment/s can appear on the screen:

<img src="example.jpg" role="presentation" alt="">

### Generated HTML

```html
<div class="w-full flex justify-start">
  <ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;">
    <li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;">
      <div class="flex items-center max-w-32 md:max-w-max pr-4" style="">
        <svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
        
        <span class="ml-2 truncate text-gray-800 max-w-xs" style="">Sales overview report</span>
      </div>

      <div class="ml-3 inline-flex space-x-4" style="">
        <a href="/uploads/salesoverview-report.pdf" target="_blank" rel="noopener noreferrer" aria-label="Show attachment in new tab" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline">Show</a>
        
        <a href="/uploads/salesoverview-report.pdf" download="" aria-label="Download attachment" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline">Download</a>
      </div>
    </li>

    <li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;">
      <div class="flex items-center max-w-32 md:max-w-max pr-4" style="">
        <svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
        
        <span class="ml-2 truncate text-gray-800 max-w-xs" style="" title="Purchase overview report">Purchase overview report</span>
      </div>
      
      <div class="ml-3 inline-flex space-x-4" style="">
        <a href="/uploads/purchaseoverview-report.pdf" target="_blank" rel="noopener noreferrer" aria-label="Show Purchase overview report in new tab" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline">Show</a>
        
        <a href="/uploads/purchaseoverview-report.pdf" download="" aria-label="Download Purchase overview report" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline">Download</a>
      </div>
    </li>
  </ul>
</div>
```

### Errors
When the plugin detects errors, i.e. an incorrectly formatted attachment element, it will render a red fat error instead of the attachment.

<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> The markdown is not correctly formatted.</p>


## License

MIT
