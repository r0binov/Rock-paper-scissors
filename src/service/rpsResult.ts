import { RPSContext, results } from "../GameMachine/rpsMachine";
import { rpsService } from "./rpsService";

export function showResult(context: RPSContext) {
    let resultIndex = 0;

    if (context.playerChoice === context.cpuChoice) {
        resultIndex = 0;
    } else if (
        (context.playerChoice === "rock" && context.cpuChoice === "scissors") ||
        (context.playerChoice === "paper" && context.cpuChoice === "rock") ||
        (context.playerChoice === "scissors" && context.cpuChoice === "paper")
    ) {
        resultIndex = 1;
    } else {
        resultIndex = 2;
    }

    context.result = results[resultIndex];

    alert(`You ${context.result}!`);

    rpsService.send({ type: "RESET" });
}
