const API = "https://api.github.com";

const owner =
  process.env.GITHUB_OWNER || "illogons";

const token =
  process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error("Falta GITHUB_TOKEN");
}

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28",
};


/* =========================================================
   GITHUB API
   ========================================================= */

async function github(path) {
  const response = await fetch(
    `${API}${path}`,
    { headers }
  );

  if (!response.ok) {
    const body =
      await response.text();

    throw new Error(
      `GitHub API ${response.status}: ${body}`
    );
  }

  return response.json();
}


/* =========================================================
   REPOSITORIOS
   ========================================================= */

async function getAllRepos() {
  const repos = [];

  for (
    let page = 1;
    page <= 10;
    page++
  ) {
    const data =
      await github(
        `/users/${owner}/repos?per_page=100&page=${page}&type=owner&sort=pushed`
      );

    repos.push(...data);

    if (data.length < 100) {
      break;
    }
  }

  return repos.filter(
    (repo) =>
      !repo.fork &&
      !repo.archived &&
      !repo.private
  );
}


/* =========================================================
   ICONOS DE LENGUAJES
   ========================================================= */

const languageIconMap = {

  JavaScript: "js",

  TypeScript: "ts",

  HTML: "html",

  CSS: "css",

  Java: "java",

  PHP: "php",

  Python: "python",

  C: "c",

  "C++": "cpp",

  "C#": "cs",

  Kotlin: "kotlin",

  Swift: "swift",

  Go: "go",

  Rust: "rust",

  Ruby: "ruby",

  Dart: "dart",

  Shell: "bash",

  SQL: "mysql",

};


/* =========================================================
   ICONOS DE HERRAMIENTAS
   ========================================================= */

const toolIconMap = {

  "IntelliJ IDEA": "idea",

  Eclipse: "eclipse",

  "VS Code": "vscode",

  Git: "git",

  GitHub: "github",

  Docker: "docker",

  "GitHub Actions": "githubactions",

  MySQL: "mysql",

  PostgreSQL: "postgresql",

  SQLite: "sqlite",

  Maven: "maven",

  Gradle: "gradle",

  "Node.js": "nodejs",

  Spring: "spring",

  JavaFX: "java",

  Bootstrap: "bootstrap",

};


/* =========================================================
   LENGUAJES
   ========================================================= */

async function buildStack(repos) {

  const totals = {};

  for (const repo of repos) {

    try {

      const languages =
        await github(
          `/repos/${owner}/${repo.name}/languages`
        );

      for (
        const [language, bytes]
        of Object.entries(languages)
      ) {

        totals[language] =
          (totals[language] || 0) +
          bytes;

      }

    } catch (error) {

      console.log(
        `No se pudieron obtener los lenguajes de ${repo.name}`
      );

    }

  }


  const totalBytes =
    Object.values(totals)
      .reduce(
        (sum, value) =>
          sum + value,
        0
      );


  if (totalBytes === 0) {

    return `
<p align="center">
  <img
    src="https://skillicons.dev/icons?i=html,css,js,java"
    alt="Tecnologías"
  />
</p>`;

  }


  const languages =
    Object.entries(totals)

      .map(
        ([language, bytes]) => ({
          language,
          bytes,
          percentage:
            (bytes / totalBytes) * 100
        })
      )

      .filter(
        (item) =>
          item.percentage >= 5
      )

      .sort(
        (a, b) =>
          b.bytes - a.bytes
      )

      .slice(0, 10);


  const icons =
    languages

      .map(
        (item) =>
          languageIconMap[
            item.language
          ]
      )

      .filter(Boolean)

      .join(",");


  if (!icons) {

    return `
<p align="center">
  <img
    src="https://skillicons.dev/icons?i=github"
    alt="Tecnologías detectadas"
  />
</p>`;

  }


  return `
<p align="center">
  <img
    src="https://skillicons.dev/icons?i=${icons}&perline=8"
    alt="Tecnologías detectadas"
  />
</p>`;
}


/* =========================================================
   DETECCIÓN DEL ENTORNO
   ========================================================= */

