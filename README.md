# LIL TROUBLEMAKER extension for `Chrom(?:e|ium)`

## Chrome Plugin to wander about the internet trying to get in trouble.

This is an `unpacked` extension loaded through developer mode in `Chrom(?:e|ium)`.

In Chromium:

`menu` &rarr; `more tools` &rarr; `extensions`

Upper right turn on `Developer mode`.

Click `Load unpacked` and find the directory you cloned.

Other browsers might be different, you'll have to figure it out.

`denyFilter` in `content_script.js` is a deny list.  Crawler won't crawl to any site that matches the `denyFilter` regex.

`startPage` in `content_script.js` is the page the script resets to if it gets stuck on one domain for very long.
