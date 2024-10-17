const skills = {
  data: [
    { name: 'html', level: 80 },
    { name: 'css', level: 80 },
    { name: 'python', level: 60 },
    { name: 'c++', level: 70 }
  ],

  generateList(parentElement) {
    this.data.forEach(skill => {
      const skillItem = document.createElement('dt');
      skillItem.classList.add('skill-item');

      switch (skill.name) {
        case 'html':
          skillItem.style.backgroundImage = 'url("../portfolio/img/skill-html.svg")';
          break;
        case 'css':
          skillItem.style.backgroundImage = 'url("../portfolio/img/skill-css.svg")';
          break;
        case 'python':
          skillItem.style.backgroundImage = 'url("../portfolio/img/skill-python.svg")';
          break;
        case 'c++':
          skillItem.style.backgroundImage = 'url("../portfolio/img/skill-c++.svg")';
          break;
      }

      skillItem.textContent = skill.name;

      const skillLevel = document.createElement('dd');
      skillLevel.classList.add('skill-level');

      const skillBar = document.createElement('div');
      skillBar.style.width = `${skill.level}%`;
      skillBar.textContent = `${skill.level}%`;

      skillLevel.append(skillBar);
      parentElement.append(skillItem, skillLevel);
    });
  }
};

const skillList = document.querySelector('dl.skill-list');
skills.generateList(skillList);