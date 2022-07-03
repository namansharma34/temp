interface State {
  db: Array<string>;
}
interface Action {
  input: {
    function: "register" | "get";
    text: string;
    id: string;
  };
}
export function handle(state: State, action: Action) {
  if (action.input.function === "register") {
    state.db.push(action.input.text);
    return { state };
  }
  if (action.input.function === "get") {
    return { result: state.db[parseInt(action.input.id)] };
  }
}
