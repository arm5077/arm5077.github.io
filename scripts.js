const projects = document.querySelectorAll('.random-project');
const index = Math.floor(Math.random() * projects.length);

projects.forEach((project, i) => {
  if (i !== index) {
    project.remove();
  } else {
    project.classList.add('visible')
  }
})