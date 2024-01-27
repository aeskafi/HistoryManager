/**
 * @fileoverview A script to manage shell history files by removing duplicates,
 * with automatic backup based on the date-time of execution.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

/**
 * Determines the file path for the shell history based on the user's default shell.
 * Supports zsh, bash, fish, and ksh.
 *
 * @returns {Object} An object containing the path of the shell history file and the shell type.
 * @throws {Error} Throws an error if the shell is not supported.
 */
function getHistoryFilePath() {
  const shell = path.basename(process.env.SHELL);

  switch (shell) {
    case "zsh":
      return { path: path.join(os.homedir(), ".zsh_history"), shell: "zsh" };
    case "bash":
      return { path: path.join(os.homedir(), ".bash_history"), shell: "bash" };
    case "fish":
      return { path: path.join(os.homedir(), ".local/share/fish/fish_history"), shell: "fish" };
    case "ksh":
      return { path: path.join(os.homedir(), ".ksh_history"), shell: "ksh" };
    default:
      throw new Error(
        `Unsupported shell: ${shell}. This script supports zsh, bash, fish, and ksh.`
      );
  }
}

/**
 * Reloads the shell history in the current terminal session based on the shell type.
 *
 * @param {string} shell - The type of the shell (e.g., 'bash', 'zsh').
 */
function reloadShellHistory(shell) {
  let command;
  if (shell === "bash") {
    command = "history -c && history -r";
  } else if (shell === "zsh") {
    command = "fc -R";
  } else if (shell === "fish") {
    command = "history --merge";
  } else if (shell === "ksh") {
    console.log("Automatic history reload is not supported for ksh.");
    return;
  }

  if (command) {
    // Execute the command in the user's default shell
    exec(command, { shell: process.env.SHELL }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error reloading history in ${shell}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error reloading history in ${shell}: ${stderr}`);
        return;
      }
      console.log(`${shell} history reloaded successfully.`);
      console.log(stdout);
    });
  }
}

/**
 * Creates a backup of the history file.
 *
 * @param {string} filePath - The file path of the history file to be backed up.
 */
function backupHistoryFile(filePath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFilePath = `${filePath}.${timestamp}.bak`;

  fs.copyFileSync(filePath, backupFilePath);
  console.log(`Original history file: ${filePath}`);
  console.log(`Backup created: ${backupFilePath}`);
}

/**
 * Removes duplicate entries from the shell history data.
 *
 * @param {string} data - The content of the history file.
 * @returns {string} The deduplicated history data.
 */
function deduplicateHistory(data) {
  const lines = data.split("\n");
  const uniqueCommands = new Set();
  const deduplicatedLines = [];

  for (const line of lines) {
    // Extracting command from the line (assuming format: ': <timestamp>:<command>')
    // This works for zsh; adjust the split logic for other shells if necessary
    const command = line.split(":").slice(-1)[0].trim();
    if (command && !uniqueCommands.has(command)) {
      uniqueCommands.add(command);
      deduplicatedLines.push(line);
    }
  }

  return deduplicatedLines.join("\n");
}

/**
 * Reads the shell history file, removes duplicate entries, and writes the unique entries back.
 *
 * @param {string} historyFilePath - The file path of the shell history.
 */
function manageHistory(historyFilePath) {
  fs.readFile(historyFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading history file:", err);
      return;
    }

    const output = deduplicateHistory(data);

    fs.writeFile(historyFilePath, output, "utf8", (err) => {
      if (err) {
        console.error("Error writing to history file:", err);
        return;
      }
      console.log("History file updated successfully.");
    });
  });
}

try {
  const { path: historyFilePath, shell } = getHistoryFilePath();
  backupHistoryFile(historyFilePath);
  manageHistory(historyFilePath);
  reloadShellHistory(shell); // Call this function after updating the history file
} catch (error) {
  console.error(error.message);
}
