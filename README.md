### VectorDrawable Previewer

This is a Chrome extension for previewing vector drawable.

### Supported mode

+ Xml viewer
+ Github one file preview
+ Github diff files
+ Github raw mode
+ Local file

### Limitation

VectorDrawable Previewer doesn't support following

+ animated vector drawable
+ android resource references

### Supported elements

See https://github.com/jmatsu/vector-drawable-previewer/blob/master/extension/src/const/svg_node.ts

### How to develop

1. Clone this repository.
2. Edit some files...
3. `cd extension; npm run compile` or `cd extension; npm run browserify` if compiled.
4. Install or reload this extension

### Specifications

+ [About VectorDrawable](https://developer.android.com/guide/topics/graphics/vector-drawable-resources.html)
+ [VectorDrawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html)
+ [VectorDrawableCompat](https://developer.android.com/reference/android/support/graphics/drawable/VectorDrawableCompat.html)

### License

Under [MIT](https://github.com/jmatsu/vector-drawable-previewer/blob/master/LICENSE).
