<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar @click="mailToMe" class="cursor-pointer">
          <img src="/src/assets/images/esLogo.png" alt="" />
        </q-avatar>
        <q-toolbar-title> Challenge</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
function mailToMe(): void {
  const mailBodyText =
    'Hallo%20Johannes%2C%0A%0AWir%20möchten%20dich%20gerne%20einstellen.%0D%0ABis%20die%20Tage%20%3A)';

  window.open(`mailto:nissenjohannes@web.de?subject=Enginsight&body=${mailBodyText}`);
}
</script>
