  <template>
    <v-app id="inspire">
      <Nav ref="nav"></Nav>

      <v-app-bar
              app
      >
        <v-row>
          <v-col>
            <v-app-bar-nav-icon @click.stop="navButtonClicked"/>
          </v-col>
          <v-col>
            <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp" class="pt-2 text-center">Provo Married 23rd Ward</v-toolbar-title>
            <v-toolbar-title v-else class="pt-2 text-center">23rd Ward</v-toolbar-title>
          </v-col>
          <v-col align="end">
            <v-icon class="pt-3 pr-1"
                    @click="contactButtonClicked"
            >
              mdi-comment-outline
            </v-icon>
          </v-col>
        </v-row>
      </v-app-bar>
      <Contact ref="contact"/>
      <v-content>
        <router-view></router-view>
      </v-content>
      <Footer/>
    </v-app>
</template>

<script>
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Contact from "./components/Contact";

export default {
  name: 'App',

  components: {
    Contact,
    Footer,
    Nav
  },

  data: () => ({
    //
  }),
  methods: {
    navButtonClicked: function () {
      this.$refs.nav.toggleDrawer()
    },
    contactButtonClicked: function () {
      this.$refs.contact.toggleShown()
    }
  }
};
</script>
