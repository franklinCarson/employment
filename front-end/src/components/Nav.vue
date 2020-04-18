<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <div :key="item.icon" v-for="item in navItems">
                    <v-list-item :to="item.linkTo" link>
                        <v-list-item-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{item.text}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
                <v-list-item to="" link @click="submitJobOpportunityClicked">
                    <v-list-item-action>
                        <v-icon>mdi-upload</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Submit Job Opportunity</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <JobOpportunityForm ref="form"/>
    </div>
</template>

<script>
    import JobOpportunityForm from "./JobOpportunityForm";
    export default {
        name: "Nav",
        components: {JobOpportunityForm},
        data: () => ({
            override: undefined
        }),
        methods: {
            toggleDrawer: function() {
                this.drawer = !this.override;
            },
            submitJobOpportunityClicked: function () {
                this.$refs.form.toggleShown()
            }
        },
        computed: {
              navItems: function () {
                  let items = [
                      {
                          icon: 'mdi-hail',
                          text: 'Job Listings',
                          linkTo: '/',
                          visibility: 'public'
                      },
                      {
                          icon: 'mdi-inbox-arrow-down-outline',
                          text: 'Info Requests',
                          linkTo: '/info-requests',
                          visibility: 'admin'
                      },
                      {
                          icon: 'mdi-clock-start',
                          text: 'Pending Opportunities',
                          linkTo: '/pending-opportunities',
                          visibility: 'admin'
                      },
                  ];

                  if(!this.$root.isAuthenticated || !this.$root.isAdminDomain){
                      items = items.filter((el) => {
                          return el.visibility !== 'admin';
                      });
                  }

                  return items;
              },
            drawer: {
              get: function () {
                  if (this.override !== undefined) {
                      return this.override;
                  }

                  if (!this.$root.isAuthenticated && this.$root.isAdminDomain) {
                      return false;
                  }
                  return true;
              },
                set: function (newValue) {
                    this.override = newValue
                }
            }
        }
    }
</script>

<style scoped>

</style>