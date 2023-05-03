import { app } from "..";
import { RPSContext, buttons } from "../GameMachine/rpsMachine";
import { rpsService } from "./rpsService";
import * as PIXI from "pixi.js";

export function showLoading(context: RPSContext) {
    const cpuChoice = buttons[Math.floor(Math.random() * buttons.length)];
    const textureCache = PIXI.utils.TextureCache;

    const cpuChoiceSprite = new PIXI.Sprite(textureCache[cpuChoice]);
    cpuChoiceSprite.x = 650;
    cpuChoiceSprite.y = 170;
    cpuChoiceSprite.scale.x = -1;
    cpuChoiceSprite.width = 150;
    cpuChoiceSprite.height = 150;

    setTimeout(() => {
        app.stage.removeChild(cpuChoiceSprite);
        rpsService.send({ type: "RESULT", cpuChoice, playerChoice: context.playerChoice });
    }, 2000);

    app.stage.addChild(cpuChoiceSprite);
}
