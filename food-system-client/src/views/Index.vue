<template>
	<div class="layout">
		<index-header></index-header>
		<Layout class="layout-size" :style="{ position: 'relative' }">
			<Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
				<Menu :active-name="activeName" ref="activeName" theme="dark" width="auto" :class="menuitemClasses">
					<MenuItem :name="menu.path" :to="'/' + menu.path" v-for="menu in menuOptions" :key="menu.path">
						<Icon :type="menu.icon" />
						<span>{{ menu.name }}</span>
					</MenuItem>
				</Menu>
			</Sider>
			<Layout>
				<Header :style="{ padding: 0 }" class="layout-header-bar">
					<Icon
						@click.native="collapsedSider"
						:class="rotateIcon"
						:style="{ cursor: 'pointer', margin: '0 20px 10px 20px' }"
						type="md-menu"
						size="24"
					></Icon>
				</Header>

				<Content
					:style="{ position: 'relative', textAlign: 'left', margin: '55px 5px 5px 5px', background: '#F0F0F0', height: '100vh' }"
				>
					<!-- <keep-alive> -->
					<router-view />
					<!-- </keep-alive> -->
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
import IndexHeader from '@/container/index/IndexHeader';
export default {
	name: 'Index',
	components: {
		IndexHeader,
	},
	data() {
		return {
			isCollapsed: false,
			activeName: 'systemhome',
			menuOptions: [
				{
					path: 'systemhome',
					icon: 'ios-home-outline',
					name: '系统首页',
				},
				{
					path: 'addmerchandise',
					icon: 'ios-basket-outline',
					name: '添加商品',
				},
				{
					path: 'articaleditor',
					icon: 'md-create',
					name: '文章编辑',
				},
				{
					path: 'personnelmanagement',
					icon: 'ios-people-outline',
					name: '人员管理',
				},
				{
					path: 'merchandisemanagement',
					icon: 'ios-cart-outline',
					name: '商品管理',
				},
				{
					path: 'articalmanagement',
					icon: 'ios-copy-outline',
					name: '文章管理',
				},
				{
					path: 'salesdata',
					icon: 'ios-stats-outline',
					name: '销售数据',
				},
			],
		};
	},
	computed: {
		rotateIcon() {
			return ['menu-icon', this.isCollapsed ? 'rotate-icon' : ''];
		},

		menuitemClasses() {
			return ['menu-item', this.isCollapsed ? 'collapsed-menu' : ''];
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.activeName = this.$route.path.slice(1);
			this.$refs.activeName.updateActiveName();
		});
	},
	updated() {
		this.activeName = this.$route.path.slice(1);
		this.$refs.activeName.updateActiveName();
	},
	// watch: {
	// 	activeName(newVal) {
	// 		if (newVal) {
	// 			this.activeName = this.$route.path.slice(1);
	// 			this.$refs.activeName.updateActiveName();
	// 		}
	// 	},
	// },
	methods: {
		collapsedSider() {
			this.$refs.side1.toggleCollapse();
		},
	},
};
</script>
<style lang="scss" scoped>
.layout {
	height: 100vh;
	border: 1px solid #d7dde4;
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
}

.layout-size {
	height: calc(100vh - 60px);
}
.layout-header-bar {
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 500;
	overflow: hidden;
	height: 50px;
	text-align: left;
	background: #fff;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
	width: 90%;
	height: 30px;
	background: #5b6270;
	border-radius: 3px;
	margin: 15px auto;
}
.menu-icon {
	transition: all 0.3s;
}

.rotate-icon {
	transform: rotate(-90deg);
}
.menu-item span {
	display: inline-block;
	overflow: hidden;
	width: 69px;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: bottom;
	transition: width 0.2s ease 0.2s;
}
.menu-item i {
	transform: translateX(0px);
	transition: font-size 0.2s ease, transform 0.2s ease;
	vertical-align: middle;
	font-size: 16px;
}
.collapsed-menu span {
	width: 0px;
	transition: width 0.2s ease;
}
.collapsed-menu i {
	transform: translateX(5px);
	transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
	vertical-align: middle;
	font-size: 22px;
}
</style>
