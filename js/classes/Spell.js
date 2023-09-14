class Spell {
  constructor(
    src,
    healtBar,
    rotation,
    healtText,
    { recipient, sender, renderedSprites }
  ) {
    this.src = src;
    this.healtBar = healtBar;
    this.rotation = rotation;
    this.healtText = healtText;
    this.recipient = recipient;
    this.sender = sender;
    this.renderedSprites = renderedSprites;
    this.useSpell();
  }

  useSpell() {
    console.log(this.sender.position.x);
    audio.initFireball.play();
    const spellImage = new Image();
    spellImage.src = this.src;
    const spell = new Sprite({
      position: {
        x: this.sender.position.x,
        y: this.sender.position.y,
      },
      img: spellImage,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
      rotation: this.rotation,
    });
    this.renderedSprites.splice(1, 0, spell);

    gsap.to(spell.position, {
      x: this.recipient.position.x,
      y: this.recipient.position.y,
      onComplete: () => {
        audio.fireballHit.play();
        this.renderedSprites.splice(1, 1);
        this.sender.hit(this.healtBar, this.healtText, this.recipient);
      },
    });
  }
}
