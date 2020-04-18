<template>
    <div>
        <JobOpportunity :state="state"
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
        props: ['opportunity', 'opportunityDeleted'],
        computed: {
            state: function () {
                if(this.$root.isAuthenticated){
                    return "jobListingAdminLoggedIn";
                }

                return "public";
            }
        }
    }
</script>

<style scoped>

</style>