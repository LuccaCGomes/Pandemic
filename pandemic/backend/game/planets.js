const planets = [
  // Deep Core
  {
    name: 'Coruscant',
    x: 500,
    y: 300,
    adjacent: ['Onderon', 'Corellia', 'Alderaan', 'Hosnian'],
    region: 'Deep Core',
    threatLevel: 0
  },
  {
    name: 'Corellia',
    x: 460,
    y: 270,
    adjacent: ['Coruscant', 'Chandrila', 'Hosnian'],
    region: 'Deep Core',
    threatLevel: 1
  },
  {
    name: 'Kuat',
    x: 480,
    y: 250,
    adjacent: ['Alderaan', 'Chandrila'],
    region: 'Deep Core',
    threatLevel: 2
  },
  {
    name: 'Chandrila',
    x: 520,
    y: 280,
    adjacent: ['Kuat', 'Corellia'],
    region: 'Deep Core',
    threatLevel: 1
  },
  {
    name: 'Hosnian',
    x: 540,
    y: 260,
    adjacent: ['Corellia', 'Coruscant'],
    region: 'Deep Core',
    threatLevel: 0
  },
  {
    name: 'Alderaan',
    x: 500,
    y: 220,
    adjacent: ['Coruscant', 'Kuat'],
    region: 'Deep Core',
    threatLevel: 3
  },

  // Anel Interior
  {
    name: 'Onderon',
    x: 580,
    y: 320,
    adjacent: ['Dorin', 'Coruscant', 'Mimban'],
    region: 'Inner Rim',
    threatLevel: 2
  },
  {
    name: 'Numidian',
    x: 610,
    y: 340,
    adjacent: ['Mimban', 'Cato Neimoidia'],
    region: 'Inner Rim',
    threatLevel: 1
  },
  {
    name: 'Dorin',
    x: 640,
    y: 320,
    adjacent: ['Onderon', 'Vandor'],
    region: 'Inner Rim',
    threatLevel: 2
  },
  {
    name: 'Cato Neimoidia',
    x: 670,
    y: 300,
    adjacent: ['Vandor', 'Numidian'],
    region: 'Inner Rim',
    threatLevel: 1
  },
  {
    name: 'Mimban',
    x: 690,
    y: 330,
    adjacent: ['Onderon', 'Numidian'],
    region: 'Inner Rim',
    threatLevel: 3
  },
  {
    name: 'Vandor',
    x: 720,
    y: 350,
    adjacent: ['Cato Neimoidia', 'Dorin'],
    region: 'Inner Rim',
    threatLevel: 2
  },

  // Anel Médio
  {
    name: 'Naboo',
    x: 550,
    y: 370,
    adjacent: ['Toydaria', 'Malastare', 'Ryloth'],
    region: 'Mid Rim',
    threatLevel: 2
  },
  {
    name: 'Kashyyyk',
    x: 580,
    y: 400,
    adjacent: ['Bothawui', 'Toydaria'],
    region: 'Mid Rim',
    threatLevel: 3
  },
  {
    name: 'Malastare',
    x: 610,
    y: 420,
    adjacent: ['Naboo', 'Jedha'],
    region: 'Mid Rim',
    threatLevel: 2
  },
  {
    name: 'Bothawui',
    x: 740,
    y: 370,
    adjacent: ['Jedha', 'Kashyyyk'],
    region: 'Mid Rim',
    threatLevel: 3
  },
  {
    name: 'Toydaria',
    x: 670,
    y: 440,
    adjacent: ['Naboo', 'Kashyyyk'],
    region: 'Mid Rim',
    threatLevel: 1
  },
  {
    name: 'Jedha',
    x: 650,
    y: 480,
    adjacent: ['Bothawui', 'Malastare'],
    region: 'Mid Rim',
    threatLevel: 4
  },

  // Anel Exterior
  {
    name: 'Tatooine',
    x: 600,
    y: 520,
    adjacent: ['Ryloth', 'Mandalore'],
    region: 'Outer Rim',
    threatLevel: 3
  },
  {
    name: 'Lothal',
    x: 630,
    y: 550,
    adjacent: ['Mandalore', 'Geonosis'],
    region: 'Outer Rim',
    threatLevel: 4
  },
  {
    name: 'Ryloth',
    x: 660,
    y: 580,
    adjacent: ['Kessel', 'Tatooine'],
    region: 'Outer Rim',
    threatLevel: 3
  },
  {
    name: 'Geonosis',
    x: 690,
    y: 500,
    adjacent: ['Kessel', 'Lothal'],
    region: 'Outer Rim',
    threatLevel: 4
  },
  {
    name: 'Mandalore',
    x: 750,
    y: 450,
    adjacent: ['Tatooine', 'Lothal'],
    region: 'Outer Rim',
    threatLevel: 5
  },
  {
    name: 'Kessel',
    x: 780,
    y: 470,
    adjacent: ['Geonosis', 'Ryloth'],
    region: 'Outer Rim',
    threatLevel: 5
  }
];

module.exports = planets;