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

const getElementIdentity = (element, renderedElements, globalCounter) => {
  let renderedItem;

  // speed optimization
  for (let i = 0; i < renderedElements.length; i++) {
    const re = renderedElements[i];
    if (re.type === element.type && shallowEqual(re.props, element.props)) {
      renderedItem = re;
      break;
    }
  }

  if (!renderedItem) {
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
  const element = getElementIdentity(sourceElement, workingContext.sprites, workingContext);

  if (!element.created) {
    createElement(element, workingContext);
  }
  element.counter++;

  return element;
};

const popFromContainer = (sourceElement, context) => {
  const workingContext = (context[CONTEXT_ID] || globalContext);
  const element = getElementIdentity(sourceElement, workingContext.sprites);
  element.counter--;
  if (!element.counter) {
    workingContext.sprites = workingContext.sprites.filter(x => x !== element);

    destroyElement(element, workingContext);
  }
};

export {
  putIntoContainer,
  popFromContainer,
};
