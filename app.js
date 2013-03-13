// Bad deronne, bad.  global variables?
var filedata;
var svg;

var  dots_height = 700; // yextent in coleman's code
var  dots_width  = 700; // xextent in coleman's code
Ext.application({
    name: 'Dot',
    launch: function() {
    Ext.create('Ext.form.Panel', {
      width: 330,
      bodyPadding: 10,
      //renderTo: Ext.getBody(),
      renderTo: 'dotctrl',
      items: [
/*
        { 
          xtype: 'filefield',
          name: 'image',
          fieldLabel: 'Just jpg pretties',
          labelWidth: 50,
          msgTarget: 'side',
          allowBlank: false,
          anchor: '100%',
          buttonText: 'Analyze Color Distribution',
          //validateOnChange: true,
          //validator: function() {console.log(this.up('buttons'))}
        },
*/
        {
          xtype: 'numberfield',
          //anchor: '100%',
          name: 'dX',
          fieldLabel: 'dX',
          value: 0,
          minValue: 0
        },
        {
          xtype: 'numberfield',
          name: 'dY',
          fieldLabel: 'dY',
          value: 0,
          minValue: 0
        },
        {
          xtype: 'numberfield',
          name: 'multibooble',
          fieldLabel: 'Multiblooble',
          value: 0,
          minValue: 0,
          maxValue: 10
        },
        {
          xtype: 'numberfield',
          name: 'wonk',
          fieldLabel: 'Wonk',
          value: 0,
          minValue: 0,
          maxValue: 10
        },
        {
          xtype: 'numberfield',
          name: 'trumble',
          fieldLabel: 'Trumble',
          value: 5,
          minValue: 0,
          maxValue: 10
        },
        {
          xtype: 'numberfield',
          name: 'flermox',
          fieldLabel: 'Flermox',
          value: 0,
          minValue: 0,
          maxValue: 10
        },
        {
          xtype: 'sliderfield',
          name: 'dotsize',
          fieldLabel: 'Size',
          minValue: 1,
          width: 250,
          value: 25,
          increment: 1,
          maxValue: 100
        },
        {
          xtype: 'sliderfield',
          name: 'dotspace',
          fieldLabel: 'Spacing',
          minValue: 1,
          width: 250,
          value: 50,
          increment: 1,
          maxValue: 150
        },
        {
          xtype: 'sliderfield',
          name: 'dotregularity',
          fieldLabel: 'Regularity',
          value: 1,
          minValue: 1,
          width: 250,
          value: 100,
          increment: 1,
          maxValue: 100
        },
/*
        {
          xtype: 'checkbox',
          boxLabel: 'Massive spew?',
          name: 'spew',
          id: 'spewcheckbox'
        },
        {
          xtype: 'checkbox',
          boxLabel: 'Outlines?',
          name: 'outline',
          id: 'outlinecheckbox'
        },
*/
        {
          xtype: 'checkboxgroup',
          //fieldLabel: 'Two Columns',
          // Arrange checkboxes into two columns, distributed vertically
          columns: 2,
          vertical: true,
          items: [
              { boxLabel: 'Massive spew?', name: 'random',      inputValue: '1' },
              //{ boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true },
              { boxLabel: 'Outlines?',     name: 'outlines',  inputValue: '2'},
              { boxLabel: 'Envelope 1',    name: 'envelope1', inputValue: '3' },
              { boxLabel: 'Envelope 2',    name: 'envelope2', inputValue: '4' },
          ]
        },
      ],
      buttons: [
        {
          text:         'Go!',
          //disabled:     true,
          handler:      dot_analyze
        },
        {
          text: 'Save',
          handler: function() { }
        },
        {
          text: 'Clear',
          handler: dot_clearcanvas
        },
        {
          text: 'About',
          handler: function(){alert("{dot.}\n\nHello, deronne, you lucky dog, you.\nYou have somehow acquired my software.\nFree for your use.\nPatrick Coleman Saunders (c) 2006")}
        },
      ]
  });
  /*
  svg  = d3.select("#dotspan").insert("svg:svg", "h2")
           .attr("height", dots_height)
           .attr("width", dots_width)
           .style("background-color","black");
           */
 
    }
});

function dot_clearcanvas() {
  d3.select("svg").remove();
  svg  = d3.select("#dotspan").insert("svg:svg", "h2")
           .attr("height", dots_height)
           .attr("width", dots_width)
           .style("background-color","black");
}

function dot_getvalues(form) 
{
/* {{{ */

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
  // this gets you the jpg pretties box
  ret.file = form.down().lastvalue; 

  // this gets the checkbox array
  boxchecked = form.down('checkboxgroup').getChecked();

  ret.random    = 0;
  ret.outlines  = 0;
  ret.envelope1 = 0;
  ret.envelope2 = 0;

  for(i=0; i<boxchecked; i++) {
    ret[i].name = 1;
  }
/* }}} */
  return ret;
}

function drawDot(cx, cy, rx, ry, rgb, asoutline) 
{
  fill = rgb;
  if(asoutline === 1) {
    fill = "black";
  }
  svg.append("svg:ellipse").attr("cx", cx).attr("cy",cy).attr("rx",rx).attr("ry",ry).style("stroke",rgb).style("fill",fill);
}

function drawDots(params) 
{
//test = dots_height+100;
//console.log(test);
  for(iy=params.dotsize+params.dY; iy<dots_height; iy += params.dotspace) {
    for(ix=params.dotsize+params.dX; ix<dots_width; ix += params.dotspace) {
      //counter += 1;
      // TODO: get a new set of colors somehow
      rgb = "steelblue";
      cx = ix + Math.round((0.5 - Math.random()) * (100 - params.dotregularity)); // sx in coleman's code
      cy = iy + Math.round((0.5 - Math.random()) * (100 - params.dotregularity)); // sy in coleman's code
      rx = params.dotsize; // tx in coleman's code
      ry = params.dotsize; // ty in coleman's code
      /*
      console.log(rx);
      console.log(ry);
      */
      // TODO: envelope code here
      if(params.envelope1) {
      }
      else if(params.envelope2) {
      }

      // This looks backwards to me, but it's how it is in Coleman's code
      if(params.multibooble) {
        drawDot(cx, cy, rx, ry, rgb, params.outlines);
      }
      else {
        drawBooble(cx, cy, rx, ry, rgb, params.outlines);
      }
    }
  }
}


function dot_analyze() 
{
console.log("called dot_analyze");
  var params = dot_getvalues(this.up('form'));
  // Get color information from the jpg somehow
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
      var img     = new Image();
      img.src     = filedata;
      img.onload  = function() {
        context.drawImage(img, 0, 0);
        data = context.getImageData(25, 25, 10, 10);
        console.log(data);
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

      // Somehow, here, I need to enable the 'Go!' button
    }
  }
}
