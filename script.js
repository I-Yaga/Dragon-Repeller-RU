let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["палка"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'палка', power: 5 },
  { name: ' кинжал', power: 30 },
  { name: ' гвоздодёр', power: 50 },
  { name: ' меч', power: 100 }
];
const monsters = [
  {
    name: "Слизняк",
    level: 2,
    health: 15
  },
  {
    name: "Клыкастый зверь",
    level: 8,
    health: 60
  },
  {
    name: "Дракон",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Пойти в магазин", "Пойти в пещеру", "Драться с драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на городской площади. Вы видите табличку с надписью \"Магазин\"."
  },
  {
    name: "store",
    "button text": ["Купить 10 здоровья (10 монет)", "Купить оружие (30 монет)", "Вернуться на площадь"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Вы вошли в магазин."
  },
  {
    name: "cave",
    "button text": ["Драться со слизняком", "Драться с клыкастым зверем", "Вернуться на площадь"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Вы вошли в пещеру. Вы видите здесь монстров."
  },
  {
    name: "fight",
    "button text": ["Атаковать", "Увернуться", "Убежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы дерётесь с монстром."
  },
  {
    name: "kill monster",
    "button text": ["Вернуться на площадь", "Вернуться на площадь", "Вернуться на площадь"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Вы убили монстра. Вы получаете опыт и находите монеты.'
  },
  {
    name: "lose",
    "button text": ["ЗАНОВО?", "ЗАНОВО?", "ЗАНОВО?"],
    "button functions": [restart, restart, restart],
    text: "Вы погибли. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["ЗАНОВО?", "ЗАНОВО?", "ЗАНОВО?"], 
    "button functions": [restart, restart, restart], 
    text: "Вы убили дракона! ВЫ ПОБЕДИЛИ! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Вернуться на площадь?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Вы нашли секретную игру. Выберите число выше. Десять чисел от 0 до 10 будут выбраны случайным образом. Если выбранное вами число совпадет с одним из случайных чисел, вы выиграете!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У вас недостаточно монет чтобы купить здоровье.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Вы купили " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В вашем инвенторе есть: " + inventory;
    } else {
      text.innerText = "У вас недостаточно монет чтобы купить оружие.";
    }
  } else {
    text.innerText = "У вас уже есть самое мощное оружие!";
    button2.innerText = "Продать ненужное оружие за 15 монет";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    if (currentWeapon === "палка") {
      text.innerText = "Вы продали палку."
    } else {
      text.innerText = "Вы продали " + currentWeapon + ".";
    }
    text.innerText += " В вашем инвенторе есть: " + inventory;
  } else {
    text.innerText = "Нельзя продать единственное оружие!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + " атакует.";

  if (weapons[currentWeapon].name === "палка") {
    text.innerText += " Вы атакуете его палкой."
  } else {
    text.innerText += " Вы атакуете его " + weapons[currentWeapon].name + "ом.";
  }

  health -= getMonsterAttackValue(monsters[fighting].level);

  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Вы промахиваетесь.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    healthText.innerText = "---"
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Ваш " + inventory.pop() + " сломался.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Вы увернулись от атаки.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["палка"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Вы выбрали " + guess + ". Случайные числа:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Вы угадали! Вы получили 20 монет!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Вы не угадали! Вы потеряли 10 здоровья!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      healthText.innerText = "---"
      lose();
    }
  }
}