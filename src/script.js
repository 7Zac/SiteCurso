document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const loginModal = document.getElementById("login-modal");
  const closeButtons = document.querySelectorAll(".close");

  // Abrir modal de login
  loginButton.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });

  // Fechar modal
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  });

  // Fechar modal ao clicar fora
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
  });

  // Login
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Login realizado com sucesso!");
        loginModal.style.display = "none";

        // Limpar os campos de login após o sucesso
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
      } else {
        const data = await response.json();
        alert(data.error || "Erro ao realizar login.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao realizar login.");
    }
  });

  // Cadastro
  const registerButton = document.getElementById("register-button");
  const registerModal = document.getElementById("register-modal");
  const registerForm = document.getElementById("register-form");

  // Abrir modal de cadastro
  registerButton?.addEventListener("click", () => {
    registerModal.style.display = "flex";
  });

  // Fechar modal ao clicar fora
  window.addEventListener("click", (e) => {
    if (e.target === registerModal) registerModal.style.display = "none";
  });

  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        registerModal.style.display = "none";

        // Limpar os campos de cadastro após o sucesso
        document.getElementById("register-username").value = '';
        document.getElementById("register-password").value = '';
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error || "Erro ao realizar cadastro."}`);
      } else {
        alert("Erro ao cadastrar. Tente novamente!");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao realizar cadastro. Verifique sua conexão.");
    }
  });

  // Filtro de cursos
  const searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("input", function () {
    const filterValue = searchBar.value.toLowerCase();
    const courseCards = document.querySelectorAll(".course-card");

    courseCards.forEach(function (card) {
      const courseName = card.getAttribute("data-name").toLowerCase();
      if (courseName.includes(filterValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});