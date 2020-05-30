### VectorDrawable Previewer

![icon](./public/icon_128.png)

This is a Chrome extension for previewing vector drawable. You can check vector drawable files on GitHub or your local.

Please note that this extension requires the background script since v1.2.0

<a href="https://chrome.google.com/webstore/detail/vdv/oidfgbojkfckgmkljhacgnckncpanbhm" target="_blank">
<img src="https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png">
</a>

## How this works

- Show a SVG element which is based on a vector drawable text
- `background script` watches URL changes and `content script` renders the SVG element.

### Development

```
yarn install
yarn watch
```

And then, load `dist/` from `chrome://extensions`.

NOTE: `src/js` is the source directory.

### Specifications

+ [About VectorDrawable](https://developer.android.com/guide/topics/graphics/vector-drawable-resources.html)
+ [VectorDrawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html)
+ [VectorDrawableCompat](https://developer.android.com/reference/android/support/graphics/drawable/VectorDrawableCompat.html)

### Limitation

VectorDrawable Previewer doesn't support following

+ animated vector drawable
+ android resource references

### Appendix

- [Supported attributes](./src/js/const/svg_node.ts)
- [Supported URLs](./src/js/background_helper.ts)

### License

Under [MIT](./LICENSE).
