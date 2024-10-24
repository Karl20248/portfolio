const skills = {
  data: [
    { name: 'html', level: 80 },
    { name: 'css', level: 80 },
    { name: 'python', level: 60 },
    { name: 'c++', level: 70 }
  ],

  sortByNameAsc: false,
  sortByLevelAsc: false,
  sortMode: null,

  generateList(parentElement) {
    parentElement.innerHTML = '';
    this.data.forEach(skill => {
      const skillItem = document.createElement('dt');
      skillItem.classList.add('skill-item');
      skillItem.style.backgroundImage = `url("../portfolio/img/skill-${skill.name}.svg")`;
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
    const comparers = {
      name: (a, b) => a.name.localeCompare(b.name),
      level: (a, b) => b.level - a.level
    };
  
    const comparer = comparers[type];
    this.data.sort(this.getComparer(comparer));
    this[`sortBy${type.charAt(0).toUpperCase() + type.slice(1)}Asc`] = !this[`sortBy${type.charAt(0).toUpperCase() + type.slice(1)}Asc`];
  
    if (!this[`sortBy${type.charAt(0).toUpperCase() + type.slice(1)}Asc`]) {
      this.data.reverse();
      console.log('Инвертировали порядок сортировки');
    } else {
      console.log(`Отсортировали данные по ${type}`);
    }
  
    this.sortMode = type;
  },
  
  getComparer(compareFunc) {
    return (a, b) => compareFunc(a, b);
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

menu.init('.main-nav', '.button-nav');
sortBtnsBlock.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    switch (event.target.dataset.type) {
      case 'name':
        skills.sortList('name');
        skills.generateList(skillList);
        break;
      case 'level':
        skills.sortList('level');
        skills.generateList(skillList);
        break;
      default:
        console.log('Неизвестная ошибка');
    }
  }
}

skills.generateList(skillList);