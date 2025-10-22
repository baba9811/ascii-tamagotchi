"""
Game logic and main loop
"""

import time
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt

from app.pet import ChaoticPet
from app.lang import Lang


console = Console()


def show_intro(lang: Lang):
    """Show game intro"""
    console.clear()
    console.print(Panel.fit(
        f"[bold red]⚠️  {lang.get('title')}  ⚠️[/bold red]\n\n"
        f"[yellow]{lang.get('warning')}[/yellow]\n"
        f"[cyan]{lang.get('subtitle')}[/cyan]\n\n"
        f"[dim]{lang.get('disclaimer')}[/dim]",
        border_style="bright_red"
    ))
    time.sleep(2)


def show_death_message(pet: ChaoticPet, lang: Lang):
    """Show appropriate death message"""
    console.clear()
    console.print(pet.display())

    if pet.depression_level >= 100:
        console.print(f"\n[bold red]{lang.get('death_depression', name=pet.name)}[/bold red]")
        console.print(f"[red]Depression: 100%[/red]")
    elif pet.debt > 1000:
        console.print(f"\n[bold red]{lang.get('death_debt', name=pet.name)}[/bold red]")
        console.print(f"[red]{lang.get('final_stats', money=pet.money, debt=pet.debt)}[/red]")
    elif pet.hunger >= 100:
        console.print(f"\n[bold red]{lang.get('death_hunger', name=pet.name)}[/bold red]")
    elif pet.energy <= 0:
        console.print(f"\n[bold red]{lang.get('death_exhaustion', name=pet.name)}[/bold red]")

    console.print(f"[cyan]{lang.get('survived', name=pet.name, age=pet.age)}[/cyan]")
    console.print(f"[dim]{lang.get('final_stats', money=pet.money, debt=pet.debt)}[/dim]")
    console.print(f"\n[yellow]{lang.get('life_lessons')}[/yellow]")


def get_food_list(lang: Lang):
    """Get localized food list"""
    return [
        lang.get('pizza'),
        lang.get('burger'),
        lang.get('apple'),
        lang.get('cake'),
        lang.get('carrot'),
        lang.get('sushi')
    ]


def get_toy_list(lang: Lang):
    """Get localized toy list"""
    return [
        lang.get('ball'),
        lang.get('teddy'),
        lang.get('game'),
        lang.get('art'),
        lang.get('book')
    ]


def get_vice_list(lang: Lang):
    """Get localized vice list"""
    return [
        lang.get('beer'),
        lang.get('cigarette'),
        lang.get('pill')
    ]


def handle_feed(pet: ChaoticPet, lang: Lang) -> str:
    """Handle feeding action"""
    console.print(f"\n[yellow]{lang.get('feed_prompt')}[/yellow]")
    foods = get_food_list(lang)
    for i, food in enumerate(foods, 1):
        console.print(f"{i}. {food}")

    food_choice = Prompt.ask(lang.get('pick'), choices=[str(i) for i in range(1, len(foods) + 1)])
    food = foods[int(food_choice) - 1]
    return pet.feed(food)


def handle_play(pet: ChaoticPet, lang: Lang) -> str:
    """Handle play action"""
    console.print(f"\n[yellow]{lang.get('toy_prompt')}[/yellow]")
    toys = get_toy_list(lang)
    for i, toy in enumerate(toys, 1):
        console.print(f"{i}. {toy}")

    toy_choice = Prompt.ask(lang.get('pick'), choices=[str(i) for i in range(1, len(toys) + 1)])
    toy = toys[int(toy_choice) - 1]
    return pet.play(toy)


def handle_sleep(pet: ChaoticPet, lang: Lang) -> str:
    """Handle sleep action"""
    console.print(f"\n[dim]{lang.get('sleeping')}[/dim]")
    time.sleep(1)
    return pet.sleep()


def handle_vice(pet: ChaoticPet, lang: Lang) -> str:
    """Handle vice usage"""
    console.print(f"\n[red]{lang.get('vice_prompt')}[/red]")
    vices = get_vice_list(lang)
    for i, vice in enumerate(vices, 1):
        console.print(f"{i}. {vice}")

    vice_choice = Prompt.ask(lang.get('pick'), choices=[str(i) for i in range(1, len(vices) + 1)])
    vice = vices[int(vice_choice) - 1]
    return pet.use_vice(vice)


