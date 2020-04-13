<template>
    <v-footer
            app
            color="neutral"
            class="pa-0"
            elevation="5"
    >
        <span class="pl-3">&copy; 2020</span>
        <v-row class="ma-0">
            <v-col justify="start">

            </v-col>
            <v-col justify="end" class="text-end">
                <a style="text-decoration: none"
                   class="black--text pr-2"
                   href="https://github.com/franklinCarson/employment"
                   target="_blank"
                >
                    GitHub
                </a>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

</style>