class Attack {
  caught(rotation, { recipient, sender, renderedSprites }) {
    const fireBallImage = new Image();
    fireBallImage.src = "./img/pokeboll.png";
    const fireBall = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: fireBallImage,
      frames: {
        max: 1,
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
        recipient.caught();
      },
    });
  }
  claw(healtBar, rotation, healtText, { recipient, sender, renderedSprites }) {
    audio.initFireball.play();
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/claw.png";
    const fireBall = new Sprite({
      position: {
        x: recipient.position.x,
        y: recipient.position.y,
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
        sender.hit(healtBar, healtText, { recipient });
      },
    });
  }

  plantspike(healtBar, healtText, { recipient, sender, renderedSprites }) {
    audio.initFireball.play();
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/PlantSpike.png";
    const fireBall = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
      },
      img: fireBallImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation: -0.6,
    });
    renderedSprites.splice(1, 0, fireBall);

    gsap.to(fireBall.position, {
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
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/fireball.png";
    const fireBall = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
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
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/FrozenBall.png";
    const fireBall = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
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
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/SheetRock.png";
    const fireBall = new Sprite({
      position: {
        x: sender.position.x,
        y: sender.position.y,
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
          audio.tackleHit.play();
          sender.hit(healtBar, healtText, { recipient });
        },
      })
      .to(sender.position, {
        x: sender.position.x,
        y: sender.position.y,
      });
  }
}
