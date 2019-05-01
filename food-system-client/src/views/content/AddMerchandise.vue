/* eslint-disable prettier/prettier */
<template>
	<div class="add-merchadise">
		<div class="title">商品信息</div>
		<Row>
			<Col span="10">
				<Form class="form" :model="formItem" :label-width="80">
					<FormItem label="商品名称">
						<Input v-model="formItem.goodsname" placeholder="请输入商品名称"></Input>
					</FormItem>
					<FormItem label="生产厂家">
						<Input v-model="formItem.factory" placeholder="请输入厂家名称"></Input>
					</FormItem>
					<FormItem label="商品类别">
						<Select v-model="formItem.type">
							<Option value="酒水类">酒水类</Option>
							<Option value="肉制品">肉制品</Option>
							<Option value="水产品">水产品</Option>
							<Option value="调味品">调味品 </Option>
							<Option value="粮食制品">粮食制品</Option>
							<Option value="水果蔬菜类">水果蔬菜类</Option>
							<Option value="其他">其他</Option>
						</Select>
					</FormItem>
					<FormItem label="生产日期">
						<Row>
							<Col span="9">
								<DatePicker type="date" placeholder="生产日期" v-model="formItem.date"></DatePicker>
							</Col>
							<Col span="2" style="text-align: center">-----</Col>
							<Col span="11">
								<TimePicker type="time" placeholder="生产时间" v-model="formItem.time"></TimePicker>
							</Col>
						</Row>
					</FormItem>

					<FormItem label="商品价格">
						<InputNumber
							:max="1000000"
							:min="0"
							v-model="formItem.price"
							:formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
							:parser="value => value.replace(/$s?|(,*)/g, '')"
						></InputNumber>
					</FormItem>
					<FormItem label="商品描述">
						<Input type="textarea" v-model="formItem.remark" placeholder="请输入商品描述"></Input>
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit">提交</Button>
						<Button @click="handleReset" style="margin-left: 250px">重置</Button>
					</FormItem>
				</Form>
			</Col>
			<Col span="14">
				<div class="map-right">
					<map-box @lineInfo="getPlaceInfo"></map-box>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
import MapBox from '@/components/mapbox';
import apiGoods from '@/provider/api/goods';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'addMerchandise',
	components: {
		MapBox,
	},
	data() {
		return {
			index: 1,
			formItem: {
				goodsname: '',
				type: '',
				price: 0,
				factory: '',
				date: '',
				time: '',
				remark: '',
				place: [],
			},
		};
	},
	methods: {
		...mapActions(['ADD_GOODS']),
		async handleSubmit() {
			let goods = await this.ADD_GOODS(this.formItem);
			if (goods.code === 1) {
				this.$Message.success('商品添加成功！');
				this.formItem = {
					goodsname: '',
					type: '',
					price: 0,
					factory: '',
					date: '',
					time: '',
					remark: '',
					place: [],
				};
			} else {
				this.$Message.error('商品添加失败！');
			}
		},
		handleReset() {
			// this.$refs[name].resetFields();
		},
		priceChange() {
			if (this.formItem.price <= 0) {
				this.formItem.price = 0;
			}
		},
		getPlaceInfo(data) {
			this.formItem.place = data;
		},
	},
};
</script>

<style lang="scss" scoped>
.add-merchadise {
	height: calc(100vh - 110px);
	background-color: #fff;
	.title {
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		padding-left: 20px;
		border-bottom: 1px solid rgb(209, 207, 207);
	}
	.form {
		width: 450px;
		padding-top: 30px;
	}
}
.map-right {
	width: 100%;
	height: calc(100vh - 170px);
}
</style>
