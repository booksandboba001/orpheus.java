import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class Player extends JPanel {
    // --- game state ---
    Rectangle button = new Rectangle(100, 70, 100, 40); // x, y, width, height
    boolean buttonVisible = true;
    String label = "Game start?";
    Ground ground = null;
    Orpheus orpheus = null;

    public Player() {
        setBackground(new Color(238, 238, 238));
        setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 14));
        addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                // clicked the button?
                if (buttonVisible && button.contains(e.getPoint())) {
                    buttonVisible = false;
                    label = "Let's go!";
                    ground = new Ground(getWidth(), 10);
                    orpheus = new Orpheus("Orpheus", 100);
                    buttonVisible = orpheus.buttonVisible;
                    label = orpheus.label;
                    repaint();
                }
            }
        });
    }

    private void drawCentered(Graphics g, String text, int cx, int cy) {
        FontMetrics fm = g.getFontMetrics();
        int x = cx - fm.stringWidth(text) / 2;
        int y = cy - fm.getHeight() / 2 + fm.getAscent();
        g.drawString(text, x, y);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g); // fills the background
        if (ground != null) {
            g.setColor(new Color(100, 100, 100));
            g.fillRect(ground.x, ground.y, ground.width, ground.height);
        }
        if (buttonVisible) {
            g.setColor(new Color(190, 190, 190));
            g.fillRect(button.x, button.y, button.width, button.height);
            g.setColor(Color.BLACK);
            drawCentered(g, "Hello", (int) button.getCenterX(), (int) button.getCenterY());
        }
        g.setColor(Color.BLACK);
        drawCentered(g, label, 150, 40);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Player");
        frame.add(new Player());
        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
