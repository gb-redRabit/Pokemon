const battelBackgroundImage = new Image();
battelBackgroundImage.src = "./img/background/battleBackground.png";

const battelBackground = new Sprite({
  position: { x: 0, y: 0 },
  img: battelBackgroundImage,
});

const initBattle = () => {
  document.querySelector(".userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";

  document.querySelector("#enemyHealtBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();
  const randomMonster = Math.floor(Math.random() * monsters.length);

  enemyMonster = new Monster({
    position: {
      x: 0,
      y: 0,
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
    attacks: monsters[randomMonster].attacks,
  });
  renderedSprites = [enemyMonster, activeMonsterPlayer];
  queue = [];

  activeMonsterPlayer.health = activeMonsterPlayer.healthMax;
  enemyMonster.lvl = Math.floor(Math.random() * 3 + 1);

  document.querySelector("#enemyName").innerText = enemyMonster.name;
  document.querySelector("#enemyLvl").innerText = enemyMonster.lvl;

  document.querySelector("#playerName").innerText = activeMonsterPlayer.name;
  document.querySelector("#playerLvl").innerText = activeMonsterPlayer.lvl;

  activeMonsterPlayer.position.x = 300;
  activeMonsterPlayer.position.y = 340;
  activeMonsterPlayer.opacity = 1;
  enemyMonster.position.x = 810;
  enemyMonster.position.y = 120;
  enemyMonster.isEnemy = true;

  gsap.to("#playerExpBar", {
    width: `${
      (activeMonsterPlayer.exp * 100) / activeMonsterPlayer.capturedExp
    }%`,
  });

  document.querySelector(
    "#playerHp"
  ).innerText = `${activeMonsterPlayer.health}/${activeMonsterPlayer.health}`;
  document.querySelector(
    "#enemyHp"
  ).innerText = `${enemyMonster.health}/${enemyMonster.health}`;

  activeMonsterPlayer.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    if (attack.name !== "Caught") {
      document.getElementById("attacksBox").append(button);
    } else if (enemyMonster.health < 10) {
      document.getElementById("attacksBox").append(button);
      button.addEventListener("click", (e) => {
        const selectedAttack = attacks[e.currentTarget.innerText];

        activeMonsterPlayer.attack({
          attack: selectedAttack,
          recipient: enemyMonster,
          renderedSprites,
        });
        queue.push(() => {
          document.querySelector(
            "#dialogueBox"
          ).innerText = `Player Caught ${enemyMonster.name}`;
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector(".userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.initiated = false;
              const newMonster = new Monster({
                position: {
                  x: 0,
                  y: 0,
                },
                faceset: enemyMonster.faceset,
                img: {
                  src: enemyMonster.img.src,
                },
                frames: {
                  max: 4,
                  hold: 30,
                },
                lvl: enemyMonster.lvl,
                type: enemyMonster.type,
                sEnemy: false,
                animate: true,
                name: enemyMonster.name,
                attacks: [...enemyMonster.attacks, attacks.Caught],
              });
              tab.push(newMonster);
              audio.Map.play();
            },
          });
        });
      });
    }
  });
  // dodać innyu sposób łapania
  queue.push(() => {
    activeMonsterPlayer.attacks.forEach((attack) => {
      const button = document.createElement("button");
      button.innerHTML = attack.name;
      if (attack.name === "Caught" && enemyMonster.health < 10)
        document.getElementById("attacksBox").append(button);
      button.addEventListener("click", (e) => {
        const selectedAttack = attacks[e.currentTarget.innerText];

        activeMonsterPlayer.attack({
          attack: selectedAttack,
          recipient: enemyMonster,
          renderedSprites,
        });
        queue.push(() => {
          document.querySelector(
            "#dialogueBox"
          ).innerText = `Player Caught ${enemyMonster.name}`;
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector(".userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.initiated = false;
              const newMonster = new Monster({
                position: {
                  x: 0,
                  y: 0,
                },
                faceset: enemyMonster.faceset,
                img: {
                  src: enemyMonster.img.src,
                },
                frames: {
                  max: 4,
                  hold: 30,
                },
                lvl: enemyMonster.lvl,
                type: enemyMonster.type,
                sEnemy: false,
                animate: true,
                name: enemyMonster.name,
                attacks: [...enemyMonster.attacks, attacks.Caught],
              });
              tab.push(newMonster);
              audio.Map.play();
            },
          });
        });
      });
    });
  });
  document.querySelectorAll("button").forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerText];
      activeMonsterPlayer.attack({
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
            sender: activeMonsterPlayer,
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
              document.querySelector(".userInterface").style.display = "none";
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
          recipient: activeMonsterPlayer,
          renderedSprites,
        });

        if (activeMonsterPlayer.health <= 0) {
          queue.push(() => {
            activeMonsterPlayer.faint();
          });
          queue.push(() => {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector(".userInterface").style.display = "none";
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
      if (e.currentTarget.id !== "bag") {
        const selectedAttack = attacks[e.currentTarget.innerText];
        document.getElementById("attackType").innerText = selectedAttack.type;
        document.getElementById("attackType").style.color =
          selectedAttack.color;
      }
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
// initBattle();
// animateBattel();
document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
