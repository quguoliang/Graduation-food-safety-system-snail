<template>
	<div class="personnel">
		<div class="personnel-title">
			<span>人员管理</span>
			<Input class="title-input" search enter-button v-model="searchValue" placeholder="请输入名称..." @on-search="getSearchInfo" />
		</div>

		<Table :loading="loading" stripe height="580" :columns="columns1" :data="showList">
			<template slot-scope="{ row }" slot="name">
				<strong>{{ row.name }}</strong>
			</template>
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" style="margin-right: 5px" @click="modifyUserInfo(index)">修改</Button>
				<Button type="error" size="small" @click="userRemove(index)">删除</Button>
			</template>
		</Table>
		<Modal v-model="modal" title="用户信息修改" @on-ok="confirmModify">
			<Form :model="formItem" :label-width="80">
				<FormItem label="账户">
					<Input disabled v-model="formItem.telphone" placeholder=""></Input>
				</FormItem>
				<FormItem label="用户名">
					<Input v-model="formItem.username" placeholder=""></Input>
				</FormItem>
				<FormItem label="账户权限">
					<Select v-model="formItem.isSuperManager">
						<Option value="0">管理员</Option>
						<Option value="1">超级管理员</Option>
					</Select>
				</FormItem>
				<FormItem label="备注">
					<Input type="textarea" v-model="formItem.remark" placeholder=""></Input>
				</FormItem>
			</Form>
		</Modal>

		<Page class="page" :page-size="pageSize" :total="total" @on-change="handlePageChange" />
	</div>
</template>
<script>
import apiUser from '@/provider/api/user';
export default {
	name: 'personnelManagement',
	data() {
		return {
			searchValue: '',
			formItem: {
				_id: '',
				telphone: '',
				username: '',
				isSuperManager: '',
				remark: '',
			},
			columns1: [
				{
					title: '账户',
					key: 'telphone',
					align: 'center',
				},
				{
					title: '用户名',
					key: 'username',
					align: 'center',
				},
				{
					title: '注册日期',
					key: 'date',
					align: 'center',
					sortable: true,
				},
				{
					title: '权限类别',
					key: 'jurisdiction',
					align: 'center',
					sortable: true,
				},
				{
					title: '备注',
					key: 'remark',
					align: 'center',
					sortable: true,
				},
				{
					title: '操作',
					slot: 'action',
					width: 150,
					align: 'center',
				},
			],
			userList: [],
			showList: [],
			password: '',
			avatar: '',
			total: 0,
			current: 1,
			pageSize: 4,
			loading: true,
			modal: false,
		};
	},
	mounted() {
		this.getUserList();

		setTimeout(() => {
			this.handlePageChange(1);
		}, 10);
	},
	methods: {
		modifyUserInfo(index) {
			this.modal = true;
			let typeInfo = '0';
			if (this.showList[index].jurisdiction === '超级管理员') {
				typeInfo = '1';
			} else {
				typeInfo = '0';
			}
			this.formItem._id = this.showList[index]._id;
			this.formItem.telphone = this.showList[index].telphone;
			this.formItem.username = this.showList[index].username;
			this.formItem.isSuperManager = typeInfo;
			this.formItem.remark = this.showList[index].remark;
			this.formItem.avatar = this.showList[index].avatar;
			this.formItem.password = this.showList[index].password;
		},
		async confirmModify() {
			let userObj = await apiUser.modifyUserInfo(this.formItem._id, this.formItem);
			if (userObj.code === 1) {
				this.$Message.success('修改成功！');
				this.getUserList();
				this.modal = false;
			} else {
				this.$Message.error('修改失败！');
			}
		},
		async getSearchInfo() {
			let isUser = await apiUser.selectUser(this.searchValue);
			if (isUser.code === 1) {
				this.showList = this.transform(isUser.data);
			} else {
				this.$Message.error('未查到搜索的用户！');
				this.showList = this.userList.slice((this.current - 1) * this.pageSize, this.current * this.pageSize);
			}
		},
		async getUserList() {
			let list = await apiUser.allUser();
			this.total = list.data[0].length;
			this.showList = this.transform(list.data[0].slice((this.current - 1) * this.pageSize, this.current * this.pageSize));
			this.userList = this.transform(list.data[0]);
			this.loading = false;
		},
		handlePageChange(index) {
			this.showList = this.transform(this.userList.slice((index - 1) * this.pageSize, index * this.pageSize));
			this.current = index;
		},
		async userRemove(index) {
			let _id = this.showList[index]._id;
			let list = await apiUser.deleteUser(_id);
			if (list.code === 1) {
				this.userList.splice((this.current - 1) * this.pageSize + index, 1);
				this.handlePageChange(this.current);
				this.$Message.success('用户删除成功！');
				this.total -= 1;
			} else {
				this.$Message.error('用户删除失败！');
			}
		},
		//封装数组转换方法
		transform(arr) {
			return arr.map(item => {
				let jurisdict = '';
				if (item.isSuperManager === '1') {
					jurisdict = '超级管理员';
				} else {
					jurisdict = '管理员';
				}
				let obj = {
					_id: item._id,
					telphone: item.telphone,
					username: item.username,
					password: item.password,
					avatar: item.avatar,
					date:
						new Date(item.date).toLocaleDateString().replace(/\//g, '-') +
						' ' +
						new Date(item.date).toTimeString().substr(0, 8),
					jurisdiction: jurisdict,
					remark: item.remark,
				};
				return obj;
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.personnel {
	background-color: #fff;
}
.personnel-title {
	display: flex;
	justify-content: space-between;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	padding-left: 20px;
	border-bottom: 1px solid rgb(209, 207, 207);
	span {
		display: inline-block;
		padding-left: 10px;
		font-size: 16px;
	}
	.title-input {
		width: 200px;
		margin-top: 5px;
	}
}
.page {
	text-align: right;
	margin: 10px 0 5px 0;
}
</style>
<style lang="scss">
.personnel-title {
	.title-input .ivu-input-group-append,
	.ivu-input-group-prepend {
		width: 50px;
	}
}
</style>
