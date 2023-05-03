import { createMachine, assign } from "xstate";
import { showLoading } from "../service/rpsLoading";
import { showResult } from "../service/rpsResult";

export interface RPSContext {
    playerChoice: string;
    cpuChoice: string;
    result: string;
    playerScore: number;
    cpuScore: number;
}

export const buttons = ["rock", "paper", "scissors"];
export const results = ["draw", "win", "lose"];

export const rpsMachine = createMachine({
    id: "rps",
    initial: "idle",
    context: {
        cpuChoice: "",
        playerChoice: "",
        result: "",
    },
    states: {
        idle: {
            on: {
                CLICK_ROCK: {
                    target: "waiting",
                    actions: assign({
                        playerChoice: () => "rock",
                    }),
                },
                CLICK_PAPER: {
                    target: "waiting",
                    actions: assign({
                        playerChoice: () => "paper",
                    }),
                },
                CLICK_SCISSORS: {
                    target: "waiting",
                    actions: assign({
                        playerChoice: () => "scissors",
                    }),
                },
            },
        },
        waiting: {
            entry: [showLoading],
            on: {
                RESULT: {
                    target: "result",
                    actions: assign({
                        cpuChoice: (_, event: any) => event.cpuChoice,
                    }),
                },
            },
        },
        result: {
            entry: [showResult],
            on: {
                RESET: {
                    target: "idle",
                    actions: assign({
                        playerChoice: "",
                        cpuChoice: "",
                        result: "",
                    }),
                },
            },
        },
    },
});
