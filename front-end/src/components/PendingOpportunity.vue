<template>
    <JobOpportunity state="pendingOpportunityAdminLoggedIn"
                    :opportunity="opportunity"
                    :opportunity-approved="opportunityApproved"
                    :opportunity-declined="opportunityDeclined"
    />
</template>

<script>
    import JobOpportunity from "./JobOpportunity";
    export default {
        name: "PendingOpportunity",
        components: {JobOpportunity},
        props: ['opportunity', 'opportunityApproved', 'opportunityDeclined']
    }
</script>

<style scoped>

</style>