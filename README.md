# Enginsight

#### This is a simple project to implement the challenge proposed by you :)

#### I built a little app around the PatternBox, so you can pull the code, install deps and run it.

#### If you want to extract the box to a different project, it might be easiest to copy the directory 'PatternBox' with all including files.

### Notes:

I implemented the native html5 validation for PatternBox and additionally used the quasar 
input validation for the component InputBox.

There was no Icon component (now renamed to SimpleIcon) provided. So i reimagined it as a simple dynamic
component, which receives name and size as props and renders an image based on them.


Best regards,
Johannes

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
