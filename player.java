
import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JLabel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
public class Player implements ActionListener {
    JFrame frame = new JFrame("Player");
    JButton button = new JButton("Hello");
    JPanel panel = new JPanel();
    JLabel label = new JLabel("Game start?");
    public void run(){
        frame.add(panel);
        panel.add(button);
        panel.add(label);
        button.addActionListener(this);
        frame.setSize(300, 200);
        frame.setVisible(true);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    public static void main(String[] args) {
        Player player = new Player();
        player.run();
    }
    public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		JButton buttonPressed = (JButton) e.getSource();
        if (buttonPressed == button) {
            panel.remove(button);
            panel.revalidate();
            panel.repaint();
            label.setText("Let's go!");
        }
    }
}
