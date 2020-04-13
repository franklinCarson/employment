<template>
    <div>
        <JobOpportunity state="public"
                        :opportunity="opportunity"
                        :opportunity-deleted="opportunityDeleted"
        />
    </div>
</template>

<script>
    import JobOpportunity from "./JobOpportunity";
    export default {
        components: {JobOpportunity},
        name: "JobListing",
        props: ['opportunity', 'opportunityDeleted']
    }
</script>

<style scoped>

</style>