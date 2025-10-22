/**
 * Pet Model - The chaotic creature itself
 * Ported from Python app/pet.py
 */

export interface PetStats {
  // Basic stats
  hunger: number;          // 0-100
  happiness: number;       // 0-100
  energy: number;          // 0-100
  age: number;
  alive: boolean;
  mood: PetMood;

  // Economy
  money: number;
  debt: number;

  // Mental Health
  depressionLevel: number; // 0-100
  addictionLevel: number;  // 0-100
  phoneAddiction: number;  // 0-100
  gamblingAddiction: number;

  // Social
  hasPartner: boolean;
  partnerName?: string;
  isRebellious: boolean;

  // Gameplay
  poopCount: number;
}

export type PetMood =
  | 'happy'
  | 'excited'
  | 'hungry'
  | 'sleepy'
  | 'angry'
  | 'love'
  | 'dead'
  | 'depressed'
  | 'drunk'
  | 'addicted'
  | 'rebellious'
  | 'broke';

export type FoodType = 'pizza' | 'burger' | 'apple' | 'cake' | 'carrot' | 'sushi';
export type ToyType = 'ball' | 'teddy' | 'game' | 'art' | 'book';
export type ViceType = 'beer' | 'cigarette' | 'pill';

export class Pet {
  stats: PetStats;
  name: string;

  constructor(name: string) {
    this.name = name;
    this.stats = {
      // Basic stats
      hunger: 50,
      happiness: 50,
      energy: 50,
      age: 0,
      alive: true,
      mood: 'happy',

      // Economy
      money: 100,
      debt: 0,

      // Mental Health
      depressionLevel: 0,
      addictionLevel: 0,
      phoneAddiction: 0,
      gamblingAddiction: 0,

      // Social
      hasPartner: false,
      isRebellious: false,

      // Gameplay
      poopCount: 0,
    };
  }

  /**
   * Update mood based on current stats
   */
  private updateMood(): void {
    const { alive, depressionLevel, addictionLevel, money, debt, isRebellious, hunger, energy, happiness } = this.stats;

    if (!alive) {
      this.stats.mood = 'dead';
    } else if (depressionLevel > 70) {
      this.stats.mood = 'depressed';
    } else if (addictionLevel > 50) {
      this.stats.mood = 'addicted';
    } else if (money < 0 || debt > 100) {
      this.stats.mood = 'broke';
    } else if (isRebellious) {
      this.stats.mood = 'rebellious';
    } else if (hunger > 80) {
      this.stats.mood = 'angry';
    } else if (hunger > 60) {
      this.stats.mood = 'hungry';
    } else if (energy < 20) {
      this.stats.mood = 'sleepy';
    } else if (happiness > 80) {
      this.stats.mood = 'love';
    } else if (happiness > 60) {
      this.stats.mood = 'excited';
    } else {
      this.stats.mood = 'happy';
    }
  }

  /**
   * Time passes... chaos ensues
   */
  tick(): void {
    // Basic stats decay
    this.stats.hunger = Math.min(100, this.stats.hunger + this.random(3, 7));
    this.stats.happiness = Math.max(0, this.stats.happiness - this.random(1, 4));
    this.stats.energy = Math.max(0, this.stats.energy - this.random(2, 5));
    this.stats.age += 1;

    // Poop happens (30% chance)
    if (Math.random() < 0.3) {
      this.stats.poopCount += 1;
      if (this.stats.poopCount > 3) {
        this.stats.happiness = Math.max(0, this.stats.happiness - 10);
      }
    }

    // Debt compounds (10% per turn)
    if (this.stats.debt > 0) {
      this.stats.debt = Math.floor(this.stats.debt * 1.1);
    }

    // Addiction withdrawal
    if (this.stats.addictionLevel > 0) {
      this.stats.addictionLevel = Math.max(0, this.stats.addictionLevel - 3);
      this.stats.happiness = Math.max(0, this.stats.happiness - 5);
    }

    // Phone addiction effects
    if (this.stats.phoneAddiction > 30) {
      this.stats.happiness = Math.max(0, this.stats.happiness - 2);
    }

    // Depression mechanics
    if (this.stats.happiness < 20) {
      this.stats.depressionLevel = Math.min(100, this.stats.depressionLevel + 5);
    } else {
      this.stats.depressionLevel = Math.max(0, this.stats.depressionLevel - 2);
    }

    // Teenage rebellion (age 10-20)
    this.stats.isRebellious = this.stats.age >= 10 && this.stats.age <= 20;

    // Relationship drama
    if (this.stats.hasPartner && Math.random() < 0.1) {
      if (this.stats.happiness < 40) {
        this.stats.hasPartner = false;
        this.stats.depressionLevel = Math.min(100, this.stats.depressionLevel + 30);
      }
    }

    // Death conditions
    if (
      this.stats.hunger >= 100 ||
      this.stats.energy <= 0 ||
      this.stats.debt > 1000 ||
      this.stats.depressionLevel >= 100
    ) {
      this.stats.alive = false;
    }

    this.updateMood();
  }

