function updateTime() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  document.getElementById('time').textContent = timeStr;
}
setInterval(updateTime, 1000);
updateTime();

// Fetch IP address (IPv4) and location
Promise.all([
  fetch('https://api.ipify.org?format=json').then(r => r.json()),
  fetch('https://ipapi.co/json/').then(r => r.json())
])
  .then(([ipData, locData]) => {
    document.getElementById('ip').textContent = ipData.ip || locData.ip || 'Unknown';
    document.getElementById('location').textContent = `${locData.city}, ${locData.region}, ${locData.country_name}`;
  })
  .catch(() => {
    document.getElementById('ip').textContent = 'Unavailable';
    document.getElementById('location').textContent = 'Unavailable';
  });

const countNamespace = 'visitor-stats-demo';

const animals = ['Fox', 'Cat', 'Dog', 'Llama', 'Tiger', 'Koala', 'Panda', 'Hedgehog', 'Eagle', 'Otter'];
let animal = sessionStorage.getItem('animal');
if (!animal) {
  animal = animals[Math.floor(Math.random() * animals.length)];
  sessionStorage.setItem('animal', animal);
}
document.getElementById('yourAnimal').textContent = animal;

fetch(`https://api.countapi.xyz/update/${countNamespace}/animal-${animal}/?amount=1`)
  .then(() => Promise.all(
    animals.map(a =>
      fetch(`https://api.countapi.xyz/get/${countNamespace}/animal-${a}`)
        .then(r => r.json())
        .then(d => ({ name: a, count: d.value }))
        .catch(() => ({ name: a, count: 0 }))
    )
  ))
  .then(results => {
    const others = results
      .filter(r => r.count > 0 && r.name !== animal)
      .map(r => r.name);
    document.getElementById('otherAnimals').textContent = others.join(', ') || 'None';
  })
  .catch(() => {
    document.getElementById('otherAnimals').textContent = 'Unavailable';
  });

// Update total page views
fetch(`https://api.countapi.xyz/hit/${countNamespace}/pageviews`)
  .then(r => r.json())
  .then(data => {
    document.getElementById('pageViews').textContent = data.value;
  })
  .catch(() => {
    document.getElementById('pageViews').textContent = 'Unavailable';
  });

// Track live sessions
fetch(`https://api.countapi.xyz/update/${countNamespace}/sessions/?amount=1`)
  .then(() => fetch(`https://api.countapi.xyz/get/${countNamespace}/sessions`))
  .then(r => r.json())
  .then(data => {
    document.getElementById('liveSessions').textContent = data.value;
  })
  .catch(() => {
    document.getElementById('liveSessions').textContent = 'Unavailable';
  });

window.addEventListener('beforeunload', () => {
  navigator.sendBeacon(`https://api.countapi.xyz/update/${countNamespace}/sessions/?amount=-1`);
  navigator.sendBeacon(`https://api.countapi.xyz/update/${countNamespace}/animal-${animal}/?amount=-1`);
});
