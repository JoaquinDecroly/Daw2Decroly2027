
const API = "https://api.github.com";

const owner = process.env.GITHUB_OWNER || "JoaquinDecroly";
const token = process.env.GITHUB_TOKEN;

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
  const response = await fetch(`${API}${path}`, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  return response.json();
}

/* =========================================================
   REPOSITORIOS
   ========================================================= */

async function getAllRepos() {
  const repos = [];

  for (let page = 1; page <= 10; page++) {
    const data = await github(
      `/users/${owner}/repos?per_page=100&page=${page}&type=owner&sort=pushed`
    );

    repos.push(...data);

    if (data.length < 100) break;
  }

  // Incluye forks y excluye repositorios archivados o privados.
  return repos.filter(
    (repo) => !repo.archived && !repo.private
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
  Vue: "vue",
  Svelte: "svelte",
  SCSS: "sass",
  Sass: "sass",
  Less: "less",
  GraphQL: "graphql",
  Lua: "lua",
  Scala: "scala",
  Perl: "perl",
  Haskell: "haskell",
  Elixir: "elixir",
  Astro: "astro",
  Markdown: "markdown",
  YAML: "yaml",
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
  Bootstrap: "bootstrap",
};

/* =========================================================
   LENGUAJES
   ========================================================= */

async function buildStack(repos) {
  const totals = {};

  // Excluir el repositorio del perfil para que su README
  // no distorsione las estadísticas de lenguajes.
  const reposToAnalyze = repos.filter(
    (repo) => repo.name.toLowerCase() !== owner.toLowerCase()
  );

  for (const repo of reposToAnalyze) {
    try {
      const languages = await github(
        `/repos/${owner}/${repo.name}/languages`
      );

      console.log(
        `${repo.name}: ${
          Object.keys(languages).join(", ") || "sin lenguajes"
        }`
      );

      for (const [language, bytes] of Object.entries(languages)) {
        totals[language] = (totals[language] || 0) + bytes;
      }
    } catch (error) {
      console.log(
        `Error leyendo ${repo.name}: ${error.message}`
      );
    }
  }

  console.log("Bytes detectados:", totals);

  const totalBytes = Object.values(totals).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  if (totalBytes === 0) {
    return `<p align="center">No hay lenguajes detectados en los repositorios analizados.</p>`;
  }

  const MIN_PERCENTAGE = 1;

  const languages = Object.entries(totals)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: (bytes / totalBytes) * 100,
    }))
    .filter(
      (item) =>
        item.percentage >= MIN_PERCENTAGE &&
        languageIconMap[item.language]
    )
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 12);

  console.log(
    "Lenguajes mostrados:",
    languages.map(
      (item) =>
        `${item.language} (${item.percentage.toFixed(2)}%)`
    )
  );

  const icons = languages
    .map((item) => languageIconMap[item.language])
    .join(",");

  if (!icons) {
    return `<p align="center">No se encontraron lenguajes compatibles. Consulta los logs de GitHub Actions.</p>`;
  }

  return `<p align="center">
  <img src="https://skillicons.dev/icons?i=${icons}&perline=8" alt="Lenguajes detectados"/>
</p>`;
}

/* =========================================================
   DETECCIÓN DEL ENTORNO
   ========================================================= */

