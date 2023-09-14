const monsters = [
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Cyclope/Faceset.png",
    img: {
      src: "./img/monster/Cyclope/SpriteSheet.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    lvl: 1,
    type: "Normal",
    animate: true,
    name: "Cyclope",
    attacks: [attacks.Tackle, attacks.Jump, attacks.Claw, attacks.FastAttack],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Dragon/Faceset.png",
    img: {
      src: "./img/monster/Dragon/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Normal",
    animate: true,
    name: "Dragon",
    attacks: [attacks.Tackle, attacks.Fireball, attacks.PlantSpike],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Axolot/Faceset.png",
    img: {
      src: "./img/monster/Axolot/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Ground",
    animate: true,
    name: "Axolot",
    attacks: [attacks.Tackle, attacks.Jump, attacks.SheetRock],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Butterfly/Faceset.png",
    img: {
      src: "./img/monster/Butterfly/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Normal",
    animate: true,
    name: "Butterfly",
    attacks: [attacks.Tackle, attacks.Claw, attacks.PlantSpike],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Flam/Faceset.png",
    img: {
      src: "./img/monster/Flam/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Fire",
    animate: true,
    name: "Flam",
    attacks: [attacks.Tackle, attacks.FastAttack, attacks.Fireball],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/GoldRacoon/Faceset.png",
    img: {
      src: "./img/monster/GoldRacoon/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Normal",
    animate: true,
    name: "GoldRacoon",
    attacks: [
      attacks.Tackle,
      attacks.Jump,
      attacks.FastAttack,
      attacks.Claw,
      attacks.Fireball,
      attacks.PlantSpike,
    ],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Racoon/Faceset.png",
    img: {
      src: "./img/monster/Racoon/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Normal",
    animate: true,
    name: "Racoon",
    attacks: [
      attacks.Tackle,
      attacks.Jump,
      attacks.Claw,
      attacks.Fireball,
      attacks.PlantSpike,
    ],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Reptile/Faceset.png",
    img: {
      src: "./img/monster/Reptile/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Water",
    animate: true,
    name: "Reptile",
    attacks: [attacks.Tackle, attacks.Jump, attacks.FrozenBall],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Slime/Faceset.png",
    img: {
      src: "./img/monster/Slime/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Grass",
    animate: true,
    name: "Slime",
    attacks: [attacks.Tackle, attacks.Jump, attacks.PlantSpike],
  },
  {
    position: {
      x: 0,
      y: 0,
    },
    faceset: "./img/monster/Snake/Faceset.png",
    img: {
      src: "./img/monster/Snake/SpriteSheet.png",
    },
    lvl: 1,
    frames: {
      max: 4,
      hold: 30,
    },
    type: "Grass",
    animate: true,
    name: "Snake",
    attacks: [attacks.Tackle, attacks.Claw, attacks.PlantSpike],
  },
];
