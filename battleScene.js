const battelBackgroundImage = new Image();
battelBackgroundImage.src = "./img/battleBackground.png";

const battelBackground = new Sprite({
  position: { x: 0, y: 0 },
  img: battelBackgroundImage,
});

const initBattle = () => {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealtBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  enemyMonster = new Monster(enamys.Emby);
  renderedSprites = [enemyMonster, playerMonster];
  queue = [];

  playerMonster.health = playerMonster.healthMax;
  enemyMonster.lvl = Math.floor(Math.random() * 3 + 1);

  document.querySelector("#enemyName").innerText = enemyMonster.name;
  document.querySelector("#enemyLvl").innerText = enemyMonster.lvl;

  document.querySelector("#playerName").innerText = playerMonster.name;
  document.querySelector("#playerLvl").innerText = playerMonster.lvl;

  playerMonster.position.x = 300;
  playerMonster.position.y = 340;
  enemyMonster.position.x = 810;
  enemyMonster.position.y = 120;
  enemyMonster.isEnemy = true;

  gsap.to("#playerExpBar", {
    width: `${(playerMonster.exp * 100) / playerMonster.capturedExp}%`,
  });
  console.log(playerMonster);
  document.querySelector(
    "#playerHp"
  ).innerText = `${playerMonster.health}/${playerMonster.health}`;
  document.querySelector(
    "#enemyHp"
  ).innerText = `${enemyMonster.health}/${enemyMonster.health}`;

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
          document.querySelector(
            "#dialogueBox"
          ).innerText = `${enemyMonster.giveExp} EXP`;
          enemyMonster.levelUp({
            recipient: enemyMonster,
            sender: playerMonster,
          });
        });
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
initBattle();
animateBattel();
document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
