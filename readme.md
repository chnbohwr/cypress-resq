# Cypress-resq

cypress react element select query

## Install
```
npm i -S cypress-resq
```

## Configure Cypress
before use it, please add plugin and commands to cypress

### Plugin
Find your `cypress/plugins/index.js` file and change it to look like this:

```javascript
const injectResqPlugin = require('cypress-resq/plugin'); // add this line

module.exports = (on, config) => {
  on('task', injectResqPlugin); // add this line
};
```

### Command
Find your `cypress/support/index.js` file and add the following line:

```javascript
import 'cypress-resq/commands';
```

