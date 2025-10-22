#!/usr/bin/env python3
"""
CHAOTIC TAMAGOTCHI SIMULATOR
The most dysfunctional pet you'll ever raise.
WARNING: This gets dark. Real dark.
"""

import sys
from rich.console import Console

from app.game import run_game


console = Console()


def main():
    """Entry point"""
    try:
        run_game()
    except KeyboardInterrupt:
        console.print("\n\n[yellow]Rage quit! 👋[/yellow]")
        sys.exit(0)


if __name__ == "__main__":
    main()
