function decodeSpell(spell: string) {
  const codex = {
    '☽': 1,
    '☾': 5,
    '♁': 10,
    '⚕': 50,
    '⚡': 100,
  } as const;

  let finalCost = 0;
  let prevCost = null;

  for (let i = 0; i < spell.length; i++) {
    const spellKey = spell[i];
    const spellCost = codex[spellKey as keyof typeof codex];

    if (!spellCost) return 'NaN';

    if (prevCost && prevCost < spellCost) {
      finalCost = finalCost - prevCost + (spellCost - prevCost);
    } else {
      finalCost += spellCost;
    }
    prevCost = spellCost;
  }

  return finalCost;
}
