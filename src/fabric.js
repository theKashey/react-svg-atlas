import NanoEvents from 'nanoevents';
import shallowEqual from 'shallowequal';
import { CONTEXT_ID, globalContext } from './context';


const createElement = (element, workingContext) => {
  element.created = true;
  workingContext.notify();
};

const destroyElement = (element, workingContext) => {
  element.created = false;
  workingContext.notify();
};

const deepShallowEqual = (a, b) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  if (keys1.length !== keys2.length) {
    return false;
  }
  return keys1.reduce((acc, key) => (acc && shallowEqual(a[key], b[key])), true);
};

export const elementsAreEqual = (a, b) => (
  a.type === b.type && deepShallowEqual(a.props, b.props)
);

const getElementIdentity = (element, renderedElements, globalCounter, autoCreate) => {
  let renderedItem;

  // speed optimization
  for (let i = 0; i < renderedElements.length; i++) {
    const re = renderedElements[i];
    if (elementsAreEqual(re, element)) {
      renderedItem = re;
      break;
    }
  }

  if (!renderedItem && autoCreate) {
    renderedItem = {
      type: element.type,
      props: element.props,
      id: globalCounter.itemCounter++,
      xlink: null,
      counter: 0,
      created: false,
      events: new NanoEvents(),
      updated() {
        this.events.emit('update', this);
      },
    };
    renderedElements.push(renderedItem);
  }

  return renderedItem;
};

const putIntoContainer = (sourceElement, context) => {
  const workingContext = (context[CONTEXT_ID] || globalContext);
  const element = getElementIdentity(sourceElement, workingContext.sprites, workingContext, true);

  if (!element.created) {
    createElement(element, workingContext);
  }
  element.counter++;

  return element;
};

const popFromContainer = (sourceElement, context) => {
  const workingContext = (context[CONTEXT_ID] || globalContext);
  const element = getElementIdentity(sourceElement, workingContext.sprites, workingContext, false);
  if (element) {
    element.counter--;
    if (!element.counter) {
      workingContext.sprites = workingContext.sprites.filter(x => x !== element);

      destroyElement(element, workingContext);
    }
  }
};

export {
  putIntoContainer,
  popFromContainer,
};
