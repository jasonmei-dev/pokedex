export const pokemonTypeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const validDashedNames = [
  'f',
  'm',
  'mime',
  'oh',
  'jr',
  'z',
  'null',
  'o',
  'koko',
  'lele',
  'bulu',
  'fini',
  'rime',
  'tusk',
  'tail',
  'bonnet',
  'mane',
  'wing',
  'shocks',
  'treads',
  'bundle',
  'hands',
  'jugulis',
  'moth',
  'thorns',
  'chien',
  'pao',
  'lu',
  'yu',
  'moon',
  'valiant',
  'wake',
  'leaves',
  'fire',
  'bolt',
  'boulder',
  'crown',
];

export const checkName = (name) => {
  if (name.includes('-')) {
    const nameArray = name.split('-');

    if (validDashedNames.includes(nameArray[1])) {
      return name;
    } else {
      return nameArray[0];
    }
  }
  return name;
};

export const parseEnglishText = (dataArray) => {
  if (dataArray.length !== 0) {
    return dataArray.find((dataElement) => dataElement.language.name === 'en');
  }
  return null;
};

export const parseEnglishAbility = (dataArray) => {
  if (dataArray.length !== 0) {
    return dataArray.find(
      (dataElement) =>
        dataElement.language.name === 'en' &&
        (dataElement.version_group.name === 'the-teal-mask' ||
          dataElement.version_group.name === 'the-indigo-disk' ||
          dataElement.version_group.name === 'scarlet-violet' ||
          dataElement.version_group.name === 'sword-shield' ||
          dataElement.version_group.name === 'sun-moon')
    );
  }
  return null;
};
