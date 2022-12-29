const form = document.getElementById('add-image-form');
const imagesContainer = document.getElementById('images');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const imageUrl = document.getElementById('image-url').value;
  const imageName = imageUrl.split('/').pop();
  const apiUrl = 'https://api.github.com/repos/PlutoJK/art-portfolio/contents/' + imageName;
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

  const response = await fetch(corsProxyUrl + apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer <your-personal-access-token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'message': 'Add image ' + imageName,
      'content': btoa(await (await fetch(imageUrl)).text())
    })
  });

  if (response.ok) {
    const image = document.createElement('img';
    image.src = imageUrl;
    imagesContainer.appendChild(image);
  } else {
    alert('Error uploading image: ' + response.statusText);
  }
});

