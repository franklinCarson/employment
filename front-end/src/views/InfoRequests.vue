<template>
    <v-container
        fluid
    >
        <v-data-table
                :headers="headers"
                :items="requests"
                sort-by="email"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn
                        @click="contactedButtonClicked(item)"
                        x-small
                        color="success"
                >
                  Contacted
                </v-btn>
            </template>

        </v-data-table>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "InfoRequests",
        data: () => ({
            headers: [
                {
                    text: "Email",
                    align: "start",
                    value: "email"
                },
                {
                    text: "First Name",
                    align: "start",
                    value: "firstName"
                },
                {
                    text: "Last Name",
                    align: "start",
                    value: "lastName",
                },
                {
                    text: "Opportunity",
                    align: "start",
                    value: "opportunityTitle"
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false
                }
            ],
            requests: []
        }),
        methods: {
            contactedButtonClicked: function (request) {
                this.deleteItem(request);
                this.contacted(request);
            },
            deleteItem: function(req) {
                this.requests = this.requests.filter(function(request){
                    return req.id !== request.id
                })
            },
            getInfoRequests: async function () {
                try {
                    let res = await axios.get('/api/infoRequests/pending');
                    this.requests = res.data

                } catch (e) {
                    alert("Failed to retrieve info requests, please try again later.")
                }
            },
            contacted: async function (request){
                await axios.patch(`/api/infoRequests/${request.id}`)
            }
        },
        created() {
            this.getInfoRequests()
        }
    }
</script>

<style scoped>

</style>