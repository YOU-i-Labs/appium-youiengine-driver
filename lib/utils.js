

function unwrapEl (el) {
  if(typeof el === 'object' && el.ELEMENT){
    return el.ELEMENT;
  }
  return el;
}

const youiEngineDriverReturnValues = {
  WEBDRIVER_SUCCESS: 0,
  WEBDRIVER_NO_SUCH_ELEMENT: 7,
  WEBDRIVER_UNKNOWN_COMMAND: 9,
  WEBDRIVER_STALE_ELEMENT: 10
  };


export default {
  unwrapEl, youiEngineDriverReturnValues };
