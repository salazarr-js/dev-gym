# (🧙 El códice de Arkanus)[https://midu.dev/retos/30-dias-de-javascript/el-codice-de-arkanus]

Naira, una aprendiz de hechicera, ha encontrado un antiguo códice en las ruinas de Arkanus. Este códice está lleno de símbolos arcanos que, según los manuscritos, ocultan un poderoso conjuro olvidado. Para descifrar el conjuro, debe interpretar correctamente los símbolos según un antiguo sistema numérico mágico.

Estos son los símbolos conocidos y sus equivalencias:

| Símbolo | Valor |
|:-------:|:------:|
| ☽ | 1 |
| ☾ | 5 |
| ♁ | 10 |
| ⚕ | 50 |
| ⚡ | 100 |

**Pero cuidado:** la energía mágica es caprichosa. Si un símbolo de menor valor aparece justo antes que uno de mayor valor, su energía se resta en lugar de sumarse.

Debes crear una función que reciba una cadena con los símbolos y retorne su valor numérico total. Si encuentras un símbolo desconocido, el conjuro se corrompe, y la función debe devolver `NaN`.

## Convierte números a letras según:

```ts
decodeSpell('☽☽☽') // 3
decodeSpell('☽☾') // 4 (5 - 1)
decodeSpell('☾☽') // 6 (5 + 1)
decodeSpell('☾☽☽☽') // 8 (5 + 3)
decodeSpell('☽☽☽⚡') // 101 (1 + 1 + (100 - 1))
decodeSpell('☽⚕') // 49 (50 - 1)
decodeSpell('☽☽☾') // 5 (1 + (5 - 1))
decodeSpell('☽☽☾⚡') // 95 (1 + (-1 + (100 - 5)))
decodeSpell('☽⚕⚡') // 49 (-1 - 50 + 100)
decodeSpell('⚡⚡⚡') // 300
decodeSpell('⚕⚡') // 50
decodeSpell('⚕.♒') // NaN
```

---

> https://midu.dev/retos/30-dias-de-javascript/el-codice-de-arkanus

---

<details>
  <summary>SOLUTION</summary>
  
```ts
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
```
</details>


