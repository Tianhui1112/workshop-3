let images = []; // For storing images
let collage = []; // For storing the collage

function preload() {
  // Load all images (replace with actual image paths)
  images.push(loadImage('images/image0.png'));
  images.push(loadImage('images/image1.png'));
  images.push(loadImage('images/image2.png'));
  images.push(loadImage('images/image3.png'));
  images.push(loadImage('images/image4.png'));
}

function setup() {
  createCanvas(400, 400);
  background(220);

  // Add each image to the collage and randomly adjust the image
  for (let i = 0; i < images.length; i++) {
    let x = random(width);
    let y = random(height);
    let img = images[i];

    // Randomly scale the image
    img.resize(random(50, 150), 0);
    
    // Save the image object and coordinates to the collage array
    collage.push({ img: img, x: x, y: y });
  }

  // Use a timer to update the collage every second
  setInterval(updateCollage, 1000); // Update the collage every 1 second
}

function draw() {
  // Clear the canvas and redraw the collage
  background(220);
  for (let i = 0; i < collage.length; i++) {
    let imgObj = collage[i];
    image(imgObj.img, imgObj.x, imgObj.y);
  }
}

// Update the collage every second, randomly select one image without filter, apply filters to the other four
function updateCollage() {
  // Randomly select an image without applying a filter
  let noFilterIndex = floor(random(images.length)); // Randomly select an image to not apply a filter
  let filters = [BLUR, INVERT, GRAY, POSTERIZE]; // Define four filters
  let filterIndex = 0;

  // Update each image
  for (let i = 0; i < collage.length; i++) {
    let imgObj = collage[i];
    
    // Randomly change the image position
    imgObj.x = random(width);
    imgObj.y = random(height);
    
    // If it is the selected image not to apply a filter, skip the filter
    if (i === noFilterIndex) {
      continue;
    }

    // Randomly select a filter
    let filterType = random(filters);
    
    // Determine the filter strength based on the filter type
    let filterAmount;
    if (filterType === POSTERIZE) {
      filterAmount = floor(random(2, 256)); // Ensure POSTERIZE strength is within a valid range
    } else {
      filterAmount = random(1, 5); // For other filters, keep the original random range
    }

    // Apply the filter on the original image
    imgObj.img = images[i].get();  // Get the original image (to prevent applying the filter multiple times to the same image)
    imgObj.img.filter(filterType, filterAmount);
  }
}