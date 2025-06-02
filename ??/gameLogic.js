// backend/utils/gameLogic.js
const planetsData = require('../game/planets');
const officersData = require('../game/officers');
const { CARDS_TO_NEUTRALIZE_REBELLION, MAX_ACTIONS_PER_TURN } = require('../game/gameConstants');

// --- Helper Functions ---

function getPlayer(gameState, playerId) {
  const player = gameState.players.find(p => p.id === playerId);
  if (!player) {
    throw new Error(`Jogador ${playerId} não encontrado.`);
  }
  return player;
}

function getPlanet(gameState, planetName) {
  const planet = gameState.planets[planetName];
  if (!planet) {
    throw new Error(`Planeta ${planetName} não encontrado.`);
  }
  return planet;
}

function getOfficerRole(officerId) {
    const officer = officersData.find(o => o.id === officerId);
    if (!officer) {
        console.warn(`Papel de oficial ${officerId} não encontrado nos dados.`);
        return null; // Ou lançar erro se preferir
    }
    return officer;
}

function spendAction(player, gameState) {
  if (player.actionsRemaining <= 0) {
    throw new Error('Nenhuma ação restante neste turno.');
  }
  player.actionsRemaining -= 1;
  // TODO: Adicionar log da ação gasta
}

function discardPlayerCard(player, cardName, gameState) {
  const cardIndex = player.hand.indexOf(cardName);
  if (cardIndex === -1) {
    throw new Error(`Jogador ${player.name} não possui a carta ${cardName}.`);
  }
  const discardedCard = player.hand.splice(cardIndex, 1)[0];
  gameState.decks.fleetCards.discardPile.push(discardedCard);
  // TODO: Adicionar log do descarte
}

// --- Movement Actions (6.1) ---

/**
 * 6.1.1 Deslocamento Adjacente
 * Mover para um planeta diretamente conectado ao planeta atual.
 */
function moveAdjacent(gameState, playerId, targetPlanetName) {
  const player = getPlayer(gameState, playerId);
  const currentPlanet = getPlanet(gameState, player.location);
  const targetPlanet = getPlanet(gameState, targetPlanetName);

  if (!currentPlanet.connections.includes(targetPlanetName)) {
    throw new Error(`Movimento inválido: ${targetPlanetName} não é adjacente a ${player.location}.`);
  }

  spendAction(player, gameState);
  player.location = targetPlanetName;
  console.log(`${player.name} moveu-se para ${targetPlanetName} (Adjacente).`);
  // TODO: Adicionar log formal
  return gameState;
}

/**
 * 6.1.2 Hipersalto por Carta
 * Descartar uma carta de planeta para ir até esse planeta.
 */
function moveHyperspaceCard(gameState, playerId, planetCardName) {
  const player = getPlayer(gameState, playerId);
  getPlanet(gameState, planetCardName); // Verifica se o planeta existe

  if (!player.hand.includes(planetCardName)) {
      throw new Error(`Jogador ${player.name} não possui a carta ${planetCardName} para o Hipersalto.`);
  }

  spendAction(player, gameState);
  discardPlayerCard(player, planetCardName, gameState);
  player.location = planetCardName;
  console.log(`${player.name} usou Hipersalto por Carta para ${planetCardName}.`);
  // TODO: Adicionar log formal
  return gameState;
}

/**
 * 6.1.3 Transporte por Base Imperial
 * Mover-se de uma Base Imperial para outra, gratuitamente (sem gastar ação).
 */
function moveImperialBaseTransport(gameState, playerId, targetPlanetName) {
  const player = getPlayer(gameState, playerId);
  const currentPlanet = getPlanet(gameState, player.location);
  const targetPlanet = getPlanet(gameState, targetPlanetName);

  if (!currentPlanet.hasImperialBase) {
    throw new Error(`Transporte inválido: Não há Base Imperial em ${player.location}.`);
  }
  if (!targetPlanet.hasImperialBase) {
    throw new Error(`Transporte inválido: Não há Base Imperial em ${targetPlanetName}.`);
  }
  if (player.location === targetPlanetName) {
      throw new Error(`Transporte inválido: Já está em ${targetPlanetName}.`);
  }

  // Esta ação é gratuita, não chama spendAction()
  player.location = targetPlanetName;
  console.log(`${player.name} usou Transporte por Base Imperial para ${targetPlanetName}.`);
  // TODO: Adicionar log formal
  return gameState;
}

/**
 * 6.1.4 Transporte por Frota (Desembarque)
 * Descartar a carta do planeta atual para se mover para qualquer planeta.
 */
