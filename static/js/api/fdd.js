export async function getFDDStats() {
    const res = await fetch('/fdd/stats');
    return await res.json();
}