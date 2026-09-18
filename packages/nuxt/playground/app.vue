<template>
  <main style="padding: 32px; display: flex; flex-direction: column; gap: 16px; align-items: start">
    <h1>@smalt-ui/nuxt playground</h1>

    <!-- Components are auto-imported by the module (no explicit import). -->
    <SButton variant="primary">Nuxt button</SButton>
    <SInput
      label="Name"
      placeholder="Enter your name"
    />

    <SDialog
      title="Confirmation"
      description="SSR-safe dialog"
    >
      <template #trigger>
        <SButton variant="outline">Open dialog</SButton>
      </template>
      Dialog body.
      <template #footer>
        <SButton variant="primary">OK</SButton>
      </template>
    </SDialog>
  </main>
</template>
