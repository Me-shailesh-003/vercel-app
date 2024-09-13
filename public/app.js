// Admin login validation
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'me_shailesh_003' && password === 'S!003') {
    window.location.href = 'post-shayari.html';
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

// Post Shayari to the server
document.getElementById('shayariForm')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const poet = document.getElementById('poet').value;
  const shayari = document.getElementById('shayari').value;

  fetch('http://localhost:3000/api/shayari', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ poet, shayari })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    window.location.href = 'index.html'; // Redirect to the homepage after successful posting
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error posting the shayari. Please try again.');
  });
});

// Display Shayari on Home Page
function displayShayari() {
  fetch('http://localhost:3000/api/shayari')
    .then(response => response.json())
    .then(shayariList => {
      const shayariContainer = document.getElementById('shayariList');
      if (shayariList.length > 0) {
        shayariContainer.innerHTML = ''; // Clear existing shayari
        shayariList.forEach(shayariObj => {
          const shayariCard = `
            <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">${shayariObj.poet}</h5>
                  <p class="card-text">${shayariObj.shayari}</p>
                </div>
              </div>
            </div>
          `;
          shayariContainer.innerHTML += shayariCard;
        });
      } else {
        shayariContainer.innerHTML = '<p class="text-center">No shayari available at the moment.</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('shayariList').innerHTML = '<p class="text-center">Failed to load shayari. Please try again later.</p>';
    });
}

if (document.getElementById('shayariList')) {
  displayShayari();
}
