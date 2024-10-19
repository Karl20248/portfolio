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
    if (this.sortMode === null || this.sortMode !== type) {
      console.log(`отсортировали данные по ${type}`);
    } else {
      console.log('инвертировали порядок сортировки');
    }

    if (type === 'name') {
      this.data.sort(this.getComparer((a, b) => a.name < b.name ? -1 : 1));
      this.sortByNameAsc = !this.sortByNameAsc;
      if (!this.sortByNameAsc) {
        this.data.reverse();
      }
    } else if (type === 'level') {
      this.data.sort(this.getComparer((a, b) => a.level < b.level ? 1 : -1));
      this.sortByLevelAsc = !this.sortByLevelAsc;
      if (!this.sortByLevelAsc) {
        this.data.reverse();
      }
    }

    this.sortMode = type;
    skillList.innerHTML = '';
    this.generateList(skillList);
  },

  getComparer(compareFunc) {
    return (a, b) => compareFunc(a, b);
  }
};

const skillList = document.querySelector('dl.skill-list');
const sortBtnsBlock = document.querySelector('.skills-button');
const buttonCloseNav = document.querySelector('.button-nav.button_close-nav');
const mainNav = document.querySelector('.main-nav');

mainNav.classList.add('main-nav_closed');

const menu = {
  mainNav: document.querySelector('.main-nav'),
  buttonCloseNav: document.querySelector('.button-nav.button_close-nav'),

  open() {
    menu.mainNav.classList.remove('main-nav_closed');
    menu.buttonCloseNav.classList.remove('button_open-nav');
    menu.buttonCloseNav.classList.add('button_close-nav');
    menu.buttonCloseNav.innerHTML = '<span class="visually-hidden"> Закрыть меню</span>';
  },

  close() {
    menu.mainNav.classList.add('main-nav_closed');
    menu.buttonCloseNav.classList.remove('button_close-nav');
    menu.buttonCloseNav.classList.add('button_open-nav');
    menu.buttonCloseNav.innerHTML = '<span class="visually-hidden"> Открыть меню</span>';
  },

  toggle() {
    if (menu.mainNav.classList.contains('main-nav_closed')) {
      menu.open();
    } else {
      menu.close();
    }
  }
};

menu.close();
menu.buttonCloseNav.addEventListener('click', () => {
  menu.toggle();
});

sortBtnsBlock.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    switch (event.target.dataset.type) {
      case 'name':
        skills.sortList('name');
        break;
      case 'level':
        skills.sortList('level');
        break;
      default:
        console.log('Неизвестная ошибка');
    }
  }
}

skills.generateList(skillList);