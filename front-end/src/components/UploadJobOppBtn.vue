<template>
    <v-btn
            fixed
            bottom
            right
            fab
            class="mb-12 mr-8"
            color="highlight"
            dark
            @click="btnClicked"
    >
        <v-icon>
            mdi-upload
        </v-icon>

    </v-btn>
</template>

<script>
    export default {
        name: "UploadJobOppBtn",
        props: ['action'],
        methods: {
            btnClicked: function () {
                this.action()
            }
        }
    }
</script>

<style scoped>
    .scroll {
        overflow-y: auto;
    }
</style>