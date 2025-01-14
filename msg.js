import { exec } from 'child_process';

function showNotification(minutes, message) {
  setInterval(
    () => {
      exec(
        `osascript -e 'display notification "${message}" with title "Reminder"'`,
      );
    },
    minutes * 60 * 1000,
  );
}

showNotification(30, 'Kurze Pause');
