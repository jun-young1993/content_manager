export interface DrawerClickEvent {
	setMainContainer : (mainContainer : React.ReactNode) => void
	self : leftMenuInterface
}


export interface leftMenuInterface {
	name : string
	onClick : (event : DrawerClickEvent) => void
	icon : React.ReactNode
	drive ?: boolean
	collapse ?: boolean
	currentCollapse ?: boolean
	setCollapse ?: Function
	items ?: leftMenuInterface[]
}

export interface DashboardInterface {
	leftMenu : leftMenuInterface[]
	defaultMainContainer ?: JSX.Element
}