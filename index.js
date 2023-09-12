const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let enemyMonster, playerMonster, battleAnimationId, renderedSprites, queue;
playerMonster = new Monster(monsters.Draggle);

canvas.width = 1024;
canvas.height = 576;

//70 szerokośc mapy(kafle) z edytora
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}
const startMap = [];
for (let i = 0; i < startPlayer.length; i += 70) {
  startMap.push(startPlayer.slice(i, 70 + i));
}
const boundaries = [];
const battleZones = [];
const startPlayerZone = [];
const offset = { x: -548, y: -795 };

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

ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./img/map.png";

const imageForeground = new Image();
imageForeground.src = "./img/foreground.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";

const player = new Sprite({
  position: {
    x: startPlayerZone[0].position.x,
    y: startPlayerZone[0].position.y - 21,
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

const background = new Sprite({
  position: { x: offset.x, y: offset.y },
  img: image,
});

const foreground = new Sprite({
  position: { x: offset.x, y: offset.y },
  img: imageForeground,
});

const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
const battle = {
  initiated: false,
};

const movables = [background, ...boundaries, foreground, ...battleZones];

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
  let moving = true;
  player.animate = false;

  if (battle.initiated) return;

  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
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
        console.log("batell");
        break;
      }
    }
  }

  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.img = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y + 3 },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) movables.forEach((item) => (item.position.y += 3));
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.img = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y - 3 },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((item) => (item.position.y -= 3));
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.img = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x + 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((item) => (item.position.x += 3));
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.img = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x - 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((item) => (item.position.x -= 3));
  }
};

// animate();
let lastKey = "";

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

let clicked = false;
addEventListener("click", () => {
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
});