function moveFleetTransport(gameState, playerId, targetPlanetName) {
  const player = getPlayer(gameState, playerId);
  const currentPlanetName = player.location;
  getPlanet(gameState, targetPlanetName); // Verifica se o planeta de destino existe

  if (!player.hand.includes(currentPlanetName)) {
    throw new Error(`Jogador ${player.name} não possui a carta ${currentPlanetName} para o Transporte por Frota.`);
  }

  spendAction(player, gameState);
  discardPlayerCard(player, currentPlanetName, gameState);
  player.location = targetPlanetName;
  console.log(`${player.name} usou Transporte por Frota para ${targetPlanetName}.`);
  // TODO: Adicionar log formal
  return gameState;
}

// --- Other Actions (6.2) ---

/**
 * 6.2.1 Eliminar Rebeldes
 * Remover 1 cubo de rebelião do planeta onde o oficial está.
 * (Alguns papéis permitem remover mais por ação.)
 */
function eliminateRebels(gameState, playerId, regionColor) {
  const player = getPlayer(gameState, playerId);
  const currentPlanet = getPlanet(gameState, player.location);
  const officerRole = getOfficerRole(player.role); // Assume que player.role é o ID do oficial

  if (!currentPlanet.rebellionCubes[regionColor] || currentPlanet.rebellionCubes[regionColor] <= 0) {
    throw new Error(`Não há cubos de rebelião da região ${regionColor} em ${player.location}.`);
  }

  let cubesToRemove = 1;
  // Habilidade especial: Darth Vader (remove 2 cubos)
  if (officerRole && officerRole.id === 'vader') {
    cubesToRemove = 2;
  }

  // Habilidade especial: Inquisidor Imperial (Impede colocação - não relevante aqui, mas sim na fase de infecção)

  spendAction(player, gameState);

  const actualRemoved = Math.min(cubesToRemove, currentPlanet.rebellionCubes[regionColor]);
  currentPlanet.rebellionCubes[regionColor] -= actualRemoved;
  gameState.rebellionCubeSupply[regionColor] += actualRemoved; // Devolve ao suprimento

  console.log(`${player.name} eliminou ${actualRemoved} cubo(s) de rebelião ${regionColor} em ${player.location}.`);
  // TODO: Adicionar log formal
  return gameState;
}

/**
 * 6.2.2 Construir Base Imperial
 * Descartar a carta do planeta atual para construir uma base nesse local.
 * (Alguns papéis constroem sem descartar.)
 */
function buildImperialBase(gameState, playerId) {
  const player = getPlayer(gameState, playerId);
  const currentPlanet = getPlanet(gameState, player.location);
  const officerRole = getOfficerRole(player.role);

  if (currentPlanet.hasImperialBase) {
    throw new Error(`Já existe uma Base Imperial em ${player.location}.`);
  }
  if (gameState.imperialBaseSupply <= 0) {
      throw new Error(`Não há mais Bases Imperiais disponíveis para construir.`);
  }

  // Habilidade especial: Engenheiro Imperial (constrói sem descartar)
  const canBuildWithoutDiscard = officerRole && officerRole.id === 'engineer';

  if (!canBuildWithoutDiscard) {
    if (!player.hand.includes(player.location)) {
      throw new Error(`Jogador ${player.name} não possui a carta ${player.location} para construir a Base.`);
    }
    discardPlayerCard(player, player.location, gameState);
  }

  spendAction(player, gameState);
  currentPlanet.hasImperialBase = true;
  gameState.imperialBaseSupply -= 1;

  console.log(`${player.name} construiu uma Base Imperial em ${player.location}${canBuildWithoutDiscard ? ' (sem descartar carta)' : ''}.`);
  // TODO: Adicionar log formal
  return gameState;
}

/**
 * 6.2.3 Trocar Informações
 * Compartilhar cartas com outro jogador se ambos estiverem no mesmo planeta
 * e a carta sendo trocada corresponder a esse planeta.
 * (Papéis especiais podem ignorar restrições.)
 */
