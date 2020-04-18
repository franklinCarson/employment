<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row justify="center">
            <v-card
                    class="ma-12"
                    min-width="300"
                    max-width="500"
                    width="500"
            >
                <v-toolbar
                        color="highlight"
                        dark
                        flat
                >
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field
                                label="Username"
                                name="username"
                                prepend-icon="mdi-account-circle-outline"
                                type="text"
                                v-model="username"
                        />

                        <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="password"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="highlight"
                           @click="login"
                            dark>
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Login",
        data: () => ({
            username: "",
            password: ""
        }),
        methods: {
            login: async function(){
                try {
                    this.$root.user = await axios.post('/api/users/login', {
                        username: this.username,
                        password: this.password
                    });

                    await this.$router.push('/')
                } catch (e) {
                    console.log(e)
                }

            }
        }
    }
</script>

<style scoped>

</style>