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

## Usage

### Basic usage
Take this React App
```javascript
// imports

const MyComponent = () => (
    <div>My Component</div>
)

const App = () => (
    <div><MyComponent /></div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```
Selecting `MyComponent` and click it by cypress:
```javascript
// it's important to inject resq command after visit react page.
cy.visit('/').injectResq();
// find element by react component name
cy.resq$('MyComponent').click();
```

### Filtering selection
You can filter your selections by props

```
<MyComponent e2e="goodcomponent" />
```
Selecting `MyComponent` with prop e2e and click it by cypress:
```javascript
cy.resq$('MyComponent', {e2e: 'goodcomponent'}).click();
```

### Chain selection
you can chain `resq$` command after others command return element.
```javascript
cy.get('#root').resq$('MyComponent').click();
```
