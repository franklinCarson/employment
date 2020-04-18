<template>
    <v-dialog v-model="shown"
              max-width="800"
    >
        <v-card
                light
                class="pa-3"
        >
            <v-row>
                <v-card-title>
                    Please Enter Your Information
                </v-card-title>
                <v-spacer/>
                <v-btn fab
                        color="error"
                        dark
                        small
                        class="mr-4"
                        icon
                        @click="cancelButtonClicked"
                >
                    <v-icon>
                        mdi-cancel
                    </v-icon>
                </v-btn>
            </v-row>
            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col
                                cols="12"
                                md="4"
                        >
                            <v-text-field
                                    v-model="firstName"
                                    :rules="nameRules"
                                    label="First name"
                                    required
                            ></v-text-field>
                        </v-col>

                        <v-col
                                cols="12"
                                md="4"
                        >
                            <v-text-field
                                    v-model="lastName"
                                    :rules="nameRules"
                                    label="Last name"
                                    required
                            ></v-text-field>
                        </v-col>

                        <v-col
                                cols="12"
                                md="4"
                        >
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="highlight"
                        dark
                        @click="submitButtonClicked"
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "RequestInfo",
        props: ['opportunityTitle'],
        data: () => ({
            shown: false,
            valid: false,
            firstName: '',
            lastName: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }),
        methods: {
            toggleShown: function () {
                this.shown = !this.shown;
            },
            cancelButtonClicked: function () {
                this.shown = false
            },
            submitButtonClicked: function () {
                this.shown = false;
                this.submitReq()
            },
            submitReq(){
                try {
                    axios.post('/api/infoRequests', {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        opportunityTitle: this.opportunityTitle
                    })
                } catch (e) {
                    alert("Sorry there was an error while trying to submit your request for more information. Please try again later.")
                }
            }
        }
    }
</script>

<style scoped>

</style>