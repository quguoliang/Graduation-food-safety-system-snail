<template>
	<div class="error">
		<Card :bordered="false">
			<p slot="title" style="font-size:20px">超级管理员权限</p>
			<p>您暂时并没有权限访问本页面，如需要，请联系超级管理员添加</p>
			<p>
				You do not have permission to access this page for the time being. If necessary, please contact Super Administrator to add
				it.
			</p>
		</Card>
	</div>
</template>
<script>
export default {
	name: 'noAuthority',
};
</script>
<style lang="scss" scoped>
.error {
	text-align: center;
	margin: 20px 10px 0 10px;
}
</style>
