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

// Profundidad 1: únicamente el contenido de la raíz.
const MAX_STRUCTURE_DEPTH = 2;

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

      const childPrefix =
        prefix + (isLast ? "    " : "│   ");

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
        lines.push(
          `${prefix}${branch}📄 ${entry.name}`
        );
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

/* =========================================================
   PROGRESO ACADÉMICO: HORARIO + CALENDARIO ESCOLAR
   ========================================================= */

// Solo se contabilizan estos seis módulos.
// IPE II está convalidado y Proyecto Intermodular queda excluido.

const courseModules = [
  {
    code: "DIW",
    name: "DIW",
    weeklyPeriods: 4,
    evalDistribution: [54, 34, 0],
  },
  {
    code: "DWEC",
    name: "DWEC",
    weeklyPeriods: 8,
    evalDistribution: [66, 82, 98],
  },
  {
    code: "DWES",
    name: "DWES",
    weeklyPeriods: 8,
    evalDistribution: [68, 76, 116],
  },
  {
    code: "DAW",
    name: "DAW",
    weeklyPeriods: 3,
    evalDistribution: [72.5, 54.5, 0],
  },
  {
    code: "OP-CN",
    name: "OP-CN",
    weeklyPeriods: 2,
    evalDistribution: [40, 40, 0],
  },
  {
    code: "DASP",
    name: "DASP",
    weeklyPeriods: 1,
    evalDistribution: [16, 14, 0],
  },
];

/* =========================================================
   CALENDARIO ESCOLAR
   ========================================================= */

const schoolCalendar = {
  start: "2026-09-09",
  end: "2027-06-24",
  periodMinutes: 55,

  // Festivos y días no lectivos configurados.
  nonTeachingDates: [
    "2026-11-02",
    "2026-11-03",
    "2026-11-04",
    "2026-11-05",
    "2026-11-06",

    "2026-12-07",
    "2026-12-08",
    "2026-12-23",
    "2026-12-24",
    "2026-12-25",
    "2026-12-28",
    "2026-12-29",
    "2026-12-30",
    "2026-12-31",

    "2027-01-04",
    "2027-01-05",
    "2027-01-07",
    "2027-01-08",

    "2027-02-10",
    "2027-02-11",
    "2027-02-12",

    "2027-03-22",
    "2027-03-23",
    "2027-03-24",

    "2027-05-03",
    "2027-05-04",
  ],

  // Añade aquí los festivos locales confirmados.
  localHolidays: [],

  // Activa esta opción si el centro confirma que las fechas
  // condicionales deben descontarse del cómputo.
  includeConditionalNonTeachingDates: false,

  conditionalNonTeachingDates: [
    "2026-09-10",
    "2026-09-11",
    "2026-09-17",
    "2026-09-21",
    "2026-09-22",
    "2026-09-23",
    "2026-09-24",
    "2026-09-25",
    "2026-09-28",
    "2026-09-29",
    "2026-09-30",
    "2027-01-01",
    "2027-01-06",
    "2027-03-25",
    "2027-03-26",
    "2027-06-01",
    "2027-06-02",
    "2027-06-03",
    "2027-06-04",
    "2027-06-07",
    "2027-06-08",
    "2027-06-09",
    "2027-06-10",
    "2027-06-11",
    "2027-06-14",
    "2027-06-15",
    "2027-06-16",
    "2027-06-17",
    "2027-06-18",
    "2027-06-21",
    "2027-06-22",
  ],
};

/* =========================================================
   HORARIO SEMANAL
   ========================================================= */

// Lunes=1, martes=2, miércoles=3, jueves=4, viernes=5.
// El valor representa el número de periodos semanales.

const weeklyTimetable = {
  DIW: {
    2: 1,
    4: 1,
    5: 2,
  },

  DWEC: {
    1: 3,
    2: 1,
    3: 2,
    4: 2,
  },

  DWES: {
    1: 3,
    2: 1,
    3: 2,
    4: 2,
  },

  DAW: {
    2: 1,
    5: 2,
  },

  "OP-CN": {
    5: 2,
  },

  DASP: {
    2: 1,
  },
};

