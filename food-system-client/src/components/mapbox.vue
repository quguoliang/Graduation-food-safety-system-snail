<template>
	<div>
		<div id="map"></div>
		<div v-show="handleMarkerList" class="coordinate-list">
			坐标列表
			<div class="coordinate" @click="addData(item)" v-for="(item, index) in markerList" :key="index">
				<p>标记{{ index + 1 }}</p>
				<Modal v-model="modal" title="添加信息" @on-ok="ok" @on-cancel="cancel">
					<div class="line-div">
						<span class="line-label">地点：</span>
						<Input v-model="lineInfo[index].placename" placeholder="请输入地点名称..." style="width: 400px" />
					</div>
					<div class="line-div">
						<span class="line-label">详细描述：</span
						><Input type="textarea" v-model="lineInfo[index].placeinfo" placeholder="请输入备注信息..." style="width: 400px" />
					</div>
					<div class="line-div">
						<span class="line-label"></span>
						<Upload
							style="width:83%;display:inline-block"
							:format="['jpg', 'jpeg', 'png', 'zsh']"
							multiple
							type="drag"
							action="/api/upload"
							:on-success="
								(event, file) => {
									imgUpload(event, file, index);
								}
							"
						>
							<div style="padding: 20px 0">
								<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
								<p>点击或者拖拽上传图片</p>
							</div>
						</Upload>
					</div>
				</Modal>
			</div>
		</div>
		<div id="menu">
			<input id="streets-v11" type="radio" name="rtoggle" value="streets" checked="checked" />
			<label for="streets"> 街道图 </label>
			<input id="light-v10" type="radio" name="rtoggle" value="light" />
			<label for="light"> 明亮图 </label>
			<input id="dark-v10" type="radio" name="rtoggle" value="dark" />
			<label for="dark"> 黑暗图 </label>
			<input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors" />
			<label for="outdoors"> 户外图 </label>
			<input id="satellite-v9" type="radio" name="rtoggle" value="satellite" />
			<label for="satellite"> 卫星图 </label>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mapbox',
	components: {},
	data() {
		return {
			markerList: [],
			modal: false,
			lineInfo: [],
		};
	},
	computed: {
		handleMarkerList() {
			if (this.markerList.length !== 0) {
				return true;
			} else {
				return false;
			}
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.mapBox.accessToken = 'pk.eyJ1IjoicXViYWJhIiwiYSI6ImNqdHA2dDdzYjAxa3E0MHBjdTJtZ3g4M2cifQ.kRdFsPbRecmL3vi0hQvzZA';

			let map = new this.mapBox.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v10',
				center: [116.2444481756329, 39.97422007133474],
				zoom: 13,
				pitch: 40,
				bearing: 1,
				localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
			});
			//更改地图样式
			var layerList = document.getElementById('menu');
			var inputs = layerList.getElementsByTagName('input');

			function switchLayer(layer) {
				var layerId = layer.target.id;
				map.setStyle('mapbox://styles/mapbox/' + layerId);
			}

			for (var i = 0; i < inputs.length; i++) {
				inputs[i].onclick = switchLayer;
			}

			//修改地图信息为中文信息
			let mapLanguage = new this.mapboxLanguage({
				defaultLanguage: 'zh',
			});

			map.addControl(mapLanguage);

			//添加搜索地理位置控件
			map.addControl(
				new this.mapboxGeocoder({
					accessToken: this.mapBox.accessToken,
					language: 'Chinese',
					origin: '',
					bbox: [74.63573756713893, 19.996588227035502, 134.63163147499102, 54.33664666919972],
					country: 'ISO 3166-2:CN',
					limit: 10,
					placeholder: '搜索',
				}),
				'top-left'
			);
			//添加全屏查看控件
			map.addControl(new this.mapBox.FullscreenControl());

			//添加定位当前位置控件
			map.addControl(
				new this.mapBox.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
				}),
				'top-right'
			);

			//添加放大缩小控件
			map.addControl(new this.mapBox.NavigationControl(), 'top-right');

			//点击生成marker标记
			var a = 0;
			map.on(
				'click',
				function(e) {
					let len = this.lineInfo.length - 1;
					if (len === -1) {
						this.markerList.push([e.lngLat.lng, e.lngLat.lat]);
						this.lineInfo.push({ lng: e.lngLat.lng, lat: e.lngLat.lat, placename: '', placeinfo: '', img: '' });
						new this.mapBox.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);

						map.addLayer({
							id: 'route' + a,
							type: 'line',
							source: {
								type: 'geojson',
								data: {
									type: 'Feature',
									properties: {},
									geometry: {
										type: 'LineString',
										coordinates: this.markerList,
									},
								},
							},
							layout: {
								'line-join': 'round',
								'line-cap': 'round',
							},
							paint: {
								'line-color': '#888',
								'line-width': 8,
							},
						});
						a += 1;
					} else {
						if (this.lineInfo[len].placename !== '') {
							this.markerList.push([e.lngLat.lng, e.lngLat.lat]);
							this.lineInfo.push({ lng: e.lngLat.lng, lat: e.lngLat.lat, placename: '', placeinfo: '', img: '' });
							new this.mapBox.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);

							map.addLayer({
								id: 'route' + a,
								type: 'line',
								source: {
									type: 'geojson',
									data: {
										type: 'Feature',
										properties: {},
										geometry: {
											type: 'LineString',
											coordinates: this.markerList,
										},
									},
								},
								layout: {
									'line-join': 'round',
									'line-cap': 'round',
								},
								paint: {
									'line-color': '#888',
									'line-width': 8,
								},
							});
							a += 1;
						} else {
							this.$Message.error('请完善信息后继续添加节点信息！');
						}
					}
				}.bind(this)
			);
		},
		imgUpload(event, file, index) {
			this.lineInfo[index].img = file.response.filePath;
		},
		addData() {
			this.modal = true;
		},
		ok() {
			this.$emit('lineInfo', this.lineInfo);

			// this.markerList.splice(0, 1);
		},
		cancel() {
			// this.$Message.info('');
		},
	},
};
</script>

<style lang="scss">
#map {
	position: absolute;
	left: 0;
	top: 0;
	text-align: left;
	width: 100%;
	height: 100%;
	input {
		margin-left: 5px;
	}
}
#menu {
	width: 300px;
	position: absolute;
	right: 0;
	top: calc(100vh - 205px);
	background: #fff;
	padding: 10px;
	font-family: 'Open Sans', sans-serif;
	z-index: 1000;
}

.coordinate-list {
	position: absolute;
	top: 70px;
	left: 10px;
	background: rgba(0, 0, 0, 0.5);
	color: rgb(230, 230, 230);
	text-align: center;
	padding: 5px 10px;
	margin: 0;
	font-size: 11px;
	border-radius: 3px;
	.coordinate {
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #000;
		&:first-child {
			border-top: 1px solid #000;
		}
		&:hover {
			color: #fff;
			cursor: pointer;
		}
	}
}
.line-div {
	margin-bottom: 10px;
	.line-label {
		display: inline-block;
		width: 60px;
		text-align: right;
	}
}
</style>
