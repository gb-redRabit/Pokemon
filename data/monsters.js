const monsters = {
  Emby: {
    position: {
      x: 0,
      y: 0,
    },
    img: {
      src: "./img/monster/eya.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    lvl: 1,
    animate: true,
    name: "Embya",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
  Draggle: {
    position: {
      x: 0,
      y: 0,
    },

    img: {
      src: "./img/monster/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    name: "Draggle",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
};
