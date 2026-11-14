# Kungfu Agent AI — IMITATION LEARNING (LEARNING BY DEMONSTRATION)

A real-time browser-based AI humanoid motion imitation studio where **Kungfu Agent AI** learns Chinese Kung Fu stances, strikes, and airborne jumping kicks from human demonstrations via webcam or Quick Pose Pad using **Dual-Head Behavior Cloning**, and reproduces them autonomously without requiring the webcam.

---

## Technologies Used

| Layer | Technology |
|---|---|
| **Backend & MVC** | PHP 8+ (custom MVC router, REST API, PDO & MySQLi) |
| **Database** | MySQL / MariaDB (`db_kungfu_ai`) |
| **Frontend UI** | HTML5, CSS3, Bootstrap 5, JavaScript ES6+ Modules, Chart.js |
| **3D Humanoid Simulation** | Three.js (12-joint articulated Wushu humanoid with jump & flying kick physics) |
| **Computer Vision** | TensorFlow.js Pose Detection (`MoveNet Lightning`), HTML5 MediaDevices Webcam API, WebGL |
| **Deep Learning (BC)** | TensorFlow.js Neural Network trained asynchronously in HTML5 Web Workers |

---

## System Dependencies

### Server & Runtime Requirements
- **PHP >= 8.0** with extensions enabled: `pdo_mysql`, `mysqli`, `json`, `mbstring`, `openssl`
- **MySQL >= 5.7** or **MariaDB >= 10.4** (XAMPP / WAMP / Laragon)
- **Apache Web Server** with `mod_rewrite` enabled (or PHP built-in server)
- No Python or Node.js runtime required

### Client-Side Requirements
- Modern WebGL-capable browser (Chrome, Edge, or Firefox)
- Optional Webcam (640x480+) for live MoveNet human demonstration capture
- Pre-bundled local vendor assets under `public/assets/vendor/` (Bootstrap 5, Bootstrap Icons, Chart.js, Three.js, TensorFlow.js, Pose Detection MoveNet)

---

## Supported Kung Fu Classes & Continuous Joints

The Dual-Head Behavior Cloning agent predicts **9 Chinese Kung Fu action classes** and **12 continuous joint targets** (`armRaiseL`, `armRaiseR`, `armAbductL`, `armAbductR`, `elbowFlexL`, `elbowFlexR`, `torsoPitch`, `torsoRoll`, `headYaw`, `squatDepth`, `jumpHeight`, and `kickLeg`):

| ID | Action Code | Kung Fu Move | Keyboard Shortcut |
|---|---|---|---|
| `0` | `WUJI_READY` | Wuji Stance (Ready) | `Space` / `X` |
| `1` | `GONG_BU_PUNCH` | Gong Bu (Lunge Punch) | `W` / `ArrowUp` |
| `2` | `TIGER_BACK_PARRY` | Hu Zhua (Tiger Guard) | `S` / `ArrowDown` |
| `3` | `CRANE_TURN_LEFT` | Duli Bu (Left Crane) | `A` / `ArrowLeft` |
| `4` | `DRAGON_TURN_RIGHT` | Qing Long (Right Dragon) | `D` / `ArrowRight` |
| `5` | `LEFT_CLOUD_PALM` | Yun Shou (Left Cloud Palm) | `Q` / `1` |
| `6` | `RIGHT_SPEAR_STRIKE` | Chuan Zhang (Right Spear) | `E` / `2` |
| `7` | `MA_BU_HORSE` | Ma Bu (Horse Stance) | `C` / `4` |
| `8` | `FLYING_JUMP_KICK` | Fei Tui (Jump Kick) | `J` / `R` / `3` |

---

## 3D Environments (Settings -> Live Preview & Apply)

Open **Settings -> 3D Environments** to choose and live-preview any arena (via the interactive 3D preview viewport or **Preview Full Stage**) before clicking **Apply Environment**. Includes **1 Classic** arena (`Shaolin Taiji Courtyard`) and **10 New 3D Environments**:

| # | Environment ID | Name | Category & Lighting Mood |
|---|---|---|---|
| `1` | `bamboo_mist_grove` | **Misty Emerald Bamboo Forest** | Nature Sanctuary · Jade Morning Mist |
| `2` | `imperial_palace_hall` | **Forbidden Imperial Dragon Hall** | Imperial Palace · Golden Throne Glow |
| `3` | `snow_summit_dojo` | **Kunlun Snow Peak Dojo** | Alpine Summit · Crisp Ice Twilight |
| `4` | `sunset_canyon_pavilion` | **Huashan Cliff Sunset Arena** | Cliffside Vista · Warm Amber Dusk |
| `5` | `neon_cyber_dojo` | **Neo-Shanghai Cyber Wushu Grid** | Futuristic Cyber · Synthwave Neon |
| `6` | `waterfall_grotto_shrine` | **Heavenly Waterfall Cavern** | Sacred Grotto · Aqua Bioluminescence |
| `7` | `cherry_blossom_garden` | **Sakura & Red Bridge Garden** | Blossom Courtyard · Plum Dusk Serenity |
| `8` | `volcanic_forge_foundry` | **Obsidian Shaolin Iron Forge** | Volcanic Foundry · Molten Magma Underglow |
| `9` | `celestial_cloud_palace` | **Tianmen Cloud Temple** | Celestial Realm · Luminous Sky Dawn |
| `10` | `autumn_maple_temple` | **Crimson Maple Meditation Yard** | Autumn Monastery · Burnt Sienna Sunset |

---

## Project Directory Structure