  /**
   * Feed the pet
   */
  feed(food: FoodType): string {
    if (!this.stats.alive) {
      return "Your pet is... not hungry anymore 💀";
    }

    const cost = 10;
    if (this.stats.money < cost) {
      return `You're broke! Can't afford ${food}! 💸`;
    }

    this.stats.money -= cost;
    this.stats.hunger = Math.max(0, this.stats.hunger - this.random(20, 35));
    this.stats.happiness = Math.min(100, this.stats.happiness + this.random(5, 15));

    const messages = [
      `*nom nom nom* ${this.name} devoured the ${food}!`,
      `${this.name} loved the ${food}! So tasty!`,
      `*munch munch* ${this.name} is satisfied!`,
      `${this.name} ate the ${food} in one bite! WOW!`,
    ];

    if (this.stats.isRebellious && Math.random() < 0.3) {
      this.stats.happiness = Math.max(0, this.stats.happiness - 10);
      this.updateMood();
      return `${this.name} threw the ${food} at you! 'I HATE YOU!' 😡`;
    }

    this.updateMood();
    return this.randomChoice(messages);
  }

  /**
   * Play with the pet
   */
  play(toy: ToyType): string {
    if (!this.stats.alive) {
      return "Your pet can't play anymore... 😢";
    }

    if (this.stats.depressionLevel > 60) {
      return `${this.name} is too depressed to play... 😔`;
    }

    if (this.stats.phoneAddiction > 50) {
      this.stats.phoneAddiction += 10;
      return `${this.name} ignores you and keeps scrolling on their phone! 📱`;
    }

    if (this.stats.energy < 10) {
      this.stats.energy = Math.max(0, this.stats.energy - 5);
      return `${this.name} is too tired to play! Let them sleep!`;
    }

    this.stats.happiness = Math.min(100, this.stats.happiness + this.random(15, 30));
    this.stats.energy = Math.max(0, this.stats.energy - this.random(10, 20));
    this.stats.depressionLevel = Math.max(0, this.stats.depressionLevel - 10);

    const messages = [
      `*zoom zoom* ${this.name} had a blast with the ${toy}!`,
      `${this.name} is having so much fun with the ${toy}!`,
      `*giggle* ${this.name} loves the ${toy}!`,
      `${this.name} did a backflip while playing with ${toy}!`,
    ];

    this.updateMood();
    return this.randomChoice(messages);
  }

  /**
   * Let the pet sleep
   */
  sleep(): string {
    if (!this.stats.alive) {
      return "They're sleeping... forever 😔";
    }

    this.stats.energy = Math.min(100, this.stats.energy + this.random(30, 50));
    this.stats.happiness = Math.min(100, this.stats.happiness + this.random(5, 10));

    const sleepMessages = [
      `*Zzzzz* ${this.name} had a great nap!`,
      `${this.name} is refreshed and full of energy!`,
      `*yawn* ${this.name} woke up feeling amazing!`,
      `${this.name} dreamed about you! 💭`,
    ];

    if (this.stats.depressionLevel > 60) {
      this.updateMood();
      return `${this.name} slept but still feels empty inside... 😔`;
    }

    this.updateMood();
    return this.randomChoice(sleepMessages);
  }

  /**
   * Clean up the poop
   */
  cleanPoop(): string {
    if (this.stats.poopCount === 0) {
      return "There's no poop to clean! (Yet...)";
    }

    const oldCount = this.stats.poopCount;
    this.stats.poopCount = 0;
    this.stats.happiness = Math.min(100, this.stats.happiness + 15);

    return `You cleaned up ${oldCount} poops! 💩 ${this.name} is happy now!`;
  }

