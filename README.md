
# Shell History Manager

## Overview
Shell History Manager is a Node.js script designed to streamline and clean up your shell history files. It works by removing duplicate entries from your shell history, currently supporting `zsh`, `bash`, `fish`, and `ksh`. Additionally, it creates a backup of your history file each time it's run, appending the current date and time to the backup file's name for easy reference.

## Features
- **Remove Duplicates**: Cleans your history file by removing duplicate entries.
- **Automatic Backup**: Creates a backup of your history file before making any changes.
- **Multiple Shell Support**: Compatible with `zsh`, `bash`, `fish`, and `ksh`.

## Getting Started

### Prerequisites
- Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

### Installation
1. Clone the repository or download the `historyManager.js` script.
   \```bash
   git clone https://github.com/aeskafi/HistoryManager.git
   \```
2. Navigate to the script's directory.
   \```bash
   cd shell-history-manager
   \```

### Usage
To run the script, simply execute it with Node.js:
\```bash
node historyManager.js
\```
The script will automatically detect your default shell, create a backup of your current history file, and remove any duplicate entries.

### Backup Files
Backup files are stored in the same location as your original history files. They are named in the format: `.shell_history.YYYY-MM-DDTHH-MM-SS.bak`, where `.shell_history` is your original history file name.

## Contributing
Contributions to improve Shell History Manager are welcome. Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

## Disclaimer
This script directly modifies shell history files. While it creates backups before making changes, it's always advisable to manually back up important data.

## Contact
For any queries or suggestions, feel free to contact me at [arham.eskafi@gmail.com].