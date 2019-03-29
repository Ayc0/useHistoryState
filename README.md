# `useHistoryState`

`useHistoryState` is replacement for `useState` that stores the state within the history state.

The difference between `useHistoryState` and `useState` is that every changes in your state will be stored within the navigator history. And so, if you go back in your history, you will change the inner value of the state.

# How to use

```jsx
import React, { Fragment } from "react";
import useHistoryState from "use-history-state";

const Component = () => {
  // const [state, setState] = useHistoryState(initialValue, keyInHistoryState);
  const [name, setName] = useHistoryState("", "name");

  const names = ["John", "Susan", "Hugo", "Jade", "Mike", "Aurora"];

  return (
    <Fragment>
      <h1>{name}</h1>
      {names.map(n => (
        <button key={n} type="button" onClick={() => setName(n)} />
      ))}
    </Fragment>
  );
};
```

## `useHistoryState`

```ts
function useHistoryState<State>(initialValue: State | () => State, key: string) {}
```

If there is already the specified key within the history's state, the initial value will be set to this value. Otherwise, it will you `initialValue` set as argument.

## `setState`

```ts
function setState<State>(newState: State | State => void, replace?: boolean) {}
```

When you use the setState function, you can specify a second argument: `replace`.

- If `replace` is set to `true`, under the hood setState will use `history.replaceState` and so, if you want to go back to the previous page, you won't reach the replaced states.
- If `replace` is set to `false`, under the hood setState will use `history.pushState`, which means that every changes will be available in you history.

By default, `replace` is set to `false`
