type ListTypes = Array<string | number>;

const list: ListTypes[] = [
  ['沈阳市', 123.429092, 41.796768],
  ['长春市', 125.324501, 43.886841],
  ['哈尔滨市', 126.642464, 45.756966],
  ['北京市', 116.405289, 39.904987],
  ['天津市', 117.190186, 39.125595],
  ['呼和浩特市', 111.75199, 40.84149],
  ['银川市', 106.23248, 38.48644],
  ['太原市', 112.549248, 37.857014],
  ['石家庄市', 114.502464, 38.045475],
  ['济南市', 117.000923, 36.675808],
  ['郑州市', 113.665413, 34.757977],
  ['西安市', 108.948021, 34.263161],
  ['武汉市', 114.298569, 30.584354],
  ['南京市', 118.76741, 32.041546],
  ['合肥市', 117.283043, 31.861191],
  ['上海市', 121.472641, 31.231707],
  ['长沙市', 112.982277, 28.19409],
  ['南昌市', 115.892151, 28.676493],
  ['杭州市', 120.15358, 30.287458],
  ['福州市', 119.306236, 26.075302],
  ['广州市', 113.28064, 23.125177],
  ['台北市', 121.520076, 25.030724],
  ['海口市', 110.19989, 20.04422],
  ['南宁市', 108.320007, 22.82402],
  ['重庆市', 106.504959, 29.533155],
  ['昆明市', 102.71225, 25.040609],
  ['贵阳市', 106.713478, 26.578342],
  ['成都市', 104.065735, 30.659462],
  ['兰州市', 103.83417, 36.06138],
  ['西宁市', 101.77782, 36.61729],
  ['拉萨市', 91.1145, 29.64415],
  ['乌鲁木齐市', 87.61688, 43.82663],
  ['香港', 114.16546, 22.27534],
  ['澳门', 113.54913, 22.19875]
];

const setCity = (list: ListTypes[]) => {
  return list.map((city) => {
    return {
      name: city[0],
      location: `${city[1]},${city[2]}`
    };
  });
};

export const topCity = setCity(list);
