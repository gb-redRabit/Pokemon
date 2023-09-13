class Attack {
  caught(rotation, { recipient, renderedSprites }) {
    audio.initFireball.play();
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/fireball.png";
    const fireBall = new Sprite({
      position: {
        x: renderedSprites[1].position.x,
        y: renderedSprites[1].position.y,
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
      },
    });
  }
  fireball(healtBar, rotation, healtText, { recipient, renderedSprites }) {
    audio.initFireball.play();
    const fireBallImage = new Image();
    fireBallImage.src = "./img/skill/fireball.png";
    const fireBall = new Sprite({
      position: {
        x: renderedSprites[1].position.x,
        y: renderedSprites[1].position.y,
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
        renderedSprites[1].hit(healtBar, healtText, { recipient });
      },
    });
  }

  tackle(movemenDistance, healtBar, healtText, { recipient }) {
    const tl = gsap.timeline();

    tl.to(renderedSprites[1].position, {
      x: renderedSprites[1].position.x - movemenDistance,
    })
      .to(renderedSprites[1].position, {
        x: renderedSprites[1].position.x + movemenDistance * 2,
        duration: 0.1,
        onComplete: () => {
          audio.tackleHit.play();
          renderedSprites[1].hit(healtBar, healtText, { recipient });
        },
      })
      .to(renderedSprites[1].position, {
        x: renderedSprites[1].position.x,
      });
  }
}
