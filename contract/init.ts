interface State {
  db: Array<{ name: String; time: String }>;
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
    //@ts-ignore
    const time = SmartWeave.block.timestamp;
    state.db.push({ name: action.input.text, time: String(time) });
    return { state };
  }
  if (action.input.function === "get") {
    return { result: state.db[parseInt(action.input.id)] };
  }
}
