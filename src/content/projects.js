export const projects = {
  flagship: [
    {
      id: "stagecraft",
      title: "StageCraft",
      contribution: "I fixed how the chat assistant tracks earlier search results so it can add those items to the cart.",
      category: "Full-stack / Applied AI",
      context: "SparkHacks 2026 prototype",
      summary:
        "A theatrical marketplace for finding costumes, props, and equipment through natural-language search.",
      stack: [
        "Next.js",
        "TypeScript",
        "Supabase pgvector",
        "OpenAI embeddings",
      ],
      repoUrl:
        "https://github.com/saturn-amarbat/SparkHacks-26-Project-Stage-Craft-Web-App",
      notes: [
        "Next.js API routes connect the marketplace to Supabase Postgres and authentication.",
        "OpenAI embeddings turn search queries into vectors, and pgvector retrieves related inventory.",
        "The chat assistant can search inventory and add items to a cart. The casting board is a stub.",
      ],
    },
    {
      id: "trials-of-tempo-mobile",
      title: "Trials of Tempo Mobile",
      contribution: "I extended the ART151 game to Android with Capacitor, built the audio calibration settings, and integrated AdMob in test mode.",
      category: "Mobile / Game engineering",
      context: "ART151 rhythm runner · Android port",
      preview: {
        src: "/media/tempo-run.mp4",
        poster: "/media/tempo-run.webp",
        width: 768,
        height: 432,
      },
      summary:
        "A rhythm runner with touch controls on Android.",
      stack: ["Capacitor v6", "JavaScript", "p5.js", "Android"],
      repoUrl:
        "https://github.com/saturn-amarbat/Trials-Of-Tempo-The-Game-Mobile-version",
      publicLink: {
        href: "https://saturn-amarbat.github.io/Trials-Of-Tempo-The-Game/",
        label: "Play game in browser",
      },
      notes: [
        "The JavaScript and p5.js game loop runs inside a Capacitor Android shell.",
        "Latency calibration adjusts for device timing differences. The Android build uses a Capacitor plugin to run AdMob in test mode.",
      ],
    },
    {
      id: "checkers2088",
      title: "Checkers2088",
      contribution: "I added the instructions screen and refined the JavaFX styles and accessibility controls.",
      category: "Networking / Multiplayer",
      context: "Client–server architecture",
      summary:
        "Multiplayer checkers with a JavaFX client and a TCP server that validates moves and manages matches.",
      stack: ["Java 17", "JavaFX", "TCP sockets", "SQLite", "JUnit 5"],
      repoUrl: "https://github.com/saturn-amarbat/online-checkers",
      notes: [
        "The server owns the game state and enforces forced jumps, multi-jump sequences, and kinging.",
        "SQLite stores player records. JUnit tests cover game rules.",
      ],
    },
    {
      id: "trade-ops",
      title: "Trade Ops",
      contribution: "I set up the scanner, bull flag detector, alerts, command-line interface, and scheduler.",
      category: "Automation / Data pipelines",
      context: "Headless Python service",
      summary:
        "A stock momentum scanner that detects bull flags in one-minute market data and sends alerts to Discord.",
      stack: ["Python", "Alpaca API", "Discord webhooks", "SQLite", "cron"],
      repoUrl: "https://github.com/saturn-amarbat/trade-ops",
      notes: [
        "Alpaca supplies one-minute market bars for momentum screening and bull-flag detection.",
        "Discord webhooks deliver alerts, SQLite stores the trade journal, and cron schedules the process.",
      ],
    },
    {
      id: "castward",
      title: "Castward",
      contribution: "I added the run timer and the controls for starting a run and saving session notes.",
      category: "Mobile web / Product design",
      context: "Browser-based running planner prototype",
      summary:
        "A running planner that compares start times, shows weather over the full run, and suggests what to wear.",
      stack: ["HTML", "CSS", "JavaScript", "NWS API", "localStorage"],
      repoUrl: "https://github.com/jignacio1299/castward",
      publicLink: {
        href: "https://jignacio1299.github.io/castward/",
        label: "Try the sample-weather prototype",
      },
      notes: [
        "The prototype starts with embedded sample forecasts and can request a live hourly forecast for Chicago from the National Weather Service.",
        "Browser storage saves clothing plans and post-run notes.",
      ],
    },
  ],
  systems: [
    {
      id: "custom-memory-allocator",
      title: "Custom Memory Allocator",
      summary:
        "A C implementation of malloc and free using a fixed 1 MB heap, best-fit allocation, and coalescing of adjacent free blocks.",
      stack: ["C", "Valgrind"],
      repoUrl:
        "https://github.com/saturn-amarbat/Personal_Project_Memory_Allocator",
    },
    {
      id: "uic-campus-router",
      title: "UIC Campus Router",
      summary:
        "A campus navigation tool that builds a walking graph from OpenStreetMap data and finds shortest paths for a web map and command-line interface.",
      stack: ["C++", "Dijkstra’s algorithm"],
      repoUrl: "https://github.com/saturn-amarbat/uic-campus-map-router",
    },
  ],
  webAndCreative: [
    {
      id: "tethyn",
      title: "TETHYN — Music & Creative Direction",
      summary:
        "A personal creative project built around my electronic music alias, exploring visual identity, immersive web design, animation, and interactive audio.",
      artwork: {
        src: "/media/tethyn.webp",
        alt: "The TETHYN wordmark framed by ice-blue crystals.",
        width: 480,
        height: 204,
      },
      websitePreview: {
        src: "/media/tethyn-preview.mp4",
        poster: "/media/tethyn.webp",
        width: 768,
        height: 432,
      },
      publicLink: { href: "https://tethynmusic.com/", label: "Visit website" },
    },
    {
      id: "jipuk",
      title: "Digital Letter Website",
      summary:
        "An interactive digital letter exploring CSS animations, typography, and visual storytelling.",
      repoUrl: "https://github.com/saturn-amarbat/Digital-Letter-Website",
      publicLink: { href: "https://jipuk.pages.dev/", label: "Visit website" },
    },
    {
      id: "st-detailing",
      title: "ST Detailing",
      summary: "A website for a Chicagoland mobile auto detailing business.",
      repoUrl: "https://github.com/saturn-amarbat/St-detailing-website",
    },
  ],
};
