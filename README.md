# Shell History Manager

## Overview
Shell History Manager is a Node.js script designed to streamline and clean up your shell history files. It supports `zsh`, `bash`, `fish`, and `ksh` shells. The script removes duplicate entries from your shell history and automatically creates a backup of your history file based on the date-time of execution.

## Features
- **Automatic Backup**: Creates a timestamped backup of your history file before making changes.
- **Remove Duplicates**: Cleans up your history file by removing duplicate entries.
- **Multiple Shell Support**: Compatible with `zsh`, `bash`, `fish`, and `ksh`.

## Prerequisites
- Node.js installed on your machine. If not already installed, download it from [Node.js official website](https://nodejs.org/).

## Installation
1. Clone the repository or download the `historyManager.js` script.
   \```bash
   git clone https://github.com/aeskafi/HistoryManager.git
   \```
2. Navigate to the directory containing the script.
   \```bash
   cd shell-history-manager
   \```

## Usage
Execute the script with Node.js:
\```bash
node historyManager.js
\```
This will process your shell history file based on your default shell, remove duplicate entries, and create a backup.

## Backup Files
Backup files are stored in the same directory as your original history files. They are named in the format: `.shell_history.YYYY-MM-DDTHH-MM-SS.bak`, where `.shell_history` is the name of your original history file.

## Contributing
Contributions to improve Shell History Manager are always welcome. Feel free to fork the repository and submit pull requests.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Disclaimer
This script directly modifies shell history files. While it makes backups before any changes, it's advisable to manually back up important data.

## Contact
For any queries or suggestions, reach out at [arham.eskafi@gmail.com].