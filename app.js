// TODO:
// 1. Eliminate sencha dependency
// 2. Finish implementing drawBooble
// 3. Add a form element to switch between adding new elements and morphing old ones
// 4. Have elements fly in from the origin

// Global variables. Not great, but hey it's javascript, what do you expect.
var filedata;
var svg;
var imgpixel;
var dots_width  = 700; // xextent in coleman's code
var dots_height = 500; // yextent in coleman's code
var counter     = 0;

var PI = 3.1415927;
function toradians(x)
{
  return x*((2*PI)/360);
}
function dot_clearcanvas() {
  d3.select("svg").remove();
  svg  = d3.select("#dotplot").insert("svg:svg", "h2")
           .attr("height", dots_height)
           .attr("width", dots_width)
           .style("background-color","black");
}

function dot_getvalues(form)
{
    ret = {
        dX:               1,
        dY:               1,
        multibooble:      2,
        wonk:             0,
        trumble:          5,
        flermox:          0,
        dotsize:          50,
        dotspace:         50,
        dotregularity:    10,
        random:           0,
        outlines:         0,
        envelope1:        1,
        envelope2:        1,
    }
    return ret;
/*
  // This gets you the number fields and the three sliders as strings
  formvars = form.getValues();

  ret = {
        dX:               Number(formvars.dX),
        dY:               Number(formvars.dY),
        multibooble:      Number(formvars.multibooble),
        wonk:             Number(formvars.wonk),
        trumble:          Number(formvars.trumble),
        flermox:          Number(formvars.flermox),
        dotsize:          Number(formvars.dotsize),
        dotspace:         Number(formvars.dotspace),
        dotregularity:    Number(formvars.dotregularity),
  }
  // this gets the checkbox array
  boxchecked = form.down('checkboxgroup').getChecked();

  ret.random    = 0;
  ret.outlines  = 0;
  ret.envelope1 = 0;
  ret.envelope2 = 0;

  for(i=0; i<boxchecked.length; i++) {
    if(boxchecked[i].name === "random") {
      ret.random = 1;
    }
    if(boxchecked[i].name === "outlines") {
      ret.outlines = 1;
    }
    if(boxchecked[i].name === "envelope1") {
      ret.envelope1 = 1;
    }
    if(boxchecked[i].name === "envelope2") {
      ret.envelope2 = 1;
    }
  }
  //console.log(ret);
  return ret;
*/
}

function drawDot(cx, cy, rx, ry, rgb, params)
{
  fill = rgb;
  if(params.outlines === 1) {
    fill = "none";
  }
  svg.append("svg:ellipse").attr("cx", cx).attr("cy",cy).attr("rx",rx).attr("ry",ry).style("stroke",rgb).style("fill",fill);
}

function drawBooble(x, y, rx, ry, rgb, params )
{
  var halfdotsize = params.dotsize/2.0;
  var cx = x - halfdotsize;
  var cy = y - halfdotsize;
  var rotater = 360.0/params.multibooble;

  var fill = rgb;
  var xranda = new Array;
  var yranda = new Array;
  var bra    = new Array;
  for(var booblecount=0; booblecount < params.multibooble; booblecount++) {
    var boobleradius = (Math.random() - 0.5) * (params.flermox * 0.2) * halfdotsize + 6.0 / params.trumble * halfdotsize;
    var xmod = halfdotsize * Math.cos(toradians(rotater * booblecount)) + x;
    var ymod = halfdotsize * Math.sin(toradians(rotater * booblecount)) + y;

    var xrand = Math.random();
    var yrand = Math.random();

    xranda.push(xrand);
    yranda.push(yrand);
    bra.push(boobleradius);
    svg.append("svg:ellipse")
    .attr("fx", xmod + (xrand - 0.5) * (params.wonk * 0.2) * halfdotsize + (halfdotsize - boobleradius))
    .attr("fy", ymod + (yrand - 0.5) * (params.wonk * 0.2) * halfdotsize + (halfdotsize - boobleradius))
          .attr("cx", 0)
          .attr("cy", 0)
    .attr("rx", 2.0 * boobleradius)
    .attr("ry", 2.0 * boobleradius)
    .style("stroke",rgb)
    .style("stroke-width",4)
    .style("fill",fill);
  }

  if(params.outlines === 1) {
    for(booblecount=0; booblecount < params.multibooble; booblecount++) {

      xmod = halfdotsize * Math.cos(toradians(rotater * booblecount)) + x;
      ymod = halfdotsize * Math.sin(toradians(rotater * booblecount)) + y;

      xrand        = xranda[booblecount];
      yrand        = yranda[booblecount];
      boobleradius = bra[booblecount];

      svg.append("ellipse")
      .attr("fx", xmod + (xrand - 0.5) * (params.wonk * 0.2) * halfdotsize + (halfdotsize - boobleradius))
      .attr("fy", ymod + (yrand - 0.5) * (params.wonk * 0.2) * halfdotsize + (halfdotsize - boobleradius))
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("rx", 2.0 * boobleradius)
      .attr("ry", 2.0 * boobleradius)
      .style("fill","black");
    }
  }
}

function rgbToHex(rgb) {
    var rgb = rgb.replace("rgb(","").replace(")","").split(",");
    var ret = "0x";
    for (var i=0; i<3; i++) {
        var hex = Number(rgb[i]).toString(16);
        if (hex.length < 2) {
            hex = "0"+hex;
        }
        ret += hex;
    }
    ret = parseInt(ret);
    return ret;
}

