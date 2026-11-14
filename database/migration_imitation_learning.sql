-- Migration Schema for Kungfu Agent AI (14D State, 9 Kung Fu Classes)
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `rl_demonstrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `demo_code` varchar(64) NOT NULL,
  `session_id` int(11) DEFAULT NULL,
  `title` varchar(160) NOT NULL,
  `demonstrator_name` varchar(100) NOT NULL DEFAULT 'Mahasiswa Demonstrator',
  `input_source` enum('webcam','keyboard','hybrid') NOT NULL DEFAULT 'webcam',
  `flag_corner_code` varchar(10) NOT NULL DEFAULT 'NE',
  `episode_count` int(11) NOT NULL DEFAULT 1,
  `total_steps` int(11) NOT NULL DEFAULT 0,
  `total_reward` double NOT NULL DEFAULT 0,
  `success_episodes` int(11) NOT NULL DEFAULT 0,
  `success_rate` double NOT NULL DEFAULT 0,
  `avg_confidence` double NOT NULL DEFAULT 0,
  `state_dim` int(11) NOT NULL DEFAULT 14,
  `action_dim` int(11) NOT NULL DEFAULT 9,
  `sample_rate_hz` double NOT NULL DEFAULT 8,
  `calibration_json` longtext DEFAULT NULL,
  `action_distribution_json` longtext DEFAULT NULL,
  `status` enum('recording','saved','archived') NOT NULL DEFAULT 'saved',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `demo_code` (`demo_code`),
  KEY `idx_demo_status_created` (`status`,`created_at`),
  KEY `fk_rl_demo_session` (`session_id`),
  CONSTRAINT `fk_rl_demo_session` FOREIGN KEY (`session_id`) REFERENCES `training_sessions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `rl_demo_transitions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `demonstration_id` int(11) NOT NULL,
  `episode_id` int(11) NOT NULL DEFAULT 1,
  `step_number` int(11) NOT NULL,
  `timestamp_ms` bigint(20) NOT NULL,
  `state_json` longtext NOT NULL,
  `action` tinyint(4) NOT NULL,
  `confidence` double NOT NULL DEFAULT 1,
  `reward` double NOT NULL DEFAULT 0,
  `next_state_json` longtext NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0,
  `flag_corner` varchar(10) NOT NULL DEFAULT 'NE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_demo_ep_step` (`demonstration_id`,`episode_id`,`step_number`),
  KEY `idx_demo_action` (`demonstration_id`,`action`),
  CONSTRAINT `fk_rl_trans_demo` FOREIGN KEY (`demonstration_id`) REFERENCES `rl_demonstrations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `rl_training_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `training_code` varchar(64) NOT NULL,
  `demonstration_ids_json` longtext NOT NULL,
  `model_name` varchar(150) NOT NULL DEFAULT 'BC-Robot-Navigator',
  `architecture_json` longtext NOT NULL,
  `hyperparams_json` longtext NOT NULL,
  `normalization_json` longtext NOT NULL,
  `total_samples` int(11) NOT NULL DEFAULT 0,
  `train_samples` int(11) NOT NULL DEFAULT 0,
  `val_samples` int(11) NOT NULL DEFAULT 0,
  `epochs_planned` int(11) NOT NULL DEFAULT 50,
  `epochs_completed` int(11) NOT NULL DEFAULT 0,
  `final_loss` double DEFAULT NULL,
  `final_val_loss` double DEFAULT NULL,
  `final_accuracy` double DEFAULT NULL,
  `final_val_accuracy` double DEFAULT NULL,
  `confusion_matrix_json` longtext DEFAULT NULL,
  `class_distribution_json` longtext DEFAULT NULL,
  `status` enum('running','completed','cancelled','failed') NOT NULL DEFAULT 'running',
  `error_message` text DEFAULT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `training_code` (`training_code`),
  KEY `idx_bc_train_status` (`status`,`started_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `rl_training_metrics` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `training_session_id` int(11) NOT NULL,
  `epoch` int(11) NOT NULL,
  `loss` double NOT NULL,
  `accuracy` double NOT NULL,
  `val_loss` double DEFAULT NULL,
  `val_accuracy` double DEFAULT NULL,
  `learning_rate` double DEFAULT NULL,
  `recorded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_bc_metrics_epoch` (`training_session_id`,`epoch`),
  CONSTRAINT `fk_rl_metric_session` FOREIGN KEY (`training_session_id`) REFERENCES `rl_training_sessions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `rl_agent_models` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model_code` varchar(64) NOT NULL,
  `training_session_id` int(11) DEFAULT NULL,
  `model_name` varchar(150) NOT NULL,
  `version` varchar(32) NOT NULL DEFAULT '1.0.0',
  `algorithm` varchar(40) NOT NULL DEFAULT 'BEHAVIOR_CLONING',
  `state_dim` int(11) NOT NULL DEFAULT 14,
  `action_dim` int(11) NOT NULL DEFAULT 9,
  `architecture_json` longtext NOT NULL,
  `normalization_json` longtext NOT NULL,
  `metrics_json` longtext DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_size_bytes` int(11) NOT NULL DEFAULT 0,
  `checksum_sha256` varchar(64) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `model_code` (`model_code`),
  KEY `idx_bc_model_active` (`is_active`,`created_at`),
  KEY `fk_rl_model_train` (`training_session_id`),
  CONSTRAINT `fk_rl_model_train` FOREIGN KEY (`training_session_id`) REFERENCES `rl_training_sessions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `rl_demo_annotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `demonstration_id` int(11) NOT NULL,
  `episode_id` int(11) NOT NULL DEFAULT 1,
  `step_start` int(11) NOT NULL DEFAULT 0,
  `step_end` int(11) NOT NULL DEFAULT 0,
  `label` varchar(80) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_anno_demo_ep` (`demonstration_id`,`episode_id`),
  CONSTRAINT `fk_rl_anno_demo` FOREIGN KEY (`demonstration_id`) REFERENCES `rl_demonstrations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

