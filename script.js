const octokit = new GitHub();

const form = document.getElementById('add-image-form');
const imagesContainer = document.getElementById('images');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const imageUrl = document.getElementById('image-url').value;
  const imageName = imageUrl.split('/').pop();

  const imageBlob = await octokit.git.createBlob({
    owner: 'PlutoJK',
    repo: 'art-portfolio',
    content: btoa(await (await fetch(imageUrl)).text()),
    encoding: 'base64'
  });

  const tree = await octokit.git.createTree({
    owner: 'PlutoJK',
    repo: 'art-portfolio',
    tree: [
      {
        path: imageName,
        mode: '100644',
        type: 'blob',
        sha: imageBlob.data.sha
      }
    ]
  });

 
const commit = await octokit.git.createCommit({
  owner: 'PlutoJK',
  repo: 'art-portfolio',
  message: 'Add image ' + imageName,
  tree: tree.data.sha,
  parents: []
});

const reference = await octokit.git.createRef({
  owner: 'PlutoJK',
  repo: 'art-portfolio',
  ref: 'refs/heads/master',
  sha: commit.data.sha
});

const image = document.createElement('img');
image.src = imageUrl;
imagesContainer.appendChild(image);
});
