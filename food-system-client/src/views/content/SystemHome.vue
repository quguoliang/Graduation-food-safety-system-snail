<template>
	<div>
		<div class="system-home">
			<top-left-part></top-left-part>
			<top-right-part></top-right-part>
		</div>
		<down-part></down-part>
	</div>
</template>
<script>
import TopLeftPart from '@/container/systemHome/TopLeftPart';
import TopRightPart from '@/container/systemHome/TopRightPart';
import DownPart from '@/container/systemHome/DownPart';
export default {
	name: 'systemHome',
	components: {
		TopLeftPart,
		TopRightPart,
		DownPart,
	},
};
</script>
<style lang="scss" scoped>
.system-home {
	display: flex;
}
</style>
