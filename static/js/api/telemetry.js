export async function getLatestTelemetry(deviceId) {
    const res = await fetch(`/analysis/${deviceId}`);
    return await res.json();
}

export async function getHistory(deviceId) {
    const res = await fetch(`/telemetry/${deviceId}?limit=50`);
    return await res.json();
}