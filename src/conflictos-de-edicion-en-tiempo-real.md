# Conflictos de edición en tiempo real

En una app colaborativa de edición de texto, múltiples usuarios pueden editar el mismo documento al mismo tiempo. Para mantener consistencia, el sistema guarda cada cambio con una estructura así:

Formato:
```json
{
  user: "ana",
  op: "insert" | "delete",
  index: 4,
  text: "abc" // solo si es un insert
}
```

Tu misión es implementar una función `resolverConflictos` que tome dos arrays con los cambios hechos por dos usuarios diferentes y devuelva el estado final del texto asumiendo que:

- El texto inicial es una cadena vacía `""`.
- Se aplican primero todas las operaciones del primer array (en orden).

Luego, se aplican las del segundo array, pero:

- Si una operación apunta a un índice fuera del texto actual, se ignora.
- En el caso de insert, si el índice es válido, se inserta el texto (desplazando lo demás).
- En el caso de delete, se borra un carácter en el índice dado si existe.

Ejemplo:
```js
const cambiosA = [
  { user: 'ana', op: 'insert', index: 0, text: 'Hola' },
  { user: 'ana', op: 'insert', index: 4, text: ' mundo' },
]
 
const cambiosB = [
  { user: 'luis', op: 'delete', index: 4 },
  { user: 'luis', op: 'insert', index: 4, text: 'Mundo cruel' },
]
 
resolverConflictos(cambiosA, cambiosB)
// => "HolaMundo cruelmundo"
```

## Reglas:
- El texto comienza vacío.
- Los índices son relativos al estado actual del texto en ese momento.
- No se validan índices negativos ni tipos incorrectos.
- No modificar los arrays originales.

---

> https://midu.dev/retos/30-dias-de-javascript/conflictos-de-edicion-en-tiempo-real

---

<details>
  <summary>Solution</summary>
  
```ts
function resolverConflictos(firstUserChanges: Array<{ user: string, op: string, index: number, text: string }>, secondUserChanges: Array<{ user: string, op: string, index: number, text: string }>) {
  return []
}
```
</details>
