export async function getAlarms() {
    const res = await fetch('/alarms/?limit=20');
    return await res.json();
}

export async function resolveAllAlarms() {
    return await fetch('/alarms/resolve-all', { method: 'POST' });
}