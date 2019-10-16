type Listener<T> = (t: T) => void

export type Subscribable<T> = {
  _subscribers: ((t: T) => void)[];
  subscribe: (fn: Listener<T>) => void;
  unsubscribe: (fn: Listener<T>) => void;
  emit: (event: T) => void;
}

export function subscribable<T>() {
  const subscribers: ((t: T) => void)[] = []
  
  function subscribe(fn: Listener<T>) {
    subscribers.push(fn)
  }

  function unsubscribe(fn: Listener<T>) {
    subscribers.splice(subscribers.indexOf(fn))
  }

  function emit(event: T) {
    subscribers.forEach(
      fn => fn(event)
    )
  }

  return {
    _subscribers: subscribers,
    subscribe,
    unsubscribe,
    emit
  }
}
