# workshop_3:

You can view the generated effect by visiting the following link:

[View Workshop 3 Effect]( https://tianhui1112.github.io/workshop-3/)

## Project workflow

1.1: Setting global variables

```javascript
let images = []; // Used to store images
let collage = []; // Used to store the collage
```
**images**:  An empty array used to store all the loaded images.  
**collage**: Another empty array used to store the images and their positions in the collage.


1.2: Using the `preload()` function

```javascript
function preload() {
  // Load all images (replace with actual image paths)
  images.push(loadImage('images/image0.png'));
  images.push(loadImage('images/image1.png'));
  images.push(loadImage('images/image2.png'));
  images.push(loadImage('images/image3.png'));
  images.push(loadImage('images/image4.png'));
}
```
**preload() function**: A function provided by p5.js that executes before the setup() function. It is used to load resources.
**Usage**: We use the loadImage() function to load images and store them in the images array.


**Push**: The `push` method is used to add one or more elements to the end of an array. By doing so, we create an array that stores five images, structured as shown below:

```javascript
images = [image0, image1, image2, image3, image4];
```

1.3: Main function
```javascript
function setup() {
  createCanvas(400, 400);
  background(220);

  // Add each image to the collage and apply random adjustments
  for (let i = 0; i < images.length; i++) {
    let x = random(width);
    let y = random(height);
    let img = images[i];

    // Randomly resize the image
    img.resize(random(50, 150), 0);
    
    // Save the image object and coordinates to the collage array
    collage.push({ img: img, x: x, y: y });
  }

  // Use a timer to update the collage every 1 second
  setInterval(updateCollage, 1000); // Update the collage every 1 second
}
```
**createCanvas(400, 400)**: Creates a 400x400 canvas.  
**background(220)**: Sets the background color to gray (RGB value 220).  
**for loop**: Iterates through the `images` array, assigns each image a random (x, y) position, and stores the image object along with its position in the `collage` array.  
**img.resize(random(50, 150), 0)**: Randomly resizes the image with a width between 50 and 150, adjusting the height proportionally.  
**setInterval(updateCollage, 1000)**: Calls the `updateCollage()` function every 1 second to update the collage.

1.4: Create a custom drawing function.
```javascript
function draw() {
  // Clear the canvas and redraw the collage
  background(220);
  for (let i = 0; i < collage.length; i++) {
    let imgObj = collage[i];
    image(imgObj.img, imgObj.x, imgObj.y);
  }
}
```
**background(220)**: Clears the canvas before each drawing and resets the background color.
**for loop**: Loops through the `collage` array, retrieves each image object (`imgObj`), and uses the `image()` function to draw the image at the (x, y) position on the canvas.

1.3: Define a function to update the filter.
```javascript
function updateCollage() {
  // Randomly choose an image not to apply any filter
  let noFilterIndex = floor(random(images.length)); // Randomly select an image to not apply a filter
  let filters = [BLUR, INVERT, GRAY, POSTERIZE]; // Define four types of filters
  let filterIndex = 0;

  // Update each image
  for (let i = 0; i < collage.length; i++) {
    let imgObj = collage[i];
    
    // Randomly change the image position
    imgObj.x = random(width);
    imgObj.y = random(height);
    
    // Skip applying a filter if it's the selected image without a filter
    if (i === noFilterIndex) {
      continue;
    }

    // Randomly choose a filter
    let filterType = random(filters);
    
    // Determine the filter strength based on the filter type
    let filterAmount;
    if (filterType === POSTERIZE) {
      filterAmount = floor(random(2, 256)); // Ensure the POSTERIZE filter strength is within a valid range
    } else {
      filterAmount = random(1, 5); // For other filters, keep the original random range
    }

    // Apply the filter to the original image
    imgObj.img = images[i].get();  // Get the original image (to avoid applying multiple filters to the same image)
    imgObj.img.filter(filterType, filterAmount);
  }
}
```
We have loaded a total of 5 images. We use the `if` and `continue` keywords to select one image among the 5 without applying any filters, while the remaining 4 images have one of the four filters [BLUR, INVERT, GRAY, POSTERIZE] randomly applied with varying intensities.

## Final results

First, we load five images. Each time the program runs, the five images appear at different positions. We apply filters to four of the images and use the `setInterval` method we learned in the previous workshop to reselect four images every second, apply new filters to them, and update the positions and filter intensities for all five images.
