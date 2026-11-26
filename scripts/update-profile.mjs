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

    if (!Array.isArray(data)) break;

    repos.push(...data);

    if (data.length < 100) break;
  }

  return repos.filter((repo) => !repo.archived && !repo.private);
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
  JSON: "json",
  XML: "xml",
  Dockerfile: "docker",
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

  const reposToAnalyze = repos.filter(
    (repo) => repo.name.toLowerCase() !== owner.toLowerCase()
  );

  for (const repo of reposToAnalyze) {
    try {
      const languages = await github(`/repos/${owner}/${repo.name}/languages`);

      if (!languages || typeof languages !== "object") {
        console.log(`${repo.name}: sin datos de lenguajes`);
        continue;
      }

      console.log(
        `${repo.name}: ${Object.keys(languages).join(", ") || "sin lenguajes"}`
      );

      for (const [language, bytes] of Object.entries(languages)) {
        if (typeof bytes !== "number" || Number.isNaN(bytes)) continue;
        totals[language] = (totals[language] || 0) + bytes;
      }
    } catch (error) {
      console.log(`Error leyendo ${repo.name}: ${error.message}`);
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

  const MIN_PERCENTAGE = 0.1;

  const languages = Object.entries(totals)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: (bytes / totalBytes) * 100,
    }))
    .filter(
      (item) =>
        item.percentage >= MIN_PERCENTAGE &&
        Boolean(languageIconMap[item.language])
    )
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 12);

  console.log(
    "Lenguajes mostrados:",
    languages.map(
      (item) => `${item.language} (${item.percentage.toFixed(2)}%)`
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

  const reposToInspect = repos
    .filter((repo) => repo.name.toLowerCase() !== owner.toLowerCase())
    .slice(0, 30);

  for (const repo of reposToInspect) {
    try {
      const branch = repo.default_branch || "main";

      const result = await github(
        `/repos/${owner}/${repo.name}/git/trees/${encodeURIComponent(branch)}?recursive=1`
      );

      const tree = Array.isArray(result.tree) ? result.tree : [];
      const paths = tree.map((item) => String(item.path).toLowerCase());

      const has = (name) =>
        paths.some((path) => path === name || path.startsWith(`${name}/`));

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
            p.endsWith(".gradle") ||
            p.endsWith(".gradle.kts")
        )
      ) {
        detected.add("Gradle");
      }

      if (
        paths.some(
          (p) =>
            p === "package.json" ||
            p.endsWith("/package.json") ||
            p.includes("node_modules")
        )
      ) {
        detected.add("Node.js");
      }

      if (
        paths.some(
          (p) =>
            p.includes("spring-boot") ||
            p.includes("springframework")
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
        paths.some((p) => p.includes("postgres") || p.includes("postgresql"))
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
      console.log(`No se pudo analizar ${repo.name}: ${error.message}`);
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
   ESTRUCTURA DINÁMICA DEL REPOSITORIO
   ========================================================= */

const ignoredStructureDirectories = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  ".angular",
  ".cache",
  ".turbo",
  ".parcel-cache",
  "vendor"
]);

const MAX_STRUCTURE_DEPTH = 1;

function getStructureFolderIcon(name) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  if (
    normalized === "1ERA EV" ||
    normalized === "2NDA EV" ||
    normalized === "3ERA EV"
  ) {
    return "📚";
  }

  if (normalized.startsWith("DIW")) return "🎨";
  if (normalized.startsWith("DWEC")) return "⚡";
  if (normalized.startsWith("DWES")) return "⚙️";
  if (normalized.startsWith("DAW")) return "🚀";
  if (normalized.startsWith("OP-CN")) return "☁️";
  if (normalized.startsWith("DASP")) return "🧠";
  if (normalized === "SCRIPTS") return "⚙️";
  if (normalized === ".GITHUB") return "🔧";

  return "📁";
}

async function buildRepositoryStructure(fs) {
  const path = await import("node:path");
  const root = process.cwd();

  const repositoryName =
    process.env.GITHUB_REPOSITORY?.split("/").pop() || path.basename(root);

  async function readDirectory(directory, prefix = "", depth = 0) {
    const entries = await fs.readdir(directory, {
      withFileTypes: true,
    });

    const visibleEntries = entries
      .filter((entry) => {
        const entryName = entry.name.toLowerCase();

        if (
          entry.isDirectory() &&
          ignoredStructureDirectories.has(entryName)
        ) {
          return false;
        }

        const visibleDotEntries = new Set([
          ".github",
          ".gitignore",
          ".gitattributes",
          ".editorconfig",
        ]);

        if (
          entry.name.startsWith(".") &&
          !visibleDotEntries.has(entryName)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (a.isDirectory() !== b.isDirectory()) {
          return a.isDirectory() ? -1 : 1;
        }

        return a.name.localeCompare(
          b.name,
          "es",
          { sensitivity: "base" }
        );
      });

    const lines = [];

    for (let index = 0; index < visibleEntries.length; index++) {
      const entry = visibleEntries[index];
      const isLast = index === visibleEntries.length - 1;
      const branch = isLast ? "└── " : "├── ";
      const childPrefix = prefix + (isLast ? "    " : "│   ");
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        lines.push(
          `${prefix}${branch}${getStructureFolderIcon(entry.name)} ${entry.name}/`
        );

        if (depth < MAX_STRUCTURE_DEPTH) {
          const children = await readDirectory(
            entryPath,
            childPrefix,
            depth + 1
          );

          lines.push(...children);
        }
      } else if (entry.isFile()) {
        lines.push(`${prefix}${branch}📄 ${entry.name}`);
      }
    }

    return lines;
  }

  const entries = await readDirectory(root, "", 1);

  return [
    "```text",
    `${repositoryName}/`,
    ...entries,
    "```",
  ].join("\n");
}
