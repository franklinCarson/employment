<template>
    <v-card class="ma-6">
        <v-card-title>
            {{ opportunity.title }}
        </v-card-title>
        <v-card-subtitle>
            Description
        </v-card-subtitle>
        <v-card-text>
            {{ opportunity.description }}
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <template v-if="state === 'pendingOpportunityAdminLoggedIn'">
                <v-btn
                        @click="declineButtonClicked"
                        color="error">
                    Decline
                </v-btn>
                <v-btn
                        @click="approveButtonClicked"
                        color="success"
                >
                    Approve
                </v-btn>
            </template>
            <v-btn v-else-if="state === 'jobListingAdminLoggedIn'"
                   @click="deleteButtonClicked"
                color="error"
            >
                Delete
            </v-btn>
            <v-btn v-else @click="requestInfoBtnClicked">
                Request Info
            </v-btn>

            <RequestInfo :opportunity-title="opportunity.title"  ref="requestInfo"/>
        </v-card-actions>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import RequestInfo from "./RequestInfo";
    export default {
        name: "JobOpportunity",
        props: ['opportunity', 'state', 'opportunityApproved', 'opportunityDeclined', 'opportunityDeleted'],
        data: () => ({
            admin: true
        }),
        components:{
            RequestInfo
        },
        methods: {
            requestInfoBtnClicked: function () {
                this.$refs.requestInfo.toggleShown()
            },
            approveButtonClicked: async function () {
                try {
                    await axios.patch('/api/opportunity', {
                        action: 'approve',
                        id: this.opportunity.id
                    });
                    this.opportunityApproved(this.opportunity.id)
                } catch(e){
                    alert("There was an error approved this opportunity. Please try again later.");
                }
            },
            declineButtonClicked: async function(){
                try {
                    await axios.patch('/api/opportunity', {
                        action: 'decline',
                        id: this.opportunity.id
                    });
                    this.opportunityDeclined(this.opportunity.id)
                } catch (e) {
                    alert("There was an error declining this opportunity. Please try again later.");
                }
            },
            deleteButtonClicked: async function(){
                try {
                    await axios.delete(`/api/opportunity/${this.opportunity.id}`);
                    this.opportunityDeleted(this.opportunity.id);
                } catch (e) {
                    alert("There was an error deleting this opportunity. Please try again later.");
                }
            }
        }
    }
</script>

<style scoped>

</style>