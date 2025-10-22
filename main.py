#!/usr/bin/env python3
"""
CHAOTIC TAMAGOTCHI SIMULATOR
The most dysfunctional pet you'll ever raise.
WARNING: This gets dark. Real dark.
"""

import random
import time
import sys
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.text import Text
from rich.table import Table

console = Console()

class ChaoticPet:
    MOODS = {
        "happy": ("(◕‿◕)", "yellow"),
        "excited": ("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "bright_yellow"),
        "hungry": "(｡•́︿•̀｡)",
        "sleepy": "(zzZ)",
        "angry": "(ಠ_ಠ)",
        "love": "(♥‿♥)",
        "dead": "(✖╭╮✖)",
        "depressed": "(╥﹏╥)",
        "drunk": "(´∀`)",
        "addicted": "(⊙_⊙)",
        "rebellious": "(¬_¬)",
        "broke": "(；一_一)"
    }

    FOODS = ["🍕 pizza", "🍔 burger", "🍎 apple", "🍰 cake", "🥕 carrot", "🍣 sushi"]
    TOYS = ["🎾 ball", "🧸 teddy", "🎮 game", "🎨 art", "📚 book"]
    VICES = ["🍺 beer", "🚬 cigarette", "💊 mystery pill"]

    def __init__(self, name):
        self.name = name
        self.hunger = 50
        self.happiness = 50
        self.energy = 50
        self.age = 0
        self.alive = True
        self.mood = "happy"

        # New chaotic stats
        self.money = 100
        self.debt = 0
        self.poop_count = 0
        self.addiction_level = 0
        self.depression_level = 0
        self.phone_addiction = 0
        self.has_partner = False
        self.is_rebellious = False
        self.gambling_addiction = 0

    def get_face(self):
        return self.MOODS.get(self.mood, self.MOODS["happy"])

    def update_mood(self):
        if not self.alive:
            self.mood = "dead"
        elif self.depression_level > 70:
            self.mood = "depressed"
        elif self.addiction_level > 50:
            self.mood = "addicted"
        elif self.money < 0 or self.debt > 100:
            self.mood = "broke"
        elif self.is_rebellious:
            self.mood = "rebellious"
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
        """Time passes... chaos ensues"""
        # Basic stats
        self.hunger = min(100, self.hunger + random.randint(3, 7))
        self.happiness = max(0, self.happiness - random.randint(1, 4))
        self.energy = max(0, self.energy - random.randint(2, 5))
        self.age += 1

        # Poop happens
        if random.random() < 0.3:
            self.poop_count += 1
            if self.poop_count > 3:
                self.happiness = max(0, self.happiness - 10)

        # Debt interest
        if self.debt > 0:
            self.debt = int(self.debt * 1.1)  # 10% interest per turn!

        # Addiction withdrawal
        if self.addiction_level > 0:
            self.addiction_level = max(0, self.addiction_level - 3)
            self.happiness = max(0, self.happiness - 5)

        # Phone addiction
        if self.phone_addiction > 30:
            self.happiness = max(0, self.happiness - 2)

        # Depression mechanics
        if self.happiness < 20:
            self.depression_level = min(100, self.depression_level + 5)
        else:
            self.depression_level = max(0, self.depression_level - 2)

        # Teenage rebellion (ages 10-20)
        self.is_rebellious = 10 <= self.age <= 20

        # Partner might leave
        if self.has_partner and random.random() < 0.1:
            if self.happiness < 40:
                self.has_partner = False
                self.depression_level = min(100, self.depression_level + 30)

        # Death conditions
        if self.hunger >= 100 or self.energy <= 0 or self.debt > 1000:
            self.alive = False

        # Depression suicide risk
        if self.depression_level >= 100:
            self.alive = False

        self.update_mood()

    def feed(self, food):
        if not self.alive:
            return "Your pet is... not hungry anymore 💀"

        cost = 10
        if self.money < cost:
            return f"You're broke! Can't afford {food}! 💸"

        self.money -= cost
        self.hunger = max(0, self.hunger - random.randint(20, 35))
        self.happiness = min(100, self.happiness + random.randint(5, 15))

        messages = [
            f"*nom nom nom* {self.name} devoured the {food}!",
            f"{self.name} loved the {food}! So tasty!",
            f"*munch munch* {self.name} is satisfied!",
            f"{self.name} ate the {food} in one bite! WOW!"
        ]

        if self.is_rebellious and random.random() < 0.3:
            messages = [f"{self.name} threw the {food} at you! 'I HATE YOU!' 😡"]
            self.happiness = max(0, self.happiness - 10)

        self.update_mood()
        return random.choice(messages)

    def play(self, toy):
        if not self.alive:
            return "Your pet can't play anymore... 😢"

        if self.depression_level > 60:
            return f"{self.name} is too depressed to play... 😔"

        if self.phone_addiction > 50:
            self.phone_addiction += 10
            return f"{self.name} ignores you and keeps scrolling on their phone! 📱"

        if self.energy < 10:
            self.energy = max(0, self.energy - 5)
            return f"{self.name} is too tired to play! Let them sleep!"

        self.happiness = min(100, self.happiness + random.randint(15, 30))
        self.energy = max(0, self.energy - random.randint(10, 20))
        self.depression_level = max(0, self.depression_level - 10)

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

        if self.depression_level > 60:
            sleep_msgs = [f"{self.name} slept but still feels empty inside... 😔"]

        self.update_mood()
        return random.choice(sleep_msgs)

    def clean_poop(self):
        if self.poop_count == 0:
            return "There's no poop to clean! (Yet...)"

        old_count = self.poop_count
        self.poop_count = 0
        self.happiness = min(100, self.happiness + 15)

        return f"You cleaned up {old_count} poops! 💩 {self.name} is happy now!"

    def use_vice(self, vice):
        if not self.alive:
            return "They're beyond temptation now..."

        cost = 15
        if self.money < cost:
            return f"Too broke for vices! That's... actually good? 💸"

        self.money -= cost
        self.addiction_level = min(100, self.addiction_level + 15)
        self.happiness = min(100, self.happiness + 30)  # Short term happiness
        self.energy = max(0, self.energy - 10)

        messages = {
            "🍺 beer": f"{self.name} chugged the beer! 'YOLO!' *burp* 🍺",
            "🚬 cigarette": f"{self.name} smoked a cigarette. Looking cool, dying inside. 🚬",
            "💊 mystery pill": f"{self.name} took the pill. Things are getting weird... 💊"
        }

        self.update_mood()
        return messages.get(vice, "Something happened...")

    def gamble(self, amount):
        if not self.alive:
            return "Can't gamble when you're dead! (Or can you?)"

        if amount > self.money:
            return f"You only have ${self.money}! Can't bet ${amount}!"

        self.money -= amount
        self.gambling_addiction = min(100, self.gambling_addiction + 10)

        # 40% chance to win
        if random.random() < 0.4:
            winnings = amount * 2
            self.money += winnings
            self.happiness = min(100, self.happiness + 20)
            return f"🎰 JACKPOT! Won ${winnings}! {self.name} is riding high! 💰"
        else:
            self.happiness = max(0, self.happiness - 20)
            self.depression_level = min(100, self.depression_level + 10)
            return f"💸 Lost ${amount}... {self.name} is devastated! 😭"

    def take_loan(self, amount):
        self.debt += amount
        self.money += amount
        return f"Borrowed ${amount}! Debt is now ${self.debt}. What could go wrong? 💸"

    def work(self):
        if not self.alive:
            return "Dead people don't work. (Usually.)"

        if self.depression_level > 70:
            return f"{self.name} called in sick. Too depressed to work. 😔"

        if self.is_rebellious:
            return f"{self.name} quit their job! 'YOU CAN'T TELL ME WHAT TO DO!' 🤬"

        earnings = random.randint(20, 40)
        self.money += earnings
        self.energy = max(0, self.energy - 20)
        self.happiness = max(0, self.happiness - 10)

        return f"{self.name} worked and earned ${earnings}! (But at what cost?) 💼"

    def find_partner(self):
        if self.has_partner:
            return f"{self.name} already has a partner! (For now...)"

        if self.happiness < 30:
            return f"{self.name} is too depressed to date. 😔"

        self.has_partner = True
        self.happiness = min(100, self.happiness + 40)
        return f"{self.name} found love! ❤️ (Let's see how long this lasts...)"

    def use_phone(self):
        self.phone_addiction = min(100, self.phone_addiction + 20)
        self.happiness = min(100, self.happiness + 10)
        self.energy = max(0, self.energy - 10)

        return f"{self.name} scrolled for hours. Wasted time but gained dopamine! 📱"

    def display(self):
        """Generate the pet display"""
        face = self.get_face()
        if isinstance(face, tuple):
            face_str, color = face
        else:
            face_str = face
            color = "white"

        status_color = "green" if self.alive and self.happiness > 60 else "yellow" if self.happiness > 30 else "red"

        display_text = Text()
        display_text.append(f"\n    {face_str}\n", style=f"bold {color}")
        display_text.append(f"   ╱|_|╲\n", style=color)
        display_text.append(f"  /_____\\\n\n", style=color)

        display_text.append(f"  {self.name} ", style="bold cyan")
        display_text.append(f"(Age: {self.age})\n", style="dim")
        display_text.append(f"  Status: {self.mood.upper()}\n\n", style=f"bold {color}")

        # Basic stats
        hunger_bar = self._make_bar(self.hunger, "🍔")
        happy_bar = self._make_bar(100 - self.happiness, "😊")
        energy_bar = self._make_bar(100 - self.energy, "⚡")

        display_text.append(f"  Hunger:    {hunger_bar}\n")
        display_text.append(f"  Happiness: {happy_bar}\n")
        display_text.append(f"  Energy:    {energy_bar}\n\n")

        # Chaotic stats
        display_text.append(f"  💰 Money: ${self.money}  ", style="green" if self.money > 0 else "red")
        display_text.append(f"💸 Debt: ${self.debt}\n", style="red" if self.debt > 0 else "dim")
        display_text.append(f"  💩 Poops: {self.poop_count}  ", style="yellow" if self.poop_count > 0 else "dim")
        display_text.append(f"📱 Phone: {self.phone_addiction}%\n", style="red" if self.phone_addiction > 50 else "dim")
        display_text.append(f"  😔 Depression: {self.depression_level}%  ", style="red" if self.depression_level > 50 else "dim")
        display_text.append(f"💉 Addiction: {self.addiction_level}%\n", style="red" if self.addiction_level > 30 else "dim")

        if self.has_partner:
            display_text.append(f"  ❤️ In a relationship\n", style="magenta")
        if self.is_rebellious:
            display_text.append(f"  🤬 REBELLIOUS PHASE\n", style="red")

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
        "[bold red]⚠️  CHAOTIC TAMAGOTCHI SIMULATOR  ⚠️[/bold red]\n\n"
        "[yellow]WARNING: Contains depression, addiction, debt, and bad life choices[/yellow]\n"
        "[cyan]The most dysfunctional pet you'll ever raise[/cyan]\n\n"
        "[dim]Not responsible for emotional damage[/dim]",
        border_style="bright_red"
    ))
    time.sleep(2)


