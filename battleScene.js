const battelBackgroundImage = new Image();
battelBackgroundImage.src = "./img/battleBackground.png";

const battelBackground = new Sprite({
  position: { x: 0, y: 0 },
  img: battelBackgroundImage,
});

//dodać wiecje potworó oraz losowanie ich jako wrogów
let enemyMonster, playerMonster, battleAnimationId, renderedSprites, queue;

const initBattle = () => {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealtBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  enemyMonster = new Monster(monsters.Draggle);
  playerMonster = new Monster(monsters.Emby);
  renderedSprites = [enemyMonster, playerMonster];
  queue = [];

  playerMonster.position.x = 290;
  playerMonster.position.y = 330;
  enemyMonster.position.x = 800;
  enemyMonster.position.y = 100;

  playerMonster.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.getElementById("attacksBox").append(button);
  });

  document.querySelectorAll("button").forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerText];
      playerMonster.attack({
        attack: selectedAttack,
        recipient: enemyMonster,
        renderedSprites,
      });
      if (enemyMonster.health <= 0) {
        queue.push(() => {
          enemyMonster.faint();
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.initiated = false;
              audio.Map.play();
            },
          });
        });
      }
      const randomAttack =
        enemyMonster.attacks[
          Math.floor(Math.random() * enemyMonster.attacks.length)
        ];
      queue.push(() => {
        enemyMonster.attack({
          attack: randomAttack,
          recipient: playerMonster,
          renderedSprites,
        });

        if (playerMonster.health <= 0) {
          queue.push(() => {
            playerMonster.faint();
          });
          queue.push(() => {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.initiated = false;
                audio.Map.play();
              },
            });
          });
        }
      });
    });

    item.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerText];
      document.getElementById("attackType").innerText = selectedAttack.type;
      document.getElementById("attackType").style.color = selectedAttack.color;
    });
  });
};

const animateBattel = () => {
  battleAnimationId = window.requestAnimationFrame(animateBattel);
  battelBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
};

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
