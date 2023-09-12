class Sprite {
  constructor({
    position,
    img,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
  }) {
    this.position = position;
    this.img = new Image();
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.img.onload = () => {
      this.width = this.img.width / this.frames.max;
      this.height = this.img.height;
    };
    this.img.src = img.src;
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;

    this.rotation = rotation;
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

    ctx.drawImage(
      this.img,
      this.frames.val * this.width,
      0,
      this.img.width / this.frames.max,
      this.img.height,
      this.position.x,
      this.position.y,
      this.img.width / this.frames.max,
      this.img.height
    );
    ctx.restore();
    if (!this.animate) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}

class Monster extends Sprite {
  constructor({
    position,
    velocity,
    img,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
    attitude,
    lvl,
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
    this.lvl = lvl;
    this.nextLvl = this.nextLvl ? this.nextLvl : 0;
    this.nextLvl = this.nextLvl + this.lvl * 10;
    this.exp = 0;
    this.giveExp = Math.floor((this.lvl * 10 + 9) / 6);
    this.capturedExp = this.lvl * 5;
    this.attitude = attitude;
    this.health = this.health ? this.health : this.lvl * 2;
    for (let i = 0; i < this.lvl + 1; i++) {
      this.health = this.health + Math.floor(Math.random() * 20);
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
      sender.health += Math.floor(Math.random() * 20);
      sender.lvl++;

      document.querySelector(
        "#dialogueBox"
      ).innerText = `LeveL Up ${sender.lvl}`;
      if (up > 0) {
        sender.exp = up;
      }
    }
  }
  hit(healtBar, healtText, { recipient }) {
    document.querySelector(
      healtText
    ).innerText = `${recipient.health}/${recipient.healthMax}`;
    gsap.to(healtBar, {
      width: `${(recipient.health * 100) / recipient.healthMax}%`,
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
    });
    audio.battle.stop();
    audio.victory.play();
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector("#dialogueBox").style.display = "flex";
    document.querySelector(
      "#dialogueBox"
    ).innerHTML = `${this.name} used ${attack.name}`;

    let movemenDistance = 20;
    let healtBar = "#enemyHealtBar";
    let healtText = "#enemyHp";
    let rotation = 1;

    if (this.isEnemy) {
      movemenDistance = -20;
      healtBar = "#playerHealthBar";
      healtText = "#playerHp";
      rotation = -2.2;
    }
    recipient.health -= attack.damage;
    switch (attack.name) {
      case "Tackle":
        this.tackle(movemenDistance, healtBar, healtText, { recipient });
        break;
      case "Fireball":
        this.fireball(healtBar, rotation, healtText, {
          recipient,
          renderedSprites,
        });
        break;
    }
  }

  fireball(healtBar, rotation, healtText, { recipient, renderedSprites }) {
    audio.initFireball.play();
    const fireBallImage = new Image();
    fireBallImage.src = "./img/fireball.png";
    const fireBall = new Sprite({
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      img: fireBallImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    renderedSprites.splice(1, 0, fireBall);

    gsap.to(fireBall.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        renderedSprites.splice(1, 1);
        this.hit(healtBar, healtText, { recipient });
      },
    });
  }

  tackle(movemenDistance, healtBar, healtText, { recipient }) {
    const tl = gsap.timeline();

    tl.to(this.position, {
      x: this.position.x - movemenDistance,
    })
      .to(this.position, {
        x: this.position.x + movemenDistance * 2,
        duration: 0.1,
        onComplete: () => {
          audio.tackleHit.play();
          this.hit(healtBar, healtText, { recipient });
        },
      })
      .to(this.position, {
        x: this.position.x,
      });
  }
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }
  draw() {
    ctx.fillStyle = "rgba(255,0,0,0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
