"use strict";

  // contract/init.ts
  function handle(state, action) {
    if (action.input.function === "register") {
      const time = SmartWeave.block.timestamp;
      state.db.push({ name: action.input.text, time: String(time) });
      return { state };
    }
    if (action.input.function === "get") {
      return { result: state.db[parseInt(action.input.id)] };
    }
  }

