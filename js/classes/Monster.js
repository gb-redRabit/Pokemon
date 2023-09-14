class Monster extends Sprite {
  constructor({
    position,
    velocity,
    img,
    faceset,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
    lvl,
    select = false,
    type,
  }) {
    super({
      position,
      velocity,
      img,
      frames,
      sprites,
      animate,
      rotation,
    });
    this.type = type;
    this.faceset = faceset;
    this.select = select;
    this.lvl = lvl;
    this.dmg = this.lvl * 2;
    this.exp = 0;
    this.giveExp = Math.floor((this.lvl * 10 + 9) / 6);
    this.capturedExp = this.lvl * 5;
    this.health = this.health ? this.health : Math.floor(Math.random() * 20);
    for (let i = 0; i < this.lvl + 1; i++) {
      this.health = this.health + Math.floor(Math.random() * 10);
    }
    this.healthMax = this.health;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
    this.frames = { ...frames, val: 0, elapsed: 0 };
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    ctx.rotate(this.rotation);
    ctx.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    let x, y;

    if (!this.isEnemy) {
      (x = 64), (y = 0);
      ctx.translate(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2
      );
      ctx.scale(-1, 1);
      ctx.rotate(this.rotation);
      ctx.translate(
        -this.position.x - this.width / 2,
        -this.position.y - this.height / 2
      );
    } else {
      (x = 0), (y = 0);
    }

    ctx.drawImage(
      this.img,
      x,
      y + this.frames.val,
      this.width,
      this.width,
      this.position.x,
      this.position.y,
      this.width,
      this.width
    );
    ctx.restore();
    if (!this.animate) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.width * 3) this.frames.val += this.width;
      else this.frames.val = 0;
    }
  }

  levelUp({ recipient, sender }) {
    sender.exp += recipient.giveExp;
    if (sender.capturedExp <= sender.exp) {
      let up = sender.exp - sender.capturedExp;
      sender.healthMax = sender.healthMax + Math.floor(Math.random() * 10 + 10);
      sender.health = sender.healthMax;
      sender.lvl++;
      sender.dmg += sender.lvl + Math.floor(Math.random() * 10 + 1);
      sender.capturedExp = sender.lvl * 5;
      sender.exp = 0;
      document.querySelector(
        "#dialogueBox"
      ).innerText = `LeveL Up ${sender.lvl}`;
      if (up > 0) {
        sender.exp = up;
      }
    }
  }

  hit(healtBar, healtText, { recipient }) {
    console.log();
    document.querySelector(healtText).innerText = `${
      recipient.health > 0 ? recipient.health : 0
    }/${recipient.healthMax}`;
    gsap.to(healtBar, {
      width: `${
        recipient.health > 0
          ? (recipient.health * 100) / recipient.healthMax
          : 0
      }%`,
    });
    gsap.to(recipient.position, {
      x: recipient.position.x + 10,
      duration: 0.05,
      yoyo: true,
      repeat: 5,
    });
    gsap.to(recipient, {
      opacity: 0,
      repeat: 5,
      yoyo: true,
      duration: 0.05,
    });
  }

  faint() {
    document.querySelector("#dialogueBox").innerHTML = `${this.name} fainted!`;
    gsap.to(this.position, {
      y: this.position.y + 20,
    });
    gsap.to(this, {
      opacity: 0,
      repeat: 5,
      yoyo: true,
      duration: 0.05,
    });
    audio.battle.stop();
    audio.victory.play();
  }

  caught() {
    document.querySelector(
      "#dialogueBox"
    ).innerHTML = `Player Caught ${enemyMonster.name}`;
    gsap.to(this, {
      opacity: 0,
    });
    audio.battle.stop();
    audio.victory.play();
  }

  miss() {
    let dodge = false;
    //napisać zasady obrony

    return dodge;
  }

  attacktype({ attack, recipient }) {
    let dmg;
    if (recipient.type === attack.type || recipient.type !== attack.type)
      dmg = attack.damage;
    if (recipient.type === "Normal" && attack.type !== "Normal")
      dmg = attack.damage + this.dmg;
    if (recipient.type === "Water" && attack.type === "Fire")
      dmg = attack.damage - this.dmg;
    if (recipient.type === "Grass" && attack.type === "Fire")
      dmg = attack.damage + this.dmg * 2;
    if (recipient.type === "Grass" && attack.type === "Water")
      dmg = attack.damage - this.dmg;
    if (recipient.type === "Ground" && attack.type === "Water")
      dmg = attack.damage + this.dmg * 2;
    if (recipient.type === "Ground" && attack.type === "Fire")
      dmg = attack.damage - this.dmg * 2;
    if (recipient.type === "Fire" && attack.type === "Water")
      dmg = attack.damage + this.dmg * 2;
    if (dmg < 0) dmg = attack.damage;
    return dmg;
  }

  attack({ attack, recipient, sender, renderedSprites }) {
    document.querySelector("#dialogueBox").style.display = "flex";
    document.querySelector(
      "#dialogueBox"
    ).innerHTML = `${sender.name} used ${attack.name}`;

    let movemenDistance = 20;
    let healtBar = "#enemyHealtBar";
    let healtText = "#enemyHp";
    let rotation = 1;
    const attackaaa = new Attack();
    if (this.isEnemy) {
      movemenDistance = -20;
      healtBar = "#playerHealthBar";
      healtText = "#playerHp";
      rotation = -2.2;
    }
    if ("PlantSpike" === attack.name) rotation = -0.6;
    if ("PlantSpike" === attack.name && this.isEnemy) rotation = 2.5;
    if (!this.miss()) {
      recipient.health -= this.attacktype({ attack, recipient });
      switch (attack.name) {
        case "Tackle":
          attackaaa.tackle(movemenDistance, healtBar, healtText, {
            recipient,
            sender,
          });
          break;
        case "Jump":
          attackaaa.jump(movemenDistance, healtBar, healtText, {
            recipient,
            sender,
          });
          break;
        case "FastAttack":
          attackaaa.fastattack(movemenDistance, healtBar, healtText, {
            recipient,
            sender,
          });
          break;
        case "Caught":
          attackaaa.caught(rotation, {
            recipient,
            sender,
            renderedSprites,
          });
          break;
        case "Fireball":
          attackaaa.fireball(healtBar, rotation, healtText, {
            recipient,
            sender,
            renderedSprites,
          });
          break;
        case "Claw":
          attackaaa.claw(movemenDistance, healtBar, rotation, healtText, {
            recipient,
            sender,
            renderedSprites,
          });
          break;
        case "PlantSpike":
          attackaaa.plantspike(healtBar, rotation, healtText, {
            recipient,
            sender,
            renderedSprites,
          });
          break;
        case "SheetRock":
          attackaaa.sheetrock(healtBar, rotation, healtText, {
            recipient,
            sender,
            renderedSprites,
          });
          break;
        case "FrozenBall":
          attackaaa.frozenball(healtBar, rotation, healtText, {
            recipient,
            sender,
            renderedSprites,
          });
          break;
      }
    } else {
      //dzwiek obrony dodac zmienić animacje
      gsap.to(recipient, {
        opacity: 0,
        repeat: 5,
        yoyo: true,
        duration: 0.05,
      });
    }
  }
}