def main():
    show_intro()

    console.print("\n[bold green]A wild creature appears![/bold green]\n")
    time.sleep(0.5)

    name = Prompt.ask("[yellow]What will you name your pet?[/yellow]", default="Fluffy")

    pet = ChaoticPet(name)

    console.print(f"\n[bold cyan]You adopted {name}! 🎉[/bold cyan]")
    console.print("[dim]Good luck... you'll need it.[/dim]\n")
    time.sleep(1.5)

    turn = 0
    last_message = f"Welcome, {name}! Let the chaos begin!"

    while pet.alive:
        console.clear()

        # Show pet
        console.print(pet.display())
        console.print(f"\n[dim]Turn {turn}[/dim]")
        console.print(f"[italic]{last_message}[/italic]\n")

        # Show menu
        console.print("[bold]What do you want to do?[/bold]")
        console.print("1. 🍕 Feed ($10)")
        console.print("2. 🎾 Play")
        console.print("3. 😴 Sleep")
        console.print("4. 💩 Clean Poop")
        console.print("5. 🍺 Use Vice ($15)")
        console.print("6. 🎰 Gamble")
        console.print("7. 💼 Work")
        console.print("8. 💸 Take Loan")
        console.print("9. 📱 Use Phone")
        console.print("10. ❤️ Find Partner")
        console.print("11. 🚪 Quit")

        choice = Prompt.ask("\nChoice", choices=[str(i) for i in range(1, 12)], default="1")

        if choice == "1":
            console.print("\n[yellow]What should we feed them?[/yellow]")
            for i, food in enumerate(ChaoticPet.FOODS, 1):
                console.print(f"{i}. {food}")

            food_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(ChaoticPet.FOODS) + 1)])
            food = ChaoticPet.FOODS[int(food_choice) - 1]
            last_message = pet.feed(food)

        elif choice == "2":
            console.print("\n[yellow]What toy?[/yellow]")
            for i, toy in enumerate(ChaoticPet.TOYS, 1):
                console.print(f"{i}. {toy}")

            toy_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(ChaoticPet.TOYS) + 1)])
            toy = ChaoticPet.TOYS[int(toy_choice) - 1]
            last_message = pet.play(toy)

        elif choice == "3":
            console.print("\n[dim]💤 Putting pet to sleep...[/dim]")
            time.sleep(1)
            last_message = pet.sleep()

        elif choice == "4":
            last_message = pet.clean_poop()

        elif choice == "5":
            console.print("\n[red]Choose your poison...[/red]")
            for i, vice in enumerate(ChaoticPet.VICES, 1):
                console.print(f"{i}. {vice}")

            vice_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(ChaoticPet.VICES) + 1)])
            vice = ChaoticPet.VICES[int(vice_choice) - 1]
            last_message = pet.use_vice(vice)

        elif choice == "6":
            bet = Prompt.ask(f"\n💰 How much to bet? (You have ${pet.money})", default="20")
            try:
                last_message = pet.gamble(int(bet))
            except:
                last_message = "Invalid bet amount!"

        elif choice == "7":
            console.print("\n[dim]💼 Working...[/dim]")
            time.sleep(1)
            last_message = pet.work()

        elif choice == "8":
            amount = Prompt.ask("\n💸 How much to borrow?", default="50")
            try:
                last_message = pet.take_loan(int(amount))
            except:
                last_message = "Invalid amount!"

        elif choice == "9":
            console.print("\n[dim]📱 Scrolling...[/dim]")
            time.sleep(1)
            last_message = pet.use_phone()

        elif choice == "10":
            last_message = pet.find_partner()

        elif choice == "11":
            console.print(f"\n[yellow]Thanks for playing with {name}![/yellow]")
            console.print("[dim]They'll miss you... probably.[/dim]\n")
            return

        # Time passes
        pet.tick()
        turn += 1
        time.sleep(0.5)

    # Game over
    console.clear()
    console.print(pet.display())

    # Death message
    if pet.depression_level >= 100:
        console.print(f"\n[bold red]💔 {name} couldn't take it anymore... 💔[/bold red]")
        console.print("[red]Depression: 100%[/red]")
    elif pet.debt > 1000:
        console.print(f"\n[bold red]💸 {name} was crushed by debt! 💸[/bold red]")
        console.print(f"[red]Final debt: ${pet.debt}[/red]")
    elif pet.hunger >= 100:
        console.print(f"\n[bold red]💀 {name} starved to death! 💀[/bold red]")
    elif pet.energy <= 0:
        console.print(f"\n[bold red]😴 {name} died from exhaustion! 😴[/bold red]")

    console.print(f"[cyan]They survived {pet.age} turns of chaos.[/cyan]")
    console.print(f"[dim]Final money: ${pet.money} | Final debt: ${pet.debt}[/dim]")
    console.print("\n[yellow]Life lessons learned: 0[/yellow]")
    console.print("\n[dim]Press Enter to exit...[/dim]")
    input()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n\n[yellow]Rage quit! 👋[/yellow]")
        sys.exit(0)
