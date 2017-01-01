### vdv - VectorDrawable Viewer

This is a Chrome extension for previewing vector drawable.

### Installation



### Limitation

This doesn't support following

+ animated vector drawable
+ android resource references

### Supported elements

`namespace is omitted.`

#### vector

the root element.

|attribute name|supported|
|:------|:-----|
|name|No|
|width|Yes|
|height|Yes|
|viewportWidth|No|
|viewportHeight|No|
|tint|No|
|tintMode|No|
|autoMirrored|No|
|alpha|No|

#### path

|attribute name|supported|
|:------|:-----|
|name|No|
|pathData|Yes|
|height|Yes|
|viewportWidth|No|
|viewportHeight|No|
|tint|No|
|tintMode|No|
|autoMirrored|No|
|alpha|No|

#### clip-path

none.

#### group

none.

### Specifications

+ [About VectorDrawable](https://developer.android.com/guide/topics/graphics/vector-drawable-resources.html)
+ [VectorDrawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html)
+ [VectorDrawableCompat](https://developer.android.com/reference/android/support/graphics/drawable/VectorDrawableCompat.html)
