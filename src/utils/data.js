const usernames = [
    'BluChez',
    'CluelessMule',
    'CampMeister',
    'DizzyIzzy',
    'DonutWarrior',
    'FranticFran',
    'GopherGolfer',
    'HairyHarry',
    'IttyBitty',
    'JumboFry'
];

const thoughts = [
    `I wonder how snails eat..`,
    `OMG! Has anyone else seen the newest Star Wars??`,
    `Does anyone know where to buy pigs? Asking for a friend..`,
    `Can someone send me food recommendations? I'm so tired of hot pockets every night.`,
    `Anyone hosting a DnD group? I'm looking to join one.`,
    `I wonder what life would be like on another planet.`,
    `Do you think stars are so tiny cause they're shy?`,
    `I don't get why we can't pet bears. They're just so cuddly looking.`,
    `How many holes does a straw have??`,
    `I don't care what anyone else says. Waffles are the supreme breakfast item!`
];

const reactions = [
    `LOL`,
    `It depends on who's asking`,
    `CLICK HERE FOR A REWARD1!`,
    `Um, okay??`,
    `Dude, same!`,
    `You could've just googled it..`,
    `Why??`
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomUsername = () => `${getRandomItem(usernames)}`;

const getRandomThought = (number) => {
    let results = [];
    for (let i = 0; i < number; i++) {
        results.push({
            thoughtText: getRandomItem(thoughts),
            username: usernames[i],
            reactions: [...getRandomReactions(3)]
        });
    }
    return results;
};

const getRandomReactions = (number) => {
    let results = [];
    for (let i = 0; i < number; i++) {
        results.push({
            reactionBody: getRandomItem(reactions),
            username: getRandomUsername()
        });
    }
    return results;
};

export { usernames, getRandomUsername, getRandomThought };