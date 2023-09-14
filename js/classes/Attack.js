class Attack {
  caught(rotation, { recipient, sender, renderedSprites }) {
    const spellImage = new Image();
    spellImage.src = "./img/pokeboll.png";
    const spell = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: spellImage,
      frames: {
        max: 1,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    renderedSprites.splice(1, 0, spell);

    gsap.to(spell.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        renderedSprites.splice(1, 1);
        recipient.caught();
      },
    });
  }
  claw(
    movemenDistance,
    healtBar,
    rotation,
    healtText,
    { recipient, sender, renderedSprites }
  ) {
    const spellImage = new Image();
    spellImage.src = "./img/skill/claw.png";
    const spell = new Sprite({
      position: {
        x: recipient.position.x,
        y: recipient.position.y,
      },
      img: spellImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    const tl = gsap.timeline();

    tl.to(sender.position, {
      x: recipient.position.x - movemenDistance * 2,
      y: recipient.position.y + movemenDistance * 2,
      duration: 0.3,
      onComplete: () => {
        audio.tackleHit.play();
        renderedSprites.splice(2, 1, spell);
      },
    })
      .to(spell.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
          sender.isEnemy = !sender.isEnemy;
          renderedSprites.splice(2, 1);
          sender.hit(healtBar, healtText, { recipient });
        },
      })
      .to(spell.position, {
        duration: 0.1,
      })
      .to(sender.position, {
        x: sender.position.x,
        y: sender.position.y,
        onComplete: () => {
          sender.isEnemy = !sender.isEnemy;
        },
      });
  }

  plantspike(
    healtBar,
    rotation,
    healtText,
    { recipient, sender, renderedSprites }
  ) {
    audio.initFireball.play();
    const spellImage = new Image();
    spellImage.src = "./img/skill/PlantSpike.png";
    const spell = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: spellImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    renderedSprites.splice(1, 0, spell);

    gsap.to(spell.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        renderedSprites.splice(1, 1);
        sender.hit(healtBar, healtText, { recipient });
      },
    });
  }

  fireball(
    healtBar,
    rotation,
    healtText,
    { recipient, sender, renderedSprites }
  ) {
    audio.initFireball.play();
    const spellImage = new Image();
    spellImage.src = "./img/skill/fireball.png";
    const spell = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: spellImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    renderedSprites.splice(1, 0, spell);

    gsap.to(spell.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        renderedSprites.splice(1, 1);
        sender.hit(healtBar, healtText, { recipient });
      },
    });
  }
  frozenball(
    healtBar,
    rotation,
    healtText,
    { recipient, sender, renderedSprites }
  ) {
    audio.initFireball.play();
    const spellImage = new Image();
    spellImage.src = "./img/skill/FrozenBall.png";
    const spell = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: spellImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    renderedSprites.splice(1, 0, spell);

    gsap.to(spell.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        renderedSprites.splice(1, 1);
        sender.hit(healtBar, healtText, { recipient });
      },
    });
  }
  sheetrock(
    healtBar,
    rotation,
    healtText,
    { recipient, sender, renderedSprites }
  ) {
    audio.initFireball.play();
    const spellImage = new Image();
    spellImage.src = "./img/skill/SheetRock.png";
    const spell = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: spellImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation,
    });
    renderedSprites.splice(1, 0, spell);

    gsap.to(spell.position, {
      x: recipient.position.x,
      y: recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        renderedSprites.splice(1, 1);
        sender.hit(healtBar, healtText, { recipient });
      },
    });
  }
  tackle(movemenDistance, healtBar, healtText, { recipient, sender }) {
    const tl = gsap.timeline();

    tl.to(sender.position, {
      x: sender.position.x - movemenDistance,
    })
      .to(sender.position, {
        x: sender.position.x + movemenDistance * 2,
        duration: 0.1,
        onComplete: () => {
          audio.tackleHit.play();
          sender.hit(healtBar, healtText, { recipient });
        },
      })
      .to(sender.position, {
        x: sender.position.x,
      });
  }

  fastattack(movemenDistance, healtBar, healtText, { recipient, sender }) {
    const tl = gsap.timeline();

    tl.to(sender.position, {
      x: sender.position.x - movemenDistance * 2,
    })
      .to(sender.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        duration: 0.3,
        onComplete: () => {
          audio.tackleHit.play();
          sender.hit(healtBar, healtText, { recipient });
        },
      })
      .to(sender.position, {
        x: sender.position.x,
        y: sender.position.y,
        duration: 0.2,
      })
      .to(sender.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        duration: 0.3,
        onComplete: () => {
          audio.tackleHit.play();
          sender.hit(healtBar, healtText, { recipient });
        },
      })
      .to(sender.position, {
        x: sender.position.x,
        y: sender.position.y,
        duration: 0.2,
      });
  }
  jump(movemenDistance, healtBar, healtText, { recipient, sender }) {
    const tl = gsap.timeline();

    tl.to(sender.position, {
      x: sender.position.x - movemenDistance,
    })
      .to(sender.position, {
        x: sender.position.x + movemenDistance * 2,
      })
      .to(sender.position, {
        x: recipient.position.x / 2 + 200,
        y: recipient.position.y / 2 - 50,
      })
      .to(sender.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
          sender.isEnemy = !sender.isEnemy;
          audio.tackleHit.play();
          sender.hit(healtBar, healtText, { recipient });
        },
      })
      .to(sender.position, {
        x: sender.position.x,
        y: sender.position.y,
        duration: 1,
        onComplete: () => {
          sender.isEnemy = !sender.isEnemy;
        },
      });
  }
}
