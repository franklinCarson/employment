<template>
    <v-dialog
            v-model="shown"
            max-width="600"
    >
        <v-card
                light
                class="pa-3"
        >
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
                Submit Job Opportunity
            </v-card-title>
            <v-card-text>
                Thank you for being willing to submit an opportunity! Please fill out the information below. Our
                Employment Specialist will review the information and approve it to be shown on the "Job Listing" page.
            </v-card-text>
            <v-form v-model="valid">
                <v-text-field label="Job Title"
                              outlined
                              class="pr-3 pl-3"
                              v-model="opportunity.title"
                />
                <v-textarea
                        auto-grow
                        outlined
                        clearable
                        label="Job Description"
                        class="pr-3 pl-3"
                        v-model="opportunity.description"
                />
                <span class="font-weight-bold pl-3">
                    Your Contact Information
                </span>

                <v-container>
                    <v-row>
                        <v-col
                                cols="12"
                                md="4"
                        >
                            <v-text-field
                                    v-model="opportunity.contact.firstName"
                                    :rules="nameRules"
                                    label="First name"
                                    outlined
                                    required
                            ></v-text-field>
                        </v-col>

                        <v-col
                                cols="12"
                                md="4"
                        >
                            <v-text-field
                                    v-model="opportunity.contact.lastName"
                                    :rules="nameRules"
                                    label="Last name"
                                    outlined
                                    required
                            ></v-text-field>
                        </v-col>

                        <v-col
                                cols="12"
                                md="4"
                        >
                            <v-text-field
                                    v-model="opportunity.contact.email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    outlined
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
                    Submit Opportunity
                    <v-icon right>
                        mdi-upload
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios"

    export default {
        name: "JobOpportunityForm",
        data: () => ({
            shown: false,
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            nameRules: [
                v => !!v || 'Name is required',
            ],
            opportunity: {
                title: "",
                description: "",
                contact: {
                    firstName: '',
                    lastName: '',
                    email: '',
                }
            }
        }),
        methods: {
            toggleShown: function () {
                this.shown = !this.shown
            },
            submitButtonClicked: function () {
                this.postOpp();
                this.toggleShown();
            },
            closeButtonClicked: function () {
                this.toggleShown()
            },
            postOpp: async function () {
                try {
                    await axios.post("/api/opportunity", this.opportunity);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>