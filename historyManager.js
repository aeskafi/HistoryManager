/**
 * @fileoverview A script to manage shell history files by removing duplicates,
 * with automatic backup based on the date-time of execution.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

/**
 * Determines the file path for the shell history based on the user's default shell.
 * Supports zsh, bash, fish, and ksh.
 *
 * @returns {string} The file path of the shell history.
 * @throws Will throw an error if the shell is not supported.
 */
function getHistoryFilePath() {
  const shell = path.basename(process.env.SHELL);

  switch (shell) {
    case "zsh":
      return path.join(os.homedir(), ".zsh_history");
    case "bash":
      return path.join(os.homedir(), ".bash_history");
    case "fish":
      return path.join(os.homedir(), ".local/share/fish/fish_history");
    case "ksh":
      return path.join(os.homedir(), ".ksh_history");
    default:
      throw new Error(
        `Unsupported shell: ${shell}. This script supports zsh, bash, fish, and ksh.`
      );
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
  const historyFilePath = getHistoryFilePath();
  backupHistoryFile(historyFilePath);
  manageHistory(historyFilePath);
} catch (error) {
  console.error(error.message);
}