  /**
   * Use a vice for temporary happiness
   */
  useVice(vice: ViceType): string {
    if (!this.stats.alive) {
      return "They're beyond temptation now...";
    }

    const cost = 15;
    if (this.stats.money < cost) {
      return "Too broke for vices! That's... actually good? 💸";
    }

    this.stats.money -= cost;
    this.stats.addictionLevel = Math.min(100, this.stats.addictionLevel + 15);
    this.stats.happiness = Math.min(100, this.stats.happiness + 30);
    this.stats.energy = Math.max(0, this.stats.energy - 10);

    const messages: Record<ViceType, string> = {
      beer: `${this.name} chugged the beer! 'YOLO!' *burp* 🍺`,
      cigarette: `${this.name} smoked a cigarette. Looking cool, dying inside. 🚬`,
      pill: `${this.name} took the pill. Things are getting weird... 💊`,
    };

    this.updateMood();
    return messages[vice];
  }

  /**
   * Gamble money
   */
  gamble(amount: number): string {
    if (!this.stats.alive) {
      return "Can't gamble when you're dead! (Or can you?)";
    }

    if (amount > this.stats.money) {
      return `You only have $${this.stats.money}! Can't bet $${amount}!`;
    }

    this.stats.money -= amount;
    this.stats.gamblingAddiction = Math.min(100, this.stats.gamblingAddiction + 10);

    // 40% chance to win
    if (Math.random() < 0.4) {
      const winnings = amount * 2;
      this.stats.money += winnings;
      this.stats.happiness = Math.min(100, this.stats.happiness + 20);
      return `🎰 JACKPOT! Won $${winnings}! ${this.name} is riding high! 💰`;
    } else {
      this.stats.happiness = Math.max(0, this.stats.happiness - 20);
      this.stats.depressionLevel = Math.min(100, this.stats.depressionLevel + 10);
      return `💸 Lost $${amount}... ${this.name} is devastated! 😭`;
    }
  }

  /**
   * Take out a loan
   */
  takeLoan(amount: number): string {
    this.stats.debt += amount;
    this.stats.money += amount;
    return `Borrowed $${amount}! Debt is now $${this.stats.debt}. What could go wrong? 💸`;
  }

  /**
   * Work for money
   */
  work(): string {
    if (!this.stats.alive) {
      return "Dead people don't work. (Usually.)";
    }

    if (this.stats.depressionLevel > 70) {
      return `${this.name} called in sick. Too depressed to work. 😔`;
    }

    if (this.stats.isRebellious) {
      return `${this.name} quit their job! 'YOU CAN'T TELL ME WHAT TO DO!' 🤬`;
    }

    const earnings = this.random(20, 40);
    this.stats.money += earnings;
    this.stats.energy = Math.max(0, this.stats.energy - 20);
    this.stats.happiness = Math.max(0, this.stats.happiness - 10);

    return `${this.name} worked and earned $${earnings}! (But at what cost?) 💼`;
  }

  /**
   * Find a romantic partner
   */
  findPartner(): string {
    if (this.stats.hasPartner) {
      return `${this.name} already has a partner! (For now...)`;
    }

    if (this.stats.happiness < 30) {
      return `${this.name} is too depressed to date. 😔`;
    }

    this.stats.hasPartner = true;
    this.stats.happiness = Math.min(100, this.stats.happiness + 40);
    return `${this.name} found love! ❤️ (Let's see how long this lasts...)`;
  }

  /**
   * Use phone for dopamine
   */
  usePhone(): string {
    this.stats.phoneAddiction = Math.min(100, this.stats.phoneAddiction + 20);
    this.stats.happiness = Math.min(100, this.stats.happiness + 10);
    this.stats.energy = Math.max(0, this.stats.energy - 10);

    return `${this.name} scrolled for hours. Wasted time but gained dopamine! 📱`;
  }

  /**
   * Get death reason
   */
  getDeathReason(): string {
    if (this.stats.depressionLevel >= 100) {
      return 'depression';
    } else if (this.stats.debt > 1000) {
      return 'debt';
    } else if (this.stats.hunger >= 100) {
      return 'starvation';
    } else if (this.stats.energy <= 0) {
      return 'exhaustion';
    }
    return 'unknown';
  }

  // Helper methods
  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
