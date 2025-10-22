#!/usr/bin/env python3
"""
TERMINAL PET SIMULATOR
The most important program you'll run today.
"""

import random
import time
import sys
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.live import Live
from rich.layout import Layout
from rich.text import Text

console = Console()

class Pet:
    MOODS = {
        "happy": ("(◕‿◕)", "yellow"),
        "excited": ("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "bright_yellow"),
        "hungry": "(｡•́︿•̀｡)",
        "sleepy": "(zzZ)",
        "angry": "(ಠ_ಠ)",
        "love": "(♥‿♥)",
        "dead": "(✖╭╮✖)"
    }

    FOODS = ["🍕 pizza", "🍔 burger", "🍎 apple", "🍰 cake", "🥕 carrot", "🍣 sushi"]
    TOYS = ["🎾 ball", "🧸 teddy", "🎮 game", "🎨 art", "📚 book"]

    def __init__(self, name):
        self.name = name
        self.hunger = 50
        self.happiness = 50
        self.energy = 50
        self.age = 0
        self.alive = True
        self.mood = "happy"

    def get_face(self):
        return self.MOODS.get(self.mood, self.MOODS["happy"])

    def update_mood(self):
        if not self.alive:
            self.mood = "dead"
        elif self.hunger > 80:
            self.mood = "angry"
        elif self.hunger > 60:
            self.mood = "hungry"
        elif self.energy < 20:
            self.mood = "sleepy"
        elif self.happiness > 80:
            self.mood = "love"
        elif self.happiness > 60:
            self.mood = "excited"
        else:
            self.mood = "happy"

    def tick(self):
        """Time passes..."""
        self.hunger = min(100, self.hunger + random.randint(3, 7))
        self.happiness = max(0, self.happiness - random.randint(1, 3))
        self.energy = max(0, self.energy - random.randint(2, 5))
        self.age += 1

        if self.hunger >= 100 or self.energy <= 0:
            self.alive = False

        self.update_mood()

    def feed(self, food):
        if not self.alive:
            return "Your pet is... not hungry anymore 💀"

        self.hunger = max(0, self.hunger - random.randint(20, 35))
        self.happiness = min(100, self.happiness + random.randint(5, 15))

        messages = [
            f"*nom nom nom* {self.name} devoured the {food}!",
            f"{self.name} loved the {food}! So tasty!",
            f"*munch munch* {self.name} is satisfied!",
            f"{self.name} ate the {food} in one bite! WOW!"
        ]
        self.update_mood()
        return random.choice(messages)

    def play(self, toy):
        if not self.alive:
            return "Your pet can't play anymore... 😢"

        if self.energy < 10:
            self.energy = max(0, self.energy - 5)
            return f"{self.name} is too tired to play! Let them sleep!"

        self.happiness = min(100, self.happiness + random.randint(15, 30))
        self.energy = max(0, self.energy - random.randint(10, 20))

        messages = [
            f"*zoom zoom* {self.name} had a blast with the {toy}!",
            f"{self.name} is having so much fun with the {toy}!",
            f"*giggle* {self.name} loves the {toy}!",
            f"{self.name} did a backflip while playing with {toy}!"
        ]
        self.update_mood()
        return random.choice(messages)

    def sleep(self):
        if not self.alive:
            return "They're sleeping... forever 😔"

        self.energy = min(100, self.energy + random.randint(30, 50))
        self.happiness = min(100, self.happiness + random.randint(5, 10))

        sleep_msgs = [
            f"*Zzzzz* {self.name} had a great nap!",
            f"{self.name} is refreshed and full of energy!",
            f"*yawn* {self.name} woke up feeling amazing!",
            f"{self.name} dreamed about you! 💭"
        ]
        self.update_mood()
        return random.choice(sleep_msgs)

    def display(self):
        """Generate the pet display"""
        face = self.get_face()
        if isinstance(face, tuple):
            face_str, color = face
        else:
            face_str = face
            color = "white"

        status_color = "green" if self.happiness > 60 else "yellow" if self.happiness > 30 else "red"

        display_text = Text()
        display_text.append(f"\n    {face_str}\n", style=f"bold {color}")
        display_text.append(f"   ╱|_|╲\n", style=color)
        display_text.append(f"  /_____\\\n\n", style=color)

        display_text.append(f"  {self.name} ", style="bold cyan")
        display_text.append(f"(Age: {self.age})\n\n", style="dim")

        # Status bars
        hunger_bar = self._make_bar(self.hunger, "🍔")
        happy_bar = self._make_bar(100 - self.happiness, "😊")
        energy_bar = self._make_bar(100 - self.energy, "⚡")

        display_text.append(f"  Hunger:    {hunger_bar}\n")
        display_text.append(f"  Happiness: {happy_bar}\n")
        display_text.append(f"  Energy:    {energy_bar}\n")

        return Panel(display_text, border_style=status_color, expand=False)

    def _make_bar(self, value, emoji):
        filled = int(value / 10)
        empty = 10 - filled
        bar = "█" * filled + "░" * empty

        if value < 30:
            color = "green"
        elif value < 70:
            color = "yellow"
        else:
            color = "red"

        return f"[{color}]{bar}[/{color}] {emoji}"


def show_intro():
    console.clear()
    console.print(Panel.fit(
        "[bold yellow]🎮 TERMINAL PET SIMULATOR 🎮[/bold yellow]\n\n"
        "[cyan]The most important game ever made[/cyan]",
        border_style="bright_magenta"
    ))
    time.sleep(1)


def main():
    show_intro()

    console.print("\n[bold green]A wild creature appears![/bold green]\n")
    time.sleep(0.5)

    name = Prompt.ask("[yellow]What will you name your pet?[/yellow]", default="Fluffy")

    pet = Pet(name)

    console.print(f"\n[bold cyan]You adopted {name}! 🎉[/bold cyan]")
    console.print("[dim]Take good care of them...[/dim]\n")
    time.sleep(1.5)

    turn = 0
    last_message = f"Welcome, {name}!"

    while pet.alive:
        console.clear()

        # Show pet
        console.print(pet.display())
        console.print(f"\n[dim]Turn {turn}[/dim]")
        console.print(f"[italic]{last_message}[/italic]\n")

        # Show menu
        console.print("[bold]What do you want to do?[/bold]")
        console.print("1. 🍕 Feed")
        console.print("2. 🎾 Play")
        console.print("3. 😴 Sleep")
        console.print("4. 🚪 Quit")

        choice = Prompt.ask("\nChoice", choices=["1", "2", "3", "4"], default="1")

        if choice == "1":
            console.print("\n[yellow]What should we feed them?[/yellow]")
            for i, food in enumerate(Pet.FOODS, 1):
                console.print(f"{i}. {food}")

            food_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(Pet.FOODS) + 1)])
            food = Pet.FOODS[int(food_choice) - 1]
            last_message = pet.feed(food)

        elif choice == "2":
            console.print("\n[yellow]What toy?[/yellow]")
            for i, toy in enumerate(Pet.TOYS, 1):
                console.print(f"{i}. {toy}")

            toy_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(Pet.TOYS) + 1)])
            toy = Pet.TOYS[int(toy_choice) - 1]
            last_message = pet.play(toy)

        elif choice == "3":
            console.print("\n[dim]💤 Putting pet to sleep...[/dim]")
            time.sleep(1.5)
            last_message = pet.sleep()

        elif choice == "4":
            console.print(f"\n[yellow]Thanks for playing with {name}![/yellow]")
            console.print("[dim]They'll miss you... 😢[/dim]\n")
            return

        # Time passes
        pet.tick()
        turn += 1
        time.sleep(0.5)

    # Game over
    console.clear()
    console.print(pet.display())
    console.print(f"\n[bold red]💔 {name} has passed away... 💔[/bold red]")
    console.print(f"[cyan]They lived for {pet.age} turns.[/cyan]")
    console.print("\n[dim]Press Enter to exit...[/dim]")
    input()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n\n[yellow]Bye! 👋[/yellow]")
        sys.exit(0)
