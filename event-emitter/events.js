class EventEmitter {
  listeners = new Map();

  getListeners(eventName) {
    return this.listeners.get(eventName) || [];
  }

  addListener(eventName, listener) {
    const listeners = this.getListeners(eventName);
    this.listeners.set(eventName, [...listeners, listener]);
  }

  removeListener(eventName, listener) {
    const listeners = this.getListeners(eventName).filter((lis) => lis !== listener);
    this.listeners.set(eventName, listeners);
  }

  on(eventName, listener) {
    this.addListener(eventName, listener);
    return this;
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(args);
      this.off(eventName, onceWrapper);
    };
    this.addListener(eventName, onceWrapper);
    return this;
  }

  off(eventName, listener) {
    this.removeListener(eventName, listener);
    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.getListeners(eventName);
    if (!listeners.length) return false;

    listeners.forEach((lis) => {
      lis(...args);
    });
    return true;
  }

  listenerCount(eventName) {
    return this.getListeners(eventName).length;
  }

  rawListeners(eventName) {
    return [...this.getListeners(eventName)];
  }
}

module.exports = EventEmitter;
