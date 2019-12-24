/* eslint-disable  */

let rootEleSelector;

const injectResq = (rs = '#app') => {
  cy.task('injectResq').then(resqSourceCode => {
    cy.window().then((window) => {
      rootEleSelector = rs;
      window.eval(resqSourceCode);
      window.resq.waitToLoadReact(10000, rootEleSelector);
    })
  });
};

const resq$Command = (subject, selector, props = undefined, options = {}) => {
  let resq$, document;

  const log = {
    name: 'resq$',
    message: {
      selector,
      props
    },
  }

  const getValue = () => {
    let result;
    if (Cypress.dom.isElement(subject) && subject[0]) {
      result = resq$(selector, subject[0]);
    } else {
      result = resq$(selector, document.querySelector(rootEleSelector));
    }
    if (typeof props === 'object') {
      result = result.byProps(props)
    }
    if (result.node) {
      return result.node;
    }
    return null;
  }

  const resolveValue = () => {
    return cy.window({ log: false }).then(window => {
      resq$ = window.resq.resq$;
      document = window.document;
      return Cypress.Promise.try(getValue).then(value => {
        if (value) {
          value = Cypress.$(value);
        }
        return cy.verifyUpcomingAssertions(value, options, {
          onRetry: resolveValue,
          ensureExistenceFor: 'subject'
        })
      })
    })
  }

  Cypress.log(log)
  return resolveValue();
};

Cypress.Commands.add('injectResq', injectResq);

Cypress.Commands.add('resq$', { prevSubject: 'optional' }, resq$Command);