```text
chinese-kungfu-agent-simulasi-imitation-learning/
├── .htaccess
├── index.php
├── README.md
├── app/
│   ├── init.php
│   ├── config/
│   │   └── config.php                          # App branding & db_kungfu_ai MySQL credentials
│   ├── controller/
│   │   ├── api.php                             # REST API endpoints (/api/demonstrations, /training, /models)
│   │   ├── errors.php                          # HTTP error handler
│   │   ├── landing.php                         # Main Kungfu Studio MVC entry controller
│   │   └── setup.php                           # Database setup endpoint
│   ├── core/
│   │   ├── App.php                             # Clean-URL MVC router
│   │   ├── Controller.php                      # Base controller helper
│   │   ├── Database.php                        # PDO & MySQLi connector + SQL importer
│   │   └── Security.php                        # CSRF protection, input sanitization, headers
│   ├── model/
│   │   ├── Imitation_model.php                 # Imitation demos, training logs, and BC model storage
│   │   └── Walker_model.php                    # Base schema diagnostics & initializer
│   └── view/
│       ├── errors/
│       │   └── index.php                       # Error view
│       └── landing/
│           └── index.php                       # 3-Step Kungfu Studio UI & Environment Settings modal
├── database/
│   ├── db_kungfu_ai.sql                        # Base database schema (db_kungfu_ai)
│   ├── db_kungfu_ai_backup.sql                 # Full GitHub MySQL backup (all 12 tables + starter data)
│   ├── migration_imitation_learning.sql        # Imitation Learning tables (14D state, 9 Kung Fu actions)
│   └── seed_kungfu_starter.sql                 # Pre-seeded Kung Fu demo & ready active BC model
├── public/
│   ├── index.php                               # Front controller entrypoint
│   └── assets/
│       ├── css/
│       │   ├── errors.css                      # Error page styles
│       │   └── studio.css                      # Studio layout, environment cards & theme styles
│       ├── js/imitation/
│       │   ├── AutonomousAgent.js              # Webcam-free Step 3 Dual-Head inference controller
│       │   ├── BehaviorCloningModel.js         # Step 2 trainer orchestrator & artifact serializer
│       │   ├── CameraManager.js                # Webcam lifecycle & permissions
│       │   ├── DatasetManager.js               # Demonstration API client
│       │   ├── DatasetPreprocessor.js          # 14D state normalization & 12-joint pose target builder
│       │   ├── DemonstrationRecorder.js        # 8 Hz motion sequence recorder
│       │   ├── DemonstrationReplay.js          # Timeline demonstration player
│       │   ├── EnvironmentPresets.js           # Modular 3D arenas (1 Classic + 10 New environments)
│       │   ├── EnvironmentPreview3D.js         # Settings live interactive 3D preview renderer
│       │   ├── ImitationLab3DView.js           # Three.js Wushu humanoid renderer & dynamic stage switcher
│       │   ├── ImitationStudioApp.js           # Main frontend workflow coordinator
│       │   ├── ModelEvaluator.js               # 9x9 confusion matrix & F1 evaluator
│       │   ├── MotionInterpreter.js            # MoveNet Kung Fu stance, strike & jump classifier
│       │   ├── MotionLabEngine.js              # ~35.7 Hz humanoid kinematics & jump physics loop
│       │   ├── PoseCalibration.js              # Neutral stance calibration & body-scale normalization
│       │   ├── PoseDetector.js                 # MoveNet Lightning pose estimator
│       │   ├── PoseVisualizer.js               # 2D skeleton overlay renderer
│       │   ├── RobotActionController.js        # Single active source control arbiter
│       │   ├── StateObserver.js                # 14D normalized kinematic state encoder
│       │   └── bc-training-worker.js           # Web Worker TensorFlow.js Dual-Head trainer
│       └── vendor/                             # Offline Bootstrap, Chart.js, Three.js, TF.js & MoveNet
└── storage/
    └── bc_models/
        └── BCMDL-KUNGFU01.json                 # Ready pre-trained Dual-Head KungfuNet-BC model
```

---

## Installation Guide

1. **Copy the Project**
   Place the folder inside your local Apache web root, for example:
   ```text
   C:\xampp\htdocs\REINFORCEMENTLEARNING\chinese-kungfu-agent-simulasi-imitation-learning\
   ```

2. **Start Apache and MySQL**
   Open **XAMPP Control Panel** and start both **Apache** and **MySQL**.

3. **Configure Database Credentials (If Needed)**
   Edit `app/config/config.php` if your MySQL username or password differs from the defaults:
   ```php
   define("HOST_DB", "localhost");
   define("NAME_DB", "db_kungfu_ai");
   define("USER_DB", "root");
   define("PASS_DB", "");
   ```
   Ensure `storage/bc_models/` is writable by Apache/PHP.

4. **Database Setup (Auto-Setup or GitHub Full Backup Restore)**
   - **Automatic Setup:** Open your browser at:
     ```text
     http://localhost/REINFORCEMENTLEARNING/chinese-kungfu-agent-simulasi-imitation-learning/
     ```
     On the first request, the backend automatically creates `db_kungfu_ai`, imports `database/db_kungfu_ai.sql`, `database/migration_imitation_learning.sql`, and seeds `database/seed_kungfu_starter.sql` with a starter 9-pose **Chinese Kung Fu & Flying Jump Kick** demonstration plus the active **`KungfuNet-BC`** model.
   - **Single-File GitHub Backup Import (Optional):** In phpMyAdmin (or MySQL CLI), import `database/db_kungfu_ai_backup.sql` to create `db_kungfu_ai` and restore all 12 tables, demo frames, and model records in one step.

5. **Run Immediately Without Webcam**
   Open **Step 3 — Autonomous Agent**, verify **`KungfuNet-BC`** shows `Model Ready`, and click **Start** to watch the Wushu humanoid perform the Kung Fu forms and jumping kicks autonomously—or open **Settings -> 3D Environments** to preview and apply any of the 10 new 3D arenas.
