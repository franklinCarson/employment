<template>
    <div>
        <v-overlay v-if="shown"
            z-index="6"
        >
            <v-card light
                class="pa-3"
                min-width="400">
                <v-row class="pa-0 ma-0">
                    <v-spacer/>
                    <v-btn icon
                        @click="closeButtonClicked">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-row>
                <v-card-title>
                    Aaron Proctor
                </v-card-title>
                <v-card-subtitle>
                    Ward Employment Specialist
                </v-card-subtitle>

                <v-row class="pa-3">
                    <v-col>
                        <v-chip
                                label
                                color="highlight"
                                dark
                        >
                            <v-icon left>
                                mdi-phone
                            </v-icon>
                            Phone:
                        </v-chip>
                    </v-col>
                    <v-col>
                        <div class="pt-1 text-end">
                            801-833-3612
                        </div>
                    </v-col>

                </v-row>
                <v-row class="pa-3">
                    <v-col>
                        <v-chip
                                label
                                color="highlight"
                                dark
                        >
                            <v-icon left>
                                mdi-email-outline
                            </v-icon>
                            Email:
                        </v-chip>
                    </v-col>
                    <v-col>
                        <div class="pt-1 text-end">
                            procaaron@gmail.com
                        </div>
                    </v-col>

                </v-row>
            </v-card>
        </v-overlay>
    </div>
</template>

<script>
    export default {
        name: "Contact",
        data: () => ({
            shown: false
        }),
        methods: {
            toggleShown: function () {
                this.shown = !this.shown
            },
            closeButtonClicked: function () {
                this.toggleShown()
            }
        }
    }
</script>

<style scoped>

</style>