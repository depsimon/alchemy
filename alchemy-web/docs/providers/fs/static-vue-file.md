# StaticVueFile

The StaticVueFile resource creates [Vue single-file components](https://vuejs.org/guide/scaling-up/sfc.html) with template, script and style blocks.

# Minimal Example

Creates a basic Vue component file with template, script and style blocks.

```ts
import { StaticVueFile } from "alchemy/fs";

const button = await StaticVueFile("Button.vue", `
<template>
  <button class="btn">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style>
.btn {
  padding: 0.5rem 1rem;
}
</style>
`);
```

# Custom Path

Creates a Vue component file at a specific path.

```ts
import { StaticVueFile } from "alchemy/fs";

const header = await StaticVueFile("Header.vue", 
  "components/Header.vue",
  `<template>
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <slot />
      </nav>
    </header>
  </template>

  <script>
  export default {
    props: {
      title: String
    }
  }
  </script>
`);
```