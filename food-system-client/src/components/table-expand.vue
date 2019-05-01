<template>
	<div>
		<Row class="expand-row">
			<Col span="8">
				<span class="expand-key">名称: </span>
				<span class="expand-value">{{ row.name }}</span>
			</Col>
			<Col span="8">
				<span class="expand-key">厂家: </span>
				<span class="expand-value">{{ row.factory }}</span>
			</Col>
			<Col span="8">
				<span class="expand-key">类别: </span>
				<span class="expand-value">{{ row.type }}</span>
			</Col>
		</Row>
		<Row>
			<Col span="8">
				<span class="expand-key">价格: </span>
				<span class="expand-value">{{ row.price }}</span>
			</Col>
			<Col span="8">
				<span class="expand-key">时间: </span>
				<span class="expand-value">{{ row.date }}</span>
			</Col>
			<Col span="8">
				<span class="expand-key">描述: </span>
				<span class="expand-value">{{ row.remark }}</span>
			</Col>
		</Row>
	</div>
</template>
<script>
export default {
	props: {
		row: Object,
	},
};
</script>
<style scoped>
.expand-row {
	margin-bottom: 16px;
}
</style>
