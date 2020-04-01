# GSAPRN

Support for gsap: 3.0.0+. For older versions use [https://github.com/tufik2/TweenMaxRN](https://github.com/tufik2/TweenMaxRN)
- This repository enable GSAP to work with ReactNative thanks to Direct Manipulation.
- With this library is possible animate Styles and Transform properties.
- Currently in RN there is not way to recover the current status of a style appied to an element, so is always important specify the initial params with **gsap.set()** before animate its.
- The performance using Direct Manipulation is really good, specially when we compile our app in release version.

# How use

- Include src/libs/TweenMaxRN.js in your project library folder
- Install gsap and gsaprn
	> npm install gsap
	> npm install gsaprn

```javascript
import {gsap, KillTween, Back} from 'gsaprn';
```