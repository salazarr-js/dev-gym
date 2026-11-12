/**
 * NOTE (design discussion, code below is the unedited first attempt):
 *
 * Idea: group rules and evaluate them recursively, group by group, so conditions can
 * be chained into more complex expressions.
 *
 * Weak point: the rules are a flat infix list (condition, logical token, condition),
 * which is ambiguous, mixes shapes (the logical token carries a meaningless `prop`)
 * and allows invalid states (two operators in a row).
 *
 * Better: a tree with three node types, evaluated recursively:
 *   - compare: { type: 'compare', prop, op, value }
 *   - and:     { type: 'and', rules: [...] }   -> every
 *   - or:      { type: 'or', rules: [...] }    -> some
 *   (not: a node with a single child, if needed)
 *
 * Example: (country = us AND age >= 18) OR country = ar
 *   { type: 'or', rules: [
 *     { type: 'and', rules: [
 *       { type: 'compare', prop: 'country', op: 'eq', value: 'us' },
 *       { type: 'compare', prop: 'age', op: 'gte', value: 18 },
 *     ]},
 *     { type: 'compare', prop: 'country', op: 'eq', value: 'ar' },
 *   ]}
 *
 * For a quick, imperfect interview: start with a flat list where everything is AND,
 * and move to the tree only if OR is requested.
 */

// TODO: `featureflagRules` type
// TODO: `createFeatureFlagSystem:params` type
// TODO: `userFlags` type
// TODO: `compare` type


/** */
function compare(a: unknown, op: string, b: unknown) {
  if (op === 'eq') return a === b
  if (op === 'gte') return a >= b

  if (op === 'AND') return a && b
  if (op === 'OR') return a || b

  return null
}

/** */
const featureflagRules = [
  {
    name: 'is-admin',
    isEnabled: true,
    rules: [{ prop: 'isAdmin', op: 'eq', value: true }],
  },
  {
    name: 'us-18',
    isEnabled: true,
    rules: [
      { type: 'compare', prop: 'country', op: 'eq', value: 'us' },
      { type: 'logical', prop: 'country', value: 'AND' },
      { type: 'compare', prop: 'age', op: 'gte', value: 18 },
    ]
  }
]

/** */
const featureflagRulesMap: Map<string, typeof featureflagRules[0]>  = featureflagRules
.reduce((map, value) => map.set(value.name, value), new Map())

/** */
function validateRules(rules: typeof featureflagRules[0]['rules'], payload) {
  console.warn('validateRules: ',{ rules, payload})

  if (rules.length === 1)
    return compare(rules[0].value, rules[0].op, payload[rules[0].prop])

  validate

  return false
}

/** */
function createFeatureFlagSystem(params) {

  let isEnabled = params.isEnabled ?? true

  return {
    toggle(value?: boolean) {
      isEnabled = value ?? !isEnabled
    },
    isEnabled(featureName: string, payload) {
      if (!isEnabled) {
        console.warn('FeatureFlagSystem is disabled')
        return  false
      }

      if (!featureflagRulesMap.has(featureName)) {
        console.warn(`Feature '${featureName}' does't exist`)
        return  false
      }

      const featureFlag = featureflagRulesMap.get(featureName)

      if (!featureFlag.isEnabled) {
        console.warn(`Feature '${featureName}' is disabled`)
        return  false
      }

      return validateRules(featureFlag.rules, payload)
    }
  }
}

// SINGLETON
const featureflagSystem = createFeatureFlagSystem({ });

// const isAdmin1 = featureflagSystem.isEnabled('is-admin', { isAdmin: true })
// const isAdmin2 = featureflagSystem.isEnabled('is-adminasd', { isAdmin: true })
// console.warn('FEATUREFLAGS', { isAdmin1, isAdmin2 })


const us18 = featureflagSystem.isEnabled('us-18', { country: 'us', age: 18 })
// const us16 = featureflagSystem.isEnabled('us-18', { country: 'us', age: 16 })
// const ar17 = featureflagSystem.isEnabled('us-18', { country: 'ar', age: 17 })
// const ar20 = featureflagSystem.isEnabled('us-18', { country: 'ar', age: 20 })
console.warn('FEATUREFLAGS', {
  us18,
  // us16,
  // ar17,
  // ar20
})
