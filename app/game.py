"""
Game logic and main loop
"""

import time
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt

from app.pet import ChaoticPet


console = Console()


def show_intro():
    """Show game intro"""
    console.clear()
    console.print(Panel.fit(
        "[bold red]⚠️  CHAOTIC TAMAGOTCHI SIMULATOR  ⚠️[/bold red]\n\n"
        "[yellow]WARNING: Contains depression, addiction, debt, and bad life choices[/yellow]\n"
        "[cyan]The most dysfunctional pet you'll ever raise[/cyan]\n\n"
        "[dim]Not responsible for emotional damage[/dim]",
        border_style="bright_red"
    ))
    time.sleep(2)


def show_death_message(pet: ChaoticPet):
    """Show appropriate death message"""
    console.clear()
    console.print(pet.display())

    if pet.depression_level >= 100:
        console.print(f"\n[bold red]💔 {pet.name} couldn't take it anymore... 💔[/bold red]")
        console.print("[red]Depression: 100%[/red]")
    elif pet.debt > 1000:
        console.print(f"\n[bold red]💸 {pet.name} was crushed by debt! 💸[/bold red]")
        console.print(f"[red]Final debt: ${pet.debt}[/red]")
    elif pet.hunger >= 100:
        console.print(f"\n[bold red]💀 {pet.name} starved to death! 💀[/bold red]")
    elif pet.energy <= 0:
        console.print(f"\n[bold red]😴 {pet.name} died from exhaustion! 😴[/bold red]")

    console.print(f"[cyan]They survived {pet.age} turns of chaos.[/cyan]")
    console.print(f"[dim]Final money: ${pet.money} | Final debt: ${pet.debt}[/dim]")
    console.print("\n[yellow]Life lessons learned: 0[/yellow]")


def handle_feed(pet: ChaoticPet) -> str:
    """Handle feeding action"""
    console.print("\n[yellow]What should we feed them?[/yellow]")
    for i, food in enumerate(ChaoticPet.FOODS, 1):
        console.print(f"{i}. {food}")

    food_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(ChaoticPet.FOODS) + 1)])
    food = ChaoticPet.FOODS[int(food_choice) - 1]
    return pet.feed(food)


def handle_play(pet: ChaoticPet) -> str:
    """Handle play action"""
    console.print("\n[yellow]What toy?[/yellow]")
    for i, toy in enumerate(ChaoticPet.TOYS, 1):
        console.print(f"{i}. {toy}")

    toy_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(ChaoticPet.TOYS) + 1)])
    toy = ChaoticPet.TOYS[int(toy_choice) - 1]
    return pet.play(toy)


def handle_sleep(pet: ChaoticPet) -> str:
    """Handle sleep action"""
    console.print("\n[dim]💤 Putting pet to sleep...[/dim]")
    time.sleep(1)
    return pet.sleep()


def handle_vice(pet: ChaoticPet) -> str:
    """Handle vice usage"""
    console.print("\n[red]Choose your poison...[/red]")
    for i, vice in enumerate(ChaoticPet.VICES, 1):
        console.print(f"{i}. {vice}")

    vice_choice = Prompt.ask("Pick", choices=[str(i) for i in range(1, len(ChaoticPet.VICES) + 1)])
    vice = ChaoticPet.VICES[int(vice_choice) - 1]
    return pet.use_vice(vice)


def handle_gamble(pet: ChaoticPet) -> str:
    """Handle gambling"""
    bet = Prompt.ask(f"\n💰 How much to bet? (You have ${pet.money})", default="20")
    try:
        return pet.gamble(int(bet))
    except:
        return "Invalid bet amount!"


def handle_work(pet: ChaoticPet) -> str:
    """Handle work action"""
    console.print("\n[dim]💼 Working...[/dim]")
    time.sleep(1)
    return pet.work()


def handle_loan(pet: ChaoticPet) -> str:
    """Handle taking a loan"""
    amount = Prompt.ask("\n💸 How much to borrow?", default="50")
    try:
        return pet.take_loan(int(amount))
    except:
        return "Invalid amount!"


def handle_phone(pet: ChaoticPet) -> str:
    """Handle phone usage"""
    console.print("\n[dim]📱 Scrolling...[/dim]")
    time.sleep(1)
    return pet.use_phone()


def run_game():
    """Main game loop"""
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

    # Main game loop
    while pet.alive:
        console.clear()

        # Display pet status
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

        # Handle actions
        if choice == "1":
            last_message = handle_feed(pet)
        elif choice == "2":
            last_message = handle_play(pet)
        elif choice == "3":
            last_message = handle_sleep(pet)
        elif choice == "4":
            last_message = pet.clean_poop()
        elif choice == "5":
            last_message = handle_vice(pet)
        elif choice == "6":
            last_message = handle_gamble(pet)
        elif choice == "7":
            last_message = handle_work(pet)
        elif choice == "8":
            last_message = handle_loan(pet)
        elif choice == "9":
            last_message = handle_phone(pet)
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
    show_death_message(pet)
    console.print("\n[dim]Press Enter to exit...[/dim]")
    input()
