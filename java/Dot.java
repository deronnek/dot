import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.geom.AffineTransform;
import java.awt.geom.Area;
import java.awt.geom.Ellipse2D.Double;
import java.awt.geom.Ellipse2D.Float;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.net.MalformedURLException;
import javax.imageio.ImageIO;
import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JSpinner;
import javax.swing.KeyStroke;
import javax.swing.SpinnerNumberModel;
import javax.swing.SwingUtilities;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class Dot
  extends JPanel
  implements ActionListener, ItemListener, ChangeListener
{
  JFrame frame;
  JMenuBar menu;
  JMenu doMenu;
  JMenuItem doQuit;
  JMenuItem doOpen;
  JMenuItem doSave;
  JMenuItem doAbout;
  JButton generate;
  JButton clear;
  JCheckBox randomcheck;
  JCheckBox outlinecheck;
  JCheckBox env1;
  JCheckBox env2;
  JSlider dotsize;
  JSlider dotspacing;
  JSlider dotregularity;
  JSpinner multibooble;
  JSpinner wonk;
  JSpinner trumble;
  JSpinner flermox;
  JSpinner dotdisplacementx;
  JSpinner dotdisplacementy;
  JFileChooser fc;
  JFileChooser fcopen;
  JPanel west;
  JLabel filename;
  JLabel dotsizeLabel;
  JLabel dotregularityLabel;
  JLabel dotspacingLabel;
  JLabel dotdisplacementLabelx;
  JLabel dotdisplacementLabely;
  JLabel multiboobleLabel;
  JLabel wonkLabel;
  JLabel flermoxLabel;
  JLabel trumbleLabel;
  int xextent = 700;
  int yextent = 700;
  Dimension drawWindowSize = new Dimension(xextent, yextent);
  Dimension panelwide = new Dimension(200, Integer.MAX_VALUE);
  Image source;
  Graphics2D g;
  Graphics2D destinationgraphics;
  dotCanvas gcanvas;
  BufferedImage destination;
  colorDistribution colorset;
  RenderingHints how = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
  int global_dotdisplacementx = 0;
  int global_dotdisplacementy = 0;
  int global_dotspacing = 50;
  int global_dotregularity = 100;
  int global_dotsize = 50;
  int global_wonk = 0;
  int global_multibooble = 0;
  double global_halfdot = 25.0D;
  int global_trumble = 5;
  int global_flermox = 0;
  int counter = 0;
  boolean isRandom = false;
  boolean isOutline = false;
  boolean envelope1 = false;
  boolean envelope2 = false;
  Font helvey = new Font("SanSerif", 1, 14);
  Color eggplant = new Color(75, 13, 81);
  
  public Dot(JFrame frame)
  {
    colorset = new colorDistribution();
    setLayout(new BorderLayout());
    
    this.frame = frame;
    
    menu = new JMenuBar();
    menu.setFont(helvey);
    doMenu = new JMenu("Do.");
    doMenu.setMnemonic(68);
    
    doQuit = new JMenuItem("Quit. Please.", 81);
    doQuit.setAccelerator(KeyStroke.getKeyStroke(81, 2));
    doQuit.setActionCommand("cmdQuit");
    doQuit.addActionListener(this);
    
    doOpen = new JMenuItem("Analyze Colors...", 65);
    doOpen.setAccelerator(KeyStroke.getKeyStroke(65, 2));
    doOpen.setActionCommand("cmdOpen");
    doOpen.addActionListener(this);
    
    doSave = new JMenuItem("Save this...", 83);
    doSave.setAccelerator(KeyStroke.getKeyStroke(83, 2));
    doSave.setActionCommand("cmdSave");
    doSave.addActionListener(this);
    
    doAbout = new JMenuItem("About...", 65);
    doAbout.setAccelerator(KeyStroke.getKeyStroke(65, 2));
    doAbout.setActionCommand("cmdAbout");
    doAbout.addActionListener(this);
    
    menu.add(doMenu);
    doMenu.add(doOpen);
    doMenu.add(doSave);
    doMenu.addSeparator();
    doMenu.add(doQuit);
    doMenu.addSeparator();
    doMenu.add(doAbout);
    
    generate = new JButton("Go!");
    generate.setEnabled(false);
    generate.setActionCommand("cmdGenerate");
    generate.addActionListener(this);
    generate.setFont(helvey);
    clear = new JButton("Clear");
    clear.setEnabled(true);
    clear.setActionCommand("cmdClear");
    clear.addActionListener(this);
    clear.setFont(helvey);
    
    JPanel subx = new JPanel();
    subx.setLayout(new BoxLayout(subx, 1));
    JPanel sub0 = new JPanel();
    sub0.setLayout(new GridLayout(0, 2));
    
    JPanel sub5 = new JPanel();
    sub5.setLayout(new FlowLayout(0));
    
    JLabel hello = new JLabel("dot.", 2);
    hello.setFont(new Font("SanSerif", 1, 64));
    hello.setForeground(eggplant);
    
    JLabel filenameLabel = new JLabel("Palette source:", 2);
    
    filenameLabel.setFont(helvey);
    filename = new JLabel("<none specified>", 2);
    filename.setFont(helvey);
    filename.setForeground(eggplant);
    subx.add(hello);
    subx.add(filenameLabel);
    subx.add(filename);
    sub5.add(subx);
    
    dotsizeLabel = new JLabel("Size: 50", 0);
    dotsizeLabel.setAlignmentX(0.5F);
    dotsizeLabel.setFont(helvey);
    
    dotsize = new JSlider(0, 1, 100, 50);
    dotsize.addChangeListener(this);
    dotsize.setName("dotsize");
    dotsize.setMajorTickSpacing(25);
    dotsize.setFont(helvey);
    dotsize.setPaintTicks(true);
    dotsize.setPaintLabels(true);
    dotsize.setBorder(BorderFactory.createEmptyBorder(0, 0, 10, 0));
    
    dotspacingLabel = new JLabel("Spacing: 75", 0);
    dotspacingLabel.setAlignmentX(0.5F);
    dotspacingLabel.setFont(helvey);
    dotspacing = new JSlider(0, 1, 150, 75);
    dotspacing.addChangeListener(this);
    dotspacing.setFont(helvey);
    dotspacing.setName("dotspacing");
    dotspacing.setMajorTickSpacing(25);
    dotspacing.setPaintTicks(true);
    dotspacing.setPaintLabels(true);
    
    dotregularityLabel = new JLabel("Regularity: absolute", 0);
    dotregularityLabel.setAlignmentX(0.5F);
    dotregularityLabel.setFont(helvey);
    dotregularity = new JSlider(0, 0, 100, 100);
    dotregularity.addChangeListener(this);
    dotregularity.setFont(helvey);
    dotregularity.setName("dotregularity");
    dotregularity.setMajorTickSpacing(25);
    dotregularity.setPaintTicks(true);
    dotregularity.setPaintLabels(true);
    
    int min = -50;int max = 50;int val = 0;int step = 1;
    int val2 = 5;
    SpinnerNumberModel dxdymodel = new SpinnerNumberModel(val, min, max, step);
    SpinnerNumberModel dxdymodel2 = new SpinnerNumberModel(val, min, max, step);
    
    dotdisplacementx = new JSpinner(dxdymodel);
    dotdisplacementx.addChangeListener(new Dot.SpinnerListener());
    dotdisplacementy = new JSpinner(dxdymodel2);
    dotdisplacementy.addChangeListener(new Dot.SpinnerListener());
    dotdisplacementLabelx = new JLabel("dX: ", 0);
    dotdisplacementLabelx.setAlignmentX(0.0F);
    dotdisplacementLabelx.setFont(helvey);
    dotdisplacementLabely = new JLabel("dY: ", 0);
    dotdisplacementLabely.setAlignmentX(0.0F);
    dotdisplacementLabely.setFont(helvey);
    
    int min2 = 0;int max2 = 10;
    int min1 = 1;
    SpinnerNumberModel model2 = new SpinnerNumberModel(val, min2, max2, step);
    SpinnerNumberModel model22 = new SpinnerNumberModel(val, min2, max2, step);
    SpinnerNumberModel modeltrumble = new SpinnerNumberModel(val2, min1, max2, step);
    SpinnerNumberModel modelflermox = new SpinnerNumberModel(val, min2, max2, step);
    multibooble = new JSpinner(model2);
    multibooble.addChangeListener(new Dot.SpinnerListener());
    wonk = new JSpinner(model22);
    wonk.addChangeListener(new Dot.SpinnerListener());
    trumble = new JSpinner(modeltrumble);
    trumble.addChangeListener(new Dot.SpinnerListener());
    flermox = new JSpinner(modelflermox);
    flermox.addChangeListener(new Dot.SpinnerListener());
    flermoxLabel = new JLabel("Flermox: ", 0);
    flermoxLabel.setAlignmentX(0.0F);
    flermoxLabel.setFont(helvey);
    trumbleLabel = new JLabel("Trumble: ", 0);
    trumbleLabel.setAlignmentX(0.0F);
    trumbleLabel.setFont(helvey);
    wonkLabel = new JLabel("Wonk: ", 0);
    wonkLabel.setAlignmentX(0.0F);
    wonkLabel.setFont(helvey);
    multiboobleLabel = new JLabel("Multiblooble: ", 0);
    multiboobleLabel.setAlignmentX(0.0F);
    multiboobleLabel.setFont(helvey);
    
    sub0.add(dotdisplacementLabelx);sub0.add(dotdisplacementx);
    sub0.add(dotdisplacementLabely);sub0.add(dotdisplacementy);
    sub0.add(multiboobleLabel);sub0.add(multibooble);
    sub0.add(wonkLabel);sub0.add(wonk);
    sub0.add(trumbleLabel);sub0.add(trumble);
    sub0.add(flermoxLabel);sub0.add(flermox);
    
    randomcheck = new JCheckBox("Massive Spew?", false);
    randomcheck.setFont(helvey);
    randomcheck.addItemListener(this);
    outlinecheck = new JCheckBox("Outlines?", false);
    outlinecheck.setFont(helvey);
    outlinecheck.addItemListener(this);
    env1 = new JCheckBox("Envelope 1", false);
    env1.setFont(helvey);
    env1.addItemListener(this);
    env2 = new JCheckBox("Envelope 2", false);
    env2.setFont(helvey);
    env2.addItemListener(this);
    
    gcanvas = new dotCanvas();
    gcanvas.setPreferredSize(drawWindowSize);
    
    gcanvas.setBackground(Color.black);
    
    gcanvas.setVisible(true);
    g = ((Graphics2D)gcanvas.getGraphics());
    destination = new BufferedImage(xextent, yextent, 1);
    destinationgraphics = ((Graphics2D)destination.getGraphics());
    if (destinationgraphics != null) {
      destinationgraphics.addRenderingHints(how);
    }
    gcanvas.repaint();
    
    west = new JPanel();
    west.setLayout(new BoxLayout(west, 1));
    west.setVisible(true);
    west.add(sub5);
    west.add(sub0);
    
    west.add(dotsizeLabel);
    west.add(dotsize);
    west.add(dotspacingLabel);
    west.add(dotspacing);
    west.add(dotregularityLabel);
    west.add(dotregularity);
    JPanel sub1 = new JPanel();
    sub1.setLayout(new FlowLayout(0));
    
    sub1.add(generate);
    
    sub1.add(clear);
    west.add(sub1);
    
    JPanel sub2 = new JPanel();
    sub2.setLayout(new FlowLayout(0));
    JPanel sub3 = new JPanel();
    sub3.setLayout(new BoxLayout(sub3, 1));
    JPanel sub8 = new JPanel();
    sub8.setLayout(new BoxLayout(sub8, 1));
    sub3.add(randomcheck);
    sub3.add(outlinecheck);
    sub8.add(env1);
    sub8.add(env2);
    sub2.add(sub3);
    sub2.add(sub8);
    west.add(sub2);
    
    add(menu, "First");
    
    add(west, "Before");
    add(gcanvas, "After");
  }
  
  private static void createAndShowGUI()
  {
    JFrame.setDefaultLookAndFeelDecorated(true);
    
    JFrame frame = new JFrame("Dot");
    frame.setDefaultCloseOperation(3);
    Dot newContentPane = new Dot(frame);
    newContentPane.setOpaque(true);
    frame.setContentPane(newContentPane);
    
    frame.pack();
    frame.setVisible(true);
  }
  
  public void actionPerformed(ActionEvent e)
  {
    if ("cmdQuit".equals(e.getActionCommand()))
    {
      System.exit(0);
    }
    else
    {
      if ("cmdSave".equals(e.getActionCommand()))
      {
        if (fc == null) {
          fc = new JFileChooser();
        } else {
          fc.setVisible(true);
        }
        int returnVal = fc.showDialog(this, "You can only save *.png files!");
        if (returnVal == 0)
        {
          File file = fc.getSelectedFile();
          try
          {
            ImageIO.write(destination, "png", file);
          }
          catch (IOException e1)
          {
            System.out.println("CANNOT WRITE FILE!");
            e1.printStackTrace();
          }
          System.out.println("Saving: " + file.getName() + ".\n");
        }
        else
        {
          System.out.println("Save command cancelled by user.\n");
        }
        return;
      }
      if ("cmdAbout".equals(e.getActionCommand()))
      {
        Object[] listt = { "{dot.}", " ", 
          "Hello, " + System.getProperty("user.name") + ", you lucky dog, you.", 
          "You have somehow acquired my software.", 
          "Free for your use.", 
          "Patrick Coleman Saunders (c) 2006" };
        JOptionPane.showMessageDialog(west, listt, "About {dot.}", -1);
        
        gcanvas.getGraphics().drawImage(destination, 0, 0, xextent, yextent, null);
        return;
      }
      if ("cmdGenerate".equals(e.getActionCommand()))
      {
        drawDots();
      }
      else if ("cmdClear".equals(e.getActionCommand()))
      {
        if (g == null)
        {
          g = ((Graphics2D)gcanvas.getGraphics());
          g.addRenderingHints(how);
        }
        if (destinationgraphics == null)
        {
          destinationgraphics = ((Graphics2D)destination.getGraphics());
          destinationgraphics.addRenderingHints(how);
        }
        g.setBackground(Color.black);
        destinationgraphics.setBackground(Color.black);
        destinationgraphics.clearRect(0, 0, xextent, yextent);
        gcanvas.setBackground(Color.black);
        gcanvas.repaint();
      }
      else if ("cmdOpen".equals(e.getActionCommand()))
      {
        if (fcopen == null)
        {
          fcopen = new JFileChooser();
          fcopen.addChoosableFileFilter(new ImageFilter());
          fcopen.setAcceptAllFileFilterUsed(false);
          fcopen.setFileView(new ImageFileView());
          fcopen.setAccessory(new ImagePreview(fcopen));
        }
        else
        {
          fcopen.setVisible(true);
        }
        int returnVal = fcopen.showDialog(this, "Analyze Color Distribution");
        if (returnVal == 0)
        {
          File file = fcopen.getSelectedFile();
          filename.setText("Building colorpalette...");
          try
          {
            source = Toolkit.getDefaultToolkit().createImage(file.toURL());
          }
          catch (MalformedURLException e1)
          {
            System.out.println("Cannot access file!");
            e1.printStackTrace();
          }
          if (colorset.isReady) {
            colorset.reset();
          }
          while (!Toolkit.getDefaultToolkit().prepareImage(source, -1, -1, null)) {}
          colorset.build(source);
          filename.setText(file.getName());
          generate.setEnabled(true);
        }
        else
        {
          System.out.println("Open command cancelled by user.\n");
        }
        fcopen.setSelectedFile(null);
        return;
      }
    }
  }
  
  public void drawDot(float x, float y, Color rgb, float sizex, float sizey)
  {
    g.setColor(rgb);
    destinationgraphics.setColor(rgb);
    if (!isOutline)
    {
      g.fill(new Ellipse2D.Float(x, y, sizex, sizey));
      destinationgraphics.fill(new Ellipse2D.Float(x, y, sizex, sizey));
    }
    else
    {
      g.draw(new Ellipse2D.Float(x, y, sizex, sizey));
      destinationgraphics.draw(new Ellipse2D.Float(x, y, sizex, sizey));
    }
  }
  
  public void drawBooble(float x, float y, Color rgb, float sizex, float sizey)
  {
    g.setColor(rgb);
    destinationgraphics.setColor(rgb);
    double cx = x - global_halfdot;
    double cy = y - global_halfdot;
    double rotater = 360.0D / global_multibooble;
    Area drawme = new Area(new Ellipse2D.Float(x, y, sizex, sizey));
    for (int booblecount = 0; booblecount < global_multibooble; booblecount++)
    {
      double boobleradius = (Math.random() - 0.5D) * (global_flermox * 0.2D) * global_halfdot + 6.0D / global_trumble * global_halfdot;
      double xmod = global_halfdot * Math.cos(Math.toRadians(rotater * booblecount)) + x;
      double ymod = global_halfdot * Math.sin(Math.toRadians(rotater * booblecount)) + y;
      drawme.add(new Area(new Ellipse2D.Double(xmod + (Math.random() - 0.5D) * (global_wonk * 0.2D) * global_halfdot + (global_halfdot - boobleradius), 
        ymod + (Math.random() - 0.5D) * (global_wonk * 0.2D) * global_halfdot + (global_halfdot - boobleradius), 
        2.0D * boobleradius, 
        2.0D * boobleradius)));
    }
    if (!isOutline)
    {
      if ((!envelope1) && (!envelope2))
      {
        destinationgraphics.fill(drawme);
        g.fill(drawme);
      }
      else if (envelope1)
      {
        float val = Math.abs((float)Math.sin(rgb.hashCode()));
        float val2 = Math.abs((float)Math.cos(rgb.hashCode()));
        int lcx = getBoundsx;
        int lcy = getBoundsy;
        new AffineTransform();Area t = drawme.createTransformedArea(AffineTransform.getTranslateInstance(-lcx, -lcy));
        new AffineTransform();t = t.createTransformedArea(AffineTransform.getScaleInstance(val, val2));
        new AffineTransform();t = t.createTransformedArea(AffineTransform.getTranslateInstance(lcx, lcy));
        Shape t2 = t;
        destinationgraphics.fill(t2);
        g.fill(t2);
      }
      else if (envelope2)
      {
        float val = Math.abs((float)Math.sin(counter));
        int lcx = getBoundsx;
        int lcy = getBoundsy;
        new AffineTransform();Area t = drawme.createTransformedArea(AffineTransform.getTranslateInstance(-lcx, -lcy));
        new AffineTransform();t = t.createTransformedArea(AffineTransform.getScaleInstance(val, val));
        new AffineTransform();t = t.createTransformedArea(AffineTransform.getTranslateInstance(lcx, lcy));
        Shape t2 = t;
        destinationgraphics.fill(t);
        g.fill(t);
      }
    }
    else if ((!envelope1) && (!envelope2))
    {
      destinationgraphics.draw(drawme);
      g.draw(drawme);
    }
    else if (envelope1)
    {
      float val = Math.abs((float)Math.sin(rgb.hashCode()));
      float val2 = Math.abs((float)Math.cos(rgb.hashCode()));
      int lcx = getBoundsx;
      int lcy = getBoundsy;
      new AffineTransform();Area t = drawme.createTransformedArea(AffineTransform.getTranslateInstance(-lcx, -lcy));
      new AffineTransform();t = t.createTransformedArea(AffineTransform.getScaleInstance(val, val2));
      new AffineTransform();t = t.createTransformedArea(AffineTransform.getTranslateInstance(lcx, lcy));
      Shape t2 = t;
      destinationgraphics.draw(t);
      g.draw(t);
    }
    else if (envelope2)
    {
      float val = Math.abs((float)Math.sin(counter));
      int lcx = getBoundsx;
      int lcy = getBoundsy;
      new AffineTransform();Area t = drawme.createTransformedArea(AffineTransform.getTranslateInstance(-lcx, -lcy));
      new AffineTransform();t = t.createTransformedArea(AffineTransform.getScaleInstance(val, val));
      new AffineTransform();t = t.createTransformedArea(AffineTransform.getTranslateInstance(lcx, lcy));
      Shape t2 = t;
      destinationgraphics.draw(t);
      g.draw(t);
    }
  }
  
  public void drawDots()
  {
    if (g == null)
    {
      g = ((Graphics2D)gcanvas.getGraphics());
      g.setBackground(Color.black);
      g.addRenderingHints(how);
    }
    if (destinationgraphics == null)
    {
      destinationgraphics = ((Graphics2D)destination.getGraphics());
      destinationgraphics.setBackground(Color.black);
      destinationgraphics.addRenderingHints(how);
    }
    if (!isRandom)
    {
      for (int iy = -100 + global_dotdisplacementy; iy <= yextent + 100; iy += global_dotspacing) {
        for (int ix = -100 + global_dotdisplacementx; ix <= xextent + 100; ix += global_dotspacing)
        {
          counter += 1;
          Color rgb = colorset.poll();
          float sx = global_dotsize;
          float sy = global_dotsize;
          if (envelope1)
          {
            sx = Math.abs((float)Math.sin(rgb.hashCode()) * sx);
            sy = Math.abs((float)Math.cos(rgb.hashCode()) * sy);
          }
          else if (envelope2)
          {
            sx = Math.abs((float)Math.sin(counter) * sx);
            sy = sx;
          }
          float tx = ix + (int)((0.5D - Math.random()) * (100 - global_dotregularity));
          float ty = iy + (int)((0.5D - Math.random()) * (100 - global_dotregularity));
          if (global_multibooble == 1) {
            drawDot(tx, ty, rgb, sx, sy);
          } else {
            drawBooble(tx, ty, rgb, sx, sy);
          }
        }
      }
      if (counter >= 2147478647) {
        counter = 0;
      }
    }
    else
    {
      for (int i = 0; i < 500; i++)
      {
        float ty = (float)Math.random() * yextent;
        float tx = (float)Math.random() * xextent;
        Color rgb = colorset.poll();
        float sx = global_dotsize;
        float sy = global_dotsize;
        if (envelope1)
        {
          sx = (float)Math.sin(rgb.hashCode()) * sx;
          sy = (float)Math.cos(rgb.hashCode()) * sy;
        }
        else if (envelope2)
        {
          sx = (float)Math.sin(i) * sx;
          sy = sx;
        }
        if (global_multibooble == 1) {
          drawDot(tx, ty, rgb, sx, sy);
        } else {
          drawBooble(tx, ty, rgb, sx, sy);
        }
      }
    }
  }
  
  public class SpinnerListener
    implements ChangeListener
  {
    public SpinnerListener() {}
    
    public void stateChanged(ChangeEvent evt)
    {
      JSpinner spinner = (JSpinner)evt.getSource();
      if (spinner == wonk) {
        global_wonk = ((Integer)spinner.getValue()).intValue();
      } else if (spinner == multibooble) {
        global_multibooble = ((Integer)spinner.getValue()).intValue();
      } else if (spinner == dotdisplacementx) {
        global_dotdisplacementx = ((Integer)spinner.getValue()).intValue();
      } else if (spinner == dotdisplacementy) {
        global_dotdisplacementy = ((Integer)spinner.getValue()).intValue();
      } else if (spinner == trumble) {
        global_trumble = ((Integer)spinner.getValue()).intValue();
      } else if (spinner == flermox) {
        global_flermox = ((Integer)spinner.getValue()).intValue();
      }
    }
  }
  
  public void stateChanged(ChangeEvent e)
  {
    JSlider source = (JSlider)e.getSource();
    if (source == dotsize)
    {
      global_dotsize = source.getValue();
      global_halfdot = (global_dotsize / 2.0D);
      dotsizeLabel.setText("Size: " + Integer.toString(global_dotsize));
    }
    else if (source == dotspacing)
    {
      global_dotspacing = source.getValue();
      dotspacingLabel.setText("Spacing: " + Integer.toString(global_dotspacing));
    }
    else if (source == dotregularity)
    {
      global_dotregularity = source.getValue();
      if (global_dotregularity != 100) {
        dotregularityLabel.setText("Regularity: max " + Integer.toString(100 - global_dotregularity) + " p.");
      } else {
        dotregularityLabel.setText("Regularity: absolute");
      }
    }
  }
  
  public void itemStateChanged(ItemEvent e)
  {
    Object source = e.getItemSelectable();
    if (source == randomcheck) {
      isRandom = randomcheck.isSelected();
    }
    if (source == outlinecheck) {
      isOutline = outlinecheck.isSelected();
    }
    if (source == env1)
    {
      envelope1 = env1.isSelected();
      if (envelope1)
      {
        env2.setSelected(false);
        envelope2 = false;
      }
    }
    if (source == env2)
    {
      envelope2 = env2.isSelected();
      if (envelope2)
      {
        env1.setSelected(false);
        envelope1 = false;
      }
    }
    dotregularity.setEnabled(!isRandom);
  }
  
  public static void main(String[] args)
  {
    SwingUtilities.invokeLater(new Runnable()
    {
      public void run() {}
    });
  }
}

/* Location:
 * Qualified Name:     Dot
 * Java Class Version: 1.2 (46.0)
 * JD-Core Version:    0.7.1
 */