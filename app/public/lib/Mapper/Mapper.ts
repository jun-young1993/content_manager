
type mapClassName = string;
interface MapperProperty{
	maps : mapClassName[]
}

export default class Mapper{
	private map = [];
	constructor(property:MapperProperty){
		property.maps.forEach((map:mapClassName) => {
			const mapClass = require(`./Map/${map}`)[map];
			console.log(mapClass);
			this.map[map] = new mapClass();
		})
	}
	getMap(mapClassName:mapClassName){
		return this.map[mapClassName];
	}
}
