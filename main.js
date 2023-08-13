
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper("#slider", {
        loop: true,
        autoplay: {
            delay: 3000, // 3 seconds
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
});

 // Array of Rumi quotes
 const rumiQuotes = [
    {
        text: "Do not be satisfied with the stories that come before you. Unfold your own myth.",
        author: "Rumi"
    },
    {
        text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
        author: "Rumi"
    },
    {
        text: "Love rests on no foundation. It is an endless ocean, with no beginning or end.",
        author: "Rumi"
    },
    {
        text: "I am neither of the East nor of the West, no boundaries exist within my breast.",
        author: "Rumi"
    },
    {
        text: "A king is not a king without the company of the righteous.",
        author: "Adil Shah"
    },
    {
        text: "Fortunate indeed are those who go on a pilgrimage to their ancestral tombs and ask for mercy.",
        author: "Adil Shah"
    },
];

// Array of themes
const themes = ['theme1', 'theme2'];

// Function to display a random quote and change the theme
function displayRandomQuoteAndTheme() {
const randomQuoteIndex = Math.floor(Math.random() * rumiQuotes.length);
const randomThemeIndex = Math.floor(Math.random() * themes.length);

const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const bodyElement = document.body;

quoteTextElement.textContent = rumiQuotes[randomQuoteIndex].text;
quoteAuthorElement.textContent = rumiQuotes[randomQuoteIndex].author;

bodyElement.className = themes[randomThemeIndex];
}

// Call the function to display a random quote and change the theme every 5 seconds
setInterval(displayRandomQuoteAndTheme, 5000);
window.onload = displayRandomQuoteAndTheme;

// Initialize Firebase
const firebaseConfig = {
apiKey: "AIzaSyAz4m65JLvr4DxJq7Unx15_DLcOBXDpuiM",
authDomain: "bijapurheritage-75f21.firebaseapp.com",
projectId: "bijapurheritage-75f21",
storageBucket: "bijapurheritage-75f21.appspot.com",
messagingSenderId: "834461952053",
appId: "1:834461952053:web:4e43d3b63b9d9d1f7c697c",
measurementId: "G-2JNCSTV9XD"
};

firebase.initializeApp(firebaseConfig);

// Get references to storage and database
var storage = firebase.storage();
var database = firebase.database();

function uploadImage() {
    var fileInput = document.getElementById('imageInput');
    var file = fileInput.files[0];
  
    // Create a reference to store the image in Firebase Storage
    var storageRef = storage.ref('city_images/' + file.name);
  
    // Upload the file
    var uploadTask = storageRef.put(file);
  
    // Listen for state changes, errors, and completion of the upload
    uploadTask.on(
      'state_changed',
      null,
      function(error) {
        console.error('Upload failed:', error);
        // Display failure message
        displayUploadMessage('danger', 'Image upload failed.');
      },
      function() {
        // Upload completed successfully, now store the image URL in the database
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          saveImageToDatabase(downloadURL);
          // Display success message
          displayUploadMessage('success', 'Image uploaded successfully.');
        }).catch(function(error) {
          console.error('Error getting download URL:', error);
          // Display failure message
          displayUploadMessage('danger', 'Error getting download URL.');
        });
      }
    );
  }
  

function saveImageToDatabase(imageURL) {
// Generate a unique ID for the image entry
var imageId = database.ref('images').push().key;

// Save the image URL in the database
database.ref('images/' + imageId).set({
imageURL: imageURL
});
}


// Reference to Firebase Storage
var storage = firebase.storage();
var storageRef = storage.ref("city_images");

// Function to display image
function displayImage(imageRef) {
  imageRef.getDownloadURL().then(function(url) {
    var imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.style.maxWidth = '300px'; 
    imageElement.classList.add('img-fluid', 'rounded'); 
    imageElement.style.borderRadius = '10px'; 
    document.getElementById('imageContainer').appendChild(imageElement);
  }).catch(function(error) {
    console.error('Error getting download URL:', error);
  });
}

// List all images in storageRef and display them
storageRef.listAll().then(function(result) {
  result.items.forEach(function(imageRef) {
    displayImage(imageRef);
  });
}).catch(function(error) {
  console.error('Error listing images:', error);
});

function displayUploadMessage(type, message) {
    var uploadMessage = document.getElementById('uploadMessage');
    uploadMessage.textContent = message;
    uploadMessage.className = 'alert alert-' + type;
    uploadMessage.style.display = 'block';
  }

  const url = 'https://instagram-scraper-2022.p.rapidapi.com/ig/hashtag/?hashtag=vijaypur';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ce9adaa59amsh62d075b705434bap11b1f5jsn747fc54155ef',
      'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com'
    }
  };
  
  async function fetchAndEmbedInstagramPost() {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      if (data.data && data.data.top.sections && data.data.top.sections.length > 0) {
        const postUrl = data.data.top.sections[0].layout_content.medias[0].media.code;
        const iframeUrl = `https://www.instagram.com/p/${postUrl}/embed`;
  
      // Embed the Instagram post in an iframe
      const iframe = document.createElement('iframe');
      iframe.src = iframeUrl;
      iframe.width = '320'; // Set iframe width
      iframe.height = '500'; // Set iframe height
      document.getElementById('instagramEmbed').appendChild(iframe);
    } else {
      console.error("Data structure is not as expected.");
    }
  } catch (error) {
    console.error(error);
  }
}
  
  // Call the function to fetch and embed Instagram post
  fetchAndEmbedInstagramPost();