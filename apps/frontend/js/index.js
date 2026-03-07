const grid = document.getElementById("contributorsGrid")

fetch("../assets/data/contributors.json")
  .then(res => res.json())
  .then(contributors => {
    contributors.forEach(person => {
      const card = document.createElement("div")
      card.classList.add("contributor-card")
      card.innerHTML = `
        <img src="${person.image}" alt="${person.name}">
        <h3>${person.name}</h3>
        <p>${person.role}</p>
      `
      card.addEventListener("click", () => openModal(person))
      grid.appendChild(card)
    })
  })

const modal = document.getElementById("modal")
function openModal(person){
  document.getElementById("modalImage").src = person.image
  document.getElementById("modalName").textContent = person.name
  document.getElementById("modalRole").textContent = person.role
  document.getElementById("modalBio").textContent = person.bio
  document.getElementById("modalGithub").href = person.github
  document.getElementById("modalLinkedin").href = person.linkedin
  modal.style.display = "flex"
}

document.querySelector(".close").onclick = () => {
  modal.style.display = "none"
}

window.onclick = e => {
  if(e.target === modal){
    modal.style.display = "none"
  }
}
