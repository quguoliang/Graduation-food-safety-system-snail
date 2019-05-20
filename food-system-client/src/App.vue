<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
	name: 'app',
	components: {},
	mounted() {
		// window.addEventListener('unload', this.saveState);
	},
	methods: {
		...mapMutations(['REFRESH']),
		saveState() {
			// sessionStorage.setItem('state', JSON.stringify(this.$store.state.user));
			// this.REFRESH(sessionStorage.getItem('state'));
			// console.log('====================================');
			// console.log(JSON.stringify(this.$store.state.user));
			// console.log('====================================');
		},
	},
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/* margin-top: 60px; */
}
</style>
