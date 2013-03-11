// Bad deronne, bad.  global variable.
var filedata;

Ext.application({
    name: 'Dot',
    launch: function() {
    Ext.create('Ext.form.Panel', {
      width: 330,
      bodyPadding: 10,
      renderTo: Ext.getBody(),
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
          name: 'Multiblooble',
          fieldLabel: 'Multiblooble',
          value: 0,
          minValue: 0
        },
        {
          xtype: 'numberfield',
          name: 'Wonk',
          fieldLabel: 'Wonk',
          value: 0,
          minValue: 0
        },
        {
          xtype: 'numberfield',
          name: 'Trumble',
          fieldLabel: 'Trumble',
          value: 5,
          minValue: 0
        },
        {
          xtype: 'numberfield',
          name: 'Flermox',
          fieldLabel: 'Flermox',
          value: 0,
          minValue: 0
        },
        {
          xtype: 'sliderfield',
          name: 'dotsize',
          fieldLabel: 'Size',
          value: 1,
          minValue: 1,
          width: 250,
          value: 50,
          increment: 1,
          maxValue: 100
        },
        {
          xtype: 'sliderfield',
          name: 'dotspace',
          fieldLabel: 'Spacing',
          value: 1,
          minValue: 1,
          width: 250,
          value: 75,
          increment: 1,
          maxValue: 150
        },
        {
          xtype: 'sliderfield',
          name: 'regularity',
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
          handler: function() { }
        },
        {
          text: 'About',
          handler: function(){alert("{dot.}\n\nHello, deronne, you lucky dog, you.\nYou have somehow acquired my software.\nFree for your use.\nPatrick Coleman Saunders (c) 2006")}
        },
      ]
  });

    }
});

function dot_getvalues(form) 
{
  // This gets you the number fields and the three sliders
  ret = form.getValues();

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

  return ret;
}

function dot_analyze(a,b) 
{
  var params = dot_getvalues(this.up('form'));
  if(undefined === filedata) {alert('Please select a file to be analyzed.'); return}

  
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
      // Somehow, here, I need to enable the 'Go!' button
    }
  }
}
