import * as PIXI from "pixi.js";
import { rpsService } from "./service/rpsService";
import { scoreTextCpu, scoreTextPlayer } from "./GameMachine/scoreUpdater";

const width = 800;
const height = 600;

export const app = new PIXI.Application({ width: width, height: height });
document.body.appendChild(app.view);

const textureCache = PIXI.utils.TextureCache;

app.loader.baseUrl = "assets";
app.loader
    .add("rockButton", "RockButton.png")
    .add("paperButton", "PaperButton.png")
    .add("scissorsButton", "ScissorsButton.png")
    .add("rockAnimation", "Rock.json")
    .add("rock", "RockMid.png")
    .add("paper", "Paper.png")
    .add("scissors", "Scissors.png")
    .load(setup);

function getRock(): PIXI.AnimatedSprite {
    const rock = new PIXI.AnimatedSprite([PIXI.Texture.from("RockUp.png"), PIXI.Texture.from("RockDn.png")]);

    rock.loop = true;
    rock.animationSpeed = 0.1;
    rock.play();

    return rock;
}

function getCPURock(): PIXI.AnimatedSprite {
    const rock = new PIXI.AnimatedSprite([PIXI.Texture.from("RockUp.png"), PIXI.Texture.from("RockDn.png")]);

    rock.loop = true;
    rock.animationSpeed = 0.1;
    rock.play();

    return rock;
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / width;
        app.stage.scale.y = window.innerHeight / height;
    };

    resize();

    window.addEventListener("resize", resize);
}

function setup() {
    resizeCanvas();

    const playerRock = getRock();

    playerRock.x = 270;
    playerRock.y = height / 4;
    playerRock.scale.x = -1;
    playerRock.scale.y = 1;

    const cpuRock = getCPURock();

    cpuRock.x = 470;
    cpuRock.y = height / 4;
    cpuRock.scale.y = 1;
    cpuRock.scale.x = 1;

    const rock = new PIXI.Sprite(textureCache["rockButton"]);

    rock.x = 100;
    rock.y = 400;
    rock.width = 150;
    rock.height = 60;
    rock.interactive = true;
    rock.buttonMode = true;

    const paper = new PIXI.Sprite(textureCache["paperButton"]);

    paper.x = 300;
    paper.y = 400;
    paper.width = 150;
    paper.height = 60;
    paper.interactive = true;
    paper.buttonMode = true;

    const scissors = new PIXI.Sprite(textureCache["scissorsButton"]);

    scissors.x = 500;
    scissors.y = 400;
    scissors.width = 150;
    scissors.height = 60;
    scissors.interactive = true;
    scissors.buttonMode = true;

    app.stage.addChild(playerRock);
    app.stage.addChild(cpuRock);
    app.stage.addChild(rock, paper, scissors);
    app.stage.addChild(scoreTextCpu);
    app.stage.addChild(scoreTextPlayer);
    app.stage.interactive = true;

    rock.on("click", () => {
        rpsService.send({ type: "CLICK_ROCK", playerChoice: "rock" });

        const selectedRock = new PIXI.Sprite(textureCache["rock"]);

        selectedRock.x = 100;
        selectedRock.y = 170;
        selectedRock.scale.x = 1;
        selectedRock.width = 150;
        selectedRock.height = 150;

        app.stage.removeChild(playerRock);
        app.stage.removeChild(cpuRock);
        app.stage.removeChild(paper, scissors);

        app.stage.addChild(selectedRock);

        setTimeout(() => {
            app.stage.removeChild(selectedRock);
            app.stage.addChild(playerRock);
            app.stage.addChild(cpuRock);
            app.stage.addChild(paper, scissors);
            playerRock.gotoAndPlay(0);
            cpuRock.gotoAndPlay(0);
        }, 2000);
    });

    paper.on("click", () => {
        rpsService.send({ type: "CLICK_PAPER", playerChoice: "paper" });

        const selectedPaper = new PIXI.Sprite(textureCache["paper"]);

        selectedPaper.x = 90;
        selectedPaper.y = 160;
        selectedPaper.scale.x = 1;
        selectedPaper.scale.y = 1;
        selectedPaper.width = 150;
        selectedPaper.height = 150;

        app.stage.removeChild(playerRock);
        app.stage.removeChild(cpuRock);
        app.stage.removeChild(rock, scissors);

        app.stage.addChild(selectedPaper);

        setTimeout(() => {
            app.stage.removeChild(selectedPaper);
            app.stage.addChild(playerRock);
            app.stage.addChild(cpuRock);
            app.stage.addChild(rock, scissors);
            playerRock.gotoAndPlay(0);
            cpuRock.gotoAndPlay(0);
        }, 2000);
    });

    scissors.on("click", () => {
        rpsService.send({ type: "CLICK_SCISSORS", playerChoice: "scissors" });

        const selectedScissors = new PIXI.Sprite(textureCache["scissors"]);

        selectedScissors.x = 90;
        selectedScissors.y = 185;
        selectedScissors.scale.x = 1;
        selectedScissors.scale.y = 1;
        selectedScissors.width = 150;
        selectedScissors.height = 150;

        app.stage.removeChild(playerRock);
        app.stage.removeChild(cpuRock);
        app.stage.removeChild(rock, paper);

        app.stage.addChild(selectedScissors);

        setTimeout(() => {
            app.stage.removeChild(selectedScissors);
            app.stage.addChild(playerRock);
            app.stage.addChild(cpuRock);
            app.stage.addChild(rock, paper);
            playerRock.gotoAndPlay(0);
            cpuRock.gotoAndPlay(0);
        }, 2000);
    });
}
