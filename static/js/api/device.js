export async function getDevices() {
    const res = await fetch('/devices/');
    return await res.json();
}

export async function deleteDevice(id) {
    return await fetch(`/devices/${id}`, { method: 'DELETE' });
}