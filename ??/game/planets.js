const planets = [
  // Deep Core
  {
    name: 'Coruscant',
    x: 500,
    y: 300,
    threatLevel: 0,
    adjacent: ['Corellia', 'Chandrila', 'Naboo'],
    region: 'Deep Core'
  },
  {
    name: 'Corellia',
    x: 460,
    y: 270,
    threatLevel: 0,
    adjacent: ['Coruscant', 'Kuat'],
    region: 'Deep Core'
  },
  {
    name: 'Kuat',
    x: 480,
    y: 250,
    threatLevel: 0,
    adjacent: ['Corellia', 'Alderaan'],
    region: 'Deep Core'
  },
  {
    name: 'Chandrila',
    x: 520,
    y: 280,
    threatLevel: 0,
    adjacent: ['Coruscant', 'Hosnian'],
    region: 'Deep Core'
  },
  {
    name: 'Hosnian',
    x: 540,
    y: 260,
    threatLevel: 0,
    adjacent: ['Chandrila', 'Alderaan'],
    region: 'Deep Core'
  },
  {
    name: 'Alderaan',
    x: 500,
    y: 220,
    threatLevel: 0,
    adjacent: ['Hosnian', 'Kuat'],
    region: 'Deep Core'
  },

  // Anel Interior
  {
    name: 'Onderon',
    x: 580,
    y: 320,
    threatLevel: 0,
    adjacent: ['Chandrila', 'Numidian', 'Naboo'],
    region: 'Inner Rim'
  },
  {
    name: 'Numidian',
    x: 610,
    y: 340,
    threatLevel: 0,
    adjacent: ['Onderon', 'Dorin'],
    region: 'Inner Rim'
  },
  {
    name: 'Dorin',
    x: 640,
    y: 320,
    threatLevel: 0,
    adjacent: ['Numidian', 'Cato Neimoidia'],
    region: 'Inner Rim'
  },
  {
    name: 'Cato Neimoidia',
    x: 670,
    y: 300,
    threatLevel: 0,
    adjacent: ['Dorin', 'Mimban'],
    region: 'Inner Rim'
  },
  {
    name: 'Mimban',
    x: 690,
    y: 330,
    threatLevel: 0,
    adjacent: ['Cato Neimoidia', 'Vandor'],
    region: 'Inner Rim'
  },
  {
    name: 'Vandor',
    x: 720,
    y: 350,
    threatLevel: 0,
    adjacent: ['Mimban', 'Bothawui'],
    region: 'Inner Rim'
  },

  // Anel Médio
  {
    name: 'Naboo',
    x: 550,
    y: 370,
    threatLevel: 1,
    adjacent: ['Coruscant', 'Onderon', 'Kashyyyk'],
    region: 'Mid Rim'
  },
  {
    name: 'Kashyyyk',
    x: 580,
    y: 400,
    threatLevel: 0,
    adjacent: ['Naboo', 'Malastare'],
    region: 'Mid Rim'
  },
  {
    name: 'Malastare',
    x: 610,
    y: 420,
    threatLevel: 0,
    adjacent: ['Kashyyyk', 'Toydaria'],
    region: 'Mid Rim'
  },
  {
    name: 'Bothawui',
    x: 740,
    y: 370,
    threatLevel: 0,
    adjacent: ['Vandor', 'Toydaria'],
    region: 'Mid Rim'
  },
  {
    name: 'Toydaria',
    x: 670,
    y: 440,
    threatLevel: 0,
    adjacent: ['Malastare', 'Bothawui', 'Jedha'],
    region: 'Mid Rim'
  },
  {
    name: 'Jedha',
    x: 650,
    y: 480,
    threatLevel: 0,
    adjacent: ['Toydaria', 'Geonosis'],
    region: 'Mid Rim'
  },

  // Anel Exterior
  {
    name: 'Tatooine',
    x: 600,
    y: 520,
    threatLevel: 0,
    adjacent: ['Jedha', 'Lothal'],
    region: 'Outer Rim'
  },
  {
    name: 'Lothal',
    x: 630,
    y: 550,
    threatLevel: 0,
    adjacent: ['Tatooine', 'Ryloth'],
    region: 'Outer Rim'
  },
  {
    name: 'Ryloth',
    x: 660,
    y: 580,
    threatLevel: 0,
    adjacent: ['Lothal', 'Geonosis'],
    region: 'Outer Rim'
  },
  {
    name: 'Geonosis',
    x: 690,
    y: 500,
    threatLevel: 0,
    adjacent: ['Jedha', 'Ryloth'],
    region: 'Outer Rim'
  },
  {
    name: 'Mandalore',
    x: 750,
    y: 450,
    threatLevel: 0,
    adjacent: ['Geonosis', 'Kessel'],
    region: 'Outer Rim'
  },
  {
    name: 'Kessel',
    x: 780,
    y: 470,
    threatLevel: 0,
    adjacent: ['Mandalore'],
    region: 'Outer Rim'
  }
];

module.exports = planets;