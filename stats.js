function updateTime() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  document.getElementById('time').textContent = timeStr;
}
setInterval(updateTime, 1000);
updateTime();

fetch('https://ipapi.co/json/')
  .then(r => r.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip || 'Unknown';
    document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
  })
  .catch(() => {
    document.getElementById('ip').textContent = 'Unavailable';
    document.getElementById('location').textContent = 'Unavailable';
  });