async function detectEnvironment(repos) {

  const detected =
    new Set();


  /*
   * Siempre utilizados
   */

  detected.add("Git");

  detected.add("GitHub");


  /*
   * Revisamos hasta 20 repositorios
   */

  for (
    const repo of repos.slice(0, 20)
  ) {

    try {

      const tree =
        await github(
          `/repos/${owner}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`
        );


      if (!tree.tree) {
        continue;
      }


      const paths =
        tree.tree
          .map(
            (item) =>
              item.path.toLowerCase()
          );


      /* -----------------------------------------
         IntelliJ IDEA
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path === ".idea" ||
            path.startsWith(".idea/") ||
            path.endsWith(".iml")
        )
      ) {

        detected.add(
          "IntelliJ IDEA"
        );

      }


      /* -----------------------------------------
         VS Code
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path === ".vscode" ||
            path.startsWith(".vscode/")
        )
      ) {

        detected.add(
          "VS Code"
        );

      }


      /* -----------------------------------------
         Eclipse
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path === ".project" ||
            path === ".classpath" ||
            path.startsWith(".settings/")
        )
      ) {

        detected.add(
          "Eclipse"
        );

      }


      /* -----------------------------------------
         Docker
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path === "dockerfile" ||
            path.includes("docker-compose") ||
            path.includes("compose.yaml") ||
            path.includes("compose.yml")
        )
      ) {

        detected.add(
          "Docker"
        );

      }


      /* -----------------------------------------
         Maven
         ----------------------------------------- */

      if (
        paths.includes("pom.xml")
      ) {

        detected.add(
          "Maven"
        );

      }


      /* -----------------------------------------
         Gradle
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path === "build.gradle" ||
            path === "settings.gradle" ||
            path === "build.gradle.kts"
        )
      ) {

        detected.add(
          "Gradle"
        );

      }


      /* -----------------------------------------
         Node.js
         ----------------------------------------- */

      if (
        paths.includes("package.json") ||
        paths.includes("package-lock.json") ||
        paths.includes("yarn.lock") ||
        paths.includes("pnpm-lock.yaml")
      ) {

        detected.add(
          "Node.js"
        );

      }


      /* -----------------------------------------
         GitHub Actions
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.startsWith(
              ".github/workflows/"
            )
        )
      ) {

        detected.add(
          "GitHub Actions"
        );

      }


      /* -----------------------------------------
         JavaFX
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.endsWith(".fxml")
        )
      ) {

        detected.add(
          "JavaFX"
        );

      }


      /* -----------------------------------------
         Spring
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.includes(
              "spring-boot"
            ) ||
            path.includes(
              "springframework"
            ) ||
            path.endsWith(
              "application.properties"
            ) ||
            path.endsWith(
              "application.yml"
            ) ||
            path.endsWith(
              "application.yaml"
            )
        )
      ) {

        detected.add(
          "Spring"
        );

      }


      /* -----------------------------------------
         MySQL
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.includes("mysql") ||
            path.includes(
              "mysql-connector"
            )
        )
      ) {

        detected.add(
          "MySQL"
        );

      }


      /* -----------------------------------------
         SQLite
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.includes("sqlite") ||
            path.endsWith(".db") ||
            path.endsWith(".sqlite") ||
            path.endsWith(".sqlite3")
        )
      ) {

        detected.add(
          "SQLite"
        );

      }


      /* -----------------------------------------
         PostgreSQL
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.includes("postgres") ||
            path.includes("postgresql")
        )
      ) {

        detected.add(
          "PostgreSQL"
        );

      }


      /* -----------------------------------------
         Bootstrap
         ----------------------------------------- */

      if (
        paths.some(
          (path) =>
            path.includes("bootstrap") ||
            path.includes(
              "bootstrap.min.css"
            )
        )
      ) {

        detected.add(
          "Bootstrap"
        );

      }

    } catch (error) {

      console.log(
        `No se pudo analizar ${repo.name}`
      );

    }

  }


  /*
   * Orden visual
   */

  const order = [

    "Git",

    "GitHub",

    "GitHub Actions",

    "IntelliJ IDEA",

    "Eclipse",

    "VS Code",

    "Maven",

    "Gradle",

    "Node.js",

    "Docker",

    "Spring",

    "JavaFX",

    "MySQL",

    "PostgreSQL",

    "SQLite",

    "Bootstrap",

  ];


  return order.filter(
    (tool) =>
      detected.has(tool)
  );
}


/* =========================================================
   ICONOS DEL ENTORNO
   ========================================================= */

function buildToolIcons(tools) {

  const icons =
    tools

      .map(
        (tool) =>
          toolIconMap[tool]
      )

      .filter(Boolean)

      .join(",");


  if (!icons) {

    return `
<p align="center">
  <img
    src="https://skillicons.dev/icons?i=github"
    alt="Herramientas detectadas"
  />
</p>`;

  }


  return `
<p align="center">
  <img
    src="https://skillicons.dev/icons?i=${icons}&perline=8"
    alt="Entorno de desarrollo"
  />
</p>`;
}


/* =========================================================
   REEMPLAZAR SECCIONES
   ========================================================= */

function replaceSection(
  content,
  startMarker,
  endMarker,
  replacement
) {

  const start =
    content.indexOf(
      startMarker
    );

  const end =
    content.indexOf(
      endMarker
    );


  if (
    start === -1 ||
    end === -1 ||
    end < start
  ) {

    throw new Error(
      `No se encontraron los marcadores:
${startMarker}
${endMarker}`
    );

  }


  const startContent =
    start +
    startMarker.length;


  return (
    content.slice(
      0,
      startContent
    ) +

    "\n" +

    replacement +

    "\n" +

    content.slice(end)
  );
}


/* =========================================================
   MAIN
   ========================================================= */

async function main() {

  const fs =
    await import(
      "node:fs/promises"
    );


  console.log(
    `Analizando GitHub de ${owner}...`
  );


  const repos =
    await getAllRepos();


  console.log(
    `Repositorios encontrados: ${repos.length}`
  );


  /* -----------------------------------------
     Tecnologías
     ----------------------------------------- */

  console.log(
    "Analizando lenguajes..."
  );


  const stack =
    await buildStack(
      repos
    );


  /* -----------------------------------------
     Entorno
     ----------------------------------------- */

  console.log(
    "Analizando entorno..."
  );


  const tools =
    await detectEnvironment(
      repos
    );


  const environment =
    buildToolIcons(
      tools
    );


  /* -----------------------------------------
     README
     ----------------------------------------- */

  let readme =
    await fs.readFile(
      "README.md",
      "utf8"
    );


  readme =
    replaceSection(
      readme,

      "<!-- AUTO-STACK:START -->",

      "<!-- AUTO-STACK:END -->",

      stack
    );


  readme =
    replaceSection(
      readme,

      "<!-- AUTO-ENV:START -->",

      "<!-- AUTO-ENV:END -->",

      environment
    );


  await fs.writeFile(
    "README.md",
    readme
  );


  console.log(
    "\n✅ README actualizado correctamente."
  );


  console.log(
    "🛠️ Entorno:",
    tools.join(", ")
  );

}


main().catch(
  (error) => {

    console.error(
      "❌ Error:",
      error
    );

    process.exit(1);

  }
);