def handle_gamble(pet: ChaoticPet, lang: Lang) -> str:
    """Handle gambling"""
    bet = Prompt.ask(f"\n{lang.get('bet_prompt', money=pet.money)}", default="20")
    try:
        return pet.gamble(int(bet))
    except:
        return "Invalid bet amount!"


def handle_work(pet: ChaoticPet, lang: Lang) -> str:
    """Handle work action"""
    console.print(f"\n[dim]{lang.get('working')}[/dim]")
    time.sleep(1)
    return pet.work()


def handle_loan(pet: ChaoticPet, lang: Lang) -> str:
    """Handle taking a loan"""
    amount = Prompt.ask(f"\n{lang.get('loan_prompt')}", default="50")
    try:
        return pet.take_loan(int(amount))
    except:
        return "Invalid amount!"


def handle_phone(pet: ChaoticPet, lang: Lang) -> str:
    """Handle phone usage"""
    console.print(f"\n[dim]{lang.get('scrolling')}[/dim]")
    time.sleep(1)
    return pet.use_phone()


def run_game():
    """Main game loop"""
    # Language selection
    console.clear()
    console.print(Panel.fit(
        "[bold cyan]Choose Language / 언어 선택 / 选择语言[/bold cyan]\n\n"
        "1. English\n"
        "2. 한국어 (Korean)\n"
        "3. 中文 (Chinese)",
        border_style="cyan"
    ))
    lang_choice = Prompt.ask("Language / 언어 / 语言", choices=["1", "2", "3"], default="1")

    lang_code = "en" if lang_choice == "1" else "ko" if lang_choice == "2" else "zh"
    lang = Lang(lang_code)

    show_intro(lang)

    console.print(f"\n[bold green]{lang.get('wild_creature')}[/bold green]\n")
    time.sleep(0.5)

    name = Prompt.ask(f"[yellow]{lang.get('name_prompt')}[/yellow]", default="Fluffy" if lang_code == "en" else "복실이")

    pet = ChaoticPet(name, lang)

    console.print(f"\n[bold cyan]{lang.get('adopted', name=name)}[/bold cyan]")
    console.print(f"[dim]{lang.get('good_luck')}[/dim]\n")
    time.sleep(1.5)

    turn = 0
    last_message = lang.get('welcome_msg', name=name)

    # Main game loop
    while pet.alive:
        console.clear()

        # Display pet status
        console.print(pet.display())
        console.print(f"\n[dim]{lang.get('turn', turn=turn)}[/dim]")
        console.print(f"[italic]{last_message}[/italic]\n")

        # Show menu
        console.print(f"[bold]{lang.get('menu_title')}[/bold]")
        console.print(f"1. {lang.get('feed')}")
        console.print(f"2. {lang.get('play')}")
        console.print(f"3. {lang.get('sleep')}")
        console.print(f"4. {lang.get('clean')}")
        console.print(f"5. {lang.get('vice')}")
        console.print(f"6. {lang.get('gamble')}")
        console.print(f"7. {lang.get('work')}")
        console.print(f"8. {lang.get('loan')}")
        console.print(f"9. {lang.get('phone')}")
        console.print(f"10. {lang.get('partner')}")
        console.print(f"11. {lang.get('quit')}")

        choice = Prompt.ask(f"\n{lang.get('choice')}", choices=[str(i) for i in range(1, 12)], default="1")

        # Handle actions
        if choice == "1":
            last_message = handle_feed(pet, lang)
        elif choice == "2":
            last_message = handle_play(pet, lang)
        elif choice == "3":
            last_message = handle_sleep(pet, lang)
        elif choice == "4":
            last_message = pet.clean_poop()
        elif choice == "5":
            last_message = handle_vice(pet, lang)
        elif choice == "6":
            last_message = handle_gamble(pet, lang)
        elif choice == "7":
            last_message = handle_work(pet, lang)
        elif choice == "8":
            last_message = handle_loan(pet, lang)
        elif choice == "9":
            last_message = handle_phone(pet, lang)
        elif choice == "10":
            last_message = pet.find_partner()
        elif choice == "11":
            console.print(f"\n[yellow]{lang.get('thanks', name=name)}[/yellow]")
            console.print(f"[dim]{lang.get('miss_you')}[/dim]\n")
            return

        # Time passes
        pet.tick()
        turn += 1
        time.sleep(0.5)

    # Game over
    show_death_message(pet, lang)
    console.print(f"\n[dim]{lang.get('press_enter')}[/dim]")
    input()
