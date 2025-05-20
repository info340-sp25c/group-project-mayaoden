const STORAGE_KEY = "logs";

export function loadLogs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to load logs from localStorage", err);
    return [];
  }
}

export function saveLog(entry) {
  try {
    const logs = loadLogs();
    logs.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error("Failed to save log to localStorage", err);
  }
}

export function updateLog(id, updatedEntry) {
  try {
    const logs = loadLogs();
    const newLogs = logs.map(log => log.id === id ? { ...updatedEntry, id } : log);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
  } catch (err) {
    console.error("Failed to update log", err);
  }
}

export function deleteLog(id) {
  try {
    const logs = loadLogs();
    const newLogs = logs.filter(log => log.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
  } catch (err) {
    console.error("Failed to delete log", err);
  }
}
