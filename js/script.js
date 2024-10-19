const skills = {
  data: [
    { name: 'html', level: 80 },
    { name: 'css', level: 80 },
    { name: 'python', level: 60 },
    { name: 'c++', level: 70 }
  ],

  // Добавляем флаги для направления сортировки
  sortByNameAsc: false,
  sortByLevelAsc: false,
  sortMode: null, // Добавляем новое свойство sortMode

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
    // Проверяем значение sortMode
    if (this.sortMode === null || this.sortMode !== type) {
      console.log(`отсортировали данные по ${type}`);
    } else {
      console.log('инвертировали порядок сортировки');
    }

    if (type === 'name') {
      this.data.sort(this.compareByName);
      // Меняем направление сортировки при повторном нажатии на кнопку
      this.sortByNameAsc = !this.sortByNameAsc;
      if (!this.sortByNameAsc) {
        this.data.reverse();
      }
    } else if (type === 'level') {
      this.data.sort(this.compareByLevel);
      // Меняем направление сортировки при повторном нажатии на кнопку
      this.sortByLevelAsc = !this.sortByLevelAsc;
      if (!this.sortByLevelAsc) {
        this.data.reverse();
      }
    }

    // Устанавливаем значение sortMode равным типу сортировки
    this.sortMode = type;

    skillList.innerHTML = '';
    this.generateList(skillList);
  },

  compareByName(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  },

  compareByLevel(a, b) {
    if (a.level < b.level) return 1;
    if (a.level > b.level) return -1;
    return 0;
  }
};

const skillList = document.querySelector('dl.skill-list');
const sortBtnsBlock = document.querySelector('.skills-button');
const buttonCloseNav = document.querySelector('.button-nav.button_close-nav');
const mainNav = document.querySelector('.main-nav');

mainNav.classList.add('main-nav_closed'); // Добавляем класс для скрытия меню

mainNav.addEventListener('click', () => {
  console.log(mainNav);
});
buttonCloseNav.addEventListener('click', () => {
  console.log(buttonCloseNav);
});

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

// Вызов закрытия меню при загрузке скрипта
menu.close();

// Добавление обработчика события на кнопку
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