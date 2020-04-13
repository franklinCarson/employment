<template>
  <div>
    <v-container class="mb-12">
      <div :key="opportunity.id" v-for="opportunity in opportunities" id="listings">
        <JobListing :opportunity="opportunity"
                    :opportunity-deleted="opportunityDeleted"
        />
      </div>
      <UploadJobOppBtn :action="showJobOpportunityForm"/>
      <JobOpportunityForm ref="form"/>
    </v-container>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import JobListing from "../components/JobListing";
import UploadJobOppBtn from "../components/UploadJobOppBtn";
import JobOpportunityForm from "../components/JobOpportunityForm";

export default {
  name: 'Home',
  components: {
    UploadJobOppBtn,
    JobListing,
    JobOpportunityForm
  },
  data: () => ({
    opportunities: []
  }),
  methods: {
    showJobOpportunityForm: function () {
      this.$refs.form.toggleShown()
    },
    getOpps: async function () {
      try {
        let res = await axios.get("/api/opportunity");
        this.opportunities = res.data.opportunities;
      } catch (e) {
        console.log(e)
      }
    },
    opportunityDeleted: function (id) {
      this.opportunities = this.opportunities.filter((el) => el.id !== id)
    }
  },
  created() {
    this.getOpps();
  }
}
</script>