function shareKnowledge(gameState, givingPlayerId, receivingPlayerId, cardName) {
  const givingPlayer = getPlayer(gameState, givingPlayerId);
  const receivingPlayer = getPlayer(gameState, receivingPlayerId);
  const officerRole = getOfficerRole(givingPlayer.role);

  if (givingPlayer.location !== receivingPlayer.location) {
    throw new Error('Jogadores precisam estar no mesmo planeta para trocar cartas.');
  }

  const currentPlanetName = givingPlayer.location;

  // Habilidade especial: Informante Sith (pode compartilhar qualquer carta)
  const canShareAnyCard = officerRole && officerRole.id === 'informant';

  if (!canShareAnyCard && cardName !== currentPlanetName) {
    throw new Error(`A carta trocada (${cardName}) deve corresponder ao planeta atual (${currentPlanetName}), a menos que seja o Informante Sith.`);
  }

  if (!givingPlayer.hand.includes(cardName)) {
    throw new Error(`Jogador ${givingPlayer.name} não possui a carta ${cardName}.`);
  }

  // TODO: Verificar limite de cartas na mão do receptor?

  spendAction(givingPlayer, gameState); // A ação é gasta por quem dá a carta

  // Remove a carta do doador
  const cardIndex = givingPlayer.hand.indexOf(cardName);
  givingPlayer.hand.splice(cardIndex, 1);

  // Adiciona a carta ao receptor
  receivingPlayer.hand.push(cardName);

  console.log(`${givingPlayer.name} compartilhou a carta ${cardName} com ${receivingPlayer.name} em ${currentPlanetName}.`);
  // TODO: Adicionar log formal
  return gameState;
}

/**
 * 6.2.4 Neutralizar Rebelião
 * Descartar 5 cartas da mesma região em uma Base Imperial para neutralizar a rebelião daquela cor.
 * (Alguns papéis precisam de apenas 4 cartas.)
 */
function neutralizeRebellion(gameState, playerId, regionColor, cardsToDiscard) {
  const player = getPlayer(gameState, playerId);
  const currentPlanet = getPlanet(gameState, player.location);
  const officerRole = getOfficerRole(player.role);

  if (!currentPlanet.hasImperialBase) {
    throw new Error(`É necessário estar em uma Base Imperial para neutralizar uma rebelião.`);
  }

  if (gameState.gameStatus.rebellionStatus[regionColor] === 'neutralized') {
      throw new Error(`A rebelião da região ${regionColor} já foi neutralizada.`);
  }

  // Habilidade especial: Comandante da Frota (precisa de 4 cartas)
  const cardsNeeded = (officerRole && officerRole.id === 'commander') ? 4 : CARDS_TO_NEUTRALIZE_REBELLION;

  if (cardsToDiscard.length !== cardsNeeded) {
    throw new Error(`São necessárias ${cardsNeeded} cartas para neutralizar a rebelião (fornecidas: ${cardsToDiscard.length}).`);
  }

  // Verifica se o jogador possui as cartas e se são da região correta
  const regionPlanets = planetsData.filter(p => p.region === regionColor).map(p => p.name);
  for (const card of cardsToDiscard) {
    if (!player.hand.includes(card)) {
      throw new Error(`Jogador ${player.name} não possui a carta ${card}.`);
    }
    // Verifica se a carta pertence à região alvo. Assume que gameState.planets tem a info da região.
    const cardPlanet = getPlanet(gameState, card);
    if (cardPlanet.region !== regionColor) {
        throw new Error(`A carta ${card} não pertence à região ${regionColor}.`);
    }
  }

  spendAction(player, gameState);

  // Descarta as cartas
  for (const card of cardsToDiscard) {
    discardPlayerCard(player, card, gameState);
  }

  // Neutraliza a rebelião
  gameState.gameStatus.rebellionStatus[regionColor] = 'neutralized';
  console.log(`${player.name} neutralizou a rebelião da região ${regionColor}!`);
  // TODO: Adicionar log formal
  // TODO: Verificar condição de vitória

  return gameState;
}


// --- Placeholder para outras lógicas (Eventos, Fim de Turno, etc.) ---

// TODO: Implementar lógica de fim de turno (comprar cartas de frota, comprar cartas de infecção)
// TODO: Implementar lógica de Levante Rebelde (Epidemia)
// TODO: Implementar lógica de Revolta Planetária (Surto)
// TODO: Implementar lógica de verificação de vitória/derrota
// TODO: Implementar lógica de Cartas de Evento Imperial

module.exports = {
  // Helpers
  getPlayer,
  getPlanet,
  spendAction,
  discardPlayerCard,
  // Movement Actions
  moveAdjacent,
  moveHyperspaceCard,
  moveImperialBaseTransport,
  moveFleetTransport,
  // Other Actions
  eliminateRebels,
  buildImperialBase,
  shareKnowledge,
  neutralizeRebellion,
  // ... outras funções exportadas conforme necessário
};
