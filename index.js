const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
ctx.fillRect(0, 0, canvas.width, canvas.height);
let activeMonsterPlayer;
let flaga = false;
const boundaries = [];
const battleZones = [];
const startPlayerZone = [];

const offset = { x: -1300, y: -2295 };
const collisionsMap = [];
const battleZonesMap = [];
const startMap = [];
const homeMap = [];
let enemyMonster,
  playerMonster,
  battleAnimationId,
  homeId,
  renderedSprites,
  queue;
const randomMonster = Math.floor(Math.random() * monsters.length);
playerMonster = new Monster({
  position: {
    x: 300,
    y: 340,
  },
  faceset: monsters[randomMonster].faceset,
  img: {
    src: monsters[randomMonster].img.src,
  },
  frames: {
    max: 4,
    hold: 30,
  },
  lvl: 1,
  type: monsters[randomMonster].type,
  animate: true,
  name: monsters[randomMonster].name,
  select: true,
  attacks: [...monsters[randomMonster].attacks, attacks.Caught],
});

let tab = [playerMonster];
activeMonsterPlayer = tab[0];

const image = new Image();
image.src = "./img/background/map2.png";

const imageForeground = new Image();
imageForeground.src = "./img/background/foreground2.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

for (let i = 0; i < collisions.length; i += 80) {
  collisionsMap.push(collisions.slice(i, i + 80));
}

for (let i = 0; i < battleZonesData.length; i += 80) {
  battleZonesMap.push(battleZonesData.slice(i, 80 + i));
}

for (let i = 0; i < startPlayer.length; i += 80) {
  startMap.push(startPlayer.slice(i, 80 + i));
}

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  img: image,
});

const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  img: imageForeground,
});

const battle = {
  initiated: false,
};

collisionsMap.forEach((row, i) => {
  row.forEach((item, j) => {
    if (item !== 0)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

battleZonesMap.forEach((row, i) => {
  row.forEach((item, j) => {
    if (item !== 0)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

startMap.forEach((row, i) => {
  row.forEach((item, j) => {
    if (item !== 0)
      startPlayerZone.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const movablesMap = [background, ...boundaries, foreground, ...battleZones];
const player = new Sprite({
  position: {
    x: startPlayerZone[0].position.x + 7,
    y: startPlayerZone[0].position.y,
  },
  img: playerDownImage,
  frames: { max: 4, hold: 10 },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
};

const animate = () => {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();

  boundaries.forEach((item) => {
    item.draw();
  });

  battleZones.forEach((item) => {
    item.draw();
  });

  player.draw();
  foreground.draw();

  player.animate = false;

  if (battle.initiated) return;

  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    //battel
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.03
      ) {
        window.cancelAnimationFrame(animationId);

        audio.Map.stop();
        audio.initBattle.play();
        audio.battle.play();

        battle.initiated = true;
        gsap.to("#list", {
          opacity: 0,
        });
        flaga = false;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.3,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.3,
              onComplete() {
                initBattle();
                animateBattel();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.3,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  movePlayer(player, boundaries, movablesMap);
};

animate();

let clicked = false;
addEventListener("click", () => {
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
});