function getDateKey(date) {
  return date.toISOString().slice(0, 10);
}

/* =========================================================
   CÁLCULO DE HORAS LECTIVAS
   ========================================================= */

function calculateScheduledModuleHours() {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(schoolCalendar.start) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(schoolCalendar.end)
  ) {
    throw new Error(
      "Las fechas start/end del calendario deben usar YYYY-MM-DD."
    );
  }

  if (
    new Date(`${schoolCalendar.start}T00:00:00Z`) >
    new Date(`${schoolCalendar.end}T00:00:00Z`)
  ) {
    throw new Error(
      "La fecha de inicio del curso es posterior a la fecha final."
    );
  }

  if (
    !Number.isFinite(schoolCalendar.periodMinutes) ||
    schoolCalendar.periodMinutes <= 0
  ) {
    throw new Error(
      "schoolCalendar.periodMinutes debe ser un número positivo."
    );
  }

  const excludedDates = new Set([
    ...schoolCalendar.nonTeachingDates,
    ...schoolCalendar.localHolidays,
    ...(schoolCalendar.includeConditionalNonTeachingDates
      ? schoolCalendar.conditionalNonTeachingDates
      : []),
  ]);

  const sessionsByModule = Object.fromEntries(
    courseModules.map((module) => [module.code, 0])
  );

  const date = new Date(`${schoolCalendar.start}T12:00:00Z`);
  const endDate = new Date(`${schoolCalendar.end}T12:00:00Z`);

  while (date <= endDate) {
    const weekday = date.getUTCDay();
    const key = getDateKey(date);

    if (weekday >= 1 && weekday <= 5 && !excludedDates.has(key)) {
      for (const module of courseModules) {
        sessionsByModule[module.code] +=
          weeklyTimetable[module.code]?.[weekday] || 0;
      }
    }

    date.setUTCDate(date.getUTCDate() + 1);
  }

  for (const module of courseModules) {
    module.totalHours =
      (sessionsByModule[module.code] * schoolCalendar.periodMinutes) / 60;

    const distributionTotal = module.evalDistribution.reduce(
      (sum, value) => sum + value,
      0
    );

    module.evalHours = module.evalDistribution.map((value) =>
      distributionTotal > 0
        ? (module.totalHours * value) / distributionTotal
        : 0
    );
  }

  return {
    totalSessions: Object.values(sessionsByModule).reduce(
      (sum, value) => sum + value,
      0
    ),

    totalHours: Object.values(sessionsByModule).reduce(
      (sum, value) =>
        sum + (value * schoolCalendar.periodMinutes) / 60,
      0
    ),

    sessionsByModule,
  };
}

/* =========================================================
   EVALUACIONES
   ========================================================= */

const courseEvaluations = [
  {
    name: "1.ª Evaluación",
    folder: "1ERA EV",
  },
  {
    name: "2.ª Evaluación",
    folder: "2NDA EV",
  },
  {
    name: "3.ª Evaluación",
    folder: "3ERA EV",
  },
];

