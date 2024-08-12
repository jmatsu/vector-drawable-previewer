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

## Development

```
yarn prepare
yarn install
yarn dev # Launch a webpack to watch file changes
```

And then, please load `dist/` directory from `chrome://extensions`. Your changes in [src/js](./src/js) will be synced.

## Release

Run the following comannds.

```
yarn package
```

`extension.zip` will be created at the root path of this repo. You can load it from `chrome://extensions`.

## References

+ [About VectorDrawable](https://developer.android.com/guide/topics/graphics/vector-drawable-resources.html)
+ [VectorDrawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html)
+ [VectorDrawableCompat](https://developer.android.com/reference/android/support/graphics/drawable/VectorDrawableCompat.html)

## Limitations

This extension doesn't currently support the following:

+ animated vector drawable
+ android resource references

Please also refer to the code.

- [Supported attributes](./src/js/const/svg_node.ts)
- [Supported URLs](./src/js/background_helper.ts)

### License

Under [MIT](./LICENSE).