async function detectEnvironment(repos) {
  const detected = new Set(["Git", "GitHub"]);

  // Inspeccionar repositorios recientes, excluyendo el README del perfil.
  const reposToInspect = repos
    .filter(
      (repo) => repo.name.toLowerCase() !== owner.toLowerCase()
    )
    .slice(0, 30);

  for (const repo of reposToInspect) {
    try {
      const result = await github(
        `/repos/${owner}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`
      );

      const paths = (result.tree || []).map(
        (item) => item.path.toLowerCase()
      );

      const has = (name) =>
        paths.some(
          (path) => path === name || path.startsWith(`${name}/`)
        );

      const hasFile = (name) =>
        paths.some((path) => path.endsWith(name.toLowerCase()));

      if (has(".idea") || paths.some((p) => p.endsWith(".iml"))) {
        detected.add("IntelliJ IDEA");
      }

      if (has(".vscode")) detected.add("VS Code");

      if (
        paths.includes(".project") ||
        paths.includes(".classpath") ||
        has(".settings")
      ) {
        detected.add("Eclipse");
      }

      if (
        paths.some(
          (p) =>
            p === "dockerfile" ||
            p.endsWith("/dockerfile") ||
            p.includes("docker-compose") ||
            p.endsWith("compose.yml") ||
            p.endsWith("compose.yaml")
        )
      ) {
        detected.add("Docker");
      }

      if (paths.includes("pom.xml")) detected.add("Maven");

      if (
        paths.some(
          (p) =>
            p === "build.gradle" ||
            p === "settings.gradle" ||
            p === "build.gradle.kts" ||
            p === "settings.gradle.kts"
        )
      ) {
        detected.add("Gradle");
      }

      if (
        paths.includes("package.json") ||
        paths.includes("package-lock.json") ||
        paths.includes("yarn.lock") ||
        paths.includes("pnpm-lock.yaml")
      ) {
        detected.add("Node.js");
      }

      if (has(".github/workflows")) {
        detected.add("GitHub Actions");
      }

      if (paths.some((p) => p.endsWith(".fxml"))) {
        // JavaFX se detecta, pero no se mezcla con los IDE.
        console.log(`JavaFX detectado en ${repo.name}`);
      }

      if (
        paths.some(
          (p) =>
            p.includes("springframework") ||
            p.includes("spring-boot") ||
            p.endsWith("application.properties")
        )
      ) {
        detected.add("Spring");
      }

      if (
        paths.some(
          (p) =>
            p.includes("mysql-connector") ||
            p.includes("mysql")
        )
      ) {
        detected.add("MySQL");
      }

      if (
        paths.some(
          (p) =>
            p.includes("sqlite") ||
            p.endsWith(".db") ||
            p.endsWith(".sqlite") ||
            p.endsWith(".sqlite3")
        )
      ) {
        detected.add("SQLite");
      }

      if (
        paths.some(
          (p) => p.includes("postgres") || p.includes("postgresql")
        )
      ) {
        detected.add("PostgreSQL");
      }

      if (
        paths.some(
          (p) =>
            p.includes("bootstrap") ||
            p.endsWith("bootstrap.min.css")
        )
      ) {
        detected.add("Bootstrap");
      }

    } catch (error) {
      console.log(
        `No se pudo analizar ${repo.name}: ${error.message}`
      );
    }
  }

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
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "Bootstrap",
  ];

  return order.filter((tool) => detected.has(tool));
}

/* =========================================================
   ICONOS DEL ENTORNO
   ========================================================= */

function buildToolIcons(tools) {
  const icons = tools
    .map((tool) => toolIconMap[tool])
    .filter(Boolean)
    .join(",");

  if (!icons) {
    return `<p align="center">No se detectaron herramientas.</p>`;
  }

  return `<p align="center">
  <img src="https://skillicons.dev/icons?i=${icons}&perline=8" alt="Entorno de desarrollo"/>
</p>`;
}

/* =========================================================
   REEMPLAZAR SECCIONES
   ========================================================= */

function replaceSection(content, startMarker, endMarker, replacement) {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(
      `No se encontraron los marcadores:\n${startMarker}\n${endMarker}`
    );
  }

  const startContent = start + startMarker.length;

  return (
    content.slice(0, startContent) +
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
  const fs = await import("node:fs/promises");

  console.log(`Analizando GitHub de ${owner}...`);

  const repos = await getAllRepos();

  console.log(`Repositorios encontrados: ${repos.length}`);

  console.log("Analizando lenguajes...");
  const stack = await buildStack(repos);

  console.log("Analizando entorno...");
  const tools = await detectEnvironment(repos);
  const environment = buildToolIcons(tools);

  let readme = await fs.readFile("README.md", "utf8");

  readme = replaceSection(
    readme,
    "<!-- AUTO-STACK:START -->",
    "<!-- AUTO-STACK:END -->",
    stack
  );

  readme = replaceSection(
    readme,
    "<!-- AUTO-ENV:START -->",
    "<!-- AUTO-ENV:END -->",
    environment
  );

  await fs.writeFile("README.md", readme);

  console.log("README actualizado correctamente.");
  console.log("Entorno detectado:", tools.join(", "));
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
