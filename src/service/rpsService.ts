import { interpret } from "xstate";
import { rpsMachine } from "../GameMachine/rpsMachine";

export const rpsService = interpret(rpsMachine)
    .onTransition((state) => {
        state.value;
    })
    .start();
