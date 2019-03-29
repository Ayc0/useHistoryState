import { useEffect, useState, useCallback, SetStateAction } from "react";

const extractState = (key: string) => window.history.state && window.history.state[key];
const containsKey = (key: string) => window.history.state && key in window.history.state;

type Dispatch<Action> = (newState: Action, replace: boolean) => void;

function useHistoryState<State>(
  initialState: State | (() => State),
  key: string
): [State, Dispatch<SetStateAction<State>>] {
  if (!key) {
    throw new Error("Must provide a key");
  }
  const [localState, setLocalState] = useState(
    containsKey(key) ? extractState(key) : initialState instanceof Function ? initialState() : initialState
  );

  useEffect(() => {
    const fn = state => {
      const newValue = extractState(key);
      if (containsKey(key) && newValue !== localState) {
        setLocalState(newValue);
      }
    };
    window.addEventListener("popstate", fn);
    return () => {
      window.removeEventListener("popstate", fn);
    };
  }, [key, localState]);

  const setState = useCallback(
    (newState, replace = false) => {
      let newValue;
      if (newState instanceof Function) {
        newValue = newState(localState);
      } else {
        newValue = newState;
      }
      setLocalState(newValue);
      console.log(newValue);
      if (replace) {
        window.history.replaceState({ ...window.history.state, [key]: newValue }, null);
      } else {
        window.history.pushState({ ...window.history.state, [key]: newValue }, null);
      }
    },
    [key, localState]
  );

  return [localState, setState];
}

export default useHistoryState;
