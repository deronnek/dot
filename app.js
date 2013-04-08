// Bad deronne, bad.  global variables?
var filedata;
var imgpixel = new Array();
var  dots_width  = 100; 
var  dots_height = 100;
var counter      = 2;
var context;
var draw_context;
var fullres = 0;

Ext.application({
    name: 'Dot',
    launch: function() {
    Ext.create('Ext.panel.Panel', {
      id: 'mainpanel',
      bodyPadding: 10,
      renderTo: 'dotctrl',
      layout: 'column',
      suspendLayout: true,

      items: [
        {
            xtype: 'button',
            bodyPadding: 10,
            padding: 10,
              text:         'Enhance!',
              //formBind:     true,
              disabled:     true,
              id: 'gobutton',
              handler:      enhance
            },

      ]
  });
  }
});

// Take the data, divide it into 4^counter parts, compute average colors for each part,
// plot them.
function enhance() {

  cells           = Math.pow(4,counter);
  pixels          = imgpixel.length/4;
  // In case they resize the window
  Ext.getCmp('mainpanel').doLayout();

  if(pixels <= cells) {
    cells = pixels;
    cell_width = 1;
    cell_height = 1;
    pixels_per_cell = 1;
    cells_per_row = dots_width;
    if(fullres === 1) {
      return;
    }
    fullres = 1;
    //Ext.getCmp('gobutton').disable();
  }
  else {
    pixels_per_cell = pixels/cells;
    cells_per_row   = Math.sqrt(cells);
    cell_width      = dots_width/cells_per_row;
    cell_height     = dots_height/cells_per_row;
  }
  row = 0;
  col = 0;

  console.log(cells,cells_per_row,cell_width,cell_height,pixels);

  //Ext.getCmp('svgarea').setLoading({msg: 'Enhancing...'});

  for(var i=0; i<cells; i++) {
    //start       = i*pixels_per_cell*4;
    //end         = start + pixels_per_cell*4;

    //imgx        = col*Math.sqrt(pixels_per_cell);
    //imgy        = row*Math.sqrt(pixels_per_cell);

    imgx        = col*cell_width;
    imgy        = row*cell_height;
    img_slice   = context.getImageData(imgx, imgy, cell_width, cell_height);
    //img_slice   = context.createImageData(cell_width, cell_height);
    pixel_slice = img_slice.data;

      
    rgb         = mean_color(pixel_slice, "imgdata");
    //rgb         = rand_color(pixel_slice, "imgdata");
    k = 0;
    for(var j=0; j<(cell_width*cell_height); j++) {
      img_slice.data[k]   = rgb.red;
      img_slice.data[k+1] = rgb.green;
      img_slice.data[k+2] = rgb.blue;
      k+=4;
    }

    x = col*cell_width;
    y = row*cell_height;

    draw_context = document.getElementById('ecanvas').getContext('2d');
    draw_context.putImageData(img_slice, imgx, imgy);

    col++;

    if((i+1)%cells_per_row === 0) {
      row++;
      col=0;
    }
  }
  //Ext.getCmp('svgarea').setLoading(false);

  counter += 1;
}

function dot_clearcanvas() {
  counter = 0;
}

function rand_color(color_array, format) 
{
  pixel = Math.random()*(color_array.length/4);
  idx   = Math.round(pixel)*4;

  red   = color_array[idx];
  green = color_array[idx+1];
  blue  = color_array[idx+2];

  if(format === "css_rgb") {
    ret = "rgb("+red+","+green+","+blue+")";
  }
  if(format === "imgdata") {
    ret = {red: red, green: green, blue: blue};
  }

  return(ret);

}

function mean_color(color_array, format) 
{
/* {{{ */
  mred   = 0; 
  mgreen = 0; 
  mblue  = 0; 
  for(var i=0; i<color_array.length; i+=4) {
    mred   += color_array[i];
    mgreen += color_array[i+1];
    mblue  += color_array[i+2];
    // fourth slot is alpha
  }

  mred   /= (color_array.length/4);
  mgreen /= (color_array.length/4);
  mblue  /= (color_array.length/4);

  mred   = parseInt(mred);
  mgreen = parseInt(mgreen);
  mblue  = parseInt(mblue);

  if(format === "css_rgb") {
    ret = "rgb("+mred+","+mgreen+","+mblue+")";
  }

  if(format === "imgdata") {
    ret = {red: mred, green: mgreen, blue: mblue};
  }
/* }}} */
  return(ret);
}

// Called after the file selection button is clicked and a file is chosen
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Should only be one file but the example had a loop
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
    
    reader.onload = function(evt) {
      filedata = evt.target.result;
      context = document.getElementById('new_canvas').getContext('2d');
      // Draw the image onto the canvas then read it back in
      // You *have* to use the onload method to draw the image -- once again, the asynchronous "bug"!
      // http://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas
      //console.log(context);
      var img     = new Image();
      img.src     = filedata;
      img.onload  = function() {
        context.drawImage(img, 0, 0);
        // This gets *all* pixels into an array (why not?)
        origimg     = context.getImageData(0, 0, img.width, img.height);
        imgpixel    = origimg.data;
        dots_width  = img.width;
        dots_height = img.height;

        Ext.getCmp('mainpanel').remove('ecanvas');

        Ext.getCmp('mainpanel').add(
        {
          xtype: 'box',
          bodypadding: 10,
          id:     'ecanvas',
          autoEl: {
            tag:    'canvas',
            height: dots_height,
            width:  dots_width
          },
        });

        Ext.getCmp('ecanvas').autoEl.width  = img.width;
        Ext.getCmp('ecanvas').autoEl.height = img.height;
        Ext.getCmp('mainpanel').suspendLayout = false;
        Ext.getCmp('mainpanel').doLayout();

        //draw_context = document.getElementById('ecanvas').getContext('2d');
        //draw_context.putImageData(origimg, 0, 0);
        enhance();


        // right here is where we can actually enable the go button as the image data have been loaded completely
        Ext.getCmp('gobutton').enable();
      }
    }
  }
}