function normalizeFolderName(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

/* =========================================================
   BARRAS DE PROGRESO
   ========================================================= */

function createProgressBar(label, percentage, color = "#2563EB") {
  const safePercentage = Math.max(0, Math.min(100, percentage));
  const filledWidth = 500 * (safePercentage / 100);

  return `<p align="center">
  <strong>${label} · ${safePercentage.toFixed(1)}%</strong><br/>
  <svg width="500" height="24" viewBox="0 0 500 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}: ${safePercentage.toFixed(1)}%">
    <rect x="0" y="2" width="500" height="18" rx="9" fill="#111827"/>
    <rect x="0" y="2" width="${filledWidth.toFixed(1)}" height="18" rx="9" fill="${color}"/>
  </svg>
</p>`;
}

/* =========================================================
   PROGRESO ACADÉMICO DINÁMICO
   ========================================================= */

async function buildAcademicProgress(fs) {
  const calendarStats = calculateScheduledModuleHours();

  console.log(
    `Calendario lectivo: ${calendarStats.totalSessions} periodos / ${calendarStats.totalHours.toFixed(1)} horas estimadas`
  );

  const totalCourseHours = courseModules.reduce(
    (sum, module) => sum + module.totalHours,
    0
  );

  const rootEntries = await fs.readdir(".", {
    withFileTypes: true,
  });

  const rootDirectories = rootEntries.filter((entry) => entry.isDirectory());

  // Se aceptan diferentes nombres para cada evaluación.
  const evaluationFolderAliases = {
    "1ERA EV": [
      "1ERA EV",
      "1RA EV",
      "1 EV",
      "1 EVALUACION",
      "1ERA EVALUACION",
      "1RA EVALUACION",
    ],

    "2NDA EV": [
      "2NDA EV",
      "2DA EV",
      "2 EV",
      "2 EVALUACION",
      "2DA EVALUACION",
      "2NDA EVALUACION",
    ],

    "3ERA EV": [
      "3ERA EV",
      "3RA EV",
      "3 EV",
      "3 EVALUACION",
      "3RA EVALUACION",
      "3ERA EVALUACION",
    ],
  };

  function findEvaluationDirectory(evaluation) {
    const aliases =
      evaluationFolderAliases[evaluation.folder] || [evaluation.folder];

    const normalizedAliases = aliases.map(normalizeFolderName);

    return rootDirectories.find((entry) =>
      normalizedAliases.includes(normalizeFolderName(entry.name))
    );
  }

  function isModuleDirectory(directoryName, moduleCode) {
    return normalizeFolderName(directoryName).startsWith(
      normalizeFolderName(moduleCode)
    );
  }

  const evaluationResults = [];

  for (
    let evaluationIndex = 0;
    evaluationIndex < courseEvaluations.length;
    evaluationIndex++
  ) {
    const evaluation = courseEvaluations[evaluationIndex];

    const realFolder = findEvaluationDirectory(evaluation);

    let detectedModules = [];

    if (!realFolder) {
      console.log(
        `⚠️ ${evaluation.name}: no se encontró carpeta. Alias probados: ${
          (evaluationFolderAliases[evaluation.folder] || [
            evaluation.folder,
          ]).join(", ")
        }`
      );
    } else {
      console.log(
        `📂 ${evaluation.name}: carpeta encontrada -> "${realFolder.name}"`
      );

      const entries = await fs.readdir(realFolder.name, {
        withFileTypes: true,
      });

      const moduleDirectories = entries.filter((entry) => entry.isDirectory());

      detectedModules = courseModules.filter((module) =>
        moduleDirectories.some((entry) =>
          isModuleDirectory(entry.name, module.code)
        )
      );

      console.log(
        `📚 Módulos detectados: ${
          detectedModules.map((module) => module.code).join(", ") || "ninguno"
        }`
      );
    }

    const detectedCodes = new Set(
      detectedModules.map((module) => module.code)
    );

    const evaluationHours = courseModules.reduce(
      (sum, module) => sum + module.evalHours[evaluationIndex],
      0
    );

    // La carpeta indica contenido registrado, no tareas finalizadas.
    const representedHours = courseModules.reduce(
      (sum, module) =>
        sum +
        (detectedCodes.has(module.code)
          ? module.evalHours[evaluationIndex]
          : 0),
      0
    );

    const evaluationContribution =
      totalCourseHours > 0
        ? (representedHours / totalCourseHours) * 100
        : 0;

    const evaluationCoverage =
      evaluationHours > 0
        ? (representedHours / evaluationHours) * 100
        : 0;

    evaluationResults.push({
      ...evaluation,
      detectedModules,
      evaluationHours,
      representedHours,
      evaluationContribution,
      evaluationCoverage,
      folderFound: Boolean(realFolder),
    });

    console.log(
      `${evaluation.name}: ${representedHours.toFixed(1)} / ${evaluationHours.toFixed(1)} horas representadas`
    );
  }

  const globalPercentage = evaluationResults.reduce(
    (sum, evaluation) => sum + evaluation.evaluationContribution,
    0
  );

  const globalBar = createProgressBar(
    "Progreso registrado del curso",
    globalPercentage,
    "#7C3AED"
  );

  const evaluationBars = evaluationResults
    .map((evaluation) =>
      createProgressBar(
        `${evaluation.name} · peso registrado en el curso`,
        evaluation.evaluationCoverage
      )
    )
    .join("\n");

  const details = evaluationResults
    .map((evaluation) => {
      const modules = evaluation.detectedModules.length
        ? evaluation.detectedModules
            .map((module) => module.name)
            .join(", ")
        : "Sin módulos detectados";

      const folderStatus = evaluation.folderFound
        ? ""
        : " <em>(carpeta no encontrada)</em>";

      return `<tr>
  <td>${evaluation.name}${folderStatus}</td>
  <td align="center">${evaluation.evaluationHours.toFixed(1)} h</td>
  <td align="center">${evaluation.evaluationContribution.toFixed(2)}%</td>
  <td align="center">${evaluation.evaluationCoverage.toFixed(1)}%</td>
  <td>${modules}</td>
</tr>`;
    })
    .join("\n");

  const moduleRows = courseModules
    .map((module) => {
      const percentages = module.evalHours.map((hours) =>
        module.totalHours > 0
          ? (hours / module.totalHours) * 100
          : 0
      );

      return `<tr>
  <td><strong>${module.name}</strong></td>
  <td align="center">${module.totalHours.toFixed(1)} h</td>
  <td align="center">${percentages[0].toFixed(1)}%</td>
  <td align="center">${percentages[1].toFixed(1)}%</td>
  <td align="center">${percentages[2].toFixed(1)}%</td>
</tr>`;
    })
    .join("\n");

  console.log(
    `Progreso registrado global: ${globalPercentage.toFixed(2)}%`
  );

  return `<div align="center">

${globalBar}

${evaluationBars}

</div>

<h3>Peso de cada evaluación dentro del curso</h3>

<table>
  <thead>
    <tr>
      <th>Evaluación</th>
      <th>Horas asignadas</th>
      <th>Parte del curso registrada</th>
      <th>Cobertura de la evaluación</th>
      <th>Módulos detectados</th>
    </tr>
  </thead>
  <tbody>
${details}
  </tbody>
</table>

<h3>Distribución por módulo</h3>

<table>
  <thead>
    <tr>
      <th>Módulo</th>
      <th>Horas totales</th>
      <th>1.ª evaluación</th>
      <th>2.ª evaluación</th>
      <th>3.ª evaluación</th>
    </tr>
  </thead>
  <tbody>
${moduleRows}
  </tbody>
</table>

<sub>Las horas se estiman a partir de los periodos semanales configurados (${schoolCalendar.periodMinutes} minutos) entre el ${schoolCalendar.start} y el ${schoolCalendar.end}. Se descuentan las fechas de schoolCalendar.nonTeachingDates y schoolCalendar.localHolidays. Las fechas condicionales ${
    schoolCalendar.includeConditionalNonTeachingDates
      ? "también están descontadas"
      : "no se descuentan (includeConditionalNonTeachingDates = false)"
  }. IPE II y Proyecto Intermodular quedan excluidos. El reparto por evaluación es provisional y editable en courseModules[].evalDistribution. Las carpetas detectadas indican contenido registrado, no que todos los ejercicios estén terminados o aprobados.</sub>`;
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

  console.log("Generando estructura del repositorio...");
  const repositoryStructure = await buildRepositoryStructure(fs);

  console.log("Calculando progreso académico...");
  const academicProgress = await buildAcademicProgress(fs);

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

  readme = replaceSection(
    readme,
    "<!-- AUTO-STRUCTURE:START -->",
    "<!-- AUTO-STRUCTURE:END -->",
    repositoryStructure
  );

  readme = replaceSection(
    readme,
    "<!-- AUTO-PROGRESS:START -->",
    "<!-- AUTO-PROGRESS:END -->",
    academicProgress
  );

  await fs.writeFile("README.md", readme);

  console.log("README actualizado correctamente.");
  console.log("Entorno detectado:", tools.join(", "));
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
