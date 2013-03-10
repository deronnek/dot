Ext.application({
    name: 'HelloExt',
    launch: function() {
    Ext.create('Ext.form.Panel', {
      //title: 'On The Wall',
      width: 330,
      bodyPadding: 10,
      renderTo: Ext.getBody(),
      items: [
        { 
          xtype: 'filefield',
          name: 'image',
          fieldLabel: 'Just jpg pretties',
          labelWidth: 50,
          msgTarget: 'side',
          allowBlank: false,
          anchor: '100%',
          buttonText: 'Analyze Color Distribution'
        },
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
              { boxLabel: 'Massive spew?', name: 'spew', inputValue: '1' },
              //{ boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true },
              { boxLabel: 'Outlines?',  name: 'outlines', inputValue: '2'},
              { boxLabel: 'Envelope 1', name: 'envelope1', inputValue: '3' },
              { boxLabel: 'Envelope 2', name: 'envelope2', inputValue: '4' },
          ]
        },
      ],
      buttons: [
        {
          text: 'Go!',
          handler: dot_analyze
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

function dot_analyze(a,b) 
{
  // a is the button, b is the event, "this" is somehow the 
  // Still not sure how to extract the info from the nested form objects
  console.log(a);
  console.log(b);
  console.log(this);
  //console.log(this.up('form').getForm());
  //var form = this.up('form').getValues();
  //console.log(form);
}
