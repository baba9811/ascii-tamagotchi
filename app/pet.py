"""
Pet class - The chaotic creature itself
"""

import random
from rich.text import Text
from rich.panel import Panel
from app.lang import Lang


class ChaoticPet:
    """A virtual pet with way too many problems"""

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

    def __init__(self, name: str, lang: Lang = None):
        self.name = name
        self.lang = lang or Lang("en")

        # Basic stats
        self.hunger = 50
        self.happiness = 50
        self.energy = 50
        self.age = 0
        self.alive = True
        self.mood = "happy"

        # Chaos stats
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
        """Get the current mood face"""
        return self.MOODS.get(self.mood, self.MOODS["happy"])

    def update_mood(self):
        """Update mood based on current stats"""
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
        # Basic stats decay
        self.hunger = min(100, self.hunger + random.randint(3, 7))
        self.happiness = max(0, self.happiness - random.randint(1, 4))
        self.energy = max(0, self.energy - random.randint(2, 5))
        self.age += 1

        # Poop happens
        if random.random() < 0.3:
            self.poop_count += 1
            if self.poop_count > 3:
                self.happiness = max(0, self.happiness - 10)

        # Debt compounds
        if self.debt > 0:
            self.debt = int(self.debt * 1.1)

        # Addiction withdrawal
        if self.addiction_level > 0:
            self.addiction_level = max(0, self.addiction_level - 3)
            self.happiness = max(0, self.happiness - 5)

        # Phone addiction effects
        if self.phone_addiction > 30:
            self.happiness = max(0, self.happiness - 2)

        # Depression mechanics
        if self.happiness < 20:
            self.depression_level = min(100, self.depression_level + 5)
        else:
            self.depression_level = max(0, self.depression_level - 2)

        # Teenage rebellion
        self.is_rebellious = 10 <= self.age <= 20

        # Relationship drama
        if self.has_partner and random.random() < 0.1:
            if self.happiness < 40:
                self.has_partner = False
                self.depression_level = min(100, self.depression_level + 30)

        # Death conditions
        if self.hunger >= 100 or self.energy <= 0 or self.debt > 1000:
            self.alive = False

        if self.depression_level >= 100:
            self.alive = False

        self.update_mood()

    def feed(self, food: str) -> str:
        """Feed the pet"""
        if not self.alive:
            return self.lang.get('pet_dead_cant_feed')

        cost = 10
        if self.money < cost:
            return self.lang.get('pet_broke', food=food)

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
            messages = [self.lang.get('pet_rebellious_food', name=self.name, food=food)]
            self.happiness = max(0, self.happiness - 10)

        self.update_mood()
        return random.choice(messages)

    def play(self, toy: str) -> str:
        """Play with the pet"""
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

    def sleep(self) -> str:
        """Let the pet sleep"""
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

    def clean_poop(self) -> str:
        """Clean up the poop"""
        if self.poop_count == 0:
            return self.lang.get('no_poop')

        old_count = self.poop_count
        self.poop_count = 0
        self.happiness = min(100, self.happiness + 15)

        return self.lang.get('cleaned_poop', count=old_count, name=self.name)

    def use_vice(self, vice: str) -> str:
        """Use a vice for temporary happiness"""
        if not self.alive:
            return "They're beyond temptation now..."

        cost = 15
        if self.money < cost:
            return f"Too broke for vices! That's... actually good? 💸"

        self.money -= cost
        self.addiction_level = min(100, self.addiction_level + 15)
        self.happiness = min(100, self.happiness + 30)
        self.energy = max(0, self.energy - 10)

        messages = {
            "🍺 beer": f"{self.name} chugged the beer! 'YOLO!' *burp* 🍺",
            "🚬 cigarette": f"{self.name} smoked a cigarette. Looking cool, dying inside. 🚬",
            "💊 mystery pill": f"{self.name} took the pill. Things are getting weird... 💊"
        }

        self.update_mood()
        return messages.get(vice, "Something happened...")

    def gamble(self, amount: int) -> str:
        """Gamble money"""
        if not self.alive:
            return "Can't gamble when you're dead! (Or can you?)"

        if amount > self.money:
            return f"You only have ${self.money}! Can't bet ${amount}!"

        self.money -= amount
        self.gambling_addiction = min(100, self.gambling_addiction + 10)

        if random.random() < 0.4:
            winnings = amount * 2
            self.money += winnings
            self.happiness = min(100, self.happiness + 20)
            return f"🎰 JACKPOT! Won ${winnings}! {self.name} is riding high! 💰"
        else:
            self.happiness = max(0, self.happiness - 20)
            self.depression_level = min(100, self.depression_level + 10)
            return f"💸 Lost ${amount}... {self.name} is devastated! 😭"

    def take_loan(self, amount: int) -> str:
        """Take out a loan"""
        self.debt += amount
        self.money += amount
        return f"Borrowed ${amount}! Debt is now ${self.debt}. What could go wrong? 💸"

    def work(self) -> str:
        """Work for money"""
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

    def find_partner(self) -> str:
        """Find a romantic partner"""
        if self.has_partner:
            return f"{self.name} already has a partner! (For now...)"

        if self.happiness < 30:
            return f"{self.name} is too depressed to date. 😔"

        self.has_partner = True
        self.happiness = min(100, self.happiness + 40)
        return f"{self.name} found love! ❤️ (Let's see how long this lasts...)"

    def use_phone(self) -> str:
        """Use phone for dopamine"""
        self.phone_addiction = min(100, self.phone_addiction + 20)
        self.happiness = min(100, self.happiness + 10)
        self.energy = max(0, self.energy - 10)

        return f"{self.name} scrolled for hours. Wasted time but gained dopamine! 📱"

    def display(self) -> Panel:
        """Generate the pet display panel"""
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

        # Chaos stats
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

    def _make_bar(self, value: int, emoji: str) -> str:
        """Create a status bar"""
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
