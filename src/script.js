document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const loginModal = document.getElementById("login-modal");
    const closeModal = document.querySelector(".close");
    const searchBar = document.getElementById("search-bar");
    const courseCards = document.querySelectorAll(".course-card");
  
    // Abrir modal de login
    loginButton.addEventListener("click", () => {
      loginModal.style.display = "flex";
    });
  
    // Fechar modal de login
    closeModal.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  
    // Fechar modal ao clicar fora
    window.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none";
      }
    });
  
    // Filtragem de cursos
    searchBar.addEventListener("input", (e) => {
      const filter = e.target.value.toLowerCase();
      courseCards.forEach((card) => {
        const courseName = card.getAttribute("data-name").toLowerCase();
        if (courseName.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  