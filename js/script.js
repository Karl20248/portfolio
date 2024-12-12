const skills = {
  data: [],
  sortMode: null,

  async getData() {
    try {
      const response = await fetch('db/skills.json');
      const data = await response.json();
      this.data = data.data;
      this.generateList(skillList);
    } catch (error) {
      console.error('что-то пошло не так', error);
    }
  },

  generateList(parentElement) {
    parentElement.innerHTML = '';
    this.data.forEach(skill => {
      const skillItem = document.createElement('dt');
      skillItem.classList.add('skill-item');
      skillItem.style.backgroundImage = `url("./img/skill-${skill.name}.svg")`;
      skillItem.textContent = skill.name;

      const skillLevel = document.createElement('dd');
      skillLevel.classList.add('skill-level');

      const skillBar = document.createElement('div');
      skillBar.style.width = `${skill.level}%`;
      skillBar.textContent = `${skill.level}%`;

      skillLevel.append(skillBar);
      parentElement.append(skillItem, skillLevel);
    });
  },

  sortList(type) {
    if (this.sortMode !== type) {
      this.data.sort(this.getComparer(type));
      console.log(`Отсортировали данные по ${type}`);
    } else {
      this.data.reverse();
      console.log(`Инвертировали порядок сортировки`);
    }

    this.sortMode = type;
    this.generateList(skillList);
  },

  getComparer(prop) {
    return function(a, b) {
      if (a[prop] < b[prop]) {
        return -1;
      }
      if (a[prop] > b[prop]) {
        return 1;
      }
      return 0;
    };
  }
};

const skillList = document.querySelector('dl.skill-list');
const sortBtnsBlock = document.querySelector('.skills-button');

const menu = {
  nav: null,
  btn: null,

  init(navSelector, btnSelector) {
    this.nav = document.querySelector(navSelector);
    this.btn = document.querySelector(btnSelector);
    this.close();
    this.btn.addEventListener('click', this.toggle.bind(this));
  },

  open() {
    this.nav.classList.remove('main-nav_closed');
    this.btn.classList.remove('button_open-nav');
    this.btn.classList.add('button_close-nav');
    this.btn.innerHTML = '<span class="visually-hidden"> Закрыть меню</span>';
  },

  close() {
    this.nav.classList.add('main-nav_closed');
    this.btn.classList.remove('button_close-nav');
    this.btn.classList.add('button_open-nav');
    this.btn.innerHTML = '<span class="visually-hidden"> Открыть меню</span>';
  },

  toggle() {
    if (this.nav.classList.contains('main-nav_closed')) {
      this.open();
    } else {
      this.close();
    }
  }
};

const themeSwitcher = document.querySelector('input[type="checkbox"]');
const body = document.body;

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  return localStorage.getItem('theme');
}

themeSwitcher.addEventListener('change', function() {
  if (this.checked) {
    body.classList.remove('dark-theme');
    saveTheme('light');
  } else {
    body.classList.add('dark-theme');
    saveTheme('dark');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  skills.getData();
  const savedTheme = loadTheme();
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitcher.checked = false;
  } else {
    body.classList.remove('dark-theme');
    themeSwitcher.checked = true;
  }
});

menu.init('.main-nav', '.button-nav');
sortBtnsBlock.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    skills.sortList(event.target.dataset.type);
  }
}