function drawDots(params)
{
//test = dots_height+100;
//console.log(test);
  if(!(params.random)) {
    for(iy=params.dotsize+params.dY; iy<dots_height; iy += params.dotspace) {
      for(ix=params.dotsize+params.dX; ix<dots_width; ix += params.dotspace) {
        counter += 1;
        rgb = get_random_htmlcolor_fromimage();
        cx = ix + Math.round((0.5 - Math.random()) * (100 - params.dotregularity)); // tx in coleman's code
        cy = iy + Math.round((0.5 - Math.random()) * (100 - params.dotregularity)); // ty in coleman's code
        rx = params.dotsize; // sx in coleman's code (size x, d3 uses radius x)
        ry = params.dotsize; // sy in coleman's code (size y, d3 uses radius y)
        // TODO: envelope code here
        if(params.envelope1) {
            rx = Math.abs(Math.sin(rgbToHex(rgb))) * rx;
            ry = Math.abs(Math.cos(rgbToHex(rgb))) * ry;
        }
        else if(params.envelope2) {
            rx = Math.abs(Math.sin(counter)*sx);
            ry = rx;
        }

        // If we only want one booble draw a dot
        if(params.multibooble == 1) {
            drawDot(cx, cy, rx, ry, rgb, params);
        }
        else {
            drawBooble(cx, cy, rx, ry, rgb, params);
        }
      }
    }
  }
  else {
    for(i=0; i<500; i++) {
      cx = Math.random()*dots_width;
      cy = Math.random()*dots_height;
      rgb = get_random_htmlcolor_fromimage();
      rx = params.dotsize;
      ry = params.dotsize;
      if(params.envelope1) {
          rx = Math.sin(rgbToHex(rgb))*rx;
          ry = Math.sin(rgbToHex(rgb))*ry;
      }
      else if(params.envelope2) {
        rx = Math.sin(i)*rx;
        ry = rx;
      }
      if(params.multibooble == 1) {
        drawDot(cx, cy, rx, ry, rgb, params.outlines);
      }
      else {
        drawBooble(cx, cy, rx, ry, rgb, params.outlines);
      }
    }
  }
    d3.selectAll("ellipse")
        .transition()
        .delay(function(d,i) {return i*100})
        .duration(300)
        .attr("fill", "steelblue")
        .attr("cx", function(d) {return this.getAttribute("fx")})
        .attr("cy", function(d) {return this.getAttribute("fy")});
}


function dot_analyze()
{
  console.log("App begin: called dot_analyze");
  //var params = dot_getvalues(this.up('form'));
  var params = dot_getvalues();
  // Generate random "image" for development
  imgpixel = Array.from({length: 1000}, () => Math.floor(Math.random() * 255));
  //console.log(imgpixel);
  drawDots(params);
  //console.log(params);

  // Disabled only for debug
  // if(undefined === filedata) { alert('Please select a file to be analyzed.'); return; }

  // I should be able to add colors directly from octal rgb values if I extract them like that
  // For now I'll probably just implement the drawing of the circles and change their colors later

  // Add a simple circle
  //svg.append("svg:circle").attr("cx", 50).attr("cy",50).attr("r",10);

  // Add a circle outline
  //svg.append("svg:circle").attr("cx", 100).attr("cy",100).attr("r",10).style("stroke","white").style("fill","black");
  //svg.append("svg:circle").attr("cx", 200).attr("cy",200).attr("r",20).style("stroke","#777777").style("fill","black");
}

function get_random_htmlcolor_fromimage()
{
  // array contains rgb and alpha values in order, so 4 slots per pixel
  //console.log(imgpixel);
  pixel = Math.random()*(imgpixel.length/4);
  idx   = Math.round(pixel)*4;

  red   = imgpixel[idx];
  green = imgpixel[idx+1];
  blue  = imgpixel[idx+2];

  ret = "rgb("+red+","+green+","+blue+")";

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
      var context = document.getElementById('new_canvas').getContext('2d');
      // Draw the image onto the canvas then read it back in
      // You *have* to use the onload method to draw the image -- once again, the asynchronous "bug"!
      // http://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas
      //console.log(context);
      var img     = new Image();
      img.src     = filedata;
      img.onload  = function() {
        context.drawImage(img, 0, 0);
        // This gets *all* pixels into an array (why not?)
        imgpixel = context.getImageData(0, 0, img.width, img.height).data;
          //console.log(imgpixel);

          /*
        Ext.getCmp('mainpanel').remove('dotplot');
        Ext.getCmp('mainpanel').add(
        {
          xtype:  'box',
          id:     'dotplot',
          bodypadding: 10,
          width:  dots_width,
          height: dots_height,
          autoEl: {
            tag:    'div',
          },
        });
        */

        //Ext.getCmp('mainpanel').suspendLayout = false;
        //Ext.getCmp('mainpanel').doLayout();


        // right here is where we can actually enable the go button as the image data have been loaded completely
        // Ext.getCmp('gobutton').enable();
        //get_random_htmlcolor();
      }
      //console.log(filedata);
      // This doesn't seem to work, either because the image isn't actually being rendered on the webpage
      // or it isn't in a data URI format (though it sure looks like one)
      // x,y,width,height
      // Have to sub

      // Loop over each pixel and invert the color.
/* http://stackoverflow.com/questions/667045/getpixel-from-html-canvas
      for (var i = 0, n = pix.length; i < n; i += 4) {
        pix[i  ] = 255 - pix[i  ]; // red
        pix[i+1] = 255 - pix[i+1]; // green
        pix[i+2] = 255 - pix[i+2]; // blue
        // i+3 is alpha (the fourth element)
      }
*/

    }
  }
}
