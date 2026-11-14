# Orpheus - a tiny game made with pygame.
# Run it:   python main.py
# Web build for itch.io:   pygbag game   (see README.md)

import asyncio
import pygame

pygame.init()
screen = pygame.display.set_mode((300, 200))
pygame.display.set_caption("Player")
font = pygame.font.Font(None, 28)  # None = pygame's built-in font

# --- game state ---
button = pygame.Rect(100, 70, 100, 40)  # x, y, width, height
button_visible = True
label = "Game start?"


def draw():
    screen.fill((238, 238, 238))
    if button_visible:
        pygame.draw.rect(screen, (190, 190, 190), button)
        text = font.render("Hello", True, (0, 0, 0))
        screen.blit(text, text.get_rect(center=button.center))
    text = font.render(label, True, (0, 0, 0))
    screen.blit(text, text.get_rect(center=(150, 40)))
    pygame.display.flip()


# pygbag needs the game loop to be "async" so the browser can breathe.
async def main():
    global button_visible, label
    clock = pygame.time.Clock()
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            # clicked the button?
            elif event.type == pygame.MOUSEBUTTONDOWN and button_visible:
                if button.collidepoint(event.pos):
                    button_visible = False
                    label = "Let's go!"
        draw()
        clock.tick(60)
        await asyncio.sleep(0)  # required for the web version
    pygame.quit()


asyncio.run(main())
