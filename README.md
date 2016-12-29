### vdv - VectorDrawable Viewer

### Limitation

This doesn't support following

+ animated vector drawable
+ android resource references

### Supported elements

`namespace is omitted.`

#### <vector>

|attribute name|supported|will support?|
|:------|:-----|:------|
|name|No|if needed|
|width|Yes|-|
|height|Yes|-|
|viewportWidth|No|No|
|viewportHeight|No|No|
|tint|No|if possible|
|tintMode|No|if possible|
|autoMirrored|No|if possible|
|alpha|No|if possible|

#### <path>

|attribute name|supported|will support?|
|:------|:-----|:------|
|name|No|if needed|
|pathData|Yes|-|
|height|Yes|-|
|viewportWidth|No|No|
|viewportHeight|No|No|
|tint|No|if possible|
|tintMode|No|if possible|
|autoMirrored|No|if possible|
|alpha|No|if possible|

#### <clip-path>

#### <group>

### Specifications

+ [About VectorDrawable](https://developer.android.com/guide/topics/graphics/vector-drawable-resources.html)
+ [VectorDrawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html)
+ [VectorDrawableCompat](https://developer.android.com/reference/android/support/graphics/drawable/VectorDrawableCompat.html)
