import { BehaviorSubject } from "rxjs";
import { rpsService } from "../service/rpsService";
import { Text } from "pixi.js";

export const score$ = new BehaviorSubject({ player: 0, cpu: 0 });

export const scoreTextPlayer = new Text(`Player: ${score$.value.player}`, {
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
});

scoreTextPlayer.x = 90;
scoreTextPlayer.y = 20;

export const scoreTextCpu = new Text(`CPU: ${score$.value.cpu}`, {
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
});

scoreTextCpu.x = 530;
scoreTextCpu.y = 20;

score$.subscribe((score) => {
    scoreTextPlayer.text = `Player: ${score.player}`;
    scoreTextCpu.text = `CPU: ${score.cpu}`;
});

rpsService.onTransition((state) => {
    if (state.matches("result")) {
        updateScore(state.context);
    }
});

export function updateScore(context: { cpuChoice?: string; playerChoice?: string; result: any }) {
    const score = { ...score$.value };

    if (context.result === "win") {
        score.player += 1;
    } else if (context.result === "lose") {
        score.cpu += 1;
    }

    score$.next(score);
}
