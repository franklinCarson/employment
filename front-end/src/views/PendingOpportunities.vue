<template>
    <v-container
        fluid>
        <div :key="opportunity.id" v-for="opportunity in opportunities">
            <PendingOpportunity :opportunity="opportunity"
                                :opportunity-approved="removedOpportunity"
                                :opportunity-declined="removedOpportunity"
            />
        </div>
    </v-container>
</template>

<script>
    import axios from "axios";
    import PendingOpportunity from "../components/PendingOpportunity";
    export default {
        components: {PendingOpportunity},
        name: "PendingOpportunities",
        props: {
            admin:{
                type: Boolean,
                deleteItem: false
            }
        },
        data: () => ({
            opportunities: []
        }),
        methods: {
            getOpps: async function () {
                try {
                    let res = await axios.get("/api/opportunity/pending");
                    this.opportunities = res.data.opportunities;
                } catch (e) {
                    console.log(e)
                }
            },
            removedOpportunity: function (id) {
                this.opportunities = this.opportunities.filter((opportunity) => opportunity.id !== id);
            }
        },
        created() {
            this.getOpps()
        }
    }
</script>

<style scoped>

</style>