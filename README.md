# Terminal Pet Simulator

> The most important software you'll run today. Period.

![Python](https://img.shields.io/badge/python-3.12+-blue.svg)
![Status](https://img.shields.io/badge/status-absolutely%20essential-brightgreen.svg)
![Fun Level](https://img.shields.io/badge/fun%20level-MAXIMUM-ff69b4.svg)

A ridiculously fun terminal-based virtual pet game built with Python. Because who doesn't need another responsibility in their life?

## What is this?

Remember Tamagotchi? This is like that, but in your terminal, and your pet can actually die from neglect. Fun times!

Adopt an ASCII creature, give it a name, and try to keep it alive by:
- 🍕 **Feeding** it delicious foods (pizza, sushi, carrots if you're a monster)
- 🎾 **Playing** with toys to keep it happy
- 😴 Letting it **sleep** to restore energy

But beware! Time passes with each action, and your pet's stats will change. Let it get too hungry or too tired, and... well, let's just say you'll have to start over.

## Features

- **Dynamic Moods**: Your pet has feelings! Watch its expressions change based on how well you treat it
- **Multiple Activities**: Feed, play, sleep - the classic trifecta of existence
- **Rich Terminal UI**: Colorful panels, status bars, and animated text using the `rich` library
- **Permadeath**: Your pet can die. This is not a drill. You've been warned.
- **Random Events**: Different messages and outcomes keep things fresh
- **Age Tracking**: See how long your pet survives your "care"

## Moods

Your pet can experience various emotional states:

- **Happy** - Everything is fine
- **Excited** - Life is amazing!
- **Hungry** - Feed me... please?
- **Sleepy** - Need... sleep...
- **Angry** - You've neglected me!
- **Love** - Best owner ever!
- **Dead** - You monster.

## Installation

Make sure you have Python 3.12+ and [uv](https://github.com/astral-sh/uv) installed.

```bash
# Clone the repo
git clone https://github.com/yourusername/ascii-tamagotchi.git
cd ascii-tamagotchi

# Install dependencies with uv
uv sync

# Run the game
uv run python main.py
```

## How to Play

1. Run the game
2. Name your new friend
3. Choose actions each turn:
   - **Feed**: Pick from 6 different foods to reduce hunger
   - **Play**: Choose a toy to increase happiness (costs energy)
   - **Sleep**: Restore energy and get a small happiness boost
   - **Quit**: Abandon your pet (you monster)
4. Keep your pet's stats balanced
5. Try to survive as long as possible

### Pro Tips

- Don't let hunger reach 100 or your pet dies
- Don't let energy reach 0 or your pet dies
- Playing is great but watch that energy bar
- Sleep isn't just for the weak, it's for the alive
- Pizza > carrots (fight me)

## Stats Explained

- **Hunger**: Goes up over time. Feed your pet to reduce it. Max = death.
- **Happiness**: Slowly decreases. Play to boost it. Affects mood.
- **Energy**: Depletes over time and when playing. Sleep to restore it. Zero = death.

## What It Looks Like

Your pet appears in a colorful terminal interface with:
- Animated ASCII art character with different expressions
- Real-time status bars for hunger, happiness, and energy
- Dynamic mood changes based on stats
- Colorful UI panels and borders
- Random funny messages for each action

Run `uv run python main.py` to see it in action!

## Why Does This Exist?

Because sometimes you need to build something completely pointless and fun. Not everything needs to be a SaaS product or solve world hunger. Sometimes you just need a digital friend in your terminal.

Also, it's a great way to procrastinate from actual work while still looking productive with code on your screen.

## Contributing

Want to make this even more ridiculous? PRs welcome!

Ideas for future features:
- Pet poop that needs cleaning
- Multiple pets that can interact
- Pet evolution system
- Mini-games
- Save/load system
- Pet graveyard
- Dating system for pets
- Pet jobs and careers
- Pet social media

## License

MIT - Do whatever you want with this. Make millions. Just remember me when you're rich.

## Acknowledgments

- Inspired by Tamagotchi, Neopets, and every virtual pet game that taught us the harsh reality of responsibility
- Built with [rich](https://github.com/Textualize/rich) for beautiful terminal UI
- Managed with [uv](https://github.com/astral-sh/uv) because it's blazingly fast

---

**Remember**: A fed pet is a happy pet. A happy pet is a living pet. A living pet won't haunt your dreams.

Now go forth and be the pet owner you always knew you could be! 🎮
