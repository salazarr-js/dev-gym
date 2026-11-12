type DroneLog = [number, number];

function getCompromisedFiles(lastSafeDownload: number, droneLogs: DroneLog[]) {
  const compromised = new Set();

  droneLogs.forEach(([id, timestamp]) => {
    if (!compromised.has(id) && timestamp > lastSafeDownload)
      compromised.add(id);
  });

  return Array.from(compromised).sort();
}
