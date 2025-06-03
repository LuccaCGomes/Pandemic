const planets = [
  // Deep Core
  {
    name: 'Coruscant',
    x: 500,
    y: 300,
    adjacent: ['Onderon', 'Corellia', 'Alderaan', 'Hosnian'],
    region: 'Deep Core'
  },
  {
    name: 'Corellia',
    x: 460,
    y: 270,
    adjacent: ['Coruscant', 'Chandrila', 'Hosnian'],
    region: 'Deep Core'
  },
  {
    name: 'Kuat',
    x: 480,
    y: 250,
    adjacent: ['Alderaan', 'Chandrila'],
    region: 'Deep Core'
  },
  {
    name: 'Chandrila',
    x: 520,
    y: 280,
    adjacent: ['Kuat', 'Corellia'],
    region: 'Deep Core'
  },
  {
    name: 'Hosnian',
    x: 540,
    y: 260,
    adjacent: ['Corellia', 'Coruscant'],
    region: 'Deep Core'
  },
  {
    name: 'Alderaan',
    x: 500,
    y: 220,
    adjacent: ['Coruscant', 'Kuat'],
    region: 'Deep Core'
  },

  // Anel Interior
  {
    name: 'Onderon',
    x: 580,
    y: 320,
    adjacent: ['Dorin', 'Coruscant', 'Mimban'],
    region: 'Inner Rim'
  },
  {
    name: 'Numidian',
    x: 610,
    y: 340,
    adjacent: ['Mimban', 'Cato Neimoidia'],
    region: 'Inner Rim'
  },
  {
    name: 'Dorin',
    x: 640,
    y: 320,
    adjacent: ['Onderon', 'Vandor'],
    region: 'Inner Rim'
  },
  {
    name: 'Cato Neimoidia',
    x: 670,
    y: 300,
    adjacent: ['Vandor', 'Numidian'],
    region: 'Inner Rim'
  },
  {
    name: 'Mimban',
    x: 690,
    y: 330,
    adjacent: ['Onderon', 'Numidia'],
    region: 'Inner Rim'
  },
  {
    name: 'Vandor',
    x: 720,
    y: 350,
    adjacent: ['Cato Neimoidia', 'Dorin'],
    region: 'Inner Rim'
  },

  // Anel Médio
  {
    name: 'Naboo',
    x: 550,
    y: 370,
    adjacent: ['Toydaria', 'Malastare', 'Ryloth'],
    region: 'Mid Rim'
  },
  {
    name: 'Kashyyyk',
    x: 580,
    y: 400,
    adjacent: ['Bothawui', 'Toydaria'],
    region: 'Mid Rim'
  },
  {
    name: 'Malastare',
    x: 610,
    y: 420,
    adjacent: ['Naboo', 'Jedha'],
    region: 'Mid Rim'
  },
  {
    name: 'Bothawui',
    x: 740,
    y: 370,
    adjacent: ['Jedha', 'Kashyyyk'],
    region: 'Mid Rim'
  },
  {
    name: 'Toydaria',
    x: 670,
    y: 440,
    adjacent: ['Naboo', 'Kashyyyk'],
    region: 'Mid Rim'
  },
  {
    name: 'Jedha',
    x: 650,
    y: 480,
    adjacent: ['Bothawui', 'Malastare'],
    region: 'Mid Rim'
  },

  // Anel Exterior
  {
    name: 'Tatooine',
    x: 600,
    y: 520,
    adjacent: ['Ryloth', 'Mandalore'],
    region: 'Outer Rim'
  },
  {
    name: 'Lothal',
    x: 630,
    y: 550,
    adjacent: ['Mandalore', 'Geonosis'],
    region: 'Outer Rim'
  },
  {
    name: 'Ryloth',
    x: 660,
    y: 580,
    adjacent: ['Kessel', 'Tatooine'],
    region: 'Outer Rim'
  },
  {
    name: 'Geonosis',
    x: 690,
    y: 500,
    adjacent: ['Kessel', 'Lothal'],
    region: 'Outer Rim'
  },
  {
    name: 'Mandalore',
    x: 750,
    y: 450,
    adjacent: ['Tatooine', 'Lothal'],
    region: 'Outer Rim'
  },
  {
    name: 'Kessel',
    x: 780,
    y: 470,
    adjacent: ['Geonosis', 'Ryloth'],
    region: 'Outer Rim'
  }
];

module.exports = planets;