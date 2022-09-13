
type mapClassName = string;
interface MapperProperty{
	maps : mapClassName[]
}

export default class Mapper{
	private map:{[key:mapClassName] : any} = {};
	constructor(property:MapperProperty){
		property.maps.forEach((map:mapClassName) => {
			const mapClass:any = require(`./Map/${map}`)[map];

			this.map[map] = new mapClass();
		})
	}
	getMap(mapClassName:mapClassName){
		return this.map[mapClassName];
	}
}
